<template>
    <div>
        <el-form :inline="true" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.supplier" clearable placeholder="供应商名称" class=" el-item-form-width" filterable remote :remote-method="querySupplier">
                    <el-option v-for="(s, index) in supplierList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.assigneeType" clearable placeholder="受让人类型" class=" el-item-form-width">
                    <el-option v-for="(s, index) in assigneeTypeList" :label="s.label" :value="s.value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.assignee" clearable placeholder="受让人" class=" el-item-form-width" filterable remote :remote-method="queryAssignee">
                    <el-option v-for="(s, index) in assigneeList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.primaryUnit" clearable placeholder="受让人一级单位" class=" el-item-form-width" filterable remote :remote-method="queryPrimaryUnit">
                    <el-option v-for="(s, index) in primaryUnitList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.secondaryUnit" clearable placeholder="受让人二级单位" class=" el-item-form-width" filterable remote :remote-method="querySecondaryUnit">
                    <el-option v-for="(s, index) in secondaryUnitList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker start-placeholder="年-月" end-placeholder="年-月" v-model="dateArr" type="monthrange" unlink-panels @change="changeDate" value-format="yyyy-MM" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>

        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="statsMonth" label="月份" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="supplier" label="供应商名称" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="transferCount" label="转让次数" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="transferAmount" label="转让金额" show-overflow-tooltip :formatter="formatLabel" width="120"></el-table-column>
            <el-table-column prop="financesAmount" label="融资金额" show-overflow-tooltip :formatter="formatLabel" width="120"></el-table-column>
            <el-table-column prop="projectNum" label="登记项目数" show-overflow-tooltip :formatter="formatLabel" width="100"></el-table-column>
            <el-table-column prop="assignee" label="受让人" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="assigneeType" label="受让人类型" show-overflow-tooltip :formatter="formatLabel" width="100">
                <template slot-scope='scope'>
                    {{ assigneeTypeLabel(scope.row.assigneeType)}}
                </template>
            </el-table-column>
            <el-table-column prop="cooperationDuration" label="合作时长" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="secondaryUnit" label="二级单位" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="secondDuration" label="合作时长" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="primaryUnit" label="一级单位" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="primaryDuration" label="合作时长" show-overflow-tooltip :formatter="formatLabel"></el-table-column>

        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
    </div>
</template>
<script>
import { assigneeTypeLabel, assigneeTypeList } from "@/utils/common"
export default {
    components: {},
    data () {
        return {
            assigneeTypeList,
            params: {
                "assignee": "",
                "assigneeType": "",
                "primaryUnit": "",
                "secondaryUnit": "",
                "statsMonthEnd": "",
                "statsMonthStart": "",
                "supplier": "",
                current: 1,
                size: 10,
            },
            queryParams: {
                "assignee": "",
                "field": "",
                "primaryUnit": "",
                "secondaryUnit": "",
                "supplier": ""
            },
            total: 0,
            list: [],
            dateArr: [],
            supplierList: [],
            assigneeList: [],
            primaryUnitList: [],
            secondaryUnitList: []

        };
    },
    created () {
        this.getList()
    },
    methods: {

        assigneeTypeLabel,
        querySupplier (query) {
            this.queryParams.supplier = query
            this.queryParams.field = 1
            this.remoteMethod()
        },
        queryAssignee (query) {
            this.queryParams.assignee = query
            this.queryParams.field = 2
            this.remoteMethod()
        },
        queryPrimaryUnit (query) {
            this.queryParams.primaryUnit = query
            this.queryParams.field = 3
            this.remoteMethod()
        },
        querySecondaryUnit (query) {
            this.queryParams.secondaryUnit = query
            this.queryParams.field = 4
            this.remoteMethod()
        },
        remoteMethod () {
            this.ajax
                .json('/dcp/comm/zdw/supplier/stats/vague', this.queryParams)
                .then(res => {
                    let { field } = this.queryParams
                    if (field === 1) {
                        this.supplierList = res.data
                    } else if (field === 2) {
                        this.assigneeList = res.data
                    } else if (field === 3) {
                        this.secondaryUnitList = res.data
                    } else if (field === 4) {
                        this.primaryUnitList = res.data
                    }
                });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.statsMonthStart = v[0];
                this.params.statsMonthEnd = v[1];
            } else {
                this.params.statsMonthEnd = '';
                this.params.statsMonthStart = '';
            }
        },
        getList () {
            this.ajax
                .json('/dcp/comm/zdw/supplier/stats/page', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                "assignee": "",
                "assigneeType": "",
                "primaryUnit": "",
                "secondaryUnit": "",
                "statsMonthEnd": "",
                "statsMonthStart": "",
                "supplier": "",
                current: 1,
                size: 10,
            }
            this.dateArr = []
            this.getList()
        },
        async exportData () {
            await this.ajax
                .json('/dcp/comm/zdw/supplier/stats/export', this.params, { type: 'export' })
        }
    }
};
</script>