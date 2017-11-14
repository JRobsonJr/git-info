import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoomableDirective } from './d3/directives/zoomable.directive';
import { GraphComponent } from './visuals/graph/graph.component';
import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';
import { DraggableDirective } from './d3/directives/draggable.directive';
import { D3Service } from './d3/d3.service';
import { TestExampleComponent } from './test-example/test-example.component';
import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { TestExample2Component } from './test-example-2/test-example-2.component';
import { TestExample3Component } from './test-example-3/test-example-3.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DataVisualizationRoutingModule
  ],
  declarations: [
    DraggableDirective,
    ZoomableDirective,
    GraphComponent,
    TestExampleComponent,
    LinkVisualComponent,
    NodeVisualComponent,
    BarChartComponent,
    TestExample2Component,
    TestExample3Component,
    LineChartComponent
  ],
  providers: [D3Service]
})

export class DataVisualizationModule { }
