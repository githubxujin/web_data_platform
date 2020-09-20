<template>
    <div class="table-wrap mt20">
        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='猫池客户关联' name='first'>
                <client-info v-if="activeName==='first'"></client-info>
            </el-tab-pane>
            <el-tab-pane label='猫池数据监控' name='three'>
                <message-remind v-if="activeName==='three'"></message-remind>
            </el-tab-pane>
            <el-tab-pane label='猫池预警推送' name='second'>
                <email-info v-if="activeName==='second'"></email-info>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    components: {
        clientInfo: () => import('./components/catPool/client-info.vue'),
        emailInfo: () => import('./components/catPool/email-info.vue'),
        messageRemind: () => import('./components/catPool/message-remind.vue')

    },
    data () {
        return {
            activeName: 'first'
        };
    },
    methods: {}
};
</script>