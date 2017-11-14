import { TestExample3Component } from './test-example-3/test-example-3.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestExampleComponent } from './test-example/test-example.component';
import { TestExample2Component } from './test-example-2/test-example-2.component';

const appRoutes: Routes = [
  { path: 'example', component: TestExampleComponent },
  { path: 'bar-chart', component: TestExample2Component },
  { path: 'line-chart', component: TestExample3Component }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DataVisualizationRoutingModule { }
