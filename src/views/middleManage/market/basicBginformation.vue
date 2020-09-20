<template>
    <!-- 企业相关产业背景信息 -->
    <div class="table-wrap">
        <!-- 仓库信息 -->
        <div class="tabs-title mb20 mt20 ml10">仓库信息</div>
        <el-table :data="drugPermission" style="width: 100%">
            <el-table-column prop="personBasic" label="自有/租赁仓库" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personCard" label="仓库面积" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personMarriage" label="租赁合同时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personChild" label="年租金" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData1" label="仓库成本" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="getJobData" label="仓库容量" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData2" label="已使用容量" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="getJobData1" label="仓库自动化程度" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData3" label="自有/第三方物流" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 主要终端类型 -->
        <div class="tabs-title mb20 mt20 ml10">主要终端类型</div>
        <el-table :data="gspList" style="width: 100%">
            <el-table-column prop="nowLoans" label="二级及以上公立医院" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldLoans" label="基层医疗机构" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtTime" label="民营医院" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage" label="商业公司" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sixLoans" label="药店" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage1" label="其他" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 行业信息 -->
        <div class="tabs-title mb20 mt20 ml10">行业信息</div>
        <el-table :data="downsideMessage" style="width: 100%">
            <el-table-column prop label="序号" width="70" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="nowLoans1" label="业内人员姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="oldLoans2" label="业内人员职位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtTime3" label="行业评价" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sixLoans4" label="行业资源" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage5" min-width="150" label="近一年自营品规占比/代打款品规占比" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="debtMessage6" label="医保目录品种占比" align="center" show-overflow-tooltip></el-table-column>
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
            // 仓库信息
            drugPermission: [{
                personBasic: '',
                personCard: '',
                personMarriage: '',
                personChild: '',
                enterData1: '',
                getJobData: '',
                enterData2: '',
                getJobData1: '',
                enterData3: '',
            }],
            // 主要终端类型
            gspList: [{
                nowLoans: '',
                oldLoans: '',
                debtTime: '',
                debtMessage: '',
                sixLoans: '',
                debtMessage1: '',
            }],
            // 行业信息
            downsideMessage: [{
                nowLoans1: '',
                oldLoans2: '',
                debtTime3: '',
                sixLoans4: '',
                debtMessage5: '',
                debtMessage6: '',
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