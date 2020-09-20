<template>
<!--  债券发行 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>债券名称：</p>
                                    <p>{{item.row.shortName}}</p>
                                </li>
                                <li>
                                    <p>最新评级：</p>
                                    <p>
                                        {{item.row.lastestRating}}
                                    </p>
                                </li>
                                <li>
                                    <p>标题：</p>
                                    <p>{{item.row.title}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issuerName" label="公司名称"></el-table-column>
            <el-table-column prop="issueDate" label="债券发行日"></el-table-column>
            <el-table-column prop="planIssueCount" label="实际发行量"></el-table-column>
            <el-table-column prop="term" label="债券期限"></el-table-column>
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

