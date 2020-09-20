<template>
    <!-- 企业相关产业背景信息 -->
    <div class="table-wrap">
        <!-- 仓库信息 -->
        <div class="tabs-title mb20">仓库信息</div>
        <el-table :data="list.drugCompanyStockList" border>
            <el-table-column prop="stcokName" label="自有/租赁仓库" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockArea" label="仓库面积" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractDate" label="租赁合同时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="rentYear" label="年租金" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockCost" label="仓库成本" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="stockCapacity" label="仓库容量" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="usedCapacity" label="已使用容量" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="automaticLevel" label="仓库自动化程度" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="logistics" label="自有/第三方物流" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 主要终端类型 -->
        <div class="tabs-title mb20 mt20 ">主要终端类型</div>
        <el-table :data="list.drugCompanyTerminalList" border>
            <el-table-column prop="publicHospital" label="二级及以上公立医院" show-overflow-tooltip></el-table-column>
            <el-table-column prop="medicalInstitutions" label="基层医疗机构" show-overflow-tooltip></el-table-column>
            <el-table-column prop="privateHospital" label="民营医院" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessCompany" label="商业公司" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="drugstore" label="药店" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="other" label="其他" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 行业信息 -->
        <div class="tabs-title mb20 mt20 ">行业信息</div>
        <el-table :data="list.drugCompanyIndustryList" border>
            <el-table-column prop label="序号" width="70" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="industryName" label="业内人员姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryPosition" label="业内人员职位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryEvaluation" label="行业评价" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryResources" label="行业资源" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="selfGoodsProportion" min-width="150" label="近一年自营品规占比/代打款品规占比" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="medicareProportion" label="医保目录品种占比" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: {}
        };
    },
    created () {
        this.getList(this.$route.query.companyId)
    },
    methods: {
        getList (companyId) {
            this.ajax
                .json('/dcp/query/drug/company/industry/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                });
        }
    }
};
</script>
