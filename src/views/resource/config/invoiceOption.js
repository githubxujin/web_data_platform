import {
    numFormat,
} from "@/filters/index";
export default {
    grid: {
        top: 80
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
                width: 0,
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
        formatter: function (params) {
            let str = ""
            params.forEach((i, index) => {
                if (i.data.itemStyle) {
                    str += `${i.marker}${i.seriesName}  ${i.data.value}<br />`
                } else if (index === 0) {
                    str += `${i.marker}${i.seriesName}  ${ numFormat(Number(i.data)) }% <br />`
                } else if (index === 2) {
                    str += `${i.marker}${i.seriesName}  ${ numFormat(Number(i.data).toFixed(2)) } %<br />`
                } else {
                    str += `${i.marker}${i.seriesName}  ${ numFormat(Number(i.data).toFixed(2))} <br />`
                }

            })
            return str

        }
    },
    legend: {
        data: ["作废发票", "作废比例"],
        textStyle: {
            color: "#B4B4B4"
        },
        top: "0",
        right: "center"
    },
    // dataZoom: [{
    //     type: 'slider',
    //     show: false
    //     // top: baseTop + gridHeight * 4 + 20,
    //     // xAxisIndex: [0, 1, 2, 3, 4]
    // }, {
    //     type: 'inside',
    //     // xAxisIndex: [0, 1, 2, 3, 4]
    // }],
    dataZoom: [{
            type: "inside",
            // zoomLock: true,
            start: 0,
            end: 10,
            height: 8,
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10,
        },
        {
            type: "slider",
            bottom: 0,
            left: 40,
            right: 0,
            start: 0,
            end: 10,
            height: 8,
            borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            showDetail: false,
            handleSize: false,
            // zoomLock: true,
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10,
        }
    ],
    xAxis: {
        axisTick: {
            show: false
        },
        axisLabel: {
            fontFamily: "PingFangSC-Light",
            color: '#A0A3A8',
            fontSize: 14,
            interval: 0,
            padding: [0, 6, 0, 0],
            formatter: function (value) { //名称过长  省略号显示
                var res = value
                if (res.length > 7) {
                    res = res.substring(0, 6) + '...'
                }
                return res
            }
        },
        data: []
    },
    yAxis: [{
            //             type: "value",
            // name: "单位/张",
            nameTextStyle: {
                color: '#A0A3A8',
                // align: "right",
                padding: [-20, 0, 0, 0],
                fontFamily: "PingFangSC-Light",
                fontSize: 12
            },
            axisLabel: {
                textStyle: {
                    fontFamily: "PingFangSC-Light",
                    color: '#A0A3A8',
                    fontSize: 12
                }
            }
        },
        {
            splitLine: {
                show: false,

            },

            axisLabel: {
                textStyle: {
                    fontFamily: "PingFangSC-Light",
                    color: '#A0A3A8',
                    fontSize: 12
                },
                formatter: "{value}%",
            }
        }
    ],

    series: [{
            name: "作废比例",
            type: "line",
            symbol: 'circle',
            symbolSize: 6,
            yAxisIndex: 1,
            // lineStyle: {
            //     normal: {
            //         width: 0.5  //   折线宽度
            //     },
            // },
            itemStyle: {
                normal: {
                    color: "#7EDEE9",
                }
            },


            data: []
        },
        {
            name: "作废发票",
            type: "bar",
            barWidth: 40,
            // barGap: 500,
            barCategoryGap: 50,
            itemStyle: {
                normal: {
                    color: "#449BA5"
                }
            },
            emphasis: {
                itemStyle: {
                    color: 'red'
                }
            },
            data: []
        },
    ]
}
