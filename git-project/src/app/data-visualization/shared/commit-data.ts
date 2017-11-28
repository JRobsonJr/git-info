import { JsonObject } from "@angular-devkit/core/src";

export class Commit {
  date: Date;
  message: string;
  modifications: Array<Modification>;
}

export class Modification {
  type: string;
  path: string;

  toString() {
    return this.type + ": " + this.path;
  }
}

export function getCommits(commitJson) {
  let commitData: Array<Commit> = [];

  for (let commit of commitJson) {
    let commitObject: Commit = convertToCommitObject(commit);
    commitData.push(commitObject);
  }

  return commitData;
}

export function convertToCommitObject(commitJson) {
  let commit: Commit = new Commit();
  commit.date = commitJson.date;
  commit.message = commitJson.message;
  let modifications: Array<Modification> = [];

  for (let modificationJson of commitJson.info) {
    let modificationObject: Modification = modificationJson as Modification;
    modifications.push(modificationObject);
  }

  commit.modifications = modifications;

  return commit;
}
