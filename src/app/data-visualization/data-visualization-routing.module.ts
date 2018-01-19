import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestExampleComponent } from './test-example/test-example.component';
import { TestExample2Component } from './test-example-2/test-example-2.component';

const appRoutes: Routes = [
  { path: 'example', component: TestExampleComponent },
  { path: 'bar-chart', component: TestExample2Component }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DataVisualizationRoutingModule { }
