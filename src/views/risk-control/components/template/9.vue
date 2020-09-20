<template>
<!-- 信息披露 -->
     <el-table :data="value" border ref="refTable" @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>代码：</p>
                                        <p>{{item.row.code}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>证券简称：</p>
                                        <p>
                                            {{item.row.stockShortName}}
                                        </p>
                                    </div>
                                    
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>公告类别：</p>
                                        <p>{{(item.row.noticeCategory || []).join()}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>公告来源：</p>
                                        <p>{{(item.row.noticeSource || []).join()}}</p>
                                    </div>
                                </li>
                                <li>
                                    <a :href="item.row.sourceArticalUrl" target="_blank">查看原文</a>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="noticeDate" label="公告时间"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="stockShortName" label="证券简称"></el-table-column>
            <el-table-column prop="noticeSource" label="公告来源"></el-table-column>
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

