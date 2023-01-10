//transaction tracking
admin.controller('historyCtrl', ['$scope', '$http', function($scope, $http) {

        // retrieve transactions 
        $http.get('/api/transactions').then(function(response){
                var transactions = response.data;
                $scope.transactions = transactions;
        });
}]);

