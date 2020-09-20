<template>
<!--  招投标 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <!-- <li>
                                    <p>采购品目</p>
                                    <p>{{item.row.caseNumber ? item.row.caseNumber : '无'}}</p>
                                </li> -->
                                <li>
                                    <p>地区：</p>
                                    <p>
                                        {{item.row.area ? item.row.area : '无'}}
                                    </p>
                                </li>
                                <!-- <li>
                                    <p>代理机构</p>
                                    <p>{{item.row.judgmentResult ? item.row.judgmentResult : '无'}}</p>
                                </li> -->
                                <li>
                                    <p>项目详情：</p>
                                    <p>
                                        <el-table :data="item.row.list" border>
                                            <el-table-column label="包/项目名称" prop="packet" width="120"></el-table-column>
                                            <el-table-column label="名字">
                                                <template slot-scope="scope">
                                                    <div v-for="(v,k) in scope.row.zName" :key="k">
                                                        {{v.name}}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="候选人">
                                                <template slot-scope="scope">
                                                    <div v-for="(v,k) in scope.row.hName" :key="k">
                                                        {{v.name}}
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="issueDate" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="noticeType" label="公告类型" width="180"></el-table-column>
            <el-table-column prop="roles" label="身份" width="180"></el-table-column>
            <el-table-column prop="purchaseName" label="采购人" width="180"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
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
        value(val){
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
            this.value.map(d=>{
                this.$set(d,'list',[])
                d.packages.map((v,k)=>{
                    d.list.push({
                        packet: v,
                        zName: d.winningBidderList.filter(c=>c.packet === v),
                        hName: d.candidateList.filter(c=>c.packet === v),
                    })
                })
            })
        }
    }
}
</script>

