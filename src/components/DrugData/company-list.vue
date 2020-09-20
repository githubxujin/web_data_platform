<template>
    <div class="pt20">
        <el-form :inline="true" :model="params" ref="ruleForm" size="medium">
            <el-form-item prop="pm">
                <el-select v-model="params.companyName" clearable placeholder="公司名称">
                    <el-option :label="'上海润达'" :value="'上海润达'">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="cpqc">
                <el-input v-model="params.deliveryDesc" maxlength="20" clearable placeholder="送达方"></el-input>
            </el-form-item>
            <el-form-item prop="cpqc">
                <el-input v-model="params.invoiceNumber" maxlength="20" clearable placeholder="发票号码"></el-input>
            </el-form-item>
            <el-form-item prop="cpqc">
                <el-input v-model="params.saleNumber" maxlength="20" clearable placeholder="销售订单"></el-input>
            </el-form-item>
            <el-form-item prop="cpqc">
                <el-input v-model="params.sapDeliveryNumber" maxlength="20" clearable placeholder="SAP交货单"></el-input>
            </el-form-item>

            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="pageData.pageNum = 1 ,initData()">查询</el-button>
            </el-form-item>
            <el-row class="el-iconfont">
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <i class="iconfont icon-shujuzhongxin-daochu" @click="initData(true)" :disabled="!isData"></i>
                </el-tooltip>
            </el-row>
        </el-form>
        <el-table :data="form.data" show-summary :summary-method="getSummaries2">
            <el-table-column prop="invoiceDate" label="发票开具日期" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="deliveryDesc" label="送达方" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="invoiceNumber" label="发票号码" width="180" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a class="cur" @click="getOrder(scope.row.invoiceNumber, scope.row.sapDeliveryNumber)">{{scope.row.invoiceNumber}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="quantity" label="开票数量" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="netValue" label="净值" width="180" align="right" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.netValue | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="tax" label="税额" width="180" align="right" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.tax | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="vat" label="含税金额" width="180" align="right" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{ scope.row.vat | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="saleOrderNumber" label="销售订单" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="sapDeliveryNumber" label="SAP交货单" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="wmsDeliveryNumber" label="WMS交货单号" width="180" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="purchaseOrderNumber" label="采购订单编号" width="180" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total.sync='form.meta.totalSize' :page-size="pageData.pageSize" :current-page.sync="pageData.pageNum"
            @size-change="v => { pageData.pageSize = v,  initData()}" @current-change="initData()">
        </el-pagination>
    </div>
</template>
<script>
import { numFormat } from "@/filters/index";
const validDAYS = (rule, value, callback) => {
    if (!value) {
        callback(new Error("天数不能为空"));
    }
    value = Number(value);
    if (typeof value === "number" && !isNaN(value)) {
        if (value < 1 || value > 360) {
            callback(new Error("请输入1~360天之间的整数"));
        } else if (value % 1 !== 0) {
            callback(new Error("请输入1~360天之间的整数"));
        } else {
            callback();
        }
    } else {
        callback(new Error("请输入1~360天之间的整数"));
    }
};
export default {
    data () {
        return {
            expansion: false,
            isData: false,
            isDialog: false,
            isDialog3: false,
            isDialog4: false,
            customerId: "",
            radio: "0",
            companyData: {},
            subCompanyData: [],
            customerData: {},
            invoiceData: {},
            id: 0,
            form: {
                meta: {}
            },
            pageData: {
                pageNum: 1,
                pageSize: 10
            },
            expPageData: {
                pageNum: 1,
                pageSize: 10000000
            },
            params: {
                companyName: "", // 非必填,公司名称
                beginDate: "", // 开始日期,非必填
                customerId: "", // 客户名称,非必填
                endDate: "", // 结束日期,非必填
                invoiceNumber: "", // 发票号码,非必填
                pageNum: 1, //
                pageSize: 10, //
                saleNumber: "" // 销售订单,非必填
            },
            params2: {
                days: ""
            },
            dateArr: [],
            sizeCount: 90,
            sapNum: "",
            rules: {
                days: [{ validator: validDAYS, trigger: "blur" }]
            }
        };
    },
    mounted () {
        this.initData();
        this.getCompany();
        this.getCustomer("上海润达");
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.beginDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.beginDate = "";
                this.params.endDate = "";
            }
        },
        getFloat (number, n) {
            n = n ? parseInt(n) : 0;
            if (n <= 0) {
                return Math.round(number);
            }
            number = Math.round(number * Math.pow(10, n)) / Math.pow(10, n); // 四舍五入
            if (!number.toString().includes(".")) {
                // console.log(typeof (number))
                // return number
            } else {
                // number = Number(number).toFixed(n) // 补足位数
            }
            return number;
        },
        /* 获取销售订单 */
        async getOrder (num, sapNum) {
            this.sapNum = sapNum;
            let res = await this.$http(
                "/drug_flow/shrd/invoice",
                {
                    invoiceNumber: num
                },
                {
                    type: "formdata"
                }
            );
            if (res.code === "200") {
                this.invoiceData = res.data;
                this.isDialog4 = true;
            }
        },
        subUpdate (id, days) {
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    this.handleUpdate(id, days);
                }
            });
        },
        async handleUpdate (id, days) {
            let res = await this.$http(
                "/drug_flow/reptile/history",
                {
                    customerId: id,
                    days: this.params2.days
                },
                {
                    type: "formdata"
                }
            );
            if (res.code === "200") {
                this.initData();
                this.isDialog3 = false;
                this.$message.success("已开始更新");
            }
        },
        configUpdate () {
            this.$confirm(
                "该更新预计需要 1-30 分钟完成",
                "请确认更新国控河南数据",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    center: true
                }
            )
                .then(() => {
                    this.updateData();
                    this.$message({
                        type: "success",
                        message: "已开始更新"
                    });
                })
                .catch(() => { });
        },
        async updateData () {
            // let res = await this.$http(
            //     "/drug_flow/reptile/gyhn",
            //     {},
            //     { type: "formdata" }
            // );

        },
        async initData (isExport = false) {
            let param = {};
            if (isExport) {
                param = { ...this.params, ...this.expPageData };
            } else {
                param = { ...this.params, ...this.pageData };
            }
            let res = await this.$http("/drug_flow/shrd/list", param);
            if (res.code === "200") {
                if (isExport) {
                    this.exportExl(res.data);
                    return;
                }
                this.form = res;
                this.isData = !!res.data.length;
                this.customerId = res.data[0].customerId;
            }
        },
        async getCompany () {
            let res = await this.$http("/drug_flow/company/list");
            if (res.code === "200") {
                this.companyData = res.data;
            }
        },
        async getCustomer (companyName = "") {
            let res = await this.$http(
                "/drug_flow/agent/list",
                {
                    companyName
                },
                {
                    type: "formdata"
                }
            );
            if (res.code === "200") {
                this.customerData = res.data;
            }
            let res2 = await this.$http(
                "/drug_flow/companySubname/list ",
                {
                    companyName,
                    type: 3
                },
                { type: "formdata" }
            );
            if (res2.code === "200") {
                this.subCompanyData = res2.data;
            }
        },
        /* 修改入库业务合作类型 */
        async updateCooperation () {
            let res = await this.$http(
                "/drug_flow/purchase/cooperation/update",
                { id: this.id, isCooperation: this.radio }
            );
            if (res.code === "200") {
                this.initData();
                this.isDialog = false;
            }
        },
        onSubmit () {
            console.log("submit!");
        },
        handleClick (item) {
            this.isDialog = true;
            this.id = item.id;
            this.radio = item.isCooperation;
            // this.$router.push('/makeover/detail?id=' + item.id)
        },
        exportExl (db) {
            // console.log(Object.values(this.params).join(' '))
            // return
            import("@/utils/Export2Excel").then(excel => {
                // const title = [Object.values(this.params).join('   '), null, null, null]
                const tHeader = [
                    "发票开具日期",
                    "公司名称",
                    "送达方",
                    "发票号码",
                    "单位",
                    "开票数量",
                    "净值",
                    "税额",
                    "含税金额",
                    "销售订单",
                    "SAP交货单",
                    "WMS交货单号",
                    "采购订单编号"
                ];
                const filterVal = [
                    "invoiceDate",
                    "companyName",
                    "deliveryDesc",
                    "invoiceNumber",
                    "unit",
                    "quantity",
                    "netValue",
                    "tax",
                    "vat",
                    "saleOrderNumber",
                    "sapDeliveryNumber",
                    "wmsDeliveryNumber",
                    "purchaseOrderNumber"
                ];
                const data = this.formatJson(filterVal, db);

                let str = "";
                if (this.params.beginDate) {
                    str = this.params.beginDate;
                }
                if (this.params.endDate) {
                    str = this.params.beginDate + "至" + this.params.endDate;
                }

                excel.export_json_to_excel({
                    // title: title,
                    header: tHeader,
                    data,
                    filename: "上海润达销售单_" + str,
                    autoWidth: true
                });
            });
        },
        exportExl2 (db) {
            // console.log(Object.values(this.params).join(' '))
            // return
            import("@/utils/Export2Excel").then(excel => {
                // const title = [Object.values(this.params).join('   '), null, null, null]
                const tHeader = [
                    "发票开具日期",
                    "SAP发票号",
                    "金税发票号",
                    "发票代码",
                    "校验码",
                    "净值",
                    "税额",
                    "含税金额",
                    "会计凭证号"
                ];
                const filterVal = [
                    "invoiceDateString",
                    "sapInvoiceNumber",
                    "invoiceNumber",
                    "invoiceCode",
                    "checkCode",
                    "netValue",
                    "tax",
                    "vat",
                    "accountDocNumber"
                ];
                const data = this.formatJson(filterVal, db);

                excel.export_json_to_excel({
                    // title: title,
                    header: tHeader,
                    data,
                    filename: "上海润达发票_SAP交货单" + this.sapNum + "(部分)",
                    autoWidth: true
                });
            });
        },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "isCooperation") {
                        return v[j] === "1" ? "是" : "否";
                    }
                    return v[j];
                })
            );
        },
        getSummaries (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "汇总";
                    return;
                }
                if (![5, 6, 7].includes(index)) {
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = numFormat(sums[index]);
                } else {
                    sums[index] = "";
                }
            });

            return sums;
        },
        getSummaries2 (param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = "汇总";
                    return;
                }
                if (![5, 6, 7, 8].includes(index)) {
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    if (index !== 5) {
                        sums[index] = numFormat(sums[index]);
                    }
                } else {
                    sums[index] = "";
                }
            });

            return sums;
        }
    }
};
</script>