import { Component, input } from '@angular/core';
import { AgCharts } from 'ag-charts-angular';
import { AgChartOptions } from 'ag-charts-community';
import '../chart-modules';

@Component({
  selector: 'app-donut-chart',
  imports: [AgCharts],
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.css',
})
export class DonutChart {
  readonly label = input.required<string>();
  readonly options = input.required<AgChartOptions>();
}
