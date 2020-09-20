<template>
    <div class="table-wrap">

        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='中登登记' name='first'>
                <check-in v-if="activeName==='first'"></check-in>
            </el-tab-pane>
            <el-tab-pane label='中登网用户管理' name='second'>
                <manage v-if="activeName==='second'"></manage>
            </el-tab-pane>
            <el-tab-pane label='系统异常处理' name='three'>
                <exception v-if="activeName==='three'"></exception>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
export default {
    components: {
        checkIn: () => import('./components/checkIn/check-in.vue'),
        manage: () => import('./components/checkIn/manage.vue'),
        exception: () => import('./components/checkIn/exception.vue')

    },
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {

    }
};
</script>