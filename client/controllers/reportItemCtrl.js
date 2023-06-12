// reported items

var admin = angular.module('admin');

admin.controller('reportItemCtrl', ['$scope', '$http', function($scope, $http) {
        // retrieve reports 
        $http.get('/api/item-reports').then(function(response) {
                var retrieved = response.data; 
                var reports = [];
                var r = {};
                var c = {}
                retrieved.forEach(function(x) {
                        // get the customer who reported 
                        $http.get('/api/customers/' + x.reporter_id).then(function(response) {
                                r = response.data;
                                x.reporter = r;
                        })
                        // get the item that was reported
                        $http.get('/api/items/' + x.item_id).then(function(response) {
                                c = response.data;
                                x.item = c;
                        })
                        reports.push(x)
                })

                $scope.reports = reports;
                console.log($scope.reports);
        })
}]);

