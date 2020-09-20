<template>
    <!-- 企业经营指标组件 -->
    <div class="table-wrap">
        <!-- 融资信息，用了ElTableRow组件 -->
        <div class="tabs-title mb20 ml10">融资信息</div>
        <el-table-row :rows="getRows2()"></el-table-row>

        <!-- 公开融资情况 -->
        <div class="tabs-title mb20 mt20 ml10">实控人基本信息</div>
        <el-table :data="basicMessage" style="width: 100%">
            <el-table-column prop="personBasic" label="ABS/ABN" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personCard" label="债券融资" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personMarriage" label="其他贷款" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personChild" label="对子公司担保及借款" align="center" show-overflow-tooltip></el-table-column>
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
                { key: "企业电话", value: "-", alone: true },
                { key: "企业邮箱", value: "-", alone: true },
                { key: "企业地址", value: "-", alone: true },
                { key: "股票代码", value: "-", alone: true },
            ];
        }
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