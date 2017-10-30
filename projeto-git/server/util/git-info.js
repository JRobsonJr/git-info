let NodeGit = require("nodegit");
let Project = require('./../models/project');

module.exports = {
    getCommitNumber(project) {
        let path = require("path").resolve(project.path);
        return NodeGit.Repository.open(path).then(repo => {
            let walker = repo.createRevWalk(String);
            walker.pushGlob('refs/heads/*');
            return walker.getCommitsUntil(c => true)
                .then((array) => {
                    project.commits = array.length;
                    project.commitArray = array;
                }).catch((err) => console.log(err));
        });
    },

    getCommitArray(projectPath) {
        let path = require("path").resolve(projectPath);
        return NodeGit.Repository.open(path).then(repo => {
            let walker = repo.createRevWalk(String);
            walker.pushGlob('refs/heads/*');
            return walker.getCommitsUntil(c => true)
                .then((array) => {
                    return array;
                }).catch((err) => console.log(err));
        });
    },
}