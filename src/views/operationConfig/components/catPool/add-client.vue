<template>
    <div>
        <el-dialog :title="titleMap()" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="所属板块" prop="industryType" :class="$parent.addOrEdit === 'detail'?'xialaNo':''">
                    <el-select v-model="ruleForm.industryType" placeholder="请选择板块" style="width: 240px" :disabled="$parent.addOrEdit === 'detail'">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in plateList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="clientName">
                    <el-input v-model.trim="ruleForm.clientName" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="bankTailNo">
                    <el-input v-model.trim="ruleForm.bankTailNo" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" prop="bank">
                    <el-input v-model.trim="ruleForm.bank" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="银行账号" prop="bankAccountNo">
                    <el-input v-model.trim="ruleForm.bankAccountNo" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="银行热线电话" prop="mbno">
                    <el-input v-model.trim="ruleForm.mbno" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="对方户名" prop="bankAccountName">
                    <el-input v-model.trim="ruleForm.bankAccountName" :disabled="$parent.addOrEdit === 'detail'"></el-input>
                </el-form-item>
                <el-form-item label="接收手机号" prop="phone">
                    <el-input v-model.trim="ruleForm.phone" :disabled="$parent.addOrEdit === 'detail'"></el-input>
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
        dialogVisible: Boolean
    },
    data () {
        var verifyBankAccountNo = (rule, value, callback) => {
            if (value && +value) {
                callback();
            } else {
                callback(new Error("请输入正确的银行账号"));
            }
        };
        var verifyphone = (rule, value, callback) => {
            let regExp = /^1[3456789]\d{9}$/;
            if (regExp.test(value) === false) {
                callback(new Error("请输入正确的手机号"));
            } else {
                callback();
            }
        };
        return {
            plateList,
            ruleForm: {
                industryType: "",
                clientName: "",
                bankTailNo: "",
                bank: "",
                bankAccountNo: "",
                mbno: "",
                bankAccountName: "",
                phone: ""
            },
            rules: {
                industryType: [
                    { required: true, message: "请选择板块", trigger: "blur" }
                ],
                clientName: [
                    {
                        required: true,
                        message: "请输入客户名称",
                        trigger: "blur"
                    }
                ],
                bankTailNo: [
                    { required: true, message: "请输入账号", trigger: "blur" }
                ],
                bank: [
                    {
                        required: true,
                        message: "请输入银行名称",
                        trigger: "blur"
                    }
                ],
                bankAccountNo: [
                    {
                        required: true,
                        validator: verifyBankAccountNo,
                        trigger: "blur"
                    }
                ],
                phone: [
                    { required: true, validator: verifyphone, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        titleMap () {
            if (this.$parent.addOrEdit === "toAdd") {
                return '添加客户信息'
            }
            else if (this.$parent.addOrEdit === "edit") {
                return '编辑客户信息'
            }
            else if (this.$parent.addOrEdit === "detail") {
                return '详情'
            }
        },

        addCustomer () {
            this.ajax
                .json('/dcp/comm/bank/add', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        upadteCustomer () {
            this.ajax
                .json('/dcp/comm/bank/update', this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },

        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$parent.isEdit ? this.upadteCustomer() : this.addCustomer()

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog () {
            this.$refs.ruleForm.resetFields();
        }
    }
};
</script>
<style lang="scss" scoped>
.xialaNo {
    /deep/ .el-select__caret.el-input__icon.el-icon-arrow-up {
        display: none;
    }
}
</style>
