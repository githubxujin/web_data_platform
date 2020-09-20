<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-select v-model="params.companyName" clearable placeholder="公司名称" @change=" v => getCustomer(v)" class='el-item-form-width'>
                    <el-option v-for="item in companyData" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.companySubname' clearable placeholder="分子公司名称" class='el-item-form-width'>
                    <el-option v-for="item in subCompanyData" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.customerId' clearable placeholder="客户名称" class='el-item-form-width'>
                    <el-option v-for="item in customerData" :key="item.id" :label="item.agentName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.productName" clearable placeholder="药品名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.productSpec" clearable placeholder="规格"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.batchNumber" clearable placeholder="批号"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.isCooperation' clearable placeholder="业务合作">
                    <el-option v-for="item in CooperationData" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width: 350px">
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="日期开始" end-placeholder="日期结束">
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
                <i class="iconfont icon-shujuzhongxin-daochu" @click="initData(true)" :disabled="!isData"></i>
            </el-tooltip>
        </el-row>

        <el-table :data="form.data" show-summary :summary-method="getSummaries" style="width: 100%" id="table">
            <el-table-column prop="incomingDate" label="日期" width="100" fixed></el-table-column>
            <el-table-column prop="companyName" width="100" label="公司名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="companySubname" width="200" label="分子公司" show-overflow-tooltip></el-table-column>
            <el-table-column prop="agentName" label="客户名称" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="productName" label="药品名称" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="productSpec" label="规格" show-overflow-tooltip width="160"></el-table-column>
            <el-table-column prop="packingUnit" label="单位" show-overflow-tooltip width="50"></el-table-column>
            <el-table-column prop="batchNumber" label="批号" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="endDate" label="有效期" show-overflow-tooltip width="100"></el-table-column>
            <el-table-column prop="quantity" label="数量" show-overflow-tooltip width="200">
                <template slot-scope="scope">
                    {{scope.row.quantity?getFloat(scope.row.quantity,4):''}}
                </template>
            </el-table-column>
            <el-table-column prop="price" label="单价" width="100" show-overflow-tooltip align="right">
                <template slot-scope="scope">
                    {{scope.row.price?getFloat(scope.row.price,4):''}}
                </template>
            </el-table-column>
            <el-table-column prop="taxAmount" label="金额" align="right" show-overflow-tooltip width="230">
            </el-table-column>
            <el-table-column prop="producer" label="生产厂家" show-overflow-tooltip width="240"></el-table-column>
            <el-table-column prop="supplierName" label="供应商" show-overflow-tooltip width="240"></el-table-column>
            <el-table-column prop="isCooperation" label="业务合作" show-overflow-tooltip width="240">
                <template slot-scope="scope">
                    <span>{{scope.row.isCooperation === '1' ? '是' : '否'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="orderNo" label="进货细单ID" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="originalOrderNo" label="原进货细单ID" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="formula" label="剂型" show-overflow-tooltip width="110"></el-table-column>
            <el-table-column prop="approvalNo" label="批准文号" show-overflow-tooltip width="180"></el-table-column>
            <el-table-column prop="productCategory" label="商品类别" show-overflow-tooltip width="140"></el-table-column>
            <el-table-column prop="upstreamType" label="上游分类" show-overflow-tooltip width="140"></el-table-column>
            <el-table-column prop="address" label="操作" align="center" width="100" fixed="right">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click="handleClick(scope.row)">标记</el-button>
                </template>
            </el-table-column>
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
                <el-button type="info" @click="isDialog = false">取 消</el-button>
                <el-button type="primary" @click="updateCooperation">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isDialog3" :show-close="true" :center="true" title="请确认更新国控河南数据" width="400px">
            <div class="tc">
                <!-- <el-radio v-model="radio" label="1">是</el-radio>
                <el-radio v-model="radio" label="0">否</el-radio> -->
                该更新预计需要 1~30 分钟完成
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog3 = false">取 消</el-button>
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
            isDialog2: false,
            isDialog3: false,
            radio: "0",
            value1: [],
            companyData: {},
            subCompanyData: [],
            customerData: {},
            CooperationData: [
                { label: "否", value: 0 },
                { label: "是", value: 1 }
            ],
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
                companySubname: "",
                agentName: "", //	string	否	客户名称
                productName: "", //	string	否	药品名称
                isCooperation: "" //	string	否	业务合作类型
            },
            sizeCount: 90,
            summary1: {
                label: "合计",
                data: {
                    amount1: 13414,
                    amount2: 13414,
                    amount3: 13414
                }
            },
            summary2: {
                label: "总计",
                data: {
                    amount1: 13414,
                    amount2: 13414,
                    amount3: 13414
                }
            }
        };
    },
    mounted () {
        this.initData();
        this.getCompany();
        this.getCustomer();
        // tableFooter.init(table);
    },
    computed: {
        footerData () {
            return [this.summary1, this.summary2];
        }
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
                companySubname: "",
                agentName: "", //	string	否	客户名称
                productName: "", //	string	否	药品名称
                isCooperation: "" //	string	否	业务合作类型
            };
            this.value1 = [];
            this.initData();
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
        confirmd () {
            this.$confirm("该条数据是否为业务合作数据？", "提示", {
                confirmButtonText: "是",
                cancelButtonText: "否"
            })
                .then(() => {
                    this.updateCooperation("1");
                })
                .catch(() => {
                    this.updateCooperation("0");
                });
        },
        numFormat (num, t) {
            if (parseFloat(num) === 0) return 0;
            if (!num) return "";
            num = num.toString();
            // num = Number(num).toFixed(2) // toFixed会4舍5入

            if (num.includes(".")) {
                // 修复数字过长自动转为科学计算法
                num = num.substring(0, num.lastIndexOf(".") + 3);
            } else {
                num += ".00";
            }

            return t === false
                ? num
                : num.toString().replace(/\d+/, function (n) {
                    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
                        return $1 + ",";
                    });
                });
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
                })
                .catch(() => { });
        },

        async updateData () {
            // console.log("更新");
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
            let res = await this.$http("/drug_flow/purchase/list", param, {
                type: "post"
            });
            if (isExport) {
                this.exportExl(res.data);
                return;
            }
            this.form = res;
            this.isData = !!res.data.length;
            let res2 = await this.$http(
                "/drug_flow/purchase/sum/number",
                param
            );
            this.totalNum = res2.data.quantity.toFixed(2);
            this.totalAmount = res2.data.taxAmount.toFixed(2);
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
                { type: "formdata" }
            );
            this.customerData = res.data;
            let res2 = await this.$http(
                "/drug_flow/companySubname/list ",
                {
                    companyName,
                    type: 1
                },
                { type: "formdata" }
            );
            this.subCompanyData = res2.data;
        },
        /* 修改入库业务合作类型 */
        async updateCooperation (type) {
            await this.$http(
                "/drug_flow/purchase/cooperation/update",
                { id: this.id, isCooperation: type }
            );
            this.initData();
            this.isDialog = false;
            this.$message.success("修改成功");
        },
        onSubmit () {
            console.log("submit!");
        },
        handleClick (item) {
            this.id = item.id;
            this.radio = item.isCooperation;
            this.confirmd();
        },
        exportExl (db) {
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
                    "供应商",
                    "业务合作",
                    "进货细单ID",
                    "原进货细单ID",
                    "剂型",
                    "批准文号",
                    "商品类别",
                ];
                const filterVal = [
                    "incomingDate",
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
                    "supplierName",
                    "isCooperation",
                    "orderNo",
                    "originalOrderNo",
                    "formula",
                    "approvalNo",
                    "productCategory",
                ];
                // const tHeader = ['日期', '公司名称', '分子公司', '客户名称', '药品名称', '规格', '单位', '批号', '有效期', '数量', '单价', '金额', '生产厂家', '供应商', '业务合作']
                // const filterVal = ['incomingDate', 'companyName', 'companySubname', 'agentName', 'productName', 'productSpec', 'packingUnit', 'batchNumber', 'endDate', 'quantity', 'price', 'taxAmount', 'producer', 'supplierName', 'isCooperation']
                const data = this.formatJson(filterVal, db);

                excel.export_json_to_excel({
                    // title: title,
                    header: tHeader,
                    data,
                    filename: "入库数据",
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
                if ([11].includes(index)) {
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
                                .toFixed(2) + ` / ${this.totalAmount}`;
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



