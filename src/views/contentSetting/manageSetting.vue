<template>
    <div class="stat">
        <div class="table-wrap mt20 mb30">
            <div class="table-title">商业公司库更新</div>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <!-- 商业公司库数据明细 -->
                <el-tab-pane label="商业公司库" name="first">
                    <div class=" pt20">
                        <el-form :inline="true" ref="form0" size="medium">
                            <el-form-item class="el-item-form-width">
                                <el-input v-model="params0.companyName" clearable placeholder="企业名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="params0.businessStatus" clearable placeholder="工商状态">
                                    <el-option v-for="(item,index) in businessStatusList" :key="index" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="el-item-form-width">
                                <el-input v-model="params0.registration" clearable placeholder="注册地"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="params0.companyType" clearable placeholder="企业类型">
                                    <el-option v-for="(item,index) in companyTypeList" :key="index" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getList0">查询</el-button>
                                <el-button type="info" @click="reSet0">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 导出功能 -->
                        <el-row class="el-iconfont">
                            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="$router.push({path:'/nomarketSitting/nomarketManageNew',query:{isMarket:'0'}})"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport0"></span>
                            </el-tooltip>
                        </el-row>
                        <el-table :data="list0" style="width: 100%">
                            <el-table-column prop label="序号" width="70" align="center">
                                <template slot-scope="item">{{ item.$index + 1 }}</template>
                            </el-table-column>
                            <el-table-column :formatter="formatLabel" prop="companyName" label="企业名称" min-width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="businessStatus" label="工商状态" min-width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="registration" label="注册地" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="companyType" label="企业类型" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="startDate" label="企业开始经营时间" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="businessYear" label="企业经营年份" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="revenueScale" label="营收规模" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="follower" label="跟进人" width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop label="操作" align="center" width="160" fixed="right">
                                <template slot-scope="props">
                                    <el-button type="primary" plain @click.stop="$router.push({path:'/operation/businessDetails',query:{companyId:props.row.id,companyName:props.row.companyName}})">详情</el-button>
                                    <el-button type="info" plain @click.stop="$router.push({path:'/nomarketSitting/nomarketManageRes',query:{companyId:props.row.id,companyName:props.row.companyName,isMarket:'0'}})">编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params0.size" @size-change="getList0" :current-page.sync="params0.current" @current-change="getList0"
                            layout="total, sizes, prev, pager, next, jumper" :total="total0" v-if="total0 > 0">
                        </el-pagination>
                    </div>
                </el-tab-pane>

                <!-- 上市商业公司库 -->
                <el-tab-pane label="上市商业公司库" name="last">
                    <div class=" pt20">
                        <el-form :inline="true" ref="form1" size="medium">
                            <el-form-item class="el-item-form-width">
                                <el-input v-model="params1.companyName" clearable placeholder="企业名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="params1.businessStatus" clearable placeholder="工商状态">
                                    <el-option v-for="(item,index) in businessStatusList" :key="index" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="el-item-form-width">
                                <el-input v-model="params1.registration" clearable placeholder="注册地"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-select v-model="params1.companyType" clearable placeholder="企业类型">
                                    <el-option v-for="(item,index) in companyTypeList" :key="index" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="getList1">查询</el-button>
                                <el-button type="info" @click="reSet1">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <!-- 导出功能 -->
                        <el-row class="el-iconfont">
                            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="$router.push({path:'/nomarketSitting/nomarketManageNew',query:{isMarket:'1'}})"></i>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport1"></span>
                            </el-tooltip>
                        </el-row>
                        <el-table :data="list1" style="width: 100%">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="companyName" label="企业名称" min-width="180" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="stockSymbol" label="股票代码" min-width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="businessStatus" label="工商状态" min-width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="registration" label="注册地" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="companyType" label="企业类型" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="startDate" label="企业开始经营时间" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="businessYear" label="企业经营年份" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column :formatter="formatLabel" prop="revenueScale" label="营收规模" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column prop label="操作" align="center" width="160" fixed="right">
                                <template slot-scope="props">
                                    <el-button type="primary" plain
                                        @click.stop="$router.push({path:'/operation/businessDetails',query:{companyId:props.row.id,companyName:props.row.companyName,stockSymbol:props.row.stockSymbol}})">详情</el-button>
                                    <el-button type="info" plain @click.stop="$router.push({path:'/nomarketSitting/nomarketManageRes',query:{companyId:props.row.id,companyName:props.row.companyName,isMarket:'1'}})">编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params1.size" @size-change="getList1" :current-page.sync="params1.current" @current-change="getList1"
                            layout="total, sizes, prev, pager, next, jumper" :total="total1" v-if="total1 > 0">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { setSession, getSession } from "@/config/utils"
export default {
    data () {
        return {
            isAdd: false,
            activeName: 'first',
            list0: [],
            list1: [],
            params0: {
                current: 1,
                size: 10,
                isMarket: 0
            },
            params1: {
                current: 1,
                size: 10,
                isMarket: 1
            },
            total0: 0,
            total1: 0,
            businessStatusList: [],
            companyTypeList: []
        };
    },
    created () {
        this.activeName = getSession(this.$route.name) || 'first'
        this.businessStatus()
        this.companyType()
        this.searchRecord0()
        this.searchRecord1()
    },
    methods: {
        // 面包屑返回
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        },
        //工商状态下拉框
        businessStatus () {
            this.ajax
                .json('/dcp/query/drug/company/status/list', {}, { type: 'get' })
                .then(res => {
                    if (res.code === "200") this.businessStatusList = res.data
                });
        },
        //企业类型下拉框
        companyType () {
            this.ajax
                .json('/dcp/query/drug/company/type/list', {}, { type: 'get' })
                .then(res => {
                    if (res.code === "200") this.companyTypeList = res.data
                });
        },
        searchRecord0 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '0'])) {
                this.params0 = this.$params[this.$route.name + '0']
            }
            this.getList0();
        },
        getList0 () {
            this.$params[this.$route.name + '0'] = this.params0
            this.ajax
                .json('/dcp/query/drug/company/page/list', this.params0)
                .then(res => {
                    this.list0 = res.data.records;
                    this.total0 = res.data.total;
                });
        },
        searchRecord1 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '1'])) {
                this.params1 = this.$params[this.$route.name + '1']
            }
            this.getList1();
        },
        getList1 () {
            this.$params[this.$route.name + '1'] = this.params1
            this.ajax
                .json('/dcp/query/drug/company/page/list', this.params1)
                .then(res => {
                    this.list1 = res.data.records;
                    this.total1 = res.data.total;
                });
        },
        // 重置功能
        reSet0 () {
            this.params0 = {
                current: 1,
                size: 10,
                isMarket: 0
            };
            this.total0 = 0
            this.getList0()
        },
        reSet1 () {
            this.params1 = {
                current: 1,
                size: 10,
                isMarket: 1
            };
            this.total1 = 0
            this.getList1()
        },
        // 导出
        toExport0 () {
            this.ajax
                .json("/dcp/export/drug/company/data", this.params0, { type: "export" })
                .then(res => { });
        },
        toExport1 () {
            this.ajax
                .json("/dcp/export/drug/company/data", this.params1, { type: "export" })
                .then(res => { });
        },
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
