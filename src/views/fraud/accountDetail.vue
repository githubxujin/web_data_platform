<template>
    <div class="stat">
        <el-row class="table-wrap mt15 mb30">
            <h3 v-if="$route.name === 'fraudPanel-accountList-accountDetail'" class="hos-detail">
                账号名单详情
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
            </h3>
            <h3 v-else-if="$route.name === 'identificationDetail'" class="hos-detail">
                账号黑白灰库详情
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
            </h3>
            <h3 v-else class="hos-detail">
                账号名单审核详情
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
            </h3>
            <!-- <div class="tabs-title mb20 mt20">
                账号名单信息
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
            </div> -->
            <table class="table-public-detail">
                <tr>
                    <td>行业类别</td>
                    <td>
                        {{industryCategory[params.industryCategory] ? industryCategory[params.industryCategory] : '-'}}
                    </td>
                    <td>
                        名单类型
                    </td>
                    <td>
                        {{listType[params.listType] ? listType[params.listType] : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>融资企业名称</td>
                    <td class="cospan" colspan="3">
                        {{params.customerName ? params.customerName : '-'}}
                        <a v-if="isStatus1 === 0" class="to-links">评估中...</a>
                        <a class="to-links" v-if="isStatus1 === 1" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId1" target="_blank">企业评估</a>
                    </td>
                </tr>
            </table>
            <table class="table-public-detail mt30">

                <tr>
                    <td>出票人全称</td>
                    <td class="cospan" colspan="3">
                        {{params.drawerName ? params.drawerName : '-'}}
                        <a v-if="isStatus2 === 0" class="to-links">评估中...</a>
                        <a class="to-links" v-if="isStatus2 === 1" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId2" target="_blank">企业评估</a>
                    </td>
                </tr>
                <tr>
                    <td>出票人开户行</td>
                    <td>
                        {{params.drawerBank ? params.drawerBank : '-'}}
                    </td>
                    <td>出票人银行账号</td>
                    <td>
                        {{params.drawerAccount ? params.drawerAccount : '-'}}
                    </td>
                </tr>
            </table>
            <table class="table-public-detail mt30">
                <tr>
                    <td>承兑/回款人全称</td>
                    <td class="cospan" colspan="3">
                        {{params.acceptorName ? params.acceptorName : '-'}}
                        <a v-if="isStatus3 === 0" class="to-links">评估中...</a>
                        <a class="to-links" v-if="isStatus3 === 1" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId3" target="_blank">企业评估</a>
                    </td>
                </tr>
                <tr>
                    <td>承兑/回款人开户行</td>
                    <td>
                        {{params.acceptorBank ? params.acceptorBank : '-'}}
                    </td>
                    <td>承兑/回款人银行账号</td>
                    <td>
                        {{params.acceptorAccount ? params.acceptorAccount : '-'}}
                    </td>
                </tr>
            </table>
            <table class="table-public-detail mt30">
                <tr>
                    <td>收款人全称</td>
                    <td>
                        {{params.payeeName ? params.payeeName : '-'}}
                        <a v-if="isStatus4 === 0" class="to-links">评估中...</a>
                        <a class="to-links" v-if="isStatus4 === 1" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId4" target="_blank">企业评估</a>
                    </td>
                    <td>收款人开户行</td>
                    <td>
                        {{params.payeeBank ? params.payeeBank : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>收款人银行账号</td>
                    <td class="cospan" colspan="3">
                        {{params.payeeAccount ? params.payeeAccount : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>申请原因</td>
                    <td class="cospan" colspan="3">
                        {{params.remark ? params.remark : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>凭证附件</td>
                    <td class="cospan" colspan="3">
                        <div class="files-col" v-for="(v,i) in list" :key="i">
                            <a :href="env + '/dcp/antiFraud/file' + v.id + '?access_token=' + access_token" target="_blank">{{v.fileName}}</a>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mb20 mt20">动态</div>
            <el-table :data="logList" border class="tab-info" max-height="517">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="操作时间" width="200"></el-table-column>
                <el-table-column prop="content" label="操作内容" min-width="200" show-overflow-tooltip></el-table-column>
            </el-table>
            <div v-if="$route.name === 'fraudPanel-accountCheckList-accountCheckDetail'">
                <div class="tabs-title mb20 mt20">审核</div>
                <div class="shenhe">
                    <el-input type="textarea" :rows="4" resize="none" maxlength="5000" v-model="checkDate.reason" placeholder="必填项，请填写审批意见"></el-input>
                    <span class="shen-num"><span>{{ checkDate.reason | reason }}</span> / {{ 5000 }}</span>
                </div>
            </div>
            <div class="submit" v-if="$route.name !== 'identificationDetail'">
                <el-button v-if="$route.name === 'fraudPanel-accountList-accountDetail'" :disabled="params.status === 2" type="primary" size="medium"
                    @click="$router.replace('/fraudPanel/accountList/amendAccount/' + id)">修改</el-button>
                <div v-else>
                    <el-button type="primary" size="medium" style="margin-right:30px;" @click="toSubmit(2)">否决</el-button>
                    <el-button type="danger" size="medium" style="margin-right:30px;" @click="toSubmit(3)">退回</el-button>
                    <el-button type="blue" size="medium" @click="toSubmit(1)">通过</el-button>
                </div>
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
            isUnfold: true,
            isStatus1: false,
            isStatus2: false,
            isStatus3: false,
            isStatus4: false,
            id: '',
            params: {
                id: '',
                customerName: '',
                unifiedCreditCode: '',
                industryCategory: '',
                listType: '',
                status: '',
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
                remark: ''
            },
            evaluateId: '',
            evaluateId1: '',
            evaluateId2: '',
            evaluateId3: '',
            evaluateId4: '',
            list: [],
            checkDate: {
                id: '',
                status: '', //  状态（0:待审核 1:通过 2:否决 3:退回）
                reason: '' //  审批意见
            },
            tags: [],
            logList: [],
            industryCategory: {
                0: '其他',
                1: '基建工程',
                2: '医药医疗',
                3: '能源化工'
            },
            businessCategory: {
                0: '核心&融资企业',
                1: '核心企业',
                2: '融资企业'
            },
            listType: {
                0: '待定名单',
                1: '白名单',
                2: '黑名单'
            },
            codeList: {
                3: '退回',
                1: '通过',
                0: '待审核',
                2: '否决'
            },
            access_token: ''
        }
    },
    created () {
        this.checkDate.id = this.id = this.$route.params.id
        // this.access_token = localStorage.getItem('token')
        this.access_token = document.cookie.split('=')[1].split(';')[0]
        setCookie('SY_TOKEN', this.access_token, 15)
        this.getDetail(this.id)
        this.getRecord()
    },
    methods: {
        getDetail (id) {
            this.$http('/risk/server/antiFraud/account/detail/' + id, {}, { type: 'get' })
                .then(res => {
                    this.params = res.data || {}
                    if (this.params.customerName) {
                        this.getEvaluateId(this.params.customerName, 1)
                    }
                    if (this.params.drawerName) {
                        this.getEvaluateId(this.params.drawerName, 2)
                    }
                    if (this.params.acceptorName) {
                        this.getEvaluateId(this.params.acceptorName, 3)
                    }
                    if (this.params.payeeName) {
                        this.getEvaluateId(this.params.payeeName, 4)
                    }
                    this.getFiles()
                })
        },
        // 获取评估信息
        getEvaluateId (customerName, n) {
            this.$http('/risk/server/antiFraud/evaluate/query', { customerName }, { type: 'get' })
                .then(res => {
                    if (res.data && res.data.length > 0) {
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
        },
        //  获取文件列表
        getFiles () {
            this.$http('/dcp/antiFraud/filelist', {
                businessType: 2,
                businessId: this.params.id
            }, { type: 'get' })
                .then(res => {
                    // console.log(res);
                    if (res.data && res.data.length > 0) {
                        this.list = res.data
                    }
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
        // 设置 状态颜色
        checkClass (key) {
            // console.log('v',v);
            switch (key) {
                case 1:
                    return 'p1'
                case 2:
                    return 'p2'
                case 3:
                    return 'p3'
                case 0:
                    return 'p0'
                default:
                    break
            }
        },
        // 审核 提交
        toSubmit (num) {
            if (!this.checkDate.reason)
                return this.$message.error('请填写审批意见')
            this.checkDate.status = num
            let result = ''
            if (num === 1) {
                result = '通过'
            } else if (num === 2) {
                result = '否决'
            } else if (num === 3) {
                result = '退回'
            }
            this.$confirm('确认' + result + '？ ' + `${num === 1 ? '' : num === 2 ? '否决，不支持修改' : '退回，支持再修改'}`, '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    // type: 'warning'
                }
            ).then(() => {
                this.$http(
                    '/risk/server/antiFraud/account/audit ',
                    this.checkDate, { type: 'formdata' }
                )
                    .then(res => {
                        // console.log(res);
                        if (res.code === '200') {
                            this.$message.success('操作成功')
                            this.$router.push('/fraudPanel/accountCheckList')
                        } else {
                            this.$message.success(res.message)
                        }

                    })
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
        },
        reason (v) {
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
    .blue {
        color: #0486fe;
        border-color: #0486fe;
    }
    .danger {
        color: #f56540;
        border-color: #f56540;
    }
    .submit {
        margin-top: 30px;
        background-color: transparent;
        text-align: center;
    }
    .detail-ta {
        border-left: 1px solid #cbced5;
        /deep/ .el-table__body-wrapper {
            .el-table__row {
                td {
                    &:last-child {
                        padding: 2px;
                        height: 100px;
                        .cell {
                            height: 96px;
                            overflow-y: auto;
                        }
                    }
                }
            }
        }
    }
    /deep/ .btn-col {
        border-radius: 20px;
    }
    .mod-in {
        display: flex;
        dt {
            float: left;
            h3 {
                font-size: 16px;
                color: #303133;
                position: relative;
                padding-left: 14px;
                &::before {
                    content: '';
                    width: 4px;
                    height: 14px;
                    background-color: #ff8e36;
                    border-radius: 3px;
                    border-radius: 2.5px;
                    position: absolute;
                    left: 0;
                    top: 4px;
                }
            }
        }
        dd {
            flex: 1;
            margin-left: 10px;
            margin-top: 9px;
            height: 2px;
            background-color: #ff8e36;
            float: left;
        }
    }
    .tishi {
        color: #909399;
        .icon-tongyong-wenxintishitubiao {
            color: #ffbc31;
            margin-right: 2px;
        }
        .a-corlor {
            color: #0486fe;
        }
    }
    /deep/ .el-form-item__content {
        width: 380px;
        .el-select {
            width: 100%;
        }
    }
    .to-add {
        /deep/ .el-form-item__content {
            position: relative;
            .btn-add {
                position: absolute;
                right: 0;
                top: 0;
                border-radius: 0 4px 4px 0;
            }
        }
    }
    .biaoq {
        width: 100%;
        display: flex;
        margin-bottom: 0;
        /deep/ .el-form-item__content {
            flex: 1;
        }
        /deep/ .el-tag {
            border: 0;
            background: #edf6ff;
            font-size: 14px;
            color: #0486fe;
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
        }
    }
    .to-links {
        font-size: 14px;
        color: #43a1ac;
        letter-spacing: 0.44px;
        margin-left: 10px;
    }
    .tags-list {
        padding-left: 125px;
        margin-bottom: 22px;
        .el-form-item {
            width: 100%;
            /deep/ .el-form-item__content {
                width: 100%;
            }
        }
        /deep/ .el-tag {
            border: 0;
            background: #edf6ff;
            font-size: 14px;
            color: #0486fe;
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
            .el-tag__close {
                font-size: 14px;
                color: #0486fe;
                &:hover {
                    background-color: #0486fe;
                    color: #fff;
                }
            }
        }
        &.tags-list1 {
            /deep/ .el-tag {
                // background: rgba(245, 101, 64, .2);
                background-color: #fef4f1;
                color: #f56540;
                .el-tag__close {
                    color: #f56540;
                    &:hover {
                        background-color: #f56540;
                        color: #fff;
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
                position: absolute;
                bottom: -5px;
                right: 7px;
                font-size: 14px;
                color: #93969c;
            }
        }
    }
    .up-data {
        margin-top: 20px;
        .star {
            color: red;
        }
        span {
            margin-left: 10px;
            font-size: 12px;
            color: #909399;
        }
        .files-list {
            margin-top: 10px;
            li {
                padding-right: 20px;
                position: relative;
                line-height: 28px;
                i {
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: #fa5555;
                }
            }
        }
    }
}
.table-public-detail {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        background: rgb(35, 37, 40);
        &:last-child {
            td {
                border-bottom: 0;
            }
        }
        td {
            // width: calc(50% - 170px);
            color: rgb(193, 193, 195);
            // padding: 17px 20px;
            // min-height: 48px;
            // line-height: 16px;
            padding: 0 20px;
            height: 50px;
            line-height: 50px;
            box-sizing: border-box;
            border-right: 1px solid #54575c;
            border-bottom: 1px solid #54575c;
            &:nth-child(odd) {
                width: 170px !important;
                border-right: 0;
                background: #292b2f;
            }
            &:nth-of-type(2) {
                border-right: 0;
                width: 500px;
            }
            &:last-child {
                border-right: 0;
            }
        }
        .cospan {
            width: calc(100% - 150px);
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
    display: flex;
    align-items: center;
}
.check-status {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
    margin-left: 10px;
}
.p0 {
    background: #242d30;
    color: #43a1ac;
}
.p1 {
    background: #2b3536;
    color: #358e62;
}
.p2 {
    background: #2f2828;
    color: #bb4d31;
}
.p3 {
    background: #2f2828;
    color: #bb4d31;
}

.files-col {
    a {
        color: #43a1ac;
        text-decoration: underline;
    }
}
.tabs-title {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
}
.shenhe {
    position: relative;
    /deep/ .el-textarea {
        vertical-align: middle;
        border: 0;
        .el-textarea__inner {
            border: 1px solid #54575c;
            border-radius: 0;
            color: #d3d3d4;
            background: #232528;
            &:focus,
            &:hover {
                border-color: #366f71;
            }
        }
    }
    .shen-num {
        font-family: PingFangSC-Light;
        position: absolute;
        bottom: 5px;
        right: 10px;
        font-size: 12px;
        color: #d3d3d4;
        line-height: 20px;
    }
}
.zhengm {
    display: inline-block;
    padding: 0 10px;
    background: #293e42;
    border-radius: 3px;
    font-size: 14px;
    color: #43a1ac;
    letter-spacing: 0.44px;
    margin-top: 10px;
    margin-right: 5px;
    height: 24px;
    line-height: 24px;
}
</style>
<style lang="less">
.daoru {
    /deep/ .el-dialog__body {
        text-align: center;
    }
    /deep/ .el-form-item__label {
        color: #00002a;
    }
}
</style>
