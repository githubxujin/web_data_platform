<template>
    <div>
        <el-dialog title="编辑交易内容" :visible.sync="$parent.dialogVisibleEdit" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="企业名称" prop="clientName">
                    <el-select v-model="ruleForm.clientName" placeholder="企业名称" style="width: 240px">
                        <el-option v-for="(item, index) in clientNameArray" :label="item.clientName" :value="item.id" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户" prop="account">
                    <el-input v-model="ruleForm.account"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" prop="bank">
                    <el-input v-model="ruleForm.bank"></el-input>
                </el-form-item>
                <el-form-item label="交易日期" prop="timePicker">
                    <el-input v-model="ruleForm.timePicker"></el-input>
                </el-form-item>
                <el-form-item label="交易时间" prop="dataPicker">
                    <el-input v-model="ruleForm.dataPicker"></el-input>
                </el-form-item>
                <el-form-item label="交易金额" prop="changeAmount">
                    <el-input v-model="ruleForm.changeAmount"></el-input>
                </el-form-item>
                <el-form-item prop="action" label="交易类型">
                    <el-select style="width: 240px" v-model="ruleForm.action" clearable placeholder="交易类型">
                        <el-option label="收入" value="收入"></el-option>
                        <el-option label="支出" value="支出"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="对方户名" prop="objectName">
                    <el-input v-model="ruleForm.objectName"></el-input>
                </el-form-item>
                <el-form-item label="接收手机号" prop="simNumber">
                    <el-input v-model="ruleForm.simNumber"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="ruleForm.remark"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="info" @click="$parent.dialogVisibleEdit = false" size="mini">取 消</el-button>
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
            clientNameArray: [],
            ruleForm: {
                timePicker: "",
                dataPicker: ""
            },
            rules: {
                clientName: [
                    { required: true, message: "请选择企业名称", trigger: "blur" }
                ],
                account: [
                    { required: true, message: "请选择账户", trigger: "blur" }
                ],
                bank: [
                    { required: true, message: "请选择银行名称", trigger: "blur" }
                ],
                timePicker: [
                    { required: true, message: "请选择交易日期", trigger: "blur" }
                ],
                dataPicker: [
                    { required: true, message: "请选择交易时间", trigger: "blur" }
                ],
                changeAmount: [
                    { required: true, message: "请选择交易金额", trigger: "blur" }
                ],
                action: [
                    { required: true, message: "请选择交易类型", trigger: "blur" }
                ],
                simNumber: [
                    { required: true, validator: verifyphone, trigger: "blur" }
                ],
                state: [
                    { required: true, message: "请选择交易状态", trigger: "blur" }
                ],
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ajax
                        .json("/dcp/comm/sms/update", this.ruleForm)
                        .then(res => {
                            if (res.code === "200") {
                                this.$parent.dialogVisibleEdit = false;
                                this.$refs[formName].resetFields();
                                this.$parent.getList();
                            }
                        });
                } else {
                    console.log("error submit!!");
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
/deep/ .el-dialog__body {
    height: 550px;
    overflow-y: auto;
}
</style>