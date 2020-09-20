<template>
    <div class="pt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.invoiceCode' clearable placeholder='发票代码'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.invoiceStartNo' clearable placeholder='开始发票号码'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.invoiceEndNo' clearable placeholder='结束发票号码'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.sellerName' clearable placeholder='销售方名称'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.buyerNameList' clearable placeholder='购买方名称'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.isRed' clearable placeholder='是否冲红'>
                    <el-option v-for='(s,index) in isRedList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.cancelFlag' clearable placeholder='发票状态'>
                    <el-option v-for='(s,index) in cancelFlagList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.invoiceType' clearable placeholder='发票类型'>
                    <el-option v-for='(s,index) in invoiceTypeList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.invoiceComment' clearable placeholder='发票备注'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.usedFlag' clearable placeholder='转让状态'>
                    <el-option v-for='(s,index) in usedFlagList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params.usedCode' clearable placeholder='转让编号'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.invoiceTag' clearable placeholder='内容标识'>
                    <el-option v-for='(s,index) in invoiceTagList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开票开始日期' end-placeholder='开票结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click='current=1;getList()'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='invoiceType' label='发票类型' width='200' show-overflow-tooltip align='left'>
                <template slot-scope='scope'>
                    {{ invoiceTypeLabel(scope.row.invoiceType)}}
                </template>
            </el-table-column>
            <el-table-column prop='invoiceCode' label='发票代码' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceNo' label='发票号码' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='buyerName' label='购买方名称' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='sellerName' label='销售方名称' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceAmount' label='不含税价' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.invoiceAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop='totalAmount' label='价税合计' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.totalAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop='effectiveAmount' label='有效金额' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.effectiveAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop='invoiceDate' label='开票日期' width="140" show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceComment' label='发票备注' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceTag' label='内容标识' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ invoiceTagLabel(scope.row.invoiceTag) }}
                </template>
            </el-table-column>
            <el-table-column prop='isRed' label='是否冲红' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ isRedLabel(scope.row.isRed)}}
                </template>
            </el-table-column>
            <el-table-column prop='invoiceRedDate' label='冲红日期' show-overflow-tooltip></el-table-column>
            <el-table-column prop='cancelFlag' label='发票状态' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ cancelFlagLabel(scope.row.cancelFlag) }}
                </template>
            </el-table-column>
            <el-table-column prop='usedFlag' label='是否被转让' width='100' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  usedFlagLabel(scope.row.usedFlag)}}
                </template>
            </el-table-column>
            <el-table-column prop='usedCode' label='转让编号' show-overflow-tooltip></el-table-column>
            <el-table-column prop='remark' label='操作' width='200' align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="toDetail(scope.row.id)" type="primary" size="small" plain>详情</el-button>
                    <el-button @click="toCheck(scope.row.id)" type="info" size="small" plain>验真</el-button>
                    <el-button @click="toRecord(scope.row.id)" type="info" size="small" plain>记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" @size-change="getList()" :page-size.sync="params.size" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>

        <!-- 内容详情 -->
        <el-dialog :visible.sync="isTbDialog" width="800px" title="内容详情" top="35vh">
            <el-table :data="detailList" max-height="500">
                <el-table-column property="productName" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column property="spec" label="规格型号" show-overflow-tooltip></el-table-column>
                <el-table-column property="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column property="quantity" label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column property="noTaxPrice" label="不含税价" show-overflow-tooltip align="right" width="150">
                    <template slot-scope="item">
                        {{ item.row.noTaxPrice |  numFormat }}
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
        <!-- 查看验真记录 -->
        <el-dialog :visible.sync="Dialog" width="800px" title="记录" top="35vh">
            <el-table :data="recordList" border max-height="500">
                <el-table-column property="checkDate" label="查验日期" show-overflow-tooltip></el-table-column>
                <el-table-column property="checkResult" label="查验结果" show-overflow-tooltip>
                    <template slot-scope='scope'>
                        {{ checkResultLabel(scope.row.checkResult )}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="toInvoiceDetail(scope.row.invoiceId,scope.row.checkDate,recordList.length)" type="primary" size="small" plain>查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--  -->
        <div class="faw">
            <el-dialog class="fap" :visible.sync="dialogVisible" width="1200px">
                <span>
                    <info :account="account" :date="date" :count="count" @closebox="v=>{dialogVisible=false}"></info>
                </span>
                <span slot="footer">
                    <el-button type="primary" @click="dialogVisible = false" size="mini">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<style lang="scss" scoped>
/deep/ .faw .el-dialog__body {
    background-color: #fff;
    background-image: url('../../assets/images/sy.3de6b680.png');
}

/deep/ .faw .el-dialog__header {
    background-color: #fff;
    border: none;
    padding: 0;
}

/deep/ .faw .el-dialog__footer {
    border-top: 1px solid #e2e4ed;
    background-color: #f5f6fa;
}

/deep/ .faw .el-button--primary {
    color: #fff;
    background-color: #fa8e3a;
    border-color: #fa8e3a;
}
</style>
<script>
import {    invoiceTagLabel, cancelFlagLabel, isRedLabel, usedFlagLabel,
    invoiceTypeLabel, cancelFlagList, checkResultLabel,
    isRedList, usedFlagList, invoiceTypeList} from "@/utils/common"
import info from "@/components/Invoice/common/info.vue";
export default {
    components: {
        info
    },
    data () {
        return {
            invoiceTagList: [
                {
                    label: '未知',
                    value: 0
                },
                {
                    label: '正常',
                    value: 1
                },
                {
                    label: '异常',
                    value: 2
                },
            ],
            account: {},
            dateArr: [],
            isTbDialog: false,
            Dialog: false,
            dialogVisible: false,
            params: {
                current: 1,
                size: 10,
                invoiceStartNo: "",
                invoiceEndNo: "",
                "invoiceCode": "",
                "invoiceComment": "",
                "invoiceNoList": [],
                "invoiceType": "",
                "isRed": "",
                invoiceEndDate: "",
                buyerNameList: ""

            },
            total: 0,
            list: [],
            detailList: [],
            recordList: [],
            cancelFlagList,
            isRedList,
            usedFlagList,
            invoiceTypeList,
            date: '',
            count: ''
        };
    },
    created () {
        this.getList();
    },
    methods: {

        exportData () {
            this.$http('/dcp//export/invoice/easy/output/list', this.params, { type: 'export' }).then(res => {
            });
        },
        toInvoiceDetail (id, date, count) {
            console.log(id)
            this.$http('/dcp/get/check/invoice/detail', { id }, { type: 'get' }).then(res => {
                this.account = res.data
                this.date = date
                this.count = count
                this.dialogVisible = true;


            });
        },
        toRecord (id) {
            this.Dialog = true;
            this.$http('/dcp/select/invoice/check/record', { id }, { type: 'get' }).then(res => {
                this.recordList = res.data
            });
        },
        toCheck (id) {
            this.$http(
                "/dcp/add/check/invoice",
                {
                    id
                },
                { type: "get" }
            ).then(res => {
                this.$message({ type: 'success', message: '验真成功' })
            });
        },
        toDetail (id) {
            this.isTbDialog = true;
            this.$http(
                "/dcp/get/invoice/easy/output/detail",
                {
                    id
                },
                { type: "get" }
            ).then(res => {
                this.detailList = res.data || [];
            });
        },
        reSet () {
            this.dateArr = []
            this.params = {
                current: 1,
                size: 10,
                buyerNameList: "",
                "invoiceCode": "",
                "invoiceComment": "",
                "invoiceNoList": [],
                "invoiceType": "",
                "isRed": "",
                invoiceStartDate: "",
                invoiceEndDate: "",
            }
            this.getList()
        },
        cancelFlagLabel,
        isRedLabel,
        usedFlagLabel,
        invoiceTypeLabel,
        checkResultLabel,
        invoiceTagLabel,
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.invoiceStartDate = v[0];
                this.params.invoiceEndDate = v[1];
            } else {
                this.params.invoiceStartDate = '';
                this.params.invoiceEndDate = '';
            }
        },
        getList () {
            let data = { ...this.params }
            data.buyerNameList = this.params.buyerNameList ? [this.params.buyerNameList] : []
            this.$http('/dcp/select/invoice/easy/output/page/list', data).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            });
        },
    }
};
</script>