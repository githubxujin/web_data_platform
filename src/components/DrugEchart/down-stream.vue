<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium" class="data-left">
            <el-form-item>
                <el-select v-model="params.companyName" clearable @change="ChangeCompany" filterable placeholder="公司名称">
                    <el-option :label="item" :value="item" v-for="(item, index) in companyList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.companySubname" clearable filterable placeholder="分子公司名称">
                    <el-option :label="item" :value="item" v-for="(item, index) in compnaySubnameList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.agentName" clearable filterable placeholder="客户名称">
                    <el-option :label="item" :value="item" v-for="(item, index) in agentList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.customerName" clearable filterable remote :remote-method="remoteCustomerName" placeholder="下游">
                    <el-option :label="item" :value="item" v-for="(item, index) in customerList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <!-- <el-date-picker v-model='params.beginDate' type="month" value-format='yyyy-MM' placeholder='选择开始日期'
                    style='width:150px'>
                </el-date-picker>
                <span class="el-date">至</span>
                <el-date-picker v-model='params.endDate' type="month" value-format='yyyy-MM' placeholder='选择结束日期'
                    style='width:150px'>
                </el-date-picker> -->
                <el-date-picker v-model="value1" type="monthrange" @change="changeMoun" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange">
                    <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getSteelPricesOption">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re mt30">
            <div class="up-title">配送公司对下游的销售走势</div>
            <chart height="511px" width="100%" style="margin-top:-39px;" :option="steelPricesOption" id="downStream" />
            <el-row type="flex" class="tag-box pb20">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v, k) in tagList1" :key="k" :class="{ act: tagCur1 === k }" @click.native="tagHand1(k, v.value)">
                        {{ v.label }}</c-op>
                </el-row>
                <el-row type="flex">
                    <c-tag v-for="(v, k) in tagList2" :key="k" :class="{ act: tagCur2 === k }" @click.native="tagHand2(k, v.value)">{{ v.label }}</c-tag>
                </el-row>
            </el-row>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import steelLine from "@/utils/echart/drugSteelLine";
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import { mapState } from "vuex";
import { formatDate, numFormat } from "@/filters/index";
import cTag from "@/components/common/c-tag";
import cOp from "@/components/common/c-op";
export default {
    components: {
        Chart,
        cTag,
        cOp
    },
    data() {
        return {
            fastData: "",
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
            steelPricesOption: {},
            params: {
                companyName: "", //公司名称
                companySubname: "", //分子公司
                agentName: "", // 客户名称
                customerName: "", //下游
                beginDate: "",
                endDate: "",
                dateType: 1,
                rateType: 1
            },
            customerList: [],
            compnaySubnameList: [],
            agentList: [],
            tagCur1: 0,
            tagCur2: 0,
            tagList1: [
                {
                    value: 1,
                    label: "月"
                },
                {
                    value: 2,
                    label: "季"
                },
                {
                    value: 3,
                    label: "年"
                }
            ],
            tagList2: [
                {
                    value: 1,
                    label: "环比"
                },
                {
                    value: 2,
                    label: "同比"
                }
            ],
            value1: []
        };
    },
    watch: {
        flag(e) {
            this.getSteelPricesOption();
        }
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList,
        flag: state => state.echart.flag
    }),
    created() {
        this.fastChange(360);
        this.getSteelPricesOption();
    },
    methods: {
        remoteCustomerName(val) {
            if (this.params.companyName) {
                this.$http(
                    "/dcp/drug/customer/list",
                    { companyName: this.params.companyName, name: val },
                    { type: "get" }
                ).then(res => {
                    this.customerList = res.data;
                });
            }
        },
        fastChange(val) {
            const date = new Date();
            this.params.endDate = formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.beginDate = formatDate(startDate);
            this.value1 = [this.params.beginDate, this.params.endDate];
        },
        changeMoun(v) {
            if (v && v.length > 0) {
                this.params.beginDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.beginDate = "";
                this.params.endDate = "";
            }
        },
        reSet() {
            this.params = {
                companyName: "", //公司名称
                companySubname: "", //分子公司
                agentName: "", // 客户名称
                customerName: "", //下游
                // supplierName: "", //供应商名称
                beginDate: "",
                endDate: "",
                dateType: 1,
                rateType: 1
            };
            this.fastChange(360);
            this.tagCur1 = 0;
            this.tagCur2 = 0;
            this.getSteelPricesOption();
        },
        //控制月季年
        tagHand1(k, value) {
            this.tagCur1 = k;
            this.params.dateType = value;
            this.getSteelPricesOption();
        },
        //控制环比/同比
        tagHand2(k, value) {
            this.tagCur2 = k;
            this.params.rateType = value;
            this.getSteelPricesOption();
        },
        ChangeCompany(val) {
            this.params.agentName = "";
            this.params.companySubname = "";
            this.compnaySubnameList = [];
            this.agentList = [];
            if (val) {
                this.getCustomerList(val);
                this.getCompnaySubnameList(val, 1);
                this.getAgentList(val);
            }
        },
        //绘图
        getSteelPricesOption() {
            this.$http("/dcp/drug/sale/downstream", this.params).then(res => {
                let drawSteelLine = deepClone(steelLine);
                let lineData = res.data;
                if (lineData.countList.length && lineData.rateList.length) {

                    drawSteelLine.tooltip.textStyle = {
                        fontFamily: "PingFangSC-Light"
                    };
                    // drawSteelLine.title.text = "";
                    drawSteelLine.tooltip.formatter = function (params) {
                        let str = "";
                        params.forEach(i => {
                            if (i.seriesName === "实际量增长") {
                                str += `<br />${i.marker} ${i.seriesName} ${
                                    i.value ? i.value + "%" : ""
                                    }`;
                            } else {
                                str += `${i.axisValue} <br />${i.marker} ${
                                    i.seriesName
                                    } ${i.value ? numFormat(i.value) : ""}`;
                            }
                        });
                        return str;
                    };
                    drawSteelLine.xAxis.axisLabel = {
                        margin: 14
                    };
                    drawSteelLine.yAxis.axisLabel = {
                        margin: 14
                    };
                    drawSteelLine.xAxis.data = lineData.countList.map(
                        i => i.dateString
                    );
                    drawSteelLine.series[0].data = lineData.countList.map(
                        i => i.taxAmount
                    );
                    drawSteelLine.series[0].symbolSize = 6;

                    (drawSteelLine.series[1].data = lineData.rateList.map(
                        i => {
                            if (i.value) {
                                return i.value;
                            } else {
                                return 0;
                            }
                        }
                    ));
                    drawSteelLine.series[1].symbolSize = 6;


                    //  ---------- 主题切换 开始 ----------
                    if (this.flag === 'dark') {
                        drawSteelLine.tooltip.axisPointer = {
                            lineStyle: {
                                width: 2,
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [
                                        {
                                            offset: 0,
                                            color: "rgba(120,207,214,0)"
                                        },
                                        {
                                            offset: 0.5,
                                            color: "rgba(67,161,172,1)"
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(67,161,172,0)"
                                        }
                                    ],
                                    global: false
                                }
                            }
                        };
                        (drawSteelLine.series[0].itemStyle = {
                            normal: {
                                // label: {
                                //     show: true
                                // },
                                color: "#76F0FF", //改变折线点的颜色
                                lineStyle: {
                                    color: "rgb(67, 160, 171)" //改变折线颜色
                                },
                                areaStyle: {
                                    // 曲线下的渐变色
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        1,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: "rgba(61,64,69,0)"
                                            },
                                            // {
                                            //     offset: 0.5,
                                            //     color: "rgba(103,148,172,0.15)"
                                            // },
                                            {
                                                offset: 1,
                                                color: "rgba(70,147,156,0.5)"
                                            }
                                        ]
                                    )
                                }
                            }
                        }),
                            (drawSteelLine.series[1].itemStyle = {
                                normal: {
                                    // label: {
                                    //     show: true
                                    // },
                                    color: "#63A7F8", //改变折线点的颜色
                                    lineStyle: {
                                        color: "rgb(63, 131, 212)" //改变折线颜色
                                    }
                                    // areaStyle: {
                                    //     // 曲线下的渐变色
                                    //     color: new echarts.graphic.LinearGradient(
                                    //         0,
                                    //         1,
                                    //         0,
                                    //         0,
                                    //         [
                                    //             {
                                    //                 offset: 0,
                                    //                 color: "rgba(61,64,69,0)"
                                    //             },
                                    //             // {
                                    //             //     offset: 0.5,
                                    //             //     color: "rgba(64,132,213,0.28)"
                                    //             // },
                                    //             {
                                    //                 offset: 1,
                                    //                 color: "rgba(64,132,213,0.5)"
                                    //             }
                                    //         ]
                                    //     )
                                    // }
                                }
                            })
                    } else {
                        drawSteelLine.legend.textStyle.color = this.$medicine.legendColor
                        drawSteelLine.yAxis[0].axisLine = this.$medicine.axis
                        drawSteelLine.yAxis[1].axisLine = this.$medicine.axis

                        drawSteelLine.xAxis.axisLabel = {
                            color: this.$medicine.nameColor,
                        }
                        drawSteelLine.yAxis[0].axisLabel = {
                            textStyle: {
                                color: this.$medicine.nameColor,
                            }
                        }
                        drawSteelLine.xAxis.axisTick = this.$medicine.axis
                        drawSteelLine.xAxis.axisLine={
                            lineStyle:{
                                 color:['#ccc']
                            }
                        }
                        drawSteelLine.tooltip.axisPointer = {
                            lineStyle: {
                                width: 2,
                                color: {
                                    type: "linear",
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: this.$medicine.onmouseover,
                                    global: false
                                }
                            }
                        };
                        drawSteelLine.tooltip.backgroundColor = this.$medicine.drugprice.scale.tooltip;
                        (drawSteelLine.series[0].itemStyle = {
                            normal: {
                                color: this.$medicine.drugprice.scale.series0[0], //改变折线点的颜色
                                lineStyle: {
                                    color: this.$medicine.drugprice.scale.series0[1] //改变折线颜色
                                },
                                areaStyle: {
                                    // 曲线下的渐变色
                                    color: new echarts.graphic.LinearGradient(
                                        0,
                                        1,
                                        0,
                                        0,
                                        [
                                            {
                                                offset: 0,
                                                color: this.$medicine.drugprice.scale.areaStyle[0]
                                            },
                                            {
                                                offset: 1,
                                                color: this.$medicine.drugprice.scale.areaStyle[1]
                                            }
                                        ]
                                    )
                                }
                            }
                        }),
                            (drawSteelLine.series[1].itemStyle = {
                                normal: {
                                    color: this.$medicine.drugprice.scale.series1[0], //改变折线点的颜色
                                    lineStyle: {
                                        color: this.$medicine.drugprice.scale.series1[1] //改变折线颜色
                                    }
                                }
                            })
                    }
                    //  ---------- 主题切换 结束 ----------
                    (this.steelPricesOption = drawSteelLine);
                } else {
                    drawSteelLine.xAxis.show = false;
                    drawSteelLine.yAxis[0].show = false;
                    drawSteelLine.yAxis[1].show = false;
                    drawSteelLine.legend.data = [];
                    this.steelPricesOption = drawSteelLine;
                }
            });
        },

        //客户名称下拉框
        getAgentList(companyName) {
            this.$http(
                "/dcp/drug/agent/list",
                { companyName },
                { type: "get" }
            ).then(res => {
                this.agentList = res.data;
            });
        },
        //子公司下拉框
        getCompnaySubnameList(companyName, type) {
            this.compnaySubnameList = [];
            this.$http(
                "/dcp/drug/companySubname/list",
                { companyName, type },
                {
                    type: "get"
                }
            ).then(res => {
                this.compnaySubnameList = res.data;
            });
        },
        //下游下拉框
        getCustomerList(val) {
            this.$http(
                "/dcp/drug/customer/list",
                { companyName: val },
                { type: "get" }
            ).then(res => {
                this.customerList = res.data;
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
        top: 0px;
        right: 54px;
    }
    .dark {
        .up-title {
            position: absolute;
            top: 10px;
            left: 40px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #ffffff;
            letter-spacing: 1.5px;
        }
    }
    .light {
        .up-title {
            position: absolute;
            top: 10px;
            left: 40px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #666;
            letter-spacing: 1.5px;
        }
    }
</style>
