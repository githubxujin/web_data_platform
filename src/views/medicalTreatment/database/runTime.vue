<template>
    <div class="table-wrap mt20">
        <div class="table-title">宏观经济运行</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.project" clearable placeholder="项目" filterable>
                    <el-option v-for="(s, index) in projectList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.specificIndicators" clearable placeholder="具体指标" filterable>
                    <el-option v-for="(s, index) in specificIndicatorsList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.area" clearable placeholder="区域" filterable>
                    <el-option v-for="(s, index) in areaList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="specificIndicators" label="具体指标" show-overflow-tooltip align="left" width="250" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="area" label="区域" show-overflow-tooltip align="left" width="120" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="project" label="项目" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="year2019" label="2019年" show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{numFormat(scope.row.year2019) || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="year2018" label="2018年" show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{numFormat(scope.row.year2018) || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="year2017" label="2017年" show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{numFormat(scope.row.year2017) || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="year2016" label="2016年" show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{numFormat(scope.row.year2016) || '-'}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="toDetail(scope.row.hashid)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            list: [],
            projectList: [],
            specificIndicatorsList: [],
            areaList: [],
        };
    },
    created() {
        this.searchRecord()
        this.projectRemote()
        this.specificIndicatorsRemote()
        this.areaRemote()
    },
    methods: {
        // 项目
        projectRemote() {
            this.ajax
                .json('/dcp/ghgjjyxk/data/vague', { field: 1, project: '' })
                .then(res => {
                    this.projectList = res.data
                })
        },
        // 具体指标
        specificIndicatorsRemote() {
            this.ajax
                .json('/dcp/ghgjjyxk/data/vague', { field: 2, specificIndicators: '' })
                .then(res => {
                    this.specificIndicatorsList = res.data
                })
        },
        // 区域
        areaRemote() {
            this.ajax
                .json('/dcp/ghgjjyxk/data/vague', { field: 3, area: '' })
                .then(res => {
                    this.areaList = res.data
                })
        },
        toDetail(id) {
            this.$router.push({
                path: '/runTime-detail',
                query: { id }
            })
        },
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.getList();
        },
        getList() {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json("/dcp/ghgjjyxk/data/page", {
                    ...this.params
                })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                })
        },
        exportData() {
            this.ajax
                .json("/dcp/ghgjjyxk/data/export", this.params, { type: "export" })
                .then(res => { });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 10,
            }
            this.getList()
        },
    }
};
</script>
<style lang="scss" scoped>
</style>
