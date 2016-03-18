

define([
    'angular',
    "components/version/version"
], function (angular) {

    angular.module('myApp.online', ["myApp.version"])
	.controller('OnlineCtrl', function ($scope, $interval, mySocket) {

	    $scope.$on('Online', function (event, data) {
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
	        if (timer) {
	            $interval.cancel(timer);
	        }
	    });
	})
    .factory("mySocket", function ($rootScope) {
        var service = {};
        service.message = {};

        var wsServer = 'ws://fleck.com:8008/af36db04dc5343c0b2a2a0f4dfab4d31';
        var ws = new WebSocket(wsServer, ['superchart']);

        ws.onopen = function () {
            console.log("Connected to WebSocket server.");
        }

        ws.onmessage = function (evt) {
            //广播给子scope
            $rootScope.$broadcast('Online', angular.fromJson(evt.data));
        }

        return service;
    });
});