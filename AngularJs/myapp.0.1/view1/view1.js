'use strict';

define([
    'angular',
    'angularRoute',
    'angular-echarts'
], function (angular) {

    var timer;

    var pageload = {
        name: '注册人数',
        datapoints: [
            { x: '2015-11-20', y: 9 },
            { x: '2015-11-21', y: 3 },
            { x: '2015-11-22', y: 3 },
            { x: '2015-11-23', y: 6 },
            { x: '2015-11-24', y: 13 },
            { x: '2015-11-25', y: 14 },
            { x: '2015-11-26', y: 25 },
            { x: '2015-11-27', y: 3 }
        ]
    };

    var firstPaint = {
        name: 'page.firstPaint',
        datapoints: [
            { x: '1月', y: 22 },
            { x: '2月', y: 13 },
            { x: '3月', y: 35 },
            { x: '4月', y: 52 },
            { x: '5月', y: 32 },
            { x: '6月', y: 40 },
            { x: '7月', y: 63 },
            { x: '8月', y: 80 },
            { x: '9月', y: 20 },
            { x: '10月', y: 25 },
            { x: '11月', y: 33 }
        ]
    };

    function updateData(data) {
        pageload.datapoints.push({ x: 1 , y: data.num });
        firstPaint.datapoints.push({ x:1, y: data.num });
        pageload.datapoints.shift();
        firstPaint.datapoints.shift();
    }

    angular.module('myApp.view1', ['ngRoute', 'angular-echarts'])
	//.config(['$routeProvider', function ($routeProvider) {
	//    $routeProvider.when('/view1', {
	//        templateUrl: 'view1/view1.html',
	//        controller: 'View1Ctrl'
	//    });
	//}])
	.controller('View1Ctrl', function ($scope, $interval, myReportHttp, myReportSocket) {

	    $scope.$on('Report', function (event, data) {
	        $scope.$apply(function () {
	            updateData(data);
	        });
	    });

        //HTTP 方式更新数据
	    //$scope.initailInfo = function () {
	    //    myFactory.loadData().then(function (response) {
	    //          updateData(data);
	    //    });
	    //};

	    $scope.config = {
	        // title: 'Line Chart',
	        title: {
	            text: "网站一周注册人数",
	            subtext: "2015"
	        },
	        tooltip: {
	            trigger: "axis"
	        },
	        //theme:"dark",
	        showXAxis: true,
	        showYAxis: true,
	        showLegend: true,
	        stack: false
	    };

	    $scope.data = [pageload];
	    $scope.multiple = [pageload, firstPaint];

	    //timer = $interval(function () {
	    //    $scope.initailInfo();
	    //}, 3000);

	    //$scope.$on("$destroy", function () {
	    //    if (timer) {
	    //        $interval.cancel(timer);
	    //    }
	    //});
	})
    .factory('myReportHttp', function ($http, $q) {
        var service = {};

        service.loadData = function () {
            var deferred = $q.defer();
            $http.get('/api/services')
                .then(function (response) {
                    deferred.resolve(response);
                });
            return deferred.promise;
        }

        return service;
    })
    .factory("myReportSocket", function ($rootScope) {
        var service = {};
        service.message = {};

        var wsServer = 'ws://fleck.com:8008/af36db04dc5343c0b2a2a0f4dfab4d31';
        var ws = new WebSocket(wsServer, ['superchart']);

        ws.onopen = function () {
            console.log("Connected to WebSocket server.");
        }

        ws.onmessage = function (evt) {
            //广播给子scope
            $rootScope.$broadcast('Report', angular.fromJson(evt.data));
        }

        return service;
    });
});