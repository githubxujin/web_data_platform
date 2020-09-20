<template>
    <div class="table-wrap mt10">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="公司名称">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="分子公司名称">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="客户名称">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="药品名称" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="规格" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="批号" style="with: 240px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.page=1,getList()">查询</el-button>
                <el-button type="info" @click="params.page=1,getList()">更新</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop="date" label="公司名称" width="180"></el-table-column>
            <el-table-column prop="name" label="分子公司" width="180"></el-table-column>
            <el-table-column prop="address" label="客户名称" width="300"></el-table-column>
            <el-table-column prop="address" label="药品名称"></el-table-column>
            <el-table-column prop="address" label="规格"></el-table-column>
            <el-table-column prop="address" label="单位"></el-table-column>
            <el-table-column prop="address" label="批号"></el-table-column>
            <el-table-column prop="address" label="有效期" width="300"></el-table-column>
            <el-table-column prop="address" label="库存数量"></el-table-column>
            <el-table-column prop="address" label="生产"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
            layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>

    </div>
</template>
<script>
export default {
    data () {
        return {
            list: [],
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


