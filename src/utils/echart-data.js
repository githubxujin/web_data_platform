export default {
    animationDuration: 3000,
    grid: {
        top: 60,
        left: 190,
    },
    tooltip: {
        trigger: "axis",
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
            return `${params[1].axisValueLabel}<br />     ${params[1].data}`
        }
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            margin: 7,
            textStyle: {
                color: '#809CFF',
                fontSize: 12
            }
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: false
        },
    },
    yAxis: [{
            type: 'category',
            axisLabel: {
                margin: 7,
                textStyle: {
                    align: 'left',
                    baseline: 'middle',
                    color: '#809CFF',
                    fontSize: 12,
                },
                align: 'right',
                formatter: function (value, index) {
                    if (value.length > 12) {
                        return `{lg|${index+1}}  ` + value.substring(0, 12) + "...";
                    } else {
                        return `{lg|${index+1}}  ` + value

                    }
                },
                rich: {
                    lg: {
                        align: 'left',
                        padding: [0, 0, 0, -170],
                        color: '#809CFF',
                    }
                }
            },
            inverse: true,
            axisLine: {
                show: true
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            data: [],
        },

    ],
    series: [{
            type: 'bar',
            barWidth: 25,
            barGap: "-100%",
            data: [],
            itemStyle: {
                normal: {
                    borderColor: "#11245A",
                    borderWidth: 2,
                    color: {
                        colorStops: [{
                            offset: 1,
                            color: "rgba(38,64,157,0.42)"
                        }]
                    }
                }
            }
        },
        {
            type: "bar",

            barWidth: 25,
            data: [],
            itemStyle: {
                normal: {
                    color: {
                        type: "linear",
                        global: false,
                        colorStops: [{
                                offset: 0,
                                color: "#1D9CCC"
                            },
                            {
                                offset: 1,
                                color: "#26409D"
                            }
                        ]
                    }
                }
            }
        }
    ],

};
