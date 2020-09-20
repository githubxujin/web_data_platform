<template>
    <!-- 实际控制人信用状况 -->
    <div class="table-wrap">
        <div>
            <div class="tabs-title mb20">
                <span>实控人基本信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyControlList" border>
                <el-table-column prop="name" align="center" label="实控人名称" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.idCard" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="marital" label="婚姻状况" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.marital" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="child" align="center" label="子女情况" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.child" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="startYear" align="center" label="进入行业年份" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.startYear" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="workYear" label="从业年份" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.workYear" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>实控人征信信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(2)"></span>
                    <span class="el-icon-minus" @click="toDel(2)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyControlCreditList" border>
                <el-table-column prop="name" label="实控人名称" width="100" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
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
                <el-table-column prop="recentLoanNum" label="近6个月贷款审批查询次数" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.recentLoanNum" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>实控人负面信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(3)"></span>
                    <span class="el-icon-minus" @click="toDel(3)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyControlBadList" border>
                <el-table-column prop="name" label="实控人名称" width="100" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="privateLoan" label="民间借贷" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.privateLoan" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="badHabits" label="不良嗜好" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.badHabits" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="negative" label="重大负面" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.negative" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="executedPerson" label="被执行人" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.executedPerson" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="dishonestyPerson" label="失信被执行人" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.dishonestyPerson" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="antiFraud" label="反欺诈" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.antiFraud" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="litigationInfo" label="被执行人等诉讼信息" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.litigationInfo" clearable></el-input>
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
                drugCompanyControlList: [      //  实控人基本信息
                    // {
                    //     name: '',
                    //     idCard: '',
                    //     marital: '',
                    //     child: '',
                    //     startYear: '',
                    //     workYear: ''
                    // }
                ],
                drugCompanyControlCreditList: [         //  实控人征信信息
                    // {
                    //     name: '',
                    //     nowIsOverdue: '',
                    //     oldIsOverdueArrears: '',
                    //     overdueArrearsDate: '',
                    //     overdueArrearsInfo: '',
                    //     recentLoanNum: ''
                    // }
                ],
                drugCompanyControlBadList: [          //  实控人负面信息
                    // {
                    //     name: '',
                    //     privateLoan: '',
                    //     badHabits: '',
                    //     negative: '',
                    //     executedPerson: '',
                    //     dishonestyPerson: '',
                    //     antiFraud: '',
                    //     litigationInfo: '',
                    // }
                ]
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
        // 获取实控人信息
        getDetails (companyId) {
            this.$http('/dcp/query/drug/company/control/info', { companyId }, { type: 'get' }).then(res => {
                this.params = res.data
                console.log(this.params);
            })
        },
        toAdd (num) {
            if (num === 1) {
                this.params.drugCompanyControlList.push(
                    {
                        name: '',
                        idCard: '',
                        marital: '',
                        child: '',
                        startYear: '',
                        workYear: ''
                    }
                )
            } else if (num === 2) {
                this.params.drugCompanyControlCreditList.push(
                    {
                        name: '',
                        nowIsOverdue: '',
                        oldIsOverdueArrears: '',
                        overdueArrearsDate: '',
                        overdueArrearsInfo: '',
                        recentLoanNum: ''
                    }
                )
            } else {
                this.params.drugCompanyControlBadList.push(
                    {
                        name: '',
                        privateLoan: '',
                        badHabits: '',
                        negative: '',
                        executedPerson: '',
                        dishonestyPerson: '',
                        antiFraud: '',
                        litigationInfo: '',
                    }
                )
            }
        },
        toDel (num) {
            if (num === 1) {
                if (this.params.drugCompanyControlList.length > 0) {
                    this.params.drugCompanyControlList.splice(this.params.drugCompanyControlList.length - 1, 1)

                }
            } else if (num === 2) {
                if (this.params.drugCompanyControlCreditList.length > 0) {
                    this.params.drugCompanyControlCreditList.splice(this.params.drugCompanyControlCreditList.length - 1, 1)

                }
            } else {
                if (this.params.drugCompanyControlBadList.length > 0) {
                    this.params.drugCompanyControlBadList.splice(this.params.drugCompanyControlBadList.length - 1, 1)

                }
            }

        }
    }
}
</script>

