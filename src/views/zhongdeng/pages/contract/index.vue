<template>
    <div>
        <div>
            <div class="app-title">承建单位维度
                <el-form :inline="true" size="medium" class="el-serach-form">
                    <el-form-item class="el-item-form-width">
                        <el-select @change="getRanking()" v-model="params.sortField" placeholder="按转让金额" class=" el-item-form-width">
                            <el-option v-for="(s, index) in sortFieldList" :label="s.label" :value="s.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select @change="getRanking()" v-model="params.field" placeholder="按登记单位" class=" el-item-form-width">
                            <el-option v-for="(s, index) in fieldList" :label="s.label" :value="s.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width w200">
                        <el-select @change="getRanking()" v-model="params.companyName" clearable placeholder="公司名称" class=" el-item-form-width w200" filterable remote :remote-method="queryConstruction">
                            <el-option v-for="(s, index) in constructionList" :label="s" :value="s" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item>
                    <el-button type="primary" size="medium" @click="topGet">查询</el-button>
                    <el-button type="info" size="medium" @click="topSet">重置</el-button>
                </el-form-item> -->
                </el-form>
            </div>
        </div>

        <ranking :rankingList="rankingList" />

        <el-form :inline="true" size="medium" class="el-serach-form rmmr20">
            <el-form-item class="el-item-form-width w200">
                <el-select v-model="paramsOther.construction" clearable placeholder="承建单位名称" class=" el-item-form-width w200" filterable remote :remote-method="querySupplier">
                    <el-option v-for="(s, index) in supplierList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="paramsOther.assigneeType" placeholder="金融机构类型" class=" el-item-form-width" clearable>
                    <el-option label="银行" value="1">
                    </el-option>
                    <el-option label="证券公司" value="2">
                    </el-option>
                    <el-option label="保理公司" value="3">
                    </el-option>
                    <el-option label="其他" value="4">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker start-placeholder="年-月" end-placeholder="年-月" v-model="dateArr" type="monthrange" unlink-panels @change="changeDate" value-format="yyyy-MM" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getChart">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <stat :info="statObj" />
        <chart :pieOpt="pieOpt" :lineOpt="lineOpt" :payOpt="payOpt" @changeStateType="changeStateType" :cur="cur" />

        <pie @cooperationVos="cooperationVos" :propOpt="propOpt" ref="" />

        <pie-line :pielineList="pielineList" />

        <div class="last_box">
            <div class="projectTable mt20" @click="isTableClicke">
                <span>{{isTableList?'展开转让项目列表':'收起转让项目列表'}}</span>
                <i :class="isTableList?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
            </div>
            <project-stat v-if="!isTableList" />
        </div>

    </div>
</template>
<script>
import pieData from "@/utils/echart/pie/pie"
import lineData from "@/utils/echart/line/line-list"
import { deepClone } from "@/utils/common"
import echarts from "echarts"
export default {
    components: {
        'chart': () => import("../supplier/chart.vue"),
        'pie': () => import("./pie.vue"),
        'ranking': () => import("./ranking.vue"),
        'pie-line': () => import("./pie-line.vue"),
        'stat': () => import("./stat.vue"),
        'project-stat': () => import('@/views/zhongdeng/pages/project-stat.vue'),
    },
    data () {
        return {
            statObj: {
                financesAmountSum: 0,
                projectNumSum: 0,
                transferAmountSum: 0,
                transferCountSum: 0
            },
            constructionList: [],
            rankingList: [],
            pielineList: {},
            pieOpt: {
                series: [{
                    "type": "pie",
                    data: []
                }]
            },
            lineOpt: {},
            params: {
                "construction": "",
                "stateType": 1,
                "field": 3,
                "sortField": 1
            },
            paramsOther: {
                stateType: 1,
                statsMonthStart: "",
                statsMonthEnd: "",
                construction: "",
                assigneeType: '',
            },
            dateArr: [],
            queryParams: {
                companyName: "",
                field: 3,
                sortField: 1
            },
            fieldList: [{
                label: '按金融机构一级单位',
                value: 1
            },
            {
                label: '按金融机构二级单位',
                value: 2
            },
            {
                label: '按金融机构登记单位',
                value: 3
            },
            ],
            sortFieldList: [
                {
                    label: '按转让金额',
                    value: 1
                },
                {
                    label: '按融资金额',
                    value: 2
                },
                {
                    label: '按转让次数',
                    value: 3
                },
                {
                    label: '按合作时长',
                    value: 4
                },
            ],
            payOpt: [],
            isTableList: true,
            supplierList: [],
            propOpt: {},
            cur: 3,
        };
    },
     watch: {
        flag(e) {
            this.getStat();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },   
    created () {
        this.getStat();
        this.getRanking();
        this.remoteMethod();
        this.remoteMethodOther();
    },
    methods: {
        isTableClicke () {
            this.isTableList = !this.isTableList;
        },
        cooperationVos (e) {
            console.log(e)
            this.pielineList = { ...e };
        },
        remoteMethod () {
            this.ajax
                .json('/dcp/comm/zdw/construction/stats/ranking/vague', this.queryParams)
                .then(res => {
                    this.constructionList = res.data
                });
        },
        queryConstruction (query) {
            this.queryParams.companyName = query
            this.queryParams.sortField = this.params.sortField;
            this.queryParams.field = this.params.field;
            this.remoteMethod()
        },
        getRanking () {
            this.queryParams.field = this.params.field;
            this.queryParams.sortField = this.params.sortField;
            this.remoteMethod();
            this.ajax
                .json('/dcp/comm/zdw/construction/stats/ranking', this.params)
                .then(res => {
                    let { data = [] } = res
                    this.rankingList = data
                });
        },
        getStat () {
            this.ajax
                .json('/dcp/comm/zdw/construction/stats', this.paramsOther)
                .then(res => {
                    let { financesAmountSum = 0, projectNumSum = 0, transferAmountSum = 0, transferCountSum = 0, statsTypes = [], statsChars = [] } = res.data
                    this.statObj = {
                        financesAmountSum,
                        projectNumSum,
                        transferAmountSum,
                        transferCountSum
                    }
                    this.payOpt = res.data.statsTypes;
                    // 饼图
                    let opt = deepClone(pieData)
                    if (this.flag === 'light') {
                        opt.series[0].color = this.$service.zhongdeng.supplierPie;
                    } else {
                        opt.series[0].color = ['#89A562', '#55B2A3', '#3F929C', '#3B775C '];
                    }
                    opt.series[0].data = statsTypes.map(i => {
                        return {
                            name: i.type,
                            value: i.proportion
                        }
                    })
                    opt.tooltip.position = ['24%', '38%']
                    let value = "";
                    let name = "";
                    opt.tooltip.formatter = function (params) {
                        if (params.seriesIndex === 0) {
                            value = params.percent;
                            name = params.name
                        }
                        if (this.flag === 'light') {
                            return `<div style="font-family: PingFang-SC-Regular;font-size: 30px;color: #4064D4;width:100px;text-align:center;">${value}<span style="font-size: 14px">%</span></div>
                           <div style="font-family: PingFang-SC-Regular;font-size: 14px;color: #A0A3A8;text-align: center;">${name}</div>
                        `
                        } else {
                            return `<div style="font-family: PingFangSC-Light;font-size: 30px;color: #4064D4;width:100px;text-align:center;">${value}<span style="font-size: 14px">%</span></div>
                           <div style="font-family: PingFangSC-Light;font-size: 14px;color: #A0A3A8;text-align: center;">${name}</div>
                        `
                        }
                    }
                    this.pieOpt = opt
                    //折线图
                    /*   
                     transferCount 登记次数
                     transferAmount 登记转让金额
                     financesAmount 登记融资金额
                     */
                    let nameList = ['登记次数', '登记转让金额', '登记融资金额']

                    let lineOpt = deepClone(lineData)
                    lineOpt.legend.top = 50;
                    let iconList = [
                        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAAAXNSR0IArs4c6QAAAGxJREFUSA1jZACC0JYjjSCa3mB1jU09Y0jr0XqGf/8aXl7bQ1f7xbVcGBgZGZtYQLa+vL6Xgd4OANkroe3KwARiDCQYdcBoCIyGwGgIjIbAaAiAa0NxTWe610cwOxlBNoPbBHR3AgPDmmrrRgCdUxbK81XIMAAAAABJRU5ErkJggg==',

                        'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAASCAYAAAA6yNxSAAAAAXNSR0IArs4c6QAAAGpJREFUSA1jZACChkLXRhBNb9DQv7uesbHArf4fw/+Gmw8+09V+dQVeBkZGhiYWkK0gy2/Q2QEgezUUeRmYQIyBBKMOGA2B0RAYDYHREBgNAXBtCKoa6Q1gdjKCLAa1CejtAJB99RN2NQIAHCoWMkJRiFUAAAAASUVORK5CYII=',
                    ]
                    lineOpt.grid.left = "6%"
                    lineOpt.grid.right = "7%"
                    lineOpt.legend.data = nameList.map((i, index) => {
                        if (index > 0) {
                            return {
                                name: i,
                                icon: iconList[index - 1]
                            }
                        } else {
                            return {
                                name: i
                            }
                        }

                    });

                    lineOpt.color = ["#57C5D1", "#262F3B", "#30302B", "#FFA954", "#4730D2", "#1E4AD5"]
                    lineOpt.yAxis[1].nameTextStyle.padding = [0, -54, 0, 0];
                    lineOpt.title.text = "承建单位登记转让趋势"
                    lineOpt.xAxis.data = statsChars.map(i => i.statsDate)
                    lineOpt.dataZoom[0].maxValueSpan = 5;
                    lineOpt.dataZoom[0].minValueSpan = 5;
                    lineOpt.series = nameList.map(i => {
                        if (i === '登记次数') {
                            return {
                                "name": i,
                                "type": "line",
                                "symbolSize": 6,
                                "symbol": "circle",
                                yAxisIndex: 1,
                                data: statsChars.map(count => count.transferCount)
                            }
                        } else if (i === '登记转让金额') {
                            return {
                                "name": i,
                                "type": "bar",
                                "symbolSize": 6,
                                "symbol": "circle",
                                "barWidth": 20,
                                "barGap": '10%',
                                "itemStyle": {
                                    "normal": {
                                        "borderColor": "#5483C3",
                                        // "color": "#449BA5"
                                    }
                                },
                                "emphasis": {
                                    "itemStyle": {
                                        "color": "#394B5F",
                                        "borderColor": "#5483C3"
                                    }
                                },
                                yAxisIndex: 0,
                                data: statsChars.map(tamount => tamount.transferAmount)
                            }
                        } else if (i === '登记融资金额') {
                            return {
                                "name": i,
                                "type": "bar",
                                "symbolSize": 6,
                                "symbol": "circle",
                                "barWidth": 20,
                                yAxisIndex: 0,
                                "itemStyle": {
                                    "normal": {
                                        "borderColor": "#C2A754",
                                        // "color": "#449BA5"
                                    }
                                },
                                "emphasis": {
                                    "itemStyle": {
                                        "color": "#57573A",
                                        "borderColor": "#C2A754"
                                    }
                                },
                                data: statsChars.map(amount => amount.financesAmount)
                            }
                        }

                    })
                    if (this.flag === 'light') {
                        lineOpt.xAxis.axisTick = this.$medicine.axis
                        lineOpt.yAxis.axisTick = this.$medicine.axis
                        lineOpt.title.textStyle.color = this.$medicine.title
                        lineOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                        lineOpt.tooltip.borderWidth = 0;
                        lineOpt.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                        lineOpt.yAxis.splitLine = this.$medicine.axis// 网格
                        lineOpt.xAxis.axisLine = this.$medicine.axis
                        lineOpt.yAxis[0].axisLine = this.$medicine.axis
                        lineOpt.yAxis[1].axisLine = this.$medicine.axis

                        lineOpt.xAxis.axisLabel.fontFamily = 'PingFang-SC-Regular';
                        lineOpt.xAxis.axisLabel.color = this.$medicine.nameColor;
                        lineOpt.xAxis.axisLabel.fontSize = 12;
                        lineOpt.yAxis[0].axisLabel.textStyle = lineOpt.yAxis[1].axisLabel.textStyle = {
                            color: this.$medicine.nameColor,
                        }

                        lineOpt.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                        lineOpt.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                        lineOpt.series[0].color = '#3DBD7D';
                        lineOpt.series[1].itemStyle.normal.borderColor = '';
                        lineOpt.series[2].itemStyle.normal.borderColor = ''
                        lineOpt.series[1].emphasis.itemStyle.borderColor = '';
                        lineOpt.series[2].emphasis.itemStyle.borderColor = ''         
                        lineOpt.series[1].emphasis.itemStyle.color = '#20C3EE';
                        lineOpt.series[2].emphasis.itemStyle.color = '#FFA422'                                         
                        lineOpt.series[1].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#74D7DC'
                        }, {
                            offset: 1,
                            color: '#20C3EE'
                        }]
                        )

                        lineOpt.series[2].itemStyle.normal.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FFD170'
                        }, {
                            offset: 1,
                            color: '#FCAD5B'
                        }]
                        )
                        lineOpt.legend.data[1].icon = '';
                        lineOpt.legend.data[2].icon = '';
                    }                    
                    this.lineOpt = lineOpt
                });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.paramsOther.statsMonthStart = v[0];
                this.paramsOther.statsMonthEnd = v[1];
            } else {
                this.paramsOther.statsMonthStart = '';
                this.paramsOther.statsMonthEnd = '';
            }
        },
        changeStateType (e) {
            this.paramsOther.stateType = e.value;
            this.cur = e.cur
            this.getStat()
        },
        querySupplier (e) {
            this.paramsOther.construction = e;
            this.remoteMethodOther();
        },
        remoteMethodOther () {
            let data = { ...this.paramsOther };
            data.field = 1;
            this.ajax
                .json('/dcp/comm/zdw/construction/stats/vague', data)
                .then(res => {
                    this.supplierList = res.data
                });
        },
        getChart () {
            this.propOpt = { ... this.paramsOther };
            this.getStat();
        },
        reSet () {
            this.paramsOther = this.propOpt = {
                stateType: 1,
                statsMonthStart: "",
                statsMonthEnd: "",
                construction: "",
                assigneeType: '',
            }
            this.cur = 0;
            this.getStat();
            this.dateArr = [];
        },
        // topGet() {
        //     this.getRanking();
        // },
        // topSet() {
        //     this.params = {
        //         "construction": "",
        //         "stateType": 1,
        //         "field": 3,
        //         "sortField": 1
        //     }
        //     this.getRanking();
        // },

    }
};
</script>
<style lang="scss" scoped>
.light {
    .projectTable{
        background: #DEE5F7;
        color: #4064D4;
    }
}
.app-title {
    .el-serach-form {
        float: right;
    }
}
.flex {
    display: flex;
    justify-content: space-between;
}
.last_box {
    margin-top: 20px;
    margin-right: 20px;
}
.projectTable {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    line-height: 30px;
    color: #43a1ac;
    text-align: center;
    background: #242d30;
    border-radius: 15px;
    width: 159px;
    height: 30px;
    margin: 0 auto;
    cursor: pointer;
}
.rmmr20 .el-form-item {
    margin-bottom: 0;
    margin-top: 20px;
}
</style>