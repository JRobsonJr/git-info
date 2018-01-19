import { Author } from './../shared/commit-data';

export class Project {
  name: string;
  path: string;
  commits: number;
  id: number;
  contributors: Array<Author>;
  commitFrequency: Array<any>;

  constructor(name?: string, path?: string, id?: number) {
    this.name = name;
    this.path = path;
    this.id = id;
    this.contributors = new Array<Author>();
    this.commitFrequency = new Array<any>();
  }
}
