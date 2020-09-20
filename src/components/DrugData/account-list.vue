<template>
    <div class="pt20">
        <el-form :inline="true" :model="params" size="medium">
            <el-form-item>
                <el-form-item prop="pm">
                    <el-select v-model="pageData.companyName" clearable placeholder="公司名称" @change=" v => getCustomer(v)">
                        <el-option v-for="item in companyData" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="gg">
                    <el-select v-model="pageData.customerId" filterable clearable placeholder="客户名称">
                        <el-option v-for="item in customerData" :key="item.id" :label="item.agentName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="pageData.pageNum = 1 ,initData()">查询</el-button>
                    <el-button @click="addHandle" type="info">添加</el-button>
                </el-form-item>
            </el-form-item>
        </el-form>
        <el-table :data="form.data">
            <el-table-column show-overflow-tooltip prop="companyName" width="100" label="公司名称">
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="agentName" label="客户名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="account" label="账号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="errorCount" label="异常次数"></el-table-column>
            <el-table-column prop="address" label="操作" fixed="right" align="center" width="380px">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === '1'" type="info" class="c_O2" @click="item = scope.row, confirmOn('0')" plain>停用</el-button>
                    <el-button v-if="scope.row.status === '0'" type="info" class="c_O2" @click="item = scope.row, confirmOn('1')" plain>启用</el-button>
                    <el-button type="info" class="c_O2" @click="editHandle(scope.row)" :disabled="scope.row.agentName === '系统'" plain>编辑</el-button>
                    <el-button :disabled="scope.row.status === '0' || scope.row.agentName === '系统'" type="info" class="c_O2" @click="updateData(scope.row)" plain>更新</el-button>
                    <el-button :disabled="scope.row.agentName === '系统'" type="info" class="c_O2" @click="clearException(scope.row)" plain>清除异常</el-button>
                    <el-button type="danger" @click="item = scope.row, confirmDel()" plain>删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 50, 100]" :total.sync='form.meta.totalSize' :page-size="pageData.pageSize" :current-page.sync="pageData.pageNum"
            @size-change="v => { pageData.pageSize = v,  initData()}" @current-change="initData">
        </el-pagination>

        <el-dialog :visible.sync="isDialog1" :show-close="false" :center="true" title="是否停用该源数据账号？" width="400px">
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog1 = false">取 消</el-button>
                <el-button type="primary" @click="updateState('0')">停 用</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isDialog2" :show-close="false" :center="true" title="是否启用该源数据账号？" width="400px">
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog2 = false">取 消</el-button>
                <el-button type="primary" @click="updateState('1')">启 用</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync="isDialog3" :show-close="false" :center="true" title="是否删除该源数据账号？" width="400px">
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog3 = false">取 消</el-button>
                <el-button type="primary" @click="delUser" size="mini">删 除</el-button>
            </span>
        </el-dialog>

        <el-dialog v-if="isDialog4" title="账号信息" :visible.sync="isDialog4" :close-on-click-modal="false" width="520px">
            <el-form :model="params" ref="ruleForm" :rules="rules" status-icon :show-message="false" label-width="80px" size="small" style=" padding: 0 20px">
                <el-form-item label="公司名称" prop="companyName">
                    <el-select v-model="params.companyName" clearable placeholder="请选择公司名称" style="width:100%">
                        <el-option v-for="item in companyData" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" prop="agentName">
                    <el-input v-model="params.agentName" placeholder="请输入客户名称" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="account">
                    <el-input v-model="params.account" placeholder="请输入账号" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="params.password" placeholder="请输入密码" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog4 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleClick(!!params.id)" size="mini">保 存</el-button>
            </div>
        </el-dialog>
        <el-dialog v-if="isDialog5" :visible.sync="isDialog5" :close-on-click-modal="false" width="520px" title="请确认更新该客户数据">
            <el-form :model="params2" ref="ruleForm" :rules="rules" status-icon label-width="80px" size="small" style=" padding: 0 20px;text-align: center;" :inline="true">
                <el-form-item label="需要更新的数据天数" prop="days" label-width="150">
                    <el-input v-model="params2.days" placeholder="请输入1~360" maxlength="50"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="isDialog5 = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="subUpdate(params.id,params2.days)" size="mini">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { validateURL } from "@/config/validate";
const validURL = (rule, value, callback) => {
    if (value === "") {
        callback(new Error("请输入地址"));
    } else {
        if (!validateURL(value)) {
            callback(new Error("地址格式不正确"));
        } else {
            callback();
        }
    }
};
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
            isData: false,
            isDialog1: false,
            isDialog2: false,
            isDialog3: false,
            isDialog4: false,
            isDialog5: false,
            radio: "0",
            companyData: {},
            customerData: {},
            id: 0,
            form: {
                meta: {}
            },
            pageData: {
                companyName: "", //	string	否	公司名称
                customerId: "", //	string	否	客户名称
                pageNum: 1,
                pageSize: 10
            },
            params: {
                agentName: "", //	string	否	公司名称
                customerId: "", //	string	否	客户名称
                account: "", //	账号
                password: "" //	密码
            },
            params2: {
                days: ""
            },
            item: null, // 当前数据条
            rules: {
                companyName: [
                    { required: true, message: "请输入天数", trigger: "change" }
                ],
                websiteUrl: [{ validator: validURL, trigger: "blur" }],
                agentName: [
                    {
                        required: true,
                        message: "请输入客户名称",
                        trigger: "blur"
                    }
                ],
                account: [
                    { required: true, message: "请输入账号", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                days: [{ validator: validDAYS, trigger: "blur" }]
            }
        };
    },
    mounted () {
        this.initData();
        this.getCompany();
        this.getCustomer();
    },
    methods: {
        confirmOn (isOn) {
            this.$confirm(
                isOn === "1"
                    ? "是否启用该源数据账号？"
                    : "是否停用该源数据账号？",
                "提示"
            )
                .then(() => {
                    this.updateState(isOn);
                })
                .catch(() => { });
        },
        confirmDel () {
            this.$confirm("是否删除该源数据账号？", "提示")
                .then(() => {
                    this.delUser();
                })
                .catch(() => { });
        },
        async clearException (row) {
            let res = await this.$http(
                `/drug_flow/customer/clearError/${row.id}`
            );
            if (res.code === "200") {
                this.initData();
            }
        },
        async initData (type) {
            let res = await this.$http(
                "/drug_flow/customer/list",
                this.pageData
            );
            if (res.code === "200") {
                this.form = res;
                this.isData = !!res.data.length;
            }
        },
        async getCustomer (companyName = "") {
            let res = await this.$http("/drug_flow/agent/list", {
                companyName
            });
            if (res.code === "200") {
                this.customerData = res.data;
            }
        },
        async getCompany () {
            let res = await this.$http("/drug_flow/company/list");
            if (res.code === "200") {
                this.companyData = res.data;
            }
        },
        // async getCustomer () {
        //     let res = await this.ajax.json('/drug_flow/agent/list')
        //     if (res.code === '200') {
        //         this.customerData = res.data
        //     }
        // },
        /* 修改账号状态 */
        async updateState (status) {
            let res = await this.$http(
                `drug_flow/customer/${this.item.id}/update/${status}`,
                {},
                { type: "post" }
            );
            if (res.code === "200") {
                this.initData();
                this.isDialog1 = this.isDialog2 = false;
            }
        },
        /* 删除账号状态 */
        async delUser () {
            let res = await this.$http(
                `drug_flow/customer/delete/${this.item.id}`,
                {},
                { type: "post" }
            );
            if (res.code === "200") {
                this.initData();
                this.isDialog3 = false;
            }
        },
        addHandle () {
            this.clearValidate();
            for (let v in this.params) {
                this.params[v] = "";
            }
            delete this.params.id;
            this.isDialog4 = true;
        },
        editHandle (item) {
            this.params = { ...this.params, ...item };
            this.isDialog4 = true;

            this.resetForm();
        },
        updateData (item) {
            this.params = { ...this.params, ...item };
            this.isDialog5 = true;
            // console.log('params',this.params)
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
                this.isDialog5 = false;
                // this.params2.days = ''
                this.$message.success("已开始更新");
            }
        },
        /* 添加账号 */
        async addUser () {
            let res = await this.$http("/drug_flow/customer/add", this.params, {
                type: "post"
            });
            if (res.code === "200") {
                this.initData();
                this.isDialog4 = false;
                this.$message.success("添加成功");
            }
        },
        /* 编辑账号 */
        async editUser () {
            let res = await this.$http(
                "/drug_flow/customer/update",
                this.params,
                {
                    type: "post"
                }
            );
            if (res.code === "200") {
                this.initData();
                this.isDialog4 = false;
                this.$message.success("编辑成功");
            }
        },
        onSubmit () {
            console.log("submit!");
        },
        handleClick (isAdd) {
            this.$refs["ruleForm"].validate((valid, obj) => {
                if (valid) {
                    isAdd ? this.editUser() : this.addUser();
                } else {
                    console.log(obj);
                    return false;
                }
            });
        },
        resetForm () {
            this.$refs["ruleForm"] && this.$refs["ruleForm"].resetFields();
        },
        clearValidate () {
            this.$refs["ruleForm"] && this.$refs["ruleForm"].clearValidate();
        },
        // exportExl () {
        //     // console.log(Object.values(this.params).join(' '))
        //     // return
        //     import('@/vendor/Export2Excel').then(excel => {
        //         // const title = [Object.values(this.params).join('   '), null, null, null]
        //         const tHeader = ['日期', '公司名称', '客户名称', '药品名称', '药品编码', '规格', '单位', '批号', '有效期', '数量', '单价', '金额', '生产厂家', '供应商', '业务合作']
        //         const filterVal = ['incomingDate', 'companyName', 'agentName', 'productName', 'productCode', 'productSpec', 'packingUnit', 'batchNumber', 'endDate', 'quantity', 'price', 'taxAmount', 'supplierName', 'producer', 'isCooperation']
        //         const list = this.form.data
        //         const data = this.formatJson(filterVal, list)

        //         excel.export_json_to_excel({
        //             // title: title,
        //             header: tHeader,
        //             data,
        //             filename: '入库数据',
        //             autoWidth: true
        //         })
        //     })
        // },
        exportExl () { },
        formatJson (filterVal, jsonData) {
            return jsonData.map(v =>
                filterVal.map(j => {
                    if (j === "isCooperation") {
                        return v[j] === "1" ? "是" : "否";
                    }
                    return v[j];
                })
            );
        }
    },
    watch: {
        isDialog5 (cV, oV) {
            this.params2.days = "";
        }
    }
};
</script>


