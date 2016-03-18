'use strict';

define([
    'angular',
    'echarts/echarts-all',
    'echarts/theme/dark',
    'services/websocket'
], function (angular, ec, theme) {

    angular.module('myApp.invest', ["myApp.version", "myApp.services.websocket"])
        .controller('InvestController', function ($scope, $timeout, $location, webSocket) {

            var moduleId = "81bb7f3685724b3181d826043338ac4d";
            webSocket.start(moduleId);

            // 基于准备好的dom，初始化echarts图表，并设置图表主题
            var myChart = echarts.init(document.getElementById('invest'), theme);

            var option = {
                title: {
                    text: '每月投资金额',
                    subtext: '动态数据'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (arr) {
                        var obj = arr[0];
                        return obj.name + "月<br/>" + unitFormat(obj.value);
                    }
                },
                legend: {
                    data: ['投资金额']
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLabel: {
                            formatter: '{value}月'
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: function (data) {
                                return unitFormat(data);
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '投资金额',
                        type: 'line',
                        data: [],
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ],
                            itemStyle: {
                                normal: {
                                    label: {
                                        formatter: function (data) {
                                            return unitFormat(data.value);
                                        }
                                    }
                                }
                            }
                        }
                    }
                ]
            };

            function unitFormat(number) {
                var million = parseInt(number / 100000000);
                var thousand = parseInt((number - million * 100000000) / 10000);
                var m = million > 0 ? (million + '亿') : "";
                var t = thousand > 0 ? (thousand + '万') : '';
                return m + t;
            }

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