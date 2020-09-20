<template>
    <div class="pt20" id="messageBoxUpdata">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryType" clearable placeholder="业务板块">
                    <el-option v-for="(s, index) in plateList" :label="s.label" :value="s.value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.clientName" clearable placeholder="客户名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.account" clearable placeholder="账户"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.bank" clearable placeholder="银行名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.objectName" clearable placeholder="对方户名"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.action" clearable placeholder="交易类型">
                    <el-option label="收入" value="收入"></el-option>
                    <el-option label="支出" value="支出"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.changeAmount" clearable placeholder="交易金额"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.simNumber" clearable placeholder="接收手机号"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.state" clearable placeholder="状态">
                    <el-option label="未处理" value="0"></el-option>
                    <el-option label="已处理" value="1"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.isFocus" clearable placeholder="查看方式">
                    <el-option label="仅查看我的关注" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker start-placeholder='交易日期' end-placeholder='交易日期' v-model="dateArr" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu mr20" @click="exportData"></i>
            </el-tooltip>

        </el-row>

        <el-table :data="list" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="industryType" label="业务板块" show-overflow-tooltip align="center" :formatter="industryFormat"></el-table-column>
            <el-table-column prop="clientName" label="客户名称" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="account" label="账户" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="bank" label="银行名称" show-overflow-tooltip :formatter="formatLabel" width="120">
            </el-table-column>

            <el-table-column prop="actionTime" label="交易日期" show-overflow-tooltip :formatter="formatLabel" width="120">
                <template slot-scope="scope">
                    {{scope.row.actionTime.split(" ")[0] || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="actionTime" label="交易时间" show-overflow-tooltip :formatter="formatLabel" width="120">
                <template slot-scope="scope">
                    {{scope.row.actionTime.split(" ")[1] || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="action" label="交易类型" show-overflow-tooltip :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="changeAmount" label="交易金额" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{ scope.row.changeAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="objectName" label="对方户名" show-overflow-tooltip :formatter="formatLabel" width="140">
            </el-table-column>
            <el-table-column prop="objectAccount" label="对方账号" show-overflow-tooltip :formatter="formatLabel" width="140">
            </el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip :formatter="formatLabel" width="160">
            </el-table-column>
            <el-table-column prop="simNumber" label="接收手机号" show-overflow-tooltip :formatter="formatLabel" width="120">
            </el-table-column>
            <el-table-column prop="state" label="操作状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tag :type="scope.row.state ? 'success':'danger'">{{ scope.row.state ? "已处理" : "未处理" }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="actionTime" label="操作时间" show-overflow-tooltip :formatter="formatLabel" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="210" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="primary" plain size="small" @click="lookOver(scope.row)">详情</el-button>
                    <el-button type="info" plain size="small" @click="record(scope.row)">记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="mt20">
            <div class="detail_content">
                <span class="detail_title">当前收入：</span>
                <span class="detail_num">{{pageIncomeTotal | numFormat}}</span>
            </div>
            <div class="detail_content">
                <span class="detail_title">当前支出：</span>
                <span class="detail_num">{{pagePayTotal | numFormat}}</span>
            </div>
            <div class="detail_content">
                <span class="detail_title">合计收入：</span>
                <span class="detail_num">{{allIncomeTotal | numFormat}}</span>
            </div>
            <div class="detail_content">
                <span class="detail_title">合计支出：</span>
                <span class="detail_num">{{allPayTotal | numFormat}}</span>
            </div>
        </el-row>

        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
        <editMessageRemind :dialogVisible="dialogVisibleEdit" ref="customerEdit" />
        <recordMessageRemind :dialogVisible="dialogVisibleRecord" ref="customerRecord" />
        <lookOverMessageRemind :dialogVisible="dialogVisibleLookOver" ref="customerLookOver" />
    </div>
</template>
<script>
import { TransactionTypeList, catPoolSource, plateList, deepClone } from "@/utils/common";
import editMessageRemind from "./edit-message-remind.vue";
import recordMessageRemind from "./record-message-remind.vue";
import lookOverMessageRemind from "./lookOver-message-remind.vue";
export default {
    components: { editMessageRemind, recordMessageRemind, lookOverMessageRemind },
    data () {
        return {
            TransactionTypeList,
            catPoolSource,
            plateList,
            params: {
                current: 1,
                size: 10,
                actionTimeStart: "",
                actionTimeEnd: ""
            },
            total: 0,
            list: [],
            multipleSelection: [],
            dateArr: [],
            dialogVisibleEdit: false,
            dialogVisibleRecord: false,
            dialogVisibleLookOver: false,
            pageIncomeTotal: 0,
            pagePayTotal: 0,
            allIncomeTotal: 0,
            allPayTotal: 0,

        };
    },
    created () {
        this.getList();
    },
    methods: {
        // 匹配对应显示
        industryFormat (row, column) {
            if (row.industryType === "") {
                return "-";
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
        },
        edit (row) {
            this.dialogVisibleEdit = true;
            // this.$refs.customerEdit.$refs.ruleForm && this.$refs.customerEdit.$refs.ruleForm.resetFields()

            let v = row.actionTime.split(" ");
            if (v && v.length > 0) {
                row.timePicker = v[0];
                row.dataPicker = v[1];
            } else {
                row.timePicker = "";
                row.dataPicker = "";
            }
            this.ajax
                .json(
                    "/dcp/comm/bank/client/name/by/phone/bank/no",
                    { phone: row.simNumber, bankTailNo: row.account },
                    {
                        type: "get"
                    }
                )
                .then(res => {
                    if (res.code === "200") {
                        this.$refs.customerEdit.ruleForm = deepClone(row)
                        this.$refs.customerEdit.clientNameArray = deepClone(res.data)
                        this.$refs.customerEdit.ruleForm.clientName = res.data[0].id
                    }
                });
        },
        lookOver (row) {
            this.dialogVisibleLookOver = true
            this.$refs.customerLookOver.content = row.content
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
        exportData () {
            this.ajax
                .json("/dcp/comm/sms/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
        getList () {
            this.ajax.json("/dcp/comm/sms/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;

                this.pageIncomeTotal = res.data.records.length > 0 ? res.data.records[0].pageIncomeTotal : 0
                this.pagePayTotal = res.data.records.length > 0 ? res.data.records[0].pagePayTotal : 0
                this.allIncomeTotal = res.data.records.length > 0 ? res.data.records[0].allIncomeTotal : 0
                this.allPayTotal = res.data.records.length > 0 ? res.data.records[0].allPayTotal : 0
            });
        },
        reSet () {
            this.dateArr = [];
            this.params = {
                current: 1,
                size: 10,
                industryType: "",
                actionTimeStart: "",
                actionTimeEnd: "",
                action: "",
                clientName: "",
                account: "",
                bank: "",
                objectName: "",
                simNumber: ""
            };
            this.getList()
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.actionTimeStart = v[0];
                this.params.actionTimeEnd = v[1];
            } else {
                this.params.actionTimeStart = "";
                this.params.actionTimeEnd = "";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    .detail_content {
        display: inline-block;
        font-size: 14px;
        margin-right: 70px;
        .detail_title {
            color: #d3d3d4;
        }
        .detail_num {
            color: #43a1ac;
        }
    }
}
.light {
    .detail_content {
        display: inline-block;
        font-size: 14px;
        margin-right: 70px;
        .detail_title {
            color: #666;
        }
        .detail_num {
            color: #4064d4;
        }
    }
}
</style>
