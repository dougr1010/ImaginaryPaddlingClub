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


    //get and display list of trips in database
    console.log('RiversController: getting trips from db');
    $http.get('db/getTrip').then(function(response) {
        console.log(response);
        listOfTrips=response;
        $scope.rivers = response.data;
    });


    //respond to the Get Info button
    $scope.reqInfo = function(){
        console.log('RiversController: saw Request Info click');
        //console.log('RiversController: number of trips: ',numTrips);
        //console.log('RiversController: list of trips:');
        //console.log(listOfTrips);
        //console.log('RiversController: logged in as: ',$rootScope.loggedInAs);
        console.log(this);
        console.log('RiversController: ',$rootScope.loggedInAs,' is requesting information for: ', this.river._id);
        console.log('RiversController: Logged in as: ', $rootScope.loggedInAs, " - typeof: ", typeof $rootScope.loggedInAs);
        console.log('RiversController: Not logged in = ',($rootScope.loggedInAs == 'undefined'));

        //they must be logged in to request info
        if((typeof $rootScope.loggedInAs == 'undefined') || (typeof $rootScope.loggedInAs != 'string')) {
            alert('Please register or sign in before requesting trip information.  Thank you!');
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
                    console.log('RiversController: sending this to update the trip data:');
                    console.log(updateAttending);
                    $http({method:"POST", url:"/db/updateTripAdd", data:updateAttending}).then(
                        console.log('RiversController: added new request to trips/attending list'))
                }
    }


    }]);