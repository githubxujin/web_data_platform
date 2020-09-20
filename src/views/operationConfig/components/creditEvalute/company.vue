<template>
    <div class="pt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.industryType' clearable placeholder='行业类别' class='el-item-form-width'>
                    <el-option v-for='(s,index) in plateList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width-300'>
                <el-autocomplete v-model="params.customerName" placeholder="企业名称" class='el-item-form-width-300' :fetch-suggestions="querySearchAsync"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click='getList'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='新增' placement='top'>
                <i class='iconfont icon-shujuzhongxin-xinzeng' @click="addCustomer"></i>
            </el-tooltip>
        </el-row>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='customerName' label='企业名称' show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop='creditCode' label='统一社会信用代码' show-overflow-tooltip :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="regNumber" label="注册号" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop='industryType' label='行业类别' width="80" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ industryCategoryLabel(scope.row.industryType) }}
                </template>
            </el-table-column>

            <el-table-column prop='lastEvaluateTime' label='上次评估日期' width="120" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ scope.row.lastEvaluateTime ? formatDate(scope.row.lastEvaluateTime) : '-'}}
                </template>
            </el-table-column>

            <el-table-column prop='evaluateTime' label='评估日期' width="120" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ scope.row.evaluateTime ?  formatDate(scope.row.evaluateTime) : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop='status' label='状态' width="120" show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{ evaluateStatusLabel(scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column prop="regNumber" label="跟进人" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="updateTime" label="操作时间" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="createBy" label="创建人" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>

            <el-table-column label="操作" fixed="right" width="260" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="info" plain @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" plain @click="toDel(scope.row.id)">删除</el-button>
                    <el-button size="mini" type="info" plain @click=" toEvaluate(scope.row.id,scope.row.status,scope.row.creditCode)">评估</el-button>
                    <el-button size="mini" type="primary" plain @click="toDetail(scope.row.id, scope.row.customerName)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
        <add-customer :dialogVisible="dialogVisible" ref="customer" />
        <company-evaluate ref="evaluate" :confirmText="confirmText" />
        <dialog-detail ref="dialog" :list="detailList " :params="detailParams" :evaluateId="evaluateId" :companyName="companyName" type="company" />
    </div>
</template>
<script>
import { plateList, industryCategoryLabel, channelLabel, evaluateStatusLabel } from "@/utils/common";
import { formatDate } from "@/filters/index";
import AddCustomer from './add-customer.vue';
import CompanyEvaluate from './company-evaluate';
export default {
    components: {
        AddCustomer,
        CompanyEvaluate,
        DialogDetail: () => import('./dialog-detail.vue')
    },
    data () {
        return {
            confirmText: "",
            plateList,
            params: {
                current: 1,
                size: 10,
                customerName: '',
                industryType: ''
            },
            detailParams: {
                current: 1,
                size: 10,
                total: 0,
            },
            total: 0,
            list: [],
            dialogVisible: false,
            isEdit: false,
            detailList: [],
            evaluateId: NaN,
            companyName: '',

        };
    },
    mounted () {
        this.getList()
    },
    methods: {
        //企业模糊查询
        querySearchAsync (companyName, cb) {
            this.ajax
                .json('/dcp/query/enterprise/company/name', { companyName, industryType: this.params.industryType }, { type: 'get' })
                .then(res => {
                    let companyName = res.data.map(i => {
                        return {
                            value: i
                        }
                    })
                    cb(companyName)
                });
        },
        toDetail (evaluateId, companyName) {
            this.evaluateId = evaluateId
            this.companyName = companyName
            this.ajax
                .json('/dcp/enterprise/evaluate/history/page/list', { evaluateId, ...this.detailParams })
                .then(res => {
                    this.detailList = res.data.records
                    this.detailParams.total = res.data.total
                    this.$refs.dialog.dialogVisible = true

                });
        },
        toEvaluate (id, status, creditCode) {
            this.getDetail(id, 'evaluate', status)
            this.ajax
                .json('/dcp/query/enterprise/following', { creditCode }, { type: 'get' })
                .then(res => {
                    let { data = "" } = res
                    if (data) {
                        this.confirmText = ""
                    } else {
                        this.confirmText = "非关注企业,建议先去风控平台添加关注,再评估！"
                    }
                });
        },
        getDetail (id, type, status = 1) {
            this.ajax
                .json(`/dcp/enterprise/evaluate/detail/${id}`, this.params, { type: 'get' })
                .then(res => {
                    if (type === 'edit') {
                        this.isEdit = true
                        this.$refs.customer.ruleForm = res.data
                        this.dialogVisible = true
                    } else if (type === 'evaluate') {
                        this.$refs.evaluate.ruleForm = res.data
                        console.log(status, 'status')

                        this.$refs.evaluate.status = status

                        this.$refs.evaluate.dialogVisible = true
                    }

                });
        },
        toEdit (id) {
            this.getDetail(id, 'edit')
        },
        toDel (id) {
            this.$confirm("确定要删除吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then((res) => {
                this.ajax
                    .json(`/dcp/enterprise/evaluate/delete/${id}`, {}, this.params)
                    .then(res => {
                        this.getList()
                    });
            }).catch(() => {

            })

        },

        addCustomer () {
            this.isEdit = false
            this.dialogVisible = true
            this.$refs.customer.$refs['ruleForm'] && this.$refs.customer.$refs['ruleForm'].resetFields()
            this.$refs.customer.ruleForm = {
                id: "",
                creditCode: "",
                customerName: "",
                industryType: "",
                leadingCadre: ""
            }
        },
        formatDate,
        channelLabel,
        industryCategoryLabel,
        evaluateStatusLabel,
        getList () {
            this.ajax
                .json('/dcp/enterprise/evaluate/page/list', this.params)
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
                industryType: ''
            }
            this.getList()
        }
    }
};
</script>