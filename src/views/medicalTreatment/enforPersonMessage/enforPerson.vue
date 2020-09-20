<template>
    <!-- 被执行人列表 -->
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.name" placeholder="被执行人姓名/名称"></el-input>
            </el-form-item>
            <el-form-item style="width:200px;">
                <el-input v-model="params.cardNum" placeholder="身份证号码/组织机构代码"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.caseCode" placeholder="案号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
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
            <el-table-column prop="name" width="160" label="被执行人姓名/名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" width="50" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cardNum" width="220" label="身份证号码/组织机构代码" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="courtName" label="执行法院" width="180" align="center"></el-table-column>
            <el-table-column prop="caseCreateTime" label="立案日期" width="180" align="center"></el-table-column>
            <el-table-column prop="caseCode" label="案号" width="180" align="center"></el-table-column>
            <el-table-column prop="execMoney" label="执行标的" width="140" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="评估时间" width="180" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="mini" @click.stop="$router.push({path:'/service/enforPersonMessage/enforPersonDialog',query:{id:scope.row.id}})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
        <!-- <enfor-person-dialog ref="dialog" :list="timeDetail " :params="detailParams" :id="id" :name="name" type="nature" :caseCode="caseCode" /> -->
    </div>
</template>
<script>
import { plateList, industryCategoryLabel, channelLabel } from "@/utils/common";
import { formatDate } from "@/filters/index";
export default {
    components: {
        // enforPersonDialog: () => import("./enforPersonDialog")
    },
    data () {
        return {
            plateList,
            params: {
                current: 1,
                size: 10,
                // customerName: "",
                // industryType: "",
                // name: ""
            },
            total: 0,
            list: [],
            dialogVisible: false,
            isEdit: false,
            timeDetail: [],
            id: NaN,
            detailParams: {
                current: 1,
                size: 10,
                total: 0
            },
            name: "",
            caseCode: "",
        };
    },
    created () {
        this.searchRecord0();
    },
    methods: {
        // 被执行人导出
        toExport () {
            this.$http("/dcp/query/zhixin/export", this.params, {
                type: "export"
            });
        },
        // 
        toDetail (id, companyName, caseCode) {
            this.id = id
            this.name = name
            this.caseCode = caseCode;
            // console.log(typeof (this.caseCode));
            this.ajax
                .json("/dcp/query/zhixin/assessmenttime", { caseCode })
                .then(res => {
                    console.log(res.data);

                    this.timeDetail = res.data;
                    this.detailParams.total = res.data.total;
                    this.$refs.dialog.dialogVisible = true;
                });
        },

        formatDate,
        industryCategoryLabel,
        channelLabel,
        searchRecord0 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '0'])) {
                this.params = this.$params[this.$route.name + '0']
            }
            this.getList();
        },
        // 获取被执行人首页列表数据
        getList () {
            this.$params[this.$route.name + '0'] = this.params
            this.ajax
                .json("/dcp/query/zhixin/list", this.params)
                .then(res => {
                    // console.log(res.data);
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
