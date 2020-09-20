<template>
    <div class="table-wrap mt20">
        <div class="table-title">药品招投标库</div>

        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.drugGoodsName" clearable placeholder="药品名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.productionCompany" clearable placeholder="生产企业"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.dosageForm" clearable placeholder="剂型">
                    <el-option v-for="(item,index) in dosageList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" clearable placeholder="一级剂型">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" clearable placeholder="二级剂型">
                    <el-option v-for="(item,index) in bankTailNoList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.deliveryWay" clearable placeholder="用药途径">
                    <el-option v-for="(item,index) in deliveryList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.winningProvinces" clearable placeholder="区域">
                    <el-option v-for="(item,index) in winningList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.priceAttribute" clearable placeholder="价格属性">
                    <el-option v-for="(item,index) in priceList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.subjectMatterSituation" clearable placeholder="执行情况">
                    <el-option v-for="(item,index) in subjectList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker start-placeholder='中标日期开始' end-placeholder='中标日期结束' v-model="dateArr" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.specifications" clearable placeholder="规格"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.publicFile" clearable placeholder="公布文件"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.qualityLevel" clearable placeholder="带量采购品种">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
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
            <el-table-column prop="drugGoodsName" label="药品名称" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="specifications" label="规格" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="dosageForm" label="剂型" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="winningProvinces" label="中标省份" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="tenderPrice" label="价格" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="conversionRatio" label="转换比" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="winningTime" label="中标日期" show-overflow-tooltip align="left" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="productionCompany" label="生产企业" show-overflow-tooltip align="left" width="200" :formatter="formatLabel"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="$router.push({path:'/tenderDatabase-detail', query:{id:scope.row.id}})">详情</el-button>
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
            dateArr: [],
            params: {
                current: 1,
                size: 10,
                startWinningTime: "",
                endWinningTime: ""
            },
            total: 0,
            list: [],
            deliveryList: [],
            dosageList: [],
            priceList: [],
            subjectList: [],
            winningList: [],
        }
    },
    created() {
        this.searchRecord()
        this.column()
    },
    methods: {
        column() {
            this.ajax
                .json('/dcp/drug/bidding/column/list', {}, { type: 'get' })
                .then(res => {
                    this.deliveryList = res.data.delivery_way // 用药途径
                    this.dosageList = res.data.dosage_form // 剂型
                    this.priceList = res.data.price_attribute // 价格属性
                    this.subjectList = res.data.subject_matter_situation // 执行情况
                    this.winningList = res.data.winning_provinces // 区域
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
                .json('/dcp/drug/bidding/page/list', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                })
        },
        reSet() {
            this.dateArr = []
            this.params = {
                current: 1,
                size: 10,
                startWinningTime: "",
                endWinningTime: ""
            }
            this.getList()
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.startWinningTime = v[0];
                this.params.endWinningTime = v[1];
            } else {
                this.params.startWinningTime = "";
                this.params.endWinningTime = "";
            }
        },
        exportData() {
            this.ajax
                .json("/dcp/drug/bidding/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
    },
}
</script>
