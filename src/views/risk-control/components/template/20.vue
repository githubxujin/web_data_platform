<template>
<!-- 被执行人 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
           <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>案号：</p>
                                        <p>{{item.row.caseNumber?item.row.caseNumber:'无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>立案时间：</p>
                                        <p>{{item.row.openCaseDate?item.row.openCaseDate:'无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>被执行人名称：</p>
                                        <p>{{item.row.name?item.row.name:'无'}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="executeTarget" label="执行标的"></el-table-column>
            <el-table-column prop="executeCourt" label="执行法院"></el-table-column>
            <el-table-column prop="caseStatus" label="案件状态" width="180">
            </el-table-column>
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

