import "echarts-liquidfill";
export default {
    backgroundColor: '',
    series: [{
            type: "liquidFill",
            amplitude: 0,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    color: "#000",
                    opacity: 0.4,
                    shadowBlur: 0,
                    shadowColor: "blue"
                }
            },
            data: [{
                value: 0,

                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        // opacity: 0.6,
                        // color: "#243132" // 30354C
                    }
                }
            }, ],
            backgroundStyle: {
                color: "#232528", //背景颜色
                shadowColor: "#1d1e23", //阴影
                shadowBlur: 6 //阴影模糊
            },
            radius: 102,
            center: ["50%", "50%"],
            outline: {
                itemStyle: {
                    borderColor: "#34464A",
                    borderWidth: 1.5
                },
                borderDistance: 0
            }
        },
        {
            type: "pie",
            radius: ["56", "60"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            labelLine: {
                show: false
            },
            color: "#2D3034",
            minAngle: 10,
            data: [{
                    // 数据项的名称
                    name: "数据1",
                    // 数据项值8
                    value: 20,
                },
                {
                    name: "数据2",
                    value: 11
                },
                {
                    name: "数据3",
                    value: 10,

                },
            ]
        }
    ]
};
