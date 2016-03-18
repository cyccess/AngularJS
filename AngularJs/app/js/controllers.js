"use strict";

/* Controllers */

angular.module("myApp.controllers", [])
  .controller("MyCtrl1", ["$scope", function ($scope) {
        $scope.msg = "Ctrl1";
    }])
  .controller("MyCtrl2", ["$scope", function ($scope) {
      $scope.msg = "Ctrl2";
  }]);