/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('MyTripsController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    console.log('reached the My Trips controller');

    $scope.noTripsSelected=true;  //don't display trip info and headers
    $scope.hello="/Users/dougritzinger/Documents/APrimeDigitalAcademy/Week13-7onCampus/imaginary_paddling_club/server/public/tripInfo/042d233b3d644bd03a444714f8b17894.pdf";

    var loggedInAs = $rootScope.loggedInAs;
    $scope.loggedInAs = loggedInAs;

    var userProfile = {};
    $scope.tripsImTaking =[];

    //get the trip id of the trips I'm going on
    $http.get('users/getUser/'+loggedInAs).then(function(response) {
        userProfile = response.data;
        //console.log(userProfile);
        mongoTripIds = userProfile.takingTrips;
        console.log('MyTripsController: array of trip mongoIds:')
        console.log(mongoTripIds);

        //get the trip information for each trip
        //so the trip names can be retreived and listed
        for (var i=0;i<mongoTripIds.length;i++) {
            console.log('MyTripsController: trip #',i," of ",mongoTripIds.length,' Id:',mongoTripIds[i]);
            var tripId=mongoTripIds[i];
            $http.get('db/getTrip/' + tripId).then(function (response) {
                console.log('MyTripsController: get trip loop:')
                console.log(response);
                var tripNameAndId =[response.data.trip,response.data._id];
                console.log (tripNameAndId);
                $scope.tripsImTaking.push(tripNameAndId);  //makes trips visible on html page
            })
        }
    });





    //a trip has been clicked on, get the trip info and display it

    $scope.showTripInfo = function() {
        $scope.noTripsSelected = false;  //display trip info and headers
        console.log('MyTripsController: Saw showTripInfo click');
        console.log('MyTripsController: this.trip');
        console.log(this.trip);
        $http.get('db/getTrip/' + this.trip[1]).then(function (response) {
            console.log('MyTripsController: trip info for the selected trip')
            console.log(response);
            $scope.date        = response.data.date;
            $scope.tripName    = response.data.trip;
            $scope.tripLeader  = response.data.leader;
            $scope.difficulty  = response.data.difficulty;
            $scope.description = response.data.description;
            $scope.attachments = response.data.attachments;
            $scope.putInMap    = response.data.putInMap;
            $scope.shuttleMap  = response.data.shuttleMap;

            console.log($scope.tripName," - ",$scope.date);
        });
    };


    // View trip information button has been clicked.
    // Open the file if pdf, or move it into the downloads folder if not pdf

    //get the extension from a filename, rtn includes the "."
    function getExtension(stringIn){
        var extStart=0;
        for (var i=(stringIn.length-1);i>0;i--){
            //console.log(i,' -> ',stringIn.charAt(i));
            if(stringIn.charAt(i)==".")extStart=i;
        }
        return stringIn.slice(extStart);
    }

    $scope.openAttachment = function() {
        console.log('MyTripsController: saw openAttachment click');
        //console.log(this);
        //console.log(this.attachment);
        //console.log('MyTripsController: ok, now opening it');
        var doc_href = "tripInfo/"+this.attachment;
        //console.log('MyTripsController: getExtension: ',getExtension(doc_href));

        //Use the generated filename but add the extension of the original filename.
        //This will allow the pdf files to be opened in a pdf viewer.
        doc_href = "tripInfo/"+this.attachment[1];//+getExtension(this.attachment[0]);
        console.log('MyTripsController: href to open: ',this.attachment[0],' -> ',doc_href);

        //doc_href = doc_href + getExtension();
        //Access the trip document
        window.open(doc_href,'resizable, scrollbars');
        console.log('MyTripsController: should be open now...')
    }


}]);