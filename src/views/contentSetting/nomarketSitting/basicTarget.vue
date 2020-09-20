
<template>
    <!-- 企业经营指标 -->
    <div class="table-wrap">
        <div>
            <div class="tabs-title mb20">
                <span>融资信息</span>
            </div>
            <table class="table-public-detail">
                <tr>
                    <td>
                        融资渠道</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.channel" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>担保方式</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.vouchType" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>展期次数</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.rolloverNum" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>展期金额</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.rolloverAmount" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>逾期次数</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.overdueNum" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>逾期金额</td>
                    <td class="cospan">
                        <el-input v-model="params.drugCompanyFinance.overdueAmount" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt20 mb20">
                <span>企业信用信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyCreditList" border class="tab-info">
                <el-table-column prop="nowIsOverdue" label="当前贷款是否逾期" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.nowIsOverdue" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="oldIsOverdueArrears" label="过往贷款是否逾期欠息" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.oldIsOverdueArrears" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="overdueArrearsDate" label="逾期或欠息发生时间" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.overdueArrearsDate" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="overdueArrearsInfo" label="逾期欠息信息展示" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.overdueArrearsInfo" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="badInfo" label="诉讼及负面" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.badInfo" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            isAdd: false,
            params: {
                // companyName: '',
                // 企业信用信息
                drugCompanyFinance: {
                    // channel: '',
                    // vouchType: '',
                    // rolloverNum: '',
                    // rolloverAmount: '',
                    // overdueNum: '',
                    // overdueAmount: ''
                },
                drugCompanyCreditList: []
            }
        }
    },
    created () {
        if (this.$route.name === 'nomarketManageNew') {
            this.isAdd = true
        } else {
            this.isAdd = false
            this.getDetails(this.$route.query.companyId);
        }
    },
    methods: {
        // 企业经营指标
        getDetails (companyId) {
            this.$http('/dcp/query/drug/company/business/info', { companyId }, { type: 'get' }).then(res => {
                console.log('aaa', res.data)
                if (res.data.drugCompanyCreditList) {
                    this.params.drugCompanyCreditList = res.data.drugCompanyCreditList
                }
                if (res.data.drugCompanyFinance) {
                    this.params.drugCompanyFinance = res.data.drugCompanyFinance
                    console.log(this.params, 'params');
                    console.log(this.params.drugCompanyFinance, 'drugCompanyFinance');
                }
            })
        },
        toAdd (num) {
            if (num === 1) {
                this.params.drugCompanyCreditList.push(
                    {
                        nowIsOverdue: '',
                        oldIsOverdueArrears: '',
                        overdueArrearsDate: '',
                        overdueArrearsInfo: '',
                        badInfo: '',
                    }
                )
            }
        },
        toDel (num) {
            if (num === 1) {
                if (this.params.drugCompanyCreditList.length > 0) {
                    this.params.drugCompanyCreditList.splice(this.params.drugCompanyCreditList.length - 1, 1)
                    // let i = this.params.drugCompanyCreditList.length - 1
                    // this.checkRepetition(i, num)
                }
            }
        }
    }
}
</script>

