import echarts from "echarts";
export default {
    title: {
        text: '近十二个月药品价格波动情况',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
        },
        padding: [10, 0, 0, 28]
    },
    legend: {
        data: ['订单价格', '销售价格', ],
        top: 50,
        right: 'center',
        textStyle: {
            color: '#A0A3A8'
        }
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
    },
    grid: {
        top: 100,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
    },
    xAxis: {
        type: 'category',
        data: ['2019-01-01', '2019-02-01', '2019-03-01', '2019-04-01'],
        axisLabel: { //x轴文字的配置
            show: true,
            textStyle: {
                color: '#A0A3A8',
            }
        },



    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
        },
        axisLabel: { //x轴文字的配置
            show: true,
            textStyle: {
                color: '#A0A3A8',
            }
        },

    },
    series: [{
            name: '订单价格',
            type: 'line',
            step: 'start',
            data: [2, 3, 5, 6],
            symbolSize: 0,
            symbol: 'circle',
            itemStyle: {
                normal: {
                    color: '#4084D5 ',
                    areaStyle: {
                        // 曲线下的渐变色
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
                                //     color: "rgba(64,132,213,0.28)"
                                // },
                                {
                                    offset: 1,
                                    color: "rgba(64,132,213,0.5)"
                                }
                            ]
                        )
                    }
                },
            },
        },
        {
            name: '销售价格',
            type: 'line',
            symbolSize: 0,
            symbol: 'circle',
            step: 'middle',
            data: [4, 5, 6, 9],
            itemStyle: {
                normal: {
                    color: '#43A1AC',
                    areaStyle: {
                        // 曲线下的渐变色
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
                                    offset: 1,
                                    color: "rgba(70,147,156,0.5)"
                                }
                            ]
                        )
                    }
                },
            },
        }
    ]
};
