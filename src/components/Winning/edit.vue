<template>
    <div class="table-wrap mt20">
        <el-form :model="info" :rules="rules" ref="ruleForm">
            <table class="table-public-detail">
                <tr>
                    <td><span>*</span>部门</td>
                    <td>
                        <el-form-item prop="department">
                            <el-select v-model="info.department" style="width: 100%" filterable clearable placeholder="请选择" @change="deparmentChange">
                                <el-option v-for="(val,i) in departmentOptions" :key="i" :label="val.label" :value="val.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </td>
                    <td>数据渠道</td>
                    <td>
                        <el-select v-model="info.channel" filterable style="width: 100%" placeholder="请选择">
                            <el-option v-for="(val,i) in sourceOptions" :key="i" :label="val.label" :value="val.value"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>编号</td>
                    <td>

                        <el-input v-model="info.serialNumber" style="width: 100%" maxlength="100" placeholder clearable></el-input>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">招标方信息</div>
            <table class="table-public-detail">
                <tr>
                    <td><span>*</span>招标方</td>
                    <td>
                        <el-form-item prop="tender">
                            <el-input v-model="info.tender" clearable></el-input>
                        </el-form-item>
                    </td>
                    <td>招标方地址</td>
                    <td>
                        <el-input v-model="info.tenderAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td>
                        <el-input v-model="info.tenderContact" clearable></el-input>
                    </td>
                    <td>联系电话</td>
                    <td>
                        <el-input v-model="info.tenderPhone" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系邮箱</td>
                    <td>
                        <el-input v-model="info.tenderEmail" clearable></el-input>
                    </td>
                    <td><span>*</span>招标日期</td>
                    <td>
                        <el-form-item prop="tenderDate">

                            <el-date-picker v-model="info.tenderDate" type="date" clearable placeholder="选择日期" style="width: 489px" value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">项目信息</div>
            <table class="table-public-detail">
                <tr>
                    <td><span>*</span>招标项目编号</td>
                    <td>
                        <el-form-item prop="projectNo">
                            <el-input v-model="info.projectNo" clearable></el-input>
                        </el-form-item>
                    </td>
                    <td><span>*</span>招标项目名称
                    </td>
                    <td>
                        <el-form-item prop="projectName">
                            <el-input v-model="info.projectName" clearable></el-input>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>项目地址</td>
                    <td>
                        <el-input v-model="info.projectAddress" clearable></el-input>
                    </td>
                    <td>业主</td>
                    <td>
                        <el-input v-model="info.businessOwner" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>供货数量/金额</td>
                    <td>
                        <el-input v-model="info.supplyQuantityAmount" clearable></el-input>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>项目概况</td>
                    <td colspan="3">
                        <!-- <el-input type="textarea" clearable v-model="info.projectOverview" :show-word-limit='true' :rows="1" style="height: 36px;"></el-input> -->
                        <el-input v-model="info.projectOverview" maxlength="252" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">招标组织单位信息</div>
            <table class="table-public-detail">
                <tr>
                    <td>招标组织单位</td>
                    <td>
                        <el-input v-model="info.tenderOrg" clearable></el-input>
                    </td>
                    <td>地址
                    </td>
                    <td>
                        <el-input v-model="info.tenderOrgAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系人</td>
                    <td>
                        <el-input v-model="info.tenderOrgContact" clearable></el-input>
                    </td>
                    <td>联系电话</td>
                    <td>
                        <el-input v-model="info.tenderOrgPhone" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>联系邮箱</td>
                    <td>
                        <el-input v-model="info.tenderOrgEmail" clearable></el-input>
                    </td>
                    <td> 招标信息格式</td>
                    <td>
                        <el-input v-model="info.informationFormat" clearable></el-input>
                    </td>
                </tr>

            </table>

            <div class="tabs-title mt30 mb20">
                <span>中标方信息</span>

                <div>
                    <span class="el-icon-plus" @click="addItem()"></span>
                    <span class="el-icon-minus" @click="delItem()"></span>
                </div>
            </div>
            <div class="n-date">
                <el-form-item label="中标日期" prop="bidDate">
                    <el-date-picker v-model="info.bidDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

            </div>
            <el-table :data='info.bidderList' border>
                <el-table-column type='materialName' label='招标材料' width='200' align='center'>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.materialName`" label-width="0px" :rules="{required: true, message: '请选择或填写',trigger: 'submit'}">
                            <el-select v-model="scope.row.materialName" remote :remote-method="remoteMethod" multiple filterable allow-create class="selectVal" placeholder="请选择或填写" style="width:100%">
                                <el-option v-for="(val,i) in materialData" :key="i" :label="val" :value="val" class="zz"></el-option>
                            </el-select>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='packageNum' label='包件号' show-overflow-tooltip align='center'>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.packageNum`" label-width="0px">
                            <el-input v-model="scope.row.packageNum" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='orderBy' label='顺位' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.orderBy`" label-width="0px" :rules="{required: true, message: '请填写顺位',trigger: 'submit'}">
                            <el-input v-model="scope.row.orderBy" maxlength="100" clearable @change="sortBlur($event,scope.row)"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidder' label='中标方' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidder`" label-width="0px" :rules="{required: true, message: '请填写中标方',trigger: 'submit'}">
                            <el-input v-model="scope.row.bidder" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidPrice' label=' 投标报价(元)' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidPrice`" label-width="0px">
                            <money-input v-model="scope.row.bidPrice"></money-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidderAddress' label='中标方地址' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidderAddress`" label-width="0px">
                            <el-input v-model="scope.row.bidderAddress" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidderContact' label='中标方联系人' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidderContact`" label-width="0px">
                            <el-input v-model="scope.row.bidderContact" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidderPhone' label='中标方联系电话' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidderPhone`" label-width="0px">
                            <el-input v-model="scope.row.bidderPhone" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop='bidderEmail' label='中标方联系邮箱' show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-form-item :prop="`bidderList.${scope.$index}.bidderEmail`" label-width="0px">
                            <el-input v-model="scope.row.bidderEmail" maxlength="100" clearable placeholder></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt20" style="text-align: center;">
                <el-button type="info" @click="goBack()">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import MoneyInput from './moneyInput'
import { sourceOptions, fromOptions, deepClone } from '@/utils/common'
export default {
    props: {
        way: String
    },
    components: {
        MoneyInput
    },
    data () {
        return {
            // 部门
            departmentOptions: [],
            info: {
                department: '',
                channel: '',
                serialNumber: '',
                tender: '',
                tenderContact: '',
                tenderEmail: '',
                tenderAddress: '',
                tenderPhone: '',
                tenderDate: '',
                projectNo: '',
                projectAddress: '',
                supplyQuantityAmount: '',
                projectName: '',
                businessOwner: '',
                projectOverview: '',
                tenderOrg: '',
                tenderOrgContact: '',
                tenderOrgEmail: '',
                tenderOrgAddress: '',
                tenderOrgPhone: '',
                informationFormat: '',
                bidDate: '',
                bidderList: [
                    {
                        materialName: '',
                        packageNum: '',
                        orderBy: '',
                        bidder: '',
                        bidPrice: '',
                        bidderAddress: '',
                        bidderContact: '',
                        bidderPhone: '',
                        bidderEmail: ''
                    }
                ]
            },
            sourceOptions,
            fromOptions,
            materialData: [], //物资材料数据
            requiredNumber: false, //云筑网需要填写【编号】字段，【招标项目编号】非必填，其他渠道无需填写【编号】字段，【招标项目编号】必填；
            rules: {
                department: [
                    { required: true, message: '请选择部门', trigger: 'blur' }
                ],
                serialNumber: [
                    { required: true, message: '请填写编号', trigger: 'blur' }
                ],
                channel: [
                    { required: true, message: '请选择渠道', trigger: 'blur' }
                ],
                tender: [
                    { required: true, message: '请填写招标方', trigger: 'blur' }
                ],
                projectName: [
                    {
                        required: true,
                        message: '请填写招标项目名称',
                        trigger: 'blur'
                    }
                ],
                tenderDate: [
                    {
                        required: true,
                        message: '请选择招标日期',
                        trigger: 'blur'
                    }
                ],
                projectNo: [
                    {
                        required: true,
                        message: '请填写招标项目编号',
                        trigger: 'blur'
                    }
                ],
                bidDate: [
                    {
                        required: true,
                        message: '请选择中标日期',
                        trigger: 'blur'
                    }
                ]
            },
        };
    },
    created () {
        this.getdepartment()
        this.getMaterial()
        this.showDetails()
        this.setDefaultValue()
    },
    watch: {
        requiredNumber: {
            handler (newValue, oldValue) {
                this.rules.serialNumber[0].required = newValue
                this.rules.projectNo[0].required = !newValue
            },
            immediate: true
        }
    },
    methods: {
        goBack () {
            this.$router.push({ name: 'service-winning' })
        },
        //进来默认填充部门、数据渠道
        setDefaultValue () {
            if (this.isAdd && localStorage.getItem('department-channel')) {
                const obj = JSON.parse(
                    localStorage.getItem('department-channel')
                )
                this.formData = { ...this.formData, ...obj }
                this.requiredNumber = obj.channel === '云筑网' ? true : false
            }
        },
        //获取部门
        getdepartment () {
            this.ajax.get('/dcp/query/department/list').then(res => {
                if (res.code === '200') {
                    const { data = [] } = res
                    this.departmentOptions = data.map(v => ({
                        label: v,
                        value: v
                    }))
                }
            })
        },
        //部门change
        deparmentChange (val) {
            this.ajax
                .get(
                    '/dcp/query/channel/name',
                    { departmentName: val },
                    { isLoading: true }
                )
                .then(res => {
                    if (res.code === '200') {
                        const { data = [] } = res
                        if (data[0]) {
                            this.info.channel = data[0]
                            this.requiredNumber =
                                data[0] === '云筑网' ? true : false
                            if (this.way === 'add') {
                                localStorage.setItem(
                                    'department-channel',
                                    JSON.stringify({
                                        channel: data[0],
                                        department: val
                                    })
                                )
                            }
                        }
                    }
                })
        },
        //物资远程搜索
        remoteMethod (name) {
            this.getmaterial(name)
        },
        //   获取物资材料名称
        getMaterial (name = '') {
            this.ajax.get('/dcp/query/material/list', { name }).then(res => {
                if (res.code === '200') {
                    const { data = [] } = res
                    if (name) {
                        return (this.materialData = [...data])
                    }
                    const arr = new Set([...this.materialData, ...data])
                    this.materialData = [...arr]
                }
            })
        },
        showDetails () {
            let id = this.$route.query.id
            console.log(id)

            id &&
                this.ajax
                    .post('/dcp/copy/bid/data/', { id })
                    .then(res => {
                        if (res.code === '200') {
                            const { data } = res
                            //返回的字符转数组
                            data.bidderList &&
                                data.bidderList.length &&
                                data.bidderList.forEach(v => {
                                    if (
                                        v.materialName &&
                                        v.materialName.length
                                    ) {
                                        let str = v.materialName.replace(
                                            /，/gi,
                                            ','
                                        )
                                        v.materialName = str.split(',')
                                    } else {
                                        v.materialName = []
                                    }
                                })
                            this.info = data
                            this.requiredNumber =
                                this.info.channel === '云筑网'
                                    ? true
                                    : false
                        }
                    })
        },
        // 表格新增、删除、复制
        addItem () {
            this.info.bidderList.push({
                materialName: '',
                packageNum: '',
                orderBy: '',
                bidder: '',
                bidPrice: '',
                bidderAddress: '',
                bidderContact: '',
                bidderPhone: '',
                bidderEmail: ''
            })
        },
        delItem () {
            let isLength =
                this.info.bidderList && this.info.bidderList.length
            if (isLength) {
                if (this.selectIndex !== -1) {
                    this.info.bidderList.splice(this.selectIndex, 1)
                    this.selectIndex = -1
                } else {
                    this.info.bidderList.splice(
                        this.info.bidderList.length - 1,
                        1
                    )
                }
            }
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.way === 'add' ? this.addData() : this.modifiedData()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        modifiedData () {
            const formData = deepClone(this.info)
            formData.bidderList.forEach(v => {
                if (v.materialName && v.materialName.length) {
                    v.materialName = v.materialName.join(',')
                }
            })
            this.ajax
                .json('/dcp/update/bid/data/collect', formData, {
                    isLoading: true
                })
                .then(res => {
                    if (res.code === '200') {
                        this.$message({
                            showClose: true,
                            message: '提交申请成功！',
                            type: 'success'
                        })
                        this.$router.push('/service/winning')
                    }
                })
                .catch(err => {
                    this.$message({
                        showClose: true,
                        message: err || '提交申请失败！',
                        type: 'error'
                    })
                })
        },
        // 顺位blur 最大顺位是5
        sortBlur (val, row) {
            let num = Number(val)
            if (isNaN(num) || !num) {
                row.orderBy = ''
            } else {
                row.orderBy = num > 100 ? '100' : String(num)
            }
        },

        addData () {
            console.log(this.info, 'this.info')
            const formData = deepClone(this.info)
            formData.bidderList.forEach(v => {
                if (formData.id) {
                    formData.id = ''
                    v.id = ''
                }
                if (v.materialName && v.materialName.length) {
                    console.log(222)
                    v.materialName = v.materialName.join(',')
                }
            })
            this.ajax
                .json('/dcp/add/bid/data/collect', formData, {
                    isLoading: true
                })
                .then(res => {
                    if (res.code === '200') {
                        this.$message({
                            showClose: true,
                            message: '提交申请成功！',
                            type: 'success'
                        })
                        this.$router.push('/service/winning')
                    }
                })
                .catch(err => {
                    this.$message({
                        showClose: true,
                        message: err || '提交申请失败！',
                        type: 'error'
                    })
                })
        }
    }
};
</script>
<style lang="scss" scoped>
.n-date {
    margin-left: -10px;
}
/deep/ .n-date .el-form-item__label {
    line-height: 44px;
}
/deep/ .el-select__tags-text {
    max-width: 120px;
    overflow: hidden;
    display: inline-block;
    word-wrap: normal;
    text-overflow: ellipsis;
}
/deep/ .el-select .el-tag__close.el-icon-close {
    top: -4px;
}

/deep/ .el-form-item__label {
    line-height: normal;
}
/deep/ .el-form-item__content {
    margin-left: 0 !important;
    margin-top: 4px;
}
</style>