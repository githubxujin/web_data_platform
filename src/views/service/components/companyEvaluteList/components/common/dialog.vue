<template>
    <div>
        <el-dialog title='详情' :visible.sync='dialogVisible' width='600px'>
            <el-table :data='list' border>
                <template v-if="type==='ac'">
                    <el-table-column prop='amount' label='认缴出资额' show-overflow-tooltip>
                        <template slot-scope='scope'>
                            {{scope.row.amount?scope.row.amount+'万元人民币':''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop='type' label='认缴出资方式' show-overflow-tooltip></el-table-column>
                    <el-table-column prop='date' label='认缴出资日期' show-overflow-tooltip></el-table-column>
                </template>
                <template v-else-if="type==='sub'">
                    <el-table-column prop='amount' label='实缴出资额' show-overflow-tooltip>
                        <template slot-scope='scope'>
                            {{scope.row.amount?scope.row.amount+'万元人民币':''}}
                        </template>
                    </el-table-column>
                    <el-table-column prop='type' label='实缴出资方式' show-overflow-tooltip></el-table-column>
                    <el-table-column prop='date' label='实缴出资日期' show-overflow-tooltip></el-table-column>
                </template>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: {
        list: Array,
        type: String,
    },
    data() {
        return {
            dialogVisible: false
        }
    },
    methods: {}
};
</script>