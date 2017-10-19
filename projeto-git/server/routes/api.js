const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let NodeGit = require("nodegit");

// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/git-projects', (err, db) => {
        if (err) return console.log(err);

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

function getCommitNumber(project) {
    let path = require("path").resolve("C:/Users/jrobs/Documents/CO/ProjetoP2 - Grupo de Rosbon/.git");
    return NodeGit.Repository.open(path).then(repo => {
        let walker = repo.createRevWalk(String);
        walker.pushHead();
        walker.getCommitsUntil(c => true).then(array => array.length);
    });
}

function addCommitNumbers(projects) {
    for (let project of projects) {
        project["commits"] = getCommitNumber(project);
    }
}

router.get('/projects', (req, res) => {
    connection((db) => {
        db.collection('projects')
            .find()
            .toArray()
            .then((projects) => {
                addCommitNumbers(projects);
                response.data = projects;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;