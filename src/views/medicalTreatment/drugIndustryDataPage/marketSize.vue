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
            <el-table-column :formatter="formatLabel" prop="regional" label="地区" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="province" label="省份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="year" label="年份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="totalAmount" label="销售总额（万元）" sortable="custom" show-overflow-tooltip width="160">
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="westernMedicine" label="西药类销售占比" sortable="custom" show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.westernMedicine?scope.row.westernMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="middleMedicine" label="中成药类销售占比" sortable="custom" show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.middleMedicine?scope.row.middleMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="traditionalMedicine" label="中药材销售占比" sortable="custom" show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.traditionalMedicine?scope.row.traditionalMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="enterpriseCount" label="企业总数" width="120" sortable="custom" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="wholesaleEnterpriseNum" label="其中：批发企业数" sortable="custom" show-overflow-tooltip width="160"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="retailEnterpriseNum" label="其中：零售企业数" sortable="custom" show-overflow-tooltip width="160"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>

    </div>
</template>

<script>
import citys from "@/utils/citys.json"
export default {
    data () {
        return {
            citys,
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
    created () {
        this.regionaltime()
        this.getList()
    },
    methods: {
        // 地区联动省份
        provinceChange (regional) {
            this.$set(this.params, 'province', '')
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionaltime', { regional }, { type: 'POST' })
                .then(res => {
                    this.provinceList = res.data.cities
                })
        },
        // 排序
        sortChange (column) {
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
        regionaltime () {
            this.ajax
                .json('/dcp/query/provincialcirculationmarket/regionaltime', {})
                .then(res => {
                    if (res.code === '200') {
                        this.regional = res.data.reg
                        this.year = res.data.year
                    }
                });
        },
        getList () {
            this.ajax
                .json('/dcp/query/provincialcirculationmarket/list', this.params)
                .then(res => {
                    this.list = []
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
        }
    }
};
</script>
