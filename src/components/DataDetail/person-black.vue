<template>
    <div class="table-wrap">
        <div class="table-title">{{this.$route.params.customerName}}</div>
        <div v-html="list" class="table_tbox"></div>
        <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange "
            :page-sizes="[100, 200, 300, 400] " :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper " :total="total" v-if="total>0"></el-pagination>

    </div>
</template>
<script>
export default {
    data() {
        return {
            list: "",
            params: {
                page: 1,
                size: 10
            },
            total: 0
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            let id = this.$route.params.id;
            this.$http(
                `/dcp/query/staff/staffCreditBlackList/${id}`,
                this.params
            ).then(res => {
                this.list = res.data.html;
                this.total = res.data.sizeCoun;
            });
        },
        handleSizeChange(val) {
            this.params.size = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.params.page = val;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/table";
</style>


