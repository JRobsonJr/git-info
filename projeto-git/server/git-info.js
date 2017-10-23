let NodeGit = require("nodegit");
let Project = require('./models/project');

module.exports = {
    getCommitNumber(project) {
        let globalCommits = 0;
        let path = require("path").resolve(project.path);

        return NodeGit.Repository.open(path).then(repo => {
            let walker = repo.createRevWalk(String);
            walker.pushGlob('refs/heads/*');
            return walker.getCommitsUntil(c => true)
                .then((array) => {
                    project.commits = array.length;
                    console.log(project.commits);
                }).catch((err) => console.log(err));
        });
    }
}