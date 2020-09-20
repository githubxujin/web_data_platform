<template>
<!--  评级记录 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>评级对象：</p>
                                    <p>{{item.row.ratingObject}}</p>
                                </li>
                                <li>
                                    <p>评级日期：</p>
                                    <p>{{item.row.ratingDate}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issuerName" label="公司名称"></el-table-column>
            <el-table-column prop="publishDate" label="发布时间"></el-table-column>
            <el-table-column prop="rating" label="评级"></el-table-column>
            <el-table-column prop="ratingCompany" label="评级公司"></el-table-column>
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

