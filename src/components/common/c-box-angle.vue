<template>
    <div class="m-box" :style="{ width: width + 'px', height: height + 'px'}">
        <div class="title" v-if="title">
            <span v-text="title"></span>
        </div>
        <div class="left-top" :style="styleOpt"></div>
        <div class="left-bottom" :style="styleOpt"></div>
        <div class="right-top" :style="styleOpt"></div>
        <div class="right-bottom" :style="styleOpt"></div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["borderWidth", "borderHeight", "width", "height", "title"],
    data() {
        return {
            styleOpt: {
                width: (this.borderWidth || 5) + "px",
                height: (this.borderHeight || 5) + "px"
            }
        };
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
    .left-top,
    .left-bottom,
    .right-top,
    .right-bottom {
        position: absolute;
        border: @border solid #17d7eb;
    }
    .left-top {
        top: -@border;
        left: -@border;
        border-bottom: none;
        border-right: none;
    }
    .left-bottom {
        top: -@border;
        right: -@border;
        border-bottom: none;
        border-left: none;
    }
    .right-top {
        bottom: -@border;
        left: -@border;
        border-top: none;
        border-right: none;
    }
    .right-bottom {
        bottom: -@border;
        right: -@border;
        border-top: none;
        border-left: none;
    }
}
.m-box + .m-box {
    margin-top: 72px;
}
</style>


