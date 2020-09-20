<template>
    <div>
        <div class="stat pt20">
            <div class="stat-left">
                <div class="stat-number-logo"></div>
                <div class="stat-content ml40">
                    <div class="stat-number">{{ general.totalNum | numFormat }}</div>
                    <div class="stat-text">交易数据-发票总数</div>
                </div>
            </div>
            <div class="stat-right">
                <div class="stat-amount-logo"></div>
                <div class="stat-content ml40">
                    <div class="stat-number">{{ general.totalAmount | numFormat2 }}</div>
                    <div class="stat-text">交易数据-发票总金额</div>
                </div>
            </div>
        </div>
        <div class="el-20"></div>
        <div class="el-big-wrap">
            <el-form :inline="true" ref="form" size="medium" class="mt20">
                <el-form-item>
                    <el-select v-model="params.companyName" filterable style=" width: 260px;" placeholder="企业名称">
                        <el-option v-for="(v, i) in companyList" :key="i" :label="v.companyName" :value="v.companyName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="toSearch">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="stat-container">
                <div class="stat-wrap">
                    <div class="stat-logo1"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">{{ invoiceGeneral.totalNum | numFormat }}</div>
                        <div class="stat-content-bottom">企业发票数</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo2"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">
                            {{
              invoiceGeneral.totalEffectiveAmount | numFormat2
              }}
                        </div>
                        <div class="stat-content-bottom">企业发票金额</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo3"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">{{ invoiceGeneral.amount | numFormat2 }}</div>
                        <div class="stat-content-bottom">经营收入</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo4"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">{{ invoiceGeneral.netIncomeAmount | numFormat2 }}</div>
                        <div class="stat-content-bottom">净收入</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo5"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">{{ invoiceGeneral.totalPositiveNum | numFormat }}</div>
                        <div class="stat-content-bottom">企业有效正数发票数</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo6"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">
                            {{
              invoiceGeneral.totalPositiveAmount | numFormat2
              }}
                        </div>
                        <div class="stat-content-bottom">企业有效正数发票金额</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo7"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">{{ invoiceGeneral.totalNegativeNum | numFormat }}</div>
                        <div class="stat-content-bottom">企业有效负数发票数</div>
                    </div>
                </div>
                <div class="stat-wrap">
                    <div class="stat-logo8"></div>
                    <div class="stat-content">
                        <div class="stat-content-top">
                            {{
              invoiceGeneral.totalNegativeAmount | numFormat2
              }}
                        </div>
                        <div class="stat-content-bottom">企业有效负数发票金额</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="echart-big-wrap mt30 pe">
            <div class="echart-unit">单位:元</div>
            <chart height="511px" width="1320px" id="invoiceMonth" :option.sync="invoiceMonth" />
        </div>
    </div>
</template>
<script>
import tiltLine from "@/views/infrastructure/config/tiltLine";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid.vue";
import { mapState } from "vuex";
import echarts from "echarts"
export default {
    components: {
        Chart
    },
    props: {
        businessType: String
    },
    data () {
        return {
            options: { decimal: "." },
            invoiceMonth: {},
            params: {
                businessType: "1",
                companyName: "北京信远欣得酒店管理有限公司"
            },

            general: {
                totalAmount: 0,
                totalNum: 0
            },
            invoiceGeneral: {
                totalNum: 0, // 累计采集发票张数
                totalAmount: 0, // 累计采集发票金额
                totalPositiveNum: 0, // 累计采集有效正数发票张数
                totalPositiveAmount: 0, // 累计采集有效正数发票金额
                totalNegativeNum: 0, // 累计采集有效负数发票张数
                totalNegativeAmount: 0, // 累计采集有效负数发票金额
                totalInvalidNum: 0, // 累计采集作废发票张数
                totalInvalidAmount: 0, // 累计采集作废发票金额
                amount: 0, // 销项（经营收入），进项（支出）
                netIncomeAmount: 0, // 净收入
                totalInvalidNumNear: 0, // 作废发票张数(近12个月)
                totalInvalidAmountNear: 0, // 作废发票金额(近12个月)
                totalNegativeNumNear: 0, // 有效负数发票张数(近12个月)
                totalNegativeAmountNear: 0, // 有效负数发票金额(近12个月)
                totalEffectiveAmount: 0
            }
        };
    },
    computed: mapState({
        companyList: state => state.invoice.companyList,
        flag: state => state.echart.flag
    }),
    created () {
        this.getGeneral();
        this.getInvoiceGeneral();
        this.getInvoiceMonth();
    },
    watch: {
        flag (e) {
            this.isShow = !this.isShow
            this.getInvoiceMonth()
        }
    },
    methods: {
        toSearch () {
            this.getInvoiceGeneral();
            this.getInvoiceMonth();
        },

        reSet () {
            this.params = {
                businessType: this.businessType,
                companyName: "北京信远欣得酒店管理有限公司"
            };
            this.getInvoiceGeneral();
        },

        // 获取概况
        getGeneral () {
            this.$http(
                "/dcp/count/invoice/sum",
                { businessType: this.businessType },
                { type: "formdata" }
            ).then(res => {
                this.general = res.data;
            });
        },
        // 获取客户开票概况
        getInvoiceGeneral () {
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/invoice", this.params, {
                type: "formdata"
            }).then(res => {
                this.invoiceGeneral = res.data;
            });
        },
        getInvoiceMonth () {
            this.params.businessType = this.businessType;
            let chartData = deepClone(tiltLine);
            chartData.yAxis.name = "";
            this.$http("/dcp/history/month/invoice", this.params, {
                type: "formdata"
            }).then(res => {
                chartData.title.text = "企业开票趋势（监测）";
                chartData.xAxis.data = res.data.map(i => i.statisticalDate);
                chartData.series[0].data = res.data.map(i => i.totalEffectiveAmount);

                chartData.grid.left = "10px";
                chartData.title.padding = [0, 0, 0, 10];
                chartData.dataZoom = [
                    {
                        type: "inside",
                        zoomLock: true,
                        start: 100,
                        end: 50
                    },
                    {
                        type: "slider",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        start: 100,
                        end: 50,
                        height: 8,
                        borderColor: "transparent",
                        backgroundColor: "#242D30",
                        fillerColor: "#2A3C40",
                        showDetail: false,
                        handleSize: false,
                        zoomLock: true
                    }
                ];

                // 主题换肤
                if (this.flag === 'light') {
                    chartData.title.textStyle.color = this.$medicine.title
                    chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                    chartData.tooltip.borderWidth = 0;
                    chartData.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    chartData.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    chartData.series[0].itemStyle.normal.color = this.$service.output.stat.itemStyleColor
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
                            color: this.$service.output.stat.areaStyle[0]
                        },
                        {
                            offset: 1,
                            color: this.$service.output.stat.areaStyle[1]
                        }
                        ]
                    )

                }
                this.invoiceMonth = chartData;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    // 公司统计
    .stat {
        font-family: PingFangSC-Light;
        &-container {
            display: flex;
            flex-wrap: wrap;
            margin-top: -10px;
        }
        &-wrap {
            border: 1px solid #2e3236;
            width: 310px;
            height: 92px;
            align-items: center;
            justify-content: flex-start;
            display: flex;
            flex-direction: row;
            margin-right: 15px;
            margin-top: 10px;
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
        &-content {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            text-align: left;
        }
        &-invoice1,
        &-invoice2,
        &-invoice3,
        &-invoice4,
        &-logo1,
        &-logo2,
        &-logo3,
        &-logo4,
        &-logo5,
        &-logo6,
        &-logo7,
        &-logo8 {
            margin-top: 10px;
            width: 56px;
            height: 56px;
            margin-left: 30px;
        }
        &-logo1 {
            background: url('~@/assets/images/stat/logo1.png') no-repeat;
        }
        &-logo2 {
            background: url('~@/assets/images/stat/logo2.png') no-repeat;
        }
        &-logo3 {
            background: url('~@/assets/images/stat/logo3.png') no-repeat;
        }
        &-logo4 {
            background: url('~@/assets/images/stat/logo4.png') no-repeat;
        }
        &-logo5 {
            background: url('~@/assets/images/stat/logo5.png') no-repeat;
        }
        &-logo6 {
            background: url('~@/assets/images/stat/logo6.png') no-repeat;
        }
        &-logo7 {
            background: url('~@/assets/images/stat/logo7.png') no-repeat;
        }
        &-logo8 {
            background: url('~@/assets/images/stat/logo8.png') no-repeat;
        }
        &-invoice1 {
            background: url('~@/assets/images/stat/green1.png') no-repeat;
        }
        &-invoice2 {
            background: url('~@/assets/images/stat/green2.png') no-repeat;
        }
        &-invoice3 {
            background: url('~@/assets/images/stat/red1.png') no-repeat;
        }
        &-invoice4 {
            background: url('~@/assets/images/stat/red2.png') no-repeat;
        }
        &-content-top {
            text-align: left;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 0;
            line-height: 18px;
        }
        &-content-bottom {
            margin-top: 10px;
            font-size: 14px;
            color: #449fa8;
            letter-spacing: 0.82px;
            line-height: 14px;
        }
    }

    .stat {
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &-left,
        &-right {
            display: flex;
            width: 650px;
            height: 140px;
            background-image: linear-gradient(-90deg, rgba(50, 55, 61, 0.31) 0%, rgba(39, 50, 53, 0.84) 59%, #233132 100%);
            align-self: center;
        }
        &-number-logo,
        &-amount-logo {
            width: 76px;
            height: 76px;
            margin-top: 35px;
            margin-left: 80px;
        }
        &-number-logo {
            background: url('../../assets/images/stat/number.png') no-repeat;
        }
        &-amount-logo {
            background: url('../../assets/images/stat/amount.png') no-repeat;
        }
        &-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin-left: 40px;
        }
        &-number {
            font-size: 30px;
            color: #ffffff;
            letter-spacing: 0.88px;
            line-height: 26px;
        }
        &-text {
            margin-top: 16px;
            font-size: 16px;
            color: #51b5bf;
            letter-spacing: 1.53px;
        }
    }
}
.light {
    // 公司统计
    .stat {
        font-family: PingFangSC-Light;
        &-container {
            display: flex;
            flex-wrap: wrap;
            margin-top: -10px;
        }
        &-wrap {
            background: #eefaf8;
            width: 310px;
            height: 92px;
            align-items: center;
            justify-content: flex-start;
            display: flex;
            flex-direction: row;
            margin-right: 15px;
            margin-top: 10px;
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
        &-content {
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            text-align: left;
        }
        &-invoice1,
        &-invoice2,
        &-invoice3,
        &-invoice4,
        &-logo1,
        &-logo2,
        &-logo3,
        &-logo4,
        &-logo5,
        &-logo6,
        &-logo7,
        &-logo8 {
            margin-top: 10px;
            width: 56px;
            height: 56px;
            margin-left: 30px;
        }
        &-logo1 {
            background: url('~@/assets/images/light/logo1.png') no-repeat;
        }
        &-logo2 {
            background: url('~@/assets/images/light/logo2.png') no-repeat;
        }
        &-logo3 {
            background: url('~@/assets/images/light/logo3.png') no-repeat;
        }
        &-logo4 {
            background: url('~@/assets/images/light/logo4.png') no-repeat;
        }
        &-logo5 {
            background: url('~@/assets/images/light/logo5.png') no-repeat;
        }
        &-logo6 {
            background: url('~@/assets/images/light/logo6.png') no-repeat;
        }
        &-logo7 {
            background: url('~@/assets/images/light/logo7.png') no-repeat;
        }
        &-logo8 {
            background: url('~@/assets/images/light/logo8.png') no-repeat;
        }
        &-invoice1 {
            background: url('~@/assets/images/stat/green1.png') no-repeat;
        }
        &-invoice2 {
            background: url('~@/assets/images/stat/green2.png') no-repeat;
        }
        &-invoice3 {
            background: url('~@/assets/images/stat/red1.png') no-repeat;
        }
        &-invoice4 {
            background: url('~@/assets/images/stat/red2.png') no-repeat;
        }
        &-content-top {
            text-align: left;
            font-size: 18px;
            color: #36c2cf;
            letter-spacing: 0;
            line-height: 18px;
        }
        &-content-bottom {
            margin-top: 10px;
            font-size: 14px;
            color: #666;
            letter-spacing: 0.82px;
            line-height: 14px;
        }
    }
    .stat {
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        padding-bottom: 20px;
        &-left {
            display: flex;
            width: 650px;
            height: 140px;
            background-image: linear-gradient(45deg, #547cfa 0%, #35b2c7 100%);
            align-self: center;
        }
        &-right {
            display: flex;
            width: 650px;
            height: 140px;
            background-image: linear-gradient(269deg, #8699ff 0%, #5577ff 99%);
            align-self: center;
        }
        &-number-logo,
        &-amount-logo {
            width: 76px;
            height: 76px;
            margin-top: 35px;
            margin-left: 80px;
        }
        &-number-logo {
            background: url('../../assets/images/light/number.png') no-repeat;
        }
        &-amount-logo {
            background: url('../../assets/images/light/amount.png') no-repeat;
        }
        &-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
            margin-left: 40px;
        }
        &-number {
            font-size: 30px;
            color: #ffffff;
            letter-spacing: 0.88px;
            line-height: 26px;
        }
        &-text {
            margin-top: 16px;
            font-size: 16px;
            color: #fff;
            letter-spacing: 1.53px;
        }
    }
}
.pe {
    position: relative;
}
.echart-unit {
    position: absolute;
    right: 40px;
    top: 20px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #a0a3a8;
    letter-spacing: 1.17px;
    line-height: 14px;
}
el-form .el-big-wrap {
    width: 1360px;
    margin: 0 auto;
    margin-left: -30px;
}
</style>
