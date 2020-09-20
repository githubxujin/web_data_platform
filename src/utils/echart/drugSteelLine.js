export default {
    backgourndColor: '',

    grid: {
        top: 90,
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true
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
    legend: {
        data: ["实际配送量", "实际量增长"],
        top: 40,
        right: 'center',
        textStyle: {
            color: '#A0A3A8'
        }
    },
    // dataZoom: [{
    //         type: "inside",
    //         zoomLock: true,
    //         start: 20,
    //         end: 50
    //     },
    //     {
    //         type: "slider",
    //         bottom: 0,
    //         left: 90,
    //         right: 30,
    //         start: 0,
    //         end: 50,
    //         height: 8,
    //         borderColor: "transparent",
    //         backgroundColor: "#242D30",
    //         fillerColor: "#2A3C40",
    //         showDetail: false,
    //         handleSize: false,
    //         zoomLock: true
    //     }
    // ],
    xAxis: {
        type: "category",
        data: [],
        splitLine: {
            show: false,
            lineStyle: {
                color: ['#4F5155'],

            }
        },
        axisLabel: { //x轴文字的配置
            show: true,
            textStyle: {
                color: '#A0A3A8',
            }
        },
    },
    yAxis: [{
            name: "单位：元",
            nameTextStyle: {
                color: '#A0A3A8',
                padding: [0, 0, 0, -30]
            },
            type: "value",
            axisLabel: { //x轴文字的配置
                show: true,
                textStyle: {
                    color: '#A0A3A8',
                }
            },
            color: "#33F0C0",

        },
        {
            type: "value",
            axisLabel: {
                formatter: '{value} %',
                show: true,
                textStyle: {
                    color: '#A0A3A8',
                }
            },
            splitLine: {
                show: false
            },

        }
    ],
    series: [{
            name: "实际配送量",
            type: "line",
            symbolSize: 6,
            symbol: 'circle',
            color: "#76F0FF",
            data: [],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                }
            },

        },
        {
            name: "实际量增长",
            type: "line",
            symbolSize: 6,
            symbol: 'circle',
            color: "#63A7F8",
            yAxisIndex: 1, // 第二个Y轴
            data: [],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    }
                }
            },
        }
    ]
};
