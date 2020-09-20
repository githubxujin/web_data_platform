<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">
                <div class="title">{{detailData.companyName || '-'}}</div>

                <!-- 参照黑白名单判断  black-white-company-detail.vue -->
                <router-link v-if="!isObjectEmpty(jumpInfo)" class="to-links" :to="{ name: 'service-company-evalute-list', query: { evaluateId: jumpInfo.id, companyName: jumpInfo.customerName, createTime: formatDate(jumpInfo.lastEvaluateTime)}}">
                    企业评估
                </router-link>

                <qg-table class="mt20">
                    <qg-table-column v-for=" (item,index) in conda()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
                </qg-table>
            </div>
        </div>
    </div>
</template>

<script>
import { rollCallType } from './type.js'
export default {
    data() {
        return {
            detailData: {},
            jumpInfo: {}
        }
    },
    created() {
        this.getList(this.$route.query.id)
        this.isCompanyEvaluate()
    },
    methods: {
        // 判断-企业评估
        isCompanyEvaluate() {
            this.ajax
                .json('/dcp/server/antiFraud/evaluate/query', { customerName: this.$route.query.companyName }, { type: 'get' })
                .then(res => {
                    this.jumpInfo = { ...res.data[0] }
                });
        },
        getList(id) {
            this.ajax
                .json('/dcp/query/factoringcompany/detail', { id }, { type: 'POST' })
                .then(res => {
                    this.detailData = res.data
                });
        },
        conda () {
            let detailData = this.detailData || {}
            return [
                { key: "名单类型", value: rollCallType(detailData.rosterType) || '-', column: "qg-two" },
                { key: "经营状态", value: detailData.operatingStatus || '-', column: "qg-two" },
                { key: "统一社会信用代码", value: detailData.socialCreditCode || '-', column: "qg-two" },
                { key: "纳税人识别号", value: detailData.identifyNumber || '-', column: "qg-two" },
                { key: "注册号", value: detailData.registerCode || '-', column: "qg-two" },
                { key: "组织机构代码", value: detailData.organizationCode || '-', column: "qg-two" },
                { key: "法定代表人", value: detailData.lawPerson || '-', column: "qg-two" },
                { key: "注册资本", value: detailData.registeredCapital || '-', column: "qg-two" },
                { key: "企业类型", value: detailData.companyType || '-', column: "qg-two" },
                { key: "所属行业", value: detailData.industry || '-', column: "qg-two" },
                { key: "成立日期", value: detailData.registeredTime || '-', column: "qg-two" },
                { key: "所属省份", value: detailData.province || '-', column: "qg-two" },
                { key: "所属城市", value: detailData.city || '-', column: "qg-two" },
                { key: "所属区县", value: detailData.county || '-', column: "qg-two" },
                { key: "曾用名", value: detailData.formerName || '-', column: "qg-two" },
                { key: "参保人数", value: detailData.personCount || '-', column: "qg-two" },
                { key: "电话", value: detailData.phone || '-', column: "qg-two" },
                { key: "更多电话", value: detailData.morePhone || '-', column: "qg-two" },
                { key: "邮箱", value: detailData.mail || '-', column: "qg-two" },
                { key: "更多邮箱", value: detailData.moreMail || '-', column: "qg-two" },
                { key: "官网", value: detailData.officialWebsite || '-', column: "qg-one" },
                { key: "企业地址", value: detailData.companyAddr || '-', column: "qg-one" },
                { key: "备注", value: '-', column: "qg-one" },
                { key: "经营范围", value: detailData.businessRange || '-', column: "qg-one" }
                
            ];
        },
    },
}
</script>

<style lang="scss" scoped>
    .title {
        display: inline-block;
    }
</style>
