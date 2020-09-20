<template>
    <div class="table-wrap mt20">
        <div class="table-title">参比药物及上市药物</div>
        <el-form :inline="true" size="medium">
            <el-form-item>
                <el-input v-model.trim="params.breedName" placeholder="药品名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model.trim="params.declarationContact" placeholder="申报厂家" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model.trim="params.recordNo" placeholder="备案号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.category" placeholder="申报类别" clearable>
                    <el-option :label="item" :value="item" v-for="(item,index) in category" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.referenceDosage" placeholder="是否参比制剂" clearable>
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.note" placeholder="收录类别" clearable>
                    <el-option :label="item.name" :value="item.value" v-for="(item,index) in column" :key="index"></el-option>
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
            <el-table-column prop="breedName" label="药品名称" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="declarationContact" label="申报厂家" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="category" label="申报类别" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="varietiesSize" label="拟评价品种规格" width="120" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="referencePreparationName" label="参比制剂名称" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="specifications" label="参比规格" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="listingPermitHolder" label="持证商" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="manufacturers" label="生产厂商" align="left" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onDetail(scope.row)" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-sizes='[10,20, 50, 100]' @size-change="handleSizeChange" :page-size.sync='params.size' :current-page.sync='params.current' @current-change='initData'
            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
        </el-pagination>
    </div>
</template>
<script>
export default {
    components: {
    },
    data () {
        return {
            row: {}, // 当前数据
            list: [],
            total: 0,
            category: [],
            column: [],
            params: {
                current: 1,
                size: 10,
                breedName: '',//药品名称
                declarationContact: '',//申报厂家
                recordNo: '',//备案号
                category: '',//申报类别
                referenceDosage: '',//是否参比制剂
                note: '',//收录类别
            },
        }
    },
    mounted () {
        this.getSelect();
        this.searchRecord();
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.initData();
        },
        // 获取列表
        async initData (type) {
            this.$params[this.$route.name] = this.params;
            this.$http(
                '/dcp/drug/reference/page/list',
                this.params,
            ).then(res => {
                if (res.code === '200') {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        async getSelect () {
            this.ajax
                .json('/dcp/drug/reference/column/list', this.sltparams, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.category = res.data.category;
                        this.column = res.data.note.map(item => {
                            return {
                                name: item.length > 10 ? item.substring(0, 10) + '...' : item,
                                value: item,
                            }
                        })
                    }
                });
        },
        // 重置
        reset () {
            this.params = {
                current: 1,
                size: 10,
                breedName: '',//药品名称
                declarationContact: '',//申报厂家
                recordNo: '',//备案号
                category: '',//申报类别
                referenceDosage: '',//是否参比制剂
                note: '',//收录类别
            }
            this.initData();
        },
        // 详情跳转
        onDetail (row) {
            this.$router.push({
                path: '/drugs/detail',
                query: {
                    detail: JSON.stringify(row)
                }
            })
        },
        //导出
        async exportData () {
            await this.$http(`/dcp/drug/reference/export`, this.params, {
                type: "export"
            });
        },
        handleSizeChange (v) {
            this.params.size = v
            this.initData()
        }
    },
    filters: {
    }
}
</script>

<style lang="less" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>