<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">
                <div>
                    {{detailData.companyName}}
                </div>
                <div class="claim mt20" v-if="detailData.claimStatus===0">
                    <el-button type="primary" @click="toClaimer(1)" size="mini">认领</el-button>
                </div>
                <div class="claim mt20" v-else-if="detailData.claimStatus===1">
                    <div class="claimer">认领人: {{ detailData.claimer }}</div>
                    <div class="claime-time ml30">认领时间： {{ detailData.claimDate}}</div>
                    <el-button type="info" size="mini" @click="toClaimer(0)" class="ml30" v-if="detailData.claimer === nickName">取消认领</el-button>
                </div>
            </div>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @clicka="toExport"></span>
                </el-tooltip>
            </el-row>
            <qg-table class="mt20">
                <qg-table-column label="曾用名">{{title}}</qg-table-column>
                <qg-table-column label="企业电话">{{detailData.phone }}</qg-table-column>
                <qg-table-column label="企业邮箱">{{detailData.email}}</qg-table-column>
                <qg-table-column label="企业地址">{{detailData.address}}</qg-table-column>
            </qg-table>

            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="mt10 tootip-table">
                <el-tab-pane label="企业基本信息" name="first">
                    <company-info :company="detailData" class="pt20" />
                    <div class="tabs-title mt20 mb20">联系人信息</div>
                    <contact-list :contactList="contactList" />
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="second">
                    <oper-indicator :companyName="companyName"></oper-indicator>
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="thrid">
                    <div class="pt20">
                        <div class="tabs-title">联系人信息</div>
                        <el-table :data="linkmanList" border>
                            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.name ? item.row.name : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="gendr" label="性别" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.gendr ? item.row.gendr : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="zhuang" label="婚姻状况" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.zhuang ? item.row.zhuang : '-'}}
                                </template>
                            </el-table-column>
                        </el-table>

                        <qg-table subtitle="风险资讯" class="mt20">
                            <qg-table-column label="个人征信记录">-</qg-table-column>
                            <qg-table-column label="逾期">-</qg-table-column>
                            <qg-table-column label="涉诉">-</qg-table-column>
                            <qg-table-column label="失信被执行人">-</qg-table-column>
                        </qg-table>

                    </div>

                </el-tab-pane>
                <el-tab-pane label="在我司合作记录" name="four">
                    <cooperation-records :companyName="companyName" v-if="activeName==='four'"></cooperation-records>
                </el-tab-pane>
                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <backdrop-message :companyName="companyName" v-if="activeName==='five'"></backdrop-message>
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <important-event :companyName="companyName" v-if="activeName==='six'"></important-event>
                </el-tab-pane>
                <el-tab-pane label="企业中登登记信息" name="seven">
                    <check-in :companyName="detailData.companyName" v-if="activeName==='seven'"></check-in>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import companyInfo from './components/companyInfo.vue'
export default {
    components: {
        companyInfo,
        'contact-list': () => import('./components/contact-info.vue'),
        'oper-indicator': () => import('./components/operIndicator'),
        'cooperation-records': () => import('./components/cooperationRecords'),
        'backdrop-message': () => import('./components/backdropMessage'),
        'important-event': () => import('./components/importantEvent'),
        'check-in': () => import('./components/check-in')
    },
    data () {
        return {
            activeName: 'first',
            companyName: '',
            title: '',
            detailData: {
                "address": "",
                "businessNature": "",
                "businessScope": "",
                "businessStatus": "",
                "businessTag": "",
                "claimDate": "",
                "claimStatus": 0,
                "claimer": "",
                "companyName": "",
                "companyType": "",
                "companyUrl": "",
                "createTime": "",
                "customerReg": "",
                "email": "",
                "financeWill": "",
                "id": 0,
                "mainBusinessArea": "",
                "mainBussiness": "",
                "phone": "",
                "qccCompanyInfoVo": {
                    "address": "",
                    "area": {},
                    "belongOrg": "",
                    "checkDate": "",
                    "contactInfo": {
                        "email": "",
                        "phoneNumber": "",
                        "webSite": [
                            {
                                "name": "",
                                "url": ""
                            }
                        ]
                    },
                    "createTime": "",
                    "creditCode": "",
                    "econKind": "",
                    "endDate": "",
                    "englishName": "",
                    "entType": "",
                    "id": 0,
                    "industry": {
                        "industry": "",
                        "industryCode": "",
                        "middleCategory": "",
                        "middleCategoryCode": "",
                        "smallCategory": "",
                        "smallCategoryCode": "",
                        "subIndustry": "",
                        "subIndustryCode": ""
                    },
                    "insuredCount": "",
                    "isOnStock": "",
                    "keyNo": "",
                    "name": "",
                    "no": "",
                    "operName": "",
                    "orgNo": "",

                    "personScope": "",
                    "province": "",
                    "recCap": "",
                    "registCapi": "",
                    "scope": "",
                    "startDate": "",
                    "status": "",
                    "stockNumber": "",
                    "stockType": "",
                    "teamEnd": "",
                    "termStart": "",
                    "updateTime": "",
                    "updatedDate": ""
                },
                "qualification": "",
                "updateTime": ""
            },
            list: [],
            contactList: [],
            linkmanList: []
        }
    },
    computed: mapState({
        nickName: state => state.user.nickName
    }),
    created () {
        this.companyName = this.$route.query.companyName
        this.getDetail(this.companyName)
        this.getContactsMes(this.companyName)
    },
    methods: {
        toClaimer (status) {
            const text = status === 0 ? '确定取消认领' : '确定认领'
            this.$confirm(text, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            })
                .then(() => {
                    this.$http('/dcp/pre/credit/update/claim', {
                        companyName: this.$route.query.companyName, status
                    }, { type: 'formdata' }).then(res => {
                        this.getDetail(this.$route.query.companyName)
                    });
                })
                .catch(() => { });
        },
        // 获取企业信息
        getDetail (companyName) {
            this.$http('/dcp/pre/credit/company/info', { companyName }, { type: 'get' }).then(res => {
                this.detailData = res.data;
                if (res.data.qccCompanyInfoVo.originalName.length > 0) {
                    this.title = res.data.qccCompanyInfoVo.originalName[0].name;
                }
            })
        },
        // 获取联系人信息列表
        getContactsMes (companyName) {
            this.$http('/dcp/pre/credit/company/contact/list', { companyName }, { type: 'get' }).then(res => {
                this.contactList = res.data;
            })
        },
        // 导出
        toExport () {
            this.$http("/dcp/pre/credit/company/info/export", { companyName: this.companyName }, {
                type: "export"
            })
        },
        handleClick () { }
    },

}
</script>

<style lang="scss" scoped>
.tootip-table {
    /deep/ .el-button {
        background: none;
        color: #d3d3d4;
        border: none;
        width: 128px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: auto;
        padding: 0;
    }
}

.stat {
    width: 1360px;
    margin: 0 auto;
}

.report {
    color: #43a1ac;
    text-decoration: underline;
}
/deep/ .el-tabs__header {
    margin-top: 30px;
}
.light {
    .claim {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #666;
        line-height: 14px;
        display: flex;
        flex-direction: row;
        justify-items: center;
        line-height: 28px;
    }
    .xl-table-list {
        width: 100%;
        border: 1px solid #d2d9e5;
        border-collapse: collapse;
        font-size: 14px;
        tr {
            display: flex;
            justify-content: space-between;
            &:nth-child(1) {
                background: #f2f5fd;
            }
            &:last-child {
                td {
                    color: #666;
                    border-bottom: 0;
                }
            }
        }
        td {
            flex: 1;
            color: #666;
            padding: 17px 15px;
            min-height: 48px;
            line-height: 16px;
            box-sizing: border-box;
            text-align: center;
            border-right: 1px solid #d2d9e5;
            border-bottom: 1px solid #d2d9e5;
            &:last-child {
                border-right: 0;
            }
        }
    }
}
.dark {
    .claim {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #a0a3a8;
        line-height: 14px;
        display: flex;
        flex-direction: row;
        justify-items: center;
        line-height: 28px;
    }
    .xl-table-list {
        width: 100%;
        border: 1px solid #54575c;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        tr {
            display: flex;
            justify-content: space-between;
            &:nth-child(1) {
                background: #292b2f;
            }
            &:last-child {
                td {
                    color: #d3d3d4;
                    border-bottom: 0;
                }
            }
        }
        td {
            flex: 1;
            color: #d3d3d4;
            padding: 17px 15px;
            min-height: 48px;
            line-height: 16px;
            box-sizing: border-box;
            text-align: center;
            border-right: 1px solid #54575c;
            border-bottom: 1px solid #54575c;
            &:last-child {
                border-right: 0;
            }
        }
    }
}

.qiyexinxi {
    margin-bottom: -10px;
}
</style>
