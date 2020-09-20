<template>
    <div>
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item>
                <el-select v-model='params.buyerCustomerName' style='width: 260px' placeholder="企业名称" filterable clearable>
                    <el-option v-for="(v,i) in companyList" :key="i" :label='v' :value='v'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
            </el-date-picker>

            <el-form-item>
                <el-button type='primary' size='medium' @click="getChart">查询</el-button>
                <el-button type='info' size='medium' @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re " v-if="showEchart">
            <div class="echart-big-title num-left">下游回款情况</div>
            <chart height="511px" width="100%" id="invoice21" style="margin-top:20px;" :option="opt" />
        </div>
        <div v-else>
            <not-found height="500px" title="下游回款情况" />
        </div>
    </div>
</template>
<script>
import ecStat from 'echarts-stat';
import scatter from "./config/scatter";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import { numFormat } from "@/filters/index"
import NotFound from "@/components/Charts/not-fount.vue"
export default {
    components: {
        Chart,
        NotFound
    },
    data() {
        return {
            opt: {},
            dateArr: [],
            params: {
                buyerCustomerName: "中国建筑一局（集团）有限公司",
                dateType: 1,
                mode: 1,
                endDate: "",
                startDate: ""
            },
            companyData: {
                buyerName: "",
                industryCategory: 1,
                invoiceEndDate: "",
                invoiceStartDate: "",
                sellerName: ""
            },
            companyList: [],
            showEchart: true,

        };
    },
    created() {
        this.fastChange(360 * 4)
        this.getChart()
        this.getCompanyList()
    },
    watch: {
        flag() {
            this.getChart()
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
        // 获取企业列表
        getCompanyList() {
            this.$http("/riskCredit/dataCenter/queryBuyerCustomerNameList", this.companyData).then(res => {
                this.companyList = res.data
                console.log(this.companyList, ' 企业')

            })
        },
        fastChange(val) {
            const date = new Date();
            this.params.endDate = this.formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.startDate = this.formatDate(startDate);
            this.dateArr = [this.params.startDate, this.params.endDate]

        },

        reSet() {
            this.params = {
                buyerCustomerName: "中国建筑一局（集团）有限公司",
                dateType: 1,
                mode: 1,
                endDate: "",
                startDate: ""
            };
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

            this.$http('/riskCredit/dataCenter/queryReceivableByBuyerCustomerName', this.params).then(res => {
                let data = res.data
                if (Object.keys(data).length > 0) {
                    let arr = []
                    Object.keys(data).map(i => {
                        data[i].map(item => {
                            arr.push([i, item])
                        })
                    })
                    let chartData = deepClone(scatter)
                    chartData.series[0].data = arr
                    var myRegression = ecStat.regression('polynomial', arr, 4);
                    myRegression.points.sort(function (a, b) {
                        return a[0] - b[0];
                    });
                    let buyerCustomerName = this.params.buyerCustomerName
                    chartData.tooltip.formatter = function (params) {
                        return (
                            `<span class="echarts-circle"></span>` +
                            buyerCustomerName + '<br />' +
                            "回款日期: " +
                            params.value[0] +
                            "<br/> " +
                            "回款金额: " +
                            numFormat(params.value[1])
                        );
                    },

                        this.showEchart = true

                    // 主题切换
                    if (this.flag === 'light') {
                        chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                        chartData.tooltip.borderWidth = 0;
                        chartData.yAxis[0].splitLine = this.$medicine.axis
                        chartData.yAxis[0].axisLine = this.$medicine.axis
                        chartData.xAxis[0].axisLine = this.$medicine.axis
                        chartData.xAxis[0].axisTick = this.$medicine.axis
                        chartData.yAxis[0].axisTick = this.$medicine.axis
                        chartData.tooltip.axisPointer.crossStyle.color = this.$service.output.application.scatterDownStream.axisPointer
                        chartData.visualMap.inRange.color = this.$service.output.application.scatterDownStream.visualMap
                        chartData.xAxis[0].axisLabel = {
                            color: this.$medicine.nameColor,
                            fontFamily: 'PingFang-SC-Regular'
                        };
                        chartData.yAxis[0].axisLabel = {
                            color: this.$medicine.nameColor,
                            fontFamily: 'PingFang-SC-Regular'
                        };
                        chartData.yAxis[0].nameTextStyle.color = this.$medicine.nameColor;
                        chartData.yAxis[0].nameTextStyle.fontFamily = 'PingFang-SC-Regular'
                    }

                    this.opt = chartData
                } else {
                    this.showEchart = false
                    this.opt = {}
                }


            });

        }
    }
};
</script>
<style lang="less" scoped>
    .p-re {
        position: relative;
    }
    .tag-box {
        position: absolute;
        top: 30px;
        right: 54px;
    }
    .num-left {
        top: -20px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        letter-spacing: 1.5px;
    }
</style>