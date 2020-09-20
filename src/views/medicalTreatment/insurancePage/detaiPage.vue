<template>
    <div class="table-wrap mt20">
        <div class="table-title">医保目录库</div>
        <el-form :inline="true" size="medium">
            <el-form-item>
                <el-input v-model.trim="params.goodsName" placeholder="药品名称/通用名" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.drugClass" placeholder="产品类别" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.drug_class" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.healthCare" placeholder="医保类别" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.health_care" :key="index+'a'"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.dosage" placeholder="剂型" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.dosage" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.supplementaryConditions" placeholder="增补情况" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.supplementary_conditions" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.area" placeholder="区域" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in column.area" :key="index"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="medium" @click="params.current=1,initData()">查询</el-button>
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
            <el-table-column prop="goodsName" label="药品名称" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="commonName" label="通用名" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="drugClass" label="产品类别" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>

            <el-table-column prop="dosage" label="剂型" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="bigClass" label="大类" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subclass" label="亚类" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>

            <el-table-column prop="healthCareNo" label="医保编号" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="healthCare" label="医保类别" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="area" label="区域" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="supplementaryConditions" label="增补情况" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="version" label="医保版本" width="100" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>

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
    data() {
        return {
            row: {}, // 当前数据
            list: [],
            total: 0,
            sltparams: {
                column: '',
            },
            column: {},
            params: {
                current: 1,
                size: 10,
                goodsName: '',//通用名
                drugClass: '',//产品类别
                healthCare: '',//医保类别
                dosage: '',//剂型
                supplementaryConditions: '',//增补情况
                area: '',//区域
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
                '/dcp/drug/medical/insurance/page/list',
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
                .json('/dcp/drug/medical/column/list', this.sltparams, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.column = res.data;
                    }
                });
        },
        // 重置
        reset() {
            this.params = {
                goodsName: '',//通用名
                drugClass: '',//产品类别
                healthCare: '',//医保类别
                dosage: '',//剂型
                supplementaryConditions: '',//增补情况
                area: '',//区域
                current: 1,
                size: 10,
            };
            this.initData();
        },
        //详情跳转
        onDetail(row) {
            this.$router.push({
                path: '/insurancePage/detail',
                query: {
                    detail: JSON.stringify(row)
                }
            })
        },
        //导出
        async exportData() {
            await this.$http(`/dcp/drug/medical/insurance/export`, this.params, {
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

<style lang="less" scoped>
</style>