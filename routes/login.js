var express = require('express');
var router = express.Router();
var Member = require('../models/Member');
var Article = require('../models/Article');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    member : null
  });
});

//members test
router.get('/members/:memberId', function(req, res) {
  Member.get(req.params.memberId, function(err, member) {
    if(err) {
      res.status(err.code);
      res.json(err);
    } else {
      res.json(member);
    }
  })

});



router.post('/logout', function(req, res, next) {
  req.session.member = null;
  res.redirect('/');
});


router.post('/', function(req, res, next) {
  var memberName = req.body.name;
  var memberAccount = req.body.account;
  var memberPassword = req.body.password;
  Member.getbyaccount(memberAccount, memberPassword,function(err, member) {
    if(err || memberPassword != member.password || memberAccount!=member.account) {
      console.log(member);
    console.log("wrong");
    res.render('login', {
    member : null
  });

    } else {
      req.session.member = member;

      console.log(req.session.member);
      res.redirect('/');
    }
  });
});


module.exports = router;
