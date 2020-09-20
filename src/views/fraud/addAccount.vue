<template>
    <div class="stat">
        <el-row class="table-wrap mt15 mb30">
            <h3 class="hos-detail" v-if="$route.name === 'fraudPanel-accountList-addAccount'">账号名单新增</h3>
            <h3 class="hos-detail" v-else>账号名单修改</h3>
            <el-form :inline="true" ref="form1" :model="params" :rules="rules" size="medium">
                <table class="table-public-detail">
                    <tr>
                        <td>
                            <span>*</span>
                            行业类别
                        </td>
                        <td>
                            <el-form-item prop="industryCategory">
                                <el-select v-model="params.industryCategory" @change="toSelect" clearable>
                                    <el-option label="基建工程" :value="1"></el-option>
                                    <el-option label="医药医疗" :value="2"></el-option>
                                    <el-option label="能源化工" :value="3"></el-option>
                                    <el-option label="其他" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                        <td>
                            <span>*</span>
                            名单类型
                        </td>
                        <td>
                            <el-form-item prop="listType">
                                <el-select v-model="params.listType" @change="getTags" clearable>
                                    <el-option label="白名单" :value="1"></el-option>
                                    <el-option label="黑名单" :value="2"></el-option>
                                    <el-option label="灰名单" :value="3"></el-option>
                                    <el-option label="待定名单" :value="0"></el-option>
                                </el-select>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>融资企业名称</td>
                        <td class="customer-name" v-if="$route.name === 'fraudPanel-accountList-addAccount'">
                            <el-form-item class="to-add">
                                <el-input v-model="params.customerName" @change="toChange" clearable placeholder=""></el-input>
                                <el-button v-if="$route.name === 'fraudPanel-accountList-addAccount'" :disabled="!isDis" class="btn-add" icon="el-icon-plus" size="mini" type="primary" @click="add1(1)">添加</el-button>
                            </el-form-item>
                            <a v-if="isStatus1 === 0" class="to-links">评估中...</a>
                            <a v-if="(id && isStatus1) || evaluateId1" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId1" target="_blank">企业评估</a>
                            <a v-if="(!id && evaluateId1) && isStatus1" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId1" target="_blank">企业评估</a>
                        </td>
                        <td class="customer-name cospan" v-else style="padding-top:0;">
                            <el-form-item class="to-add to-add1">
                                <el-input v-model="params.customerName" @change="toChange" clearable placeholder=""></el-input>
                            </el-form-item>
                            <a v-if="isStatus1 === 0" class="to-links">评估中...</a>
                            <a v-if="(id && isStatus1) || evaluateId1" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId1" target="_blank">企业评估</a>
                            <a v-if="(!id && evaluateId1) && isStatus1" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId1" target="_blank">企业评估</a>
                        </td>
                        <td v-if="$route.name === 'fraudPanel-accountList-addAccount'">统一社会信用代码</td>
                        <td v-if="$route.name === 'fraudPanel-accountList-addAccount'">
                            <el-form-item>
                                <el-input v-model="params.unifiedCreditCode" clearable placeholder="" disabled></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <table class="table-public-detail mt30">
                    <tr>
                        <td>出票人全称</td>
                        <td class="cospan customer-name" colspan="3" style="padding-top:0;">
                            <el-form-item prop="" class="to-add to-add1">
                                <el-input v-model="params.drawerName" @change="toChange1" clearable placeholder=""></el-input>
                                <el-button v-if="$route.name === 'fraudPanel-accountList-addAccount'" :disabled="!isDis1" class="btn-add" icon="el-icon-plus" type="primary" @click="add1(2)">添加</el-button>
                            </el-form-item>
                            <a v-if="isStatus2 === 0" class="to-links">评估中...</a>
                            <a v-if="(id && isStatus2 )|| evaluateId2" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId2" target="_blank">企业评估</a>
                            <a v-if="(!id && evaluateId2) && isStatus2" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId2" target="_blank">企业评估</a>
                        </td>
                    </tr>
                    <tr>
                        <td>出票人开户行</td>
                        <td>
                            <el-form-item prop="">
                                <el-input v-model="params.drawerBank" @change="toCopy2" placeholder="" clearable></el-input>
                            </el-form-item>
                        </td>
                        <td>出票人银行账号</td>
                        <td>
                            <el-form-item prop="">
                                <el-input v-model="params.drawerAccount" @change="toCopy3" placeholder="" clearable></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <table class="table-public-detail mt30">
                    <tr>
                        <td>承兑/回款人全称</td>
                        <td class="cospan customer-name" colspan="3" style="padding-top:0;">
                            <el-form-item prop="" class="to-add to-add1">
                                <el-input v-model="params.acceptorName" clearable @change="toChange2" placeholder=""></el-input>
                                <el-button v-if="$route.name === 'fraudPanel-accountList-addAccount'" :disabled="!isDis2" class="btn-add" icon="el-icon-plus" type="primary" @click="add1(3)">添加</el-button>
                            </el-form-item>
                            <el-button v-if="$route.name === 'fraudPanel-accountList-addAccount'" :disabled="!isCopy" class="btn-add1" type="primary" @click="copyMes">复制出票人信息</el-button>
                            <a v-if="isStatus3 === 0" class="to-links">评估中...</a>
                            <a v-if="(id && isStatus3) || evaluateId3" class="to-links mal" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId3" target="_blank">企业评估</a>
                            <a v-if="(!id && evaluateId3) && isStatus3" class="to-links mal" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId3" target="_blank">企业评估</a>
                        </td>
                    </tr>
                    <tr>
                        <td>承兑/回款人开户行</td>
                        <td>
                            <el-form-item>
                                <el-input v-model="params.acceptorBank" placeholder="" clearable></el-input>
                            </el-form-item>
                        </td>
                        <td>承兑/回款人银行账号</td>
                        <td>
                            <el-form-item>
                                <el-input v-model="params.acceptorAccount" placeholder="" clearable></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
                <table class="table-public-detail mt30">
                    <tr>
                        <td>收款人全称</td>
                        <td class="customer-name">
                            <el-form-item prop="" class="to-add">
                                <el-input v-model="params.payeeName" clearable @change="toChange3" placeholder=""></el-input>
                                <el-button v-if="$route.name === 'fraudPanel-accountList-addAccount'" :disabled="!isDis3" class="btn-add" icon="el-icon-plus" type="primary" @click="add1(4)">添加</el-button>
                            </el-form-item>
                            <a v-if="isStatus4 === 0" class="to-links">评估中...</a>
                            <a v-if="(id && isStatus4) || evaluateId4" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId4" target="_blank">企业评估</a>
                            <a v-if="(!id && evaluateId4) && isStatus4" class="to-links" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId4" target="_blank">企业评估</a>
                        </td>
                        <td>收款人开户行</td>
                        <td>
                            <el-form-item>
                                <el-input v-model="params.payeeBank" placeholder=""></el-input>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>收款人银行账号</td>
                        <td>
                            <el-form-item>
                                <el-input v-model="params.payeeAccount" placeholder=""></el-input>
                            </el-form-item>
                        </td>
                        <td>标签</td>
                        <td>
                            <!-- 黑名单下拉选项 -->
                            <el-select v-if="params.listType === 2" class="zhengmian" v-model="params.labelContent" multiple filterable allow-create default-first-option @change="checkTags" size="medium" clearable>
                                <el-option v-for="(v,i) in hei" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                            <!-- 白灰名单下拉选项 -->
                            <el-select v-if="params.listType === 1 || params.listType === 3" class="zhengmian" v-model="params.labelContent" multiple filterable allow-create default-first-option @change="checkTags"
                                size="medium" clearable>
                                <el-option v-for="(v,i) in baihui" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                            <!-- 待定名单下拉选项 -->
                            <el-select v-if="params.listType === 0" class="zhengmian" v-model="params.labelContent" multiple filterable allow-create default-first-option @change="checkTags" size="medium" clearable>
                                <el-option label="" value=""></el-option>
                            </el-select>
                            <!-- <el-row class="tags-list" v-if="params.labelContent.length > 0">
                                <el-tag v-for="(tag,i) in params.labelContent" :key="i" closable @close="closes(tag)"> {{tag}}</el-tag>
                            </el-row> -->
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>*</span>
                            申请原因
                        </td>
                        <td class="cospan" colspan="3">
                            <el-form-item label="" class="beizhu" prop="remark">
                                <el-input type="textarea" resize="none" maxlength="5000" v-model="params.remark" placeholder="请输入申请原因"></el-input>
                                <span class="com-num"><span>{{ params.remark | remark }}</span> / {{ 5000 }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>*</span>
                            凭证附件
                        </td>
                        <td class="cospan1" colspan="3">
                            <span class="files-col" v-for="v in list" :key="v.id">
                                <a :href="env + '/dcp/antiFraud/file' + v.id + '?access_token=' + access_token" target="_blank">{{v.fileName}}</a>
                                <i class="iconfont icon-tongyong-fujianshanchutubiao1" @click="delFile(v.id)"></i>
                            </span>
                            <c-upload accept=".jpg,.png,.pdf,.xlsx,.xls,.docx,.doc" type="primary" class="upload-file" multiple="multiple" v-on:changehand="v => {uploadHand(v)}">
                                选择文件
                            </c-upload>
                        </td>
                    </tr>
                </table>
            </el-form>
            <div v-if="isXiu">
                <div class="tabs-title mb20 mt20">动态</div>
                <el-table :data="logList" border class="tab-info" max-height="190">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="createdAt" label="操作时间" width="200"></el-table-column>
                    <el-table-column prop="content" label="操作内容" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
            <div class="submit">
                <el-button type="primary" size="medium" style="margin-right:30px;" @click="$router.back()">取 消</el-button>
                <el-button type="primary" size="medium" @click="onSubmit('form1')">提交申请</el-button>
            </div>
        </el-row>
    </div>
</template>
<script>
import env from '@/config/env';
import env1 from '@/config/remote';
import { setCookie } from '@/utils/auth'
export default {
    data () {
        return {
            env,
            env1,
            totalSize: 0,
            isUnfold: true,
            isDialog: false,
            isXiu: false,
            isDis: false,
            isDis1: false,
            isDis2: false,
            isDis3: false,
            isCopy: false,
            isStatus1: '',
            isStatus2: '',
            isStatus3: '',
            isStatus4: '',
            id: '',
            evaluateId1: '',
            evaluateId2: '',
            evaluateId3: '',
            evaluateId4: '',
            params: {
                id: '',
                industryCategory: 1, //行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                listType: '', //  名单类型（0:待定名单 1:白名单 2:黑名单）
                customerName: '',
                unifiedCreditCode: '',
                drawerName: '',
                drawerBank: '',
                drawerAccount: '',
                acceptorName: '',
                acceptorBank: '',
                acceptorAccount: '',
                payeeName: '',
                payeeBank: '',
                payeeAccount: '',
                labelContent: '',
                remark: '',
                fileIds: ''
            },
            list: [],
            rules: {
                industryCategory: [
                    {
                        required: true,
                        message: '请选择行业类别',
                        trigger: 'change'
                    }
                ],
                listType: [
                    {
                        required: true,
                        message: '请选择名单类型',
                        trigger: 'change'
                    }
                ],
                customerName: [
                    {
                        required: true,
                        message: '请输入融资企业名称',
                        trigger: 'blur'
                    }
                ],
                remark: [
                    {
                        required: true,
                        message: '请输入申请原因',
                        trigger: 'blur'
                    }
                ]
            },
            logList: [],
            filesList: [],
            tags: [],
            tags1: [],
            baihui: [
                '银行回款验真',
                '核心买方白名单',
                '到期票面信息核实',
                '买方财务人员核实',
                '开户银行电话核实'
            ],
            hei: [
                '买方官方公告不存在',
                '核心企业高层核实不存在',
                '核心企业财务核实不存在',
                '买方注册年限较短',
                '买方无公开招投标记录',
                '买方无住建部备案记录',
                '买方短期存有多次或较大股权变更',
                '存在融资票行为',
                '存在小额测试开票情况',
                '承兑人开户网点偏远或为地方小银行'
            ],
            access_token: ''
        }
    },
    created () {
        this.id = this.$route.params.id
        // this.access_token = localStorage.getItem('token')
        this.access_token = document.cookie.split('=')[1].split(';')[0]
        setCookie('SY_TOKEN', this.access_token)
        if (this.id) {
            this.isXiu = true
            this.getDetail(this.id)
            this.getRecord()
        } else {
            this.params.listType = 1
        }
        if (this.params.listType) {
            this.getTags(this.params.listType)
        }
    },
    methods: {
        //  获取企业名单详情
        getDetail (id) {
            this.$http('/risk/server/antiFraud/account/detail/' + id, {}, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    this.params = res.data || {}
                    if (this.params.listType === 2) {
                        this.hei = [...this.hei, ...this.params.labelContent]
                        this.hei = [...new Set(this.hei)]
                    } else if (
                        this.params.listType === 1 ||
                        this.params.listType === 3
                    ) {
                        this.baihui = [
                            ...this.baihui,
                            ...this.params.labelContent
                        ]
                        this.baihui = [...new Set(this.baihui)]
                    }

                    if (this.params.customerName) {
                        this.getEvaluateId1(this.params.customerName, 1)
                    }
                    if (this.params.drawerName) {
                        this.getEvaluateId1(this.params.drawerName, 2)
                    }
                    if (this.params.acceptorName) {
                        this.getEvaluateId1(this.params.acceptorName, 3)
                    }
                    if (this.params.payeeName) {
                        this.getEvaluateId1(this.params.payeeName, 4)
                    }
                    this.getFiles()
                })
        },
        // 获取标签列表
        getTags (v) {
            this.$http('/risk/server/antiFraud/label/list', {
                businessType: 3,
                listType: v
            }, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    if (v === 1 || v === 3) {
                        this.baihui = [...this.baihui, ...res.data]
                        this.baihui = [...new Set(this.baihui)]
                    } else if (v === 2) {
                        this.hei = [...this.hei, ...res.data]
                        this.hei = [...new Set(this.hei)]
                    }
                })
        },
        //  获取文件列表
        getFiles () {
            this.$http('/dcp/antiFraud/filelist', {
                businessType: 2,
                businessId: this.params.id
            }, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    this.list = res.data || []
                })
        },
        // 获取 操作记录
        getRecord () {
            this.$http('/risk/server/antiFraud/operation/record/list', {
                businessType: 2,
                businessId: this.id
            }, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    this.logList = res.data || []
                })
        },
        onSubmit (formName) {
            // if ( this.params.listType === 2) {
            //     this.rules.drawerAccount =  [ { required: true, message: '请输入出票人银行账号', trigger: 'blur' }]
            // }
            this.$refs[formName].validate(valid => {
                // console.log(valid);
                if (valid) {
                    if (this.list && this.list.length === 0)
                        return this.$message.error('请上传凭证附件')
                    if (
                        this.params.customerName ||
                        this.params.drawerName ||
                        this.params.drawerBank ||
                        this.params.drawerAccount ||
                        this.params.acceptorName ||
                        this.params.acceptorBank ||
                        this.params.acceptorAccount ||
                        this.params.payeeName ||
                        this.params.payeeBank ||
                        this.params.payeeAccount
                    ) {
                        this.toData()
                    } else {
                        this.$message.error(
                            '融资企业，出票人，承兑/回款人，收款人的信息至少要填写一项'
                        )
                    }
                } else {
                    return false
                }
            })
        },
        toData () {
            this.params.fileIds = []
            this.list.forEach(v => {
                this.params.fileIds.push(v.id)
            })
            this.$http('/risk/server/antiFraud/account/save', this.params, { type: 'formdata' })
                .then(res => {
                    if (res.code === '200') {
                        if (this.id) {
                            this.$message.success('修改成功')
                        } else {
                            this.$message.success('新增成功')
                        }
                    } else {
                        this.$message.error(res.message)
                    }
                    this.$router.push('/fraudPanel/accountList')
                })
            // }
        },
        // 上传
        async uploadHand (files) {
            // console.log(files);
            // 批量上传数量判断
            if (files.length === 0) {
                return
            } else if (files.length > 9) {
                this.$message.error('一次最多可以上传9个文件！')
                return
            }
            let size = 0
            // 判断文件格式
            for (let i = 0; i < files.length; i++) {
                if (
                    files[i].name.indexOf('.jpg') === -1 &&
                    files[i].name.indexOf('.png') === -1 &&
                    files[i].name.indexOf('.pdf') === -1 &&
                    files[i].name.indexOf('.xlsx') === -1 &&
                    files[i].name.indexOf('.xls') === -1 &&
                    files[i].name.indexOf('.doc') === -1 &&
                    files[i].name.indexOf('.docx') === -1
                ) {
                    this.$message.error('请上传图片,pdf,xlsx,docx类型的文件')
                    return
                } else {
                    size += files[i].size
                }
            }
            if (size > 1048576 * 100)
                return this.$message.error('上传文件总容量不超能过100M！')
            this.ajax.upload('/zuul/dcp/antiFraud/fileupload', { file: { files } })
                .then(res => {
                    // console.log(res);
                    this.list = [...this.list, ...res.data] || []
                })
        },
        // 删除文件
        delFile (id) {
            this.list.forEach((v, i) => {
                if (v.id === id) {
                    this.list.splice(i, 1)
                }
            })
        },
        // 获取正面标签
        checkTags (v) {
            // console.log('v1',v);
            this.tags = []
            v.forEach(e => {
                this.tags.push({
                    label: e,
                    value: e
                })
            })
        },
        // 删除标签
        closes (val) {
            this.params.labelContent.forEach((v, i) => {
                if (v === val) {
                    this.params.labelContent.splice(i, 1)
                }
            })
        },
        toSelect (v) {
            // console.log('v',v);
            if (v && this.params.customerName) {
                this.isDis = true
            } else {
                this.isDis = false
            }
            if (v && this.params.drawerName) {
                this.isDis1 = true
            } else {
                this.isDis1 = false
            }
            if (v && this.params.acceptorName) {
                this.isDis2 = true
            } else {
                this.isDis2 = false
            }
            if (v && this.params.payeeName) {
                this.isDis3 = true
            } else {
                this.isDis3 = false
            }
        },
        toChange (v) {
            if (this.$route.name !== 'fraudPanel-accountList-addAccount') {
                if (v.trim()) {
                    this.getEvaluateId(
                        this.params.industryCategory,
                        this.params.customerName,
                        1
                    )
                }
            } else {
                if (!this.params.industryCategory) {
                    this.$message.error('请选择行业类别')
                } else {
                    if (v.trim()) {
                        this.isDis = true
                        this.add1(1)
                    }
                }
            }
        },
        toChange1 (v) {
            // console.log('v',v);
            if (this.$route.name !== 'fraudPanel-accountList-addAccount') {
                if (v.trim()) {
                    this.getEvaluateId(
                        this.params.industryCategory,
                        this.params.drawerName,
                        2
                    )
                }
            } else {
                if (!this.params.industryCategory) {
                    this.$message.error('请选择行业类别')
                } else {
                    if (v.trim()) {
                        this.isDis1 = true
                        this.add1(2)
                    }
                }
                if (v && this.params.drawerBank && this.params.drawerAccount) {
                    this.isCopy = true
                }
            }
        },
        toCopy2 (v) {
            if (v && this.params.drawerName && this.params.drawerAccount) {
                this.isCopy = true
            }
        },
        toCopy3 (v) {
            if (v && this.params.drawerName && this.params.drawerBank) {
                this.isCopy = true
            }
        },
        // 复制出票人信息
        copyMes () {
            this.params.acceptorName = this.params.drawerName
            this.params.acceptorBank = this.params.drawerBank
            this.params.acceptorAccount = this.params.drawerAccount
            this.isDis2 = true
        },
        toChange2 (v) {
            if (this.$route.name !== 'fraudPanel-accountList-addAccount') {
                if (v.trim()) {
                    this.getEvaluateId(
                        this.params.industryCategory,
                        this.params.acceptorName,
                        3
                    )
                }
            } else {
                if (!this.params.industryCategory) {
                    this.$message.error('请选择行业类别')
                } else {
                    if (v.trim()) {
                        this.isDis2 = true
                        this.add1(3)
                    }
                }
            }
        },
        toChange3 (v) {
            if (this.$route.name !== 'fraudPanel-accountList-addAccount') {
                if (v.trim()) {
                    this.getEvaluateId(
                        this.params.industryCategory,
                        this.params.payeeName,
                        4
                    )
                }
            } else {
                if (!this.params.industryCategory) {
                    this.$message.error('请选择行业类别')
                } else {
                    if (v.trim()) {
                        this.isDis3 = true
                        this.add1(4)
                    }
                }
            }
        },
        add1 (n) {
            if (n === 1) {
                //  获取 社会统一社会信用代码
                this.ajax
                    .get('/risk/server/customer/detail/query', {
                        customerName: this.params.customerName
                    })
                    .then(res => {
                        this.params.unifiedCreditCode = res.data.creditCode
                    })
                this.getEvaluateId(
                    this.params.industryCategory,
                    this.params.customerName,
                    1
                )
            } else if (n === 2) {
                this.getEvaluateId(
                    this.params.industryCategory,
                    this.params.drawerName,
                    2
                )
            } else if (n === 3) {
                this.getEvaluateId(
                    this.params.industryCategory,
                    this.params.acceptorName,
                    3
                )
            } else if (n === 4) {
                this.getEvaluateId(
                    this.params.industryCategory,
                    this.params.payeeName,
                    4
                )
            }
        },
        // 获取评估信息
        getEvaluateId (industryType, customerName, n) {
            this.$http('/risk/server/antiFraud/evaluate', {
                industryType,
                customerName
            }, { type: 'formdata' })
                .then(res => {
                    if (n === 1) {
                        if (Object.keys(res.data).length === 0) {
                            this.params.unifiedCreditCode =
                                '未在工商注册，内部机构'
                        } else {
                            this.evaluateId1 = res.data.evaluateId
                        }
                    } else if (n === 2) {
                        this.evaluateId2 = res.data.evaluateId
                    } else if (n === 3) {
                        this.evaluateId3 = res.data.evaluateId
                    } else if (n === 4) {
                        this.evaluateId4 = res.data.evaluateId
                    }
                })
        },

        // 修改时 获取评估信息
        getEvaluateId1 (customerName, n) {
            this.$http('/risk/server/antiFraud/evaluate/query', { customerName }, { type: 'get' })
                .then(res => {
                    if (res.data.length > 0) {
                        if (n === 1) {
                            this.evaluateId1 = res.data[0].id
                            this.isStatus1 = res.data[0].status
                        } else if (n === 2) {
                            this.evaluateId2 = res.data[0].id
                            this.isStatus2 = res.data[0].status
                        } else if (n === 3) {
                            this.evaluateId3 = res.data[0].id
                            this.isStatus3 = res.data[0].status
                        } else if (n === 4) {
                            this.evaluateId4 = res.data[0].id
                            this.isStatus4 = res.data[0].status
                        }
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
    /deep/ .el-form-item__content {
        width: 100%;
        .el-select {
            width: 100%;
        }
    }
    .zhengmian {
        width: 100%;
        // /deep/ .el-tag {
        //     display: none;
        // }
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
                position: absolute;
                bottom: -5px;
                right: 7px;
                font-size: 14px;
                color: #93969c;
            }
        }
    }
}
.hos-detail {
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    font-weight: normal;
    margin: 0 0 20px;
}
.table-public-detail {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        background: rgb(35, 37, 40);
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
        td {
            width: calc(50% - 170px);
            color: rgb(193, 193, 195);
            // padding: 17px 20px;
            // min-height: 48px;
            // line-height: 16px;
            padding: 0 20px;
            min-height: 50px;
            line-height: 50px;
            box-sizing: border-box;
            border-right: 1px solid #54575c;
            border-bottom: 1px solid #54575c;
            &:nth-child(odd) {
                width: 170px;
                border-right: 0;
                background: #292b2f;
                position: relative;
                span {
                    color: #449fa8;
                    position: absolute;
                    top: 2px;
                    left: 10px;
                }
            }
            &:nth-of-type(2) {
                border-right: 0;
            }
            &:last-child {
                border-right: 0;
            }
            /deep/ .el-form-item {
                margin-bottom: 0;
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
                        line-height: 24px;
                        font-size: 12px;
                        color: #53dcec;
                        padding: 0;
                        margin-left: 10px;
                        &.is-disabled {
                            background: none;
                            border: 1px solid #366f71;
                            opacity: 0.4;
                        }
                    }
                }
            }
            /deep/ .to-add1 {
                width: calc((100% - 170px) / 2);
                padding-right: 20px;
            }
            .to-links {
                width: 110px;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
                margin-left: 10px;
            }
        }
        .btn-add1 {
            width: 100px;
            height: 24px;
            line-height: 24px;
            font-size: 12px;
            color: #53dcec;
            padding: 0;
            &.is-disabled {
                background: none;
                border: 1px solid #366f71;
                opacity: 0.4;
            }
        }
        .cospan {
            width: calc(100% - 170px);
            padding-top: 7px;
            /deep/ .el-textarea {
                border: 0;
            }
            /deep/ .el-textarea__inner {
                border-radius: 4px;
                border: 1px solid #2d3034;
                height: 36px;
                color: rgba(255, 255, 255, 0.8);
                font-family: PingFangSC-Light;
                &:focus,
                &:hover {
                    border-color: #366f71;
                }
            }
        }
        .cospan1 {
            width: calc(100% - 170px);
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
.tabs-title {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
}
/deep/ .tab-info {
    border: 1px solid #54575c;
    th {
        color: rgb(154, 157, 161);
        border-right: 1px solid #54575c;
        font-weight: normal;
    }
    th.is-leaf {
        border-bottom: 1px solid #54575c;
    }
    td {
        color: rgb(203, 203, 204);
        font-weight: normal;
        border-bottom: 1px solid #54575c;
        border-right: 1px solid #54575c;
    }
    th.gutter {
        border-bottom: 1px solid #54575c;
    }
}
/deep/ .upload-file {
    height: 24px;
    line-height: 24px;
    .el-button {
        width: 68px;
        height: 24px;
        color: #53dcec;
        padding: 0;
        font-size: 12px;
        line-height: 24px;
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
</style>
<style lang="scss">
.daoru {
    /deep/ .el-dialog__body {
        text-align: center;
    }
    /deep/ .el-form-item__label {
        color: #00002a;
    }
}
</style>
