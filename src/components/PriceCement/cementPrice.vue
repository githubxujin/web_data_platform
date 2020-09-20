<template>
    <div>
        <div class="echart-big-wrap">
            <div class="echart-big-title">三种型号水泥市场价格最高分布</div>
            <chart height="511px" width="1168px" id="cementPrice" :option="cementPriceOpt" />
        </div>
    </div>
</template>
<script>
const arrColor = [
    {
        borderColor: "#FFF78A",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(255,188,37,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(255,223,117,0.01)"
            }
        ])
    },
    {
        borderColor: "#4088FD",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(37,87,255,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(117,143,255,0.00)"
            }
        ])
    },
    {
        borderColor: "#33F0C0",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
                offset: 0,
                color: "rgba(37,255,221,0.34)"
            },
            {
                offset: 0.8,
                color: "rgba(122,244,174,0.02)"
            }
        ])
    }
];
import chart from "@/components/Charts/invoiceInvalid";
import overlapOption from "@/utils/echart/overlapOption";
import echarts from "echarts";
import { deepClone } from "@/utils/common";
export default {
    components: {
        chart
    },
    data() {
        return {
            cementPriceOpt: {}
        };
    },
    created() {
        this.drawPicture();
    },
    methods: {
        drawPicture() {
            this.$http("/dcp/price/cement/price", {}).then(res => {
                let drugData = res.data;
                let drawOpt = deepClone(overlapOption);

                let maxData = [];
                let index = 0;
                let max = drugData[0].dataList.length;
                for (let i = 0; i < drugData.length; i++) {
                    if (drugData[i].dataList.length > max) {
                        max = drugData[i].dataList.length;
                        index = i;
                    }
                    maxData = drugData[index].dataList;
                }
                drawOpt.xAxis[0].data = maxData.map(i => i.date);
                drawOpt.series = drugData.map((i, index) => {
                    return {
                        barWidth: 24,
                        type: "bar",
                        name: i.name,
                        data: i.dataList.map(item => item.value),
                        itemStyle: arrColor[index]
                    };
                });
                drawOpt.legend.data = drugData.map(i => i.name);
                drawOpt.legend.left = 760;
                this.cementPriceOpt = drawOpt;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/echart.scss";
</style>