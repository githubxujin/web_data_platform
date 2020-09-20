<template>
    <div>
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.mode' clearable placeholder='模块'>
                    <el-option label='基建' :value='1'></el-option>
                    <el-option label='医疗' :value='2'></el-option>
                    <el-option label='能源' :value='3'></el-option>
                    <el-option label='其他' :value='0'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-top: -1px">
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click="getChart">查询</el-button>
                <el-button type='info' size='medium' @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re ">
            <div class="echart-big-title num-left">作废发票金额及占比</div>
            <chart height="511px" width="100%" id="invoice6" style="margin-top:40px;" :option="opt" />
        </div>
    </div>
</template>
<script>
import invoiceOption from "@/views/resource/config/invoiceOption.js";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import { numFormat } from "@/filters/index";
export default {
    components: {
        Chart,
    },
    data () {
        return {
            opt: {},
            dateArr: ['2019-01-01', '2019-12-31'],
            params: {
                companyName: '',
                dateType: 0,
                mode: 1,
                endDate: "2019-12-31",
                startDate: "2019-01-01"
            }
        };
    },
    created () {
        // this.getDate()
        this.getChart()
    },
    watch:{
        flag(){
            this.getChart()
        }
    },
    computed:{
        flag:{
            get(){
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        // 当前日期 和 一年前的日期
        // getDate (){
        //     var nowDate = new Date();
        //     var year = nowDate.getFullYear()
        //     var lastYear = year - 1
        //     var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
        //     var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()
        //     var currentDate = year + "-" + month + "-" + day
        //     var lastDate = lastYear + "-" + month + "-" + day
        //     this.dateArr = [lastDate,currentDate]
        //     this.changeDate(this.dateArr)
        // },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.startDate = '';
            }
        },
        reSet () {
            this.params = {
                companyName: "",
                dateType: 0,
                mode: 1,
                endDate: "2019-12-31",
                startDate: "2019-01-01"
            }
            this.dateArr = ['2019-01-01', '2019-12-31']
            this.getChart()
        },
        getChart () {
            let cancellationWarning = deepClone(invoiceOption);
            cancellationWarning.grid.top = 60
            cancellationWarning.legend.data = ["作废金额", "作废比例"];
            cancellationWarning.legend.textStyle = {
                color: '#A0A3A8',
                fontFamily: "PingFangSC-Light",
                fontSize: 14
            }
            cancellationWarning.series[1].barWidth = 40;
            cancellationWarning.series[1].name = "作废金额";
            cancellationWarning.series[0].name = "作废比例";
            cancellationWarning.series[0].itemStyle = {
                normal: {
                    lineStyle: {
                        //折线的颜色
                        color: " #BFA559"
                    },
                    color: "#DCC072",  // 折点颜色
                    borderColor: "#DCC072" //拐点边框的颜色
                }
            }
            cancellationWarning.series[1].itemStyle.normal.color = "rgba(168,146,81,0.10)";  // 柱子默认颜色
            cancellationWarning.series[1].itemStyle.normal.borderColor = "#7F7045";  // 柱子默认边框颜色
            cancellationWarning.series[1].emphasis.itemStyle.color = "#57573A";  // 鼠标经过柱子颜色
            cancellationWarning.series[1].emphasis.itemStyle.borderColor = "#C5AC65";  // 鼠标柱子边框颜色
            this.$http('/dcp/count/invoice/invalid', this.params).then(res => {
                let data = res.data
                cancellationWarning.tooltip.axisPointer = {
                    lineStyle: {
                        width: 2,
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(120,207,214,0)"
                                },
                                {
                                    offset: 0.5,
                                    color: "rgba(67,161,172,1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(67,161,172,0)"
                                }
                            ],
                            global: false
                        }
                    }
                };
                cancellationWarning.xAxis.data = data.map(v => { return v.companyName }),
                    cancellationWarning.xAxis.axisLabel.rotate = 12
                cancellationWarning.yAxis[0].name = '单位：元',
                    cancellationWarning.yAxis[0].nameTextStyle.padding = [-10, 0, 10, 50]
                cancellationWarning.series[0].data = data.map(v => {
                    return (Number(v.invalidRatio) * 100).toFixed(2);
                });
                cancellationWarning.series[1].data = data.map(v => {
                    return v.invalidAmount;
                });
                cancellationWarning.tooltip.formatter = function (params) {
                    let str = `<span class="echarts-circle"></span>${params[0].name}<br/>`
                    params.forEach((i, index) => {
                        if (index === 1) {
                            str += `${i.seriesName}：${numFormat(i.value)} 元`
                        } else if (index === 0) {
                            str += `${i.seriesName}：${Number(i.value)} %<br />`
                        }
                    })
                    return str
                }

                // 主题切换
                if (this.flag === 'light') {
                    cancellationWarning.tooltip.backgroundColor = this.$medicine.tooltipBG
                    cancellationWarning.tooltip.borderWidth = 0;
                    cancellationWarning.yAxis[0].splitLine = this.$medicine.axis
                    cancellationWarning.yAxis[0].axisLine = this.$medicine.axis
                    cancellationWarning.yAxis[1].axisLine = this.$medicine.axis
                    cancellationWarning.xAxis.axisLine = this.$medicine.axis
                    cancellationWarning.yAxis[0].axisTick = this.$medicine.axis
                    cancellationWarning.yAxis[1].axisTick = this.$medicine.axis
                    cancellationWarning.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    cancellationWarning.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    cancellationWarning.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    cancellationWarning.series[0].itemStyle = {
                        normal: {
                            lineStyle: {
                                //折线的颜色
                                color: this.$service.output.application.cancellationWarning.series0_itemStyle[0]
                            },
                            color: this.$service.output.application.cancellationWarning.series0_itemStyle[1],  // 折点颜色
                            borderColor: this.$service.output.application.cancellationWarning.series0_itemStyle[1] //拐点边框的颜色
                        }
                    }

                    cancellationWarning.yAxis[0].axisLabel = cancellationWarning.yAxis[1].axisLabel = cancellationWarning.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };

                    cancellationWarning.yAxis[0].nameTextStyle.color = this.$medicine.nameColor;
                    cancellationWarning.yAxis[0].nameTextStyle.fontFamily = 'PingFang-SC-Regular'
                    cancellationWarning.legend.textStyle.color = this.$medicine.nameColor;
                    cancellationWarning.legend.textStyle.fontFamily = 'PingFang-SC-Regular' 

                    cancellationWarning.series[1].itemStyle.normal.color = this.$service.output.application.cancellationWarning.series1_color[0]  // 柱子默认颜色
                    cancellationWarning.series[1].itemStyle.normal.borderColor = this.$service.output.application.cancellationWarning.series1_borderColor  // 柱子默认边框颜色
                    cancellationWarning.series[1].emphasis.itemStyle.color = this.$service.output.application.cancellationWarning.series1_color[1]  // 鼠标经过柱子颜色
                    cancellationWarning.series[1].emphasis.itemStyle.borderColor = this.$service.output.application.cancellationWarning.series1_borderColor  // 鼠标柱子边框颜色
                }

                this.opt = cancellationWarning
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
    top: 0px;
    right: 54px;
}
.num-left {
    top: -38px;
    // width: 500px;
    text-align: left;
    padding-left: 30px;
    font-size: 18px;
    letter-spacing: 1.5px;
}
</style>