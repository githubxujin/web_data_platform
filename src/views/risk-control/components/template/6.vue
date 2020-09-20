<template>
<!-- 信息披露 -->
    <el-table :data="value" border style="width: 100%;" ref="refTable" @row-click="rowClick">
        <el-table-column type="expand">
            <template slot-scope="item">
                <el-form label-position="left" inline class="demo-table-expand">
                    <div class="expand-in">
                        <ul>
                            <li>
                                <p>变更日期：</p>
                                <p>{{item.row.changeDate}}</p>
                            </li>
                            <li>
                                <p>变更事项：</p>
                                <p>
                                    {{item.row.changeItem}}
                                </p>
                            </li>
                            <li>
                                <p>变更前：</p>
                                <p>{{item.row.changeBefore}}</p>
                            </li>
                            <li>
                                <p>变更后：</p>
                                <p>{{item.row.changeLater}}</p>
                            </li>
                        </ul>
                    </div>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="changeDate" label="变更日期" width="200"></el-table-column>
        <el-table-column prop="changeItem" label="变更事项" width="200"></el-table-column>
        <el-table-column prop="changeLater" label="变更后内容"></el-table-column>
    </el-table>
</template>
<script>
export default {
    props: ['value'],
    data(){
        return {
            getIndex: 0
        }
    },
    mounted(){
        console.log(111111,this.value)
    },
    methods:{
        rowClick (row, index, e) {
            // 展开/收缩切换
            this.$refs.refTable.toggleRowExpansion(row)
        },
    }
}
</script>

