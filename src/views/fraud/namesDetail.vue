<template>
    <div class="stat">
        <el-row class="table-wrap mt15 mb30">
            <h3 v-if="$route.name === 'fraudPanel-namesList-namesDetail'" class="hos-detail">
                {{ params.customerName }}
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
                <a class="to-links" v-if="isShow" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId" target="_blank">企业评估</a>

            </h3>
            <h3 v-else-if="$route.name === 'enterpriseDetail'" class="hos-detail">
                {{ params.customerName }}
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
                <a class="to-links" v-if="isShow" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId" target="_blank">企业评估</a>

            </h3>
            <h3 v-else class="hos-detail">
                {{ params.customerName }}
                <span class="check-status" :class="checkClass(params.status)">{{ codeList[params.status] }}</span>
                <a class="to-links" v-if="isShow" :href="env1 + '/risk-control/index.html#/credit/assessList/assessParticulars/' + evaluateId" target="_blank">企业评估</a>

            </h3>
            <table class="table-public-detail">
                <tr>
                    <td>行业类别</td>
                    <td>
                        {{industryCategory[params.industryCategory] ? industryCategory[params.industryCategory] : '-'}}
                    </td>
                    <td>企业类别</td>
                    <td>
                        {{businessCategory[params.businessCategory] ? businessCategory[params.businessCategory] : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>名单类型</td>
                    <td>
                        {{listType[params.listType] ? listType[params.listType] : '-'}}
                    </td>
                    <td>跟进人</td>
                    <td>
                        {{ params.followPeople ? params.followPeople : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>统一社会信用代码</td>
                    <td>
                        {{ params.unifiedCreditCode ? params.unifiedCreditCode : '-'}}
                    </td>
                    <td>申请原因</td>
                    <td>
                        {{ params.remark ? params.remark : '-'}}
                    </td>
                </tr>
                <tr>
                    <td>凭证附件</td>
                    <td class="cospan" colspan="3">
                        <span class="files-col" v-for="(v,i) in list" :key="i">
                            <a :href="env + '/dcp/antiFraud/file' + v.id + '?access_token=' + access_token" target="_blank">{{v.fileName}}</a>
                        </span>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mb20 mt20">动态</div>
            <el-table :data="logList" border class="tab-info" max-height="517">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="操作时间" width="200"></el-table-column>
                <el-table-column prop="content" label="操作内容" min-width="200" show-overflow-tooltip></el-table-column>
            </el-table>
            <div v-if="$route.name === 'fraudPanel-checkList-checkDetail'">
                <div class="tabs-title mb20 mt20"><span class="n-red">*</span>审核</div>
                <div class="shenhe">
                    <el-input type="textarea" :rows="4" resize="none" maxlength="5000" v-model="checkDate.reason" placeholder="必填项，请填写审批意见"></el-input>
                    <span class="shen-num"><span>{{ checkDate.reason | reason }}</span> / {{ 5000 }}</span>
                </div>
            </div>
            <div class="submit" v-if="$route.name !== 'enterpriseDetail'">
                <!-- <el-button v-if="$route.name === 'fraudPanel-checkList-checkDetail'" :disabled="params.status === 2" type="info" size="medium" @click="$router.replace('/fraudPanel/namesList/amendNames/' + id)">修改
                </el-button> -->
                <div v-if="$route.name === 'fraudPanel-checkList-checkDetail'">
                    <el-button type="danger" size="medium" style="margin-right:30px;" @click="toSubmit(2)">否决</el-button>
                    <el-button type="danger" size="medium" style="margin-right:30px;" @click="toSubmit(3)">退回</el-button>
                    <el-button type="primary" size="medium" @click="toSubmit(1)">通过</el-button>
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
            isShow: false,
            id: '',
            params: {
                id: '',
                customerName: '', // 企业名称
                unifiedCreditCode: '', // 统一社会信用代码
                industryCategory: '', // 行业类别（0:其他 1:基建工程 2:医药医疗 3:能源化工）
                businessCategory: '', //  企业类别（0:核心&融资 1:核心企业 2:融资企业）
                listType: '', // 名单类型（0:待定名单 1:白名单 2:黑名单）
                status: '', //  状态（0:待审核 1:通过 2:否决 3:退回）
                followPeople: '', // 跟进人
                positiveLabelContent: '', // 正面标签内容
                negativeLabelContent: '', //  负面标签内容
                remark: '' //  备注
            },
            checkDate: {
                id: '',
                status: '', //  状态（0:待审核 1:通过 2:否决 3:退回）
                reason: '' //  审批意见
            },
            list: [],
            logList: [],
            tags: [],
            evaluateId: '',
            industryCategory: {
                0: '其他',
                1: '基建工程',
                2: '医药医疗',
                3: '能源化工'
            },

            businessCategory: {
                0: '核心&融资企业',
                1: '承建单位',
                2: '建设单位'
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
        this.access_token = document.cookie.split('=')[1].split(';')[0]
        setCookie('SY_TOKEN', this.access_token)
        // console.log('env1', env1);
        this.checkDate.id = this.id = this.$route.params.id
        if (this.id) {
            this.getDetail(this.id)
            this.getRecord()
        }

    },
    methods: {
        //  获取企业名单详情
        getDetail (id) {
            this.$http(
                '/risk/server/antiFraud/customer/detail/' + id,
                {},
                { type: 'get' }
            ).then(res => {
                // console.log(res);
                this.params = res.data || {}
                if (this.params.customerName) {
                    this.getEvaluateId()
                }
                this.getFiles()
            })
        },
        //  获取文件列表
        getFiles () {
            this.$http(
                '/dcp/antiFraud/filelist',
                { businessType: 1, businessId: this.params.id },
                { type: 'get' }
            ).then(res => {
                // console.log(res);
                // if ( res.data && res.data.length > 0) {
                //     this.list.push({
                //         filesList: res.data
                //     })
                // }
                if (res.data && res.data.length > 0) {
                    this.list = res.data
                }
            })
        },
        // 获取 操作记录
        getRecord () {
            this.$http(
                '/risk/server/antiFraud/operation/record/list',
                { businessType: 1, businessId: this.id },
                { type: 'get' }
            ).then(res => {
                // console.log(res);
                this.logList = res.data || []
            })
        },
        // 获取评估信息
        getEvaluateId () {
            this.$http(
                '/risk/server/antiFraud/evaluate/query',
                { customerName: this.params.customerName },
                { type: 'get' }
            ).then(res => {
                this.evaluateId = res.data[0].id || ''
                this.isShow = res.data[0].status
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
            this.$confirm(
                '确认' +
                result +
                '？ ' +
                `${
                num === 1
                    ? ''
                    : num === 2
                        ? '否决，不支持修改'
                        : '退回，支持再修改'
                }`,
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    center: true
                    // type: 'warning'
                }
            ).then(() => {
                this.$http(
                    '/risk/server/antiFraud/customer/audit',
                    this.checkDate, { type: 'formdata' }
                ).then(res => {
                    // console.log(res);
                    if (res.code === '200') {
                        this.$message.success('操作成功')
                        this.$router.push('/fraudPanel/checkList')
                    } else {
                        this.$message.error(res.message)
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
            width: calc(50% - 150px);
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
                width: 150px;
                border-right: 0;
                background: #292b2f;
            }
            &:nth-of-type(2) {
                border-right: 0;
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
.table-list {
    td {
        &:last-child {
            width: calc(100% - 150px);
        }
    }
}
.tabs-title {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
}
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
    /deep/ .el-form-item__content {
        width: 380px;
        .el-select {
            width: 100%;
        }
    }
    .to-links {
        font-size: 14px;
        color: #43a1ac;
        letter-spacing: 0.44px;
        margin-left: 10px;
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

.files-col {
    a {
        margin-right: 20px;
        color: #43a1ac;
        text-decoration: underline;
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
.fum {
    display: inline-block;
    padding: 0 10px;
    background: #422d29;
    border-radius: 3px;
    font-size: 14px;
    color: #bb4d31;
    letter-spacing: 0.44px;
    margin-top: 10px;
    margin-right: 5px;
    height: 24px;
    line-height: 24px;
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
