let NodeGit = require("nodegit");
let Project = require('./models/project');

module.exports = {
    getCommitNumber(project) {
        let path = require("path").resolve(project.path);

        return NodeGit.Repository.open(path).then(repo => {
            let walker = repo.createRevWalk(String);
            walker.pushGlob('refs/heads/*');
            return walker.getCommitsUntil(c => true)
                .then((array) => {
                    project.commits = array.length;
                }).catch((err) => console.log(err));
        });
    }
}