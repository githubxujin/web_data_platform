<template>
    <div>
        <el-dialog :title="$parent.isEdit?'编辑':'新增'" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="业务编号" prop="businessNumber">
                    <el-input v-model.trim="ruleForm.businessNumber"></el-input>
                </el-form-item>
                <el-form-item label="业务名称" prop="businessName">
                    <el-input v-model.trim="ruleForm.businessName"></el-input>
                </el-form-item>
                <el-form-item label="MMSI 编号" prop="mmsi">
                    <el-input v-model.trim="ruleForm.mmsi"></el-input>
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
export default {
    data () {
        return {
            ruleForm: {
                businessNumber: "",
                businessName: "",
                mmsi: ""
            },
            rules: {
                businessNumber: [{ message: "请输入", trigger: "blur" }],
                businessName: [{ message: "请输入", trigger: "blur" }],
                mmsi: [{ message: "请输入", trigger: "blur" }],
            }
        }
    },
    methods: {
        addCustomer () {
            this.ajax
                .json('/dcp/ship/info/add', this.ruleForm)
                .then(res => {
                    if (res.code === '200') {
                        this.$parent.dialogVisible = false
                        this.$parent.getList()
                    }
                });
        },
        editCustomer () {
            this.ajax
                .json('/dcp/ship/info/update', this.ruleForm)
                .then(res => {
                    if (res.code === '200') {
                        this.$parent.dialogVisible = false
                        this.$parent.getList()
                    }
                });
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.businessNumber || this.ruleForm.businessName || this.ruleForm.mmsi) {
                        this.$parent.isEdit ? this.editCustomer() : this.addCustomer()
                    } else {
                        this.$message.error('请填写其中一项内容');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog () {
            this.ruleForm = {
                businessNumber: "",
                businessName: "",
                mmsi: "",
                id: ""
            }
        }
    }
}
</script>
