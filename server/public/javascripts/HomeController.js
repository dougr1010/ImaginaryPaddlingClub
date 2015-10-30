/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('HomeController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){

    console.log('reached the home controller');
    console.log('HomeController: Global user data: ',$rootScope.loggedInAs, $rootScope.isTripLeader, $rootScope.isPresident, $rootScope.isWebMaster);
    console.log('HomeController: LoggedIn/TripLeader/WebMaster: ',$scope.LoggedIn, $scope.TripLeader, $scope.WebMaster);

    //$scope.message = 'Welcome to the Home Page';
    $scope.message2 = 'Hello '+ $rootScope.loggedInAs;
    $scope.message3 = 'Trip Leader: ' + $rootScope.isTripLeader;
    $scope.message4 = 'Club President: ' + $rootScope.isPresident;
    $scope.message5 = 'WebMaster: ' + $rootScope.isWebMaster;

    $scope.showMessageEdit = ($rootScope.isPresident || $rootScope.isTripLeader || $rootScope.isWebMaster);





//doesn't work
    console.log('$rootScope.loggedInAs: ',$rootScope.loggedInAs, 'typeof $rootScope.loggedInAs: ', (typeof $rootScope.loggedInAs));
    $scope.LoggedIn = (($rootScope.loggedInAs != 'undefined') && (typeof $rootScope.loggedInAs == 'string'));

    console.log('$scope.LoggedIn: ', $scope.LoggedIn);







// Get the description for the next upcoming trip ----------

    console.log('HomeController: getting trips from db');
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

        //var nextTripDate = response.data[nearestTripIndex].date;

        $scope.nextTripDate = response.data[nearestTripIndex].date;
        $scope.nextTripTitle = response.data[nearestTripIndex].trip;
        $scope.nextTrip = response.data[nearestTripIndex].description;
        $scope.mongoId = response.data[nearestTripIndex]._id;
    });


// Get the and display club message ------------------------------------
    console.log('HomeController: getting home page message from db');
    $http.get('db/getHomeMessage').then(function(response) {
        console.log(response);
        $scope.homeMessage = response.data[0].content;
        $scope.homeMessageId = response.data[0]._id;
        console.log('HomeController: ',$scope.homeMessageId);
    });

// Handle information request
    $scope.reqInfo = function(){
        console.log('HomeController: saw Request Information click');
        console.log('HomeController: logged in as ',$rootScope.loggedInAs);
        console.log('homeController: mongoId of upcoming trip: ',$scope.mongoId);

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
                id : $scope.mongoId,
                username: $rootScope.loggedInAs,
                sent: "not sent",
                declined: "not declined"
            };
            console.log('HomeController: sending this updated attending array to update the trip:');
            console.log(updateAttending);
            $http({method:"POST", url:"/db/updateTripAdd", data:updateAttending}).then(
                console.log('HomeController: added new request to attending list'))

            alert('Thank you for your request, it has been sent to the trip leader.')
        }

    }


    //Edit the message by pulling it  into an input text field.
    $scope.editMessage = function(){
        console.log('HomeController: **** saw Edit Message click ****');
        console.log('HomeController: current message:');
        console.log($scope.homeMessage);
        var messageText = $scope.HomeMessage;
        $scope.messageEditBox = messageText;
    }

    //    $scope.showAddButton=false;
    //    $scope.showEditItem=true;
    //    editThis = this;
    //    editPriority=fEditPriority;
    //    $scope.editListItem = $scope.listArray[editPriority][editThis.$index][0];
    //}


    $scope.saveMessage = function(){
        console.log('HomeController: **** saw Save Message click ****');
        $scope.homeMessage = $scope.messageEditBox;
        var jString={};
            jString._id = $scope.homeMessageId;
            jString.content = $scope.messageEditBox;

        $http({method:"post", url: "db/updateHomeMessage", data:jString});
    }



}]);