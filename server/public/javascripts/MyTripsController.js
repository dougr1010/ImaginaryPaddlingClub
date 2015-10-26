/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('MyTripsController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    console.log('reached the My Trips controller');
    var loggedInAs = $rootScope.loggedInAs;
    $scope.message = loggedInAs + "'s Trips";

    var userProfile = {};
    $scope.tripsImTaking =[];

    //get the trip id of the trips I'm going on
    $http.get('users/getUser/'+loggedInAs).then(function(response) {
        userProfile = response.data;
        //console.log(userProfile);
        mongoTripIds = userProfile.takingTrips;
        console.log(mongoTripIds);

        //get the trip information for each trip
        for (var i=0;i<mongoTripIds.length;i++) {
            console.log('trip #',i," of ",mongoTripIds.length);
            var tripId=mongoTripIds[i];
            $http.get('db/getTrip/' + tripId).then(function (response) {
                console.log(response);
                $scope.tripsImTaking.push(response.data.trip);
            })
        }

    });

}]);