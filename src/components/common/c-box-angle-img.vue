<template>
    <div class="m-box" :style="{ width: width + 'px', height: height + 'px'}">
        <div class="title" v-if="title">
            <span v-text="title"></span>
        </div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["width", "height", "title"],
    data() {
        return {};
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
@border: 1px;

.m-box {
    position: relative;
    background-color: rgba(3, 18, 44, 0.69);
    border: 1px solid #26409d;
    box-shadow: inset 0 0 6px 0 rgba(24, 163, 255, 0.42);
    display: inline-block;
    margin-top: 46px;

    &::before {
        content: "";
        position: absolute;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        left: -4px;
        top: -4px;
        right: -4px;
        bottom: -4px;
        background-image: url(../assets/images/box-angle-img/left-top.png),
            url(../assets/images/box-angle-img/right-top.png),
            url(../assets/images/box-angle-img/left-bottom.png),
            url(../assets/images/box-angle-img/right-bottom.png);
        background-repeat: no-repeat;
        background-position: left top, right top, left bottom, right bottom;
    }
    .title {
        position: absolute;
        width: 100%;
        height: 36px;
        line-height: 36px;
        text-align: left;
        font-size: 16px;
        top: -46px;
        padding-left: 10px;
    }
    .container {
        // margin: 70px;
    }
}
</style>


