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
        cursor: pointer;
        padding: 0 15px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #41a4b0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: -1px;
        .c-tag-bd {
            font-size: 14px;
            color: #41a4b0;
            text-align: center;
        }
        &.act,
        &:hover {
            background: rgba(52, 139, 142, 0.11);
            border: 1px solid #366f71;
        }
    }
}
.light {
    .c-tag {
        cursor: pointer;
        padding: 0 15px;
        height: 24px;
        line-height: 24px;
        border: 1px solid #4064d4;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: -1px;
        .c-tag-bd {
            font-size: 14px;
            color: #4064d4;
            text-align: center;
        }
        &.act,
        &:hover {
            background: #d2daf3;
            border: 1px solid #4064d4;
        }
    }
}
</style>

