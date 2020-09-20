<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.tenderUnitFormat" clearable placeholder="招标单位" filterable allow-create>
                    <el-option v-for="(v,i) in selectList" :key="i" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.coreCompany" clearable placeholder="所属承建单位">
                    <el-option v-for="(v,i) in selectList1" :key="i" :label="v" :value="v"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-cascader v-model="value" :options="city" placeholder="项目所在地" clearable :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.projectType" clearable placeholder="项目类型">
                    <el-option label="基建" value="1"></el-option>
                    <el-option label="房建" value="2"></el-option>
                    <el-option label="市政" value="3"></el-option>
                    <el-option label="工业厂房" value="4"></el-option>
                    <el-option label="商业综合体" value="5"></el-option>
                    <el-option label="其他" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.tenderMaterial" clearable placeholder="招标材料">
                    <el-option :label="item.name" :value="item.name" v-for="(item,index) in material" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.bidder" clearable placeholder="中标单位"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.projectName" clearable placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item class="el-item-date-width">
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="中标日期开始" end-placeholder="中标日期结束"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="el-table">
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="bidDate" label="日期" width="120" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" min-width="180" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="projectType" label="项目类型" min-width="100" show-overflow-tooltip align="left">
                <template slot-scope="item">{{ projectType[item.row.projectType] }}</template>
            </el-table-column>
            <el-table-column prop="projectProvince" label="项目地-省" width="120" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="projectCity" label="项目地-市" width="100" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="tenderMaterial" label="招标材料" width="120" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="tenderUnit" label="招标单位" width="160" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="tenderUnitFormat" label="招标单位-规范" width="160" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="bidder" label="中标单位" width="160" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="remark" label="操作" width="120" show-overflow-tooltip fixed="right" align="center">
                <template slot-scope="scope">
                    <el-button @click="toDetail(scope.row.bidId)" type="primary" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.current" :page-sizes="[10, 20, 50, 100]" :page-size="params.size"
            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>
<script>
import city from "@/views/industryTrade/config/city1.js";
export default {
    data () {
        return {
            city,
            list: [],
            params: {
                current: 1,
                size: 10,
                tenderUnitFormat: "", //招标单位-规范
                coreCompany: "", //核心企业
                projectProvince: "", //项目省份
                projectCity: "", //项目市区
                tenderMaterial: "", //招标材料
                bidder: "", //中标单位
                projectName: "", //项目名称
                projectType: "", //(1:基建,2:房建,3:市政,4:工业厂房,5:商业综合体,6:其他)
                startDate: "",
                endDate: ""
            },
            value1: [],
            selectList: [],
            selectList1: [],
            projectType: {
                1: "基建",
                2: "房建",
                3: "市政",
                4: "工业厂房",
                5: "商业综合体",
                6: "其他"
            },
            material: [
                { name: "型钢" },
                { name: "钢筋" },
                { name: "钢结构" },
                { name: "其它钢材" },
                { name: "水泥" },
                { name: "混凝土" },
                { name: "模板" },
                { name: "木枋" },
                { name: "劳务" },
                { name: "其它" }
            ],
            total: 0,
            value: []
        };
    },
    created () {
        this.getTendering();
        this.getEnterprise();
        this.getList();
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = "";
                this.params.endDate = "";
            }
        },
        // 获取招标单位-规范
        getTendering () {
            this.$http(
                "/dcp/bid/detail/tender/format/list",
                {},
                { type: "get" }
            ).then(res => {
                this.selectList = res.data;
            });
        },
        // 获取核心企业
        getEnterprise () {
            this.$http("/dcp/bid/detail/core/company/list", {}, { type: "get" }).then(
                res => {
                    this.selectList1 = res.data;
                }
            );
        },
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.projectProvince = value[0];
                this.params.projectCity = value[1];
            } else {
                this.params.projectProvince = "";
                this.params.projectCity = "";
            }
        },
        toDetail (id) {
            window.open(
                "https://jc.yzw.cn/SL/Index?tenderSysno=" + id + "&target=td"
            );
        },
        getList () {
            this.$http("/dcp/bid/detail/page/list", this.params).then(res => {
                // console.log(res);
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        // 导出
        toExport () {
            this.$http("/dcp/yzw/bid/detail/export", this.params, {
                type: "export"
            });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                tenderUnitFormat: "", //招标单位-规范
                coreCompany: "", //核心企业
                projectProvince: "", //项目省份
                projectCity: "", //项目市区
                tenderMaterial: "", //招标材料
                bidder: "", //中标单位
                projectName: "", //项目名称
                projectType: "" //(1:基建,2:房建,3:市政,4:工业厂房,5:商业综合体,6:其他)
            };
            this.value = [];
            this.value1 = [];
            this.getList();
        },
        handleSizeChange (v) {
            this.params.size = v;
            this.getList();
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
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
</style>

