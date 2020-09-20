<template>
    <div class="table-wrap">
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item label='统一社会信用码'>
                <el-select v-model='params.channelType' clearable style="width: 200px">
                    <el-option label='业务渠道' value='1'></el-option>
                    <el-option label='资金通道' value='2'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='企业名称'>
                <el-select v-model='params.channelType' clearable style="width: 240px">
                    <el-option label='业务渠道' value='1'></el-option>
                    <el-option label='资金通道' value='2'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='所属集团'>
                <el-select v-model='params.channelType' clearable style="width: 160px">
                    <el-option label='业务渠道' value='1'></el-option>
                    <el-option label='资金通道' value='2'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='企业注册地'>
                <el-select v-model='params.channelType' clearable style="width: 160px">
                    <el-option label='业务渠道' value='1'></el-option>
                    <el-option label='资金通道' value='2'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click='params.page=1,getList()'>查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column prop="date" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="统一社会信用代码" width="180">
            </el-table-column>
            <el-table-column prop="address" label="所属集团">
            </el-table-column>
            <el-table-column prop="address" label="法人">
            </el-table-column>
            <el-table-column prop="address" label="企业注册地">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
            <el-table-column prop="address" label="操作">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
    </div>
</template>

<style lang="scss">
</style>

<script>
export default {
  data() {
    return {
      params: {},
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

