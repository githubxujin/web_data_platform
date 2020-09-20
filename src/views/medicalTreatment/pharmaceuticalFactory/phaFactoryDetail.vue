<template>
    <!-- 药厂数据明细 -->
    <div class="table-wrap">
        <div class="table-title">药厂库</div>
        <el-form :inline="true" size="medium">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.companyName" clearable placeholder="药厂名称"></el-input>
            </el-form-item>
            <!-- 企业类型 -->
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.companyType" clearable placeholder="企业类型">
                    <el-option :label="item" :value="item" v-for="(item,index) in typeList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <!-- 省 -->
            <el-form-item class="el-item-form-width">
                <el-cascader v-model="value" :options="city" placeholder="省份" clearable :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 导出功能 -->
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="el-table">
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="companyName" label="药厂名称" min-width="180" show-overflow-tooltip align="left"></el-table-column>
            <!-- 企业省份 -->
            <el-table-column prop="province" label="省份" width="100" show-overflow-tooltip align="left">
                <template slot-scope="scope">{{scope.row.province?scope.row.province:'-'}}</template>
            </el-table-column>
            <el-table-column prop="companyType" label="企业类型" width="100" show-overflow-tooltip align="left">
                <template slot-scope="scope">{{scope.row.companyType?scope.row.companyType:'-'}}</template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="socialCreditCode" label="统一社会信用代码/组织机构代码" width="230" show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="lawPerson" label="法定代表人" width="160" show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="quailtyPerson" label="质量负责人" width="160" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="responsiblePerson" label="企业负责人" width="160" show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column label="操作" width="100" show-overflow-tooltip fixed="right" align="center">
                <!-- 注意触发详情页面的时候需要唯一ID值 -->
                <template slot-scope="scope">
                    <el-button type="primary" plain @click.stop="$router.push({path:'/pharmaceuticalFactory/basicMessage', query:{drugId:scope.row.id, companyName:scope.row.companyName}})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page.sync="params.current" :page-sizes="[10, 20, 30, 40]" :page-size.sync="params.size"
            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>
<script>
// 引入城市js文件
import city from "@/views/industryTrade/config/city2.js";
export default {
    data () {
        return {
            city,
            options: [],
            list: [],
            value: [],
            typeList: [],
            params: {
                current: 1,
                size: 10,
                companyName: "",
                companyType: "",
                province: ""
            },
            total: 0
        };
    },
    mounted () {
        this.getType();
        this.searchRecord();
    },
    methods: {
        getType () {
            this.$http("/dcp/query/pharmaceutical/companytypelist").then(
                res => {
                    this.typeList = res.data;
                    console.log(this.typeList, '123');
                }
            );
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        // 查询功能
        getList () {
            this.$params[this.$route.name] = this.params
            this.$http("/dcp/query/pharmaceutical/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
                console.log(this.list, '1234444');
            });
        },
        // 导出功能
        toExport () {
            this.$http("/dcp/query/pharmaceutical/export", this.params, {
                type: "export"
            });
        },
        // 省市
        handleChange (value) {
            console.log(value, 1);
            if (value && value.length > 0) {
                this.params.province = value[0];
            } else {
                // this.params.province = "";
            }
        },
        handleSizeChange (v) {
            this.params.size = v;
            this.getList();
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                companyName: '',
                companyType: '',
                province: ''
            };
            this.value = [];
            this.getList();
            this.getType();
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-cascader__dropdown {
    background: #232528;
    border-color: #232528;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    // padding-left: 15px;
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

