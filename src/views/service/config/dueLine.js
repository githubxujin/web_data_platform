function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}


import echarts from "echarts"
export default {
    title: {
        text: '',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [0, 0, 0, 28]
    },
    grid: {
        top: 10,
        left: 0,
        right: 0,
        bottom: 10,
        containLabel: true
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        axisPointer: {
            lineStyle: {
                width: 2,
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(120,207,214,0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(67,161,172,1)',
                    }, {
                        offset: 1,
                        color: 'rgba(67,161,172,0)'
                    }],
                    global: false
                }
            },
        },
    },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月'],
        axisTick: {
            show: false
        },
        axisLabel: {
            // interval: 0,
            show: true,
            // rotate: 40,
        }
    },
    yAxis: {
        // name: "单位：元/吨",
        show: false,
        nameTextStyle: {
            color: '#A0A3A8',
            padding: [0, 0, 0, -30]
        },
        axisLabel: {
            margin: 8,
            interval: 0,
        },
        axisTick: {
            show: false
        },
        type: 'value',
    },
    series: [{
        type: 'line',
        smooth: 'true',
        symbolSize: 4,
        symbol: 'circle',
        markPoint: {
            symbol: 'none',
            symbolSize: 4,
            data: [{
                type: 'max',
                name: '峰值'
            },
            {
                type: 'min',
                name: '谷值'
            }
            ],
            label: {
                formatter: '{b}:\n{@score}'
            }

        },
        data: [1000, 1500, 2000, 1600, 1800, 1700, 1400, 1900, 1500, 2300, 2500],
        itemStyle: {
            normal: {
                color: '#43A1AC',
                areaStyle: {
                    //color: '#94C9EC'
                    color: new echarts.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [{
                            offset: 0,
                            color: "rgba(61,64,69,0)"
                        },
                        // {
                        //     offset: 0.5,
                        //     color: "rgba(103,148,172,0.15)"
                        // },
                        {
                            offset: 0,
                            color: "rgba(70,147,156,0.5)"
                        }
                        ]
                    )
                }
            },

        },
    },

    ]
};
