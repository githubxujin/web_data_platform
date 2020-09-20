<template>
    <div class="pt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item>
                <el-date-picker v-model='value1' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至'></el-date-picker>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params' @change='catalogChange' clearable placeholder='填表人归档号'>
                    <el-option v-for='(s,index) in typeList' :label='s.name' :value='s.name' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params' clearable placeholder='登记种类'>
                    <el-option v-for='(s,index) in speclist' :label='s.value' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params' clearable placeholder='申请流水'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params' clearable placeholder='出质人/出让人名称'></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params' @change='catalogChange' clearable placeholder='交易类型'>
                    <el-option v-for='(s,index) in typeList' :label='s.name' :value='s.name' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params' @change='catalogChange' clearable placeholder='登记状态'>
                    <el-option v-for='(s,index) in typeList' :label='s.name' :value='s.name' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model='params' clearable placeholder='出质人/受让人名称'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click='getList'>查询</el-button>
                <el-button class='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='list' border>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='name' label='填表人归档号' show-overflow-tooltip align='center'></el-table-column>
            <el-table-column prop='idCard' label='登记种类' show-overflow-tooltip></el-table-column>
            <el-table-column prop='type' label='申请流水号' show-overflow-tooltip></el-table-column>
            <el-table-column prop='number' label='出质人/受让人名称' show-overflow-tooltip> </el-table-column>
            <el-table-column prop='profession' label='交易类型' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='登记状态' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='质权人/受让人名称' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='质押类型' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='中登网用户名' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='操作者' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='操作时间' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='更新者' show-overflow-tooltip></el-table-column>
            <el-table-column prop='profession' label='更新时间' show-overflow-tooltip></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {};
    },
    methods: {
        getList() { },
        reSet() { },
    }
};
</script>