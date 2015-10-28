/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('TripLeaderController', ['$scope','$rootScope','$http', function($scope, $rootScope, $http){

    console.log('reached the Trip Leader controller');
    $scope.hello = "Hello " + $rootScope.loggedInAs;

    var tripLeaderProfile ={};

    //get trip leader's profile and find out what trips they lead
       $http.get('users/getUser/'+$rootScope.loggedInAs).then(function(response) {
            console.log(response.data);
            tripLeaderProfile = response.data;

            console.log('TripLeaderController: tripLeaderProfile');
            console.log(tripLeaderProfile);
            var numTrips = tripLeaderProfile.leadingTrips.length;
            var tripIds = tripLeaderProfile.leadingTrips;
            var tripId = tripIds[0];
            console.log('TripLeaderController: numTrips: ',numTrips);
            console.log('TripLeaderController: trips array: ',tripIds);
            console.log('TripLeaderController: leading trip: ',tripId);
            console.log('TripLeaderController: getting trip, ', tripId);

            //get the data for that trip and display it
            //$http.get('db/getTrip/'+ tripId).then(function(response) {
            $http({
                method: "POST",  //really a get with params in request body
                url: 'db/getTripByParam',
                data: {id : tripId}
            }).then(function(response){
                console.log(response);
                console.log('TripLeaderController: here is the trip being led:');
                console.log(response);
                $scope.tripID = response.data._id;
                $scope.date =response.data.date;
                $scope.trip =response.data.trip;
                $scope.description = response.data.description;
                $scope.attending = response.data.attending;
                console.log('TripLeaderController: here is the attending array:');
                console.log($scope.attending);
            });
        });

    /////////////////////////////////
    // respond to send data button //
    /////////////////////////////////
    $scope.sendInfo = function(){
        console.log('TripLeaderController: **** saw Send Info click ****');

        //get username and tripID
        var username = this.attendee.username;
        var updateTrips={
            username: this.attendee.username,
            tripId:   $scope.tripID
        };
        console.log('TripLeaderController: adding this trip to the users trips attending list');
        console.log('TripLeaderController: sending this update data:');
        console.log(updateTrips);

        //add this trip to the users profile - takingTrips list
        ///////////////////////////////////////////////////////
        $http({method:"POST", url:"/users/updateUser", data:updateTrips}).then(
            console.log('TripLeaderController: trip added to the users trip list'))

        //update trip list to show that the data has been sent
        //////////////////////////////////////////////////////

        //get trip
        $http({
            method: "POST",  //really a get with params in request body
            url: 'db/getTripByParam',
            data: {_id : $scope.tripID}
        }).then(function(response){
            console.log(response)
            console.log("TripLeaderController: here is the trip I'm updating:");
            console.log(response);
            console.log('TripLeaderController: here is the attending array');
            $scope.attending = response.data.attending;
            console.log(response.data.attending);
            console.log($scope.attending.length,' TripLeaderController: items in array, looking for ',username);

            //find the correct user in the attending array
            // and change the status from not sent to sent
            for (var i= 0;i<$scope.attending.length;i++){
                if($scope.attending[i].username == username){
                    $scope.attending[i].sent = "sent"; // html page will update now
                }
            }
            console.log('TripLeaderController: updated array sending to updateTripAttending:');
            console.log($scope.attending);

            //update the array in the db
            $http({
                method: "POST",  //really a get with params in request body
                url: 'db/updateTripAttending',
                data:  {id : $scope.tripID,
                        updateData: $scope.attending}
            }).then(function(response) {
                console.log('TripLeaderController: update completed');
            });
        });
    }
    //not going to implement the decline feature at this time
    //currently, the club never declines requests
    //$scope.decline = function(){
    //    console.log('saw Decline click');
    //}

    $scope.submitFile=function(){
        console.log('TripLeaderControler: saw Submit File click')
        console.log(this);
        console.log($scope.addMeFile);
    }
}]);