<template>
    <div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form pt20">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.regional" clearable placeholder="地区" @change="provinceChange">
                    <el-option v-for="(s, index) in regional" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.province" placeholder="省份">
                    <el-option v-for="(s, index) in provinceList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.year" clearable placeholder="年份">
                    <el-option v-for="(s, index) in year" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" @sort-change="sortChange">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="regional" label="地区" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="province" label="省份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="year" label="年份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="generalBudgetRevenue" label="一般预算收入（亿元）" sortable show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="fundBudgetIncome" label="基金预算收入（亿元）" sortable show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="peopleCount" label="人口数量（万人）" sortable show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="perCapitaRevenue" label="人均财政收入（元）" sortable show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0"></el-pagination>

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
            regional: [],
            year: [],
            list: [],
            provinceList: [],
        };
    },
    created() {
        this.regionaltime()
        this.getList()
    },
    methods: {
        // 地区联动省份
        provinceChange(regional) {
            this.$set(this.params,'province','')
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionaltime', { regional }, { type: 'POST' })
                .then(res => {
                    this.provinceList = res.data.cities
                })
        },
        // 排序
        sortChange(column) {
            if (column.order) {
                this.params.orderColumn = column.prop
                this.params.orderWay = column.order === "descending" ? "DESC" : "ASC"
            } else {
                this.params.orderColumn = ""
                this.params.orderWay = ""
            }
            this.getList()
        },
        // 获取大区和年限
        regionaltime() {
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionaltime', {})
                .then(res => {
                    if (res.code === '200') {
                        this.regional = res.data.regional
                        this.year = res.data.year
                    }
                });
        },
        getList() {
            this.ajax
                .json('/dcp/query/provincefiscaldata/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
        }
    }
};
</script>
<style lang="scss" scoped>
    .tishi {
        font-family: PingFangSC-Light;
        margin-top: 0;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 1px;
        line-height: 20px;
        .up-tem {
            color: #449fa8;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    /deep/ .el-message.el-message--info {
        background-color: red;
    }
</style>