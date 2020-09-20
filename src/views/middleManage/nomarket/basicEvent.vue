<template>
    <!-- 企业相关重大事件或舆情 -->
    <div class="table-wrap">
        <el-table :data="list" border>
            <el-table-column prop label="序号" width="70" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="itemList" align="center" label="舆情分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="itemName" label="标题" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="update" label="预警时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="90" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    components: {
    },
    data () {
        return {
            drugPermission: [],
            list: []
        };
    },
    created () {
        this.getList(this.$route.query.companyName)
    },
    methods: {
        getList (companyName) {
            this.ajax
                .json('risk/server/consensus/page/list', { cusomerName: companyName }, { type: 'get' })
                .then(res => {
                    this.list = res.data.records
                });
        }
    }
};
</script>