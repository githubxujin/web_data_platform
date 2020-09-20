<template>
    <div>
        <qg-table subtitle="基础资质" class="pt20">
            <qg-table-column label="工商状态">{{params.businessStatus }}</qg-table-column>
            <qg-table-column label="经营异常">{{params.businessAbnormal}}</qg-table-column>
            <qg-table-column label="催款/欠税">{{params.callTaxDebt }}</qg-table-column>
            <qg-table-column label="税务非正常户">{{params.taxIrregular }}</qg-table-column>
            <qg-table-column label="重大税收违法">{{params.majorTaxViolation}}</qg-table-column>
            <qg-table-column label="经营许可">{{params.businessLicense}}</qg-table-column>
            <qg-table-column label="行政处罚">{{params.administrativePenalties}}</qg-table-column>
            <qg-table-column label="产业黑名单">{{params.constructionIndustryBlack }}</qg-table-column>
        </qg-table>

        <qg-table subtitle="经营效益" class="pt20">
            <qg-table-column label="销售毛利">{{params.grossSales ==='0%'?  '-' : params.grossSales }}</qg-table-column>
            <qg-table-column label="应收账款(含票据)周转天数">{{params.receivableDays}}</qg-table-column>
        </qg-table>

        <qg-table subtitle="经营稳定" class="pt20">
            <qg-table-column label="我司核心企业销售占比">{{params.salesProportion ==='0%'?  '-' : params.salesProportion }}</qg-table-column>
            <qg-table-column label="现贷业务占比">{{params.spotProportion}}</qg-table-column>
        </qg-table>

        <qg-table subtitle="发展能力" class="pt20">
            <qg-table-column label="营业收入增长比率">{{params.operatingIncomeRate ==='0%'?  '-' : params.operatingIncomeRate }}</qg-table-column>
        </qg-table>

        <qg-table subtitle="企业信用" class="pt20">
            <qg-table-column label="征信报告">
                <div>
                    <a :href="params.creditReport" target="_blank" class="to-links">征信报告.pdf</a>
                </div>
            </qg-table-column>
            <qg-table-column label="涉诉情况">{{params.casesInvolved}}</qg-table-column>
            <qg-table-column label="被执行人">{{params.executedPerson }}</qg-table-column>
            <qg-table-column label="失信被执行人">{{params.dishonestPerson }}</qg-table-column>
            <qg-table-column label="企业年度发票作废率">{{params.yearInvoiceInvalidRate}}</qg-table-column>
            <qg-table-column label="企业年度发票冲红率">{{params.yearInvoiceRedRate}}</qg-table-column>
        </qg-table>

    </div>
</template>

<script>
export default {
    props: ['companyName'],
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
        this.getOperate(this.companyName)
    },
    methods: {
        getOperate (companyName) {
            this.$http('/dcp/pre/credit/company/operate', { companyName }, { type: 'get' }).then(res => {
                this.params = res.data
            })
        }
    }
}
</script>

