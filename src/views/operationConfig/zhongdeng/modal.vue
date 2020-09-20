<template>
    <div>
        <el-dialog title='添加/编辑' :visible.sync='$parent.dialogVisible' width='600px'>
            <el-form :model='ruleForm' :rules='rules' ref='ruleForm' label-width='120px' class='demo-ruleForm' label-position='left' style='width: 380px; margin: 0 auto'>
                <el-form-item label='受让人名称' prop='assignee'>
                    <el-input v-model='ruleForm.assignee'></el-input>
                </el-form-item>
                <el-form-item label='受让人二级单位'>
                    <el-input v-model='ruleForm.secondaryUnit'></el-input>
                </el-form-item>
                <el-form-item label='受让人一级单位' prop='primaryUnit'>
                    <el-input v-model='ruleForm.primaryUnit'></el-input>
                </el-form-item>

            </el-form>
            <div slot='footer'>
                <el-button type="info" @click='$parent.dialogVisible = false' size='mini'>取 消</el-button>
                <el-button type='primary' @click="toSubmit('ruleForm')" size='mini'>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

export default {
    props: {
        dialogVisible: Boolean,
    },

    data () {
        return {
            id: '',
            ruleForm: {
                assignee: '',
                primaryUnit: '',
                secondaryUnit: '',

            },
            rules: {
                assignee: [
                    { required: true, message: '请输入承受人名称', trigger: 'blur' },

                ],
                primaryUnit: [
                    { required: true, message: '请输入受让人一级单位', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        toEdit () {
            this.ajax
                .json('/dcp/comm/zdw/assignee/update', this.ruleForm)
                .then(res => {
                    this.$parent.getList()
                    this.$parent.dialogVisible = false
                });
        },
        toAdd () {
            this.ajax
                .json('/dcp/comm/zdw/assignee/add', this.ruleForm)
                .then(res => {
                    this.$parent.getList()
                    this.$parent.dialogVisible = false
                });
        },
        toDetail (id) {

            this.ajax
                .json('/dcp/comm/zdw/assignee/detail', { id }, { type: 'get' })
                .then(res => {
                    this.ruleForm = res.data
                });
        },
        toSubmit (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.id ? this.toEdit() : this.toAdd()

                }
            });

        }

    }
};
</script>