<template>
    <div class="table-wrap mt20">
        <qg-table subtitle="医院基本情况" :title="detailData.hospitalName">
            <qg-table-column label="医院名称" width="157" column="qg-two">{{detailData.hospitalName}}</qg-table-column>
            <qg-table-column label="医院是否入池" width="157" column="qg-two">{{detailData.inPool}}</qg-table-column>
            <qg-table-column label="医院别名" width="157" column="qg-two">{{detailData.hospitalAliasName }}</qg-table-column>
            <qg-table-column label="统一社会信用代码" width="157" column="qg-two">{{detailData.socialCreditCode   }}</qg-table-column>
            <qg-table-column label="法定代表人" width="157" column="qg-two">{{detailData.legalRepresentative}}</qg-table-column>
            <qg-table-column label="医院等级" width="157" column="qg-two">{{detailData.hospitalLevel}}</qg-table-column>
            <qg-table-column label="医院性质" width="157" column="qg-two">{{detailData.hospitalType}}</qg-table-column>
            <qg-table-column label="医院类型" width="157" column="qg-two">{{detailData.hospitalStyle }}</qg-table-column>
            <qg-table-column label="是否百大医院" width="157" column="qg-two">{{detailData.top100}}</qg-table-column>
            <qg-table-column label="百大综合排名" width="157" column="qg-two">{{detailData.top100Rank}}</qg-table-column>
            <qg-table-column label="百大排名得分" width="157" column="qg-two">{{detailData.top100RankScore}}</qg-table-column>
            <qg-table-column label="全国排名" width="157" column="qg-two">{{detailData.nationalRank}}</qg-table-column>
            <qg-table-column label="当地排名" width="157" column="qg-two">{{detailData.localRank}}</qg-table-column>
            <qg-table-column label="所在省份" width="157" column="qg-two">{{detailData.province}}</qg-table-column>
            <qg-table-column label="所在城市" width="157" column="qg-two">{{detailData.city}}</qg-table-column>
            <qg-table-column label="所在县" width="157" column="qg-two">{{detailData.district}}</qg-table-column>
            <qg-table-column label="举办单位" width="157" column="qg-two">{{detailData.hostUnit}}</qg-table-column>
            <qg-table-column label="经费来源" width="157" column="qg-two">{{detailData.fundSource}}</qg-table-column>
            <qg-table-column label="建筑面积m²" width="157" column="qg-two">{{detailData.buildingArea}}</qg-table-column>
            <qg-table-column label="联系人" width="157" column="qg-two">{{detailData.linkPerson}}</qg-table-column>
            <qg-table-column label="联系电话" width="157" column="qg-two">{{detailData.linkTelephone}}</qg-table-column>
            <qg-table-column label="地址" width="157" column="qg-two">{{detailData.hospitalAddress}}</qg-table-column>
            <qg-table-column label="医院网址" width="157" :more="true">
                <div class="to-links">
                    {{detailData.hospitalUrl}}
                    <a href="http://www.gjsy.gov.cn/cxzl/" class="ml60">事业单位在线信息</a>
                </div>
            </qg-table-column>
        </qg-table>

        <qg-table subtitle="医院领导班子" class="pt20">
            <qg-table-column label="院长" width="157" column="qg-two">{{detailData.hospitalDirector }}</qg-table-column>
            <qg-table-column label="副院长" width="157" column="qg-two">{{detailData.hospitalViceDirector}}</qg-table-column>
            <qg-table-column label="党委书记" width="157" column="qg-two">{{detailData.hospitalSecretary  }}</qg-table-column>
            <qg-table-column label="其他领导" width="157" column="qg-two">{{detailData.hospitalSecretary}}</qg-table-column>
        </qg-table>

        <qg-table subtitle="医院人员科室配置" class="pt20">
            <qg-table-column label="职工人数" width="157" column="qg-two">{{detailData.staffNumber }}</qg-table-column>
            <qg-table-column label="高级职称人数" width="157" column="qg-two">{{detailData.seniorStaffNumber}}</qg-table-column>
            <qg-table-column label="博硕士生人数" width="157" column="qg-two">{{detailData.doctorStaffNumber  }}</qg-table-column>
            <qg-table-column label="职能科室个数" width="157" column="qg-two">{{detailData.functionDepartmentNum }}</qg-table-column>
            <qg-table-column label="临床科室个数" width="157" column="qg-two">{{detailData.clinicalDepartmentNum }}</qg-table-column>
            <qg-table-column label="医技科室个数" width="157" column="qg-two">{{detailData.technologyDepartmentNum }}</qg-table-column>
        </qg-table>

        <div class="tabs-title mt20 mb20">医院供应商账期</div>
        <el-table :data="detailData.hospitalPeriodList" border>
            <el-table-column prop="supplierName" label="供应商名称" show-overflow-tooltip width="100">
                <template slot-scope="item">
                    {{item.row.supplierName ? item.row.supplierName : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="drugFirstBusinessDate" label="首笔业务发生日期-药品" :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="drugCooperationYear" label="合作年限-药品" width="180" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="consumablesFirstBusinessDate" label="首笔业务发生日期-耗材" :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="consumablesCooperationYear" label="合作年限-耗材" :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="equipmentFirstBusinessDate" label="首笔业务发生日期-设备" :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="equipmentCooperationYear" label="合作年限-设备" :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="paymentType" label="回款方式" show-overflow-tooltip width="80">
                <template slot-scope="item">
                    {{item.row.paymentType ? item.row.paymentType : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="drugPeriod" label="核定药品账期（天）" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.drugPeriod ? item.row.drugPeriod : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="consumablesPeriod" label="核定耗材账期（天）" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.consumablesPeriod ? item.row.consumablesPeriod : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="equipmentPeriod" label="核定设备账期（天）" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.equipmentPeriod ? item.row.equipmentPeriod : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="changeRepaymentAccount" label="能否变更回款账户" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.changeRepaymentAccount ? item.row.changeRepaymentAccount : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="changeTime" label="变更成功时间" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.changeTime ? item.row.changeTime : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="orgRepaymentMonitor" label="原回款账户监视功能开通" show-overflow-tooltip width="180">
                <template slot-scope="item">
                    {{item.row.orgRepaymentMonitor ? item.row.orgRepaymentMonitor : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="hospitalContract" label="医院合同" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.hospitalContract ? item.row.hospitalContract : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="hasCommission" label="是否有收货委托书" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.hasCommission ? item.row.hasCommission : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="signBackEach" label="签收回执-是否每张签字" show-overflow-tooltip width="180">
                <template slot-scope="item">
                    {{item.row.signBackEach ? item.row.signBackEach : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="signBackAging" label="签收回执-收回时效" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.signBackAging ? item.row.signBackAging : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationType" label="对账单-对账方式" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationType ? item.row.reconciliationType : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop=" reconciliationNumber" label="对账单-对账频次" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationNumber ? item.row.reconciliationNumber : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationDate" label="对账单-对账时间" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationDate ? item.row.reconciliationDate : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationAmount" label="对账单-对账金额" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationAmount ? item.row.reconciliationAmount : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationAmountHospital" label="对账单-医院确认金额" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationAmountHospital ? item.row.reconciliationAmountHospital : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationDifference" label="对账单-差异占比" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationDifference ? item.row.reconciliationDifference : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="reconciliationDifferenceReason" label="对账单-差异原因" show-overflow-tooltip width="160">
                <template slot-scope="item">
                    {{item.row.reconciliationDifferenceReason ? item.row.reconciliationDifferenceReason : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">发票医院名称</div>
        <el-table :data="detailData.hospitalInvoiceList" border>
            <el-table-column prop="hospitalInvoiceName" label="发票医院名称">
                <template slot-scope="item">
                    {{item.row.hospitalInvoiceName ? item.row.hospitalInvoiceName : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
                <template slot-scope="item">
                    {{item.row.remark ? item.row.remark : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">医院经营情况</div>
        <el-table :data="detailData.hospitalBusinessList" border>
            <el-table-column prop="businessYear" label="经营年份" align="center">
                <template slot-scope="item">
                    {{item.row.businessYear ? item.row.businessYear : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="outpatientVisits" label="门诊人次" align="center">
                <template slot-scope="item">
                    {{item.row.outpatientVisits ? item.row.outpatientVisits : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="hospitalizations" label="住院人次" align="center">
                <template slot-scope="item">
                    {{item.row.hospitalizations ? item.row.hospitalizations : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="operatingTable" label="手术台次" align="center">
                <template slot-scope="item">
                    {{item.row.operatingTable ? item.row.operatingTable : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="bedsNum" label="定编床位数" align="center">
                <template slot-scope="item">
                    {{item.row.bedsNum ? item.row.bedsNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="openBeds" label="实际开放床位数" align="center">
                <template slot-scope="item">
                    {{item.row.openBeds ? item.row.openBeds : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="supplierNumber" label="上游供应商结构和数量" align="center">
                <template slot-scope="item">
                    {{item.row.supplierNumber ? item.row.supplierNumber : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="inventoryManagement" label="医院库存管理" align="center">
                <template slot-scope="item">
                    {{item.row.inventoryManagement ? item.row.inventoryManagement : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">医院财务情况</div>
        <el-table :data="detailData.hospitalFinanceList" border>
            <el-table-column prop="financeYear" label="财务年份" align="center">
                <template slot-scope="item">
                    {{item.row.financeYear ? item.row.financeYear : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="netAssets" label="净资产（万元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.netAssets">
                        {{item.row.netAssets | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.netAssets ? (item.row.netAssets | numFormat) : '-'}} -->
                </template>
            </el-table-column>
            <el-table-column prop="totalAssets" label="总资产（万元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.totalAssets">
                        {{item.row.totalAssets | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.totalAssets ? (item.row.totalAssets | numFormat) : '-'}} -->
                </template>
            </el-table-column>
            <el-table-column prop="totalLiability" label="总负债（万元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.totalLiability">
                        {{item.row.totalLiability | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.totalLiability ? (item.row.totalLiability | numFormat) : '-'}} -->
                </template>
            </el-table-column>
            <el-table-column prop="businessIncome" label="业务收入（万元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.businessIncome">
                        {{item.row.businessIncome | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.businessIncome ? (item.row.businessIncome | numFormat) : '-'}} -->
                </template>
            </el-table-column>
        </el-table>
        <div class="tabs-title mt20 mb20">所在地经济情况</div>
        <el-table :data="detailData.hospitalLocationEconomicList" border>
            <el-table-column prop="economicYear" label="经济年份" align="center">
                <template slot-scope="item">
                    {{item.row.economicYear ? item.row.economicYear : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="gdp" label="GDP（亿元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.gdp">
                        {{item.row.gdp | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.gdp ? (item.row.gdp | numFormat) : '-'}} -->
                </template>
            </el-table-column>
            <el-table-column prop="revenue" label="财政收入（亿元）" align="center">
                <template slot-scope="item">
                    <span v-if="item.row.revenue">
                        {{item.row.revenue | numFormat}}
                    </span>
                    <span v-else>-</span>
                    <!-- {{item.row.revenue ? (item.row.revenue | numFormat) : '-'}} -->
                </template>
            </el-table-column>
            <el-table-column prop="averagePaymentPeriod" label="平均回款账期（天）" align="center">
                <template slot-scope="item">
                    {{item.row.averagePaymentPeriod ? item.row.averagePaymentPeriod : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <div class="mt20" style="text-align:center;" v-if="$route.name === 'hospitalDataDetail'">
            <el-button type="primary" @click="$router.push({path:'/hospitalDataAmend', query:{hospitalId:detailData.id}})">编辑</el-button>
        </div>
        <div class="tabs-title mt20 ">诉讼及负面</div>
        <el-tabs type='border-card'>
            <el-tab-pane label='被执行人'>
                <div class="pt20 "></div>
                <el-table :data="executorList" border>
                    <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                    <el-table-column prop="negativeContent" label="内容" align="center">

                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label='失信被执行人'>
                <div class="pt20 "></div>
                <el-table :data="unExecutorList" border>
                    <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                    <el-table-column prop="negativeContent" label="内容" align="center">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label='裁判文书'>
                <div class="pt20 "></div>
                <el-table :data="documentList" border>
                    <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                    <el-table-column prop="negativeContent" label="内容" align="center">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label='负面'>
                <div class="pt20 "></div>
                <el-table :data="negativeList" border>
                    <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                    <el-table-column prop="negativeContent" label="内容" align="center">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { negativeTypeLabel } from "@/utils/common"
export default {

    data () {
        return {
            executorList: [],
            unExecutorList: [],
            documentList: [],
            negativeList: [],
            contactList: [],
            params: {
                hospitalId: ''
            },
            detailData: {
                hospitalName: '', //医院名称
                inPool: '', //医院是否入池
                socialCreditCode: '', //统一社会信用代码
                legalRepresentative: '', //法定代表人
                province: '', //所在省份
                city: '', //所在城市
                hospitalLevel: '', // 医院等级
                hospitalType: '', // 医院性质
                hostUnit: '', // 举办单位
                fundSource: '', //经费来源
                buildingArea: '', //建筑面积m²
                hospitalAddress: '', //地址
                linkPerson: '', //联系人
                linkTelephone: '', //联系电话
                hospitalUrl: '', //医院网址
                hospitalDirector: '', //院长
                hospitalViceDirector: '', //副院长
                hospitalSecretary: '', //医院党委书记
                hospitalOtherLeader: '', //其他领导
                staffNumber: '', //职工人数
                seniorStaffNumber: '', //高级职工人数
                doctorStaffNumber: '', //博士硕士职工人数
                functionDepartmentNum: '', //职能科室个数
                clinicalDepartmentNum: '', //临床科室个数
                technologyDepartmentNum: '', //医技科室个数
                status: 2, //状态[1:已保存2:已提交]
                hospitalPeriodList: [
                    {
                        supplierName: '', // 供应商名称
                        drugPeriod: '', //药品账期
                        consumablesPeriod: '', //核定耗材账期
                        equipmentPeriod: '', //核定设备账期
                        reconciliation: '', //对账
                        signBack: '' //签收回执
                    }
                ],
                hospitalInvoiceList: [
                    {
                        hospitalInvoiceName: '', //发票医院名称
                        remark: '' //  备注
                    }
                ],
                hospitalBusinessList: [
                    {
                        businessYear: '', //发票医院名称
                        outpatientVisits: '', //  门诊人次
                        hospitalizations: '', // 住院人次
                        operatingTable: '', // 手术台次
                        bedsNum: '', //定编床位数
                        openBeds: '' //  实际开放床位数
                    }
                ],
                hospitalFinanceList: [
                    {
                        financeYear: '', //  财务年份
                        netAssets: '', //  净资产
                        totalAssets: '', //  总资产
                        totalLiability: '', //  总负债
                        businessIncome: '' //  业务收入
                    }
                ],
                hospitalLocationEconomicList: [
                    {
                        city: '', //  城市
                        economicYear: '', //  经济年份
                        gdp: '', //  gdp
                        revenue: '', //  财政收入
                        averagePaymentPeriod: '' //  平均回款账期
                    }
                ]
            }
        }
    },
    created () {
        this.params.hospitalId = this.$route.query.hospitalId
        this.getDetail()
    },
    methods: {

        getDetail () {
            this.$http('/dcp/query/hospital/by/id', this.params, {
                type: 'formData'
            }).then(res => {
                this.detailData = res.data
                console.log(res.data, 'data')
                res.data.hospitalNegativeList.forEach(i => {
                    if (i.negativeType === 1) {
                        this.executorList.push(i)
                    }
                    if (i.negativeType === 2) {
                        this.unExecutorList.push(i)
                    }
                    if (i.negativeType === 3) {
                        this.documentList.push(i)
                    }
                    if (i.negativeType === 4) {
                        this.negativeList.push(i)
                    }
                })
            })
        },
        negativeTypeLabel
    }
}
</script>



