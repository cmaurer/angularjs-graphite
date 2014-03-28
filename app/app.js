'use strict';
var app = angular.module('EndToEndApp', ['ngGraphite']);

app.config(function(GraphiteProvider){
  GraphiteProvider.setDefaultPort(9001);
  GraphiteProvider.setDefaultFrom('-1h');
  GraphiteProvider.setDefaultUntil('-15s');
});

app.controller('EndToEndController', ['$scope', 'Graphite', '$http', 'GraphiteTargetBuilder', function($scope, GraphiteProvider, $http, GraphiteTargetBuilder){

  $scope.testName = 'test';
  $scope.url = GraphiteProvider.buildUrl('/render', GraphiteTargetBuilder.build('foobar.{one,two,three}.{five,six,seven}'));
  $http({method:'GET', url: $scope.url})
    .success(function(data, status) {
      $scope.data = data;
      $scope.status = status;
    })
    .error(function(data, status){
      console.log('data', data, 'status', status);
      $scope.data = data;
      $scope.status = status;
    });

}]);