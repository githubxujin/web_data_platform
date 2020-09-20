<template>
    <div class="pt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.customerName" placeholder="企业名称" clearable></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.otherAccountName1" placeholder="对方户名" clearable></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.incomeMark' clearable placeholder='交易类型'>
                    <el-option v-for='(s,index) in incomeMarkList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.changeAmount" placeholder="交易金额" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder="交易日期" end-placeholder="交易日期" align="right">
                </el-date-picker>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.source' clearable placeholder='监控类型' @change="changeSource">
                    <el-option v-for='(s,index) in  sourceList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <template v-if="type===1">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.accountNum" placeholder="账户" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.industryCategory' clearable placeholder='行业类别'>
                        <el-option v-for='(s,index) in plateList' :label='s.label' :value='s.value' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.accountBankName" placeholder="银行名称" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.phoneNum" placeholder="接收手机号" clearable></el-input>
                </el-form-item>
            </template>
            <template v-else-if="type===2">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.mainAccountName" placeholder="主账户户名" clearable></el-input>
                </el-form-item>

                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.mainAccountNum" placeholder="主账户" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.accountBankName' clearable placeholder='银行名称'>
                        <el-option v-for='(s,index) in bankNameList' :label='s' :value='s' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.flowNum" placeholder="流水号" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.otherAccountNum1" placeholder="对方账号" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-select v-model='params.tradeStatus' clearable placeholder='交易状态'>
                        <el-option v-for='(s,index) in  tradeStatusList' :label='s.label' :value='s.value' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

            </template>
            <template v-else-if="type===3 ">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.accountNum" placeholder="账户" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.flowNum" placeholder="流水号" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.mainAccountName" placeholder="主账户户名" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.mainAccountNum" placeholder="主账户" clearable></el-input>
                </el-form-item>
            </template>
            <template v-else-if="type===4">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.accountNum" placeholder="账户" clearable></el-input>
                </el-form-item>
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.flowNum" placeholder="流水号" clearable></el-input>
                </el-form-item>
            </template>
            <el-form-item>
                <el-button type='primary' size='medium' @click='current=1;getList()'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='industryCategory' label='行业类别' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  industryCategoryLabel(scope.row.industryCategory) }}
                </template>
            </el-table-column>
            <el-table-column prop='customerName' label='企业名称' show-overflow-tooltip width="210">
                <template slot-scope='scope'>
                    <div>
                        {{ scope.row.customerName ? scope.row.customerName : '-'}}
                    </div>

                </template>
            </el-table-column>
            <el-table-column prop='accountNum' label='账户' width='180' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.accountNum ? scope.row.accountNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='mainAccountName' label='主账户户名' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.mainAccountName ?scope.row.mainAccountName : '-' }}
                </template>
            </el-table-column>
            <el-table-column prop='mainAccountNum' label='主账户' width="200">
                <template slot-scope='scope'>
                    {{ scope.row.mainAccountNum ? scope.row.mainAccountNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='accountBankName' label='银行名称' show-overflow-tooltip width="150">
                <template slot-scope='scope'>
                    {{ scope.row.accountBankName ? scope.row.accountBankName : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='tradeDate' label='交易日期' width="120">
                <template slot-scope='scope'>
                    {{ scope.row.tradeDate ? formatDate(scope.row.tradeDate,'YYYY-MM-DD') : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='tradeDate' label='交易时间' width="120">
                <template slot-scope='scope'>
                    {{ scope.row.tradeDate ? formatDate(scope.row.tradeDate,'HH:mm:ss') : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='incomeMark' label='交易类型' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.incomeMark ? scope.row.incomeMark : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='tradeAmount' label='交易金额' show-overflow-tooltip width="120">
                <template slot-scope='scope'>
                    {{ scope.row.tradeAmount | numFormat2}}
                </template>
            </el-table-column>
            <el-table-column prop='otherAccountName1' label='对方户名' show-overflow-tooltip width="200">
                <template slot-scope='scope'>
                    {{ scope.row.otherAccountName1 ? scope.row.otherAccountName1 : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='otherAccountNum1' label='对方账号' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.otherAccountNum1 ? scope.row.otherAccountNum1 : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='otherBankName1' label='对方开户行行名' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.otherBankName1 ? scope.row.otherBankName1 : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='otherAccountName2' label='对方户名2' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.otherAccountName2 ? scope.row.otherAccountName2 : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='otherAccountNum2' label='对方账号2' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.otherAccountNum2 ? scope.row.otherAccountNum2 : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='flowNum' label='流水号' show-overflow-tooltip width="140">
                <template slot-scope='scope'>
                    {{ scope.row.flowNum ? scope.row.flowNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='serialNum' label='流水序号' show-overflow-tooltip width="140">
                <template slot-scope='scope'>
                    {{ scope.row.serialNum ? scope.row.serialNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='businessSummary' label='业务摘要' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.businessSummary ? scope.row.businessSummary : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='postscript' label='附言' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.postscript ? scope.row.postscript : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop=' businessType' label='业务类型' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.businessType ? scope.row.businessType : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='systemCode' label='系统号' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.systemCode ? scope.row.systemCode : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='voucherType' label='凭证类型' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.voucherType ? scope.row.voucherType : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='voucherNum' label='凭证号码' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.voucherNum ? scope.row.voucherNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='isCashSweep' label='是否归集流水' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  isCashSweepLabel(scope.row.isCashSweep) }}
                </template>
            </el-table-column>
            <el-table-column prop='tradeStatus' label='交易状态' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  tradeStatusLabel(scope.row.tradeStatus) }}
                </template>
            </el-table-column>
            <el-table-column prop='remark' label='备注' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  scope.row.remark ? scope.row.remark : '-'}}
                </template> >
            </el-table-column>
            <el-table-column prop='phoneNum' label='接收手机号' width='120' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.phoneNum ?  scope.row.phoneNum : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='source' label='监控类型' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  sourceLabel(scope.row.source) }}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template slot-scope="scope">
                    <el-button @click="toDetail(scope.row,scope.row.moreInfo)" type="primary" size="small" plain>详情</el-button>
                </template>
            </el-table-column>
            <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList'
                layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
            </el-pagination>

        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
        <!-- 短信提醒详情 -->
        <el-dialog title='短信提醒详情' :visible.sync='dialogVisible' width='680px' top="21vh">
            <p class="remark-text">{{ this.detail }}</p>
        </el-dialog>

    </div>
</template>
<script>
import { plateList, industryCategoryLabel, tradeStatusLabel, sourceLabel, isCashSweepLabel } from "@/utils/common"
export default {
    data () {
        return {
            plateList,
            dialogVisible: false,
            type: 0,
            detail: {},
            dateArr: [],
            params: {
                changeAmount: '',
                current: 1,
                size: 10,
                incomeMark: '',
                source: '',
                otherAccountName1: '',
                tradeDateStart: '',
                tradeDateEnd: '',
                mainAccountNum: '',
                mainAccountName: '',
                industryCategory: '',
                customerName: '',
                accountBankName: '',
                phoneNum: '',
                otherAccountNum1: '',
                flowNum: '',
                tradeStatus: '',
                isCashSweep: '',
                accountNum: '',
            },
            bankNameList: [],
            total: 0,
            list: [],
            sourceList: [
                {
                    label: '监控类型',
                    value: ''
                },
                {
                    label: '猫池',
                    value: 1
                },
                {
                    label: '主账户',
                    value: 2
                },
                {
                    label: '二级账户',
                    value: 3
                },
                {
                    label: '手工采集',
                    value: 4
                }
            ],
            incomeMarkList: [
                {
                    label: '收入',
                    value: '收入'
                },
                {
                    label: '支出',
                    value: '支出'
                }
            ],
            isCashSweepList: [
                {
                    label: '否',
                    value: 0
                },
                {
                    label: '是',
                    value: 1
                },
            ],
            tradeStatusList: [
                {
                    label: '正常',
                    value: 0
                },
                {
                    label: '被抹账',
                    value: 1
                },
                {
                    label: '处理中',
                    value: 2
                },
            ]
        };
    },
    created () {
        this.getList()
    },
    methods: {
        //获取银行
        getBankName () {
            this.ajax
                .json('/dcp/comm/sms/statistics/bank/name', {})
                .then(res => {
                    this.bankNameList = res.data
                });
        },
        sourceLabel,
        tradeStatusLabel,
        industryCategoryLabel,
        isCashSweepLabel,
        toDetail (row, moreInfo) {
            if (row.source === 1) {
                this.detail = moreInfo
                this.dialogVisible = true
            } else if (row.source === 2) {
                this.$router.push({ name: 'service-money-water-main-detail', query: { ...row, way: 2 } })
            } else if (row.source === 3) {
                this.$router.push({ name: 'service-money-water-detail', query: { ...row, way: 3 } })
            } else if (row.source === 4) {
                this.$router.push({ name: 'service-money-water-bank-detail', query: { ...row, way: 3 } })
            }
        },
        changeSource (val) {
            this.params = Object.assign(this.params, {
                current: 1,
                size: 10,
                mainAccountNum: '',
                mainAccountName: '',
                industryCategory: '',
                accountBankName: '',
                phoneNum: '',
                otherAccountNum1: '',
                flowNum: '',
                tradeStatus: '',
                isCashSweep: '',
                accountNum: '',
            })
            this.type = val;
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.tradeDateStart = v[0];
                this.params.tradeDateEnd = v[1];
            } else {
                this.params.tradeDateStart = '';
                this.params.tradeDateEnd = '';
            }
        },
        getList () {
            this.ajax
                .json('/dcp/comm/bank/trade/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.dateArr = []
            this.params = {
                changeAmount: '',
                current: 1,
                size: 10,
                incomeMark: '',
                source: '',
                otherAccountName1: '',
                tradeDateStart: '',
                tradeDateEnd: '',
                mainAccountNum: '',
                mainAccountName: '',
                industryCategory: '',
                customerName: '',
                accountBankName: '',
                phoneNum: '',
                otherAccountNum1: '',
                flowNum: '',
                tradeStatus: '',
                isCashSweep: '',
                accountNum: '',
            }
            this.type = 1
            this.getList()
        }
    }
};
</script>

<style lang="scss" scoped>
.remark-text {
    color: rgba(255, 255, 255, 0.8);
    line-height: 30px;
}
.light {
    .remark-text {
        color: #666;
        line-height: 30px;
    }
}
</style>