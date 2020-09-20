<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item style="width: 193px">
                <el-select v-model="params.marketSampleName" clearable placeholder="市场">
                    <el-option v-for="(s, index) in marketplace" :label="s.label" :value="s.label" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 193px">
                <el-select v-model="params.model" clearable placeholder="规格型号">
                    <el-option label="92#国Ⅵ" value="92#国Ⅵ"></el-option>
                </el-select>
            </el-form-item>
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
            <el-table-column :formatter="formatLabel" prop="publishDate" label="日期" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="marketSampleName" label="市场" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="model" label="规格型号" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="price" label="价格" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="changeRate" label="增长(上一交易日)" show-overflow-tooltip></el-table-column>
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
            list: [],
            params: {
                current: 1,
                size: 10,
                productName: '柴油',
                startPublishDate: '',
                endPublishDate: ''
            },
            total: 0,
            marketplace: [
                { label: '华北' },
                { label: '华东' },
                { label: '华南' },
                { label: '华中' },
                { label: '山东' },
                { label: '西北' },
                { label: '西南' },
            ]
        }
    },
    created () {
        this.getList()
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startPublishDate = v[0]
                this.params.endPublishDate = v[1]
            } else {
                this.params.startPublishDate = ''
                this.params.endPublishDate = ''
            }
        },
        getList () {
            this.ajax
                .json('/dcp/comm/oil/price/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                productName: '柴油',
                startPublishDate: '',
                endPublishDate: ''
            }
            this.value1 = []
            this.getList()
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/comm/oil/price/export", this.params, { type: "export" })
                .then(res => { });
        },
    },
}
</script>

<style>
</style>