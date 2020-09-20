<template>
    <div class="stat">
        <div>
            <el-tabs type='card' v-model='activeName'>
                <el-tab-pane label='统计概况' name='first'>
                    <div class="child">
                        <statistics-gasoline />
                        <statistics-diesel />
                    </div>
                </el-tab-pane>

                <el-tab-pane label='数据明细' name='second'>
                    <div class="table-wrap">
                        <el-tabs type='border-card' v-model='activeName2'>
                            <el-tab-pane label='汽油' name='first2'>
                                <particulars-gasoline />
                            </el-tab-pane>
                            <el-tab-pane label='柴油' name='second2'>
                                <particulars-diesel />
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
        statisticsGasoline: () => import('./components/price-productOil/statistics-gasoline.vue'),
        statisticsDiesel: () => import('./components/price-productOil/statistics-diesel.vue'),
        particularsGasoline: () => import('./components/price-productOil/particulars-gasoline.vue'),
        particularsDiesel: () => import('./components/price-productOil/particulars-diesel.vue'),
    },
    data() {
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
