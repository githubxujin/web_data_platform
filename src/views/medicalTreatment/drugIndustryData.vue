<template>
    <!-- 产业数据 -->
    <div class="drugIndustryData">
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="统计概况" name="first">
                <!-- 柱状图和饼图 -->
                <div class="formBox ml30">
                    <el-form :inline="true" size="medium" class="doc-box">
                        <el-form-item class="el-item-form-width">
                            <el-select v-model="params.regional" clearable placeholder="地区" class="el-item-form-width">
                                <el-option label="华东" value="华东"></el-option>
                                <el-option label="华南" value="华南"></el-option>
                                <el-option label="华中" value="华中"></el-option>
                                <el-option label="华北" value="华北"></el-option>
                                <el-option label="西北" value="华西"></el-option>
                                <el-option label="西南" value="西南"></el-option>
                                <el-option label="东北" value="东北"></el-option>
                                <el-option label="港澳台地区" value="港澳台地区"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class="el-item-form-width">
                            <el-select v-model="params.param" placeholder="一般预算收入" class="el-item-form-width">
                                <el-option label="一般预算收入" value="一般预算收入"></el-option>
                                <el-option label="基金预算收入" value="基金预算收入"></el-option>
                                <el-option label="人口数量(万人)" value="人口数量(万人)"></el-option>
                                <el-option label="人均财政收入(元)" value="人均财政收入(元)"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class='el-item-form-width'>
                            <el-select v-model="params.year" clearable placeholder="年份">
                                <el-option v-for="(s, index) in year" :label="s" :value="s" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' size='medium' @click='getChart'>查询</el-button>
                            <el-button type='info' size='medium' @click='reSet'>重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="danwei">单位：{{danwei}}</div>
                <chart height="320px" width="100%" :option="regionalInfoObj" id="regionalInfoObj" />

                <!-- 饼图 -->
                <div class="pie-wrap">
                    <pieChart ref="pie" />
                </div>
                <!-- 饼图 -->
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <drug-industry-number />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import drugIndustryNumber from "./drugIndustryDataPage/drugIndustryNumber";
import Chart from "@/components/Charts/invoiceInvalid";
import bar from "@/utils/echart/bar/bar"
import { deepClone } from "@/utils/common"
import pieChart from "./drugIndustryDataPage/pie.vue"

export default {
    components: {
        drugIndustryNumber,
        Chart,
        pieChart
    },
    data () {
        return {
            activeName: 'first',
            params: {
                regional: "华东",
                param: "一般预算收入"
            },
            regionalInfoObj: {},
            danwei: '亿元',
            year: [],
        };
    },
    created () {
        this.getChart()
        this.regionaltime()
    },
    watch: {
        flag () {
            this.getChart()
        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        // 获取大区和年限
        regionaltime () {
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionaltime', {})
                .then(res => {
                    if (res.code === '200') {
                        this.year = res.data.year
                    }
                });
        },
        reSet () {
            this.params = {
                regional: "华东",
                param: "一般预算收入"
            }
            this.getChart()
        },
        getUnit (val) {
            switch (val) {
                case "一般预算收入":

                    return "亿元"
                case "基金预算收入":

                    return "亿元"
                case "人口数量(万人)":

                    return "万人"
                case "人均财政收入(元)":

                    return "元"
            }
        },
        getChart () {
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionalfiscalinfo', this.params, { type: 'post' })
                .then(res => {
                    let { param } = this.params
                    if (param === '一般预算收入') {
                        this.danwei = '亿元'
                    }
                    else if (param === '基金预算收入') {
                        this.danwei = '亿元'
                    }
                    else if (param === '人口数量(万人)') {
                        this.danwei = '万人'
                    }
                    else if (param === '人均财政收入(元)') {
                        this.danwei = '元'
                    }


                    let barObj = deepClone(bar)
                    let { regionalInfo = [], financial_ratio = [], sales_accounted = [] } = res.data
                    let imgDom = document.createElement('img')
                    imgDom.src = require("@/assets/images/echart/bar.png")
                    // 柱状图
                    barObj.title.text = "各省财政数据 "
                    barObj.xAxis.data = regionalInfo.map(i => i.province)
                    barObj.series[0] = {
                        type: "bar",
                        barWidth: '28',
                        barMinHeight: '5',
                        itemStyle: {
                            color: {
                                image: imgDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                                repeat: 'repeat'
                            }
                        },
                        data: regionalInfo.map(i => i.data)
                    }

                    barObj.tooltip.formatter = (params) => {
                        let unit = this.getUnit(this.params.param)
                        return `<div>${params.marker}${params.name}</div>
                    <div style="text-indent: 14px;">${this.numFormat(params.value)}${unit}</div>
            `

                    }
                    // 切换主题
                    if (this.flag === 'light') {
                        barObj.title.textStyle.color = '#333';
                        barObj.title.textStyle.fontWeight = 'normal';
                        barObj.yAxis.axisLine = this.$medicine.axis
                        barObj.xAxis.axisLine = this.$medicine.axis
                        barObj.tooltip.backgroundColor = this.$medicine.tooltipBG
                        barObj.tooltip.borderWidth = 0;
                        barObj.xAxis.axisLabel = {
                            color: this.$medicine.nameColor
                        }
                        barObj.yAxis.axisLabel = {
                            color: this.$medicine.nameColor
                        }
                        imgDom.src = require("@/assets/images/light/echarts/bar.png")
                    }
                    this.regionalInfoObj = barObj
                    //两个饼图
                    this.$refs.pie.financialList = financial_ratio.map(i => {
                        return {
                            name: i.province,
                            value: (i.sum).replace("%", ""),
                        }
                    })
                    this.$refs.pie.salesList = sales_accounted.map(i => {
                        return {
                            name: i.province,
                            value: (i.total_amount).replace("%", ""),
                        }
                    })
                    this.$refs.pie.drawIncludedPie()
                    this.$refs.pie.drawProjectPie()

                });
        },
    },
};
</script>

<style lang="scss" scoped>
.formBox {
    .doc-box {
        padding-top: 30px;
        box-sizing: border-box;
        margin-right: 10px;
    }
}
.light {
    .danwei {
        color: #999;
        font-family: PingFang-SC-Regular;
    }
}
.danwei {
    position: absolute;
    top: 116px;
    left: 81px;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #a0a3a8;
    letter-spacing: 1.17px;
    line-height: 14px;
}
</style>
