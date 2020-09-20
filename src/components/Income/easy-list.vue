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
            <el-table-column prop='invoiceType' label='发票类型' width='100' show-overflow-tooltip align='center'>
                <template slot-scope='scope'>
                    {{invoiceTypeLabel(scope.row.invoiceType) }}
                </template>
            </el-table-column>
            <el-table-column prop='invoiceCode' label='发票代码' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceNo' label='发票号码' width='100' show-overflow-tooltip></el-table-column>
            <el-table-column prop='buyerNameList' label='购买方名称' width='140' show-overflow-tooltip></el-table-column>
            <el-table-column prop='sellerName' label='销售方名称' width='200' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceAmount' label='不含税价' show-overflow-tooltip></el-table-column>
            <el-table-column prop='totalAmount' label='价税合计' show-overflow-tooltip></el-table-column>
            <el-table-column prop='invoiceDate' label='开票日期' show-overflow-tooltip></el-table-column>
            <el-table-column prop='isRed' label='是否冲红' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ isRedLabel(scope.row.isRed)}}
                </template>
            </el-table-column>
            <el-table-column prop='cancelFlag' label='发票状态' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ cancelFlagLabel(scope.row.cancelFlag) }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size="params.size" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total"
            v-if="total > 0">
        </el-pagination>
    </div>
</template>
<script>
import {    cancelFlagLabel, isRedLabel, usedFlagLabel,
    invoiceTypeLabel, cancelFlagList, checkResultLabel,
    isRedList, usedFlagList, invoiceTypeList} from "@/utils/common"
export default {
    components: {},
    data () {
        return {
            dateArr: [],
            params: {
                current: 1,
                size: 10,
                invoiceStartNo: "",
                invoiceEndNo: "",
                "invoiceCode": "",
                "invoiceComment": "",
                "invoiceEndDate": "",
                "invoiceNoList": [],
                "invoiceStartDate": "",
                "invoiceType": "",
                "isRed": "",

            },
            total: 0,
            list: [],
            cancelFlagList,
            isRedList,
            usedFlagList,
            invoiceTypeList,
        };
    },
    created () {
        this.getList();
    },
    methods: {
        reSet () {
            this.dateArr = []
            this.params = {
                current: 1,
                size: 10,
                invoiceStartNo: "",
                invoiceEndNo: "",
                "invoiceCode": "",
                "invoiceComment": "",
                "invoiceEndDate": "",
                "invoiceNoList": [],
                "invoiceStartDate": "",
                "invoiceType": "",
                "isRed": "",

            }
            this.getList()
        },
        exportData () {
            this.$http('/dcp//export/invoice/easy/income/list', this.params, { type: 'export' }).then(res => {
            });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.invoiceStartDate = v[0];
                this.params.invoiceEndDate = v[1];
            } else {
                this.params.invoiceStartDate = '';
                this.params.invoiceEndDate = '';
            }
        },
        cancelFlagLabel,
        isRedLabel,
        usedFlagLabel,
        invoiceTypeLabel,
        checkResultLabel,
        getList () {
            this.$http('/dcp/select/invoice/easy/income/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            });
        }
    }
};
</script>