import "echarts-liquidfill";
export default {
    backgroundColor: '',
    series: [
        {
            type: "liquidFill",
            amplitude: 6,
            itemStyle: {
                normal: {
                    color: "#000",
                    opacity: 0.4,
                    shadowBlur: 0,
                    shadowColor: "blue"
                }
            },
            data: [{
                value: 0,
                label: {
                    normal: {
                        formatter: function (v) {
                            return v.value * 1000 / 10 + '{min| %}'
                        },
                        rich: {
                            min: {
                                fontSize: 12
                            }
                        },
                        color: "#43B7A5",
                        textStyle: {
                            fontSize: 26,
                            fontWeight: "normal",
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        opacity: 0.6,
                        color: "#243132" // 30354C
                    }
                }
            }, ],
            backgroundStyle: {
                color: "#232528", //背景颜色
                shadowColor: "#1d1e23", //阴影
                shadowBlur: 6 //阴影模糊
            },
            radius: 92,
            center: ["50%", "50%"],
            outline: {
                itemStyle: {
                    borderColor: "#1F665B",
                    borderWidth: 1
                },
                borderDistance: 0
            }
        },
        {
            type: "pie",
            radius: ["57", "62"],
            center: ["50%", "50%"],
            hoverAnimation: false,
            labelLine: {
                show: false
            },
            color: "#2D3034",

            data: [{
                    // 数据项的名称
                    name: "数据1",
                    // 数据项值8
                    value: 130,
                    itemStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: "#43B7A5" // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#1F665B" // 100% 处的颜色
                                }
                            ],
                            global: false // 缺省为 false
                        }
                    }
                },
                {
                    name: "数据2",
                    value: 40
                }
            ]
        }
    ]
};
