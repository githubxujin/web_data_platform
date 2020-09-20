var mapName = 'china'
export default {
    grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true
    },
    tooltip: {
        show: true,
        trigger: 'item',
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light",
        },
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
        formatter: function (params) {
            // console.log(params)
            if (typeof (params.value)[2] == "undefined") {
                return params.name + ' : ' + params.value;
            } else {
                return params.name + ' : ' + params.value[2];
            }
        }
    },

    legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        data: ['credit_pm2.5'],
        textStyle: {
            color: '#fff'
        }
    },
    visualMap: {
        show: false,
        min: 0,
        max: 500,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            color: ['#314445', '#326366']
        }
    },

    geo: {
        show: true,
        map: mapName,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        label: {
            normal: {
                show: false,
                position: 'left'
            },
            emphasis: {
                show: false,
            }
        },
        silent: true,
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#314445',
                borderColor: '#232528',
            },
            emphasis: {
                areaColor: '#56D9F6',
            },

        }
    },
    series: [{
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            // symbolSize: function (val) {
            //     var a = (maxSizeScat - minSizeScat) / (max - min);
            //     var b = minSizeScat - a * min;
            //     b = maxSizeScat - a * max;
            //     return a * val[2] + b;
            // },
            label: {
                normal: {
                    formatter: '{b}',
                    position: [-20, 20],
                    show: false,
                    fontSize: 10
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#70B1B6'
                }
            }
        },
        //区域颜色
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
        },
        //气泡
        {
            name: '气泡',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            // symbolSize: function (val) {
            //     var a = (maxSizePin - minSizePin) / (max - min);
            //     var b = minSizePin - a * min;
            //     b = maxSizePin - a * max;
            //     return a * val[2] + b;
            // },
            label: {
                normal: {
                    show: true,
                    formatter: function (params) {
                        return params.data.value[2]
                    },
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                    }
                }

            },
            itemStyle: {
                normal: {
                    color: '#CC7451', //标志颜色
                }
            },
            zlevel: 6,
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            // symbolSize: function (val) {
            //     var a = (maxSizeScat - minSizeScat) / (max - min);
            //     var b = minSizeScat - a * min;
            //     b = maxSizeScat - a * max;
            //     return a * val[2] + b;
            // },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false //bug：设置为true造成top5的省份名称重影
                }
            },
            itemStyle: {
                normal: {
                    color: '#70B1B6',
                    shadowBlur: 10,
                    shadowColor: '#70B1B6'
                }
            },
            zlevel: 1
        },

    ]
};
