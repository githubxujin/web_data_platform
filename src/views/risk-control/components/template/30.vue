<template>
<!--  债券公告 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <a :href="item.row.url" target="_blank">发行公告</a>
                                </li>
                                
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issuerName" label="公司名称"></el-table-column>
            <el-table-column prop="issueDate" label="发布时间"></el-table-column>
            <el-table-column prop="noticeTitle" label="公告标题"></el-table-column>
            <el-table-column prop="noticeType" label="公告类型"></el-table-column>
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

