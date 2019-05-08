var admin = angular.module('admin');

admin.controller('reportCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/customer-reports').then(function(response) {
		var retrieved = response.data; 
		var reports = [];
		var r = {};
		var c = {}
		retrieved.forEach(function(x) {
			$http.get('/api/customers/' + x.reporter_id).then(function(response) {
				r = response.data;
				x.reporter = r;
			})

			$http.get('/api/customers/' + x.customer_id).then(function(response) {
				c = response.data;
				x.customer = c;
			})
			reports.push(x)
		})

		$scope.reports = reports; 
		console.log($scope.reports);
	})
}]);


