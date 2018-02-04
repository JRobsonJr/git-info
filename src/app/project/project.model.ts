import { Author, Commit } from './../shared/commit-data';

export class Project {
  name: string;
  path: string;
  commits: Array<Commit>;
  id: number;
  contributors: Array<Author>;
  commitFrequency: Array<any>;

  constructor(name?: string, path?: string, id?: number) {
    this.name = name;
    this.path = path;
    this.id = id;
    this.commits = new Array<Commit>();
    this.contributors = new Array<Author>();
    this.commitFrequency = new Array<any>();
  }
}
