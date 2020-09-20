<template>
    <div class="c-tag">
        <div class="c-tag-bd">
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        tagHand1 (k, value) {
            console.log(k);
        },
        tagHand2 (k, value) {
            console.log(k);
        }
    }
};
</script>
<style lang="less" scoped>
.dark {
    .c-tag {
        margin-top: 8px;
        cursor: pointer;
        padding: 0 15px;
        height: 10px;
        line-height: 10px;
        border-right: 1px solid #4f5155;
        margin-right: -1px;
        text-align: center;
        color: #a0a3a8;
        &:last-child {
            border-right: none;
        }

        .c-tag-bd {
            font-size: 14px;
            text-align: center;
        }
        &.act,
        &:hover {
            color: #43a1ac;
        }
    }
}
.light {
    .c-tag {
        margin-top: 8px;
        cursor: pointer;
        padding: 0 15px;
        height: 10px;
        line-height: 10px;
        border-right: 1px solid #d2d9e5;
        margin-right: -1px;
        text-align: center;
        color: #666;
        &:last-child {
            border-right: none;
        }

        .c-tag-bd {
            font-size: 14px;
            text-align: center;
        }
        &.act,
        &:hover {
            color: #4064d4;
        }
    }
}
</style>

