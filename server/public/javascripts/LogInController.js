/**
 * Created by dougritzinger on 10/21/15.
 */
app.controller('LogInController', ['$scope', '$http', function($scope, $http){

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
            url: "register/",
            data: jstring
        })
    }




}]);
