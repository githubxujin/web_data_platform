<template>
    <div>
        <el-dialog title="操作记录" :visible.sync="$parent.dialogVisibleRecord" width="800px" id="record">
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="createBy" label="操作人" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column prop="logDesc" label="操作内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="logResult" label="操作结果" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="操作时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.createTime}}
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="handleSizeChange" :current-page.sync="params.current" @current-change="handleCurrentChange"
                layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
            </el-pagination>
        </el-dialog>
    </div>
</template>
<script>
import moment from "moment";
export default {
    props: {
        dialogVisible: Boolean
    },
    data () {
        return {
            moment,
            id: "",
            list: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0
        };
    },
    created () { },
    methods: {
        getList () {
            this.$parent.recordPagination(this.id);
        },
        handleSizeChange (val) {
            this.$parent.params.size = val;
            this.$parent.recordPagination(this.id);
        },
        handleCurrentChange (val) {
            this.$parent.params.current = val;
            this.$parent.recordPagination(this.id)
        },
    }
};
</script>
