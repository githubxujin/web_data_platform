<template>
    <div>
        <el-dialog title="添加客户信息" :visible.sync="$parent.dialogVisible" width="600px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="所属板块" prop="industryType">
                    <el-select v-model="ruleForm.industryType" placeholder="请选择板块" style="width: 240px">
                        <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="ruleForm.customerName" @blur="getCustomerCode"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input v-model="ruleForm.creditCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="负责人姓名" prop="leadingCadre">
                    <el-input v-model="ruleForm.leadingCadre"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="$parent.dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { plateList } from "@/utils/common";
export default {
    props: {
        dialogVisible: Boolean,
    },
    data () {
        return {
            plateList,
            ruleForm: {
                id: "",
                creditCode: "",
                customerName: "",
                industryType: "",
                leadingCadre: ""
            },
            rules: {
                industryType: [
                    { required: true, message: '请选择板块', trigger: 'change' },
                ],
                customerName: [
                    { required: true, message: '请输入客户名称', trigger: 'blur' }
                ],
                creditCode: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
                ],
            }
        }
    },

    methods: {

        addCustomer () {
            this.ajax
                .json('/dcp/enterprise/evaluate/add', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        upadteCustomer () {
            this.ajax
                .json('/dcp/enterprise/evaluate/update', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        getCustomerCode () {
            this.ruleForm.customerName &&
                this.ajax
                    .json(`/dcp/query/enterprise/credit/code`, { companyName: this.ruleForm.customerName }, { type: 'get' })
                    .then(res => {
                        this.ruleForm.creditCode = res.data.creditCode
                    });
        },

        submitForm (formName) {
            // console.log(this.isEdit)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(isEdit)
                    this.$parent.isEdit ? this.upadteCustomer() : this.addCustomer()

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
};
</script>
