<template>
    <div>
        <el-dialog :title="titleMap()" :visible.sync="$parent.dialogVisible" width="600px" @close="closeClearDatas" @open="openDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:480px; margin: 0 auto">
                <el-form-item label="所属板块" prop="industryType" :class="$parent.addOrEdit === 'detail'?'xialaNo':''">
                    <el-select v-model="ruleForm.industryType" placeholder="请选择板块" style="width: 300px" @change="industryTypeChange" :disabled="$parent.addOrEdit === 'detail'">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in plateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收手机号" prop="phone" :class="$parent.addOrEdit === 'detail'?'xialaNo':''">
                    <el-select style="width: 300px" v-model.trim="ruleForm.phone" placeholder="请选择" @change="phoneChange" :disabled="$parent.addOrEdit === 'detail'">
                        <el-option v-for="item in phone" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收客户账号" prop="bankId" v-if="
                        $parent.addOrEdit === 'edit' ||
                            $parent.addOrEdit === 'detail'
                    " :class="$parent.addOrEdit === 'detail'?'xialaNo':''">
                    <el-select style="width: 300px" v-model.trim="ruleForm.bankId" placeholder="请选择" :disabled="$parent.addOrEdit === 'detail'">
                        <el-option v-for="item in bankId" :key="item.id" :label="item.clientName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收客户账号" prop="bankId" v-else :class="$parent.addOrEdit === 'detail'?'xialaNo':''">
                    <el-select multiple collapse-tags v-model="ruleForm.bankId" placeholder="请选择" style="width: 300px" :disabled="$parent.addOrEdit === 'detail'">
                        <el-option v-for="item in bankId" :key="item.id" :label="item.clientName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="接收邮箱" prop="email">
                    <el-input v-model.trim="ruleForm.email" :disabled="$parent.addOrEdit === 'detail'" style="width: 300px"></el-input>
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
        return {
            plateList,
            phone: [],
            bankId: [],
            ruleForm: {
                industryType: "",
                email: "",
                bankId: null,
                phone: ""
            },
            rules: {
                industryType: [
                    { required: true, message: "请选择板块", trigger: "change" }
                ],
                email: [
                    {
                        type: 'email', required: true, message: "请填写正确的邮箱",
                        trigger: "change"
                    }
                ],
                bankId: [
                    {
                        required: true,
                        message: "请选择接收客户账号",
                        trigger: "change"
                    }
                ],
                phone: [
                    {
                        required: true,
                        message: "请选择手机号",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    methods: {
        // 监听板块
        industryTypeChange (value) {
            console.log(this.ruleForm.industryType);
            this.ruleForm.phone = "";
            this.ruleForm.bankId = null;
            this.phone = [];
            this.bankId = [];
            if (value === "") return;
            this.ruleForm.industryType = value;
            this.phonelList();
        },
        // 监听手机号
        phoneChange (value) {
            this.ruleForm.phone = value;
            this.ruleForm.bankId = null;
            this.bankIdList();
        },
        // 获取客户账号列表
        bankIdList () {
            this.ajax
                .json(
                    `/dcp/comm/bank/client/name/list`,
                    {
                        phone: this.ruleForm.phone
                    },
                    { type: "get" }
                )
                .then(res => {
                    if (res.code == "200") {
                        this.bankId = res.data;
                    }
                });
        },
        // 获取手机列表
        phonelList () {
            this.ajax
                .json(
                    `/dcp/comm/bank/phone/list/${this.ruleForm.industryType}`,
                    {},
                    { type: "get" }
                )
                .then(res => {
                    if (res.code == "200") {
                        this.phone = res.data;
                    }
                });
        },
        titleMap () {
            if (this.$parent.addOrEdit === "toAdd") {
                return "添加邮箱信息";
            } else if (this.$parent.addOrEdit === "detail") {
                return "详情";
            } else if (this.$parent.addOrEdit === "edit") {
                return "编辑客户信息";
            }
        },

        addCustomer () {
            this.ajax
                .json("/dcp/cat/pool/email/add", this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false;
                    this.$parent.getList();
                });
        },
        upadteCustomer () {
            this.ajax
                .json("/dcp/cat/pool/email/update", this.ruleForm)
                .then(res => {
                    this.$parent.dialogVisible = false;
                    this.$parent.getList();
                });
        },
        submitForm (formName) {
            if (this.$parent.addOrEdit === "detail") {
                this.$parent.dialogVisible = false;
                return;
            }
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.$parent.addOrEdit === "edit") {
                        this.upadteCustomer();
                    } else if (this.$parent.addOrEdit === "toAdd") {
                        this.addCustomer();
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        closeClearDatas () {
            this.$refs.ruleForm.resetFields();
            this.ruleForm = {
                industryType: "",
                email: "",
                bankId: null,
                phone: ""
            };
            this.phone = [];
            this.bankId = [];
        },
        openDialog () {
            if (
                this.$parent.addOrEdit === "edit" ||
                this.$parent.addOrEdit === "detail"
            ) {
                this.phonelList();
                this.bankIdList();
            } else if (this.$parent.addOrEdit === "toAdd") {
                this.ruleForm = {
                    industryType: "",
                    email: "",
                    bankId: [],
                    phone: ""
                };
            }
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
