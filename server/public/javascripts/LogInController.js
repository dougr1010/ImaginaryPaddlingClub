/**
 * Created by dougritzinger on 10/21/15.
 */
app.controller('LogInController', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

    console.log('reached the Log In controller');
    $scope.message = "Welcome to the Log In page.";


    $scope.logIn = function() {
        console.log('saw Login click');
        console.log('username: ', $scope.username);
        console.log('password: ', $scope.password);

        var jstring = {};
        jstring.username = $scope.username;
        jstring.password = $scope.password;

        $http({
            method: "POST",
            url: "users/login",
            data: jstring
        }).then(function (resp) {
            console.log('client/response/: ');
            console.log(resp.data);
            //if the login attempt succeeded
            if (resp.data=="OK") {
                console.log('Logged in username: ',$scope.username);
                $rootScope.loggedInAs=$scope.username;

                // get user data
                var loggedInUser = $scope.username
                console.log('getting user profile from db for ',loggedInUser);

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

                });


                //$http({
                //     method: "GET",
                //     url: "users/getUser",
                //     params:{username:loggedInUser}}
                // ).then(function(response) {
                //    console.log('get logged in userdata');
                //    console.log(response);
                //    $rootScope.loggedInIsTripLeader = " ";
                //    $rootScope.loggedInIsPresident = " ";
                //    $rootScope.loggedInIsWebmaster =" ";
                //});

                alert("Thank you for logging in!");
                $location.path('/home');
            }
            //Otherwise, if the attempt failed
            else {
                console.log('client/else:');
                console.log(resp);
                alert("Login attempt failed, please try again");
            }
        })
    }

    //



}]);
