<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryType" clearable placeholder="行业类别">
                    <el-option v-for="(s,index) in officialTypeList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.accountName" clearable placeholder="公众号名称"></el-input>
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
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="accountName" label="公众号名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="account" label="公众号ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="industryType" label="类别" :formatter="industryFormat" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="添加日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="添加人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unGetDay" label="未获取内容时长" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row)">编辑</el-button>
                    <el-button :type="scope.row.isEnable?'danger':'success'" plain size="small" @click="isEnable(scope.row)">{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button>
                    <el-button type="danger" plain size="small" @click="toDelet(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>

        <!-- 新增/编辑 -->
        <addOfficialAccount :dialogVisible="dialogVisible" ref="customer" />
    </div>
</template>
<script>
import { officialTypeList } from "@/utils/common"
import addOfficialAccount from "./add-official-account.vue"
export default {
    components: { addOfficialAccount },
    data () {
        return {
            officialTypeList,
            params: {
                current: 1,
                size: 10,
                industryType: "",
                accountName: ""
            },
            list: [],
            total: 0,
            dialogVisible: false,
            addOrEdit: ""
        }
    },
    created () {
        this.getList()
    },
    methods: {
        industryFormat (row, column) {
            switch (row.industryType) {
                case 1:
                    return "基建工程"
                case 2:
                    return "医药医疗"
                case 3:
                    return "能源化工"
                case 4:
                    return "公共动态"
            }
        },
        toAdd () {
            this.dialogVisible = true
            this.addOrEdit = "toAdd"
        },
        getDetail (row) {
            this.ajax.json("/dcp/server/wx/account/view", { id: row.id }, { type: "get" }).then(res => {
                this.$refs.customer.id = res.data.id
                this.$set(this.$refs.customer.ruleForm, "accountName", res.data.accountName)
                this.$set(this.$refs.customer.ruleForm, "industryType", res.data.industryType)
                this.dialogVisible = true
                if (res.data.url) {
                    this.$set(this.$refs.customer.ruleForm, "accountOrUrl", "url")
                    this.$set(this.$refs.customer.ruleForm, "accountOrUrlValue", res.data.url)
                } else if (res.data.account) {
                    this.$set(this.$refs.customer.ruleForm, "accountOrUrl", "account")
                    this.$set(this.$refs.customer.ruleForm, "accountOrUrlValue", res.data.account)
                }
            })
        },
        toEdit (row) {
            this.addOrEdit = "edit"
            this.getDetail(row)
        },
        isEnable (row) {
            let optType = row.isEnable === 0 ? "1" : "0"
            this.ajax.json("/dcp/server/wx/account/opt", { id: row.id, optType }, { type: "POST" }).then(res => {
                if (res.code === "200") this.getList()
            })
        },
        toDelet (row) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax.json("/dcp/server/wx/account/opt", { id: row.id, optType: 2 }, { type: "POST" }).then(res => {
                    if (res.code === "200") {
                        this.getList()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                })
            }).catch(() => { });
        },
        getList () {
            this.ajax.json("/dcp/server/wx/account/list", this.params, { type: "get" }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                industryType: "",
                accountName: ""
            }
            this.getList()
        }
    }
}
</script>