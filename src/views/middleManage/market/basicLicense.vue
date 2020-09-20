<template>
    <!-- 企业证照&资质 -->
    <div class="table-wrap">
        <!-- 药品经营许可 -->
        <div class="tabs-title mb20 mt20 ml10">药品经营许可</div>
        <el-table :data="drugPermission" style="width: 100%">
            <el-table-column prop="personBasic" label="许可证编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personCard" label="企业负责人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personMarriage" label="质量负责人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personChild" label="经营方式" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData" label="经营范围" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="getJobData" label="发证日期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData" label="证书有效期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="getJobData" label="发证机构" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData" label="许可证状态" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- GSP -->
        <div class="tabs-title mb20 mt20 ml10">GSP</div>
        <el-table :data="gspList" style="width: 100%">
            <el-table-column prop="nowLoans" label="省市" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldLoans" label="证书编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtTime" label="经营地址" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="认证范围" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sixLoans" label="发证日期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="证书有效期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sixLoans" label="发证机构" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="备注" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 器械经营许可 -->
        <div class="tabs-title mb20 mt20 ml10">器械经营许可</div>
        <el-table-row :rows="getRows3()"></el-table-row>
        <!-- 器械经营备案 -->
        <div class="tabs-title mb20 mt20 ml10">器械经营备案</div>
        <el-table-row :rows="getRows4()"></el-table-row>
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
            // 实控人基本信息
            drugPermission: [],
            // 实控人征信信息
            gspList: [],
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
        getRows3() {
            return [
                { key: "许可证编号", value: "-" },
                { key: "企业负责人", value: "-" },
                { key: "住所", value: "-" },
                { key: "经营场所", value: "-" },
                { key: "发证日期", value: "-" },
                { key: "发证部门", value: "-" },
                { key: "有效期限", value: "-" },
                { key: "经营方式", value: "-" },
                { key: "库房地址", value: "-", alone: true },
                { key: "经营范围", value: "-", alone: true },
            ];
        },
        getRows4() {
            return [
                { key: "编号", value: "-" },
                { key: "企业负责人", value: "-" },
                { key: "住所", value: "-" },
                { key: "经营场所", value: "-" },
                { key: "备案部门", value: "-" },
                { key: "备案日期", value: "-" },
                { key: "库房地址", value: "-" },
                { key: "经营方式", value: "-" },
                { key: "经营范围", value: "-", alone: true },
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