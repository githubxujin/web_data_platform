export default {
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
        },
        formatter: function (params) {
            var arr = [];
            arr.push(`<div class="f14">${params[0].axisValue}</div>`);
            arr.push(
                `<div class="f10"><span>最高价格</span><span><span>${params[0].data[2]}</span></div>`
            );
            arr.push(
                `<div class="f10"><span>最低价格</span><span><span>${params[0].data[1]}</span></div>`
            );
            arr.push(
                `<div class="f10"><span>中间价格</span><span><span></span></div>`
            );
            return arr.join("<br/>");
        }
    },
    grid: {
        top: 120,
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true
    },

    xAxis: {
        type: "category",
        splitLine: {
            show: false
        },
        axisLabel: {
            interval: 0,
            margin: 10,
            rotate: 50,
            align: "right",
            textStyle: {
                color: "#809CFF",
                fontSize: 12
            }
        },
        data: [
            "2012-01-01",
            "2012-01-02",
            "2012-01-03",
            "2012-01-04",
            "2012-01-05",
            "2012-01-06",
            "2012-01-07",
            "2012-01-08"
        ]
    },
    yAxis: {
        type: "value",
        name: "单位：元",
        axisLabel: {
            margin: 10,
            textStyle: {
                color: "#809CFF",
                fontSize: 12
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                opacity: 0.5
            }
        },
        nameTextStyle: {
            color: "#809CFF",
            fontSize: 12,
            align: "right",
            padding: [0, 0, 10, 30]
        },
    },
    series: [{
        type: "candlestick",
        barWidth: 25,
        itemStyle: {
            borderWidth: 0,
            color0: {
                // 往下降
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: "#FFA9B6"
                    }, // 开始颜色 -渐变
                    {
                        offset: 1,
                        color: "#E9576E"
                    } // 结束颜色
                ],
                globalCoord: false // 缺省为 false
            },
            borderColor0: "#E9576E",
            color: {
                // 上升
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: "#A3FFE8"
                    }, // 开始颜色 -渐变
                    {
                        offset: 1,
                        color: "#33F0C0"
                    } // 结束颜色
                ],
                globalCoord: false // 缺省为 false
            },
            borderColor: "#33F0C0"
        },
        data: [
            [0, -21, 0, -21],
            [-21, -21, -21, -21],
            [-21, 138, -21, 138],
            [138, 232, 138, 232],
            [232, 222, 232, 222],
            [222, 242, 222, 242],
            [242, 406, 242, 406],
            [0, 406, 0, 406]
        ]
    }]
};
