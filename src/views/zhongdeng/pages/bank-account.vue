<template>
    <div>
        <el-form :inline="true" size="medium" class="el-serach-form">
            <el-form-item>
                <el-input v-model="params.transfer" placeholder="出让人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.transferType" placeholder="出让人类型" clearable>
                    <el-option label="承建单位" value="承建单位"></el-option>
                    <el-option label="供应商" value="供应商"></el-option>
                    <el-option label="保理商" value="保理商"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.account" placeholder="银行账号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.buyer" placeholder="买方"></el-input>
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
            <el-table-column prop="transfer" label="出让人" show-overflow-tooltip :formatter="formatLabel" width="300"></el-table-column>
            <el-table-column prop="transferType" label="出让人类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="cooperateBank" label="合作银行" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="openAccountBank" label="开户行" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="account" label="银行账号" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="buyer" label="买方" show-overflow-tooltip :formatter="formatLabel" width="250"></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.isState===0" type="primary" plain size="small" @click="toAdd(scope)">加入灰名单</el-button>
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
                transfer: "",
                transferType: "",
                account: "",
                buyer: '',
            },
            companyParams: {
                "construction": "",
                "field": "",
                "supplier": ""
            },
            total: 0,
            list: [],
            supplierList: [],
            constructionList: [],
            dateArr: [],
            stateList: [{ label: '未添加', value: 0 }, { label: '已添加', value: 1 }]
        };
    },
    created () {
        this.getList()
    },
    methods: {
        // //模糊查询供应商
        // querySupplier(queryString, cb) {
        //     this.companyParams = {
        //         "construction": "",
        //         "field": 1,
        //         "supplier": queryString
        //     }
        //     this.getCompanyName().then(res => {
        //         let data = res.map(i => {
        //             return {
        //                 value: i
        //             }
        //         })
        //         cb(data)
        //     })
        // },
        // //模糊查询承建单位
        // queryContract(queryString, cb) {
        //     this.companyParams = {
        //         "construction": queryString,
        //         "field": 2,
        //         "supplier": ""
        //     }
        //     this.getCompanyName().then(res => {
        //         let data = res.map(i => {
        //             return {
        //                 value: i
        //             }
        //         })
        //         cb(data)
        //     })
        // },
        //获取供应商 承建单位
        // getCompanyName() {
        //     return new Promise((resolve, reject) => {
        //         this.ajax
        //             .json('/dcp/comm/zdw/account/stats/vague', this.companyParams)
        //             .then(res => {
        //                 resolve(res.data)
        //             }).catch((err) => {
        //                 resolve(err)
        //             });
        //     })

        // },
        toAdd (e) {
            this.$router.push({ name: 'black-white-account', query: { id: "", way: 'add', tabData: JSON.stringify(e.row) } })
        },
        getList () {
            this.ajax
                .json('/dcp/comm/zdw/bank/account/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                transfer: "",
                transferType: "",
                account: "",
                buyer: '',
            }
            this.getList()
        },
        async exportData () {
            await this.ajax
                .json('/dcp/comm/zdw/bank/account/export', this.params, { type: 'export' })
        },
    }
};
</script>