<template>
    <div class="table-wrap mt20">
        <div class="table-title">一致性评价库</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.drugName" clearable placeholder="药品名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.companyName" clearable placeholder="企业名称"></el-input>
            </el-form-item>
            <!-- <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" clearable placeholder="大类">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" clearable placeholder="申报类型">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" clearable placeholder="通过一致性评价">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.applyBeTest" clearable placeholder="BE实验状态">
                    <el-option label="进行中尚未招募" value="进行中尚未招募"></el-option>
                    <el-option label="进行中招募中" value="进行中招募中"></el-option>
                    <el-option label="进行中招募完成" value="进行中招募完成"></el-option>
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="主动暂停" value="主动暂停"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.consistencyEvaluation" clearable placeholder="一致性评价审评状态">
                    <el-option label="已受理" value="已受理"></el-option>
                    <el-option label="在审评" value="在审评"></el-option>
                    <el-option label="审批中" value="审批中"></el-option>
                    <el-option label="在审批" value="在审批"></el-option>
                    <el-option label="审批完毕" value="审批完毕"></el-option>
                    <el-option label="制证完毕" value="制证完毕"></el-option>
                    <el-option label="已发件" value="已发件"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.is289" clearable placeholder="是否289品种">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="drugName" label="药品名称" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="companyName" label="企业名称" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="approvalNum" label="批文数" show-overflow-tooltip align="left" :formatter="formatLabel">
                <template slot-scope="scope">
                    {{numFormat(scope.row.approvalNum) || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="is289" label="289 品种" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <!-- <el-table-column prop="" label="大类" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column> -->
            <el-table-column prop="referencePreparationRecord" label="参比制剂备案" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="applyBeTest" label="申报BE试验" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="consistencyEvaluation" label="一致性评价审评(开始时间）" width="200" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="listedDrugDirlist" label="上市药物目录集（批准日期）" width="220" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            list: [],
        }
    },
    created() {
        this.searchRecord()
    },
    methods: {
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.getList();
        },
        getList() {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/dcp/drug/consistency/evaluation/page/list', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                })
        },
        reSet() {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
        },
        exportData() {
            this.ajax
                .json("/dcp/drug/consistency/evaluation/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
    },
}
</script>

<style>
</style>