<template>
    <div>
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.mode' clearable placeholder='模块'>
                    <el-option label='基建' :value='1'></el-option>
                    <el-option label='医疗' :value='2'></el-option>
                    <el-option label='能源' :value='3'></el-option>
                    <el-option label='其他' :value='0'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-top: -1px;">
                <el-date-picker v-model='dateArr' type="monthrange" unlink-panels @change='changeDate' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' value-format="yyyy-MM">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click="getChart">查询</el-button>
                <el-button type='info' size='medium' @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re ">
            <div class="echart-big-title num-left">企业开票金额热力图-供应商角度</div>
            <div class="echart-unit">供应商</div>
            <chart height="511px" width="100%" id="invoice23" style="margin-top:20px;" :option="opt" />
            <el-row type="flex" class="tag-box">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v, k) in tagList" :key="k" :class="{ act: tagCur === k }" @click.native="tagHand(k, v.value)">
                        {{ v.label }}</c-op>
                </el-row>
            </el-row>
        </div>
    </div>
</template>
<script>
import heatmap from "./config/hot";
import { deepClone, getDaysValue } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import cOp from "@/components/common/c-op.vue";
import { numFormat } from "@/filters/index"


export default {
    components: {
        Chart,
        cOp
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
            opt: {},
            dateArr: [],
            params: {
                dateType: 1,//时间类型(1:日2:月3:年)
                mode: 1,
                endDate: "",
                startDate: ""
            },
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "日"
                },
                {
                    value: 2,
                    label: "月"
                },

            ],
        };
    },
    created() {
        this.fastChange(360 * 4)
        this.getChart()
    },
    watch: {
        flag(e) {
            this.getChart()
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        fastChange(val) {
            const date = new Date();
            this.params.endDate = this.formatDate(new Date(), 'YYYY-MM');
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.startDate = this.formatDate(startDate, 'YYYY-MM');
            this.dateArr = [this.params.startDate, this.params.endDate]

        },
        reSet() {
            this.tagCur = 0;
            this.params = {
                dateType: 1,
                mode: 1,
                endDate: "",
                startDate: ""
            }
            this.fastChange(360 * 4)
            this.getChart()
        },
        tagHand(cur, value) {
            this.tagCur = cur
            this.params.dateType = value
            this.getChart()
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.startDate = '';
            }
        },
        getChart() {
            let { dateType } = this.params
            this.$http('/dcp/count/invoice/amount', this.params).then(res => {
                let chartData = deepClone(heatmap)
                //31天
                let dayList = []
                if (dateType === 1) {
                    for (let i = 1; i <= 31; i++) {
                        dayList.push(i)
                    }
                } else if (dateType === 2) {
                    for (let i = 1; i <= 12; i++) {
                        dayList.push(i)
                    }
                }

                //公司个数

                let companyList = Object.keys(res.data).reverse()
                let obj = {}
                // 要校对的天数，后端返回的日期数组，返回的value
                companyList.map(i => {
                    obj[i] = getDaysValue(dayList, res.data[i], 'outPutAmount')
                })

                chartData.yAxis.data = companyList
                chartData.xAxis.data = dayList
                chartData.tooltip.axisPointer.label.backgroundColor = '#203E43'
                let heatList = []

                dayList.map((day, z) => {
                    companyList.map((item, index) => {
                        heatList.push([index, z, obj[item][z].outPutAmount])
                    })
                })

                heatList = heatList.map(function (item) {
                    return [item[1], item[0], item[2]];
                });
                chartData.series[0].data = heatList
                chartData.tooltip.formatter = function (params) {
                    if (dateType === 1) {
                        return `<span class="echarts-circle"></span>${companyList[params.value[1]]}<br /> ${dayList[params.value[0]]}日:          ${numFormat(params.data[2])}元 `
                    } else {
                        return `<span class="echarts-circle"></span>${companyList[params.value[1]]}<br /><div > ${dayList[params.value[0]]}月:          ${numFormat(params.data[2])}元 </div>`
                    }

                }

                // 主题切换
                if (this.flag === 'light') {
                    chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                    chartData.tooltip.borderWidth = 0;
                    chartData.dataZoom[0].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    chartData.dataZoom[0].fillerColor = this.$service.output.behavior.dataZoom[1]
                    chartData.tooltip.axisPointer.label.backgroundColor = this.$service.output.application.hotInvoice.axisPointer[0]
                    chartData.tooltip.axisPointer.crossStyle.color = this.$service.output.application.hotInvoice.axisPointer[1]
                    chartData.visualMap.color = this.$service.output.application.hotInvoice.visualMap
                    chartData.visualMap.backgroundColor = this.$service.output.application.hotInvoice.transparent
                    chartData.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };

                }

                this.opt = chartData
            });
        }
    }
};
</script>
<style lang="less" scoped>
    .light {
        .echart-unit {
            color: #999;
            font-family: PingFang-SC-Regular;
        }
    }
    .p-re {
        position: relative;
    }
    .tag-box {
        position: absolute;
        top: 22px;
        right: 86px;
    }
    .num-left {
        top: -20px;
        // width: 500px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        letter-spacing: 1.5px;
    }
    .echart-unit {
        position: absolute;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #a0a3a8;
        letter-spacing: 1px;
        text-align: right;
        top: 28px;
        left: 150px;
    }
</style>