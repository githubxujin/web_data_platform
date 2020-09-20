<template>
    <div>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='name' label='姓名' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop='idCard' label='身份证' show-overflow-tooltip></el-table-column>
            <el-table-column prop='type' label='注册类别' show-overflow-tooltip></el-table-column>
            <el-table-column prop='number' label='注册号(执业印章号)' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='profession' label='注册专业' show-overflow-tooltip>
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
                `/dcp/query/company/registrant/list`,
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
/deep/ .pro_table_box.pro_table_borderright thead tr:first-child th {
    background: #232528 !important;
}
/deep/ .table_tbox {
    margin-top: 0;
}
/deep/ .pro_table_box {
    thead {
        tr {
            th {
                &:first-child {
                    height: 30px;
                    line-height: 30px;
                    padding: 0;
                }
                .comp_regstaff_links {
                    padding-bottom: 20px;
                }
            }
        }
    }
}
</style>

