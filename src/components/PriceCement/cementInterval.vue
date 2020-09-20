<template>
    <div>
        <div class="echart-big-wrap title-re">
            <div class="echart-big-title">三种型号水泥市场价格区间</div>
            <div class="title-ab">
                <div class="title-item">最高价格 <span class="color-card card1"></span></div>
                <div class="title-item">最低价格 <span class="color-card card2"></span></div>
            </div>
            <chart height="511px" width="1168px" id="cementInterval" :option="cementIntervalOpt" />
            <el-row type="flex" justify="space-between" class="tag-box pb20">
                <el-row type="flex" justify="space-between">
                    <c-tag v-for="(v,k) in tagList1" :key="k" :class="{act: tagCur1 === k}"
                        @click.native="tagHand1(k,v.label)">
                        {{v.label}}</c-tag>
                </el-row>
            </el-row>
        </div>
    </div>
</template>
<script>
import kPriceOpt from "@/utils/echart/kPrice";
import chart from "@/components/Charts/invoiceInvalid";
import cTag from "@/components/common/c-tag";
import { deepClone } from "@/utils/common";

export default {
    components: {
        cTag,
        chart
    },
    data() {
        return {
            params: {
                materialName: "32.5级水泥"
            },
            cementIntervalOpt: {},
            tagCur1: 0,
            tagList1: [
                {
                    value: 1,
                    label: "32.5级水泥"
                },
                {
                    value: 2,
                    label: "42.5级水泥"
                },
                {
                    value: 3,
                    label: "52.5级水泥"
                }
            ]
        };
    },
    created() {
        this.drawPicture();
    },
    methods: {
        tagHand1(k, value) {
            this.tagCur1 = k;
            this.params.materialName = value;
            this.drawPicture();
        },
        drawPicture() {
            this.$http("/dcp/price/cement/interval/tender", this.params, {
                type: "formData"
            }).then(res => {
                let drawkPriceOpt = deepClone(kPriceOpt);
                let dataArr = res.data.map(item => {
                    if (item.ups === 1) {
                        return [
                            item.minPrice,
                            item.maxPrice,
                            item.minPrice,
                            item.maxPrice
                        ];
                    } else {
                        return [
                            item.maxPrice,
                            item.minPrice,
                            item.maxPrice,
                            item.minPrice
                        ];
                    }
                });
                let dateKeyObj = res.data.reduce((i, item) => {
                    i[item.date] = item;
                    return i;
                }, {});
                drawkPriceOpt.tooltip.formatter = function(params) {
                    return (
                        dateKeyObj[params[0].axisValue].date +
                        "<br/>" +
                        "最高价:   " +
                        dateKeyObj[params[0].axisValue].maxPrice +
                        "<br/>" +
                        "最低价:   " +
                        dateKeyObj[params[0].axisValue].minPrice +
                        "<br/>" +
                        "中间价:   " +
                        dateKeyObj[params[0].axisValue].medianPrice
                    );
                };
                drawkPriceOpt.series[0].data = dataArr;
                drawkPriceOpt.xAxis.data = res.data.map(item => item.date);
                this.cementIntervalOpt = drawkPriceOpt;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/echart.scss";
.title-re {
    position: relative;
    .title-ab {
        position: absolute;
        top: 64px;
        right: 25px;
        width: 200px;
        color: #fff;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        .color-card {
            display: inline-block;
            width: 30px;
            height: 10px;
            margin-left: 8px;
            background-image: linear-gradient(
                -180deg,
                #ffa9b6 1%,
                #e9576e 100%
            );
            &.card2 {
                background-image: linear-gradient(
                    -180deg,
                    #a3ffe8 1%,
                    #33f0c0 100%
                );
            }
        }
    }
    .tag-box {
        position: absolute;
        top: 58px;
        left: 66px;
        width: 410px;
        .c-tag + .c-tag {
            margin-left: 10px;
        }
    }
}
</style>