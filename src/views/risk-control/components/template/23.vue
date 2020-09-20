<template>
<!--  司法协助 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>执行法院：</p>
                                        <p>{{item.row.executeCourt ? item.row.executeCourt : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:152px;">执行裁定书文号：</p>
                                        <p>
                                            {{item.row.documentNo ? item.row.documentNo : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:177px;">被执行人证照种类：</p>
                                        <p>
                                            {{item.row.idType ? item.row.idType : '无'}}
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>冻结期限自：</p>
                                        <p>{{item.row.freezingStartDate ? item.row.freezingStartDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:177px;">冻结期限至：</p>
                                        <p>{{item.row.freezingEndDate ? item.row.freezingEndDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:177px;">股权所在企业名称：</p>
                                        <p>{{item.row.companyName ? item.row.companyName : '无'}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
        <el-table-column prop="announcementDate" label="发布时间" width="180"></el-table-column>
        <el-table-column prop="companyName" label="股权所在企业"></el-table-column>
        <el-table-column prop="name" label="被执行人"></el-table-column>
        <el-table-column prop="assignee" label="受让人" width="180"></el-table-column>
        <el-table-column prop="executeEvents" label="执行事项" width="180"></el-table-column>
        <el-table-column prop="stockAmount" label="股权数额" width="180" align="right"></el-table-column>
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

