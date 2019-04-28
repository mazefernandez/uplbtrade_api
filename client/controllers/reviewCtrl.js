var admin = angular.module('admin');

admin.controller('reviewCtrl', ['$scope', "$http", function($scope, $http) {

	$http.get('/api/application-reviews/customers').then(function(response){
		var reviews = response.data;
		console.log(reviews);
		$scope.reviews = reviews;
	});
	$scope.maxRating = 5;
}]);
	
