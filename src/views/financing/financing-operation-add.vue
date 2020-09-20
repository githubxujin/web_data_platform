<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">
                <div class="title">保理公司新增</div>
                <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="0" class="demo-ruleForm">
                    <div class="n-table mt30">
                        <div class="n-wrap">
                            <div class="n-key">
                                <span class="required">*</span>
                                企业名称
                            </div>
                            <div class="n-value">
                                <div>
                                    <el-form-item prop="companyName">
                                        <el-input v-model.trim="ruleForm.companyName" v-focus @blur="companyData" style="width: 464px"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                        <div class="n-wrap">
                            <div class="n-key">
                                经营状态
                            </div>
                            <div class="n-value">
                                <div>
                                    {{condaData.status || ''}}
                                </div>
                            </div>
                        </div>
                    </div>

                    <qg-table class="mt20">
                        <qg-table-column v-for=" (item,index) in conda" :key="index" :label="item.key" :column="item.column" width='157'>{{item.value}}</qg-table-column>
                    </qg-table>

                    <el-form-item class="formItemFoot mt20">
                        <el-button type="info" @click="toBack('ruleForm')">取 消</el-button>
                        <el-button type="primary" size="medium" @click="submitForm('ruleForm')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { rollCallType } from './type.js'
export default {
    data() {
        return {
            condaData: {},
            mingdanType: '',
            ruleForm: {
                companyName: ''
            },
            rules: {
                companyName: [{ required: true, message: "请填写", trigger: "change" }]
            },
            conda: [
                { key: "统一社会信用代码", value: '-', column: "qg-two" },
                { key: "纳税人识别号", value: '-', column: "qg-two" },
                { key: "注册号", value: '-', column: "qg-two" },
                { key: "组织机构代码", value: '-', column: "qg-two" },
                { key: "法定代表人", value: '-', column: "qg-two" },
                { key: "注册资本", value: '-', column: "qg-two" },
                { key: "企业类型", value: '-', column: "qg-two" },
                { key: "所属行业", value: '-', column: "qg-two" },
                { key: "成立日期", value: '-', column: "qg-two" },
                { key: "所属省份", value: '-', column: "qg-two" },
                { key: "所属城市", value: '-', column: "qg-two" },
                { key: "所属区县", value: '-', column: "qg-two" },
                { key: "曾用名", value: '-', column: "qg-two" },
                { key: "参保人数", value: '-', column: "qg-two" },
                { key: "电话", value: '-', column: "qg-two" },
                { key: "更多电话", value: '-', column: "qg-two" },
                { key: "邮箱", value: '-', column: "qg-two" },
                { key: "更多邮箱", value: '-', column: "qg-two" },
                { key: "名单类型", value: '-', column: "qg-one" },
                { key: "官网", value: '-', column: "qg-one" },
                { key: "企业地址", value: '-', column: "qg-one" },
                { key: "备注", value: '-', column: "qg-one" },
                { key: "经营范围", value: '-', column: "qg-one" }
            ]
        }
    },
    methods: {
        companyData() {
            if (!this.ruleForm.companyName) return
            this.ajax
                .json('/dcp/query/qcc/enterprise/business', { companyName: this.ruleForm.companyName }, { type: 'get' })
                .then(res => {
                    // 获取名单类型
                    this.ajax
                        .json('/dcp/query/factoringcompany/rostertype', { companyName: this.ruleForm.companyName }, { type: 'post' })
                        .then(resChild => {
                            this.condaData = res.data || {}
                            this.mingdanType = resChild.data
                            this.conda = [
                                { key: "统一社会信用代码", value: this.condaData.creditCode || '-', column: "qg-two" },
                                { key: "纳税人识别号", value: this.condaData.creditCode || '-', column: "qg-two" },
                                { key: "注册号", value: this.condaData.no || '-', column: "qg-two" },
                                { key: "组织机构代码", value: this.condaData.orgNo || '-', column: "qg-two" },
                                { key: "法定代表人", value: this.condaData.operName || '-', column: "qg-two" },
                                { key: "注册资本", value: this.condaData.registCapi || '-', column: "qg-two" },
                                { key: "企业类型", value: this.condaData.econKind || '-', column: "qg-two" },
                                { key: "所属行业", value: this.condaData.industry && this.condaData.industry.industry || '-', column: "qg-two" },
                                { key: "成立日期", value: this.condaData.startDate || '-', column: "qg-two" },
                                { key: "所属省份", value: this.condaData.area && this.condaData.area.Province || '-', column: "qg-two" },
                                { key: "所属城市", value: this.condaData.area && this.condaData.area.City || '-', column: "qg-two" },
                                { key: "所属区县", value: this.condaData.area && this.condaData.area.County || '-', column: "qg-two" },
                                { key: "曾用名", value: this.condaData.originalName.name || '-', column: "qg-two" },
                                { key: "参保人数", value: this.condaData.insuredCount || '-', column: "qg-two" },
                                { key: "电话", value: this.condaData.contactInfo && this.condaData.contactInfo.phoneNumber || '-', column: "qg-two" },
                                { key: "更多电话", value: '-', column: "qg-two" },
                                { key: "邮箱", value: this.condaData.contactInfo && this.condaData.contactInfo.email || '-', column: "qg-two" },
                                { key: "更多邮箱", value: '-', column: "qg-two" },
                                { key: rollCallType(this.mingdanType) || "名单类型", value: '-', column: "qg-one" },
                                { key: "官网", value: '-', column: "qg-one" },
                                { key: "企业地址", value: this.condaData.address || '-', column: "qg-one" },
                                { key: "备注", value: '-', column: "qg-one" },
                                { key: "经营范围", value: this.condaData.scope || '-', column: "qg-one" }
                            ]
                        });

                });

        },
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (JSON.stringify(this.condaData) === '{}') {
                        this.companyData()
                    }
                    let params = {
                        companyAddr: this.condaData.address || '', //企业地址
                        companyName: this.ruleForm.companyName || '', //企业名称
                        companyType: this.ruleForm.entType || '', //企业类型
                        formerName: this.condaData.originalName && this.condaData.originalName.name || '', // 曾用名
                        lawPerson: this.condaData.operName || '', // 企业法人
                        mail: this.condaData.contactInfo && this.condaData.contactInfo.email || '', // 邮箱
                        operatingStatus: this.condaData.status || '', // 经营状态
                        organizationCode: this.condaData.orgNo || '', // 组织机构代码
                        personCount: this.condaData.insuredCount || '', // 参保人数
                        phone: this.condaData.contactInfo && this.condaData.contactInfo.phoneNumber || '', // 电话
                        province: this.condaData.province || '', // 省份
                        registerCode: this.condaData.no || '', // 注册号
                        registeredCapital: this.condaData.registCapi || '', // 注册资本
                        registeredTime: this.formatDate(this.condaData.startDate) || '', // 成立日期
                        socialCreditCode: this.condaData.creditCode || '', // 统一社会信用代码
                        rosterType: this.mingdanType //名单类型
                    }
                    this.ajax
                        .json('/dcp/modify/factoringcompany/info', params)
                        .then(res => {
                            if (res.code === '200') this.$router.back()
                        })



                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        toBack(formName) {
            this.$refs[formName].resetFields()
            this.$router.back()
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.querySelector('input').focus()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        display: inline-block;
    }
    .n-table {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: -20px;
        .n-key {
            width: 157px;
            font-size: 14px;
            letter-spacing: 0.44px;
            height: 50px;
            line-height: 50px;
            text-indent: 20px;
        }
        .n-value {
            font-size: 14px;
            letter-spacing: 0.44px;
            height: 50px;
            line-height: 50px;
            text-indent: 20px;
        }
    }
    .n-wrap {
        display: flex;
        flex-basis: 50%;
    }
    /deep/ .el-form-item__content {
        margin-top: 5px;
    }
    .required {
        line-height: 6px;
    }
    .formItemFoot {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /deep/ .el-form-item__error {
        padding: 8px 20px 8px 0px;
    }

    .dark {
        .n-table {
            border-top: 1px solid #54575c;
            border-left: 1px solid #54575c;
            border-right: 1px solid #54575c;
            .n-key {
                background: #292b2f;
                color: #a0a3a8;
                font-family: PingFangSC-Light;
            }
            .n-value {
                color: #d3d3d4;
            }
        }
        .required {
            color: #43a1ac;
        }
    }
    .light {
        .n-table {
            border-top: 1px solid #d2d9e5;
            border-left: 1px solid #d2d9e5;
            border-right: 1px solid #d2d9e5;
            .n-key {
                background: #f2f5fd;
                color: #666;
                font-family: PingFangSC-Regular;
            }
            .n-value {
                color: #666;
                font-family: PingFangSC-Regular;
            }
        }
        .required {
            color: #43a1ac;
        }
    }
</style>
