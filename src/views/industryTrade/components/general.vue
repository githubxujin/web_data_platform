<template>
    <div>
        <h3 class="data-title qushi">趋势</h3>
        <div class="table-wrap echart-cont">
            <div class="echart-big-wrap p-re">
                <div class="echart-big-title num-left">中国建筑-供应商中标数据</div>
                <div class="echart-unit">单位: 条</div>
                <chart height="400px" width="1168px" id="general" :option="option" />
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}" @click.native="tagHand1(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
            </div>
        </div>
        <h3 class="data-title">概况</h3>
        <div class="table-wrap data-content">
            <div class="detail-left">
                <p>中国建筑-中标企业分布</p>
                <div class="chart-list">
                    <div id="cooperation" style="width:200px;height:200px;"></div>
                    <ul>
                        <li>
                            已合作企业
                            <span>{{processed}}</span>
                            <!-- <span>60%</span> -->
                        </li>
                        <li>
                            未合作企业
                            <span>{{noCooperation}}</span>
                            <!-- <span>40%</span> -->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="detail-right">
                <p>中国建筑-招标物资分布</p>
                <div class="chart-list">
                    <div id="material" style="width:200px;height:200px;"></div>
                    <table class="tab-con" cellspacing="0">
                        <tr v-for="(item,inx) in dataArr" :key="inx">
                            <td>
                                <div>
                                    <i :style="{background:item.color}"></i>
                                    {{item.name}}
                                    <span>{{item.value}}</span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import { deepClone } from "@/utils/common";
import steelLine from "@/utils/echart/steelLine.js";
import Chart from "@/components/Charts/invoiceInvalid";
import cOp from "@/components/common/c-op";
export default {
    components: {
        cOp,
        Chart
    },
    data() {
        return {
            dataArr: [],
            darkColor: {
                topLine: {
                    areaStyle: ['rgba(61,64,69,0)', 'rgba(70,147,156,0.5)'],
                    normal: '#43A1AC',
                    emphasis: '#43A1AC',
                    borderColor: "rgba(67,161,172,1)",
                    colorStops: [
                        {
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
                    lineStyle: '#37393c',
                },
                leftPie: {
                    alreadyColor: new echarts.graphic.LinearGradient(
                        0,
                        1,
                        0,
                        0,
                        [
                            {
                                offset: 1,
                                color: "#43b7a5" // 0% 处的颜色
                            },
                            {
                                offset: 0.5,
                                color: "#1f665b" // 100% 处的颜色
                            },
                            {
                                offset: 0,
                                color: "#353F56" // 100% 处的颜色
                            }
                        ],
                        false
                    ),
                    overColor: '#2B3A3F',
                    normal: 'rgb(41, 49, 52)',
                },
                rightPie: {
                    color: [{
                        name: '其它',
                        color: '#358E80'
                    }, {
                        name: '其它钢材',
                        color: '#2C7D70'
                    }, {
                        name: '劳务',
                        color: '#A23A40'
                    }, {
                        name: '型钢',
                        color: '#337B8B'
                    }, {
                        name: '木枋',
                        color: '#4688B9'
                    }, {
                        name: '模板',
                        color: '#4685D1'
                    }, {
                        name: '水泥',
                        color: '#74B683'
                    }, {
                        name: '混凝土',
                        color: '#9BBC6C'
                    }, {
                        name: '钢筋',
                        color: '#BFA559'
                    }, {
                        name: '钢结构',
                        color: '#CC7451'
                    }]
                }
            },
            option: {},
            cooperationData: {},
            theMaterial: {},
            params: {
                dateType: "1"
            },
            processed: 0,
            noCooperation: 0,
            tagCur1: 0,
            tagList1: [
                {
                    value: 1,
                    label: "周"
                },
                {
                    value: 2,
                    label: "月"
                },
                {
                    value: 3,
                    label: "季"
                }
            ],

        };
    },
    watch: {
        flag(e) {
            this.init();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag;
            },
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(e) {
            if (this.flag === 'light') {
                this.getChart(this.$infrastructure.biddingDate);
                this.getCooperation(this.$infrastructure.biddingDate);
                this.getTheMaterial(this.$infrastructure.biddingDate);
            } else {
                this.getChart(this.darkColor);
                this.getCooperation(this.darkColor);
                this.getTheMaterial(this.darkColor);
            }
        },
        //控制周月季
        tagHand1(k, value) {
            this.tagCur1 = k;
            this.params.dateType = value;
            if (this.flag === 'light') {
                this.getChart(this.$infrastructure.biddingDate);
            } else {
                this.getChart(this.darkColor);
            }
        },
        getChart(color) {
            this.$http("/dcp/bid/trend", this.params, { type: "get" }).then(
                res => {
                    let steelLineDraw = deepClone(steelLine);
                    let dateArr =
                        res.data.length > 0
                            ? res.data[0].data.map(i => i.date)
                            : [];
                    var zj;
                    let key = dateArr.reduce((acc, cur) => {
                        acc[cur] = 0;
                        return acc;
                    }, {});
                    zj = deepClone(key);
                    res.data[0].data.map(i => {
                        zj[i.date] = i.value;
                    });
                    steelLineDraw.tooltip.backgroundColor = this.$medicine.tooltipBG
                    steelLineDraw.tooltip.borderWidth = 0;
                    steelLineDraw.tooltip.axisPointer = {
                        lineStyle: {
                            width: 2,
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: color.topLine.colorStops,
                                global: false
                            }
                        }
                    };
                    steelLineDraw.tooltip.formatter = function (params) {
                        return `<div style="font-family: PingFangSC-Light;font-size: 14px;letter-spacing: 1.17px;">${params[0].name}</div>
                        <div style="font-family: PingFangSC-Light;font-size: 14px;letter-spacing: 1.17px;"><span style="color: #A0A3A8;">中标数量：</span>${params[0].value}</div>`;
                    };
                    steelLineDraw.xAxis.data = dateArr;
                    steelLineDraw.xAxis.axisLine = {
                        lineStyle: {
                            'color': color.topLine.lineStyle,
                        }
                    }
                    steelLineDraw.yAxis.splitLine = {
                        lineStyle: {
                            'color': color.topLine.lineStyle,
                        }
                    }
                    steelLineDraw.yAxis.axisLine = {
                        lineStyle: {
                            'color': color.topLine.lineStyle,
                        }
                    }
                    steelLineDraw.xAxis.axisLabel = {
                        margin: 14
                    };
                    steelLineDraw.yAxis.axisLabel = {
                        margin: 14
                    };
                    if (this.flag === 'light') {
                        steelLineDraw.xAxis.axisLabel = {
                            margin: 14,
                            textStyle: {
                                color: this.$medicine.nameColor
                            },
                        };
                        steelLineDraw.yAxis.axisLabel = {
                            margin: 14,
                            textStyle: {
                                color: this.$medicine.nameColor
                            },
                        };
                    }
                    steelLineDraw.series = [
                        {
                            name: "",
                            type: "line",
                            smooth: "true", // 显示曲线
                            areaStyle: {
                                // 曲线下的渐变色
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    1,
                                    0,
                                    0,
                                    [
                                        {
                                            offset: 0,
                                            color: color.topLine.areaStyle[0]
                                        },
                                        {
                                            offset: 1,
                                            color: color.topLine.areaStyle[1]
                                        }
                                    ]
                                )
                            },
                            itemStyle: {
                                normal: {
                                    // 曲线颜色
                                    color: color.topLine.normal,
                                    label: {
                                        show: false
                                    }
                                },
                                emphasis: {
                                    //  鼠标经过曲线时的颜色
                                    color: color.topLine.emphasis,
                                    borderColor: color.topLine.borderColor
                                }
                            },
                            data: Object.values(zj)
                        }
                    ];
                    steelLineDraw.legend.data = res.data.map(
                        i => i.coreCompany
                    );
                    this.option = steelLineDraw;
                }
            );
        },
        getCooperation(color) {
            this.$http("/dcp/bid/cooperation/rate", {}, { type: "get" }).then(
                res => {
                    this.processed = res.data * 100 + "%";
                    this.noCooperation = 100 - res.data * 100 + "%";
                    // let cooperationData = deepClone(cooperation)
                    const myChart = echarts.init(
                        document.getElementById("cooperation")
                    );
                    let _this = this;
                    var value = "";
                    var name = "";
                    var option = {
                        tooltip: {
                            show: true,
                            alwaysShowContent: true,
                            backgroundColor: "none",
                            position: ["25px", "65px"], // tooltip文字 定位位置
                            formatter: function (params) {
                                // 这个可以自己写dom样式
                                value = params.value;
                                name = params.name === "已完成"
                                    ? "已合作企业"
                                    : "未合作企业";
                                if (_this.flag === 'light') {
                                    if (params.seriesIndex === 0) {
                                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                        <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                                    } else {
                                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                        <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                                    }
                                } else {
                                    if (params.seriesIndex === 0) {
                                        return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                            <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                                    } else {
                                        return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                            <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                                    }
                                }
                            }
                        },
                        series: [
                            {
                                //  外圆
                                name: "",
                                center: ["50%", "50%"],
                                type: "pie",
                                radius: ["80", "90"],
                                // hoverAnimation: false,
                                label: {
                                    normal: {
                                        position: "center",
                                        show: false
                                    },
                                    emphasis: {
                                        show: false
                                    }
                                },
                                data: [
                                    {
                                        value: res.data * 100,
                                        // value: 60,
                                        name: "已完成",
                                        itemStyle: {
                                            color: color.leftPie.alreadyColor
                                        }
                                    },
                                    {
                                        value: 100 - res.data * 100,
                                        // value: 40,
                                        name: "未完成",
                                        itemStyle: {
                                            color: color.leftPie.overColor
                                        }
                                    }
                                ]
                            },
                            //  内圆
                            {
                                name: "",
                                center: ["50%", "50%"],
                                type: "pie",
                                radius: ["70", "71"],
                                hoverAnimation: false,
                                label: {
                                    normal: {
                                        position: "center",
                                        show: false
                                    }
                                },
                                data: [
                                    {
                                        value: 0,
                                        name: "",
                                        itemStyle: {
                                            color: color.leftPie.normal
                                        }
                                    }
                                ]
                            }
                        ]
                    };
                    // console.log(JSON.stringify(option), "图");
                    myChart.setOption(option);
                    myChart.dispatchAction({
                        type: "showTip",
                        seriesIndex: 0,
                        dataIndex: 0
                    });
                }
            );
        },
        getTheMaterial(color) {
            this.$http(
                "/dcp/bid/material/top",
                { bidChannelEnum: "中建" },
                { type: "get" }
            ).then(res => {
                var colorArr = [];
                this.dataArr = [];
                var total =
                    res.data.materialYearRate[
                        res.data.materialYearRate.length - 1
                    ].all;
                var data = JSON.parse(JSON.stringify(res.data.materialYearRate)).slice(0, res.data.materialYearRate.length - 1)
                let newColor = color.rightPie.color;
                data.forEach((v, i) => {
                    v.value = ((v.value / total) * 100).toFixed(2);
                    newColor.find(x => {
                        if (x.name === v.name) {
                            this.dataArr.push({
                                value: v.value + "%",
                                name: v.name,
                                color: x.color,
                            })
                            colorArr[i] = x.color
                        }
                    });

                });
                data = [...data];
                const myChart = echarts.init(
                    document.getElementById("material")
                );
                var value = "";
                var name = "";
                let _this = this;
                var option = {
                    tooltip: {
                        show: true,
                        alwaysShowContent: true,
                        backgroundColor: "none",
                        position: ["13%", "35%"], // tooltip文字 定位位置
                        formatter: function (params) {
                            // 这个可以自己写dom样式
                            if (_this.flag === 'light') {
                                if (params.seriesIndex === 0) {
                                    value = params.value;
                                    name = params.name;
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFang-SC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                                }
                            } else {
                                if (params.seriesIndex === 0) {
                                    value = params.value;
                                    name = params.name;
                                    return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${params.name}</div>`;
                                } else {
                                    return `<div style="width:140px;text-align:center;color:#43A1AC;font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:rgb(194, 194, 195);text-align:center;margin-top:7px;">${name}</div>`;
                                }
                            }
                        }
                    },
                    series: [
                        {
                            // 外圆
                            hoverOffset: 3,
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["80", "90"],
                            color: colorArr,
                            startAngle: 135,
                            labelLine: {
                                normal: {
                                    length: 25
                                }
                            },
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                },
                                emphasis: {
                                    show: false
                                }
                            },
                            data: data
                        },
                        {
                            //  内圆
                            type: "pie",
                            center: ["50%", "50%"],
                            radius: ["70", "71"],
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: "center",
                                    show: false
                                }
                            },
                            data: [
                                {
                                    value: 0,
                                    name: "",
                                    itemStyle: {
                                        normal: {
                                            color: color.leftPie.normal
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                };
                // console.log(JSON.stringify(option), "option");
                myChart.setOption(option);
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                //设置默认选中高亮部分
                myChart.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                myChart.on("mouseover", function (e) {
                    //当检测到鼠标悬停事件，取消默认选中高亮
                    if (index) {
                        myChart.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: index
                        });
                    } else {
                        myChart.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }

                    //高亮显示悬停的那块
                    myChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                });
                var index = "";
                //检测鼠标移出后显示之前默认高亮的那块
                myChart.on("mouseout", function (e) {
                    // console.log('e',e);
                    myChart.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                    index = e.dataIndex;
                });
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    @import "~@/assets/css/echart.scss";

    .dark {
        tr {
            float: left;
            width: 50%;
            float: left;
            border-top: 1px solid #2e3236;
            width: 50%;
            margin-top: -1px;
            border-bottom: 1px solid #2e3236;
        }
        .echart-unit {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #a0a3a8;
            letter-spacing: 1px;
            text-align: right;
            position: absolute;
            top: 14px;
            left: 66px;
        }
        .p-re {
            position: relative;
        }
        .tag-box {
            position: absolute;
            top: 8px;
            right: -180px;
            width: 410px;
            .c-tag + .c-tag {
                margin-left: 10px;
            }
        }
        .echart-cont {
            padding-top: 60px;
            padding-left: 100px;
        }
        .num-left {
            // top: 22px;
            width: 500px;
            text-align: left;
            padding-left: 20px;
            font-size: 16px;
            letter-spacing: 1.5px;
        }
        .data-title {
            width: 100%;
            height: 52px;
            line-height: 52px;
            background: rgb(29, 30, 35);
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #cccccc;
            letter-spacing: 1.17px;
            font-weight: normal;
            margin: 0;
        }
        .qushi {
            margin-top: -20px;
        }
        .data-content {
            display: flex;
            justify-content: space-between;
            padding: 60px 59px 44px 60px;
            margin-bottom: 35px;
            p {
                margin: 0;
                // font-family: PingFangSC-Regular;
                font-size: 16px;
                letter-spacing: 1.5px;
                color: #ffffff;
                letter-spacing: 1.5px;
                margin-bottom: 50px;
            }
            .detail-left {
                width: 450px;
                height: 270px;
                border-right: 1px solid #2e3236;
            }
            .detail-right {
                width: 750px;
                height: 270px;
                padding-left: 58px;
            }
            .chart-list {
                display: flex;
                ul {
                    width: 210px;
                    margin-top: 54px;
                    list-style: none;
                    li {
                        height: 18px;
                        line-height: 18px;
                        padding-left: 15px;
                        font-size: 12px;
                        color: #43a1ac;
                        letter-spacing: 0;
                        font-family: PingFangSC-Light;
                        position: relative;
                        &::before {
                            content: "";
                            width: 6px;
                            height: 6px;
                            background: #43b7a5;
                            border-radius: 50%;
                            position: absolute;
                            top: 6px;
                            left: 0;
                        }
                        span {
                            margin-left: 20px;
                            color: #909399;
                        }
                        &:last-child {
                            margin-top: 20px;
                            &::before {
                                background: #2b3a3f;
                            }
                        }
                    }
                }
                .tab-con {
                    width: 430px;
                    height: 168px;
                    margin-left: 50px;
                    margin-top: 15px;
                    td {
                        width: 215px;
                        font-size: 14px;
                        color: #43a1ac;
                        letter-spacing: 1.17px;
                        height: 30px;
                        line-height: 30px;
                        // border: 1px solid #2E3236;
                        &:first-child {
                            border-left: 0;
                            padding-left: 15px;
                            /* border-top: 1px solid #2e3236; */
                            border-right: 1px solid #2e3236;
                        }
                        &:last-child {
                            border-right: 0;
                            padding-left: 34px;
                            /* border-top: 1px solid #2e3236; */
                            div {
                                span {
                                    margin-right: 30px;
                                }
                            }
                        }
                        div {
                            position: relative;
                            padding-left: 15px;
                            overflow: hidden;
                            font-family: PingFangSC-Light;
                            letter-spacing: 1.17px;
                            font-size: 14px;
                            i {
                                position: absolute;
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background: #358e80;
                                top: 14px;
                                left: 0;
                            }
                            span {
                                float: right;
                                margin-right: 68px;
                                color: #ffffff;
                            }
                        }
                    }
                }
            }
        }
    }
    .light {
        tr {
            float: left;
            width: 50%;
            float: left;
            border-top: 1px solid #d2d9e5;
            width: 50%;
            margin-top: -1px;
            border-bottom: 1px solid #d2d9e5;
        }
        .echart-unit {
            font-family: PingFang-SC-Regular;
            font-size: 12px;
            color: #a0a3a8;
            letter-spacing: 1px;
            text-align: right;
            position: absolute;
            top: 14px;
            left: 66px;
        }
        .p-re {
            position: relative;
        }
        .tag-box {
            position: absolute;
            top: 8px;
            right: -180px;
            width: 410px;
            .c-tag + .c-tag {
                margin-left: 10px;
            }
        }
        .echart-cont {
            padding-top: 60px;
            padding-left: 100px;
        }
        .num-left {
            // top: 22px;
            width: 500px;
            text-align: left;
            padding-left: 20px;
            font-size: 16px;
            letter-spacing: 1.5px;
        }
        .data-title {
            font-family: PingFangSC-Regular;
            width: 100%;
            height: 52px;
            line-height: 52px;
            background: #ebecf3;
            font-size: 14px;
            color: #333;
            letter-spacing: 1.17px;
            font-weight: normal;
            margin: 0;
        }
        .qushi {
            margin-top: -20px;
        }
        .data-content {
            display: flex;
            justify-content: space-between;
            padding: 60px 59px 44px 60px;
            margin-bottom: 35px;
            p {
                margin: 0;
                // font-family: PingFangSC-Regular;
                font-size: 16px;
                letter-spacing: 1.5px;
                color: #333;
                letter-spacing: 1.5px;
                margin-bottom: 50px;
            }
            .detail-left {
                width: 450px;
                height: 270px;
                border-right: 1px solid #d2d9e5;
            }
            .detail-right {
                width: 750px;
                height: 270px;
                padding-left: 58px;
            }
            .chart-list {
                display: flex;
                ul {
                    width: 210px;
                    margin-top: 54px;
                    list-style: none;
                    li {
                        height: 18px;
                        line-height: 18px;
                        padding-left: 15px;
                        font-size: 12px;
                        color: #666;
                        letter-spacing: 0;
                        font-family: PingFang-SC-Regular;
                        position: relative;
                        &::before {
                            content: "";
                            width: 6px;
                            height: 6px;
                            background: #43b7a5;
                            border-radius: 50%;
                            position: absolute;
                            top: 6px;
                            left: 0;
                        }
                        span {
                            margin-left: 20px;
                            color: #909399;
                        }
                        &:last-child {
                            margin-top: 20px;
                            &::before {
                                background: #2b3a3f;
                            }
                        }
                    }
                }
                .tab-con {
                    width: 430px;
                    height: 168px;
                    margin-left: 50px;
                    margin-top: 15px;

                    td {
                        width: 215px;
                        font-size: 14px;
                        color: #43a1ac;
                        letter-spacing: 1.17px;
                        height: 30px;
                        line-height: 30px;
                        // border: 1px solid #2E3236;
                        &:first-child {
                            border-left: 0;
                            padding-left: 15px;
                            /* border-top: 1px solid #d2d9e5; */
                            border-right: 1px solid #d2d9e5;
                        }
                        &:last-child {
                            border-right: 0;
                            padding-left: 34px;
                            /* border-top: 1px solid #d2d9e5; */
                            div {
                                span {
                                    margin-right: 30px;
                                }
                            }
                        }
                        div {
                            position: relative;
                            padding-left: 15px;
                            overflow: hidden;
                            font-family: PingFang-SC-Regular;
                            letter-spacing: 1.17px;
                            font-size: 14px;
                            i {
                                position: absolute;
                                width: 5px;
                                height: 5px;
                                border-radius: 50%;
                                background: #358e80;
                                top: 14px;
                                left: 0;
                            }
                            span {
                                float: right;
                                margin-right: 68px;
                                color: #666;
                            }
                        }
                    }
                }
            }
        }
    }
</style>