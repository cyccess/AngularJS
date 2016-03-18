'use strict';

define([
	'angular',
    'ui-router',
    'animate',
    'controllers/online',
    'controllers/register',
    'controllers/invest',
    'controllers/total',
    'controllers/subject'

], function (angular, router, animate, online, registered, invest, total) {
    // Declare app level module which depends on views, and components
    return angular.module('myApp', [
        'ngAnimate',
        'myApp.online',
        'myApp.register',
        'myApp.invest',
        'myApp.total',
        'myApp.subject'
    ]).
	config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/online');

	    $stateProvider
            .state('online', {
                url: '/online',
                templateUrl: 'views/online.html',
                // new attribute for ajax load controller
                controller: 'OnlineController'
            })
            .state('register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterController'
            })
            .state('invest', {
                url: '/invest',
                templateUrl: 'views/invest.html',
                controller: 'InvestController'
            })
            .state('total', {
                url: '/total',
                templateUrl: 'views/total.html',
                controller: 'TotalController'
            })
            .state('subject', {
                url: '/subject',
                templateUrl: 'views/subject.html',
                controller: 'SubjectController'
            })
            .state('main', {
                url: '/main',
                views: {
                    // the main template will be placed here (relatively named)
                    '': { templateUrl: 'views/main.html' },

                    // the child views will be defined here (absolutely named)
                    'columnOne@main': {
                        templateUrl: 'views/main/column1.html',
                        // new attribute for ajax load controller
                        controller: 'OnlineController'
                    },

                    'columnTwo@main': {
                        templateUrl: 'views/main/column2.html',
                        controller: 'RegisterController'
                    },

                    'columnThree@main': {
                        templateUrl: 'views/main/column3.html',
                        controller: 'InvestController'
                    },

                    'columnFour@main': {
                        templateUrl: 'views/main/column4.html',
                        controller: 'TotalController'
                    }
                }
            });
	}]);
});