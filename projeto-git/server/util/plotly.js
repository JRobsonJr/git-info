let plotly = require('plotly')("jrobsonjr", "I9he56sP5EAne1WzpClN");
let _ = require('underscore');
let moment = require('moment');
let gitInfo = require('./git-info');

module.exports = {
  plotCommitFrequency(path) {
    gitInfo.getCommitArray(path).then((commitArray) => {
      let dateArray = [];

      for (let i = 0; i < commitArray.length; i++) {
        let commit = commitArray[i];
        dateArray.push(commit.date());
      };

      let occurrenceDay = (occurrence) => {
        return moment(occurrence).startOf('day').format();
      };

      let groupToDay = (group, day) => {
        return {
          day: day,
          times: group
        }
      };

      let result = _.chain(dateArray)
        .groupBy(occurrenceDay)
        .map(groupToDay)
        .sortBy('day')
        .value();

      let x = [];
      let y = [];

      for (let i = 0; i < result.length; i++) {
        let day = result[i];
        x.push(day.day);
        y.push(day.times.length);
      }

      plot(x, y);
    }).catch((err) => console.log(err));
  }
}

function plot(x, y) {
  let data = [
    {
      x: x,
      y: y,
      type: "scatter"
    }
  ];

  let graphOptions = { filename: "date-axes", fileopt: "overwrite" };
  plotly.plot(data, graphOptions, (err, msg) => {
    console.log(msg.url);
  });
}