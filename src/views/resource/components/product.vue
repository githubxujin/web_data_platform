<template>
    <div>
        <div class="tabs-title mb20 pt20">合作上游</div>
        <el-table :data="upstreamList" border>
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="totalCompany" label="合作上游-本年采购发生额前5名公司" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.totalCompany ?  scope.row.totalCompany : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="totalAmount" label="合作上游-本年采购发生额前5名总数" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.totalAmount ?  scope.row.totalAmount : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="balanceCompany" label="合作上游-本年采购余额前5名公司" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.balanceCompany ?  scope.row.balanceCompany : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop="balanceAmount" label="合作上游-本年采购余额前5名余额总数" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.balanceAmount ?  scope.row.balanceAmount : '-' }}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">合作下游</div>
        <el-table :data="downstreamList" border>
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="totalCompany" label="合作下游-本年销售发生额前5名公司" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.totalCompany ?  scope.row.totalCompany : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="totalAmount" label="合作下游-本年销售发生额前5名销售额总数" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.totalAmount ?  scope.row.totalAmount : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="balanceCompany" label="合作下游-本年销售余额前5名公司" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.balanceCompany ?  scope.row.balanceCompany : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="balanceAmount" label="合作下游-本年销售余额前5名余额总数" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.balanceAmount  ?  scope.row.balanceAmount : '-' }}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">租赁仓库列表</div>
        <el-table :data="stockList" border class="mt20">
            <el-table-column prop="ownStock" label="自有仓库列表" show-overflow-tooltip></el-table-column>
            <el-table-column prop="leaseStock" label="租赁仓库列表" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">监管账户情况</div>
        <el-table :data="downstreamList" border>
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="downstreamCompanyName" label="账户类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationProjectNum" label="账户名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationYear" label="开户行" show-overflow-tooltip></el-table-column>
            <el-table-column prop="item" label="账号"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: {
        id: String
    },
    data () {
        return {
            total: 0,
            dialogVisible: false,
            stockList: [],
            upstreamList: [],
            downstreamList: [],
            biddingData: {
                id: '', // 主键id
                companyName: "", // 企业名称
                bidCount: '', // 中标次数
                bidAmount: '', // 	中标金额
                twoYearBidCount: '', // 两年内中标次数
                twoYearBidAmount: '', // 两年内中标金额
                bidTopArea: "", // 中标项目属地前5
            },
            params: {
                current: 1,
                size: 10,
                companyName: ''
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created () {
        this.getUpstream(this.id)
        this.getDownstream(this.id)
        this.getStock(this.id)
    },
    methods: {
        // 获取合作上游列表
        getUpstream (id) {
            this.$http('/dcp/energy/cooperation/upstream/list', { id }, { type: 'get' }).then(res => {
                this.upstreamList = res.data
            })
        },
        // // 获取合作下游列表
        getDownstream (id) {
            this.$http('/dcp/energy/cooperation/downstream/list', { id }, { type: 'get' }).then(res => {
                this.downstreamList = res.data
            })
        },
        // 获取仓库
        getStock (id) {
            this.$http('/dcp/energy/stock/info', { id }, { type: 'get' }).then(res => {
                this.stockList = res.data
            })
        },

        handleSizeChange (v) {
            this.params.size = v
            this.getBiddingList()
        }
    }
}
</script>
<style lang="scss" scoped>
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(odd) {
            background: #292b2f;
        }
        &:last-child {
            td {
                color: #d3d3d4;
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: #a0a3a8;
        padding: 17px 15px;
        min-height: 48px;
        line-height: 16px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
    }
}

/deep/ .el-tree {
    background: #232528;
    color: rgba(255, 255, 255, 0.8);
    .el-tree-node__content {
        &:hover {
            background: #232528;
        }
        .el-tree-node__label {
            &:hover {
                color: #43a1ac;
            }
        }
    }
    .el-tree-node:focus > .el-tree-node__content {
        background: transparent;
    }
}
</style>
