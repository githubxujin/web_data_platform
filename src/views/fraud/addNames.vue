<template>
    <div class="stat">
        <el-row class="table-wrap mt15 mb30">
            <div class="table-title" v-if="$route.query.way === 'add'">企业名单新增</div>
            <div class="table-title" v-else>企业名单修改 </div>
            <el-form :inline="true" :model="params" :rules="rules" ref="params" size="medium">
                <table class="table-public-detail">
                    <tr>
                        <td>
                            <span>*</span>
                            行业类别
                        </td>
                        <td>
                            <el-form-item prop="industryCategory">
                                <el-select v-model="params.industryCategory" placeholder="请选择板块" style="width: 100%" :disabled="disabled" @change="getCompanyTypeList">
                                    <el-option :label="item.label" :value="item.value" v-for="(item,index) in plateList" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            <span>*</span>
                            企业类别
                        </td>
                        <td>
                            <el-form-item prop="customerType">
                                <el-select v-model="params.customerType" clearable placeholder="企业类别" style="width: 100%">
                                    <el-option v-for="(s, index) in companyTypeList" :label="s" :value="s" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>*</span>
                            名单类型
                        </td>
                        <td>
                            <el-form-item prop="listType">
                                <el-select v-model="params.listType" clearable placeholder="" @change="listTypeChange" style="width:100%;">
                                    <el-option v-for="(s, index) in listType" :label="s.label" :value="s.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            <span>*</span>
                            企业名称
                        </td>
                        <td class="customer-name">
                            <el-form-item prop="customerName" class="to-add">
                                <el-input v-model="params.customerName" clearable @change="customerNameChange" placeholder="" @blur="blurGetCompany"></el-input>
                                <!-- <el-button class="btn-add" icon="el-icon-plus" size="mini" type="primary" @click="add">添加</el-button> -->
                            </el-form-item>
                            <a v-if="isStatus === 0" class="to-links">评估中...</a>
                            <a v-if="id && isStatus" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId" target="_blank">企业评估</a>
                            <a v-if="!id && evaluateId" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId" target="_blank">企业评估</a>
                        </td>
                    </tr>
                    <tr>
                        <td>上级单位</td>
                        <td>
                            <el-form-item prop="parentUnit">
                                <el-input v-model="params.parentUnit" :disabled="disabled" style="width: 100%"></el-input>
                            </el-form-item>
                        </td>
                        <td>所在层级</td>
                        <td>
                            <el-form-item prop="grade">
                                <el-select v-model="params.grade" clearable :disabled="disabled" style="width: 100%">
                                    <el-option v-for="(s, index) in gradeList" :label="s.label" :value="s.value" :key="index"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>正面标签</td>
                        <td>
                            <el-form-item>
                                <el-select class="zhengmian" v-model="params.positiveLabelContent" multiple filterable allow-create default-first-option clearable placeholder="请输入正面标签">
                                    <el-option v-for="(v,i) in zheng" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-row class="tags-list" v-if="params.positiveLabelContent.length>0">
                                <el-tag v-for="tag in params.positiveLabelContent" :key="tag" closable @close="closes(tag)"> {{tag}}</el-tag>
                            </el-row> -->
                        </td>
                        <td>负面标签</td>
                        <td>
                            <el-form-item>
                                <el-select class="zhengmian" v-model="params.negativeLabelContent" multiple filterable allow-create default-first-option clearable placeholder="请输入负面标签">
                                    <el-option v-for="(v,i) in fumian" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                            <!-- <el-row class="tags-list tags-list1" v-if="params.negativeLabelContent.length>0">
                                <el-tag v-for="tag in params.negativeLabelContent" :key="tag" closable @close="closes1(tag)">{{tag}}</el-tag>
                            </el-row> -->
                        </td>
                    </tr>
                    <tr>
                        <td>跟进人</td>
                        <td>
                            <el-form-item prop="">
                                <el-input v-model="params.followPeople" clearable placeholder="请输入跟进人"></el-input>
                            </el-form-item>
                        </td>
                        <td>时效性</td>
                        <td>
                            <el-date-picker v-model="dateArr" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" :disabled="disabled" style="width: 100%"></el-date-picker>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            凭证附件
                        </td>
                        <td class="cospan1" colspan="3">
                            <c-upload accept=".jpg,.png,.pdf,.xlsx,.xls,.docx,.doc" type="primary" class="upload-file" multiple="multiple" v-on:changehand="v => {uploadHand(v)}">
                                选择文件
                            </c-upload>
                            <span v-for="v in file" :key="v.id">
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
                        <td>
                            <span>*</span>
                            申请原因
                        </td>
                        <td class="cospan" colspan="3" style="padding: 9px 20px;">
                            <el-form-item label="" class="beizhu" prop="remark">
                                <el-input type="textarea" resize="none" maxlength="5000" v-model="params.remark" placeholder=""></el-input>
                                <span class="com-num"><span>{{ params.remark | remark }}</span> / {{ 5000 }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>

            <qg-table subtitle="企业基本信息" class="mt20">
                <qg-table-column v-for="(item,index) in getRows()" :key="index" :label="item.key" :column="item.column" width="160">{{item.value}}</qg-table-column>
            </qg-table>

            <div v-if="isXiu">
                <div class="tabs-title mb20 mt20">动态</div>
                <el-table :data="logList" border class="tab-info" max-height="190">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="createdAt" label="操作时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="操作内容" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
            <div v-if="$route.query.way === 'audit'">
                <div class="tabs-title mb20 mt20">审核</div>
                <div class="shenhe">
                    <el-input type="textarea" :rows="4" resize="none" maxlength="5000" show-word-limit v-model="reason" placeholder="必填项，请填写审批意见"></el-input>
                </div>
            </div>

            <div class="submit">
                <div v-if="$route.query.way === 'edit' || $route.query.way === 'add'">
                    <el-button type="info" @click="$router.back()">取消</el-button>
                    <el-button type="primary" @click="submitForm('params')">确定</el-button>
                </div>
                <div v-else>
                    <el-button type="info" @click="goAudit(2)">否 决</el-button>
                    <el-button type="danger" @click="goAudit(3)">退 回</el-button>
                    <el-button type="primary" @click="goAudit(1)">通 过</el-button>
                </div>
            </div>

            <div class="submit">

            </div>
        </el-row>
    </div>
</template>
<script>
import env from '@/config/env';
import env1 from '@/config/remote';
import { setCookie } from '@/utils/auth'
import city from "@/views/industryTrade/config/city1.js";
// eslint-disable-next-line no-unused-vars
import { plateList, gradeList, listType, entTypeLabel, companyTypeList, companyTypeObj } from "@/utils/common"
const checkFile = function (rule, value, callback) {
    if (!value) {
        callback();
    }
}
export default {
    data () {
        return {
            companyTypeList,
            reason: "",  //审批意见
            listType,
            file: [],
            plateList,
            selectedOptions: [],
            gradeList,
            disabled: false,
            city,
            env,
            env1,
            totalSize: 11,
            isDialog: false,
            isXiu: false,
            isShow: false,
            isDis: false,
            isUnfold: true,
            isStatus: '',
            id: '',
            dateArr: [],
            params: {
                creditCode: "",
                industryCategory: "", //行业类别
                customerType: "",  //企业类别
                listType: "",  //名单类型
                customerName: "",  //企业名称
                unifiedCreditCode: "",  //统一社会信用代码
                positiveLabelContent: [], //正面标签
                negativeLabelContent: [],  //负面标签
                businessCategory: 1,  //企业类别
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
            list: [],
            rules: {
                industryCategory: [{ required: true, message: "请选择板块", trigger: "change" }],
                listType: [{ required: true, message: "请选择名单类型", trigger: "change" }],
                customerType: [{ required: true, message: "请选择企业类别", trigger: "change" }],
                customerName: [{ required: true, message: "请输入企业名称", trigger: "change" }],
                remark: [{ required: true, message: "请输入申请原因", trigger: "change" }],
                file: [{ required: true, validator: checkFile, trigger: "blur" }],
                reason: [{ required: true, validator: checkFile, trigger: "blur" }]
            },
            filesList: [],
            logList: [],
            tags: [],
            tags1: [],
            zheng: [],
            fumian: [],
            evaluateId: '',
            access_token: '',
            faithBreak: '',
            companyInfo: {
                industry: '',
                area: {
                    Province: '',
                    City: '',
                    County: ''
                },
                contactInfo: {
                    phoneNumber: '',
                    email: ''
                },
                originalName: []
            },


        }
    },
    created () {
        console.log(this);
        this.id = this.$route.query.id
        this.access_token = document.cookie.split('=')[1].split(';')[0]
        setCookie('SY_TOKEN', this.access_token)
        this.getTags()
        this.getTags1()
        if (this.id) {
            this.getDetailList(this.id)
            this.getFileList()
            this.getRecord()
            this.getCompany(this.$route.query.companyName)
        }
    },
    methods: {
        //获取企业类别
        getCompanyTypeList (val) {
            this.params.customerType = ''
            this.companyTypeList = companyTypeObj[val]
        },
        getRows () {
            let companyInfo = this.companyInfo || {}
            return [
                { key: "企业名称", value: companyInfo.name, column: "qg-two" },
                { key: "经营状态", value: companyInfo.status, column: "qg-two" },
                { key: "统一社会信用代码", value: companyInfo.creditCode, column: "qg-two" },
                { key: "纳税人识别号", value: companyInfo.creditCode, column: "qg-two" },
                { key: "注册号", value: companyInfo.no, column: "qg-two" },
                { key: "组织机构代码", value: companyInfo.orgNo, column: "qg-two" },
                { key: "法定代表人", value: companyInfo.operName, column: "qg-two" },
                { key: "注册资本", value: companyInfo.registCapi, column: "qg-two" },
                { key: "企业类型", value: companyInfo.econKind, column: "qg-two" },
                { key: "所属行业", value: companyInfo.industry ? companyInfo.industry.industry : '', column: "qg-two" },
                { key: "成立日期", value: companyInfo.startDate, column: "qg-two" },
                { key: "所属省份", value: companyInfo.area ? companyInfo.area.Province : '', column: "qg-two" },
                { key: "所属城市", value: companyInfo.area ? companyInfo.area.City : '', column: "qg-two" },
                { key: "所属区县", value: companyInfo.area ? companyInfo.area.County : '', column: "qg-two" },
                { key: "曾用名", value: companyInfo.originalName && companyInfo.originalName.map(i => i.name).join(','), column: "qg-two" },
                { key: "参保人数", value: companyInfo.insuredCount, column: "qg-two" },
                { key: "电话", value: companyInfo.contactInfo ? companyInfo.contactInfo.phoneNumber : '', column: "qg-two" },
                { key: "更多电话", value: '', column: "qg-two" },
                { key: "邮箱", value: companyInfo.contactInfo ? companyInfo.contactInfo.email : '', column: "qg-two" },
                { key: "更多邮箱", value: '', column: "qg-two" },
                { key: "官网", value: '', column: "qg-one" },
                { key: "企业地址", value: companyInfo.address, column: "qg-one" },
                { key: "经营范围", value: companyInfo.scope, column: "qg-one" },
            ]
        },
        // 获取公司信息
        getCompany (companyName) {
            console.log(companyName)
            this.ajax
                .json('/dcp/query/qcc/enterprise/business', { companyName }, { type: 'get' })
                .then(res => {
                    this.companyInfo = res.data
                });
        },
        blurGetCompany () {
            this.getCompany(this.params.customerName)
        },
        //审核
        goAudit (status) {
            //审核
            if (this.reason == "") {
                this.$message.warning("审批意见不能为空！");
                return;
            } else {
                let paramsData = {
                    id: this.id,
                    reason: this.reason,
                    status: status
                }
                this.$http(
                    '/dcp/antiFraud/customer/audit', paramsData
                ).then(res => {
                    this.$message.success("处理成功");
                    // this.$router.push({ name: 'black-white-setting' })
                })
            }
        },
        //获取附件列表
        getFileList () {
            let paramsData = {
                businessId: this.id,
                businessType: 1
            }
            this.ajax.json(
                "/dcp/antiFraud/file/list", paramsData, { type: 'get' }
            ).then(res => {
                let { data = [] } = res;
                this.file = data
            })
        },
        getDetailList (id) {
            this.ajax.json(
                "/dcp/antiFraud/customer/detail", { id: id }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                data.businessCategory = data.businessCategory || "";
                this.params = data;
                this.selectedOptions = [data.province, data.city];
                this.dateArr = data.startDate && [data.startDate, data.endDate] || [];
                this.params.positiveLabelContent = data.positiveLabelContent || [];
                this.params.negativeLabelContent = data.negativeLabelContent || [];
                this.params.grade = Number(data.grade) === 0 ? '' : Number(data.grade)
                this.customerNameChange();

                this.companyTypeList = companyTypeObj[this.params.industryCategory]
            })
        },
        //选择省市的回调
        handleChange (value) {
            this.params.province = value[0];
            this.params.city = value[1];
        },
        //选择时效性的回调
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0]
                this.params.endDate = v[1]
            } else {
                this.params.startCreateDate = ""
                this.params.endCreateDate = ""
            }
        },

        // 获取正面标签列表
        getTags () {
            this.$http('/risk/server/antiFraud/label/list', { businessType: 1 }, { type: 'get' })
                .then(res => {
                    this.zheng = res.data || []
                })
        },
        // 获取负面标签列表
        getTags1 () {
            this.$http('/risk/server/antiFraud/label/list', { businessType: 2 }, { type: 'get' })
                .then(res => {
                    this.fumian = res.data || []
                })
        },
        //  获取文件列表
        getFiles () {
            this.$http('/dcp/antiFraud/filelist', {
                businessType: 1,
                businessId: this.params.id
            }, { type: 'get' })
                .then(res => {
                    this.list = res.data || []
                })
        },
        // 获取 操作记录
        getRecord () {
            this.$http('/risk/server/antiFraud/operation/record/list', {
                businessType: 1,
                businessId: this.id
            }, { type: 'get' })
                .then(res => {
                    this.logList = res.data || []
                })
        },
        submitForm (formName) {
            if (!this.disabled) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.params.fileIds = [];

                        this.file.map(v => {
                            this.params.fileIds.push(v.id);
                        })
                        this.params.positiveLabelContent = this.params.positiveLabelContent;
                        this.params.negativeLabelContent = this.params.negativeLabelContent;
                        this.$http("/dcp/antiFraud/customer/save", { ...this.params, province: this.companyInfo.area ? this.companyInfo.area.Province : '', city: this.companyInfo.area ? this.companyInfo.area.City : '' }, {
                            type: "POST"
                        }).then(res => {
                            this.$router.push({ name: 'black-white-setting' })
                        });
                    } else {
                        console.log("error submit!!")
                        return false
                    }
                })
            }
        },
        toSelect (v) {
            if (v && this.params.customerName) {
                this.isDis = true
            }
        },
        //输入企业名称获取信用代码和上级公司等相关信息
        customerNameChange () {
            //企业信用代码
            this.ajax.json("/dcp/query/enterprise/credit/code", { companyName: this.params.customerName, x_user_id: "" }, {
                type: "GET"
            }).then(res => {
                this.params.unifiedCreditCode = res.data.creditCode || '未在工商注册，内部机构';
            });
            if (this.$route.query.way === 'add') {
                //上级和所属等级
                this.ajax.json("/dcp/antiFraud/company/tree/info", { companyName: this.params.customerName }, {
                    type: "GET"
                }).then(res => {
                    this.params.parentUnit = res.data.parentCompanyName || "-";
                    this.params.grade = res.data.grade;
                });
            }
        },
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
                this.file = [...this.file, ...data] || []
            })
            // this.ajax.upload('/zuul/dcp/antiFraud/fileupload', { file: { files } })
            //     .then(res => {
            //         this.list = [...this.list, ...res.data] || []
            //     })
        },
        // 删除文件
        delFile (id) {
            this.file.forEach((v, i) => {
                if (v.id === id) {
                    this.file.splice(i, 1)
                }
            })
        },
        //名单类型改变的回调
        listTypeChange () {
            for (let i = 1; i < 3; i++) {
                this.getLabelList(i);
            }
        },
        //获取标签下拉框信息
        getLabelList (businessType) {
            this.ajax.json(
                "/dcp/server/antiFraud/label/list", { businessType: businessType, listType: this.params.listType }, { type: 'get' }
            ).then(res => {
                let data = res.data;
                if (businessType === 1) {
                    this.positiveLabelList = data;
                } else {
                    this.negativeabelList = data;
                }
            })
        },
        //  获取 社会统一社会信用代码
        add () {
            if (!this.params.customerName.trim()) return
            this.isShow = true
            this.$http('/risk/server/customer/detail/query', {
                customerName: this.params.customerName
            }, { type: 'get' })
                .then(res => {
                    this.params.unifiedCreditCode = res.data.creditCode
                })
            this.getBreakPeople()
            this.getEvaluateId()
        },
        // 获取是否是  失信被执行人
        getBreakPeople () {
            this.$http('/risk/server/antiFraud/customer/faith/break', {
                customerName: this.params.customerName
            }, { type: 'get' })
                .then(res => {
                    if (res.data.faithBreak === 1) {
                        this.fumian.push('存在失信被执行人')
                        this.fumian = new Set(this.fumian)
                        this.params.negativeLabelContent.push(
                            '存在失信被执行人'
                        )
                    }
                })
        },
        // 获取评估信息
        getEvaluateId () {
            this.$http('/risk/server/antiFraud/evaluate', {
                industryType: this.params.industryCategory,
                customerName: this.params.customerName
            }, { type: 'formdata' })
                .then(res => {
                    if (Object.keys(res.data).length === 0) {
                        this.isStatus = ''
                        this.params.unifiedCreditCode = '未在工商注册，内部机构'
                    } else {
                        this.evaluateId = res.data.evaluateId
                    }
                })
            if (this.id) {
                this.getEvaluateId1()
            }
        },
        // 获取评估信息
        getEvaluateId1 () {
            this.$http('/risk/server/antiFraud/evaluate/query', {
                customerName: this.params.customerName
            }, { type: 'get' })
                .then(res => {
                    if (res.data && res.data.length === 0) {
                        this.isStatus = ''
                        this.params.unifiedCreditCode = '未在工商注册，内部机构'
                    } else {
                        this.isStatus = res.data[0].status
                    }
                })
        },
        // 删除标签
        closes (val) {
            this.params.positiveLabelContent.forEach((v, i) => {
                if (v === val) {
                    this.params.positiveLabelContent.splice(i, 1)
                }
            })
        },
        // 删除标签
        closes1 (val) {
            this.params.negativeLabelContent.forEach((v, i) => {
                if (v === val) {
                    this.params.negativeLabelContent.splice(i, 1)
                }
            })
        }
    },
    computed: {},
    watch: {
        '$parent.isUnfold' (v) {
            this.isUnfold = v
        }
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
}
</script>
<style lang="less" scoped>
.cospan {
    width: calc(100% - 150px);
    padding-top: 7px;
    /deep/ .el-textarea__inner {
        height: 36px;
        color: #666;
    }
}

.table-public-detail {
    tr {
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
        td {
            width: calc(50% - 150px);

            padding: 0 20px;
            min-height: 50px;
            line-height: 50px;
            box-sizing: border-box;

            &:nth-child(odd) {
                width: 150px;
                border-right: 0;
                position: relative;
            }
            &:nth-of-type(2) {
                border-right: 0;
            }
            &:last-child {
                border-right: 0;
            }
        }
        .customer-name {
            display: flex;
            align-items: center;
            /deep/ .to-add {
                .el-form-item__content {
                    display: flex;
                    align-items: center;
                    .btn-add {
                        width: 66px;
                        height: 24px;
                        line-height: 22px;
                        font-size: 12px;
                        color: #53dcec;
                        padding: 0;
                        margin-left: 10px;
                    }
                }
            }
        }

        .cospan1 {
            width: calc(100% - 150px);
            .files-col {
                // position: relative;
                padding-right: 15px;

                a {
                    font-size: 14px;
                    color: #43a1ac;
                    letter-spacing: 0.44px;
                    text-decoration: underline;
                }
                .icon-tongyong-fujianshanchutubiao1 {
                    // position: absolute;
                    // right: 0;
                    // top: 0;
                    margin-left: 5px;
                    // background: #43A1AC;
                    color: #43a1ac;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
        }
    }
}
/deep/ .el-form--inline .el-form-item {
    width: 100%;
    height: 36px;
    vertical-align: middle;
    margin: 0;
    .el-form-item__content {
        width: 100%;
    }
}
/deep/ .upload-file {
    font-family: PingFangSC-Light;
    height: 24px;
    line-height: 24px;
    .el-button {
        width: 86px;
        height: 24px;
        padding: 0;
        font-size: 12px;
        line-height: 22px;
    }
}
.stat {
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
</style>


