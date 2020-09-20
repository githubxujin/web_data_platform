export default {
    backgroundColor: '',
    title: {
        text: '',
        textStyle: {
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: 'normal',
            fontFamily: 'PingFangSC-Regular'
        },
        padding: [0, 0, 0, 200]
    },
    tooltip: {
        tooltip: {
            trigger: 'item',
            formatter: "{b}%"
        },
        show: true,
        alwaysShowContent: true,
        backgroundColor: "none",
        position: ["210px", "100px"], // tooltip文字 定位位置
        formatter: function (params) {
            // 这个可以自己写dom样式
            // console.log(params)
            if (params.value === 0) {
                return ``
            } else {
                if (params.seriesIndex === 0) {
                    return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:20px;">${params.value}%</div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                } else {
                    return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:20px;">${params.value}%</div>
                    <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                }
            }

        }
    },


    calculable: true,
    series: [

        {
            name: '',
            type: 'pie',
            hoverAnimation: true, //鼠标移入变大
            radius: [70, 90],
            center: ['50%', '50%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [{
                    value: 13,
                    name: '其他',
                    itemStyle: {

                        color: "#9BBC6C"
                    },
                    label: {
                        color: "rgba(255,255,255,.45)",
                        fontSize: 14,
                        // formatter: '完成梳理部门\n{a|34}个',
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 30
                            },
                        }
                    }
                },
                {
                    value: 40,
                    name: '市政工程',
                    itemStyle: {
                        color: "none"
                    }
                },
                {
                    value: 47,
                    name: '房屋建筑工程',
                    itemStyle: {
                        color: "none"
                    }
                }
            ]
        },
        {
            name: '面积模式',
            type: 'pie',
            radius: [80, 86],
            center: ['50%', '50%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: [{
                    value: 13,
                    name: '其他',
                    itemStyle: {
                        color: "transparent"
                    }
                },
                {
                    value: 40,
                    name: '房屋建筑工程',
                    itemStyle: {

                        color: "#386DDF"
                    },
                    label: {
                        color: "rgba(255,255,255,.45)",
                        fontSize: 14,
                        // formatter: '部门总量\n{a|52}个',
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 30
                            },
                        }
                    }
                },
                {
                    value: 47,
                    name: '市政工程',
                    itemStyle: {

                        color: "#1EA57D"
                    },
                    label: {
                        color: "rgba(255,255,255,.45)",
                        fontSize: 14,
                        // formatter: '部门总量\n{a|52}个',
                        rich: {
                            a: {
                                color: "#fff",
                                fontSize: 20,
                                lineHeight: 30
                            },
                        }
                    }
                }
            ]
        },
        {
            name: '外边框',
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            center: ['50%', '50%'],
            radius: ['45%', '45%'],
            label: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 0,
                tooltip: false,
                name: '',
                itemStyle: {
                    normal: {
                        borderWidth: 2,
                        borderColor: '#34464A'
                    }
                }
            }]
        }
    ]
};
