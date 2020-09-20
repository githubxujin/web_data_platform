<template>
    <div class="stat">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <general></general>
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <data-detail></data-detail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import dataDetail from './components/data-detail.vue'
import general from './components/general.vue'
export default {
    components: {
        dataDetail,
        general
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    created() {
        // console.log('this.$routr.params.bidId',this.$route.params.bidId);
    },
    methods: {
        handleClick(val) {}
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
