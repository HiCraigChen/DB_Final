var express = require('express');
var router = express.Router();
var async = require('async');
var Member = require('../models/Member');
var DateB = require('../models/DateBet');

router.get('/', function(req, res) {

  res.render('applyFirstPage',{
    user_t: req.session.user_t||null
      });
});

router.post('/', function(req, res, next) {
 var dateBegin = req.body.dateBegin;
  var dateEnd = req.body.dateEnd;

  req.session.dateBegin = dateBegin;
  req.session.dateEnd = dateEnd;
  // DateB.getAll(dateBegin,dateEnd,function(err){
  	
  //   console.log(dateBegin);

  //   console.log(dateEnd);
   
     res.redirect('/DateBetween');

     
  // })
   
    

 
});






router.post('/logout', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
  
});


module.exports = router;



