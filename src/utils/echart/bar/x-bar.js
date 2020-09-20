import echarts from "echarts";
export default {
    backgroundColor: '',
    tooltip: {
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
    },
    title: {
        text: '销售商品排名',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [0, 0, 0, 20]
    },

    grid: {
        top: 80,
        left: '25',
        containLabel: true
    },
    legend: {
        data: ['收入', '支出'],
        textStyle: {
            color: "#809CFF"
        },
        top: 120,
        right: "30%"
    },
    xAxis: {
        axisLabel: {
            show: true,
            // rotate: -40,
            margin: 7,
            textStyle: {
                color: '#A0A3A8',
            },
            padding: [8, 0, 0, 0]

        },
        axisTick: {
            show: false
        },

        type: 'category',
        data: ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'],

    },

    yAxis: {
        axisLabel: {
            textStyle: {
                color: '#A0A3A8',
                fontSize: 12,
            },
        },
        type: 'value',
        axisTick: {
            show: false
        }



    },
    dataZoom: [{
            type: "inside",
            showDetail: false,
            handleSize: false,
            zoomLock: false,
            start: 100,
            end: 100,
            maxValueSpan: 5, //设置显示多少个
            minValueSpan: 5,
        },
        {
            type: "slider",
            bottom: 30,
            left: 40,
            right: 0,
            start: 50,
            end: 50,
            height: 8,
            showDetail: false,
            handleSize: false,
            zoomLock: false,
            // borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            maxValueSpan: 8, //设置显示多少个
            minValueSpan: 8,
        }
    ],
    series: [{
            name: '收入',
            type: 'bar',
            barGap: "-2%",
            barWidth: 25,
            // barMinHeight: 10,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'top'
                    },
                    color: new echarts.graphic.LinearGradient(
                        0, 1, 0, 0,
                        [{
                                offset: 0,
                                color: '#232528 '
                            },

                            {
                                offset: 1,
                                color: '#63A7F8'
                            }
                        ]
                    )
                },
            },
            data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
        },
        {
            name: '支出',
            barGap: "-2%",
            type: 'bar',
            barWidth: 25,
            // barMinHeight: 10,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'top'
                    },

                    color: new echarts.graphic.LinearGradient(
                        0, 1, 0, 0,
                        [{
                                offset: 0,
                                color: '#232528'
                            },

                            {
                                offset: 1,
                                color: '#43A1AC'

                            }
                        ]
                    )
                },
            },
            data: [400, 500, 500, 500, 500, 400, 400, 500, 500]
        },
    ]
};
