<template>
<!-- 动产抵押 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>发布时间：</p>
                                    <p>{{item.row.issueDate}}</p>
                                </li>
                                <li>
                                    <p>登记日期：</p>
                                    <p>
                                        {{item.row.checkInDate}}
                                    </p>
                                </li>
                                <li>
                                    <p>登记编号：</p>
                                    <p>{{item.row.checkInNumber}}</p>
                                </li>
                                <li>
                                    <p>当事人：</p>
                                    <p style="margin:11px 0 0 -12px;">
                                        <el-table :data="item.row.litigantList" style="width: 1100px" border>
                                            <el-table-column prop="role" label="角色" width="300">
                                            </el-table-column>
                                            <el-table-column prop="name" label="名字">
                                            </el-table-column>
                                        </el-table>
                                    </p>
                                </li>
                                <li>
                                    <p>履行期限：</p>
                                    <p>{{item.row.performanceTerm}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="checkInDate" label="登记时间"></el-table-column>
            <el-table-column prop="transBusinessType" label="交易业务类型"></el-table-column>
            <el-table-column prop="performanceTerm" label="履行期限"></el-table-column>
            <el-table-column prop="checkInNumber" label="登记编号"></el-table-column>
            <el-table-column prop="checkInType" label="登记种类"></el-table-column>
            <el-table-column prop="litigantList" label="当事人">
                <template slot-scope="scope">
                    <ul> 
                        <li v-for="(item,index) in scope.row.litigantList"  :key="index">   
                            <span style="color:#FF8E36;">{{item.role}}</span>：<span>{{item.name}}</span>
                        </li>
                    </ul>
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

