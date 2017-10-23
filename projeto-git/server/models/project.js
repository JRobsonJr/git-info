let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let projectSchema = new Schema({
  name: String,
  commits: Number,
  path: String,
  id: { type: String, required: true, unique: true },
});

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;