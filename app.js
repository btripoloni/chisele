var app = angular.module("chisele", []);

var autocomplete;
app.controller("getChisele", function($scope){
  console.log($scope.autocomplete);
  autocomplete = $scope.autocomplete;
});