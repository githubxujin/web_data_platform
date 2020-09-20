export default {
    legend: {
        right: 0,
        bottom: 10,
        itemWidth: 5,
        itemHeight: 5,
        itemGap: 15,
        align: 'auto',
        orient: 'vertical',
        icon: 'circle',

        textStyle: {
            color: '#43A1AC',
            fontSize: 14,
            lineHeight: 14,
            padding: [2, 0, 0, 0]
        },
        data: ['经营', '涉诉', '资产/交易', '债券', '新闻事件'],
    },

    series: {
        name: '',
        type: 'pie',
        radius: [57, 67],
        center: ['100', '50%'],
        minAngle: 10,
        hoverOffset: 2,
        label: {
            show: false,
        },
        emphasis: {
            label: {
                show: false,
                color: '#fff',
                fontSize: 12,
                position: 'top',
                backgroundColor: {},

                // borderColor: '#4088FD',
                // borderWidth: 1,
                padding: 25,
                formatter(v) {
                    return v.name + '(' + parseFloat(v.percent).toFixed(2) + '%)'
                }
            },
        },
        color: ['#000'],
        data: [{
                value: 30,
                name: '经营',
                itemStyle: {
                    color: '#000'
                }
            },
            {
                value: 10,
                name: '涉诉',
                itemStyle: {
                    color: '#CB7351  '
                }
            },
            {
                value: 20,
                name: '资产/交易',
                itemStyle: {
                    color: '#9BBC6C '
                }
            },
            {
                value: 20,
                name: '债券',
                itemStyle: {
                    color: '#4584D1 '
                }
            },
            {
                value: 20,
                name: '新闻事件',
                itemStyle: {
                    color: '#3E919C  '
                }
            },

        ]
    }
}
