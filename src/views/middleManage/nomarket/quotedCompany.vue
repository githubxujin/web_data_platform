<template>
    <div class="table-wrap">
        <el-table :data="list" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="dataYear" label="年份" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dataType" label="财报类型" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="财报标题" align="center" header-align="center" width="500" show-overflow-tooltip>
                <template slot-scope="item">
                    <a :href="item.row.fileUrl" target="_blank" class="url">{{item.row.fileName}}</a>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>
<script>
export default {
    components: {
    },
    data () {
        return {
            params: {
                current: 1,
                size: 10,
                stockSymbol: this.$route.query.stockSymbol
            },
            total: 0,
            drugPermission: [],
            list: []
        };
    },
    created () {
        this.getList()
    },
    methods: {
        getList () {
            this.ajax
                .json('/dcp/query/drug/company/financial/report/info', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                });
        }
    }
};
</script>
<style lang="scss" scoped>
.url {
    color: #43a1ac;
}
</style>