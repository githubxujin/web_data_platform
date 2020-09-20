<template>
    <div>
        <c-box type="search">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label='客户名称'>
                    <el-select v-model='params.companyName' clearable @change="ChangeCompany" filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in companyList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='药品名称'>
                    <el-select v-model='params.productName' clearable filterable @change="changeProductName" style="width: 260px">
                        <el-option :label='item' :value='item' v-for="(item, index) in productNameList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='规格'>
                    <el-select v-model='params.productSpec' clearable filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in specList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="queryData">
                        查询</el-button>
                    <el-button type="info" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>
        <div class="echart-big-wrap">
            <div class="echart-big-title">药品价格波动情况</div>
            <chart height="511px" width="1168px" :option="drugPriceOption" id="drugPrice" />
        </div>
        <div class="el-center" v-if="isUpShow">
            <button class="btn-down" @click="showTable">
                <div class="btn-text">更多信息</div>
            </button>
        </div>
        <div v-show="show">
            <s-title>药品流通比</s-title>
            <div class="mt10">
                <el-table :data='list'>
                    <el-table-column type='index' label='序号' width='100' align="center"></el-table-column>
                    <el-table-column prop='date' label='日期' width='180' show-overflow-tooltip class="el-color" align="center">
                    </el-table-column>
                    <el-table-column prop='purchaseAmount' label='订单配送金额' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">{{ scope.row.purchaseAmount | numFormat}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='purchaseQuantity' label='订单配送量' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ scope.row.purchaseQuantity }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='saleQuantity' label='实际配送量' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ scope.row.saleQuantity  ? scope.row.saleQuantity : 0 }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='circulationRate' label='流通比' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ `${(scope.row.circulationRate*100).toFixed(0)}%` ? `${(scope.row.circulationRate*100).toFixed(0)}%`  : 0 }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='purchaseQuantityMom' label='订单配送量环比' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ `${(scope.row.purchaseQuantityMom*100).toFixed(0)}%` }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop='saleQuantityMom' label='实际配送量环比' width='200' show-overflow-tooltip class="el-color" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ `${(scope.row.saleQuantityMom*100).toFixed(0)}%` }}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class='page-nav'>
                    <el-pagination :page-sizes="[10,20,50,100]" :page-size="params.size" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
                        :total="total" v-if="total>0">
                    </el-pagination>
                </div>
            </div>
            <div class="el-center" v-if="isDownShow">
                <button class="btn-down" @click="hideTable">
                    <div class="btn-text">收起</div>
                </button>
            </div>

        </div>
    </div>
</template>
<script>
import cBox from "@/components/common/c-box";
import sTitle from "@/components/Title/s-title";
import Chart from "@/components/Charts/invoiceInvalid";
import { mapState } from "vuex";
import { deepClone } from "@/utils/common";
import trapezoidalOption from "@/utils/echart/trapezoidalOption";

export default {
    components: {
        cBox,
        sTitle,
        Chart
    },
    data () {
        return {
            isUpShow: true,
            show: false,
            isDownShow: false,
            params: {
                current: 1,
                size: 10,
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
    computed: mapState({
        companyList: state => state.drug.companyNameList
    }),
    created () {
        this.getDrugPriceOption();
        this.getCirculationList();
    },
    methods: {
        showTable () {
            this.isUpShow = false;
            this.isDownShow = true;
            this.show = true;
        },
        hideTable () {
            this.isUpShow = true;
            this.isDownShow = false;
            this.show = false;
        },
        queryData () {
            if (this.params.companyName && this.params.productName) {
                this.params.current = 1;
                this.getCirculationList();
                this.getDrugPriceOption();
            } else {
                this.$message.warning("客户名称与药品名称不能为空");
                return false;
            }
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getCirculationList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getCirculationList();
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                companyName: "吉林天华", // 公司名称
                productName: "银杏二萜内酯葡胺注射液", // 药品名称
                productSpec: "" // 规格
            };
            this.getDrugPriceOption();
            this.getCirculationList();
        },
        getCirculationList () {
            this.$http("/dcp/drug/circulation/page/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            );
        },
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
        getProductSpecList (companyName, productName) {
            this.$http(
                "/dcp/drug/product/spec/list",
                { companyName, productName },
                { type: "get" }
            ).then(res => {
                this.specList = res.data;
            });
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
        }
    }
};
</script>