<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.companyName' clearable placeholder="公司名称" @change=" v => getCustomer(v)">
                    <el-option v-for="item in companyData" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.companySubname' clearable placeholder="分子公司名称">
                    <el-option v-for="item in subCompanyData" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerId" clearable filterable placeholder="客户名称">
                    <el-option v-for="item in customerData" :key="item.id" :label="item.agentName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.productName" maxlength="20" clearable placeholder="药品名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.productSpec" maxlength="20" clearable placeholder="规格"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.batchNumber" maxlength="20" clearable placeholder="批号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="pageData.pageNum = 1 ,initData()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
                <el-button type="info" @click="pageData.pageNum = 1 ,confirmHand()">更新
                </el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="initData(true)" :disabled="!isData"></span>
            </el-tooltip>
        </el-row>

        <el-table :data="form.data" show-summary :summary-method="getSummaries">
            <el-table-column show-overflow-tooltip prop="companyName" label="公司名称" width="100" fixed></el-table-column>
            <el-table-column show-overflow-tooltip prop="companySubname" width="200" label="分子公司"></el-table-column>
            <el-table-column show-overflow-tooltip prop="agentName" label="客户名称" width="130"></el-table-column>
            <el-table-column show-overflow-tooltip prop="productName" label="药品名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="productSpec" label="规格" width="160"></el-table-column>
            <el-table-column show-overflow-tooltip prop="packingUnit" label="单位" width="50"></el-table-column>
            <el-table-column show-overflow-tooltip prop="batchNumber" label="批号" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="endDate" label="有效期" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="quantity" label="库存数量" width="200">
                <template slot-scope="scope">
                    {{scope.row.quantity?getFloat(scope.row.quantity,4):''}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="availableDays" label="剩余可用天数" width="110"></el-table-column>
            <el-table-column show-overflow-tooltip prop="producer" label="生产厂家"></el-table-column>
            <el-table-column show-overflow-tooltip prop="stockAmount" label="库存金额" aligin="right">
                <template slot-scope="item">
                    {{ item.row.stockAmount | numFormat }}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="stockAge" label="库龄" width="110"></el-table-column>
            <el-table-column show-overflow-tooltip prop="stockDate" label="入库日期" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="stockInvoice" label="入库发票号" width="150">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="orderNo" label="入库单据" width="180"></el-table-column>
            <el-table-column prop="drugFormula" label="剂型" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="approvalNo" label="批准文号" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="productCategory" label="商品类别" show-overflow-tooltip width="140"></el-table-column>
            <el-table-column prop="isTwop" label="是否二票" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="noTaxAmount" label="无税金额" show-overflow-tooltip width="120">
                <template slot-scope="item">
                    {{ item.row.noTaxAmount | numFormat }}
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total.sync='form.meta.totalSize' :page-size="pageData.pageSize" :current-page.sync="pageData.pageNum"
            @size-change="v => { pageData.pageSize = v,  initData()}" @current-change="initData()">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            total: 0,
            totalNum: "",
            expansion: false,
            isData: false,
            isDialog: false,
            isDialog3: false,
            radio: "0",
            companyData: {},
            subCompanyData: [],
            customerData: {},
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
                customerId: "",
                companyName: "", //	string	否	公司名称
                agentName: "", //	string	否	客户名称
                productName: "", //	string	否	药品名称
                companySubname: ""
            },
            sizeCount: 90
        };
    },
    mounted () {
        this.initData();
        this.getCompany();
        this.getCustomer();
    },
    methods: {
        reSet () {
            this.params = {
                customerId: "",
                companyName: "", //	string	否	公司名称
                agentName: "", //	string	否	客户名称
                productName: "", //	string	否	药品名称
                companySubname: ""
            };
            this.initData();
        },
        handleSizeChange (v) {
            this.params.size = v;
        },
        confirmHand () {
            this.$confirm(
                "请确认更新国控河南数据，该更新预计需要 1~30 分钟完成",
                "提示"
            )
                .then(() => {
                    this.updateData();
                })
                .catch(() => { });
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
            let res = await this.$http("/drug_flow/stock/list", param, {
                type: "post"
            });
            if (isExport) {
                this.exportExl(res.data);
                return;
            }
            this.form = res;
            this.total = res.data.total;
            this.isData = !!res.data.length;
            let res2 = await this.$http("/drug_flow/stock/sum/number", param);
            this.totalNum = res2.data.toFixed(2);
        },
        async getCompany () {
            let res = await this.$http("/drug_flow/company/list");
            this.companyData = res.data;
        },
        async getCustomer (companyName = "") {
            let res = await this.$http(
                "/drug_flow/agent/list",
                {
                    companyName
                },
                { type: "formdata" }
            );
            this.customerData = res.data;
            let res2 = await this.$http(
                "/drug_flow/companySubname/list ",
                {
                    companyName,
                    type: 3
                },
                {
                    type: "formdata"
                }
            );
            this.subCompanyData = res2.data;
        },
        /* 修改入库业务合作类型 */
        async updateCooperation () {
            // let res = await this.$http(
            //     "/drug_flow/purchase/cooperation/update",
            //     { id: this.id, isCooperation: this.radio }
            // );
            this.initData();
            this.isDialog = false;
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
                const tHeader = ['公司名称', '分子公司', '客户名称', '药品名称', '规格', '单位', '批号', '有效期', '库存数量', '预计可用天数', '生产厂家', '库存金额', '库龄', '入库日期', '入库发票号', '入库单据']
                const filterVal = ['companyName', 'companySubname', 'agentName', 'productName', 'productSpec', 'packingUnit', 'batchNumber', 'endDate', 'quantity', 'availableDays', 'producer', 'stockAmount', 'stockAge', 'stockDate', 'stockInvoice', 'orderNo']
                const data = this.formatJson(filterVal, db);

                excel.export_json_to_excel({
                    // title: title,
                    header: tHeader,
                    data,
                    filename: "库存数据",
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
                    sums[index] = "合计";
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if ([8].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] =
                            values
                                .reduce((prev, curr) => {
                                    const value = Number(curr);
                                    if (!isNaN(value)) {
                                        return prev + curr;
                                    } else {
                                        return prev;
                                    }
                                }, 0)
                                .toFixed(2) + ` / ${this.totalNum}`;
                    } else {
                        sums[index] = "";
                    }
                }
            });

            return sums;
        }
    }
};
</script>



