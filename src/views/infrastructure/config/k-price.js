export default {
    title: {
        text: '近十二个月药品价格波动情况',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [0, 0, 0, 28]
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
                `<div class="f10"><span>价格中位</span><span><span></span></div>`
            );
            return arr.join("<br/>");
        }
    },
    grid: {
        top: 80,
        left: "3%",
        right: "3%",
        bottom: "3%",
        containLabel: true
    },
    dataZoom: [{
        type: "inside",
        zoomLock: true,
        show: true,
        start: 100,
        end: 50,
        handleSize: 8
    },
    {
        type: "slider",
        bottom: 0,
        left: 0,
        right: 0,
        start: 100,
        end: 50,
        height: 8,
        borderColor: "transparent",
        backgroundColor: "#242D30",
        fillerColor: "#2A3C40",
        showDetail: false,
        handleSize: false,
        zoomLock: true
    }
    ],
    xAxis: {
        type: "category",
        splitLine: {
            show: false
        },
        axisLabel: {
            interval: 1,
            margin: 10,
            // rotate: 50,
            align: "right",
        },
        data: [

        ]
    },
    yAxis: {
        name: "单位：元/吨",
        nameTextStyle: {
            color: '#A0A3A8',
            padding: [10, 0, 0, -40]
        },
        type: "value",
        axisLabel: {
            margin: 10,
        },

        min: 3800,
    },
    series: [{
        type: "candlestick",
        barWidth: 8,
        emphasis: {
            itemStyle: {

                borderColor: "none"
            }
        },
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
                    color: "#286760"
                }, // 开始颜色 -渐变
                {
                    offset: 1,
                    color: "#286760"
                } // 结束颜色
                ],
                globalCoord: false // 缺省为 false
            },
            borderColor0: "#286760",
            color: {
                // 上升
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: "#7D352D"
                }, // 开始颜色 -渐变
                {
                    offset: 1,
                    color: "#7D352D"
                } // 结束颜色
                ],
                globalCoord: false // 缺省为 false
            },
            borderColor: "#7D352D"
        },
        data: [

        ]
    }]
};
