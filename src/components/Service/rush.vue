<template>
    <div class="invoice-wrap">
        <div class="invoice-echart-wrap p-re">
            <div class="invoice-echart-title">发票作废分布/比例</div>
            <chart height="500px" width="600px" :option="amountWeekInvalidOption" id="amount-week-invalid" />
            <div class="el-unit">{{ rushUnit}}</div>
            <el-row type="flex" class="tag-box pb20">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v,k) in tagList" :key="k" :class="{act: tagCur === k}" @click.native="tagHand(k,v.value)">
                        {{v.label}}</c-op>
                </el-row>
            </el-row>
        </div>
        <div class="invoice-echart-wrap  p-re">
            <div class="invoice-echart-title">发票冲红分布/比例</div>
            <chart height="500px" width="600px" :option="rushWeekOption" id="rush-week-invalid" />
            <div class="el-unit">{{ invoiceUnit}}</div>
            <el-row type="flex" class="tag-box pb20">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}" @click.native="tagHand1(k,v.value)">
                        {{v.label}}</c-op>
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<style lang="less" scoped>
    /deep/ #rush-week-invalid,
    /deep/ #amount-week-invalid {
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
        top: 98px;
        right: -256px;
        width: 410px;
    }
</style>
<script>
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import invoiceOption from "@/views/resource/config/invoiceOption";
import { monthList } from "@/views/resource/config/data";
import cOp from "@/components/common/c-op";
import echarts from "echarts"
import {
    numFormat2,
    numFormat
} from "@/filters/index"
export default {
    components: {
        Chart,
        cOp
    },
    props: {
        businessType: String
    },
    data() {
        return {
            rushWeekOption: {},
            amountWeekInvalidOption: {},
            params: {
                businessType: "1",
                companyName: ""
            },
            rushUnit: "单位：万元",
            invoiceUnit: "单位：万元",
            tagCur: 1,
            tagList: [
                {
                    value: 1,
                    label: "张数"
                },
                {
                    value: 2,
                    label: "金额"
                }
            ],
            tagCur1: 1,
            tagList1: [
                {
                    value: 1,
                    label: "张数"
                },
                {
                    value: 2,
                    label: "金额"
                }
            ]
        };
    },
    created() {
        this.getAmountMonthInvalid();
        this.getRushMonthOption();
    },
    watch: {
        flag(e) {
            this.getAmountMonthInvalid()
            this.getRushMonthOption()
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
        //控制月季年
        tagHand(k, value) {
            this.tagCur = k;
            if (value === 1) {
                this.getAmountWeekInvalid();
                this.rushUnit = "单位：张";
            } else {
                this.rushUnit = "单位：万元";

                this.getAmountMonthInvalid();
            }
        },
        tagHand1(k, value) {
            this.tagCur1 = k;
            if (value === 1) {
                console.log(1);
                this.getRushWeekOption();
                this.invoiceUnit = "单位：张";
            } else {
                console.log(2);
                this.invoiceUnit = "单位：万元";

                this.getRushMonthOption();
            }
        },
        //作废数月度分布，作废比例
        getAmountWeekInvalid() {
            this.amountWeekInvalidOption = {};
            let amountWeekInvalidOption = deepClone(invoiceOption);
            amountWeekInvalidOption.legend.data = [
                "平均作废比例",
                "作废数",
                "作废比例"
            ];
            amountWeekInvalidOption.legend.left = "center";
            amountWeekInvalidOption.xAxis.data = monthList;
            amountWeekInvalidOption.series[1].name = "作废数";
            amountWeekInvalidOption.series[0].name = "作废比例";
            amountWeekInvalidOption.series[1].barWidth = 20;
            amountWeekInvalidOption.series[0].itemStyle.normal.color =
                "#91B974";
            amountWeekInvalidOption.series[1].itemStyle.normal.color =
                "#283B35";
            amountWeekInvalidOption.series[1].itemStyle.normal.borderColor =
                "#495E39";
            amountWeekInvalidOption.series[1].emphasis.itemStyle.color =
                "#3D6456";
            amountWeekInvalidOption.series[1].emphasis.itemStyle.borderColor =
                "#73915D ";

            this.$http("/dcp/count/invoice/month", this.$parent.params, {
                type: "formdata"
            }).then(res => {
                amountWeekInvalidOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.invalidNumRatio * 100).toFixed(2);
                    }
                );
                amountWeekInvalidOption.series.push({
                    name: "平均作废比例",
                    type: "line",
                    symbol: "none",
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: "#395048",
                            lineStyle: {
                                type: "dotted"
                            }
                        }
                    },
                    data: res.data.countInvoiceMonthVoList.map(i =>
                        (res.data.averageInvalidNumRatio * 100).toFixed(2)
                    )
                });
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        amountWeekInvalidOption.series[1].data.push({
                            value: e.totalInvalidNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#73925D",
                                    color: "#283B35"
                                }
                            }
                        });
                    } else {
                        amountWeekInvalidOption.series[1].data.push({
                            value: e.totalInvalidNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#73925D",
                                    color: "#283B35"
                                }
                            }
                        });
                    }
                });
                if (this.flag === 'light') {
                    amountWeekInvalidOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    amountWeekInvalidOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    amountWeekInvalidOption.series[0].itemStyle.normal.color = this.$service.output.behavior.cancel.series0_color
                    amountWeekInvalidOption.series[2].itemStyle.normal.color = this.$service.output.behavior.cancel.series2_color
                    amountWeekInvalidOption.yAxis.splitLine = this.$medicine.axis
                    amountWeekInvalidOption.yAxis[0].axisLine = this.$medicine.axis
                    amountWeekInvalidOption.yAxis[1].axisLine = this.$medicine.axis
                    amountWeekInvalidOption.xAxis.axisLine = this.$medicine.axis
                    amountWeekInvalidOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    amountWeekInvalidOption.tooltip.borderWidth = 0;
                    amountWeekInvalidOption.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFangSC-Regular'
                    }
                    amountWeekInvalidOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    amountWeekInvalidOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    amountWeekInvalidOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.cancel.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.cancel.series1_push[1]
                    }]
                    )
                    amountWeekInvalidOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    amountWeekInvalidOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.cancel.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.cancel.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    amountWeekInvalidOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            amountWeekInvalidOption.series[1].data.push({
                                value: e.totalInvalidNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.cancel.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.cancel.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        } else {
                            amountWeekInvalidOption.series[1].data.push({
                                value: e.totalInvalidNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.cancel.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.cancel.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        }
                    });
                }
                console.log(JSON.stringify(amountWeekInvalidOption))
                this.amountWeekInvalidOption = amountWeekInvalidOption;
            });
        },
        //作废金额月度分布，作废比例
        getAmountMonthInvalid() {
            this.amountMonthInvalidOption = {};
            let amountMonthInvalidOption = deepClone(invoiceOption);
            amountMonthInvalidOption.legend.data = [
                "平均作废比例",
                "作废金额",
                "作废比例"
            ];
            amountMonthInvalidOption.legend.left = "center";
            amountMonthInvalidOption.xAxis.data = monthList;
            amountMonthInvalidOption.series[1].barWidth = 20;
            amountMonthInvalidOption.series[0].itemStyle.normal.color =
                "#91B974";
            amountMonthInvalidOption.series[1].name = "作废金额";
            amountMonthInvalidOption.series[0].name = "作废比例";
            amountMonthInvalidOption.series[1].itemStyle.normal.color =
                "#283B35";
            amountMonthInvalidOption.series[1].itemStyle.normal.borderColor =
                "#495E39";
            amountMonthInvalidOption.series[1].emphasis.itemStyle.color =
                "#3D6456";
            amountMonthInvalidOption.series[1].emphasis.itemStyle.borderColor =
                "#73915D ";

            this.$http("/dcp/count/invoice/month", this.$parent.params, {
                type: "formdata"
            }).then(res => {
                amountMonthInvalidOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.invalidAmountRatio * 100).toFixed(2);
                    }
                );
                amountMonthInvalidOption.series.push({
                    name: "平均作废比例",
                    type: "line",
                    symbol: "none",
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: "#395048",
                            lineStyle: {
                                type: "dotted"
                            }
                        }
                    },
                    data: res.data.countInvoiceMonthVoList.map(v => {
                        return (res.data.averageInvalidNumRatio * 100).toFixed(
                            2
                        );
                    })
                });
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        amountMonthInvalidOption.series[1].data.push({
                            value: (e.totalInvalidAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#73925D",
                                    color: "#283B35"
                                }
                            }
                        });
                    } else {
                        amountMonthInvalidOption.series[1].data.push({
                            value: (e.totalInvalidAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#73925D",
                                    color: "#283B35"
                                }
                            }
                        });
                    }
                });
                amountMonthInvalidOption.tooltip.formatter = params => {
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
                    amountMonthInvalidOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    amountMonthInvalidOption.tooltip.borderWidth = 0;
                    amountMonthInvalidOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    amountMonthInvalidOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    amountMonthInvalidOption.series[0].itemStyle.normal.color = this.$service.output.behavior.cancel.series0_color
                    amountMonthInvalidOption.series[2].itemStyle.normal.color = this.$service.output.behavior.cancel.series2_color
                    amountMonthInvalidOption.yAxis.splitLine = this.$medicine.axis
                    amountMonthInvalidOption.yAxis[0].axisLine = this.$medicine.axis
                    amountMonthInvalidOption.yAxis[1].axisLine = this.$medicine.axis
                    amountMonthInvalidOption.xAxis.axisLine = this.$medicine.axis
                    amountMonthInvalidOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.cancel.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.cancel.series1_push[1]
                    }]
                    )

                    amountMonthInvalidOption.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFangSC-Regular'
                    }
                    amountMonthInvalidOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    amountMonthInvalidOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }

                    amountMonthInvalidOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    amountMonthInvalidOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.cancel.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.cancel.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    amountMonthInvalidOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            amountMonthInvalidOption.series[1].data.push({
                                value: e.totalNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.cancel.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.cancel.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        } else {
                            amountMonthInvalidOption.series[1].data.push({
                                value: e.totalNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.cancel.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.cancel.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        }
                    });
                }
                this.amountWeekInvalidOption = amountMonthInvalidOption;
            });
        },
        //冲红数月度分布，冲红比例
        getRushWeekOption() {
            let rushWeekOption = deepClone(invoiceOption);
            rushWeekOption.legend.data = ["平均冲红比例", "冲红数", "冲红比例"];
            rushWeekOption.legend.left = "center";
            rushWeekOption.xAxis.data = monthList;
            rushWeekOption.series[1].name = "冲红数";
            rushWeekOption.series[0].name = "冲红比例";
            rushWeekOption.series[0].itemStyle.normal.color = "#62A6F7";
            rushWeekOption.series[1].barWidth = 20;
            rushWeekOption.series[1].itemStyle.normal.color = "#262F3B";
            rushWeekOption.series[1].itemStyle.normal.borderColor = "#5483C3";
            rushWeekOption.series[1].emphasis.itemStyle.color = "#394B5F ";
            rushWeekOption.series[1].emphasis.itemStyle.borderColor =
                "#62A6F7 ";
            this.$http("/dcp/count/invoice/month", this.$parent.params, {
                type: "formdata"
            }).then(res => {
                rushWeekOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.redNumRatio * 100).toFixed(2);
                    }
                );
                rushWeekOption.series.push({
                    name: "平均冲红比例",
                    type: "line",
                    symbol: "none",
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: "#62A6F7",
                            lineStyle: {
                                type: "dotted"
                            }
                        }
                    },
                    data: res.data.countInvoiceMonthVoList.map(v => {
                        return (res.data.averageRedNumRatio * 100).toFixed(2);
                    })
                });
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        rushWeekOption.series[1].data.push({
                            value: e.totalNegativeNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#62A6F7",
                                    color: "#262F3B"
                                }
                            }
                        });
                    } else {
                        rushWeekOption.series[1].data.push({
                            value: e.totalNegativeNum,
                            itemStyle: {
                                normal: {
                                    borderColor: "#62A6F7",
                                    color: "#262F3B"
                                }
                            }
                        });
                    }
                });
                if (this.flag === 'light') {
                    rushWeekOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    rushWeekOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    rushWeekOption.series[0].itemStyle.normal.color = this.$service.output.behavior.red.series0_color
                    rushWeekOption.series[2].itemStyle.normal.color = this.$service.output.behavior.red.series2_color
                    rushWeekOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    rushWeekOption.tooltip.borderWidth = 0;
                    rushWeekOption.yAxis.splitLine = this.$medicine.axis
                    rushWeekOption.yAxis[0].axisLine = this.$medicine.axis
                    rushWeekOption.yAxis[1].axisLine = this.$medicine.axis
                    rushWeekOption.xAxis.axisLine = this.$medicine.axis
                    rushWeekOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.red.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.red.series1_push[1]
                    }]
                    )
                    rushWeekOption.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFangSC-Regular'
                    }
                    rushWeekOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    rushWeekOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }

                    rushWeekOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    rushWeekOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.red.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.red.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    rushWeekOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            rushWeekOption.series[1].data.push({
                                value: e.totalNegativeNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.red.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.red.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        } else {
                            rushWeekOption.series[1].data.push({
                                value: e.totalNegativeNum,
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.red.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.red.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        }
                    });
                }
                this.rushWeekOption = rushWeekOption;
            });
        },
        //冲红金额月度分布，冲红比例
        getRushMonthOption() {
            this.rushMonthOption = {};
            let rushMonthOption = deepClone(invoiceOption);
            rushMonthOption.legend.data = [
                "平均冲红比例",
                "冲红金额",
                "冲红比例"
            ];
            rushMonthOption.legend.left = "center";
            rushMonthOption.xAxis.data = monthList;
            rushMonthOption.series[1].name = "冲红金额";
            rushMonthOption.series[0].name = "冲红比例";
            rushMonthOption.series[0].itemStyle.normal.color = "#62A6F7";
            rushMonthOption.series[1].barWidth = 20;
            rushMonthOption.xAxis.data = monthList;
            rushMonthOption.series[1].itemStyle.normal.color = "#262F3B";
            rushMonthOption.series[1].itemStyle.normal.borderColor = "#5483C3";
            rushMonthOption.series[1].emphasis.itemStyle.color = "#394B5F ";
            rushMonthOption.series[1].emphasis.itemStyle.borderColor =
                "#62A6F7 ";

            this.$http("/dcp/count/invoice/month", this.$parent.params, {
                type: "formdata"
            }).then(res => {
                rushMonthOption.series[0].data = res.data.countInvoiceMonthVoList.map(
                    v => {
                        return (v.redNumRatio * 100).toFixed(2);
                    }
                );
                rushMonthOption.series.push({
                    name: "平均冲红比例",
                    type: "line",
                    symbol: "none",
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: "#62A6F7",
                            lineStyle: {
                                type: "dotted"
                            }
                        }
                    },
                    data: res.data.countInvoiceMonthVoList.map(i =>
                        (res.data.averageRedAmountRatio * 100).toFixed(2)
                    )
                });
                res.data.countInvoiceMonthVoList.forEach(e => {
                    if (e.currentYear === 0) {
                        rushMonthOption.series[1].data.push({
                            value: (e.totalNegativeAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#62A6F7",
                                    color: "#262F3B"
                                }
                            }
                        });
                    } else {
                        rushMonthOption.series[1].data.push({
                            value: (e.totalNegativeAmount / 10000).toFixed(2),
                            itemStyle: {
                                normal: {
                                    borderColor: "#62A6F7",
                                    color: "#262F3B"
                                }
                            }
                        });
                    }
                });
                rushMonthOption.tooltip.formatter = params => {
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
                    rushMonthOption.tooltip.backgroundColor = this.$medicine.tooltipBG
                    rushMonthOption.tooltip.borderWidth = 0;
                    rushMonthOption.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    rushMonthOption.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    rushMonthOption.series[0].itemStyle.normal.color = this.$service.output.behavior.red.series0_color
                    rushMonthOption.series[2].itemStyle.normal.color = this.$service.output.behavior.red.series2_color
                    rushMonthOption.yAxis.splitLine = this.$medicine.axis
                    rushMonthOption.yAxis[0].axisLine = this.$medicine.axis
                    rushMonthOption.yAxis[1].axisLine = this.$medicine.axis
                    rushMonthOption.xAxis.axisLine = this.$medicine.axis

                    rushMonthOption.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFangSC-Regular'
                    }
                    rushMonthOption.yAxis[0].axisLabel = {
                        textStyle: {
                            color: this.$medicine.nameColor,
                        }
                    }
                    rushMonthOption.yAxis[1].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }


                    rushMonthOption.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: this.$service.output.behavior.red.series1_push[0]
                    }, {
                        offset: 1,
                        color: this.$service.output.behavior.red.series1_push[1]
                    }]
                    )
                    rushMonthOption.series[1].itemStyle.normal.borderColor = 'transparent'
                    rushMonthOption.series[1].emphasis.itemStyle = {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: this.$service.output.behavior.red.series1_emphasis[0]
                        }, {
                            offset: 1,
                            color: this.$service.output.behavior.red.series1_emphasis[1]
                        }]
                        ),
                        borderColor: 'transparent'
                    }
                    rushMonthOption.series[1].data = []
                    res.data.countInvoiceMonthVoList.forEach(e => {
                        if (e.currentYear === 0) {
                            rushMonthOption.series[1].data.push({
                                value: (e.totalNegativeAmount / 10000).toFixed(2),
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.red.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.red.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        } else {
                            rushMonthOption.series[1].data.push({
                                value: (e.totalNegativeAmount / 10000).toFixed(2),
                                itemStyle: {
                                    normal: {
                                        borderColor: "transparent",
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: this.$service.output.behavior.red.series1_push[0]
                                        }, {
                                            offset: 1,
                                            color: this.$service.output.behavior.red.series1_push[1]
                                        }]
                                        )
                                    }
                                }
                            });
                        }
                    });
                }
                this.rushWeekOption = rushMonthOption;
            });
        }
    }
};
</script>

