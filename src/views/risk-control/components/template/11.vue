<template>
<!-- 重大税收违法 -->
     <el-table :data="value" border style="width: 100%">
        <el-table-column prop="majorIllegalFacts" label="主要违法事实"></el-table-column>
        <el-table-column prop="eventTime" label="事件时间"></el-table-column>
        <el-table-column prop="issueDate" label="发布时间"></el-table-column>
        <el-table-column prop="caseReportingPeriod" label="案件上报期"></el-table-column>
        <el-table-column prop="caseNature" label="案件性质"></el-table-column>
        <el-table-column prop="punishmentCondition" label="相关法律依据及税务处理处罚情况"></el-table-column>
        <el-table-column prop="taxpayerName" label="纳税人名称"></el-table-column>
        <el-table-column prop="taxpayerCode" label="纳税人识别码"></el-table-column>
        <el-table-column prop="orgCode" label="组织机构代码"></el-table-column>
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

