'use strict';

define([
	'angular',
	'angularRoute',
    'controllers/online',
    'view1/view1',
    'view2/view2'
], function (angular, angularRoute, view1, view2, echarts) {
    // Declare app level module which depends on views, and components
    return angular.module('myApp', [
		'ngRoute',
        'myApp.online',
        'myApp.view1',
        'myApp.view2'
    ]).
	config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when("/online", { templateUrl: "views/online.html", controller: "OnlineCtrl" });
	    $routeProvider.when("/view1", { templateUrl: "view1/view1.html", controller: "View1Ctrl" });
	    $routeProvider.when("/view2", { templateUrl: "view2/view2.html", controller: "View2Ctrl" });
	    $routeProvider.otherwise({ redirectTo: '/online' });
	}]);
});

