<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="$parent.dialogVisible" style="margin-top: -10vh;" width="1060px">
            <el-form :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm form_content" label-position="left" style="margin: 0 28px 0 28px">
                <div class="form_content_top">
                    <div class="form_left">
                        <el-form-item label="行业类别" prop="industryCategory">
                            <el-select v-model="ruleForm.industryCategory" placeholder="请选择板块" style="width: 240px" :disabled="disabled">
                                <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="名单类型" prop="listType">
                            <el-select v-model="ruleForm.listType" clearable placeholder="请选择名单类型" :disabled="disabled">
                                <el-option v-for="(s, index) in listType" :label="s.label" :value="s.value" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="企业名称" prop="customerName">
                            <el-input v-model="ruleForm.customerName" :disabled="disabled" @change="customerNameChange" placeholder="请输入企业名称"></el-input>
                        </el-form-item>
                        <el-form-item label="统一社会信用代码" prop="unifiedCreditCode">
                            <el-input v-model="ruleForm.unifiedCreditCode" :disabled="disabled" placeholder="输入企业名称后自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="正面标签" prop="positiveLabelContent">
                            <el-input v-model="ruleForm.positiveLabelContent" :disabled="disabled" placeholder="请输入正面标签"></el-input>
                        </el-form-item>
                        <el-form-item label="负面标签" prop="negativeLabelContent">
                            <el-input v-model="ruleForm.negativeLabelContent" :disabled="disabled" placeholder="请输入负面标签"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form_right">
                        <el-form-item label="企业类别" prop="businessCategory">
                            <el-select v-model="ruleForm.businessCategory" clearable placeholder="请选择企业类别" disabled>
                                <el-option v-for="(s, index) in businessCategoryArr" :label="s.label" :value="s.value" :key="index"></el-option>
                            </el-select>
                            <!-- <el-input v-model="ruleForm.businessCategory"></el-input> -->
                        </el-form-item>
                        <el-form-item label="省市">
                            <el-cascader :options="city" v-model="selectedOptions" :props="{ expandTrigger: 'hover' }" :disabled="disabled"></el-cascader>
                        </el-form-item>
                        <el-form-item label="时效性">
                            <el-date-picker v-model="dateArr" type="daterange" unlink-panels value-format="yyyy-MM-dd" range-separator="至" :disabled="disabled"></el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item label="层级关系" prop="leadingCadre">
                            <el-input placeholder="请添加" v-model="ruleForm.parentUnit" disabled class="input-with-select" style="width: 100%;">
                                <el-button slot="append" @click="addRanked">添加</el-button>
                            </el-input>
                        </el-form-item> -->
                        <el-form-item label="上级单位" prop="parentUnit">
                            <el-input v-model="ruleForm.parentUnit" :disabled="disabled" placeholder="输入企业名称后自动生成"></el-input>
                        </el-form-item>
                        <el-form-item label="所在层级" prop="grade">
                            <el-select v-model="ruleForm.grade" clearable placeholder="输入企业名称后自动生成">
                                <el-option v-for="(s, index) in gradeList" :label="s.label" :value="s.value" :key="index"></el-option>
                            </el-select>
                            <!-- <el-input v-model="ruleForm.grade" :disabled="disabled" placeholder="输入企业名称后自动生成"></el-input> -->
                        </el-form-item>
                        <el-form-item label="跟进人" prop="followPeople">
                            <el-input v-model="ruleForm.followPeople" :disabled="disabled" placeholder="请输入跟进人"></el-input>
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
                                        <!-- <i class="el-icon-close" @click="delFile(v.id)"></i> -->
                                    </li>
                                </ul>
                            </td>
                            <td v-else class="no-data">暂无数据</td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="动态">
                    <el-table :data="logList" border class="tab-info" max-height="517">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="createTime" label="操作时间" width="200"></el-table-column>
                        <el-table-column prop="logDesc" label="操作内容" min-width="200" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="$parent.dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="$parent.dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog :title="addRankedTitle" :visible.sync="randedVisible">
            <div class="data-tree">
                <el-tree :data="addRankedList" :show-checkbox="showCheckbox" node-key="id" :props="configTree" default-expand-all ref="DeviceGroupTree" :check-strictly="true" @check-change="checkGroupNode">
                </el-tree>
            </div>
            <div slot="footer">
                <el-button @click="randedVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="randedVisible = false">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
import { plateList, listType, gradeList } from "@/utils/common"
import { setCookie } from '@/utils/auth'
import env from '@/config/env';
import city from "@/views/industryTrade/config/city1.js";
export default {
    props: {
        dialogVisible: Boolean
    },
    data() {
        return {
            plateList,
            listType,
            gradeList,
            env,
            city,
            dateArr: [],
            selectedOptions: [],
            options: [],
            configTree: {
                id: "parentId",
                label: "companyName",
                children: "childList",
                multiple: false
            },
            ruleForm: {
                id: "",
                creditCode: "",
                industryCategory: "", //行业类别
                customerType: "",  //企业类别
                listType: "",  //名单类型
                customerName: "",  //企业名称
                unifiedCreditCode: "",  //统一社会信用代码
                positiveLabelContent: "", //正面标签
                negativeLabelContent: "",  //负面标签
                businessCategory: "1",  //企业类别
                province: "",  //省
                city: "",  //市
                startDate: "", //开始时间
                endDate: "", //结束时间
                followPeople: "",  //跟进人
                remark: "",  //原因
                fileIds: [],  //文件id列表
                parentUnit: "",  //上级单位
                status: 0,  //企业审核状态
                shareholdingRatio: "",  //持股比例
                grade: "",
            },
            ranked: "", //层级
            CodeList: [],  //企业信用代码列表
            businessCategoryArr: [
                { value: "1", label: '核心企业' },
                { value: "2", label: '业主企业' }
            ],
            selectData: [],
            showCheckbox: true,
            disabled: true,
            file: [],
            access_token: '',
            logList: [],  //操作记录
            reason: "",  //审批意见
            parentId: "",  //父组件id
            dialogTitle: "企业名单详情"
        }
    },
    created() {
        this.parentId = this.$parent.id;
        this.access_token = document.cookie.split('=')[1].split(';')[0];
        setCookie('SY_TOKEN', this.access_token, 15);
        this.disabled = true;
        this.getDetailList();
        this.getFileList();
        this.getRecord();
    },
    watch: {

    },
    methods: {
        //输入企业名称获取信用代码和上级公司等相关信息
        customerNameChange() {
            //企业信用代码
            this.ajax.json("/dcp/query/enterprise/credit/code", { companyName: this.ruleForm.customerName, x_user_id: "" }, {
                type: "GET"
            }).then(res => {
                if (res.code === "200") {
                    this.ruleForm.unifiedCreditCode = res.data.creditCode;
                }
            });
            //上级和所属等级
            this.ajax.json("/dcp/antiFraud/company/tree/info", { companyName: this.ruleForm.customerName }, {
                type: "GET"
            }).then(res => {
                if (res.code === "200") {
                    this.ruleForm.parentUnit = res.data.parentCompanyName || "暂无";
                    this.ruleForm.grade = res.data.grade;
                }
            });
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
        //文件点击下载
        downLoad(v) {
            if (this.disabled) {
                this.ajax.json("/dcp/antiFraud/file", { fileId: v.id }, {
                    type: "GET"
                }).then(res => {
                    if (res.code === "200") {
                        let data = res.data;
                        window.open(data.filePrefix + '?filepath=' + data.physicalFileName + '&fileName=' + data.fileName + '&dataPath=' + data.dataPath)
                    }
                });
            }

        },
        //节点选中状态发生变化时的回调
        checkGroupNode(data, checked, node) {
            console.log(data);
            if (checked) {
                this.$refs.DeviceGroupTree.setCheckedKeys([data.parentId]);
                this.ruleForm.parentUnit = data.companyName;
                this.ruleForm.grade = data.grade;
            } else {
                this.ruleForm.parentUnit = "";
                this.ruleForm.grade = "";
            }
            console.log(this.ruleForm.parentUnit);
        },
        //获取详情信息
        getDetailList() {
            this.ajax.json(
                "/dcp/antiFraud/customer/detail", { id: this.parentId }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                data.businessCategory = data.businessCategory.toString() || "";
                this.ruleForm = data;
                this.selectedOptions = [data.province, data.city];
                this.dateArr = [data.startDate, data.endDate];
                this.ruleForm.positiveLabelContent = data.positiveLabelContent[0] || "";
                this.ruleForm.negativeLabelContent = data.negativeLabelContent[0] || "";
                this.ruleForm.grade = Number(data.grade);
            })
        },
        //获取附件列表
        getFileList() {
            let paramsData = {
                businessId: this.parentId,
                businessType: 1
            }
            this.ajax.json(
                "/dcp/antiFraud/file/list", paramsData, { type: 'get' }
            ).then(res => {
                let data = res.data;
                this.file = data || [];
            })
        },
        // 获取 操作记录
        getRecord() {
            this.$http(
                '/dcp/antiFraud/operation/record/list',
                { businessType: 1, businessId: this.parentId },
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
    /deep/ .el-input-group__append,
    .el-input-group__prepend {
        background-color: #1d1e23;
        border-color: #2d3034;
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
    .data-tree {
        height: 500px;
        overflow: scroll;
        background: #232528;
    }
    /deep/ .el-tree {
        background: #232528;
        color: #ccc;
    }
    /deep/.el-form .el-input__inner,
    .el-range-input {
        background: #1d1e23;
        border: 1px solid #2d3034;
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
    /deep/ .el-range-editor.is-disabled input {
        background: #1d1e23;
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
