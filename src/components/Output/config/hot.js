var hours = [
    "黄岛街道",
    "辛安街道",
    "薛家岛街道",
    "灵珠山街道",
    "长江路街道",
    "红石崖街道",
    "灵山卫街道",
    "珠海街道",
    "隐珠街道",
    "铁山街道",
    "滨海街道",
    "胶南街道",
    "王台镇",
    "张家楼镇"
];
var days = [
    "研究生教育",
    "博士研究生毕业",
    "硕士研究生毕业",
    "大学本科教育",
    "大学专科教育",
    "中等职业教育",
    "职业高中毕业",
    "技工学校毕业",
    "高中以下",
    "其他"
];
var data1 = [];
var daysLabel = [];
import {
    numFormat
} from "@/filters/index"
let max = numFormat(1000000000)
for (let i = 1; i <= 31; i++) {
    daysLabel.push(i);
}

for (var z = 0; z < hours.length; z++) {
    for (var i = 0; i < days.length; i++) {
        data1.push([i, z, 1 + Math.round(Math.random() * 50)]);
    }
}
data1 = data1.map(function (item) {
    return [item[1], item[0], item[2] || "-"];
});

export default {
    grid: {
        top: '12%',
        left: "13%"
    },
    dataZoom: [{
            type: "slider",
            show: true,
            yAxisIndex: [0],
            right: 60,
            start: 100,
            end: 100,
            width: 8,
            borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            showDetail: false,
            handleSize: false,
            zoomLock: true,
            maxSpan: 80,
            maxValueSpan: 10, //设置显示多少个
            minValueSpan: 10
        },

        {
            // moveONMouseMove: true,
            // zoomOnMouseWheel: "ctrl",
            type: "inside",
            yAxisIndex: [0]
            // start: 190,
            // end: 200
        }
    ],

    tooltip: {
        backgroundColor: "#1A1B1B",
        borderColor: "#7EDEE9",
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        position: "top",
        formatter: function (params) {
            console.log(params, "params");
            return (
                "学历：" +
                days[params.value[1]] +
                "<br/>" +
                "人数：" +
                params.data[2]
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
                backgroundColor: "#303F3B",
                borderColor: 0,
                borderWidth: 0,
                shadowColor: 0,

            },
            crossStyle: {
                color: "#808080",
            }
        }
    },
    animation: false,

    xAxis: {
        axisTick: {
            show: false
        },
        type: "category",
        data: daysLabel,
        axisLine: {
            lineStyle: {}
        },

        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: "category",
        // name: '供应商',
        // nameTextStyle: {
        //     fontFamily: 'PingFangSC-Light',
        //     fontSize: 12,
        //     color: '#A0A3A8',
        //     padding: [-0, 0, 0, 0]
        // },
        axisTick: {
            show: false
        },
        axisLabel: {
            margin: 7,
            textStyle: {
                align: "right",
                color: "#A0A3A8",
                fontSize: 12
            },
            // width: 175,
            align: "right",
            formatter: function (value, index) {
                if (value.length > 10) {
                    return `{lg|}` + value.substring(0, 8) + "...";
                } else {
                    return `{lg|}  ` + value;
                }
            },
            rich: {
                lg: {
                    align: "right",
                    padding: [0, 0, 0, 0],
                    color: "#969698"
                }
            }
        },
        data: days,
        axisLine: {
            lineStyle: {
                color: "#000"
            }
        },

        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 1,
        max: 1000000000,
        orient: "horizontal",
        left: "center",
        top: "20",
        right: 20,
        text: [max, "0"], // 文本，默认为数值文本
        calculable: false,
        color: ["#43A1AC", "#386971", "#2D3034"],
        backgroundColor: '#232528',

        textStyle: {
            fontFamily: "PingFangSC-Light",
            fontSize: "12px",
            color: "#A0A3A8"
        }
    },
    series: [{
        name: "Punch Card",
        type: "heatmap",
        data: data1,
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(35, 37, 40, 0.5)'
            }
        }
    }]
};
