let Project = require('./models/project');

let newProject = Project({
    name: 'Pomodoro',
    id: 0,
    path: 'C://Users//jrobs//Documents//Projects//pomodoro'
});

newProject.save((err) => {
    if(err) console.log(err);
    console.log('Success!!!!1');
});

Project.find({}, (err, projects) => {
    if (err) console.log(err);
    console.log(projects);
})

Project.findById