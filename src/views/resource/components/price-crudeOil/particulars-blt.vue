<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-date-picker v-model="value1" type="daterange" @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getList">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="observationDate" label="日期" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    {{formatDate(scope.row.observationDate) || '-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="price" label="价格" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="increase" label="增长(上一交易日)" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data () {
        return {
            value1: [],
            params: {
                current: 1,
                size: 10,
                source: 2,
                startObservationDate: '',
                endObservationDate: ''
            },
            total: 0,
            list: []
        }
    },
    created () {
        this.getList()
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startObservationDate = v[0]
                this.params.endObservationDate = v[1]
            } else {
                this.params.startObservationDate = ''
                this.params.endObservationDate = ''
            }
        },
        getList () {
            this.ajax
                .json('/dcp/comm/base/oil/price/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                source: 2,
                startObservationDate: '',
                endObservationDate: ''
            }
            this.value1 = []
            this.getList()
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/comm/base/oil/price/export", this.params, { type: "export" })
                .then(res => { });
        }
    },
}
</script>

<style>
</style>