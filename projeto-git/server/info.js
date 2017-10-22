let NodeGit = require("nodegit");

function getCommitNumber(projectPath) {
    let path = require("path").resolve("C:/Users/jrobs/Documents/CO/ProjetoP2 - Grupo de Rosbon/.git");
    return NodeGit.Repository.open(path).then(repo => {
        let walker = repo.createRevWalk(String);
        walker.pushHead();
        walker.getCommitsUntil(c => true).then(array => array.length);
    });
}

function addCommitNumbers(projects) {
    for (let project of projects) {
        project["commits"] = getCommitNumber(project.projectPath);
    }
}