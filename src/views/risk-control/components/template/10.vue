<template>
<!-- 行政处罚 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
         <el-table-column type="expand">
                <template slot-scope="item">
                    <div v-if="item.row.content" class="xxxx" v-html="item.row.content"></div>
                    <div v-else class="tc">暂无数据</div>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="decideOrgName" label="处罚部门">
                <template slot-scope="item">
                    {{ item.row.decideOrgName ? item.row.decideOrgName.join() : item.row.source}}
                </template>
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
<style lang="less">
.xxxx table th{
    font-weight: normal;
}
    .xxxx table td{
        color:#fff !important;
    }

</style>


