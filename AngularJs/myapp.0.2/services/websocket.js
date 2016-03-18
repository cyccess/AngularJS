"use strict";

/* Services 
 * WebSocket服务
 * 2015-12-14 15:30
*/
define(['angular'], function (angular) {
    angular.module('myApp.services.websocket', [])
        .factory("webSocket", function ($rootScope) {
            var ws = null;
            var service = {
                start: start,
                close: close
            };

            return service;

            function start(id) {
                var wsServer = 'ws://fleck.com:8008/' + id;
                ws = new WebSocket(wsServer, ['superchart']);
                ws.onopen = function () {
                    console.log("Connected to WebSocket server.");
                }

                ws.onmessage = function (evt) {
                    //广播给子scope
                    $rootScope.$broadcast(id, angular.fromJson(evt.data));
                }

                ws.onclose = function () {
                    console.info("Web Socket closed");
                }
            }

            function close() {
                ws.close();
            }
        });
});