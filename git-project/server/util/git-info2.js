let NodeGit = require("nodegit");
var NodeGitKit = require("nodegit-kit");
let Project = require("./../models/project");

module.exports = {
  getCommitNumber(project) {
    let path = require("path").resolve(project.path);
    return NodeGit.Repository.open(path).then(repo => {
      let walker = repo.createRevWalk(String);
      walker.pushGlob("refs/heads/*");
      return walker
        .getCommitsUntil(c => true)
        .then(array => {
          project.commits = array.length;
          project.commitArray = array;
        })
        .catch(err => console.log(err));
    });
  },

  getCommitArray(projectPath) {
    let path = require("path").resolve(projectPath);
    return NodeGit.Repository.open(path).then(repo => {
      let walker = repo.createRevWalk(String);
      walker.sorting(NodeGit.Revwalk.SORT.Time);
      walker.pushGlob("refs/heads/*");
      return walker
        .getCommitsUntil(c => true)
        .then(array => {
          return array;
        })
        .catch(err => console.log(err));
    });
  },

  sortCommitsByDate(commitArray) {
    return commitArray.sort((a, b) => {
      return a.date() < b.date() ? -1 : 1;
    });
  },

  getContributors(projectPath) {
    let contributors = [];

    return this.getCommitArray(projectPath)
      .then(commitArray => {
        for (let commit of commitArray) {
          if (contributors.indexOf(commit.author().email()) === -1) {
            contributors.push(commit.author().email());
          }
        }
        return contributors;
      })
      .catch(err => console.log(err));
  },

  isCommitByContributor(commit, contributorEmail) {
    return commit.author().email() === contributorEmail;
  },

  getModificationsByContributor(projectPath, contributorEmail) {
    let modifications = [];

    return this.getCommitsByContributor(projectPath, contributorEmail)
      .then(commitArray => {
        for (commit of commitArray) {
          let diffInfo = await this.getDiffInfo(commit);
          modifications.push(diffInfo);
        }
        return modifications;
      })
      .catch(err => console.log(err));
  },

  getCommitsByContributor(projectPath, contributorEmail) {
    let commits = [];

    return this.getCommitArray(projectPath)
      .then(commitArray => {
        for (let commit of commitArray) {
          if (this.isCommitByContributor(commit, contributorEmail)) {
            commits.push(commit);
          }
        }
        return commits;
      })
      .catch(err => console.log(err));
  },

  async getDiffInfo(commit) {
    let diffList = await commit.getDiff();
    let diffInfo = [];

    for (diff of diffList) {
      const patches = await diff.patches();
      patches.forEach(patch => {
        diffInfo.push(this.checkPatchType(patch));
      })
    }

    return diffInfo;
  },

  checkPatchType(patch) {
    if (patch.isAdded()) {
      return ("ADDED: " + patch.newFile().path());
    } else if (patch.isModified()) {
      return ("MODIFIED: " + patch.newFile().path());
    } else {
      return ("EOQ");
    }
  },

  getDiffInformations(commit) {
    return commit.getDiff().done(diffList => {
      diffList.forEach(function (diff) {
        diff.patches().then(function (patches) {
          patches.forEach(function (patch) {
            patch.hunks().then(function (hunks) {
              hunks.forEach(function (hunk) {
                hunk.lines().then(function (lines) {
                  console.log(
                    "diff",
                    patch.oldFile().path(),
                    patch.newFile().path()
                  );
                  console.log(hunk.header().trim());
                  lines.forEach(function (line) {
                    //    console.log(
                    //    String.fromCharCode(line.origin()) + line.content().trim()
                    // );
                  });
                });
              });
            });
          });
        });
      });
    });
  }
};
