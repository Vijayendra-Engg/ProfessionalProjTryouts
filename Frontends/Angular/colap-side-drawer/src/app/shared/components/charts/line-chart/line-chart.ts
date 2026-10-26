import { Component, input } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import '../chart-modules';

@Component({
  selector: 'app-line-chart',
  imports: [AgCharts],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart {
  readonly label = input.required<string>();
  readonly options = input.required<AgChartOptions>();
}
