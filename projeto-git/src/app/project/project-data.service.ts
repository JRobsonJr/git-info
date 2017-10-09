import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Project } from './project.model';

@Injectable()
export class ProjectDataService implements OnInit {

  // static criouNovoProject = new EventEmitter<Project>();

  ngOnInit() {}

  private projects: Project[] = [];
  
  addProject(project: Project) {
    this.projects.push(project);
  }

  getProjects() {
    return this.projects;
  }
}
