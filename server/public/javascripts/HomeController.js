/**
 * Created by dougritzinger on 10/20/15.
 */
app.controller('HomeController', ['$scope', function($scope){

    console.log('reached the home controller');
    $scope.message = "Welcome to the Home page.";

}]);