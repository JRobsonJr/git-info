import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestExampleComponent } from './test-example/test-example.component';

const appRoutes: Routes = [
  { path: '/example', component: TestExampleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule]
})
export class DataVisualizationRoutingModule { }
