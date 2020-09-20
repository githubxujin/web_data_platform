<template>
    <div>
        <el-form :inline="true" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.finance" clearable placeholder="金融机构" class=" el-item-form-width" filterable remote :remote-method="queryFinance">
                    <el-option v-for="(s, index) in financeList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.financeType" clearable placeholder="金融机构类型" class=" el-item-form-width">
                    <el-option v-for="(s, index) in assigneeTypeList" :label="s.label" :value="s.value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.secondaryUnit" clearable placeholder="受让人二级单位" class=" el-item-form-width" filterable remote :remote-method="querySecondaryUnit">
                    <el-option v-for="(s, index) in secondaryUnitList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.primaryUnit" clearable placeholder="受让人一级单位" class=" el-item-form-width" filterable remote :remote-method="queryPrimaryUnit">
                    <el-option v-for="(s, index) in primaryUnitList" :label="s" :value="s" :key="index">
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
            <el-table-column prop="finance" label="金融机构名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="secondaryUnit" label="金融机构二级单位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="primaryUnit" label="金融机构一级单位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="financeType" label="金融机构类型" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ assigneeTypeLabel(scope.row.financeType)}}
                </template>
            </el-table-column>
            <el-table-column prop="transferCount" label="转让次数" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="transferAmount" label="转让金额" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="financesAmount" label="融资金额" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="projectNum" label="登记项目数" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
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
                current: 1,
                size: 10,
            },
            total: 0,
            list: [],
            dateArr: [],
            queryParams: {
                finance: "",
                primaryUnit: "",
                secondaryUnit: "",
                field: ""
            },
            financeList: [],
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
        queryFinance (query) {
            this.queryParams.finance = query
            this.queryParams.field = 1
            this.remoteMethod()
        },
        queryPrimaryUnit (query) {
            this.queryParams.primaryUnit = query
            this.queryParams.field = 3
            this.remoteMethod()
        },
        querySecondaryUnit (query) {
            this.queryParams.secondaryUnit = query
            this.queryParams.field = 2
            this.remoteMethod()
        },
        remoteMethod () {
            this.ajax
                .json('/dcp/comm/zdw/finance/stats/vague', this.queryParams)
                .then(res => {
                    let { field } = this.queryParams
                    if (field === 1) {
                        this.financeList = res.data
                    } else if (field === 2) {
                        this.secondaryUnitList = res.data
                    } else if (field === 3) {
                        this.primaryUnitList = res.data
                    }
                });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.statsMonthStart = v[0];
                this.params.statsMonthEnd = v[1];
            } else {
                this.params.statsMonthStart = '';
                this.params.statsMonthEnd = '';
            }
        },
        getList () {
            this.ajax
                .json('/dcp/comm/zdw/finance/stats/page', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
            }
            this.total = 0;
            this.dateArr = [];
            this.getList()
        },
        async exportData () {
            await this.ajax
                .json('/dcp/comm/zdw/finance/stats/export', this.params, { type: 'export' })
        },
    }
};
</script>