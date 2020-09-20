import {
    numFormat2,
    numFormat
} from "@/filters/index"
import echarts from "echarts";
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

                    str += `${i.marker}${i.seriesName} ${numFormat(Number(i.data.value))} <br />`
                } else if (index === 0) {
                    str += `${i.marker}${i.seriesName} ${ Number(i.data).toFixed(2) }% <br />`
                } else if (index === 2) {
                    str += `${i.marker}${i.seriesName}  ${ numFormat2(Number(i.data)) }%<br />`
                } else {
                    str += `${i.marker}${i.seriesName} ${ numFormat2(Number(i.data))}`
                }

            })
            return str
            // let num = Number(params[0].data).toFixed(2)
            // let num1 = Number(params[2].data).toFixed(2)
            // return `<p style="text-align:center;">${params[0].axisValue}</p><span style="display:inline-block;background: #FFF78A;width:8px;height:8px;margin-right:5px;border-radius: 4px;"></span><span style="font-size:14px;">${params[2].seriesName}：${num1 + '%'}</span>
            // <br/><span style="display:inline-block;background: #33F0C0;width:8px;height:8px;margin-right:5px;border-radius: 4px;"></span><span style="font-size:14px;">${params[0].seriesName}：${num + '%'}</span>
            // <br/><span style="display:inline-block;background: #4088FD;width:8px;height:8px;margin-right:5px;border-radius: 4px;"></span><span style="font-size:14px;">${params[1].seriesName}：${params[1].data.value}</span>`

        }
    },
    legend: {
        data: ["作废发票", "作废比例"],
        textStyle: {
            color: "#B4B4B4"
        },

    },
    xAxis: {
        axisTick: {
            show: false
        },
        data: []
    },
    yAxis: [{
            //             type: "value",
            // name: "单位/张",
            nameTextStyle: {
                color: '#A0A3A8',
                align: "right"
            },
        },
        {
            axisLabel: {
                textStyle: {
                    color: '#A0A3A8',
                },
                formatter: "{value}%",
            }
        }
    ],

    series: [{
            name: "环比增长",
            type: "line",
            symbol: 'circle',
            symbolSize: 6,
            yAxisIndex: 1,
            itemStyle: {
                normal: {
                    color: "#A8F0F8 ",

                }
            },
            data: []
        },
        {
            name: "发票张数或者金额",
            type: "bar",
            barWidth: 20,
            itemStyle: {
                normal: {
                    borderColor: "#26409D",
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: "#188df0"
                        },
                        {
                            offset: 0.4,
                            color: "#26409D"
                        },
                        {
                            offset: 1,
                            color: "rgba(38,64,157,0.00)"
                        }
                    ])
                }
            },
            emphasis: {
                itemStyle: {
                    color: 'red'
                }
            },
            data: []
        },
        {
            name: "同比增长",
            type: "line",
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
                normal: {
                    color: "#7EDEE9",
                    lineStyle: {
                        type: "dotted"
                    }
                }
            },
            data: []
        },
    ]
}
