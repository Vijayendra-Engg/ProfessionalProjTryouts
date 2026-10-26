import { Component } from '@angular/core';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import {
  productMixOptions,
  salesPerformanceOptions,
  salesTrendOptions,
} from '../../../shared/data/dashboard-data';

@Component({
  selector: 'app-sales-dashboard',
  imports: [BarChart, LineChart, MetricCard],
  templateUrl: './sales-dashboard.html',
  styleUrl: './sales-dashboard.css',
})
export class SalesDashboard {
  protected readonly performanceOptions = salesPerformanceOptions;
  protected readonly trendOptions = salesTrendOptions;
  protected readonly productOptions = productMixOptions;
}
