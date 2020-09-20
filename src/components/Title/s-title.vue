<template>
    <div class="tc mt25 pb15">
        <div class="title-box">
            <div class="pre"></div>
            <div class="txt">
                <slot></slot>
            </div>
            <div class="after"></div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.title-box {
    position: relative;
    display: inline-block;
    height: 28px;
    text-align: center;
    z-index: 1;
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 250%;
        top: -62.5%;
        left: 0;
        background-image: url(~@/assets/images/title-sub-bg.png);
        background-repeat: no-repeat;
        background-position: center;
        z-index: 0;
    }
    .txt {
        padding: 4px 30px;
        color: #fff;
        font-size: 14px;
    }
    .pre,
    .after {
        position: relative;
        width: 100%;
        height: 1px;
        background-image: radial-gradient(
            #17d7eb 30%,
            #0e1b36 60%,
            rgba(0, 0, 0, 0.6)
        );
        &::before,
        &::after {
            content: "";
            position: absolute;
            top: 0px;
            height: 2px;
            width: 2px;
            background: #17d7eb;
            border-radius: 50%;
        }
        &::before {
            left: 0;
        }
        &::after {
            right: 0;
        }
    }
}
</style>
