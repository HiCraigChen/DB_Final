var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    user_t : null
  });
});

router.post('/', function(req, res, next) {
 
  var memberAccount = req.body.account;
  var memberPassword = req.body.password;
  Member.getbyaccount( memberAccount,function(err, user_t) {
    if(err || memberPassword != user_t.Password ) {
    console.log("wrong");
    res.render('index', {
    user_t: null
  });

    } else {
         
      req.session.user_t =user_t;
      console.log(user_t);
      res.redirect('/applyFirstPage');
    }
  });
});


module.exports = router;
