//#4F5155
export default {
    title: {
        text: '近十二个月药品价格波动情况',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [10, 0, 0, 28]
    },
    legend: {
        data: ["生物合成人胰岛素注射液", "物西咪替丁片", "华法林钠片", "生物合成人胰岛素注射液增长率", "物西咪替丁片增长率", "华法林钠片增长率"],
        top: '80',
        right: 'center',
        textStyle: {
            color: '#A0A3A8'
        },
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
    },
    grid: {
        top: 160,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true
    },
    xAxis: [{
        type: "category",
        data: ['2019-01-02', '2019-02-03', '2019–03-14', '2019-04-18', '2019-05-03', '2019-07-31',
            '2019-08-16', '2019-09-03', '2019-10-29', '2019-11-14', '2019-12-21'
        ],
        axisLabel: { //x轴文字的配置
            show: true,
            textStyle: {
                color: '#A0A3A8',
            }
        },

    }],
    yAxis: [{
            type: "value",
            splitLine: {
                show: true,
            },
            axisLabel: { //x轴文字的配置
                show: true,
                textStyle: {
                    color: '#A0A3A8',
                }
            },
        },
        {
            type: "value",
            position: "rgiht",
            axisLabel: {
                formatter: "{value}%"
            },
            splitLine: {
                show: false,
            },
        },

    ],
    series: []
};
