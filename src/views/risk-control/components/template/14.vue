<template>
<!-- 经营异常 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border>
            <el-table-column prop="inDate" label="列入日期"></el-table-column>
            <el-table-column prop="reason" label="异常原因"></el-table-column>
            <el-table-column prop="decideOrgName" label="作出决定机关"></el-table-column>
            <el-table-column prop="outReason" label="移出原因"></el-table-column>
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

