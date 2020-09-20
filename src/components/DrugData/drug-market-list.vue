<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-select v-model='params.companyName' clearable placeholder="公司名称" @change=" v => getCustomer(v)" class='el-item-form-width'>
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
                <el-select v-model='params.customerId' clearable placeholder="客户名称">
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
            <el-form-item style="width: 260px">
                <el-autocomplete popper-class="select-name" :trigger-on-focus="false" v-model="params.customerName" :fetch-suggestions="querySearchAsync" placeholder="下游" @select="handleSelect" style="width: 260px">
                    <template slot-scope="scope">
                        <div>{{scope.item}}</div>
                    </template>
                </el-autocomplete>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.invoiceNumber" maxlength="20" clearable placeholder="发票号码"></el-input>
            </el-form-item>
            <el-form-item style="width: 350px">
                <el-date-picker v-model="value1" type="daterange" @change="changeDate" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="pageData.pageNum = 1 ,initData()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
                <el-button type="info" @click="pageData.pageNum = 1 ,confirmHand()">更新
                </el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="initData(true)"></span>
            </el-tooltip>
        </el-row>

        <el-table :data="form.data" show-summary :summary-method="getSummaries" style="width: 100%" id="table">
            <el-table-column show-overflow-tooltip prop="salesDate" label="日期" width="100" fixed></el-table-column>
            <el-table-column show-overflow-tooltip prop="companyName" label="公司名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="companySubname" width="200" label="分子公司"></el-table-column>
            <el-table-column show-overflow-tooltip prop="agentName" label="客户名称" width="130"></el-table-column>
            <el-table-column show-overflow-tooltip prop="productName" label="药品名称" width="140"></el-table-column>
            <el-table-column show-overflow-tooltip prop="productSpec" label="规格" width="160"></el-table-column>
            <el-table-column show-overflow-tooltip prop="packingUnit" label="单位" width="50"></el-table-column>
            <el-table-column show-overflow-tooltip prop="batchNumber" label="批号" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="endDate" label="有效期" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="quantity" label="数量" width="200">
                <template slot-scope="scope">
                    {{scope.row.quantity?getFloat(scope.row.quantity,4):''}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="price" label="单价" align="right" width="100">
                <template slot-scope="scope">
                    {{scope.row.price?getFloat(scope.row.price,4):''}}
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="taxAmount" align="right" label="金额" width="230">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="producer" label="生产厂家" width="240"></el-table-column>
            <el-table-column show-overflow-tooltip prop="salesDepartment" label="销售部门" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="customerName" label="下游" width="240"></el-table-column>
            <el-table-column show-overflow-tooltip prop="deliveryAddress" label="收货地址" width="240"></el-table-column>
            <el-table-column show-overflow-tooltip prop="invoiceNumber" label="发票号码" width="130"></el-table-column>
            <el-table-column show-overflow-tooltip prop="gpoLogo" label="GPO标识" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="paymentAmount" label="回款金额" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="paymentTotalAmount" label="回款总金额" width="100"></el-table-column>
            <el-table-column prop="orderNo" label="销售细单ID" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="originalOrderNo" label="原销售细单ID" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="discountRate" label="折扣率" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="discountSaleAmount" label="折扣后销售额" show-overflow-tooltip width="180">
            </el-table-column>
            <el-table-column prop="customerType" label="企业分类" show-overflow-tooltip width="150">
            </el-table-column>
            <el-table-column prop="formula" label="剂型" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="approvalNo" label="批准文号" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="productCategory" label="商品类别" show-overflow-tooltip width="140"></el-table-column>
            <el-table-column prop="taxProfit" label="含税毛利" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="taxProfitRatio" label="含税毛利率" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="invoiceDate" label="发票日期" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="noTaxAmount" label="无税金额" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="paymentType" label="收款类别" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="settlementDate" label="结算日期" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="draftDate" label="汇票日期" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="bankBillNo" label="银行票据号" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="bankName" label="银行" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="paymentDate" label="回款时间" show-overflow-tooltip width="120"></el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total.sync='form.meta.totalSize' :page-size="pageData.pageSize" :current-page.sync="pageData.pageNum"
            @size-change="v => { pageData.pageSize = v,  initData()}" @current-change="initData()">
        </el-pagination>
        <el-dialog :visible.sync="isDialog" :show-close="false" :center="true" title="该条数据是否为业务合作数据？" width="400px">
            <div class="tc">
                <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="0">否</el-radio>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateCooperation">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isDialog3" :show-close="true" :center="true" title="请确认更新国控河南数据" width="400px">
            <div class="tc">
                该更新预计需要 1~30 分钟完成
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDialog3 = false">取 消</el-button>
                <el-button type="primary" @click="updateData();isDialog3=false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            totalNum: "",
            totalAmount: "",
            expansion: false,
            isData: false,
            isDialog: false,
            isDialog3: false,
            radio: "0",
            value1: [],
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
                beginDate: "", //	string	否	开始日期
                endDate: "", //	string	否	结束日期
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
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.beginDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.beginDate = "";
                this.params.endDate = "";
            }
        },
        reSet () {
            this.params = {
                customerId: "",
                beginDate: "", //	string	否	开始日期
                endDate: "", //	string	否	结束日期
                companyName: "", //	string	否	公司名称
                agentName: "", //	string	否	客户名称
                productName: "", //	string	否	药品名称
                companySubname: ""
            };
            this.value1 = [];
            this.initData();
        },
        handleSelect (item) {
            this.params.customerName = item;
        },
        querySearchAsync (queryString, cb) {
            // this.params.customerName = ''
            // console.log("querystring", queryString);
            // var customerName = ''
            var vm = this;
            // customerName = vm.params.customerName
            if (queryString && queryString.length < 1) {
                console.log("aaaa");
                // vm.$message({
                //     message: '您输入的字数太少，查询过于宽泛',
                //     type: 'error'
                // })
                cb([]);
            } else {
                vm.$http(
                    "/drug_flow/sale/customer/name/list",
                    { customerName: this.params.customerName },
                    { type: 'formdata' }
                )
                    .then(res => {
                        vm.arr = res.data;
                        console.log();
                        if (!vm.arr) {
                            vm.$message({
                                message: "未查询到结果",
                                type: "error"
                            });
                            cb([]);
                        } else {
                            var results = vm.arr || [];
                            console.log("res", results);
                            cb(results);
                        }
                    })
                    .catch(res => {
                        vm.$message({
                            message: res.message,
                            type: "error"
                        });
                        cb([]);
                    });
            }
        },
        createStateFilter (queryString) {
            return state => {
                return (
                    state.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
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
            await this.$http(
                "/drug_flow/reptile/gyhn",
                {},
                { type: "formdata" }
            );
        },
        async initData (isExport = false) {
            let param = {};
            if (isExport) {
                param = { ...this.params, ...this.expPageData };
            } else {
                param = { ...this.params, ...this.pageData };
            }
            let res = await this.$http("/drug_flow/sale/list", param);
            if (isExport) {
                this.exportExl(res.data);
                return;
            }
            this.form = res;
            this.isData = !!res.data.length;
            // let res2 = await this.$http("/drug_flow/sale/sum/number", param);
            // this.totalNum = res2.data.quantity.toFixed(2);
            // this.totalAmount = res2.data.taxAmount.toFixed(2);
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
                    type: 2
                },
                { type: "formdata" }
            );
            this.subCompanyData = res2.data;
        },
        /* 修改入库业务合作类型 */
        async updateCooperation () {
            await this.$http("/drug_flow/purchase/cooperation/update", {
                id: this.id,
                isCooperation: this.radio
            });
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
                const tHeader = [
                    "日期",
                    "公司名称",
                    "分子公司",
                    "客户名称",
                    "药品名称",
                    "规格",
                    "单位",
                    "批号",
                    "有效期",
                    "数量",
                    "单价",
                    "金额",
                    "生产厂家",
                    "销售部门",
                    "下游",
                    "收货地址",
                    "发票号码",
                    "GPO标识",
                    "回款金额",
                    "回款总金额",
                    "销售细单ID",
                    "原销售细单ID",
                    "折扣率",
                    "折扣后销售额",
                    "企业分类"
                ];
                const filterVal = [
                    "salesDate",
                    "companyName",
                    "companySubname",
                    "agentName",
                    "productName",
                    "productSpec",
                    "packingUnit",
                    "batchNumber",
                    "endDate",
                    "quantity",
                    "price",
                    "taxAmount",
                    "producer",
                    "salesDepartment",
                    "customerName",
                    "deliveryAddress",
                    "invoiceNumber",
                    "gpoLogo",
                    "paymentAmount",
                    "paymentTotalAmount",
                    "orderNo",
                    "originalOrderNo",
                    "discountRate",
                    "discountSaleAmount",
                    "customerType"
                ];
                // const tHeader = ['日期', '公司名称', '分子公司', '客户名称', '药品名称', '规格', '单位', '批号', '有效期', '数量', '单价', '金额', '生产厂家', '销售部门', '下游', '收货地址', '发票号码', 'GPO标识','回款金额']
                // const filterVal = ['salesDate', 'companyName', 'companySubname', 'agentName', 'productName', 'productSpec', 'packingUnit', 'batchNumber', 'endDate', 'quantity', 'price', 'taxAmount', 'producer', 'salesDepartment', 'customerName', 'deliveryAddress', 'invoiceNumber', 'gpoLogo','paymentAmount']

                const data = this.formatJson(filterVal, db);

                excel.export_json_to_excel({
                    // title: title,
                    header: tHeader,
                    data,
                    filename: "销售数据",
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
                if ([9].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values
                            .reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0)
                            .toFixed(2);
                    } else {
                        sums[index] = "";
                    }
                }
                if ([11].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values
                            .reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0)
                            .toFixed(2);
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


