/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('HomeController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    console.log('reached the home controller');
    console.log($rootScope.loggedInAs, $rootScope.isTripLeader, $rootScope.isPresident, $rootScope.isWebMaster);
    $scope.message = 'Welcome to the Home Page';
    $scope.message2 = 'Hello '+ $rootScope.loggedInAs;
    $scope.message3 = 'Trip leader: ' + $rootScope.isTripLeader;
    $scope.message4 = 'Club President: ' + $rootScope.isPresident;
    $scope.message5 = 'WebMaster: ' + $rootScope.isWebMaster;




// Get the description for the next upcoming trip ----------

    console.log('getting trips from db');
    $http.get('db/getTrip').then(function(response) {

        // loop through the trips and find the nearest future trip and display the description
        var numTrips=response.data.length;
        var today = new Date();
        var todayMs = today.getTime();

        var nearestTripIndex = 0;
        var nearestTripDelta = response.data[0].dateMs - todayMs; //start with delta to first trip on the list
        var currentDelta = 0;

        for (i=0; i<numTrips; i++){
            currentDelta =response.data[i].dateMs-todayMs;
            if ((currentDelta < nearestTripDelta)&&(currentDelta > 0)){
                nearestTripIndex=i;
                nearestTripDelta=currentDelta;
            }
        }

        var nextTripDate = response.data[nearestTripIndex].date;

        $scope.nextTripDate = nextTripDate;
        $scope.nextTripTitle = response.data[nearestTripIndex].trip;
        $scope.nextTrip = response.data[nearestTripIndex].description;
    });


// Get the club message ------------------------------------
    console.log('getting home page message from db');
    $http.get('db/getHomeMessage').then(function(response) {
        //console.log(response);
        $scope.homeMessage = response.data[0].content;
    });

// Handle information request
    $scope.reqInfo = function(){
        console.log('saw Request Information click');
    }


}]);