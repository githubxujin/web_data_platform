<template>
    <div class="table-wrap mt20">
         <div class="table-title">OTC目录库</div>
        <el-form :inline="true" size="medium">
            <el-form-item>
                <el-input v-model.trim="params.drugName" placeholder="药品名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.category" placeholder="产品类别" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.category" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.classification" placeholder="OCT分类" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.classification" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.system" placeholder="是否双跨" clearable>
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.treatmentCategories" placeholder="治疗领域" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.treatment_categories" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="initData('search')">查询</el-button>
                <el-button type="info" size="medium" @click="reset">重置</el-button>
            </el-form-item>
            <el-row class='el-iconfont'>
                <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                    <i class='iconfont icon-shujuzhongxin-daochu' @click="exportData"></i>
                </el-tooltip>
            </el-row>
        </el-form>

        <!-- 表格 -->
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="drugName" label="药品名称" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category" label="产品类别" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="dosageForm" label="规格/剂型" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="treatmentCategories" label="治疗领域" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="classification" label="OTC分类" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="system" label="是否双跨" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>

            <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onDetail(scope.row)" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-sizes='[10,20, 50, 100]' @size-change="handleSizeChange" :page-size.sync='params.size' :current-page.sync='params.current' @current-change='initData' layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
        </el-pagination>

    </div>
</template>
<script>
export default {
    components: {
    },
    data() {
        return {
            row: {}, // 当前数据
            list: [],
            column: [],
            total: 0,
            params: {
                current: 1,
                size: 10,
                drugName: '',//药品名称
                category: '',//产品类别
                classification: '',//oct分类
                system: '',//是否双跨
                treatmentCategories: '',//治疗领域
            },
        }
    },
    mounted() {
        this.getSelect();
        this.searchRecord();
    },
    methods: {
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.initData();
        },
        // 获取列表
        async initData() {
            this.$params[this.$route.name] = this.params;
            this.$http(
                '/dcp/drug/otcdir/page/list',
                this.params,
            ).then(res => {
                if (res.code === '200') {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        async getSelect() {
            this.ajax
                .json('/dcp/drug/otcdir/column/list', this.sltparams, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.column = res.data;
                    }
                });
        },
        // 重置
        reset() {
            this.params = {
                current: 1,
                size: 10,
                drugName: '',//药品名称
                category: '',//产品类别
                classification: '',//oct分类
                system: '',//是否双跨
                treatmentCategories: '',//治疗领域
            }
            this.initData();
        },
        // 详情跳转
        onDetail(row) {
            this.$router.push({
                path: '/otc/detail',
                query: {
                    detail: JSON.stringify(row)
                }
            })
        },
        //导出
        async exportData() {
            await this.$http(`/dcp/drug/otcdir/export`, this.params, {
                type: "export"
            });
        },
        handleSizeChange(v) {
            this.params.size = v
            this.initData()
        }
    },

}
</script>

