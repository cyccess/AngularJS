'use strict';

define([
    'angular',
    'echarts/echarts-all',
    'echarts/theme/dark',
    'services/websocket'
], function (angular, ec, theme) {

    angular.module("myApp.subject", ["myApp.version", "myApp.services.websocket"])
        .controller('SubjectController', function ($scope, $timeout, $location, webSocket) {

            var moduleId = "34878c169b1c4745b8cdd78d9f628ab3";
            webSocket.start(moduleId);

            // 基于准备好的dom，初始化echarts图表，并设置图表主题
            var myChart = echarts.init(document.getElementById('subject'), theme);

            var labelTop = {
                normal: {
                    label: {
                        show: true,
                        position: 'center',
                        formatter: '{b}',
                        textStyle: {
                            baseline: 'bottom'
                        }
                    },
                    labelLine: {
                        show: false
                    }
                }
            };
            var labelFromatter = {
                normal: {
                    label: {
                        formatter: function (params) {
                            return (100 - params.value).toFixed(2) + '%';
                        },
                        textStyle: {
                            baseline: 'top'
                        }
                    }
                }
            }
            var labelBottom = {
                normal: {
                    color: '#ccc',
                    label: {
                        show: true,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    }
                },
                emphasis: {
                    color: 'rgba(0,0,0,0)'
                }
            };

            var option = {
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: []
                },
                title: {
                    text: '在投标的实时进度',
                    subtext: '实时动态数据',
                    x: 'center'
                },
                series: []
            };

            function setChartOption(data) {
                var interval = ['10', '30', '50', '70', '90'];
                var legendData = [];
                var series = [];

                for (var i = 0; i < interval.length; i++) {
                    var item = {
                        type: 'pie',
                        center: [interval[i] + '%', '50%'],
                        radius: [45, 60],
                        itemStyle: labelFromatter,
                        data: [
                            { name: 'other', value: 100 - data[i].value, itemStyle: labelBottom },
                            { name: data[i].name, value: data[i].value, itemStyle: labelTop }
                        ]
                    };
                    series.push(item);
                    legendData.push(data[i].name);
                }
                option.series = series;
                option.legend.data = legendData;
            }

            $scope.$on(moduleId, function (event, data) {
                $scope.$apply(function () {
                    setChartOption(data);
                    myChart.setOption(option);
                });
            });

            $scope.$on("$destroy", function () {
                webSocket.close();
            });
        });
});