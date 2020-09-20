export default {
    tooltip: {
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        textStyle: {
            fontFamily: "PingFangSC-Light",
            textAlign: "center"
        },
        trigger: 'item',
        formatter: function (params) {
            console.log(params, 'params')
            return `${params.name}<br />${(params.percent).toFixed(0)}%`
        }
    },
    series: [{
        type: 'pie',
        radius: '100',
        center: ['50%', '50%'],
        color: ['#b4ab74', '#517c6f', '#30477b', '#893420', '#86a15f', '#515176', '#4f4f73', '#718653'],
        data: [{
            name: 'Apples',
            value: 70,
            itemStyle: {
                color: {
                    colorStops: [{
                        offset: 0,
                        color: 'red' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'blue' // 100% 处的颜色
                    }],

                }
            }

        }, {
            name: 'Strawberries',
            value: 68
        }, {
            name: 'Bananas',
            value: 48
        }, {
            name: 'Oranges',
            value: 40
        }, {
            name: 'Pears',
            value: 32
        }, {
            name: 'Pineapples',
            value: 27
        }, {
            name: 'Grapes',
            value: 18
        }],
        animation: false,
        label: {
            // position: 'inside',
            // show: true,
            formatter: '{d}%'
        },
        labelLine: {
            show: false,
            normal: {
                length: 2,
                length2: 4
            }
        },


    }]
}
