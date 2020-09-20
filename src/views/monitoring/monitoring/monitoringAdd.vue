<template>
    <div>
        <el-dialog :title="$parent.isEdit?'编辑企业信息':'添加企业信息'" :visible.sync="$parent.dialogVisible" width="600px" @close="closeDialog">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" label-position="left" style="width:380px; margin: 0 auto">
                <el-form-item label="所属板块" prop="industryType">
                    <el-select v-model="ruleForm.industryType" placeholder="行业类别" style="width: 240px">
                        <el-option v-for="item in industryCategoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称" prop="customerName">
                    <el-autocomplete :disabled="$parent.isEdit" popper-class="select-name" class="box-name" v-model="ruleForm.customerName" :fetch-suggestions="querySearch" placeholder="" :trigger-on-focus="false" @select="handleSelect">
                        <template slot-scope="{item}">
                            <div class="name">{{ item.customerName }}</div>
                            <span class="addr">{{ item.creditCode }}</span>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="所属省份" prop="province">
                    <el-input v-model.trim="ruleForm.province" disabled></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input v-model.trim="ruleForm.creditCode" disabled></el-input>
                </el-form-item>
                <el-form-item label="注册号" prop="bankAccountNo">
                    <el-input v-model.trim="ruleForm.registerNo" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否监控" prop="bankAccountNo" v-if="$parent.isEdit">
                    <el-select v-model="ruleForm.isMonitor" placeholder="请选择" style="width: 240px">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label=否 :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业标签" prop="tag">
                    <el-select v-model="ruleForm.tag" placeholder="请选择" style="width: 240px">
                        <el-option label="核心买方" :value="1"></el-option>
                        <el-option label=合作客户 :value="2"></el-option>
                        <el-option label="其他" :value="3"></el-option>
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
import { industryCategoryList } from "@/utils/common"
export default {
    data() {
        return {
            industryCategoryList,
            ruleForm: {
                industryType: '',
                customerName: '',
                province: '',
                creditCode: '',
                tag: '',
                registerNo: '',
                isMonitor: '',
            },
            rules: {
                industryType: [{ required: true, message: "请选择", trigger: "blur" }],
                customerName: [{ required: true, message: "请输入", trigger: "blur" }],
                tag: [{ required: true, message: "请选择", trigger: "blur" }],
            },
            restaurants: []
        };
    },
    methods: {
        querySearch(queryString, cb) {
            this.ajax
                .json('/risk/server/customer/chose/list', { customerName: this.ruleForm.customerName }, { type: 'get' })
                .then(res => {
                    this.restaurants = res.data
                    var results = queryString ? this.restaurants.filter(this.createStateFilter(queryString)) : this.restaurants
                    cb(results);
                })
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.customerName.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
            }
        },
        handleSelect(item) {
            this.ruleForm.creditCode = item.creditCode
            this.ruleForm.customerName = item.customerName
            this.ajax
                .json('/dcp/query/qcc/enterprise/business', { companyName: item.customerName }, { type: 'get' })
                .then(res => {
                    this.ruleForm.province = res.data.area.City
                    this.ruleForm.registerNo = res.data.no
                })
        },
        addCustomer() {
            this.ajax
                .json('/risk/server/customer/survey/add', { ...this.ruleForm, isMonitor: 1 }, { type: 'POST' })
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        upadteCustomer() {
            this.ajax
                .json('/risk/server/customer/survey/update', this.ruleForm, { type: 'POST' })
                .then(res => {
                    this.$parent.dialogVisible = false
                    this.$parent.getList();
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$parent.isEdit ? this.upadteCustomer() : this.addCustomer()

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog() {
            this.$refs.ruleForm.resetFields();
            this.ruleForm = {
                industryType: '',
                customerName: '',
                province: '',
                creditCode: '',
                tag: '',
                registerNo: '',
                isMonitor: '',
                id: ''
            }
            this.restaurants = []
        }
    }
};
</script>
<style lang="scss" scoped>
    .box-name {
        width: 100%;
    }
    .select-name {
        li {
            line-height: normal;
            padding: 7px;
            .name {
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .addr {
                font-size: 12px;
                color: #b4b4b4;
            }
            .highlighted .addr {
                color: #ddd;
            }
        }
    }
</style>