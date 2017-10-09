export class Project {
  name: string;
  url: string;
  commits: number;

  constructor(name?: string, url?: string) {
    this.name = name;
    this.url = url;
  }

  toString() {
    return this.name + ' available at: ' + this.url + '. It has been commited ' + this.commits + ' times by now.';
  }

  // ngOnInit() {}
}
