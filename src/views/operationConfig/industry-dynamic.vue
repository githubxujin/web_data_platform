<template>
    <div class="table-wrap ">
        <div class="table-title">行业动态设置</div>
        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='预警规则' name='first'>
                <alert-rules v-if="activeName==='first'"></alert-rules>
            </el-tab-pane>
            <el-tab-pane label='风险通知' name='second'>
                <risk-notice v-if="activeName==='second'"></risk-notice>
            </el-tab-pane>
            <el-tab-pane label='公众号设置' name='three'>
                <official-account v-if="activeName==='three'"></official-account>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    components: {
        riskNotice: () => import('./components/industryDynamic/risk-notice.vue'),
        officialAccount: () => import('./components/industryDynamic/official-account.vue'),
        alertRules: () => import('./components/industryDynamic/alert-rules.vue')
    },
    data () {
        return {
            activeName: 'first'
        };
    },
};
</script>