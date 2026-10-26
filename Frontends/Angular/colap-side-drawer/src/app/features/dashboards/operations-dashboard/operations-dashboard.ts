import { Component } from '@angular/core';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';
import { LocationMap } from '../../../shared/components/location-map/location-map';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import { operationsVolumeOptions } from '../../../shared/data/dashboard-data';

@Component({
  selector: 'app-operations-dashboard',
  imports: [BarChart, LocationMap, MetricCard],
  templateUrl: './operations-dashboard.html',
  styleUrl: './operations-dashboard.css',
})
export class OperationsDashboard {
  protected readonly volumeOptions = operationsVolumeOptions;
}
