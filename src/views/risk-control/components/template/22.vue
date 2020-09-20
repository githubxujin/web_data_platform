<template>
<!-- 涉诉公告 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>公告时间：</p>
                                        <p>{{item.row.noticeDate ? item.row.noticeDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>公告类型：</p>
                                        <p>
                                            {{item.row.noticeType ? item.row.noticeType : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>公告人：</p>
                                        <p>{{item.row.announcer ? item.row.announcer : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <p>正文：</p>
                                    <p>
                                        {{item.row.content ? item.row.content : '无'}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="noticeDate" label="公告时间" width="120"></el-table-column>
            <el-table-column prop="litigants" label="当事人">
                <template slot-scope="scope">
                    <span v-for="(v,k) in scope.row.litigants" :key="k">
                        {{k+1===scope.row.litigants.length? v : `${v}、`}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="noticeType" label="公告类型"></el-table-column>
            <el-table-column prop="announcer" label="公告人"></el-table-column>
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

