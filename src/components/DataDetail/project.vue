<template>
    <div>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='projectNo' label='项目编码' show-overflow-tooltip align='center'>
            </el-table-column>
            <el-table-column prop='projectName' label='项目名称' show-overflow-tooltip>
                <template slot-scope='scope'>
                    <a href="http://jzsc.mohurd.gov.cn/data/project" class="link" target="_blank"> {{scope.row.projectName}}</a>
                </template>
            </el-table-column>
            <el-table-column prop='projectAddress' label='项目属地' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectType' label='项目类别' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectUnit' label='建设单位' xshow-overflow-tooltip>
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
                `/dcp/query/project/list`,
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
.link {
    color: #43a1ac;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    &:hover {
        text-decoration: underline;
    }
}
</style>


