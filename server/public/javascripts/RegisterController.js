/**
 * Created by dougritzinger on 10/21/15.
 */
app.controller('RegisterController', ['$scope', '$http', '$location', function($scope, $http, $location){

    console.log('reached the Register controller');
    $scope.message = "Welcome to the Register page.";

    $scope.register = function() {
        console.log('saw register click');
        console.log('username: ', $scope.username);
        console.log('password: ', $scope.password);

        var jstring = {};
        jstring.username = $scope.username;
        jstring.password = $scope.password;

        $http({
            method: "POST",
            url: "users/reg",
            data: jstring
        }).then(function (response) {
            console.log('client reg response ', response);
            if(response.data == "200") {
                $location.path('/login');
            } else {
                console.log('There was an error registering')
            }
        });
    }
}]);
