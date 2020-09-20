<template>
    <div class="stat">
        <div class="table-wrap">
            <div class="table-title">分支结构</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.name" placeholder="输入名称查找" class="el-item-form-width"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current = 1, getList()">查询</el-button>
                    <el-button type="info" size="medium" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-table :data="list" @sort-change="sortChange">
                    <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="name" label="名称" show-overflow-tooltip width="250"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="crn" label="统一社会信用代码" show-overflow-tooltip width="200"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="province" label="省份" show-overflow-tooltip width="140"></el-table-column>
                    <el-table-column :formatter="formatLabel" sortable prop="lawsuit" label="涉诉" show-overflow-tooltip width="160"></el-table-column>
                    <el-table-column :formatter="formatLabel" sortable prop="business" label="经营" show-overflow-tooltip width="160"></el-table-column>
                    <el-table-column :formatter="formatLabel" sortable prop="asset" label="资产/交易" show-overflow-tooltip width="160"></el-table-column>
                </el-table>
                <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                    layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 10'>
                </el-pagination>
            </div>
        </div>
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
            list: []
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
            if (!this.isObjectEmpty(data)) {
                this.ajax
                    .json('/dcp/query/enterprise/relation/branch', { evaluateId, ...this.params })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            } else {
                this.ajax
                    .json('/dcp/query/enterprise/relation/branch', { evaluateId, ...this.params, ...data })
                    .then(res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    });
            }
        },
        //
        checkName(oldTenderName) {
            this.$http("/dcp/is/tender/name/exist", { oldTenderName }).then(
                res => {
                    this.isRepetition = res.data;
                }
            );
        },
        // 导出
        toExport() {
            this.$http("/dcp/export/tender/name", this.params, {
                type: "export"
            });
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


    }
};
</script>
<style lang="scss" scoped>
.stat {
    margin-right: -46px;
    margin: 0 auto;
}
/deep/ .el-button--danger.is-plain {
    color: #bb4d31;
    &:hover {
        color: #bb4d31;
        border-color: #bb4d31;
    }
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
/deep/ .el-dialog__body {
    padding-bottom: 8px;
}
/deep/ .el-dialog__footer {
    padding: 12px 20px;
    border-top: 1px solid #3d3f43;
}
/deep/ .to-del {
    .el-dialog__body {
        p {
            margin: 0;
        }
        padding-bottom: 30px;
    }
}
</style>
