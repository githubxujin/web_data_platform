<template>
    <div class=" pt10  pb5">
        <el-form :inline=" true" ref="form" size="medium" class="el-serach-form mt10 " style="margin-bottom: -20px;">
            <el-form-item>
                <el-select v-model='params.companyName' filterable style=" width: 260px;" placeholder="企业名称">
                    <el-option v-for="(v,i) in companyList" :key="i" :label='v.companyName' :value='v.companyName'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getCompanyList">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="invoice-wrap">
            <div class="invoice-echart-wrap p-re">
                <div class="invoice-echart-title">开票数分布/趋势</div>
                <chart height="500px" width="600px" :option="numberWeekRiseOption" id="invoice-number-week-rise" />
                <div class="el-unit">单位：张</div>
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList" :key="k" :class="{act: tagCur === k}" @click.native="tagHand(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
            </div>
            <div class="invoice-echart-wrap  p-re">
                <div class="invoice-echart-title">开票金额分布/趋势</div>
                <chart height="500px" width="600px" :option="amountWeekRiseOption" id="invoice-amount-week-rise" />
                <div class="el-unit">单位：万元</div>
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}" @click.native="tagHand1(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
            </div>
        </div>
        <div class="el-20"></div>

        <rush ref="rush" />
    </div>
</template>

<script>
import Chart from "@/components/Charts/invoiceInvalid";
import { mapState } from "vuex";
import { deepClone } from "@/utils/common";
import invoiceOption from "@/views/resource/config/invoiceOption";
import invoiceOptionMonth from "@/views/resource/config/invoiceOptionMonth";
import { monthList, weekList } from "@/views/resource/config/data";
import Rush from "@/components//Service/rush.vue";
import cOp from "@/components/common/c-op";
import echarts from "echarts"
import {
    numFormat2,
    numFormat
} from "@/filters/index"
export default {
    components: {
        Chart,
        cOp,
        Rush
    },
    props: {
        businessType: String
    },
    data() {
        return {
            params: {
                businessType: "1",
                companyName: "北京信远欣得酒店管理有限公司"
            },
            tagCur: 1,
            tagList: [
                {
                    value: 1,
                    label: "周"
                },
                {
                    value: 2,
                    label: "月"
                }
            ],
            tagCur1: 1,
            tagList1: [
                {
                    value: 1,
                    label: "周"
                },
                {
                    value: 2,
                    label: "月"
                }
            ],
            numberWeekRiseOption: {},
            amountWeekRiseOption: {}
        };
    },
    watch: {
        flag(e) {
            this.getNumberMonthRise()
            this.getAmountMonthRise()
        }
    },
    computed: mapState({
        companyList: state => state.invoice.companyList,
        flag: state => state.echart.flag
    }),
    created() {
        this.getNumberMonthRise();
        this.getAmountMonthRise();
    },
    methods: {
        //控制月季年
        tagHand(k, value) {
            this.tagCur = k;
            if (value === 1) {
                this.getNumberWeekRise();
            } else {
                this.getNumberMonthRise();
            }
        },
        tagHand1(k, value) {
            this.tagCur1 = k;
            if (value === 1) {
                this.getAmountWeekRise();
            } else {
                this.getAmountMonthRise();
            }
        },
        reSet() {
            this.tagCur = 1;
            this.tagCur1 = 1;
            this.$refs.rush.tagCur = 1;
            this.$refs.rush.tagCur1 = 1;
            this.$refs.rush.rushUnit = "单位：万元";
            this.$refs.rush.invoiceUnit = "单位：万元";
            this.params = {
                businessType: this.businessType,
                companyName: "北京信远欣得酒店管理有限公司"
            };
            this.getNumberMonthRise();
            this.getAmountMonthRise();
            this.$refs.rush.getAmountMonthInvalid();
            this.$refs.rush.getRushMonthOption();
        },
        getCompanyList() {
            this.tagCur = 1;
            this.tagCur1 = 1;
            this.$refs.rush.tagCur = 1;
            this.$refs.rush.tagCur1 = 1;
            this.$refs.rush.rushUnit = "单位：万元";
            this.$refs.rush.invoiceUnit = "单位：万元";
            this.getNumberMonthRise();
            this.getAmountMonthRise();
            this.$refs.rush.getAmountMonthInvalid();
            this.$refs.rush.getRushMonthOption();
        },
        // 开票张数星期分布，环比增长
        getNumberWeekRise() {
            this.numberWeekRiseOption = {};
            let numberWeekRiseOption = deepClone(invoiceOption);
            numberWeekRiseOption.legend.data = ["开票数", "环比增长"];
            numberWeekRiseOption.xAxis.data = weekList;
            numberWeekRiseOption.series[1].barWidth = 40;
            numberWeekRiseOption.series[1].name = "开票数";
            numberWeekRiseOption.series[0].name = "环比增长";
            numberWeekRiseOption.series[1].itemStyle.normal.color = "#2C383D";
            numberWeekRiseOption.series[1].itemStyle.normal.borderColor =
                "#449BA5";
            numberWeekRiseOption.series[1].emphasis.itemStyle.color = "#466673";
            numberWeekRiseOption.series[1].emphasis.itemStyle.borderColor =
                "#57C5D1";
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/invoice/week", this.params, {
                type: "formdata"
            }).then(res => {
                numberWeekRiseOption.series[0].data = res.data.map(v => {
                    return (v.weekOnWeekNum * 100).toFixed(2);
                });

                numberWeekRiseOption.series[1].data = res.data.map(v => {
                    return v.totalNum;
                });
                if (this.flag === 'light') {
                    numberWeekRiseOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    numberWeekRiseOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    numberWeekRiseOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    numberWeekRiseOption.tooltip.borderWidth = 0;

                    // numberWeekRiseOption.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)" ;
                    numberWeekRiseOption.yAxis.splitLine = this.$medicine.axis
                    numberWeekRiseOption.yAxis[0].axisLine = this.$medicine.axis
                    numberWeekRiseOption.yAxis[1].axisLine = this.$medicine.axis
                    numberWeekRiseOption.xAxis.axisLine = this.$medicine.axis

                    numberWeekRiseOption.xAxis.axisLabel.fontFamily = 'PingFangSC-Regular';
                    numberWeekRiseOption.xAxis.axisLabel.color = this.$medicine.nameColor;
                    numberWeekRiseOption.yAxis[0].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }

                    numberWeekRiseOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.count.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.count.series1_push[1]
                    }]
                    )
                    numberWeekRiseOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    numberWeekRiseOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.count.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.count.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                }
                this.numberWeekRiseOption = numberWeekRiseOption;
            });
        },
        //开票金额星期分布,环比增长
        getAmountWeekRise() {
            this.amountWeekRiseOption = {};
            let amountWeekRiseOption = deepClone(invoiceOption);
            amountWeekRiseOption.legend.data = ["开票金额", "环比增长"];
            amountWeekRiseOption.xAxis.data = weekList;
            // amountWeekRiseOption.yAxis[0].name = "单位/元";
            amountWeekRiseOption.series[1].barWidth = 40;
            amountWeekRiseOption.series[1].name = "开票金额";
            amountWeekRiseOption.series[0].name = "环比增长";
            amountWeekRiseOption.series[1].itemStyle.normal.color = "#30302B";
            amountWeekRiseOption.series[1].itemStyle.normal.borderColor =
                "#BFA559";
            amountWeekRiseOption.series[1].emphasis.itemStyle.color =
                "#7F7045 ";
            amountWeekRiseOption.series[1].emphasis.itemStyle.borderColor =
                "#7F7045 ";
            amountWeekRiseOption.series[0].itemStyle.normal.color = "#DCC072";
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/invoice/week", this.params, {
                type: "formdata"
            }).then(res => {
                amountWeekRiseOption.series[0].data = res.data.map(v => {
                    return (v.weekOnWeekAmount * 100).toFixed(2);
                });
                amountWeekRiseOption.series[1].data = res.data.map(v => {
                    return v.totalAmount / 10000;
                });
                if (this.flag === 'light') {
                    amountWeekRiseOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    amountWeekRiseOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    amountWeekRiseOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    amountWeekRiseOption.tooltip.borderWidth = 0;

                    // amountWeekRiseOption.tooltip.formatter = null ;
                    amountWeekRiseOption.yAxis.splitLine = this.$medicine.axis
                    amountWeekRiseOption.yAxis[0].axisLine = this.$medicine.axis
                    amountWeekRiseOption.yAxis[1].axisLine = this.$medicine.axis
                    amountWeekRiseOption.xAxis.axisLine = this.$medicine.axis

                    amountWeekRiseOption.xAxis.axisLabel.fontFamily = 'PingFangSC-Regular';
                    amountWeekRiseOption.xAxis.axisLabel.color = this.$medicine.nameColor;
                    amountWeekRiseOption.yAxis[0].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    amountWeekRiseOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.money.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.money.series1_push[1]
                    }]
                    )
                    amountWeekRiseOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    amountWeekRiseOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.money.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.money.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                }
                this.amountWeekRiseOption = amountWeekRiseOption;
            });
        },
        //开票金额月度分布，环比/同比增长
        getAmountMonthRise() {
            this.amountMonthRiseOption = {};
            let amountMonthRiseOption = deepClone(invoiceOptionMonth);
            amountMonthRiseOption.legend.data = [
                "开票金额",
                "环比增长",
                "同比增长"
            ];
            amountMonthRiseOption.xAxis.data = monthList;
            // amountMonthRiseOption.yAxis[0].name = "单位/元";
            amountMonthRiseOption.series[1].name = "开票金额";
            amountMonthRiseOption.series[0].name = "环比增长";
            amountMonthRiseOption.series[0].symbol = "circle";
            amountMonthRiseOption.series[0].symbolSize = "6";
            amountMonthRiseOption.series[1].symbol = "circle";
            amountMonthRiseOption.series[1].symbolSize = "6";
            amountMonthRiseOption.series[1].barWidth = 20;
            amountMonthRiseOption.series[1].itemStyle.normal.color = "#7F7045";
            amountMonthRiseOption.series[1].itemStyle.normal.borderColor =
                "#7F7045";
            amountMonthRiseOption.series[1].emphasis.itemStyle.color =
                "#7F7045";
            amountMonthRiseOption.series[1].emphasis.itemStyle.borderColor =
                "#7F7045";
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/invoice/month", this.params, {
                type: "formdata"
            }).then(res => {
                amountMonthRiseOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.monthOnMonthAmount * 100).toFixed(2);
                    }
                );
                amountMonthRiseOption.series[0].itemStyle.normal.color =
                    "#DCC072";
                amountMonthRiseOption.series[2].itemStyle.normal.color =
                    "#DCC072";
                amountMonthRiseOption.series[2].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.yearOnYearAmount * 100).toFixed(2);
                    }
                );
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        amountMonthRiseOption.series[1].data.push({
                            value: (e.totalAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#BFA559",
                                    color: "#30302B"
                                }
                            }
                        });
                    } else {
                        amountMonthRiseOption.series[1].data.push({
                            value: (e.totalAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#BFA559",
                                    color: "#30302B"
                                }
                            }
                        });
                    }
                });
                amountMonthRiseOption.tooltip.formatter = params => {
                    let str = ""
                    params.forEach((i, index) => {
                        if (typeof (i.color) == 'object') {
                            str += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${i.color.colorStops[1].color};"></span>${i.seriesName} ${numFormat(Number(i.data.value))} <br />`
                        } else if (i.data.itemStyle) {
                            str += `${i.marker}${i.seriesName} ${numFormat(Number(i.data.value))} <br />`
                        } else if (index === 0) {
                            str += `${i.marker}${i.seriesName} ${Number(i.data).toFixed(2)}% <br />`
                        } else if (index === 2) {
                            str += `${i.marker}${i.seriesName}  ${numFormat2(Number(i.data))}%<br />`
                        } else {
                            str += `${i.marker}${i.seriesName} ${numFormat2(Number(i.data))}`
                        }
                    })
                    return str
                };
                if (this.flag === 'light') {
                    amountMonthRiseOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    amountMonthRiseOption.tooltip.borderWidth = 0;
                    // amountMonthRiseOption.tooltip.formatter =null;

                    amountMonthRiseOption.series[0].itemStyle.normal.color = this.$service.output.behavior.money.series0_color
                    amountMonthRiseOption.series[2].itemStyle.normal.color = this.$service.output.behavior.money.series2_color
                    amountMonthRiseOption.yAxis.splitLine = this.$medicine.axis
                    amountMonthRiseOption.yAxis[0].axisLine = this.$medicine.axis
                    amountMonthRiseOption.yAxis[1].axisLine = this.$medicine.axis
                    amountMonthRiseOption.xAxis.axisLine = this.$medicine.axis
                    amountMonthRiseOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.money.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.money.series1_push[1]
                    }]
                    )

                    amountMonthRiseOption.xAxis.axisLabel ={
                        color:this.$medicine.nameColor,
                    }
                    amountMonthRiseOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    amountMonthRiseOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    amountMonthRiseOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    amountMonthRiseOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.money.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.money.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    amountMonthRiseOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            amountMonthRiseOption.series[1].data.push({
                                value: (e.totalAmount / 10000).toFixed(2),
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.money.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.money.series1_push[1]
                                        }])
                                    }
                                }
                            });
                        } else {
                            amountMonthRiseOption.series[1].data.push({
                                value: (e.totalAmount / 10000).toFixed(2),
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.money.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.money.series1_push[1]
                                        }])
                                    }
                                }
                            });
                        }
                    })
                }
                this.amountWeekRiseOption = amountMonthRiseOption;
            });
        },
        //开票张数月度分布，环比/同比增长
        getNumberMonthRise() {
            this.numberMonthRiseOption = {};
            let numberMonthRiseOption = deepClone(invoiceOptionMonth);
            numberMonthRiseOption.legend.data = [
                "开票数",
                "环比增长",
                "同比增长"
            ];
            numberMonthRiseOption.xAxis.data = monthList;
            numberMonthRiseOption.series[1].barWidth = 20;
            numberMonthRiseOption.series[1].name = "开票数";
            numberMonthRiseOption.series[0].name = "环比增长";
            numberMonthRiseOption.series[0].symbol = "circle";
            numberMonthRiseOption.series[0].symbolSize = "6";
            numberMonthRiseOption.series[1].symbol = "circle";
            numberMonthRiseOption.series[1].symbolSize = "6";
            numberMonthRiseOption.series[1].itemStyle.normal.color = "#262F3B";
            numberMonthRiseOption.series[1].itemStyle.normal.borderColor =
                "#7F7045";
            numberMonthRiseOption.series[1].emphasis.itemStyle.color =
                "#466673";
            numberMonthRiseOption.series[1].emphasis.itemStyle.borderColor =
                "#57C5D1";
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/invoice/month", this.params, {
                type: "formdata"
            }).then(res => {
                numberMonthRiseOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.monthOnMonthNum * 100).toFixed(2);
                    }
                );
                numberMonthRiseOption.series[2].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.yearOnYearNum * 100).toFixed(2);
                    }
                );
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        numberMonthRiseOption.series[1].data.push({
                            value: e.totalNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#449BA5",
                                    color: "#2C383D"
                                }
                            }
                        });
                    } else {
                        numberMonthRiseOption.series[1].data.push({
                            value: e.totalNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#449BA5",
                                    color: "#2C383D"
                                }
                            }
                        });
                    }
                });
                numberMonthRiseOption.tooltip.formatter = params => {
                    let str = ""
                    params.forEach((i, index) => {
                        if (typeof (i.color) == 'object') {
                            str += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${i.color.colorStops[1].color};"></span>${i.seriesName} ${numFormat(Number(i.data.value))} <br />`
                        } else if (i.data.itemStyle) {
                            str += `${i.marker}${i.seriesName} ${numFormat(Number(i.data.value))} <br />`
                        } else if (index === 0) {
                            str += `${i.marker}${i.seriesName} ${Number(i.data).toFixed(2)}% <br />`
                        } else if (index === 2) {
                            str += `${i.marker}${i.seriesName}  ${numFormat2(Number(i.data))}%<br />`
                        } else {
                            str += `${i.marker}${i.seriesName} ${numFormat2(Number(i.data))}`
                        }
                    })
                    return str
                };
                if (this.flag === 'light') {
                    numberMonthRiseOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    numberMonthRiseOption.tooltip.borderWidth = 0;
                    numberMonthRiseOption.series[0].itemStyle.normal.color = this.$service.output.behavior.count.series0_color
                    numberMonthRiseOption.series[2].itemStyle.normal.color = this.$service.output.behavior.count.series2_color
                    numberMonthRiseOption.yAxis.splitLine = this.$medicine.axis
                    numberMonthRiseOption.yAxis[0].axisLine = this.$medicine.axis
                    numberMonthRiseOption.yAxis[1].axisLine = this.$medicine.axis
                    numberMonthRiseOption.xAxis.axisLine = this.$medicine.axis
                    numberMonthRiseOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.count.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.count.series1_push[1]
                    }]
                    )
                    numberMonthRiseOption.xAxis.axisLabel ={
                        color:this.$medicine.nameColor,
                    }
                    numberMonthRiseOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    numberMonthRiseOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    numberMonthRiseOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    numberMonthRiseOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.count.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.count.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    numberMonthRiseOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            numberMonthRiseOption.series[1].data.push({
                                value: e.totalNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.count.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.count.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        } else {
                            numberMonthRiseOption.series[1].data.push({
                                value: e.totalNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.count.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.count.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        }
                    });
                }
                this.numberWeekRiseOption = numberMonthRiseOption;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    /deep/ #invoice-number-week-rise,
    /deep/ #invoice-amount-week-rise {
        margin-top: 60px;
    }
    .p-re {
        position: relative;
    }
    .el-unit {
        position: absolute;
        top: 108px;
        left: 20px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        line-height: 14px;
    }
    .tag-box {
        position: absolute;
        top: 108px;
        right: -271px;
        width: 410px;
    }
</style>
