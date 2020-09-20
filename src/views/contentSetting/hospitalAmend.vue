
<template>
    <div class="stat">
        <div class="table-wrap mt15 mb30">
            <h3 class="hos-detail" v-if="isAdd">新增医院</h3>
            <h3 class="hos-detail" v-else>医院修改</h3>
            <div class="tabs-title mb20 title-date">
                <span>医院基本情况</span><span v-if="params.updateDate">保存于：{{params.updateDate}}</span>
            </div>
            <table class="table-public-detail">
                <tr>
                    <td>
                        <span>*</span>
                        医院名称</td>
                    <td>
                        <el-input v-if="isAdd" v-model="params.hospitalName" @change="checkName" clearable></el-input>
                        <el-input v-else v-model="params.hospitalName" clearable></el-input>
                    </td>
                    <td>
                        <span>*</span>
                        医院是否入池
                    </td>
                    <td>
                        <el-select v-model="params.inPool" placeholder="" clearable style="width:100%;">
                            <el-option label="是" value="是"></el-option>
                            <el-option label="否" value="否"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>医院别名</td>
                    <td>
                        <el-input v-model="params.hospitalAliasName" clearable></el-input>
                    </td>
                    <td>统一社会信用代码</td>
                    <td>
                        <el-input v-model="params.socialCreditCode" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>法定代表人</td>
                    <td>
                        <el-input v-model="params.legalRepresentative" clearable></el-input>
                    </td>
                    <td>
                        <span>*</span>
                        医院等级
                    </td>
                    <td>
                        <el-select v-model="params.hospitalLevel" placeholder="" clearable style="width:100%;">
                            <el-option label='三级甲等' value='三级甲等'></el-option>
                            <el-option label='三级乙等' value='三级乙等'></el-option>
                            <el-option label='三级丙等' value='三级丙等'></el-option>
                            <el-option label='三级未定' value='三级未定'></el-option>
                            <el-option label='二级甲等' value='二级甲等'></el-option>
                            <el-option label='二级乙等' value='二级乙等'></el-option>
                            <el-option label='二级丙等' value='二级丙等'></el-option>
                            <el-option label='二级未定' value='二级未定'></el-option>
                            <el-option label='一级甲等' value='一级甲等'></el-option>
                            <el-option label='一级乙等' value='一级乙等'></el-option>
                            <el-option label='一级丙等' value='一级丙等'></el-option>
                            <el-option label='一级未定' value='一级未定'></el-option>
                            <el-option label='未定级' value='未定级'></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>*</span>
                        医院性质
                    </td>
                    <td>
                        <el-select v-model="params.hospitalType" placeholder="" clearable style="width:100%;">
                            <el-option label="公立" value="公立"></el-option>
                            <el-option label="私立" value="私立"></el-option>
                            <el-option label="其他" value="其他"></el-option>
                        </el-select>
                    </td>
                    <td>
                        医院类型
                    </td>
                    <td>
                        <el-input v-model="params.hospitalStyle" placeholder=""></el-input>
                    </td>
                </tr>
                <tr>

                    <td>
                        是否百大医院
                    </td>
                    <td>
                        <el-input v-model="params.top100" placeholder=""></el-input>
                    </td>
                    <td>
                        百大综合排名
                    </td>
                    <td>
                        <el-input v-model="params.top100Rank" placeholder=""></el-input>
                    </td>
                </tr>
                <tr>
                    <td>
                        百大排名得分
                    </td>
                    <td>
                        <el-input v-model="params.top100RankScore" placeholder=""></el-input>
                    </td>
                    <td>
                        全国排名
                    </td>
                    <td>
                        <el-input v-model="params.nationalRank" placeholder=""></el-input>
                    </td>
                </tr>
                <tr>
                    <td>
                        当地排名
                    </td>
                    <td>
                        <el-input v-model="params.localRank" placeholder=""></el-input>
                    </td>
                    <td>
                        <span>*</span>
                        所在省份
                    </td>
                    <td>
                        <el-input v-model="params.province" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>*</span>
                        所在城市
                    </td>
                    <td>
                        <el-input v-model="params.city" clearable></el-input>
                    </td>
                    <td>
                        <span>*</span>
                        所在县
                    </td>
                    <td>
                        <el-input v-model="params.district" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>举办单位</td>
                    <td>
                        <el-input v-model="params.hostUnit" clearable></el-input>
                    </td>
                    <td>经费来源</td>
                    <td>
                        <el-input v-model="params.fundSource" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>建筑面积m²</td>
                    <td>
                        <el-input v-model="params.buildingArea" clearable></el-input>
                    </td>
                    <td>地址</td>
                    <td>
                        <el-input v-model="params.hospitalAddress" maxlength="252" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td>
                        <el-input v-model="params.linkPerson" clearable></el-input>
                    </td>
                    <td>联系电话</td>
                    <td>
                        <el-input v-model="params.linkTelephone" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>医院网址</td>
                    <td>
                        <div>
                            <el-input v-model="params.hospitalUrl" clearable></el-input>
                        </div>
                        <a href="http://www.gjsy.gov.cn/cxzl/" target="_blank">事业单位在线信息</a>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">医院领导班子</div>
            <table class="table-public-detail">
                <tr>
                    <td>院长</td>
                    <td>
                        <el-input v-model="params.hospitalDirector" clearable></el-input>
                    </td>
                    <td>副院长</td>
                    <td>
                        <el-input v-model="params.hospitalViceDirector" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>党委书记</td>
                    <td>
                        <el-input v-model="params.hospitalSecretary" clearable></el-input>
                    </td>
                    <td>其他领导</td>
                    <td>
                        <el-input v-model="params.hospitalOtherLeader" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">医院人员科室配置</div>
            <table class="table-public-detail">
                <tr>
                    <td>职工人数</td>
                    <td>
                        <el-input v-model="params.staffNumber" clearable></el-input>
                    </td>
                    <td>高级职称人数</td>
                    <td>
                        <el-input v-model="params.seniorStaffNumber" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>博硕士生人数</td>
                    <td>
                        <el-input v-model="params.doctorStaffNumber" clearable></el-input>
                    </td>
                    <td>职能科室个数</td>
                    <td>
                        <el-input v-model="params.functionDepartmentNum" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>临床科室个数</td>
                    <td>
                        <el-input v-model="params.clinicalDepartmentNum" clearable></el-input>
                    </td>
                    <td>医技科室个数</td>
                    <td>
                        <el-input v-model="params.technologyDepartmentNum" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">
                <span>医院供应商账期</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalPeriodList" border>
                <el-table-column prop="supplierName" label="供应商名称" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.supplierName" @change="checkRepetition($event, item.$index, 1)" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="drugFirstBusinessDate" label="首笔业务发生日期-药品" width="180">
                    <template slot-scope="item">
                        <el-date-picker v-model="item.row.drugFirstBusinessDate" :picker-options="pickerOptions" value-format="yyyy-MM-dd" type="date" placeholder="日期"></el-date-picker>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="drugCooperationYear" label="合作年限-药品" width="180" v-if="isAdd">
                    <template slot-scope="item">
                        <el-input v-model="item.row.drugCooperationYear" clearable></el-input>
                    </template>
                </el-table-column> -->
                <el-table-column prop="consumablesFirstBusinessDate" label="首笔业务发生日期-耗材" width="180">
                    <template slot-scope="item">
                        <el-date-picker v-model="item.row.consumablesFirstBusinessDate" :picker-options="pickerOptions" value-format="yyyy-MM-dd" type="date" placeholder="日期"></el-date-picker>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="consumablesCooperationYear" label="合作年限-耗材" width="180" v-if="isAdd">
                    <template slot-scope="item">
                        <el-input v-model="item.row.consumablesCooperationYear" clearable></el-input>
                    </template>
                </el-table-column> -->
                <el-table-column prop="equipmentFirstBusinessDate" label="首笔业务发生日期-设备" width="180">
                    <template slot-scope="item">
                        <el-date-picker v-model="item.row.equipmentFirstBusinessDate" :picker-options="pickerOptions" value-format="yyyy-MM-dd" type="date" placeholder="日期"></el-date-picker>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="equipmentCooperationYear" label="合作年限-设备" width="180" v-if="isAdd">
                    <template slot-scope="item">
                        <el-input v-model="item.row.equipmentCooperationYear" clearable></el-input>
                    </template>
                </el-table-column> -->
                <el-table-column prop="paymentType" label="回款方式" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.paymentType" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="drugPeriod" label="核定药品账期（天）" width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.drugPeriod" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="consumablesPeriod" label="核定耗材账期（天）" width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.consumablesPeriod" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="equipmentPeriod" label="核定设备账期（天）" width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.equipmentPeriod" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeRepaymentAccount" label="能否变更回款账户" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeRepaymentAccount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeTime" label="变更成功时间" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeTime" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="orgRepaymentMonitor" label="原回款账户监视功能开通" show-overflow-tooltip width="180">
                    <template slot-scope="item">
                        <el-input v-model="item.row.orgRepaymentMonitor" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="hospitalContract" label="医院合同" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.hospitalContract" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="hasCommission" label="是否有收货委托书" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.hasCommission" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="signBackEach" label="签收回执-是否每张签字" show-overflow-tooltip width="180">
                    <template slot-scope="item">
                        <el-input v-model="item.row.signBackEach" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="signBackAging" label="签收回执-收回时效" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.signBackAging" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationType" label="对账单-对账方式" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationType" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop=" reconciliationNumber" label="对账单-对账频次" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationNumber" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationDate" label="对账单-对账时间" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationDate" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationAmount" label="对账单-对账金额1" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationAmount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationAmountHospital" label="对账单-医院确认金额" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationAmountHospital" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationDifference" label="对账单-差异占比" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationDifference" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="reconciliationDifferenceReason" label="对账单-差异原因" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.reconciliationDifferenceReason" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>发票医院名称</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(2)"></span>
                    <span class="el-icon-minus" @click="toDel(2)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalInvoiceList" border>
                <el-table-column prop="hospitalInvoiceName">
                    <span slot="header">
                        <span style="color:#43a1ac;">*</span>
                        发票医院名称
                    </span>
                    <template slot-scope="item">
                        <el-input v-model="item.row.hospitalInvoiceName" @change="checkRepetition($event, item.$index, 2)" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                    <template slot-scope="item">
                        <el-input v-model="item.row.remark" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>医院经营情况</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(3)"></span>
                    <span class="el-icon-minus" @click="toDel(3)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalBusinessList" border>
                <el-table-column prop="businessYear" label="经营年份" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.businessYear" @change="checkRepetition($event, item.$index, 3)" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="outpatientVisits" label="门诊人次" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.outpatientVisits" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="hospitalizations" label="住院人次" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.hospitalizations" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="operatingTable" label="手术台次" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.operatingTable" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="bedsNum" label="定编床位数" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.bedsNum" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="openBeds" label="实际开放床位数" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.openBeds" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="supplierNumber" label="上游供应商结构和数量" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.supplierNumber" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="inventoryManagement" label="医院库存管理" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.inventoryManagement" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>医院财务情况</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(4)"></span>
                    <span class="el-icon-minus" @click="toDel(4)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalFinanceList" border>
                <el-table-column prop="financeYear" label="财务年份" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.financeYear" @change="checkRepetition($event, item.$index, 4)" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="netAssets" label="净资产（万元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.netAssets" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="totalAssets" label="总资产（万元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.totalAssets" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="totalLiability" label="总负债（万元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.totalLiability" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="businessIncome" label="业务收入（万元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.businessIncome" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>所在地经济情况</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(5)"></span>
                    <span class="el-icon-minus" @click="toDel(5)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalLocationEconomicList" border>
                <el-table-column prop="economicYear" label="经济年份" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.economicYear" @change="checkRepetition($event, item.$index, 5)" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="gdp" label="GDP（亿元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.gdp" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="revenue" label="财政收入（亿元）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.revenue" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="averagePaymentPeriod" label="平均回款账期（天）" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.averagePaymentPeriod" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>

            <div class="tabs-title mt30 mb20">
                <span>被执行人</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(6)"></span>
                    <span class="el-icon-minus" @click="toDel(6)"></span>
                </div>
            </div>
            <el-table :data="executorList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="negativeContent" label="内容" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.negativeContent" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>失信被执行人</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(7)"></span>
                    <span class="el-icon-minus" @click="toDel(7)"></span>
                </div>
            </div>
            <el-table :data="unExecutorList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="negativeContent" label="内容" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.negativeContent" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>裁判文书</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(8)"></span>
                    <span class="el-icon-minus" @click="toDel(8)"></span>
                </div>
            </div>
            <el-table :data="documentList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="negativeContent" label="内容" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.negativeContent" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt30 mb20">
                <span>负面</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(9)"></span>
                    <span class="el-icon-minus" @click="toDel(9)"></span>
                </div>
            </div>
            <el-table :data="negativeList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="negativeContent" label="内容" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.negativeContent" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="to-submit mt30">
                <el-button type="info" size="medium" @click="$router.push('/hospitalData')">取消</el-button>
                <el-button v-if="isAdd" type="primary" size="medium" style="margin-left:40px;" @click="toSubmit('save')">保存</el-button>
                <el-button type="primary" size="medium" style="margin-left:40px;" @click="toSubmit('submit')">提交</el-button>
            </div>
        </div>
        <el-dialog v-if="isDialog" :visible.sync="isDialog" width="500px" title="提示" align="center" :close-on-click-modal="false">
            <p style="color: rgba(255,255,255,0.80);">
                已存在【{{this.params.hospitalName}}】的数据名单
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="isDialog = false,toCanle()">取消重填</el-button>
                <el-button size="mini" type="primary" @click="isDialog=false,isAdd=false">前往修改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
export default {
    data () {
        return {
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now();
                }
            },
            isAdd: false,
            isCheck1: false,
            isCheck2: false,
            isCheck3: false,
            isCheck4: false,
            isCheck5: false,
            isDialog: false,
            hospitalId: '',
            executorList: [],
            unExecutorList: [],
            documentList: [],
            negativeList: [],
            params: {
                hospitalAliasName: '',
                hospitalNegativeList: [],
                updateDate: '',
                hospitalName: "",  //医院名称
                inPool: "是", //医院是否入池 
                socialCreditCode: "", //统一社会信用代码
                legalRepresentative: "", //法定代表人
                province: "", //所在省份
                city: "", //所在城市
                district: '',    //所在县
                hospitalLevel: "", // 医院等级
                hospitalType: "", // 医院性质
                hostUnit: "", // 举办单位
                fundSource: "", //经费来源
                buildingArea: "", //建筑面积m²
                hospitalAddress: "", //地址
                linkPerson: "", //联系人
                linkTelephone: "", //联系电话
                hospitalUrl: "", //医院网址
                hospitalDirector: "", //院长
                hospitalViceDirector: "", //副院长
                hospitalSecretary: "", //医院党委书记
                hospitalOtherLeader: "", //其他领导
                staffNumber: "",//职工人数
                seniorStaffNumber: "",//高级职工人数
                doctorStaffNumber: "", //博士硕士职工人数
                functionDepartmentNum: "", //职能科室个数
                clinicalDepartmentNum: "", //临床科室个数
                technologyDepartmentNum: "", //医技科室个数
                status: '', //状态[1:已保存2:已提交]
                hospitalStyle: '',
                top100: '',
                nationalRank: '',
                localRank: '',
                //医院供应商账期
                hospitalPeriodList: [
                    {
                        supplierName: "", // 供应商名称
                        drugPeriod: '', //药品账期
                        consumablesPeriod: "", //核定耗材账期
                        equipmentPeriod: "", //核定设备账期
                        reconciliation: "", //对账
                        signBack: "", //签收回执
                        changeRepaymentAccount: "",
                        changeTime: "",
                        orgRepaymentMonitor: "",
                        hospitalContract: "",
                        hasCommission: "",
                        signBackEach: "",
                        signBackAging: "",
                        reconciliationType: "",
                        reconciliationNumber: "",
                        reconciliationDate: "",
                        reconciliationAmount: "",
                        reconciliationDifference: "",
                        reconciliationDifferenceReason: "",
                        reconciliationAmountHospital: "",
                    }
                ],
                hospitalInvoiceList: [
                    {
                        hospitalInvoiceName: "", //发票医院名称
                        remark: ""  //  备注
                    }
                ],
                //医院经营情况
                hospitalBusinessList: [
                    {
                        businessYear: "", //经营年份
                        outpatientVisits: "",  // 门诊人次
                        hospitalizations: "",  // 住院人次
                        operatingTable: "",  // 手术台次
                        bedsNum: "",  // 定编床位数
                        openBeds: "",  // 实际开放床位数
                        supplierNumber: "",  // 上游供应商结构和数量
                        inventoryManagement: ""  // 库存管理
                    }
                ],
                hospitalFinanceList: [
                    {
                        financeYear: "",  // 财务年份
                        netAssets: "",  // 净资产
                        totalAssets: "",	  // 总资产
                        totalLiability: "",  // 总负债
                        businessIncome: "",  // 业务收入
                    }
                ],
                hospitalLocationEconomicList: [
                    {
                        city: "",  // 城市
                        economicYear: "",  // 经济年份
                        gdp: "",  // gdp
                        revenue: "",  // 财政收入
                        averagePaymentPeriod: ""  // 平均回款账期
                    }
                ]
            }
        }
    },
    created () {
        if (this.$route.name === 'hospitalDataAdd') {
            this.isAdd = true
            this.getNncommitted()
        } else {
            this.isAdd = false
            this.hospitalId = this.$route.query.hospitalId
            this.getDetails(this.hospitalId)
        }
    },
    methods: {
        // 获取保存未提交的数据
        getNncommitted () {
            this.$http('/dcp/query/hospital/by/user').then(res => {
                let keys = Object.keys(res)
                if (keys.includes('data')) {
                    this.params = res.data
                    console.log(res.data, 'res.data')
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
                }
            })
        },
        // 获取详情
        getDetails (hospitalId) {
            this.$http('/dcp/query/hospital/by/id', { hospitalId }, { type: 'formData' }).then(res => {
                // this.params = res.data
                let keys = Object.keys(res)
                if (keys.includes('data')) {
                    this.params = res.data
                    console.log(this.params)
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
                }
                if (!this.paramsinPool) this.paramsinPool = '是'
            })
        },
        // 改变医院名称查询是否重复
        checkName (hospitalName) {
            if (hospitalName.trim()) {
                this.$http('/dcp/query/hospital/by/name', { hospitalName }, { type: 'formData' }).then(res => {
                    if (res.data.repeat) {
                        this.isDialog = true
                        let keys = Object.keys(res)
                        if (keys.includes('data')) {
                            this.params = res.data
                        }
                    }
                })
            }
        },
        // 列表新增
        toAdd (n) {
            if (n === 1) {
                if (this.isCheck1) return this.$message.error('供应商名称存在重复')
                this.params.hospitalPeriodList.push(
                    {
                        supplierName: "", // 供应商名称
                        drugPeriod: '', //药品账期
                        consumablesPeriod: "", //核定耗材账期
                        equipmentPeriod: "", //核定设备账期
                        reconciliation: "", //对账
                        signBack: "", //签收回执
                    }
                )
            } else if (n === 2) {
                if (this.isCheck2) return this.$message.error('发票医院名称存在重复')
                this.params.hospitalInvoiceList.push(
                    {
                        hospitalInvoiceName: "", //发票医院名称
                        remark: ""
                    }
                )
            } else if (n === 3) {
                if (this.isCheck3) return this.$message.error('经营年份存在重复')
                this.params.hospitalBusinessList.push(
                    {
                        businessYear: "", //发票医院名称
                        outpatientVisits: "",  // 门诊人次
                        hospitalizations: "",  // 住院人次
                        operatingTable: "",  // 手术台次
                        bedsNum: "",  // 定编床位数
                        openBeds: ""  // 实际开放床位数
                    }
                )
            } else if (n === 4) {
                if (this.isCheck4) return this.$message.error('财务年份存在重复')
                this.params.hospitalFinanceList.push(
                    {
                        financeYear: "",  // 财务年份
                        netAssets: "",  // 净资产
                        totalAssets: "",	  // 总资产
                        totalLiability: "",  // 总负债
                        businessIncome: "",  // 业务收入
                    }
                )
            } else if (n === 5) {
                if (this.isCheck5) return this.$message.error('经济年份存在重复')
                this.params.hospitalLocationEconomicList.push(
                    {
                        city: "",  // 城市
                        economicYear: "",  // 经济年份
                        gdp: "",  // gdp
                        revenue: "",  // 财政收入
                        averagePaymentPeriod: ""  // 平均回款账期
                    }
                )
            } else if (n === 6) {
                this.executorList.push({ negativeContent: '', negativeType: 1 })
            } else if (n === 7) {
                this.unExecutorList.push({ negativeContent: '', negativeType: 2 })
            } else if (n === 8) {
                this.documentList.push({ negativeContent: '', negativeType: 3 })
            } else if (n === 9) {
                this.negativeList.push({ negativeContent: '', negativeType: 4 })
            }
        },
        // 列表删除
        toDel (n) {
            if (n === 1) {
                if (this.params.hospitalPeriodList.length > 0) {
                    this.params.hospitalPeriodList.splice(this.params.hospitalPeriodList.length - 1, 1)
                    let v = this.params.hospitalPeriodList[this.params.hospitalPeriodList.length - 1].supplierName
                    let i = this.params.hospitalPeriodList.length - 1
                    this.checkRepetition(v, i, n)
                }
            } else if (n === 2) {
                if (this.params.hospitalInvoiceList.length > 0) {
                    this.params.hospitalInvoiceList.splice(this.params.hospitalInvoiceList.length - 1, 1)
                    let v = this.params.hospitalInvoiceList[this.params.hospitalInvoiceList.length - 1].hospitalInvoiceName
                    let i = this.params.hospitalInvoiceList.length - 1
                    this.checkRepetition(v, i, n)
                }
            } else if (n === 3) {
                if (this.params.hospitalBusinessList.length > 0) {
                    this.params.hospitalBusinessList.splice(this.params.hospitalBusinessList.length - 1, 1)
                    let v = this.params.hospitalBusinessList[this.params.hospitalBusinessList.length - 1].businessYear
                    let i = this.params.hospitalBusinessList.length - 1
                    this.checkRepetition(v, i, n)
                }
            } else if (n === 4) {
                if (this.params.hospitalFinanceList.length > 0) {
                    this.params.hospitalFinanceList.splice(this.params.hospitalFinanceList.length - 1, 1)
                    let v = this.params.hospitalFinanceList[this.params.hospitalFinanceList.length - 1].financeYear
                    let i = this.params.hospitalFinanceList.length - 1
                    this.checkRepetition(v, i, n)
                }
            } else if (n === 5) {
                if (this.params.hospitalLocationEconomicList.length > 0) {
                    this.params.hospitalLocationEconomicList.splice(this.params.hospitalLocationEconomicList.length - 1, 1)
                    let v = this.params.hospitalLocationEconomicList[this.params.hospitalLocationEconomicList.length - 1].economicYear
                    let i = this.params.hospitalLocationEconomicList.length - 1
                    this.checkRepetition(v, i, n)
                }
            } else if (n === 6) {

                if (this.executorList.length > 0) {
                    this.executorList.splice(this.executorList.length - 1, 1)
                }
            } else if (n === 7) {

                if (this.unExecutorList.length > 0) {
                    this.unExecutorList.splice(this.unExecutorList.length - 1, 1)
                }
            } else if (n === 8) {

                if (this.documentList.length > 0) {
                    this.documentList.splice(this.documentList.length - 1, 1)
                }
            } else if (n === 9) {

                if (this.negativeList.length > 0) {
                    this.negativeList.splice(this.negativeList.length - 1, 1)
                }
            }
        },
        // 判断重复
        checkRepetition (v, i, n) {
            let arr = []
            if (n === 1) {
                if (this.params.hospitalPeriodList.length < 2) return this.isCheck1 = false
                arr = [...this.params.hospitalPeriodList]
                arr.splice(i, 1)
                arr = arr.map(v => v.supplierName)
                if (arr.includes(v)) {
                    this.isCheck1 = true
                    this.$message.error('供应商名称存在重复')
                } else {
                    this.isCheck1 = false
                }
            } else if (n === 2) {
                if (this.params.hospitalInvoiceList.length < 2) return this.isCheck2 = false
                arr = [...this.params.hospitalInvoiceList]
                arr.splice(i, 1)
                arr = arr.map(v => v.hospitalInvoiceName)
                if (arr.includes(v)) {
                    this.isCheck2 = true
                    this.$message.error('发票医院名称存在重复')
                } else {
                    this.isCheck2 = false
                }
            } else if (n === 3) {
                if (this.params.hospitalBusinessList.length < 2) return this.isCheck3 = false
                arr = [...this.params.hospitalBusinessList]
                arr.splice(i, 1)
                arr = arr.map(v => v.businessYear)
                if (arr.includes(v)) {
                    this.isCheck3 = true
                    this.$message.error('经营年份存在重复')
                } else {
                    this.isCheck3 = false
                }
            } else if (n === 4) {
                if (this.params.hospitalFinanceList.length < 2) return this.isCheck4 = false
                arr = [...this.params.hospitalFinanceList]
                arr.splice(i, 1)
                arr = arr.map(v => v.financeYear)
                if (arr.includes(v)) {
                    this.isCheck4 = true
                    this.$message.error('财务年份存在重复')
                } else {
                    this.isCheck4 = false
                }
            } else if (n === 5) {
                if (this.params.hospitalLocationEconomicList.length < 2) return this.isCheck5 = false
                arr = [...this.params.hospitalLocationEconomicList]
                arr.splice(i, 1)
                arr = arr.map(v => v.economicYear)
                if (arr.includes(v)) {
                    this.isCheck5 = true
                    this.$message.error('经济年份存在重复')
                } else {
                    this.isCheck5 = false
                }
            }
        },
        // 保存 or 提交
        toSubmit (type) {
            // console.log('this.isCheck1',this.isCheck1);
            if (!this.params.hospitalName) {
                return this.$message.error('医院名称不能为空')
            } else if (!this.params.inPool) {
                return this.$message.error('医院是否入池不能为空')
            } else if (!this.params.hospitalLevel) {
                return this.$message.error('医院等级不能为空')
            } else if (!this.params.hospitalType) {
                return this.$message.error('医院性质不能为空')
            } else if (!this.params.province) {
                return this.$message.error('所在省份不能为空')
            } else if (!this.params.city) {
                return this.$message.error('所在城市不能为空')
            } else if (this.isCheck1) {
                return this.$message.error('供应商名称存在重复')
            } else if (this.isCheck2) {
                return this.$message.error('发票医院名称存在重复')
            } else if (this.isCheck3) {
                return this.$message.error('经营年份存在重复')
            } else if (this.isCheck4) {
                return this.$message.error('财务年份存在重复')
            } else if (this.isCheck5) {
                return this.$message.error('经济年份存在重复')
            }
            if (this.params.inPool === '是') {
                if (this.params.hospitalInvoiceList.length === 0 || !this.params.hospitalInvoiceList[0].hospitalInvoiceName) {
                    console.log('进来')
                    return this.$message.error('发票医院名称不能为空')
                }
            }


            //  判断必须为数字
            let reg = /^[0-9]*$/
            if (this.params.staffNumber && !reg.test(this.params.staffNumber)) {
                return this.$message.error('职工人数必须为数字')
            } else if (this.params.seniorStaffNumber && !reg.test(this.params.seniorStaffNumber)) {
                return this.$message.error('高级职工人数必须为数字')
            } else if (this.params.doctorStaffNumber && !reg.test(this.params.doctorStaffNumber)) {
                return this.$message.error('博士硕士职工人数必须为数字')
            } else if (this.params.functionDepartmentNum && !reg.test(this.params.functionDepartmentNum)) {
                return this.$message.error('职能科室个数必须为数字')
            } else if (this.params.clinicalDepartmentNum && !reg.test(this.params.clinicalDepartmentNum)) {
                return this.$message.error('临床科室个数必须为数字')
            } else if (this.params.technologyDepartmentNum && !reg.test(this.params.technologyDepartmentNum)) {
                return this.$message.error('医技科室个数必须为数字')
            }

            let data = {}
            let numberArr = {}

            if (this.params.hospitalBusinessList.length > 0) {
                this.params.hospitalBusinessList.forEach((v, i) => {
                    data[i] = {
                        0: { name: v.businessYear, error: '经营年份必须为数字' },
                        // 1: { name: v.outpatientVisits, error: '门诊人次必须为数字' },
                        // 2: { name: v.hospitalizations, error: '住院人次必须为数字' },
                        // 3: { name: v.operatingTable, error: '手术台次必须为数字' },
                        // 4: { name: v.bedsNum, error: '定编床位数必须为数字' },
                        // 5: { name: v.openBeds, error: '实际开放床位数必须为数字' }
                    }
                    numberArr[i] = {
                        0: { name: v.outpatientVisits, error: '门诊人次必须为数字' },
                        1: { name: v.hospitalizations, error: '住院人次必须为数字' },
                        2: { name: v.operatingTable, error: '手术台次必须为数字' },
                        3: { name: v.bedsNum, error: '定编床位数必须为数字' },
                        4: { name: v.openBeds, error: '实际开放床位数必须为数字' }
                    }
                })
                for (const key in numberArr) {
                    for (const v in numberArr[key]) {
                        if (numberArr[key][v].name) {
                            let numberType = +(numberArr[key][v].name)
                            if (!numberType) return this.$message.error(numberArr[key][v].error)
                        }
                    }
                }

                for (const key in data) {
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                        }
                    }
                }
            }
            let reg1 = /^\d+(\.\d+)?$/  //  带小数的正则
            if (this.params.hospitalFinanceList.length > 0) {
                this.params.hospitalFinanceList.forEach((v, i) => {
                    data[i] = {
                        0: { name: v.financeYear, error: '财务年份必须为数字' },
                        1: { name: v.netAssets, error: '净资产必须为数字' },
                        2: { name: v.totalAssets, error: '总资产必须为数字' },
                        3: { name: v.totalLiability, error: '总负债必须为数字' },
                        4: { name: v.businessIncome, error: '业务收入必须为数字' },
                    }
                })
                for (const key in data) {
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (data[key][v].error === '财务年份必须为数字') {
                                if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                            } else {
                                if (!reg1.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                            }
                        }
                    }
                }
            }
            if (this.params.hospitalLocationEconomicList.length > 0) {
                this.params.hospitalLocationEconomicList.forEach((v, i) => {
                    data[i] = {
                        0: { name: v.economicYear, error: '经济年份必须为数字' },
                        1: { name: v.gdp, error: 'gdp必须为数字' },
                        2: { name: v.revenue, error: '财政收入必须为数字' },
                        3: { name: v.averagePaymentPeriod, error: '平均回款账期必须为数字' }
                    }
                })
                for (const key in data) {
                    // if (data[key][1].name){
                    //     if (!reg1.test(data[key][1].name)) return this.$message.error(data[key][1].error)
                    // }
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (data[key][v].error === 'gdp必须为数字' || data[key][v].error === '财政收入必须为数字') {
                                if (!reg1.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                            } else {
                                if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                            }
                        }
                    }
                }
            }
            this.params.hospitalLocationEconomicList.forEach(v => {
                v.city = this.params.city
            })
            if (type === 'submit') {
                if (this.isAdd) {
                    // 新增提交
                    this.params.hospitalNegativeList = [...this.executorList, ...this.unExecutorList, ...this.documentList, ...this.negativeList]
                    this.$http('/dcp/add/hospital', this.params).then(res => {
                        this.$message.success('提交成功')
                        this.$router.back()
                    })
                } else {
                    this.params.hospitalNegativeList = [...this.executorList, ...this.unExecutorList, ...this.documentList, ...this.negativeList]
                    // 修改提交
                    this.$http('/dcp/update/hospital', this.params).then(res => {
                        this.$message.success('提交成功')
                        this.$router.push('/hospitalData')
                    }).catch(err => {
                        this.$message.error(err.message)
                    })
                }
            } else {
                this.$confirm('是否需要保存当前填写内容？', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true
                }).then(() => {
                    this.params.hospitalNegativeList = [...this.executorList, ...this.unExecutorList, ...this.documentList, ...this.negativeList]
                    console.log(this.params, 'this.params')
                    this.$http('/dcp/save/hospital', this.params).then(res => {
                        this.$message.success('保存成功')
                        this.$router.back()
                    })
                }).catch(() => {
                    // this.$router.back()
                });
            }
        },
        // 取消重填
        toCanle () {
            this.params = {
                hospitalName: "",  //医院名称
                inPool: "", //医院是否入池 
                socialCreditCode: "", //统一社会信用代码
                legalRepresentative: "", //法定代表人
                province: "", //所在省份
                city: "", //所在城市
                district: '',    //所在县
                hospitalLevel: "", // 医院等级
                hospitalType: "", // 医院性质
                hostUnit: "", // 举办单位
                fundSource: "", //经费来源
                buildingArea: "", //建筑面积m²
                hospitalAddress: "", //地址
                linkPerson: "", //联系人
                linkTelephone: "", //联系电话
                hospitalUrl: "", //医院网址
                hospitalDirector: "", //院长
                hospitalViceDirector: "", //副院长
                hospitalSecretary: "", //医院党委书记
                hospitalOtherLeader: "", //其他领导
                staffNumber: "",//职工人数
                seniorStaffNumber: "",//高级职工人数
                doctorStaffNumber: "", //博士硕士职工人数
                functionDepartmentNum: "", //职能科室个数
                clinicalDepartmentNum: "", //临床科室个数
                technologyDepartmentNum: "", //医技科室个数
                status: '', //状态[1:已保存2:已提交]
                hospitalPeriodList: [
                    {
                        supplierName: "", // 供应商名称
                        drugPeriod: '', //药品账期
                        consumablesPeriod: "", //核定耗材账期
                        equipmentPeriod: "", //核定设备账期
                        reconciliation: "", //对账
                        signBack: "", //签收回执
                    }
                ],
                hospitalInvoiceList: [
                    {
                        hospitalInvoiceName: "", //发票医院名称
                        remark: ""  //  备注
                    }
                ],
                hospitalBusinessList: [
                    {
                        businessYear: "", //发票医院名称
                        outpatientVisits: "",  // 门诊人次
                        hospitalizations: "",  // 住院人次
                        operatingTable: "",  // 手术台次
                        bedsNum: "",  // 定编床位数
                        openBeds: ""  // 实际开放床位数
                    }
                ],
                hospitalFinanceList: [
                    {
                        financeYear: "",  // 财务年份
                        netAssets: "",  // 净资产
                        totalAssets: "",	  // 总资产
                        totalLiability: "",  // 总负债
                        businessIncome: "",  // 业务收入
                    }
                ],
                hospitalLocationEconomicList: [
                    {
                        city: "",  // 城市
                        economicYear: "",  // 经济年份
                        gdp: "",  // gdp
                        revenue: "",  // 财政收入
                        averagePaymentPeriod: ""  // 平均回款账期
                    }
                ]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.hos-detail {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: normal;
    margin: 0 0 20px;
}

.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(1) {
            background: #292b2f;
        }
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: rgb(193, 193, 195);
        // padding: 17px 20px;
        // min-height: 48px;
        // line-height: 16px;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
    }
}
.txt-aligning {
    td {
        text-align: left;
    }
}
.tabs-title {
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    div {
        padding-right: 20px;
        span {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            border: 1px solid #366f71;
            border-radius: 2px;
            font-size: 14px;
            cursor: pointer;
            &:last-child {
                margin-left: 10px;
            }
        }
    }
}
.title-date {
    display: flex;
    justify-content: space-between;
}
/deep/ .tab-info {
    border: 1px solid #54575c;
    // tr:last-child {
    //     td {
    //        border-bottom: 0;
    //     }
    // }
    th {
        color: rgb(154, 157, 161);
        border-right: 1px solid #54575c;
        font-weight: normal;
    }
    th.is-leaf {
        border-bottom: 1px solid #54575c;
    }
    td {
        color: rgb(203, 203, 204);
        font-weight: normal;
        border-bottom: 1px solid #54575c;
        border-right: 1px solid #54575c;
    }
}

.to-submit {
    text-align: center;
}
/deep/ .el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
    width: 100%;
    .el-input__inner {
        color: #909399 !important;
        &::-webkit-input-placeholder {
            color: #909399 !important;
        }
    }
}
</style>
