'use strict';

require.config({
    paths: {
        angular: 'bower_components/angular',
        'ui-router': 'bower_components/angular-ui-router.min',
        "echarts": 'bower_components/echarts',
        //'angular-echarts': "bower_components/echarts/angular-echarts",
        'animate': 'bower_components/angular-animate'
    },
    shim: {
        'angular': { 'exports': 'angular' },
        'ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        //'angular-echarts': {
        //    deps: ['angular', 'echarts']
        //},
        'animate': {
            deps: ['angular']
        }
    },
    priority: [
		"angular"
    ],
    baseUrl: "./"
    //, urlArgs: "bust=" + (new Date()).getTime()
});

require(['angular', 'app'], function (angular, app) {
    //var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
        // bootstrap the app manually
        angular.bootstrap(document, ['myApp']);
    });
});