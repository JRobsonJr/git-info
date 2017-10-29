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
    },

    getCommitInfo(projectPath) {
        let path = require("path").resolve(projectPath);

        return NodeGit.Repository.open(path).then((repo) => repo.getMasterCommit())
            .then((masterCommit) => {
                let eventEmitter = masterCommit.history(NodeGit.Revwalk.SORT.REVERSE);

                let array = [];

                eventEmitter.on("commit", (commit) => {
                    return commitInfo = {
                        "authorName": commit.author().name(),
                        "authorEmail": commit.author().email(),
                        "date": commit.date(),
                        "message": commit.message()
                    };
                    
                    //console.log(commitInfo);
                    
                }).once(());

                eventEmitter.start();

               console.log(array);
            });
    }
}