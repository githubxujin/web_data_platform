<template>
    <!--  专利 -->
    <el-table :data="value" style="width: 100%" ref="refTable" border @row-click="rowClick">
        <el-table-column type="expand">
            <template slot-scope="item">
                <el-form label-position="left" inline class="demo-table-expand">
                    <div class="expand-in">
                        <ul>
                            <li>
                                <div class="pull-down">
                                    <p>专利名称：</p>
                                    <p>{{item.row.inventName?item.row.inventName:'无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p>专利类型：</p>
                                    <p>{{item.row.patentType ? item.row.patentType : '无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p>申请号：</p>
                                    <p>{{item.row.applyNo?item.row.applyNo:'无'}}</p>
                                </div>
                            </li>
                            <li>
                                <div class="pull-down">
                                    <p>国际分类：</p>
                                    <p>{{item.row.internationalType?item.row.internationalType:'无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p>发明人：</p>
                                    <p>{{item.row.inventor?item.row.inventor:'无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p>申请日：</p>
                                    <p>{{item.row.applyDate?item.row.applyDate:'无'}}</p>
                                </div>
                            </li>
                            <li>
                                <div class="pull-down">
                                    <p>专利权人：</p>
                                    <p>{{item.row.patentHolder ? item.row.patentHolder : '无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p style="width:129px;">专利代理机构：</p>
                                    <p>{{item.row.proxyOrgName ? item.row.proxyOrgName : '无'}}</p>
                                </div>
                                <div class="pull-down">
                                    <p>地址：</p>
                                    <p>{{item.row.address?item.row.address:'无'}}</p>
                                </div>
                            </li>
                            <li>
                                <p style="width:113px;">摘要：</p>
                                <p>{{item.row.remark?item.row.remark:'无'}}</p>
                            </li>
                        </ul>
                    </div>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="publicDate" label="公告日期" width="120"></el-table-column>
        <el-table-column prop="inventName" label="专利名称"></el-table-column>
        <el-table-column prop="patentType" label="专利类型" width="200"></el-table-column>
    </el-table>
</template>
<script>
export default {
    props: ['value'],
    data() {
        return {
            getIndex: 0
        }
    },
    mounted() {
        console.log(111111, this.value)
    },
    methods: {
        rowClick(row, index, e) {
            // 展开/收缩切换
            this.$refs.refTable.toggleRowExpansion(row)
        },
        getDate(row) {
            let field = ['noticeDate', 'declassifiedNoticeDate', 'authorizationNoticeDate', 'verificationNoticeDate', 'publicDate', 'applyDate']
            for (let i = 0; i < field.length; i++) {
                if (row[field[i]]) {
                    return row[field[i]]
                }
            }
        }
    }
}
</script>

