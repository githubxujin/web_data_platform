export default {
    grid: {
        left: '6%',
    },
    backgroundColor: '',
    title: {
        text: '销售商品排名',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [0, 0, 0, 30]
    },
    tooltip: {
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
        formatter: function (params) {
            console.log(params)
            return `<div>${params.marker}${params.name}</div>
                    <div style="text-indent: 14px;">${params.value}万元</div>
            `

        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        barWidth: 40,
        data: [120, 200, 150, 80, 70, 110, 130],
        itemStyle: {},
        emphasis: {},
        type: 'bar'
    }]
};
