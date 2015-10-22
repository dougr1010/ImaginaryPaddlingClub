/**
 * Created by dougritzinger on 10/21/15.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../../models/User');

//router.get('/registerLanding', function(req, res, next){
//    console.log('hit register/registerLanding get');
//    res.sendFile(path.join(__dirname, '../views/registerLanding.html'));
//});

//
router.get('/', function(req, res, next){
    console.log('hit register/ get');
    res.send(path.join(__dirname, '../views/register.html'));
});

//authenticate a registered user
//router.post('/', passport.authenticate('local', {successRedirect:'/register', failureRedirect:'/loginorregister'}));
router.post('/', passport.authenticate('local', {successRedirect:'/register', failureRedirect:'/loginorregister'}));

//add a new user
router.post('/reg', function(req, res, next){
    console.log('hit register/ post')
    console.log(req.body);
    console.log('end of request body')
    Users.create(req.body, function(err, post){
        if(err) {
            console.log(err);
        } else {
            res.send('200');
        }

    })
});

module.exports = router;