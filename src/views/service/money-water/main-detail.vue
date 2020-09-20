<template>
    <div class="table-wrap mt20">
        <qg-table subtitle="主账户详情">
            <qg-table-column v-for="(item,index) in mainAccount" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
    </div>
</template>
<script>
import { industryCategoryLabel, tradeStatusLabel, isCashSweepLabel } from "@/utils/common"

export default {
    data () {
        return {
            mainAccount: [],
        };
    },
    created () {
        this.getRows();
    },
    methods: {
        industryCategoryLabel,
        isCashSweepLabel,
        tradeStatusLabel,
        getRows () {
            let data = this.$route.query
            this.mainAccount = [
                {
                    key: "主账户名",
                    value: data.mainAccountName,
                    column: "qg-two"
                },
                {
                    key: "主账户",
                    value: data.mainAccountNum,
                    column: "qg-two"
                },
                {
                    key: "银行名称",
                    value: data.accountBankName,
                    column: "qg-two"
                },
                {
                    key: "交易日期",
                    value: this.formatDate(data.tradeDate, 'YYYY-MM-DD'),
                    column: "qg-two"
                },
                {
                    key: "交易时间",
                    value: this.formatDate(data.tradeDate, 'HH:mm:ss'),
                    column: "qg-two"
                },
                {
                    key: "交易类型",
                    value: data.incomeMark,
                    column: "qg-two"
                },
                {
                    key: "交易金额",
                    value: data.tradeAmount,
                    column: "qg-two"
                },
                {
                    key: "对方户名",
                    value: data.otherAccountName1,
                    column: "qg-two"
                },
                {
                    key: "对方账号",
                    value: data.otherAccountName1,
                    column: "qg-two"
                },
                {
                    key: "对方开户行名",
                    value: data.otherBankName1,
                    column: "qg-two"
                },
                {
                    key: "流水号",
                    value: data.flowNum,
                    column: "qg-two"
                },
                {
                    key: "业务摘要",
                    value: data.businessSummary,
                    column: "qg-two"
                },
                {
                    key: "附言",
                    value: data.postscript,
                    column: "qg-two"
                },
                {
                    key: "业务类型",
                    value: data.businessType,
                    column: "qg-two"
                },
                {
                    key: "系统号",
                    value: data.systemCode,
                    column: "qg-two"
                },
                {
                    key: "是否归集流水",
                    value: isCashSweepLabel(data.isCashSweep),
                    column: "qg-two"
                },
                {
                    key: "交易状态",
                    value: tradeStatusLabel(data.tradeStatus),
                    column: "qg-two"
                },
                {
                    key: "备注",
                    value: data.remark,
                    column: "qg-two"

                },
            ]
        },

    }
};
</script>