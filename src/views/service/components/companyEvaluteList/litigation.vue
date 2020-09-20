<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>

        <!-- 审判流程 -->
        <div class="sub-title mb20 mt20" id="baseIcon">审判流程</div>
        <el-table :data='processList' border>
            <el-table-column type="expand">
                <template slot-scope="props">

                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="案号：">
                            <span>{{ props.row.caseNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="案由: ">
                            <span>{{ props.row.reason|| '-'}}</span>
                        </el-form-item>
                        <el-form-item label="标的金额: ">
                            <span>{{ props.row.targetAmount || '-'}}</span>
                        </el-form-item>
                        <el-form-item label="审判程序: ">
                            <span>{{ props.row.judicialProcedure || '-'}}</span>
                        </el-form-item>
                        <el-form-item label="案件进度: ">
                            <span>{{ props.row.caseProgress || '-'}}</span>
                        </el-form-item>
                        <el-form-item label="承办部门: ">
                            <span>{{ props.row.caseType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="结案方式: ">
                            <span>{{ props.row.finishType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="承办部门: ">
                            <span>{{ props.row.caseType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="主审法官: ">
                            <span>{{ props.row.mainJudge || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="合议庭成员: ">
                            <span>{{ props.row.member || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="归档日期: ">
                            <span>{{ props.row.closeDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="审限日期: ">
                            <span>{{ props.row.deadline || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="立案日期: ">
                            <span>{{ props.row.filingDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="立案时间: ">
                            <span>{{ props.row.filingTime || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="主审法官: ">
                            <span>{{ props.row.mainJudge || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="公告类型: ">
                            <span>{{ props.row.announcementType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="字号: ">
                            <span>{{ props.row.wordNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="字号: ">
                            <span>{{ props.row.announcer || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="审判长: ">
                            <span>{{ props.row.chiefJudge || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="案件类别: ">
                            <span>{{ props.row.caseType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="结案方式: ">
                            <span>{{ props.row.finishType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="结案日期: ">
                            <span>{{ props.row.finishDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="litigant" label="当事人: ">
                            <el-table style="width: 400px" :data='litigantListTransition(props.row.litigantList)' border>
                                <el-table-column prop='role' label='角色' width="100" show-overflow-tooltip align='left'></el-table-column>
                                <el-table-column prop='name' label='名字' show-overflow-tooltip align='left'>
                                    <template slot-scope="child">
                                        <p style="margin:5px 0;" v-for="(item,i) in child.row.name" :key="i">
                                            <span class="right">{{item}}</span>
                                        </p>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='filingDate' width="230" label='立案日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='reason' label='案由' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseProgress' width="120" label='案件进度' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" label='当事人'>
                <template slot-scope="props">
                    <p style="margin:5px 0;" v-for="(item,i) in props.row.litigantList" :key="i">
                        <span class="left">{{item.role}}：</span>
                        <span class="right">{{item.name}}</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='processParams.size' @size-change='getProcess' :current-page.sync='processParams.current' @current-change='getProcess'
            layout='total, sizes, prev, pager, next, jumper' :total='processTotal' v-if='processTotal > 10'>
        </el-pagination>
        <!-- 审判流程 -->

        <!-- 开庭公告 -->
        <div class="sub-title mb20 mt20" id="shareholder">开庭公告</div>
        <el-table :data="noticeList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="正文:">
                            <el-tooltip class="item tooltipItem" effect="dark" :content="props.row.content" placement="top-start">
                                <el-button>{{ props.row.content || '-' }}</el-button>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="开庭时间: ">
                            <span>{{ props.row.openCourtDate || '-'}}</span>
                        </el-form-item>
                        <el-form-item label="法官: ">
                            <span>{{ props.row.judgeName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="审理法院: ">
                            <span>{{ props.row.courtName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="案号: ">
                            <span>{{ props.row.caseNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="案件类型: ">
                            <span>{{ props.row.caseType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="法庭: ">
                            <span>{{ props.row.lawCourt || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="发布时间: ">
                            <span>{{ props.row.issueDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="当事人: ">
                            <el-table :data="props.row.litigantDetailList" border style="width: 460px">
                                <el-table-column prop="role" label="角色" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                                <el-table-column prop="name" label="名字" show-overflow-tooltip :formatter="formatLabel"></el-table-column>

                            </el-table>

                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='openCourtDate' label='开庭时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='courtName' label='法庭' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='reason' label='案由' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='litigantDetailList' label='当事人' show-overflow-tooltip>
                <template slot-scope="props">
                    <span v-if="!(props.row.litigantDetailList && props.row.litigantDetailList.length>0)">-</span>
                    <p style="margin:5px 0;" v-for="(item,i) in props.row.litigantDetailList" :key="i">
                        <span class="left">{{item.role}}：</span>
                        <span class="right">{{item.name}}</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='noticeParams.size' @size-change='getNotice' :current-page.sync='noticeParams.current' @current-change='getNotice'
            layout='total, sizes, prev, pager, next, jumper' :total='noticeTotal' v-if='noticeTotal > 10'>
        </el-pagination>
        <!-- 开庭公告 -->

        <!-- 裁判文书 -->
        <div class="sub-title mb20 mt20" id="investment">裁判文书</div>
        <el-table :data="documentList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="判决结果: ">
                            <span>{{ props.row.litigantList[0].judgeResult || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="发布时间: ">
                            <span>{{ props.row.issueDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="不公开理由: ">
                            <span>{{ props.row.noPublicReason || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="判决金额: ">
                            <span>{{props.row.decideTotalAmount || '-'}}</span>
                        </el-form-item>
                        <el-form-item label="法官: ">
                            <span>{{ props.row.judgeName || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="案件类型: ">
                            <span>{{ props.row.caseType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="当事人: ">
                            <el-table :data="props.row.litigantList" style="width: 100%" border>
                                <el-table-column prop="roles" label="角色" width="100">
                                </el-table-column>
                                <el-table-column prop="name" label="名字" width="300">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>

                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='decideDate' label='判决时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='title' label='标题' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='courtName' label='审理法院' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='reason' label='案由' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseNumber' label='案号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='documentType' label='文书类型' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='documentParams.size' @size-change='getDocument' :current-page.sync='documentParams.current' @current-change='getDocument'
            layout='total, sizes, prev, pager, next, jumper' :total='documentTotal' v-if='documentTotal > 10'>
        </el-pagination>
        <!-- 裁判文书 -->

        <!-- 失信人 -->
        <div class="sub-title mb20 mt20" id="member">失信人</div>
        <el-table :data="dishonestList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="名称">
                            <span>{{ props.row.name || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="发布时间">
                            <span>{{ props.row.issueDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="法定代表人或负责人姓名">
                            <span>{{ props.row.faRen || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="身份证/组织机构代码">
                            <span>{{ props.row.orgno || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="执行依据文号">
                            <span>{{ props.row.executionNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="做出执行依据单号">
                            <span>{{ props.row.executiveUnit || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="实心被执行人为具体情形">
                            <span>{{ props.row.executiveSpecificSituation || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="省份">
                            <span>{{ props.row.province || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='filingTime' label='立案时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseNumber' label='案号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='executionCourt' label='执行法院' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='performance' label='状态' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='dishonestParams.size' @size-change='getDishonest' :current-page.sync='dishonestParams.current' @current-change='getDishonest'
            layout='total, sizes, prev, pager, next, jumper' :total='dishonestTotal' v-if='dishonestTotal > 10'>
        </el-pagination>
        <!-- 失信人 -->

        <!-- 被执行人 -->
        <div class="sub-title mb20 mt20" id="organization">被执行人</div>
        <el-table :data='executedList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='名称' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='orgno' label='身份证/组织机构代码' show-overflow-tooltip></el-table-column>
            <el-table-column prop='filingTime' label='立案日期' show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.filingTime}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseNumber' label='案号' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseStatus' label='案件状态' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='executionCourt' label='执行法院' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='executionStandard' label='执行标的' show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='executedParams.size' @size-change='getExecuted' :current-page.sync='executedParams.current' @current-change='getExecuted'
            layout='total, sizes, prev, pager, next, jumper' :total='executedTotal' v-if='executedTotal > 10'>
        </el-pagination>
        <!-- 被执行人 -->

        <!-- 涉诉公告 -->
        <div class="sub-title mb20 mt20" id="annals">涉诉公告</div>
        <el-table :data='afficheList' border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">正文:</span>
                            <span class="throwContent">{{ props.row.content }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeDate' label='公告时间' width='150' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeType' label='公告类型' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='announcer' label='公告人' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='litigants' label='当事人' show-overflow-tooltip></el-table-column>
            <!-- <el-table-column :formatter="formatLabel" prop='content' label='正文' show-overflow-tooltip></el-table-column> -->
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='afficheParams.size' @size-change='getAffiche' :current-page.sync='afficheParams.current' @current-change='getAffiche'
            layout='total, sizes, prev, pager, next, jumper' :total='afficheTotal' v-if='afficheTotal > 10'>
        </el-pagination>
        <!-- 涉诉公告 -->

        <!-- 股权冻结 -->
        <div class="sub-title mb20 mt20" id="contactWay">股权冻结</div>
        <el-table :data='assistanceList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='announcementDate' label='发布时间' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='companyName' label='股权所在企业' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='被执行人' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='stockAmount' label='股权数额' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeNo' label='执行通知书文号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='documentNo' label='执行裁定书文号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='idType' width="140" label='被执行人证件种类' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='profession' width="140" label='被执行人证件号码' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='freezingEndDate' label='冻结期限自' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='closeFreezeTerm' label='冻结期限至' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='assistanceParams.size' @size-change='getAssistance' :current-page.sync='assistanceParams.current' @current-change='getAssistance'
            layout='total, sizes, prev, pager, next, jumper' :total='assistanceTotal' v-if='assistanceTotal > 10'>
        </el-pagination>
        <!-- 股权冻结 -->
    </div>
</template>
<script>
export default {
    data () {
        return {
            processParams: {
                current: 1,
                size: 10,
            },
            processTotal: 0,
            processList: [],
            noticeParams: {
                current: 1,
                size: 10,
            },
            noticeTotal: 0,
            noticeList: [],
            documentParams: {
                current: 1,
                size: 10,
            },
            documentTotal: 0,
            documentList: [],
            dishonestParams: {
                current: 1,
                size: 10,
            },
            dishonestTotal: 0,
            dishonestList: [],
            executedParams: {
                current: 1,
                size: 10,
            },
            executedTotal: 0,
            executedList: [],
            afficheParams: {
                current: 1,
                size: 10,
            },
            afficheTotal: 0,
            afficheList: [],
            assistanceParams: {
                current: 1,
                size: 10,
            },
            assistanceTotal: 0,
            assistanceList: [],
            updataHead: [
                {
                    title: "序号",
                    name: "index"
                },
                {
                    title: "变更日期",
                    name: "updataData"
                },
                {
                    title: "变更事项",
                    name: "updataItems"
                },
                {
                    title: "变更前",
                    name: "updataBefore"
                },
                {
                    title: "变更后",
                    name: "updataAfter"
                }
            ],
            updataContent: [
                {
                    index: "1",
                    updataData: "2018-06-08",
                    updataItems: "-",
                    updataBefore: "-",
                    updataAfter:
                        "原告：惠东县巽寮鑫华五金商店" +
                        "\r\n" +
                        "被告：扬州富亿达建筑有限公司，中建一局集团建设发展有限公司"
                }
            ],
            pledgeHead: [
                {
                    title: "序号",
                    name: "index"
                },
                {
                    title: "变更日期",
                    name: "updataData"
                },
                {
                    title: "变更事项",
                    name: "updataItems"
                },
                {
                    title: "变更前",
                    name: "updataBefore"
                },
                {
                    title: "变更后",
                    name: "updataAfter"
                }
            ],
            pledgeContent: [
                {
                    index: "1",
                    updataData: "2018-06-08",
                    updataItems: "-",
                    updataBefore: "-",
                    updataAfter: "-",
                    number: "无",
                    code: "无",
                    annotation: "无",
                    type: "无"
                }
            ]
        };
    },
    created () {
        this.getProcess()
        this.getNotice()
        this.getDocument()
        this.getAffiche()
        this.getDishonest()
        this.getExecuted()
    },
    methods: {
        litigantListTransition (litigantList) {
            let tempArr = [], newArr = [];
            for (let i = 0; i < litigantList.length; i++) {
                if (tempArr.indexOf(litigantList[i].role) === -1) {
                    newArr.push({
                        role: litigantList[i].role,
                        name: [litigantList[i].name],
                    });
                    tempArr.push(litigantList[i].role);
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        if (newArr[j].role == litigantList[i].role) {
                            newArr[j].name.push(litigantList[i].name);
                        }
                    }
                }
            }
            return newArr
        },
        routeDate () {
            return [
                {
                    id: "baseIcon",
                    name: "审判流程 " + (this.processTotal ? `(${this.processTotal})` : '')
                },
                {
                    id: "shareholder",
                    name: "开庭公告 " + (this.noticeTotal ? `(${this.noticeTotal})` : '')
                },
                {
                    id: "investment",
                    name: "裁判文书 " + (this.documentTotal ? `(${this.documentTotal})` : '')
                },
                {
                    id: "member",
                    name: "失信人 " + (this.dishonestTotal ? `(${this.dishonestTotal})` : '')
                },
                {
                    id: "organization",
                    name: "被执行人 " + (this.executedTotal ? `(${this.executedTotal})` : '')
                },
                {
                    id: "annals",
                    name: "涉诉公告 " + (this.afficheTotal ? `(${this.afficheTotal})` : '')
                },
                {
                    id: "contactWay",
                    name: "股权冻结 " + (this.assistanceTotal ? `(${this.assistanceTotal})` : '')
                }
            ]        },
        getProcess () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/appeal/judgement/process', { evaluateId, ...this.processParams })
                .then(res => {
                    this.processList = res.data.records.map(o => ({ ...o, litigants: o.litigantList.map(litigant => litigant.name).join('，') }));
                    this.processTotal = res.data.total;
                });
        },
        getNotice () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/appeal/open/court/notice', { evaluateId, ...this.noticeParams })
                .then(res => {
                    this.noticeList = res.data.records;
                    this.noticeTotal = res.data.total;
                });
        },

        // 获取裁判文书
        getDocument () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/appeal/judgement/document', { evaluateId, ...this.documentParams })
                .then(res => {
                    console.log('获取裁判文书', res)
                    this.documentList = res.data.records;
                    this.documentTotal = res.data.total;
                });
        },
        getDishonest () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/appeal/dishonest', { evaluateId, ...this.dishonestParams })
                .then(res => {
                    this.dishonestList = res.data.records;
                    this.dishonestTotal = res.data.total;
                });
        },
        getExecuted () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/enterprise/appeal/executed', { evaluateId, ...this.executedParams })
                .then(res => {
                    this.executedList = res.data.records;
                    this.executedTotal = res.data.total;
                });
        },
        getAffiche () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/appeal/litigation/notice', { evaluateId, ...this.afficheParams })
                .then(res => {
                    this.afficheList = res.data.records;
                    this.afficheTotal = res.data.total;
                });
        },
        getAssistance () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/appeal/judicial/assistance', { evaluateId, ...this.assistanceParams })
                .then(res => {
                    this.assistanceList = res.data.records;
                    this.assistanceTotal = res.data.total;
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView();
        }
    }
};
</script>
<style lang="less" scoped>
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

.table_shesu_caipanwenshu {
    /deep/ .el-form-item {
        width: 500px;
        margin-bottom: 0;
    }
    /deep/ .el-form-item__content {
        line-height: 32px;
    }
}

.throw {
    display: inline-block;
    .throwTitle {
        display: inline-block;
        width: 48px;
    }
    .throwContent {
        display: inline-block;
        vertical-align: top;
        width: 1153px;
    }
    /deep/ .el-form-item__content {
        line-height: 27px;
    }
}
</style>
