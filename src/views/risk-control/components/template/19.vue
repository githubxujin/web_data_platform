<template>
<!-- 裁判文书 -->
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
                                        <p>审理法院：</p>
                                        <p>
                                            {{item.row.caseNumber ? item.row.caseNumber : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>判决结果：</p>
                                        <p>{{item.row.judgmentResult ? item.row.judgmentResult : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>不公开理由：</p>
                                        <p>{{item.row.noPublicReason ? item.row.noPublicReason : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>法官：</p>
                                        <p>{{item.row.judgeName ? item.row.judgeName : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案件类型：</p>
                                        <p>{{item.row.caseType ? item.row.caseType : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>文书类型：</p>
                                        <p>{{item.row.documentType ? item.row.documentType : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>判决时间：</p>
                                        <p>
                                            {{item.row.decideDate ? item.row.decideDate : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>发布时间：</p>
                                        <p>{{item.row.issueDate ? item.row.issueDate : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <p>当事人：</p>
                                    <p style="margin:11px 0 0 -12px;">
                                        <el-table :data="item.row.litigantList" style="width: 1100px" border>
                                            <el-table-column prop="role" label="角色" width="300">
                                                <template slot-scope="scope">
                                                    <div v-for="(v,k) in scope.row.roles" :key="k">
                                                        {{v}}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="name" label="名字"></el-table-column>
                                            <el-table-column prop="judgeResult" label="裁判结果"></el-table-column>
                                            <el-table-column prop="type" label="类型"></el-table-column>
                                            <el-table-column prop="orgName" label="组织名"></el-table-column>
                                        </el-table>
                                    </p>
                                </li>
                                <li>
                                    <a :href="item.row.url" target="_blank">查看原文</a>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="decideDate" label="判决时间" width="120"></el-table-column>
            <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="reason" label="案由"></el-table-column>
            <el-table-column prop="identity" label="身份" width="120"></el-table-column>
            <el-table-column prop="judgmentResult" label="胜负判定"></el-table-column>
            <el-table-column prop="decideTotalAmount" label="判决总金额" align="right"></el-table-column>
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

