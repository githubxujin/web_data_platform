<template>
    <div class="table-wrap pt10">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form mt10 mb5">
            <el-form-item>
                <el-select v-model="params.companyName" filterable style=" width: 260px;" placeholder="企业名称">
                    <el-option v-for="(v, i) in companyList" :key="i" :label="v.companyName" :value="v.companyName">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="drawEchart">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div>
            <chart height="700px" width="1300px" id="pay-content" :option="goodSale" />
        </div>
    </div>
</template>

<script>
import Chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import columnarX from "@/views/resource/config/columnarX";
import { mapState } from "vuex";
import echarts from "echarts"
export default {
    components: {
        Chart
    },
    computed: mapState({
        companyList: state => state.invoice.companyList,
        flag: state => state.echart.flag
    }),
    props: {
        businessType: String
    },
    data() {
        return {
            params: {
                businessType: "1", // 1:销项 2:进项
                companyName: "北京信远欣得酒店管理有限公司", //企业名称
                topNum: 10 //  top几
            },
            goodSale: {}
        };
    },
    created() {
        this.drawEchart();
    },
    watch: {
        flag(e) {
            this.drawEchart()
        }
    },
    methods: {
        reSet() {
            this.params = {
                businessType: this.businessType, // 1:销项 2:进项
                companyName: "北京信远欣得酒店管理有限公司", //企业名称
                topNum: 10 //  top几
            };
            this.drawEchart();
        },
        drawEchart() {
            let SaleData = deepClone(columnarX);
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/wares/name/year", this.params, {
                type: "formdata"
            }).then(res => {
                let num1, num2;
                if (res.data.dataList.length > 0) {
                    let year = new Date().getFullYear();
                    SaleData.yAxis[0].data = res.data.dataList.map(
                        i => i.waresName
                    );
                    SaleData.series[0].data = res.data.dataList.map(i => {
                        num1 =
                            i.currentYearAmount === 0
                                ? ""
                                : i.currentYearAmount;

                        return num1;
                    });

                    if (res.data.dataList.length > 9) {
                        SaleData.dataZoom = [
                            {
                                type: "slider",
                                show: true,
                                yAxisIndex: [0],
                                left: "98%",
                                start: 50,
                                end: 100,
                                width: 8,
                                borderColor: "transparent",
                                backgroundColor: "#242D30",
                                fillerColor: "#2A3C40",
                                showDetail: false,
                                handleSize: false,
                                zoomLock: true
                            },

                            {
                                type: "inside",
                                yAxisIndex: [0],
                                start: 50,
                                end: 100
                            }
                        ];
                    }
                    SaleData.series[0].name = year;
                    SaleData.series[1].name = year - 1;
                    SaleData.series[1].data = res.data.dataList.map(i => {
                        num2 =
                            i.yesteryearAmount === 0 ? "" : i.yesteryearAmount;

                        return num2;
                    });
                } else {
                    SaleData.xAxis.name = "";
                }
                let maxNumber1 = Math.max.apply(Math, SaleData.series[0].data);
                let maxNumber2 = Math.max.apply(Math, SaleData.series[1].data);
                maxNumber1 > maxNumber2 ?
                    SaleData.xAxis.max = maxNumber1 : SaleData.xAxis.max = maxNumber2

                // 主题切换
                if (this.flag === 'light') {
                    SaleData.title.textStyle.color = this.$medicine.title
                    SaleData.tooltip.backgroundColor = this.$medicine.tooltipBG
                    SaleData.tooltip.borderWidth = 0;
                    SaleData.series[0].itemStyle.normal.color = new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                            offset: 0,
                            color: this.$service.output.InvoiceContent.itemStyle0[0]
                        },

                        {
                            offset: 1,
                            color: this.$service.output.InvoiceContent.itemStyle0[1]
                        }
                        ]
                    )
                    SaleData.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(
                        0, 0, 1, 0,
                        [{
                            offset: 0,
                            color: this.$service.output.InvoiceContent.itemStyle1[0]
                        },

                        {
                            offset: 1,
                            color: this.$service.output.InvoiceContent.itemStyle1[1]
                        }
                        ]
                    )
                    SaleData.xAxis.axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    SaleData.yAxis[0].axisLabel.textStyle = {
                        color: this.$medicine.nameColor,
                    }
                    SaleData.yAxis[0].axisLine = this.$medicine.axis
                    SaleData.xAxis.axisLine = this.$medicine.axis
                }
                this.goodSale = SaleData;
            });
        }
    }
};
</script>
