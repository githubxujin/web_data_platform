<template>
    <!-- 实际控制人信用状况 -->
    <div class="table-wrap">
        <!-- 实控人基本信息 -->
        <div class="tabs-title mb20 mt20 ml10">实控人基本信息</div>
        <el-table :data="basicMessage" style="width: 100%">
            <el-table-column prop="personBasic" label="实控人名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personCard" label="身份证号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personMarriage" label="婚姻状况" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personChild" label="子女情况" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData" label="进入行业年份" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="getJobData" label="从业年份" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 实控人征信信息 -->
        <div class="tabs-title mb20 mt20 ml10">实控人征信信息</div>
        <el-table :data="creditMessage" style="width: 100%">
            <el-table-column prop="nowLoans" label="当前贷款是否逾期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldLoans" label="过往贷款是否逾期欠息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtTime" label="逾期或欠息发生时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="逾期欠息信息展示" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sixLoans" label="近6个月贷款审批查询次数" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 实控人负面信息 -->
        <div class="tabs-title mb20 mt20 ml10">实控人负面信息</div>
        <el-table :data="downsideMessage" style="width: 100%">
            <el-table-column prop="privateLending" label="民间借贷" show-overflow-tooltip></el-table-column>
            <el-table-column prop="badLike" label="不良嗜好" show-overflow-tooltip></el-table-column>
            <el-table-column prop="impDownside" label="重大负面" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="passPerson" label="被执行人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="breakPassPerson" label="失信被执行人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="antiFraud" label="反欺诈" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lawsuitMessage" label="被行人等诉讼信息" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
// import ElTableRow from "@/components/Table/el-table-row";
export default {
    components: {
        // ElTableRow
    },
    data() {
        return {
            // 实控人基本信息
            basicMessage: [{
                personBasic: '小明',
                personCard: '412222222222222222',
                personMarriage: '未婚',
                personChild: '无子女',
                enterData: '2018-10-01',
                getJobData: '2019-10-01'
            }],
            // 实控人征信信息
            creditMessage: [{
                nowLoans: '否',
                oldLoans: '否',
                debtTime: '2002-10-01',
                debtMessage: '购房贷款',
                sixLoans: '2次'
            }],
            // 实控人负面信息
            downsideMessage: []
        };
    },
    methods: {
        getRows2() {
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
    }
};
</script>
<style lang="scss" scoped>
    .tabs-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #a0a3a8;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
</style>