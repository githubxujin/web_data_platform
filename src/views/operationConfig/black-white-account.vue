<template>
    <div class="stat">
        <el-row class="table-wrap mt15 mb30">
            <div class="table-title" v-if="$route.query.way === 'add'">账号名单新增</div>
            <div class="table-title" v-else>账号名单修改 </div>
            <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" size="medium">
                <table class="table-public-detail">
                    <tr>
                        <td>
                            <span>*</span>
                            行业类别
                        </td>
                        <td>
                            <el-form-item prop="industryCategory">
                                <el-select v-model="ruleForm.industryCategory" placeholder="请选择板块" style="width: 100%" @change="industryChange">
                                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateListThree" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            <span>*</span>
                            名单类型
                        </td>
                        <td>
                            <el-form-item prop="businessCategory">
                                <el-select v-model="ruleForm.listType" clearable placeholder="" style="width:100%;">
                                    <el-option v-for="(s, index) in listType" :label="s.label" :value="s.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            {{supplierNameChange().title}}
                        </td>
                        <td>
                            <el-form-item>
                                <el-input v-model="financeCompany" :placeholder="supplierNameChange().placeholder" @change="customerNameChange"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            <span>*</span>
                            统一社会信用
                        </td>
                        <td>
                            <el-form-item prop="unifiedCreditCode">
                                <el-input v-model="ruleForm.unifiedCreditCode" placeholder="输入企业名称后自动生成"></el-input>
                            </el-form-item>
                        </td>

                    </tr>

                    <tr>

                        <td>
                            项目名称
                        </td>
                        <td>
                            <el-form-item prop="projectName">
                                <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称" style="width: 100%"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            经手企业名称
                        </td>
                        <td>
                            <el-form-item prop="handleCustomerName">
                                <el-input v-model="ruleForm.handleCustomerName" placeholder="请输入经手企业名称"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            出票人类型
                        </td>
                        <td>
                            <el-form-item>
                                <el-select v-model="drawerType" placeholder="请选择出票人类型" style="width: 100%" @change="drawerTypeChange">
                                    <el-option v-for="item in selectChange()" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            出票人名称
                        </td>
                        <td>
                            <el-form-item>
                                <el-input v-model="ruleForm.drawerName" placeholder="请输入出票人名称" :disabled="drawerName_disabled"></el-input>
                            </el-form-item>
                        </td>

                    </tr>

                    <tr>
                        <td>
                            出票人开户行
                        </td>
                        <td>
                            <el-form-item prop="drawerBank">
                                <el-input v-model="ruleForm.drawerBank" placeholder="请输入出票人开户行"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            出票人银行账号
                        </td>
                        <td>
                            <el-form-item prop="drawerAccount">
                                <el-input v-model="ruleForm.drawerAccount" placeholder="请输入出票人银行账号"></el-input>
                            </el-form-item>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            承兑人类型
                        </td>
                        <td>
                            <el-form-item>
                                <el-select v-model="ruleForm.acceptorType" placeholder="请选择承兑人类型" style="width: 100%" @change="acceptorTypeChange">
                                    <el-option v-for="item in selectChange()" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            承兑人名称
                        </td>
                        <td>
                            <el-form-item>
                                <el-input v-model="ruleForm.acceptorName" placeholder="请输入承兑人名称" :disabled="acceptorName_disabled"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            承兑人开户行
                        </td>
                        <td>
                            <el-form-item prop="acceptorBank">
                                <el-input v-model="ruleForm.acceptorBank" placeholder="请输入承兑人开户行"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            承兑人银行账号
                        </td>
                        <td>
                            <el-form-item prop="acceptorAccount">
                                <el-input v-model="ruleForm.acceptorAccount" placeholder="请输入承兑人银行账号"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            收款人类型
                        </td>
                        <td>
                            <el-form-item>
                                <el-select v-model="ruleForm.payeeType" placeholder="请选择收款人类型" style="width: 100%" @change="payeeTypeChange">
                                    <el-option v-for="item in selectChange()" :label="item.label" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            收款人名称
                        </td>
                        <td>
                            <el-form-item>
                                <el-input v-model="ruleForm.payeeName" placeholder="请输入收款人名称" :disabled="payeeName_disabled"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>

                        <td>
                            收款人开户行
                        </td>
                        <td>
                            <el-form-item prop="payeeBank">
                                <el-input v-model="ruleForm.payeeBank" placeholder="请输入收款人开户行"></el-input>
                            </el-form-item>
                        </td>
                        <td>
                            收款人银行账号
                        </td>
                        <td>
                            <el-form-item prop="payeeAccount">
                                <el-input v-model="ruleForm.payeeAccount" placeholder="请输入收款人银行账号"></el-input>
                            </el-form-item>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <span>*</span>
                            申请原因
                        </td>
                        <td>
                            <el-form-item prop="remark">
                                <el-input v-model="ruleForm.remark" placeholder="请输入申请原因"></el-input>
                                <!-- <el-input type="textarea" resize="none" maxlength="5000" v-model="ruleForm.remark" placeholder=""></el-input>
                                <span class="com-num"><span>{{ ruleForm.remark | remark }}</span> / {{ 5000 }}</span> -->
                            </el-form-item>
                        </td>
                        <td>
                            标签
                        </td>
                        <td>
                            <el-form-item>
                                <el-select v-model="ruleForm.labelContent" clearable placeholder="请选择标签" style="width: 100%" filterable allow-create default-first-option>
                                    <el-option v-for="(s, index) in labelList" :label="s" :value="s" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <span>*</span>
                            凭证附件
                        </td>
                        <td class="cospan" colspan="3">
                            <c-upload accept=".jpg,.png,.pdf,.xlsx,.xls,.docx,.doc" type="primary" class="upload-file" multiple="multiple" v-on:changehand="v => {uploadHand(v)}">
                                选择文件
                            </c-upload>
                            <span class="files-col" v-for="v in file" :key="v.id">
                                <a :href="env + '/dcp/antiFraud/file' + v.id + '?access_token=' + access_token" target="_blank" class="to-links">{{v.fileName}}</a>
                                <i class="iconfont icon-tongyong-fujianshanchutubiao1" @click="delFile(v.id)"></i>
                            </span>
                            <!-- <ul class="el-upload-list el-upload-list--text">
                                <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file" :key="k">
                                    <a class="el-upload-list__item-name" :href="env + '/dcp/antiFraud/file/?fileId=' + v.id + '&access_token=' + access_token"><i class="el-icon-document"></i>{{v.fileName}}</a>
                                    <label class="el-upload-list__item-status-label">
                                        <i class="el-icon-upload-success el-icon-circle-check"></i>
                                    </label>
                                    <i class="el-icon-close" @click="delFile(v.id)" v-if="$parent.isEdit === 1 || $parent.isEdit === 2"></i>
                                </li>
                            </ul> -->
                        </td>

                    </tr>
                    <tr>
                        <td v-show="$route.query.way != 'add'">
                            来源
                        </td>
                        <td v-show="$route.query.way != 'add'" class="cospan" colspan="3">
                            <el-form-item>
                                <el-select v-model="ruleForm.source" clearable placeholder="请选择来源" style="width: 100%" filterable allow-create default-first-option>
                                    <el-option v-for="(s, index) in sourceList" :label="s.label" :value="s.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
            <div class="submit">
                <div>
                    <el-button type="info" size="medium" @click="$router.back()">取消</el-button>
                    <el-button type="primary" size="medium" @click="submitForm('ruleForm')">确定</el-button>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
import { plateListThree, listType } from "@/utils/common"
import { setCookie } from '@/utils/auth'
import env from '@/config/env';
const checkFile = function (rule, value, callback) {
    if (!value) {
        callback();
    }
}
export default {
    components: {},
    data () {
        return {
            plateListThree,
            listType,
            env,
            options: [],
            ruleForm: {
                id: "",
                creditCode: "",
                industryCategory: "",  //行业类别
                unifiedCreditCode: "",  //统一社会信用代码
                customerName: "",  //供应商名称
                drawerName: "",  //出票人全称
                drawerBank: "",  //出票人开户行
                drawerAccount: "", //出票人银行账号
                leadingCadre: "",  //申请原因
                listType: "",  //名单类型
                acceptorName: "",  //承兑人名称
                acceptorType: "",  //承兑/回款人类别
                acceptorBank: "", //承兑人开户行
                handleCustomerName: "", //经手企业名称
                acceptorAccount: "",  //承兑/回款人银行账号
                payeeName: "",  //收款人全称s
                payeeType: "",  //收款人账号类型
                payeeBank: "",  //收款人开户行
                projectName: "",  //项目名称
                labelContent: "",  //标签
                remark: "", //申请原因
                fileIds: [],  //上传的凭证id集合
            },
            financeCompany: "",  //供应商名称
            rules: {
                industryCategory: [{ required: true, message: "请选择板块", trigger: "change" }],
                listType: [{ required: true, message: "请选择名单类型", trigger: "blur" }],
                // unifiedCreditCode: [{ required: true, message: "信用代码不能为空", trigger: "blur" }],
                file: [{ required: true, validator: checkFile, trigger: "blur" }],
                remark: [{ required: true, message: "申请原因不能为空", trigger: "blur" }],
                reason: [{ required: true, validator: checkFile, trigger: "blur" }]
            },
            drawerType: "",
            drawerTypeList: [
                { value: 1, label: '承建单位' },
                { value: 2, label: '建设单位' },
                { value: 3, label: '供应商' },
                { value: 4, label: '其他企业' }
            ],
            file: [],
            labelList: [],
            parentId: "",
            logList: [],  //操作记录
            reason: "",  //审批意见
            industryPlaceholder: 1,
            drawerName_disabled: false,
            acceptorName_disabled: false,
            payeeName_disabled: false,
            sourceList: [
                { value: 0, label: '系统录入' },
                { value: 1, label: '手工导入' },
                { value: 2, label: '系统推荐' },
                { value: 3, label: '盛易通' },
                { value: 4, label: '盛达通' },
                { value: 5, label: '中登网' }
            ],
        };
    },
    created () {
        this.access_token = document.cookie.split('=')[1].split(';')[0];
        setCookie('SY_TOKEN', this.access_token, 15);
        this.parentId = this.$route.query.id;
        if (this.$route.query.way === 'add') {//新增
        } else { //编辑
            this.getDetailList();
            this.getFileList();
        }
    },
    mounted () {

        if (this.$route.query.tabData) {

            this.$nextTick(() => {
                this.tabData = JSON.parse(this.$route.query.tabData);
                if (this.tabData.transferType === '承建单位') {
                    this.ruleForm.industryCategory = 1;
                    this.ruleForm.listType = 3;//灰名单
                    this.ruleForm.acceptorName = this.tabData.transfer;//承兑人名称
                    this.ruleForm.acceptorType = 1   //承兑单位类型
                    this.ruleForm.acceptorBank = this.tabData.openAccountBank; //开户行
                    this.ruleForm.acceptorAccount = this.tabData.account;//承建单位银行账号

                } else if (this.tabData.transferType === '供应商') {
                    this.ruleForm.industryCategory = 1;
                    this.ruleForm.listType = 3;//灰名单
                    this.financeCompany = this.tabData.transfer;//融资企业名称
                    this.ruleForm.acceptorType = 1   //承兑单位类型
                    this.ruleForm.acceptorName = this.tabData.buyer;//承兑人名称
                    this.ruleForm.payeeName = this.tabData.transfer;//收款人全称
                    this.ruleForm.payeeType = 3;//融资类型
                    this.ruleForm.payeeBank = this.tabData.openAccountBank;//收款人开户行
                    this.ruleForm.payeeAccount = this.tabData.account;//收款人银行账号
                    this.customerNameChange();
                }
                // this.ruleForm.acceptorName = this.tabData.construction;
                // this.ruleForm.acceptorBank = this.tabData.constructionBank;
                // this.ruleForm.acceptorAccount = this.tabData.constructionBankAccount;
                // this.ruleForm.payeeName = this.tabData.supplier;
                // this.ruleForm.payeeBank = this.tabData.supplierBank;
                // this.ruleForm.payeeAccount = this.tabData.supplierBankAccount;
                // this.ruleForm.customerName = this.tabData.supplier;
                // this.financeCompany = this.tabData.supplier;
                // this.ruleForm.industryCategory = 1
                // this.ruleForm.listType = 3;
                // this.ruleForm.payeeType = 3;
                // this.ruleForm.source = 5;

            })
        }
    },
    methods: {
        selectChange () {
            switch (this.ruleForm.industryCategory) {
                case 1:
                    return [
                        { label: '承建单位', value: 1 },
                        { label: '建设单位', value: 2 },
                        { label: '供应商', value: 3 },
                        { label: '其他企业', value: 4 }
                    ]
                case 2:
                    return [
                        { label: '上游药厂', value: 1 },
                        { label: '商业公司', value: 2 },
                        { label: '下游医药', value: 3 },
                        { label: '其他企业', value: 4 }
                    ]
                case 3:
                    return [
                        { label: '合作上游', value: 1 },
                        { label: '合作下游', value: 2 },
                        { label: '供应商', value: 3 },
                        { label: '贸易商', value: 4 }
                    ]
                default:
                    return []
            }
        },
        industryChange (val) {
            this.industryPlaceholder = val
        },
        supplierNameChange () {
            switch (this.ruleForm.industryCategory) {
                case 1:
                    return {
                        title: '供应商名称',
                        placeholder: '请输入供应商名称'
                    }
                case 2:
                    return {
                        title: '商业公司名称',
                        placeholder: '请输入商业公司名称'
                    }
                case 3:
                    return {
                        title: '贸易商名称',
                        placeholder: '请输入贸易商名称'
                    }
                default:
                    return {
                        title: '供应商名称',
                        placeholder: '请输入供应商名称'
                    }
            }
        },
        //输入企业名称获取信用代码和上级公司等相关信息
        customerNameChange () {
            this.ajax.json("/dcp/query/enterprise/credit/code", { companyName: this.financeCompany, x_user_id: "" }, {
                type: "GET"
            }).then(res => {
                if (res.code === "200") {
                    this.ruleForm.unifiedCreditCode = res.data.creditCode || '未在工商注册，内部机构';
                }
            });
        },
        //改变名单类型的回调
        nameTypeChange () {
            this.ruleForm.labelContent = "";
            this.labelList = [];
            this.getLabelList();
        },
        //改变出票人全称类型
        drawerTypeChange (val) {
            if (this.ruleForm.industryCategory === 1) {
                if (val === 3) {
                    this.ruleForm.drawerName = this.financeCompany
                    this.drawerName_disabled = true
                } else {
                    this.ruleForm.drawerName = ''
                    this.drawerName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 2) {
                if (val === 2) {
                    this.ruleForm.drawerName = this.financeCompany
                    this.drawerName_disabled = true
                } else {
                    this.ruleForm.drawerName = ''
                    this.drawerName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 3) {
                if (val === 4) {
                    this.ruleForm.drawerName = this.financeCompany
                    this.drawerName_disabled = true
                } else {
                    this.ruleForm.drawerName = ''
                    this.drawerName_disabled = false
                }
            }

        },
        acceptorTypeChange (val) {
            if (this.ruleForm.industryCategory === 1) {
                if (val === 3) {
                    this.ruleForm.acceptorName = this.financeCompany
                    this.acceptorName_disabled = true
                } else {
                    this.ruleForm.acceptorName = ''
                    this.acceptorName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 2) {
                if (val === 2) {
                    this.ruleForm.acceptorName = this.financeCompany
                    this.acceptorName_disabled = true
                } else {
                    this.ruleForm.acceptorName = ''
                    this.acceptorName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 3) {
                if (val === 4) {
                    this.ruleForm.acceptorName = this.financeCompany
                    this.acceptorName_disabled = true
                } else {
                    this.ruleForm.acceptorName = ''
                    this.acceptorName_disabled = false
                }
            }

        },
        payeeTypeChange (val) {
            if (this.ruleForm.industryCategory === 1) {
                if (val === 3) {
                    this.ruleForm.payeeName = this.financeCompany
                    this.payeeName_disabled = true
                } else {
                    this.ruleForm.payeeName = ''
                    this.payeeName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 2) {
                if (val === 2) {
                    this.ruleForm.payeeName = this.financeCompany
                    this.payeeName_disabled = true
                } else {
                    this.ruleForm.payeeName = ''
                    this.payeeName_disabled = false
                }
            }
            else if (this.ruleForm.industryCategory === 3) {
                if (val === 4) {
                    this.ruleForm.payeeName = this.financeCompany
                    this.payeeName_disabled = true
                } else {
                    this.ruleForm.payeeName = ''
                    this.payeeName_disabled = false
                }
            }

        },
        //获取标签下拉框信息
        getLabelList () {
            this.ajax.json(
                "/dcp/server/antiFraud/label/list", { businessType: 3, listType: this.ruleForm.listType }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.labelList = data;
            })
        },
        //确定
        submitForm (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.ruleForm.fileIds = [];
                    if (this.file.length === 0) {
                        this.$message.warning("凭证附件不能为空！");
                        return;
                    }
                    this.file.map(v => {
                        this.ruleForm.fileIds.push(v.id);
                    })
                    this.ruleForm.labelContent = this.ruleForm.labelContent != "" ? [this.ruleForm.labelContent] : [];
                    this.ruleForm.customerName = this.financeCompany;
                    this.$http("/dcp/save/antiFraud/account", { ...this.ruleForm, drawerType: this.drawerType, financeCompany: this.financeCompany }, {
                        type: "POST"
                    }).then(res => {
                        if (res.code === "200") {
                            if (this.$route.query.way === 'add') {
                                this.$message.success("新增成功");
                            } else {
                                this.$message.success("编辑成功");
                            }
                            this.$router.go(-1)
                        }
                    });
                } else {
                    console.log("error submit!!")
                    return false
                }
            })

        },
        //选择日期得回调
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startCreateDate = v[0]
                this.params.endCreateDate = v[1]
            } else {
                this.params.startCreateDate = ""
                this.params.endCreateDate = ""
            }
        },
        /* 上传文件 */
        async uploadHand (files) {
            if (files.length === 0) {
                return;
            } else if (files.length > 9) {
                this.$message.error("一次最多可以上传9个文件！");
                return;
            }
            let size = 0
            // 判断文件格式
            for (let i = 0; i < files.length; i++) {
                if (files[i].name.indexOf('.jpg') === -1 && files[i].name.indexOf('.png') === -1 && files[i].name.indexOf('.pdf') === -1 && files[i].name.indexOf('.xlsx') === -1 && files[i].name.indexOf('.xls') === -1 && files[i].name.indexOf('.doc') === -1 && files[i].name.indexOf('.docx') === -1) {
                    this.$message.error('请上传图片,pdf,xlsx,docx类型的文件')
                    return
                } else {
                    size += files[i].size
                }
            }
            if (size > 1048576 * 20) return this.$message.error("上传文件总容量不超能过20M！");
            // console.log(this.list[0]);
            this.ajax.upload('/dcp/antiFraud/file/upload', { file: { files } }).then(res => {
                let data = res.data;
                this.file = data || [];
            })
        },
        // 删除上传文件
        delFile (id) {
            this.file.map((v, i) => {
                if (v.id === id) {
                    this.file.splice(i, 1)
                }
            })
        },
        //获取详情信息
        getDetailList () {
            this.ajax.json(
                "/dcp/antiFraud/account/detail", { id: this.parentId }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.drawerType = data.drawerType
                this.ruleForm = data;
                this.ruleForm.labelContent = data.labelContent[0];
                this.financeCompany = res.data.customerName
            })
        },
        //获取附件列表
        getFileList () {
            let paramsData = {
                businessId: this.parentId,
                businessType: 2
            }
            this.ajax.json(
                "/dcp/antiFraud/file/list", paramsData, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.file = data || [];
            })
        },
    },
    filters: {
        remark (v) {
            if (v && v.length > 0) {
                return v.length
            } else {
                return 0
            }
        }
    }
};
</script>
<style lang="less" scoped>
/deep/ .el-form--inline .el-form-item {
    width: 100%;
    height: 36px;
    vertical-align: middle;
    margin: 0;
    .el-form-item__content {
        width: 100%;
        height: 36px;
        margin: 0;
        .el-form-item__content {
            width: 100%;
        }
    }
}

.stat {
    .p1 {
        color: #3dbd7d;
    }
    .p2 {
        color: #0486fe;
    }
    .p3 {
        color: #ff8e36;
    }
    .p0 {
        color: #f56540;
    }
    .submit {
        margin-top: 30px;
        background-color: transparent;
        text-align: center;
    }
    .zhengmian {
        width: 100%;
    }
    .stat {
        .p1 {
            color: #3dbd7d;
        }
        .p2 {
            color: #0486fe;
        }
        .p3 {
            color: #ff8e36;
        }
        .p0 {
            color: #f56540;
        }
        .submit {
            margin-top: 30px;
            background-color: transparent;
            text-align: center;
        }
        .zhengmian {
            width: 100%;
            /deep/ .el-tag {
                // display: none;
            }
        }
        .tags-list {
            line-height: 0;
            .el-form-item {
                width: 100%;
                /deep/ .el-form-item__content {
                    width: 100%;
                }
            }
            /deep/ .el-tag {
                font-family: PingFangSC-Light;
                border: 0;
                background: #293e42;
                border-radius: 3px;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
                height: 24px;
                line-height: 24px;
                margin-right: 5px;
                margin-bottom: 5px;
                padding-left: 10px;
                .el-tag__close {
                    font-size: 14px;
                    color: #43a1ac;
                    &:hover {
                        background: #293e42;
                        color: #43a1ac;
                    }
                }
            }
            &.tags-list1 {
                /deep/ .el-tag {
                    background: #422d29;
                    color: #bb4d31;
                    .el-tag__close {
                        color: #bb4d31;
                        &:hover {
                            background-color: #422d29;
                            color: #bb4d31;
                        }
                    }
                }
            }
        }
        .beizhu {
            width: 100%;
            display: flex;
            justify-content: space-around;
            /deep/ .el-form-item__label {
                width: 125px;
            }
            /deep/ .el-form-item__content {
                // width: 100%;
                flex: 1;
                position: relative;
                .com-num {
                    font-family: PingFangSC-Light;
                    position: absolute;
                    bottom: -5px;
                    right: 7px;
                    font-size: 12px;
                    color: #d3d3d4;
                }
            }
        }
    }
}
</style>