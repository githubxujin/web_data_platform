<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryType" clearable placeholder="行业类别" @change="industryTypeChange">
                    <el-option v-for="(s, index) in plateList" :label="s.label" :value="s.value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.phone" filterable clearable placeholder="接收手机号" @change="phoneChange">
                    <el-option v-for="(item,index) in phoneList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="params.clientName" filterable clearable placeholder="企业名称" @change="clientNameChange">
                    <el-option v-for="(item,index) in clientNameList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="params.bankTailNo" filterable clearable placeholder="企业账号" @change="bankTailNoChange">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="params.email" filterable clearable placeholder="接收邮箱">
                    <el-option v-for="(item,index) in emailList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
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
            <el-tooltip class="item" effect="dark" content="批量作废" placement="top">
                <i class="iconfont icon-shujuzhongxinv413-piliangshanchu" @click="batchDelete"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="industryType" label="行业类别" show-overflow-tooltip align="center" :formatter="industryFormat"></el-table-column>
            <el-table-column prop="phone" label="接收手机号" show-overflow-tooltip :formatter="formatLabel" width="120"></el-table-column>

            <el-table-column prop="clientName" label="企业名称" show-overflow-tooltip :formatter="formatLabel" width="300"></el-table-column>
            <el-table-column prop="bankTailNo" label="账户" show-overflow-tooltip :formatter="formatLabel" width="100"></el-table-column>
            <el-table-column prop="email" label="接收邮箱" show-overflow-tooltip :formatter="formatLabel" width="200">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="140">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" show-overflow-tooltip :formatter="formatLabel" width="120">
            </el-table-column>
            <el-table-column prop="state" label="状态" show-overflow-tooltip width="70" :formatter="formatLabel" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.state ? 'danger':'success'">{{ scope.row.state ? "作废" : "启用" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="250" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="primary" plain size="small" @click="detail(scope.row.id)">详情</el-button>
                    <el-button :type="scope.row.state ? 'success': 'danger'" plain size="small" @click="cancellation(scope.row.id, scope.row.state)">{{ scope.row.state ? "启用" : "作废" }}</el-button>
                    <el-button type="info" plain size="small" @click="record(scope.row)">记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
        <!-- 新增/编辑 -->
        <addEmail :dialogVisible="dialogVisible" ref="customer" />
        <!-- 记录 -->
        <recordMessageRemind :dialogVisible="dialogVisibleRecord" ref="customerRecord" />
    </div>
</template>
<script>
import { plateList } from "@/utils/common";
import addEmail from "./add-email.vue";
import recordMessageRemind from "./record-message-remind";
export default {
    components: { addEmail, recordMessageRemind },
    data () {
        return {
            plateList,
            params: {
                current: 1,
                size: 10,
                "bankTailNo": "",
                "clientName": "",
                industryType: "",
                phone: ''
            },
            total: 0,
            list: [],
            multipleSelection: [],
            dialogVisible: false,
            dialogVisibleEdit: false,
            dialogVisibleRecord: false,
            addOrEdit: "",
            phone: [],
            ids: [],
            phoneList: [],
            clientNameList: [],
            bankTailNoList: [],
            emailList: []
        };
    },
    created () {
        this.getList();
        this.phonePemoteMethod('')
        this.clientNamePemoteMethod('')
        this.bankTailNoPemoteMethod('')
        this.emailPemoteMethod('')
    },
    methods: {
        // 监听板块
        industryTypeChange (value) {
            this.params.industryType = value
            this.phonePemoteMethod('')
            this.clientNamePemoteMethod('')
            this.bankTailNoPemoteMethod('')
            this.emailPemoteMethod('')
        },
        phoneChange (value) {
            this.clientNamePemoteMethod('')
            this.bankTailNoPemoteMethod('')
            this.emailPemoteMethod('')
        },
        clientNameChange (value) {
            this.bankTailNoPemoteMethod('')
            this.emailPemoteMethod('')
        },
        bankTailNoChange (value) {
            this.emailPemoteMethod('')
        },
        // 接收手机号模糊查询
        phonePemoteMethod (phone) {
            this.ajax
                .json('/dcp/cat/pool/email/phone/vague/query', { industryType: this.params.industryType, phone }, { type: 'get' })
                .then(res => {
                    this.phoneList = res.data
                })
        },
        // 客户名称模糊查询
        clientNamePemoteMethod (clientName) {
            this.ajax
                .json('/dcp/cat/pool/email/client/name/vague/query', { industryType: this.params.industryType, phone: this.params.phone, clientName }, { type: 'get' })
                .then(res => {
                    this.clientNameList = res.data
                })
        },
        // 账号模糊查询
        bankTailNoPemoteMethod (bankTailNo) {
            this.ajax
                .json('/dcp/cat/pool/email/bank/tail/no/vague/query', { industryType: this.params.industryType, phone: this.params.phone, clientName: this.params.clientName, bankTailNo }, { type: 'get' })
                .then(res => {
                    this.bankTailNoList = res.data
                })
        },
        // 接收邮箱模糊查询
        emailPemoteMethod (email) {
            this.ajax
                .json('/dcp/cat/pool/email/email/vague/query', { industryType: this.params.industryType, phone: this.params.phone, clientName: this.params.clientName, bankTailNo: this.params.bankTailNo, email }, { type: 'get' })
                .then(res => {
                    this.emailList = res.data
                })
        },
        // 匹配对应显示
        industryFormat (row, column) {
            if (row.industryType === "") {
                return "板块";
            } else if (row.industryType === 1) {
                return "基建工程";
            } else if (row.industryType === 2) {
                return "医药医疗";
            } else if (row.industryType === 3) {
                return "能源化工";
            } else if (row.industryType === 0) {
                return "其他";
            }
        },
        handleSelectionChange (val) {
            this.multipleSelection = val;
            val.forEach((item, index) => {
                this.ids.push(item.id);
            });
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/cat/pool/email/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
        // 列表
        getList () {
            this.ajax
                .json("/dcp/cat/pool/email/page/list", {
                    ...this.params
                })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                clientName: "",
                bankTailNo: "",
                bank: "",
                bankAccountName: "",
                phone: ""
            };
            this.getList()
        },
        // 新增
        toAdd () {
            this.addOrEdit = "toAdd";
            this.dialogVisible = true
            this.$refs.customer.$refs['ruleForm'] && this.$refs.customer.$refs['ruleForm'].resetFields()
            this.$refs.customer.ruleForm = {
                industryType: "",
                email: "",
                bankId: null,
                phone: ""
            }
        },
        // 编辑
        edit (row) {
            this.getDetail(row.id, 'edit')
            this.addOrEdit = "edit";
        },
        // 详情
        detail (id) {
            this.getDetail(id, "detail");
            this.addOrEdit = "detail";
        },
        // 记录
        record (row) {
            this.dialogVisibleRecord = true;
            this.recordPagination(row.id)

        },
        recordPagination (id) {
            this.$refs.customerRecord.id = id;
            this.ajax
                .json("/dcp/operation/log/page/list", {
                    businessId: id,
                    type: "0002",
                    current: this.params.current,
                    size: this.params.size
                })
                .then(res => {
                    this.$refs.customerRecord.list = res.data.records;
                    this.$refs.customerRecord.total = res.data.total;
                });
        },
        // 详情
        getDetail (id, type) {
            this.ajax
                .json(
                    `/dcp/cat/pool/email/detail/${id}`,
                    {},
                    {
                        type: "get"
                    }
                )
                .then(res => {
                    this.dialogVisible = true;
                    this.$refs.customer.ruleForm = res.data;
                });
        },
        // 批量作废
        batchDelete () {
            this.ajax
                .json("/dcp/cat/pool/email/operate/void/batch", this.ids)
                .then(res => {
                    if (res.code === "200") {
                        this.getList();
                    }
                });
        },
        // 作废
        cancellation (id, states) {
            let state;
            if (states === 0) {
                state = 1;
            } else if (states === 1) {
                state = 0;
            }
            this.ajax
                .json("//dcp/cat/pool/email/operate/void", { id, state })
                .then(res => {
                    if (res.code == "200") {
                        this.getList();
                    }
                });
        }
    }
};
</script>
