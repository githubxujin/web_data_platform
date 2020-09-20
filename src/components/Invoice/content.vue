<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" @submit.native.prevent="params.pageNum = 1,initData()">
            <el-form-item>
                <el-input v-model="params.content" clearable style="width:380px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn" size="medium" @click="params.pageNum = 1,initData()">查询
                </el-button>

            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daoru' @click='exportData' :disabled="!isData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="form.data">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <child-table :scope="scope" v-on:curItems="curItemChange"></child-table>
                </template>
            </el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="batchNum" label="业务编号" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="invoiceCode" label="发票代码" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="invoiceNo" label="发票号码" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="invoiceAmount" label="不含税金额" width="180" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.invoiceAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="totalAmount" label="价税合计" width="180" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.totalAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="invoiceDate" label="开票日期" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="projectName" label="发票备注" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="customerName" label="客户名称" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="counterpartyName" label="对方客户" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="buyerName" label="发票购买方" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="salerName" label="发票销售方" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="invoiceStatus" label="验真结果" width="100" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.invoiceStatus | invoiceStatusStr}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="riskStatus" label="内容标识" width="180" align="center">
                <template slot-scope="scope">
                    <span>{{riskStatus[scope.row.riskStatus+'']}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-nav" v-if="isData">
            <el-pagination layout="jumper, prev, pager, next, total" :total.sync='form.meta.totalSize' :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="initData()">
            </el-pagination>
        </div>
        <el-dialog :visible.sync="isDialog" width="30%">
            <span>删除已上传文件？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialog = false">取 消</el-button>
                <el-button type="primary" @click="isDialog = false,delData()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog v-if="isDialog1" :visible.sync="isDialog1" :close-on-click-modal="false" width="500px">
            <el-form :model="curItem" status-icon :show-message="false" size="small" style=" padding: 0 20px">

                <el-form-item label="备注：">
                    <el-input type="textarea" v-model="curItem.remark" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}" maxlength="20"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDialog1 = false">取 消</el-button>
                <el-button type="primary" @click="saveFeedbackRemark">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import childTable from "./components/childTable";
import { mapState } from "vuex";
export default {
    components: {
        childTable
    },
    data () {
        return {
            disabledButton: false,
            baseURL: process.env.VUE_APP_INVOCE_URL,
            updateFlag: true,
            isDialog: false,
            isDialog1: false,
            curItem: {},
            isData: false,
            isExport: false,
            delID: "",
            form: {
                data: [],
                meta: {}
            },
            params: {
                content: "", // 搜索内容key,非必传
                type: "2", // 必传 1:已验真发票列表查询 2:发票内容全局搜索
                pageNum: 1,
                pageSize: 10
            },
            riskStatus: {
                0: "待定",
                1: "正常",
                2: "异常",
                3: "失败",
                4: "未知"
            },
            expPageData: {
                pageNum: 1,
                pageSize: 10000000
            }
        };
    },
    // computed: {
    //     fileAPI() {
    //         return this.env + "/invoice/file/";
    //     }
    // },
    computed: mapState({
        token: state => state.user.token
    }),
    mounted () {
        this.initData();
        console.log(this.form.data.length);
    },
    methods: {
        curItemChange: function (v) {
            console.log(v);
            this.isDialog1 = true;
            this.curItem = JSON.parse(JSON.stringify(v));
        },
        gotoFile (fileId) {
            return `${this.fileAPI}${fileId}?access_token=${this.token}`;
        },
        gotoValid (id) {
            // window.open(`192.168.3.36?id=${id}&token=${getStore('token')}`)
            window.open(`${this.baseURL}?id=${id}&token=${this.token}`);
        },
        async initData (isExport = false) {
            let res = await this.$http("/invoice/detail/list", this.params, {
                type: "formdata"
            });
            if (res.code === "200") {
                this.form = res;
                this.isData = !!(res.data && res.data.length);
            }
        },
        onSubmit () {
            this.$refs["importForm"].submitForm();
        },
        restForm () {
            this.params = {
                result: "", // 验真结果 1:全部通过 2:非全部通过
                customerName: "", // 公司名称
                batchNum: "", // 编号
                pageNum: 1,
                pageSize: 10
            };
            this.initData();
        },
        /* 删除文件 */
        async delData () {
            let id = this.delID;
            if (!id) {
                this.$message.error("删除ID不能为空！");
                return;
            }
            let res = await this.$http(
                `/invoice/remove/${id}`,
                {},
                { type: "formdata" }
            );
            if (res.code === "200") {
                this.$message.success("删除成功！");
                this.initData();
            }
        },
        // 添加备注
        remarkHand (v) {
            this.curItem = JSON.parse(JSON.stringify(v));
            this.isDialog1 = true;
        },
        async saveFeedbackRemark () {
            let res = await (`/invoice/remark/update`,
                this.curItem,
                { type: "formdata" });
            if (res.code === "200") {
                this.$message.success("编辑成功！");
                this.isDialog1 = false;
                this.initData();
            }
        },
        /* 导出文件 */
        async exportData () {
            await this.$http(`/invoice/content/export`, this.params, {
                type: "export"
            });
        },
        exportExl (db) {
            import("@/utils/Export2Excel").then(excel => {
                const tHeader = [
                    "业务编号",
                    "公司名称",
                    "创建日期",
                    "创建人",
                    "上次验真日期",
                    "验真结果"
                ];
                const filterVal = [
                    "batchNum",
                    "customerName",
                    "createTime",
                    "createBy",
                    "checkTime",
                    "result"
                ];
                const data = this.formatJson(filterVal, db);

                let name = `发票`;
                if (this.params.customerName) {
                    name += "_" + this.params.customerName;
                }
                if (this.params.batchNum) {
                    name += "_" + this.params.batchNum;
                }
                if (this.params.result) {
                    name +=
                        "_" +
                        ["全部通过", "非全部通过"][this.params.result * 1 - 1];
                }
                name += "_" + this.formatDate(new Date(), "YYYYMMDD");

                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: name,
                    autoWidth: true
                });
            });
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    return v[j];
                })
            );
        }
    },
    watch: {
        updateFlag () {
            this.initData();
        }
    },
    filters: {
        invoiceStatusStr (val) {
            switch (val) {
                case "0":
                    return "待查验";
                case "1":
                    return "已通过";
                case "2":
                    return "未通过";
                case "3":
                    return "已作废";
                case "4":
                    return "已过期";
                case "5":
                    return "不一致";
                case "6":
                    return "无此票";
                default:
                    break;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.importInfo /deep/ .el-dialog__footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid #e2e4ed;
    background-color: #f5f6fa;
    button {
        padding: 9px 25px;
    }
}

.importInfo /deep/ .el-dialog__header {
    border-bottom: 1px solid #e2e4ed;
}
/deep/ .el-table__expanded-cell[class*='cell'] {
    padding: 40px 50px;
}
.remark {
    border: none;
}
</style>
