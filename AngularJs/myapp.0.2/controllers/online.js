"use strict";

define([
    'angular',
    "bower_components/version/version",
    'services/websocket'
], function (angular) {
    angular.module('myApp.online', ['ui.router', "myApp.version", 'myApp.services.websocket'])
        .controller('OnlineController', function ($scope, $location, $timeout, webSocket) {

            var id = 'af36db04dc5343c0b2a2a0f4dfab4d31';
            webSocket.start(id);
       
            $scope.$on(id, function (event, data) {
                $scope.$apply(function () {
                    $scope.online = data.num;
                });
            });

            var updateClock = function () {
                $scope.clock = new Date();
            };

            var timer = setInterval(function () {
                $scope.$apply(updateClock);
            }, 1000);

            updateClock();

            $scope.$on("$destroy", function () {
                webSocket.close();
                if (timer) {
                    $timeout.cancel(timer);
                }
            });
        });
});