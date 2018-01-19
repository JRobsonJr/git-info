import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectNotFoundComponent } from './project-not-found/project-not-found.component';
import { ContributorDetailComponent } from './contributor-detail/contributor-detail.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'notFound', component: ProjectNotFoundComponent },
  { path: 'project/:id', component: ProjectDetailComponent },
  { path: 'project/:id/contributor/:email', component: ContributorDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
