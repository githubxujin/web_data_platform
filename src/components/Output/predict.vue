<template>
    <div>
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item>
                <el-select v-model='params.buyerCustomerName' style='width: 260px' placeholder="企业名称" @change="onChangeCompany" filterable clearable>
                    <el-option v-for="(v,i) in companyList" :key="i" :label='v' :value='v'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.sellerCustomerName' style='width: 260px' placeholder="供应商名称" filterable clearable>
                    <el-option v-for="(v,i) in supplierList" :key="i" :label='v' :value='v'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin-top: -1px;">
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click="getChart('num')">查询</el-button>
                <el-button type='info' size='medium' @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re " v-if="showEchart">
            <div class="echart-big-title num-left">下游回款天数与预测回款差值趋势</div>
            <chart height="511px" width="900px" id="invoice2" style="margin-top:20px;" :option="opt" />
            <div class="project-top-wrap">
                <div class="project-title">项目名称</div>
                <div class="project-count">最多选择五项（ 已选 {{  getColorCount() }}/5 ）</div>
            </div>
            <div class="project-wrap">
                <div class="project-box">
                    <div class="project-text" v-for="(item,index) in projectList" :key="index" @click="activeCircle(index, item)">
                        <span class="project-circle" :style="{ background:  [colorObj[item] && colorObj[item].active === true ? colorObj[item].color : '']}"></span>{{ item }}
                    </div>
                </div>

            </div>
        </div>
        <div v-else>
            <not-found title="下游回款天数与预测回款差值趋势" height="500px" />
        </div>
    </div>
</template>
<script>

import steelLine from "./config/line"
import { deepClone, getSuperDaysValue } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import NotFound from "@/components/Charts/not-fount.vue"
export default {
    components: {
        Chart,
        NotFound
    },
    data () {
        return {
            showEchart: true,
            projectList: [

            ],
            colorList: [
                { color: '#3F8867', active: false, projectName: '' },
                { color: '#934531', active: false, projectName: '' },
                { color: '#84723B ', active: false, projectName: '' },
                { color: '#43A1AC', active: false, projectName: '' },
                { color: '#4084D5', active: false, projectName: '' }
            ],
            colorObj: {},
            opt: {},
            dateArr: [],
            params: {
                mode: 1,
                dateType: 3,
                "buyerCustomerName": "中国建筑一局（集团）有限公司", //买方名称
                "startDate": "",//开始时间
                "endDate": "",//结束时间
                "sellerCustomerName": ""//供应商名称
            },
            tagCur: 2,
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
            indexList: '',
            companyList: [],
            supplierList: []
        };
    },


    watch: {
        indexList: function () {
            if (this.indexList === 4) {
                this.getChart('num')
            }
        },
        flag () {
            this.getChart('default')
        }
    },
    created () {
        this.getDate()
        this.getChart('default')
        this.getCompanyList()
        this.onChangeCompany()
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        remoteMethod (query) {
            this.companyData.buyerName = query
            this.getCompanyList()
        },
        onChangeCompany (buyerCustomerName = '') {
            if (buyerCustomerName) {
                this.$http('/riskCredit/dataCenter/querySellerCustomerList', { buyerCustomerName }).then(res => {
                    this.supplierList = res.data
                });
            } else {
                this.$http('/riskCredit/dataCenter/querySellerCustomerList', { buyerCustomerName: this.params.buyerCustomerName }).then(res => {
                    this.supplierList = res.data
                });
            }

        },
        getColorCount () {
            let count = this.colorList.filter(i => i.active === true && this.projectList.includes(i.projectName))
            return count.length
        },
        colorObject () {

            this.colorList.map((i, index) => {
                this.$set(this.colorObj, i.projectName, { color: i.color, active: i.active })
                if (index === 4) {
                    this.indexList = 4
                }
            })

        },
        activeCircle (activeIndex, projectName) {
            let isProjectName = this.colorList.findIndex(i => i.projectName === projectName)
            if (isProjectName !== -1) {  //已经存在
                this.colorList[isProjectName].active = !this.colorList[isProjectName].active
                this.colorObject()
            } else { // 不存在
                let colorIndex = this.colorList.findIndex(i => i.active === false)
                if (colorIndex !== -1) {
                    this.colorList[colorIndex].active = true
                    this.colorList[colorIndex].projectName = projectName
                    this.colorObject()
                }


            }
        },
        // 获取企业列表
        getCompanyList () {
            this.$http("/riskCredit/dataCenter/queryBuyerCustomerNameList", this.companyData).then(res => {
                this.companyList = res.data
            })
        },

        // 当前日期 和 4年前的日期
        getDate () {
            var nowDate = new Date();
            var year = nowDate.getFullYear()
            var lastYear = year - 4
            var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
            var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate()
            var currentDate = year + "-" + month + "-" + day
            var lastDate = lastYear + "-" + month + "-" + day
            this.dateArr = [lastDate, currentDate]
            this.changeDate(this.dateArr)
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.endDate = '';
            }
        },
        reSet () {
            this.params = {
                "buyerCustomerName": "中国建筑一局（集团）有限公司", //买方名称
                "startDate": "",//开始时间
                "endDate": "",//结束时间
                "sellerCustomerName": ""//供应商名称
            }
            this.tagCur = 2
            this.getDate()
            this.getChart('default')
        },
        getChart (type = "default") {
            if (this.flag === 'light') {
                this.colorList = this.$medicine.output.colorList;
            } else {
                this.colorList = [
                    { color: '#3F8867', active: false, projectName: '' },
                    { color: '#934531', active: false, projectName: '' },
                    { color: '#84723B ', active: false, projectName: '' },
                    { color: '#43A1AC', active: false, projectName: '' },
                    { color: '#4084D5', active: false, projectName: '' }
                ]
            }
            this.$http("/riskCredit/dataCenter/queryReceivableDayDValue", this.params).then(res => {
                if (res.data.length > 0) {
                    let symboalList = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow']
                    let dataUriList = [
                        'image://data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAANlJREFUOBFjYBggwEiqve6LN9j++f+3FKjRBKT3PwPDGRZG5u6dsQGHSTGLJItdF6+t+vefoYXh/38UfUDOP0YmxtrdscFtxFqOYgA+TSCf/v335wDQh0zY1IEsZ2ZicSDW51gNwWYwKHhxWQpSD5IDqcGmF5sY0RYDfQSOU2yGwMSIUQNX67xwDdCx9AdEx7HzorWbgInKF68TGRk3740L9sOrBipJdFCDsgwoAeEyFCQHUoNLHl2caIvBqZWRoQ6b5SAxUHYiNkWDHAHUQxqgVgFCmq1UVA0A0jxFWIxbev4AAAAASUVORK5CYII=',
                        'image://data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAAEZJREFUOBFjYBggwEisvc4L1/wnRu3e+BCizGQixjBaqBm1mBahitVMRmITDVbdFAgSlQJB5hPrwNFUjSs2Biw74XIQzcUB7XoKoS87m3sAAAAASUVORK5CYII=',
                        'image://data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAAIxJREFUOBFjYBggwEisvW5L1nv+/fdvFsP//zJY9TAyPmFmYkrbFRO4Has8miATGh8nF6+lIF1AB4HV4DQBVYJoi3H6FNk8XKGBrAbKJt5iLJopERowixmdF675T4nLydVLdKom1oF740OIMnPAgpp4i4H5lGCwEqMGagjRFoMKBwZ8BkMLEIKOG2gFAJ1PJaE/PY47AAAAAElFTkSuQmCC',
                        'image://data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAAQJJREFUOBFjYCATeK7aJkqmVrA2JnI0N+zfz/L7+7ddrovW2ZOjH6SHLIuPPHlf8J+BweD///8zQlddZSPHcpIt9lq6Vp7h/78GkGX/Gf5rfPhxvYIuFv/6+3/K//8M3DDL/v1nqHRdukYVxieWJsnHLovWBQEt9UEznOP/H4bpaGIEuYzOC9cAo4v+gJFYK10XrZkIDNY8XOoZGRlfsTOza2yN9nmPSw2yOFFB7bZ0vTEwiHOQNaKzgSlc7OffH53o4rj4BC0OXfWf+e/ff7OA8UFQ7X8GxhTXJWutcVmGLM6CzMHGfv9roxYjI8MJBkbGE9jkMcT+MRoAxY5iiA8WAQD+NVJ4bUue8QAAAABJRU5ErkJggg==',
                        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAAQJJREFUOBFjYCATeK7aJkqmVrA2JnI0N+zfz/L7+7ddrovW2ZOjH6SHLIuPPHlf8J+BweD///8zQlddZSPHcpIt9lq6Vp7h/78GkGX/Gf5rfPhxvYIuFv/6+3/K//8M3DDL/v1nqHRdukYVxieWJsnHLovWBQEt9UEznOP/H4bpaGIEuYzOC9cAo4v+gJFYK10XrZkIDNY8XOoZGRlfsTOza2yN9nmPSw2yOFFB7bZ0vTEwiHOQNaKzgSlc7OffH53o4rj4BC0OXfWf+e/ff7OA8UFQ7X8GxhTXJWutcVmGLM6CzMHGfv9roxYjI8MJBkbGE9jkMcT+MRoAxY5iiA8WAQD+NVJ4bUue8QAAAABJRU5ErkJggg==',
                        'image://data:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAMCAYAAAB1Lg0yAAAAAXNSR0IArs4c6QAAAKdJREFUOBFjYCATuK/aIQTCZGpnYCJHo9uiDeZ/f3y5B8IgNjlmMJKqCWTRP4Y/O///Z+AH6WVkZPjIxMDivisu4CQpZpFkMbqlMIvIsZxoi3FZSq7lRFkMSkSg+IQFL8wydBrkc2YOHqWdYR7v0OXQ+YzOC9f8RxekB58oH4McMiBBDQsBXJbTNHHhspwcS0FmER3UMItBNMznIDY5eRikj2xAaZEJAOaSYrNcP8s9AAAAAElFTkSuQmCC',

                    ]
                    let project = {}
                    let materialObj = {}// 材料对应图形对象
                    let dateArr = []
                    let chartData = deepClone(steelLine);
                    //chart Legend
                    chartData.legend.data = res.data.map((i, index) => {
                        return {
                            name: i.materialType,
                            icon: dataUriList[index]
                        }
                    })
                    res.data.map(item => {
                        materialObj[item.materialType] = ''
                        project[item.projectName] = []
                        dateArr.push(...item.dvalueList.map(i => i.endDate))

                    })

                    //放入图形
                    Object.keys(materialObj).map((item, index) => {
                        materialObj[item] = symboalList[index]
                    })
                    dateArr = [...new Set(dateArr.sort())]

                    res.data.map(item => {
                        project[item.projectName].push({
                            materialType: item.materialType,
                            dvalueList: getSuperDaysValue(dateArr, item.dvalueList, 'dvalue', 'endDate')
                        })
                    })

                    // 激活默认颜色
                    if (type === 'default') {
                        Object.keys(project).map((item, index) => {

                            if (index === 0) {
                                this.colorList[index].active = true
                                this.colorList[index].projectName = item
                            } else if (index === 1) {
                                this.colorList[index].active = true
                                this.colorList[index].projectName = item
                            } else if (index === 2) {
                                this.colorList[index].active = true
                                this.colorList[index].projectName = item
                            }
                        })
                    } else {
                        Object.keys(project).map((item, index) => {

                            if (index === 0) {
                                this.colorList[index].projectName = item
                            } else if (index === 1) {
                                this.colorList[index].projectName = item
                            } else if (index === 2) {
                                this.colorList[index].projectName = item
                            }
                        })
                    }

                    this.colorObject()


                    this.projectList = Object.keys(project)
                    // let projectList = Object.keys(this.colorObj)

                    // this.colorObj  激活的项目
                    Object.keys(this.colorObj).map((item, index) => {
                        // 判断是否激活
                        if (this.colorObj[item].active === true) {
                            if (project[item]) {
                                project[item].map((pro, typeIndex) => {
                                    chartData.xAxis.data = dateArr

                                    chartData.series.push({
                                        name: pro.materialType,
                                        type: 'line',

                                        symbolSize: 10,
                                        symbol: materialObj[pro.materialType],
                                        showSymbol: true,
                                        data: pro.dvalueList.map(i => {
                                            return {
                                                value: i.dvalue,
                                                projectName: item
                                            }
                                        }),
                                        itemStyle: {
                                            color: this.colorObj[item].color
                                        }
                                    })
                                })

                            }
                        }

                    })
                    let that = this.colorObj

                    chartData.tooltip.formatter = function (params) {
                        let materilObj = {} // 项目对应材料对象
                        let dateObj = {}
                        let str = ''
                        params.map(item => {
                            materilObj[item.data.projectName] = []
                            dateObj['date'] = item.axisValue
                        })
                        params.map(item => {
                            materilObj[item.data.projectName].push({ seriesName: item.seriesName, value: item.data.value })
                        })
                        str += `<div>${dateObj.date} </div>`
                        Object.keys(materilObj).map(item => {
                            str += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${that[item].color} ;"></span>${item} <br />`
                            str += '<div class="formatter-wrap">'
                            materilObj[item].map(i => {
                                str += ` ${i.seriesName} ${i.value}  `
                            })
                            str += '</div>'
                        })
                        return str



                    }
                    this.showEchart = true

                    // 主题切换
                    if (this.flag === 'light') {
                        chartData.tooltip.backgroundColor = this.$medicine.tooltipBG
                        chartData.tooltip.borderWidth = 0;
                        chartData.yAxis.splitLine = this.$medicine.axis
                        chartData.yAxis.axisLine = this.$medicine.axis
                        chartData.xAxis.axisLine = this.$medicine.axis
                        chartData.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                        chartData.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                        chartData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                        chartData.xAxis.axisLabel = chartData.yAxis.axisLabel = {
                            color: this.$medicine.nameColor,
                            fontFamily: 'PingFang-SC-Regular'
                        };
                        chartData.yAxis.nameTextStyle.color = this.$medicine.nameColor;
                        chartData.yAxis.nameTextStyle.fontFamily = 'PingFang-SC-Regular'
                        chartData.legend.textStyle.color = this.$medicine.nameColor;
                        chartData.legend.textStyle.fontFamily = 'PingFang-SC-Regular'
                    }
                    this.opt = chartData
                    this.indexList = ''
                } else {
                    this.showEchart = false
                    this.opt = {}
                }


            });
        }
    }
};
</script>
<style lang="less" scoped>
.dark {
    .project-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        color: #45474b;
        background: #45474b;
        display: inline-block;
        position: absolute;
        left: 2px;
        top: 12px;
    }
    .project-box {
        padding: 20px;
    }
    .project-text {
        position: relative;
        width: 230px;
        text-indent: 20px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
            background: #242d30;
            border-radius: 8px;
            padding: 0 4px;
            text-indent: 30px;
            .project-circle {
                padidng-left: 4px;
                left: 14px;
            }
            // padding: 8px;
        }
    }
    .project-top-wrap {
        position: absolute;
        top: 50px;
        right: 45px;
        display: flex;
        height: 20px;
        line-height: 20px;
    }
    .project-title {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
    }
    .project-count {
        margin-left: 6px;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #43a1ac;
        letter-spacing: 1px;
    }
    .project-wrap {
        position: absolute;
        top: 78px;
        right: 0;
        // right: -110px;
        width: 272px;
        border: 1px solid #45474a;
        overflow-y: scroll;
        height: 430px;
    }
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
        // width: 500px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        letter-spacing: 1.5px;
    }
}
.light {
    .project-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        color: #d2d9e5;
        background: #d2d9e5;
        display: inline-block;
        position: absolute;
        left: 2px;
        top: 12px;
    }
    .project-box {
        padding: 20px;
    }
    .project-text {
        position: relative;
        width: 230px;
        text-indent: 20px;
        font-family: 'PingFang-SC-Regular';
        font-size: 14px;
        color: #666;
        letter-spacing: 1.17px;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &:hover {
            background: #e7ecf9;
            border-radius: 8px;
            padding: 0 4px;
            text-indent: 30px;
            color: #4064d4;
            .project-circle {
                padidng-left: 4px;
                left: 14px;
            }
        }
    }
    .project-top-wrap {
        position: absolute;
        top: 50px;
        right: 45px;
        display: flex;
        height: 20px;
        line-height: 20px;
    }
    .project-title {
        font-family: 'PingFang-SC-Regular';
        font-size: 14px;
        color: #666;
        letter-spacing: 1.17px;
    }
    .project-count {
        margin-left: 6px;
        font-family: 'PingFang-SC-Regular';
        font-size: 12px;
        color: #4064d4;
        letter-spacing: 1px;
    }
    .project-wrap {
        position: absolute;
        top: 78px;
        right: 0;
        width: 272px;
        border: 1px solid #d2d9e5;
        overflow-y: scroll;
        height: 430px;
    }
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
}
</style>