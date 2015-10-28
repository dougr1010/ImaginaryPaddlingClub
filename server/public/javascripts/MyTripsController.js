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
            console.log('trip #',i," of ",mongoTripIds.length,' Id:',mongoTripIds[i]);
            var tripId=mongoTripIds[i];
            $http.get('db/getTrip/' + tripId).then(function (response) {
                console.log('get trip loop:')
                console.log(response);
                var tripNameAndId =[response.data.trip,response.data._id];
                console.log (tripNameAndId);
                $scope.tripsImTaking.push(tripNameAndId);
            })
        }

    });

    $scope.showTripInfo = function() {
        console.log('Saw showTripInfo click');
        console.log(this.trip);
        $http.get('db/getTrip/' + this.trip[1]).then(function (response) {
            console.log(response);
            $scope.date        = response.data.date;
            $scope.tripName    = response.data.trip;
            $scope.tripLeader  = response.data.leader;
            $scope.difficulty  = response.data.difficulty;
            $scope.description = response.data.description;
            $scope.attachments = response.data.attachments[0];
            $scope.putInMap    = response.data.putInMap;
            $scope.shuttleMap  = response.data.shuttleMap;

            console.log($scope.tripName," - ",$scope.date);
        });
    };


    $scope.openAttachment = function() {
        console.log('saw openAttachment click');
        console.log(this);
        console.log(this.attachments);
        console.log('ok, now opening it');
        doc_href = "tripInfo/"+this.attachments;
        //var docPath='tripInfo/StraightRiverTripPacket.pdf';

        //<a href="#" onclick="window.open('MyPDF.pdf', '_blank', 'fullscreen=yes'); return false;">MyPDF</a>
        //function openPdf(){
            window.open(doc_href,'resizable, scrollbars');
        //}
        console.log('should be open now...')
    }


}]);