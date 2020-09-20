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
            <div class="echart-big-title num-left">服务内容异常发票金额及占比</div>
            <chart height="511px" width="100%" id="invoice1" style="margin-top:40px;" :option="opt" />
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
            let invoiceContent = deepClone(invoiceOption);
            invoiceContent.grid.top = 60
            invoiceContent.legend.data = ["开票金额", "开票比例"];
            invoiceContent.legend.textStyle = {
                color: '#A0A3A8',
                fontFamily: "PingFangSC-Light",
                fontSize: 14
            }
            invoiceContent.series[1].barWidth = 40;
            invoiceContent.series[1].name = "开票金额";
            invoiceContent.series[0].name = "开票比例";
            invoiceContent.series[0].itemStyle = {
                normal: {
                    lineStyle: {
                        //折线的颜色
                        color: "#636389"
                    },
                    color: "#8993CE",  // 折点颜色
                    borderColor: "#8993CE" //拐点边框的颜色
                }
            }
            invoiceContent.series[1].itemStyle.normal.color = "#2B2C36";  // 柱子默认颜色
            invoiceContent.series[1].itemStyle.normal.borderColor = "#505366";  // 柱子默认边框颜色
            invoiceContent.series[1].emphasis.itemStyle.color = "#3E435A";  // 鼠标经过柱子颜色
            invoiceContent.series[1].emphasis.itemStyle.borderColor = "#5F6AAA";  // 鼠标柱子边框颜色
            this.$http('/dcp/count/invoice/content', this.params).then(res => {
                // invoiceContent.title.text = "服务内容异常发票金额及占比"
                let data = res.data
                // invoiceContent.grid.bottom = 150
                invoiceContent.tooltip.axisPointer = {
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
                invoiceContent.xAxis.data = data.map(v => { return v.companyName }),
                    invoiceContent.xAxis.axisLabel.rotate = 12
                invoiceContent.yAxis[0].name = '单位：元',
                    invoiceContent.yAxis[0].nameTextStyle.padding = [-10, 0, 10, 50]
                invoiceContent.series[0].data = data.map(v => {
                    return (v.ratio * 100).toFixed(2);
                });
                invoiceContent.series[1].data = data.map(v => {
                    return v.errorAmount;
                });
                // console.log('invoiceContent.series[0].data',invoiceContent.series[0].data);
                // console.log('invoiceContent.series[1].data',invoiceContent.series[1].data);
                invoiceContent.tooltip.formatter = function (params) {
                    let str = `<span class="echarts-circle"></span>${params[0].name}<br/>`
                    params.forEach((i, index) => {
                        // console.log('i',i);
                        // console.log('index',index);
                        // str = `${i.marker}${i.seriesName}  ${i.value}<br />`
                        if (index === 1) {
                            str += `${i.seriesName}：${numFormat(i.value)} 元`
                        } else if (index === 0) {
                            str += `${i.seriesName}：${Number(i.value) ? Number(i.value) : 0} %<br />`
                        }
                    })
                    return str
                }

                // 主题切换
                if (this.flag === 'light') {
                    invoiceContent.tooltip.backgroundColor = this.$medicine.tooltipBG
                    invoiceContent.tooltip.borderWidth = 0;
                    invoiceContent.yAxis[0].splitLine = this.$medicine.axis
                    invoiceContent.yAxis[0].axisLine = this.$medicine.axis
                    invoiceContent.yAxis[1].axisLine = this.$medicine.axis
                    invoiceContent.xAxis.axisLine = this.$medicine.axis
                    invoiceContent.yAxis[0].axisTick = this.$medicine.axis
                    invoiceContent.yAxis[1].axisTick = this.$medicine.axis
                    invoiceContent.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    invoiceContent.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    invoiceContent.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    invoiceContent.series[0].itemStyle = {
                        normal: {
                            lineStyle: {
                                //折线的颜色
                                color: this.$service.output.application.invoiceContent.series0_itemStyle[0]
                            },
                            color: this.$service.output.application.invoiceContent.series0_itemStyle[1],  // 折点颜色
                            borderColor: this.$service.output.application.invoiceContent.series0_itemStyle[1] //拐点边框的颜色
                        }
                    }
                    invoiceContent.yAxis[0].axisLabel = invoiceContent.yAxis[1].axisLabel = invoiceContent.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };
                    invoiceContent.yAxis[0].nameTextStyle.color = this.$medicine.nameColor;
                    invoiceContent.yAxis[0].nameTextStyle.fontFamily = 'PingFang-SC-Regular' 
                    invoiceContent.legend.textStyle.color = this.$medicine.nameColor;
                    invoiceContent.legend.textStyle.fontFamily = 'PingFang-SC-Regular'

                    invoiceContent.series[1].itemStyle.normal.color = this.$service.output.application.invoiceContent.series1_color[0]  // 柱子默认颜色
                    invoiceContent.series[1].itemStyle.normal.borderColor = this.$service.output.application.invoiceContent.series1_borderColor  // 柱子默认边框颜色
                    invoiceContent.series[1].emphasis.itemStyle.color = this.$service.output.application.invoiceContent.series1_color[1]  // 鼠标经过柱子颜色
                    invoiceContent.series[1].emphasis.itemStyle.borderColor = this.$service.output.application.invoiceContent.series1_borderColor  // 鼠标柱子边框颜色
                }
                this.opt = invoiceContent
                // console.log('invoiceContent',invoiceContent);
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
    text-align: left;
    padding-left: 30px;
    font-size: 18px;
    letter-spacing: 1.5px;
}
</style>