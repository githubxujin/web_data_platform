<template>
    <div class="pt20">
        <div class="el-title mb20">企业账号审核</div>
        <!-- 查询 -->
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryCategory" clearable placeholder="行业类别" @change="industryChange">
                    <el-option v-for="(s, index) in plateListThree" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.contractorName" clearable :placeholder="placeholderInd().contractorName"  filterable allow-create default-first-option>
                    <el-option v-for="(s, index) in constructionArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.constructionName" clearable :placeholder="placeholderInd().constructionName" filterable allow-create default-first-option>
                    <el-option v-for="(s, index) in contractorArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerName" clearable :placeholder="placeholderInd().customerName" filterable allow-create default-first-option>
                    <el-option v-for="(s, index) in customerArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.listType" clearable placeholder="名单类型" filterable allow-create default-first-option>
                    <el-option label="待定名单" :value="0"></el-option>
                    <el-option label="白名单" :value="1"></el-option>
                    <el-option label="黑名单" :value="2"></el-option>
                    <el-option label="灰名单" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单 -->
        <el-table :data="list" tyle="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="contractorName" :label="tableInd().contractorName" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column label="行业类别" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ industryCategoryLabel(scope.row.industryCategory) || '-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="contractorAccount" :label="tableInd().contractorAccount" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column label="名单类型" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.listType | nameType}}
                </template>
            </el-table-column>
            <el-table-column label="审核状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.status===0">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="success" v-else-if="scope.row.status===1">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status===2">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status===3">{{auditList[scope.row.status].label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="constructionName" :label="tableInd().constructionName" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="constructionAccount" :label="tableInd().constructionAccount" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="customerName" :label="tableInd().customerName" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="customerAccount" :label="tableInd().customerAccount" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="remark" label="申请原因" width="500" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="updatedAt" label="操作时间" width="180"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="updatedByDesc" label="操作人" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="操作" width="120" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="toAudit(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0"></el-pagination>
        <add-customer :dialogVisible="dialogVisible" ref="customer" v-if="dialogVisible" />
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
let that
import { plateListThree, gradeList, listType, auditList, industryCategoryLabel } from "@/utils/common"
export default {
    components: {
        addCustomer: () => import('./add-customer.vue'),
    },
    data() {
        return {
            plateListThree,
            gradeList,
            listType,
            auditList,
            list: [],
            isDialog: true,
            params: {
                industryCategory: '', //行业类别
                contractorName: '',  //承建单位名称
                constructionName: '',  //建设单位名称
                customerName: '',  //融资企业名称
                listType: '',
                status: '',
                current: 1,
                size: 10
            },
            searchList: [
                { id: 1, name: 'customer_name' }, //融资企业名称
                { id: 2, name: 'contractor_name' }, //承建单位名称
                { id: 3, name: 'construction_name' } //建设单位名称
            ],
            contractorArr: [], //承建单位下拉列表
            constructionArr: [], //建设单位下拉列表
            customerArr: [], //客户名称下拉列表
            total: 0,
            dialogVisible: false,
            isEdit: 1,
            id: "",
            btnState: ['dc-primary', 'dc-success', 'dc-danger'],
            industryPlaceholder:1
        }
    },
    beforeCreate: function () {
        that = this;
    },
    created() {
        this.getList();
    },
    methods: {
        industryCategoryLabel,
          tableInd() {
            switch (this.industryPlaceholder) {
                case 1:
                    return {
                        contractorName: '承建单位名称',
                        contractorAccount: '承建单位账号',
                        constructionName: '建设单位名称',
                        constructionAccount: '建设单位账号',
                        customerName: '供应商名称',
                        customerAccount: '供应商账号',
                    }
                case 2:
                    return {
                        contractorName: '商业公司名称',
                        contractorAccount: '商业公司账号',
                        constructionName: '上游药厂名称',
                        constructionAccount: '上游药厂单位账号',
                        customerName: '下游终端名称',
                        customerAccount: '下游终端账号',
                    }
                case 3:
                    return {
                        contractorName: '贸易商名称',
                        contractorAccount: '贸易商账号',
                        customerName: '合作下游名称',
                        constructionAccount: '合作上游单位账号',
                        constructionName: '合作上游名称',
                        customerAccount: '合作下游账号',
                    }
                default:
                    return {
                        contractorName: '承建单位名称',
                        contractorAccount: '承建单位账号',
                        constructionName: '建设单位名称',
                        constructionAccount: '建设单位账号',
                        customerName: '供应商名称',
                        customerAccount: '供应商账号',
                    }
            }
        },
        placeholderInd() {
            switch (this.industryPlaceholder) {
                case 1:
                    return {
                        contractorName: '承建单位名称',
                        constructionName: '建设单位名称',
                        customerName: '供应商名称',
                    }
                case 2:
                    return {
                        contractorName: '商业公司名称',
                        constructionName: '上游药厂名称',
                        customerName: '下游终端名称',
                    }
                case 3:
                    return {
                        contractorName: '贸易商名称',
                        constructionName: '合作上游名称',
                        customerName: '合作下游名称',
                    }
                default:
                    return {
                        contractorName: '请选择',
                        constructionName: '请选择',
                        customerName: '请选择',
                    }
            }
        },
        //改变行业类别的回调
        industryChange(val) {
            for (let i = 0; i < this.searchList.length; i++) {
                if (this.searchList[i].id === i + 1) {
                    this.getSearchList(this.searchList[i].name);
                }
            }
            this.industryPlaceholder = val
        },
        //获取业主企业名单
        getList() {
            this.params.status = 0;
            this.$http(
                "/dcp/antiFraud/account/page/list", this.params
            ).then(res => {
                let data = res.data;
                this.list = data.records;
                this.total = data.total;
            })
        },
        reSet() {
            this.params = {
                size: 10,
                current: 1,
                industryCategory: '',
                contractorName: '',
                constructionName: '',
                customerName: '',
                listType: '',
                status: '',
            }
            // 清除 保存的参数
            this.$bus.clearParams(this.$route.meta.paramsType);
            that.getList();
        },
        //审核
        toAudit(item) {
            this.$router.push({ name: 'black-white-account-detail', query: { id: item.id, way: 'audit' } })
            // this.isEdit = 4;
            // this.id = item.id;
            // this.status = item.status;
            // this.dialogVisible = true;
        },
        //获取搜索条件下拉列表
        getSearchList(name) {
            this.ajax.json(
                "/dcp/antiFraud/account/name/list", { columnName: name, industryCategory: this.params.industryCategory }, { type: 'post' }
            ).then(res => {
                let data = res.data;
                console.log(data);
                if (name === 'construction_name') {
                    if (data && data.length) {
                        this.contractorArr = data;
                    }
                } else if (name === 'contractor_name') {
                    if (data && data.length) {
                        this.constructionArr = data;
                    }
                } else {
                    if (data && data.length) {
                        this.customerArr = data;
                    }
                }
            })
        }
    },
    filters: {
        nameType(dataStr) {
            let arrayList = that.listType;
            let value = '';
            for (let b of arrayList) {
                if (b.value === dataStr) {
                    value = b.label;
                    break;
                }
            }
            return value;
        },
        // auditStatus(dataStr) {
        //     let arrayList = that.auditList;
        //     let value = '';
        //     for (let b of arrayList) {
        //         if (b.value === dataStr) {
        //             value = b.label;
        //             break;
        //         }
        //     }
        //     return value;
        // }
    }
}
</script>

<style lang="scss" scoped>
    .title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 16px;
        // padding-left: 16px;
    }
</style>
