<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!-- 审判流程 -->
        <div class="sub-title mb20 mt20" id="process">审判流程</div>
        <el-table :data="processList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">主审法官:</span>
                            <span class="throwContent">{{
                                props.row.mainJudge || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">公告人:</span>
                            <span class="throwContent">{{
                                props.row.announcer || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">公告类型:</span>
                            <span class="throwContent">{{
                                props.row.announcementType || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">匹配度:</span>
                            <span class="throwContent">{{
                                props.row.matchingDegree || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">发布时间:</span>
                            <span class="throwContent">{{
                                props.row.issueDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">合议庭成员:</span>
                            <span class="throwContent">{{
                                props.row.member || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">字号:</span>
                            <span class="throwContent">{{
                                props.row.wordNumber || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">审判程序:</span>
                            <span class="throwContent">{{
                                props.row.judicialProcedure || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">审判长:</span>
                            <span class="throwContent">{{
                                props.row.chiefJudge || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">审限日期:</span>
                            <span class="throwContent">{{
                                props.row.deadline || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">归档日期:</span>
                            <span class="throwContent">{{
                                props.row.closeDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">承办部门:</span>
                            <span class="throwContent">{{
                                props.row.orgName || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">标的金额:</span>
                            <span class="throwContent">{{
                                props.row.targetAmount || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案件类别:</span>
                            <span class="throwContent">{{
                                props.row.caseType || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案件进度:</span>
                            <span class="throwContent">{{
                                props.row.caseProgress || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案号:</span>
                            <span class="throwContent">{{
                                props.row.caseNumber || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案由:</span>
                            <span class="throwContent">{{
                                props.row.reason
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">立案日期:</span>
                            <span class="throwContent">{{
                                props.row.filingDate
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">立案时间:</span>
                            <span class="throwContent">{{
                                props.row.filingTime
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">结案方式:</span>
                            <span class="throwContent">{{
                                props.row.finishType
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">结案日期:</span>
                            <span class="throwContent">{{
                                props.row.finishDate
                            }}</span>
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
            <el-table-column :formatter="formatLabel" label="发布时间" prop="issueDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告人" prop="announcer"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案由" prop="reason"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案件进度" prop="caseProgress"> </el-table-column>
            <el-table-column label="当事人" prop="litigantList">
                <template slot-scope="props">
                    <p style="margin:5px 0;" v-for="(item,i) in props.row.litigantList" :key="i">
                        <span class="left">{{item['角色']}}：</span>
                        <span class="right">{{item['名字']}}</span>
                    </p>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='processParams.size' @size-change='getProcess' :current-page.sync='processParams.current' @current-change='getProcess'
            layout='total, sizes, prev, pager, next, jumper' :total='processTotal' v-if='processTotal > 10'>
        </el-pagination>
        <!--  审判流程  -->

        <!-- 裁判文书 -->
        <div class="sub-title mb20 mt30" id="document">裁判文书</div>
        <el-table :data="documentList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">案号：</span>
                            <span class="throwContent">{{
                                props.row.caseNumber || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法院：</span>
                            <span class="throwContent">{{
                                props.row.courtName || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">裁判时间：</span>
                            <span class="throwContent">{{
                                props.row.decideDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法官：</span>
                            <span class="throwContent">{{
                                props.row.issueDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案件类型：</span>
                            <span class="throwContent">{{
                                props.row.caseType || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="litigant" label="当事人: ">
                            <el-table :data="props.row.litigantList" border>
                                <el-table-column prop="roles" label="角色" show-overflow-tooltip :formatter="formatLabel">
                                    <template slot-scope='scope'>
                                        {{ scope.row.roles.join() }}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="名字" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                                <el-table-column prop="judgeResult" label="裁判结果" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                                <el-table-column prop="type" label="类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                                <el-table-column prop="orgName" label="组织名" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="判决时间" prop="decideDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="标题" prop="title"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案由" prop="reason"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法院" prop="courtName"> </el-table-column>
            <el-table-column label="当事人" prop="title">
                <template slot-scope="props">
                    <div>
                        {{(props.row.litigantList && props.row.litigantList.map(o => o.name).join("，"))||'-'}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='documentParams.size' @size-change='getDocument' :current-page.sync='documentParams.current' @current-change='getDocument'
            layout='total, sizes, prev, pager, next, jumper' :total='documentTotal' v-if='documentTotal > 10'>
        </el-pagination>
        <!--  裁判文书  -->

        <!-- 开庭公告 -->
        <div class="sub-title mb20 mt30" id="notice">开庭公告</div>
        <el-table :data="noticeList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">案由：</span>
                            <span class="throwContent">{{
                                props.row.reason || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案号：</span>
                            <span class="throwContent">{{
                                props.row.caseNumber || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法院：</span>
                            <span class="throwContent">{{
                                props.row.courtName || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">正文：</span>
                            <span class="throwContent">{{
                                props.row.content || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法庭：</span>
                            <span class="throwContent">{{
                                props.row.lawCourt || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">案件类型：</span>
                            <span class="throwContent">{{
                                props.row.caseType || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法官：</span>
                            <span class="throwContent">{{
                                props.row.issueDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">开庭时间：</span>
                            <span class="throwContent">{{
                                props.row.openCourtDate || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">发布时间：</span>
                            <span class="throwContent"></span>
                        </el-form-item>
                        <el-form-item class="litigant" label="当事人: ">
                            <table class="shenpanliucheng">
                                <tr>
                                    <th class="self_th_role">角色</th>
                                    <th class="self_th_name">名字</th>
                                </tr>
                                <tr v-for="(item,i) in props.row.litigantDetailList" :key="i">
                                    <td class="self_th_role">{{item.role}}</td>
                                    <td class="self_th_name">{{item.name}}</td>
                                </tr>
                            </table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="开庭时间" prop="openCourtDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法院" prop="courtName"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案由" prop="reason"> </el-table-column>
            <el-table-column label="当事人" prop="litigantDetailList">
                <template slot-scope="props">
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
        <!--   开庭公告-->

        <!--  被执行人 -->
        <div class="sub-title mb20 mt30" id="executed">被执行人</div>
        <el-table :data="executedList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">案号: </span>
                            <span class="throwContent">{{
                                props.row.caseNumber || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">立案时间:</span>
                            <span class="throwContent">{{
                                props.row.filingTime || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">被执行人名称:</span>
                            <span class="throwContent">{{ props.row.name }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="立案时间" prop="filingTime"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="执行标的" prop="executionStandard"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="执行法院" prop="executionCourt"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案件状态" prop="caseStatus"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='executedParams.size' @size-change='getExecuted' :current-page.sync='executedParams.current' @current-change='getExecuted'
            layout='total, sizes, prev, pager, next, jumper' :total='executedTotal' v-if='executedTotal > 10'>
        </el-pagination>
        <!--  被执行人 -->

        <!--  失信被执行人 -->
        <div class="sub-title mb20 mt30" id="dishonest">失信被执行人</div>
        <el-table :data="dishonestList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw width">
                            <span class="throwTitle">做出执行依据单位: </span>
                            <span class="throwContent">{{
                                props.row.executiveUnit || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">匹配度:</span>
                            <span class="throwContent">{{
                                props.row.matchingDegree || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">案由:</span>
                            <span class="throwContent">{{ props.row.executiveSpecificSituation || '-'}}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">年龄:</span>
                            <span class="throwContent">{{ props.row.age || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">执行依据文号:</span>
                            <span class="throwContent">{{ props.row.executionNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">未履行:</span>
                            <span class="throwContent">{{ props.row.nonPerformance || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">案号:</span>
                            <span class="throwContent">{{ props.row.caseNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">法定代表人或者负责人姓名:</span>
                            <span class="throwContent">{{ props.row.faRen || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">省份:</span>
                            <span class="throwContent">{{ props.row.province || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">立案日期:</span>
                            <span class="throwContent">{{ props.row.filingTime || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">被执行人姓名/名称:</span>
                            <span class="throwContent">{{ props.row.name || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw width">
                            <span class="throwTitle">被执行人的履行情况:</span>
                            <span class="throwContent">{{ props.row.performance || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="chaochang">
                            <span class="title">生效法律文书确定的义务:</span>
                            <span class="content">{{ props.row.legalDuty || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="立案时间" prop="filingTime"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案号" prop="caseNumber"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="案由(失信被执行人具体行为情形)" prop="executiveSpecificSituation"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="诉讼身份" prop=""> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='dishonestParams.size' @size-change='getDishonest' :current-page.sync='dishonestParams.current' @current-change='getDishonest'
            layout='total, sizes, prev, pager, next, jumper' :total='dishonestTotal' v-if='dishonestTotal > 10'>
        </el-pagination>
        <!--  失信被执行人 -->

        <!--  涉诉公告 -->
        <div class="sub-title mb20 mt30" id="litigation">涉诉公告</div>
        <el-table :data="litigationList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">公告人: </span>
                            <span class="throwContent">{{
                                props.row.announcer
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">公告时间:</span>
                            <span class="throwContent">{{
                                props.row.noticeDate
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">公告类型:</span>
                            <span class="throwContent">{{ props.row.noticeType }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">匹配度:</span>
                            <span class="throwContent">{{ props.row.matchingDegree }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">当事人:</span>
                            <span class="throwContent">{{ props.row.litigants.join() }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">正文:</span>
                            <span class="throwContent">{{ props.row.content }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告时间" prop="noticeDate"> </el-table-column>
            <el-table-column label="当事人" prop="litigants">
                <template slot-scope='scope'>
                    {{scope.row.litigants.join(',') || '-'}}
                </template> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告类型" prop="noticeType"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公告人" prop="announcer"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='litigationParams.size' @size-change='getLitigation' :current-page.sync='litigationParams.current' @current-change='getLitigation'
            layout='total, sizes, prev, pager, next, jumper' :total='litigationTotal' v-if='litigationTotal > 10'>
        </el-pagination>
        <!--  涉诉公告 -->

        <!--  司法协助 -->
        <div class="sub-title mb20 mt30" id="assistance">司法协助</div>
        <el-table :data="assistanceList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">执行法院: </span>
                            <span class="throwContent">{{
                                props.row.executeCourt || '-'
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">执行事项:</span>
                            <span class="throwContent">{{props.row.executeEvents || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">执行裁定书文号:</span>
                            <span class="throwContent">{{ props.row.documentNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">执行通知书文号:</span>
                            <span class="throwContent">{{ props.row.noticeNo || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">股权所在企业名称:</span>
                            <span class="throwContent">{{ props.row.companyName || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">股权数额:</span>
                            <span class="throwContent">{{ props.row.stockAmount || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">公示日期:</span>
                            <span class="throwContent">{{ props.row.announcementDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">冻结期限自:</span>
                            <span class="throwContent">{{ props.row.freezingStartDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">冻结期限至:</span>
                            <span class="throwContent">{{ props.row.freezingEndDate || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="公示日期" prop="announcementDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="股权数额" prop="stockAmount"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="执行法院" prop="executeCourt"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="执行裁定书文号" prop="documentNo"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="执行事项" prop="executeEvents"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='assistanceParams.size' @size-change='getAssistance' :current-page.sync='assistanceParams.current' @current-change='getAssistance'
            layout='total, sizes, prev, pager, next, jumper' :total='assistanceTotal' v-if='assistanceTotal > 10'>
        </el-pagination>
        <!--  司法协助 -->

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
            documentParams: {
                current: 1,
                size: 10,
            },
            documentTotal: 0,
            documentList: [],
            noticeParams: {
                current: 1,
                size: 10,
            },
            noticeTotal: 0,
            noticeList: [],
            executedParams: {
                current: 1,
                size: 10,
            },
            executedTotal: 0,
            executedList: [],
            dishonestParams: {
                current: 1,
                size: 10,
            },
            dishonestTotal: 0,
            dishonestList: [],
            litigationParams: {
                current: 1,
                size: 10,
            },
            litigationTotal: 0,
            litigationList: [],
            assistanceParams: {
                current: 1,
                size: 10,
            },
            assistanceTotal: 0,
            assistanceList: [],
        };
    },
    created () {
        this.getProcess()
        this.getDocument()
        this.getNotice()
        this.getExecuted()
        this.getDishonest()
        this.getLitigation()
        this.getAssistance()
    },

    methods: {
        litigantListTransition (litigantList) {
            let tempArr = [], newArr = [];
            for (let i = 0; i < litigantList.length; i++) {
                if (tempArr.indexOf(litigantList[i]["角色"]) === -1) {
                    newArr.push({
                        role: litigantList[i]["角色"],
                        name: [litigantList[i]["名字"]],
                    });
                    tempArr.push(litigantList[i]["角色"]);
                } else {
                    for (let j = 0; j < newArr.length; j++) {
                        if (newArr[j].role == litigantList[i]["角色"]) {
                            newArr[j].name.push(litigantList[i]["名字"]);
                        }
                    }
                }
            }
            return newArr
        },
        routeDate () {
            return [
                {
                    id: 'process',
                    name: '审判流程 ' + (this.processTotal ? `(${this.processTotal})` : '')
                },
                {
                    id: 'document',
                    name: '裁判文书 ' + (this.documentTotal ? `(${this.documentTotal})` : '')
                },
                {
                    id: 'notice',
                    name: '开庭公告 ' + (this.noticeTotal ? `(${this.noticeTotal})` : '')
                },
                {
                    id: 'executed',
                    name: '被执行人 ' + (this.executedTotal ? `(${this.executedTotal})` : '')
                },
                {
                    id: 'dishonest',
                    name: '失信被执行人 ' + (this.dishonestTotal ? `(${this.dishonestTotal})` : '')
                },
                {
                    id: 'litigation',
                    name: '涉诉公告 ' + (this.litigationTotal ? `(${this.litigationTotal})` : '')
                },
                {
                    id: 'assistance',
                    name: '司法协助 ' + (this.assistanceTotal ? `(${this.assistanceTotal})` : '')
                },
            ]        },
        getProcess () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/judgement/process', { evaluateId, ...this.processParams })
                .then(res => {
                    this.processList = res.data.records;
                    this.processTotal = res.data.total;
                });
        },
        getDocument () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/judicial/document', { evaluateId, ...this.documentParams })
                .then(res => {
                    this.documentList = res.data.records;
                    this.documentTotal = res.data.total;
                });
        },
        getNotice () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/open/court/notice', { evaluateId, ...this.noticeParams })
                .then(res => {
                    this.noticeList = res.data.records;
                    this.noticeTotal = res.data.total;
                });
        },
        getExecuted () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/executed', { evaluateId, ...this.executedParams })
                .then(res => {
                    this.executedList = res.data.records;
                    this.executedTotal = res.data.total;
                });
        },
        getDishonest () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/dishonest', { evaluateId, ...this.dishonestParams })
                .then(res => {
                    this.dishonestList = res.data.records;
                    this.dishonestTotal = res.data.total;
                });
        },
        getLitigation () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/litigation/notice', { evaluateId, ...this.litigationParams })
                .then(res => {
                    this.litigationList = res.data.records;
                    this.litigationTotal = res.data.total;
                });
        },
        getAssistance () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json('/dcp/query/person/appeal/judicial/assistance', { evaluateId, ...this.assistanceParams })
                .then(res => {
                    this.assistanceList = res.data.records;
                    this.assistanceTotal = res.data.total;
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView()
        }
    },

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
.btnGray_content {
    margin-bottom: 30px;
}
.btnGray {
    &.el-button.el-button--default {
        margin-right: 10px;
        margin-top: 20px;
    }
    &.el-button + .el-button {
        margin-left: 0;
    }
}
/deep/ .el-iconfont {
    padding-left: 0;
    .item {
        background: #1e292e;
    }
}

table.shenpanliucheng {
    border-collapse: collapse;
    border-spacing: 0;
    border-top: 1px solid #54575c;
    border-left: 1px solid #54575c;
}
.self_th_role {
    width: 180px;
    padding-left: 10px;
    position: static;
    border-bottom: 1px solid #54575c;
}
.self_th_name {
    width: 280px;
    padding-left: 10px;
    position: static;
    border-bottom: 1px solid #54575c;
}
.chaochang {
    width: 100% !important;
    /deep/ .el-form-item__content {
        display: flex;
        width: 100%;
    }
    .title {
        width: 840px;
    }
    span {
        display: inline-block;
        width: 4847px;
    }
}
/deep/ .el-form-item {
    width: 590px;
    display: inline-block;
    margin-bottom: 0;
}
/deep/ .el-form-item__content {
    width: 100%;
    line-height: 32px !important;
}
.throw {
    display: inline-block;
    .throwTitle {
        display: inline-block;
        width: 122px;
    }
    .throwContent {
        display: inline-block;
        vertical-align: top;
        width: 462px;
    }
    &.width {
        .throwTitle {
            display: inline-block;
            width: 177px;
        }
        .throwContent {
            display: inline-block;
            vertical-align: top;
            width: 397px;
        }
    }
}
.litigant {
    width: 1012px;
    /deep/ .el-form-item__content {
        width: 800px;
    }
}
</style>
