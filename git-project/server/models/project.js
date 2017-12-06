let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
  name: String,
  path: String,
  id: { type: String, required: true, unique: true },
});

let Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
