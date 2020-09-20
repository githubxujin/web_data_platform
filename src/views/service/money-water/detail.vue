<template>
    <div>
        <table-row :rows="account" subtitle="二级账户详情" class="mt20"></table-row>
        <div class="mt20"></div>
    </div>
</template>
<script>
import { industryCategoryLabel, tradeStatusLabel, isCashSweepLabel } from "@/utils/common"

export default {
    components: {
        "table-row": () => import("@/components/Table/el-table-row")
    },
    data() {
        return {
            account: [],
        };
    },
    created() {
        this.getAccount();

    },
    methods: {
        industryCategoryLabel,
        isCashSweepLabel,
        tradeStatusLabel,
        //二级账户
        getAccount() {
            let data = this.$route.query
            this.account = [
                {
                    key: "行业类别",
                    value: industryCategoryLabel(data.industryCategory)
                },
                {
                    key: "企业名称",
                    value: data.customerName
                },
                {
                    key: "账户/账号",
                    value: data.accountNum
                },
                {
                    key: "银行名称",
                    value: data.accountBankName
                },
                {
                    key: "交易日期",
                    value: this.formatDate(data.tradeDate, 'YYYY-MM-DD')
                },
                {
                    key: "交易时间",
                    value: this.formatDate(data.tradeDate, 'HH:mm:ss')
                },
                {
                    key: "交易类型",
                    value: data.incomeMark
                },
                {
                    key: "交易金额",
                    value: data.tradeAmount
                },
                {
                    key: "对方户名",
                    value: data.otherAccountName1
                },
                {
                    key: "对方账号",
                    value: data.otherAccountName1
                },
                {
                    key: "对方开户行名",
                    value: data.otherBankName1
                },
                {
                    key: "流水号",
                    value: data.flowNum
                },
                {
                    key: "流水序号",
                    value: data.serialNum
                },
                {
                    key: "业务摘要",
                    value: data.businessSummary
                },
                {
                    key: "附言",
                    value: data.postscript
                },
                {
                    key: "业务类型",
                    value: data.businessType
                },
                {
                    key: "系统号",
                    value: data.systemCode
                },
                {
                    key: "是否归集流水",
                    value: isCashSweepLabel(data.isCashSweep)
                },
                {
                    key: "交易状态",
                    value: tradeStatusLabel(data.tradeStatus)
                },
                {
                    key: "备注",
                    value: data.remark,
                },
            ]
        },
    }
};
</script>