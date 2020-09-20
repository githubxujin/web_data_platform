<template>
    <div>
        <div class="el-20"></div>
        <n-line @childParams="childParams" />
        <div class="el-20"></div>
        <div class="picture-wrap">
            <div class="bar-wrap">
                <div class="detail-title mt25 ">
                    {{infoParams.clientName}}
                </div>
                <div v-if="!isObjectEmpty(opt)" class="mt40">
                    <chart height="560px" width="733px" id="goodSale" :option="opt" :tabClick="true" @showDialog="getcompanyName" />
                </div>
                <div v-else>
                    <not-found height="560px" class="mt20"></not-found>
                </div>
            </div>
            <div class="divider"></div>
            <div class="pie-wrap">
                <div class="detail-title mt25 ml20">{{  detailParams.objectName }}</div>
                <div v-if="!isObjectEmpty(detailOpt)">
                    <chart height="520px" width="568px" id="detail-opt" :option="detailOpt" class="mt60" />
                </div>
                <div v-else>
                    <div class="pt50">
                        <not-found height="560px"></not-found>
                    </div>

                </div>
            </div>
        </div>
        <div class="bg-bottom"></div>
    </div>
</template>
<script>
import { deepClone } from "@/utils/common";
import columnarX from "@/views/resource/config/columnarX";
import barX from "@/utils/echart/bar/x-bar.js";
import { numFormat } from '@/filters/index'
export default {
    components: {
        'n-line': () => import('./line.vue'),
        'chart': () => import('@/components/Charts/invoiceInvalid.vue'),
        'not-found': () => import("@/components/Charts/not-fount.vue")
    },
    data () {
        return {
            opt: {},
            detailOpt: {},
            clientParams: {
                clientName: ''
            },
            detailParams: {
                objectName: ''
            },
            clentNameList: [],
            params: {
                source: 1,
                type: 1,
                objectName: ""
            },
            infoParams: {},

        };
    },
    created () {
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
        //获取点击流水收入统计图公司名称
        getcompanyName (name) {
            this.detailParams.objectName = name.name ? name.name : this.params.objectName
            this.getDetailChart()
        },
        //获取收入流水支出参数
        childParams (params) {
            this.infoParams = params
            this.getClientName()
        },
        reSetDetail () {
            this.detailParams = {
                clientName: '',
                type: 1,
                source: 1,
            }
            this.getDetailChart()
        },
        reSet () {
            this.params = {
                source: 1,
                type: 1,
                objectName: ""
            }
            this.getChart()
        },
        getDetailChart () {
            if (this.detailParams.objectName !== "") {
                this.ajax
                    .json('/dcp/comm/sms/statistics/day/company', { ...this.detailParams, ...this.infoParams })
                    .then(res => {
                        if (res.data.length > 0) {
                            let data = deepClone(barX);
                            data.title.text = '企业该交易对手明细'
                            data.series[0].data = res.data.map(i => i.incomeTotal)
                            data.series[1].data = res.data.map(i => i.payTotal)
                            data.xAxis.data = res.data.map(i => i.date)
                            data.legend.top = '-2'
                            data.grid.top = '60'
                            data.tooltip.formatter = function (params) {
                                let str = ''
                                if (params.seriesName === '支出') {
                                    str = `   <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4EB296; "></span>${params.name}</div>`
                                } else if (params.seriesName === '收入') {
                                    str = `   <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color: #63A7F8;"></span>${params.name}</div>`
                                }
                                return (`
                        ${str}
                        <div style="text-indent: 16px">${params.seriesName}: ${numFormat(params.value)}</div>
                        `)

                            }


                            // 主题切换
                            if (this.flag === 'light') {
                                data.legend.textStyle.color = "#666"
                                data.tooltip.backgroundColor = this.$medicine.tooltipBG
                                data.tooltip.borderWidth = 0;
                                data.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                                data.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                                data.yAxis.axisLine = this.$medicine.axis
                                data.xAxis.axisLine = this.$medicine.axis
                                data.yAxis.splitLine = this.$medicine.axis
                                data.title.textStyle.color = this.$medicine.title
                                data.series[0].itemStyle.normal.color = this.$service.moneyWater.series0
                                data.series[1].itemStyle.normal.color = this.$service.moneyWater.series1
                            }

                            this.detailOpt = data
                        } else {
                            this.detailOpt = {}
                        }

                    });

            } else {
                this.detailOpt = {}
            }

        },
        getClientName (name = '') {
            if (name) {
                this.params.objectName = name
                this.ajax
                    .json('/dcp/comm/sms/statistics/object/name', { ...this.params, ...this.infoParams })
                    .then(res => {
                        this.clentNameList = res.data
                        this.getChart()
                    });
            } else {
                this.ajax
                    .json('/dcp/comm/sms/statistics/object/name', { ...this.params, ...this.infoParams })
                    .then(res => {
                        this.clentNameList = res.data
                        this.getChart()
                    });
            }

        },
        getChart () {
            this.ajax
                .json('/dcp/comm/sms/statistics/company', { ...this.params, ...this.infoParams })
                .then(res => {
                    this.detailParams.clientName = res.data.length > 0 ? res.data[0].clientName : ""
                    this.detailParams.objectName = res.data.length > 0 ? res.data[0].clientName : ""
                    this.getDetailChart()
                    if (res.data.length > 0) {
                        let data = deepClone(columnarX);
                        data.dataZoom = [
                            {
                                type: "slider",
                                show: true,
                                yAxisIndex: [0],
                                right: 60,

                                width: 8,
                                borderColor: "transparent",
                                backgroundColor: "#242D30",
                                fillerColor: "#2A3C40",
                                showDetail: false,
                                handleSize: false,
                                zoomLock: true,
                                maxSpan: 80,
                                maxValueSpan: 5, //设置显示多少个
                                minValueSpan: 5
                            },

                            {
                                type: "inside",
                                yAxisIndex: [0]
                            }
                        ];

                        data.title.text = '企业交易对手分布'
                        data.xAxis.name = ""
                        data.yAxis[0].data = res.data.map(i => i.clientName)
                        data.series[0].name = '收入'
                        data.series[1].name = '支出'
                        data.series[0].label.normal.show = false
                        data.series[1].label.normal.show = false
                        data.series[0].data = res.data.map(i => {
                            return {
                                value: i.incomeTotal,
                                bankTailNo: i.bankTailNo
                            }
                        })

                        data.series[1].data = res.data.map(i => {
                            return {
                                value: i.payTotal,
                                bankTailNo: i.bankTailNo
                            }
                        })
                        let clientName = this.infoParams.clientName
                        data.tooltip.formatter = function (params) {
                            let str = ''
                            if (params.seriesName === '支出') {
                                str = ` <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#4EB296; "></span>${clientName}</div> `
                            } else if (params.seriesName === '收入') {
                                str = ` <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color: #63A7F8;"></span> ${clientName}</div> `
                            }
                            return (`
                        ${str}
                            <div style="text-indent: 20px">账户: ${params.data.bankTailNo}</div>
                        <div style="text-indent: 20px">${params.seriesName}: ${numFormat(params.value)}</div>
                        <div style="text-indent: 20px">交易对手: ${params.name}</div>
                    
                        `)

                        }

                        // 主题切换
                        if (this.flag === 'light') {
                            data.legend.textStyle.color = "#666"
                            data.tooltip.backgroundColor = this.$medicine.tooltipBG
                            data.tooltip.borderWidth = 0;
                            data.dataZoom[0].backgroundColor = this.$service.output.behavior.dataZoom[0]
                            data.dataZoom[0].fillerColor = this.$service.output.behavior.dataZoom[1]
                            data.yAxis[0].axisLine = this.$medicine.axis
                            data.xAxis.axisLine = this.$medicine.axis
                            data.xAxis.splitLine = this.$medicine.axis
                            data.title.textStyle.color = this.$medicine.title
                            data.series[0].itemStyle.normal.color = this.$service.moneyWater.series0
                            data.series[1].itemStyle.normal.color = this.$service.moneyWater.series1
                        }
                        this.opt = data
                    } else {
                        this.opt = {}
                    }

                });
        }
    }
};
</script>
<style lang="scss" scope>
.light {
    .detail-title {
        font-size: 16px;
        color: #666;
    }
    .picture-wrap {
        display: flex;
    }
    .bar-wrap {
        width: 755px;
        height: 636px;
    }
    .pie-wrap {
        width: 585px;
        height: 636px;
    }
    .divider {
        width: 20px;
        height: 636px;
        background: #ebecf3;
    }
    .bg-bottom {
        height: 40px;
        background: #ebecf3;
        margin: 0 -40px;
    }
}
.dark {
    .detail-title {
        font-size: 16px;
        font-family: PingFangSC-Light;
    }
    .picture-wrap {
        display: flex;
    }
    .bar-wrap {
        width: 755px;
        height: 636px;
    }
    .pie-wrap {
        width: 585px;
        height: 636px;
    }
    .divider {
        width: 20px;
        height: 636px;
        background: #1d1e23;
    }
    .bg-bottom {
        height: 40px;
        background: #1d1e23;
        margin: 0 -40px;
    }
}
</style>