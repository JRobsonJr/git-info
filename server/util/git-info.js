let NodeGit = require("nodegit");
let Project = require("./../models/project");
let _ = require("underscore");
let moment = require("moment");

module.exports = {
  getRawCommitArray(projectPath) {
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

    return this.getCommits(projectPath)
      .then(commitArray => {
        for (let commit of commitArray) {
          let author = commit.author;
          if (!this.containsContributor(contributors, author.email)) {
            contributors.push(author);
          }
        }
        return contributors;
      })
      .catch(err => console.log(err));
  },

  containsContributor(contributors, contributorEmail) {
    for (contributor of contributors) {
      if (contributor.email === contributorEmail) {
        return true;
      }
    }
    return false;
  },

  getCommits(projectPath) {
    let commits = [];

    return this.getRawCommitArray(projectPath)
      .then(async commitArray => {
        for (commit of commitArray) {
          let diffInfo = await this.getDiffInfo(commit);
          commits.push({
            author: {
              name: commit.author().name(),
              email: commit.author().email()
            },
            modifications: diffInfo,
            message: commit.message(),
            date: commit.date()
          });
        }
        return this.sortCommitsByDate(commits);
      })
      .catch(err => console.log(err));
  },

  getCommitFrequency(path) {
    return this.getCommits(path).then(commitArray => {
      let dateArray = [];

      for (let commit of commitArray) {
        dateArray.push(commit.date);
      }

      let occurrenceDay = occurrence => {
        return moment(occurrence)
          .startOf("day")
          .format();
      };

      let groupToDay = (group, day) => {
        return {
          day: day,
          times: group
        };
      };

      let result = _.chain(dateArray)
        .groupBy(occurrenceDay)
        .map(groupToDay)
        .sortBy("day")
        .value();

      let array = [];

      for (data of result) {
        array.push({ date: data.day.slice(0, 10), value: data.times.length });
      }

      return array;
    });
  },

  getCommitsByContributor(projectPath, contributorEmail) {
    let contributorCommits = [];

    return this.getCommits(projectPath)
      .then(commits => {
        return commits.filter(
          commit => commit.author.email == contributorEmail
        );
      })
      .catch(err => console.log(err));
  },

  getContributor(projectPath, contributorEmail) {
    return this.getCommitsByContributor(projectPath, contributorEmail)
      .then(commits => {
        let contributor = {
          name: commits[0].author.name,
          email: commits[0].author.email,
          modifications: commits,
        };
        return contributor;
      })
      .catch(err => console.log(err));
  },

  async getDiffInfo(commit) {
    let diffList = await commit.getDiff();
    let diffInfo = [];

    for (diff of diffList) {
      const patches = await diff.patches();
      patches.forEach(patch => {
        let patchType = this.checkPatchType(patch);
        console.log(patchType, patch.lineStats());
        if (diffInfo.indexOf(patchType) === -1) diffInfo.push(patchType);
      });
    }

    return diffInfo.filter((element, index) => {
      return diffInfo.indexOf(element) == index;
    });
  },

  checkPatchType(patch) {
    const patchTypes = ["OTHER", "ADDED", "DELETED", "MODIFIED"];

    let status = patch.status();

    if (status > 3) status = 0;

    return {
      type: patchTypes[status],
      path: patch.newFile().path()
    };
  },

  isCommitByContributor(commit, contributorEmail) {
    return commit.author().email() === contributorEmail;
  },

  sortCommitsByDate(commitArray) {
    return commitArray.sort((a, b) => {
      return a.date < b.date ? -1 : 1;
    });
  }
};
