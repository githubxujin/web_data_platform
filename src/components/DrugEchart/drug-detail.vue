<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item>
                <el-select v-model='params.companyName' clearable @change="changeCompany" filterable placeholder="客户名称">
                    <el-option :label='item' :value='item' v-for="(item, index) in companyList" :key="index">
                    </el-option>
                </el-select>

            </el-form-item>
            <el-form-item>
                <el-select v-model='params.productName' clearable multiple :multiple-limit="max" @change="changeProductName" collapse-tags style="margin-left: 20px;width: 260px" filterable remote :remote-method="remoteProductName" :loading="loading" placeholder="药品名称">
                    <el-option :label='item' :value='item' v-for="(item, index) in productNameList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.productSpec' clearable filterable remote :remote-method="remoteProductSpec" :loading="loading" placeholder='规格'>
                    <el-option :label='item' :value='item' v-for="(item, index) in productSpecList" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="drawEchart">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap echart-big-wrap-b">
            <div class="echartTitle">近十二个月药品订单金额及增长率</div>
            <div class="echart-u">单位：元</div>
            <chart height="511px" width="100%" :option="drugOrderAmout" id="drugOrderAmout" style="margin-top:12px" />
        </div>
        <div class="el-20"></div>
        <div class="echart-big-wrap mt0">
            <div class="echartTitle">近十二个月药品销售金额及增长率</div>
            <div class="echart-u">单位：元</div>
            <chart height="511px" width="100%" :option="drugSaleAmout" id="drugSaleAmout" />
        </div>
    </div>
</template>

<script>
const arrColor = [
    {
        color: "#43A1AC"
    },
    {
        color: "#C2A754"
    },

    {
        color: "#6188E1"
    }
];
const Arrline = [
    {
        normal: {
            color: "#43A1AC",
            lineStyle: {
                type: "dotted"
            }
        }
    },
    {
        normal: {
            color: "#C2A754",
            lineStyle: {
                type: "dotted"
            }
        }
    },
    {
        normal: {
            color: "#6188E1",
            lineStyle: {
                type: "dotted"
            }
        }
    }
];
import Chart from "@/components/Charts/invoiceInvalid";
import { mapState } from "vuex";
// import top from '../../assets/images/active/top.png';
import { deepClone, getKeyValue } from "@/utils/common";
import overlapOption from "@/utils/echart/overlapOption";
import { getDateArr } from "@/filters/index"
export default {
    components: {
        Chart
    },
    data() {
        return {
            loading: false,
            max: 3,
            params: {
                companyName: "吉林天华", // 公司名称
                productName: ["银杏二萜内酯葡胺注射液"], // 药品名称
                productSpec: "" // 规格
            },
            drugSaleAmout: {},
            drugOrderAmout: {},
            productNameList: [],
            productSpecList: []
        };
    },
    created() {
        this.drawEchart();
    },
    watch: {
        flag(e) {
            this.getDrugOrderAmout();
            this.getDrugSaleAmout();
        }
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList,
        flag: state => state.echart.flag
    }),
    methods: {
        remoteProductName(query) {
            if (this.params.companyName) {
                this.$http(
                    "/dcp/drug/product/list",
                    { name: query, companyName: this.params.companyName },
                    {
                        type: "get"
                    }
                ).then(res => {
                    this.loading = false;
                    this.productNameList = res.data;
                });
            }
        },
        remoteProductSpec(query) {
            if (this.params.companyName) {
                this.$http(
                    "/dcp/drug/product/spec/list",
                    { name: query, companyName: this.params.companyName },
                    {
                        type: "get"
                    }
                ).then(res => {
                    this.loading = false;
                    this.productSpecList = res.data;
                });
            }
        },
        reSet() {
            this.params = {
                companyName: "吉林天华", // 公司名称
                productName: ["银杏二萜内酯葡胺注射液"], // 药品名称
                productSpec: "" // 规格
            };
            this.drawEchart();
        },
        changeCompany(val) {
            this.params.productName = [];
            if (val) {
                this.getProductList(val);
            } else {
                this.productNameList = [];
            }
        },
        changeProductName(val) {
            this.params.productSpec = "";
            val.length === 1
                ? this.getProductSpecList(this.params.companyName, val)
                : (this.productSpecList = []);
        },
        getProductList(companyName) {
            this.params.productName = [];
            this.$http(
                "/dcp/drug/product/list",
                { companyName },
                { type: "get" }
            ).then(res => {
                this.productNameList = res.data;
            });
        },
        getProductSpecList(companyName, productName) {
            this.$http(
                "/dcp/drug/product/spec/list",
                { companyName, productName },
                { type: "get" }
            ).then(res => {
                this.productSpecList = res.data;
            });
        },
        //绘图
        drawEchart() {
            if (this.params.companyName && this.params.productName.length > 0) {
                this.getDrugSaleAmout();
                this.getDrugOrderAmout();
            } else {
                this.$message.warning("客户名称与药品名称不能为空");
                return false;
            }
        },
        getDrugSaleAmout() {
            this.$http("/dcp/drug/sale/amount", this.params).then(res => {
                let drugData = res.data;
                let drawOpt = deepClone(overlapOption);
                drawOpt.title.text = "";
                // drawOpt.title.text = "近十二个月药品销售金额及增长率";

                // let maxData = [];
                // let index = 0;
                // let max = drugData[0].dataList.length;
                let dateArr = getDateArr()
                let key = dateArr.reduce((acc, cur) => {
                    acc[cur.date] = 0;
                    return acc;
                }, {});
                drawOpt.tooltip.formatter = function (params) {
                    let str = "";
                    params.forEach((v, i) => {
                        // console.log('i',i);
                        if (i === 0) {
                            str += `${v.axisValue} <br />${v.marker} ${v.seriesName} ${v.value ? v.value.toFixed(2) : ''}`;
                        } else {
                            str += `<br />${v.marker} ${v.seriesName} ${v.value === '' ? '' : v.value + '%'}`;
                        }
                    });
                    return str;
                };
                drawOpt.tooltip.axisPointer = {
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
                drawOpt.tooltip.textStyle = {
                    fontFamily: "PingFangSC-Light"
                };
                drawOpt.xAxis[0].data = dateArr.map(i => i.date);
                drawOpt.series = drugData.map((i, index) => {
                    return {
                        type: "pictorialBar",
                        stack: "总量",
                        symbol: "fixed",
                        symbolSize: [28, 3],
                        symbolRepeat: "repeat",
                        barWidth: 40,
                        name: i.productName,
                        data: Object.values(
                            getKeyValue(i.dataList, deepClone(key))
                        ),
                        itemStyle: Arrline[index]
                    };
                });

                drugData.forEach((i, index) =>
                    drawOpt.series.push({
                        name: i.productName + "增长率",
                        symbol: "circle",
                        yAxisIndex: 1,
                        type: "line",
                        data: Object.values(
                            getKeyValue(i.rateList, deepClone(key))
                        ),
                        itemStyle: Arrline[index]
                    })
                );
                drawOpt.legend.data = drugData.map(i => i.productName);
                drugData.forEach(i =>
                    drawOpt.legend.data.push(i.productName + "增长率")
                );
                //  主题切换
                if (this.flag === 'light') {
                    drawOpt.legend.textStyle.color = this.$medicine.legendColor
                    drawOpt.title.textStyle.color = this.$medicine.title
                    drawOpt.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    drawOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                    drawOpt.tooltip.borderWidth = 0;
                    drawOpt.yAxis[0].axisLine = this.$medicine.axis
                    drawOpt.yAxis[1].axisLine = this.$medicine.axis
                    drawOpt.xAxis[0].axisLine = this.$medicine.axis
                    drawOpt.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                    }
                    drawOpt.yAxis[0].axisLabel = {
                        "textStyle": {
                        color: this.$medicine.nameColor,
                        }
                    }
                    drawOpt.yAxis[1].axisLabel = {
                        "textStyle": {
                        color: this.$medicine.nameColor,
                        }
                    }                    
                    drawOpt.series = drugData.map((i, index) => {
                        return {
                            type: "pictorialBar",
                            stack: "总量",
                            symbol: "fixed",
                            symbolSize: [28, 3],
                            symbolRepeat: "repeat",
                            barWidth: 40,
                            name: i.productName,
                            data: Object.values(
                                getKeyValue(i.dataList, deepClone(key))
                            ),
                            itemStyle: this.$medicine.drugprice.detail.Arrline[index]
                        };
                    });

                    drugData.forEach((i, index) =>
                        drawOpt.series.push({
                            name: i.productName + "增长率",
                            symbol: "circle",
                            yAxisIndex: 1,
                            type: "line",
                            data: Object.values(
                                getKeyValue(i.rateList, deepClone(key))
                            ),
                            itemStyle: this.$medicine.drugprice.detail.Arrgrowth[index]
                        })
                    );
                }
                this.drugSaleAmout = drawOpt;
            });
        },
        getDrugOrderAmout() {
            this.$http("/dcp/drug/purchase/amount ", this.params).then(res => {
                let drugData = res.data;
                let drawOpt = deepClone(overlapOption);
                // drawOpt.title.text = "近十二个月药品订单金额及增长率";
                drawOpt.title.text = "";
                let dateArr = getDateArr()
                let key = dateArr.reduce((acc, cur) => {
                    acc[cur.date] = 0;
                    return acc;
                }, {});
                drawOpt.tooltip.formatter = function (params) {
                    // console.log('params',params);
                    let str = "";
                    params.forEach((v, i) => {
                        // console.log('i',i);
                        if (i === 0) {
                            str += `${v.axisValue} <br />${v.marker} ${v.seriesName} ${v.value ? v.value.toFixed(2) : ''}`;
                        } else {
                            str += `<br />${v.marker} ${v.seriesName} ${v.value === '' ? '' : v.value + '%'}`;
                        }
                    });
                    return str;
                };
                drawOpt.tooltip.axisPointer = {
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
                drawOpt.tooltip.textStyle = {
                    fontFamily: "PingFangSC-Light"
                };
                drawOpt.xAxis[0].data = dateArr.map(i => i.date);
                drawOpt.series = drugData.map((i, index) => {
                    return {
                        type: "pictorialBar",
                        stack: "总量",
                        symbol: "fixed",
                        symbolSize: [28, 3],
                        symbolRepeat: "repeat",
                        barWidth: 40,
                        name: i.productName,
                        data: Object.values(
                            getKeyValue(i.dataList, deepClone(key))
                        ),
                        itemStyle: arrColor[index]
                    };
                });
                drugData.forEach((i, index) =>
                    drawOpt.series.push({
                        name: i.productName + "增长率",
                        symbol: "circle",
                        yAxisIndex: 1,
                        type: "line",
                        data: Object.values(
                            getKeyValue(i.rateList, deepClone(key))
                        ),
                        itemStyle: Arrline[index]
                    })
                );
                drawOpt.legend.data = drugData.map(i => i.productName);
                drugData.forEach(i =>
                    drawOpt.legend.data.push(i.productName + "增长率")
                );
                //  主题切换
                if (this.flag === 'light') {
                    drawOpt.legend.textStyle.color = this.$medicine.legendColor
                    drawOpt.title.textStyle.color = this.$medicine.title
                    drawOpt.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    drawOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                    drawOpt.tooltip.borderWidth = 0;
                    drawOpt.yAxis[0].axisLine = this.$medicine.axis
                    drawOpt.yAxis[1].axisLine = this.$medicine.axis
                    drawOpt.xAxis[0].axisLine = this.$medicine.axis
                    drawOpt.xAxis[0].axisLabel = {
                        color: this.$medicine.nameColor,
                    }
                    drawOpt.yAxis[0].axisLabel = {
                        "textStyle": {
                        color: this.$medicine.nameColor,
                        }
                    }
                    drawOpt.yAxis[1].axisLabel = {
                        "textStyle": {
                        color: this.$medicine.nameColor,
                        }
                    }                         
                    drawOpt.series = drugData.map((i, index) => {
                        return {
                            type: "pictorialBar",
                            stack: "总量",
                            symbol: "fixed",
                            symbolSize: [28, 3],
                            symbolRepeat: "repeat",
                            barWidth: 40,
                            name: i.productName,
                            data: Object.values(
                                getKeyValue(i.dataList, deepClone(key))
                            ),
                            itemStyle: this.$medicine.drugprice.detail.arrColor[index]
                        };
                    });
                    drugData.forEach((i, index) =>
                        drawOpt.series.push({
                            name: i.productName + "增长率",
                            symbol: "circle",
                            yAxisIndex: 1,
                            type: "line",
                            data: Object.values(
                                getKeyValue(i.rateList, deepClone(key))
                            ),
                            itemStyle: this.$medicine.drugprice.detail.arrColor[index]
                        })
                    );
                }
                this.drugOrderAmout = drawOpt;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .light{
        .echart-u{
            color: #999;
            font-family: PingFangSC-Regular;
        }
    }
    .echart-u {
        position: absolute;
        top: 110px;
        left: 28px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
    }
    .echartTitle{
        font-size: 18px;
        font-weight: 'normal';
        font-family: PingFangSC-Regular;
        position: absolute;
        margin-left: 26px;
        top: 48px;
    }
    .dark{
        .echartTitle{
            color: #fff;
        }
    }
    .light{
        .echartTitle{
            color: #333;
        }
    }
    .echart-big-wrap.echart-big-wrap-b{
        margin-top: -48px;
    }
</style>
