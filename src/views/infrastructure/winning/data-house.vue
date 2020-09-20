<template>
    <div>
        <el-tabs   type='card' v-model='activeName'>
            <el-tab-pane label='统计概况' name='first'>
            </el-tab-pane>
            <el-tab-pane label='数据明细' name='second'>
                <list :channel="[]" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import List from "@/components/Winning/in-winning-list"
export default {
    components: {
        List
    },
    data() {
        return {
            activeName: 'second',

        };
    },

};
</script>