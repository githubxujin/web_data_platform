<template>
    <div>
        <div class="tabs-title mb20 pt20">财务报表</div>
        <div v-for="item in list" :key="item.id">
            <div class="title">年报期末数-{{item.year}}(货币单位:人民币元)</div>
            <table class="el-table-list mb30">
                <tr>
                    <td>流动资产</td>
                    <td>非流动资产</td>
                    <td>资产合计</td>
                    <td>流动负债</td>
                </tr>
                <tr>
                    <td>{{ item.currentAssets ?   numFormat(item.currentAssets) : '-'}}</td>
                    <td>{{ item.noCurrentAssets?  numFormat(item.noCurrentAssets) : '-'}}</td>
                    <td>{{ item.totalAssets?  numFormat(item.totalAssets) : '-'}}</td>
                    <td>{{ item.currentLiabilities?  numFormat(item.currentLiabilities) : '-'}}</td>
                </tr>
                <tr>
                    <td>非流动负债</td>
                    <td>负债合计</td>
                    <td>所有者权益合计</td>
                    <td>负债和所有权益合计</td>

                </tr>
                <tr>
                    <td>{{ item.noCurrentLiabilities?  numFormat(item.noCurrentLiabilities) : '-'}}</td>
                    <td>{{ item.totalLiabilities?  numFormat(item.totalLiabilities ) : '-'}}</td>
                    <td>{{ item.ownersEquity?  numFormat(item.ownersEquity) : '-'}}</td>
                    <td>{{ item.liabilitiesOwnersEquity?  numFormat(item.liabilitiesOwnersEquity ) : '-'}}</td>
                </tr>
                <tr>
                    <td>经营收入</td>
                    <td>营业成本</td>
                    <td>营业利润</td>
                    <td>所得税费用</td>

                </tr>
                <tr>
                    <td>{{ item.businessIncome?  numFormat(item.businessIncome) : '-'}}</td>
                    <td>{{ item.businessCost?  numFormat(item.businessCost) : '-'}}</td>
                    <td>{{ item.businessProfit?  numFormat(item.businessProfit ) : '-'}}</td>
                    <td>{{ item.tax?  numFormat(item.tax ) : '-'}}</td>
                </tr>
                <tr>
                    <td>净利润</td>
                    <td></td>
                    <td></td>
                    <td></td>

                </tr>
                <tr>
                    <td>{{ item.netProfit?  numFormat(item.netProfit) : '-'}}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { numFormat } from "@/filters"
export default {
    props: {
        id: [String, Number]
    },
    data () {
        return {
            list: []
        }
    },
    created () {
        this.getList(this.id)
    },
    computed: {
        getNumber (num) {
            return numFormat(num)
        }
    },
    methods: {
        getList (id) {
            this.$http('/dcp/energy/finance/info', { id }, { type: 'get' }).then(res => {
                this.list = res.data;
            });
        },
        numFormat
    }
}
</script>
<style lang="scss" scoped>
.drak {
    .title {
        font-size: 14px;
        color: #43a1ac;
        text-align: right;
        margin-bottom: 20px;
    }
}
.light {
    .title {
        font-size: 14px;
        color: #4064d4;
        text-align: right;
        margin-bottom: 20px;
    }
}
</style>
