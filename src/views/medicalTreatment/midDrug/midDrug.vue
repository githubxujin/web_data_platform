<template>
    <div class="table-wrap mt20">
        <div class="table-title">MID药品目录库</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.chineseName" clearable placeholder="药品名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.productCategory" clearable placeholder="产品类别">
                    <el-option v-for="(item,index) in productList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.dosageForm" clearable placeholder="剂型">
                    <el-option v-for="(item,index) in dosageList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.categories" clearable placeholder="治疗领域">
                    <el-option v-for="(item,index) in categoriesList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.importDomestic" clearable placeholder="进口国产">
                    <el-option label="进口" value="进口"></el-option>
                    <el-option label="国产" value="国产"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.healthClassification" clearable placeholder="医保情况">
                    <el-option v-for="(item,index) in healthList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.basicMedicine" clearable placeholder="是否基药">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.is289" clearable placeholder="是否289品种">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.isConsistencyEvaluationVariety" clearable placeholder="一致性评价品种">
                    <el-option v-for="(item,index) in consistencyList" :key="index" :label="item" :value="item"></el-option>
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
            <el-table-column prop="chineseName" label="药品名称" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="productCategory" label="产品类别" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="dosageForm" label="剂型" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="specification" label="规格" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="categories" label="大类" width="200" show-overflow-tooltip align="left" header-align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="subclass" label="亚类" width="200" show-overflow-tooltip align="left" header-align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="importDomestic" label="进口国产" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="healthClassification" label="医保情况" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="basicMedicine" label="是否基药" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="is289" label="是否289品种" show-overflow-tooltip align="left" :formatter="formatLabel" width="120"></el-table-column>
            <el-table-column prop="isConsistencyEvaluationVariety" label="一致性评价品种" show-overflow-tooltip align="left" :formatter="formatLabel" width="120"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="$router.push({path: '/midDrug-detail',query: {id:scope.row.id}})">详情</el-button>
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
            categoriesList: [],
            dosageList: [],
            productList: [],
            healthList: [],
            consistencyList: [],
        }
    },
    created() {
        this.searchRecord()
        this.columnClass()
    },
    methods: {
        columnClass() {
            this.ajax
                .json('/dcp/drug/middle/column/list', {}, { type: 'get' })
                .then(res => {
                    this.categoriesList = res.data.categories // 大类/治疗领域
                    this.dosageList = res.data.dosage_form  // 剂型
                    this.productList = res.data.product_category // 产品类别
                    this.healthList = res.data.health_classification // 医保情况
                    this.consistencyList = res.data.is_consistency_evaluation_variety // 一致性评价品种
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
                .json('/dcp/drug/middle/page/list', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                })
        },
        reSet() {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
        },
        exportData() {
            this.ajax
                .json("/dcp/drug/middle/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
    },
}
</script>
