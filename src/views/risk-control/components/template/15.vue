<template>
<!-- 担保 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <div class="pull-down">
                                        <p>是否关联担保：</p>
                                        <p>无</p>
                                    </div>
                                    <div class="pull-down">
                                        <p>担保类型：</p>
                                        <p>
                                            无
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>报告期：</p>
                                        <p>无</p>
                                    </div>
                                </li>
                                <li>
                                    <div class="pull-down">
                                        <p>报告类型：</p>
                                        <p>
                                            无
                                        </p>
                                    </div>
                                    <div class="pull-down">
                                        <p>公告日期：</p>
                                        <p>无</p>
                                    </div>
                                </li>
                                <li>
                                    <p>当事人：</p>
                                    <p style="margin-top: 10px;">
                                        <el-table :data="item.row.litigantList" style="width: 100%" border>
                                            <el-table-column prop="role" label="角色">
                                            </el-table-column>
                                            <el-table-column prop="name" label="名字">
                                            </el-table-column>
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
            <el-table-column prop="eventTime" label="交易日期"></el-table-column>
            <el-table-column prop="guaranteeParty" label="担保方"></el-table-column>
            <el-table-column prop="securedParty" label="被担保方"></el-table-column>
            <el-table-column prop="guaranteeAmount" label="担保金额" ></el-table-column>
            <el-table-column prop="guaranteeTerm" label="担保起止日期" min-width="200px"></el-table-column>
            <el-table-column prop="finishFlag" label="是否履行完毕"></el-table-column>
            <el-table-column prop="noticeParty" label="公告人"></el-table-column>
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

