<template>
    <div class="stat">
        <data-detail></data-detail>
    </div>
</template>

<script>
export default {
    components: {
        dataDetail: () => import('./components/harbor/data-detail.vue')
    },
    data () {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick (val) { }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
