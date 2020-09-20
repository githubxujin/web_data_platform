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
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="企业报告" placement="top">
                    <span class="iconfont icon-shujuzhongxinv41-qiyebaogao"></span>
                </el-tooltip>
            </el-row>
            <qg-table class="mt20">
                <qg-table-column label="曾用名">{{originalName}}</qg-table-column>
                <qg-table-column label="企业电话">{{detailData.phone }}</qg-table-column>
                <qg-table-column label="企业邮箱">{{detailData.email }}</qg-table-column>
                <qg-table-column label="企业地址">{{detailData.address}}</qg-table-column>
            </qg-table>

            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="mt10 tootip-table">
                <el-tab-pane label="企业基本信息" name="first">
                    <qg-table subtitle="企业信息" class="pt20">
                        <qg-table-column label="注册号" column="qg-two">-</qg-table-column>
                        <qg-table-column label="统一社会信用代码" column="qg-two">-</qg-table-column>
                        <qg-table-column label="组织机构代码" column="qg-two">-</qg-table-column>
                        <qg-table-column label="省份" column="qg-two">-</qg-table-column>
                        <qg-table-column label="法人" column="qg-two">-</qg-table-column>
                        <qg-table-column label="注册资本" column="qg-two">-</qg-table-column>
                        <qg-table-column label="实缴资本" column="qg-two">-</qg-table-column>
                        <qg-table-column label="登记机关" column="qg-two">-</qg-table-column>
                        <qg-table-column label="发照日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="成立日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="吊销日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="营业开始日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="营业结束日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="更新日期" column="qg-two">-</qg-table-column>
                        <qg-table-column label="是否 IPO 上市" column="qg-two">-</qg-table-column>
                        <qg-table-column label="上市公司代码" column="qg-two">-</qg-table-column>
                        <qg-table-column label="上市类型" column="qg-two">-</qg-table-column>
                        <qg-table-column label="参保人员" column="qg-two">-</qg-table-column>
                        <qg-table-column label="规模" column="qg-two">-</qg-table-column>
                        <qg-table-column label="英文名" column="qg-two">-</qg-table-column>
                        <qg-table-column label="企业类型" column="qg-two">{{detailData.companyType }}</qg-table-column>
                        <qg-table-column label="企业性质" column="qg-two">-</qg-table-column>
                        <qg-table-column label="企业资质" column="qg-two">{{detailData.qualification }}</qg-table-column>
                        <qg-table-column label="主营材料/劳务" column="qg-two">{{detailData.mainBussiness}}</qg-table-column>
                        <qg-table-column label="客户登记" column="qg-two">{{detailData.customerReg}}</qg-table-column>
                        <qg-table-column label="融资意愿预测" column="qg-two">{{detailData.financeWill}}</qg-table-column>
                        <qg-table-column label="经营范围">{{detailData.businessScope}}</qg-table-column>
                    </qg-table>

                    <div class="tabs-title mt20 mb20">联系人信息</div>
                    <el-table :data="contactList" border>
                        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column prop="name" label="姓名" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        <el-table-column prop="gender" label="性别" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        <el-table-column prop="phone" label="手机号" show-overflow-tooltip :formatter="formatLabel">
                            <template slot-scope='scope'>
                                {{detailData.claimStatus === 0 ? '*******' : scope.row.phone}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="position" label="职位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        <el-table-column prop="officePhone" label="办公电话" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                        <el-table-column prop="visitingAddress" label="拜访地址" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="second">
                    <oper-indicator :companyName="companyName"></oper-indicator>
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="thrid">
                    <div>
                        <div class="tabs-title pt20 mb20">联系人信息</div>
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
export default {
    components: {
        'oper-indicator': () => import('./components/operIndicator'),
        'cooperation-records': () => import('./components/cooperationRecords'),
        'backdrop-message': () => import('./components/backdropMessage'),
        'important-event': () => import('./components/importantEvent'),
        checkIn: () => import('./components/check-in')
    },
    data () {
        return {
            activeName: 'first',
            companyName: '',
            detailData: {
                id: 41, // 主键id
                companyName: '', // 企业名称
                phone: '', // 企业电话
                email: '', // 企业邮箱
                address: '', // 企业地址
                companyType: '', // 企业类型
                businessNature: '', // 企业性质
                qualification: '', // 企业资质
                mainBussiness: '', // 主营材料/劳务
                customerReg: '', // 客户登记
                financeWill: '', // 融资意愿预测
                businessScope: '' // 经营范围
            },
            list: [],
            contactList: [],
            linkmanList: [],
            newlyIncreased: {},
            originalName: ''
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
        entType (value) {
            switch (value) {
                case '0':
                    return '公司'
                    break;
                case '1':
                    return '社会组织'
                    break;
                case '3':
                    return '香港公司'
                    break;
                case '4':
                    return '政府机构'
                    break;
                case '5':
                    return '台湾公司'
                    break;
                case '6':
                    return '基金会'
                    break;
                case '7':
                    return '医院'
                    break;
                case '8':
                    return '海外公司'
                    break;
                case '9':
                    return '律师事务所'
                    break;
                case '10':
                    return '学校'
                    break;
                case '-1':
                    return '其他'
                    break;
                case '':
                    return '-'
                    break;
            }
        },
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
                this.detailData = res.data
            })
            // 4.1.7新增字段
            this.ajax
                .json('/dcp/query/qcc/enterprise/business', { companyName }, { type: 'get' })
                .then(res => {
                    this.newlyIncreased = res.data
                    if (this.newlyIncreased.originalName.length > 0) {
                        this.originalName = this.newlyIncreased.originalName.name
                    }
                });
        },
        // 获取联系人信息列表
        getContactsMes (companyName) {
            this.$http('/dcp/pre/credit/company/contact/list', { companyName }, { type: 'get' }).then(res => {
                this.contactList = res.data
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
}
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
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    td:nth-child(odd) {
        width: 165px;
        background: #292b2f;
        color: #a0a3a8;
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        padding: 17px 5px 17px 20px;
        line-height: 16px;
        border-bottom: 1px solid #54575c;
    }
}

/deep/ .tab-info {
    border: 1px solid #54575c;
    // tr:last-child {
    //     td {
    //        border-bottom: 0;
    //     }
    // }
    th {
        color: #a0a3a8;
        border-right: 1px solid #54575c;
        font-weight: normal;
    }
    th.is-leaf {
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        font-weight: normal;
        border-bottom: 1px solid #54575c;
        border-right: 1px solid #54575c;
    }
}
.report {
    color: #43a1ac;
    text-decoration: underline;
}
/deep/ .el-tabs__header {
    margin-top: 30px;
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

.el-table-list.xiugai {
    border-bottom: 1px solid transparent;
    tr {
        width: 50%;
        display: inline-block;
        td:last-child {
            width: 447px;
            &.last_td {
                width: auto;
            }
            &.length_mix {
                width: 1120px;
            }
        }
        &.last_tr {
            width: 100%;
        }
    }
}
</style>
