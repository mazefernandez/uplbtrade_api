// home 
var admin = angular.module('admin', ['ngRoute']);
admin.controller('indexCtrl', function($scope, $location) {

});

// router
admin.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : '../html/reviews.html',
		controller : 'reviewCtrl'
	}).when('/reviews', {
		templateUrl : '../html/reviews.html',
		controller : 'reviewCtrl'
	}).when('/messages', {
		templateUrl : '../html/messages.html',
		controller : 'messageCtrl'
	}).when('/reports', {
		templateUrl : '../html/reports.html',
		controller : 'reportCtrl'
	}).when('/history', {
		templateUrl : '../html/transaction-logs.html', 
		controller : 'historyCtrl'
	}).when('/database', {
		templateUrl : '../html/database.html',
		controller : 'databaseCtrl'
	}).otherwise({
		redirectTo : '/reviews'
	});
}]);
