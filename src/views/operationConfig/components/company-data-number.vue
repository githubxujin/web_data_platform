<template>
    <div class="table-wrap">
        <div class="table-title">各省商业公司数据</div>
        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='各省财政数据' name='first'>
                <financialData />
            </el-tab-pane>
            <el-tab-pane label='各省药品流通市场规模' name='second'>
                <marketSize />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    components: {
        financialData: () => import("./company-data-number/financialData.vue"),
        marketSize: () => import("./company-data-number/marketSize.vue")
    },
    data () {
        return {
            activeName: 'first'
        };
    }
};
</script>