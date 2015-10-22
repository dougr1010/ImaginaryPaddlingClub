var express = require('express');
var passport = require('passport');
var path = require('path');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hit / endpoint');
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

//
//router.post('/', passport.authenticate('local', {
//  successRedirect:'/success',
//  failureRedirect: '/failure'
//}));

module.exports = router;
