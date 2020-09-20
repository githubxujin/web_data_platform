<template>
<!-- 税务非正常户 -->
     <el-table :data="value" style="width: 100%" ref="refTable" border  @row-click="rowClick">
             <el-table-column type="expand">
                <template slot-scope="">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="expand-in">
                            <ul>
                                <li>
                                    <p>工商登记证号：</p>
                                    <p>无</p>
                                </li>
                                <li>
                                    <p>地区代码：</p>
                                    <p>
                                        无
                                    </p>
                                </li>
                                <li>
                                    <p>备注：</p>
                                    <p>无</p>
                                </li>
                                <li>
                                    <p>审批类别：</p>
                                    <p>无</p>
                                </li>
                            </ul>
                        </div>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="companyName" label="企业名称"></el-table-column>
            <el-table-column prop="issueTerm" label="发布期"></el-table-column>
            <el-table-column prop="faRen" label="法定代表人"></el-table-column>
            <el-table-column prop="taxOrgName" label="税务机关"></el-table-column>
            <el-table-column prop="address" label="经营地址"></el-table-column>
            <el-table-column prop="decideTime" label="认定时间"></el-table-column>
            <el-table-column prop="identifyNumber" label="识别号"></el-table-column>
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

