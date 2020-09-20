export default {
    title: {
        text: '',
    },
    tooltip: {
        trigger: "axis",
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
        }
    },
    grid: {
        top: 0,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        "axisLabel": {
            "fontFamily": "PingFangSC-Light",
            "color": "#A0A3A8",
            "fontSize": 14
        },
        splitLine: {
            show: false
        },
        "axisTick": {
            "show": false
        },
    },
    yAxis: {

        splitLine: {
            show: true,
            lineStyle: {
                color: ['#393B3E'],

            },
        },
        "axisLabel": {
            "fontFamily": "PingFangSC-Light",
            "color": "#A0A3A8",
            "fontSize": 14
        },
        type: 'category',

        "axisTick": {
            "show": false
        },
        data: ['总费用', '房租', '水电费', '交通费', '伙食费', '日用品数']
    },
    series: [{
            name: '辅助',
            type: 'bar',
            stack: '总量',
            barWidth: 16,
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },

            data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
            name: '生活费',
            type: 'bar',
            stack: '总量',
            label: {
                show: false,
                position: 'inside'
            },
            itemStyle: {
                color: '#3B5677'
            },

            emphasis: {
                itemStyle: {
                    color: '#62A5F5'
                }
            },

            data: [2900, 1200, 300, 200, 900, 300]
        }
    ]
};
