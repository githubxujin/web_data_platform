<template>
    <div class="table-wrap style-table-wrap">
        <div class="table-title">中国铁塔中标数据</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.biddTitle" clearable placeholder="项目名称" class="el-item-form-width"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model='params.province' clearable placeholder="项目所在地" class="el-item-form-width">
                    <el-option v-for="(item,index) in city" :key="index" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.inviteBiddName" clearable placeholder="招标单位" class="el-item-form-width"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.winBiddCompany" clearable placeholder="中标单位" class="el-item-form-width"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="中标开始日期" end-placeholder="中标结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="el-table">
            <el-table-column type='index' label='序号' width='70' align="center"></el-table-column>
            <el-table-column prop='pubDate' label='中标日期' width='120' show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{formatDate(scope.row.pubDate) || '-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop='biddTitle' label='项目名称' min-width='180' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='province' label='项目地-省' width='120' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='inviteBiddName' label='招标单位' width='280' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='inviteBiddContactMan' label='招标单位联系人' width='160' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='inviteBiddContactPhone' label='招标单位联系方式' width='160' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='winBiddCompany' label='中标单位' width='320' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='source' label='渠道' width='160' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column :formatter="formatLabel" prop='' label='项目类型' min-width='100' show-overflow-tooltip align="left"></el-table-column>
            <el-table-column label='操作' width='120' show-overflow-tooltip fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="$router.push({ name: 'in-win-data-tieta-detail', query: {id: scope.row.id,biddId:scope.row.biddId}})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>

<script>
import city from "@/views/industryTrade/config/city1.js";
export default {
    data () {
        return {
            city,
            params: {
                current: 1,
                size: 10,
                startPubDate: '',
                endPubDate: ''
            },
            total: 0,
            list: [],
            value1: [],
            value: []
        }
    },
    created () {
        this.searchRecord()
    },
    methods: {
        // 日期范围
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startPubDate = v[0];
                this.params.endPubDate = v[1];
            } else {
                this.params.startPubDate = "";
                this.params.endPubDate = "";
            }
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList () {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/dcp/communicate/bid/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10
            }
            this.value1 = []
            this.getList()
        },
        // 导出
        toExport () {
            this.$http('/dcp/communicate/bid/export', this.params, { type: 'export' })
        }
    },
}
</script>

<style lang="scss" scoped>
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
/deep/ .el-range-input {
    text-align: left;
}
</style>