export default {
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
    color: ['#4088FD'],
    // color: ['#FFF78A', '#4088FD', '#33F0C0', '#FFA954', '#4730D2', '#1E4AD5'],
    legend: {
        data: ['钢材1', '钢材2', '钢材3'],
        top: '20',
        right: 'center',
        textStyle: {
            color: '#fff'
        },
        containLabel: true
    },
    grid: {
        top: 60,
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

        axisLabel: { //x轴文字的配置
            show: true,
            textStyle: {
                color: '#A0A3A8',
            }
        },



    },

    yAxis: {
        // name: "单位：条",
        // nameTextStyle: {
        //     color: '#A0A3A8',
        //     padding: [-1230, 0, 0, -30]
        // },

        axisTick: {
            show: false
        },
        type: 'value',

    },
    series: []
};
