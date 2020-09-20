<template>
    <div :id="id" style="width:35px;height:35px;"></div>
</template>
<script>
import echarts from "echarts";
export default {
    props: ["id", "percentage"],
    data () {
        return {
            chart: null,
            option: {}
        };
    },
    created () {
        console.log(321);
    },
    mounted () {
        this.getEchart();
    },
    watch: {
        option: {
            deep: true,
            handler () {
                this.getEchart();
            }
        }
    },
    beforeDestroy () {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        getEchart () {
            var color = "";
            if (this.percentage < 25) {
                color = "rgba(155,188,108,0.60)";
            } else if (this.percentage > 25 && this.percentage < 51) {
                color = "#BFA559";
            } else if (this.percentage > 50 && this.percentage < 76) {
                color = "#98361D";
            } else if (this.percentage > 75 && this.percentage <= 100) {
                color = "rgb(88, 88, 136)";
            }
            if (this.chart) {
                this.chart.dispose();
            }
            const myChart = echarts.init(document.getElementById(this.id));

            this.option = {
                series: [
                    {
                        //  外圆
                        name: "",
                        center: ["50%", "50%"],
                        type: "pie",
                        radius: ["10", "13"],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                position: "center",
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: this.percentage,
                                name: "",
                                itemStyle: {
                                    color: color
                                }
                            },
                            {
                                value: 100 - this.percentage,
                                name: "",
                                itemStyle: {
                                    color: "rgb(57, 80, 72)"
                                }
                            }
                        ]
                    },
                    //  内圆
                    {
                        name: "",
                        center: ["50%", "50%"],
                        type: "pie",
                        radius: ["7", "8"],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                position: "center",
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 0,
                                name: "",
                                itemStyle: {
                                    color: "#31353A"
                                }
                            }
                        ]
                    }
                ]
            };
            myChart.setOption(this.option);
            this.chart = myChart;
        }
    }
};
</script>
<style lang="scss" scope></style>
