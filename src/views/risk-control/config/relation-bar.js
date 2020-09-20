

export default {
    animationDuration: 3000,
    grid: {
        left: 10,
        right: 10,
        bottom: 20,
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(3,18,44,0.90)',
        extraCssText: 'box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;',
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: '#4088FD',
                width: 1
            }
        },
        formatter: '{b}<span class="c_O">({c})</span>'
    },
    dataZoom: [
        {
            type: 'inside',
            zoomLock: true,
            start: 0,
            end: 50,
        },
        {
            type: 'slider',
            bottom: 0,
            left: 0,
            right: 0,
            start: 0,
            end: 50,
            height: 4,
            borderColor: 'transparent',
            backgroundColor: '#263F9B',
            fillerColor: '#1E94C8',
            showDetail: false,
            handleSize: false,
            zoomLock: true
        }],
    yAxis: {
        type: 'value',
        name: '单位：条',
        nameTextStyle: {
            color: '#809CFF',
            fontSize: 12,
            padding: [0, 0, 10, 30]
        },
        axisLabel: {
            margin: 7,
            textStyle: {
                color: '#809CFF',
                fontSize: 12
            }
        },
        axisLine: {
            lineStyle: {
                color: '#384D87',
                opacity: .5
            }
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#384D87',
                opacity: .5
            }
        }
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            margin: 20,
            rotate: 15,
            align: 'center',
            textStyle: {
                color: '#809CFF',
                fontSize: 12
            }
        },
        data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)', '印尼', '美国', '印度', '中国', '世界人口(万)'],
        axisLine: {
            lineStyle: {
                color: '#384D87',
                opacity: .5
            }
        },
        splitLine: {
            show: false,
            lineStyle: {
                color: '#384D87',
                opacity: .5
            }
        },
        axisTick: {
            show: false
        },
    },
    series: 
        {
            name: '相关性条数',
            type: 'bar',
            barWidth: '25',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        { offset: 0, color: '#1D9CCC' }, // 开始颜色 -渐变
                        { offset: 1, color: '#26409D' } // 结束颜色
                    ],
                    globalCoord: false // 缺省为 false
                }
            },
            data: [10, 20, 40, 60, 70, 50, 20, 40, 60, 70, 50]
        }
    
};
