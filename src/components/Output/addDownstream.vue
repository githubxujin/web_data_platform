<template>
    <div>
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.mode' clearable placeholder='模块' @change="changeMod">
                    <!-- <el-option v-for='(s,index) in typeList' :label='s.name' :value='s.name' :key='index'>
                    </el-option> -->
                    <el-option label='基建' :value='1'></el-option>
                    <el-option label='医疗' :value='2'></el-option>
                    <el-option label='能源' :value='3'></el-option>
                    <el-option label='其他' :value='0'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.companyName' style='width: 260px' clearable filterable placeholder="企业名称">
                    <el-option v-for="(v,i) in companyList" :key="i" :label='v' :value='v'>
                    </el-option>
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
            <div class="echart-big-title num-left">企业新增付款下游的金额及占比</div>
            <chart height="511px" width="100%" id="invoice7" style="margin-top:40px;" :option="opt" />

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
        // cOp
    },
    data () {
        return {
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
            opt: {},
            dateArr: [],
            params: {
                companyName: '深圳市皇悦建材有限公司',
                dateType: 1,
                mode: 1,
                endDate: "",
                startDate: ""
            },
            companyData: {
                buyerName: "",
                industryCategory: 1,
                invoiceEndDate: "",
                invoiceStartDate: "",
                sellerName: ""
            },
            companyList: []

        };
    },
    created () {
        this.fastChange(360 * 4)
        this.getChart()
        this.getCompanyList()
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
        fastChange (val) {
            const date = new Date();
            this.params.endDate = this.formatDate(new Date(), 'YYYY-MM-DD');
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.startDate = this.formatDate(startDate, 'YYYY-MM-DD');
            this.dateArr = [this.params.startDate, this.params.endDate]

        },
        // 获取企业列表
        getCompanyList () {
            this.$http("/dcp/query/invoice/seller/list", this.companyData).then(res => {
                this.companyList = res.data
            })
        },
        // 改变模块查询对应的公司列表
        changeMod (v) {
            this.companyData.industryCategory = v
            this.params.companyName = ''
            this.getCompanyList()
        },

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
                companyName: "深圳市皇悦建材有限公司",
                dateType: 1,
                endDate: "",
                mode: 1,
                startDate: ""
            }
            this.getDates()
            this.getChart()
        },
        getChart () {
            let addDownstream = deepClone(invoiceOption);
            addDownstream.grid.top = 60
            addDownstream.legend.data = ["开票金额", "开票比例"];
            addDownstream.legend.textStyle = {
                color: '#A0A3A8',
                fontFamily: "PingFangSC-Light",
                fontSize: 14
            }
            addDownstream.series[1].barWidth = 40;
            addDownstream.series[1].name = "开票金额";
            addDownstream.series[0].name = "开票比例";
            addDownstream.series[0].itemStyle = {
                normal: {
                    lineStyle: {
                        //折线的颜色
                        color: "#A66C37"
                    },
                    color: "#DD9048",  // 折点颜色
                    borderColor: "#DD9048" //拐点边框的颜色
                }
            }
            addDownstream.series[1].itemStyle.normal.color = "#3D322B";  // 柱子默认颜色
            addDownstream.series[1].itemStyle.normal.borderColor = "#8B582A";  // 柱子默认边框颜色
            addDownstream.series[1].emphasis.itemStyle.color = "#5B4435";  // 鼠标经过柱子颜色
            addDownstream.series[1].emphasis.itemStyle.borderColor = "#CC803C";  // 鼠标柱子边框颜色
            this.$http('/dcp/count/invoice/new/downstream', this.params).then(res => {
                // addDownstream.title.text = "服务内容异常发票金额及占比"
                let data = res.data
                // addDownstream.grid.bottom = 150
                addDownstream.tooltip.axisPointer = {
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
                addDownstream.xAxis.data = data.map(v => { return v.buyerName }),
                    addDownstream.xAxis.axisLabel.rotate = 12
                addDownstream.yAxis[0].name = '单位：元',
                    addDownstream.yAxis[0].nameTextStyle.padding = [-10, 0, 10, 50]
                addDownstream.series[0].data = data.map(v => {
                    return (v.invoiceRate * 100).toFixed(2);
                });
                addDownstream.series[1].data = data.map(v => {
                    return v.invoiceAmount;
                });
                // console.log('addDownstream.series[0].data',addDownstream.series[0].data);
                // console.log('addDownstream.series[1].data',addDownstream.series[1].data);
                addDownstream.tooltip.formatter = function (params) {
                    let str = `<span class="echarts-circle"></span>${params[0].name}<br/>`
                    params.forEach((i, index) => {
                        // console.log('i',i);
                        // console.log('index',index);
                        // str = `${i.marker}${i.seriesName}  ${i.value}<br />`
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
                    addDownstream.tooltip.backgroundColor = this.$medicine.tooltipBG
                    addDownstream.tooltip.borderWidth = 0;
                    addDownstream.yAxis[0].splitLine = this.$medicine.axis
                    addDownstream.yAxis[0].axisLine = this.$medicine.axis
                    addDownstream.yAxis[1].axisLine = this.$medicine.axis
                    addDownstream.xAxis.axisLine = this.$medicine.axis
                    addDownstream.yAxis[0].axisTick = this.$medicine.axis
                    addDownstream.yAxis[1].axisTick = this.$medicine.axis
                    addDownstream.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    addDownstream.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    addDownstream.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                    addDownstream.series[0].itemStyle = {
                        normal: {
                            lineStyle: {
                                //折线的颜色
                                color: this.$service.output.application.addDownstream.series0_itemStyle[0]
                            },
                            color: this.$service.output.application.addDownstream.series0_itemStyle[1],  // 折点颜色
                            borderColor: this.$service.output.application.addDownstream.series0_itemStyle[1] //拐点边框的颜色
                        }
                    }
                    addDownstream.yAxis[0].axisLabel = addDownstream.yAxis[1].axisLabel = addDownstream.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };
                    addDownstream.yAxis[0].nameTextStyle.color = this.$medicine.nameColor;
                    addDownstream.yAxis[0].nameTextStyle.fontFamily = 'PingFang-SC-Regular' 
                    addDownstream.legend.textStyle.color = this.$medicine.nameColor;
                    addDownstream.legend.textStyle.fontFamily = 'PingFang-SC-Regular'

                    addDownstream.series[1].itemStyle.normal.color = this.$service.output.application.addDownstream.series1_color[0]  // 柱子默认颜色
                    addDownstream.series[1].itemStyle.normal.borderColor = this.$service.output.application.addDownstream.series1_borderColor  // 柱子默认边框颜色
                    addDownstream.series[1].emphasis.itemStyle.color = this.$service.output.application.addDownstream.series1_color[1]  // 鼠标经过柱子颜色
                    addDownstream.series[1].emphasis.itemStyle.borderColor = this.$service.output.application.addDownstream.series1_borderColor  // 鼠标柱子边框颜色
                }
                this.opt = addDownstream
                // console.log('addDownstream',addDownstream);
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