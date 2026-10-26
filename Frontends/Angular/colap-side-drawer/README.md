# Northstar dashboards

An Angular 22 dashboard starter with a collapsible Material side navigation,
three lazy-loaded business dashboards, reusable AG Charts components, and an
interactive Leaflet location map.

## Start the app

```bash
npm install
npm start
```

Open `http://localhost:4200/`. The development server allows access to the
dashboards and map without sign-in so you can preview the UI. Production builds
keep the authentication guard enabled and redirect to the sign-in setup page
until an authentication provider is connected.

## Authentication integration

The route guard reads the `AUTHENTICATED` injection token in
`src/app/core/services/authentication.service.ts`. In production it defaults to
unauthenticated, so the UI does not grant access based on a mock or
browser-stored credential. A separate development-only bypass lets you preview
the dashboards locally; it is disabled in production builds. Provide the token
from your authentication integration in the application bootstrap providers,
for example:

```ts
{
  provide: AUTHENTICATED,
  useFactory: () => {
    const auth = inject(YourAuthenticationService);
    return () => auth.isAuthenticated();
  },
}
```

Import `inject` from `@angular/core` and replace
`YourAuthenticationService` with the provider used by your application.
Protect APIs and data on the server as well; a client-side route guard is only
a navigation control, not an authorization boundary.

## Dashboards and shared components

- `/dashboard` — executive metrics, revenue trend, channel mix, and regional
  performance.
- `/dashboard/sales` — pipeline, bookings, revenue momentum, and product mix.
- `/dashboard/operations` — fulfillment metrics, a location map, and daily
  order volume.

The standalone `app-line-chart`, `app-bar-chart`, and `app-donut-chart`
components live under `src/app/shared/components/charts`. Each accepts typed
AG Charts options and a text label. `app-metric-card` and `app-location-map`
are shared components too. Dashboard sample data is kept in
`src/app/shared/data/dashboard-data.ts`; replace it with data from your API
before using the metrics operationally.

## Location map

The map uses Leaflet with OpenStreetMap tiles and includes the required
OpenStreetMap attribution. It starts with clearly identified sample sites near
San Francisco. The user must activate **Use my location** before the browser
geolocation API is called. A 12 km translucent circle is drawn around the
current pin; sample site pins use separate colors for locations inside and
outside the radius. Browser coordinates are held only in component memory for
the current visit and are not persisted or sent to an API. Geolocation requires
a secure context (HTTPS, or localhost).

OpenStreetMap's public tile service is suitable for development and light
usage. Review its tile usage policy and use a hosted tile provider or
self-hosted tiles for production traffic. Tile requests disclose the visitor's
IP address to the tile provider.

## Build and test

```bash
npm run build
npm test -- --watch=false
```

The application uses Angular Material 22, `ag-charts-angular`,
`ag-charts-community`, and Leaflet. Production deployment should also configure
an authentication provider, API-backed dashboard data, HTTPS, and the
appropriate tile service and privacy notices.
