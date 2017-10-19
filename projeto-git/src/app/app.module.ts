import { ProjectDataService } from './project/project-data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectNotFoundComponent } from './project-not-found/project-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProjectDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
