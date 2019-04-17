var admin = angular.module('admin', ['ngRoute']);


admin.controller('indexCtrl', function($scope) {
});

admin.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '../index.html',
		controller : 'indexCtrl'
	}).when('/reviews', {
		templateUrl : '../reviews.html',
		controller : 'indexCtrl'
	}).when('/reports', {
		templateUrl : '../reports.html',
		controller : 'indexCtrl'
	}).when('/history', {
		templateUrl : '../transacion-logs.html',
		controller : 'indexCtrl'
	}).when('/database', {
		templateUrl : '../database.html',
		controller : 'indexCtrl'
	}).otherwise({
		redirectTo : '../index.html'
	});
}]);
