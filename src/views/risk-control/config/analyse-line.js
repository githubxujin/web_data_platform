export default {
    animationDuration: 3000,
    grid: {
        top: 70,
        left: 0,
        right: 30,
        bottom: 20,
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        // position: function (point, params, dom, rect, size) {
        //     // 固定在顶部
        //     return {
        //         left: -400
        //     }
        // },
        position: [20, 20],
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
    dataZoom: [{
            type: "inside",
            zoomLock: true,
            start: 100,
            end: 50
        },
        {
            type: "slider",
            bottom: 0,
            left: 80,
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
        type: 'category',

        axisTick: {
            show: false,
            alignWithLabel: true
        },
        data: ['2015', '2016', '2017', '2018', '2019.5']
    },
    yAxis: {
        type: 'value',
        name: '单位：条',
        nameTextStyle: {
            color: '#A0A3A8',
            padding: [0, 0, 0, 60],
            fontSize: 12,
            fontFamily: "PingFangSC-Light",
        },
        axisTick: {
            show: false
        },
        splitLine: {
            show: true,
            lineStyle: {
                // 使用深浅的间隔色
                color: ['#393B3E', '#393B3E']
            }

        },
        data: [1, 2, 3, 4],
        axisLabel: {
            show: true
        }


    },
    color: '#0c1e48',
    series: {
        name: '重大事件发生趋势',
        type: 'line',
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: '#46939C' // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: '#3D4045', // 100% 处的颜色
                        opacity: 0
                    }
                ],
                globalCoord: false // 缺省为 false
            },
            opacity: 0.3
        },
        label: {
            show: false,
            color: '#fff',
            fontSize: 12,
            position: 'top',
            formatter(v) {
                return (v.value + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
            }
        },
        itemStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                        offset: 0,
                        color: '#366F71'
                    }, // 开始颜色 -渐变
                    {
                        offset: 1,
                        color: '#366F71'
                    } // 结束颜色
                ],
                globalCoord: false // 缺省为 false
            }
        },
        barWidth: '12px',
        data: [2, 12, 8, 15, 20]
    }
}
