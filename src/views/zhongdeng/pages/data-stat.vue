<template>
    <div class="page">
        <div class="nav-banner">
            <div class="item" v-for="(v,k) in bannerData" :key="k">
                <div class="hd">累计{{v.title}}</div>
                <div class="bd pt10">
                    <el-row type="flex" justify="space-between" align="middle">
                        <div class="f26 c_W">
                            {{v.total | numFormat}}
                        </div>
                        <el-row type="flex" align="middle">
                            <span>本周{{v.title}}</span>
                            <span class="pl10 pr10 c-B" :style="{color: v.borderColor}">{{v.week}}</span>
                            <el-tooltip effect="light" :content="v.tip" placement="top-end">
                                <i class="el-icon-warning-outline f16"></i>
                            </el-tooltip>
                        </el-row>
                    </el-row>
                </div>
                <div class="fd pt30">
                    <chart height="52px" width="390px" :id="'invoiceMonth'+k" :option="getLineOpt(k)" v-if="isShow" />
                    <chart height="52px" width="390px" :id="'invoiceMonth'+k" :option="getLineOpt(k)" v-else />
                </div>
            </div>
        </div>
        <div class="el-20"></div>
        <div class="chart-body ">
            <el-row type="flex" justify="space-between">
                <div class="left">
                    <chart height="490px" width="900px" id="invoiceMonth" :option.sync="invoiceMonth" />
                </div>
                <div class="right">
                    <div class="invoice-echart-wrap p-re">
                        <div class="pie-title">结果分析</div>
                        <div class="chart-list">
                            <chart height="380px" width="440px" :option="projectPie" id="project-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showCp" />
                            <ul>
                                <li v-for="(v,k) in pieList" :key="k" :class="pieClass[k]">

                                    <span>{{v.name}}</span>
                                    <span class="textRight">{{v.value}}%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import Chart from "@/components/Charts/invoiceInvalid.vue";
import tiltLine from "@/views/infrastructure/config/tiltLine";
import coopPie from "@/utils/echart/coopPie2";
import { deepClone } from "@/utils/common";
import echarts from "echarts"
export default {
    components: {
        Chart
    },
    data () {
        return {
            hover: true,
            dispatchAction: true,
            invoiceMonth: {},
            projectPie: {},
            cpIndex: 0,
            pieList: [],
            picColor: ['#319A8A', '#4181CF', '#ACCE7A', '#A13940', '#444E80'],
            pieClass: ['i-one', 'i-two', 'i-three', 'i-four', 'i-five'],
            PieData: [
                {
                    name: "其它",
                    pro: "1.06%",
                    no: "39.18%",
                    total: "40.24%"
                },
                {
                    name: "市政工程",
                    pro: "0.12%",
                    no: "13.45%",
                    total: "13.57%"
                },
                {
                    name: "房屋建筑工程",
                    pro: "0.28%",
                    no: "45.91%",
                    total: "46.19%"
                }
            ],
            bannerData: [
                {
                    title: '导入',
                    tip: '2012-10-20至2020-01-01',
                    total: 1800254,
                    week: 254,
                    data: [200, 932, 400, 934, 300, 1330, 800],
                    borderColor: '#4181CF',
                    areaColor: ['rgba(65,129,207,0.18)', 'rgba(65,129,207,0)']
                },
                {
                    title: '查重',
                    tip: '2012-10-20至2020-01-01',
                    total: 1234567,
                    week: 254,
                    data: [20, 50, 400, 200, 60, 80, 250],
                    borderColor: '#319A8A',
                    areaColor: ['rgba(49,154,138,0.19)', 'rgba(49,154,138,0)']
                },
                {
                    title: '注销',
                    tip: '2012-10-20至2020-01-01',
                    total: 9874545,
                    week: 254,
                    data: [200, 932, 400, 934, 300, 1330, 800],
                    borderColor: '#9EB486',
                    areaColor: ['rgba(166,214,112,0.21)', 'rgba(61,64,69,0)']
                }
            ],
            isShow: true
        }
    },
    mounted () {


        this.getCountImport()
        this.getCountCheck()
        this.getCountCancel()
        this.getCount()
    },
    watch: {
        flag (e) {
            this.isShow = !this.isShow
            this.getCount()
        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        showCp (index) {
            this.cpIndex = index;
        },
        getLineOpt (k) {
            let v = this.bannerData[k]

            let chartData = {
                grid: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                },
                xAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    boundaryGap: false,
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    data: v.data,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1,
                        color: v.borderColor // 蓝 4181CF， 绿 319A8A ， 黄 9EB486
                    },
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: v.areaColor[0] // 0% 处的颜色
                            }, {
                                offset: 1, color: v.areaColor[1] // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    }
                }]
            }

            // 切换主题
            let l = this.$service.zhongdeng.accumulative[k]
            let a = this.$service.zhongdeng.areaStyle[k]
            if (this.flag === 'light') {
                chartData.series[0].lineStyle.color = l
                chartData.series[0].areaStyle.color.colorStops = [
                    {
                        offset: 0, color: a[0] // 0% 处的颜色
                    }, {
                        offset: 1, color: a[1] // 100% 处的颜色
                    }
                ]
            }

            return chartData

        },
        /* 结果分析饼图 */
        drawProjectPie (data) {
            let pPie = deepClone(coopPie);
            pPie.tooltip.position = ['150', '44%']
            pPie.series[0].data = data
            pPie.series[0].color = this.picColor
            // 切换主题
            let value, name;
            let lightColor = this.$service.zhongdeng.drawProjectPie
            if (this.flag === 'light') {
                pPie.series[0].color = lightColor
                pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                pPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    }
                }
            }
            this.projectPie = pPie;
        },
        /* 数据统计折线图 */
        getLineData (data, total) {
            let chartData = deepClone(tiltLine);
            chartData.title.text = "数据统计";
            chartData.title.subtext = "数量总计：" + this.numFormat(total) + "条";
            chartData.title.subtextStyle = {
                color: '#43A1AC',
                fontSize: '14'
            }
            chartData.xAxis.data = ['高度匹配', '疑似高度匹配', '特别关注', '异常', '安全'];
            chartData.series[0].data = data
            chartData.series[0].smooth = false

            chartData.grid.left = "50px";
            chartData.grid.right = "50px";
            chartData.grid.top = "100px";
            chartData.title.padding = [30, 0, 10, 66];
            chartData.title.itemGap = 20;

            // 切换主题
            if (this.flag === 'light') {
                chartData.title.textStyle.color = this.$service.zhongdeng.title[0]
                chartData.title.subtextStyle.color = this.$service.zhongdeng.title[1]
                chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                chartData.tooltip.borderWidth = 0;
                chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                chartData.series[0].itemStyle.normal.color = this.$medicine.petroleum.itemStyle
                chartData.yAxis.axisLine = this.$medicine.axis
                chartData.xAxis.axisLine = this.$medicine.axis

                chartData.xAxis.axisLabel.color = this.$medicine.nameColor;
                chartData.yAxis.axisLabel.textStyle = {
                    color: this.$medicine.nameColor,
                }
                chartData.series[0].itemStyle.normal.areaStyle.color = new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [{
                        offset: 0,
                        color: this.$medicine.petroleum.areaStyle[0]
                    },
                    {
                        offset: 1,
                        color: this.$medicine.petroleum.areaStyle[1]
                    }
                    ]
                )

            }
            this.invoiceMonth = chartData;
        },
        /* 导入数据统计 */
        getCountImport () {
            this.ajax.get('dcp/asset/cert/statistics/import').then(res => {
                let v = this.bannerData[0]
                let _v = res.data

                v.total = _v.total
                v.week = _v.weekTotal
                v.data = _v.trendData
                v.tip = _v.date
            })
        },
        /* 查重数据统计 */
        getCountCheck () {
            this.ajax.get('dcp/asset/cert/statistics/check').then(res => {
                let v = this.bannerData[1]
                let _v = res.data

                v.total = _v.total
                v.week = _v.weekTotal
                v.data = _v.trendData
                v.tip = _v.date
            })
        },
        /* 注销数据统计 */
        getCountCancel () {
            this.ajax.get('dcp/asset/cert/statistics/cancel').then(res => {
                let v = this.bannerData[2]
                let _v = res.data

                v.total = _v.total
                v.week = _v.weekTotal
                v.data = _v.trendData
                v.tip = _v.date
            })
        },
        /* 数据占比统计 */
        getCount () {
            this.ajax.get('dcp/asset/cert/statistics').then(res => {
                const resdata = res.data
                let piedata = [
                    { value: resdata.safetyPercent, name: '安全' },
                    { value: resdata.errorPercent, name: '异常' },
                    { value: resdata.specialFocusPercent, name: '特别关注' },
                    { value: resdata.mistMatchPercent, name: '疑似高度匹配' },
                    { value: resdata.highMatchPercent, name: '高度匹配' }
                ]
                let bardata = [
                    resdata.highMatch,
                    resdata.mistMatch,
                    resdata.specialFocus,
                    resdata.error,
                    resdata.safety
                ]

                this.pieList = piedata

                this.getLineData(bardata, resdata.total)
                this.drawProjectPie(piedata)
            })
        }
    }


}
</script>
<style lang="scss" scoped>
.dark {
    .c-B {
        color: #4181cf;
    }
    .c-G {
        color: #309686;
    }
    .c-O {
        color: #99ae82;
    }
    .nav-banner {
        background: #1d1e23;
        display: flex;
        justify-content: space-between;
        color: #a0a3a8;

        .item {
            width: 440px;
            height: 180px;
            padding: 20px 25px;
            background: #232528;
            box-sizing: border-box;

            .hd {
                font-size: 14px;
            }
        }
    }

    .chart-body {
        background: #1d1e23;
        .left,
        .right {
            background: #232528;
        }

        .left {
            width: 900px;
            height: 490px;
        }
        .right {
            width: 440px;
            height: 490px;
        }
    }
    .invoice-echart-wrap {
        box-sizing: border-box;
    }
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 32px;
        top: 20px;
    }

    .chart-list {
        font-family: PingFangSC-Light;
        display: flex;
        ul {
            position: absolute;
            bottom: -40px;
            left: 21px;
            width: 400px;
            list-style: none;
            li {
                // width: 50%;
                width: 142px;
                height: 18px;
                line-height: 18px;
                padding-left: 15px;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                position: relative;
                float: left;
                margin-top: 18px;
                margin-right: 38px;
                &::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #43b7a5;
                    border-radius: 50%;
                    position: absolute;
                    top: 6px;
                    left: 0;
                }
                span {
                    margin-left: 3px;
                    color: #909399;
                }
            }

            .i-one {
                &::before {
                    background: #319a8a;
                }
            }
            .i-two {
                &::before {
                    background: #4181cf;
                }
            }
            .i-three {
                &::before {
                    background: #acce7a;
                }
            }
            .i-four {
                &::before {
                    background: #a13940;
                }
            }
            .i-five {
                &::before {
                    background: #444e80;
                }
            }
        }
    }
    .textRight {
        position: absolute;
        right: 0;
        color: #13aabb !important;
    }
}
.light {
    .c_W {
        color: #4064d4;
    }
    .c-B {
        color: #4064d4;
    }
    .c-G {
        color: #309686;
    }
    .c-O {
        color: #99ae82;
    }
    .nav-banner {
        background: #ebecf3;
        display: flex;
        justify-content: space-between;
        color: #a0a3a8;

        .item {
            width: 440px;
            height: 180px;
            padding: 20px 25px;
            background: #fff;
            box-sizing: border-box;
            color: #666;

            .hd {
                font-size: 14px;
            }
        }
    }

    .chart-body {
        background: #ebecf3;
        .left,
        .right {
            background: #fff;
        }

        .left {
            width: 900px;
            height: 490px;
        }
        .right {
            width: 440px;
            height: 490px;
        }
    }
    .invoice-echart-wrap {
        box-sizing: border-box;
    }
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 32px;
        top: 20px;
    }

    .chart-list {
        font-family: PingFangSC-Light;
        display: flex;
        ul {
            position: absolute;
            bottom: -40px;
            left: 21px;
            width: 400px;
            list-style: none;
            li {
                // width: 50%;
                width: 142px;
                height: 18px;
                line-height: 18px;
                padding-left: 15px;
                font-size: 12px;
                color: #999;
                letter-spacing: 0;
                position: relative;
                float: left;
                margin-top: 18px;
                margin-right: 38px;
                &::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #43b7a5;
                    border-radius: 50%;
                    position: absolute;
                    top: 6px;
                    left: 0;
                }
                span {
                    margin-left: 3px;
                    color: #999;
                }
            }

            .i-one {
                &::before {
                    background: #5554f0;
                }
            }
            .i-two {
                &::before {
                    background: #22cee2;
                }
            }
            .i-three {
                &::before {
                    background: #eb6f98;
                }
            }
            .i-four {
                &::before {
                    background: #768cff;
                }
            }
            .i-five {
                &::before {
                    background: #81e3c7;
                }
            }
        }
    }
    .textRight {
        position: absolute;
        right: 0;
        color: #999;
    }
}
</style>