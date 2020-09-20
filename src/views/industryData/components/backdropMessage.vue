<template>
    <div>
        <div class="tabs-title pt20 mb20">承建单位准入</div>
        <el-table :data="unitList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="organizationName" label="准入机构" show-overflow-tooltip></el-table-column>
            <el-table-column prop="categoryName" label="分供方分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="loginName" label="分供方账号" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="tabs-title mb20 mt30">合作上游</div>
        <el-table :data="upstreamList" border>
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="upstreamCompanyName" label="合作上游企业" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationYear" label="合作年限" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">合作下游</div>
        <el-table :data="downstreamList" border>
            <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="downstreamCompanyName" label="合作下游企业" min-width="220" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationProjectNum" label="合作项目数量" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startCooperationDate" label="合作项目时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cooperationYear" label="合作年限" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="item" label="企业结构" width="100">
                <template slot-scope="item">
                    <el-button type="text" @click="getTreeList(item.row.downstreamCompanyName)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="coreName" label="核心人员姓名" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="coreJob" label="核心人员职位" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="coreContactWay" label="核心人员联系方式" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">历史中标</div>
        <table class="el-table-list" style="width: 100%">
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
                <td>{{biddingData.twoYearBidCount ? biddingData.twoYearBidCount : '-'}}</td>
                <td>
                    <span v-if="biddingData.twoYearBidAmount">
                        {{biddingData.twoYearBidAmount | numFormat}}
                    </span>
                    <span v-else>-</span>
                </td>
            </tr>
        </table>
        <table class="el-table-list " style="margin-top:-1px; width: 100%">
            <tr>
                <td>中标项目属地前5</td>
                <td>中标项目类型偏好占比</td>
            </tr>
            <tr>
                <td>{{biddingData.bidTopArea ? biddingData.bidTopArea : '-'}}</td>
                <td>{{biddingData.bidTypeNum ? biddingData.bidTypeNum : '-'}}</td>
            </tr>
        </table>
        <el-table :data="list" border class="mt20">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="bidDate" label="中标日期" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="tenderUnit" label="招标单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bidder" label="中标人" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getBiddingList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        <div class="tabs-title mt20 mb20">不良行为记录</div>
        <el-table :data="badList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="joinSupplierCategoryName" label="分供方分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplierLoginName" label="分供方账号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="badBehaviorType" label="不良类型" show-overflow-tooltip></el-table-column>
            <el-table-column prop="badBehaviorText" label="不良明细" show-overflow-tooltip></el-table-column>
            <el-table-column prop="organizationName" label="判定单位" show-overflow-tooltip></el-table-column>
            <el-table-column prop="inDate" label="判定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="commonStatus" label="状态" show-overflow-tooltip></el-table-column>
        </el-table>

        <div class="tabs-title mt20 mb20">监管账户情况</div>
        <el-table :data="[]" style="width: 1360px">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
        </el-table>
        <el-dialog v-if="dialogVisible" title="企业结构" :visible.sync="dialogVisible" width="30%">
            <el-tree :data="data" :default-expand-all="true" ref="tree" :expand-on-click-node="false" :props="defaultProps"></el-tree>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>

        <div class="tabs-title mt20 mb20">网上合作记录</div>
        <el-table :data="cooperationList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="organisation" label="所属组织" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="biddName" label="招标项目名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="contractName" label="合同名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="projectName" label="使用项目" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="buildingType" label="建筑类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="buildingStructure" label="建筑结构" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="contractStatus" label="合同状态" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='cooperationParams.size' @size-change='getCooperationList' :current-page.sync='cooperationParams.current' @current-change='getCooperationList'
            layout='total, sizes, prev, pager, next, jumper' :total='cooperationParams.total' v-if='cooperationParams.total > 0'>
        </el-pagination>
        <div class="tabs-title mt20 mb20">结算单</div>
        <el-table :data="checkoutList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="organization" label="所属组织" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="contractName" label="合同名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="projectName" label="工程名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="totalAmount" label="结算金额" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="receiptStatus" label="结算状态" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='checkoutParams.size' @size-change='getCheckoutList' :current-page.sync='checkoutParams.current' @current-change='getCheckoutList'
            layout='total, sizes, prev, pager, next, jumper' :total='checkoutParams.total' v-if='checkoutParams.total > 0'>
        </el-pagination>
        <div class="tabs-title mt20 mb20">承建单位评价</div>

        <el-table :data="commentList" border @expand-change="getCommentDetailList" :row-key="getRowKeys">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-table v-if="scope.row.expData" :data="scope.row.expData " border>
                        <el-table-column prop="projectName" label="合作项目" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        <el-table-column prop="totalAmount" label="当年合作产值(单位:元)" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                    </el-table>
                </template>
            </el-table-column>

            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="commentYear" label="所属年度" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="commentFrequence" label="评价类别" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="commentScore" label="评分" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="commentTime" label="评价时间" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="commentOrg" label="评价承建单位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['companyName'],
    data () {
        return {
            total: 0,
            dialogVisible: false,
            badList: [],
            list: [],
            unitList: [],
            upstreamList: [],
            downstreamList: [],
            cooperationList: [],
            checkoutList: [],
            commentList: [],
            commentDetailList: [],
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
            },
            cooperationParams: {
                current: 1,
                size: 10,
                total: 0
            },
            checkoutParams: {
                current: 1,
                size: 10,
                total: 0
            },
            commentParams: {
                current: 1,
                size: 10,
                total: 0
            }
        }
    },
    created () {
        this.params.companyName = this.companyName
        this.getUpstream(this.companyName)
        this.getDownstream(this.companyName)
        this.getHistoryBidding(this.companyName)
        this.getUnitList(this.companyName)
        this.getBadList(this.companyName)
        this.getBiddingList()
        this.getCooperationList()
        this.getCommentList()
        this.getCheckoutList()
    },
    methods: {
        // 获取row的key值
        getRowKeys (row) {
            return row.commentSysNo;
        },
        // 点击自动展开收缩
        rowClick (row, index) {
            // 展开/收缩切换
            this.$refs.expTable.toggleRowExpansion(row);
        },

        getCommentDetailList (row) {
            console.log(row)
            this.ajax
                .json('/dcp/pre/credit/company/comment/project/list', { supplierSysNo: row.commentSysNo, companyName: row.commentOrg })
                .then(res => {
                    this.$set(row, "expData", res.data.records);
                });
        },
        getCommentList () {
            this.commentParams.companyName = this.companyName
            this.ajax
                .json('/dcp/pre/credit/company/comment/list', this.commentParams)
                .then(res => {
                    this.commentList = res.data.records;
                    this.commentParams.total = res.data.total;
                });
        },
        getCheckoutList () {
            this.checkoutParams.companyName = this.companyName
            this.ajax
                .json('/dcp/pre/credit/company/checkout/list', this.checkoutParams)
                .then(res => {
                    let { records = [], total = 0 } = res.data || []
                    this.checkoutList = records
                    this.checkoutParams.total = total
                });
        },
        getCooperationList () {
            this.ajax
                .json('/dcp/pre/credit/company/cooperation/list', { ...this.cooperationParams, companyName: this.companyName })
                .then(res => {
                    this.cooperationList = res.data.records;
                    this.cooperationParams.total = res.data.total;
                });
        },
        getBadList (companyName) {
            this.$http('/dcp/pre/credit/company/bad/list', { companyName }, { type: 'get' }).then(res => {
                this.badList = res.data
            })
        },
        getUnitList (companyName) {
            this.$http('/dcp/pre/credit/company/access/list', { companyName }, { type: 'get' }).then(res => {
                this.unitList = res.data
            })
        },
        // 获取合作上游列表
        getUpstream (companyName) {
            this.$http('/dcp/pre/credit/company/upstream/list', { companyName }, { type: 'get' }).then(res => {
                this.upstreamList = res.data
            })
        },
        // // 获取合作下游列表
        getDownstream (companyName) {
            this.$http('/dcp/pre/credit/company/downstream/list', { companyName }, { type: 'get' }).then(res => {
                this.downstreamList = res.data
            })
        },
        // 获取历史中标
        getHistoryBidding (companyName) {
            this.$http('/dcp/pre/credit/company/bid/stat', { companyName }, { type: 'get' }).then(res => {
                this.biddingData = res.data
            })
        },
        // // // 获取历史中标列表
        getBiddingList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/yzw/bid/detail/page/list', this.params, { type: 'formData' }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        // // 获取中建系名单体系
        getTreeList (name) {
            this.data = []
            this.$http('/dcp/yzw/customer/tree/get', { name }, { type: 'get' }).then(res => {
                this.data = res.data
                this.dialogVisible = true
            })
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getBiddingList()
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-table__empty-block {
    width: 1180px !important;
}
</style>
