<template>
    <div class="table-wrap mt20 mb20">
        <div class="table-title">保理公司库</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.companyName" clearable placeholder="企业名称" filterable remote :remote-method="companyNameRemote">
                    <el-option v-for="(s, index) in companyNameList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.operatingStatus" clearable placeholder="经营状态">
                    <el-option v-for="(s, index) in operatingStatusList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.socialCreditCode" clearable placeholder="统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.registeredCapital" clearable placeholder="注册资本">
                    <el-option v-for="(s, index) in fundList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.companyType" clearable placeholder="企业类型">
                    <el-option v-for="(s, index) in companyTypeList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.province" clearable placeholder="所在省份" @change="provinceChange">
                    <el-option v-for="(s, index) in provinceList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.city" clearable placeholder="所在城市">
                    <el-option v-for="(s, index) in cityList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.rosterType" clearable placeholder="名单类型">
                    <el-option label="白名单" :value="1"></el-option>
                    <el-option label="黑名单" :value="2"></el-option>
                    <el-option label="灰名单" :value="3"></el-option>
                    <el-option label="待定名单" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu mr20" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="companyName" label="企业名称" width="260" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="operatingStatus" label="经营状态" width="80" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="socialCreditCode" label="统一社会信用代码" show-overflow-tooltip :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="registeredCapital" label="注册资本(万元)" width="140" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{(scope.row.registeredCapital&&scope.row.registeredCapital!==0)?scope.row.registeredCapital+'万元人民币':'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="companyType" label="企业类型" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="registeredTime" label="成立日期" width="140" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="province" label="所属省份" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="city" label="所属城市" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="rosterType" label="名单类型" show-overflow-tooltip :formatter="rosterTypeFormat"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="lookOver(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            isDialog: false,
            file: [],
            fundList: [
                {
                    label: '3000万元以下',
                    value: 0
                },
                {
                    label: '3000-10000万元',
                    value: 1
                },
                {
                    label: '10000-30000万元',
                    value: 2
                },
                {
                    label: '30000-60000万元',
                    value: 3
                },
                {
                    label: '60000万元以上',
                    value: 4
                },
            ],
            companyTypeList: [],
            operatingStatusList: [],
            provinceList: [],
            cityList: [],
            companyNameList: []
        }
    },
    created() {
        this.searchRecord()
        this.filtercondition()
        this.provinceandcity()
    },
    methods: {
        companyNameRemote(companyName) {
            if (companyName !== '') {
                this.ajax
                    .json('/dcp/query/factoringcompany/match', {companyName},{type:'POST'})
                    .then(res => {
                        this.companyNameList = res.data
                    })
            } else {
                this.companyNameList = [];
            }
        },
        rosterTypeFormat(row, column, cellValue, index) {
            switch (cellValue) {
                case 1:
                    return '白名单'
                case 2:
                    return '黑名单'
                case 3:
                    return '灰名单'
                case 0:
                    return '待定名单'
                default:
                    return '-'
            }
        },
        // 经营状态和企业类型
        filtercondition() {
            this.ajax
                .json('/dcp/query/factoringcompany/filtercondition', {})
                .then(res => {
                    this.companyTypeList = res.data.companyType
                    this.operatingStatusList = res.data.operatingStatus
                });
        },
        // 获取省市数据
        provinceandcity(province) {
            this.ajax
                .json('/dcp/query/factoringcompany/provinceandcity', { province }, { type: 'POST' })
                .then(res => {
                    if (!province) {
                        this.provinceList = res.data
                    } else {
                        this.cityList = res.data
                    }
                });
        },
        // 省改变事件
        provinceChange(v) {
            if (!v) this.cityList = []
            this.$set(this.params, 'city', '')
            this.provinceandcity(v)
        },
        // 首次加载
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList() {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/dcp/query/factoringcompany/list', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                });
        },
        // 重置
        reSet() {
            this.params = {
                current: 1,
                size: 10
            }
            this.total = 0
            this.getList()
        },
        // 详情
        lookOver(row) {
            this.$router.push({
                name: 'financing/detail',
                query: { id: row.id, companyName: row.companyName }
            })
        },
        // 导出
        exportData() {
            this.ajax
                .json("/dcp/query/factoringcompany/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        }
    },
}
</script>
