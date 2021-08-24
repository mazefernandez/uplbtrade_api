// application reviews/ratings  
var admin = angular.module('admin');

admin.controller('reviewCtrl', ['$scope', '$http', function($scope, $http) {

	// retrieve reviews 
	$http.get('/api/application-reviews/customers').then(function(response){
		var reviews = response.data;
		$scope.reviews = reviews;
	});
	$scope.maxRating = 5;
	
	//  get count 
	$http.get('/api/application-reviews/count').then(function(response) {
		var count = JSON.stringify(response.data);
		var split = count.split(":");
		count = split[1];
		
		$scope.count = count.replace("}",""); 
	});

	// solve average rating 
	$http.get('/api/application-reviews/average').then(function(response) {
		var average = JSON.stringify(response.data); 
		var split = average.split(":")
		average = split[1];

		$scope.average = average.replace("}","");
	});
}]);
	
