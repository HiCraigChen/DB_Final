var express = require('express');
var router = express.Router();
var Used = require('../models/Used')
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  Used.get(function(err, UsedList) {
    if(err) {
      next();
    } else {
      res.render('applyThirdPage',
          {
            UsedList: UsedList
          });
    }
  });
});

module.exports = router;
