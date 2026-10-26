import { Component, input } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import '../chart-modules';

@Component({
  selector: 'app-bar-chart',
  imports: [AgCharts],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {
  readonly label = input.required<string>();
  readonly options = input.required<AgChartOptions>();
}
