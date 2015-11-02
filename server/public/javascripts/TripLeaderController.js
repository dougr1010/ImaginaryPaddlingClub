/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('TripLeaderController', ['$scope','$rootScope','$http', "Upload", function($scope, $rootScope, $http, Upload){

    console.log('reached the Trip Leader controller');
    $scope.hello = "Hello " + $rootScope.loggedInAs;

    var tripLeaderProfile ={};
    $scope.description="";

    //get trip leader's profile and find out what trips they lead
    function loadThisPage() {
        $http.get('users/getUser/' + $rootScope.loggedInAs).then(function (response) {
            console.log(response.data);
            tripLeaderProfile = response.data;

            console.log('TripLeaderController: tripLeaderProfile');
            console.log(tripLeaderProfile);
            var numTrips = tripLeaderProfile.leadingTrips.length;
            var tripIds = tripLeaderProfile.leadingTrips;
            var tripId = tripIds[0];
            console.log('TripLeaderController: numTrips: ', numTrips);
            console.log('TripLeaderController: trips array: ', tripIds);
            console.log('TripLeaderController: leading trip: ', tripId);
            console.log('TripLeaderController: getting trip, ', tripId);

            //get the data for that trip and display it
            //$http.get('db/getTrip/'+ tripId).then(function(response) {
            $http({
                method: "POST",  //really a get with params in request body
                url: 'db/getTripByParam',
                data: {id: tripId}
            }).then(function (response) {
                console.log(response);
                console.log('TripLeaderController: here is the trip being led:');
                console.log(response);
                $scope.tripID = response.data._id;
                $scope.date = response.data.date;
                $scope.trip = response.data.trip;
                $scope.description = response.data.description;
                $scope.attachments = response.data.attachments;
                $scope.attending = response.data.attending;
                console.log('TripLeaderController: here is the attending array:');
                console.log($scope.attending);

                $scope.putInMap = response.data.putInMap;
                $scope.shuttleMap = response.data.shuttleMap;
                console.log('TripLeaderController: mapToPutIn: ',$scope.putInMap);
                console.log('TripLeaderController: mapOfShuttle: ',$scope.shuttleMap);

                //set up the trip data edit box default
                console.log('TripLeaderController: trip description: ', $scope.description);
                $scope.editTripDescription = $scope.description; //load the db description as initial text

            });
        });
    }
    loadThisPage();

    ////////////// Done with page load, now respond to buttons///////////


    /////////////////////////////////////////////////////////////////////
    //edit the trip description and update the database on button click//
    /////////////////////////////////////////////////////////////////////

    $scope.saveTripDescriptionEdits = function(){
        console.log('TripLeaderController: saw Trip Description - save edits click');
        console.log('TripLeaderController: saving to trip ID: ',$scope.tripID);
        console.log('TripLeaderController: saving this:',$scope.editedTripDescription);
        var txData = {id:$scope.tripID, description:$scope.editedTripDescription};
        console.log('TripLeaderController: sending:',txData);
        $http({
            method: "POST",  //really a get with params in request body
            url: 'db/updateTripDescription',
            data: txData
        }).then(function(response){
            console.log('TripLeaderController: db update response:');
            console.log(response);
            //update the html page
            $scope.description = $scope.editedTripDescription;

        });
        console.log('TripLeaderController: Why doesn\'t this execute1?');
    };


    /////////////////////////////////
    // respond to send info button //
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
    };


    ////////////////////////////////////////////
    //add an attachment - trip data pdfs, etc.//
    ////////////////////////////////////////////

    $scope.addAttachment=function(){
        console.log('TripLeaderControler: saw addAttachment click')
        $scope.upload($scope.file);
    };

    $scope.upload = function (file) {
        console.log('TripLeaderControler: uploading file: ',file,' for trip: ',$scope.tripID);
        Upload.upload({
            url: '/db/addAttachment',
            data: {file: file, tripId:$scope.tripID} //, swatchData: $scope.swatchForm}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        }).then(function(){
            console.log('TripLeaderController: reloading page after adding attachment');
            loadThisPage();
            console.log('TripLeaderController: page should be reloaded');
        });

    };



    ///////////////////////////////////////
    // respond to add Put In map button  //
    ///////////////////////////////////////
    $scope.savePutInMap = function(){
        console.log('TripLeaderCongtroller: saw savePutInMap click');
        console.log('TripLeaderCongtroller: sending this map link: ',$scope.putInMapString);
        console.log('TripLeaderCongtroller: to this trip: ',$scope.tripID);

        $http({
            method: "POST",
            url: 'db/putInMap',
            data:  {id : $scope.tripID,
                putInMapString: $scope.putInMapString}
        }).then(function(response) {
            console.log('TripLeaderController: Add Put In map completed');
        });

    };


    ///////////////////////////////////////
    // respond to add Put In map button  //
    ///////////////////////////////////////
    $scope.saveShuttleMap = function(){
        console.log('TripLeaderCongtroller: saw saveShuttleMap click');
        console.log('TripLeaderCongtroller: sending this map link: ',$scope.shuttleMapString);

        $http({
            method: "POST",
            url: 'db/shuttleMap',
            data:  {id : $scope.tripID,
                shuttleMapString: $scope.shuttleMapString}
        }).then(function(response) {
            console.log('TripLeaderController: Add Shuttle map completed');
        });

    };



}]);