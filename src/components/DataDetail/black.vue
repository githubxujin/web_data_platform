<template>
    <div>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='recordNo' label='黑名单记录编号' show-overflow-tooltip></el-table-column>
            <el-table-column prop='subject' label='黑名单记录主体'></el-table-column>
            <el-table-column prop='reason' label='	黑名单认定依据' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='implementationDep' label='认定部门' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='startDate' label='列入黑名单日期' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='endDate' label='移出黑名单日期' show-overflow-tooltip>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: []
        };
    },
    created () {
        this.getList();
    },
    methods: {
        getList () {
            let companyId = this.$route.params.customerCode;
            this.$http(
                `/dcp/query/black/list`,
                {
                    companyId
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


