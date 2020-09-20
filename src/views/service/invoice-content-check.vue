<template>
    <div class="table-wrap pt0 mt20">
        <div class="el-title pt20 pb20">发票内容字段库</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item style="width: 193px">
                <el-select v-model="params.industryCategory " clearable placeholder="板块" @change="onChangeIndustry">
                    <el-option label="板块" value></el-option>
                    <el-option v-for="(s,index) in industryCategoryList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 193px">
                <el-select v-model="params.sellerName" clearable filterable allow-create placeholder="供应商名称">
                    <el-option v-for="(s,index) in buyerNameList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 193px">
                <el-input v-model="params.buyerName" clearable placeholder="下游名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="industryCategory" label="板块" show-overflow-tooltip>
                <template slot-scope="scope">{{ industryCategoryLabel(scope.row.industryCategory)}}</template>
            </el-table-column>
            <el-table-column prop="sellerName" label="供应商名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="buyerNameDesc" label="下游名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="添加日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="添加人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateBy" label="更新人" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="toDetail(scope.row.id,scope.row.industryCategory,scope.row.sellerName,scope.row.buyerName)">详情</el-button>
                    <el-button type="danger" plain v-if="scope.row.sellerName!=='全部'" @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" @size-change="handleSizeChange" :page-size.sync="params.size" :current-page.sync="params.current" @current-change="getList"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0"></el-pagination>

    </div>
</template>

<script>
import { industryCategoryLabel, industryCategoryList } from "@/utils/common.js";
export default {
    components: {},
    data () {
        return {
            params: {
                current: 1,
                size: 10,
                sellerName: "",
                buyerName: "",
                industryCategory: ""
            },
            total: 0,
            list: [],
            buyerNameList: [],
            industryCategoryList
        };
    },
    created () {
        this.getBuyerName();
        this.searchRecord();
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }

            this.getList();
        },
        handleSizeChange () {
            this.getList();
        },
        onChangeIndustry (val) {
            this.getBuyerName(val);
        },
        toDel (id) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.$http(
                    "/dcp/delete/invoice/content/delete",
                    { id },
                    { type: "formdata" }
                ).then(res => {
                    this.getList();
                });
            });
        },
        toAdd () {
            this.$router.push({ name: "invoice-content-add" });
        },
        toDetail (id, industryCategory, sellerName, buyerName) {
            this.$router.push({
                name: "invoice-content-detail",
                query: { id, industryCategory, sellerName, buyerName }
            });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                sellerName: "",
                buyerName: "",
                industryCategory: ""
            };
        },
        getList () {
            this.$params[this.$route.name] = this.params;
            this.$http("/dcp/query/invoice/content/page/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            );
        },
        getBuyerName (industryCategory = "") {
            this.$http("/dcp/query/invoice/seller/list", { industryCategory }).then(
                res => {
                    this.buyerNameList = res.data;
                }
            );
        },
        getBuyerList (sellerName) {
            let { industryCategory } = this.params;

            this.$http("/dcp/query/invoice/buyer/list", {
                sellerName,
                industryCategory
            }).then(res => {
                this.buyerList = res.data;
            });
        },
        exportData () {
            this.$http("/dcp/invoice/content/export", this.params, {
                type: "export"
            });
        },
        industryCategoryLabel
    }
};
</script>

