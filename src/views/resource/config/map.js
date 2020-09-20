var mapName = 'china'
export default {
    grid: {
        top: 30,
        left: 0,
        right: 200,
        bottom: 0,
        containLabel: true
    },
    tooltip: {
        // show: true,
        trigger: "item",
        backgroundColor: "rgba(3,18,44,0.90)",
        extraCssText: "box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;",
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: "#4088FD",
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
        seriesIndex: [1],
        inRange: {
            color: ["#1E4AD5", "#BACBFF"]
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
        left: 30,
        right: 210,
        top: 100,
        bottom: 30,
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
                areaColor: "#263A81",
                borderColor: "#03122C"
            },
            emphasis: {
                areaColor: "#56D9F6",
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
                    color: "#F8D81C",
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
                    areaColor: "#031525",
                    borderColor: "#3B5077"
                },
                emphasis: {
                    areaColor: "#2B91B7"
                }
            },
            animation: false
        }
    ]
};
