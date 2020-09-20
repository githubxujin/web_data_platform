<template>
    <div>
        <qg-table subtitle="企业信息">
            <qg-table-column v-for="(item,index) in getRows()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
    </div>
</template>
<script>
export default {
    props: {
        company: Object,

    },
    methods: {
        getRows () {
            return [
                { key: "注册号", value: this.company.no, column: "qg-three" },
                { key: "统一社会信用代码", value: this.company.creditCode, column: "qg-three" },
                { key: "组织机构代码", value: this.company.orgNo, column: "qg-three" },
                { key: "省份", value: this.company.province, column: "qg-three" },
                { key: "企业类型", value: this.company.companyType, column: "qg-three" },
                { key: "法人", value: this.company.operName, column: "qg-three" },
                { key: "企业性质", value: this.company.econKind, column: "qg-three" },
                { key: "企业资质", value: this.company.qualification, column: "qg-three" },
                { key: "主营材料/劳务", value: this.company.mainBussiness, column: "qg-three" },
                { key: "主要经营区域", value: this.company.mainBusinessArea, column: "qg-three" },
                { key: "客户登记", value: this.company.customerReg, column: "qg-three" },
                { key: "融资意愿预测", value: this.company.financeWill, column: "qg-three" },
                { key: "注册资本", value: this.company.registCapi, column: "qg-three" },
                { key: "实缴资本", value: this.company.recCap, column: "qg-three" },

                { key: "登记机关", value: this.company.belongOrg, column: "qg-three" },
                { key: "发照日期", value: this.company.checkDate, column: "qg-three" },
                { key: "成立日期", value: this.company.startDate, column: "qg-three" },
                { key: "吊销日期", value: this.company.endDate, column: "qg-three" },
                { key: "营业开始日期", value: this.company.termStart, column: "qg-three" },
                { key: "营业结束日期", value: this.company.teamEnd, column: "qg-three" },
                { key: "更新日期", value: this.company.updatedDate, column: "qg-three" },
                { key: "是否IPO上市", value: this.company.isOnStock === 1 ? '上市' : '未上市', column: "qg-three" },
                { key: "上市公司代码", value: this.company.stockNumber, column: "qg-three" },
                { key: "上市类型", value: this.company.stockType, column: "qg-three" },
                { key: "参保人员", value: this.company.insuredCount, column: "qg-three" },
                { key: "规模", value: this.company.personScope, column: "qg-three" },
                { key: "英文名", value: this.company.englishName, column: "qg-three" },
                { key: "企业网址", value: this.company.companyUrl, alone: true },
                { key: "经营范围", value: this.company.businessScope, alone: true },
            ]

        },
    }
};
</script>