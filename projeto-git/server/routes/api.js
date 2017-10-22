const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
let info = require('./../info.js');
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

// router.get('/projects', (req, res) => {
//     connection((db) => {
//         db.collection('projects')
//             .find()
//             .toArray()
//             .then((projects) => {
//                 response.data = projects;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });

router.post('/projects', function (req, res) {
    let project = new Project();
    project.name = req.body.name;
    project.id = req.body.id;
    project.path = req.body.path;
    
    project.save(function (err) {
        if (err)
            res.send(err);

        res.json({ message: 'Project created!' });
    });

});            

router.post('/projects', (req, res) => {
    connection((db) => {
        db.collection('projects')
            .find()
            .toArray()
            .then((projects) => {
                info.addCommitNumbers(projects);
                response.data = projects;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;