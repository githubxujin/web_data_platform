<template>
    <!-- 处置反馈-日报统计 -->
    <div class="page">
        <el-form :inline="true" class="mb-18 pt20">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.customerName" clearable placeholder="企业名称" />
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.searchType" @change="params.industry=params.auditor=''" clearable placeholder="类别">
                    <el-option :label="'行业'" value="1"></el-option>
                    <el-option :label="'审核人员'" value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- 行业 -->
            <el-form-item class="el-item-form-width" v-if="params.searchType == 1">
                <el-select v-model="params.industry" clearable placeholder="行业/人员">
                    <el-option v-for="(v,k) in industry" :key="k" :label="v" :value="k"></el-option>
                    <el-option :label="'其他'" value="0"></el-option>
                </el-select>
            </el-form-item>
            <!-- 审核人员 -->
            <el-form-item class="el-item-form-width" v-else-if="params.searchType == 2">
                <el-select v-model="params.auditor" clearable placeholder="审核人员">
                    <el-option v-for="(v,k) in G_userName" :key="k" :label="v" :value="k"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width" v-else>
                <el-select :value="''" clearable placeholder="行业/人员">
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.archiveResult" clearable placeholder="归档结果">
                    <el-option v-for="(v,k) in archiveResult" :key="k" :label="v" :value="k"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-date-width">
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="countIndex1=0;countIndex2=0;getList()">查询</el-button>
                <el-button type="info" size="medium" @click="rest">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="el-20 mb20"></div>

        <!-- 条件复选框 -->
        <cCheckbox class="pt10" :list="categoryList" v-on:search="searchHand" v-if="isRestLoad" />
        <div class="el-20 mt20 "></div>

        <!-- -->
        <div class="count-wrap" v-show="info.itemList">
            <div class="count-left">
                <div class="mt30">
                    <div class="chart-title">舆情数量变化趋势</div>
                </div>
                <div class="text-title mt10">
                    舆情信息总量<span class="f16 pl10 pr10">{{info.total | numFormat }}</span>条
                </div>
                <div class="analyse-line-box">
                    <div class="radio-box">
                        <span v-for="(v,k) in radioList" :key="k" :class="{act:cur === k}" @click="radioHand(k)">{{v}}</span>
                    </div>
                    <chart id="feedback-line" :option="feedbackLineOpts" width="800px" height="520px" />
                </div>
            </div>
            <div class="line20-y"></div>
            <div class="count-right">
                <div class="count-right-top">
                    <div class="chart-title mt30 ml40">归档处理情况</div>

                    <el-row type="flex" class="count-right-wrap" justify="space-between">
                        <div class="pay-box" style="margin-left: 30px">
                            <div class="pie-info">
                                <div class="pie-count pie-green f20">
                                    <el-tooltip class="item" effect="dark" :content="info.dealList[1].count+'条'" placement="top-start" v-if="info.dealList && String(info.dealList[countIndex1].count).length > 5">
                                        <el-button> {{info.itemList && info.dealList[1].count}}<span class="f12">条</span>
                                        </el-button>
                                    </el-tooltip>
                                    <div v-else class="f20 mt10">
                                        {{ info.dealList && info.dealList.length>0 && info.dealList[countIndex1].count }}<sapn class="f12">条</sapn>
                                    </div>
                                </div>
                                <div class="pie-text"> {{ info.dealList && info.dealList.length>0 && info.dealList[countIndex1].name }}</div>
                            </div>
                            <div class="box-bd">
                                <chart height="135px" width="135px" :option="rankPieOption1" id="project-pie" :dispatchAction="dispatchAction" :hover="hover" @showValue="showCp" />
                                <!-- <chart height="125px" width="125px" :option="rankPieOption1" id="pay-pie1" /> -->
                            </div>
                        </div>
                        <div class="type-right">
                            <div class="type-content" v-for="(item,index) in info.dealList" :key="index">
                                <span style="display:inline-block;margin-right:5px;border-radius:5px;width:5px;height:5px;background-color:#43A1AC;" :class="countCollor1[index]"></span>
                                <div class="type-text">{{ item.name }}</div>
                                <div class="type-value">{{ (item.count / info.total*1000/10).toFixed(2)}}%</div>
                            </div>
                        </div>

                    </el-row>

                </div>
                <div class="line20-x"></div>
                <div class="count-right-bottom">
                    <div class="chart-title mt30 ml40">归档分类情况</div>
                    <el-row type="flex" class="count-right-wrap" justify="space-between">
                        <div class="pay-box" style="margin-left: 30px;">
                            <div class="pie-info">
                                <div class="pie-count pie-green f20">
                                    <el-tooltip class="item" effect="dark" :content="info.typeList[countIndex2].count+'条'" placement="top-start"
                                        v-if="info.typeList && String(info.typeList[countIndex2].count).length > 5">
                                        <el-button> {{info.itemList && info.dealList[1].count}}<sapn class="f12">条</sapn>
                                        </el-button>
                                    </el-tooltip>
                                    <div v-else class="f20 mt10">
                                        {{ info.typeList &&  info.typeList.length>0 &&  info.typeList[countIndex2].count }}<sapn class="f12">条</sapn>
                                    </div>
                                </div>
                                <div class="pie-text"> {{ info.typeList && info.typeList.length>0 && info.typeList[countIndex2].name }}</div>
                            </div>
                            <div class="box-bd">
                                <chart height="135px" width="135px" :option="rankPieOption2" id="project-pie-2" :dispatchAction="dispatchAction" :hover="hover" @showValue="showIndex" />
                                <!-- <chart height="125px" width="125px" :option="rankPieOption1" id="pay-pie1" /> -->
                            </div>
                        </div>
                        <div class="type-right">
                            <div class="type-content" v-for="(item,index) in info.typeList" :key="index">
                                <span style="display:inline-block;margin-right:5px;border-radius:5px;width:5px;height:5px;" :class="countCollor2[index]"></span>
                                <div class="type-text">{{ item.name }}</div>
                                <div class="type-value">{{ (item.count / info.total*1000/10).toFixed(2)}}%</div>
                            </div>
                        </div>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="el-20"></div>

        <div class="pt20 pb20" v-show="!info.itemList">
            <el-row type="flex" justify="center" align="middle" class="default-box">
                <img src="~@/assets/images/default.png">
                <div class="pt30 ml30">
                    <p class="f16">暂无数据信息</p>

                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import feedbackLineOpt from '../config/feedback-line'
import feedPie from '../config/countPie'
import cCheckbox from '../components/c-checkbox'
import Chart from "@/components/Charts/invoiceInvalid"
import { deepClone } from "@/utils/common";
import { formatDate } from "@/filters/index";
export default {
    components: {
        cCheckbox,
        Chart
    },
    data() {
        return {
            fastOptions: [
                {
                    value: 30,
                    label: "近30日"
                },
                {
                    value: 60,
                    label: "近60日"
                },
                {
                    value: 180,
                    label: "近180日"
                },
                {
                    value: 360,
                    label: "近1年"
                }
            ],
            hover: true,
            dispatchAction: true,
            dateArr: [],
            isFirst: true,
            isRestLoad: true,
            cur: 0,
            index1: 0,
            index2: 0,
            timer1: null,
            timer2: null,
            params: {
                "customerName": "", // 企业名称
                "startTime": '', // 开始日期
                "endTime": '', // 结束日期
                "itemIds": "", // 舆情分类ID
                "searchType": "", // 1 行业查询  2:审核人查询
                "industry": "", // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "auditor": "", // 审核人
                "archiveResult": "", // 风险级别(归档结果)
                "viewType": "1", // 展示方式  1:按日  2:按周  3:按月
            },
            feedbackLine: null,
            feedbackPie1: null,
            feedbackPie2: null,
            radioList: ['日', '周', '月'],
            industry: {
                '1': '基建',
                '2': '医药',
                '3': '能源'
            },
            archiveResult: {
                '1': '正常',
                '2': '关注',
                '3': '未处理'
            },
            categoryList: [],
            checkList: [],
            info: {},
            feedbackLineOpts: {},
            rankPieOption1: {},
            rankPieOption2: {},
            countIndex1: 0,
            countIndex2: 0,
            countCollor1: ['co1', 'co2'],
            countCollor2: ['co3', 'co4', 'co5']

        }
    },
    mounted() {
        // 设置默认请求数据
        this.fastChange(30)
        this.setDefaultData(0)

        this.getList()
        this.getCategory()

        // 添加测试账号
        if (process.env.VUE_APP_ENV !== 'pro') {
            this.G_userName = { ...this.G_userName, ...this.G_userName_test }
        }

    },
    methods: {
        fastChange(val) {
            const date = new Date();
            this.params.endTime = formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.startTime = formatDate(startDate);
            this.dateArr = [this.params.startTime, this.params.endTime];
        },
        showCp(value) {
            console.log(value);
            this.countIndex1 = value.dataIndex
        },
        showIndex(value) {
            console.log(value, 'index')
            this.countIndex2 = value.dataIndex
        },

        changeDate(v) {
            this.dateArr = []
            if (v && v.length > 0) {
                this.params.startTime = v[0];
                this.params.endTime = v[1];
            } else {
                this.params.startTime = '';
                this.params.endTime = '';
            }
            this.dateArr.push(this.params.startTime, this.params.endTime)
        },
        rest() {
            this.fastChange(30)
            this.countIndex1 = 0;
            this.countIndex2 = 0;
            this.params = {
                "customerName": "", // 企业名称
                "startTime": this.formatDate(new Date), // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
                "itemIds": "", // 舆情分类ID
                "searchType": "", // 1 行业查询  2:审核人查询
                "industry": "", // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "auditor": "", // 审核人
                "archiveResult": "", // 风险级别(归档结果)
                "viewType": "1", // 展示方式  1:按日  2:按周  3:按月
            }
            // this.dateArr = [this.formatDate(new Date), this.formatDate(new Date)]
            this.checkList = []
            this.getList()

            // 重置复选框
            this.isRestLoad = false
            setTimeout(() => {
                this.isRestLoad = true
            }, 0);
        },
        setDefaultData(num) {
            this.cur = num
            this.params.viewType = num + 1
        },
        searchHand(v) {
            this.checkList = v
            this.getList(1)
        },
        radioHand(k) {
            this.cur = k
            this.params.viewType = k + 1
            this.getList(1)
        },

        setData() {
            let pieColor = ['#297D70', '#43A1AC']
            let color = ['#9BBC6C', '#4A92E9', '#43A1AC']

            // 折线图
            feedbackLineOpt.xAxis.data = []
            feedbackLineOpt.series.data = []
            this.info.itemList && this.info.itemList.map(v => {
                feedbackLineOpt.series.data.push(v.count)
                feedbackLineOpt.xAxis.data.push(v.day)
            })

            /* 设置图表滚动条 */
            let num = 20 // 展示的个数
            let count = (this.info.itemList || 0).length //总数
            let process = (num * 100 / count)
            feedbackLineOpt.dataZoom.map(c => c.end = process)
            this.feedbackLineOpts = feedbackLineOpt


            let feedData = deepClone(feedPie)
            let feedData2 = deepClone(feedPie)


            feedData.series[0].color = pieColor
            feedData2.series[0].color = color

            feedData.series[0].data = this.info && this.info.dealList.map((i, index) => {
                return {
                    value: (i.count / this.info.total.toFixed(2)) * 1000 / 10,
                    name: i.name,
                    count: i.count
                    // itemStyle: pieColor[index],
                }
            })
            feedData2.series[0].data = this.info && this.info.typeList.map((i, index) => {
                return {
                    value: (i.count / this.info.total.toFixed(2)) * 1000 / 10,
                    name: i.name,
                    count: i.count
                    // itemStyle: color[index],
                }
            })
            this.rankPieOption1 = feedData
            this.rankPieOption2 = feedData2




            // this.feedbackPie2.setOption(feedbackPieOpt2)

            // this.setDefaultPie1(this.feedbackPie1, feedbackPieOpt1.series.data.length)
            // this.setDefaultPie2(this.feedbackPie2, feedbackPieOpt2.series.data.length)
        },
        // 计算时间差，返回天数
        diff(startTime, endTime) {
            let a = new Date(startTime).getTime()
            let b = new Date(endTime).getTime()
            let c = b - a
            return Math.floor(c / (24 * 3600 * 1000))
        },
        async getList(type) {
            let params = this.params

            // 超过一年，默认按周展示
            if (this.diff(params.startTime, params.endTime) >= 360 && this.params.viewType * 1 === 1) {
                !this.isFirst && this.$message.warning('时间间隔超过一年将以周的数据展示')
                this.setDefaultData(1)
            }

            params = { ...params, ...{ itemIds: this.checkList } }

            let res = await this.ajax.get('risk/server/daily/summary', params)
            if (res.code === '200') {
                this.info = res.data
                this.isFirst = false
                this.setData()
            }
        },
        /* 获取分类 */
        async getCategory() {
            let res = await this.ajax.get('risk/server/notify/item/list')
            if (res.code === '200') {
                this.categoryList = res.data
            }
        },
    },
    beforeDestroy() {
        window.clearInterval(this.timer1)
        window.clearInterval(this.timer2)
    },

}
</script>
<style lang="less" scoped>
.co1 {
    background: #297d70;
}
.co2 {
    background: #43a1ac;
}
.co3 {
    background: #9bbc6c;
}
.co4 {
    background: #4a92e9;
}
.co5 {
    background: #43a1ac;
}
.type-text {
    width: 60px;
    color: #33646a;
}
.type-value {
    margin-left: 10px;
}
.type-right {
    font-family: PingFangSC-Light;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    vertical-align: middle;
}
.type-content {
    display: flex;
    margin-left: 80px;
    margin-bottom: 10px;
    width: 200px;
    span {
        margin-top: 4px;
    }
}
/deep/ .el-checkbox .el-checkbox__label {
    width: 62px;
}

.pie-count {
    /deep/ .el-button {
        margin-top: 10px;
        margin-bottom: 4px;
        background: none;
        border: none;
        font-family: PingFangSC-Light;
        font-size: 20px;
        color: #43a1ac;
        letter-spacing: 1.01px;
        text-align: center;
        padding: 0;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.pie-right-count {
    /deep/ .el-button {
        background: none;
        border: none;
        font-family: PingFangSC-Light;
        font-size: 30px;
        color: #43a1ac;
        letter-spacing: 1.01px;
        text-align: center;
        line-height: 42px;
        padding: 0;
        width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.chart-title {
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 1.5px;
}
.text-title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #43a1ac;
    letter-spacing: 0;
    line-height: 14px;
}
.line20-y {
    background: #1d1e23;
    width: 20px;
    height: 620px;
}
.line20-x {
    background: #1d1e23;
    margin: 0 -22px;
    height: 20px;
}
.count-right-wrap {
    width: 430px;
    margin: 0 auto;
    padding-top: 30px;
}
.count-right-bottom-wrap {
    width: 510px;
    margin: 0 auto;
    padding-top: 50px;
}
.count {
    &-wrap {
        display: flex;
        justify-content: space-around;
    }

    &-left {
        overflow: hidden;
        // background: #232528;
        width: 840px;
        height: 591px;
    }
    &-right-top {
        overflow: hidden;
        // background: #232528;
        width: 450px;
        height: 298px;
    }
    &-right-bottom {
        overflow: hidden;
        // background: #232528;
        width: 450px;
        height: 298px;
    }
}
.left {
    width: 900px;
    height: 534px;
    padding-top: 35px;
    // background: url(~@/assets/images/feedback-bg1.png) left bottom no-repeat;
}
.right {
    width: 320px;
    height: 534px;
    padding-top: 35px;
    // background: url(~@/assets/images/feedback-bg2.png) right bottom no-repeat;
}
.pay-right-box {
    position: relative;
}
.pie-right-info {
    position: absolute;
    top: 34px;
    left: 20px;
    z-index: 9999999;
    width: 80px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pie-right-count {
    font-family: PingFangSC-Light;
    font-size: 30px;
    letter-spacing: 1.01px;
    text-align: center;
}
.pie-right-text {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0.54px;
}
.pie-box {
    position: relative;
    width: 320px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    overflow: hidden;
    .pie-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 320px;
        height: 174px;
        background: url(~@/assets/images/feedback-pie-bg.png) center no-repeat;
        background-size: 76px 76px;
        &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            background: url(~@/assets/images/feedback-pie-run.png) center no-repeat;
            background-size: 160px 160px;
            animation: rotate-reverse 10s linear infinite;
            transform-origin: center;
        }
        // &::after{
        //     position: absolute;
        //     content: '';
        //     width: 100%;
        //     height: 100%;
        //     background: url(~@/assets/images/feedback-pie-1.png) center no-repeat;
        //     background-size: 34px 43px;
        // }
    }
}
#feedback-line {
    width: 600px;
    height: 400px;
    margin: 0 auto;
}
#feedback-pie1,
#feedback-pie2 {
    width: 320px;
    height: 174px;
}

.analyse-line-box {
    position: relative;
    .radio-box {
        position: absolute;
        top: 10px;
        right: 40px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        text-align: right;
        z-index: 99;
        span {
            display: inline-block;
            padding: 0 4px;
            cursor: pointer;
            &.act {
                color: #367078;
            }
        }
        span + span {
            &::before {
                content: "";
                display: inline-block;
                width: 1px;
                height: 10px;
                background: #4f5155;
                margin-right: 8px;
            }
        }
    }
}
.pie-info {
    position: absolute;
    top: 65px;
    left: 52px;
    z-index: 9999999;
    width: 80px;
    text-align: center;
}
.pie-count {
    font-family: PingFangSC-Light;
    font-size: 30px;
    letter-spacing: 1.01px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.pie-green {
    color: #43a1ac;
}
.pie-blue {
    color: #43a1ac;
}
.pie-text {
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 0.54px;
}
.pay-box {
    position: relative;
    width: 189px;
    height: 188px;
    border: 1px solid #2e3236;
    display: flex;
    box-sizing: border-box;

    .box-bd {
        position: relative;
        width: 189px;
        height: 188px;
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
            width: 94.5px;
            height: 94px;
            border-right: 1px solid #2e3236;
            border-bottom: 1px solid #2e3236;
            z-index: 0;
        }
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            width: 93.5px;
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
        display: flex;
        align-items: center;

        .box-txt {
            font-family: PingFangSC-Light;
            padding-left: 30px;
            font-size: 16px;
            color: #449fa8;
            letter-spacing: 1px;
            p:first-child {
                font-size: 28px;
                color: #fff;
            }
        }
    }
}
</style>


