import echarts from "echarts"
export default {
    title: {
        text: '世界人口总量',
        subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',

    },
    dataZoom: [{
            type: "slider",
            show: true,
            yAxisIndex: [0],
            right: 60,
            start: 100,
            end: 100,
            width: 8,
            borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            showDetail: false,
            handleSize: false,
            zoomLock: true,
            maxSpan: 80,
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10
        },

        {
            // moveONMouseMove: true,
            // zoomOnMouseWheel: "ctrl",
            type: "inside",
            yAxisIndex: [0]
            // start: 190,
            // end: 200
        }
    ],
    yAxis: {
        type: 'category',
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    },
    series: [{
            type: 'bar',
            barWidth: 20,
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        position: 'top'
                    },
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                                offset: 0,
                                color: '#24282D '
                            },
                            {
                                offset: 0.5,
                                color: '#456A96'
                            },
                            {
                                offset: 1,
                                color: '#63A7F8'
                            }
                        ]
                    )
                },
            },
        },

    ]
};
