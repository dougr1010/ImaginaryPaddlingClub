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





//router.get('/', function(req, res, next){
//    console.log('hit register/ get');
//    res.send(path.join(__dirname, '../views/register.html'));
//});






//add a new user
router.post('/reg', function(req, res, next){
    console.log('hit users/reg post')
    console.log(req.body);
    console.log('req.body.username: ',req.body.username);
    var newUser ={};
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.isTripLeader = false;
        newUser.isPresident = false;
        newUser.isWebMaster = false;
        newUser.leadingTrips =[-1];
        newUser.takingTrips =[-1];
                 //was req.body
    Users.create(newUser, function(err, post){
        if(err) {
            console.log('new user write error')
            console.log(err);
        } else {
            res.send('200');
            console.log('new user write 200')
        }

    })
});




//get a specified user or all of them
router.get('/getUser/:username?', function(req, res, next) {
    console.log("hit getUser endpoint")
    var username = req.params.username;
    console.log('looking for username: ',username);
    if(username){
        console.log('finding One user.............');
        Users.findOne({username:username}, function(err, users){
            res.json(users);
        })
    } else {
        console.log('finding all users..........');
        Users.find({}, function(err, users){
            res.send(users);
        })
    }
});




//update user -add a trip
router.post('/updateUser', function(request, response){
    console.log('hit /updateUser endpoint');
    console.log(request.body);
    var username=request.body.username;
    var newTrip = request.body.tripId;
    console.log('user to update: ',username);
    console.log(newTrip);

    Users.findOneAndUpdate(
        {username:username},
        {$push:{takingTrips:newTrip}},
        {safe:true,upsert:true},
        function(err,toDo){
            if(err) console.log(err);
            response.sendStatus(200);
        })
});









//authenticate a registered user
//-------------------------------------------//
//  -This works for logging in successfully  //
//    -Need to add a response for fail       //
//-------------------------------------------//
//router.post('/login',
//    passport.authenticate('local'),
//    function(req, res) {
//        res.sendStatus(200);
//    }
//);
//-------------------------------------------//


// explore the solutions for that
//-------------------------------
router.post('/login',
    passport.authenticate('local'),
    function(req, res, err) {
        res.sendStatus(200);
    }
);



module.exports = router;