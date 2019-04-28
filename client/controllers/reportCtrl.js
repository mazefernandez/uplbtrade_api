var admin = angular.module('admin');

admin.controller('reportCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('/api/customer-reports').then(function(response) {
		var retrieved = response.data; 
		var reports = [];

		retrieved.forEach(function(x) {
			var rep, cus;  

			$http.get('/api/customers', {customer_id : x.reporter_id}).then(function(response) {
				rep = response.data;
			})

			$http.get('/api/customers', {customer_id : x.customer_id}).then(function(response) {
				cus = response.data;
			})

			reports.add({
				report : x, 
				reporter : rep,
				customer : cus
			})	
		})

		scope.reports = reports; 
		console.log(reports); 

	})
}]);

