<template>
    <div>
        <div class="table-wrap echart-cont">
            <div class="el-title ml10">布伦特</div>
            <div class="echart-big-wrap pe p-re">
                <chart height="400px" width="1168px" id="statisticsBlt" :option.sync="LineOpt" />
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList" :key="k" :class="{act: tagCur === k}" @click.native="tagHand(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
                <div class="el-unit">单位: 元/吨</div>
            </div>
        </div>
    </div>
</template>

<script>
import tiltLine from "@/views/infrastructure/config/tiltLine";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid.vue"
import cOp from "@/components/common/c-op";
export default {
    components: {
        Chart, cOp
    },
    data () {
        return {
            title: '',
            LineOpt: {},
            params: {
                trendType: 1,
                source: 2
            },
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "天"
                },
                {
                    value: 3,
                    label: "周"
                },

                {
                    value: 2,
                    label: "月"
                },
                {
                    value: 4,
                    label: "年"
                },
            ]
        }
    },
    created () {
        this.getChart()
    },
    watch: {
        flag (e) {
            this.getChart()
        },
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            },
        }
    },
    methods: {
        tagHand (k, value) {
            this.tagCur = k;
            this.params.trendType = value
            this.getChart()
        },
        getChart () {
            let chartData = deepClone(tiltLine);
            if (this.tagCur === 0 || this.tagCur === 1) {
                chartData.dataZoom = [
                    {
                        type: "inside",
                        start: 100,
                        end: 200,
                        maxValueSpan: 300, //设置显示多少个
                        minValueSpan: 300,
                    },
                    {
                        type: "slider",
                        bottom: 0,
                        left: 30,
                        right: 0,
                        start: 100,
                        end: 50,
                        height: 8,
                        width: 1115,
                        borderColor: "transparent",
                        backgroundColor: "#242D30",
                        fillerColor: "#2A3C40",
                        showDetail: false,
                        handleSize: false,
                        maxValueSpan: 300, //设置显示多少个
                        minValueSpan: 300,
                    }
                ]
            }
            this.$http('/dcp/comm/base/oil/price/trend', this.params, { type: 'post' }).then(
                res => {
                    chartData.title.text = "";
                    chartData.xAxis.data = res.data.map(i => i.observationDate);
                    chartData.series[0].data = res.data.map(
                        i => i.price
                    );
                    chartData.xAxis.axisLabel.padding = [0, 0, 0, 60]
                    chartData.grid.left = "10px";
                    chartData.title.padding = [0, 0, 0, 10];
                    if (this.flag === 'light') {
                        chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover;
                        chartData.yAxis.splitLine = this.$medicine.axis;
                        chartData.yAxis.axisLine = this.$medicine.axis;
                        chartData.xAxis.axisLine = this.$medicine.axis;
                        chartData.tooltip.backgroundColor = this.$medicine.tooltipBG;
                        chartData.tooltip.borderWidth = 0;
                        chartData.series[0].itemStyle.normal.color = this.$infrastructure.steel_price.lineColor;//共用颜色
                        chartData.series[0].itemStyle.normal.areaStyle.color = this.$infrastructure.steel_price.mxcolor;//共用颜色
                        chartData.xAxis.axisLabel.color = this.$medicine.nameColor;
                        chartData.yAxis.axisLabel.textStyle = {
                            color: this.$medicine.nameColor,
                        }
                        if (chartData.dataZoom) {
                            chartData.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0];
                            chartData.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1];
                        }
                    }
                    this.LineOpt = chartData;
                }
            )

        },
    },
}
</script>

<style lang="scss" scoped>
.dark {
    .blt {
        color: #fff;
        font-weight: bolder;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.5px;
        font-family: 'PingFang-SC-Regular';
        margin-bottom: 18px;
    }
}
.light {
    .blt {
        color: #666;
        font-weight: bolder;
        font-size: 16px;
        line-height: 16px;
        letter-spacing: 1.5px;
        font-family: 'PingFang-SC-Regular';
        margin-bottom: 18px;
    }
}
.echart-cont {
    padding-top: 35px;
    padding-left: 80px;
}

.p-re {
    position: relative;
}
.el-unit {
    position: absolute;
    top: 22px;
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
    right: -137px;
    width: 410px;
}
</style>
