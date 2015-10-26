/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('TripLeaderController', ['$scope','$rootScope','$http', function($scope, $rootScope, $http){

    console.log('reached the Trip Leader controller');
    //$scope.message = "Logged in as " + $rootScope.loggedInAs;
    //$scope.message2 = "Trip Leader?  " + $rootScope.isTripLeader;
    //$scope.message3 = "President?  " + $rootScope.isPresident;
    //$scope.message4 = "WebMaster?  " + $rootScope.isWebMaster;

    var tripLeaderProfile ={};

    //get trip leader's profile and find out what trips they lead
       $http.get('users/getUser/'+$rootScope.loggedInAs).then(function(response) {
            console.log(response.data);
            tripLeaderProfile = response.data;

            console.log('tripLeaderProfile');
            console.log(tripLeaderProfile);
            var numTrips = tripLeaderProfile.leadingTrips.length;
            var tripIds = tripLeaderProfile.leadingTrips;
            var tripId = tripIds[0];
            console.log('numTrips: ',numTrips);
            console.log('trips array: ',tripIds);
            console.log('leading trip: ',tripId);

            //get the data for that trip and display it
            $http.get('db/getTrip/'+ tripId).then(function(response) {
                console.log('here is a trip:');
                console.log(response);
                $scope.tripID = response.data._id;
                $scope.date =response.data.date;
                $scope.trip =response.data.trip;
                $scope.description = response.data.description;
                $scope.attending = response.data.attending;
                console.log($scope.attending);
            });
        });

    //respond to send data button
    $scope.sendInfo = function(){
        console.log('saw Send Info click');
        //get username and tripID
        var updateTrips={
            username: this.attendee.username,
            tripId:   $scope.tripID
        };
        console.log('sending this update data');

        //add this trip to the users takingTrips list
        $http({method:"POST", url:"/users/updateUser", data:updateTrips}).then(
            console.log('added new trip to the trips attending list'))

        //update trip list to say the data has been sent
        var updateAttending = {
            id : $scope.tripID,
            username: this.attendee.username,
            sent: "sent",
            declined: "not declined"
        };
        console.log('update: sending this:');
        console.log(updateAttending);
        $http({method:"POST", url:"/db/updateTripAttending", data:updateAttending}).then(
            console.log('added new request to attending list'))

    }

    $scope.decline = function(){
        console.log('saw Decline click');
    }
}]);