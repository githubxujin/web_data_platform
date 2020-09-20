<template>
    <!-- 检测分析-相关性分析 -->
    <div class="page">
        <el-form :inline="true" class="mb-18 pt20">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.industry" clearable placeholder="行业">
                    <el-option v-for="(v,k) in industry" :key="k" :label="v" :value="k"></el-option>
                    <el-option label="其他" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-autocomplete v-model="params.customerName" clearable placeholder="企业名称" :fetch-suggestions="getCustomerName"></el-autocomplete>
            </el-form-item>
            <el-form-item class="el-item-date-width">
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="initData">查询</el-button>
                <el-button type="info" size="medium" @click="rest">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="el-20 mb20"></div>
        <div class="pt30">
            <div class="tc pb30">
                <div class="chart-title" v-if="pieData.length>0">{{customerName}}相关性分析</div>
            </div>
            <!--  -->
            <el-row type="flex" justify="space-between" class="pl30 pr30 left-pie" v-show="pieData.length">
                <div class="left">
                    <chart height="270px" width="560px" :option="cookPieOpt" id="relation-pie" :dispatchAction="dispatchAction" :hover="hover" @showValue="showValue" style="margin-top: -58px" />
                </div>
                <div class="right">
                    <div class="right-box">
                        <div class="right-box-content">
                            <div class="right-top">
                                <img :src="require('../../../assets/images/icon/share.png')" class="right-top-img" v-if="theme==='dark'" />
                                <img :src="require('../../../assets/images/light/xiangguanxingruo.png')" class="right-top-img" v-if="theme==='light'" />
                                <div class="right-top-title">{{eventName}}</div>
                                <div class="right-top-num">{{eventNum}}<span class="f20">%</span></div>
                            </div>
                            <div class="right-bottom">
                                <img :src="require('../../../assets/images/icon/love.png')" class="right-top-img" v-if="theme==='dark'" />
                                <img :src="require('../../../assets/images/light/zhongdashixiang.png')" class="right-top-img" v-else />
                                <div class="right-top-title">重大事项</div>
                                <div class="right-top-num">{{getEventNum(barData)}}<span class="f20">条</span></div>
                            </div>
                        </div>
                        <div class="right-chart">
                            <chart height="140px" width="140px" :option="relationPie" id="relation-pie2" style="position: absolute;
    right: 20px;
    top: 20px;z-index: 9999;" />
                        </div>
                    </div>
                    <div class="right-event">
                        <div class="right-event-left" v-for="(item,index) in typeData" :key="index">
                            <div class="right-event-left-wrap"><span :class="['right-circle', color[index]]"></span>
                                <div class="right-event-title">
                                    {{ item.name}}
                                </div>
                            </div>
                            <div class="right-event-right-wrap">
                                <div class="right-event-ratio">{{ item.prencent}}%</div>
                                <div class="right-event-num">{{ item.value }}条</div>
                            </div>

                        </div>

                    </div>
                </div>
            </el-row>
        </div>
        <div v-if="!pieData.length">
            <!-- 没有数据的时候展示 -->
            <el-row type="flex" justify="center" align="middle" class="default-box pb60">
                <img src="~@/assets/images/default.png">
                <div class="pt30 ml30 ">
                    <p class="f16">暂无数据信息</p>
                </div>
            </el-row>

        </div>
    </div>
</template>
<script>
import relationPieOpt from '../config/relation-pie'
import cookpie from "../config/pie"
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid.vue";
import { mapState } from "vuex"
export default {
    components: {
        Chart
    },
    data () {
        return {
            restaurants: [],
            hover: true,
            dispatchAction: true,
            cookPieOpt: {},
            dateArr: [],
            isBar: false,
            relationPie: {},
            radioList: ['日', '周', '月'],
            text: ['相关性强', '相关性弱', '相关性无'],
            relationBar: null,
            index: 0,
            cur: 0,
            pieCount: 0,
            customerName: '',
            params: {
                "startTime": this.formatDate(new Date), // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
                "customerName": "", // 企业名称
                "industry": '1' // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
            },
            pieData: [],
            barData: {},
            industry: {
                '1': '基建工程',
                '2': '医药医药',
                '3': '能源化工'
            },
            eventName: "相关性强",
            eventNum: "",
            typeData: [],
            color: ['cl-ye', 'cl-green', 'cl-blue', 'cl-red', 'cl-lgreen', 'cl-pure', 'cl-dpure', 'cl-dgreen ']
        }

    },
    watch: {
        isBar (v) {
            if (v) {
                this.$nextTick(() => {


                })
            }
        },
        flag (e) {
            this.initData();
        }
    },
    computed: mapState({
        theme: state => state.echart.flag,
        flag: state => state.echart.flag
    }),
    mounted () {
        this.dateArr.push(this.formatDate(new Date), this.formatDate(new Date))
        this.initData()
    },
    methods: {
        getCustomerName (customerName, cb) {
            this.$http('/risk/server/customer/survey/get', { customerName, industryType: this.params.industry }, { type: 'get' }).then(res => {
                cb(res.data.map(i => {
                    return {
                        value: i.customerName
                    }
                }))
            });
        },
        toJump () {
            this.$store.commit('tabs/SET_NAMES', "b")

        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startTime = v[0];
                this.params.endTime = v[1];
            } else {
                this.params.startTime = '';
                this.params.endTime = '';
            }
        },
        rest () {
            this.dateArr = []
            this.params = {
                "startTime": this.formatDate(new Date), // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
                "customerName": "", // 企业名称
                "industry": '1' // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
            }
            this.dateArr.push(this.formatDate(new Date), this.formatDate(new Date));

            this.initData()
        },

        showValue (value) {
            this.eventName = value.name || this.eventName
            if (value.name) {
                this.getDataByType(this.text.indexOf(value.name) + 1)
                this.eventNum = value.value
            }
        },
        async initData (type) {
            let pie = deepClone(cookpie)

            let res = await this.ajax.get('risk/server/connect/first/summary', this.params)
            if (res.code === '200') {
                let total = (res.data || []).reduce((prev, cur) => {
                    return prev + cur.count
                }, 0)
                let newData = res.data.map((i) => {
                    return {
                        name: i.name,
                        value: (i.count / total).toFixed(2) * 1000 / 10
                    }
                })
                this.pieData = res.data;
                res.data.length > 0 ? this.getDataByType(this.text.indexOf(res.data[0].name) + 1) : this.getDataByType(1)
                pie.series[0].data = newData

                if (this.flag === 'light') {
                    pie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                    pie.series[0].color = this.$service.riskControl.series
                    let that = this
                    pie.tooltip.formatter = function (params) {
                        if (params.seriesIndex === 0) {
                            return `<div style="width:140px;text-align:center;color:${that.$service.riskControl.tooltip[0]};font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:${that.$service.riskControl.tooltip[1]};text-align:center;margin-top:7px;">${params.name}</div>`;
                        } else {
                            return `<div style="width:140px;text-align:center;color:${that.$service.riskControl.tooltip[0]};font-size:30px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                                <div style="font-size:14px;color:${that.$service.riskControl.tooltip[1]};text-align:center;margin-top:7px;">${params.name}</div>`;
                        }
                    }
                }

                this.cookPieOpt = pie
                if (res.data[0])
                    this.eventNum = (res.data[0].count / total).toFixed(2) * 1000 / 10

            }
        },
        async getDataByType (connectType) {

            let params = { ...this.params, ...{ connectType } }
            let res = await this.ajax.get('risk/server/connect/second/summary', params)
            if (res.code === '200') {
                let PieData = deepClone(relationPieOpt)
                this.barData = res.data
                let total = (res.data || []).reduce((prev, cur) => {
                    return prev + cur.count
                }, 0)
                this.typeData = res.data.map(i => {
                    return {
                        name: i.name,
                        prencent: (i.count / total).toFixed(2) * 1000 / 10,
                        value: i.count

                    }
                })
                PieData.series[0].data = this.typeData

                if (this.flag === 'light') {
                    PieData.tooltip.backgroundColor = this.$medicine.tooltipBG
                    PieData.tooltip.borderWidth = 0;
                    PieData.series[0].color = ['#2E50BA', '#4064D4', '#407CD4', '#58A9E9', '#58CAE9', '#91ffe3', '#58E0E9', '#A4F9FF']
                }

                this.relationPie = PieData

                // this.setBarOpt()
            }
        },
        getEventNum (arr) {
            if (arr.length) {
                let total = (arr || []).reduce((prev, cur) => {
                    return prev + cur.count
                }, 0)
                return total
            } else {
                return 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.light {
    .cl-ye {
        background: #2e50ba;
    }
    .cl-green {
        background: #4064d4;
    }
    .cl-blue {
        background: #407cd4;
    }
    .cl-red {
        background: #58a9e9;
    }
    .cl-lgreen {
        background: #58cae9;
    }
    .cl-pure {
        background: #91ffe3;
    }
    .cl-dpure {
        background: #58e0e9;
    }
    .cl-dgreen {
        background: #a4f9ff;
    }
    .chart-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #666;
        letter-spacing: 1.5px;
        text-align: left;
        margin-left: 80px;
    }
    .left {
        width: 550px;
        height: 532px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all 0.5s 0s;
        position: relative;
        top: -30px;
    }
    .right {
        width: 538px;
        height: 400px;
        border: 1px solid #d2d9e5;
        margin-right: 150px;
        margin-top: 10px;
        &-box {
            width: 480px;
            height: 180px;
            margin: 30px auto 0 auto;
            border: 1px solid #d2d9e5;
            position: relative;
            &::before {
                position: absolute;
                left: 300px;
                content: '';
                width: 90px;
                height: 179px;

                border-right: 1px solid #d2d9e5;
                z-index: 0;
            }
            &::after {
                content: '';
                position: absolute;
                top: 89px;
                left: 300px;
                width: 180px;
                height: 89px;
                border-top: 1px solid #d2d9e5;
                z-index: 0;
            }
        }
        &-top {
            width: 300px;
            height: 90px;
            border-bottom: 1px solid #d2d9e5;
            border-right: 1px solid #d2d9e5;
            display: flex;
            align-items: center;
            &-img {
                margin-left: 30px;
            }
            &-title {
                font-size: 20px;
                color: #666;
                letter-spacing: 0;
                line-height: 18px;
                margin-left: 10px;
            }
            &-num {
                margin-left: 36px;
                font-size: 30px;
                color: #4064d4;
                letter-spacing: 1.01px;
                text-align: center;
                line-height: 42px;
            }
        }
        &-bottom {
            width: 300px;
            height: 90px;
            border-right: 1px solid #d2d9e5;
            display: flex;
            align-items: center;
        }
        &-circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            // background: red;
            margin-top: 6px;
            margin-left: 20px;
        }
        &-event {
            width: 480px;
            margin: 10px auto 0 auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            // background: red;

            &-right,
            &-left {
                &-wrap {
                    display: flex;
                }
                margin-top: 20px;
                flex-basis: 50%;
                display: flex;
                justify-content: space-between;
            }

            &-title {
                text-align: left;
                margin-left: 10px;
                width: 100px;
                font-size: 14px;
                color: #666;
                letter-spacing: 0;
            }
            &-ratio {
                /* margin-left: -50px; */
                font-size: 14px;
                color: #909399;
                letter-spacing: 0;
            }
            &-num {
                /* margin-left: -30px; */
                font-size: 14px;
                color: #909399;
                letter-spacing: 0;
                width: 32px;
            }
        }
    }
    .right-event-right-wrap {
        text-align: left;
        flex-basis: 40%;
        display: flex;
        justify-content: space-between;
    }

    .pie-box {
        position: relative;
        width: 550px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .pie-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 550px;
            height: 500px;
            background: url(~@/assets/images/feedback-pie-bg.png) center no-repeat;
            background-size: 146px 146px;
            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                background: url(~@/assets/images/feedback-pie-run.png) center no-repeat;
                background-size: 262px 262px;
                animation: rotate-reverse 10s linear infinite;
                transform-origin: center;
            }
        }
        .pie-txt {
            position: absolute;
            width: 100px;
            z-index: 999;
            font-size: 16px;
            color: #fff;
            text-align: center;
        }
    }
    #relation-pie {
        width: 550px;
        height: 500px;
        margin: 0 auto;
    }

    #relation-bar {
        width: 490px;
        height: 340px;
    }

    .relation-bar-box {
        padding: 30px 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s 0.5s;
        transform: translateX(0);
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(-20%);
    }
}
.dark {
    .cl-ye {
        background: #b4ab74;
    }
    .cl-green {
        background: #517c6f;
    }
    .cl-blue {
        background: #30477b;
    }
    .cl-red {
        background: #893420;
    }
    .cl-lgreen {
        background: #86a15f;
    }
    .cl-pure {
        background: #515176;
    }
    .cl-dpure {
        background: #4f4f73;
    }
    .cl-dgreen {
        background: #718653;
    }
    .chart-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        text-align: left;
        margin-left: 80px;
    }
    .left {
        width: 550px;
        height: 532px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        transition: all 0.5s 0s;
        position: relative;
        top: -30px;
    }
    .right {
        width: 538px;
        height: 400px;
        border: 2px solid #2e3236;
        margin-right: 150px;
        margin-top: 10px;
        &-box {
            width: 480px;
            height: 180px;
            margin: 30px auto 0 auto;
            border: 1px solid #2e3236;
            position: relative;
            &::before {
                position: absolute;
                left: 300px;
                content: '';
                width: 90px;
                height: 179px;

                border-right: 1px solid #2e3236;
                z-index: 0;
            }
            &::after {
                content: '';
                position: absolute;
                top: 89px;
                left: 300px;
                width: 180px;
                height: 89px;
                border-top: 1px solid #2e3236;
                z-index: 0;
            }
        }
        &-top {
            width: 300px;
            height: 90px;
            border-bottom: 1px solid #2e3236;
            border-right: 1px solid #2e3236;
            display: flex;
            align-items: center;
            &-img {
                margin-left: 30px;
            }
            &-title {
                font-family: PingFangSC-Light;
                font-size: 20px;
                color: #ffffff;
                letter-spacing: 0;
                line-height: 18px;
                margin-left: 10px;
            }
            &-num {
                margin-left: 36px;
                font-family: PingFangSC-Light;
                font-size: 30px;
                color: #43a1ac;
                letter-spacing: 1.01px;
                text-align: center;
                line-height: 42px;
            }
        }
        &-bottom {
            width: 300px;
            height: 90px;
            border-right: 1px solid #2e3236;
            display: flex;
            align-items: center;
        }
        &-circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            // background: red;
            margin-top: 6px;
            margin-left: 20px;
        }
        &-event {
            width: 480px;
            margin: 10px auto 0 auto;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            // background: red;

            &-right,
            &-left {
                &-wrap {
                    display: flex;
                }
                margin-top: 20px;
                flex-basis: 50%;
                display: flex;
                justify-content: space-between;
            }

            &-title {
                text-align: left;
                margin-left: 10px;
                width: 100px;
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0;
            }
            &-ratio {
                /* margin-left: -50px; */
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #909399;
                letter-spacing: 0;
            }
            &-num {
                /* margin-left: -30px; */
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #909399;
                letter-spacing: 0;
                width: 32px;
            }
        }
    }
    .right-event-right-wrap {
        text-align: left;
        flex-basis: 40%;
        display: flex;
        justify-content: space-between;
    }

    .pie-box {
        position: relative;
        width: 550px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        .pie-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 550px;
            height: 500px;
            background: url(~@/assets/images/feedback-pie-bg.png) center no-repeat;
            background-size: 146px 146px;
            &::before {
                position: absolute;
                content: '';
                width: 100%;
                height: 100%;
                background: url(~@/assets/images/feedback-pie-run.png) center no-repeat;
                background-size: 262px 262px;
                animation: rotate-reverse 10s linear infinite;
                transform-origin: center;
            }
        }
        .pie-txt {
            position: absolute;
            width: 100px;
            z-index: 999;
            font-size: 16px;
            color: #fff;
            text-align: center;
        }
    }
    #relation-pie {
        width: 550px;
        height: 500px;
        margin: 0 auto;
    }

    #relation-bar {
        width: 490px;
        height: 340px;
    }

    .relation-bar-box {
        padding: 30px 20px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s 0.5s;
        transform: translateX(0);
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(-20%);
    }
}
</style>


