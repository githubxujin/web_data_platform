<template>
    <div>
        <el-dialog :title="$parent.isEdit?'编辑':'新增'" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" label-position="left" style="width:420px; margin: 0 auto">
                <el-form-item label="姓名/公司名称" prop="name">
                    <el-input v-model.trim="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="身份证号码/组织机构代码" prop="idcardNum">
                    <el-input v-model.trim="ruleForm.idcardNum"></el-input>
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
                name: "",
                idcardNum: "",
                id: ""
            },
            rules: {
                name: [{ required: true, message: "请输入", trigger: "blur" }],
                idcardNum: [{ required: true, message: "请输入", trigger: "blur" }]
            }
        };
    },
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ajax
                        .json('/dcp/modify/brokenpromiseslist/detail', this.ruleForm)
                        .then(res => {
                            this.$parent.dialogVisible = false
                            this.$parent.getList();
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog () {
            this.ruleForm = {
                name: "",
                idcardNum: "",
                id: ""
            }
        }
    }
};
</script>
