<template>
    <!-- 企业经营指标组件 -->
    <div class="table-wrap">
        <!-- 融资信息，用了ElTableRow组件 -->
        <qg-table subtitle="融资信息">
            <qg-table-column v-for="(item,index) in getRows2()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
        <!-- 企业信用信息 -->
        <div class="tabs-title mb20 mt20">企业信用信息</div>
        <el-table :data="list.drugCompanyCreditList" border>
            <el-table-column prop="nowIsOverdue" label="当前贷款是否逾期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldIsOverdueArrears" label="过往贷款是否逾期欠息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="overdueArrearsDate" label="逾期或欠息发生时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="overdueArrearsInfo" label="逾期欠息信息展示" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="badInfo" label="诉讼及负面" align="center" show-overflow-tooltip></el-table-column>
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
        getRows2 () {
            let drug = this.list.drugCompanyFinance
            console.log(drug, 'drug11');

            return [
                { key: "融资渠道", value: drug && drug.channel || '-', alone: true },
                { key: "担保方式", value: drug && drug.vouchType || '-', alone: true },
                { key: "展期次数", value: drug && drug.rolloverNum || '-', alone: true },
                { key: "展期金额", value: drug && drug.rolloverAmount || '-', alone: true },
                { key: "逾期次数", value: drug && drug.overdueNum || '-', alone: true },
                { key: "逾期金额", value: drug && drug.overdueAmount || '-', alone: true }
            ];
        },
        getList (companyId) {
            this.ajax
                .json('/dcp/query/drug/company/business/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                });
        }
    }
};
</script>
