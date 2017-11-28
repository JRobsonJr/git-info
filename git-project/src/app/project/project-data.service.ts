import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';

import { Project } from "./project.model";
import { Commit, getCommits } from './../data-visualization/shared/commit-data';

@Injectable()
export class ProjectDataService implements OnInit {
  private projects: Array<Project> = [];
  result: any;

  constructor(private http: Http) {
    this.getProjects().subscribe(resp => {
      this.projects = resp;
    });
  }

  getProjects() {
    return this.http
      .get("/api/projects")
      .map(result => (this.result = result.json().data as Array<Project>));
  }

  getProject(id: number) {
    for (let project of this.projects) {
      if (project.id === id) {
        return project;
      }
    }

    return null;
  }

  getCommits(id: number) {
    return this.http.get("/api/project/" + id + "/commits").map(result => {
      this.result = result.json().data;
      let commitData: Array<Commit> = getCommits(this.result);
      console.log(commitData);
      return commitData;
    });
  }

  ngOnInit() {}
}
