<template>
    <div>
        <el-table :data='list' style='mt20'>
            <el-table-column type='index' label='序号' align='center'></el-table-column>
            <el-table-column prop='channelNo' label='变更日期' show-overflow-tooltip></el-table-column>
            <el-table-column prop='channelName' label='变更内容' show-overflow-tooltip></el-table-column>
        </el-table>

    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [],
            params: { page: 1, size: 10 },
            total: 0
        };
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {

        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        handleCurrentChange (val) {
            this.params.page = val;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
/* @import "../../assets/css/table"; */
.table-wrap {
    padding-top: 20px;
    padding-left: 0;
}
</style>


