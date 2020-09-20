<template>
    <div>
        <el-form :inline="true" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.certNo" clearable placeholder="登记证明编号" class="el-item-form-width" filterable remote :remote-method="queryCertNo">
                    <el-option v-for="(s, index) in certNoList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="width:350px;">
                <el-date-picker v-model="dateArr" start-placeholder='登记开始时间' end-placeholder='登记结束时间' type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.fileType" clearable placeholder="登记类型" class=" el-item-form-width">
                    <el-option label="初始登记" value="初始登记"></el-option>
                    <el-option label="变更登记" value="变更登记"></el-option>
                    <el-option label="注销登记" value="注销登记"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.formUserName" :remote-method="queryFormUserName" clearable placeholder="填表人" class="el-item-form-width" filterable remote>
                    <el-option v-for="(s, index) in formUserNameList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.transferor" :remote-method="queryTransferor" clearable placeholder="出让人" class="el-item-form-width" filterable remote>
                    <el-option v-for="(s, index) in transferorList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.buyerName" :remote-method="queryBuyerName" clearable placeholder="受让人" class="el-item-form-width" filterable remote>
                    <el-option v-for="(s, index) in buyerNameList" :label="s" :value="s" :key="index"></el-option>
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
            <el-table-column prop="certNo" label="登记证明编号" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="relatedCertNo" label="关联的初始登记编号" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="certStartDate" label="登记时间" show-overflow-tooltip :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="certEndDate" label="登记到日期" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="fileType" label="登记类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="formUserName" label="填表人" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="transferor" label="出让人名称" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="buyerName" label="受让人名称" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="secondCompany" label="受让人二级单位" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="firstCompany" label="受让人一级单位" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="financingContractCurrency" label="融资合同币种" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="financingAmount" label="融资金额" width="100" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="assetCurrency" label="转让财产币种" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="assetValue" label="转让财产价值" width="120" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center" header-align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="toDetail(scope.row.id)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
    </div>
</template>
<script>
export default {
    components: {},
    data () {
        return {
            params: {
                current: 1,
                size: 10,
            },
            total: 0,
            list: [],
            dateArr: [],
            certNoList: [],
            formUserNameList: [],
            transferorList: [],
            buyerNameList: [],
            field: '',
            buyerName: '',
            certNo: '',
            formUserName: '',
            transferor: '',
        };
    },
    created () {
        this.getList()
    },
    methods: {
        toDetail (id) {
            this.$router.push({
                name: 'zhongdeng-index-detail',
                query: { id }
            })
        },
        queryCertNo (val) {
            this.field = 1
            this.vague({ certNo: val })
        },
        queryFormUserName (val) {
            this.field = 2
            this.vague({ formUserName: val })
        },
        queryTransferor (val) {
            this.field = 3
            this.vague({ transferor: val })
        },
        queryBuyerName (val) {
            this.field = 4
            this.vague({ buyerName: val })
        },
        vague (params) {
            this.ajax
                .json('/dcp/asset/cert/info/spider/vague', {
                    field: this.field,
                    ...params
                })
                .then(res => {
                    if (this.field === 1) {
                        this.certNoList = res.data
                    }
                    else if (this.field === 2) {
                        this.formUserNameList = res.data
                    }
                    else if (this.field === 3) {
                         res.data = res.data.map(item=>{
                             return {
                                 'label':item.substring(0,16)+'...',
                                 'value':item,
                             }
                         })
                        this.transferorList = res.data
                    }
                    else if (this.field === 4) {
                        this.buyerNameList = res.data
                    }
                });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.endDate = '';
            }
        },
        getList () {
            this.ajax
                .json('/dcp/asset/cert/info/spider/page', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                })
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                startDate: '',
                endDate: ''
            }
            this.total = 0
            this.dateArr = []
            this.getList()
        },
        async exportData () {
            await this.ajax
                .json('/dcp/asset/cert/info/spider/export', this.params, { type: 'export' })
        },
    }
};
</script>