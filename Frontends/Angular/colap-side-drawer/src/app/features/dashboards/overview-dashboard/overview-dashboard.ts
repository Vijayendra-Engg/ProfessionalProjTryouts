import { Component } from '@angular/core';
import { BarChart } from '../../../shared/components/charts/bar-chart/bar-chart';
import { DonutChart } from '../../../shared/components/charts/donut-chart/donut-chart';
import { LineChart } from '../../../shared/components/charts/line-chart/line-chart';
import { MetricCard } from '../../../shared/components/metric-card/metric-card';
import {
  channelMixOptions,
  overviewRegionOptions,
  overviewRevenueOptions,
} from '../../../shared/data/dashboard-data';

@Component({
  selector: 'app-overview-dashboard',
  imports: [BarChart, DonutChart, LineChart, MetricCard],
  templateUrl: './overview-dashboard.html',
  styleUrl: './overview-dashboard.css',
})
export class OverviewDashboard {
  protected readonly revenueOptions = overviewRevenueOptions;
  protected readonly regionOptions = overviewRegionOptions;
  protected readonly channelOptions = channelMixOptions;
}
