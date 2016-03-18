'use strict';

define(['angular'], function (angular) {
    angular.module('myApp.version.version-directive', [])
        .directive('appVersion', [
            'version', function(version) {
                return function(scope, elm, attrs) {
                    elm.text(version);
                };
            }
        ])
        .directive("dynamicView", [
            '$interval', '$location', function($interval, $location) {

                var views = ["view1", "online"];
                var tempPage = views[0];

                return {
                    link: function(scope, element, attrs, controller) {
                        $interval(function() {
                            for (var index in views) {
                                if (views[index] !== tempPage) {
                                    tempPage = views[index];
                                    break;
                                }
                            }
                            // $location.path("/" + tempPage);
                        }, 1000 * 60);
                    }
                }
            }
        ]);
});