<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item>
                <el-select v-model='params.companyName' clearable @change="ChangeCompany" filterable placeholder="客户名称">
                    <el-option :label='item' :value='item' v-for="(item, index) in companyList" :key="index">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item>
                <el-select v-model='params.productName' clearable filterable @change="changeProductName" style="width: 260px" placeholder="药品名称">
                    <el-option :label='item' :value='item' v-for="(item, index) in productNameList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.productSpec' clearable filterable placeholder="规格">
                    <el-option :label='item' :value='item' v-for="(item, index) in specList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getDrugPriceOption">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap mt0">
            <div class="echart-u">单位：元</div>
            <chart height="511px" width="100%" :option="drugPriceOption" id="drugPrice" />
        </div>
    </div>
</template>

<script>
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import trapezoidalOption from "@/utils/echart/trapezoidalOption";
import { mapState } from "vuex";
import echarts from "echarts"
export default {
    components: {
        Chart
    },
    data() {
        return {
            params: {
                current: 1,
                size: 20,
                companyName: "吉林天华", // 公司名称
                productName: "银杏二萜内酯葡胺注射液", // 药品名称
                productSpec: "" // 规格
            },
            productNameList: [],
            specList: [],
            list: [],
            total: 0,
            drugPriceOption: {}
        };
    },
    watch: {
        flag(e) {
            this.getDrugPriceOption();
        }
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList,
        flag: state => state.echart.flag
    }),
    created() {
        this.getDrugPriceOption();
        this.getCirculationList();
    },
    methods: {
        reSet() {
            this.params = {
                current: 1,
                size: 20,
                companyName: "吉林天华", // 公司名称
                productName: "银杏二萜内酯葡胺注射液", // 药品名称
                productSpec: "" // 规格
            };
            this.getDrugPriceOption();
            this.getCirculationList();
        },
        ChangeCompany(val) {
            this.params.productName = "";
            if (val) {
                this.getProductList(val);
            } else {
                this.productNameList = [];
            }
        },
        changeProductName(val) {
            this.params.productSpec = "";
            if (val) {
                // this.getProductSpecList(this.params.companyName, val);
            } else {
                this.specList = [];
            }
        },
        getCirculationList() {
            this.$http("/dcp/drug/circulation/page/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            );
        },
        //绘图
        getDrugPriceOption() {
            this.$http("/dcp/drug/price", this.params).then(res => {
                let drawDrug = deepClone(trapezoidalOption);
                let drugData = res.data;
                let drugDate;
                if (
                    drugData.salePrice.length > 0 ||
                    drugData.purchasePrice.length > 0
                ) {
                    if (
                        drugData.salePrice.length >
                        drugData.purchasePrice.length
                    ) {
                        drugDate = drugData.salePrice;
                    } else {
                        drugDate = drugData.purchasePrice;
                    }
                    drawDrug.tooltip.axisPointer = {
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
                    drawDrug.tooltip.textStyle = {
                        fontFamily: "PingFangSC-Light"
                    };
                    drawDrug.tooltip.formatter = function (params) {
                        // console.log('params',params);
                        let data = {
                            num: "",
                            num1: ""
                        };
                        let name = "";
                        params.forEach(i => {
                            if (i.seriesName === "销售价格") {
                                data.num = i.value;
                                name = i.name;
                            } else {
                                data.num1 = i.value;
                                name = i.name;
                            }
                        });
                        let str = `<span>${name}</span><br/>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#3B7FEE;"></span>
                        <span>订单价格：${data.num1 ? data.num1.toFixed(2) : ''}</span><br/>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#33F0C0;"></span>
                        <span>销售价格：${data.num ? data.num.toFixed(2) : ''}</span>`;
                        return str;
                    };
                    drawDrug.xAxis.data = drugDate.map(i => i.date);
                    drawDrug.series[1].data = drugData.salePrice.map(
                        i => i.medianPrice
                    );
                    drawDrug.series[0].data = drugData.purchasePrice.map(
                        i => i.medianPrice
                    );
                    let that = this

                    //  主题切换
                    if (this.flag === 'light') {
                        drawDrug.legend.textStyle.color = this.$medicine.legendColor
                        drawDrug.title.textStyle.color = this.$medicine.title
                        drawDrug.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                        drawDrug.series[0].itemStyle.normal.color = this.$medicine.drugprice.price.series0[0]
                        drawDrug.yAxis.axisLine = this.$medicine.axis
                        drawDrug.xAxis.axisLine = this.$medicine.axis
                        drawDrug.xAxis.axisLabel = {
                            color: this.$medicine.nameColor,
                        }
                        drawDrug.yAxis.axisLabel = {
                            "textStyle": {
                                color: this.$medicine.nameColor,
                            }
                        }
                        drawDrug.series[0].itemStyle.normal.areaStyle.color = new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0,
                            [{
                                offset: 0,
                                color: this.$medicine.drugprice.price.series0[1]
                            },
                            {
                                offset: 1,
                                color: this.$medicine.drugprice.price.series0[2]
                            }
                            ]
                        )
                        drawDrug.series[1].itemStyle.normal.color = this.$medicine.drugprice.price.series1[0]
                        drawDrug.series[1].itemStyle.normal.areaStyle.color = new echarts.graphic.LinearGradient(
                            0,
                            1,
                            0,
                            0,
                            [{
                                offset: 0,
                                color: this.$medicine.drugprice.price.series1[1]
                            },
                            {
                                offset: 1,
                                color: this.$medicine.drugprice.price.series1[2]
                            }
                            ]
                        )
                        drawDrug.tooltip.backgroundColor = this.$medicine.tooltipBG
                        drawDrug.tooltip.borderWidth = 0;
                        drawDrug.tooltip.formatter = function (params) {
                            let data = {
                                num: "",
                                num1: ""
                            };
                            let name = "";
                            params.forEach(i => {
                                if (i.seriesName === "销售价格") {
                                    data.num = i.value;
                                    name = i.name;
                                } else {
                                    data.num1 = i.value;
                                    name = i.name;
                                }
                            });
                            let str = `<span>${name}</span><br/>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${that.$medicine.drugprice.price.formatter[0]};"></span>
                        <span>订单价格：${data.num1 ? data.num1.toFixed(2) : ''}</span><br/>
                        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${that.$medicine.drugprice.price.formatter[1]};"></span>
                        <span>销售价格：${data.num ? data.num.toFixed(2) : ''}</span>`;
                            return str;
                        };
                    }
                    this.drugPriceOption = drawDrug;
                } else {
                    this.drugPriceOption = {};
                }
            });
        },
        getProductList(companyName) {
            this.$http(
                "/dcp/drug/product/list",
                { companyName },
                { type: "get" }
            ).then(res => {
                this.productNameList = res.data;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .light {
        .echart-u {
            color: #999;
            font-family: PingFangSC-Regular;
        }
    }
    .echart-u {
        position: absolute;
        top: 60px;
        left: 17px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
    }
</style>

