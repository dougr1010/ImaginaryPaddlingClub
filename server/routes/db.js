/**
 * Created by dougritzinger on 10/22/15.
 */
var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser = require('bodyParser');

var Message =     require('../../models/message');
var Trip =        require('../../models/trip');
var HomeMessage = require('../../models/homeMessage');



/* write a trip to db */
//..................................................
router.post('/addTrip', function (request, response) {
    console.log('hit /db/addTrip endpoint...........................');
    //console.log(request.body);
    var trip = new Trip(request.body);

    //................................
    trip.save(function (err, saveresp) {
        if (err)  console.log('server/error on db write: ', err);
            console.log('db/addTrip: adding trip to db');
            //console.log(saveresp);
            //console.log(saveresp._id);
        });
    response.send('server/finished adding.');
});





//                            ADDING A TRIP ATTENDEE
//update the attending array -adding a trip attendee in an existing trip document in the db
//.......................................................
router.post('/updateTripAdd', function(request, response){
    console.log('hit /db/updateTripAdd endpoint......................');
    console.log(request.body);
    var id=request.body.id;
    var newAttending = {
        username: request.body.username,
        sent: request.body.sent,
        declined: request.body.declined
    };
    console.log('db/updateTripAdd: id to update: ',id);
    console.log('db/updateTripAdd: new attending array to be added:')
    console.log(newAttending)

    //....................
    Trip.findOneAndUpdate(
        {_id:id},
        {$push:{attending:newAttending}},
        {safe:true,upsert:true},
        function(err){
            if(err) console.log(err);
        response.sendStatus(200);
    })
});






//                            CHANGING ATTENDEE STATUS, ie not-sent to sent
//
//update the attending array -changing attendee status in an existing trip document in the db

//.............................................................
router.post('/updateTripAttending', function(request, response){
    console.log('hit /db/updateTripAttending endpoint......................');
    console.log('db/updateTripAttending: request body:');
    console.log(request.body);
    console.log('db/updateTripAttending: request.body.updateData..........');
    console.log(request.body.updateData);
    console.log('...................................');
    //console.log(request.body);
    var id=request.body.id;

    var updatedAttendingArray = request.body.updateData;
    console.log('db/updateTripAttending: id to update: ',id,'...............');
    console.log(updatedAttendingArray);
    console.log('...................................');

    //.................................................................
    Trip.findByIdAndUpdate(id, {$set:{attending:updatedAttendingArray}},function(err,thing){
        if (err) throw(err);
        console.log(thing);
    });
});






//get a trip by any field

//...............................................
router.post('/getTripByParam', function(req, res) {
    console.log('hit db/getTripByParam endpoint..............................');
    console.log(req.body);
    var searchString = req.body;
    console.log('looking for trip: ',searchString);

    //............................................
    Trip.findOne(searchString, function(err, trip) {
    //Trip.findOne({id:id}, function (err, trip) {
       if(err) console.log(err);
       res.send(trip);
    })
});




// get a trip by its mongoId, or get all trips

//..................................................
router.get('/getTrip/:id?', function(req, res, next) {
    console.log('hit db/trip get endpoint...................................');
    var id = req.params.id;
    console.log('looking for trip id: ',id);
    if(id) {
        console.log('db/getTrip/:id: finding one trip.......................');
        Trip.findById(id, function (err, trip) {
//            Trip.findOne({id:id}, function (err, trip) {
            res.send(trip);
        })
    }else{
        console.log('id undefined, getting all trips........................');

    //...............................
    Trip.find(function(err,someTrips){
        if(err) console.log('error: ',err);
        //console.log('server/trips: ')
        //console.log(someTrips);
        res.send(someTrips);
    })
    }
});



//---------------------------------------------------------


/* write a message to db */

//....................................................
router.post('/addMessage', function(request, response){
    console.log('hit /db/addMessage post endpoint......................');
    console.log(request.body);
    var message = new Message(request.body);

    //..................................
    message.save(function(err, saveresp){
        if(err)  console.log('error on db write: ',err);
        console.log('adding message to db');
        //console.log(saveresp);
        //console.log(saveresp);
    });
    response.sendStatus(200);
});



/* get messages from db */

//................................................
router.get('/getMessage', function(req, res, next) {
    console.log('hit db/messages get endpoint.............................');

    //.....................................
    Message.find(function(err,someMessages){
        if(err) console.log('error: ',err);
        //console.log('server/some tasks: ')
        //console.log(someTasks);
        res.send(someMessages);
    })
});




//---------------------------------------------------------


/* write a home page message to db */

//........................................................
router.post('/addHomeMessage', function(request, response){
    console.log('hit /db/addHomeMessage endpoint........................');
    console.log(request.body);
    var homeMessage = new HomeMessage(request.body);

    //......................................
    homeMessage.save(function(err, saveresp){
        if(err)  console.log('error on db write: ',err);
        console.log('db/addHomeMessage: adding homeMessage.................');
        //console.log(saveresp);
        //console.log(saveresp._id);
    });
    response.sendStatus(200);
});




//
/* get home page message from db */

//....................................................
router.get('/getHomeMessage', function(req, res, next) {
    console.log('hit db/getHomeMessage endpoint...........................');

    //............................................
    HomeMessage.find(function(err,someHomeMessage){
        if(err) console.log('db/getHomeMessage: error: ',err);
        //console.log('server/someMessage: ')
        //console.log(someMessage);
        res.send(someHomeMessage);
    })
});



/* update the home page message in the db */
//.................................................................
router.post('/updateHomeMessage', function(request, response){
    console.log('hit db/updateHomeMessage endpoint.....................');
    console.log('db/updateHomeMessage: request.body');
    console.log(request.body);
    console.log(request.body._id);
    console.log(request.body.content);
    var _id = request.body._id;
    var newMessage = request.body.content;
    //var homeMessage = new HomeMessage(request.body.content);
    console.log('db/updateHomeMessage: _id: ',_id);
    console.log('db/updateHomeMessage: newMessage: ',newMessage);

    //...................................................................
    //HomeMessage.findByIdAndUpdate(_id, {$set:{content:newMessage}},function(err){
    //    if(err) console.log(err);
    //    response.sendStatus(200);

    HomeMessage.findById(_id, function(err, doc){
        console.log(doc);
        if(err) console.log(err);
        doc.content = newMessage;
        doc.save(function(err){
            if (err) console.log(err);
        });

    });
});




module.exports = router;



