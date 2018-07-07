angular.module('zznt', [
    'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);
