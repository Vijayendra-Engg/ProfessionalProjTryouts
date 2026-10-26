import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import * as L from 'leaflet';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface SiteOffset {
  id: number;
  northMeters: number;
  eastMeters: number;
}

const SAMPLE_LOCATION: Coordinates = {
  latitude: 37.7749,
  longitude: -122.4194,
};
const RADIUS_KM = 12;
const METERS_PER_DEGREE = 111_320;
const SITE_OFFSETS: SiteOffset[] = [
  { id: 1, northMeters: 1_300, eastMeters: 800 },
  { id: 2, northMeters: -2_200, eastMeters: -1_000 },
  { id: 3, northMeters: 7_600, eastMeters: 6_400 },
  { id: 4, northMeters: -15_000, eastMeters: 10_000 },
  { id: 5, northMeters: 22_000, eastMeters: -15_000 },
  { id: 6, northMeters: -6_800, eastMeters: -3_200 },
];

@Component({
  selector: 'app-location-map',
  imports: [DecimalPipe, MatButtonModule],
  templateUrl: './location-map.html',
  styleUrl: './location-map.css',
})
export class LocationMap implements AfterViewInit, OnDestroy {
  @ViewChild('mapElement', { static: true })
  private readonly mapElement!: ElementRef<HTMLDivElement>;

  protected readonly locationState = signal<'sample' | 'locating' | 'live' | 'unavailable'>(
    'sample',
  );
  protected readonly locationMessage = signal(
    'Sample locations are shown around San Francisco. Share your location to center the map on you.',
  );
  protected readonly currentLocation = signal<Coordinates>(SAMPLE_LOCATION);
  protected readonly sites = computed(() =>
    SITE_OFFSETS.map((site) => {
      const position = this.getSiteCoordinates(site);
      const distanceKm = this.getDistanceKm(this.currentLocation(), position);
      return {
        ...position,
        id: site.id,
        distanceKm,
        withinRadius: distanceKm <= RADIUS_KM,
      };
    }),
  );
  protected readonly withinRadiusCount = computed(
    () => this.sites().filter((site) => site.withinRadius).length,
  );
  protected readonly outsideRadiusCount = computed(
    () => this.sites().length - this.withinRadiusCount(),
  );

  private map: L.Map | undefined;
  private markerLayer: L.LayerGroup | undefined;
  private radiusCircle: L.Circle | undefined;

  ngAfterViewInit(): void {
    const { latitude, longitude } = this.currentLocation();
    this.map = L.map(this.mapElement.nativeElement, {
      center: [latitude, longitude],
      zoom: 10,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.radiusCircle = L.circle([latitude, longitude], {
      radius: RADIUS_KM * 1000,
      color: '#4169e1',
      fillColor: '#4169e1',
      fillOpacity: 0.13,
      weight: 2,
    }).addTo(this.map);
    this.renderMarkers();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  protected requestCurrentLocation(): void {
    if (!navigator.geolocation) {
      this.locationState.set('unavailable');
      this.locationMessage.set(
        'This browser does not support location. Sample locations remain on the map.',
      );
      return;
    }

    this.locationState.set('locating');
    this.locationMessage.set('Waiting for your location permission…');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        this.currentLocation.set(location);
        this.locationState.set('live');
        this.locationMessage.set(
          'Your browser location is shown for this visit only and is not saved.',
        );
        this.radiusCircle?.setLatLng([location.latitude, location.longitude]);
        this.map?.setView([location.latitude, location.longitude], 10);
        this.renderMarkers();
      },
      (error: GeolocationPositionError) => {
        this.locationState.set('unavailable');
        this.locationMessage.set(this.getLocationErrorMessage(error));
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 10_000 },
    );
  }

  private getLocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location permission was denied. Sample locations remain on the map.';
      case error.POSITION_UNAVAILABLE:
        return 'Your location is unavailable. Sample locations remain on the map.';
      case error.TIMEOUT:
        return 'Location request timed out. Please try again.';
      default:
        return 'Unable to read your location. Sample locations remain on the map.';
    }
  }

  private getSiteCoordinates(offset: SiteOffset): Coordinates {
    const location = this.currentLocation();
    const longitudeScale =
      METERS_PER_DEGREE * Math.cos((location.latitude * Math.PI) / 180);

    return {
      latitude: location.latitude + offset.northMeters / METERS_PER_DEGREE,
      longitude: location.longitude + offset.eastMeters / longitudeScale,
    };
  }

  private getDistanceKm(first: Coordinates, second: Coordinates): number {
    const radians = (degrees: number) => (degrees * Math.PI) / 180;
    const latitudeDifference = radians(second.latitude - first.latitude);
    const longitudeDifference = radians(second.longitude - first.longitude);
    const haversine =
      Math.sin(latitudeDifference / 2) ** 2 +
      Math.cos(radians(first.latitude)) *
        Math.cos(radians(second.latitude)) *
        Math.sin(longitudeDifference / 2) ** 2;

    return 6_371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  }

  private renderMarkers(): void {
    if (!this.map || !this.markerLayer) {
      return;
    }

    const { latitude, longitude } = this.currentLocation();
    this.markerLayer.clearLayers();
    L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: 'location-pin location-pin--current',
        html: '<span></span>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
      title: 'Current location',
      keyboard: true,
    })
      .bindPopup('Current location')
      .addTo(this.markerLayer);

    for (const site of this.sites()) {
      L.marker([site.latitude, site.longitude], {
        icon: L.divIcon({
          className: site.withinRadius
            ? 'location-pin location-pin--nearby'
            : 'location-pin location-pin--outside',
          html: '<span></span>',
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        }),
        title: `Sample site ${site.id}, ${site.distanceKm.toFixed(1)} km away`,
        keyboard: true,
      })
        .bindPopup(
          `Sample site ${site.id} · ${site.distanceKm.toFixed(1)} km from current location`,
        )
        .addTo(this.markerLayer);
    }
  }
}
