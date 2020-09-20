<template>
<!-- 行政许可 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
           <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>办件编号：</p>
                                        <p>{{item.row.form.caseNo ? item.row.form.caseNo : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:153px;">审批类别：</p>
                                        <p>
                                            {{item.row.form.auditType ? item.row.form.auditType : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>所属区：</p>
                                        <p>{{item.row.form.area ? item.row.form.area : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>所属区代码：</p>
                                        <p>{{item.row.form.areaCode ? item.row.form.areaCode : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:153px;">行政许可书文号：</p>
                                        <p>
                                            {{item.row.form.docNumber ? item.row.form.docNumber : '无'}}
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:129px;">许可决定日期：</p>
                                        <p>{{item.row.form.startDate ? item.row.form.startDate : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p style="width:129px;">许可截止日期：</p>
                                        <p>{{item.row.form.endDate ? item.row.form.endDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p style="width:153px;">发布时间：</p>
                                        <p>{{item.row.issueDate ? item.row.issueDate : '无'}}</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>当事人：</p>
                                        <p>{{item.row.litigants ? item.row.litigants : '无'}}</p>
                                    </div>
                                </li>
                                <li>
                                    <p style="width:112px;">来源：</p>
                                    <p>{{item.row.source ? item.row.source : '无'}}</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="许可决定日期">
                <template  slot-scope="item">
                    {{item.row.form.startDate}}
                </template>
            </el-table-column>
            <el-table-column prop="name" label="许可事项名称"></el-table-column>
            <el-table-column prop="content" label="许可内容">
                <template slot-scope="item">
                    <span v-html="escape2Html(item.row.content)"></span>
                </template>
            </el-table-column>
            <el-table-column prop="orgName" label="许可机关"></el-table-column>
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

