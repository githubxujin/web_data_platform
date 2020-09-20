
var rich = {
    percent: {
        padding: [6, 4],
        align: 'center'
    },
    name: {
        fontSize: 14,
        align: 'center'
    }
}
export default {
    series: {
        name: '归档处理情况',
        type: 'pie',
        radius: ['48%', '58%'],
        silent: true,
        label: {
            show: false,
            position: 'center',
        },
        emphasis: {
            label: {
                show: true,
                color: '#fff',
                fontSize: 14,
                position: 'center',
                padding: 25,
                formatter(v) {
                    return [
                        '{percent|' + v.percent + '%}',
                        '{name|' + v.name + '}'
                    ].join('\n')

                },
                rich: rich
            },

        },
        data: [
            {
                value: 10,
                name: '未处理',
                itemStyle: {
                    color: '#17D7EB'
                }
            },
            {
                value: 90,
                name: '已处理',
                itemStyle: {
                    color: '#253E9A '
                }
            }
        ]
    }
}
