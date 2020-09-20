<template>
<!--  土地信息 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>发布时间：</p>
                                    <p>{{item.row.publicDate ? item.row.publicDate : '无'}}</p>
                                </li>
                                <li>
                                    <p>公告类别：</p>
                                    <p>
                                        {{item.row.noticeType ? item.row.noticeType : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>行政区：</p>
                                    <p>{{item.row.area ? item.row.area : '无'}}</p>
                                </li>
                                <li>
                                    <p>地块位置：</p>
                                    <p>
                                        {{item.row.location ? item.row.location : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>土地面积(公顷)：</p>
                                    <p>
                                        {{item.row.landArea ? item.row.landArea : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>成交价格(万元)：</p>
                                    <p>
                                        {{item.row.sellPrice ? item.row.sellPrice : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>电子监管号：</p>
                                    <p>
                                        {{item.row.elecRegulatoryNo ? item.row.elecRegulatoryNo : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>土地级别：</p>
                                    <p>
                                        {{item.row.landClassLevel ? item.row.landClassLevel : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>土地用途：</p>
                                    <p>
                                        {{item.row.landUse ? item.row.landUse : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>供地方式：</p>
                                    <p>
                                        {{item.row.supplyLandWay ? item.row.supplyLandWay : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>批准单位：</p>
                                    <p>
                                        {{item.row.auditOrgName ? item.row.auditOrgName : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>土地使用权人：</p>
                                    <p>
                                        {{item.row.landUser ? item.row.landUser : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>合同签订日期：</p>
                                    <p>
                                        {{item.row.contractDate ? item.row.contractDate : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>约定交地时间：</p>
                                    <p>
                                        {{item.row.deliveryDate ? item.row.deliveryDate : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>约定开工时间：</p>
                                    <p>
                                        {{item.row.agreedStartDate ? item.row.agreedStartDate : '无'}}
                                    </p>
                                </li>
                                <li>
                                    <p>约定竣工时间：</p>
                                    <p>
                                        {{item.row.agreedFinishDate ? item.row.agreedFinishDate : '无'}}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="publicDate" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="noticeType" label="公告类别"></el-table-column>
            <el-table-column prop="area" label="行政区"></el-table-column>
            <el-table-column prop="landUse" label="土地用途"></el-table-column>
            <el-table-column prop="location" label="地块位置"></el-table-column>
            <el-table-column prop="landArea" label="土地面积(公顷)"></el-table-column>
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

