import {
    numFormat
} from "@/filters/index";
import up from '../../../assets/images/data/up.png'
import down from '../../../assets/images/data/down.png'
import echarts from "echarts";
var img = {
    '0': up,
    '1': down,
};

export default {
    backgroundColor: "",
    title: {
        text: '销售商品排名',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [30, 0, 0, 0]
    },
    animationDuration: 3000,
    grid: {
        top: 80,
        left: '8',
        containLabel: true
    },
    tooltip: {
        backgroundColor: "#1A1B1B",
        borderColor: '#7EDEE9',
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        axisPointer: {
            lineStyle: {
                color: "#7EDEE9",
                width: 1
            }
        },
    },
    legend: {
        textStyle: {
            color: "#809CFF"
        },
        top: "26",
        right: "center"
    },
    xAxis: {
        name: "单位：元",
        nameTextStyle: {
            color: '#A0A3A8',
            padding: [44, 0, 0, 20]
        },
        type: 'value',
        axisLabel: {
            show: true,
            // rotate: -40,
            margin: 7,
            textStyle: {
                color: '#A0A3A8',
            },
            padding: [8, 0, 0, 0]
            // formatter: function (v) {
            //     console.log('v',v);
            //     return v
            // }
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: true,
        },
    },
    dataZoom: [],
    yAxis: [{

            type: 'category',
            axisLabel: {
                margin: 7,
                textStyle: {
                    align: 'left',
                    color: '#A0A3A8',
                    fontSize: 12,
                },
                align: 'right',
                formatter: function (value, index) {
                    if (value.length > 10) {
                        return `{lg|}` + value.substring(0, 8) + "...";
                    } else {
                        return `{lg|}  ` + value

                    }
                },
                rich: {
                    lg: {
                        align: 'right',
                        padding: [0, 0, 0, -120],
                        color: '#969698',
                    }
                }
            },
            axisLine: {
                show: true
            },
            inverse: true,
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            show: true,
            data: [],
        },

    ],
    series: [{
            type: 'bar',
            name: '2019',
            barGap: "-2%",
            barWidth: 25,
            data: [],
            label: {
                normal: {
                    show: true,
                    formatter: function (p) {
                        return numFormat(p.data)
                    },
                    position: 'right',
                    rich: {
                        up: {
                            height: 12,
                            align: 'left',
                            backgroundColor: {
                                image: img['0']
                            }
                        },
                        down: {
                            height: 12,
                            align: 'left',
                            backgroundColor: {
                                image: img['1']
                            }
                        },
                    },
                    textStyle: {
                        color: '#63A7F8' //color of value
                    },
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top'
                    },
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                                offset: 0,
                                color: '#232528 '
                            },

                            {
                                offset: 1,
                                color: '#63A7F8'
                            }
                        ]
                    )
                },
            },

        },
        {
            name: '2020',
            type: "bar",
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'top'
                    },

                    color: new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                                offset: 0,
                                color: '#232528'
                            },

                            {
                                offset: 1,
                                color: '#43A1AC'

                            }
                        ]
                    )
                },
            },
            label: {
                normal: {
                    show: true,
                    formatter: function (p) {
                        return numFormat(p.data)
                    },
                    position: 'right',
                    rich: {
                        up: {
                            height: 12,
                            align: 'left',
                            backgroundColor: {
                                image: img['0']
                            }
                        },
                        down: {
                            height: 12,
                            align: 'left',
                            backgroundColor: {
                                image: img['1']
                            }
                        },
                    },
                    textStyle: {
                        color: '#43A1AC' //color of value
                    },
                }
            },
            barWidth: 25,
            data: [],

        }
    ],

};
