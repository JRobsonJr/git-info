export class Project {
  name: string;
  email: string;
  commits: number;

  constructor(name?: string, email?: string) {
    this.name = name;
  }
}
