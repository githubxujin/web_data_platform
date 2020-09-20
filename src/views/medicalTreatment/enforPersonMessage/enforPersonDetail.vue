<template>
    <!-- 失信被执行人 -->
    <div class="pt20">
        <el-form :inline="true" :model="params" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.name" placeholder="被执行人姓名/名称"></el-input>
            </el-form-item>
            <el-form-item style="width:200px;">
                <el-input v-model="params.cardNum" placeholder="身份证号码/组织机构代码"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.gistId" placeholder="执行依据文号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList()">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
            </el-tooltip>
        </el-row>
        <el-table :data="list" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="180" label="被执行人姓名/名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="sexy" label="性别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cardNum" width="200" label="身份证号码/组织机构代码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="courtName" label="执行法院" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="provinceName" label="省份" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gistId" width="230" label="执行依据文号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="caseCode" label="案号" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="评估时间" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click.stop="$router.push({path:'/service/enforPersonMessage/enforDetailDialog',query:{id:scope.row.id}})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
    </div>
</template>
<script>
import { plateList, industryCategoryLabel, channelLabel } from "@/utils/common";
import { formatDate } from "@/filters/index";
export default {
    components: {
    },
    data () {
        return {
            plateList,
            params: {
                current: 1,
                size: 10,
                cardNum: '',
                name: '',
                gistId: '',
            },
            total: 0,
            list: [],
            dialogVisible: false,
            isEdit: false,
            detailList: [],
            evaluateId: NaN,
            detailParams: {
                current: 1,
                size: 10,
                total: 0
            },
            companyName: "",
            identityCode: ""
        };
    },
    created () {
        this.searchRecord0();
    },
    methods: {
        toExport () {
            this.$http("/dcp/query/brokenpromises/export", this.params, {
                type: "export"
            });
        },
        formatDate,
        industryCategoryLabel,
        channelLabel,
        searchRecord0 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '1'])) {
                this.params = this.$params[this.$route.name + '1']
            }
            this.getList();
        },
        // 获取失信被执行人首页列表数据
        getList () {
            this.$params[this.$route.name + '1'] = this.params
            this.$http('/dcp/query/brokenpromises/list', this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                customerName: "",
                industryType: "",
                personName: ""
            };
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
.formBox {
    display: flex;
    align-items: center;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
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
/deep/ .el-serach-form .el-form-item__content {
    width: 100%;
}
</style>
