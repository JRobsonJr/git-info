import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Project } from './project.model';

@Injectable()
export class ProjectDataService implements OnInit {
  private projects: Project[] = [];
  result: any;

  constructor(private http: Http) { }

  getProjects() {
    return this.http.get("/api/projects")
      .map(result => this.result = result.json().data as Project[]);
  }

  updateProjects() {
    this.getProjects().subscribe(resp => {
      this.projects = resp;
    });
  }

  getProject(id: number) {
    this.updateProjects();
    for (let project of this.projects) {
      if (project.id === id) {
        return project;
      }
    }
    return null;
  }

  ngOnInit() { }
}
