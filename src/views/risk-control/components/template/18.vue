<template>
<!-- 开庭公告 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>案由：</p>
                                        <p>{{item.row.reason ? item.row.reason : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案号：</p>
                                        <p>
                                            {{item.row.caseNumber ? item.row.caseNumber : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>审理法院：</p>
                                        <p>{{item.row.courtName ? item.row.courtName : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>正文：</p>
                                        <p style="padding-right:15px;">{{item.row.content ? item.row.content : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>法庭：</p>
                                        <p>{{item.row.lawCourt ? item.row.lawCourt : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案件类型：</p>
                                        <p>{{item.row.caseType ? item.row.caseType : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>法官：</p>
                                        <p>
                                            {{item.row.judgeName ? item.row.judgeName : '无'}}
                                        </p> 
                                    </div>
                                    <div class="pull-down">
                                        <p>开庭时间：</p>
                                        <p>{{item.row.openCourtDate ? item.row.openCourtDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>发布时间：</p>
                                        <p>{{item.row.issueDate ? item.row.issueDate : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <p>当事人：</p>
                                    <p style="margin:11px 0 0 -12px;">
                                        <el-table :data="item.row.litigantDetailList" style="width: 1200px" border>
                                            <el-table-column prop="role" label="角色" width="300">
                                            </el-table-column>
                                            <el-table-column prop="name" label="名字">
                                            </el-table-column>
                                        </el-table>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
        <el-table-column prop="openCourtDate" label="开庭时间" width="120"></el-table-column>
        <el-table-column prop="courtName" label="法院" width="400">
            <template slot-scope="scope">
                {{`${scope.row.courtName?scope.row.courtName:''}${scope.row.lawCourt?scope.row.lawCourt:''}`}}
            </template>
        </el-table-column>
        <el-table-column prop="reason" label="案由" width="300"></el-table-column>
        <el-table-column prop="litigantList" label="当事人" align="left">
            <template slot-scope="scope">
                <div v-for="(v,k) in scope.row.litigantDetailList" :key="k">
                    <span style="color:#FF8E36;">{{v.role}}</span>：<span>{{v.name}}</span>
                    <!-- {{`${v.role}:${v.name}`}} -->
                </div>
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

