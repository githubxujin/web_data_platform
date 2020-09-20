<template>
    <!-- 操作配置医疗器械备案编辑/新增页面 -->
    <div class="table-wrap mt20">
        <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm mb20">
            <table class="table-public-detail">
                <tr>
                    <td><span>*</span>器械名称</td>
                    <td>
                        <el-input v-model="info.productName" maxlength="100" placeholder clearable></el-input>
                    </td>
                    <td><span>*</span>产品类别</td>
                    <td>
                        <el-select v-model="info.type" filterable placeholder="请选择类型">
                            <el-option label="国产" :value="0"></el-option>
                            <el-option label="进口" :value="1"></el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
        </el-form>
        <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm mt30 mb20">
            <table class="table-public-detail">
                <tr>
                    <td>备案号</td>
                    <td>
                        <!-- <el-form-item prop="tender"> -->
                        <el-input v-model="info.filingCode" clearable></el-input>
                        <!-- </el-form-item> -->
                    </td>
                    <td>备案人名称</td>
                    <td>
                        <el-input v-model="info.filingName" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>备案人注册地址</td>
                    <td>
                        <el-input v-model="info.filingAddress" clearable></el-input>
                    </td>
                    <td>生产地址</td>
                    <td>
                        <el-input v-model="info.productAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>代理人名称</td>
                    <td>
                        <el-input v-model="info.agentName" clearable></el-input>
                    </td>
                    <td>代理人住所</td>
                    <td>
                        <el-input v-model="info.agentAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>产品名称</td>
                    <td>
                        <el-input v-model="info.productName" clearable></el-input>
                    </td>
                    <td>型号规格</td>
                    <td>
                        <el-input v-model="info.modelSpecification" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>备案单位</td>
                    <td>
                        <el-input v-model="info.filingUnit" clearable></el-input>
                    </td>
                    <td>备案日期</td>
                    <td>
                        <el-form-item>
                            <el-date-picker v-model='info.filingDate' unlink-panels value-format='yyyy-MM-dd' placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </td>
                </tr>
                <tr>
                    <td>产品有效期</td>
                    <td>
                        <el-form-item>
                            <el-date-picker v-model='info.storageExpiry' unlink-panels value-format='yyyy-MM-dd' placeholder="选择日期"></el-date-picker>
                        </el-form-item>
                    </td>
                    <td>适用范围</td>
                    <td>
                        <el-input v-model="info.applicationScope" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>其他内容</td>
                    <td>
                        <el-input v-model="info.other" clearable></el-input>
                    </td>
                    <td>备注</td>
                    <td>
                        <el-input v-model="info.remark" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>产品描述</td>
                    <td class="cospan">
                        <el-input v-model="info.productDesc" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>变更情况</td>
                    <td class="cospan">
                        <el-input v-model="info.changeInfo" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="mt20" style="text-align: center;">
                <el-button type="info" @click="goBack()">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
// import MoneyInput from './moneyInput'
import { deepClone } from '@/utils/common'
export default {
    props: {
        way: String
    },
    components: {},
    data () {
        return {
            info: {
                productName: '',    // 器械名称
                type: '',       //  产品类别
                filingCode: '',  //备案号
                filingName: '',  //备案人名称
                filingAddress: '',   //  备案人注册地址
                productAddress: '',  // 生产地址
                agentName: '',  //  代理人名称
                agentAddress: '',   //  代理人住所
                modelSpecification: '',     //  型号规格
                filingUnit: '',  //  备案单位
                createTime: '',  //  备案日期
                storageExpiry: '',   //  产品有限期
                productDesc: '', //   产品描述
                changeInfo: '',  //  变更情况
                other: '',  //  其他
                remark: '',     //  备注
            },
            rules: {
                productName: [
                    { required: true, message: '请输入器械名称', trigger: 'blur' }
                ]
            },
        };
    },
    created () {
        // 获取点击对象的详情数据
        this.showDetails()
    },
    methods: {
        goBack () {
            this.$router.push({ name: 'instrumentIncreate' })
        },
        // 进入发送请求(根据编辑功能跳转进来的id值)
        showDetails () {
            let id = this.$route.query.messageId2
            console.log(id)
            id &&
                this.ajax
                    .post('/dcp/query/apparatusfiling/info', { id })
                    .then(res => {
                        if (res.code === '200') {
                            console.log(res.data);
                            this.info = res.data
                        }
                    })
        },

        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.info.productName && (this.info.type === 0 || this.info.type === 1)) {
                        this.way === 'addPut' ? this.addData() : this.modifiedData()
                    } else {
                        this.$message.error('请输入器械名称或选择产品类别')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 判断点击的是修改然后发送数据
        modifiedData () {
            // 拷贝一份data的info数据
            const formData = deepClone(this.info)
            this.ajax
                .json('/dcp/modify/apparatusfiling/info', formData, {
                    isLoading: true
                })
                .then(res => {
                    if (res.code === '200') {
                        this.$message({
                            showClose: true,
                            message: '提交申请成功！',
                            type: 'success'
                        })
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
        // 修改
        addData () {
            console.log(this.info, 'this.info')
            const formData = deepClone(this.info)
            this.ajax
                .json('/dcp/modify/apparatusfiling/info', formData, {
                    isLoading: true
                })
                .then(res => {
                    if (res.code === '200') {
                        this.$message({
                            showClose: true,
                            message: '提交申请成功！',
                            type: 'success'
                        })
                        this.$router.push('instrumentIncreate')
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
    },
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
    top: -6px;
}
/deep/ .el-form-item__label {
    line-height: normal;
}
/deep/ .el-form-item__content {
    margin-left: 0 !important;
    margin-top: 4px;
}

/deep/ .el-select {
    width: 100%;
}

/deep/ .el-input {
    width: 100%;
}
</style>