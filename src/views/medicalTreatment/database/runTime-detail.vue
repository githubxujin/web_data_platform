<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">
                {{objData.project}}
            </div>
            <div class="detail_base">
                具体指标：{{objData.specificIndicators}}
            </div>
            <div class="detail_base">
                区域：{{objData.area}}
            </div>
            <chart height="540px" width="1450px" :option="regionalInfoObj" id="databaseDetail" />
        </div>
    </div>

</template>

<script>
import bar from "@/utils/echart/bar/bar"
import { deepClone } from "@/utils/common"
import Chart from "@/components/Charts/invoiceInvalid"
export default {
    components: { Chart },
    data() {
        return {
            regionalInfoObj: {},
            objData: {}
        };
    },
    created() {
        this.getChart()
    },
    methods: {
        getChart() {
            this.ajax
                .json('/dcp/ghgjjyxk/data/detail', { id: this.$route.query.id }, { type: 'get' })
                .then(res => {
                    this.objData = res.data
                    let data = res.data
                    let objName = Object.keys(data).sort()
                    let xAxisData = []
                    let xAxisDataVal = []
                    objName.forEach((item, index) => {
                        if (item.includes('year')) {
                            xAxisData.push(item.replace('year', ''))
                            xAxisDataVal.push(data[item])
                        }
                    })

                    let barObj = deepClone(bar)
                    let imgDom = document.createElement('img')
                    imgDom.src = require("@/assets/images/echart/bar_detail.png")
                    // 柱状图
                    barObj.title.text = " "
                    barObj.grid.left = '4%'
                    barObj.grid.top = '30px'
                    // barObj.grid.width = '1400px'
                    barObj.xAxis.data = xAxisData
                    barObj.series[0] = {
                        type: "bar",
                        barWidth: '36',
                        barMinHeight: '5',
                        itemStyle: {
                            color: {
                                image: imgDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
                                repeat: 'repeat'
                            }
                        },
                        data: xAxisDataVal
                    }

                    barObj.tooltip.trigger = "axis"
                    barObj.tooltip.axisPointer = {
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
                    }

                    barObj.tooltip.formatter = (params) => {
                        return `<div>${params[0].name}年</div>
                            <div><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#43a1ac;"></span>${this.numFormat(params[0].value)}</div>`
                    }

                    this.regionalInfoObj = barObj
                })
        },
    },
}
</script>

<style lang="scss" scoped>
    .detail_base {
        color: #8d9195;
        display: inline-block;
        margin-right: 50px;
        font-size: 12px;
        font-family: "PingFang-SC-Regular";
    }
</style>
