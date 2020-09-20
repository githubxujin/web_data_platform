<template>
    <div>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" align="left" min-width="100" prop="berthName" label="泊位名称" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="portArea" label="港区" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="berthDept" label="所属单位" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="berthForm" label="结构形式" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="berthLength" label="长度" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="berthDepth" label="水深" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="berthTonnage" label="靠泊能力" show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            params: {
                current: 1,
                size: 10,
                portName: this.$route.query.portName
            },
            total: 0,
        }
    },
    created() {
        this.getList()
    },
    methods: {

        getList() {
            this.ajax
                .json('/dcp/port/berth/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        }
    },
}
</script>

<style>
</style>