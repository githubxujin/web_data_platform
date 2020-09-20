<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>

        <!-- 工商变更 -->
        <el-table-expand title="工商变更" :titleDatas="updataHead" :contentDatas="updataContent" :getList="getIndustrial" :params="industrialParams" id="baseIcon" />
        <!-- 动产抵押 -->
        <div class="sub-title mb20 mt20" id="shareholder">动产抵押</div>
        <el-table :data="mortgageList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="债务人：">
                            <span>{{ props.row.obligor || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="债权数额：">
                            <span>{{ props.row.securedAmount || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="债权种类：">
                            <span>{{ props.row.claimsType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="履行期限：">
                            <span>{{ props.row.termPerformance || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="当事人：">
                            <el-table :data="props.row.partys" style="width: 100%" border>
                                <el-table-column prop="role" label="角色" width="180">
                                </el-table-column>
                                <el-table-column prop="name" label="姓名" width="180">
                                </el-table-column>
                            </el-table>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='checkInDate' label='登记日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='registrationNo' label='登记编号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='registrationType' label='登记种类' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='businessType' label='交易业务类型' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='mortgageParams.size' @size-change='getMortgage' :current-page.sync='mortgageParams.current' @current-change='getMortgage'
            layout='total, sizes, prev, pager, next, jumper' :total='mortgageTotal' v-if='mortgageTotal > 10'>
        </el-pagination>

        <!-- 动产抵押 -->
        <!-- 股权出质 -->
        <div class="sub-title mb20 mt20" id="investment">股权出质</div>
        <el-table :data="pledgeList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="注销日期: ">
                            <span>{{ props.row.logoutDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="注销原因: ">
                            <span>{{ props.row.logoutReason || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="登记日期: ">
                            <span>{{ props.row.checkInDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="登记种类: ">
                            <span>{{ props.row.registrationType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="登记编号: ">
                            <span>{{ props.row.registrationNo || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='releaseTime' label='发布时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='pledgor' label='出质人' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='qualityStandard' label='出质人标的' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='pledgorNo' label='出质人证照编号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='amountPledgedEquity' label='出质股权数额' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='pledgee' label='质权人' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='pledgeeNo' label='质权人证照编号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='state' label='状态' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='pledgeParams.size' @size-change='getPledge' :current-page.sync='pledgeParams.current' @current-change='getPledge'
            layout='total, sizes, prev, pager, next, jumper' :total='pledgeTotal' v-if='pledgeTotal > 10'>
        </el-pagination>
        <!-- 股权出质 -->
        <!-- 纳税信用等级 -->
        <div class="sub-title mb20 mt20" id="member">纳税信用等级</div>
        <el-table :data='creditList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='no' label='纳税人识别号' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='纳税人名称' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='year' label='评价年度' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='level' label='信用等级' show-overflow-tooltip></el-table-column>

        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='creditParams.size' @size-change='getCredit' :current-page.sync='creditParams.current' @current-change='getCredit'
            layout='total, sizes, prev, pager, next, jumper' :total='creditTotal' v-if='creditTotal > 10'>
        </el-pagination>
        <!-- 纳税信用等级 -->
        <!-- 行政处罚 -->
        <div class="sub-title mb20 mt20" id="organization">行政处罚</div>
        <el-table :data='punishmentList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' label='发布时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='decideDate' label='处罚决定日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='documentNumber' label='决定书文号' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='penaltyType' label='违法行为类型' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='decideOrgName' label='处罚决定机关' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='content' label='行政处罚内容' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='remark' label='备注' show-overflow-tooltip> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='punishmentParams.size' @size-change='getPunishment' :current-page.sync='punishmentParams.current' @current-change='getPunishment'
            layout='total, sizes, prev, pager, next, jumper' :total='punishmentTotal' v-if='punishmentTotal > 10'>
        </el-pagination>
        <!-- 行政处罚 -->
        <!-- 行政许可  -->
        <!-- <el-table-expand title="行政许可" :expand='true' :titleDatas="pledgeHead" :contentDatas="pledgeContent" :propsList="pledgeProps" :getList="getLicensing" :params="licensingParams" /> -->

        <div class="sub-title mb20 mt20" id="annals">行政许可</div>
        <el-table :data="licensingList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="审批类别：">
                            <span>{{ props.row.auditType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="所属区：">
                            <span>{{ props.row.area || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="所属区代码：">
                            <span>{{ props.row.areaCode || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="行政许可文号：">
                            <span>{{ props.row.docNumber || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="当事人：">
                            <span>{{ props.row.litigants || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='startDate' label='许可决定日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='endDate' label='许可截止日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='许可事项名称' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='content' label='许可内容' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='orgName' label='许可机关' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseNo' label='许可文件编号' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='licensingParams.size' @size-change='getLicensing' :current-page.sync='licensingParams.current' @current-change='getLicensing'
            layout='total, sizes, prev, pager, next, jumper' :total='licensingTotal' v-if='licensingTotal > 10'>
        </el-pagination>
        <!-- 行政许可 -->

        <!-- 重大税收违法 -->
        <div class="sub-title mb20 mt20" id="contactWay">重大税收违法 </div>
        <el-table :data='violationList' border>
            <el-table-column :formatter="formatLabel" prop='majorIllegalFacts' label='主要违法事实' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='eventTime' label='事件时间' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' label='发布时间' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseReportingPeriod' label='案件上报日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='caseNature' label='案件性质' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='punishmentCondition' width="210" label='相关法律及税务处理处罚情况' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='taxpayerName' label='纳税人名称' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='taxpayerCode' label='纳税识别码' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='litigants' label='组织机构代码' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='violationParams.size' @size-change='getViolation' :current-page.sync='violationParams.current' @current-change='getViolation'
            layout='total, sizes, prev, pager, next, jumper' :total='violationTotal' v-if='violationTotal > 10'>
        </el-pagination>
        <!-- 重大税收违法 -->

        <!-- 催缴/欠缴 -->
        <div class="sub-title mb20 mt20" id="practical">催缴/欠缴 </div>
        <el-table :data="arrearsList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="法定代表人姓名：">
                            <span>{{ props.row.faRen || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="经营地址：">
                            <span>{{ props.row.address || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="高级税务机关：">
                            <span>{{ props.row.advanceTaxOrgName || '-' }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueDate' label='发布时间' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='taxOrgName' label='税务机关' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='taxCategory' label='税种' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='amount' label='金额' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='名称' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='arrearsParams.size' @size-change='getArrears' :current-page.sync='arrearsParams.current' @current-change='getArrears'
            layout='total, sizes, prev, pager, next, jumper' :total='arrearsTotal' v-if='arrearsTotal > 10'>
        </el-pagination>
        <!-- 催缴/欠缴 -->

        <!-- 税务非正常户 -->
        <div class="sub-title mb20 mt20" id="taxabnormal">税务非正常户</div>
        <el-table :data="accountList" border>
            <el-table-column type="expand">
                <template>
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="工商登记证号：">
                            <span>-</span>
                        </el-form-item>
                        <el-form-item label="地区代码：">
                            <span>-</span>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <span>-</span>
                        </el-form-item>
                        <el-form-item label="审批类别：">
                            <span>-</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='companyName' label='企业名称' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='issueTerm' label='发布日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='faRen' label='法定代表人' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='taxOrgName' label='税务机关' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='address' label='经营地址' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='decideTime' label='认定时间' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='identifyNumber' label='识别号' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='accountParams.size' @size-change='getAccount' :current-page.sync='accountParams.current' @current-change='getAccount'
            layout='total, sizes, prev, pager, next, jumper' :total='accountTotal' v-if='accountTotal > 10'>
        </el-pagination>
        <!-- 税务非正常户 -->

        <!-- 经营异常 -->
        <div class="sub-title mb20 mt20" id="abnormal">经营异常</div>
        <el-table :data='abnormalList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='inDate' label='列入日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='decideOrgName' label='作出决定机关' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='outDate' label='移出日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='outReason' label='移出原因' show-overflow-tooltip> </el-table-column>
            <el-table-column :formatter="formatLabel" prop='outDecideOrgName' label='移除决定机关' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='abnormalParams.size' @size-change='getAbnormal' :current-page.sync='abnormalParams.current' @current-change='getAbnormal'
            layout='total, sizes, prev, pager, next, jumper' :total='abnormalTotal' v-if='abnormalTotal > 10'>
        </el-pagination>
        <!-- 经营异常 -->

        <!-- 担保 -->
        <div class="sub-title mb20 mt20" id="ensure">担保</div>
        <el-table :data="guaranteeList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="是否关联担保：">
                            <span>{{ props.row.relatedGuaranteeFlag || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="交易日期">
                            <span>{{ props.row.tranDate || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="担保类型：">
                            <span>{{ props.row.guaranteePattern || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="报告期：">
                            <span>{{ props.row.reportTerm || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="报告类型：">
                            <span>{{ props.row.reportType || '-' }}</span>
                        </el-form-item>
                        <el-form-item label="当事人：" label-width="500" class="dangshiren">
                            <!-- <span>{{ props.row.litigants.join() }}</span> -->
                            <table class="shenpanliucheng">
                                <tr>
                                    <th class="self_th_role">角色</th>
                                    <th class="self_th_name">名字</th>
                                </tr>
                                <tr>
                                    <td class="self_th_role">担保方</td>
                                    <td class="self_th_name">{{props.row.guaranteeParty.join() || '-'}}</td>
                                </tr>
                                <tr>
                                    <td class="self_th_role">被担保方</td>
                                    <td class="self_th_name">{{props.row.securedParty.join() || '-'}}</td>
                                </tr>
                                <tr>
                                    <td class="self_th_role">公告人</td>
                                    <td class="self_th_name">{{props.row.noticeParty || '-'}}</td>
                                </tr>
                            </table>

                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeDate' label='公告日期' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='guaranteeParty' label='担保方' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='securedParty' label='被担保方' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='guaranteeAmount' label='担保金额' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='guaranteeTerm' label='担保起止日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='finishFlag' label='是否履行完毕' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='noticeParty' label='公告人' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='guaranteeParams.size' @size-change='getGuarantee' :current-page.sync='guaranteeParams.current' @current-change='getGuarantee'
            layout='total, sizes, prev, pager, next, jumper' :total='guaranteeTotal' v-if='guaranteeTotal > 10'>
        </el-pagination>
        <!-- 担保 -->

        <!-- 清算 -->
        <div class="sub-title mb20 mt20" id="clearing">清算</div>
        <el-table :data='liquidationList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='leader' label='清算组负责人' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='member' label='清算组成员' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='liquidationParams.size' @size-change='getLiquidation' :current-page.sync='liquidationParams.current' @current-change='getLiquidation'
            layout='total, sizes, prev, pager, next, jumper' :total='liquidationTotal' v-if='liquidationTotal > 10'>
        </el-pagination>
        <!-- 清算 -->

        <!-- 抽查检查 -->
        <div class="sub-title mb20 mt20" id="spotcheck">抽查检查</div>
        <el-table :data='checkList' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='name' label='登记编号' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :formatter="formatLabel" prop='executiveOrg' label='检查实施机关' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='type' label='类型' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='date' label='日期' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='consequence' label='结果' show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop='remark' label='备注' show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='checkParams.size' @size-change='getCheck' :current-page.sync='checkParams.current' @current-change='getCheck'
            layout='total, sizes, prev, pager, next, jumper' :total='checkTotal' v-if='checkTotal > 10'>
        </el-pagination>
        <!-- 抽查检查 -->
    </div>
</template>

<script>
import elTableExpand from "@/components/Table/el-table-expand.vue";
export default {
    components: { elTableExpand },
    data () {
        return {
            industrialParams: {
                current: 1,
                size: 10,
                total: 0,
            },
            industrialTotal: 0,
            industrialList: [],
            mortgageParams: {
                current: 1,
                size: 10,
            },
            mortgageList: [],
            mortgageTotal: 0,
            pledgeParams: {
                current: 1,
                size: 10,
            },
            pledgeList: [],
            pledgeTotal: 0,
            creditParams: {
                current: 1,
                size: 10,
            },
            creditList: [],
            creditTotal: 0,
            licensingParams: {
                current: 1,
                size: 10,
            },
            licensingList: [],
            licensingTotal: 0,
            violationParams: {
                current: 1,
                size: 10,
            },
            violationList: [],
            violationTotal: 0,
            arrearsParams: {
                current: 1,
                size: 10,
            },
            arrearsList: [],
            arrearsTotal: 0,
            punishmentParams: {
                current: 1,
                size: 10,
            },
            punishmentList: [],
            punishmentTotal: 0,
            accountParams: {
                current: 1,
                size: 10,
            },
            accountList: [],
            accountTotal: 0,
            abnormalParams: {
                current: 1,
                size: 10,
            },
            abnormalList: [],
            abnormalTotal: 0,
            liquidationParams: {
                current: 1,
                size: 10,
            },
            guaranteeList: [],
            guaranteeTotal: 0,
            guaranteeParams: {
                current: 1,
                size: 10,
            },
            liquidationList: [],
            liquidationTotal: 0,
            checkParams: {
                current: 1,
                size: 10,
            },
            checkList: [],
            checkTotal: 0,
            // 工商变更
            updataHead: [
                {
                    title: "序号",
                    type: "index"
                },
                {
                    title: "变更日期",
                    name: "changeDate"
                },
                {
                    title: "变更事项",
                    name: "changeItem"
                },
                {
                    title: "变更事项详情",
                    name: "changeItemDetail"
                },
                {
                    title: "变更前",
                    name: "changeBefore"
                },
                {
                    title: "变更后",
                    name: "changeLater"
                }
            ],
            updataContent: [
                {
                    index: "1",
                    updataData: "2018-06-08",
                    updataItems: "-",
                    updataBefore: "-",
                    updataAfter: "-"
                }
            ],
            // 动产抵押
            pledgeHead: [
                {
                    title: "序号",
                    type: "index"
                },
                {
                    title: "发布时间",
                    name: "updataData"
                },
                {
                    title: "处罚决定日期",
                    name: "updataItems"
                },
                {
                    title: "决定书文号",
                    name: "updataBefore"
                },
                {
                    title: "违法行为类型",
                    name: "updataAfter"
                },
                {
                    title: "处罚决定机关",
                    name: "updataAfter"
                },
                {
                    title: "行政处罚内容",
                    name: "updataAfter"
                },
                {
                    title: "备注",
                    name: "updataAfter"
                },
            ],
            pledgeProps: [
                {
                    key: '审批类别',
                    value: 'auditType'
                },
                {
                    key: '所属区',
                    value: 'area'
                },
                {
                    key: '所属区代码',
                    value: 'areaCode'
                },
                {
                    key: '行政许可文书',
                    value: 'docNumber'
                },
                {
                    key: '当事人',
                    value: 'litigants'
                },
            ],
            pledgeContent: [
                {
                    index: "1",
                    updataData: "2018-06-08",
                    updataItems: "-",
                    updataBefore: "-",
                    updataAfter: "-",
                    number: "-",
                    code: "-",
                    annotation: "-",
                    type: "-",

                }
            ]
        };
    },
    created () {
        this.getIndustrial()
        this.getMortgage()
        this.getPledge()
        this.getCredit()
        this.getLicensing()
        this.getViolation()
        this.getArrears()
        this.getPunishment()
        this.getAccount()
        this.getAbnormal()
        this.getGuarantee()
        this.getLiquidation()
        this.getCheck()
    },
    methods: {
        routeDate () {
            return [
                {
                    id: "baseIcon",
                    name: "工商变更 " + (this.industrialParams.total ? `(${this.industrialParams.total})` : '')
                },
                {
                    id: "shareholder",
                    name: "动产抵押 " + (this.mortgageTotal ? `(${this.mortgageTotal})` : '')
                },
                {
                    id: "investment",
                    name: "股权出质 " + (this.pledgeTotal ? `(${this.pledgeTotal})` : '')
                },
                {
                    id: "member",
                    name: "纳税信用登记 " + (this.creditTotal ? `(${this.creditTotal})` : '')
                },
                {
                    id: "organization",
                    name: "行政处罚 " + (this.punishmentTotal ? `(${this.punishmentTotal})` : '')
                },
                {
                    id: "annals",
                    name: "行政许可 " + (this.licensingTotal ? `(${this.licensingTotal})` : '')
                },
                {
                    id: "contactWay",
                    name: "重大税收违法 " + (this.violationTotal ? `(${this.violationTotal})` : '')
                },
                {
                    id: "practical",
                    name: "催缴/欠税 " + (this.arrearsTotal ? `${this.arrearsTotal}` : '')
                },
                {
                    id: "taxabnormal",
                    name: "税务非正常户 " + (this.accountTotal ? `${this.accountTotal}` : '')
                },
                {
                    id: "abnormal",
                    name: "经营异常 " + (this.abnormalTotal ? `(${this.abnormalTotal})` : '')
                },
                {
                    id: "ensure",
                    name: "担保 " + (this.guaranteeTotal ? `(${this.guaranteeTotal})` : '')
                },
                {
                    id: "clearing",
                    name: "清算 " + (this.liquidationTotal ? `(${this.liquidationTotal})` : '')
                },
                {
                    id: "spotcheck",
                    name: "抽查检查 " + (this.checkTotal ? `(${this.checkTotal})` : '')
                },
            ]        },
        getIndustrial () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/ind/com/chang', { evaluateId, ...this.industrialParams })
                .then(res => {
                    this.updataContent = res.data.records;
                    this.industrialList = res.data.records;
                    this.industrialParams.total = res.data.total
                });
        },
        getMortgage () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/chattel/mortgage', { evaluateId, ...this.mortgageParams })
                .then(res => {
                    // this.updataContent = res.data.records;
                    this.mortgageList = res.data.records;
                    this.mortgageTotal = res.data.total;
                });
        },
        getPledge () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/pledge', { evaluateId, ...this.pledgeParams })
                .then(res => {
                    // this.updataContent = res.data.records;
                    this.pledgeList = res.data.records;
                    this.pledgeTotal = res.data.total;
                });
        },
        getCredit () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/company/tax/credit', { evaluateId, ...this.pledgeParams })
                .then(res => {
                    this.creditList = res.data.records;
                    this.creditTotal = res.data.total;
                });
        },
        getLicensing () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/administrative/licensing', { evaluateId, ...this.licensingParams })
                .then(res => {
                    this.licensingList = res.data.records;
                    this.pledgeContent = res.data.records;
                    this.licensingTotal = res.data.total;
                });
        },
        getViolation () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/major/tax/violations', { evaluateId, ...this.violationParams })
                .then(res => {
                    this.violationList = res.data.records;
                    this.violationTotal = res.data.total;
                });
        },
        getArrears () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/major/tax/violations', { evaluateId, ...this.arrearsParams })
                .then(res => {
                    this.arrearsList = res.data.records;
                    this.arrearsTotal = res.data.total;
                });
        },

        // 获取行政处罚
        getPunishment () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/administrative/punishment', { evaluateId, ...this.punishmentParams })
                .then(res => {
                    console.log('获取行政处罚', res)
                    this.punishmentList = res.data.records;
                    this.punishmentTotal = res.data.total;
                });
        },
        getAccount () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/abnormal/tax/account', { evaluateId, ...this.accountParams })
                .then(res => {
                    this.accountList = res.data.records;
                    this.accountTotal = res.data.total;
                });
        },
        getAbnormal () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/business/abnormal', { evaluateId, ...this.abnormalParams })
                .then(res => {
                    this.abnormalList = res.data.records;
                    this.abnormalTotal = res.data.total;
                });
        },
        getGuarantee () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/guarantee', { evaluateId, ...this.abnormalParams })
                .then(res => {
                    this.guaranteeList = res.data.records;
                    this.abnormalTotal = res.data.total;
                });
        },
        getLiquidation () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/liquidation', { evaluateId, ...this.liquidationParams })
                .then(res => {
                    this.liquidationList = res.data.records;
                    this.liquidationTotal = res.data.total;
                });
        },

        // 获取抽查检查
        getCheck () {
            let { evaluateId } = this.$route.query;
            this.ajax
                .json('/dcp/query/enterprise/management/spot/check', { evaluateId, ...this.checkParams })
                .then(res => {
                    console.log('抽查检查', res)
                    this.checkList = res.data.records;
                    this.checkTotal = res.data.total;
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
.dangshiren {
    display: flex !important;
    /deep/ .el-form-item__label {
        width: 75px;
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
    width: 550px;
    padding-left: 10px;
    position: static;
    border-bottom: 1px solid #54575c;
}
</style>
