var mapName = 'china'
export default {
    grid: {
        top: 30,
        left: 0,
        right: 10,
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
            if (typeof params.value[2] == "undefined") {
                return params.name + " : " + (params.value || 0);
            } else {
                return params.name + " : " + params.value[2];
            }
        }
    },

    legend: {
        orient: "vertical",
        y: "bottom",
        x: "right",
        data: ["credit_pm2.5"],
        textStyle: {
            color: "#fff"
        }
    },
    visualMap: {
        show: true,
        min: 0,
        max: 4800,
        itemHeight: 90,
        itemWidth: 24,
        left: 18,
        bottom: 15,
        text: ["高", "低"], // 文本，默认为数值文本
        calculable: false,
        hoverLink: false,
        seriesIndex: [1],
        inRange: {
            color: ["#314445", "rgba(113,200,205,.77)"]
        },
        textStyle: {
            color: "#fff",
            fontSize: 11,
            lineHeight: 20
        }
    },

    geo: {
        show: true,
        map: mapName,
        left: 40,
        right: 30,
        top: 50,
        bottom: 60,
        label: {
            normal: {
                show: false,
                position: "left"
            },
            emphasis: {
                show: false
            }
        },
        // silent: true,
        roam: false,
        itemStyle: {
            normal: {
                areaColor: "#314445",
                borderColor: "#232528"
            },
            emphasis: {
                areaColor: "#71C8CD", // 鼠标移入背景色
            },
        }
    },
    series: [{
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbolSize: 0,
            label: {
                normal: {
                    formatter: "{b}",
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
                    color: "#326366",
                    show: false
                }
            }
        },
        //区域颜色
        {
            type: "map",
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
                        color: "#fff"
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: "#326366",
                    borderColor: "#232528"
                },
                emphasis: {
                    areaColor: "#71C8CD"
                }
            },
            animation: false
        }
    ]
};
