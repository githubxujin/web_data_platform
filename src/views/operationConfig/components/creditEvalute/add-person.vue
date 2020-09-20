<template>
    <div>
        <el-dialog title='添加自然人信息' :visible.sync='$parent.dialogVisible' width='600px'>
            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='120px' class='demo-ruleForm' label-position='left' style='width: 380px; margin: 0 auto'>
                <el-form-item label='所属板块' prop='industryType'>
                    <el-select v-model='ruleForm.industryType' placeholder='请选择' style="width: 260px">
                        <el-option :label='item.label' :value='item.value' v-for='(item,index) in plateList' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='企业名称'>
                    <el-input v-model='ruleForm.customerName'></el-input>
                </el-form-item>
                <el-form-item label='与企业关系'>
                    <el-select v-model='ruleForm.withRelations' placeholder='请选择' style="width: 260px">
                        <el-option :label='item.label' :value='item.value' v-for='(item,index) in G_withRelations' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='自然人名称' prop="personName">
                    <el-input v-model='ruleForm.personName'></el-input>
                </el-form-item>
                <el-form-item label='身份证号' prop="identityCode">
                    <el-input v-model='ruleForm.identityCode'></el-input>
                </el-form-item>
                <el-form-item label='手机号'>
                    <el-input v-model='ruleForm.phone'></el-input>
                </el-form-item>
                <el-form-item label='银卡卡号'>
                    <el-input v-model='ruleForm.bankCard'></el-input>
                </el-form-item>
                <el-form-item label='用户IP'>
                    <el-input v-model='ruleForm.userIp'></el-input>
                </el-form-item>
                <el-form-item label='设备IMEI'>
                    <el-input v-model='ruleForm.imei'></el-input>
                </el-form-item>
            </el-form>
            <div slot='footer'>
                <el-button type="info" @click='$parent.dialogVisible = false' size='mini'>取 消</el-button>
                <el-button type='primary' @click="submitForm('ruleForm')" size='mini'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import {    plateList
} from '@/utils/common'
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        var reg = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
        var validateIdentityCode = (rule, value, callback) => {
            if (!reg.test(value)) {
                callback(new Error('请输入正确身份证'));
            } else {
                callback()
            }
        };

        return {

            plateList,
            ruleForm: {
                "bankCard": "",
                "channels": "",
                "createBy": "",
                "createTime": "",
                "customerName": "",
                "evaluateTime": "",
                "identityCode": "",
                "imei": "",
                "industryType": "",
                "isDeleted": 0,
                "lastEvaluateTime": "",
                "personName": "",
                "phone": "",
                "status": 0,
                "updateBy": "",
                "updateTime": "",
                "userIp": "",
                "withRelations": ""
            },
            rules: {
                industryType: [
                    { required: true, message: '请输入活动名称', trigger: 'change' },
                ],
                personName: [
                    { required: true, message: '请输入自然人名称', trigger: 'blur' }
                ],
                identityCode: [
                    { required: true, validator: validateIdentityCode, trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        addPerson () {
            this.ajax
                .json('/dcp/person/evaluate/add', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        updatePerson () {
            this.ajax
                .json('/dcp/person/evaluate/update', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                console.log(2222)
                if (valid) {
                    let { phone, bankCard, userIp, imei } = this.ruleForm
                    let params = [phone, bankCard, userIp, imei]
                    let isPass = params.some(v => v !== "")
                    if (isPass) {
                        console.log(2)
                        this.$parent.isEdit ? this.updatePerson() : this.addPerson()

                    } else {
                        console.log(1)
                        this.$message({ type: 'warning', message: '天御反欺诈评估以下4项信息必须选择一项填写' })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>