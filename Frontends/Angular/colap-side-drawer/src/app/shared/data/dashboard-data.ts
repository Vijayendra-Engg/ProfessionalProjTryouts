import {
  AgCartesianChartOptions,
  AgPolarChartOptions,
} from 'ag-charts-community';

const chartColors = {
  blue: '#4169e1',
  teal: '#38a89d',
  violet: '#8c74dd',
  gold: '#e9ad4b',
  rose: '#e77c87',
  grid: '#e9edf4',
  labels: '#657187',
};

const createAxes = (
  yAxisTitle?: string,
): NonNullable<AgCartesianChartOptions['axes']> => ({
  x: {
    type: 'category',
    position: 'bottom',
    label: { color: chartColors.labels },
    line: { stroke: chartColors.grid },
  },
  y: {
    type: 'number',
    position: 'left',
    ...(yAxisTitle ? { title: { text: yAxisTitle } } : {}),
    label: { color: chartColors.labels },
    gridLine: { style: [{ stroke: chartColors.grid, lineDash: [3, 3] }] },
  },
});

export const overviewRevenueOptions: AgCartesianChartOptions = {
  data: [
    { month: 'Jan', actual: 86, target: 78 },
    { month: 'Feb', actual: 92, target: 82 },
    { month: 'Mar', actual: 88, target: 84 },
    { month: 'Apr', actual: 108, target: 88 },
    { month: 'May', actual: 117, target: 93 },
    { month: 'Jun', actual: 128, target: 98 },
  ],
  series: [
    {
      type: 'line',
      xKey: 'month',
      yKey: 'actual',
      yName: 'Revenue',
      stroke: chartColors.blue,
      strokeWidth: 3,
      marker: { enabled: true, size: 5 },
    },
    {
      type: 'line',
      xKey: 'month',
      yKey: 'target',
      yName: 'Target',
      stroke: chartColors.teal,
      strokeWidth: 2,
      lineDash: [5, 4],
      marker: { enabled: false },
    },
  ],
  axes: createAxes('Revenue ($k)'),
  legend: { position: 'bottom' },
};

export const overviewRegionOptions: AgCartesianChartOptions = {
  data: [
    { region: 'North', revenue: 82 },
    { region: 'South', revenue: 68 },
    { region: 'East', revenue: 95 },
    { region: 'West', revenue: 77 },
    { region: 'Central', revenue: 59 },
  ],
  series: [
    {
      type: 'bar',
      xKey: 'region',
      yKey: 'revenue',
      yName: 'Revenue ($k)',
      fill: chartColors.blue,
      cornerRadius: 5,
    },
  ],
  axes: createAxes(),
};

export const channelMixOptions: AgPolarChartOptions = {
  data: [
    { channel: 'Direct', value: 38 },
    { channel: 'Partner', value: 27 },
    { channel: 'Online', value: 21 },
    { channel: 'Other', value: 14 },
  ],
  series: [
    {
      type: 'donut',
      angleKey: 'value',
      calloutLabelKey: 'channel',
      fills: [chartColors.blue, chartColors.teal, chartColors.violet, chartColors.gold],
      innerRadiusRatio: 0.68,
    },
  ],
  legend: { position: 'bottom' },
};

export const salesPerformanceOptions: AgCartesianChartOptions = {
  data: [
    { month: 'Jan', bookings: 42, closed: 31 },
    { month: 'Feb', bookings: 49, closed: 36 },
    { month: 'Mar', bookings: 46, closed: 39 },
    { month: 'Apr', bookings: 58, closed: 43 },
    { month: 'May', bookings: 63, closed: 49 },
    { month: 'Jun', bookings: 71, closed: 55 },
  ],
  series: [
    {
      type: 'bar',
      xKey: 'month',
      yKey: 'bookings',
      yName: 'Bookings',
      fill: chartColors.blue,
      cornerRadius: 4,
    },
    {
      type: 'bar',
      xKey: 'month',
      yKey: 'closed',
      yName: 'Closed won',
      fill: chartColors.teal,
      cornerRadius: 4,
    },
  ],
  axes: createAxes('Opportunities'),
  legend: { position: 'bottom' },
};

export const salesTrendOptions: AgCartesianChartOptions = {
  data: [
    { week: 'W1', revenue: 72 },
    { week: 'W2', revenue: 78 },
    { week: 'W3', revenue: 75 },
    { week: 'W4', revenue: 89 },
    { week: 'W5', revenue: 94 },
    { week: 'W6', revenue: 105 },
    { week: 'W7', revenue: 111 },
    { week: 'W8', revenue: 124 },
  ],
  series: [
    {
      type: 'area',
      xKey: 'week',
      yKey: 'revenue',
      yName: 'Revenue ($k)',
      fill: chartColors.blue,
      fillOpacity: 0.13,
      stroke: chartColors.blue,
      strokeWidth: 3,
      marker: { enabled: false },
    },
  ],
  axes: createAxes(),
};

export const productMixOptions: AgCartesianChartOptions = {
  data: [
    { product: 'Platform', revenue: 74 },
    { product: 'Analytics', revenue: 58 },
    { product: 'Services', revenue: 46 },
    { product: 'Support', revenue: 31 },
  ],
  series: [
    {
      type: 'bar',
      xKey: 'product',
      yKey: 'revenue',
      yName: 'Revenue ($k)',
      fill: chartColors.violet,
      cornerRadius: 5,
    },
  ],
  axes: createAxes(),
};

export const operationsVolumeOptions: AgCartesianChartOptions = {
  data: [
    { day: 'Mon', orders: 46 },
    { day: 'Tue', orders: 58 },
    { day: 'Wed', orders: 53 },
    { day: 'Thu', orders: 71 },
    { day: 'Fri', orders: 68 },
    { day: 'Sat', orders: 42 },
    { day: 'Sun', orders: 35 },
  ],
  series: [
    {
      type: 'bar',
      xKey: 'day',
      yKey: 'orders',
      yName: 'Orders',
      fill: chartColors.teal,
      cornerRadius: 4,
    },
  ],
  axes: createAxes(),
};
