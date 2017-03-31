var express = require('express');
var router = express.Router();
var Capacity = require('../models/Capacity')
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  Capacity.get(function(err, CapacityList) {
    if(err) {
      next();
    } else {
      res.render('html5',
          {
            CapacityList: CapacityList
          });
    }
  });
});

module.exports = router;
