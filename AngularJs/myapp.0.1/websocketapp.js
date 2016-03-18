'use strict';

var websocketApp = angular.module('websocketApp', ['ngCookies', 'ngResource', 'ui.router']);

websocketApp.config(['$stateProvider',
    function ($stateProvider) {
        var states = [];
        angular.forEach(states, function (item) {
            $stateProvider.state(item);
        });
    }
]);

websocketApp.service('WebSocketService',
		['$q', '$rootScope', function ($q, $rootScope) {
		    var Service = {};
		    var callbacks = {};
		    var currentCallbackId = 0;
		    var ws = new WebSocket("ws://localhost:8080/reverse");

		    ws.onopen = function () {
		        console.log("连接到了服务器!");
		    };

		    ws.onclose = function () {
		        console.log('连接被关闭.');
		    };

		    ws.onmessage = function (message) {
		        listener(JSON.parse(message.data));
		    };

		    function sendRequest(request) {
		        var defer = $q.defer();
		        var callbackId = getCallbackId();
		        callbacks[callbackId] = {
		            time: new Date(),
		            cb: defer
		        };
		        request.callbackId = callbackId;
		        ws.send(JSON.stringify(request));
		        return defer.promise;
		    }

		    function listener(data) {
		        var messageObj = data;
		        if (callbacks.hasOwnProperty(messageObj.callbackId)) {//主动请求
		            $rootScope.$apply(callbacks[messageObj.callbackId].cb.resolve(messageObj));
		            delete callbacks[messageObj.callbackId];
		        } else {//服务端推送（广播给子scope）
		            $rootScope.$broadcast(messageObj.msgType, messageObj);
		        }
		    }

		    function getCallbackId() {
		        currentCallbackId += 1;
		        if (currentCallbackId > 10000) {
		            currentCallbackId = 0;
		        }
		        return currentCallbackId;
		    }

		    Service.sendMessage = function (message) {
		        var request = {
		            message: message
		        }
		        var promise = sendRequest(request);
		        return promise;
		    };
		    return Service;
		}]);

websocketApp.controller('UserListCtrl',
		['$scope', '$rootScope', '$location', '$resource', '$stateParams', 'WebSocketService',
        function ($scope, $rootScope, $location, $resource, $stateParams, WebSocketService) {
            $scope.users = [];
            $scope.$on('UserList', function (event, data) {
                console.log(data);
            });
        }]);

websocketApp.controller('MessagesCtrl',
		['$scope', '$rootScope', '$location', '$resource', '$stateParams', 'WebSocketService',
        function ($scope, $rootScope, $location, $resource, $stateParams, WebSocketService) {
            $scope.message = "";
            var messages = $scope.messages = [];

            $scope.$on('Text', function (event, data) {
                console.log(data);
            });

            $scope.send = function () {
                if ($scope.message) {
                    messages.push({ type: 2, message: $scope.message });
                    WebSocketService.sendMessage($scope.message).then(function (res) {
                        messages.push({ type: 1, message: res.message });
                    }, function (res) {
                        console.log(res);
                    });
                    $scope.message = "";
                }
            }
        }]);