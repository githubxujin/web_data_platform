<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">{{params.projectName}}</div>
            <table :class="{'table-public-detail': true, 'is-compile': isShow}">
                <tr>
                    <td>项目业主</td>
                    <td class="cospan">
                        <div v-if="isShow">
                            <el-input v-model="params.buildCompany" clearable></el-input>
                        </div>
                        <div v-else>{{params.buildCompany ? params.buildCompany : '-'}}</div>
                    </td>
                </tr>
                <tr>
                    <td>项目类型</td>
                    <td class="cospan">
                        <div v-if="isShow">
                            <el-input v-model="params.projectType" clearable></el-input>
                        </div>
                        <div v-else>{{params.projectType ? params.projectType : '-'}}</div>
                    </td>
                </tr>
                <tr>
                    <td>项目地址</td>
                    <td class="cospan">
                        <div v-if="isShow">
                            <el-input v-model="params.projectAddress" clearable></el-input>
                        </div>
                        <div v-else>{{params.projectAddress ? params.projectAddress : '-'}}</div>
                    </td>
                </tr>
            </table>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="mt10 tootip-table">
                <!-- 项目基本信息 -->
                <el-tab-pane label="项目基本信息" name="first">
                    <div class="tabs-title mb20 pt20">项目信息</div>
                    <table :class="{'table-three': true, 'is-compile': isShow}">
                        <tr>
                            <td>项目编号</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectNo" clearable></el-input>
                                </div>
                                <div v-else>
                                    <el-tooltip class="item" effect="dark" content="Top Center 提示文字" placement="top">
                                        <div>{{detailData.projectNo ? detailData.projectNo : '-'}}</div>
                                    </el-tooltip>
                                </div>
                            </td>
                            <td>省级项目编号</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectProvinceNo" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectProvinceNo ? detailData.projectProvinceNo : '-'}}</div>
                            </td>
                            <td>工程用途</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectPurpose" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectPurpose ? detailData.projectPurpose : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>项目推广名</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectPromotionName" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectPromotionName ? detailData.projectPromotionName : '-'}}</div>
                            </td>
                            <td>项目性质</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectProperty" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectProperty ? detailData.projectProperty : '-'}}</div>
                            </td>
                            <td>立项级别</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectLevel" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectLevel ? detailData.projectLevel : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>立项文号</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectDocNo" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectDocNo ? detailData.projectDocNo : '-'}}</div>
                            </td>
                            <td>项目定位</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectPosition" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectPosition ? detailData.projectPosition : '-'}}</div>
                            </td>
                            <td>省份</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectProvince" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectProvince ? detailData.projectProvince : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>城市</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectCity" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectCity ? detailData.projectCity : '-'}}</div>
                            </td>
                            <td>区</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectArea" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectArea ? detailData.projectArea : '-'}}</div>
                            </td>
                            <td>项目（计划）开工时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.projectStartDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.projectStartDate ? detailData.projectStartDate : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>项目（计划）竣工时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.projectEndDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.projectEndDate ? detailData.projectEndDate : '-'}}</div>
                            </td>
                            <td>立项批复时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.projectApprovalDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.projectApprovalDate ? detailData.projectApprovalDate : '-'}}</div>
                            </td>
                            <td>立项批复机关</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectApprovalAuthority" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectApprovalAuthority ? detailData.projectApprovalAuthority : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>建筑结构类型</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectStructureType" @change="changeType" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectStructureType ? detailData.projectStructureType : '-'}}</div>
                            </td>
                            <td>项目规模</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectScale" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectScale ? detailData.projectScale : '-'}}</div>
                            </td>
                            <td>项目建筑规模</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectBuildingScale" @change="changeType" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectBuildingScale ? detailData.projectBuildingScale : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>项目用地规模</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectLandScale" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectLandScale ? detailData.projectLandScale : '-'}}</div>
                            </td>
                            <td>项目阶段</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.projectProgress" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.projectProgress ? detailData.projectProgress : '-'}}</div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div v-if="isShow">
                        <div class="tabs-title mt20 mb20">
                            <span>合同备案信息</span>
                            <div>
                                <span class="el-icon-plus" @click="toAdd1(1)"></span>
                                <span class="el-icon-minus" @click="toDel1(1)"></span>
                            </div>
                        </div>
                        <el-table :data="detailData.projectContractRecordList" border>
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="category" label="合同类型" width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.category" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="amount" label="合同金额" width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.amount" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="signDate" label="签订日期" width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-date-picker v-model="item.row.signDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </template>
                            </el-table-column>
                            <el-table-column prop="recordNo" label="合同备案号" min-width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.recordNo" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prRecordNo" label="省级合同备案号" min-width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.prRecordNo" clearable></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="tabs-title mt20 mb20">
                            <span>施工图审查</span>
                            <div>
                                <span class="el-icon-plus" @click="toAdd1(2)"></span>
                                <span class="el-icon-minus" @click="toDel1(2)"></span>
                            </div>
                        </div>
                        <el-table :data="detailData.projectDrawingCheckList" border class="tab-info">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="docNo" label="施工图审查合格证书编号" width="240" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.docNo" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="prDocNo" label="省级施工图审核合格书编号" width="260" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.prDocNo" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditCoy" label="勘察单位信息" width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.auditCoy" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="designCoy" label="设计单位信息" width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.designCoy" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="investigateCoy" label="施工图审查机构" width="180" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.investigateCoy" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="finishDate" label="审查完成日期" min-width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-date-picker v-model="item.row.finishDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else>
                        <div class="tabs-title mt20 mb20">合同备案信息</div>
                        <el-table :data="detailData.projectContractRecordList" border class="tab-info">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="category" label="合同类型" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="amount" label="合同金额" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="signDate" label="签订日期" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="recordNo" label="合同备案号" min-width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="prRecordNo" label="省级合同备案号" min-width="200" show-overflow-tooltip></el-table-column>
                        </el-table>
                        <div class="tabs-title mt20 mb20">施工图审查</div>
                        <el-table :data="detailData.projectDrawingCheckList" border class="tab-info">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="docNo" label="施工图审查合格证书编号" width="240" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="prDocNo" label="省级施工图审核合格书编号" width="260" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="auditCoy" label="勘察单位信息" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="designCoy" label="设计单位信息" width="200" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="investigateCoy" label="施工图审查机构" width="180" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="finishDate" label="审查完成日期" min-width="150" show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                    <div class="tabs-title mt20 mb20">项目材料估算</div>
                    <table :class="{'el-table-list': true, 'is-compile': isShow}">
                        <tr>
                            <td></td>
                            <td>钢筋（公斤）</td>
                            <td>混凝土（方）</td>
                            <td>模板（平米）</td>
                            <td>木方（立方米）</td>
                        </tr>
                        <tr>
                            <td>项目整体</td>
                            <td>
                                {{projectMaterials.rebar}}
                            </td>
                            <td>
                                {{projectMaterials.concrete}}
                            </td>
                            <td>
                                {{projectMaterials.template}}
                            </td>
                            <td>
                                {{projectMaterials.batten}}
                            </td>
                        </tr>
                        <tr>
                            <td>地下室结构</td>
                            <td>
                                {{projectMaterials.rebar1}}
                            </td>
                            <td>
                                {{projectMaterials.concrete1}}
                            </td>
                            <td>
                                {{projectMaterials.template1}}
                            </td>
                            <td>
                                {{projectMaterials.batten1}}
                            </td>
                        </tr>
                    </table>
                    <div class="tabs-title mt20 mb20">项目进度</div>
                    <table :class="{'table-three': true, 'is-compile': isShow}">
                        <tr>
                            <td>实际开工日期</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.projectActualStartDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.projectActualStartDate ? detailData.projectActualStartDate : '-'}}</div>
                            </td>
                            <td>±0日期</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.fixDay" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.fixDay ? detailData.fixDay : '-'}}</div>
                            </td>
                            <td>封顶日期</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.cappedDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.cappedDate ? detailData.cappedDate : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>实际竣工日期</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="detailData.projectActualEndDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{detailData.projectActualEndDate ? detailData.projectActualEndDate : '-'}}</div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="tabs-title mt20 mb20">资金来源</div>
                    <table :class="{'table-three': true, 'is-compile': isShow}">
                        <tr>
                            <td>资金来源</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.sourceOfFund" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.sourceOfFund ? detailData.sourceOfFund : '-'}}</div>
                            </td>
                            <td>自筹</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.selfRaised" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.selfRaised ? detailData.selfRaised : '-'}}</div>
                            </td>
                            <td>县级财政</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.countyFinance" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.countyFinance ? detailData.countyFinance : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>市级财政</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.cityFinance" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.cityFinance ? detailData.cityFinance : '-'}}</div>
                            </td>
                            <td>省级财政</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.provinceFinance" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.provinceFinance ? detailData.provinceFinance : '-'}}</div>
                            </td>
                            <td>国家级财政</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="detailData.nationFinance" clearable></el-input>
                                </div>
                                <div v-else>{{detailData.nationFinance ? detailData.nationFinance : '-'}}</div>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>

                <!-- 项目关联方 -->
                <el-tab-pane label="项目关联方" name="second">
                    <div class="tabs-title mb20 pt20">建设单位信息</div>
                    <table :class="{'table-three': true, 'current-w': true, 'is-compile': isShow}">
                        <tr>
                            <td>建设单位名称</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.buildCompany" clearable></el-input>
                                </div>
                                <div v-else>{{related.buildCompany ? related.buildCompany : '-'}}</div>
                            </td>
                            <td>业主背景</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.businessBackground" clearable></el-input>
                                </div>
                                <div v-else>{{related.businessBackground ? related.businessBackground : '-'}}</div>
                            </td>
                            <td>白名单地产公司</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.whitelist" clearable></el-input>
                                </div>
                                <div v-else>
                                    <el-tooltip class="item" effect="dark" :content="related.whitelist" placement="top">
                                        <div>{{related.whitelist ? related.whitelist : '-'}}</div>
                                    </el-tooltip>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>股权结构</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.equity" clearable></el-input>
                                </div>
                                <div v-else>{{related.equity ? related.equity : '-'}}</div>
                            </td>
                            <td>业主招标形式</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.ownerTenderType" clearable></el-input>
                                </div>
                                <div v-else>{{related.ownerTenderType ? related.ownerTenderType : '-'}}</div>
                            </td>
                            <td>业主招标时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="related.ownerEnderDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{related.ownerEnderDate ? related.ownerEnderDate : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>总包中标时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="related.bidDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{related.bidDate ? related.bidDate : '-'}}</div>
                            </td>
                            <td>预付款比例</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.prepaymentRatio" clearable></el-input>
                                </div>
                                <div v-else>{{related.prepaymentRatio ? related.prepaymentRatio : '-'}}</div>
                            </td>
                            <td>付款节点</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.paymentNode" clearable></el-input>
                                </div>
                                <div v-else>{{related.paymentNode ? related.paymentNode : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>过程付款比例</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.processPaymentRatio" clearable></el-input>
                                </div>
                                <div v-else>{{related.processPaymentRatio ? related.processPaymentRatio : '-'}}</div>
                            </td>
                            <td>银行转账</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.bankTransfer" clearable></el-input>
                                </div>
                                <div v-else>{{related.bankTransfer ? related.bankTransfer : '-'}}</div>
                            </td>
                            <td>电子商业承兑汇票</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.businessAcceptanceBill" clearable></el-input>
                                </div>
                                <div v-else>{{related.businessAcceptanceBill ? related.businessAcceptanceBill : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>电子银行承兑汇票</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.bankAcceptanceBill" clearable></el-input>
                                </div>
                                <div v-else>{{related.bankAcceptanceBill ? related.bankAcceptanceBill : '-'}}</div>
                            </td>
                            <td>银行保理</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.bankFactoring" clearable></el-input>
                                </div>
                                <div v-else>{{related.bankFactoring ? related.bankFactoring : '-'}}</div>
                            </td>
                            <td>信用证</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.creditCertificate" clearable></el-input>
                                </div>
                                <div v-else>{{related.creditCertificate ? related.creditCertificate : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>供应链金融</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.financeChain" clearable></el-input>
                                </div>
                                <div v-else>{{related.financeChain ? related.financeChain : '-'}}</div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="tabs-title mt20 mb20">承建单位信息</div>
                    <table :class="{'table-three': true, 'current-w': true, 'is-compile': isShow}">
                        <tr>
                            <td>承建单位</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.contractor" clearable></el-input>
                                </div>
                                <div v-else>{{related.contractor ? related.contractor : '-'}}</div>
                            </td>
                            <td>承建单位统一社会信用代码</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.contractorCreditCode" clearable></el-input>
                                </div>
                                <div v-else>{{related.contractorCreditCode ? related.contractorCreditCode : '-'}}</div>
                            </td>
                            <td>实际施工方</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.actualConstruction" clearable></el-input>
                                </div>
                                <div v-else>{{related.actualConstruction ? related.actualConstruction : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>总包招标形式</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.epcTenderType" clearable></el-input>
                                </div>
                                <div v-else>{{related.epcTenderType ? related.epcTenderType : '-'}}</div>
                            </td>
                            <td>分供商中标类型</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.subSupplierBidType" clearable></el-input>
                                </div>
                                <div v-else>{{related.subSupplierBidType ? related.subSupplierBidType : '-'}}</div>
                            </td>
                            <td>分供商中标时间</td>
                            <td>
                                <div v-if="isShow">
                                    <el-date-picker v-model="related.subSupplierBidDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                                <div v-else>{{related.subSupplierBidDate ? related.subSupplierBidDate : '-'}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>合约形式</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.contractType" clearable></el-input>
                                </div>
                                <div v-else>{{related.contractType ? related.contractType : '-'}}</div>
                            </td>
                            <td>合同是否含禁转条款</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.contractEnableTransfer" clearable></el-input>
                                </div>
                                <div v-else>{{related.contractEnableTransfer ? related.contractEnableTransfer : '-'}}</div>
                            </td>
                            <td>总包与业主合作情况</td>
                            <td>
                                <div v-if="isShow">
                                    <el-input v-model="related.cooperation" clearable></el-input>
                                </div>
                                <div v-else>{{related.cooperation ? related.cooperation : '-'}}</div>
                            </td>
                        </tr>
                    </table>
                    <div v-if="isShow">
                        <div class="tabs-title mt20 mb20">
                            <span>项目人员信息</span>
                            <div>
                                <span class="el-icon-plus" @click="toAdd"></span>
                                <span class="el-icon-minus" @click="toDel"></span>
                            </div>
                        </div>
                        <el-table :data="related.projectStaffList" border class="tab-info">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="affiliation" label="所属单位" width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.affiliation" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="120" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.name" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="gender" label="性别" width="90" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.gender" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="mobilePhone" label="手机号" width="160" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.mobilePhone" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="department" label="所属部门" width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.department" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="position" label="职位" width="180" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.position" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="officePhone" label="办公电话" width="160" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.officePhone" clearable></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="拜访地址" show-overflow-tooltip>
                                <template slot-scope="item">
                                    <el-input v-model="item.row.address" clearable></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div v-else>
                        <div class="tabs-title mt20 mb20">项目人员信息</div>
                        <el-table :data="related.projectStaffList" border class="tab-info">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="affiliation" label="所属单位" width="120" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.affiliation ? item.row.affiliation : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="姓名" width="120" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.name ? item.row.name : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="gender" label="性别" width="70" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.gender ? item.row.gender : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="mobilePhone" label="手机号" width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.mobilePhone ? item.row.mobilePhone : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="department" label="所属部门" width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.department ? item.row.department : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="position" label="职位" width="180" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.position ? item.row.position : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="officePhone" label="办公电话" width="150" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.officePhone ? item.row.officePhone : '-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" label="拜访地址" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{item.row.address ? item.row.address : '-'}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>

                </el-tab-pane>

                <!-- 项目交易信息 -->
                <el-tab-pane label="项目交易信息" name="seven">
                    <transaction-message ref="transaction" :projectId="params.id"></transaction-message>
                </el-tab-pane>

                <!-- 项目证照信息 -->
                <el-tab-pane label="项目证照信息" name="thrid">
                    <span slot="label">
                        <el-dropdown :hide-on-click="false" size="medium" placement="bottom-start" @command="handleCommand" :class="[activeName==='thrid'? 'active': '']">
                            <span class="el-dropdown-link">
                                项目证照信息<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" placement="bottom">
                                <el-dropdown-item v-if="childActiveName === 'three'" command="three" :class="{'active':childActiveName==='three'}">施工许可证</el-dropdown-item>
                                <el-dropdown-item v-if="childActiveName === 'eight'" command="eight" :class="{'active':childActiveName==='eight'}">施工许可证</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <!-- 房建项目证照信息 -->
                    <div v-if="arr.length> 0">
                        <room-three ref="three" v-show="childActiveName === 'three'" :projectId="params.id"></room-three>
                        <!-- <room-four ref="four" v-show="childActiveName === 'four'" :projectId="params.id"></room-four> -->
                    </div>

                    <!-- 基建项目证照信息 -->
                    <div v-else>
                        <infrastr-four ref="eight" v-show="childActiveName === 'eight'" :projectId="params.id"></infrastr-four>
                    </div>
                    <div>
                        <not-found v-if="this.arr.length === 0 && this.arr1.length === 0 " />
                    </div>
                </el-tab-pane>

                <!-- 项目中标信息 -->
                <el-tab-pane name="four" label="项目招投标信息" v-if="!isShow">
                    <div class="pt20"></div>
                    <el-table :data="bidList" border>
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column prop="projectProvince" label="项目地-省" width="120" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.projectProvince ? item.row.projectProvince : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="projectCity" label="项目地-市" width="120" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.projectCity ? item.row.projectCity : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="tenderMaterial" label="招标材料" width="140" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.tenderMaterial ? item.row.tenderMaterial : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="tenderUnit" label="招标单位" width="230" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.tenderUnit ? item.row.tenderUnit : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="tenderUnitFormat" label="招标单位-规范" width="230" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.tenderUnitFormat ? item.row.tenderUnitFormat : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="bidder" label="中标单位" width="230" show-overflow-tooltip>
                            <template slot-scope="item">
                                {{item.row.bidder ? item.row.bidder : '-'}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="操作" width="120" fixed="right">
                            <template slot-scope="item">
                                <el-button @click="toDetail(item.row.bidId)" type="primary" plain>招标详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="bidData.current" :page-sizes="[10, 20, 30, 40]" :page-size="bidData.size"
                        layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                </el-tab-pane>

                <!-- 与我司业务记录 -->
                <el-tab-pane label="与我司业务记录" name="five">
                    <business-record ref="business" :projectId="params.id"></business-record>
                </el-tab-pane>

                <!-- 项目相关重大事件或舆情 -->
                <el-tab-pane label="项目相关重大事件或舆情" name="six" v-if="!isShow">
                    <important-event class="pt20"></important-event>
                </el-tab-pane>
            </el-tabs>
            <div class="to-submit mt20" v-if="isShow">
                <el-button type="primary" size="medium" @click="$router.back()">取消</el-button>
                <el-button type="primary" size="medium" style="margin-left:40px;" @click="toSubmit()">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
    data () {
        return {
            arr: [],
            arr1: [],
            isShow: false,
            total: 0,
            activeName: 'first',
            childActiveName: 'three',
            id: '',
            params: {
                projectName: '',
                buildCompany: '',
                projectType: '',
                projectAddress: ''
            },
            detailData: {
                cappedDate: "",
                cityFinance: "",
                countyFinance: "",
                fixDay: "",
                nationFinance: "",
                projectBuildingScale: '',
                projectActualEndDate: "",
                projectActualStartDate: "",
                projectAddress: "",
                projectApprovalAuthority: "",
                projectApprovalDate: "",
                projectArea: "",
                projectCity: "",
                projectEndDate: "",
                projectLandScale: "",
                projectPosition: "",
                projectProgress: "",
                projectPromotionName: "",
                projectProperty: "",
                projectProvince: "",
                projectScale: "",
                projectStartDate: "",
                projectStructureType: "",
                projectType: "",
                provinceFinance: ""
            },
            related: {
                actualConstruction: "",
                bankAcceptanceBill: "",
                bankFactoring: "",
                bankTransfer: "",
                bidDate: "",
                buildCompany: "",
                businessAcceptanceBill: "",
                businessBackground: "",
                contractEnableTransfer: "",
                contractType: "",
                contractor: "",
                contractorCreditCode: "",
                cooperation: "",
                creditCertificate: "",
                epcTenderType: "",
                equity: "",
                financeChain: "",
                ownerEnderDate: "",
                ownerTenderType: "",
                paymentNode: "",
                prepaymentRatio: "",
                processPaymentRatio: "",
                projectStaffList: [
                    {
                        address: "",
                        affiliation: "",
                        department: "",
                        gender: "",
                        mobilePhone: "",
                        name: "",
                        officePhone: "",
                        position: ""
                    }
                ],
                projectDrawingCheckList: [
                    {
                        auditCoy: '',
                        designCoy: '',
                        docNo: '',
                        finishDate: '',
                        investigateCoy: '',
                        prDocNo: '',
                        projectId: '',
                    }
                ],
                projectContractRecordList: [
                    {
                        amount: '',
                        category: '',
                        prRecordNo: '',
                        projectId: '',
                        recordNo: '',
                        signDate: '',
                    }
                ],
                subSupplierBidDate: "",
                subSupplierBidType: "",
                whitelist: ""
            },
            bidData: {
                projectName: '',
                current: 1,
                size: 10
            },
            projectMaterials: {
                rebar: '',
                concrete: '',
                template: '',
                batten: '',
                rebar1: '',
                concrete1: '',
                template1: '',
                batten1: '',
            },
            list: [],
            bidList: []
        }
    },
    created () {
        // console.log('1111',this.$route.name);
        if (this.$route.name === 'projectCompile') this.isShow = true
        this.params = JSON.parse(this.$route.query.item)
        // if (this.params.projectType === '房屋建筑工程' || this.params.projectType === '其他'){
        //     this.childActiveName = 'three'
        // } else {
        //     this.childActiveName = 'eight'
        // }
        // console.log('this.params',this.params);
        this.getRelated(this.params.id)
        this.getBasicInfo(this.params.id)
        this.getMessage(this.params.id)
        this.getBidList()
    },
    methods: {
        // 获取证照信息
        getMessage (id) {
            //  房建信息
            this.$http('/dcp/select/project/houses/license', { id }, { type: 'get' }).then(res => {
                if (res.data.projectHousesConstructLicenseList && res.data.projectHousesConstructLicenseList.length > 0) {
                    this.childActiveName = 'three'
                    this.arr = res.data.projectHousesConstructLicenseList
                }
            })
            //  基建信息
            this.$http('/dcp/select/project/construction/license', { id }, { type: 'get' }).then(res => {
                if (res.data.projectConstructionConstructLicenseList && res.data.projectConstructionConstructLicenseList.length > 0) {
                    this.childActiveName = 'eight'
                    this.arr1 = res.data.projectConstructionConstructLicenseList
                }
            })
        },
        // 获取基本信息
        getBasicInfo (id) {
            this.$http('/dcp/select/project/base/info', { id }, { type: 'get' }).then(res => {
                this.detailData = res.data
                this.changeType()
            })
        },
        changeType () {
            if (this.detailData.projectStructureType && this.detailData.projectBuildingScale) {
                if (this.detailData.projectStructureType === '多层框剪结构工程') {
                    this.projectMaterials = {
                        rebar: (Number(this.detailData.projectBuildingScale) * 50).toFixed(2) + '-' + (Number(this.detailData.projectBuildingScale) * 55).toFixed(2),
                        concrete: ((Number(this.detailData.projectBuildingScale) * 40) / 100).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 45) / 100).toFixed(2),
                        template: (Number(this.detailData.projectBuildingScale) * 3).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 320) / 100).toFixed(2),
                        batten: ((Number(this.detailData.projectBuildingScale) * 6) / 100).toFixed(2),
                        rebar1: (Number(this.detailData.projectBuildingScale) * 100).toFixed(2) + '-' + (Number(this.detailData.projectBuildingScale) * 120).toFixed(2),
                        concrete1: ((Number(this.detailData.projectBuildingScale) * 80) / 100).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 120) / 100).toFixed(2),
                        template1: '',
                        batten1: ''
                    }
                }
                if (this.detailData.projectStructureType === '高层框剪结构工程') {
                    this.projectMaterials = {
                        rebar: (Number(this.detailData.projectBuildingScale) * 65).toFixed(2) + '-' + (Number(this.detailData.projectBuildingScale) * 70).toFixed(2),
                        concrete: ((Number(this.detailData.projectBuildingScale) * 45) / 100).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 50) / 100).toFixed(2),
                        template: (Number(this.detailData.projectBuildingScale) * 3).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 320) / 100).toFixed(2),
                        batten: ((Number(this.detailData.projectBuildingScale) * 6) / 100).toFixed(2),
                        rebar1: (Number(this.detailData.projectBuildingScale) * 110).toFixed(2) + '-' + (Number(this.detailData.projectBuildingScale) * 130).toFixed(2),
                        concrete1: ((Number(this.detailData.projectBuildingScale) * 80) / 100).toFixed(2) + '-' + ((Number(this.detailData.projectBuildingScale) * 120) / 100).toFixed(2),
                        template1: '',
                        batten1: ''
                    }
                }
            }
        },
        // 获取项目关联方
        getRelated (id) {
            this.$http('/dcp/select/project/relation', { id }, { type: 'get' }).then(res => {
                this.related = res.data
                if (!this.related.projectStaffList) {
                    this.related.projectStaffList = []
                }
            })
        },
        // 获取中标信息列表
        getBidList () {
            this.bidData.projectName = this.params.projectName
            this.$http("/dcp/select/project/bid/detail/page/list", this.bidData).then(res => {
                this.bidList = res.data.records;
                this.total = res.data.total;
            });
        },
        // 跳转至云筑网
        toDetail (id) {
            window.open(
                "https://jc.yzw.cn/SL/Index?tenderSysno=" + id + "&target=td"
            );
        },
        toAdd () {
            this.related.projectStaffList.push(
                {
                    address: "",
                    affiliation: "",
                    department: "",
                    gender: "",
                    mobilePhone: "",
                    name: "",
                    officePhone: "",
                    position: ""
                }
            )
        },
        toAdd1 (n) {
            if (n === 1) {
                this.detailData.projectContractRecordList.push({
                    amount: '',
                    category: '',
                    prRecordNo: '',
                    projectId: '',
                    recordNo: '',
                    signDate: '',
                })
            } else {
                this.detailData.projectDrawingCheckList.push({
                    auditCoy: '',
                    designCoy: '',
                    docNo: '',
                    finishDate: '',
                    investigateCoy: '',
                    prDocNo: '',
                    projectId: '',
                })
            }
        },
        toDel1 (n) {
            if (n === 1) {
                this.detailData.projectContractRecordList.splice(this.detailData.projectContractRecordList.length - 1, 1)
            } else {
                this.detailData.projectDrawingCheckList.splice(this.detailData.projectDrawingCheckList.length - 1, 1)
            }
        },
        // 提交
        toSubmit () {
            // console.log('1',this.$refs.one.params);
            // console.log('2',this.$refs.two.params);
            // console.log('3',this.$refs.three.params);
            // console.log('4',this.$refs.four.params);
            let roomData = {}
            let infrastrData = {}
            if (this.arr && this.arr.length > 0) {
                // roomData = Object.assign({},this.$refs.one.params,this.$refs.two.params,this.$refs.three.params,this.$refs.four.params)
                roomData = {
                    // projectHousesLandLicenseList: this.$refs.one.projectHousesLandLicenseList,
                    // projectHousesEngineerLicenseList: this.$refs.two.projectHousesEngineerLicenseList,
                    projectHousesConstructLicenseList: this.$refs.three.projectHousesConstructLicenseList,
                    // projectHousesPresaleLicenseList: this.$refs.four.projectHousesPresaleLicenseList
                }
                infrastrData = {
                    // projectConstructionReplyLicenseList: [],
                    // projectConstructionPublicLicenseList: [],
                    // projectConstructionLandLicenseList: [],
                    projectConstructionConstructLicenseList: [],
                }
            } else {
                // infrastrData = Object.assign({},this.$refs.five.params,this.$refs.six.params,this.$refs.seven.params,this.$refs.eight.params)
                infrastrData = {
                    // projectConstructionReplyLicenseList: this.$refs.five.projectConstructionReplyLicenseList,
                    // projectConstructionPublicLicenseList: this.$refs.six.projectConstructionPublicLicenseList,
                    // projectConstructionLandLicenseList: this.$refs.seven.projectConstructionLandLicenseList,
                    projectConstructionConstructLicenseList: this.$refs.eight.projectConstructionConstructLicenseList,
                }
                roomData = {
                    // projectHousesLandLicenseList: [],
                    // projectHousesEngineerLicenseList: [],
                    projectHousesConstructLicenseList: [],
                    // projectHousesPresaleLicenseList: []
                }
            }
            let params = {
                id: this.params.id,
                projectBaseInfo: this.detailData,  // 项目库详情-基本信息
                projectTransaction: this.$refs.transaction.params, // 项目库详情-项目交易信息
                projectConstructionLicense: infrastrData,  // 项目库详情-基建项目证照信息
                projectHousesLicense: roomData,  //  项目库详情-房建项目证照信息
                projectRelation: this.related,  //  项目库详情-项目关联方
                projectBusinessList: this.$refs.business.list,  //  项目库详情-与我司合作记录
            }
            params.projectRelation.buildCompany = this.params.buildCompany
            params.projectBaseInfo.projectType = this.params.projectType
            params.projectBaseInfo.projectAddress = this.params.projectAddress
            // console.log('params',params);
            this.$http("/dcp/update/project", params).then(res => {
                if (res.code === '200') {
                    this.$message.success('编辑成功')
                    this.$router.back()
                }
            });
        },
        toDel () {
            this.related.projectStaffList.splice(this.related.projectStaffList.length - 1, 1)
        },
        handleSizeChange (v) {
            this.bidData.size = v;
            this.getBidList();
        },
        handleCurrentChange (val) {
            this.bidData.current = val;
            this.getBidList();
        },
        handleClick (v) {
            // console.log('v',v);
            // if (this.activeName === 'second') this.getRelated(this.params.id)
        },
        handleCommand (v) {
            this.childActiveName = v
        }
    },
    components: {
        'not-found': () => import("@/components/Charts/not-fount"),
        'transaction-message': () => import('./components/transactionMessage'),
        'room-three': () => import('./components/roomThree'),
        'infrastr-four': () => import('./components/infrastrFour'),
        'business-record': () => import('./components/businessRecord'),
        'important-event': () => import('./components/importantEvent'),
    }
}
</script>
<style lang="scss" scoped>
.dark {
    .active {
        color: #43a1ac;
    }
}
.light {
    .active {
        color: #4064d4;
    }
}
.stat {
    width: 1360px;
    margin: 0 auto;
}

.btn-add-del {
    padding-right: 20px;
    span {
        display: inline-block;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 14px;
        cursor: pointer;
        &:last-child {
            margin-left: 10px;
        }
    }
}
.current-w {
    td {
        width: calc(33.33% - 215px);
        &:nth-child(odd) {
            width: 215px;
        }
    }
}

/deep/ .el-tabs__header {
    margin-top: 30px;
}

.to-submit {
    text-align: center;
}
/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
