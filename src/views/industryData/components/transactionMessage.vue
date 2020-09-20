<template>
    <div>
        <div class="tabs-title mb20 pt20">建设单位信息</div>
        <table :class="{'table-three': true, 'is-compile': isShow}">
            <tr>
                <td>定价方式</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.priceType" clearable></el-input>
                    </div>
                    <div v-else>{{params.priceType ? params.priceType : '-'}}</div>
                </td>
                <td>参考网站</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.referSite" clearable></el-input>
                    </div>
                    <div v-else>{{params.referSite ? params.referSite : '-'}}</div>
                </td>
                <td>参考城市</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.referCity" clearable></el-input>
                    </div>
                    <div v-else>{{params.referCity ? params.referCity : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>浮动价格</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.floatPrice" clearable></el-input>
                    </div>
                    <div v-else>
                        <!-- {{params.floatPrice ? params.floatPrice : '-'}} -->
                        <span v-if="params.floatPrice">{{params.floatPrice }}</span>
                        <span v-else>-</span>
                    </div>
                </td>
                <td>单据有效签收人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.documentSigner" clearable></el-input>
                    </div>
                    <div v-else>{{params.documentSigner ? params.documentSigner : '-'}}</div>
                </td>
                <td>对账单有效签字人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.statementSigner" clearable></el-input>
                    </div>
                    <div v-else>{{params.statementSigner ? params.statementSigner : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>对账单是否盖章</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.statementStamp" clearable></el-input>
                    </div>
                    <div v-else>{{params.statementStamp ? params.statementStamp : '-'}}</div>
                </td>
                <td>对账日</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="params.reconciliationDay" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{params.reconciliationDay ? params.reconciliationDay : '-'}}</div>
                </td>
                <td>结算是否线上审批</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.settlementOnlineApproval" clearable></el-input>
                    </div>
                    <div v-else>{{params.settlementOnlineApproval ? params.settlementOnlineApproval : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>线上审批系统名称</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.onlineApprovalSystem" clearable></el-input>
                    </div>
                    <div v-else>{{params.onlineApprovalSystem ? params.onlineApprovalSystem : '-'}}</div>
                </td>
                <td>预付款比例</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.contractPrepaymentRatio" clearable></el-input>
                    </div>
                    <div v-else>{{params.contractPrepaymentRatio ? params.contractPrepaymentRatio : '-'}}</div>
                </td>
                <td>合同过程付款比例</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.contractProcessPaymentRatio" clearable></el-input>
                    </div>
                    <div v-else>{{params.contractProcessPaymentRatio ? params.contractProcessPaymentRatio : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>合同约定付款节点</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.contractPaymentNode" clearable></el-input>
                    </div>
                    <div v-else>{{params.contractPaymentNode ? params.contractPaymentNode : '-'}}</div>
                </td>
                <td>实际过程付款比例</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.actualProcessPaymentRatio" clearable></el-input>
                    </div>
                    <div v-else>{{params.actualProcessPaymentRatio ? params.actualProcessPaymentRatio : '-'}}</div>
                </td>
                <td>实际付款节点</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.actualPaymentNode" clearable></el-input>
                    </div>
                    <div v-else>{{params.actualPaymentNode ? params.actualPaymentNode : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>实际账期</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.actualPeriod" clearable></el-input>
                    </div>
                    <div v-else>{{params.actualPeriod ? params.actualPeriod : '-'}}</div>
                </td>
                <td>银行转账</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.bankTransfer" clearable></el-input>
                    </div>
                    <div v-else>{{params.bankTransfer ? params.bankTransfer : '-'}}</div>
                </td>
                <td>电子商业承兑汇票</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.businessAcceptanceBill" clearable></el-input>
                    </div>
                    <div v-else>{{params.businessAcceptanceBill ? params.businessAcceptanceBill : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>电子银行承兑汇票</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.bankAcceptanceBill" clearable></el-input>
                    </div>
                    <div v-else>{{params.bankAcceptanceBill ? params.bankAcceptanceBill : '-'}}</div>
                </td>
                <td>银行保理</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.bankFactoring" clearable></el-input>
                    </div>
                    <div v-else>{{params.bankFactoring ? params.bankFactoring : '-'}}</div>
                </td>
                <td>信用证</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.creditCertificate" clearable></el-input>
                    </div>
                    <div v-else>{{params.creditCertificate ? params.creditCertificate : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>供应链金融</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.financeChain" clearable></el-input>
                    </div>
                    <div v-else>{{params.financeChain ? params.financeChain : '-'}}</div>
                </td>
                <td>银行保理合作银行</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.factoringCooperateBank" clearable></el-input>
                    </div>
                    <div v-else>{{params.factoringCooperateBank ? params.factoringCooperateBank : '-'}}</div>
                </td>
                <td>信用证合作银行</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="params.creditCertificateCooperateBank" clearable></el-input>
                    </div>
                    <div v-else>{{params.creditCertificateCooperateBank ? params.creditCertificateCooperateBank : '-'}}</div>
                </td>
            </tr>
        </table>
        <div v-if="!isShow">
            <div class="tabs-title mt30 mb20">到货视频</div>
            <el-table :data="list" border class="tab-info">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="customerName" label="卖方名称" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.customerName ? item.row.customerName : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.projectName ? item.row.projectName : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-button type="primary" plain
                            @click="$router.push('/dataAdministration/delivery-query/deliveryDetail/'+ item.row.id +'/'+ encodeURIComponent(item.row.projectName) + '/' + encodeURIComponent(item.row.customerName))">详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList($event)" :current-page="videoData.page" :page-sizes="[10, 20, 30, 40]" :page-size="videoData.size"
                layout="total, sizes, prev, pager, next, jumper" :total="sizeCount"></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: ['projectId'],
    data () {
        return {
            isShow: false,
            params: {
                actualPaymentNode: "",
                actualPeriod: "",
                actualProcessPaymentRatio: "",
                bankAcceptanceBill: "",
                bankFactoring: "",
                bankTransfer: "",
                businessAcceptanceBill: "",
                contractPaymentNode: "",
                contractPrepaymentRatio: "",
                contractProcessPaymentRatio: "",
                creditCertificate: "",
                creditCertificateCooperateBank: "",
                documentSigner: "",
                factoringCooperateBank: "",
                financeChain: "",
                floatPrice: "",
                onlineApprovalSystem: "",
                priceType: "",
                reconciliationDay: "",
                referCity: "",
                referSite: "",
                settlementOnlineApproval: "",
                statementSigner: "",
                statementStamp: ""
            },
            sizeCount: 0,
            videoData: {
                size: 10,
                page: 1,
                projectId: '',
                projectName: '',
                sellerName: '',
                deliveryDate: '',
                status: ''
            },
            list: []
        }
    },
    created () {
        if (this.$route.name === 'projectCompile') this.isShow = true
        let params = JSON.parse(this.$route.query.item)
        this.videoData.projectName = params.projectName
        this.getDetail(this.projectId)
        this.getList()
    },
    methods: {
        getDetail (id) {
            this.$http('/dcp/select/project/transaction', { id }, { type: 'get' }).then(res => {
                this.params = res.data
            })
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        },
        getList (v) {
            if (v) {
                this.videoData.page = v
            }
            this.$http('/riskreport/project/queryProjectInfoList', this.videoData, { type: 'json' }).then(res => {
                this.list = res.data.list || []
                this.sizeCount = res.data.sizeCount
            })
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
    td:nth-child(odd) {
        width: 165px;
        background: #292b2f;
        color: #a0a3a8;
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        padding: 17px 5px 17px 20px;
        line-height: 16px;
        border-bottom: 1px solid #54575c;
    }
}
.el-table-cro {
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

/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
