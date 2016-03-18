'use strict';

define([
    'angular',
    'echarts/echarts-all',
    'echarts/theme/dark',
    'services/websocket'
], function (angular, ec, theme) {

    angular.module('myApp.register', ["myApp.version", "myApp.services.websocket"])
        .controller('RegisterController', function ($scope, $timeout, $location, webSocket) {

            var moduleId = "a51562427b444c51938320861c3e0b16";
            webSocket.start(moduleId);

            // 基于准备好的dom，初始化echarts图表，并设置图表主题
            var myChart = echarts.init(document.getElementById('register'), theme);

            var option = {
                title: {
                    text: '网站七天用户注册变化',
                    subtext: '动态数据'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['注册人数']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ["2015/12/17", "2015/12/16", "2015/12/15", "2015/12/14", "2015/12/13", "2015/12/12", "2015/12/11"]
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}人'
                        }
                    }
                ],
                series: [
                    {
                        name: '注册人数',
                        type: 'line',
                        data: [11, 11, 15, 13, 12, 13, 10],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                ]
            };

            $scope.$on(moduleId, function (event, data) {
                $scope.$apply(function () {
                    option.xAxis[0].data = data.xAxis;
                    option.series[0].data = data.seriesData;
                    // 为echarts对象加载数据
                    myChart.setOption(option);
                });
            });

            $scope.$on("$destroy", function () {
                webSocket.close();
            });
        });
});