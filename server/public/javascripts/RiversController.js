/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('RiversController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    console.log('reached the Rivers controller');
    $scope.message = "Welcome to the Rivers page.";

    var riverItem = [];       //individual river data for the rivers array
    $scope.rivers = [];       //data sent to rivers page
    var listOfTrips = [];  //global on this page
    var numTrips = 0;      //global on this page
    
    console.log('getting trips from db');
    $http.get('db/getTrip').then(function(response) {
        console.log(response);
        listOfTrips=response;
        numTrips = response.data.length;
        for (var i=0;i<numTrips;i++){
            var trip = response.data[i].trip;
            var date = response.data[i].date;
            var dateMs = response.data[i].dateMs;
            var description=response.data[i].description;
            var linkId = response.data[i].linkId;
            var id = response.data[i]._id;
            var attending = response.data[i].attending;
            riverItem=[date, trip, description, dateMs, linkId, id, attending];
            $scope.rivers.push(riverItem);
            console.log('linkId: ',linkId)
        }
    });

    //respond to the Get Info button
    $scope.reqInfo = function(){
        console.log('saw Request Info click');
        console.log('rivers/number of trips: ',numTrips);
        console.log('rivers/list of trips:');
        console.log(listOfTrips);
        console.log('logged in as: ',$rootScope.loggedInAs);
        console.log(this);
        console.log($rootScope.loggedInAs,' is requesting information for: ', this.river[1]);

        //they must be logged in to request info
        if($rootScope.loggedInAs == 'undefined') {
            alert('Please register or sign in before requesting trip information.  Thanks :)');
            $location.path('/loginorregister');
        } else {
            //add their username to the trip attendees array and update the database
                //create new attendee
                var newAttendingArrayItem = {'username':$rootScope.loggedInAs,'sent':'not sent','declined':'not declined'};
                //update the requested trip with new attendee
                var updateAttending = {
                    id : this.river[5],
                    username: $rootScope.loggedInAs,
                    sent: "not sent",
                    declined: "not declined"
                };
                    console.log('update: sending this:');
                    console.log(updateAttending);
                    $http({method:"POST", url:"/db/updateTripAdd", data:updateAttending}).then(
                        console.log('added new request to attending list'))
                }
    }


    }]);