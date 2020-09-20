<template>
    <div>
        <div :id="id" :class="className" :style="{height,width}" />
    </div>
</template>


<script>
import theme from "@/utils/chart.js";
import light from "@/utils/chart-light.js";
import echarts from "echarts";
export default {
    props: {
        className: {
            type: String,
            default: "chart"
        },
        id: {
            type: String,
            default: "chart"
        },
        width: {
            type: String,
            default: "200px"
        },
        height: {
            type: String,
            default: "200px"
        },
        option: {
            type: Object
        },
        dispatchAction: {
            type: Boolean,
            default: false
        },
        hover: {
            type: Boolean,
            default: false
        },
        tabClick: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        option: {
            deep: true,
            handler() {
                this.initChart();
            }
        },
        flag(){
            this.initChart()
        }
    },
    mounted() {
        this.initChart();
    },
    computed:{
        flag:{
            get(){
                return this.$store.state.echart.flag
            }
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            let that = this;
            let self = null;

            if (this.flag === 'light') {
                echarts.registerTheme("customed", light);
            }else{
                echarts.registerTheme("customed", theme);
            }

            if (this.chart) {
                this.chart.dispose();
            }

            self = echarts.init(document.getElementById(this.id), "customed");

            self.setOption(this.option, true);
            if (this.dispatchAction) {
                self.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: 0
                    // type: "highlight" //突出高亮显示;
                });
            }
            if (this.hover) {
                //设置默认选中高亮部分
                self.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: 0
                });
                self.on("mouseover", function (e) {
                    that.$emit("showIndex", e.dataIndex);
                    that.$emit("showValue", e)
                    //当检测到鼠标悬停事件，取消默认选中高亮
                    if (index) {
                        self.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: index
                        });
                    } else {
                        self.dispatchAction({
                            type: "downplay",
                            seriesIndex: 0,
                            dataIndex: 0
                        });
                    }

                    //高亮显示悬停的那块
                    self.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                });
                var index = "";
                //检测鼠标移出后显示之前默认高亮的那块
                self.on("mouseout", function (e) {
                    self.dispatchAction({
                        type: "highlight",
                        seriesIndex: 0,
                        dataIndex: e.dataIndex
                    });
                    index = e.dataIndex;
                });
            }
            if (this.tabClick) {
                self.on('click', function (params) {
                    console.log('chart', params)
                    that.$emit('showDialog', params)
                });
            }
            this.chart = self;
            window.onresize = function () {
                self.resize();
                //myChart1.resize();    //若有多个图表变动，可多写

            }
        }
    }
};
</script>
