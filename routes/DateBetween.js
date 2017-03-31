var express = require('express');
var router = express.Router();
var DateB = require('../models/DateBet')
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  dateBegin = req.session.dateBegin;
  dateEnd = req.session.dateEnd;
  var dateBeginDay = dateBegin.substring(0,2);
  var dateBeginMonth = dateBegin.substring(3,5);
  var dateBeginYear = dateBegin.substring(6,10);
  var dateEndDay = dateEnd.substring(0,2);
  var dateEndMonth = dateEnd.substring(3,5);
  var dateEndYear = dateEnd.substring(6,10);  
  var begin = dateBeginYear+'/'+dateBeginMonth+'/'+dateBeginDay;
  var end   = dateEndYear+'/'+dateEndMonth+'/'+dateEndDay;
  

  DateB.getAll(begin, end,function(err, DateBetweenList) {
    console.log(DateBetweenList);

    if(err) {
      next();
    } else {
      res.render('applySecondPage',
          {
            DateBetweenList: DateBetweenList
          });
    }
  });


});



module.exports = router;

