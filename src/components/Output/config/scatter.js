import {
    numFormat
} from '@/filters/index'
export default {
    visualMap: {
        max: 8000000,
        text: ["50", "1"], // 文本，默认为数值文本
        calculable: false,
        textStyle: {
            fontFamily: "PingFangSC-Light",
            fontSize: "12px",
            color: "#A0A3A8"
        },
        top: -20,
        right: 50,

        inRange: {
            // color: ["#AF482B ", "#9BB152", "#32886E"]
            color: ["#32886E", "#9BB152", "#AF482B "]
        },
        padding: [40, 0],
        orient: "horizontal"
    },
    grid: {
        left: "3%",
        right: "6%",
        bottom: "4%",
        containLabel: true
    },
    tooltip: {
        trigger: "item",
        backgroundColor: "#1A1B1B",
        borderColor: "#7EDEE9",
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        showDelay: 0,
        formatter: function (params) {
            console.log(params, 'params')
            return (

                params.value[0] +
                "<br/> " +
                "回款金额: " +
                numFormat(params.value[1])
            );
        },
        axisPointer: {
            show: true,
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            },
            label: {
                show: false
            },
            crossStyle: {
                color: "#808080"
            }
        }
    },

    xAxis: [{
        type: "category",
        nameTextStyle: {
            color: "#3259B8",
            fontSize: 14
        },

        splitLine: {
            show: false,
            lineStyle: {
                type: "dotted"
            }
        }
    }],
    yAxis: [{
        type: "value",
        name: "单位: 元",
        scale: true,
        axisLabel: {
            formatter: "{value}"
        },
        nameTextStyle: {
            fontFamily: "PingFangSC-Light",
            fontSize: 12,
            color: "#A0A3A8",
            padding: [0, 0, 0, 40]
        },
        axisTick: {
            show: true
        },

        splitLine: {
            show: true,
            lineStyle: {
                type: "solid"
            }
        }
    }],
    series: [{
        name: "price-area",
        type: "scatter",
        data: [
            ["2018-01-03", 14.44],
            ["2018-01-03", 24.44],
            ["2018-01-03", 44.44],
            ["2018-01-03", 54.44],
            ["2018-01-03", 64.44],
            ["2018-01-03", 94.44],
            ["2018-02-03", 304.44]
        ],
        symbolSize: function (data) {
            return Math.sqrt(data[1]) / 5e2 * 3;
        },
    }]
};
