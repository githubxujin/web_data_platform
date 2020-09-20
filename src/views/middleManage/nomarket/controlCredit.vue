<template>
    <!-- 实际控制人信用状况 -->
    <div class="table-wrap">
        <!-- 实控人基本信息 -->
        <div class="tabs-title mb20">实控人基本信息</div>
        <el-table :data="list.drugCompanyControlList" border>
            <el-table-column prop="name" label="实控人名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="idCard" label="身份证号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="marital" label="婚姻状况" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="child" label="子女情况" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startYear" label="进入行业年份" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="workYear" label="从业年份" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 实控人征信信息 -->
        <div class="tabs-title mb20 mt20 ">实控人征信信息</div>
        <el-table :data="list.drugCompanyControlCreditList" border>
            <el-table-column prop="name" label="实控人名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="nowIsOverdue" label="当前贷款是否逾期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldIsOverdueArrears" label="过往贷款是否逾期欠息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="overdueArrearsDate" label="逾期或欠息发生时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="overdueArrearsInfo" label="逾期欠息信息展示" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="recentLoanNum" label="近6个月贷款审批查询次数" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 实控人负面信息 -->
        <div class="tabs-title mb20 mt20 ">实控人负面信息</div>
        <el-table :data="list.drugCompanyControlBadList" border>
            <el-table-column prop="name" label="实控人名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="privateLoan" label="民间借贷" show-overflow-tooltip></el-table-column>
            <el-table-column prop="badHabits" label="不良嗜好" show-overflow-tooltip></el-table-column>
            <el-table-column prop="negative" label="重大负面" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="executedPerson" label="被执行人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dishonestyPerson" label="失信被执行人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="antiFraud" label="反欺诈" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="litigationInfo" label="被行人等诉讼信息" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
// import ElTableRow from "@/components/Table/el-table-row";
export default {
    components: {
        // ElTableRow
    },
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
            return [
                { key: "融资渠道", value: "-", alone: true },
                { key: "担保方式", value: "-", alone: true },
                { key: "工商状态", value: "-", alone: true },
                { key: "展期次数", value: "-", alone: true },
                { key: "展期金额", value: "-", alone: true },
                { key: "逾期次数", value: "-", alone: true },
                { key: "逾期金额", value: "-", alone: true }
            ];
        },
        getList (companyId) {
            this.ajax
                .json('/dcp/query/drug/company/control/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                });
        }
    }
};
</script>
