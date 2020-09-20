<template>
    <!-- 检测分析-舆情分析 -->
    <div class="page">
        <div>

            <el-form :inline="true" class="mb-18 pt20">
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="fastData" filterable placeholder="快速筛选时间" clearable @change="fastChange">
                        <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="initDate">查询</el-button>
                    <el-button type="info" size="medium" @click="rest">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="el-20"></div>

        <div class="pt40">
            <el-row type="flex" justify="space-between" class="pr20">
                <div class="left">
                    <div class="pb30">
                        <div class="chart-title">公司舆情分类TOP10</div>
                    </div>
                    <el-row type="flex" class="fc-b1 f12 pb10">
                        <c-tag v-for="(v,k) in tagList" :key="v.value" :class="{act:cur1 === k}" @click.native="cur1=k,getBarData(v.value)">{{v.label}}</c-tag>
                    </el-row>
                    <div class="alert-info" v-if="barData.length===0">暂无数据信息</div>
                    <div class="n-unit">单位: 条</div>

                    <chart height="400px" width="600px" :option="analyseBarOpt" id="analyse-bar" />
                </div>
                <div class="hr"></div>
                <div class="right pl20">
                    <div class="pb30">
                        <div class="chart-title">重大事件发生趋势</div>
                    </div>
                    <el-row type="flex" justify="space-between">
                        <el-row type="flex" align="middle">
                            <el-row type="flex" class="fc-b1 f12">
                                <c-tag v-for="(v,k) in tagList" :key="v.value" :class="{act:cur2 === k}" @click.native="cur2=k,tagHand(v.value)">{{v.label}}</c-tag>
                            </el-row>
                            <div class="fc-b1 f12 ml20">
                                <el-select placeholder="重大事件标签" v-model="paramsEvent.itemId" @change="getLineData(1)" size="mini" style="width:140px" clearable>
                                    <el-option v-for="v in eventTags" :key="v.id" :label="v.name" :value="v.id"></el-option>
                                </el-select>
                            </div>
                        </el-row>

                        <div class="radio-box mr50">
                            <span v-for="(v,k) in radioList" :key="k" :class="{act:cur3 === k}" @click="radioHand(k)">{{v}}</span>
                        </div>
                    </el-row>
                    <div class="alert-info2" v-if="lineData.length===0">暂无数据信息</div>
                    <div class="analyse-line-box">
                        <chart height="400px" width="600px" :option="analyseLineOpt" id="analyse-line" />
                    </div>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import echarts from 'echarts'
import analyseLineOpt_ from '../config/analyse-line'
import analyseBarOpt from '../config/analyse-bar'
import cTag from '@/components/common/c-tag'
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from '../../../utils/common'
export default {
    components: {
        cTag, Chart
    },
    data() {
        return {
            dateArr: [],
            barData: {},
            lineData: {},
            eventData: {},
            eventTags: [],
            fastData: '',
            cur1: 0,
            cur2: 0,
            cur3: 1,
            params: {
                "startTime": '', // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
            },
            paramsEvent: {
                "industry": '1', // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "itemId": "", // 舆情项目ID
                "viewType": "2" // 展示方式 1:按日  2:按周  3:按月
            },
            tagList: [
                { label: '基建', value: '1' },
                { label: '医疗', value: '2' },
                { label: '能源', value: '3' },
                { label: '其他', value: '0' }
            ],
            radioList: ['日', '周', '月'],
            analyseLine: null,
            analyseBar: null,
            fastOptions: [
                {
                    value: 30,
                    label: '近30日'
                },
                {
                    value: 60,
                    label: '近60日'
                },
                {
                    value: 180,
                    label: '近180日'
                },
                {
                    value: 360,
                    label: '近1年'
                }
            ],
            importLine: false,
            analyseBarOpt: {},
            analyseLineOpt: {},
        }
    },
    created() {
        this.$nextTick(() => {
            this.analyseBar = echarts.init(document.getElementById('analyse-bar'))
            this.analyseLine = echarts.init(document.getElementById('analyse-line'))
        })
    },
    mounted() {

        this.params.startTime = this.getPreDate(30)
        this.getDate()

        this.initDate()
    },
    watch: {
        flag() {
            this.initDate()
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        getDate() {
            this.dateArr.push(this.params.startTime, this.formatDate(new Date))
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
            this.dateArr = []
            this.params = {
                "startTime": this.getPreDate(30), // 开始日期
                "endTime": this.formatDate(new Date), // 结束日期
            }
            this.paramsEvent = {
                "industry": '1', // 行业（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                "itemId": "", // 舆情项目ID
                "viewType": "2" // 展示方式 1:按日  2:按周  3:按月
            }
            this.dateArr.push(this.getPreDate(30), this.formatDate(new Date))
            this.fastData = ''
            this.initDate()
        },
        initDate() {
            // 默认为基建
            this.getBarData(1)
            this.getEventData()
        },
        radioHand(k) {
            this.cur3 = k
            this.paramsEvent.viewType = k + 1
            this.getLineData(1)
        },
        setBarData() {
            analyseBarOpt.yAxis.data = []
            analyseBarOpt.series[0].data = []
            analyseBarOpt.series[1].data = []
            if (this.barData.length > 0) {
                analyseBarOpt.yAxis.splitLine = {
                    show: false,
                },
                    analyseBarOpt.xAxis.type = 'value'
                this.barData.map((v, k) => {
                    analyseBarOpt.yAxis.data.push(v.customerName)
                    analyseBarOpt.series[1].data.push(v.count)
                })
            } else {
                analyseBarOpt.yAxis.splitLine = {
                    show: true,
                    lineStyle: {
                        // 使用深浅的间隔色
                        color: ['#393B3E', '#393B3E']
                    }

                },
                    analyseBarOpt.xAxis.type = 'category'
                analyseBarOpt.yAxis.data = []
                analyseBarOpt.xAxis.data = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
            }



            // 设置最大值
            let max = Math.max(...analyseBarOpt.series[1].data)
            analyseBarOpt.series[1].data.map(v => {
                analyseBarOpt.series[0].data.push(max)
            })
            // 提示框样式
            analyseBarOpt.tooltip.formatter = (params, ticket, callback) => {
                let inx = (params[0] || {}).dataIndex
                let list = this.barData[inx].itemList
                let str = `<div><span>${this.barData[inx].customerName}</span><span class="c_O" style="color: #41A4B0;margin-left: 6px">(${this.barData[inx].count})</span></div>`
                str += `<div class="chartTopBox" style="displat: none">`
                list && list.map(v => {
                    str += `<div><span>${v.name}</span><span class="fc-b1 " style="color: #41A4B0;margin-left: 6px">(${v.count})</span></div>`
                })
                str += `</div>`
                return str;
            }

            // 主题切换
            if (this.flag === 'light') {
                analyseBarOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                analyseBarOpt.tooltip.borderWidth = 0;
                analyseBarOpt.yAxis.axisLine = this.$medicine.axis
                analyseBarOpt.xAxis.axisLine = this.$medicine.axis
                analyseBarOpt.series[1].itemStyle.color.image = this.$service.riskControl.analyseOpinion.imgDom1
                analyseBarOpt.series[0].itemStyle.color.image = this.$service.riskControl.analyseOpinion.imgDom
                analyseBarOpt.tooltip.axisPointer.lineStyle.color = this.$medicine.onmouseoverLine
                analyseBarOpt.yAxis.axisLabel = analyseBarOpt.xAxis.axisLabel = {
                    color: this.$medicine.nameColor,
                    fontFamily: 'PingFang-SC-Regular'
                };
            } else {
                analyseBarOpt.tooltip.backgroundColor = '#1A1B1B'
                analyseBarOpt.yAxis.axisLine = { lineStyle: { color: '#36393d' } }
                analyseBarOpt.xAxis.axisLine = { lineStyle: { color: '#36393d' } }
                analyseBarOpt.series[1].itemStyle.color.image = this.$service.riskControl.analyseOpinion_dark.imgDom1D
                analyseBarOpt.series[0].itemStyle.color.image = this.$service.riskControl.analyseOpinion_dark.imgDomD
                analyseBarOpt.tooltip.axisPointer.lineStyle.color = '#7EDEE9'
            }

            this.analyseBarOpt = analyseBarOpt

        },
        setLineData() {
            let analyseLineOpt = deepClone(analyseLineOpt_)
            analyseLineOpt.xAxis.data = []
            analyseLineOpt.series.data = []
            if (this.lineData.length > 0) {
                analyseLineOpt.yAxis.type = 'value'
                this.lineData.map(v => {
                    analyseLineOpt.xAxis.data.push(v.x)
                    analyseLineOpt.series.data.push(v.y)
                })
            } else {
                analyseLineOpt.xAxis.data = ['2019-11-01', '2019-02', '2019-11-03', '2019-11-04', '2019-11-05', '2019-11-06']
                analyseLineOpt.yAxis.type = 'category'
                analyseLineOpt.yAxis.data = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
                console.log(analyseLineOpt, 'analyseLineOpt')
            }


            // 提示框样式
            if (this.importLine) {
                analyseLineOpt.tooltip.position = function (point, params, dom, rect, size) {
                    // 固定在顶部
                    return {
                        left: -400
                    }
                }
            } else {
                analyseLineOpt.tooltip.position = [20, 20]
            }
            analyseLineOpt.tooltip.formatter = (params, ticket, callback) => {
                console.log(params[0].marker)
                let inx = (params[0] || {}).dataIndex
                let list = this.lineData[inx].customerList
                let str = `${params[0].axisValue}: <br/> <div><span><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;background: #76F0FF;"></span>重大事件${this.lineData[inx].itemName ? '-' + this.lineData[inx].itemName : ''}</span><span class="c_O">(${this.lineData[inx].y})</span></div>`
                if (this.importLine) {
                    str += `<div class="chartTopBox2">`
                    list && list.map(v => {
                        str += `<div >${v.name}<span  style="color: #41A4B0;margin-left: 2px">(${v.count})</span></div>`
                    })
                    str += `</div>`
                }
                console.log(str, 'str')

                return str;
            }


            /* 设置图表滚动条 */
            let num = 20 // 展示的个数
            let count = this.lineData.length //总数
            let process = (num * 100 / count)
            analyseLineOpt.dataZoom.map(c => c.end = process)

            if (this.flag === 'light') {
                analyseLineOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                analyseLineOpt.tooltip.borderWidth = 0;
                analyseLineOpt.tooltip.axisPointer.lineStyle.color = this.$medicine.onmouseoverLine
                analyseLineOpt.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                analyseLineOpt.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                analyseLineOpt.yAxis.splitLine = { ...this.$medicine.axis, show: true }
                analyseLineOpt.yAxis.axisLine = this.$medicine.axis
                analyseLineOpt.xAxis.axisLine = this.$medicine.axis
                analyseLineOpt.series.areaStyle.color = this.$service.riskControl.areaStyle
                analyseLineOpt.series.itemStyle.color = this.$service.riskControl.itemStyle
                analyseLineOpt.yAxis.axisLabel = analyseLineOpt.xAxis.axisLabel = {
                    color: this.$medicine.nameColor,
                    fontFamily: 'PingFang-SC-Regular'
                };
                analyseLineOpt.yAxis.nameTextStyle.color = this.$medicine.nameColor;
                analyseLineOpt.yAxis.nameTextStyle.fontFamily = 'PingFang-SC-Regular'
            }

            this.analyseLineOpt = analyseLineOpt
        },
        // @day 往前的天数
        getPreDate(day) {
            const date = new Date()
            let _date = date.setTime(date.getTime() - 3600 * 1000 * 24 * day)
            return this.formatDate(_date)
        },
        fastChange(val) {
            this.dateArr = []
            const date = new Date()
            this.params.endTime = this.formatDate(new Date())
            let startDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * val)
            this.params.startTime = this.formatDate(startDate)
            this.dateArr.push(this.params.startTime, this.params.endTime)
        },
        /* 获取柱形图数据 */
        async getBarData(industry) {
            if (industry) {
                this.params = { ...this.params, ...{ industry } }
            }
            let res = await this.ajax.get('risk/server/event10/summary', this.params)
            if (res.code === '200') {
                this.barData = res.data
                this.setBarData()
            }
        },
        tagHand(k) {
            this.paramsEvent.industry = k

            this.paramsEvent.itemId = ''

            this.eventTags = (this.eventData.filter(v => v.industry === k * 1)[0] || {}).dataList

            // 默认选择第一个标签
            // this.paramsEvent.itemId = this.eventTags[0].id

            this.getLineData(1)
        },
        async getLineData(type) {

            if (this.paramsEvent.itemId !== "") {
                this.importLine = true
                console.log(this.analyseLine, 'this.analyseBarOp')

            } else {
                this.importLine = false
            }
            // this.analyseLineOpt.tooltip.show = true
            // console.log(this.analyseLineOpt, '123')
            let params = { ...this.params, ...this.paramsEvent }
            let res = await this.ajax.get('risk/server/major/summary', params)
            if (res.code === '200') {
                this.lineData = res.data
                this.setLineData()
            }
        },
        async getEventData(type) {
            let res = await this.ajax.get('risk/m/notify/major/event/selection')
            if (res.code === '200') {
                this.eventData = res.data

                // 默认数据调用
                this.tagHand(1)
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .alert-info {
        position: absolute;
        left: 280px;
        top: 246px;
    }
    .alert-info2 {
        position: absolute;
        right: 300px;
        top: 258px;
    }
    .green {
        color: red;
    }
    .n-unit {
        position: absolute;
        left: 590px;
        bottom: 15px;
        font-size: 12px;
    }
    ::v-deep {
        .c-tag + .c-tag {
            // margin-left: 10px;
        }
    }
    .dark {
        .hr {
            width: 20px;
            height: 600px;
            background-color: #1d1e23;
            flex-shrink: 0;
            margin: -40px 0 -60px 0;
        }
        .chart-title {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 1.5px;
            margin-top: -20px;
        }
        .radio-box {
            font-size: 14px;
            color: #a0a3a8;
            z-index: 99;
            span {
                display: inline-block;
                padding: 0 4px;
                cursor: pointer;
                &.act {
                    color: #43a1ac;
                }
            }
            span + span {
                &::before {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 10px;
                    background: #a0a3a8;
                    margin-right: 8px;
                }
            }
        }
    }
    .light {
        .hr {
            width: 20px;
            height: 600px;
            background-color: #ebecf3;
            flex-shrink: 0;
            margin: -40px 0 -60px 0;
        }
        .chart-title {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #333;
            letter-spacing: 1.5px;
            margin-top: -20px;
        }
        .radio-box {
            font-size: 14px;
            color: #a0a3a8;
            z-index: 99;
            span {
                display: inline-block;
                padding: 0 4px;
                cursor: pointer;
                &.act {
                    color: #4064d4;
                }
            }
            span + span {
                &::before {
                    content: "";
                    display: inline-block;
                    width: 1px;
                    height: 10px;
                    background: #a0a3a8;
                    margin-right: 8px;
                }
            }
        }
    }

    .left {
        width: 670px;
        height: 500px;
    }
    .right {
        width: 670px;
        height: 500px;
    }
</style>


