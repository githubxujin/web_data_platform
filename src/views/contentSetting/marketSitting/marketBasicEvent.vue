
<template>
    <!-- 业内重大事件或舆情 -->
    <div class="table-wrap">
        <div class="mb30">
            <div class="tabs-title mb20">
                <span>企业相关重大事件或舆情</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.hospitalPeriodList" border class="tab-info">
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="paymentType" align="center" label="舆情分类" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.paymentType" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeRepaymentAccount" label="标题" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeRepaymentAccount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="changeTime" label="预警时间" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.changeTime" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="orgRepaymentMonitor" align="center" label="操作" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.orgRepaymentMonitor" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="to-submit mt30">
                <el-button type="primary" size="medium" @click="$router.push('/hospitalData')">取消</el-button>
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
                return this.$message.error('企业类型不能为空')
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
            if (this.params.hospitalInvoiceList.length === 0 || !this.params.hospitalInvoiceList[0].hospitalInvoiceName) {
                return this.$message.error('发票医院名称不能为空')
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
            if (this.params.hospitalBusinessList.length > 0) {
                this.params.hospitalBusinessList.forEach((v, i) => {
                    data[i] = {
                        0: { name: v.businessYear, error: '经营年份必须为数字' },
                        1: { name: v.outpatientVisits, error: '门诊人次必须为数字' },
                        2: { name: v.hospitalizations, error: '住院人次必须为数字' },
                        3: { name: v.operatingTable, error: '手术台次必须为数字' },
                        4: { name: v.bedsNum, error: '定编床位数必须为数字' },
                        5: { name: v.openBeds, error: '实际开放床位数必须为数字' }
                    }
                })
                for (const key in data) {
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
                        }
                    }
                }
            }
            if (this.params.hospitalFinanceList.length > 0) {
                this.params.hospitalFinanceList.forEach((v, i) => {
                    data[i] = {
                        0: { name: v.financeYear, error: '财务年份必须为数字' },
                        1: { name: v.netAssets, error: '净资产必须为数字' },
                        2: { name: v.totalAssets, error: '总资产必须为数字' },
                        3: { name: v.totalLiability, error: '总负债必须为数字' },
                        4: { name: v.businessIncome, error: '业务收入必须为数字' }
                    }
                })
                for (const key in data) {
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
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
                    for (const v in data[key]) {
                        if (data[key][v].name) {
                            if (!reg.test(data[key][v].name)) return this.$message.error(data[key][v].error)
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
.hos-detail {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: normal;
    margin: 0 0 20px;
}
.table-public-detail {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        width: 1000px;
        justify-content: space-between;
        background: rgb(35, 37, 40);
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
        td {
            color: rgb(193, 193, 195);
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            box-sizing: border-box;
            border-right: 1px solid #54575c;
            border-bottom: 1px solid #54575c;
            position: relative;
            &:nth-child(odd) {
                width: 180px;
                border-right: 0;
                background: #292b2f;
            }
            &:nth-of-type(2) {
                border-right: 0;
            }
            &:last-child {
                border-right: 0;
            }
            span {
                position: absolute;
                left: 10px;
                top: 24px;
                color: #43a1ac;
                line-height: 6px;
            }

            /deep/ .el-input.is-disabled .el-input__inner {
                color: #fff;
                opacity: 0.5;
            }
        }
        .cospan {
            width: calc(100% - 150px);
            display: flex;
            div {
                width: 459px;
            }
            a {
                width: 120px;
                margin-left: 25px;
                text-decoration: underline;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
            }
        }
    }
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
    color: #43a1ac;
    line-height: 22px;
    display: flex;
    justify-content: space-between;
    font-family: PingFangSC-Light;
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
</style>
