<template>
    <div>
        <c-box type="search">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label='客户名称'>
                    <el-select v-model='params.companyName' clearable @change="changeCompany" filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in companyList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='药品名称'>
                    <el-select v-model='params.productName' clearable multiple :multiple-limit="max"
                        @change="changeProductName" collapse-tags style="margin-left: 20px;width: 260px" filterable
                        remote :remote-method="remoteProductName" :loading="loading">
                        <el-option :label='item' :value='item' v-for="(item, index) in productNameList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='规格'>
                    <el-select v-model='params.productSpec' clearable filterable remote
                        :remote-method="remoteProductSpec" :loading="loading">
                        <el-option :label='item' :value='item' v-for="(item, index) in productSpecList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="drawEchart">查询</el-button>
                    <el-button type="blue" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>
        <div class="echart-big-wrap">
            <div class="echart-big-title">药品订单金额及增长率</div>
            <chart height="511px" width="1168px" :option="drugOrderAmout" id="drugOrderAmout" />
        </div>
        <div class="echart-big-wrap">
            <div class="echart-big-title">药品销售总金额及增长率</div>
            <chart height="511px" width="1168px" :option="drugSaleAmout" id="drugSaleAmout" />
        </div>
    </div>
</template>
<script>
const arrColor = [
    {
        borderColor: "#4088FD",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(37,87,255,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(117,143,255,0.00)"
            }
        ])
    },
    {
        borderColor: "#FFF78A",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(255,188,37,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(255,223,117,0.01)"
            }
        ])
    },

    {
        borderColor: "#33F0C0",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(37,255,221,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(122,244,174,0.02)"
            }
        ])
    }
];
const Arrline = [
    {
        normal: {
            color: "#4088FD",
            lineStyle: {
                type: "dotted"
            }
        }
    },
    {
        normal: {
            color: "#FFF78A",
            lineStyle: {
                type: "dotted"
            }
        }
    },
    {
        normal: {
            color: "#33F0C0",
            lineStyle: {
                type: "dotted"
            }
        }
    }
];
import cBox from "@/components/common/c-box";
import Chart from "@/components/Charts/invoiceInvalid";
import { mapState } from "vuex";
import { deepClone, getKeyValue } from "@/utils/common";
import overlapOption from "@/utils/echart/overlapOption";
import echarts from "echarts";
export default {
    components: {
        cBox,
        Chart
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList
    }),
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

                let maxData = [];
                let index = 0;
                let max = drugData[0].dataList.length;
                for (let i = 0; i < drugData.length; i++) {
                    if (drugData[i].dataList.length > max) {
                        max = drugData[i].dataList.length;
                        index = i;
                    }
                    maxData = drugData[index].dataList;
                }
                let key = maxData.reduce((acc, cur) => {
                    acc[cur.date] = 0;
                    return acc;
                }, {});

                drawOpt.xAxis[0].data = maxData.map(i => i.date);
                drawOpt.series = drugData.map((i, index) => {
                    return {
                        type: "bar",
                        stack: "总量",
                        barWidth: 42,
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
                this.drugSaleAmout = drawOpt;
            });
        },
        getDrugOrderAmout() {
            this.$http("/dcp/drug/purchase/amount ", this.params).then(res => {
                let drugData = res.data;
                let drawOpt = deepClone(overlapOption);

                let maxData = [];
                let index = 0;
                let max = drugData[0].dataList.length;
                for (let i = 0; i < drugData.length; i++) {
                    if (drugData[i].dataList.length > max) {
                        max = drugData[i].dataList.length;
                        index = i;
                    }
                    maxData = drugData[index].dataList;
                }
                let key = maxData.reduce((acc, cur) => {
                    acc[cur.date] = 0;
                    return acc;
                }, {});
                drawOpt.xAxis[0].data = maxData.map(i => i.date);
                drawOpt.series = drugData.map((i, index) => {
                    return {
                        type: "bar",
                        stack: "总量",
                        barWidth: 42,
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
                this.drugOrderAmout = drawOpt;
            });
        }
    }
};
</script>