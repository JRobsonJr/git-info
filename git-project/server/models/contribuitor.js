let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ContributorSchema = require('mongoose').model('Commit').schema;

let ContributorSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  commits: Array,
  // id: { type: String, required: true, unique: true },
});

ContributorSchema.methods = {

  addCommit: function (commit) {
    this.commits.push({
      message: commit.message
    });

    return this.save();
  },

}

let Contributor = mongoose.model('Contributor', ContributorSchema);

module.exports = Contributor;
