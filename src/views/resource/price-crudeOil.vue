<template>
    <div class="stat">
        <div>
            <el-tabs type='card' v-model='activeName'>
                <el-tab-pane label='统计概况' name='first'>
                    <statistics-wti />
                    <div class="el-20"></div>
                    <statistics-blt />
                </el-tab-pane>

                <el-tab-pane label='数据明细' name='second'>
                    <div class="table-wrap">
                        <el-tabs type='border-card' v-model='activeName2'>
                            <el-tab-pane label='WTI' name='first2'>
                                <particulars-wti />
                            </el-tab-pane>
                            <el-tab-pane label='布伦特' name='second2'>
                                <particulars-blt />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        statisticsWti: () => import('./components/price-crudeOil/statistics-WTI.vue'),
        statisticsBlt: () => import('./components/price-crudeOil/statistics-blt.vue'),
        particularsWti: () => import('./components/price-crudeOil/particulars-WTI.vue'),
        particularsBlt: () => import('./components/price-crudeOil/particulars-blt.vue')
    },
    data () {
        return {
            activeName: 'first',
            activeName1: 'first1',
            activeName2: 'first2',
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.table-wrap {
    padding-top: 20px;
}
.child {
    background: #1d1e23;
    /deep/ .el-tabs__nav-scroll {
        margin-top: 0;
    }
    /deep/ .el-tabs__content {
        padding: 20px;
    }
}
</style>
