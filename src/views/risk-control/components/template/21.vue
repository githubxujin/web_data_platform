<template>
<!-- 失信被执行人 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
           <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>已履行：</p>
                                        <p>{{item.row.executed ? item.row.executed : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>年龄：</p>
                                        <p>
                                            {{item.row.age ? item.row.age : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>执行依据文号：</p>
                                        <p>{{item.row.documentNo ? item.row.documentNo : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>执行法院：</p>
                                        <p>
                                            {{item.row.executeCourt ? item.row.executeCourt : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>未履行：</p>
                                        <p>{{item.row.notExecuted ? item.row.notExecuted : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>案号：</p>
                                        <p>{{item.row.caseNumber ? item.row.caseNumber : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p style="width:310px;">法定代表人或者负责人姓名：</p>
                                        <p>{{item.row.faRen ? item.row.faRen : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>省份：</p>
                                        <p>{{item.row.province ? item.row.province : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>立案时间：</p>
                                        <p>{{item.row.openCaseDate ? item.row.openCaseDate : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p style="width:225px;">被执行人姓名/名称：</p>
                                        <p>{{item.row.name ? item.row.name : '无'}}</p>
                                    </div>
                                    <div class="pull-down"></div>
                                </li>
                                <li>
                                    <p style="width:200px;">生效法律文书确定的义务：</p>
                                    <p>{{item.row.obligation ? item.row.obligation : '无'}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="conditon" label="失信被执行人行为具体情形"></el-table-column>
            <el-table-column prop="orgName" label="做出执行依据单位"></el-table-column>
            <el-table-column prop="executeCondition" label="被执行人的履行情况"></el-table-column>
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

