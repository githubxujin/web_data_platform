<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title mb20">合作上游</div>
        <el-table :data="upstreamList" border class="tab-info">
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="upstreamCompanyName" label="合作上游企业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationYear" label="合作年限" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination> -->
        <div class="tabs-title mt30 mb20">合作下游</div>
        <el-table :data="downstreamList" border class="tab-info">
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="companyName" label="合作下游企业" min-width="220" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.companyName ? scope.row.companyName : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bidCount" label="合作项目数量" width="120" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.bidCount ? scope.row.bidCount : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="cooperationYear" label="合作年限" width="100" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.cooperationYear ? scope.row.cooperationYear : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="item" label="企业结构" width="100">
                <!-- <template slot-scope='scope'> -->
                    -
                <!-- </template> -->
            </el-table-column>
            <el-table-column prop="coreName" label="核心人员姓名" width="120" show-overflow-tooltip>
                <!-- <template slot-scope='scope'> -->
                    -
                <!-- </template> -->
            </el-table-column>
            <el-table-column prop="coreJob" label="核心人员职位" width="150" show-overflow-tooltip>
                <!-- <template slot-scope='scope'> -->
                    -
                <!-- </template> -->
            </el-table-column>
            <el-table-column prop="coreContactWay" label="核心人员联系方式" show-overflow-tooltip>
                <!-- <template slot-scope='scope'> -->
                    -
                <!-- </template> -->
            </el-table-column>
        </el-table>
        <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination> -->
        <div class="tabs-title mt30 mb20">历史中标概况</div>
        <table class="el-table-list">
            <tr>
                <td>历史中标数量</td>
                <td>历史中标金额</td>
                <td>两年内中标项目数量</td>
                <td>两年内中标金额</td>
            </tr>
            <tr>
                <td>{{biddingData.bidCount ? biddingData.bidCount : '-'}}</td>
                <td>
                    <span v-if="biddingData.bidAmount">
                        {{biddingData.bidAmount | numFormat}}
                    </span>
                    <span v-else>-</span>
                <td>{{biddingData.twoBidCount ? biddingData.twoBidCount : '-'}}</td>
                <td>
                    <span v-if="biddingData.twoBidAmount">
                        {{biddingData.twoBidAmount | numFormat}}
                    </span>
                    <span v-else>-</span>
                </td>
            </tr>
            <tr>
                <td>中标项目属地前5</td>
                <td>中标项目类型偏好占比</td>
                <td>中标材料前5</td>
                <td></td>
            </tr>
            <tr>
                <td>{{biddingData.bidTopArea ? biddingData.bidTopArea : '-'}}</td>
                <td>{{biddingData.bidTypeNum ? biddingData.bidTypeNum : '-'}}</td>
                <td>{{biddingData.bidMaterial ? biddingData.bidMaterial : '-'}}</td>
                <td></td>
            </tr>
        </table>

        <div class="tabs-title mt30 mb20">历史中标</div>
        <el-table :data="biddingList" class="tab-info">
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bidDate" label="中标日期" width="370" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="370" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tenderName" label="招标单位" width="254" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bidder" label="中标人" width="254" show-overflow-tooltip></el-table-column>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getBiding(companyName,source)" :current-page.sync="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0"></el-pagination>

        <div class="tabs-title mt30 mb20">监管账户情况</div>
        <el-table :data="[]" border class="tab-info" style="width: 100%">
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
        companyName: String,
        id: String,
        source: Number
    },
    data() {
        return {
            total: 0,
            dialogVisible: false,
            list: [],
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
            biddingList: {},
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
    created() {
        this.params.companyName = this.companyName
        this.getDownstream(this.companyName, this.source)
        this.getHistoryBidding(this.companyName, this.id)
        this.getBiding(this.companyName, this.source)
    },
    methods: {

        // // 获取合作下游列表
        getDownstream(companyName, source) {
            this.$http('/dcp/energy/cooperation/downstream', { companyName, source }, { type: 'get' }).then(res => {
                this.downstreamList = res.data
            })
        },

        getHistoryBidding(companyName, id) {
            this.$http('/dcp/energy/history/bid', { companyName, id }, { type: 'get' }).then(res => {
                this.biddingData = res.data
            })
        },
        getBiding(companyName, source) {
            source = Number(source)
            let params = { ...this.params, companyName, source }
            this.$http('/dcp/energy/bid/list', { ...params }, { type: 'post' }).then(res => {
                this.biddingList = res.data.records
                this.total = res.data.total
            })
        },
        handleSizeChange(v) {
            console.log(v, 'page')
            this.params.size = v
            this.getBiding()
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
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
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
