<template>
    <div class="table-wrap mt10">
        <div class="table-title">钢材价格-价格数据明细-网价</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="来源">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item l>
                <el-date-picker v-model="params.returnTimeStart" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" style="width:150px"></el-date-picker>
                <span class="el-date">至</span>
                <el-date-picker v-model="params.returnTimeEnd" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期" style="width:150px"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="材料编码" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="材料名称" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="规格型号" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.page=1,getList()">查询</el-button>
                <el-button type="info" @click="params.page=1,getList()">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop="date" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="来源" width="180"></el-table-column>
            <el-table-column prop="address" label="材料编码/定额代码" width="300"></el-table-column>
            <el-table-column prop="address" label="材料名称"></el-table-column>
            <el-table-column prop="address" label="规格型号"></el-table-column>
            <el-table-column prop="address" label="单位"></el-table-column>
            <el-table-column prop="address" label="基价"></el-table-column>
            <el-table-column prop="address" label="信息价(不含税)/税前综合价" width="300"></el-table-column>
            <el-table-column prop="address" label="日期"></el-table-column>
            <el-table-column prop="address" label="备注"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>

    </div>
</template>
<script>
export default {
    data () {
        return {
            params: {},
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        };
    },
    methods: {
        handleSizeChange (val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange (val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>


