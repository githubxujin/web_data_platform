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
            <div class="echart-big-title num-left">开票金额月度变化</div>
            <!-- <chart height="511px" width="1280px" id="invoice8" style="margin-top:45px;" :option="opt" /> -->
            <div id="invoice8" style="width:100%;height:511px;margin-top:0px;"></div>
        </div>
    </div>
</template>
<script>
// import { mapState } from "vuex";
import echarts from "echarts";
import { numFormat } from "@/filters/index";
// import invoiceOption from "@/views/resource/config/invoiceOption.js";
// import { deepClone } from "@/utils/common";
// import Chart from "@/components/Charts/invoiceInvalid";
export default {
    // components: {
    //     Chart,
    // },
    data () {
        return {
            opt: {},
            dateArr: [],
            params: {
                companyName: '深圳市皇悦建材有限公司',
                dateType: 0,
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
        // this.getDate()
        this.getCompanyList()
    },
    mounted () {
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
        // getDate() {
        //     var nowDate = new Date();
        //     var year = nowDate.getFullYear()
        //     var lastYear = year - 1
        //     var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
        //     var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()
        //     var currentDate = year + "-" + month + "-" + day
        //     var lastDate = lastYear + "-" + month + "-" + day
        //     this.dateArr = [lastDate, currentDate]
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
                companyName: "深圳市皇悦建材有限公司",
                dateType: 0,
                endDate: "",
                mode: 1,
                startDate: ""
            }
            this.getChart()
        },
        getChart () {
            this.$http("/dcp/count/invoice/amount/month/change", this.params).then(res => {
                var data = res.data
                var xList = data.map(v => v.monthOnMonthAmount)
                var yList = data.map(v => v.invoiceDate)
                var colorList = []
                data.forEach(e => {
                    if (Number(e.monthOnMonthAmount) > 0 && Number(e.monthOnMonthAmount) < 51) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#6B683F'
                        })
                    } else if (Number(e.monthOnMonthAmount) > 50 && Number(e.monthOnMonthAmount) < 101) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#596B3F'
                        })
                    } else if (Number(e.monthOnMonthAmount) > 100 && Number(e.monthOnMonthAmount) < 151) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#456B3F'
                        })
                    } else if (Number(e.monthOnMonthAmount) > 150 && Number(e.monthOnMonthAmount) < 201) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#365B48'
                        })
                    } else if (Number(e.monthOnMonthAmount) > 200 && Number(e.monthOnMonthAmount) < 251) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#25544C'
                        })
                    } else if (Number(e.monthOnMonthAmount) > 250) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#2D7176'
                        })
                    } else if (Number(e.monthOnMonthAmount) < 0 && Number(e.monthOnMonthAmount) > -51) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#69502A'
                        })
                    } else if (Number(e.monthOnMonthAmount) < -50 && Number(e.monthOnMonthAmount) > -101) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#694A2A'
                        })
                    } else if (Number(e.monthOnMonthAmount) < -100 && Number(e.monthOnMonthAmount) > -151) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#69422A'
                        })
                    } else if (Number(e.monthOnMonthAmount) < -150 && Number(e.monthOnMonthAmount) > -201) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#69382A'
                        })
                    } else if (Number(e.monthOnMonthAmount) < -200 && Number(e.monthOnMonthAmount) > -251) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#692A2A'
                        })
                    } else if (Number(e.monthOnMonthAmount) < -250) {
                        colorList.push({
                            amount: e.monthOnMonthAmount,
                            color: '#2D7176'
                        })
                    }
                })
                const myChart = echarts.init(document.getElementById("invoice8"));
                var option = {
                    // legend: {
                    //     data:['高度(km)与气温(°C)变化关系']
                    // },
                    tooltip: {
                        trigger: "axis",
                        backgroundColor: "#1A1B1B",
                        borderColor: '#7EDEE9',
                        borderWidth: 1,
                        padding: 15,
                        textStyle: {
                            fontFamily: "PingFangSC-Light"
                        },
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'line',        // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
                        formatter: function (params) {
                            // console.log('111',params);
                            let str = `<span class="echarts-circle"></span>${params[0].name}<br/>`
                            let list = []
                            params.forEach(i => {
                                list = []
                                data.forEach(v => {
                                    if (i.name === v.invoiceDate) list.push(1)
                                })
                            })
                            if (list.length > 2) {
                                str += '<div class="chartTopBox1">'
                                params.forEach(i => {
                                    data.forEach(e => {
                                        if (i.name === e.invoiceDate) {
                                            str += `<div>${i.seriesName}${numFormat(e.totalAmount)} 元</div>`
                                        }
                                    })
                                })
                            } else {
                                params.forEach(i => {
                                    data.forEach(e => {
                                        if (i.name === e.invoiceDate) {
                                            str += `${i.seriesName}${numFormat(e.totalAmount)} 元`
                                        }
                                    })
                                })
                            }

                            str += '</div>'
                            return str
                        }
                    },
                    dataZoom: [
                        {
                            type: "slider",
                            show: true,
                            yAxisIndex: [0],
                            left: "98%",
                            start: 1,
                            end: 20,
                            width: 8,
                            borderColor: "transparent",
                            backgroundColor: "#242D30",
                            fillerColor: "#2A3C40",
                            showDetail: false,
                            handleSize: false,
                            zoomLock: true,
                            maxValueSpan: 10, //设置显示多少个
                            minValueSpan: 10
                        },

                        {
                            type: "inside",
                            height: 8,
                            yAxisIndex: [0],
                            start: 1,
                            end: 20,
                            // zoomOnMouseWheel: false,
                            // maxValueSpan: 10, //设置显示多少个
                            // minValueSpan: 10
                        }
                    ],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ['#414346'],
                                width: 0.5
                            }
                        },
                        axisLabel: {
                            fontFamily: "PingFangSC-Light",
                            color: '#A0A3A8',
                            formatter: '{value} %'
                        }
                    },
                    yAxis: {
                        type: 'category',
                        axisLine: { onZero: false },
                        axisLabel: {
                            fontFamily: "PingFangSC-Light",
                            color: '#A0A3A8'
                            // formatter: '{value} km'
                        },
                        data: yList
                    },
                    graphic: [
                        {
                            type: 'image',
                            id: 'logo',
                            right: 20,
                            top: 20,
                            z: -10,
                            bounding: 'raw',
                            origin: [75, 75],
                            style: {
                                width: 150,
                                height: 150,
                                opacity: 0.4
                            }
                        },
                        {
                            type: 'group',
                            rotation: Math.PI / 4,
                            bounding: 'raw',
                            right: 110,
                            bottom: 110,
                            z: 100,
                        },
                        {
                            type: 'group',
                            left: '10%',
                            top: 'center',
                        }
                    ],
                    series: [
                        {
                            name: '',
                            type: 'bar',
                            barWidth: 20,
                            barGap: 20,
                            barCategoryGap: 20,
                            legendHoverLink: false,
                            itemStyle: {        //上方显示数值
                                normal: {
                                    label: {
                                        show: true, //开启显示
                                        position: '', //在上方显示
                                        textStyle: { //数值样式
                                            color: '#A0A3A8',
                                            fontSize: 12
                                        },
                                        formatter: function (params) {
                                            return params.value + '%'
                                        }
                                    },
                                    color: function (params) {
                                        // console.log('params',params)
                                        for (var i = 0; i < colorList.length; i++) {
                                            if (colorList[i].amount === params.value) {
                                                return colorList[i].color
                                            }
                                        }
                                    }
                                }
                            },
                            emphasis: {
                                show: false,
                            },
                            data: xList
                        }
                    ]
                }

                // 主题切换
                if (this.flag === 'light'){
                    colorList = []
                    data.forEach(e => {
                        if (Number(e.monthOnMonthAmount) > 0 && Number(e.monthOnMonthAmount) < 51) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#FFEC68'
                            })
                        } else if (Number(e.monthOnMonthAmount) > 50 && Number(e.monthOnMonthAmount) < 101) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#BDE06D'
                            })
                        } else if (Number(e.monthOnMonthAmount) > 100 && Number(e.monthOnMonthAmount) < 151) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#9BD96F'
                            })
                        } else if (Number(e.monthOnMonthAmount) > 150 && Number(e.monthOnMonthAmount) < 201) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#6DCF72'
                            })
                        } else if (Number(e.monthOnMonthAmount) > 200 && Number(e.monthOnMonthAmount) < 251) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#60D091'
                            })
                        } else if (Number(e.monthOnMonthAmount) > 250) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#07BB7A'
                            })
                        } else if (Number(e.monthOnMonthAmount) < 0 && Number(e.monthOnMonthAmount) > -51) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#FACF62'
                            })
                        } else if (Number(e.monthOnMonthAmount) < -50 && Number(e.monthOnMonthAmount) > -101) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#F5AD5B'
                            })
                        } else if (Number(e.monthOnMonthAmount) < -100 && Number(e.monthOnMonthAmount) > -151) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#F19556'
                            })
                        } else if (Number(e.monthOnMonthAmount) < -150 && Number(e.monthOnMonthAmount) > -201) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#EB724E'
                            })
                        } else if (Number(e.monthOnMonthAmount) < -200 && Number(e.monthOnMonthAmount) > -251) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#E8664B'
                            })
                        } else if (Number(e.monthOnMonthAmount) < -250) {
                            colorList.push({
                                amount: e.monthOnMonthAmount,
                                color: '#36C2CF'
                            })
                        }
                    })
                    option.series[0].itemStyle.normal.color = function (params) {
                        for (var i = 0; i < colorList.length; i++) {
                            if (colorList[i].amount === params.value) {
                                return colorList[i].color
                            }
                        }
                    }
                    option.yAxis.axisLabel = option.xAxis.axisLabel = {
                        color: this.$medicine.nameColor,
                        fontFamily: 'PingFang-SC-Regular'
                    };
                    option.xAxis.splitLine = this.$medicine.axis
                    option.yAxis.axisLine = this.$medicine.axis
                    option.xAxis.axisLine = this.$medicine.axis
                    option.xAxis.axisTick = this.$medicine.axis
                    option.yAxis.axisTick = this.$medicine.axis
                    option.tooltip.backgroundColor = this.$medicine.tooltipBG 
                    option.tooltip.borderWidth = 0;
                    option.dataZoom[0].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    option.dataZoom[0].fillerColor = this.$service.output.behavior.dataZoom[1]
                    option.tooltip.axisPointer.lineStyle.color = this.$service.output.application.monthChange.axisPointer
                }
                
                myChart.setOption(option)
            })
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
    top: 5px;
    // width: 500px;
    text-align: left;
    padding-left: 30px;
    font-size: 18px;
    letter-spacing: 1.5px;
}
</style>