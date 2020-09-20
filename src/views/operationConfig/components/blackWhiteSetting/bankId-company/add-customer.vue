<template>
    <div>
        <el-dialog :title="dialogTitle(isEdit)" :visible.sync="$parent.dialogVisible" style="margin-top: -10vh;" width="1060px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm form_content" label-position="left" style="margin: 0 28px 0 28px">
                <div class="form_content_top">
                    <div class="form_left">
                        <el-form-item label="行业类别" prop="industryCategory">
                            <el-select v-model="ruleForm.industryCategory" placeholder="请选择板块" style="width: 260px" :disabled="disabled">
                                <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="出票人全称" prop="drawerName">
                            <el-input placeholder="请输入出票人" v-model="ruleForm.drawerName" class="input-with-select" style="width: 260px" :disabled="disabled">
                                <el-select v-model="drawerType" slot="prepend" placeholder="请选择出票人类型" @change="drawerTypeChange" style="width: 110px" :disabled="disabled">
                                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in drawerTypeList" :key="index"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="出票人开户行" prop="drawerBank">
                            <el-input v-model="ruleForm.drawerBank" :disabled="disabled" placeholder="请输入出票人开户行"></el-input>
                        </el-form-item>
                        <el-form-item label="出票人银行账号" prop="drawerAccount">
                            <el-input v-model="ruleForm.drawerAccount" :disabled="disabled" placeholder="请输入出票人银行账号"></el-input>
                        </el-form-item>
                        <el-form-item label="承兑人全称" prop="acceptorName">
                            <el-input placeholder="请输入承兑人" v-model="ruleForm.acceptorName" class="input-with-select" style="width: 260px" :disabled="disabled">
                                <el-select v-model="ruleForm.acceptorType" slot="prepend" placeholder="请选择承兑人类型" style="width: 110px" :disabled="disabled">
                                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in drawerTypeList" :key="index"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="承兑人开户行" prop="acceptorBank">
                            <el-input v-model="ruleForm.acceptorBank" :disabled="disabled" placeholder="请输入承兑人开户行"></el-input>
                        </el-form-item>
                        <el-form-item label="承兑人银行账号" prop="acceptorAccount">
                            <el-input v-model="ruleForm.acceptorAccount" :disabled="disabled" placeholder="请输入承兑人银行账号"></el-input>
                        </el-form-item>
                        <el-form-item label="标签">
                            <el-select v-model="ruleForm.labelContent" clearable placeholder="请选择标签" :disabled="disabled" style="width: 260px" filterable allow-create default-first-option>
                                <el-option v-for="(s, index) in labelList" :label="s" :value="s" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="form_right">
                        <el-form-item label="名单类型" prop="listType">
                            <el-select v-model="ruleForm.listType" clearable placeholder="请选择名单类型" :disabled="disabled" @change="nameTypeChange" style="width: 260px">
                                <el-option v-for="(s, index) in listType" :label="s.label" :value="s.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="融资企业名称">
                            <el-input v-model="financeCompany" placeholder="请输入融资企业名称" :disabled="disabled" @change="customerNameChange" style="width: 260px"></el-input>
                        </el-form-item>
                        <el-form-item label="项目名称" prop="projectName">
                            <el-input v-model="ruleForm.projectName" :disabled="disabled" placeholder="请输入项目名称" style="width: 260px"></el-input>
                        </el-form-item>
                        <el-form-item label="经手企业名称" prop="handleCustomerName">
                            <el-input v-model="ruleForm.handleCustomerName" placeholder="请输入经手企业名称" :disabled="disabled" style="width: 260px"></el-input>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码" prop="unifiedCreditCode">
                            <el-input v-model="ruleForm.unifiedCreditCode" placeholder="输入企业名称后自动生成" :disabled="disabled" style="width: 260px"></el-input>
                        </el-form-item>

                        <el-form-item label="收款人全称" prop="payeeName">
                            <el-input placeholder="请输入收款人" v-model="ruleForm.payeeName" class="input-with-select" style="width: 260px" :disabled="disabled">
                                <el-select v-model="ruleForm.payeeType" slot="prepend" placeholder="请选择" style="width: 110px" :disabled="disabled">
                                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in drawerTypeList" :key="index"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="收款人开户行" prop="payeeBank">
                            <el-input v-model="ruleForm.payeeBank" placeholder="请输入收款人开户行" :disabled="disabled" style="width: 260px"></el-input>
                        </el-form-item>
                        <el-form-item label="收款人银行账号" prop="payeeAccount">
                            <el-input v-model="ruleForm.payeeAccount" placeholder="请输入收款人银行账号" :disabled="disabled" style="width: 260px"></el-input>
                        </el-form-item>
                    </div>
                </div>

                <el-form-item label="申请原因" prop="remark">
                    <el-input type="textarea" placeholder="请输入内容" v-model="ruleForm.remark" maxlength="5000" show-word-limit :disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="凭证附件" prop="file">
                    <table class="file-table">
                        <tr>
                            <td class="upload_top" v-if="!disabled">操作</td>
                            <td>已上传文件</td>
                        </tr>
                        <tr class="upload_bottom">
                            <td v-if="!disabled">
                                <c-upload accept=".jpg,.png,.pdf,.xlsx,.xls,.docx,.doc" type="blue" size="medium" multiple="multiple" v-on:changehand="v => {uploadHand(v)}" plain class="upload-file">
                                    <i class="iconfont icon-tongyong-daochutubiao"></i>
                                    选择文件
                                </c-upload>
                            </td>
                            <td v-if="file&&file.length">
                                <ul class="el-upload-list el-upload-list--text">
                                    <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file" :key="k">
                                        <a class="el-upload-list__item-name" :href="env + '/dcp/antiFraud/file/?fileId=' + v.id + '&access_token=' + access_token"><i class="el-icon-document"></i>{{v.fileName}}</a>
                                        <label class="el-upload-list__item-status-label">
                                            <i class="el-icon-upload-success el-icon-circle-check"></i>
                                        </label>
                                        <i class="el-icon-close" @click="delFile(v.id)" v-if="isEdit === 1 || isEdit === 2"></i>
                                    </li>
                                </ul>
                            </td>
                            <td v-else class="no-data">暂无数据</td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="动态" v-if="isEdit === 3 || isEdit === 4">
                    <el-table :data="logList" border class="tab-info" max-height="517">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="createTime" label="操作时间" width="200"></el-table-column>
                        <el-table-column prop="logDesc" label="操作内容" min-width="200" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item v-if="isEdit === 4" label="审核" prop="reason">
                    <el-input type="textarea" placeholder="必填项，请填入审批意见" v-model="reason" maxlength="5000" show-word-limit></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="$parent.dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')" v-if="$parent.isEdit !== 4">确 定</el-button>
                <div v-if="$parent.isEdit === 4" style="display: inline-block;">
                    <el-button type="info" @click="goAudit(2)" size="mini">否 决</el-button>
                    <el-button type="danger" @click="goAudit(3)" size="mini">退 回</el-button>
                    <el-button type="primary" @click="goAudit(1)" size="mini">通 过</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { plateList, listType } from "@/utils/common"
import { setCookie } from '@/utils/auth'
import env from '@/config/env';
const checkFile = function (rule, value, callback) {
    if (!value) {
        callback();
    }
}
export default {
    props: {
        dialogVisible: Boolean
    },
    data() {
        return {
            plateList,
            listType,
            env,
            ruleForm: {
                id: "",
                creditCode: "",
                industryCategory: "",  //行业类别
                unifiedCreditCode: "",  //统一社会信用代码
                customerName: "",  //融资企业名称
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
            financeCompany: "",  //融资企业名称
            rules: {
                industryCategory: [{ required: true, message: "请选择板块", trigger: "change" }],
                listType: [{ required: true, message: "请选择名单类型", trigger: "blur" }],
                unifiedCreditCode: [{ required: true, message: "信用代码不能为空", trigger: "blur" }],
                file: [{ required: true, validator: checkFile, trigger: "blur" }],
                remark: [{ required: true, message: "申请原因不能为空", trigger: "blur" }],
                reason: [{ required: true, validator: checkFile, trigger: "blur" }]
            },
            disabled: false,
            drawerType: "",
            drawerTypeList: [
                { value: 1, label: '承建单位' },
                { value: 2, label: '建设单位' },
                { value: 3, label: '融资企业' },
                { value: 4, label: '其他企业' }
            ],
            file: [],
            labelList: [],
            parentId: "",
            isEdit: 1,
            logList: [],  //操作记录
            reason: "",  //审批意见
        }
    },
    created() {
        this.isEdit = this.$parent.isEdit;
        this.access_token = document.cookie.split('=')[1].split(';')[0];
        setCookie('SY_TOKEN', this.access_token, 15);
        this.parentId = this.$parent.id;
        if (this.isEdit === 1) {//新增
            this.disabled = false;
        } else if (this.isEdit === 2) { //编辑
            this.disabled = false;
            this.getDetailList();
            this.getFileList();
        } else { //详情+审核
            this.disabled = true;
            this.getDetailList();
            this.getFileList();
            this.getRecord();
        }
    },
    methods: {
        dialogTitle(title) {
            switch (title) {
                case 1:
                    return "新增账号名单"
                case 2:
                    return "编辑账号名单"
                case 3:
                    return "账号名单详情"
                case 4:
                    return "账号名单审核"
            }
        },
        //输入企业名称获取信用代码和上级公司等相关信息
        customerNameChange() {
            this.ajax.json("/dcp/query/enterprise/credit/code", { companyName: this.ruleForm.customerName, x_user_id: "" }, {
                type: "GET"
            }).then(res => {
                if (res.code === "200") {
                    this.ruleForm.unifiedCreditCode = res.data.creditCode;
                }
            });
        },
        //改变名单类型的回调
        nameTypeChange() {
            this.ruleForm.labelContent = "";
            this.labelList = [];
            this.getLabelList();
        },
        //改变出票人全称类型
        drawerTypeChange() {
            this.ruleForm.drawerName = "";
            if (this.drawerType === 3) {
                this.ruleForm.drawerName = this.financeCompany;
            }
        },
        //获取标签下拉框信息
        getLabelList() {
            this.ajax.json(
                "/dcp/server/antiFraud/label/list", { businessType: 3, listType: this.ruleForm.listType }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.labelList = data;
            })
        },
        submitForm(formName) {
            if (!this.disabled) {
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
                        this.ruleForm.labelContent = [this.ruleForm.labelContent];
                        this.ruleForm.customerName = this.financeCompany;
                        this.$http("/dcp/save/antiFraud/account", this.ruleForm, {
                            type: "POST"
                        }).then(res => {
                            if (res.code === "200") {
                                if (this.isEdit === 1) {
                                    this.$message.success("新增成功");
                                } else {
                                    this.$message.success("编辑成功");
                                }
                                this.$parent.getList();
                                this.$parent.dialogVisible = false;
                            }
                        });
                    } else {
                        console.log("error submit!!")
                        return false
                    }
                })
            }

        },
        //审核
        goAudit(status) {
            //审核
            if (this.reason == "") {
                this.$message.warning("审批意见不能为空！");
                return;
            } else {
                let paramsData = {
                    id: this.parentId,
                    reason: this.reason,
                    status: status
                }
                this.$http(
                    '/dcp/antiFraud/account/audit', paramsData
                ).then(res => {
                    this.$message.success("处理成功");
                    this.$parent.getList();
                    this.$parent.dialogVisible = false;

                })
            }
        },
        //选择日期得回调
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startCreateDate = v[0]
                this.params.endCreateDate = v[1]
            } else {
                this.params.startCreateDate = ""
                this.params.endCreateDate = ""
            }
        },
        handleChange(value) {
            console.log(value)
        },
        /* 上传文件 */
        async uploadHand(files) {
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
        delFile(id) {
            this.file.map((v, i) => {
                if (v.id === id) {
                    this.file.splice(i, 1)
                }
            })
        },
        //获取详情信息
        getDetailList() {
            this.ajax.json(
                "/dcp/antiFraud/account/detail", { id: this.parentId }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.ruleForm = data;
                this.ruleForm.labelContent = data.labelContent[0];
            })
        },
        //获取附件列表
        getFileList() {
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
        // 获取操作记录
        getRecord() {
            this.$http(
                '/dcp/antiFraud/operation/record/list',
                { businessType: 2, businessId: this.parentId },
                { type: 'get' }
            ).then(res => {
                this.logList = res.data || []
            })
        },
    }
}
</script>
<style lang="scss" scoped>
    .form_content_top {
        display: flex;
        .form_right {
            margin-left: 160px;
            width: 380px;
        }
    }
    /deep/ .el-textarea .el-input__count {
        background: transparent;
        bottom: -10px;
    }
    .el-textarea {
        /deep/ .el-textarea__inner {
            height: 80px;
            resize: none;
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            line-height: 18px;
        }
    }
    .file-table {
        width: 100%;
        color: rgba(255, 255, 255, 0.8);
        border: 1px solid #2d3034;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        tr {
            width: 100%;
            td {
                text-align: center;
                border-right: 1px solid #2d3034;
                border-bottom: 1px solid #2d3034;
            }
            td.upload_top {
                width: 20%;
            }

            &.upload_bottom {
                td {
                    padding: 10px 0;
                    &:last-child {
                        text-align: left;
                    }
                    &.no-data {
                        color: #909399;
                        text-align: center;
                    }
                    .upload-file {
                        /deep/ .el-button {
                            position: relative;
                            padding-left: 30px;
                            background: #1e292e;
                            color: #43a1ac;
                            border: 1px solid #366f71;
                            .icon-tongyong-daochutubiao {
                                position: absolute;
                                top: 4px;
                                left: 10px;
                            }
                        }
                    }
                    .el-upload-list__item {
                        color: rgba(255, 255, 255, 0.8);
                        .el-upload-list__item-name {
                            color: rgba(255, 255, 255, 0.8);
                            &:hover {
                                color: #43a1ac !important;
                            }
                        }
                        .el-icon-upload-success,
                        .el-icon-close {
                            color: rgba(255, 255, 255, 0.8);
                        }
                        &:hover {
                            background: transparent;
                            .el-upload-list__item-name {
                                color: rgba(255, 255, 255, 0.8);
                            }
                            .el-icon-close {
                                color: #fff;
                            }
                        }
                        &:first-child {
                            margin-top: 0;
                        }
                    }
                }
            }
        }
    }
    .tabs-title {
        color: #fff;
        font-size: 16px;
    }
    /deep/
        .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange {
        width: 300px;
    }
    /deep/ .el-input-group__prepend {
        background: #1d1e23;
        border: 1px solid #2d3034;
    }
    /deep/ .el-range-editor.is-disabled input {
        background: #1d1e23;
    }
    /deep/.el-form .el-input__inner {
        &::placeholder {
            color: #909399;
        }
        &::-webkit-input-placeholder {
            /* WebKit browsers 适配谷歌 */
            color: #909399;
        }
        &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 适配火狐 */
            color: #909399;
        }

        &::-moz-placeholder {
            /* Mozilla Firefox 19+ 适配火狐 */
            color: #909399;
        }

        &:-ms-input-placeholder {
            /* Internet Explorer 10+  适配ie*/
            color: #909399;
        }
    }
    /deep/ .el-textarea.is-disabled .el-textarea__inner {
        color: #909399;
    }
    /deep/ .el-form .el-textarea .el-textarea__inner {
        &::placeholder {
            color: #909399;
        }
        &::-webkit-input-placeholder {
            /* WebKit browsers 适配谷歌 */
            color: #909399;
        }
        &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 适配火狐 */
            color: #909399;
        }

        &::-moz-placeholder {
            /* Mozilla Firefox 19+ 适配火狐 */
            color: #909399;
        }

        &:-ms-input-placeholder {
            /* Internet Explorer 10+  适配ie*/
            color: #909399;
        }
    }
</style>
