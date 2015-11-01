/**
 * Created by dougritzinger on 10/21/15.
 */
app.controller('LogInController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    console.log('reached the Log In controller');
    $scope.message = "Welcome to the Log In page.";


    $scope.logIn = function() {
        console.log('LoginController: saw Login click');
        console.log('LoginController: username: ', $scope.username);
        console.log('LoginController: password: ', $scope.password);

        var jstring = {};
        jstring.username = $scope.username;
        jstring.password = $scope.password;

        $http({
            method: "POST",
            url: "users/login",
            data: jstring
        }).then(function (resp) {
            console.log('LoginController: client/response/: ');
            console.log(resp.data);
            //if the login attempt succeeded
            if (resp.data=="OK") {
                console.log('LoginController: Logged in username: ',$scope.username);
                $rootScope.loggedInAs=$scope.username;

                // get user data
                var loggedInUser = $scope.username;
                console.log('LoginController: getting user profile from db for ',loggedInUser);

                //works for getting all users
                //$http.get('users/getUser').then(function(response){
                //    console.log(response);
                //})


                //works for getting all users
                $http.get('users/getUser/'+loggedInUser).then(function(response){
                    //console.log(response);
                    //console.log(response.data.username);
                    //console.log(response.data.isTripLeader);
                    //console.log(response.data.isPresident);
                    //console.log(response.data.isWebMaster);
                    $rootScope.isTripLeader = response.data.isTripLeader;
                    $rootScope.isPresident = response.data.isPresident;
                    $rootScope.isWebMaster = response.data.isWebMaster;
                    //console.log($rootScope.isTripLeader);
                    //console.log($rootScope.isPresident);
                    //console.log($rootScope.isWebMaster);

                    //ng-show the Bulletin Board and myTrips pages only if logged in
                    $rootScope.LoggedIn = (($rootScope.loggedInAs != 'undefined') && (typeof $rootScope.loggedInAs == 'string'));

                    //ng-show trip leader page nav only if a trip leader
                    $rootScope.TripLeader = (($rootScope.LoggedIn == true) &&
                    ($rootScope.isTripLeader == true));

                    //hg-show the admin page nav only if WebMaster
                    $rootScope.WebMaster = (($rootScope.LoggedIn) && ($rootScope.isWebMaster == true));

                    console.log('LogInController: $rootScope.LoggedIn/$rootScope.TripLeader/$rootScope.WebMaster: ',$rootScope.LoggedIn, $rootScope.TripLeader, $rootScope.WebMaster);

                    alert("Thank you for logging in!");
                    $location.path('/home');

                });
                    //.then(
                    //$http.get('db/getHomeMessage').then(function(response) {
                    //console.log('LoginController: executing getHomeMessage just as a delaying tactic')
                    //console.log(response);
                    //}));




            }
            //Otherwise, if the attempt failed
            else {
                console.log('LoginController: client/else:');
                console.log(resp);
                alert("Login attempt failed, please try again");
            }
        })
    }

    //



}]);
