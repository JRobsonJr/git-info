const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let gitInfo = require('./../git-info');
let mongoose = require('mongoose');
let Project = require('./../models/project');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/git-projects', {
    useMongoClient: true,
});

const connection = (closure) => {
    return mongoose.connect('mongodb://localhost:27017/git-projects', {
        useMongoClient: true,
    }, (err, db) => {
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

router.get('/projects', (req, res) => {
    Project.find((err, projects) => {
        if (err) {
            res.send(err);
        }
        response.data = projects;
        res.json(response);
    });
});

router.post('/projects', function (req, res) {
    let project = new Project();

    project.name = req.body.name;
    project.id = req.body.id;
    project.path = req.body.path;
    
    gitInfo.getCommitNumber(project).then(() => {
        project.save((err) => {
            if (err) res.send(err);
            
            res.json({ message: 'Project created!' });
        })
    });
});

router.get('/project/:id', (req, res) => {
    Project.find({ id: req.params.id }, (err, project) => {
        if (err) res.send(err);

        response.data = project;
        res.json(response);
    });
});

// Editing
router.put('/project/:id', (req, res) => {
    Project.find({ id: req.params.id }, (err, project) => {
        if (err) res.send(err);

        gitInfo.getCommitInfo("C:/Users/jrobs/Documents/Projects/pomodoro/.git").then((array) => {
            response.data = array;
            res.json(response);
        });
    });
    // Project.findOneAndUpdate({ id: req.params.id }, { commits: 1989 }, (err, project) => {
    //     if (err) res.send(err);

    //     res.json({ message: "Project updated!" });
    // });
});

router.delete('/projects', (req, res) => {
    Project.remove({}, (err) => {
        if (err) res.send(err);

        res.json({ message: 'Successfully deleted' });
    });
});

module.exports = router;