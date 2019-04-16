var admin = angular.module('admin', ['ngRoute']);


admin.controller('indexCtrl', function($scope) {
	// specify base tag for href
});

admin.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'index.html',
		controller : 'indexCtrl'
	}).when('/reviews', {
		templateUrl : 'index.html',
		controller : 'indexCtrl'
	}).when('/reports', {
		templateUrl : 'reports.html',
		controller : 'indexCtrl'
	}).when('/history', {
		templateUrl : 'transacion-logs.html',
		controller : 'indexCtrl'
	}).when('/database', {
		templateUrl : 'database.html',
		controller : 'indexCtrl'
	}).otherwise({
		redirectTo : 'index.html'
	});
}]);