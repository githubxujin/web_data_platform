<template>
    <div>
        <div v-if="!isShow">
            <div class="tabs-title mb20 pt20">业务贡献</div>
            <table class="table-three">
                <tr>
                    <td>融资金额合计</td>
                    <td>
                        <div v-if="isShow">
                            <el-input v-model="params.totalAmount" clearable></el-input>
                        </div>
                        <div v-else>
                            <!-- {{params.totalAmount ? params.totalAmount : '-'}} -->
                            <span v-if="params.totalAmount">{{params.totalAmount | numFormat}}</span>
                            <span v-else>-</span>
                        </div>
                    </td>
                    <td>与我司的业务次数</td>
                    <td>
                        <div v-if="isShow">
                            <el-input v-model="params.businessNumber" clearable></el-input>
                        </div>
                        <div v-else>{{params.businessNumber ? params.businessNumber : '-'}}</div>
                    </td>
                    <td>平均每笔融资金额</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>账期天数</td>
                    <td>
                        <div v-if="isShow">
                            <el-input v-model="params1.paymentDays" clearable></el-input>
                        </div>
                        <div v-else>{{params1.paymentDays ? params1.paymentDays : '-'}}</div>
                    </td>
                    <td>实际平均账期天数</td>
                    <td>
                        <div v-if="isShow">
                            <el-input v-model="params1.avgPaymentDays" clearable></el-input>
                        </div>
                        <div v-else>{{params1.avgPaymentDays ? params1.avgPaymentDays : '-'}}</div>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <el-table :data="list" border class="tab-info mt20">
                <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.supplierName ? item.row.supplierName : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="financingAmount" label="融资金额" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span v-if="item.row.financingAmount">{{ item.row.financingAmount | numFormat}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="materialType" label="材料类型" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.materialType ? item.row.materialType : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="cooperationCount" label="合作次数" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.cooperationCount ? item.row.cooperationCount : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="pastFinancingEvaluate" label="过往融资评价" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.pastFinancingEvaluate ? item.row.pastFinancingEvaluate : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="performanceAssort" label="履约配合程度" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{item.row.performanceAssort ? item.row.performanceAssort : '-'}}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="120" align="center" fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click="$router.push({path:'/supplierDetail', query:{companyName:item.row.supplierName}})">客户详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">展期情况</div>
            <table class="table-three">
                <tr>
                    <td>供应商名称</td>
                    <td>-</td>
                    <td>拨款金额</td>
                    <td>-</td>
                    <td>原到期日</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>展期金额</td>
                    <td>-</td>
                    <td>展期天数</td>
                    <td>-</td>
                    <td>对应产值区间</td>
                    <td>-</td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">逾期情况</div>
            <table class="table-three">
                <tr>
                    <td>供应商名称</td>
                    <td>-</td>
                    <td>拨款金额</td>
                    <td>-</td>
                    <td>原到期日</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>逾期金额</td>
                    <td>-</td>
                    <td>逾期天数</td>
                    <td>-</td>
                    <td>对应产值区间</td>
                    <td>-</td>
                </tr>
            </table>
        </div>
        <div v-else>
            <div class="tabs-title mt30 mb20">
                <span>业务贡献</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd"></span>
                    <span class="el-icon-minus" @click="toDel"></span>
                </div>
            </div>
            <el-table :data="list" border class="tab-info mt20">
                <el-table-column type="index" label="序号" width="70" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.supplierName" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="financingAmount" label="融资金额" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.financingAmount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="materialType" label="材料类型" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.materialType" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="cooperationCount" label="合作次数" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.cooperationCount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="pastFinancingEvaluate" label="过往融资评价" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.pastFinancingEvaluate" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="performanceAssort" label="履约配合程度" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.performanceAssort" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    props: ['projectId'],
    data () {
        return {
            isShow: false,
            params: {
                businessNumber: '',
                totalAmount: '',

            },
            params1: {
                paymentDays: '',    //账期天数
                avgPaymentDays: ''  //实际平均账期天数
            },
            projectName: '',
            list: []
        }
    },
    created () {
        this.projectName = JSON.parse(this.$route.query.item).projectName
        if (this.$route.name === 'projectCompile') this.isShow = true
        this.getDetail(this.projectId)
        this.getBusiness(this.projectName)
    },
    methods: {
        getDetail (id) {
            this.$http('/dcp/select/project/Business', { id }, { type: 'get' }).then(res => {
                this.list = res.data
            })
        },
        getBusiness (projectName) {
            this.$http('/ledger/dataCenter/getCompositiveInfo', { projectName }).then(res => {
                this.params = res.data
            })
            this.$http('/riskCredit/dataCenter/queryPaymentDays', { projectName }).then(res => {
                this.params1 = res.data
            })
        },
        toAdd () {
            this.list.push(
                {
                    address: "",
                    affiliation: "",
                    department: "",
                    gender: "",
                    mobilePhone: "",
                    name: "",
                    officePhone: "",
                    position: ""
                }
            )
        },
        toDel () {
            this.list.splice(this.list.length - 1, 1)
        },
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
