import up from '../../../assets/images/data/up.png'
import down from '../../../assets/images/data/down.png'
var img = {
    '0': up,
    '1': down,
};

export default {
    animationDuration: 3000,
    grid: {
        top: 100,
        left: 190,
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(3,18,44,0.90)",
        extraCssText: "box-shadow: inset 0 0 7px 0 #4088FD;border-radius: 2px;",
        padding: 15,
        axisPointer: {
            lineStyle: {
                color: "#4088FD",
                width: 1
            }
        },
        formatter: function (params) {
            if (params && params.length === 2) {
                return `<span>${params[1].data.waresName}</span>&nbsp;&nbsp;&nbsp;${params[1].data.value}`
            } else {
                return `<span>${params[0].data.waresName}</span>&nbsp;&nbsp;&nbsp;${params[0].data.value}`
            }
        }
    },
    legend: {
        data: ["单位：元"],
        textStyle: {
            color: "#809CFF"
        },
        top: "63",
        right: "4%"
    },
    xAxis: {
        type: 'value',
        axisLabel: {
            show: true,
            rotate: -40,
            margin: 7,
            textStyle: {
                color: '#809CFF',
                fontSize: 12
            }
        },
        axisTick: {
            show: false,
            alignWithLabel: true
        },
        splitLine: {
            show: false
        },
    },
    yAxis: [{
            type: 'category',
            axisLabel: {
                margin: 7,
                textStyle: {
                    align: 'left',
                    color: '#809CFF',
                    fontSize: 12,
                },
                // width: 175,
                align: 'right',
                formatter: function (value, index) {
                    index = index + 15
                    if (value.length > 12) {
                        return `{lg|${index+1}}  ` + value.substring(0, 12) + "...";
                    } else {
                        return `{lg|${index+1}}  ` + value
                    }
                },
                rich: {
                    lg: {
                        align: 'left',
                        padding: [0, 0, 0, -170],
                        color: '#809CFF',
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

            data: ['注射用头孢唑肟钠注', '保妇康栓', '静注人免疫球蛋白(pH4)', '血液保存液(I)', '保妇康栓', '液保存液(I)'],
        },

    ],
    series: [{
            type: 'bar',
            name: '单位：万元',
            barWidth: 25,
            barGap: "-100%",
            data: [],
            // max: 8000,
            itemStyle: {
                normal: {
                    borderColor: "#11245A",
                    borderWidth: 2,
                    color: {
                        colorStops: [{
                            offset: 1,
                            color: "rgba(38,64,157,0.42)"
                        }]
                    }
                }
            },
        },
        {
            type: "bar",
            label: {
                normal: {
                    show: true,
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
                        color: '#3B7FEE ' //color of value
                    },
                }
            },
            barWidth: 25,
            data: [{
                value: 123.13,
                lift: 'up',
            }, {
                value: 5000,
                lift: 'down'
            }, {
                value: 4000,
                lift: 'down'
            }, {
                value: 3000,
                lift: 'down'
            }, {
                value: 2000,
                lift: 'down'
            }, {
                value: 1000,
                lift: 'up'
            }],
            itemStyle: {
                normal: {
                    color: {
                        type: "linear",
                        global: false,
                        colorStops: [{
                                offset: 0,
                                color: "#1D9CCC"
                            },
                            {
                                offset: 1,
                                color: "#26409D"
                            }
                        ]
                    }
                }
            }
        }
    ],

};
