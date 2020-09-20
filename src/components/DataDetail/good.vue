<template>
    <div>
        <el-table :data="list">
            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="recordNo" label="诚信记录编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subject" label="诚信记录主体" show-overflow-tooltip></el-table-column>
            <el-table-column prop="content" label="决定内容" show-overflow-tooltip></el-table-column>
            <el-table-column prop="implementationDep" label="实施部门（文号）" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="endDate" label="发布有效期" show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [],
            params: {
                page: 1,
                size: 10
            },
            total: 0
        };
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {
            let companyId = this.$route.params.customerCode;
            this.$http(
                `/dcp/query/credit/list`,
                {
                    companyId,
                    type: 1
                },
                { type: "formdata" }
            ).then(res => {
                this.list = res.data;
            });
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
