<template>
    <div>
        <template>
            <div class="stat">
                <div class="table-wrap">
                    <div class="table-title">投资（多层级)</div>
                    <el-form :inline="true" ref="form" size="medium">
                        <el-form-item class="el-item-form-width">
                            <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                        </el-form-item>
                        <el-form-item class="el-item-form-width">
                            <el-select v-model="params.tag" placeholder="请选择标签" class="el-item-form-width">
                                <el-option v-for="item in tagList" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="params.current = 1; getList()">查询</el-button>
                            <el-button type="info" size="medium" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <div>
                        <el-table :data="list" @sort-change="sortChange">
                            <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="name" label="名称" width="350" show-overflow-tooltip :formatter="formatLabel">
                                <template slot-scope='scope'>
                                    {{scope.row.name }}
                                    <span v-for="(item,index) in scope.row.relateTag" :key="index" class="primary-label">{{ item}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.minD - b.minD}" prop="minD" label="投资层级" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column sortable :sort-method="(a,b)=>{return a.uratio - b.uratio}" prop="uratio" label="穿透持股比" width="120" show-overflow-tooltip>
                                <template slot-scope='scope'>
                                    {{scope.row.uratio ? (Number(scope.row.uratio*100).toFixed(2)+ '%') : '-' }}
                                </template>
                            </el-table-column>
                            <el-table-column :formatter="formatLabel" prop="estDate" label="成立日期" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.lawsuit - b.lawsuit}" prop="lawsuit" label="涉诉" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.business - b.business}" prop="business" label="经营" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" sortable :sort-method="(a,b)=>{return a.asset - b.asset}" prop="asset" label="资产/交易" width="120" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
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
                name: "",
                tag: ""
            },
            list: [],
            tagList: [],

        };
    },
    created() {
        this.getTag()
        this.getList()
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
        getTag() {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(`/dcp/query/enterprise/relation/tag/${evaluateId}/2`, {}, { type: 'get' })
                .then(res => {
                    this.tagList = res.data
                });
        },
        getList(data = {}) {
            let { evaluateId } = this.$route.query;
            if (!this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/investment', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/investment', { evaluateId, ...this.params, ...data })
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
                name: "",
                tag: ""
            };
            this.getList();
        },
    },

};
</script>

<style lang="scss" scoped>
.primary-label {
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #43a1ac;
    text-align: center;
    line-height: 14px;
    background: #242d30;
    padding: 2px 10px;
}
</style>