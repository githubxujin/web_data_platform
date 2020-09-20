<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">判决关联</div>
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
                            <el-table-column :formatter="formatLabel" prop="name" label="名称" show-overflow-tooltip width="250"></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="crn" label="统一社会信用代码" width="180" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="state" label="经营状态" show-overflow-tooltip></el-table-column>

                            <el-table-column :formatter="formatLabel" prop="registeredCapitalText" label="注册资本" show-overflow-tooltip width="160"></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="estDate" label="成立日期" show-overflow-tooltip width="120"></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.lawsuit - b.lawsuit}" prop="lawsuit" label="涉诉" show-overflow-tooltip width="120"></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.business - b.business}" prop="business" label="经营" show-overflow-tooltip width="120"></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.asset - b.asset}" prop="asset" label="资产/交易" show-overflow-tooltip width="120"></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.legalNumber - b.legalNumber}" prop="legalNumber" label="判决篇数" show-overflow-tooltip width="120">
                            </el-table-column>
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
        getList(data = {}) {
            let { evaluateId } = this.$route.query;
            if (!this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/legal', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/legal', { evaluateId, ...this.params, ...data })
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