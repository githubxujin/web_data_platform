<template>
    <!-- 企业经营指标组件 -->
    <div class="table-wrap">
        <!-- 融资信息，用了ElTableRow组件 -->
        <div class="tabs-title mb20 ml10">融资信息</div>
        <el-table-row :rows="getRows2()"></el-table-row>
        <!-- 企业信用信息 -->
        <div class="tabs-title mb20 mt20 ml10">企业信用信息</div>
        <el-table :data="companyCreditMessage" style="width: 100%">
            <el-table-column prop="nowLoans" label="当前贷款是否逾期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldLoans" label="过往贷款是否逾期欠息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtTime" label="逾期或欠息发生时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="逾期欠息信息展示" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="lawsuit" label="诉讼及负面" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
import ElTableRow from "@/components/Table/el-table-row";
export default {
    components: {
        ElTableRow
    },
    data() {
        return {
            // 企业信用信息数据
            companyCreditMessage: [{
                nowLoans: '否',
                oldLoans: '否',
                debtTime: '2002-10-01',
                debtMessage: '购房贷款',
                lawsuit: '无负面信息'
            }]
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
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
}
</style>