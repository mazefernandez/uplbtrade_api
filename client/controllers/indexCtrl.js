var admin = angular.module('admin', ['ngMaterial', 'ngRoute']);

angular.element(document.getElementsByTagName('head')).append(angular.element('<base href="' + window.location.pathname + '" />'));

admin.controller('indexCtrl', function($scope) {
	// specify base tag for href
});

admin.config(function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
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
	});
});