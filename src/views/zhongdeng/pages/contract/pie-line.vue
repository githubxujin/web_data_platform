<template>
    <div>
        <div class="wrap">
            <div class="left">
                <div class="app-title pt20 pb20">付款习惯</div>
                <div class="pay-box">
                    <div class="box-bd">
                        <pie width="125px" height="125px" id="pay-pie-zhongdeng" :opt="payOpt" />
                    </div>
                    <div class="box-fd">
                        <div class="box-content">
                            <div class="box-x" v-for="(item,index) in payList" :key="index">
                                <div class=" box-text"><span class="circle" :style="{background: payColorList[index]}"></span>{{ item.name}}</div>
                                <div class="precent">{{item.precent}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="app-title pt20">项目登记周期</div>
                <div class="pay-box mt25">
                    <div class="box-bd">
                        <pie width="125px" height="125px" id="project-pie-zhongdeng" :opt="timeOpt" />
                    </div>
                    <div class="box-fd">
                        <div class="box-content">
                            <div class="box-x" v-for="(item,index) in timeList" :key="index">
                                <div class=" box-text"><span class="circle" :style="{background: projectColorList[index]}"></span>{{ item.name}}</div>
                                <div class="precent">{{item.precent}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="app-title reset-title">项目账期明细</div>
                <chart width="760px" height="430px" id="x-statck-bar" :option="barOpt" />
            </div>
        </div>
    </div>
</template>
<script>
import pieData from "@/utils/echart/pie/pie"
import bar from "@/utils/echart/bar/x-stack-bar"
import Chart from "@/components/Charts/invoiceInvalid.vue"
import { deepClone } from "@/utils/common"
import echarts from "echarts"
export default {
    props: {
        pielineList: Object
    },
    components: {
        Chart,
        'pie': () => import('@/components/Pie/pie.vue'),
    },
    watch: {
        pielineList(e) {
            this.init();
        },
        flag(e) {
            this.init();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    data() {
        return {
            payOpt: {},
            timeOpt: {},
            barOpt: {},
            payList: [{ name: '银行回款', precent: '40%' }, { name: '票据回款', precent: '40%' }, { name: '中企云链', precent: '40%' }, { name: '其他方式', precent: '40%' }],
            timeList: [{ name: '<=30天', precent: '40%' }, { name: '31-60天', precent: '40%' }, { name: '61-90天', precent: '40%' }, { name: '>90天', precent: '40%' }],
            payColorList: ['#226B60', '#7B8E37', '#9D3713', '#474669'],
            projectColorList: ['#533D79', '#4B6EE4', '#3247CC', '#259D9B']
        }
    },
    methods: {
        init() {
            /*   
                      habitVos 付款习惯
                      accountPeriodVos 项目登记周期
                      periodDetailVos 账期明细
                      */
            if (this.flag === 'light') {
                this.payColorList = ['#4064D4', '#FBB148', '#EB6F98', '#12B29E'];
                this.projectColorList = ['#4D71EC', '#3B26D9', '#2757FC', '#14DCC3'];
            } else {
                this.payColorList = ['#226B60', '#7B8E37', '#9D3713', '#474669'];
                this.projectColorList = ['#533D79', '#4B6EE4', '#3247CC', '#259D9B'];
            }
            let habitVos = this.pielineList.habitVos;
            habitVos.map(item => {
                this.payList[item.type * 1 - 1].precent = item.proportion + '%';
            })
            let payopt = deepClone(pieData);
            payopt.series[0].color = this.payColorList;
            payopt.series[1].data[0].itemStyle.normal.color = '#334548';
            payopt.series[0].radius = ['85%', '95%'];
            payopt.series[0].data = this.payList.map(item => {
                return {
                    name: item.name,
                    value: item.precent.split('%')[0],
                }
            })
            payopt.series[1].radius = ['42', '43'];
            payopt.series[1].data[0].itemStyle.normal.color = '#334548';
            payopt.tooltip.position = ['7%', '27%']
            let value = "";
            let name = "";
            if (this.flag === 'light') {
                payopt.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
            }
            payopt.tooltip.formatter = params => {
                if (params.seriesIndex === 0) {
                    value = params.percent;
                    name = params.name
                }
                if (this.flag === 'light') {
                    return `<div style="font-family: PingFang-SC-Regular;font-size: 24px;color: #4064D4;width:100px;text-align:center;">${value}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFang-SC-Regular;font-size: 12px;color: #666666;text-align: center;">${name}</div>
                        `
                } else {
                    return `<div style="font-family: PingFangSC-Light;font-size: 24px;color: #449FA8;width:100px;text-align:center;">${value}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFangSC-Light;font-size: 12px;color: #8C8F93;text-align: center;">${name}</div>
                        `
                }
            }
            this.payOpt = payopt;
            let accountPeriodVos = this.pielineList.accountPeriodVos;
            accountPeriodVos.map(item => {
                this.timeList[item.type * 1 - 1].precent = item.proportion + '%';
            })
            let timeOpt = deepClone(pieData);
            timeOpt.series[0].color = this.projectColorList;
            timeOpt.series[0].radius = ['85%', '95%'];
            timeOpt.series[0].data = this.timeList.map(item => {
                return {
                    name: item.name,
                    value: item.precent.split('%')[0],
                }
            })
            timeOpt.series[1].radius = ['42', '43'];
            timeOpt.series[1].data[0].itemStyle.normal.color = '#334548';
            timeOpt.series[1].data[0].itemStyle.normal.color = '#334548';
            timeOpt.tooltip.position = ['7%', '29%']
            let value1 = "";
            let name1 = "";
            if (this.flag === 'light') {
                timeOpt.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
            }
            timeOpt.tooltip.formatter = params => {
                if (params.seriesIndex === 0) {
                    value1 = params.percent;
                    name1 = params.name
                }
                if (this.flag === 'light') {
                    return `<div style="font-family: PingFang-SC-Regular;font-size: 24px;color: #4064D4;width:100px;text-align:center;">${value1}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFang-SC-Regular;font-size: 12px;color: #666666;text-align: center;">${name1}</div>
                        `
                } else {
                    return `<div style="font-family: PingFangSC-Light;font-size: 24px;color: #449FA8;width:100px;text-align:center;">${value1}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFangSC-Light;font-size: 12px;color: #8C8F93;text-align: center;">${name1}</div>
                        `
                }

            }

            this.timeOpt = timeOpt;
            /*   
             registerDate 登记日期
             paymentDate 回款日期
             projectName 账期
             projectName 名称
             */
            let periodDetailVos = this.pielineList.periodDetailVos;
            let barOpt = deepClone(bar);
            barOpt.dataZoom = [
                {
                    type: "slider",
                    show: true,
                    yAxisIndex: [0],
                    right: 0,
                    start: 0,
                    end: 50,
                    width: 8,
                    borderColor: "transparent",
                    backgroundColor: "#242D30",
                    fillerColor: "#2A3C40",
                    showDetail: false,
                    handleSize: false,
                    zoomLock: false,
                    maxSpan: 80,
                    maxValueSpan: 10, //设置显示多少个
                    minValueSpan: 10
                },
            ]
            let fstData = periodDetailVos.map(item => new Date(item.registerDate))
            let lstData = periodDetailVos.map(item => new Date(item.paymentDate))
            let barName = periodDetailVos.map(item => item.projectName);
            barOpt.tooltip.formatter = function (e) {
                if (e.length > 1) {
                    let str = '';
                    periodDetailVos.filter((i, inx, arr) => {
                        str = `<p>项目名：${arr[e[0].dataIndex].projectName}</p>
                                <p>登记日期：${arr[e[0].dataIndex].registerDate.substr(0, 10)}</p>
                                <p>回款日期：${arr[e[0].dataIndex].paymentDate.substr(0, 10)}</p>
                                <p>账期：${arr[e[0].dataIndex].accountPeriod}天</p>`
                    })
                    return str
                }
            }
            barOpt.grid.bottom = '10%';
            barOpt.grid.right = '10%';
            barOpt.yAxis.data = barName;
            barOpt.yAxis.axisLabel.formatter = function (e) {
                if (e.length > 6) {
                    return e.substring(0, 6) + "...";
                } else {
                    return e;
                }
            }
            let that = this;
            barOpt.xAxis.axisLabel.formatter = function (e) {
                return that.formatDate(e);
            }
            barOpt.xAxis.type = 'time';
            barOpt.xAxis.axisLabel.fontSize = 12;
            barOpt.series[0].zlevel = -1;
            barOpt.series[1].zlevel = -1;
            barOpt.series[0].data = lstData;
            barOpt.series[1].data = fstData;
            if (this.flag === 'light') {
                barOpt.series[0].itemStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#5577FF'
                        }, {
                            offset: 1,
                            color: '#8598FF'
                        }]
                        ),
                        borderColor: '#fff',
                    }
                }
                barOpt.series[1].itemStyle = {
                    normal: {
                        color: "#fff",
                        borderColor: '#fff',
                    }
                }
                barOpt.series[0].emphasis = {
                    itemStyle: {
                        color: '#62A5F5'
                    }
                }
                barOpt.series[1].emphasis = {
                    itemStyle: {
                        color: '#fff'
                    }
                }
                barOpt.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                barOpt.xAxis.axisTick = this.$medicine.axis
                barOpt.yAxis.axisTick = this.$medicine.axis
                barOpt.xAxis.axisLabel.color = this.$medicine.nameColor;
                barOpt.xAxis.axisLabel.fontFamily = 'PingFang-SC-Regular';
                barOpt.yAxis.axisLabel.fontFamily = 'PingFang-SC-Regular';
                barOpt.xAxis.axisLabel.fontSize = 12;
                barOpt.yAxis.axisLabel.textStyle = {
                    color: this.$medicine.nameColor,
                }
                // barOpt.title.textStyle.color = this.$medicine.title
                barOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                barOpt.tooltip.borderWidth = 0;
                barOpt.yAxis.splitLine = this.$medicine.axis  // {...this.$medicine.axis,show: true}  网格
                barOpt.yAxis.axisLine = this.$medicine.axis
                barOpt.xAxis.axisLine = this.$medicine.axis
                barOpt.dataZoom[0].backgroundColor = this.$service.output.behavior.dataZoom[0]
                barOpt.dataZoom[0].fillerColor = this.$service.output.behavior.dataZoom[1]

            } else {
                barOpt.series[0].itemStyle = {
                    normal: {
                        color: "#3b5677",
                        borderColor: '#232528',
                    }
                }
                barOpt.series[1].itemStyle = {
                    normal: {
                        color: "#232528",
                        borderColor: '#232528',
                    }
                }
                barOpt.series[0].emphasis = {
                    itemStyle: {
                        color: '#62A5F5'
                    }
                }
                barOpt.series[1].emphasis = {
                    itemStyle: {
                        color: '#232528'
                    }
                }
            }
            console.log(JSON.stringify(barOpt))
            this.barOpt = barOpt;
        }
    }
}

</script>
<style lang="scss">
    .light {
        #pay-pie-zhongdeng,
        #project-pie-zhongdeng {
            background: #fff;
        }
    }
    #pay-pie-zhongdeng,
    #project-pie-zhongdeng {
        background: #232528;
    }
</style>

<style lang="scss" scoped>
    .light {
        .pay-box {
            border: 1px solid #d2d9e5;
            .box-bd {
                &::before {
                    border-right: 1px solid #d2d9e5;
                    border-bottom: 1px solid #d2d9e5;
                }
                &::after {
                    border-left: 1px solid #d2d9e5;
                    border-top: 1px solid #d2d9e5;
                }
            }
            /* div + div {
                                border-left: 1px solid #d2d9e5;
                            } */
            .box-fd {
                border-left: 1px solid #d2d9e5;
                .box-content {
                    .box-x {
                        div + div {
                            border-left: none;
                        }
                    }
                }
            }
        }
        .wrap {
            .right {
                border: 1px solid #d2d9e5;
            }
        }
    }
    .circle {
        position: relative;
        left: -8px;
        display: inline-block;
        background: red;
        width: 6px;
        height: 6px;
        border-radius: 50%;
    }
    .box-content {
        width: 100px;
        margin: 40px auto 0 auto;
        display: flex;
        flex-direction: column;
        border: none;
        .box-x {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border: none;
            div {
                border: none;
            }
        }
    }
    .reset-title {
        position: relative;
        top: -40px;
    }
    .wrap {
        margin-top: 10px;
        display: flex;
        .left {
            height: 443px;
        }
        .right {
            margin-left: 20px;
            margin-top: 60px;
            height: 443px;
            width: 791px;
            border: 1px solid #2e3236;
        }
    }

    .pay-box {
        width: 358px;
        height: 190px;
        border: 1px solid #2e3236;
        display: flex;
        box-sizing: border-box;
        div + div {
            border-left: 1px solid #2e3236;
        }
        .box-bd {
            position: relative;
            width: 190px;
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            overflow: hidden;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 96px;
                height: 95px;
                border-right: 1px solid #2e3236;
                border-bottom: 1px solid #2e3236;
                z-index: 0;
            }
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                width: 96px;
                height: 95px;
                border-left: 1px solid #2e3236;
                border-top: 1px solid #2e3236;
                z-index: 0;
            }
            div {
                z-index: 1;
            }
        }
        .box-fd {
            width: 168px;
        }
        .box-text {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #8c8f93;
            line-height: 12px;
        }
        .precent {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #43a1ac;
            line-height: 12px;
        }
    }
</style>