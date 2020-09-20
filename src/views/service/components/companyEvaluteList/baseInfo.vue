<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <qg-table subtitle="联系方式" class="mt20">
            <qg-table-column v-for="(item,index) in contactWayHan()" :key="index" :label="item.key" :column="item.column" width="157">{{item.value}}</qg-table-column>
        </qg-table>
        <!-- 工商登记股东 -->
        <div class="sub-title mb20 mt20" id="shareholder">工商登记股东</div>
        <el-table :data='investorList' border>
            <el-table-column :formatter="formatLabel" prop='stockholderName' label='股东' width="250" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='stockholderType' label='股东类型' show-overflow-tooltip width="200"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='ratio' label='持股比' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.ratio.match("%") ?  Number(scope.row.ratio.replace('%','')).toFixed(2) + '%' : (scope.row.ratio*100).toFixed(2)+ '%'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop='subscriptionAmount' label='认缴总额' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{scope.row.subscriptionAmount?scope.row.subscriptionAmount+'万元人民币':'-'}}
                </template>
            </el-table-column>
            <el-table-column label='认缴明细' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <el-button type="primary" plain @click="toDetail(scope.row.subscriptionDetailList,'ac')">详情</el-button>
                </template>
            </el-table-column>
            <el-table-column prop='actualPaymentAmount' label='实缴总额' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{scope.row.actualPaymentAmount?scope.row.actualPaymentAmount+'万元人民币':'-'}}
                </template>
            </el-table-column>
            <el-table-column label='实缴明细' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <el-button type="primary" plain @click="toDetail(scope.row.actualPaymentDetailList,'sub')">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="investorParams.size" @size-change="getInvestor" :current-page.sync="investorParams.current" @current-change="getInvestor"
            layout="total, sizes, prev, pager, next, jumper" :total="investorTotal" v-if="investorTotal > 10"></el-pagination>
        <investor-dialog ref="investor" :list="detailList" :type="detailType"></investor-dialog>
        <!-- 工商登记股东 -->

        <!-- 对外投资 -->
        <div class="sub-title mb20 mt20" id="investment">对外投资</div>
        <el-table :data='investmentList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='companyName' label='企业名称' width='300' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='creditCode' label='统一社会信用代码' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='checkInStatus' label='登记状态' width='100' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='checkInOrg' label='登记机关' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='regNumber' label='注册号' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='chkDate' label='核准日期' show-overflow-tooltip align='center'></el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="investmentParams.size" @size-change="getInvestment" :current-page.sync="investmentParams.current" @current-change="getInvestment"
            layout="total, sizes, prev, pager, next, jumper" :total="investmentTotal" v-if="investmentTotal > 10"></el-pagination>
        <!-- 对外投资 -->

        <!-- 股权穿透 -->
        <div class="sub-title mb20 mt20" id="through">股权穿透</div>
        <div id="d3" class="d3-box">
            <div class="d3-tip">鼠标滚动键进行图形的↑放大和↓缩小</div>
            <d3-instance :type="'equity'" ref="d3" :url="url" :formData="form" :way="'get'"></d3-instance>
        </div>
        <!-- 股权穿透 -->

        <!-- 主要成员 -->
        <div class="sub-title mb20 mt20" id="member">主要成员</div>
        <el-table :data='memberList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='member' label='姓名' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='position' label='职务' show-overflow-tooltip align='center'></el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="memberParams.size" @size-change="getMember" :current-page.sync="memberParams.current" @current-change="getMember"
            layout="total, sizes, prev, pager, next, jumper" :total="memberTotal" v-if="memberTotal > 10"></el-pagination>
        <!-- 主要成员 -->

        <!-- 分支机构 -->
        <div class="sub-title mb20 mt20" id="organization">分支机构</div>
        <el-table :data='branchList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='companyName' label='企业名称' show-overflow-tooltip width="300"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='creditCode' label='统一社会信用代码' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='regNumber' label='注册号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='operName' label='法定代表人' show-overflow-tooltip width="100"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='checkInStatus' label='状态' show-overflow-tooltip width="50"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='chkDate' label='核准日期' show-overflow-tooltip width="120"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='checkInOrg' label='登记机关' show-overflow-tooltip width="300"></el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="branchParams.size" @size-change="getBranch" :current-page.sync="branchParams.current" @current-change="getBranch"
            layout="total, sizes, prev, pager, next, jumper" :total="branchTotal" v-if="branchTotal > 10"></el-pagination>
        <!-- 分支机构 -->

        <!-- 企业年报 -->
        <div class="sub-title mb20 mt20" id="annals">企业年报</div>
        <el-table :data='reportList' border>
            <el-table-column :formatter="formatLabel" prop='submissionAnnual' label='报送年度' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='totalAssetAmount' label='资产总额' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='totalEquity' label='所有者权益合计' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='grossRevenue' label='营业总收入' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='netProfits' label='净利润' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='totalTaxPayment' label='纳税总额' show-overflow-tooltip></el-table-column>
            <el-table-column label="完整年报" width="100" align="center">
                <template slot-scope="scope">
                    <el-button @click="toReportDetail(scope.row)" type="primary" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="reportParams.size" @size-change="getReport" :current-page.sync="reportParams.current" @current-change="getReport"
            layout="total, sizes, prev, pager, next, jumper" :total="reportTotal" v-if="reportTotal > 10"></el-pagination>
        <report-dialog ref="report" />
        <!-- 企业年报 -->
        <qg-table subtitle="联系方式" class="mt20">
            <qg-table-column v-for="(item,index) in conda()" :key="index" :label="item.key">{{item.value}}</qg-table-column>
        </qg-table>

        <!-- 实际控股人 -->
        <div class="sub-title mt20" id="practical">实际控制人</div>
        <div class="actual-wrap">
            <div class="d3-tip2">鼠标滚动键进行图形的↑放大和↓缩小</div>
            <div class="actual-update-date">
                更新日期: {{ actualPersonDate }}
            </div>
            <actualD3 :type="'holder'" ref="actualD3" :url="actualUrl" :formData="form" :way="'get'" />
        </div>
    </div>
</template>
<script>
import d3Instance from "@/views/data-tools/components/d3-instance.vue";
import reportDialog from "./components/common/report-dialog.vue";
import tree from "@/utils/echart/tree/tree";
import { deepClone } from "@/utils/common";
import actualD3 from "@/views/data-tools/components/actualPerson.vue";
export default {
    components: {
        investorDialog: () => import("./components/common/dialog.vue"),
        reportDialog,
        d3Instance,
        actualD3
    },
    data () {
        return {
            url: `/dcp/query/enterprise/basic/equity/through/${this.$route.query.evaluateId}`,
            actualUrl: `/dcp/query/enterprise/basic/suspected/actual/holding/${this.$route.query.evaluateId}`,
            form: {
                corporateName: ""
            },
            opt: {},
            actualPersonDate: "",
            industryItem: {},
            investorList: [],
            investorTotal: 0,
            investorParams: {
                current: 1,
                size: 10
            },
            memberList: [],
            memberParams: {
                current: 1,
                size: 10
            },
            memberTotal: 0,
            investmentList: [],
            investmentParams: {
                current: 1,
                size: 10
            },
            investmentTotal: 0,
            branchList: [],
            branchParams: {
                current: 1,
                size: 10
            },
            branchTotal: 0,
            reportList: [],
            reportParams: {
                current: 1,
                size: 10
            },
            reportTotal: 0,
            detailList: [],
            detailType: "",
            conactItem: {}
        };
    },
    created () {
        let { evaluateId } = this.$route.query;
        this.getIndustry(evaluateId);
        this.getInvestor();
        this.getContact(evaluateId);
        this.getMember();
        this.getInvestment();
        this.getBranch();
        this.getReport();
        this.getActual();
        this.getActualPerson();
        this.getThrough();
    },

    methods: {
        routeDate () {
            return [
                {
                    id: "baseIcon",
                    name: "工商基本信息"
                },
                {
                    id: "shareholder",
                    name:
                        "工商登记股东 " +
                        (this.investorTotal ? `(${this.investorTotal})` : "")
                },
                {
                    id: "investment",
                    name:
                        "对外投资 " +
                        (this.investmentTotal ? `(${this.investmentTotal})` : "")
                },
                {
                    id: "through",
                    name: "股权穿透"
                },
                {
                    id: "member",
                    name: "主要成员 " + (this.memberTotal ? `(${this.memberTotal})` : "")
                },
                {
                    id: "organization",
                    name: "分支机构 " + (this.branchTotal ? `(${this.branchTotal})` : "")
                },
                {
                    id: "annals",
                    name: "企业年报 " + (this.reportTotal ? `(${this.reportTotal})` : "")
                },
                {
                    id: "contactWay",
                    name: "联系方式"
                },
                {
                    id: "practical",
                    name: "实际控制人"
                }
            ];
        },
        //穿透图
        getThrough () {
            this.$nextTick(() => {
                this.$refs.d3.getData();
                this.$refs.actualD3.getData();
            });
        },
        // 获取控股人图
        getActualPerson () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(
                    `/dcp/query/enterprise/basic/suspected/actual/holding/${evaluateId}`,
                    {},
                    { type: "get" }
                )
                .then(res => {
                    let treeData = deepClone(tree);
                    let respData = res.data.controllerData.paths;
                    let list = [];
                    respData.forEach(o => {
                        let data = o.reduceRight((p, c) => {
                            if (!p.name) {
                                return {
                                    ...c,
                                    proportion: c.percent || "",
                                    corptag: [],
                                    number: 0,
                                    children: []
                                };
                            } else {
                                return {
                                    ...c,
                                    proportion: c.percent || "",
                                    corptag: [],
                                    number: 0,
                                    children: [{ ...p }]
                                };
                            }
                        }, {})
                        list.push(data)
                    })
                    list[0].name = this.$route.query.companyName
                    treeData.series[0].data = list
                    this.opt = treeData
                    this.actualPersonDate = this.formatDate(res.data.updateTime, "YYYY-MM-DD")
                });
        },
        toReportDetail (row) {
            this.$refs.report.info = row;
            this.$refs.report.getRow();
            this.$refs.report.dialogVisible = true;
        },
        toDetail (list, type) {
            this.detailList = list;
            this.detailType = type;
            this.$refs.investor.dialogVisible = true;
        },
        getActual () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(
                    `/dcp/query/enterprise/basic/suspected/actual/holding/${evaluateId}`,
                    { evaluateId },
                    { type: "get" }
                )
                .then(res => {
                    console.log(res, "res");
                });
        },
        getBranch () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json("/dcp/query/enterprise/basic/branch", {
                    evaluateId,
                    ...this.branchParams
                })
                .then(res => {
                    this.branchList = res.data.records;
                    this.branchTotal = res.data.total;
                });
        },

        // 获取对外成员
        getInvestment () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json("/dcp/query/enterprise/basic/investment", {
                    evaluateId,
                    ...this.investmentParams
                })
                .then(res => {
                    this.investmentList = res.data.records;
                    this.investmentTotal = res.data.total;
                });
        },

        // 获取主要成员
        getMember () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json("/dcp/query/enterprise/basic/master/member", {
                    evaluateId,
                    ...this.memberParams
                })
                .then(res => {
                    this.memberList = res.data.records;
                    this.memberTotal = res.data.total;
                });
        },

        // 获取工商基本信息
        getIndustry (evaluateId) {
            this.ajax
                .json(
                    `/dcp/query/enterprise/basic/company/${evaluateId}`,
                    {},
                    { type: "get" }
                )
                .then(res => {
                    this.industryItem = res.data;
                });
        },

        // 获取工商登记股东
        getInvestor () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(`/dcp/query/enterprise/basic/investor`, { evaluateId, ...this.investorParams })
                .then(res => {
                    this.investorList = res.data.records;
                    this.investorTotal = res.data.total;
                });
        },
        getContact (evaluateId) {
            this.ajax
                .json(
                    `/dcp/query/enterprise/basic/contact/${evaluateId}`,
                    {},
                    { type: "get" }
                )
                .then(res => {
                    this.conactItem = res.data;
                });
        },
        getReport () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json(`/dcp/query/enterprise/basic/annual/report`, {
                    evaluateId,
                    ...this.reportParams
                })
                .then(res => {
                    this.reportList = res.data.records;
                    this.reportTotal = res.data.total;
                });
        },
        contactWayHan () {
            return [
                {
                    key: "名称",
                    value: this.industryItem && this.industryItem.companyName,
                    column: 'qg-three',
                },
                {
                    key: "统一社会信用代码",
                    value: this.industryItem && this.industryItem.creditCode,
                    column: 'qg-three'
                },
                {
                    key: "法定代表人",
                    value: this.industryItem && this.industryItem.faRen,
                    column: 'qg-three'
                },
                {
                    key: "登记状态",
                    value: this.industryItem && this.industryItem.checkInStatus,
                    column: 'qg-three'
                },
                {
                    key: "企业类型",
                    value: this.industryItem && this.industryItem.regType,
                    column: 'qg-three'
                },
                {
                    key: "注册资本",
                    value: this.industryItem && this.industryItem.regMoney,
                    unit: this.industryItem && `${this.industryItem.regMoneyCurrency}`,
                    column: 'qg-three'
                },
                {
                    key: "成立日期",
                    value: this.industryItem && this.industryItem.createDate,
                    column: 'qg-three'
                },
                {
                    key: "核准日期",
                    value: this.industryItem && this.industryItem.chkDate,
                    column: 'qg-three',
                },
                {
                    key: "营业期限",
                    value: this.industryItem && this.industryItem.term,
                    column: 'qg-three'
                },
                {
                    key: "登记机关",
                    value: this.industryItem && this.industryItem.checkInOrg,
                    column: 'qg-three'
                },
                {
                    key: "所属行业",
                    value: this.industryItem && this.industryItem.tradedic,
                    column: 'qg-three'
                },
                {
                    key: "组织机构代码",
                    value: this.industryItem && this.industryItem.orgCode,
                    column: 'qg-three'
                },
                {
                    key: "工商注册号",
                    value: this.industryItem && this.industryItem.regNumber,
                    column: 'qg-three'
                },
                {
                    key: "纳税人识别号",
                    value: this.industryItem && this.industryItem.taxpayerNum,
                    column: 'qg-three'
                },
                {
                    key: "所属地区",
                    value: this.industryItem && this.industryItem.area,
                    column: 'qg-three'
                },
                {
                    key: "规模",
                    value: this.industryItem && this.industryItem.personScope,
                    column: 'qg-three'
                },
                {
                    key: "参保人数",
                    value: this.industryItem && this.industryItem.insuredCount,
                    column: 'qg-three'
                },
                {
                    key: "实缴资本",
                    value: this.industryItem && this.industryItem.recCap,
                    column: 'qg-three'
                },
                {
                    key: "吊销日期",
                    value:
                        this.industryItem &&
                        this.formatDate(this.industryItem.revokeDate, "YYYY-MM-DD"),
                    column: 'qg-three'
                },
                {
                    key: "发照日期",
                    value:
                        this.industryItem &&
                        this.formatDate(this.industryItem.issueDate, "YYYY-MM-DD"),
                    column: 'qg-three'
                },
                {
                    key: "是否上市",
                    value: this.industryItem && this.industryItem.isOnStock === '0' ? '否' : '是',
                    column: 'qg-three'
                },
                {
                    key: "上市公司代码",
                    value: this.industryItem && this.industryItem.stockCode && this.industryItem.stockCode.join(),
                    column: 'qg-three'
                },
                {
                    key: "省",
                    value: this.industryItem && this.industryItem.province,
                    column: 'qg-three'
                },
                {
                    key: "市",
                    value: this.industryItem && this.industryItem.city,
                    column: 'qg-three'
                },
                {
                    key: "区县",
                    value: this.industryItem && this.industryItem.district,
                    column: 'qg-three'
                },
                {
                    key: "行业门类",
                    value: this.industryItem && this.industryItem.industry,
                    column: 'qg-three'
                },
                {
                    key: "行业大类",
                    value: this.industryItem && this.industryItem.subIndustry,
                    column: 'qg-three'
                },
                {
                    key: "行业中类",
                    value: this.industryItem && this.industryItem.middleCategory,
                    column: 'qg-three'
                },
                {
                    key: "行业小类",
                    value: this.industryItem && this.industryItem.smallCategory,
                    column: 'qg-three'
                },
                {
                    key: "曾用名",
                    value: this.industryItem && this.industryItem.originalName && this.industryItem.originalName.join(','),
                    column: 'qg-three'
                },
                {
                    key: "英文名",
                    value: this.industryItem && this.industryItem.englishName,
                    alone: true
                },

                {
                    key: "企业地址",
                    value: this.industryItem && this.industryItem.address,
                    alone: true
                },
                {
                    key: "前瞻标签",
                    value: this.industryItem && this.industryItem.prospectTag,
                    alone: true
                },
                {
                    key: "展会标签",
                    value: this.industryItem && this.industryItem.exhibitionTag,
                    alone: true
                },
                {
                    key: "业务标签",
                    value: this.industryItem && this.industryItem.businessTag,
                    alone: true
                },
                {
                    key: "经营范围",
                    value: this.industryItem && this.industryItem.businessScope,
                    alone: true
                }
            ];
        },
        conda () {
            return [
                {
                    key: "网址",
                    value: (this.conactItem && this.conactItem.url) || '-',
                    alone: true
                },
                {
                    key: "电子邮箱",
                    value: (this.conactItem && this.conactItem.email) || '-',
                    alone: true
                },
                {
                    key: "联系电话",
                    value: (this.conactItem && this.conactItem.phone) || '-',
                    alone: true
                },
                {
                    key: "通信地址",
                    value: (this.conactItem && this.conactItem.address) || '-',
                    alone: true
                }
            ];
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView();
        }
    }
};
</script>

<style lang="less" scoped>
.actual-wrap {
    position: relative;
    margin-top: 20px;
}
.dark{
    .actual-wrap {
        border: 1px solid #54575c;
    }
}
.light{
    .actual-wrap {
        border: 1px solid #D2D9E5;
    }
}
.d3-box {
    position: relative;
}
.d3-tip2 {
    position: absolute;
    top: 20px;
    right: 20px;
}
.d3-tip {
    position: absolute;
    right: 20px;
    top: 0px;
}
.actual-update-date {
    margin: 20px 0 0 20px;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #ffffff;
}
.n-subtitle {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
    margin-bottom: 20px;
}
.n-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    margin-bottom: 20px;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand.copyright .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

/deep/ .el-iconfont {
    padding-left: 0;
    .item {
        background: #1e292e;
    }
}
</style>
