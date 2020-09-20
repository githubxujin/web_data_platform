<template>
    <div class="table-wrap mt10">
        <div class="table-title">企业名单列表</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-input v-model="params.channelType" placeholder="请输入企业名称或统一社会信用代码" style="width: 300px"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="行业类别" style="width: 160px;">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="企业类别" style="width: 160px;">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="名单类型" style="width: 160px;">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model='params.channelType' clearable placeholder="审核状态" style="width: 160px;">
                    <el-option label='来源' value='1'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.page=1,getList()">查询</el-button>
                <el-button type="info" @click="params.page=1,getList()">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop="date" label="序号" width="180"></el-table-column>
            <el-table-column prop="name" label="统一社会信用代码" width="180"></el-table-column>
            <el-table-column prop="address" label="企业名称" width="300"></el-table-column>
            <el-table-column prop="address" label="行业类别"></el-table-column>
            <el-table-column prop="address" label="企业类别"></el-table-column>
            <el-table-column prop="address" label="名单类型"></el-table-column>
            <el-table-column prop="address" label="跟进人"></el-table-column>
            <el-table-column prop="address" label="审核状态" width="300"></el-table-column>
            <el-table-column prop="address" label="正面标签"></el-table-column>
            <el-table-column prop="address" label="负面标签"></el-table-column>
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


