/**
 * Created by dougritzinger on 10/20/15.
 */
var app = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

app.config(function($routeProvider,$locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })
        .when('/calendar', {
            templateUrl: 'views/calendar.html',
            controller: 'CalendarController'
        })
        .when('/rivers', {
            templateUrl: 'views/rivers.html',
            controller: 'RiversController'
        })
        .when('/bulletin', {
            templateUrl: 'views/bulletin.html',
            controller: 'BulletinController'
        })
        .when('/mytrips', {
            templateUrl: 'views/mytrips.html',
            controller: 'MyTripsController'
        })
        .when('/selectedtrip', {
            templateUrl: 'views/selectedtrip.html',
            controller: 'SelectedTripController'
        })
        .when('/tripleader', {
            templateUrl: 'views/tripleader.html',
            controller: 'TripLeaderController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'AdminController'
        })
        .when('/loginorregister', {
            templateUrl: 'views/loginorregister.html',
            controller: 'LoginOrRegisterController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LogInController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

});


    ////////////////////////////////////////////////////////
    // control the visibility of the index page Nav items //
    ////////////////////////////////////////////////////////

app.controller('IndexNav', ['$scope', '$rootScope', function($scope, $rootScope){

    console.log('IndexNav controller running');

    //ng-show the Bulletin Board and myTrips pages only if logged in
    //$rootScope.LoggedIn = (($rootScope.loggedInAs != 'undefined') && (typeof $rootScope.loggedInAs == 'string'));

    //ng-show trip leader page nav only if a trip leader
    //$rootScope.TripLeader = (($rootScope.LoggedIn == true) ||
    //                     ($rootScope.isTripLeader == true));

    //hg-show the admin page nav only if WebMaster
    //$rootScope.WebMaster = (($rootScope.LoggedIn) || ($rootScope.isWebMaster == true));

    console.log('clientApp: $scope.LoggedIn/$scope.TripLeader/$scope.WebMaster: ',$rootScope.LoggedIn, $rootScope.TripLeader, $rootScope.WebMaster);

}]);


