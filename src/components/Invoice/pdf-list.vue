<template>
    <div class="pt20">
        <el-form :inline="true" ref="form">
            <el-form-item>
                <el-input v-model="params.customerName" clearable placeholder="客户名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.batchNum" clearable placeholder="业务编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.result" clearable placeholder="查验结果">
                    <el-option label="全部通过" value="1"></el-option>
                    <el-option label="非全部通过" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.invoiceStatus" clearable placeholder="验真结果">
                    <el-option v-for="(v,k) in invoiceStatus" :key="k" :label="v" :value="k"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.riskStatus" clearable placeholder="内容匹配">
                    <el-option label="待定" value="0"></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="异常" value="2"></el-option>
                    <el-option label="失败" value="3"></el-option>
                    <el-option label="未知" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.buyerName" clearable placeholder="发票购买方"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.salerName" clearable placeholder="发票销售方"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.isRed" clearable placeholder="是否冲红">
                    <el-option label="否" value="0"></el-option>
                    <el-option label="是" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span="16">
                        <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='创建开始日期' end-placeholder='创建结束日期'>
                        </el-date-picker>
                    </el-col>
                    <el-col :span="7">
                        <el-select class="ml10" v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange">
                            <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-row>
                    <el-col :span="16">
                        <el-date-picker v-model='dateArr2' type='daterange' unlink-panels @change='changeDate2' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='上次验真开始日期' end-placeholder='上次验真结束日期'>
                        </el-date-picker>
                    </el-col>
                    <el-col :span="7" style="margin-left: -10px;">
                        <el-select v-model="fastData2" filterable placeholder="快速选择" clearable @change="fastChange2" class="ml10">
                            <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.pageNum = 1,initData('showFirst')">查询</el-button>
                <el-button type="info" @click="restForm">重置</el-button>
            </el-form-item>
            <el-row class='el-iconfont'>
                <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                    <i class='iconfont icon-shujuzhongxin-daochu' @click="exportData"></i>
                </el-tooltip>
                <el-tooltip class='item' effect='dark' content='导入' placement='top'>
                    <i class='iconfont icon-shujuzhongxin-daoru' @click="isDialog1=true"></i>
                </el-tooltip>
            </el-row>
        </el-form>
        <div class="mod">
            <el-table :data="form.data" @expand-change="expandRows" @row-click="rowClick" :row-key="getRowKeys" ref="expTable">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-table v-if="scope.row.expData" :data="scope.row.expData.data">
                            <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>
                            <el-table-column prop="pageNum" label="对应页码" width="80"></el-table-column>
                            <el-table-column prop="invoiceCode" label="发票代码" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{scope.row.invoiceCode?scope.row.invoiceCode:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceNo" label="发票号码" width="120" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    {{scope.row.invoiceNo?scope.row.invoiceNo:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceAmount" label="不含税金额" width="120"></el-table-column>
                            <el-table-column prop="totalAmount" label="总金额" width="120">
                                <template slot-scope="item">
                                    {{ item.row.totalAmount | numFormat }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="effectiveAmount" label="有效金额" width="120"></el-table-column>
                            <el-table-column prop="invoiceDate" label="开票日期" width="100">
                                <template slot-scope="scope">
                                    {{scope.row.invoiceDate?scope.row.invoiceDate:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" label="发票备注" show-overflow-tooltip width="100">
                                <template slot-scope="scope">
                                    {{scope.row.remark?scope.row.remark:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceStatus" label="验真结果" width="80">
                                <template slot-scope="scope">
                                    <span v-if="invoiceRes[scope.row.invoiceStatus]==='已通过'" class="dc-success">{{invoiceRes[scope.row.invoiceStatus]}}</span>
                                    <span v-else-if="invoiceRes[scope.row.invoiceStatus]==='待检查'" class="dc-primary">{{invoiceRes[scope.row.invoiceStatus]}}</span>
                                    <span v-else-if="invoiceRes[scope.row.invoiceStatus]==='不一致'" class="dc-danger">{{invoiceRes[scope.row.invoiceStatus]}}</span>
                                    <span v-else-if="invoiceRes[scope.row.invoiceStatus]==='已过期'" class="dc-danger">{{invoiceRes[scope.row.invoiceStatus]}}</span>
                                    <span v-else></span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceStatus" label="是否冲红" width="80">
                                <template slot-scope="item">
                                    <el-popover v-if="item.row.isRed === '1'" placement="bottom" width="400" trigger="hover" @show="getRushList(item.row.invoiceCheckInfoId)">
                                        <el-table :data="rushInfoList">
                                            <el-table-column property="invoiceCode" label="发票代码"></el-table-column>
                                            <el-table-column property="invoiceNo" label="发票号码"></el-table-column>
                                            <el-table-column property="totalAmount" label="价税合计" align="right">
                                                <template slot-scope="item">
                                                    {{ item.row.totalAmount | numFormat }}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <el-button type="text" slot="reference" style="padding: 0;">是</el-button>
                                    </el-popover>
                                    <div v-else>否</div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="repeatStatus" label="重复发票">
                                <template slot-scope='scope'>
                                    {{scope.row.repeatStatus==="0" ? "否" : '是' }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="serviceContent" label="服务内容" width="120">
                                <template slot-scope="scope">
                                    <el-popover v-if="scope.row.serviceContent && scope.row.riskStatus !=='0'" placement="bottom" trigger="hover">
                                        <div v-if="scope.row.serviceContent.indexOf('/')>-1">
                                            <span v-for="(v,k) in scope.row.serviceContent.split('/')" :key="k" :class="{'service-inner':true,'unusual':scope.row.riskStatus ==='2'}">
                                                {{`&nbsp;&nbsp;  ${v}`}}
                                            </span>
                                        </div>
                                        <div v-else :class="{'unusual':scope.row.riskStatus ==='2'}">
                                            {{`${scope.row.serviceContent}`}}
                                        </div>
                                        <div v-if="scope.row.serviceContent.indexOf('/')>-1" slot="reference" :class="{'service-content':true,'unusual':scope.row.riskStatus ==='2'}">
                                            {{scope.row.serviceContent.split('/')[0]+'...'}}</div>
                                        <div v-else slot="reference" :class="{'service-content':true,'unusual':scope.row.riskStatus ==='2'}">
                                            {{scope.row.serviceContent}}</div>
                                    </el-popover>
                                    <div v-else>
                                        -
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="riskStatus" label="内容匹配" width="80">
                                <template slot-scope="scope">
                                    {{scope.row.riskStatus?riskRes[scope.row.riskStatus]:''}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="" label="内容详情" width="100">
                                <template slot-scope="item">
                                    <el-button type="text" class="c_B" size="mini" @click="isDetail=true,pdfInfo(item.row.invoiceCheckInfoId)">详情</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="buyerName" label="发票购买方" show-overflow-tooltip width="130">
                                <template slot-scope="scope">
                                    {{scope.row.buyerName?scope.row.buyerName:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="salerName" label="发票销售方" show-overflow-tooltip width="130">
                                <template slot-scope="scope">
                                    {{scope.row.salerName?scope.row.salerName:'-'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="address" align="center" label="操作" fixed="right" width="80">
                                <template slot-scope="items">
                                    <el-button type="blue" size="mini" @click="gotoValidExp(items.row.pageNum,scope.row.id)" plain>验真</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="page-nav" style="text-align:center" v-if="scope.row.hasOwnProperty('expData')&&scope.row.expData.data.length>0">
                            <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params2.pageSize' @size-change='initExtend(scope.row)' :current-page.sync='params.pageNum' @current-change='initExtend'
                                layout='total, sizes, prev, pager, next, jumper' :total.sync='scope.row.expData.meta.totalSize'>
                            </el-pagination>
                            <!-- <el-pagination :page-sizes='[10,20, 50, 100]' layout="total, sizes, prev, pager, next, jumper" :current-page.sync="scope.row.expData.data[0].pageNum"
                                :page-size.sync='scope.row.expData.data[0].pageSize' @current-change="initExtend(scope.row)" @size-change="initExtend(scope.row)">
                            </el-pagination> -->
                        </div>

                    </template>
                </el-table-column>
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column label="验真进度" width="160" align="left">
                    <template slot-scope="scope">
                        <span :class="{'not_dot':scope.row.finish ===1,'has_dot':scope.row.finish===0,'failed':scope.row.finish===2}" @click="invocing(scope.row.id)">
                            <span>{{scope.row.finish===0?'验真中':scope.row.finish===1?'验真已完成':'转换图片失败'}}</span>
                            <span v-if="scope.row.finish===0" class="ani_dot">{{'...'}}</span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="batchNum" label="业务编号" width="160" show-overflow-tooltip align="left"></el-table-column>
                <el-table-column prop="customerName" label="客户名称" width="200" show-overflow-tooltip align="left"></el-table-column>
                <el-table-column prop="totalAmount" label="总金额" show-overflow-tooltip width="100" align="left">
                    <template slot-scope="scope">
                        {{ scope.row.totalAmount | numFormat}}
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createBy" label="创建人" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="checkTime" label="上次验真日期" show-overflow-tooltip width="200"></el-table-column>
                <el-table-column prop="result" label="查验结果" width="150">
                    <template slot-scope="scope">
                        {{scope.row.verifyResult}}
                    </template>
                </el-table-column>
                <el-table-column prop="checkTime" label="内容标识" width="100">
                    <template slot-scope="scope">
                        <span class="remark-box">
                            <span v-if="scope.row.remark.wrong.count"><a class="cur" @click="gotoValid(scope.row.id,2)">异常 {{scope.row.remark.wrong.count}}</a> </span>
                            <span v-if="scope.row.remark.error.count"><a class="cur" @click="gotoValid(scope.row.id,3)">失败 {{scope.row.remark.error.count}}</a> </span>
                            <span v-if="scope.row.remark.preDeal.count"><a class="cur" @click="gotoValid(scope.row.id,0)">待定 {{scope.row.remark.preDeal.count}}</a> </span>
                            <span v-if="scope.row.remark.unknown.count"><a class="cur" @click="gotoValid(scope.row.id,4)">未知 {{scope.row.remark.unknown.count}}</a> </span>
                            <span v-if="scope.row.remark.ok.count"><a class="cur" @click="gotoValid(scope.row.id,1)">正常
                                    {{scope.row.remark.ok.count}}</a></span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="repeatResult" label="重复发票"></el-table-column>
                <el-table-column prop="address" align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-dropdown @command="handleCommand">
                            <el-button type="blue" size="mini" plain>
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{type:'invoice',row:scope.row}" v-if="scope.row.transactionStatus == 2">验真</el-dropdown-item>
                                <el-dropdown-item :command="{type:'del',row:scope.row}">删除</el-dropdown-item>
                                <el-dropdown-item :command="{type:'detail',row:scope.row}">检查详情</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>

            <div class="page-nav" v-if="isData">
                <el-pagination :page-sizes="[10,20, 50, 100]" :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="initData()" layout="total, sizes, prev, pager, next, jumper"
                    :total.sync='form.meta.totalSize' v-if="form.meta.totalSize > 0">
                </el-pagination>
            </div>
        </div>
        <el-dialog :visible.sync="isTbDialog" width="45%" title="检查详情">
            <el-table :data="historyList" border max-height="200">
                <el-table-column width="150" property="checkTime" label="查验日期"></el-table-column>
                <el-table-column property="resultDesc" label="查验结果"></el-table-column>
                <el-table-column width="150" property="result" label="结果详情"></el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog class="importInfo" title="发票信息" :center="true" v-if="isDialog1" :visible.sync="isDialog1" :close-on-click-modal="false" width="500px">
            <importbox-form ref="importForm" @success="isDialog1 = false, restForm(),initData('showFirst'),importTips()"></importbox-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDialog1 = false" size="small">取 消</el-button>
                <el-button type="primary" @click="onSubmit" size="small">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="isDialog2" title="PDF扫描发票验真" width="800px" @close="closeDialog">
            <div class="identify-process">
                <img src="@/assets/images/pdf.png" alt="" v-if="theme==='dark'">
                <img src="@/assets/images/light/jiaozhenzhong.png" alt="" v-else>
            </div>
            <div class="compony-info" style="margin-top:20px;">
                <div class="compony-content">
                    <span>公司名称: </span><span style="margin-left: 6px;">{{invoiceDetailData.companyName?invoiceDetailData.companyName:'无'}}</span>
                    <span style="margin-left: 85px">业务编号：</span><span style="margin-left: 6px;">{{invoiceDetailData.batchNum?invoiceDetailData.batchNum:'无'}}</span>
                </div>
            </div>
            <div class="identify-content">
                <div class="content-bottom">
                    <div class="left">
                        <div class="left-content">
                            <div class="left-num" style="color:#358E62">
                                {{invoiceDetailData.pass?invoiceDetailData.pass:'0'}}</div>
                            <div class="left-title">验真通过 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num">{{invoiceDetailData.notPass?invoiceDetailData.notPass:'0'}}</div>
                            <div class="left-title">未通过 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num">{{invoiceDetailData.expired?invoiceDetailData.expired:'0'}}</div>
                            <div class="left-title">已过期 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num">{{invoiceDetailData.invalid?invoiceDetailData.invalid:'0'}}</div>
                            <div class="left-title">已作废 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num" style="color: #96432E;">
                                {{invoiceDetailData.noTicket?invoiceDetailData.noTicket:'0'}}</div>
                            <div class="left-title">无此票 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num">{{invoiceDetailData.inconsistent?invoiceDetailData.inconsistent:'0'}}
                            </div>
                            <div class="left-title">不一致 (页)</div>
                        </div>
                        <div class="left-content">
                            <div class="left-num" style="color: #96432E;">
                                {{invoiceDetailData.error?invoiceDetailData.error:'0'}}</div>
                            <div class="left-title">内容异常 (页)</div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="right-wrap">
                            <chart width="120px" height="120px" id="complete-pipe" :dispatchAction="dispatchAction" :option="pipeOption" style="margin-left: 74px;padding-top: 10px;" />
                            <div class="log">
                                <p v-for="(v,k) in logList" :key="k">{{v.processDesc}}. . .</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </el-dialog>
        <!-- 内容详情 -->
        <el-dialog :visible.sync="isDetail" title="内容详情" width="1280px">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="goodsName" label="商品名称" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="specificationModel" label="规格型号" show-overflow-tooltip> </el-table-column>
                <el-table-column prop="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column prop="detailNumber" label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unitPrice" label="不含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.unitPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="detailAmount" label="金额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.detailAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taxPrice" label="含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxAmount" label="税额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount === '***' ? item.row.taxAmount : item.row.taxAmount }}
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="价税合计" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDetail = false" size="small">取 消</el-button>
                <el-button type="primary" @click="isDetail = false" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import importboxForm from "./import.vue";
import { mapState } from "vuex";
import { deepClone } from "@/utils/common"
import Chart from "@/components/Charts/invoiceInvalid.vue";
import pipe from "@/utils/pdfList/pipe";
export default {
    components: {
        importboxForm,
        Chart
    },
    data () {
        return {
            totalSize: "",
            pipeOption: {},
            // pipe,
            dispatchAction: true,
            dateArr: [],
            dateArr2: [],
            invoiceRes: [
                "待查验",
                "已通过",
                "未通过",
                "已作废",
                "已过期",
                "不一致",
                "无此票"
            ],
            rushInfoList: [],
            riskRes: ["待定", "正常", "异常", "-", "未知"],
            testList: {
                expList: [
                    { id: "1", name: "xiu" },
                    { id: "2", name: "ke" },
                    { id: "3", name: "wei" },
                    { id: "4", name: "qi" },
                    { id: "5", name: "su" },
                    { id: "6", name: "lei" }
                ],
                totalSize: 20,
                pageSize: 10,
                pageNum: 1
            },
            logFlag: "",
            renderFlag: false,
            again: "",
            swiper: null,
            swiperOption: {
                slidesPerView: 12,
                spaceBetween: 0,
                // mousewheel: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                on: {
                    slideChange: function () {
                        if (this.isEnd) {
                            this.navigation.$nextEl.css("display", "none");
                        } else {
                            this.navigation.$nextEl.css("display", "block");
                        }
                    }
                }
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true
                // }
            },
            baseURL: process.env.VUE_APP_INVOCE_URL,
            // getStore,
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            isData: false,
            isExport: false,
            isDetail: false,
            delID: "",
            form: {
                meta: {}
            },
            fastData: "",
            fastData2: "",
            fastOptions: [
                {
                    value: 3,
                    label: "最近3天"
                },
                {
                    value: 7,
                    label: "最近一周"
                },
                {
                    value: 30,
                    label: "最近1个月"
                },
                {
                    value: 180,
                    label: "最近6个月"
                },
                {
                    value: 360,
                    label: "最近12个月"
                }
            ],
            pickerOptions1: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick (picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ],
                disabledDate (time) {
                    return time.getTime() > Date.now();
                }
            },
            pickerOptions3: {
                shortcuts: [
                    {
                        text: "今天",
                        onClick (picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick (picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ],
                disabledDate (time) {
                    return time.getTime() > Date.now();
                }
            },
            params: {
                result: "", // 查验结果 1:全部通过 2:非全部通过
                invoiceStatus: "",
                customerName: "", // 公司名称
                buyerName: "", // 发票购买方
                salerName: "", // 发票销售方
                batchNum: "", // 编号
                startCreateTime: "", // 创建开始时间
                endCreateTime: "", // 创建截止时间
                startCheckTime: "", // 验真开始时间
                endCheckTime: "", // 验真截止时间
                pageNum: 1,
                pageSize: 10,
                isRed: ""
            },
            params2: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            invoiceStatus: {
                0: "待查验",
                1: "已通过",
                2: "未通过",
                3: "已作废",
                4: "已过期",
                5: "不一致",
                6: "无此票"
            },
            tableData: [],
            expPageData: {
                pageNum: 1,
                pageSize: 10000000
            },
            isSelected: false,
            // iconUrl: require("./../../assets/images/pdf-little.png"),
            // selectionIconUrl: require("./../../assets/images/pdf-big.png"),
            // doneIconUrl: require("./../../assets/images/pdf-little-done.png"),
            curIndex: 0,
            fileId: "",
            fileIndex: "",
            invoiceList: [],
            invoiceDetailData: {},
            logList: [],
            rollPart: {},
            stopCheck: false,
            checkStatus: false,
            chekingInterval: {},
            checkLogInterval: {},
            chekingDetail: {},
            chekingExist: null,
            doneList: [],
            expFlag: false,
            expObj: {},
            // 获取row的key值
            getRowKeys (row) {
                // console.log('rriri',row)
                return row.id;
            },
            // 要展开的行，数值的元素是row的key值
            expands: [],
            historyList: [
                // {
                //     "checkTime": "2019.04.04", // 查验时间
                //     "result": "10/10", // 结果详情
                //     "resultDesc": "已通过10" // 查验结果
                // }
            ],
            repeatList: [
                // {
                //     // "batchNum": "Test201904041124", // 业务编号
                //     // "createTime": "2019.04.04"  // 创建日期
                // }
            ],
            isTbDialog: false,
            openList: [],
            invoiceCheckInfoId: ""
        };
    },
    //  fileAPI() {
    //         return this.env + "/invoice/file/";
    //     }
    computed: mapState({
        token: state => state.user.token,
        theme: state => state.echart.flag
    }),
    created () {
        // this.checkStatusExist()
    },
    mounted () {
        this.initData("showFirst");
    },
    beforeDestroy () {
        window.clearInterval(this.chekingExist);
        this.chekingExist = null;
        window.clearInterval(this.chekingInterval);
        window.clearInterval(this.chekingDetail);
        window.clearInterval(this.checkLogInterval);
        window.clearInterval(this.starCheckAgin);
    },
    methods: {
        // 点击自动展开收缩
        rowClick (row, index) {
            // console.log(row)
            // 展开/收缩切换
            this.$refs.expTable.toggleRowExpansion(row);
        },
        // 内容详情
        pdfInfo (invoiceCheckInfoId) {
            this.$http(
                "/invoice/invoiceCheckInfo/detail/list",
                {
                    invoiceCheckInfoId
                },
                {
                    type: "formdata"
                }
            ).then(res => {
                this.tableData = res.data || [];
            });
        },
        // 冲红列表
        getRushList (invoiceCheckInfoId) {
            if (this.invoiceCheckInfoId === invoiceCheckInfoId) return;
            this.invoiceCheckInfoId = invoiceCheckInfoId;
            this.$http(
                "/invoice/redInvoice/list",
                { invoiceCheckInfoId },
                { type: "post" }
            ).then(res => {
                this.rushInfoList = res.data || [];
            });
        },
        handleCommand (command) {
            const vm = this;
            switch (command.type) {
                case "invoice": //验真
                    console.log("1");
                    this.gotoValidClick(command.row.id);
                    break;
                case "del": //删除
                    console.log("1");
                    this.delID = command.row.id;
                    // this.isDialog = true
                    this.$confirm("删除已上传文件？", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        vm.delData();
                    });
                    break;
                case "detail":
                    console.log("1");
                    this.isTbDialog = true;
                    this.checkHistory(command.row);
                    break;
            }
        },
        gotoValidExp (page, id) {
            window.open(
                `${this.baseURL}?id=${id}&token=${this.token}&page=${page}`
            );
        },
        checkRepeat (row) {
            this.$http(
                "invoice/repeat/detail/list",
                { id: row.invoiceCheckInfoId },
                { type: "formdata" }
            ).then(res => {
                this.repeatList = res.data;
            });
        },
        checkHistory (row) {
            let params = {
                id: row.id,
                businessType: 1
            };
            this.$http("invoice/check/record/list", params, {
                type: "formdata"
            }).then(res => {
                this.historyList = res.data;
            });
        },
        expandRows (row, expRows) {
            let arr = [];
            if (expRows.length) {
                expRows.map(i => {
                    arr.push(i.id);
                });
            }
            this.openList = arr;
            let params = {
                pageNum: "1",
                pageSize: "5",
                id: row.id, // pdf 主键id 必传
                invoiceStatus: row.offlineInvoiceQueryAo.invoiceStatus, // // 验真结果(0:待查验 1:已通过 2:未通过 3:已作废 4:已过期 5:不一致 6:无此票)
                riskStatus: row.offlineInvoiceQueryAo.riskStatus, // // 内容匹配
                buyerName: row.offlineInvoiceQueryAo.buyerName, // 发票购买方
                salerName: row.offlineInvoiceQueryAo.salerName, // 发票销售方
                isRed: row.offlineInvoiceQueryAo.isRed
            };
            this.$http("/invoice/pdf/invoice/list", params).then(res => {
                this.$set(row, "expData", res);
            });
        },
        initExtend (row) {
            console.log('roworworow', row)
            let params = {
                pageNum: this.params2.pageNum,
                pageSize: this.params2.pageSize,
                id: row.id, // pdf 主键id 必传
                invoiceStatus: row.offlineInvoiceQueryAo.invoiceStatus, // // 验真结果(0:待查验 1:已通过 2:未通过 3:已作废 4:已过期 5:不一致 6:无此票)
                riskStatus: row.offlineInvoiceQueryAo.riskStatus, // // 内容匹配
                buyerName: row.offlineInvoiceQueryAo.buyerName, // 发票购买方
                salerName: row.offlineInvoiceQueryAo.salerName, // 发票销售方
                isRed: row.offlineInvoiceQueryAo.isRed
            };
            this.$http("/invoice/pdf/invoice/list", params, {
                type: "formdata"
            }).then(res => {
                // this.$set(row,'expData',res)
                row.expData = res;
                this.params2.total = res.data.totalSize
            });
        },
        pickerOptions2 () {
            const vm = this;
            let startCreateTime = "";
            vm.params.startCreateTime &&
                (startCreateTime = vm.params.startCreateTime + " 00:00:00");
            return {
                disabledDate (time) {
                    return new Date(time) < new Date(startCreateTime);
                }
            };
        },
        pickerOptions4 () {
            const vm = this;
            let startCheckTime = "";
            vm.params.startCheckTime &&
                (startCheckTime = vm.params.startCheckTime + " 00:00:00");
            return {
                disabledDate (time) {
                    return new Date(time) < new Date(startCheckTime);
                }
            };
        },
        closeDialog () {
            window.clearInterval(this.chekingInterval);
            window.clearInterval(this.chekingDetail);
            window.clearInterval(this.checkLogInterval);
            window.clearInterval(this.starCheckAgin);
        },
        gotoFile (fileId) {
            // return `${this.fileAPI}${fileId}?access_token=${getStore("token")}`;
        },
        async gotoValid (id, state) {
            let page = 1;
            if (state !== undefined) {
                let res = await this.$http(
                    "/invoice/jump/page/get",
                    {
                        pdfId: id, // 列表的id,指发票pdf的id
                        riskStatus: state // 状态  (0:待定 1:正常 2:异常 3:失败 4:未知)
                    },
                    { type: "get" }
                );
                if (res.code === "200") {
                    page = res.data.number;
                    window.open(
                        `${this.baseURL}?id=${id}&token=${
                        this.token
                        }&page=${page || 1}`
                    );
                }
            }
        },
        gotoValidClick (id) {
            window.open(`${this.baseURL}?id=${id}&token=${this.token}&page=1`);
        },
        async initData (showFirst, isExport = false) {
            this.openList = [];
            // console.log('showfirst',showFirst)
            let param = {};
            if (isExport) {
                param = { ...this.params, ...this.expPageData };
            } else {
                param = { ...this.params, ...this.pageData };
            }
            let res = await this.$http("/invoice/pdf/list", param);
            if (res.code === "200") {
                if (isExport) {
                    // console.log('1')
                    this.exportExl(res.data);
                    return;
                }
                if (res.data.length === 0 && this.params.pageNum !== 1) {
                    this.params.pageNum = this.params.pageNum * 1 - 1;
                    // console.log('2')
                    this.initData();
                } else if (showFirst) {
                    //如果参数带有'showfirst',则默认展开第一行
                    this.form = res;
                    this.renderFlag = false;
                    let arr = [];
                    arr.push(res.data[0].id);
                    this.openList = arr;
                    if (res.data.length) {
                        // console.log('form.data',this.form)
                        let params = {
                            pageNum: "1",
                            pageSize: "5",
                            id: this.form.data[0].id, // pdf 主键id 必传
                            invoiceStatus: this.form.data[0]
                                .offlineInvoiceQueryAo.invoiceStatus, // // 验真结果(0:待查验 1:已通过 2:未通过 3:已作废 4:已过期 5:不一致 6:无此票)
                            riskStatus: this.form.data[0].offlineInvoiceQueryAo
                                .riskStatus, // // 内容匹配
                            buyerName: this.form.data[0].offlineInvoiceQueryAo
                                .buyerName, // 发票购买方
                            salerName: this.form.data[0].offlineInvoiceQueryAo
                                .salerName, // 发票销售方
                            isRed: this.form.data[0].offlineInvoiceQueryAo.isRed
                        };
                        this.$http("/invoice/pdf/invoice/list", params, {
                            isLoading: false
                        }).then(res => {
                            this.$set(this.form.data[0], "expData", res);
                            this.renderFlag = true;
                            this.expands = [];
                            this.expands.push(this.form.data[0].id); //默认展开第一条数据
                        });
                        // Object.assign(this.form.data[0],this.testList)
                        this.isData = !!res.data.length;
                    }
                } else {
                    // console.log('3')
                    this.form = res;
                    this.isData = !!res.data.length;
                }
            }
        },
        onSubmit () {
            this.$refs["importForm"].submitForm();
        },
        restForm () {
            this.dateArr = []
            this.dateArr2 = []
            this.params = {
                result: "", // 查验结果 1:全部通过 2:非全部通过
                invoiceStatus: "",
                customerName: "", // 公司名称
                buyerName: "", // 发票购买方
                salerName: "", // 发票销售方
                batchNum: "", // 编号
                startCreateTime: "", // 创建开始时间
                endCreateTime: "", // 创建截止时间
                startCheckTime: "", // 验真开始时间
                endCheckTime: "", // 验真截止时间
                "riskStatus ": "",
                pageNum: 1,
                pageSize: 10,
                isRed: ""
            };
            (this.fastData = ""), (this.fastData2 = "");
            this.expands = [];
            this.initData("showFirst");
        },
        fastChange (val) {
            this.dateArr = [];
            if (!val) {
                return false;
            } else {
                const date = new Date();
                this.params.endCreateTime = this.formatDate(new Date());
                let startDate = date.setTime(
                    date.getTime() - 3600 * 1000 * 24 * val
                );
                this.params.startCreateTime = this.formatDate(startDate);
                this.dateArr.push(
                    this.params.startCreateTime,
                    this.params.endCreateTime
                );
            }
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startCreateTime = v[0];
                this.params.endCreateTime = v[1];
            } else {
                this.params.startCreateTime = "";
                this.params.endCreateTime = "";
            }
        },
        fastChange2 (val) {
            this.dateArr2 = [];
            if (!val) {
                return false;
            } else {
                const date = new Date();
                this.params.endCheckTime = this.formatDate(new Date());
                let startDate = date.setTime(
                    date.getTime() - 3600 * 1000 * 24 * val
                );
                this.params.startCheckTime = this.formatDate(startDate);
                this.dateArr2.push(
                    this.params.startCheckTime,
                    this.params.endCheckTime
                );
            }
        },
        changeDate2 (v) {
            if (v && v.length > 0) {
                this.params.startCheckTime = v[0];
                this.params.endCheckTime = v[1];
            } else {
                this.params.startCheckTime = "";
                this.params.endCheckTime = "";
            }
        },
        clearFast () {
            this.fastData = "";
        },
        clearFast2 () {
            this.fastData2 = "";
        },
        /* 删除文件 */
        async delData () {
            let id = this.delID;
            if (!id) {
                this.$message.error("删除ID不能为空！");
                return;
            }
            let res = await this.ajax.post(`/invoice/remove/${id}`);
            if (res.code === "200") {
                this.$message.success("删除成功！");
                this.initData();
            }
        },
        /* 导出文件 */
        async exportData () {
            await this.$http(
                `/invoice/base/export`,
                {
                    ...this.params,
                    ...this.expPageData
                },
                { type: "export" }
            );
        },
        exportExl (db) {
            import("@/utils/Export2Excel").then(excel => {
                const tHeader = [
                    "业务编号",
                    "公司名称",
                    "创建日期",
                    "创建人",
                    "上次验真日期",
                    "验真结果"
                ];
                const filterVal = [
                    "batchNum",
                    "customerName",
                    "createTime",
                    "createBy",
                    "checkTime",
                    "result"
                ];
                const data = this.formatJson(filterVal, db);

                let name = `发票`;
                if (this.params.customerName) {
                    name += "_" + this.params.customerName;
                }
                if (this.params.batchNum) {
                    name += "_" + this.params.batchNum;
                }
                if (this.params.result) {
                    name +=
                        "_" +
                        ["全部通过", "非全部通过"][this.params.result * 1 - 1];
                }
                name += "_" + this.formatDate(new Date(), "YYYYMMDD");

                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: name,
                    autoWidth: true
                });
            });
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    return v[j];
                })
            );
        },
        // 导入成功提示
        importTips () {
            // this.isDialog2 = true
            // this.verifyInvoice()
        },
        // iconSelectIcon (v, index) {
        //     // let flag = false
        //     window.clearInterval(this.checkLogInterval)
        //     window.clearInterval(this.chekingInterval)
        //     window.clearInterval(this.chekingDetail)
        //     this.curIndex = index
        //     this.fileId = v.fileId
        //     this.fileIndex = index
        //     this.checkingInvoiceDetail(index)
        //     this.starCheckLog()
        //     // this.checkLog()
        //     // setInterval()
        // },
        invocing (id) {
            this.isDialog2 = true;
            // this.verifyInvoice(id)
            this.checkingInvoiceDetail(id);
            this.starCheckLog(id);
        },
        // 验真中的发票信息查询
        // async verifyInvoice (id) {
        //     this.curIndex = 0
        //     this.doneList = []
        //     let params = { type: 1,fileId:id }
        //     let res = await this.ajax.post(`invoice/queryVerificationInvoice`, params, { isLoading: false })
        //     if (res.code === '200') {
        //         this.invoiceList = res.data
        //         if (this.invoiceList.length) {
        //             this.fileId = this.invoiceList[0].fileId
        //             this.checkingInvoiceDetail()
        //             this.starCheckLog()
        //             // this.checkLog()
        //         }
        //     }
        // },
        // 验真中的发票详情查询
        async invoiceDetail (id) {
            let params = { fileId: id, type: 1 };
            let res = await this.$http(
                `invoice/queryInvoiceVerificationDetail`,
                params,
                { type: "formdata" }
            );
            if (res.code === "200") {
                console.log(res.data);
                let pipeData = deepClone(pipe)
                let numData = res.data.finish === 1 ? [1, 0] : [1, 1]
                pipeData.title.text = res.data.complete + '/' + res.data.total
                if (res.data.finish === 1) {

                    pipeData.title.subtext = "已完成"
                } else {

                    pipeData.title.subtext = "检查中"
                }


                pipeData.series[0].data = numData;

                this.pipeOption = pipeData;
                this.invoiceDetailData = res.data;
                // if (res.data.finish) {
                //     this.doneList.push(this.fileIndex); // 如果文件完成校验，添加到donlist中以便修改图标样式
                // }
                // let barWidth =
                //     this.invoiceDetailData.complete /
                //     this.invoiceDetailData.total;
                // document.querySelector(".bar").style.width =
                //     barWidth * 100 + "%";
                if (res.data.finish === 1) {
                    window.clearInterval(this.chekingDetail);
                }
            }
            if (res.data.finish === 1) {
                window.clearInterval(this.chekingDetail);
            }
        },
        // 持续查询发票详情
        checkingInvoiceDetail (id) {
            this.chekingDetail = setInterval(() => {
                this.invoiceDetail(id);
            }, 1000);
        },
        // 再次获取日志
        async checkAgain (id) {
            if (!this.logList.length) return;
            let params = {
                type: 1,
                fileId: id,
                checkLogId: this.logList[this.logList.length - 1].id
            };
            // let json = {id: 3852, processDesc: "第11页自动识别失败", createTime: "2019-01-16 18:27:07"}
            let res = await this.$http(
                `invoice/queryAfterInvoiceCheckLogById`,
                params,
                { type: "formdata" }
            );
            if (res.code === "200" && res.data.invoiceCheckLogVoList.length) {
                res.data.invoiceCheckLogVoList;
                res.data.invoiceCheckLogVoList.map(v => {
                    this.logList.push(v);
                });
                if (res.data.finish === 1) {
                    window.clearInterval(this.chekingInterval);
                }
            }
            if (res.data.finish === 1) {
                window.clearInterval(this.chekingInterval);
            }
        },
        // 获取日志
        async checkLog (id) {
            this.logList = [];
            window.clearInterval(this.chekingInterval);
            let params = { fileId: id, type: 1 };
            let res = await this.$http(`invoice/queryInvoiceCheckLog`, params, {
                type: "formdata"
            });
            if (res.data.length) {
                this.logList = res.data.reverse();
                this.starCheckAgin(id);
                window.clearInterval(this.checkLogInterval);
            }
        },
        // 开启计时器
        starCheckLog (id) {
            this.checkLogInterval = setInterval(() => {
                this.checkLog(id);
            }, 1000);
        },
        // 开启计时器
        starCheckAgin (id) {
            this.chekingInterval = setInterval(() => {
                this.checkAgain(id);
            }, 1000);
        },
        // 获取是否有发票在验真中状态
        async checkingStauts () {
            let res = await this.$http(
                "invoice/queryVerificationStatus",
                { type: 1 },
                { type: "get" }
            );
            if (res.code === "200") {
                this.checkStatus = res.data;
                if (!res.data && this.isDialog2) {
                    this.isDialog2 = false;
                    this.$message({
                        type: "success",
                        message: `查验已完成`
                    });
                    this.initData();
                }
            }
        },
        checkStatusExist () {
            this.chekingExist = setInterval(() => {
                this.checkingStauts();
            }, 3000);
        }
    },
    watch: {
        logList () {
            setTimeout(() => {
                let container = document.querySelector(".log");
                container.scrollTop = container.scrollHeight;
            }, 13);
        },
        isDialog2 (cV, oV) {
            if (cV) {
                // this.checkStatus = true
            } else {
                // this.checkStatus = false
                window.clearInterval(this.chekingInterval);
                window.clearInterval(this.chekingDetail);
            }
        }
    }
};
</script>
<style lang="less" scoped>
/deep/ .el-form-item__content {
    line-height: normal;
}
.tb-header /deep/ .el-table__header th .cell {
    // font-weight: 600;
}

.tb-inside-header /deep/ .el-table__header th .cell {
    // font-weight: 400;
}

/deep/ .el-button--success.is-plain {
    background: white;
    border-color: #21ac67;
}
/deep/ .el-button--success.is-plain:focus,
.el-button--success.is-plain:hover {
    background-color: #f0f9eb;
    color: #21ac67;
}

.importInfo /deep/ .el-dialog__header {
}
.remark-box {
    span + span::before {
        content: ' / ';
    }
}
.el-form-item {
    margin-right: 20px !important;
}
.identify-process {
    display: flex;
    justify-content: center;
}

.dark {
    .el-table {
        .el-button {
            background: none;
            border: none;
            color: #6188e1;
        }
    }
    .el-button--blue:hover {
        color: #95b8f7 !important;
        background: rgba(98, 135, 201, 0.23) !important;
        border: 1px solid #6287c9 !important;
    }
    .compony-info {
        background: #292b2f;
        padding: 15px 43px;
        color: rgba(255, 255, 255, 0.8);
        font-family: PingFangSC-Regular;
    }
    .content-bottom {
        // width: 715px;
        display: flex;
        .left {
            width: 480px;
            display: flex;
            flex-wrap: wrap;
            .left-content {
                margin-top: 30px;
                flex-basis: 25%;
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
                .left-num {
                    text-align: center;
                    height: 40px;
                    font-family: PingFangSC-Light;
                    font-size: 28px;
                    color: #616467;
                }
                .left-title {
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 14px;
                }
            }
        }
        .right {
            width: 270px;
            .right-wrap {
                background: #292b2f;
            }
            .log {
                width: 236px;
                height: 100px;
                margin: 0 auto;
                overflow: auto;
                padding: 15px 30px;
            }
        }
    }
    .remark-box{
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #43A1AC;
    }
}
.light {
    .el-table {
        .el-button {
            background: none;
            border: none;
            color: #23bfce;
        }
    }
    .el-button--blue:hover {
        border: 1px solid #23bfce;
        background: #23bfce;
        color: #fff;
    }
    .compony-info {
        background: #ebecf3;
        padding: 15px 43px;
        color: #666;
        font-family: PingFangSC-Regular;
    }
    .content-bottom {
        // width: 715px;
        display: flex;
        .left {
            width: 480px;
            display: flex;
            flex-wrap: wrap;
            .left-content {
                margin-top: 30px;
                flex-basis: 25%;
                display: flex;
                flex-direction: column;
                margin-bottom: 20px;
                .left-num {
                    text-align: center;
                    height: 40px;
                    font-size: 28px;
                    color: #616467;
                }
                .left-title {
                    text-align: center;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #666;
                    line-height: 14px;
                }
            }
        }
        .right {
            width: 270px;
            .right-wrap {
                background: #fff;
            }
            .log {
                width: 236px;
                height: 100px;
                margin: 0 auto;
                overflow: auto;
                padding: 15px 30px;
            }
        }
    }
    .remark-box{
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #4064D4;
    }
}

.tishi {
    font-size: 14px;
    color: #909399;
    padding-left: 10px;
    margin-bottom: 26px;
    i {
        color: #ffbc31;
        margin-right: 6px;
        font-size: 18px;
    }
    a {
        text-decoration: underline;
    }
}
.identify-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 25px;
    .content-top {
        border: 1px solid #e9ebf1;
        background-color: #fff;
        width: 715px;
        height: 135px;

        // padding:
        .slider {
            // width: 100%;
            height: 70%;
            padding: 0 35px;
            padding-right: -100px;
            display: flex;
            justify-content: center;
            align-items: center;
            .ctrl {
                cursor: pointer;
                margin-top: -13px;
            }
            .slider-main {
                width: 580px;
                display: flex;
                justify-content: space-around;
                .files {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    img {
                        display: block;
                        // width: 19px;
                        // height: 23px;
                    }
                    .files-index {
                        text-align: center;
                    }
                }
                img {
                }
            }
        }
    }

    .swiper-button-prev {
        left: 75px;
        top: 37%;
        // background-image: url("../../assets/images/arrow-left.png");
        background-size: 17px 16px;
    }
    .swiper-button-next {
        right: 75px;
        top: 37%;
        // background-image: url("../../assets/images/arrow-right.png");
        background-size: 17px 16px;
    }
    .selectionicon {
        // background-image: url("../../assets/images/excel-big.png");
        background-repeat: no-repeat;
        background-size: 32px 40px;
    }
    /deep/ .swiper-wrapper {
        align-items: center;
    }
    .color-red {
        color: rgb(253, 116, 87);
    }
}
.invocing {
    display: inline-block;
    width: 115px;
    height: 35px;
    border: 1px solid orangered;
    text-align: center;
    line-height: 35px;
}
.border {
    border: 1px solid #ffc193;
    width: 121px;
    height: 40px;
    padding: 5px;
}
.wrapASH {
    height: 5px;
    width: 110px;
    position: relative;
    border-radius: 10px;
    // overflow: hidden;
}
.logo {
    margin-left: 10px;
    color: #f56a00;
    display: flex;
    align-items: center;
}
.barASH {
    width: 290px;
    height: 16px;
    left: -200px;
    position: absolute;
    background: linear-gradient(90deg, #ffd3b7 0px, #ff840d 145px, #ffd3b7 290px);
    border-radius: 10px;
    animation: mymove 1s linear infinite alternate;
}
@-webkit-keyframes mymove /* Safari and Chrome */ {
    from {
        left: -170px;
    }
    to {
        left: -10px;
    }
}
// 动态验真中
.ani_dot {
    font-family: simsun;
    // font-weight: bold;
    font-size: 13px;
    height: 12px;
}
:root .ani_dot {
    /* 这里使用Hack是因为IE6~IE8浏览器下， vertical-align解析不规范，值为bottom或其他会改变按钮的实际高度*/
    display: inline-block;
    width: 1.5em;
    // vertical-align: bottom;
    overflow: hidden;
}
@-webkit-keyframes dot {
    0% {
        width: 0;
    }
    33% {
        width: 0.5em;
    }
    66% {
        width: 1em;
    }
    100% {
        width: 1.5em;
    }
}
.ani_dot {
    -webkit-animation: dot 3s infinite step-start;
}
@keyframes dot {
    0% {
        width: 0;
    }
    33% {
        width: 0.5em;
    }
    66% {
        width: 1em;
    }
    100% {
        width: 1.5em;
    }
}
.ani_dot {
    animation: dot 3s infinite step-start;
}
.not_dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 93px;
    color: #21ac67;
    cursor: pointer;
}
.has_dot {
    display: flex;
    align-items: center;
    width: 93px;
    line-height: 1;
    color: #ff913c;
    cursor: pointer;
}
.failed {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 93px;
    color: #f56540;
    cursor: pointer;
}
.service-content {
    width: 100px;
    // text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.service-inner {
    display: block;
}
.unusual {
    color: #f56540;
}
/deep/ .el-table__expanded-cell {
}
</style>

