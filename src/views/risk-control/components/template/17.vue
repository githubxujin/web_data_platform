<template>
<!-- 审判流程 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>案号：</p>
                                        <p>{{item.row.caseNumber ? item.row.caseNumber : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案由：</p>
                                        <p>{{item.row.reason ? item.row.reason : '无'}}</p>
                                    </div>
                                        <div class="pull-down">
                                        <p>标的金额：</p>
                                        <p>{{item.row.targetAmount ? item.row.targetAmount : '无'}}</p>
                                    </div>
                                    
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>审判程序：</p>
                                        <p>{{item.row.judicialProcedure ? item.row.judicialProcedure : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案件进度：</p>
                                        <p>{{item.row.caseProgress ? item.row.caseProgress : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>承办部门：</p>
                                        <p>{{item.row.orgName ? item.row.orgName : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>结案方式：</p>
                                        <p>{{item.row.finishType ? item.row.finishType : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>承办部门：</p>
                                        <p>{{item.row.orgName ? item.row.orgName : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>主审法官：</p>
                                        <p>{{item.row.mainJudge ? item.row.mainJudge : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>合议庭成员：</p>
                                        <p>{{item.row.member ? item.row.member : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>归档日期：</p>
                                        <p>{{item.row.closeDate ? item.row.closeDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>审限日期：</p>
                                        <p>{{item.row.deadline ? item.row.deadline : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>立案日期：</p>
                                        <p>{{item.row.filingDate ? item.row.filingDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>立案时间：</p>
                                        <p>{{item.row.filingTime ? item.row.filingTime : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>主审法官：</p>
                                        <p>{{item.row.mainJudge ? item.row.mainJudge : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>公告类型：</p>
                                        <p>{{item.row.announcementType ? item.row.announcementType : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>字号：</p>
                                        <p>{{item.row.wordNumber ? item.row.wordNumber : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>审判长：</p>
                                        <p>{{item.row.chiefJudge ? item.row.chiefJudge : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>案件类别：</p>
                                        <p>{{item.row.caseType ? item.row.caseType : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>结案方式：</p>
                                        <p>{{item.row.finishType ? item.row.finishType : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>结案日期：</p>
                                        <p>{{item.row.finishDate ? item.row.finishDate : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <p>当事人：</p>
                                    <p style="margin:11px 0 0 -12px;">
                                        <el-table :data="item.row.litigantList" border>
                                            <el-table-column prop="role" label="角色"></el-table-column>
                                            <el-table-column prop="name" label="名字"></el-table-column>
                                        </el-table>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间" width="120"></el-table-column>
            <el-table-column prop="announcer" label="公告人"></el-table-column>
            <el-table-column prop="reason" show-overflow-tooltip label="案由"></el-table-column>
            <el-table-column prop="caseProgress" label="案件进度"></el-table-column>
            <el-table-column prop="litigantList" label="当事人" align="left" min-width="200">
                <template slot-scope="scope">
                    <div v-for="(v,k) in scope.row.litigantList" :key="k">
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

