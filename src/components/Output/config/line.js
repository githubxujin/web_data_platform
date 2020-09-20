function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
            Math.round(value)
        ]
    }
}

var data = [];
var now = +new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}
export default {
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
        // formatter: function (params) {}
    },
    dataZoom: [{
            type: "inside",
            showDetail: false,
            handleSize: false,
            zoomLock: false,
            start: 100,
            end: 100,
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10,
        },
        {
            type: "slider",
            bottom: 0,
            left: 40,
            right: 0,
            start: 50,
            end: 50,
            height: 8,
            showDetail: false,
            handleSize: false,
            zoomLock: false,
            // borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10,
        }
    ],

    legend: {
        itemHeight: 12,
        itemWidth: 30,
        // selectedMode: false,
        data: ['钢材1', '钢材2', '钢材3'],
        top: '20',
        right: 'center',
        textStyle: {
            color: '#A0A3A8'
        },
    },
    grid: {
        top: 80,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
    },
    xAxis: {

        type: 'category',
        data: ['2019-01-02', '2019-02-03', '2019–03-14', '2019-04-18', '2019-05-03', '2019-07-31',
            '2019-08-16', '2019-09-03', '2019-10-29', '2019-11-14', '2019-12-21'
        ],
        axisTick: {
            show: false
        },
        axisLabel: {
            fontFamily: "PingFangSC-Light",
            color: '#A0A3A8',
            fontSize: 12,
        },
    },
    yAxis: {
        max: function (value) {
            return value.max + 40;
        },
        name: "单位：天",
        nameTextStyle: {
            color: '#A0A3A8',
            fontSize: 12,
            align: 'left',
            padding: [0, 0, 0, 10]
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            textStyle: {
                fontFamily: "PingFangSC-Light",
                color: '#A0A3A8',
                fontSize: 12
            }
        },
        type: 'value',
    },
    series: []
};
