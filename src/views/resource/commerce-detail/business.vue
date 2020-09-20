<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title mb20">基础资质</div>
        <table class="el-table-list">
            <tr>
                <td>工商状态</td>
                <td>{{params.businessStatus ? params.businessStatus : '-'}}</td>
            </tr>
            <tr>
                <td>经营异常</td>
                <td>{{params.businessAbnormal ? params.businessAbnormal : '-'}}</td>
            </tr>
            <tr>
                <td>催款/欠税</td>
                <td>{{params.callTaxDebt ? params.callTaxDebt : '-'}}</td>
            </tr>
            <tr>
                <td>税务非正常户</td>
                <td>{{params.taxIrregular ? params.taxIrregular : '-'}}</td>
            </tr>
            <tr>
                <td>重大税收违法</td>
                <td>{{params.majorTaxViolation ? params.majorTaxViolation : '-'}}</td>
            </tr>
            <tr>
                <td>经营许可</td>
                <td>{{params.businessLicense ? params.businessLicense : '-'}}</td>
            </tr>
            <tr>
                <td>行政处罚</td>
                <td>{{params.administrativePenalties ? params.administrativePenalties : '-'}}</td>
            </tr>
            <tr>
                <td>产业黑名单</td>
                <td>{{params.constructionIndustryBlack ? params.constructionIndustryBlack : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">基础资质</div>
        <table class="el-table-list">
            <tr>
                <td>销售毛利</td>
                <td>
                    <span v-if="params.grossSales === '0%'">-</span>
                    <span v-else>{{params.grossSales ? params.grossSales : '-'}}</span>
                </td>
            </tr>
            <tr>
                <td>应收账款(含票据)周转天数</td>
                <td>{{params.receivableDays ? params.receivableDays : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">经营稳定</div>
        <table class="el-table-list">
            <tr>
                <td>我司核心企业销售占比</td>
                <td>
                    <span v-if="params.salesProportion === '0%'">-</span>
                    <span v-else>{{params.salesProportion ? params.salesProportion : '-'}}</span>
                </td>
            </tr>
            <tr>
                <td>现贷业务占比</td>
                <td>{{params.spotProportion ? params.spotProportion : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">发展能力</div>
        <table class="el-table-list">
            <tr>
                <td>营业收入增长比率</td>
                <td>
                    <span v-if="params.operatingIncomeRate === '0%'">-</span>
                    <span v-else>{{params.operatingIncomeRate ? params.operatingIncomeRate : '-'}}</span>
                </td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">企业信用</div>
        <table class="el-table-list">
            <tr>
                <td>征信报告</td>
                <td>
                    <span v-if="!params.creditReport">-</span>
                    <a v-else class="report" :href="params.creditReport" target="_blank">征信报告.pdf</a>
                </td>
            </tr>
            <tr>
                <td>涉诉情况</td>
                <td>{{params.casesInvolved ? params.casesInvolved : '-'}}</td>
            </tr>
            <tr>
                <td>被执行人</td>
                <td>{{params.executedPerson ? params.executedPerson : '-'}}</td>
            </tr>
            <tr>
                <td>失信被执行人</td>
                <td>{{params.dishonestPerson ? params.dishonestPerson : '-'}}</td>
            </tr>
            <tr>
                <td>企业年度发票作废率</td>
                <td>{{params.yearInvoiceInvalidRate ? params.yearInvoiceInvalidRate : '-'}}</td>
            </tr>
            <tr>
                <td>企业年度发票冲红率</td>
                <td>{{params.yearInvoiceRedRate ? params.yearInvoiceRedRate : '-'}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['companyName'],
    data() {
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
    created() {
        this.getOperate(this.companyName)
    },
    methods: {
        getOperate(companyName) {
            this.$http('/dcp/pre/credit/company/operate', { companyName }, { type: 'get' }).then(res => {
                this.params = res.data
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
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
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
/deep/ .tab-info {
    border: 1px solid #54575c;
    // tr:last-child {
    //     td {
    //        border-bottom: 0;
    //     }
    // }
    th {
        color: #a0a3a8;
        border-right: 1px solid #54575c;
        font-weight: normal;
    }
    th.is-leaf {
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        font-weight: normal;
        border-bottom: 1px solid #54575c;
        border-right: 1px solid #54575c;
    }
}
.report {
    color: #43a1ac;
    text-decoration: underline;
}
/deep/ .el-tabs__header {
    margin-top: 30px;
}
</style>
