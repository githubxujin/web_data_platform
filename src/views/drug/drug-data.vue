<template>
    <div>
        <Anchor show-ink>
            <AnchorLink href="#stream-wrap" title="配送公司-上下游概况" />
            <AnchorLink href="#drug-amount-wrap" title="药品订单与销售金额" />
            <AnchorLink href="#drug-number-wrap" title="药品订单与销售数量" />
            <AnchorLink href="#drug-price-wrap" title="药品价格" />
        </Anchor>
        <div id="stream-wrap">
            <b-title>企业-经营品类</b-title>
            <tabs :tabList="['药品目录','药品库','药品流向']" :tabIndex="tabIndex" @success="handleClick" />
            <s-title>配送公司-下游流量概况</s-title>
            <down-stream />
            <s-title>配送公司-上游流量概况</s-title>
            <up-stream />
        </div>
        <!-- 药品订单与销售金额-->
        <div id="drug-amount-wrap">
            <s-title>药品订单与销售金额</s-title>
            <sale-amount></sale-amount>
        </div>
        <!-- 药品订单与销售金额结束-->

        <!-- 药品订单与销售数量 -->
        <div id="drug-number-wrap">
            <s-title>药品订单与销售数量</s-title>
            <sale-number />
        </div>
        <!-- 药品订单与销售数量结束 -->
        <!-- 药品价格 -->
        <div id="drug-price-wrap">
            <s-title>药品价格</s-title>
            <drug-price />
        </div>
    </div>
</template>

<script>
import sTitle from "@/components/Title/s-title";
import bTitle from "@/components/Title/b-title";
import Tabs from "@/components/Tabs/index";
import downStream from "@/components/DrugData/downStream";
import upStream from "@/components/DrugData/upStream";
import drugPrice from "@/components/DrugData/drugPrice";
import SaleAmount from "@/components/DrugData/saleAmount";
import SaleNumber from "@/components/DrugData/saleNumber";
import Anchor from "@/components/Achor/achor";
import AnchorLink from "@/components/Achor/achor-link";
export default {
    components: {
        sTitle,
        bTitle,
        Tabs,
        downStream,
        upStream,
        drugPrice,
        SaleAmount,
        SaleNumber,
        Anchor,
        AnchorLink
    },
    data() {
        return {
            tabIndex: 2
        };
    },
    created() {
        this.$store.dispatch("drug/getCompanyNameList");
    },
    methods: {
        handleClick(val) {
            if (val !== "药品流向") {
                this.$message("开发中,敬请期待");
            }
        }
    }
};
</script>


<style lang="scss" >
@import "../../assets/css/echart.scss";
</style>

<style lang="less" scoped>
.p-re {
    position: relative;
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
</style>

