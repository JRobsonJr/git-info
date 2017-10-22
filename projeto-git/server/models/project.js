let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let info = require('./../info');

let projectSchema = new Schema({
  name: String,
  commits: Number,
  path: String,
  id: { type: String, required: true, unique: true },
});

projectSchema.methods.getCommitNumber = function () {
  this.commits = info.getCommitNumber(this.path);
}

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;