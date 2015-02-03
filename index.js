'use strict';

var Promise = require('es6-promise').Promise;

var registry = require('npm-stats')();//(['registry.npmjs.org', {}]);

var modules = [
  'firefox',
  'localforage',
  'node-firefox-build-tools',
  'node-firefox-connect',
  'node-firefox-find-app',
  'node-firefox-find-ports',
  'node-firefox-find-simulators',
  'node-firefox-launch-app',
  'node-firefox-install-app',
  'node-firefox-reload-css',
  'node-firefox-start-simulator',
  'node-firefox-uninstall-app'
];

// The npm-stats library will convert this to a real JS date for us.
var moduleStats = {};
var startDate = '2015-01-01';
var grandTotal = 0;

function getDownloadsForModules(modulesToGet) {
  return new Promise(function(resolve) {
    modulesToGet.forEach(function(module) {
      registry.module(module).downloads({ since: startDate }, function(options, downloads) {
        moduleStats[module] = { totalDownloads: 0 };
        // moduleStats[module].downloads = downloads;

        downloads.forEach(function(downloadForDay) {
          moduleStats[module].totalDownloads += downloadForDay.value;
        });

        if (Object.keys(moduleStats).length === modulesToGet.length) {
          resolve(moduleStats);
        }
      });
    });
  });
}

getDownloadsForModules(modules).then(function(moduleStats) {
  console.log(moduleStats);

  for (var i in moduleStats) {
    grandTotal += moduleStats[i].totalDownloads;
  }

  console.log();

  console.log('Total downloads:', grandTotal);
});
