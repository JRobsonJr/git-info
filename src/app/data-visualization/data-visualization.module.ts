import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DataVisualizationRoutingModule
  ],
  declarations: [
    BarChartComponent
  ]
})

export class DataVisualizationModule { }
