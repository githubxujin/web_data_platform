<template>
    <div>
        <Anchor show-ink>
            <AnchorLink href="#cement-price-wrap" title="广东地区水泥市场价格" />
        </Anchor>
        <div id="cement-price-wrap">
            <div class=" tc">
                <div class="title-large">交易-价格</div>
                <tabs :tabList="['钢材价格','水泥价格']" @success="handleClick" :tabIndex="tabIndex" />
            </div>
            <s-title>广东地区水泥市场价格</s-title>

            <cement-price />

            <cement-interval />

            <div class="el-center" v-if="isUpShow">
                <button class="btn-down" @click="showTable">
                    <div class="btn-text">更多信息</div>
                </button>
            </div>
            <div v-show="show">
                <cement-list />
            </div>
            <div class="el-center" v-if="isDownShow">
                <button class="btn-down" @click="hideTable">
                    <div class="btn-text">收起</div>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import CementList from "@/components/PriceCement/cementList";
import CementInterval from "@/components/PriceCement/cementInterval";
import Tabs from "@/components/Tabs/index";
import CementPrice from "@/components/PriceCement/cementPrice";
import Anchor from "@/components/Achor/achor";
import AnchorLink from "@/components/Achor/achor-link";
import sTitle from "@/components/Title/s-title";
export default {
    components: {
        CementInterval,
        CementList,
        CementPrice,
        Tabs,
        Anchor,
        AnchorLink,
        sTitle
    },
    data() {
        return {
            tabIndex: 1,
            isUpShow: true,
            show: false,
            isDownShow: false
        };
    },
    created() {},
    methods: {
        showTable() {
            this.isUpShow = false;
            this.isDownShow = true;
            this.show = true;
        },
        hideTable() {
            this.isUpShow = true;
            this.isDownShow = false;
            this.show = false;
        },
        handleClick(val) {
            switch (val) {
                case "钢材价格":
                    return this.$router.push({ name: "trade-price" });
                case "水泥价格":
                    return this.$router.push({ name: "price-cement" });
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.el-center {
    text-align: center;
}
.btn-down {
    background-image: url("~@/assets/images/btn/btn-down.png");
    width: 135px;
    height: 35px;
    background-color: #03122c;
    border: none;
    color: #4088fd;
    &:focus,
    &:hover {
        border: none;
        outline: 0;
    }
}
.btn-down {
    background-image: url("~@/assets/images/btn/btn-up.png");
    width: 135px;
    height: 35px;
    background-color: #03122c;
    border: none;
    color: #4088fd;
    &:focus,
    &:hover {
        border: none;
    }
}
.btn-text {
    margin-top: 6px;
    font-size: 14px;
    color: #4088fd;
}
.mt-36 {
    margin-top: 36px;
}
.mt-20 {
    margin-top: 20px;
}
@import "../../assets/css/echart.scss";
/deep/ .el-table thead.is-group tr {
    th {
        background: #192846;
    }
    &:first-child th {
        &:nth-child(2) div {
            border: 1px solid #4088fd;
            height: 40px;
            line-height: 40px;
        }
        &:nth-child(3) div {
            border: 1px solid #19bfdf;
            height: 40px;
            line-height: 40px;
        }
    }
}

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
}
.tag-box {
    position: absolute;
    top: 58px;
    right: 30px;
    width: 410px;
    .c-tag + .c-tag {
        margin-left: 10px;
    }
}
</style>
