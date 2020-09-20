<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">发票明细匹配数量比例</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item>
                    <el-select v-model='params.salerName' clearable placeholder="销售方" style="width: 160px">
                        <el-option v-for="(v,i) in salerNameList" :key="i" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model='params.buyerName' clearable placeholder="付款方" style="width: 300px" filterable remote :remote-method="getBuyerName">
                        <el-option v-for="v in buyerNameList" :key="v" :label="v" :value="v">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.invoiceCode" maxlength="20" clearable placeholder="发票代码"></el-input>

                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.invoiceNo" maxlength="20" clearable placeholder="发票号码"></el-input>

                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.productType" maxlength="20" clearable placeholder="产品种类"></el-input>

                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.productName" maxlength="20" clearable placeholder="产品名称"></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.specificationModel" maxlength="20" clearable placeholder="规格型号">
                    </el-input>
                </el-form-item>

                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.unit" maxlength="20" clearable placeholder="单位"></el-input>
                </el-form-item>
                <el-form-item style="width: 160px">
                    <el-select v-model='params.cancelFlag' clearable placeholder="状态" style="width: 160px">
                        <el-option label="有效" value="0"></el-option>
                        <el-option label="作废" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 160px">
                    <el-select v-model='params.matchResult' clearable placeholder="匹配结果" style="width: 160px">
                        <el-option label="不适用" value="-1"></el-option>
                        <el-option label="未匹配" value="0"></el-option>
                        <el-option label="匹配1" value="1"></el-option>
                        <el-option label="匹配2" value="2"></el-option>
                        <el-option label="匹配3" value="3"></el-option>
                        <el-option label="匹配4" value="4"></el-option>
                        <el-option label="匹配5" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 350px">
                    <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current = 1 ,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></span>
                </el-tooltip>
            </el-row>

            <el-table :data="list" style="width: 100%">
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <template v-for='(item,index) in allTableArr'>
                    <el-table-column v-if="item.propName==='matchResult'" :key="item.propName" width="100">
                        <template slot="header">
                            匹配结果
                            <el-tooltip popper-class="tip-item" class="item" effect="dark" content="" placement="top-start">
                                <span slot="content">
                                    匹配1：发票(发票号码 + 产品名称 + 数量 + 价税合计 + 付款方) = 流向(发票号码 + 产品名称 + 数量 + 金额 + 下游)<br />
                                    匹配2：发票(发票号码 + 产品名称 + 价税合计 + 付款方) = 流向(发票号码 + 产品名称 + 金额 + 下游)<br />
                                    匹配3：发票(发票号码 + 产品名称 + 规格 + 数量 + 价税合计 + 付款方) = 流向(发票号码 + 产品名称 + 规格 +∑数量 +∑价税合计 + 下游)<br />
                                    匹配4：发票(发票号码 + 产品名称 + 规格 +∑数量 +∑价税合计 + 付款方) = 流向(发票号码 + 产品名称 + 规格 + 数量 + 价税合计 + 下游)<br />
                                    匹配5：发票(发票号码 + 产品名称 + 规格 +∑数量 +∑价税合计 + 付款方)
                                    流向(发票号码 + 产品名称 + 规格 + 数量 + 价税合计 + 下游)<br />
                                </span> <i class="iconfont icon-tongyong-shuomingtishitubiao"></i>
                            </el-tooltip>
                        </template>
                        <template slot-scope="scope">
                            {{ scope.row.matchResult | matchResult }}
                        </template>
                    </el-table-column>
                    <el-table-column v-else-if="item.propName==='cancelFlag'" :key="item.propName" width="100" :label="item.title">
                        <template slot-scope="scope">
                            {{ scope.row.cancelFlag=== 0 ? "有效" : "作废" }}
                        </template>
                    </el-table-column>
                    <el-table-column v-else :label="item.title" :min-width="item.width" :align="item.titleAlign" :prop='item.propName' show-overflow-tooltip :key="index" :formatter="item.formatterFun"
                        :sortable="item.sortable"></el-table-column>
                </template>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page.sync="params.current" :page-sizes="[10, 20, 50, 100]" :page-size="params.size"
                layout="total, sizes, prev, pager, next, jumper" :total.sync='totalSize'></el-pagination>
        </div>
    </div>
</template>

<script>
import { formatDate, numFormat } from '@/filters/index'
export default {
    data () {
        return {
            newItemDialog: false,
            totalSize: 0,
            params: {
                current: 1, //页码
                size: 10, //每页条数
                startInvoiceDate: '', //发票开始时间
                endInvoiceDate: '', //发票结束时间
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: [], // 购买方
                invoiceCode: '', // 发票代码
                invoiceNo: '', // 发票号码
                productType: '', // 商品类型
                productName: '', // 商品名称
                specificationModel: '', // 商品规格
                unit: '', // 单位
                cancelFlag: '', // 状态(0 有效 1 作废)
                matchResult: '' // 匹配结果(0:未匹配，1：匹配1，2：匹配2)
            },
            salerNameList: [],
            buyerNameList: [],
            backList: [],
            num: 0,
            names: [],
            list: [],
            value1: [],
            // 默认显示的字段
            defaultKeys: [
                'invoiceNo',
                'invoiceDate',
                'salerName',
                'buyerName',
                'productName',
                'specificationModel',
                'unit',
                'detailNumber',
                'taxPrice',
                'totalAmount',
                'invoiceTimeInterval',
                'matchResult'
            ],
            tableArr: [],
            allTableArr: [
                // 全部字段
                {
                    propName: 'invoiceCode',
                    title: '发票代码',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true,
                    sortable: false
                },
                {
                    propName: 'invoiceNo',
                    title: '发票号码',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'invoiceDate',
                    title: '开票日期',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'salerName',
                    title: '销售方',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'buyerName',
                    title: '付款方',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center'
                },
                {
                    propName: 'productType',
                    title: '产品种类',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'left',
                    longTxt: true
                },
                {
                    propName: 'productName',
                    title: '产品名称',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'specificationModel',
                    title: '规格型号',
                    width: 140,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'unit',
                    title: '单位',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'detailNumber',
                    title: '数量',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'center',
                    longTxt: true
                },
                {
                    propName: 'unitPrice',
                    title: '单价',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'right',
                    formatterFun: (row, column, cellValue, index) => numFormat(cellValue)
                },
                {
                    propName: 'taxPrice',
                    title: '含税单价',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'right',
                    formatterFun: (row, column, cellValue, index) => numFormat(cellValue)
                },
                {
                    propName: 'detailAmount',
                    title: '金额',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'right',
                    formatterFun: (row, column, cellValue, index) => numFormat(cellValue)
                },
                {
                    propName: 'taxRate',
                    title: '税率',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'left'
                },
                {
                    propName: 'taxAmount',
                    title: '税额',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'right',
                    formatterFun: (row, column, cellValue, index) => numFormat(cellValue)
                },
                {
                    propName: 'totalAmount',
                    title: '价税合计',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'right',
                    formatterFun: (row, column, cellValue, index) => numFormat(cellValue)
                },
                {
                    propName: 'cancelFlag',
                    title: '状态',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'left',
                    longTxt: true,
                    formatterFun: this.formatter1
                },
                {
                    propName: 'invoiceTimeInterval',
                    title: '开票间隔/天',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'left',
                    longTxt: true
                },
                {
                    propName: 'matchResult',
                    title: '匹配结果',
                    width: 100,
                    titleAlign: 'left',
                    columnAlign: 'left',
                    longTxt: true,
                    formatterFun: this.formatter
                }
            ],
            pickerOptions1: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            }
        }
    },
    created () {
        // 开票区间时间默认7天
        this.getCurrentDate()
        this.getSalerName()
        this.getBuyerName()
        this.getList()
        this.tableArr = this.allTableArr.filter(i => {
            return this.defaultKeys.includes(i.propName)
        })
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startInvoiceDate = v[0]
                this.params.endInvoiceDate = v[1]
            } else {
                this.params.startInvoiceDate = ''
                this.params.endInvoiceDate = ''
            }
        },
        handleSizeChange (val) {
            this.params.size = val
            this.getList()
        },
        // 计算当前日期和7天前的日期
        getCurrentDate () {
            var d = new Date()
            this.params.endInvoiceDate = formatDate(d)
            var sevenDate = new Date(new Date().setDate(new Date().getDate() - 30))
            this.params.startInvoiceDate = formatDate(sevenDate)
            this.value1.push(this.params.startInvoiceDate, this.params.endInvoiceDate)
        },
        // 获取销售方
        getSalerName () {
            this.$http('/dcp/query/seller/list', {}, { type: 'get' }).then(res => {
                this.salerNameList = res.data || []
            })
        },
        // 获取付款方
        getBuyerName (name) {
            if (name) {
                this.$http(
                    '/dcp/query/buyer/list',
                    { name, sellerName: this.params.salerName },
                    { type: 'get' }
                ).then(res => {
                    this.buyerNameList = res.data || []
                })
            } else {
                this.$http(
                    '/dcp/query/buyer/list',
                    { name: '', sellerName: this.params.salerName },
                    { type: 'get' }
                ).then(res => {
                    this.buyerNameList = [...res.data, ...this.buyerNameList]
                    this.buyerNameList = [...new Set(this.buyerNameList)]
                })
            }
        },
        changeVal (v) { },
        toSearch (v) {
            this.getBuyerName(v)
        },
        // 销售方改变 付款方同步改变
        changeSaler () {
            this.getBuyerName()
        },
        getList () {
            this.$http('/dcp/query/invoice/detail/page', this.params, {
                type: 'formdata'
            }).then(res => {
                console.log(res, 'getList')
                console.log(res.data.records)
                this.list = res.data.records || []
                this.totalSize = res.data.total
            })
        },
        // 导出
        async exportData () {
            await this.$http('/dcp/query/invoice/detail/export', this.params, {
                type: 'export'
            })
        },
        formatter1 (v) {
            // console.log('v',v);
            return v.cancelFlag === 0 ? '有效' : '作废'
        },
        formatter (v) {
            return v.matchResult === 0
                ? '未匹配'
                : v.matchResult === 1
                    ? '匹配1'
                    : v.matchResult === 2
                        ? '匹配2'
                        : '不适用'
        },
        pickerOptions2 () {
            let startInvoiceDate = ''
            this.params.b && (startInvoiceDate = this.params.b + ' 00:00:00')
            return {
                disabledDate (time) {
                    return new Date(time) < new Date(startInvoiceDate)
                }
            }
        },
        // 重置
        reSet () {
            this.params = {
                current: 1, //页码
                size: 10, //每页条数
                startInvoiceDate: '', //发票开始时间
                endInvoiceDate: '', //发票结束时间
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: [], // 购买方
                invoiceCode: '', // 发票代码
                invoiceNo: '', // 发票号码
                productType: '', // 商品类型
                productName: '', // 商品名称
                specificationModel: '', // 商品规格
                unit: '', // 单位
                cancelFlag: '', // 状态(0 有效 1 作废)
                matchResult: '' // 匹配结果(0:未匹配，1：匹配1，2：匹配2)
            };
            this.value1 = [];
            this.getCurrentDate();
            this.getList();
        }
    },
    filters: {
        matchResult (key) {
            switch (key) {
                case -1:
                    return '不适用'
                case 0:
                    return '未匹配'
                case 1:
                    return '匹配1'
                case 2:
                    return '匹配2'
                case 3:
                    return '匹配3'
                case 4:
                    return '匹配4'
                case 5:
                    return '匹配5'
                default:
                    break
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
