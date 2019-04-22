var admin = angular.module('admin');

admin.controller('reviewCtrl', ['$scope', "$http", function($scope, $http) {
	$http.get('/api/application-reviews').then(function(response){
		$scope.reviews = response.data; 
		console.log($scope.reviews); 
	});
}]);
	
