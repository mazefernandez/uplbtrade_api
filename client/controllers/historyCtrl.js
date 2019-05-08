var admin = angular.module('admin');

admin.controller('historyCtrl', function($scope) {
	var transactions = []; 
	$http.get('api/transactions').then(function(response) {
		transactions = response.data;
	});
});

