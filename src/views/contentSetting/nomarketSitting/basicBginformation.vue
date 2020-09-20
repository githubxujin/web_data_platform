<template>
    <!-- 企业相关产业背景信息 -->
    <div class="table-wrap">
        <div>
            <div class="tabs-title mb20">
                <span>仓库信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyStockList" border>
                <el-table-column prop="stcokName" align="center" label="自由/租赁仓库">
                    <template slot-scope="item">
                        <el-input v-model="item.row.stcokName" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="stockArea" label="仓库面积" width="80" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.stockArea" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="contractDate" label="租赁合同时间" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.contractDate" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="rentYear" align="center" label="年租金" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.rentYear" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="stockCost" align="center" label="仓库成本" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.stockCost" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="stockCapacity" label="仓库容量" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.stockCapacity" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="usedCapacity" label="已使用容量" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.usedCapacity" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="automaticLevel" label="仓库自动化程度" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.automaticLevel" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="logistics" label="自有/第三方物流" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.logistics" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>主要终端类型</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(2)"></span>
                    <span class="el-icon-minus" @click="toDel(2)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyTerminalList" border>
                <el-table-column prop="publicHospital" label="二级及以上公立医院" width="150" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.publicHospital" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="medicalInstitutions" label="基层医疗机构" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.medicalInstitutions" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="privateHospital" label="民营医院" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.privateHospital" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="businessCompany" label="商业公司" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.businessCompany" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="drugstore" label="药店" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.drugstore" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="other" label="其他" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.other" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>行业信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(3)"></span>
                    <span class="el-icon-minus" @click="toDel(3)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyIndustryList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="industryName" label="业内人员姓名" width="120" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.industryName" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="industryPosition" label="业内人员职位" width="120" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.industryPosition" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="industryEvaluation" label="行业评价" min-width="120" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.industryEvaluation" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="industryResources" label="行业资源" min-width="120" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.industryResources" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="selfGoodsProportion" label="近一年自营品规占比/代打款品规占比" min-width="180" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.selfGoodsProportion" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="medicareProportion" label="医保目录品种占比" min-width="120" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.medicareProportion" clearable></el-input>
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
                companyName: '',
                drugCompanyStockList: [      //  仓库信息
                    // {
                    //     stcokName: '',
                    //     stockArea: '',
                    //     contractDate: '',
                    //     rentYear: '',
                    //     stockCost: '',
                    //     stockCapacity: '',
                    //     usedCapacity: '',
                    //     automaticLevel: '',
                    //     logistics: '',
                    // }
                ],
                drugCompanyTerminalList: [         //  主要终端类型
                    // {
                    //     publicHospital: '',
                    //     medicalInstitutions: '',
                    //     privateHospital: '',
                    //     businessCompany: '',
                    //     drugstore: '',
                    //     other: ''
                    // }
                ],
                drugCompanyIndustryList: [          //  行业信息
                    // {
                    //     industryName: '',
                    //     industryPosition: '',
                    //     industryEvaluation: '',
                    //     industryResources: '',
                    //     selfGoodsProportion: '',
                    //     medicareProportion: '',
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
            this.$http('/dcp/query/drug/company/industry/info', { companyId }, { type: 'get' }).then(res => {
                this.params = res.data
                console.log(this.params);
            })
        },
        toAdd (num) {
            if (num === 1) {
                this.params.drugCompanyStockList.push(
                    {
                        stcokName: '',
                        stockArea: '',
                        contractDate: '',
                        rentYear: '',
                        stockCost: '',
                        stockCapacity: '',
                        usedCapacity: '',
                        automaticLevel: '',
                        logistics: '',
                    }
                )
            } else if (num === 2) {
                this.params.drugCompanyTerminalList.push(
                    {
                        publicHospital: '',
                        medicalInstitutions: '',
                        privateHospital: '',
                        businessCompany: '',
                        drugstore: '',
                        other: ''
                    }
                )
            } else {
                this.params.drugCompanyIndustryList.push(
                    {
                        industryName: '',
                        industryPosition: '',
                        industryEvaluation: '',
                        industryResources: '',
                        selfGoodsProportion: '',
                        medicareProportion: '',
                    }
                )
            }
        },
        toDel (num) {
            if (num === 1) {
                if (this.params.drugCompanyStockList.length > 0) {
                    this.params.drugCompanyStockList.splice(this.params.drugCompanyStockList.length - 1, 1)
                }
            } else if (num === 2) {
                if (this.params.drugCompanyTerminalList.length > 0) {
                    this.params.drugCompanyTerminalList.splice(this.params.drugCompanyTerminalList.length - 1, 1)
                }
            } else {
                if (this.params.drugCompanyIndustryList.length > 0) {
                    this.params.drugCompanyIndustryList.splice(this.params.drugCompanyIndustryList.length - 1, 1)
                }
            }

        }
    }
}
</script>


