<template>
    <!-- 企业相关重大事件或舆情 -->
    <div class="table-wrap">
        <el-table :data="drugPermission" style="width: 100%">
            <el-table-column prop label="序号" width="70" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="personCard" align="center" label="舆情分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personMarriage" label="标题" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="personChild" label="预警时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="enterData" label="操作" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            drugPermission: []
        };
    },
    methods: {}
};
</script>