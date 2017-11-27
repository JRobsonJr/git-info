let mongoose = require('mongoose');
let Schema = mongoose.Schema;
// let ContributorSchema = require('mongoose').model('Contributor').schema;

let ProjectSchema = new Schema({
  name: String,
  commits: Number,
  path: String,
  id: { type: String, required: true, unique: true },
  // contributors: [ContributorSchema]
});

/*
ProjectSchema.methods = {

    addContributor: function (contributor) {
      this.contributors.push(contributor);

      return this.save();
    },

  } */

let Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
