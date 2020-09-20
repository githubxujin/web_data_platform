<template>
<!--  ICP备案信息 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border >
            <el-table-column prop="auditPassDate" label="审核通过时间" width="120"></el-table-column>
            <el-table-column prop="websiteName" label="网站名称"></el-table-column>
            <el-table-column prop="licenseNo" label="网站备案/许可证号"></el-table-column>
            <el-table-column prop="websiteDomain" label="网站域名"></el-table-column>
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

