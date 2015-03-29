// var Promise = require('es6-promise').Promise;

var express = require('express');
var router = express.Router();
var appStats = require('../index.js');

var grandTotal = 0;
var modules;

appStats.getDownloads(appStats.modules).then(function(moduleStats) {
  for (var i in moduleStats) {
    grandTotal += moduleStats[i].totalDownloads;
  }

  grandTotal = grandTotal;
  modules = moduleStats;
});

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(modules);
  res.render('index', {
    grandTotal: grandTotal,
    moduleStats: modules,
    title: 'App Stats'
  });
});

module.exports = router;
