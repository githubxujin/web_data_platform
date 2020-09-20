<template>
    <div>
        <el-dialog :title="titleMap()" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="公众号名称" prop="accountName">
                    <el-input v-model.trim="ruleForm.accountName"></el-input>
                </el-form-item>
                <el-form-item label="请选择" prop="accountOrUrl">
                    <el-select v-model="ruleForm.accountOrUrl" placeholder="请选择" style="width: 240px" @change="changeAccountOrUrl">
                        <el-option label="公众号ID" value="account"></el-option>
                        <el-option label="文章地址链接" value="url"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请输入" prop="accountOrUrlValue">
                    <el-input v-model.trim="ruleForm.accountOrUrlValue"></el-input>
                </el-form-item>
                <el-form-item label="类别" prop="industryType">
                    <el-select v-model="ruleForm.industryType" placeholder="请选择" style="width: 240px">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in officialTypeList" :key="index"></el-option>
                    </el-select>
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
import { officialTypeList } from "@/utils/common"
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            officialTypeList,
            id: "",
            ruleForm: {
                accountName: "",
                accountOrUrl: "",
                accountOrUrlValue: "",
                industryType: ""
            },
            rules: {
                accountName: [{ required: true, message: "请选择", trigger: "blur" }],
                accountOrUrl: [{ required: true, message: "请选择", trigger: "blur" }],
                accountOrUrlValue: [{ required: true, message: "请输入", trigger: "blur" }],
                industryType: [{ required: true, message: "请选择", trigger: "blur" }]
            }
        }
    },
    methods: {
        changeAccountOrUrl (value) {
            this.ruleForm.accountOrUrl = value
            this.ruleForm.accountOrUrlValue = ""

        },
        titleMap () {
            if (this.$parent.addOrEdit === "toAdd") {
                return "添加"
            } else if (this.$parent.addOrEdit === "edit") {
                return "编辑"
            }
        },

        addCustomer () {
            if (this.ruleForm.accountOrUrl === "account") {
                this.ruleForm.account = this.ruleForm.accountOrUrlValue
                this.ruleForm.url = ''
            } else if (this.ruleForm.accountOrUrl === "url") {
                this.ruleForm.url = this.ruleForm.accountOrUrlValue
                this.ruleForm.account = ''
            }
            if (this.$parent.addOrEdit === "edit") {
                this.ruleForm.id = this.id
            }

            this.ajax.json("/dcp/server/wx/account/save", { ...this.ruleForm }).then(res => {
                this.$parent.dialogVisible = false
                this.$parent.getList()
            })
        },

        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.addCustomer()
                } else {
                    console.log("error submit!!")
                    return false
                }
            })
        },
        closeDialog () {
            this.$refs.ruleForm.resetFields()

            this.ruleForm = {
                accountName: "",
                accountOrUrl: "",
                accountOrUrlValue: "",
                industryType: ""
            }
        }
    }
}
</script>
