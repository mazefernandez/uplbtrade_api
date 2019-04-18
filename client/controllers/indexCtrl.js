var admin = angular.module('admin', ['ngRoute']);


admin.controller('indexCtrl', function($scope) {
});

admin.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '../reviews.html'
	}).when('/reviews', {
		templateUrl : '../reviews.html'
	}).when('/reports', {
		templateUrl : '../reports.html'
	}).when('/history', {
		templateUrl : '../transacion-logs.html'
	}).when('/database', {
		templateUrl : '../database.html'
	});
}]);
