import { NodeVisualComponent } from './visuals/shared/node-visual/node-visual.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomableDirective } from './d3/directives/zoomable.directive';

import { GraphComponent } from './visuals/graph/graph/graph.component';
import { DraggableDirective } from './d3/directives/draggable.directive';
import { D3Service } from './d3/d3.service';
import { TestExampleComponent } from './test-example/test-example.component';
import { DataVisualizationRoutingModule } from './data-visualization-routing.module';
import { LinkVisualComponent } from './visuals/shared/link-visual/link-visual.component';

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
    NodeVisualComponent
  ],
  providers: [D3Service]
})

export class DataVisualizationModule { }
