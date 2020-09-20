<template>
    <div class="to-lead-a">
        <div class="mod pb0">
            <el-form :inline="true" ref="form" size="medium">
                <c-Search>
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
                        <el-select v-model="params.cancelFlag" clearable>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="已通过" value="0"></el-option>
                            <el-option label="已作废" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-select v-model="params.isMatch" clearable>
                            <el-option label="全部" value=""></el-option>
                            <el-option label="未核查" value="0"></el-option>
                            <el-option label="已核查" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="开票时间区间">
                        <el-date-picker v-model="params.startInvoiceDate" type="date" @change="clearFast" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker><span
                            style="color: #606266;margin:0 10px;">至</span>
                        <el-date-picker v-model="params.endInvoiceDate" type="date" @change="clearFast" :picker-options="pickerOptions2()" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange">
                            <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                </c-Search>
                <el-form-item>
                    <el-button type="primary" @click="params.pageNum = 1,getList()">搜索</el-button>
                    <el-button type="info" class="btn" @click="restForm">重置</el-button>
                    <el-button type="info" @click="exportData">导出</el-button>
                    <el-button type="primary" @click="isTbDialog2 = true">一键核查</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="mod">
            <el-table :data="list" style="width: 100%" @selection-change="toSelect" border>
                <!-- <el-table-column type="selection" label="" :selectable='checkboxT'></el-table-column> -->
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="invoiceCode" label="发票代码" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceNo" label="发票号码" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cancelFlag" label="验真结果">
                    <template slot-scope="item">
                        {{ item.row.cancelFlag === '0' ? '已通过' : '已作废' }}
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="发票备注" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="buyerName" label="发票购买方" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salerName" label="发票销售方" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceAmount" label="合计金额" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.invoiceAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taxAmount" label="合计税额" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template></el-table-column>
                <el-table-column prop="totalAmount" label="价税合计" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="数据来源" width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ item.row.source === '1' ? '发票易': ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="invoiceDate" label="开票日期" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="isMatch" label="状态">
                    <template slot-scope="item">
                        {{ item.row.isMatch === '0' ? '未核查' : '已核查' }}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="200" align="center">
                    <template slot-scope="item">
                        <el-button type="blue" plain size="mini" @click="isTbDialog=true,toDetail(item.row.id)">详情</el-button>
                        <el-button type="primary" plain size="mini" :disabled="item.row.isMatch === '1'" @click="isTbDialog1=true,toMatching(item.row)">核查</el-button>
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
            <el-table :data="detailList" border max-height="500">
                <el-table-column property="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column property="specificationModel" label="规格型号" show-overflow-tooltip></el-table-column>
                <el-table-column property="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column property="detailNumber" label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column property="unitPrice" label="不含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.unitPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="detailAmount" label="金额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.detailAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxRate" label="税率" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxRate | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxPrice" label="含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxAmount" label="税额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="totalAmount" label="价税合计" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 一键核查 -->
        <el-dialog v-if="isTbDialog2" :visible.sync="isTbDialog2" width="500px" custom-class="hecha" title="填写核查条件">
            <el-form :model="form1" ref="form1" size="medium" :rules="rules1" label-width="110px">
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="form1.customerName" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="所属板块" prop="industryCategory">
                    <el-select v-model="form1.industryCategory" clearable style="width:100%;" placeholder="请选择版块">
                        <el-option label="其他" value="0"></el-option>
                        <el-option label="基建" value="1"></el-option>
                        <el-option label="医药" value="2"></el-option>
                        <el-option label="能源" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务编号" prop="batchNum">
                    <el-input v-model="form1.batchNum" clearable placeholder="请输入业务编号"></el-input>
                </el-form-item>
                <el-form-item label="发票购买方">
                    <el-input v-model="form1.buyerName" clearable placeholder="请输入发票购买方"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" class="created-date">
                    <el-date-picker v-model="form1.createTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="开票时间区间" prop="value1">
                    <el-date-picker v-model="form1.value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn" size="medium" round plain @click="isTbDialog2=false">取消</el-button>
                <el-button type="primary" size="medium" round @click="doRen('form1')">确定</el-button>
            </span>
        </el-dialog>
        <!-- 核查 -->
        <el-dialog v-if="isTbDialog1" :visible.sync="isTbDialog1" width="400px" title="核查">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="客户名称">
                    <el-input disabled v-model="form.customerName"></el-input>
                </el-form-item>
                <el-form-item label="所属板块" prop="industryCategory">
                    <el-select v-model="form.industryCategory" clearable style="width:100%;">
                        <el-option label="其他" value="0"></el-option>
                        <el-option label="基建" value="1"></el-option>
                        <el-option label="医药" value="2"></el-option>
                        <el-option label="能源" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务编号" prop="batchNum">
                    <el-input v-model="form.batchNum" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn" size="medium" round plain @click="isTbDialog1=false">取消</el-button>
                <el-button type="primary" size="medium" round @click="doQue('form')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            totalSize: 0,
            isShow: false,
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            isData: false,
            isExport: false,
            isTbDialog1: false,
            isTbDialog2: false,
            value1: '',
            delID: '',
            params: {
                buyerName: '', // 发票购买方
                salerName: '', // 发票销售方
                invoiceNo: '', // 发票号码
                invoiceCode: '', // 发票代码
                cancelFlag: '', // 验真结果(0 已通过 1 已作废)
                isMatch: '', // 是否核查（0 否 1 是）
                startInvoiceDate: '', // 开票时间开始时间
                endInvoiceDate: '', // 开票时间结束时间
                pageNum: 1,
                pageSize: 10
            },
            form: {
                batchNum: '',// 业务编号 必填
                customerName: '', // 客户名称 必填
                industryCategory: '', // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                idList: '' // 发票易主键id 多个逗号隔开 必填
            },
            form1: {
                batchNum: '',// 业务编号 必填
                customerName: '', // 客户名称 必填
                industryCategory: '', // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                buyerName: '',  // 发票购买方
                salerName: '', // 必填  发票销售方
                createTime: '', //创建时间
                startInvoiceDate: '', // 开票日期开始时间 （区间必填）
                endInvoiceDate: '', // 开票日期结束时间
                value1: ''
            },
            value: '',
            rules: {
                industryCategory: [
                    { required: true, message: '请选择所属板块', trigger: 'change' }
                ],
                batchNum: [
                    { required: true, message: '请输入业务编号', trigger: 'blur' }
                ]
            },
            rules1: {
                customerName: [
                    { required: true, message: '请输入客户名称', trigger: 'change' }
                ],
                industryCategory: [
                    { required: true, message: '请选择所属板块', trigger: 'change' }
                ],
                batchNum: [
                    { required: true, message: '请输入业务编号', trigger: 'blur' }
                ],
                value1: [
                    { required: true, message: '请选择开票时间区间', trigger: 'blur' }
                ]
            },
            list: [],
            matchingList: [],
            detailList: [],
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
            isTbDialog: false,
            openList: [],
            isDis: false
        }
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            this.ajax.post('/invoice/rtc/invoice/list', this.params).then(res => {
                // console.log(res);
                this.list = res.data || []
                this.totalSize = res.meta.totalSize
            })
        },
        // 禁用多选框
        checkboxT (row, index) {
            return row.isMatch === '0'
        },
        // 详情
        toDetail (rtcInvoiceId) {
            this.ajax.post('/invoice/rtc/invoice/detail/list', { rtcInvoiceId }).then(res => {
                // console.log(res);
                this.detailList = res.data || []
            })
        },
        // 选择
        toSelect (v) {
            // console.log(v);
            this.matchingList = v
        },
        // 一键核查-确定
        doRen (formName) {
            this.$refs[formName].validate(v => {
                if (v) {
                    this.form1.salerName = this.form1.customerName
                    this.value = this.form1.value1
                    // console.log('value',this.value);
                    delete this.form1.value1
                    this.ajax.post('/invoice/rtc/invoice/conditionalMatch', this.form1, { isReturnMsg: true }).then(res => {
                        // console.log('outRes',res);
                        if (res.code === '200') {
                            this.isTbDialog2 = false
                            this.$message.success('发票核查中，请耐心等候')
                            this.form1 = {
                                batchNum: '',// 业务编号 必填
                                customerName: '', // 客户名称 必填
                                industryCategory: '', // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                                buyerName: '',  // 发票购买方
                                salerName: '', // 必填  发票销售方
                                createTime: '', //创建时间
                                startInvoiceDate: '', // 开票日期开始时间 （区间必填）
                                endInvoiceDate: '', // 开票日期结束时间
                                value1: ''
                            }
                            this.getList()
                        }
                    }).catch(err => {
                        // console.log(err);
                        this.$message.error(err.message)
                        this.form1.value1 = this.value
                    })
                } else {
                    return
                }
            })
        },
        // 一键核查
        // keyMatching(){
        //     this.form = {
        //         batchNum:"", // 业务编号 必填
        //         customerName:"", // 客户名称 必填
        //         industryCategory:"", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
        //         ids:"" // 发票易主键id 多个逗号隔开 必填
        //     }
        //     if ( this.matchingList.length === 0 ) return this.$message.error('请选择！')
        //     for ( var i = 0; i < this.matchingList.length; i++ ){
        //         for ( var j = 0; j < this.matchingList.length; j++ ){
        //             if ( this.matchingList[i].salerName !== this.matchingList[j].salerName ){
        //                 return this.$message.error('请选择同一家公司！')
        //             }
        //         }
        //     }
        //     this.form.ids = ''
        //     this.form.customerName = ''
        //     this.matchingList.forEach( v => {
        //         this.form.ids += v.id + ','
        //     })
        //     this.form.ids = this.form.ids.slice(0,this.form.ids.length-1)
        //     this.form.customerName =  this.matchingList[0].salerName
        //     // console.log('ids',this.form.ids);
        //     this.isTbDialog1 = true
        // },
        // 核查
        toMatching (row) {
            // console.log(row);
            this.form = {
                batchNum: "", // 业务编号 必填
                customerName: "", // 客户名称 必填
                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                idList: "" // 发票易主键id 多个逗号隔开 必填
            },
                this.form.customerName = row.salerName
            this.form.idList = row.id
        },
        // 核查-确定
        doQue (formName) {
            this.$refs[formName].validate(v => {
                if (v) {
                    this.ajax.post('/invoice/rtc/invoice/match', this.form).then(res => {
                        // console.log(res);
                        if (res.code === '200') {
                            this.$message.success('核查成功！')
                            this.isTbDialog1 = false
                            this.form = {
                                batchNum: "", // 业务编号 必填
                                customerName: "", // 客户名称 必填
                                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                                idList: "" // 发票易主键id 多个逗号隔开 必填
                            },
                                this.getList()
                        }
                    })
                } else {
                    return
                }
            })
        },

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
        restForm () {
            this.params = {
                buyerName: '', // 发票购买方
                salerName: '', // 发票销售方
                invoiceNo: '', // 发票号码
                invoiceCode: '', // 发票代码
                cancelFlag: '', // 验真结果(0 已通过 1 已作废)
                isMatch: '', // 是否核查（0 否 1 是）
                startInvoiceDate: '', // 开票时间开始时间
                endInvoiceDate: '', // 开票时间结束时间
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
            await this.ajax.exportFile(`/invoice/rtc/invoice/export`, this.params)
        },

    },
    mounted () {
    },
    watch: {
        "form1.value1" (n, o) {
            // console.log('n',n,'o',o);
            if (n && n.length > 0) {
                this.form1.startInvoiceDate = n[0]
                this.form1.endInvoiceDate = n[1]
            } else {
                this.form1.startInvoiceDate = 0[0]
                this.form1.endInvoiceDate = o[1]
            }
        }
    }

}
</script>
<style lang="less" scoped>
.created-date {
    /deep/ .el-form-item__content {
        .el-input {
            width: 100%;
        }
    }
}
/deep/ .el-button--success.is-plain {
    background: white;
    border-color: #67c23a;
}
/deep/ .el-button--success.is-plain:focus,
.el-button--success.is-plain:hover {
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
.compony-info {
    padding: 15px 43px;
    border: 1px solid #ebecf2;
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
                    color: #ffa955;
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .process-num {
                        font-size: 22px;
                        color: #f56a00;
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
                    background-color: #ffd4a5;
                    position: relative;
                    border-radius: 10px;
                }
                .bar {
                    width: 90px;
                    height: 100%;
                    position: absolute;
                    background-image: linear-gradient(90deg, #ffb05b 0px, #ff6225 90px);
                    border-radius: 10px;
                    // -webkit-transition-property:width;
                    // -webkit-transition-duration:1s;
                }
            }
            .log {
                height: 205px;
                background-color: #fff;
                border: 1px solid #e9ebf1;
                margin: 0 auto;
                overflow: auto;
                padding: 15px 30px;
                p {
                    color: #f56a00;
                    font-size: 14px;
                    margin-bottom: 18px;
                }
            }
        }
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
    color: #67c23a;
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
    background-color: #fcfcff;
    padding: 40px 20px;
    :hover {
        // background: #FCFCFF;
        // background: red;
    }
}
</style>
<style lang="less">
.hecha {
    /deep/ .el-date-editor {
        width: 100%;
        .el-range-separator {
            line-height: 28px;
        }
    }
}
</style>
