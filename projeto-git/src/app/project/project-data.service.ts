import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Project } from './project.model';

@Injectable()
export class ProjectDataService implements OnInit {
  private projects: Project[] = [];
  result: any;

  constructor(private http: Http) {
    this.getProjects().subscribe(resp => {
      this.projects = resp;
    });
  }

  getProjects() {
    return this.http.get("/api/projects")
      .map(result => { return this.result = result.json().data as Project[] });
  }

  getProject(id: number) {
    for (let project of this.projects) {
      if (project.id === id) {
        return project;
      }
    }
    
    return null;
  }

  ngOnInit() {
  }
}
