<template>
    <div>
        <div class="tabs-title mb20 pt20">业务贡献</div>
        <table class="el-table-list">
            <tr>
                <td>每月日均融资规模</td>
                <td>与我司合作年限</td>
                <td>保证金业务利率参考值</td>
                <td>保证金业务费率参考值</td>
                <td>保证金业务费用收取方式</td>
                <td>保证金业务回款方式</td>
            </tr>
            <tr>
                <td>-</td>
                <td>{{ businessInfo.cooperationTimeQuantum ?  businessInfo.cooperationTimeQuantum : '-' }}</td>
                <td>{{ businessInfo.depositInterestRate  ?  businessInfo.depositInterestRate :  '-' }}</td>
                <td>{{ businessInfo.depositFeeRate  ? businessInfo.depositFeeRate : '-' }}</td>
                <td>-</td>
                <td>{{  businessInfo.depositAmountPayType ?  businessInfo.depositAmountPayType.join(',') : '-'}}</td>
            </tr>
            <tr>
                <td>订单保理利率参考值</td>
                <td>订单保理费率参考值</td>
                <td>订单保理收取方式</td>
                <td>订单保理回款方式</td>
                <td>到货保理利率参考值</td>
                <td>到货保理费率参考值</td>

            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>{{businessInfo.factorPayType  ? businessInfo.factorPayType.join(',') : '-'  }}</td>
                <td>{{businessInfo.aogInterestRate ? businessInfo.aogInterestRate : '-' }}</td>
                <td>{{ businessInfo.aogFeeRate ? businessInfo.aogFeeRate  : '-' }}</td>
            </tr>
            <tr>
                <td>到货保理费用收取方式</td>
                <td>到货保理回款方式</td>
                <td>应收保理利率参考值</td>
                <td>应收保理费率参考值</td>
                <td>应收保理费用收取方式</td>
                <td>应收保理回款方式</td>

            </tr>
            <tr>
                <td>-</td>
                <td>{{  businessInfo.aogPayType ? businessInfo.aogPayType.join(',') : '-' }}</td>
                <td>{{ businessInfo.receivableInterestRate ? businessInfo.receivableInterestRate : '-' }}</td>
                <td>{{ businessInfo.receivableFeeRate ? businessInfo.receivableFeeRate  : '-' }}</td>
                <td>-</td>
                <td>{{ businessInfo.receivablePayType ? businessInfo.receivablePayType.join(',') : '-' }}</td>
            </tr>
            <tr>
                <td>票据保理利率参考值</td>
                <td>票据保理费率参考值</td>
                <td>票据保理费用收取方式</td>
                <td>票据保理回款方式</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>{{ businessInfo.billInterestRate ? businessInfo.billInterestRate : '-' }}</td>
                <td>{{ businessInfo.billFeeRate ? businessInfo.billFeeRate : '-' }}</td>
                <td>-</td>
                <td>{{ businessInfo.billPayType ? businessInfo.billPayType.join(',') : '-' }}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt20 mb20">履约能力</div>
        <table class="el-table-list">
            <tr>
                <td>利息逾期支付累计发生次数</td>
                <td>利息逾期支付累计发生天数</td>
                <td>借新还旧累计发生次数</td>
                <td>借新还旧累计发生天数</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>减免息累计减免次数</td>
                <td>息费展期累计展期次数</td>
                <td>息费展期累计展期天数</td>
                <td>逾期记录</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt20 mb20">配合程度</div>
        <table class="el-table-list">
            <tr>
                <td>因单据完整性问题退单</td>
                <td>未落实账户变更</td>
                <td>未开通短信提醒</td>
                <td>未按时补充单据累计发生次数</td>
                <td>未按时补充单据累计发生天数</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>放款后文件签章及时性累计发生天数</td>
                <td>转应收展期累计展期次数</td>
                <td>转应收展期累计展期天数</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt20 mb20">欺诈风险</div>
        <el-table :data="list" border>
            <el-table-column prop="name" label="重复融资记录" show-overflow-tooltip align="center">
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="gendr" label="非归集账款回款未按要求偿还我司" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.gendr ? item.row.gendr : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="zhuang" label="针对已受让资产发票冲红记录" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.zhuang ? item.row.zhuang : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="years" label="针对已受让资产发票作废记录" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.years ? item.row.years : '-'}}
                </template>
            </el-table-column>
        </el-table>

        <div class="tabs-title mt20 mb20">监管账户情况</div>
        <el-table :data="list" class="table-border">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="accountType" label="账户类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="accountName" label="账户名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="bankName" label="开户行" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="accountNo" label="账号" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="source" label="来源" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ scope.row.source === '1' ? '云筑网': '盛易通'}}
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
export default {
    props: ['companyName'],
    data () {
        return {
            businessInfo: {},
            list: []
        }
    },
    created () {
        this.getBusinessInfo()
    },
    methods: {
        //riskCredit
        getBusinessInfo () {
            this.$http('ledger/dataCenter/getBusinessInfo', { sellerCustomerName: this.companyName }).then(res => {
                this.businessInfo = res.data
            });
        }
    }
}
</script>

