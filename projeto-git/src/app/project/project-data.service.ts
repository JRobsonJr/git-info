import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Project } from './project.model';

@Injectable()
export class ProjectDataService implements OnInit {

  mockProject1 = new Project('Projeto de P2', 'git.com/projetop2', 0);
  mockProject2 = new Project('Projeto de SI', 'git.com/projetoSI', 1);

  private projects: Project[] = [this.mockProject1, this.mockProject2];

  getProjects() {
    return this.projects;
  }

  getProject(id: number) {
    let projects = this.getProjects();
    for (let project of projects) {
      if (project.id === id) {
        return project;
      }
    }
    return null;
  }

  ngOnInit() {

  }
}
