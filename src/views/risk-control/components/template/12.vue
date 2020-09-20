<template>
<!-- 催缴/欠税 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>法定代表人姓名：</p>
                                    <p>{{item.row.faRen}}</p>
                                </li>
                                <li>
                                    <p>经营地址：</p>
                                    <p>
                                        {{item.row.address}}
                                    </p>
                                </li>
                                <li>
                                    <p>高级税务机关：</p>
                                    <p>{{item.row.advanceTaxOrgName}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间"></el-table-column>
            <el-table-column prop="taxOrgName" label="税务机关"></el-table-column>
            <el-table-column prop="taxCategory" label="税种"></el-table-column>
            <el-table-column prop="amount" label="金额" align="right"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
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

