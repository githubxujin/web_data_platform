<template>
    <div class="pt20">
        <!-- 查询 -->
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.name" clearable placeholder="通知名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.emails" clearable placeholder="接收邮箱"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.createBy" clearable placeholder="创建人"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.templateType" clearable placeholder="接收类型">
                    <el-option v-for="(s, index) in receptionList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 新增 -->
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
        </el-row>
        <!-- 表单 -->
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="通知名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="emails" label="接受邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="templateType" label="接收类型" :formatter="receptionFormat" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="320">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button type="info" plain size="small" @click="toCopy(scope.row.id)">复制</el-button>
                    <el-button type="danger" plain size="small" @click="isEnable(scope.row)">{{ scope.row.isEnable ? "禁用" : "启用" }}</el-button>
                    <el-button type="danger" plain size="small" @click="toDelet(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
        <!-- 新增 -->
        <addRiskNotice :dialogVisible="dialogVisible" ref="customer" />
        <!-- 编辑 -->
        <editRiskNotice :dialogVisible="dialogVisibleEdit" ref="customerEdit" />
    </div>
</template>

<script>
import { receptionList, getParentId } from "@/utils/common"
import addRiskNotice from "./add-risk-notice.vue"
import editRiskNotice from "./edit-risk-notice.vue"
export default {
    components: { addRiskNotice, editRiskNotice },
    data() {
        return {
            receptionList,
            params: {
                current: 1,
                size: 10,
                name: "",
                emails: "",
                createBy: "",
                templateType: ""
            },
            list: [],
            total: 0,
            dialogVisible: false,
            dialogVisibleEdit: false,
            id: ''
        }
    },
    created() {
        this.getList()
    },
    methods: {
        // 复制
        toCopy(id) {
            this.dialogVisibleEdit = true
            this.getDetail(id)
            this.id = id
            this.isCopy = true
            this.$refs.customerEdit.$refs['ruleForm'] && this.$refs.customerEdit.$refs['ruleForm'].resetFields()
        },
        // 匹配
        receptionFormat(row, column) {
            if (row.templateType === 1) {
                return "固定标签"
            } else if (row.templateType === 2) {
                return "固定公众号"
            }
        },
        // 列表渲染
        getList() {
            this.ajax.json("/dcp/server/wx/article/notify/list", this.params, { type: "get" }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        // 新增
        toAdd() {
            this.$refs.customer.$refs['ruleForm'] && this.$refs.customer.$refs['ruleForm'].resetFields()
            this.dialogVisible = true
        },
        // 详情
        getDetail(id) {
            this.ajax
                .json('/dcp/server/wx/article/notify/view', { id }, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.$set(this.$refs.customerEdit.ruleForm, "name", res.data.name)
                        if(!this.isCopy){
                            this.$set(this.$refs.customerEdit.ruleForm, "emails", res.data.emails)
                        }
                        this.$set(this.$refs.customerEdit.ruleForm, "templateType", res.data.templateType)
                        this.$set(this.$refs.customerEdit, "isShowLabelOfAccount", res.data.templateType)
                        // 固定标签
                        if (res.data.templateType === 1) {
                            this.$set(this.$refs.customerEdit, "isShowIntoAdd", res.data.keywords ? 1 : 0)
                            this.$set(this.$refs.customerEdit, "accountlsList", res.data.keywords ? res.data.keywords.split(",") : [])
                            let relationInfoArr = res.data.relationInfo.split(",")
                            let lengthR = relationInfoArr.length - 1
                            if(relationInfoArr.length>1){
                                for (let i = 0; i < lengthR; i++) {
                                    this.$refs.customerEdit.addDomain2()
                                }
                            }
                            
                            relationInfoArr.forEach((itemA,indexA)=>{
                                this.ajax
                                    .json('/dcp/select/wx/warn/rule/parent', { id: relationInfoArr[indexA] }, { type: 'get' })
                                    .then(par => {
                                        if (par.code === '200') {
                                            let relationInfoList = res.data.relationInfo ? getParentId(par.data).reverse() : []
                                            relationInfoList.splice(0, 1)
                                            let relationInfoListLength = relationInfoList.length
                                            for (let i = 0; i < relationInfoListLength; i++) {
                                                this.$set(this.$refs.customerEdit.ruleForm.domains2[indexA].idList, "id" + i, relationInfoList[i])
                                            }
                                            this.$set(this.$refs.customerEdit.ruleForm.domains2[indexA], "industryType", res.data.industryType)
                                            this.$set(this.$refs.customerEdit.ruleForm.domains2[indexA], "relationInfo", getParentId(par.data)[0])
                                            // 第一个子列表
                                            this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: 0, industryType: res.data.industryType }, { type: "get" }).then(res3 => {
                                                if (res3.code === '200') {
                                                    if (res3.data && res3.data.length > 0) {
                                                        this.$set(this.$refs.customerEdit.ruleForm.domains2[indexA].fixLabelSelectList, 0, res3.data)
                                                    }
                                                }
                                            })
                                            // 后面子列表
                                            console.log(getParentId(par.data)[getParentId(par.data).length-1],'---')
                                            for (let i = 0; i < relationInfoListLength; i++) {
                                                this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: relationInfoList[i], industryType: res.data.industryType }, { type: "get" }).then(res4 => {
                                                    if (res4.data && res4.data.length > 0) {
                                                        this.$set(this.$refs.customerEdit.ruleForm.domains2[indexA].fixLabelSelectList, i + 1, res4.data)
                                                    }
                                                })
                                            }
                                        }
    
                                    })
                            })
                        }
                        // 固定公众号
                        else if (res.data.templateType === 2) {
                            this.$set(this.$refs.customerEdit.ruleForm.domains[0], "industryType", res.data.industryType)
                            this.$set(this.$refs.customerEdit.ruleForm.domains[0], "relationInfo", res.data.relationInfo ? res.data.relationInfo.split(",") : [])
                            this.$set(this.$refs.customerEdit, "keywordsList", res.data.keywords ? res.data.keywords.split(",") : "")
                            this.ajax.json(`/dcp/server/wx/account/select`, { industryType: res.data.industryType }, { type: "get" }).then(res5 => {
                                this.$set(this.$refs.customerEdit.relationInfoList, 0, res5.data)
                            })
                        }
                    }
                })
        },
        // 编辑
        toEdit(id) {
            this.dialogVisibleEdit = true
            this.getDetail(id)
            this.id = id
            this.isCopy = false
            this.$refs.customerEdit.$refs['ruleForm'] && this.$refs.customerEdit.$refs['ruleForm'].resetFields()
        },
        // 启用/禁用
        isEnable(row) {
            let optType = row.isEnable === 0 ? "1" : "0"
            this.ajax.json("/dcp/server/wx/article/notify/opt", { id: row.id, optType }, { type: "POST" }).then(res => {
                if (res.code === "200") this.getList()
            })
        },
        // 删除
        toDelet(row) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax.json("/dcp/server/wx/article/notify/opt", { id: row.id, optType: 2 }, { type: "POST" }).then(res => {
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
        // 重置
        reSet() {
            this.params = {
                current: 1,
                size: 10,
                name: "",
                emails: "",
                createBy: "",
                templateType: ""
            }
            this.getList()
        }
    }
}
</script>
