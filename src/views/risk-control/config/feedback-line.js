import echarts from "echarts";
export default {
    animationDuration: 3000,
    grid: {
        top: 50,
        left: 30,
        right: 30,
        bottom: 0,
        containLabel: true
    },
    tooltip: {
        trigger: "axis",
        backgroundColor: "#1A1B1B",
        borderColor: "#7EDEE9",
        borderWidth: 1,
        padding: 15,
        textStyle: {
            fontFamily: "PingFangSC-Light"
        },
        axisPointer: {
            lineStyle: {
                width: 2,
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                            offset: 0,
                            color: "rgba(120,207,214,0)"
                        },
                        {
                            offset: 0.5,
                            color: "rgba(67,161,172,1)"
                        },
                        {
                            offset: 1,
                            color: "rgba(67,161,172,0)"
                        }
                    ],
                    global: false
                }
            }
        },
        formatter: '<span class="c_O pl10">{b}</span> <br /> <span class="c_O pl10">数量  {c}条</span>  '
    },
    dataZoom: [{
            type: "inside",
            zoomLock: true,
            show: true,
            start: 0,
            end: 30,
            handleSize: 8
        },
        {
            type: "slider",
            bottom: 0,
            left: 0,
            right: 0,
            start: 100,
            end: 20,
            height: 8,
            borderColor: "transparent",
            backgroundColor: "#242D30",
            fillerColor: "#2A3C40",
            showDetail: false,
            handleSize: false,
            zoomLock: true
        }
    ],
    xAxis: {
        type: "category",
        boundaryGap: ["20%", "20%"],
        axisLabel: {
            margin: 0,
            padding: [10, 2, 10, 2],
            rotate: 0,
            interval: 8
        },

        axisLine: {},
        axisTick: {
            show: false,
            alignWithLabel: true,
            interval: 20
        },
        data: ["2015", "2016", "2017", "2018", "2019.5"]
    },
    yAxis: {
        type: "value",
        nameTextStyle: {
            color: "#A0A3A8",
            fontSize: 12,
            padding: [0, 0, 10, 30]
        },
        axisLabel: {
            margin: 7
        },
        axisLine: {},
        axisTick: {
            show: false
        },
        splitLine: {
            show: true
        }
    },
    color: "#0c1e48",
    series: {
        name: "企业风险地图",
        type: "line",
        areaStyle: {
            // 曲线下的渐变色
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: "rgba(61,64,69,0)"
                },
                {
                    offset: 1,
                    color: "rgba(70,147,156,0.5)"
                }
            ])
        },
        label: {
            show: false,
            color: "#fff",
            fontSize: 12,
            position: "top",
            formatter(v) {
                return (v.value + "").replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
            }
        },
        itemStyle: {
            color: "#7EDEE9"
        },
        barWidth: "12px",
        data: [2, 12, 8, 15, 20]
    }
};
