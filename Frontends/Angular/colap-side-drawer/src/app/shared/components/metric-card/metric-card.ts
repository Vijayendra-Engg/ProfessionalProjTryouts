import { Component, input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.html',
  styleUrl: './metric-card.css',
})
export class MetricCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly change = input.required<string>();
  readonly icon = input.required<string>();
  readonly positive = input(true);
}
