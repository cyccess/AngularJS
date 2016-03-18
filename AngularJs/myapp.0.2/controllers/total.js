'use strict';

define([
    'angular',
    'echarts/echarts-all',
    'echarts/theme/dark',
    'services/websocket'
], function (angular, ec, theme) {
  
    angular.module('myApp.total', ["myApp.version", "myApp.services.websocket"])
        .controller('TotalController', function($scope, $timeout, $location, webSocket) {

            var moduleId = "e481c63b22bc42f698f457ac258d898c";
            webSocket.start(moduleId);

            // 基于准备好的dom，初始化echarts图表，并设置图表主题
            var myChart = echarts.init(document.getElementById('total'), theme);

            var option = {
                title: {
                    text: '注册/投资人数曲线',
                    subtext: '实时动态数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['注册人数', '投资人数']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        scale: true,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true
                    }
                ],
                series: [
                    {
                        name: '注册人数',
                        type: 'line',
                        large: true,
                        data: []
                    },
                    {
                        name: '投资人数',
                        type: 'line',
                        large: true,
                        data: []
                    }
                ]
            };

            $scope.$on(moduleId, function(event, data) {
                $scope.$apply(function() {
                    option.series[0].data = data.register;
                    option.series[1].data = data.invest;
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });
            });

            $scope.$on("$destroy", function() {
                webSocket.close();
            });
        });
});