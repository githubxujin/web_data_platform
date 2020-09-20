let imgDom = document.createElement('img')
let imgDom1 = document.createElement('img')
imgDom.src = require('@/assets/images/bar-bg.png')
imgDom1.src = require('@/assets/images/bar-bg1.png')

export default {
    animationDuration: 3000,
    grid: {
        top: 20,
        left: 10,
        right: 30,
        bottom: 0,
        containLabel: true
    },
    tooltip: {
        confine: true,
        trigger: 'axis',
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light",
        },
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
    },
    xAxis: {
        name: "单位：条",
        nameTextStyle: {
            color: '#A0A3A8',
            padding: [44, 0, 0, 20],
            fontSize: 12
        },
        axisLabel: {
            show: true,
        },
        type: 'value',
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: false
        }
    },
    yAxis: {
        type: 'category',
        inverse: true,
        axisLabel: {
            margin: 7,
            width: 120,
            textStyle: {
                fontSize: 12
            },
            formatter: function (v) {
                return v.substring(0, 8) + '...'
            },
        },
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
        axisTick: {
            show: false
        },
    },
    series: [{
            name: '舆情分类Top10',
            type: 'bar',
            barWidth: '12',
            barGap: '-100%',
            itemStyle: {
                color: {
                    image: imgDom1, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    repeat: 'repeat'
                }
            },
            data: [700000, 700000, 700000, 700000, 700000, 700000]
        },
        {
            name: '舆情分类Top10',
            type: 'bar',
            barWidth: '12',
            itemStyle: {
                color: {
                    image: imgDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                    repeat: 'repeat'
                }
            },
            data: [18203, 23489, 29034, 104970, 131744, 630230]
        },
    ]

};
