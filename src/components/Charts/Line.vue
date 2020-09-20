<template>
    <div>
        <div class="table-wrap echart-cont">
            <div class="echart-big-wrap pe p-re">
                <div class="echart-big-title num-left">{{ title }}</div>
                <chart height="400px" width="1168px" id="LineOpt" :option.sync="LineOpt" />
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList" :key="k" :class="{act: tagCur === k}" @click.native="tagHand(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
                <div class="el-unit">单位: 条</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .light {
        .el-unit {
            font-family: PingFangSC-Regular;
            color: #999;
        }
    }
    .num-left {
        width: 500px;
        text-align: left;
        padding-left: 20px;
        font-size: 16px;
        letter-spacing: 1.5px;
    }
    .echart-cont {
        padding-top: 60px;
        padding-left: 100px;
    }
    .echart-big-title {
        position: absolute;
        top: -40px;
        left: 0;
    }
    .p-re {
        position: relative;
    }
    .el-unit {
        position: absolute;
        top: 3px;
        left: 39px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        line-height: 14px;
    }
    .tag-box {
        position: absolute;
        top: 10px;
        right: -200px;
        width: 410px;
    }
</style>
<script>
import tiltLine from "@/views/infrastructure/config/tiltLine";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid"
import cOp from "@/components/common/c-op";
import echarts from "echarts"
export default {
    components: {
        Chart,
        cOp,
    },
    data() {
        return {
            title: '',
            LineOpt: {},
            params: {
                trendType: 1,
            },
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "周"
                },

                {
                    value: 2,
                    label: "月"
                },
                {
                    value: 3,
                    label: "季"
                },
            ]

        };
    },
    created() {
        this.getChart()
    },
    watch: {
        flag(e) {
            this.getChart()
        },
        '$route'(to, from) {
            this.tagCur = 0
            this.params.trendType = 1
            this.getChart()
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        tagHand(k, value) {
            this.tagCur = k;
            this.params.trendType = value
            this.getChart()
        },
        getChart() {
            let chartData = deepClone(tiltLine);
            // 主题换肤
            if (this.flag === 'light') {
                chartData.yAxis.axisLine = this.$medicine.axis
                chartData.xAxis.axisLine = this.$medicine.axis
                chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                chartData.tooltip.borderWidth = 0;
                chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                chartData.series[0].itemStyle.normal.color = this.$medicine.petroleum.itemStyle
                chartData.series[0].itemStyle.normal.areaStyle.color = new echarts.graphic.LinearGradient(
                    0,
                    1,
                    0,
                    0,
                    [{
                        offset: 0,
                        color: this.$medicine.petroleum.areaStyle[0]
                    },
                    {
                        offset: 1,
                        color: this.$medicine.petroleum.areaStyle[1]
                    }
                    ]
                )
                chartData.xAxis.axisLabel.color = this.$medicine.nameColor;
                chartData.yAxis.axisLabel.textStyle = {
                    color: this.$medicine.nameColor,
                }
            }
            if (this.$route.name === 'resource-petroleum') {   // 中石油
                this.$http('/dcp/cnpc/bid/record/trend/', this.params, { type: 'get' }).then(
                    res => {
                        chartData.title.text = "";
                        this.title = "中石油-供应商中标数据"
                        chartData.xAxis.data = res.data.map(i => i.date);
                        chartData.series[0].data = res.data.map(
                            i => i.value
                        );
                        chartData.xAxis.axisLabel.padding = [0, 0, 0, 60]
                        chartData.grid.left = "10px";
                        chartData.title.padding = [0, 0, 0, 10];
                        this.LineOpt = chartData;
                    }
                )
            } else if (this.$route.name === 'resource-petrifaction') {   // 中石化
                this.$http('/dcp/sinopec/bid/record/trend/', this.params, { type: 'get' }).then(
                    res => {
                        chartData.title.text = "";
                        this.title = "中石化-供应商中标数据"
                        chartData.xAxis.data = res.data.map(i => i.date);
                        chartData.xAxis.axisLabel.padding = [0, 0, 0, 60]
                        chartData.series[0].data = res.data.map(
                            i => i.value
                        );
                        chartData.grid.left = "10px";
                        chartData.grid.top = "80px"
                        chartData.title.padding = [0, 0, 0, 10];
                        this.LineOpt = chartData;
                    }
                )
            } else {   // 中海油
                this.$http('/dcp/cnooc/bid/record/trend/', this.params, { type: 'get' }).then(
                    res => {
                        let data = res.data.map(
                            i => i.value
                        );
                        chartData.title.text = "";
                        this.title = "中海油-供应商中标数据"
                        chartData.xAxis.data = res.data.map(i => i.date);
                        chartData.series[0].data = data
                        chartData.xAxis.axisLabel.padding = [0, 0, 0, 60]
                        chartData.grid.left = "10px";
                        chartData.title.padding = [0, 0, 0, 10];
                        this.LineOpt = chartData;
                    }
                )
            }
        },
    }
};
</script>