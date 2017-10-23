let NodeGit = require("nodegit");

module.exports = {
    getCommitNumber(projectPath) {
        let path = require("path").resolve(projectPath);
        return NodeGit.Repository.open(path).then(repo => {
            let walker = repo.createRevWalk(String);
            walker.pushHead();
            walker.getCommitsUntil(c => true).then((array) => { return array.length });
        });
    }
}

function addCommitNumbers(projects) {
    for (let project of projects) {
        project["commits"] = getCommitNumber(project.projectPath);
    }
}