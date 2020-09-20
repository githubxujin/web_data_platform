<template>
    <!-- 器械库页面 -->
    <div class="table-wrap mt20">
        <div class="table-title">器械库</div>
        <el-tabs type="border-card" v-model="activeTabsName" @tab-click="handleClick">
            <el-tab-pane v-model="activeName" label="医疗器械产品（注册）" name="one">
                <el-form :inline="true" size="medium" class="doc-box">
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.productName" clearable placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params1.type" clearable placeholder="产品类别">
                            <el-option label="国产" value="0"></el-option>
                            <el-option label="进口" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.registerCode" clearable placeholder="注册证编号"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params1.managerCategory" clearable placeholder="管理类别">
                            <el-option :label="item" :value="item" v-for="(item,index) in managerCategoryList" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.registerName" clearable placeholder="注册人名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="params1.current=1,getList1()">查询</el-button>
                        <el-button type="info" @click="reSet1">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 导出功能 -->
                <el-row class='el-iconfont'>
                    <el-tooltip class="item" effect="dark" content="导出" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport1"></span>
                    </el-tooltip>
                </el-row>
                <!-- 表格展示 -->
                <el-table :data="list1" class="el-table">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="productName" label="产品名称" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="type" label="产品类别" width="100" show-overflow-tooltip align="left" :formatter="formatType"></el-table-column>
                    <el-table-column prop="registerCode" label="注册证编号" width="180" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="managerCategory" label="管理类别" width="100" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="registerName" label="注册人名称" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="modelSpecification" label="型号规格" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="registerAddress" label="注册人住所" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column label="操作" width="140" show-overflow-tooltip fixed="right" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" plain @click.stop="$router.push({path:'/instrumentPage/regisMessage',query:{messageId1:scope.row.id}})">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="params1.current" :page-sizes="[10, 20, 50, 100]" :page-size.sync="params1.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total1"></el-pagination>
            </el-tab-pane>
            <!-- 医疗器械产品（备案）页 -->
            <el-tab-pane label="医疗器械产品（备案）" name="two" doc-box>
                <el-form :inline="true" size="medium" class="doc-box">
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.productName" clearable placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params2.type" clearable placeholder="产品类别">
                            <el-option label="国产" value="0"></el-option>
                            <el-option label="进口" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.filingCode" clearable placeholder="备案号"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.filingName" clearable placeholder="备案人名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="params2.current=1,getList2()">查询</el-button>
                        <el-button type="info" size="medium" @click="reSet2">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 导出功能 -->
                <el-row class='el-iconfont'>
                    <el-tooltip class="item" effect="dark" content="导出" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport2"></span>
                    </el-tooltip>
                </el-row>
                <!-- 表格展示 -->
                <el-table :data="list2" class="el-table">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="productName" label="产品名称" width="140" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="type" label="产品类别" width="100" show-overflow-tooltip align="left" :formatter="formatType"></el-table-column>
                    <el-table-column prop="filingCode" label="备案号" width="180" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="filingName" label="备案人名称" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="modelSpecification" label="型号规格" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="filingAddress" label="备案人注册地址" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column label="操作" align="center" width="150" fixed="right">
                        <template slot-scope="item">
                            <el-button type="primary" plain @click.stop="$router.push({path:'/instrumentPage/putMessage',query:{messageId2:item.row.id}})">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination @size-change="handleSizeChangeIn" @current-change="handleCurrentChangeIn" :current-page="params2.current" :page-sizes="[10, 20, 50, 100]" :page-size="params2.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total2"></el-pagination>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { setSession, getSession } from "@/config/utils"
export default {
    components: {},
    data () {
        return {
            list1: [],
            list2: [],
            activeName: "first",
            activeTabsName: "one",
            activeDataName: "a",
            params1: {
                current: 1,
                size: 10,
                registerCode: "", //注册证编号
                productName: "", //产品名称
                registerName: "", // 注册人名称
                id: '',
            },
            params2: {
                current: 1,
                size: 10,
                filingCode: "", //备案号
                productName: "", //产品名称
                filingName: "", // 注册人名称
                id: '',
            },
            total1: 0,
            total2: 0,
            manageType: [],
            managerCategoryList: []
        };
    },
    created () {
        this.activeTabsName = getSession(this.$route.name) || 'one'
        this.searchRecord1();
        this.searchRecord2()
        this.getManagercategory()
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        },
        // 产品类别匹配
        formatType (row) {
            if (row.type === 0) {
                return '国产'
            } else if (row.type === 1) {
                return '进口'
            } else {
                return '-'
            }
        },
        // 获取管理类别
        getManagercategory () {
            this.ajax
                .json('/dcp/query/apparatusregister/managercategory', {})
                .then(res => {
                    if (res.code === '200') this.managerCategoryList = res.data
                });
        },
        searchRecord1 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '1'])) {
                this.params1 = this.$params[this.$route.name + '1']
            }
            this.getList1();
        },
        // 器械库注册列表
        getList1 () {
            this.$params[this.$route.name + '1'] = this.params1
            this.$http("/dcp/query/apparatusregister/list", this.params1).then(res => {
                // console.log(res.data);
                this.list1 = res.data.records;
                this.total1 = res.data.total;
            });
        },
        searchRecord2 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '2'])) {
                this.params2 = this.$params[this.$route.name + '2']
            }
            this.getList2();
        },
        //  器械库备案列表
        getList2 () {
            this.$params[this.$route.name + '2'] = this.params2
            this.$http('/dcp/query/apparatusfiling/list', this.params2).then(res => {
                this.list2 = res.data.records;
                this.total2 = res.data.total;
                console.log(res.data);
            });
        },
        // 导出（注册）
        toExport1 () {
            this.$http("/dcp/query/apparatusregister/export", this.params1, {
                type: "export"
            });
        },
        // 导出(备案)
        toExport2 () {
            this.$http("/dcp/query/apparatusfiling/export", this.params2, {
                type: "export"
            });
        },
        // 重置
        reSet1 () {
            this.params1 = {
                current: 1,
                size: 10,
                registerCode: "", //注册证编号
                productName: "", //产品名称
                registerName: "", // 注册人名称
                id: '',
            };
            this.value = [];
            // this.value1 = [];
            this.getList1();
        },
        // 分页器的方法
        handleSizeChange (v) {
            this.params1.size = v;
            this.getList1();
        },
        handleCurrentChange (val) {
            this.params1.current = val;
            this.getList1();
        },
        // 备案页
        reSet2 () {
            this.params2 = {
                current: 1,
                size: 10,
                filingCode: "", //备案号
                productName: "", //产品名称
                filingName: "", // 备案人名称
                id: '',
            };
            this.value = [];
            // this.value1 = [];
            this.getList2();
        },
        // 分页器的方法
        handleSizeChangeIn (v) {
            this.params2.size = v;
            this.getList2();
        },
        handleCurrentChangeIn (val) {
            this.params2.current = val;
            this.getList2();
        }
    }
};
</script>

<style lang="scss" scoped>
.doc-box {
    padding-top: 20px;
    box-sizing: border-box;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
</style>
