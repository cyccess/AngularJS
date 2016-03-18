'use strict';

require.config({
    paths: {
        angular: 'bower_components/angular',
        angularRoute: 'bower_components/angular-route',
        "echarts-all": 'bower_components/echarts/echarts-all',
        'angular-echarts': "bower_components/echarts/angular-echarts"
    },
    shim: {
        'angular': { 'exports': 'angular' },
        'angularRoute': ['angular'],
        'angular-echarts': {
            deps: ['angular', 'echarts-all']
        }
    },
    priority: [
		"angular"
    ],
    baseUrl: "./"
});

require(['angular', 'app'], function (angular, app) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap(document, ['myApp']);
    });
});