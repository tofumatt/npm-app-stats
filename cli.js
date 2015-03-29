var appStats = require('./index.js');

appStats.getDownloads(appStats.modules).then(function(moduleStats) {
  console.log(moduleStats);

  var grandTotal = 0;

  for (var i in moduleStats) {
    grandTotal += moduleStats[i].totalDownloads;
  }

  console.log();

  console.log('Total downloads:', grandTotal);
});
