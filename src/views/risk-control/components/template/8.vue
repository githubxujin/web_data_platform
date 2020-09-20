<template>
<!-- 股权出质 -->
     <el-table :data="value" border style="width: 100%" ref="refTable" @row-click="rowClick">
                <el-table-column type="expand">
                    <template slot-scope="item">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <div class="expand-in">
                                <ul>
                                    <li>
                                        <div class="pull-down">
                                            <p>发布时间：</p>
                                            <p>{{item.row.issueDate}}</p>
                                        </div>
                                        <div class="pull-down">
                                            <p style="width:150px;">出质股权数额：</p>
                                            <p>{{item.row.pledgeStockAmount}}</p>
                                        </div>
                                        <div class="pull-down">
                                            <p>登记编号：</p>
                                            <p>{{item.row.checkInNumber}}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="pull-down">
                                            <p>备注：</p>
                                            <p>{{item.row.remark}}</p>
                                        </div>
                                        <div class="pull-down">
                                            <p>注销原因：</p>
                                            <p>{{item.row.logoutReason}}</p>
                                        </div>
                                            <div class="pull-down">
                                            <p>注销日期：</p>
                                            <p>{{item.row.logoutDate}}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="pull-down">
                                            <p>登记日期：</p>
                                            <p>{{item.row.checkInDate}}</p>
                                        </div>
                                        <div class="pull-down">
                                            <p>登记种类：</p>
                                            <p>{{item.row.checkInType}}</p>
                                        </div>
                                        <div class="pull-down">
                                            <p>状态：</p>
                                            <p>{{item.row.status}}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <p>当事人：</p>
                                        <p style="margin:11px 0 0 -12px;">
                                            <el-table :data="item.row.arr" border>
                                                <el-table-column prop="name" label="角色" width="300">
                                                </el-table-column>
                                                <el-table-column prop="value" label="名字">
                                                </el-table-column>
                                            </el-table>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="序号" type="index" width="200"></el-table-column> -->
                <el-table-column prop="issueDate" label="发布时间"></el-table-column>
                <el-table-column prop="pledgeStockAmount" label="出质股权数额" align="right"></el-table-column>
                <el-table-column prop="pledgeeName" label="质权人"></el-table-column>
                <el-table-column prop="status" label="状态"></el-table-column>
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
    watch:{
        value(){
            this.setData()
        }
    },
    mounted(){
        console.log(111111,this.value)
        this.setData()
    },
    methods:{
        rowClick (row, index, e) {
            // 展开/收缩切换
            this.$refs.refTable.toggleRowExpansion(row)
        },

        setData(){
            this.value.forEach(v => {
                v.arr = []
                v.arr.push(
                    {
                        name: '出质人',
                        value: v.pledgorName
                    },
                    {
                        name: '出质标的',
                        value: v.pledgeTarget
                    },
                    {
                        name: '质权人',
                        value: v.pledgeeName
                    }
                )
            })
        }
    }
}
</script>

