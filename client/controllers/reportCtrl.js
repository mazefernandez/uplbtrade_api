var admin = angular.module('admin');

admin.controller('reportCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('/api/customer-reports').then(function(response) {
		var retrieved = response.data; 
		var reports = [];

		retrieved.forEach(x) {
			var rep, cus; 

			$http.get('api/customers', x.customer_id).then(function(response) {
				cus = response.data; 
			})

			$http.get('api/customers', x.reporter_id).then(function(response) {
				rep = response.data; 
			})

			reports.add({
				report : x, 
				customer : cus, 
				reporter : rep
			})
		}

		$scope.reports = reports; 
		console.log(reports); 

	})
}]);

