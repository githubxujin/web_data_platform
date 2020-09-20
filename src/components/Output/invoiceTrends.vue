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
            <div class="echart-big-title num-left">不同服务内容开票金额月度变化</div>
            <chart height="511px" width="100%" id="invoice2" style="margin-top:20px;" :option="opt" />
            <!-- <el-row type="flex" class="tag-box">
                <el-row type="flex" class="mr20">
                    <c-op v-for="(v, k) in tagList" :key="k" :class="{ act: tagCur === k }" @click.native="tagHand(k, v.value)">
                        {{ v.label }}</c-op>
                </el-row>
            </el-row> -->
        </div>
    </div>
</template>
<script>
// import { mapState } from "vuex";
import steelLine from "@/views/infrastructure/config/steelLine.js";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import { numFormat } from "@/filters/index";
// import cOp from "@/components/common/c-op.vue";
export default {
    components: {
        Chart,
        // cOp
    },
    data () {
        return {
            opt: {},
            dateArr: [],
            params: {
                companyName: '上海语骏实业有限公司',
                dateType: 1,
                mode: 1,
                endDate: "",
                startDate: ""
            },
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "日"
                },
                {
                    value: 2,
                    label: "月"
                },
                {
                    value: 3,
                    label: "年"
                }
            ],
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
        // this.getDate()
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
        // 获取企业列表
        getCompanyList () {
            this.$http("/dcp/query/invoice/seller/list", this.companyData).then(res => {
                this.companyList = res.data
                // console.log('this.companyList',this.companyList);
            })
        },
        // 改变模块查询对应的公司列表
        changeMod (v) {
            this.companyData.industryCategory = v
            this.params.companyName = ''
            this.getCompanyList()
        },
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
            this.companyData = {
                buyerName: "",
                industryCategory: 1,
                invoiceEndDate: "",
                invoiceStartDate: "",
                sellerName: ""
            }
            this.getCompanyList()
            this.params = {
                companyName: "上海语骏实业有限公司",
                dateType: 1,
                endDate: "",
                mode: 1,
                startDate: ""
            }
            this.getChart()
        },
        //控制周月年
        // tagHand(k, value) {
        //     this.tagCur = k
        //     this.params.dateType = value
        //     this.getChart()
        // },
        getChart () {
            // this.params.companyName = this.companyList[0].companyName
            this.$http("/dcp/count/invoice/material/month", this.params).then(res => {
                let industryTrends = deepClone(steelLine);
                industryTrends.grid.top = 75
                industryTrends.legend.width = 750
                industryTrends.legend.textStyle = {
                    color: '#A0A3A8',
                    fontFamily: "PingFangSC-Light",
                    fontSize: 14
                }
                industryTrends.dataZoom[0].zoomLock = false
                industryTrends.dataZoom[1].zoomLock = false
                industryTrends.title.text = ''
                industryTrends.yAxis.name = '单位：元',
                    industryTrends.yAxis.nameTextStyle.fontFamily = 'PingFangSC-Light',
                    industryTrends.yAxis.nameTextStyle.align = 'left',
                    industryTrends.yAxis.nameTextStyle.padding = [0, 0, 10, 0],
                    industryTrends.tooltip.formatter = function (params) {
                        let str = ''
                        let name = ''
                        params.forEach(v => {
                            name = `<span class="echarts-circle"></span>${v.name}<br/>`
                            str += `${v.seriesName + '：'}${numFormat(v.value)} 元<br/>`
                        })
                        return name + str
                    }
                industryTrends.tooltip.axisPointer = {
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
                let dateArr = [] // res.data.length > 0 ? res.data[0].invoiceMaterialVoList.map(i => i.invoiceDate) : [];
                if (res.data && res.data.length > 0) {
                    res.data.forEach(v => {
                        v.invoiceMaterialVoList.forEach(item => {
                            dateArr.push(item.invoiceDate)
                        })
                    })
                    dateArr = [...new Set(dateArr)];
                    dateArr = dateArr.sort()
                }
                res.data.forEach(i => {
                    let childrenList = []
                    let dateList = i.invoiceMaterialVoList.map(e => e.invoiceDate)
                    dateArr.forEach(item => {
                        if (dateList.includes(item)) {
                            childrenList.push({
                                invoiceDate: item,
                                totalAmount: i.invoiceMaterialVoList[dateList.indexOf(item)].totalAmount
                            })
                        } else {
                            childrenList.push({
                                invoiceDate: item,
                                totalAmount: 0
                            })
                        }
                    })
                    i.invoiceMaterialVoList = childrenList
                })
                let series = [];
                let minArr = [];
                let colorList = []
                res.data.forEach(i => {
                    if (i.materialName === "其他") {
                        colorList.push("#358E80")
                    } else if (i.materialName === "其它钢材") {
                        colorList.push("#2C7D70")
                    } else if (i.materialName === "劳务") {
                        colorList.push("#A23A40")
                    } else if (i.materialName === "型钢") {
                        colorList.push("#337B8B")
                    } else if (i.materialName === "木枋") {
                        colorList.push("#4688B9")
                    } else if (i.materialName === "模板") {
                        colorList.push("#4685D1")
                    } else if (i.materialName === "水泥") {
                        colorList.push("#74B683")
                    } else if (i.materialName === "混凝土") {
                        colorList.push("#9BBC6C")
                    } else if (i.materialName === "钢筋") {
                        colorList.push("#BFA559")
                    } else if (i.materialName === "钢结构") {
                        colorList.push("#CC7451")
                    }
                    let arr = i.invoiceMaterialVoList.map(item => item.totalAmount);
                    minArr.push(...arr);
                    series.push({
                        name: i.materialName,
                        type: "line",
                        smooth: "true",
                        symbolSize: 2,
                        symbol: "circle",
                        data: i.invoiceMaterialVoList.map(item => item.totalAmount)
                    });
                });
                industryTrends.color = colorList
                industryTrends.xAxis.data = dateArr;
                // industryTrends.yAxis.axisLabel.formatter = '{value} G'
                industryTrends.yAxis.min = Math.min.apply(Math, minArr);
                industryTrends.series = series;
                industryTrends.legend.data = series.map((i, index) => {
                    return {
                        name: i.name
                    };
                });

                // 主题切换
                if (this.flag === 'light') {
                    industryTrends.yAxis.splitLine = this.$medicine.axis
                    industryTrends.yAxis.axisLine = this.$medicine.axis
                    industryTrends.xAxis.axisLine = this.$medicine.axis
                    industryTrends.tooltip.backgroundColor = this.$medicine.tooltipBG
                    industryTrends.tooltip.borderWidth = 0;
                    industryTrends.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    industryTrends.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1] 
                    industryTrends.xAxis.axisLabel = industryTrends.yAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };
                    industryTrends.yAxis.nameTextStyle.color = this.$medicine.nameColor;
                    industryTrends.yAxis.nameTextStyle.fontFamily = 'PingFang-SC-Regular' 
                    industryTrends.legend.textStyle.color = this.$medicine.nameColor;
                    industryTrends.legend.textStyle.fontFamily = 'PingFang-SC-Regular'

                    industryTrends.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                    colorList = this.$service.output.application.invoiceTrends.colorList
                    industryTrends.color = colorList
                }

                this.opt = industryTrends
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
    top: 30px;
    right: 54px;
}
.num-left {
    top: -20px;
    text-align: left;
    padding-left: 30px;
    font-size: 18px;
    letter-spacing: 1.5px;
}
</style>