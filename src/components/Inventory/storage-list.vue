<template>
    <div class="table-wrap mt10">
        <el-form :inline="true" ref="form" size="medium">
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
                <el-button type="primary" size="medium" @click="params.page=1,getList()">查询</el-button>
                <el-button type="info" @click="params.page=1,getList()">更新</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap">
            <chart height="511px" width="1168px" :option="drugPriceOption" id="drugPrice" />
        </div>
        <el-table :data="list">
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="date" label="公司名称" width="180"></el-table-column>
            <el-table-column prop="name" label="分子公司" width="180"></el-table-column>
            <el-table-column prop="address" label="客户名称" width="300"></el-table-column>
            <el-table-column prop="address" label="药品名称"></el-table-column>
            <el-table-column prop="address" label="规格"></el-table-column>
            <el-table-column prop="address" label="单位"></el-table-column>
            <el-table-column prop="address" label="批号"></el-table-column>
            <el-table-column prop="address" label="有效期" width="300"></el-table-column>
            <el-table-column prop="address" label="数量"></el-table-column>
            <el-table-column prop="address" label="单价"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>

    </div>
</template>
<script>
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import trapezoidalOption from "@/utils/echart/trapezoidalOption";
import { mapState } from "vuex";
export default {
    components: {
        Chart
    },
    data () {
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
            drugPriceOption: {},
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        };
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList
    }),
    created () {
        this.getDrugPriceOption();
        this.getCirculationList();
    },
    methods: {
        ChangeCompany (val) {
            this.params.productName = "";
            if (val) {
                this.getProductList(val);
            } else {
                this.productNameList = [];
            }
        },
        changeProductName (val) {
            this.params.productSpec = "";
            if (val) {
                this.getProductSpecList(this.params.companyName, val);
            } else {
                this.specList = [];
            }
        },
        getCirculationList () {
            this.$http("/dcp/drug/circulation/page/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            );
        },
        //绘图
        getDrugPriceOption () {
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
                    drawDrug.xAxis.data = drugDate.map(i => i.date);
                    drawDrug.series[1].data = drugData.salePrice.map(
                        i => i.medianPrice
                    );
                    drawDrug.series[0].data = drugData.purchasePrice.map(
                        i => i.medianPrice
                    );
                    this.drugPriceOption = drawDrug;
                } else {
                    drawDrug.legend.data = [];
                    drawDrug.yAxis.show = false;
                    drawDrug.yAxis.show = false;
                    this.drugPriceOption = drawDrug;
                }
            });
        },
        getProductList (companyName) {
            this.$http(
                "/dcp/drug/product/list",
                { companyName },
                { type: "get" }
            ).then(res => {
                this.productNameList = res.data;
            });
        },
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>


