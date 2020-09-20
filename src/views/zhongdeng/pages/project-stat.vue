<template>
    <div>
        <div class="app-title mb20">转让项目列表</div>
        <el-form :inline="true" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.projectName" filterable remote clearable placeholder="项目名称" :remote-method="projectNameMethod">
                    <el-option v-for="(item,index) in projectNameList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.construct" filterable remote clearable placeholder="建设单位" :remote-method="constructMethod">
                    <el-option v-for="(item,index) in constructList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.construction" filterable remote clearable placeholder="承建单位" :remote-method="constructionMethod">
                    <el-option v-for="(item,index) in constructionList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.projectType" placeholder="项目类型">
                    <el-option label="房建" :value="2"></el-option>
                    <el-option label="基建" :value="1"></el-option>
                    <el-option label="市政工程" :value="3"></el-option>
                    <el-option label="工业厂房" :value="4"></el-option>
                    <el-option label="商业综合体" :value="5"></el-option>
                    <el-option label="其他" :value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.urban" filterable remote clearable placeholder="城市" :remote-method="urbanMethod">
                    <el-option v-for="(item,index) in urbanList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>

        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="projectName" width="320" label="项目名称" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="construction" width="320" label="承建单位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="projectType" width="100" label="项目类型" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    <span>{{type[scope.row.projectType*1-1]}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="urban" label="城市" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="construct" width="320" label="建设单位" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="transferor" label="资产出让人" width="100" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="assignee" label="资产受让人" width="100" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="transferAmount" label="资产转让价值" show-overflow-tooltip :formatter="formatLabel" width="120"></el-table-column>
            <el-table-column prop="financesAmount" label="融资金额" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="contractNo" width="200" label="合同编号" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="openBank" label="回款账户开户行" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="bankAccount" label="回款账户账号" show-overflow-tooltip :formatter="formatLabel" width="120"></el-table-column>

            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="toDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
        </el-pagination>
    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            params: {
                current: 1,
                size: 10,
            },
            total: 0,
            list: [],
            dateArr: [],
            urbanList: [],
            projectNameList: [],
            constructList: [],
            constructionList: [],
            type: ['基建', '房建', '市政', '工业厂房', '商业综合体', '其他'],
        };
    },
    created() {
        this.getList()
    },
    methods: {
        toDetail(row) {
            this.$router.push({
                path: '/service/zhongdeng/projectListDetail',
                query: { id: row.id, projectName: row.projectName }
            })
        },
        constructionMethod(construction) {
            if (construction !== '') {
                this.ajax
                    .json('/dcp/comm/zdw/project/stats/vague', { field: 4, construction })
                    .then(res => {
                        this.constructionList = res.data
                    })
            } else {
                this.constructionList = [];
            }
        },
        constructMethod(construct) {
            if (construct !== '') {
                this.ajax
                    .json('/dcp/comm/zdw/project/stats/vague', { field: 3, construct })
                    .then(res => {
                        this.constructList = res.data
                    })
            } else {
                this.constructList = [];
            }
        },
        projectNameMethod(projectName) {
            if (projectName !== '') {
                this.ajax
                    .json('/dcp/comm/zdw/project/stats/vague', { field: 1, projectName })
                    .then(res => {
                        res.data = res.data.map(item => {
                            return {
                                'label': item.substring(0, 16) + '...',
                                'value': item,
                            }
                        })
                        this.projectNameList = res.data
                    })
            } else {
                this.projectNameList = [];
            }
        },
        urbanMethod(urban) {
            if (urban !== '') {
                this.ajax
                    .json('/dcp/comm/zdw/project/stats/vague', { field: 2, urban })
                    .then(res => {
                        this.urbanList = res.data
                    })
            } else {
                this.urbanList = [];
            }
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.startDate = '';
            }
        },
        getList() {
            this.ajax
                .json('/dcp/comm/zdw/project/stats/page', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 10,
            }
            this.total = 0
            this.dateArr = []
            this.getList()
        },
        async exportData() {
            await this.ajax
                .json('/dcp/comm/zdw/project/stats/export', this.params, { type: 'export' })
        },
    }
};
</script>
<style lang="scss" scoped>
    .app-title {
        margin-top: 30px;
    }
</style>