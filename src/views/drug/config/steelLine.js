export default {
    grid: {
        top: 130,
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(3,18,44,0.90)",
        extraCssText: "box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;",
        padding: 15,
        confine: true,
        axisPointer: {
            lineStyle: {
                color: "#4088FD",
                width: 1
            }
        }
        // formatter: function (params) {
        //   console.log('2', params);
        //   var arr = []
        //   arr.push(`<div class="f14">${params[0].axisValue}</div>`)
        //   arr.push(`<div class="f10"><span>价格下跌</span><span><span>${params[0].data[2]}</span></div>`)
        //   arr.push(`<div class="f10"><span>价格上涨</span><span><span>${params[0].data[1]}</span></div>`)
        //   arr.push(`<div class="f10"><span>中间价</span><span><span></span></div>`)
        //   return arr.join('<br/>');
        // }
    },
    legend: {
        data: ["订单配送量", "订单量增长", "实际配送量", "实际量增长"],
        top: 80,
        right: 20
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["2018/08", "2018/09", "2018/10", "2018/11", "2018/12", "2019/01"]
    },
    yAxis: [
        {
            type: "value",
            name: "单位：元",
            axisLabel: {
                margin: 10,
                textStyle: {
                    color: "#809CFF",
                    fontSize: 12
                }
            },
            nameTextStyle: {
                color: "#809CFF",
                fontSize: 12,
                align: "right",
                padding: [0, 0, 10, 30]
            }
        },
        {
            type: "value"
        }
    ],
    series: [
        {
            name: "订单配送量",
            type: "line",
            color: "#FFF78A",
            data: [50, 2, 15, 3, 12, 13, 10],
            markLine: {
                data: [{ type: "average", name: "平均值" }]
            }
        },
        {
            name: "订单量增长",
            type: "line",
            color: "#33F0C0",
            data: [10, -2, 20, 5, 30, 2, 0]
        },
        {
            name: "实际配送量",
            type: "line",
            color: "#3B7FEE",
            data: [1, 30, 20, 8, 12, 10, 20],
            markLine: {
                data: [{ type: "average", name: "平均值" }]
            }
        },
        {
            name: "实际量增长",
            type: "line",
            color: "#FF8E36",
            yAxisIndex: 1,  // 第二个Y轴
            data: [6, 4, 2, 20, 35, 2, 30]
        }
    ]
};
