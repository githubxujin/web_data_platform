<template>
    <div class="stat mt20">
        <data-detail></data-detail>
    </div>
</template>

<script>
export default {
    components: {
        dataDetail: () => import('./components/data-detail.vue')
    },
    data () {
        return {
            activeName: 'first'
        }
    },
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.tabs-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
}
</style>
