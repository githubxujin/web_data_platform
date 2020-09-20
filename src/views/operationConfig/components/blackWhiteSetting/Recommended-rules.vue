<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.phone" clearable placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params" clearable placeholder="状态">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="启动" :value="0"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params" clearable placeholder="推荐名单主体">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="企业名单" :value="0"></el-option>
                    <el-option label="账号名单" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params" clearable placeholder="推荐名单类型">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option label="白名单" :value="0"></el-option>
                    <el-option label="黑名单" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 新增 -->
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
        </el-row>
        <!-- 表单 -->
        <el-table :data="list" border @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="value" width="40"></el-table-column>
            <el-table-column type="value" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="value" label="规则名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="value" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="value" label="条件主体" show-overflow-tooltip></el-table-column>
            <el-table-column prop="value" label="推荐名单主体" show-overflow-tooltip></el-table-column>
            <el-table-column prop="value" label="推荐名单类型" show-overflow-tooltip width="120"></el-table-column>
            <el-table-column prop="value" label="更新人" show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="blue" plain size="small" @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button type="primary" plain size="small" @click="detail(scope.row.id)">详情</el-button>
                    <el-button type="primary" plain size="small" @click="toCopy(scope.row.id)">复制</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                current: 1,
                size: 10
            }
        }
    },
    methods: {
        getList() { },
        reSet() { },
        toAdd() { },
        toCopy() { },
    }
}
</script>

<style lang="scss" scoped>
</style>
