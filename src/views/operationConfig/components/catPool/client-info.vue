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
                <el-select v-model="params.clientName" filterable clearable placeholder="企业名称" @change="clientNameChange">
                    <el-option v-for="(item,index) in clientNameList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" filterable clearable placeholder="账户名称" @change="bankTailNoChange">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bank" filterable clearable placeholder="银行名称" @change="bankChange">
                    <el-option v-for="(item,index) in bankList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankAccountName" filterable clearable placeholder="对方户名" @change="bankAccountNameChange">
                    <el-option v-for="(item,index) in bankAccountNameList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.phone" filterable clearable placeholder="接收手机号">
                    <el-option v-for="(item,index) in phoneList" :key="index" :label="item" :value="item"></el-option>
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

            <el-tooltip class="item" effect="dark" content="导入" placement="top">
                <i class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="industryType" label="行业类别" show-overflow-tooltip align="center" :formatter="industryFormat">

            </el-table-column>
            <el-table-column prop="clientName" label="企业名称" show-overflow-tooltip width="200" :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="bankTailNo" label="账户" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="bank" label="银行名称" show-overflow-tooltip width="120" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="bankAccountNo" label="银行账号" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column prop="mbno" label="银行热线电话" show-overflow-tooltip width="120" :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="bankAccountName" label="对方户名" show-overflow-tooltip :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="phone" label="接受手机号" show-overflow-tooltip width="120" :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="isFocus" label="关注状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.isFocus ? "已关注" : "未关注" }}
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态" show-overflow-tooltip width="70" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.state ? 'danger':'success'">{{ scope.row.state ? "作废" : "启用" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                    {{ formatDate(scope.row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" show-overflow-tooltip width="120" :formatter="formatLabel">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="350" align="left" header-align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button type="primary" plain size="small" @click="detail(scope.row.id)">详情</el-button>
                    <el-button :type="scope.row.state?'success':'danger'" plain @click="cancellation(scope.row.id, scope.row.state)">
                        {{ scope.row.state ? "启用" : "作废" }}
                    </el-button>
                    <el-button type="info" plain @click="record(scope.row)">记录</el-button>
                    <el-button type="info" plain @click="focus(scope.row.id, scope.row.isFocus)">{{ scope.row.isFocus ? "已关注" : "关注" }}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>

        <!-- 新增/编辑/详情 -->
        <addClient :dialogVisible="dialogVisible" ref="customer" />

        <!-- 记录 -->
        <recordMessageRemind :dialogVisible="dialogVisibleRecord" ref="customerRecord" />
        <!-- 导入 -->
        <el-dialog :visible.sync="isDialog" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                导入信息时上传的附件有格式要求，点击下载
                <span class="up-tem">
                    <a href="./client-info.xlsx" download="client-info.xlsx" class="to-links">
                        导入模板
                    </a>
                </span>
                确定上传后完成信息的更新，将会新增不存在的信息或覆盖更新已有的信息。
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload v-if="isDialog" accept=".xlsx,.xls" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
                    上传文件
                </c-upload>
                <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                <ul class="el-upload-list el-upload-list--text" v-if="file.length">
                    <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file" :key="k">
                        <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{v.name}}</a>
                        <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                        <i class="el-icon-close" @click="delFile(k)"></i>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="info" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { plateList } from "@/utils/common";
import addClient from "./add-client.vue";
import recordMessageRemind from "./record-message-remind.vue";
export default {
    components: { addClient, recordMessageRemind },
    data () {
        return {
            plateList,
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            list: [],
            multipleSelection: [],
            dialogVisible: false,
            dialogVisibleRecord: false,
            addOrEdit: "",
            ids: [],
            states: [],
            isDialog: false,
            file: [],
            isEdit: false,
            clientNameList: [],
            bankTailNoList: [],
            bankList: [],
            bankAccountNameList: [],
            phoneList: [],
        };
    },
    created () {
        this.getList();
        this.clientNamePemoteMethod('')
        this.bankTailNoPemoteMethod('')
        this.bankPemoteMethod('')
        this.bankAccountNamePemoteMethod('')
        this.phonePemoteMethod('')
    },
    methods: {
        industryTypeChange (value) {
            this.clientNamePemoteMethod('')
            this.bankTailNoPemoteMethod('')
            this.bankPemoteMethod('')
            this.bankAccountNamePemoteMethod('')
            this.phonePemoteMethod('')
        },
        clientNameChange (value) {
            this.bankTailNoPemoteMethod('')
            this.bankPemoteMethod('')
            this.bankAccountNamePemoteMethod('')
            this.phonePemoteMethod('')
        },
        bankTailNoChange (value) {
            this.bankPemoteMethod('')
            this.bankAccountNamePemoteMethod('')
            this.phonePemoteMethod('')
        },
        bankChange (value) {
            this.bankAccountNamePemoteMethod('')
            this.phonePemoteMethod('')
        },
        bankAccountNameChange (value) {
            this.phonePemoteMethod('')
        },
        // 客户名称-模糊查询
        clientNamePemoteMethod (clientName) {
            this.ajax
                .json('/dcp/comm/bank/client/name/vague', {
                    industryType: this.params.industryType,
                    clientName
                }, { type: 'get' })
                .then(res => {
                    this.clientNameList = res.data
                })
        },
        // 客户账号-模糊查询
        bankTailNoPemoteMethod (bankTailNo) {
            this.ajax
                .json('/dcp/comm/bank/bank/tail/no/vague', {
                    industryType: this.params.industryType,
                    clientName: this.params.clientName,
                    bankTailNo
                }, { type: 'get' })
                .then(res => {
                    this.bankTailNoList = res.data
                })
        },
        // 银行名称-模糊查询
        bankPemoteMethod (bank) {
            this.ajax
                .json('/dcp/comm/bank/bank/vague', {
                    industryType: this.params.industryType,
                    clientName: this.params.clientName,
                    bankTailNo: this.params.bankTailNo,
                    bank
                }, { type: 'get' })
                .then(res => {
                    this.bankList = res.data
                })
        },
        // 对方户名-模糊查询
        bankAccountNamePemoteMethod (bankAccountName) {
            this.ajax
                .json('/dcp/comm/bank/bank/account/name/vague', {
                    industryType: this.params.industryType,
                    clientName: this.params.clientName,
                    bankTailNo: this.params.bankTailNo,
                    bank: this.params.bank,
                    bankAccountName
                }, { type: 'get' })
                .then(res => {
                    this.bankAccountNameList = res.data
                })
        },
        // 接收手机号-模糊查询
        phonePemoteMethod (phone) {
            this.ajax
                .json('/dcp/comm/bank/phone/vague', {
                    industryType: this.params.industryType,
                    clientName: this.params.clientName,
                    bankTailNo: this.params.bankTailNo,
                    bank: this.params.bank,
                    bankAccountName: this.params.bankAccountName,
                    phone
                }, { type: 'get' })
                .then(res => {
                    this.phoneList = res.data
                })
        },

        // 匹配对应显示
        industryFormat (row, column) {
            if (row.industryType === "") {
                return "-"
            } else if (row.industryType === 1) {
                return "基建工程";
            } else if (row.industryType === 2) {
                return "医药医疗";
            } else if (row.industryType === 3) {
                return "能源化工";
            } else if (row.industryType === 0) {
                return "其他";
            } else {
                return "-"
            }
        },
        handleSelectionChange (val) {
            this.ids = []
            this.states = []
            this.multipleSelection = val;
            val.forEach((item, index) => {
                this.ids.push(item.id);
                this.states.push({
                    state: item.state,
                    clientName: item.clientName
                })
            });
        },
        // 批量作废
        batchDelete () {
            let states1 = this.states.filter((item, index) => {
                return item.state === 1
            })
            if (states1.length === 1) {
                this.$message.error('已有作废，请重新选择')
            } else {
                this.ajax
                    .json("/dcp/comm/bank/operate/void/batch", this.ids)
                    .then(res => {
                        if (res.code === "200") {
                            this.getList();
                        }
                    });
            }
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/comm/bank/export", this.params, { type: "export" })
                .then(res => { });
        },
        getList () {
            this.ajax
                .json("/dcp/comm/bank/page/list", {
                    ...this.params
                })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
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
        // 详情
        detail (id) {
            this.getDetail(id, "detail");
            this.addOrEdit = "detail";
        },
        record (row) {
            this.dialogVisibleRecord = true;
            this.recordPagination(row.id);
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
        // 作废
        cancellation (id, states) {
            let state;
            if (states === 0) {
                state = 1;
            } else if (states === 1) {
                state = 0;
            }
            this.ajax
                .json("/dcp/comm/bank/operate/void", { id, state })
                .then(res => {
                    if (res.code == "200") {
                        this.getList();
                    }
                });
        },
        // 关注
        focus (id, isFocuss) {
            let isFocus;
            if (isFocuss === 0) {
                isFocus = 1;
            } else if (isFocuss === 1) {
                isFocus = 0;
            }
            this.ajax
                .json("/dcp/comm/bank/operate/focus", { id, isFocus })
                .then(res => {
                    if (res.code == "200") {
                        this.getList();
                    }
                });
        },
        // 导入
        // 关闭上传弹窗
        closeUp () {
            this.file = [];
        },
        /* 上传文件 */
        async uploadHand (files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
        },
        // 删除上传文件
        delFile (k) {
            this.file.splice(k, 1);
        },
        // 确认上传
        toUpload () {
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/comm/bank/import", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.isDialog = false;
                        this.$message.success("导入成功");
                        this.getList();
                    }
                });
            } else {
                this.$message.error("请上传附件");
            }
        },
        getDetail (id) {
            this.ajax
                .json(`/dcp/comm/bank/detail/${id}`, this.params, { type: 'get' })
                .then(res => {
                    this.isEdit = true
                    this.$refs.customer.ruleForm = res.data
                    this.dialogVisible = true
                });
        },
        // 编辑
        toEdit (id) {
            this.getDetail(id, 'edit')
            this.addOrEdit = "edit";
        },
        // 新增
        toAdd () {
            this.addOrEdit = "toAdd";
            this.isEdit = false
            this.dialogVisible = true
            this.$refs.customer.$refs['ruleForm'] && this.$refs.customer.$refs['ruleForm'].resetFields()
            this.$refs.customer.ruleForm = {
                industryType: "",
                clientName: "",
                bankTailNo: "",
                bank: "",
                bankAccountNo: "",
                mbno: "",
                bankAccountName: "",
                phone: ""
            }
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-message.el-message--info {
    background-color: red;
}
</style>