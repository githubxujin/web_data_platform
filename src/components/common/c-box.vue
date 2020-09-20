<template>
    <div class="c-box">
        <div class="hd" v-if="['title','search'].includes(type)">
            <div class="pre">
                <div class="txt">
                    <slot name="title" />
                </div>
            </div>
            <div class="line">
                <div class="top-head-icon" v-if="type === 'search'"></div>
            </div>
            <div class="tail">
                <div class="txt">
                    <slot name="append" />
                </div>
            </div>
        </div>
        <div class="bd" :class="{'no-top-border': type === 'title' ,'no-icon': ['title'].includes(type)}">
            <slot />
        </div>
        <div class="fd"></div>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default() {
                return "";
            }
        }
    },
    data() {
        return {};
    }
};
</script>
<style lang="less" scoped>
.c-box {
    // border: 1px solid #1D3684;

    .hd {
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .pre,
        .tail {
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: #19bfdf;
            letter-spacing: 0.54px;
            padding: 0 4px;
            .txt {
                width: 100%;
                padding: 0 6px;
            }
        }
        .pre {
            background-image: url(~@/assets/images/box/title-bottom-l.png),
                url(~@/assets/images/box/title-bottom-r.png);
            background-repeat: no-repeat, no-repeat;
            background-position: left bottom, right bottom;
            .txt {
                background-image: url(~@/assets/images/box/title-bottom-c.png);
                background-repeat: repeat-x;
                background-position: center bottom;
            }
        }
        .tail {
            background-image: url(~@/assets/images/box/append-l.png),
                url(~@/assets/images/box/append-r.png);
            background-repeat: no-repeat, no-repeat;
            background-position: left bottom, right bottom;
            .txt {
                width: 70px;
                height: 30px;
                line-height: 30px;
                position: relative;
                background-image: url(~@/assets/images/box/title-bottom-c.png);
                background-repeat: repeat-x;
                background-position: center bottom;
            }
        }

        .line {
            position: relative;
            height: 30px;
            flex: 1;
            margin-left: -4px;
            margin-right: -4px;
            background-image: url(~@/assets/images/box/line-icon1.png),
                url(~@/assets/images/box/line-icon3.png);
            background-repeat: no-repeat;
            background-position: left bottom, right bottom;
            padding: 0 20px;
            text-align: center;
            &::before {
                content: "";
                width: 100%;
                height: 1px;
                display: inline-block;
                position: relative;
                top: 5px;
                background: #1d3684;
                z-index: 2;
            }
            &::after {
                content: "";
                width: auto;
                height: 10px;
                display: inline-block;
                position: absolute;
                top: 21px;
                left: 127px;
                right: 127px;
                background: #0e1b35;
                z-index: 1;
            }
            .top-head-icon {
                position: relative;
                display: inline-block;
                width: 76px;
                height: 7px;
                top: -3px;
                z-index: 9;
                background-image: url(~@/assets/images/box/line-icon2.png);
            }
        }
    }

    .bd {
        position: relative;
        padding: 14px 18px;
        background: #0e1b35;
        border: 1px solid #1d3684;

        background-image: url(~@/assets/images/box/bd-left.png),
            url(~@/assets/images/box/bd-right.png),
            url(~@/assets/images/box/bd-bj.png),
            url(~@/assets/images/box/bd-bj.png);
        background-repeat: no-repeat;
        background-position: left center, right center, left 4px bottom 4px,
            right 4px bottom 4px;

        // 去掉icon
        &.no-icon {
            background-image: none;
            &::before,
            &::after {
                display: none;
            }
        }

        // 去掉本身boder， 使用自定义线框
        &.no-top-border {
            border-top: none;
            top: -1px;
        }

        &::before,
        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            width: 12px;
            height: 9px;
            background-repeat: no-repeat;
        }
        &::before {
            left: -1px;
            background-image: url(~@/assets/images/box/left-bottom.png);
        }
        &::after {
            right: -1px;
            background-image: url(~@/assets/images/box/right-bottom.png);
        }
    }
}
</style>

