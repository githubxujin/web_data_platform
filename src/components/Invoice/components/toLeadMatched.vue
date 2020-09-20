<template>
    <div class="to-lead-m">
        <div class="mod pb0">
            <el-row>
                <el-form :inline="true" ref="form" size="medium">
                <c-Search>
                        <el-form-item label="业务编号">
                            <el-input v-model="params.batchNum" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="发票购买方">
                            <el-input v-model="params.buyerName" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="发票销售方">
                            <el-input v-model="params.salerName" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="发票号码">
                            <el-input v-model="params.invoiceNo" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="发票代码">
                            <el-input v-model="params.invoiceCode" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="验真结果">
                            <el-select v-model="params.invoiceStatus" clearable style="width:100px;"> 
                                <el-option label="已通过" value="1"></el-option>
                                <el-option label="已作废" value="3"></el-option>
                                <el-option label="已过期" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="内容匹配">
                            <el-select v-model="params.riskStatus" clearable style="width:100px;">
                                <el-option label="待定" value="0"></el-option>
                                <el-option label="正常" value="1"></el-option>
                                <el-option label="异常" value="2"></el-option>
                                <el-option label="未知" value=4></el-option>
                                <el-option label="-" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="是否冲红">
                            <el-select v-model="params.isRed" clearable style="width:100px;">
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="开票时间区间">
                            <el-date-picker v-model="params.startInvoiceDate" type="date" @change="clearFast" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker><span style="color: #606266;margin:0 10px;">至</span>
                            <el-date-picker v-model="params.endInvoiceDate" type="date" @change="clearFast" :picker-options="pickerOptions2()" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange" style="width:120px;">
                                <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </c-Search>
                    <el-form-item>
                        <el-button type="primary" @click="params.pageNum = 1,getList()">搜索</el-button>
                        <el-button type="blue" class="btn" @click="restForm">重置</el-button>
                        <el-button type="blue" size="medium" @click="exportData">导出</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
        <div class="mod">
            <div class="data-info">
                <ul>
                    <li>
                        <p>发票总金额：<span>{{dataInfo.totalAmount | numFormat}}</span></p>
                        <p>发票总张数：<span>{{dataInfo.countInvoiceNum}}</span></p>
                    </li>
                    <li>
                        <p>有效发票总金额(占比)：<span>{{dataInfo.totalEffectiveAmount | numFormat}}({{dataInfo.totalEffectiveAmountProportion}}%)</span></p>
                        <p>有效发票总张数(占比)：<span>{{dataInfo.countEffectiveNum}}({{dataInfo.countEffectiveNumProportion}}%)</span></p>
                    </li>
                    <li>
                        <p>冲红发票总金额(占比)：<span>{{dataInfo.redTotalAmount | numFormat}}({{dataInfo.redTotalAmountProportion}}%)</span></p>
                        <p>冲红发票总张数(占比)：<span>{{dataInfo.countRedNum}}({{dataInfo.countRedNumProportion}}%)</span></p>
                    </li>
                    <li>
                        <p>作废发票总金额(占比)：<span>{{dataInfo.invalidTotalAmount | numFormat}}({{dataInfo.invalidTotalAmountProportion}}%)</span></p>
                        <p>作废发票总张数(占比)：<span>{{dataInfo.countInvalidNum}}({{dataInfo.countInvalidNumProportion}}%)</span></p>
                    </li>
                </ul>
            </div>
            <el-table :data="list" style="width: 100%" border>   
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="batchNum" label="业务编号" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceCode" label="发票代码" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceNo" label="发票号码" width="120" show-overflow-tooltip></el-table-column>  
                <el-table-column prop="serviceContent" label="服务内容" width="150" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span :class="{'p2':item.row.riskStatus==='2'}">{{ item.row.serviceContent}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="riskStatus" label="内容匹配" show-overflow-tooltip>
                    <template slot-scope="item">
                        <span :class="{'p2':item.row.riskStatus==='2'}">{{ item.row.riskStatus | toRiskStatus }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="invoiceStatus" label="验真结果" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ item.row.invoiceStatus | toInvoiceStatus }}
                    </template>
                </el-table-column>  
                <el-table-column prop="isRed" label="是否冲红" show-overflow-tooltip>
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
                            <el-button type="text" slot="reference" class="p2" style="padding: 0;">是</el-button>
                        </el-popover>
                        <div v-else>否</div>
                    </template>
                </el-table-column>  
                <el-table-column prop="remark" label="发票备注" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="buyerName" label="发票购买方" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salerName" label="发票销售方" width="150" show-overflow-tooltip></el-table-column>  
                <el-table-column prop="invoiceAmount" label="合计金额" width="120" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.invoiceAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxRate | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxAmount" label="合计税额" width="120" show-overflow-tooltip align="right">
                     <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template>    
                </el-table-column>  
                <el-table-column prop="totalAmount" label="价税合计" width="120" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="effectiveAmount" label="有效金额" width="120"  show-overflow-tooltip align="right">
                     <template slot-scope="item">
                        {{ item.row.effectiveAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="数据来源" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ item.row.source === '1' ? '发票易': ''}}
                    </template>    
                </el-table-column>  
                <el-table-column prop="invoiceDate" label="开票日期" width="120"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="160"  show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="250" align="center">
                    <template slot-scope="item">
                        <el-button type="blue" plain size="mini" @click="isTbDialog=true,toDetail(item.row.id)">详情</el-button>
                        <el-button type="blue" plain size="mini" @click="checkTrue(item.row.invoiceCheckInfoId)">验真</el-button>
                        <el-button type="primary" plain size="mini" @click="isCheckDialog=true,toExamine(item.row.invoiceCheckInfoId)">检查</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-nav">
                <el-pagination background layout="jumper, prev, pager, next, total" :total.sync='totalSize' :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="getList()">
                </el-pagination>
            </div>
        </div>
        <!-- 内容详情 -->
        <el-dialog :visible.sync="isTbDialog" width="1280px" title="内容详情">
            <el-table :data="fDetail" border max-height="500">
                <el-table-column prop="goodsName" label="商品名称" width="230" show-overflow-tooltip></el-table-column>
                <el-table-column prop="specificationModel" label="规格型号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="unit" label="单位" width="80" show-overflow-tooltip></el-table-column>
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
                <el-table-column prop="taxRate" label="税率" width="80" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taxPrice" label="含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxAmount" label="税额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="totalAmount" label="价税合计" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 检查 -->
        <el-dialog :visible.sync="isCheckDialog" width="20%" title="检查" align="center">
            <el-table :data="historyData" border>
                <el-table-column prop="queryTime" label="查验日期" ></el-table-column>
                <el-table-column width="80" prop="cancellationMark" label="查验结果" align="center">
                    <template slot-scope="item">
                        <i v-if="item.row.cancellationMark === '0'" class="iconfont icon-tongyong-chenggongtishitubiao" style="width:22px;height:16px"></i>
                        <i v-else class="iconfont icon-tongyong-fujianshanchutubiao1" style="width:22px;height:16px"></i>
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="address" label="操作" align="center">
                    <template slot-scope="item">
                        <a class="c_O cur" @click="aid = item.row.id, dialogVisible = true">查看</a>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 发票详情 -->
        <el-dialog class="fap" :visible.sync="dialogVisible" width="60%">
            <span>
                <info :id="aid" v-if="dialogVisible" @closebox="v=>{dialogVisible=false}"></info>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { formatDate } from '@utils'
import info from '../../common/info'
export default {
    components: {
        info
    },
    data () {
        return {
            totalSize: 0,
            isShow: false,
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            isData: false,
            isExport: false,
            isCheckDialog: false,
            dialogVisible: false,
            delID: '',
            rushInfoList: [],
            params: {
                batchNum:"",
                buyerName:"", // 发票购买方
                salerName:"", // 发票销售方
                invoiceNo:"", // 发票号码
                invoiceCode:"", // 发票代码
                invoiceStatus:"", // 验真结果(1:已通过 3:已作废 4:已过期)
                riskStatus:"", // 风险状态(0:待定 1:正常 2:异常 3:失败(-) 4:未知)
                isRed:"", // 是否冲红（0:否 1:是
                startInvoiceDate:"", // 开票时间开始时间
                endInvoiceDate:"", // 开票时间结束时间
                pageNum: 1,
                pageSize: 10
            },
            historyData: [],
            list: [],
            dataInfo: {},
            detailInfo: [],
            fDetail: [],
            matchingList: [],
            fastData: '',
            fastData2: '',
            fastOptions: [
                {
                    value: 3,
                    label: '最近3天'
                },
                {
                    value: 7,
                    label: '最近一周'
                },
                {
                    value: 30,
                    label: '最近1个月'
                },
                {
                    value: 180,
                    label: '最近6个月'
                },
                {
                    value: 360,
                    label: '最近12个月'
                }
            ],
            pickerOptions1: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick (picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ],
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            },
            pickerOptions3: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick (picker) {
                            picker.$emit('pick', new Date())
                        }
                    },
                    {
                        text: '昨天',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        }
                    },
                    {
                        text: '一周前',
                        onClick (picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        }
                    }
                ],
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            },
            params2: {
                pageNum: 1
            },
            expPageData: {
                pageNum: 1,
                pageSize: 10000000
            },
            isTbDialog: false,
            openList: [],
            invoiceCheckInfoId: ''
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList(){
            this.ajax.post('/invoice/rtc/invoiceCheckInfo/list',this.params).then( res => {
                if (this.params.pageNum === 1  ){
                    this.dataInfo = res.data
                }
                this.detailInfo = res.data
                this.list = res.data.pageResult.records || []
                this.totalSize = res.data.pageResult.totalRecords
            })
        },
        // 冲红列表
        getRushList(invoiceCheckInfoId){
            if ( this.invoiceCheckInfoId === invoiceCheckInfoId ) return
            this.invoiceCheckInfoId = invoiceCheckInfoId
            this.ajax.post('/invoice/redInvoice/list',{invoiceCheckInfoId}).then( res => {
                this.rushInfoList = res.data || []
            })
        },
        // 详情 
        toDetail(rtcInvoiceId){
            this.ajax.post('/invoice/rtc/invoice/detail/list', {rtcInvoiceId}).then( res => {
                this.fDetail = res.data || []
            })
        },
        // 验真
        checkTrue(id){
            this.ajax.post('/invoice/rtcInvoiceCheck',{id}).then( res => {
                if ( res.code === '200' ) return this.$message.success('查验成功！')
            })
        },
        // 检查
        toExamine(id){
            this.ajax.get('/invoice/offline/invoice/history/list',{id}).then( res => {
                this.historyData = res.data || []
            })
        },
        // 时间插件
        pickerOptions2 () {
            const vm = this
            let startInvoiceDate = ''
            vm.params.startInvoiceDate && (startInvoiceDate = vm.params.startInvoiceDate + ' 00:00:00')
            return {
                disabledDate (time) {
                    return (new Date(time)) < (new Date(startInvoiceDate))
                }
            }
        },
        pickerOptions4 () {
            const vm = this
            let startCheckTime = ''
            vm.params.startCheckTime && (startCheckTime = vm.params.startCheckTime + ' 00:00:00')
            return {
                disabledDate (time) {
                    return (new Date(time)) < (new Date(startCheckTime))
                }
            }
        },
        // 重置
        restForm () {
            this.params = {
                batchNum:"",
                buyerName:"", // 发票购买方
                salerName:"", // 发票销售方
                invoiceNo:"", // 发票号码
                invoiceCode:"", // 发票代码
                invoiceStatus:"", // 验真结果(1:已通过 3:已作废 4:已过期)
                riskStatus:"", // 风险状态(0:待定 1:正常 2:异常 3:失败(-) 4:未知)
                isRed:"", // 是否冲红（0:未冲红 1:已冲红）
                startInvoiceDate:"", // 开票时间开始时间
                endInvoiceDate:"", // 开票时间结束时间
                pageNum: 1,
                pageSize: 10
            },
            this.fastData = '',
            this.fastData2 = ''
            this.getList()
        },
        fastChange (val) {
            if (!val) {
                return false
            } else {
                const date = new Date()
                this.params.endInvoiceDate = this.formatDate(new Date())
                let startDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * val)
                this.params.startInvoiceDate = this.formatDate(startDate)
            }
        },
        clearFast () {
            this.fastData = ''
        },
        /* 导出文件 */
        async exportData () {
            await this.ajax.exportFile('/invoice/rtc/invoiceCheckInfo/export', this.params)
        },
    },
    mounted (){
    },
    watch: {
    },
    filters: {
        toRiskStatus (v){
            // console.log(v);
            switch (v) {
                case '0':
                    return '待定'
                case '1':
                    return '正常'
                case '2':
                    return '异常'
                case '3':
                    return '-'
                case '4':
                    return '未知'
                default:
                    break;
            }
        },
        toInvoiceStatus(v){
            switch (v) {
                case '1':
                    return '已通过'
                case '3':
                    return '已作废'
                case '4':
                    return '已过期'
                default:
                    break;
            }
        }
    }

}
</script>
<style lang="less" scoped>
.p0 {
    color: #0486FE;
}
.p1 {
    color: #21AC67;
}
.p2 {
    color: #EA5932;
}
.p4 {
    color: #FF8E36;
}
.to-lead-m {
    .data-info {
        ul {
            display: flex;
            // justify-content: space-between;
            margin: 10px 0 30px;
            li {
                flex: 1;
                p {
                    font-size: 14px;
                    color: #606266;
                    letter-spacing: 0;
                    margin-top: 20px;
                    span {
                        font-size: 16px;
                        color:  #f76a00;
                    }
                }
            }
        }
    }
    // 成功
    .icon-tongyong-chenggongtishitubiao {
        font-size: 16px;
        color: #3dbd7d;
    }
    // 失败
    .icon-tongyong-fujianshanchutubiao1 {
        font-size: 16px;
        color: #F56540;
    }
}
/deep/ .el-button--success.is-plain {
    background: white;
    border-color:#67c23a;

}
/deep/ .el-button--success.is-plain:focus, .el-button--success.is-plain:hover {
    background-color: #f0f9eb;
    color: #67c23a;
}   
.importInfo /deep/ .el-dialog__footer {
  display: flex;
  justify-content: center;
  border-top: 1px solid #e2e4ed;
  background-color: #f5f6fa;
  button {
    padding: 9px 25px;
  }
}

.importInfo /deep/ .el-dialog__header {
  border-bottom: 1px solid #e2e4ed;
}
.remark-box{
    span + span::before{
        content: ' / ';
    }
}
.el-form-item{
    margin-right: 20px !important;
}
.identify-process {
    display: flex;
    justify-content: center;
}
.compony-info {
    padding: 15px 43px;
    border: 1px solid #EBECF2;
}
.identify-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    // border: 1px solid purple;
    background-color: rgb(247, 247, 247);
    // background-color: #ccc;
    width: 750px;
    // height: 430px;
    padding: 25px;
    .content-top {
        border: 1px solid #E9EBF1;
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
    .content-bottom {
        width: 715px;
        display: flex;
        .left {
            width: 305px;
            display: flex;
            flex-wrap: wrap;
            .left-content {
                padding: 25px 25px 0;
                width: 46%;
                .num {
                    font-size: 24px;
                    color: #FFA955;
                }
            }
        }
        .right {
            padding-top: 25px;
            padding-right: 10px;
            width: 415px;
            .process-bar {
                text-align: center;
                .bar-percent {
                    display:flex;
                    align-items: center;
                    justify-content: center;
                    .process-num {
                        font-size: 22px;
                        color: #f56A00;
                    }
                    .checking {
                        background-color: rgb(47, 125, 255);
                        font-size: 12px;
                        line-height: 20px;
                        border-radius: 3px;
                        margin-left: 10px;
                        padding: 1px 10px;
                        color: white;
                    }
                    .doneYet {
                        background-color: rgb(61, 189, 125);
                        font-size: 12px;
                        line-height: 20px;
                        border-radius: 3px;
                        margin-left: 10px;
                        padding: 1px 10px;
                        color: white;
                    }

                }
                .wrap {
                    // width: 187px;
                    // padding: 10px 0;
                    width: 100%;
                    height: 16px;
                    background-color: #FFD4A5;
                    position: relative;
                    border-radius: 10px;
                }
                .bar {
                    width: 90px;
                    height: 100%;
                    position: absolute;
                    background-image: linear-gradient(90deg, #FFB05B 0px, #FF6225 90px);
                    border-radius: 10px;
                    // -webkit-transition-property:width;
                    // -webkit-transition-duration:1s;
                }
            }
            .log {
                height: 205px;
                background-color: #fff;
                border: 1px solid #E9EBF1;
                margin: 0 auto;
                overflow: auto;
                padding: 15px 30px ;
                p {
                    color: #F56A00;
                    font-size: 14px;
                    margin-bottom: 18px;
                }
            }
        }
    }
    
    .color-red {
        color: rgb(253, 116, 87)
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
        border: 1px solid #FFC193;
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
        color: #F56A00;
        display: flex;
        align-items: center;

    }
    .barASH {
        width: 290px;
        height: 16px;
        left: -200px;
        position: absolute;
        background: linear-gradient(90deg, #FFD3B7 0px, #FF840D 145px, #FFD3B7 290px);
        border-radius: 10px;
        animation:mymove 1s linear infinite alternate;  
    }
    @-webkit-keyframes mymove /* Safari and Chrome */
    {
        from {left:-170px;}
        to {left:-10px;}
    }
    // 动态验真中
    .ani_dot {
        font-family: simsun; 
        // font-weight: bold;
        font-size: 13px;
        height: 12px;
    }
    :root .ani_dot { /* 这里使用Hack是因为IE6~IE8浏览器下， vertical-align解析不规范，值为bottom或其他会改变按钮的实际高度*/
        display: inline-block;
        width: 1.5em; 
        // vertical-align: bottom;
        overflow: hidden;
    }
    @-webkit-keyframes dot {
        0% { width: 0;  }
        33% { width: .5em; }
        66% { width: 1em; }
        100% { width: 1.5em; }
    }
    .ani_dot {
        -webkit-animation: dot 3s infinite step-start;
    }

    @keyframes dot {
        0% { width: 0;  }
        33% { width: .5em; }
        66% { width: 1em; }
        100% { width: 1.5em; }
    }
    .ani_dot {
        animation: dot 3s infinite step-start;
    }
    .not_dot {
        display:flex;
        align-items:center;
        justify-content:center;
        width: 93px;
        color: #67c23a;
        cursor: pointer;

    }
    .has_dot {
        display:flex;
        align-items:center;
        width:93px;
        line-height:1;
        color: #FF913C;
        cursor: pointer;
    }
    .failed {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 93px;
        color: #F56540;
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
        display: block
    }
    .unusual {
        color: #F56540
    }
    /deep/ .el-table__expanded-cell {
        background-color: #FCFCFF;
        padding: 40px 20px;
        :hover {
            // background: #FCFCFF;
            // background: red;
            
        }
    }
.fap {  
    /deep/ .el-dialog .el-dialog__body {
        background: url(../../../assets/images/sy.png);
    }
}
</style>

