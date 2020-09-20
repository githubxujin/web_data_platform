<template>
    <div class="table-wrap mt20 pb0">
        <el-tabs type='border-card' v-model='activeName' @tab-click="handleClick">
            <el-tab-pane label='统计概况' name='first'>
                <statistics />
                <echart />

            </el-tab-pane>
            <el-tab-pane label='数据明细' name='second'>
                <data-detail></data-detail>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        'data-detail': () => import('./components/money-water/data-detail.vue'),
        'statistics': () => import('./components/money-water/statistics.vue'),
        'echart': () => import('./components/money-water/echart.vue')
    },
    data () {
        return {
            activeName: 'first'
        };
    },
    created () {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        }
    }
};
</script>