import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { Project } from "./project.model";
import { Commit, getCommits, Author } from "./../shared/commit-data";

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
        project.commits = new Array<Commit>();
        return project;
      }
    }

    return null;
  }

  getCommits(id: number) {
    return this.http.get("/api/project/" + id + "/commits").map(result => {
      this.result = result.json().data;
      let commitData: Array<Commit> = getCommits(this.result);
      return commitData;
    });
  }

  getContributors(id: number) {
    return this.http.get("/api/project/" + id + "/contributors").map(result => {
      this.result = result.json().data;
      let contributors: Array<Author> = this.result as Array<Author>;
      return contributors;
    });
  }

  getContributor(projectId: number, contributorEmail: string) {
    return this.http
      .get("/api/project/" + projectId + "/contributor/" + contributorEmail)
      .map(result => {
        this.result = result.json().data;
        let contributor: Author = new Author();
        contributor.name = this.result.name;
        contributor.email = this.result.email;
        contributor.commits = getCommits(this.result.commits);
        return contributor;
      });
  }

  getCommitFrequency(id: number) {
    return this.http
      .get("/api/project/" + id + "/commit-frequency")
      .map(result => {
        this.result = result.json().data as Array<any>;
        let commitFrequency: Array<any> = new Array<any>();

        for (let data of this.result) {
          commitFrequency.push({
            date: new Date(data.date),
            value: data.occurrences
          });
        }

        return commitFrequency;
      });
  }

  ngOnInit() {}
}
