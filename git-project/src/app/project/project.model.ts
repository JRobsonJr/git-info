export class Project {
  name: string;
  url: string;
  commits: number;
  id: number;

  constructor(name?: string, url?: string, id?: number) {
    this.name = name;
    this.url = url;
    this.id = id;
  }

  toString() {
    return this.name + ' available at: ' + this.url + '. It has been commited ' + this.commits + ' times by now.';
  }

  // ngOnInit() {}
}
