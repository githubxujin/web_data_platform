<template>
    <div class="pt20">
        <!-- 查询 -->
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryCategory" clearable placeholder="行业类别" @change="industryChange">
                    <el-option v-for="(s, index) in plateList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.contractorName" clearable placeholder="承建单位名称">
                    <el-option v-for="(s, index) in contractorArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item class='el-item-form-width'>
                <el-select v-model="params.contractorAccount" clearable placeholder="承建单位账号">
                    <el-option v-for="(s, index) in gradeList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.constructionName" clearable placeholder="建设单位名称">
                    <el-option v-for="(s, index) in constructionArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerName" clearable placeholder="融资企业名称">
                    <el-option v-for="(s, index) in customerArr" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 表单 -->
        <el-table :data="list" border tyle="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="contractorName" label="承建单位" width="280" show-overflow-tooltip></el-table-column>
            <el-table-column prop="contractorAccount" label="账号" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column label="名单类型" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.listType | nameType}}
                </template>
            </el-table-column>
            <el-table-column label="审核状态" prop="status" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span class="state-tag" :class="btnState[scope.row.status]">{{auditList[scope.row.status].label}}</span>
                    <!-- {{ scope.row.status | auditStatus}} -->
                </template>
            </el-table-column>
            <el-table-column prop="constructionName" label="建设单位名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="constructionAccount" label="建设单位账号" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerName" label="融资企业名称" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="customerAccount" label="客户账号" width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updatedAt" label="操作时间" width="180"></el-table-column>
            <el-table-column prop="updatedByDesc" label="操作人" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop label="操作" width="80" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button plain size="mini" type="primary" @click="detail(scope.row)">详情</el-button>
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
import { plateList, gradeList, listType, auditList } from "@/utils/common"
export default {
    components: {
        addCustomer: () => import('./add-customer.vue'),
    },

    data() {
        return {
            plateList,
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
            isEdit: 1,
            id: '',
            dialogVisible: false,
            btnState: ['dc-primary', 'dc-success', 'dc-danger'],
        }
    },
    beforeCreate: function () {
        that = this;
    },
    created() {
        this.getList();
    },
    methods: {
        //改变行业类别的回调
        industryChange() {
            for (let i = 0; i < this.searchList.length; i++) {
                if (this.searchList[i].id === i + 1) {
                    this.getSearchList(this.searchList[i].name);
                }
            }
        },
        //获取业主企业名单
        getList() {
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
        detail(item) {
            this.id = item.id;
            this.dialogVisible = true
        },
        exportData() { },
        //获取搜索条件下拉列表
        getSearchList(name) {
            this.ajax.json(
                "/dcp/antiFraud/account/name/list", { columnName: name, industryCategory: this.params.industryCategory }, { type: 'post' }
            ).then(res => {
                let data = res.data;
                console.log(data);
                if (name === 'contractor_name') {
                    //承建单位
                    if (data && data.length) {
                        this.contractorArr = data;
                    }
                } else if (name === 'construction_name') {
                    //建设单位
                    if (data && data.length) {
                        this.constructionArr = data;
                    }
                } else {
                    //融资企业
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
</style>
