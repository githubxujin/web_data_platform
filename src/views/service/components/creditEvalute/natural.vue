<template>
    <div class="pt20 ">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.industryType' clearable placeholder='行业类别'>
                    <el-option v-for='(s,index) in plateList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width-300'>
                <el-autocomplete v-model="params.customerName" placeholder="企业名称" class='el-item-form-width-300' :fetch-suggestions="queryNatureAsync"></el-autocomplete>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-autocomplete v-model="params.personName" placeholder="自然人名称" class='el-item-form-width' :fetch-suggestions="querySearchAsync"></el-autocomplete>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' size='medium' @click='getList'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='personName' label='自然人名称' show-overflow-tooltip align='center' width="120"></el-table-column>
            <el-table-column prop='identityCode' label='身份证号' show-overflow-tooltip width="200" :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ scope.row.identityCode.substr(0,scope.row.identityCode.length-4)+'****'}}
                </template>
            </el-table-column>
            <el-table-column prop='industryType' label='行业类别' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{industryCategoryLabel(scope.row.industryType) }}
                </template>
            </el-table-column>
            <el-table-column prop='customerName' label='企业名称' show-overflow-tooltip width="200" :formatter="formatLabel"></el-table-column>
            <el-table-column prop='withRelations' label='与企业关系' show-overflow-tooltip width="120" :formatter="formatLabel"></el-table-column>
            <el-table-column prop='phone' label='手机号' show-overflow-tooltip width="120" :formatter="formatLabel"></el-table-column>
            <el-table-column prop='bankCard' label='银行卡号' show-overflow-tooltip width="200" :formatter="formatLabel"></el-table-column>
            <el-table-column prop='lastEvaluateTime' label='上次评估日期' show-overflow-tooltip width="140">
                <template slot-scope='scope'>
                    {{scope.row.lastEvaluateTime ? formatDate(scope.row.lastEvaluateTime) : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='status' label='状态' width="120" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.status ? evaluateStatusLabel(scope.row.status) : '-' }}
                </template>
            </el-table-column>

            <el-table-column prop='evaluateTime' label='评估日期' width="120" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.evaluateTime ?  formatDate(scope.row.evaluateTime) : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='lastEvaluateTime' label='上次评估日期' show-overflow-tooltip width="140">
                <template slot-scope='scope'>
                    {{scope.row.lastEvaluateTime ?  formatDate(scope.row.lastEvaluateTime ): '-'}}
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="90" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="toDetail(scope.row.id,scope.row.personName,scope.row.identityCode)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
        <dialog-detail ref="dialog" :list="detailList " :params="detailParams" :evaluateId="evaluateId" :companyName="companyName" type="nature" :identityCode="identityCode" />
    </div>
</template>
<script>
import { plateList, industryCategoryLabel, channelLabel, evaluateStatusLabel } from "@/utils/common"
import { formatDate } from "@/filters/index"
export default {
    components: {
        DialogDetail: () => import('@/views/operationConfig/components/creditEvalute/dialog-detail')
    },
    data () {
        return {
            plateList,
            params: {
                current: 1,
                size: 10,
                customerName: '',
                industryType: '',
                personName: ''
            },
            total: 0,
            list: [],
            dialogVisible: false,
            isEdit: false,
            detailList: [],
            evaluateId: NaN,
            detailParams: {
                current: 1,
                size: 10,
                total: 0,
            },
            companyName: '',
            identityCode: ''
        };
    },
    created () {
        this.getList()
    },
    methods: {
        queryNatureAsync (companyName, cb) {
            this.ajax
                .json('/dcp/person/evaluate/company/name', { companyName, industryType: this.params.industryType }, { type: 'get' })
                .then(res => {
                    let companyName = res.data.map(i => {
                        return {
                            value: i
                        }
                    })
                    cb(companyName)
                });
        },
        //自然人模糊查询
        querySearchAsync (personName, cb) {
            this.ajax
                .json('/dcp/person/evaluate/person/name', { personName, industryType: null, companyName: null }, { type: 'get' })
                .then(res => {
                    let companyName = res.data.map(i => {
                        return {
                            value: i
                        }
                    })
                    cb(companyName)
                });
        },
        evaluateStatusLabel,
        toDetail (evaluateId, companyName, identityCode) {
            this.evaluateId = evaluateId
            this.companyName = companyName
            this.identityCode = identityCode
            this.ajax
                .json('/dcp/person/evaluate/detail/page/list', { evaluateId })
                .then(res => {
                    this.detailList = res.data.records
                    this.detailParams.total = res.data.total
                    this.$refs.dialog.dialogVisible = true

                });
        },

        getDetail (id, type, status = 1) {
            this.ajax
                .json(`/dcp/person/evaluate/detail/${id}`, {}, { type: 'get' })
                .then(res => {
                    if (type === 'edit') {
                        this.isEdit = true
                        this.$refs.person.ruleForm = res.data
                        this.dialogVisible = true
                    } else if (type === 'evaluate') {
                        this.$refs.evaluate.ruleForm = res.data
                        this.$refs.evaluate.status = status
                        this.$refs.evaluate.dialogVisible = true
                    }

                });
        },


        formatDate,
        industryCategoryLabel,
        channelLabel,
        getList () {
            this.ajax
                .json('/dcp/person/evaluate/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                customerName: '',
                industryType: '',
                personName: ''
            }
            this.getList();
        }
    }
};
</script>