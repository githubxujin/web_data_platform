<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">业务竞争</div>
                    <el-form :inline="true" ref="form" size="medium">
                        <el-form-item class="el-item-form-width">
                            <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="params.current = 1; getList()">查询</el-button>
                            <el-button type="info" size="medium" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-table :data="list" @sort-change="sortChange">
                            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="名称" width="250" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="crn" label="统一社会信用代码" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="state" label="经营状态" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="registeredCapitalText" label="注册资本" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="estDate" label="成立日期" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column prop="length" label="相关公告数" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="lawsuit" label="涉诉" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="business" label="经营" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            <el-table-column sortable prop="asset" label="资产/交易" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        </template>

    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            params: {
                current: 1,
                size: 10,
                name: ""
            },
            list: [],

        };
    },
    created() {
        this.getList();
    },
    methods: {
        sortChange(column) {
            let data = {
                sortField: column.prop,
                sortDescOrAsc: this.sortString(column.order)
            }
            this.params = {
                ...this.params,
                ...data
            }
            this.getList(data)
        },
        sortString(val) {
            if (val === "descending") {
                return "desc"
            } else if (val === "ascending") {
                return "asc"
            }
        },
        getList(data = {}) {
            let { evaluateId } = this.$route.query;
            if (this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/purchase', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/purchase', { evaluateId, ...this.params, ...data })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            }

        },
        // 重置
        reSet() {
            this.params = {
                current: 1,
                size: 10,
                name: ""
            };
            this.getList();
        },
    },


};
</script>

<style>
</style>