import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Project } from './project.model';

@Injectable()
export class ProjectDataService implements OnInit {

  // static criouNovoProject = new EventEmitter<Project>();
  testingProject = new Project('Aaa', 'aaa', 0);
  testingProject2 = new Project('Bbb', 'aaa', 1);
  
  private projects: Project[] = [this.testingProject, this.testingProject2];

  getProjects() {
    return this.projects;
  }

  getProject(id: number) {
    let projects = this.getProjects();
    for (let project of projects) {
      if (project.id == id) {
        return project;
      }
    }
    return null;
  }

  ngOnInit() {

  }
}
