let NodeGit = require("nodegit");
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

  getModifications(projectPath) {
    let modifications = [];

        return this.getCommitArray(projectPath)
          .then(async commitArray => {
            for (commit of commitArray) {
              let diffInfo = await this.getDiffInfo(commit);
              modifications.push({
                info: diffInfo,
                message: commit.message(),
                date: commit.date()
              });
            }
            return this.sortCommitsByDate(modifications);
          })
          .catch(err => console.log(err));
  },

  getModificationsByContributor(projectPath, contributorEmail) {
    let modifications = [];

    return this.getCommitsByContributor(projectPath, contributorEmail)
      .then(async commitArray => {
        for (commit of commitArray) {
          let diffInfo = await this.getDiffInfo(commit);
          modifications.push({
            info: diffInfo,
            message: commit.message(),
            date: commit.date()
          });
        }
        return this.sortCommitsByDate(modifications);
      })
      .catch(err => console.log(err));
  },

  getCommitsByContributor(projectPath, contributorEmail) {
    let commits = [];

    return this.getCommitArray(projectPath)
      .then(commitArray => {
        for (commit of commitArray) {
          if (this.isCommitByContributor(commit, contributorEmail)) {
            commits.push(commit);
          }
        }
        return commits;
      })
      .catch(error => console.log(error));
  },

  async getDiffInfo(commit) {
    let diffList = await commit.getDiff();
    let diffInfo = [];

    for (diff of diffList) {
      const patches = await diff.patches();
      patches.forEach(patch => {
        let patchType = this.checkPatchType(patch);
        if (diffInfo.indexOf(patchType) === -1) diffInfo.push(patchType);
      });
    }

    return diffInfo.filter((element, index) => {
		  return diffInfo.indexOf(element) == index;
	});
  },

  checkPatchType(patch) {
    if (patch.isAdded()) {
      return {
        type: "ADDED",
        path: patch.newFile().path()
      };
    } else if (patch.isModified()) {
      return {
        type: "MODIFIED",
        path: patch.newFile().path()
      };
    } else {
      return {
        type: "?????",
        path: patch.newFile().path()
      };
    }
  },

  isCommitByContributor(commit, contributorEmail) {
    return commit.author().email() === contributorEmail;
  },

  sortCommitsByDate(commitArray) {
    return commitArray.sort((a, b) => {
      return a["date"] < b["date"] ? -1 : 1;
    });
  },
};
