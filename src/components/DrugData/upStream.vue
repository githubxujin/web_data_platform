<template>
    <div>
        <c-box type="search">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label='公司名称'>
                    <el-select v-model='params.companyName' clearable @change="ChangeCompany" filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in companyList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='分子公司名字'>
                    <el-select v-model='params.companySubname' clearable filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in compnaySubnameList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='客户名称'>
                    <el-select v-model='params.agentName' clearable filterable>
                        <el-option :label='item' :value='item' v-for="(item, index) in agentList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='供应商'>
                    <el-select v-model='params.supplierName' clearable filterable remote :remote-method="remoteSupplierName">
                        <el-option :label='item' :value='item' v-for="(item, index) in supplierList" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label='日期范围'>
                    <el-date-picker v-model='params.beginDate' type="month" value-format='yyyy-MM' placeholder='选择开始日期' style='width:150px'>
                    </el-date-picker>
                    <span class="pl5 pr5 fc-b">至</span>
                    <el-date-picker v-model='params.endDate' type="month" value-format='yyyy-MM' placeholder='选择结束日期' style='width:150px'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="快速选择">
                    <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange">
                        <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="getSteelPricesOption">查询</el-button>
                    <el-button type="info" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>

        <div class="echart-big-wrap p-re">
            <div class="echart-big-title">客户上游订单量与配送量变化趋势</div>
            <chart height="511px" width="1168px" :option="steelPricesOption" id="upStream" />

            <el-row type="flex" justify="space-between" class="tag-box pb20">
                <el-row type="flex" justify="space-between">
                    <c-tag v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}" @click.native="tagHand1(k,v.value)">{{v.label}}</c-tag>
                </el-row>
                <el-row type="flex" justify="space-between">
                    <c-tag v-for="(v,k) in tagList2" :key="k" :class="{act: tagCur2 === k}" @click.native="tagHand2(k,v.value)">{{v.label}}</c-tag>
                </el-row>

                <!-- <c-tag @click.native="tagHand3">数据标签</c-tag> -->
            </el-row>

        </div>
    </div>
</template>
<script>
import { formatDate } from "@/filters/index";
import steelLine from "@/utils/echart/drugSteelLine";
import cBox from "@/components/common/c-box";
import cTag from "@/components/common/c-tag";
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import { mapState } from "vuex";
export default {
    components: {
        cTag,
        cBox,
        Chart
    },
    data () {
        return {
            fastData: "",
            fastOptions: [
                {
                    value: 30,
                    label: "近30日"
                },
                {
                    value: 60,
                    label: "近60日"
                },
                {
                    value: 180,
                    label: "近180日"
                },
                {
                    value: 360,
                    label: "近1年"
                }
            ],
            steelPricesOption: {},
            params: {
                companyName: "", //公司名称
                companySubname: "", //分子公司
                agentName: "", // 客户名称
                customerName: "", //下游
                supplierName: "", //供应商名称
                beginDate: "",
                endDate: "",
                dateType: 1,
                rateType: 1
            },
            customerList: [],
            compnaySubnameList: [],
            supplierList: [],
            agentList: [],
            tagCur1: 0,
            tagCur2: 0,
            tagList1: [
                {
                    value: 1,
                    label: "月"
                },
                {
                    value: 2,
                    label: "季"
                },
                {
                    value: 3,
                    label: "年"
                }
            ],
            tagList2: [
                {
                    value: 1,
                    label: "环比"
                },
                {
                    value: 2,
                    label: "同比"
                }
            ]
        };
    },
    computed: mapState({
        companyList: state => state.drug.companyNameList
    }),
    created () {
        this.getSteelPricesOption();
    },
    methods: {
        remoteSupplierName (val) {
            if (this.params.companyName) {
                this.$http(
                    "/dcp/drug/supplier/list",
                    { companyName: this.params.companyName, name: val },
                    {
                        type: "get"
                    }
                ).then(res => {
                    this.supplierList = res.data;
                });
            }
        },
        fastChange (val) {
            const date = new Date();
            this.params.endDate = formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.beginDate = formatDate(startDate);
        },
        reSet () {
            this.params = {
                companyName: "", //公司名称
                companySubname: "", //分子公司
                agentName: "", // 客户名称
                customerName: "", //下游
                supplierName: "", //供应商名称
                beginDate: "",
                endDate: "",
                dateType: 1,
                rateType: 1
            };
            this.tagCur1 = 0;
            this.tagCur2 = 0;
            this.getSteelPricesOption();
        },
        //控制月季年
        tagHand1 (k, value) {
            this.tagCur1 = k;
            this.params.dateType = value;
            this.getSteelPricesOption();
        },
        //控制环比/同比
        tagHand2 (k, value) {
            this.tagCur2 = k;
            this.params.rateType = value;
            this.getSteelPricesOption();
        },
        //控制图形显示数字
        tagHand3 (k, value) { },
        ChangeCompany (val) {
            this.params.agentName = "";
            this.params.companySubname = "";
            this.compnaySubnameList = [];
            this.agentList = [];
            if (val) {
                this.getCompnaySubnameList(val, 1);
                this.getAgentList(val);
                this.getCustomerList(val);
                this.getSupplierList(val);
            }
        },
        //供应商下拉框
        getSupplierList (companyName) {
            this.$http(
                "/dcp/drug/supplier/list",
                { companyName },
                {
                    type: "get"
                }
            ).then(res => {
                this.supplierList = res.data;
            });
        },
        //客户名称下拉框
        getAgentList (companyName) {
            this.$http(
                "/dcp/drug/agent/list",
                { companyName },
                { type: "get" }
            ).then(res => {
                this.agentList = res.data;
            });
        },
        //子公司下拉框
        getCompnaySubnameList (companyName, type) {
            this.$http(
                "/dcp/drug/companySubname/list",
                { companyName, type },
                {
                    type: "get"
                }
            ).then(res => {
                this.compnaySubnameList = res.data;
            });
        },
        //下游下拉框
        getCustomerList (val) {
            this.$http(
                "/dcp/drug/customer/list",
                { companyName: val },
                { type: "get" }
            ).then(res => {
                this.customerList = res.data;
            });
        },
        //绘图
        getSteelPricesOption () {
            this.$http("/dcp/drug/purchase/upstream", this.params).then(res => {
                let drawSteelLine = deepClone(steelLine);
                let lineData = res.data;
                if (lineData.countList.length && lineData.rateList.length) {
                    drawSteelLine.tooltip.formatter = function (params) {
                        let str = `${params[0].axisValue} <br />${params[0].marker} ${params[0].value} <br />${params[1].marker} ${params[1].value}%`;
                        return str;
                    };
                    drawSteelLine.xAxis.data = lineData.countList.map(
                        i => i.dateString
                    );
                    drawSteelLine.series[0].data = lineData.countList.map(
                        i => i.taxAmount
                    );
                    drawSteelLine.series[1].color = "#33F0C0";
                    drawSteelLine.series[1].data = lineData.rateList.map(i => {
                        if (i.value) {
                            return i.value;
                        } else {
                            return 0;
                        }
                    });
                    drawSteelLine.tooltip.formatter = function (params) {
                        return `${params[0].axisValue} <br />${params[0].seriesName} ${params[0].marker} ${params[0].value}
                    <br />${params[1].seriesName} ${params[1].marker} ${params[1].value}
                    `;
                    };
                    this.steelPricesOption = drawSteelLine;
                } else {
                    drawSteelLine.xAxis.show = false;
                    drawSteelLine.yAxis[0].show = false;
                    drawSteelLine.yAxis[1].show = false;
                    drawSteelLine.legend.data = [];
                    this.steelPricesOption = drawSteelLine;
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.p-re {
    position: relative;
}
.tag-box {
    position: absolute;
    top: 58px;
    left: 66px;
    width: 410px;
    .c-tag + .c-tag {
        margin-left: 10px;
    }
}
</style>
