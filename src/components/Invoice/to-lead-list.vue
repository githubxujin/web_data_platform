<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-input v-model="params.buyerName" clearable placeholder="发票购买方"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.salerName" clearable placeholder="发票销售方"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.invoiceNo" clearable placeholder="发票号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.invoiceCode" clearable placeholder="发票代码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.cancelFlag" clearable placeholder="验真结果">
                    <el-option label="已通过" value="0"></el-option>
                    <el-option label="已作废" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.isMatch" clearable placeholder="状态">
                    <el-option label="未核查" value="0"></el-option>
                    <el-option label="已核查" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <!-- <el-form-item>
                <el-date-picker v-model="params.startInvoiceDate" type="date" @change="clearFast"
                    :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker><span
                    style="color: #606266;margin:0 10px;">至</span>
                <el-date-picker v-model="params.endInvoiceDate" type="date" @change="clearFast"
                    :picker-options="pickerOptions2()" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item> -->
            <el-form-item>
                <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange">
                    <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.pageNum = 1,getList()">查询</el-button>
                <el-button @click="restForm" class="el-btn-reset">重置</el-button>
                <el-button type="primary" @click="isTbDialog2 = true" class="el-btn-reset">一键核查</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daoru' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <div class="mod">
            <el-table :data="list" style="width: 100%" @selection-change="toSelect" border>
                <!-- <el-table-column type="selection" label="" :selectable='checkboxT'></el-table-column> -->
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="invoiceCode" label="发票代码" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceNo" label="发票号码" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cancelFlag" label="验真结果">
                    <template slot-scope="item">
                        {{ item.row.cancelFlag === '0' ? '已通过' : '已作废' }}

                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="发票备注" width="200" show-overflow-tooltip></el-table-column>
                <el-table-column prop="buyerName" label="发票购买方" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="salerName" label="发票销售方" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="invoiceAmount" label="合计金额" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.invoiceAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="taxRate" label="税率" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="taxAmount" label="合计税额" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template></el-table-column>
                <el-table-column prop="totalAmount" label="价税合计" width="150" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="数据来源" width="100" show-overflow-tooltip>
                    <template slot-scope="item">
                        {{ item.row.source === '1' ? '发票易': ''}}
                    </template>
                </el-table-column>
                <el-table-column prop="invoiceDate" label="开票日期" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="isMatch" label="状态">
                    <template slot-scope="item">
                        {{ item.row.isMatch === '0' ? '未匹配' : '已匹配' }}
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" fixed="right" width="200" align="center">
                    <template slot-scope="item">
                        <el-button plain @click="isTbDialog=true,toDetail(item.row.id)">详情
                        </el-button>
                        <el-button type="primary" plain :disabled="item.row.isMatch === '1'" @click="isTbDialog1=true,toMatching(item.row)">核查</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-pagination layout="jumper, prev, pager, next, total" :total.sync='totalSize' :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="getList()">
            </el-pagination> -->
            <el-pagination :page-sizes="[20, 50, 100]" :page-size="params.pageSize" :current-page.sync="params.pageNum" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="totalSize"
                v-if="totalSize > 0">
            </el-pagination>
        </div>
        <!-- 内容详情 -->
        <el-dialog :visible.sync="isTbDialog" width="1280px" title="内容详情">
            <el-table :data="detailList" border max-height="500">
                <el-table-column property="goodsName" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column property="specificationModel" label="规格型号" show-overflow-tooltip></el-table-column>
                <el-table-column property="unit" label="单位" show-overflow-tooltip></el-table-column>
                <el-table-column property="detailNumber" label="数量" show-overflow-tooltip></el-table-column>
                <el-table-column property="unitPrice" label="不含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.unitPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="detailAmount" label="金额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.detailAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxRate" label="税率" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxRate | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxPrice" label="含税价" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxPrice | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="taxAmount" label="税额" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.taxAmount | numFormat }}
                    </template>
                </el-table-column>
                <el-table-column property="totalAmount" label="价税合计" show-overflow-tooltip align="right">
                    <template slot-scope="item">
                        {{ item.row.totalAmount | numFormat }}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 一键核查 -->
        <el-dialog v-if="isTbDialog2" :visible.sync="isTbDialog2" width="500px" custom-class="hecha" title="填写核查条件">
            <el-form :model="form1" ref="form1" size="medium" :rules="rules1" label-width="110px">
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="form1.customerName" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="所属板块" prop="industryCategory">
                    <el-select v-model="form1.industryCategory" clearable style="width:100%;" placeholder="请选择版块">
                        <el-option label="其他" value="0"></el-option>
                        <el-option label="基建" value="1"></el-option>
                        <el-option label="医药" value="2"></el-option>
                        <el-option label="能源" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务编号" prop="batchNum">
                    <el-input v-model="form1.batchNum" clearable placeholder="请输入业务编号"></el-input>
                </el-form-item>
                <el-form-item label="发票购买方">
                    <el-input v-model="form1.buyerName" clearable placeholder="请输入发票购买方"></el-input>
                </el-form-item>
                <el-form-item label="创建日期" class="created-date">
                    <el-date-picker v-model="form1.createTime" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item label="开票时间区间" prop="value1">
                    <!-- <el-date-picker v-model="params.startInvoiceDate" type="date" :picker-options="pickerOptions3" value-format="yyyy-MM-dd"></el-date-picker><span style="color: #606266;margin:0 10px;">至</span>
                    <el-date-picker v-model="params.endInvoiceDate" type="date" :picker-options="pickerOptions4()" value-format="yyyy-MM-dd"></el-date-picker> -->
                    <el-date-picker v-model="form1.value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn" size="medium" round plain @click="isTbDialog2=false">取消</el-button>
                <el-button type="primary" size="medium" round @click="doRen('form1')">确定</el-button>
            </span>
        </el-dialog>
        <!-- 核查 -->
        <el-dialog v-if="isTbDialog1" :visible.sync="isTbDialog1" width="400px" title="核查">
            <el-form :model="form" ref="form" :rules="rules" label-width="100px">
                <el-form-item label="客户名称">
                    <el-input disabled v-model="form.customerName"></el-input>
                </el-form-item>
                <el-form-item label="所属板块" prop="industryCategory">
                    <el-select v-model="form.industryCategory" clearable style="width:100%;">
                        <el-option label="其他" value="0"></el-option>
                        <el-option label="基建" value="1"></el-option>
                        <el-option label="医药" value="2"></el-option>
                        <el-option label="能源" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务编号" prop="batchNum">
                    <el-input v-model="form.batchNum" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn" size="mini" @click="isTbDialog1=false">取消</el-button>
                <el-button type="primary" size="mini" @click="doQue('form')">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
/deep/ .el-form-item__label {
    line-height: 32px;
}
</style>
<script>
import { formatDate } from "@/filters/index";
export default {
    data() {
        return {
            dateArr: [],
            totalSize: 0,
            isShow: false,
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            isData: false,
            isExport: false,
            isTbDialog1: false,
            isTbDialog2: false,
            value1: "",
            delID: "",
            params: {
                buyerName: "", // 发票购买方
                salerName: "", // 发票销售方
                invoiceNo: "", // 发票号码
                invoiceCode: "", // 发票代码
                cancelFlag: "", // 验真结果(0 已通过 1 已作废)
                isMatch: "", // 是否核查（0 否 1 是）
                startInvoiceDate: "", // 开票时间开始时间
                endInvoiceDate: "", // 开票时间结束时间
                pageNum: 1,
                pageSize: 10
            },
            form: {
                batchNum: "", // 业务编号 必填
                customerName: "", // 客户名称 必填
                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                idList: "" // 发票易主键id 多个逗号隔开 必填
            },
            form1: {
                batchNum: "", // 业务编号 必填
                customerName: "", // 客户名称 必填
                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                buyerName: "", // 发票购买方
                salerName: "", // 必填  发票销售方
                createTime: "", //创建时间
                startInvoiceDate: "", // 开票日期开始时间 （区间必填）
                endInvoiceDate: "", // 开票日期结束时间
                value1: ""
            },
            value: "",
            rules: {
                industryCategory: [
                    {
                        required: true,
                        message: "请选择所属板块",
                        trigger: "change"
                    }
                ],
                batchNum: [
                    {
                        required: true,
                        message: "请输入业务编号",
                        trigger: "blur"
                    }
                ]
            },
            rules1: {
                customerName: [
                    {
                        required: true,
                        message: "请输入客户名称",
                        trigger: "change"
                    }
                ],
                industryCategory: [
                    {
                        required: true,
                        message: "请选择所属板块",
                        trigger: "change"
                    }
                ],
                batchNum: [
                    {
                        required: true,
                        message: "请输入业务编号",
                        trigger: "blur"
                    }
                ],
                value1: [
                    {
                        required: true,
                        message: "请选择开票时间区间",
                        trigger: "blur"
                    }
                ]
            },
            list: [],
            matchingList: [],
            detailList: [],
            fastData: "",
            fastData2: "",
            fastOptions: [
                {
                    value: 3,
                    label: "最近3天"
                },
                {
                    value: 7,
                    label: "最近一周"
                },
                {
                    value: 30,
                    label: "最近1个月"
                },
                {
                    value: 180,
                    label: "最近6个月"
                },
                {
                    value: 360,
                    label: "最近12个月"
                }
            ],

            params2: {
                pageNum: 1
            },
            isTbDialog: false,
            openList: [],
            isDis: false
        };
    },
    created() {
        this.getList();
    },
    methods: {
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startInvoiceDate = v[0];
                this.params.endInvoiceDate = v[1];
            } else {
                this.params.startInvoiceDate = "";
                this.params.endInvoiceDate = "";
            }
        },
        getList() {
            this.$http("/invoice/rtc/invoice/list", this.params, {
                type: "formdata"
            }).then(res => {
                // console.log(res);
                this.list = res.data || [];
                this.totalSize = res.meta.totalSize;
            });
        },
        // 禁用多选框
        checkboxT(row, index) {
            return row.isMatch === "0";
        },
        // 详情
        toDetail(rtcInvoiceId) {
            this.$http(
                "/invoice/rtc/invoice/detail/list",
                {
                    rtcInvoiceId
                },
                { type: "formdata" }
            ).then(res => {
                // console.log(res);
                this.detailList = res.data || [];
            });
        },
        // 选择
        toSelect(v) {
            // console.log(v);
            this.matchingList = v;
        },
        // 一键核查-确定
        doRen(formName) {
            this.$refs[formName].validate(v => {
                if (v) {
                    this.form1.salerName = this.form1.customerName;
                    this.value = this.form1.value1;
                    // console.log('value',this.value);
                    delete this.form1.value1;
                    this.$http(
                        "/invoice/rtc/invoice/conditionalMatch",
                        this.form1,
                        { type: "formdata" }
                    )
                        .then(res => {
                            // console.log('outRes',res);
                            if (res.code === "200") {
                                this.isTbDialog2 = false;
                                this.$message.success("发票核查中，请耐心等候");
                                this.form1 = {
                                    batchNum: "", // 业务编号 必填
                                    customerName: "", // 客户名称 必填
                                    industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                                    buyerName: "", // 发票购买方
                                    salerName: "", // 必填  发票销售方
                                    createTime: "", //创建时间
                                    startInvoiceDate: "", // 开票日期开始时间 （区间必填）
                                    endInvoiceDate: "", // 开票日期结束时间
                                    value1: ""
                                };
                                this.getList();
                            }
                        })
                        .catch(err => {
                            // console.log(err);
                            this.$message.error(err.message);
                            this.form1.value1 = this.value;
                        });
                } else {
                    return;
                }
            });
        },
        // 核查
        toMatching(row) {
            // console.log(row);
            (this.form = {
                batchNum: "", // 业务编号 必填
                customerName: "", // 客户名称 必填
                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                idList: "" // 发票易主键id 多个逗号隔开 必填
            }),
                (this.form.customerName = row.salerName);
            this.form.idList = row.id;
        },
        // 核查-确定
        doQue(formName) {
            this.$refs[formName].validate(v => {
                if (v) {
                    this.$http("/invoice/rtc/invoice/match", this.form, {
                        type: "formdata"
                    }).then(res => {
                        // console.log(res);
                        if (res.code === "200") {
                            this.$message.success("核查成功！");
                            this.isTbDialog1 = false;
                            (this.form = {
                                batchNum: "", // 业务编号 必填
                                customerName: "", // 客户名称 必填
                                industryCategory: "", // 所属板块(0:其他 1:基建 2:医疗 3:能源) 必填
                                idList: "" // 发票易主键id 多个逗号隔开 必填
                            }),
                                this.getList();
                        }
                    });
                } else {
                    return;
                }
            });
        },

        pickerOptions2() {
            const vm = this;
            let startInvoiceDate = "";
            vm.params.startInvoiceDate &&
                (startInvoiceDate = vm.params.startInvoiceDate + " 00:00:00");
            return {
                disabledDate(time) {
                    return new Date(time) < new Date(startInvoiceDate);
                }
            };
        },
        pickerOptions4() {
            const vm = this;
            let startCheckTime = "";
            vm.params.startCheckTime &&
                (startCheckTime = vm.params.startCheckTime + " 00:00:00");
            return {
                disabledDate(time) {
                    return new Date(time) < new Date(startCheckTime);
                }
            };
        },
        restForm() {
            this.dateArr = []
            this.params = {
                buyerName: "", // 发票购买方
                salerName: "", // 发票销售方
                invoiceNo: "", // 发票号码
                invoiceCode: "", // 发票代码
                cancelFlag: "", // 验真结果(0 已通过 1 已作废)
                isMatch: "", // 是否核查（0 否 1 是）
                startInvoiceDate: "", // 开票时间开始时间
                endInvoiceDate: "", // 开票时间结束时间
                pageNum: 1,
                pageSize: 10
            }
            this.fastData = ""
            this.fastData2 = ""
            this.getList();
        },
        fastChange(val) {
            this.dateArr = [];
            if (!val) {
                return false;
            } else {
                const date = new Date();
                this.params.endInvoiceDate = formatDate(new Date());
                let startDate = date.setTime(
                    date.getTime() - 3600 * 1000 * 24 * val
                );
                this.params.startInvoiceDate = formatDate(startDate);
                this.dateArr.push(
                    this.params.startInvoiceDate,
                    this.params.endInvoiceDate
                );
            }
        },
        clearFast() {
            this.fastData = "";
        },
        /* 导出文件 */
        async exportData() {
            await this.$http(`/invoice/rtc/invoice/export`, this.params, {
                type: "export"
            });
        }
    },
    mounted() { },
    watch: {
        "form1.value1"(n, o) {
            // console.log('n',n,'o',o);
            if (n && n.length > 0) {
                this.form1.startInvoiceDate = n[0];
                this.form1.endInvoiceDate = n[1];
            } else {
                this.form1.startInvoiceDate = (0)[0];
                this.form1.endInvoiceDate = o[1];
            }
        }
    }
};
</script>