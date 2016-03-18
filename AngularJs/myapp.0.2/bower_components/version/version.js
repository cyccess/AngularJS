'use strict';

define([
    'angular',
    'bower_components/version/version-directive',
    'bower_components/version/interpolate-filter'
],
function (angular, versionDirective, interpolateFilter) {
    angular.module('myApp.version', [
		'myApp.version.interpolate-filter',
		'myApp.version.version-directive'
    ])
	.value('version', '0.1');
});