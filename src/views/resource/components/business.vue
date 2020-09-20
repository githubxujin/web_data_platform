<template>
    <div>
        <div class="tabs-title mb20 pt20">基础资质</div>
        <table class="el-table-list">
            <tr>
                <td>工商状态</td>
                <td>经营异常</td>
                <td>催款/欠税</td>
                <td>税务非正常户</td>
            </tr>
            <tr>
                <td>{{params.businessStatus ? params.businessStatus : '-'}}</td>
                <td>{{params.businessAbnormal ? params.businessAbnormal : '-'}}</td>
                <td>{{params.callTaxDebt ? params.callTaxDebt : '-'}}</td>
                <td>{{params.taxIrregular ? params.taxIrregular : '-'}}</td>
            </tr>
            <tr>
                <td>重大税收违法</td>
                <td>经营许可</td>
                <td>行政处罚</td>
                <td>黑白灰库</td>
            </tr>
            <tr>
                <td>{{params.majorTaxViolation ? params.majorTaxViolation : '-'}}</td>
                <td>{{params.businessLicense ? params.businessLicense : '-'}}</td>
                <td>{{params.administrativePenalties ? params.administrativePenalties : '-'}}</td>
                <td>{{params.constructionIndustryBlack ? params.constructionIndustryBlack : '-'}}</td>
            </tr>
            <tr>
                <td>成交方式</td>
                <td>结算方式</td>
                <td>支付方式</td>
                <td>结算币种</td>
            </tr>
            <tr>
                <td>{{params.closingMethod ? params.closingMethod : '-'}}</td>
                <td>{{params.settlementMethod ? params.settlementMethod : '-'}}</td>
                <td>{{params.paymentMethod ? params.paymentMethod : '-'}}</td>
                <td>{{params.settlementCurrency ? params.settlementCurrency : '-'}}</td>
            </tr>
            <tr>
                <td>付款银行</td>
                <td>付款期限</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>{{params.paymentBank ? params.paymentBank : '-'}}</td>
                <td>{{params.expirationOfPay ? params.expirationOfPay : '-'}}</td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">经营效益</div>
        <table class="el-table-list">
            <tr>
                <td>销售毛利</td>
                <td>应收账款（含票据）周转天数</td>
                <td>资金流水笔数</td>
                <td>资金流水总额</td>
            </tr>
            <tr>
                <td>
                    <span v-if="params.grossSales === '0%'">-</span>
                    <span v-else>{{params.grossSales ? params.grossSales : '-'}}</span>
                </td>
                <td>{{params.receivableDays ? params.receivableDays : '-'}}</td>
                <td>{{params.flowOfFunds ? params.flowOfFunds : '-'}}</td>
                <td>
                    <span v-if="params.totalCapitalFlow">
                        {{params.totalCapitalFlow }}
                    </span>
                    <span v-else>-</span>
                </td>
            </tr>
            <tr>
                <td>2019年合同数</td>
                <td>2019年提单数</td>
                <td>2019年装港数</td>
                <td>2019年卸港数</td>
            </tr>
            <tr>
                <td>{{params.contractNumber ? params.contractNumber : '-'}}</td>
                <td>{{params.billNumber ? params.billNumber : '-'}}</td>
                <td>{{params.loadingPort ? params.loadingPort : '-'}}</td>
                <td>{{params.unloadingPort ? params.unloadingPort : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">经营稳定</div>
        <table class="el-table-list">
            <tr>
                <td>我司核心企业销售占比</td>
                <td>现贷业务占比</td>
                <td>应收余额</td>
                <td>应付余额</td>
            </tr>
            <tr>
                <td>{{params.salesProportion ? params.salesProportion : '-'}}</td>
                <td>{{params.spotProportion ? params.spotProportion : '-'}}</td>
                <td>
                    <span v-if="params.accumulatedReceivableBalance">
                        {{params.accumulatedReceivableBalance }}
                    </span>
                    <span v-else>-</span>
                </td>
                <td>
                    <span v-if="params.accumulatedPayableBalance">
                        {{params.accumulatedPayableBalance }}
                    </span>
                    <span v-else>-</span>
                </td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">发展能力</div>
        <table class="el-table-list">
            <tr>
                <td>营业收入增长率</td>
                <td>综合排名</td>
                <td>行业地区排名</td>
                <td>主营业务</td>
                <td>业务模式</td>
            </tr>
            <tr>
                <td>
                    <span v-if="params.operatingIncomeRate === '0%'">-</span>
                    <span v-else>{{params.operatingIncomeRate ? params.operatingIncomeRate : '-'}}</span>
                </td>
                <td>{{params.totalRank ? params.totalRank : '-'}}</td>
                <td>{{params.industryRank ? params.industryRank : '-'}}</td>
                <td>{{params.mainBusiness ? params.mainBusiness : '-'}}</td>
                <td>{{params.businessModel ? params.businessModel : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">企业信用</div>
        <table class="el-table-list">
            <tr>
                <td>征信报告</td>
                <td>涉诉情况</td>
                <td>失信人</td>
                <td>被执行人</td>
            </tr>
            <tr>
                <td>
                    <span v-if="!params.creditReport">-</span>
                    <a v-else class="report" :href="params.creditReport" target="_blank">征信报告.pdf</a>
                </td>
                <td>{{params.casesInvolved ? params.casesInvolved : '-'}}</td>
                <td>{{params.dishonestPerson ? params.dishonestPerson : '-'}}</td>
                <td>{{params.executedPerson ? params.executedPerson : '-'}}</td>
            </tr>
            <tr>
                <td>企业年度发票作废率</td>
                <td>企业年度发票冲红率</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <span v-if="!params.yearInvoiceInvalidRate">-</span>
                    <a v-else class="report" :href="params.yearInvoiceInvalidRate" target="_blank">征信报告.pdf</a>
                </td>
                <td>{{params.yearInvoiceRedRate ? params.yearInvoiceRedRate : '-'}}</td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        id: String
    },
    data () {
        return {
            params: {
                id: 32, // 主键id
                companyName: "", // 企业名称
                businessStatus: "", // 工商状态
                businessAbnormal: '', // 经营异常
                callTaxDebt: '', // 催缴/欠税
                taxIrregular: "", // 税务非正常户
                majorTaxViolation: "", // 重大税收违法
                businessLicense: '', // 经营许可
                administrativePenalties: '', // 行政处罚
                constructionIndustryBlack: "", // 建筑产业黑名单(是/否/未知)
                grossSales: "", // 销售毛利
                receivableDays: '', // 应收账款（含票据）周转天数
                salesProportion: "", // 我司核心企业销售占比
                spotProportion: '', // 现货业务占比
                operatingIncomeRate: "", // 营业收入增长率
                creditReport: '', // 征信报告(PDF 链接)
                casesInvolved: '', // 涉诉情况
                executedPerson: "", // 被执行人
                dishonestPerson: "", // 失信被执行人
                yearInvoiceInvalidRate: '', // 企业年度发票作废率
                yearInvoiceRedRate: '', // 企业年度发票冲红率
            }
        }
    },
    created () {
        this.getList(this.id)
    },
    methods: {
        getList (id) {
            this.$http('/dcp/energy/manage/info', { id }, { type: 'get' }).then(res => {
                this.params = res.data
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.report {
    color: #43a1ac;
    text-decoration: underline;
}
/deep/ .el-tabs__header {
    margin-top: 30px;
}
</style>
