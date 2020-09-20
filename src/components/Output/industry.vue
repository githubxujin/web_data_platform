<template>
    <div class="echart-big-wrap p-re ">
        <chart height="511px" width="1280px" id="invoice1" :option="opt" />
        <el-row type="flex" class="tag-box pb20">
            <el-row type="flex" class="mr20">
                <c-op v-for="(v, k) in tagList" :key="k" :class="{ act: tagCur === k }" @click.native="tagHand(k, v.value)">
                    {{ v.label }}</c-op>
            </el-row>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
.p-re {
    position: relative;
}
.tag-box {
    position: absolute;
    top: 0px;
    right: 54px;
}
</style>
<script>
import steelLine from "@/views/infrastructure/config/steelLine.js";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid";
import cOp from "@/components/common/c-op.vue";
export default {
    components: {
        Chart,
        cOp
    },
    data() {
        return {
            opt: {},
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "周"
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
        };
    },
    created() {
        this.getChart()
    },
    methods: {
        tagHand(k, value) {
            this.tagCur = k;
            this.$parent.params.dateType = value;
            this.getChart();
        },
        getChart() {
            this.$http('/dcp//count/invoice/material/day', this.$parent.params).then(res => {
                // steelLineDraw.title.text = "开票金额"
                let steelLineDraw = deepClone(steelLine);
                let data = res.data
                steelLineDraw.legend.data = data.map(i => i.material)
                steelLineDraw.series = data.map(i => {
                    return {
                        name: i.material,
                        type: "line",
                        smooth: "true",
                        symbolSize: 2,
                        symbol: "circle",
                        data: i.invoiceDate
                    }
                })
            });
        }
    }
};
</script>