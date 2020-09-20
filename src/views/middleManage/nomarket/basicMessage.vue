<template>
    <!-- 企业基本信息详情页 -->
    <div class="table-wrap">
        <!-- 基本信息，用了ElTableRow组件 -->
        <qg-table subtitle="企业基本信息">
            <qg-table-column v-for="(item,index) in getRows1()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
        <!-- 联系人信息 -->
        <div class="tabs-title mb20 mt20">联系人信息</div>
        <el-table :data="basicInfo.drugCompanyContactList" border>
            <el-table-column prop label="序号" width="100" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="100" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="sex" label="性别" width="100" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="phone" label="手机号" min-width="150" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="position" label="职位" width="160" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="officePhone" label="办公电话" width="200" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="拜访地址" min-width="150" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 股权架构信息 -->
        <div class="tabs-title mb20 mt20">股权架构</div>
        <el-table :data="basicInfo.drugCompanyEquityList" border>
            <el-table-column label="序号" width="100" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="name" label="股东名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="subscribeAmount" label="认缴金额" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="paidAmount" label="实缴金额" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="equityProportion" label="股权占比" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 关联公司 -->
        <div class="tabs-title mb20 mt20">关联公司</div>
        <el-table :data="basicInfo.drugCompanyRelationList" border>
            <el-table-column prop label="序号" width="100" align="center">
                <template slot-scope="item">{{ item.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="name" label="关联公司名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="relation" label="关联关系" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="equity" label="股权结构" min-width="150" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {

    data () {
        return {
            basicInfo: {}
        };
    },
    created () {
        this.getList(this.$route.query.companyId)
    },
    methods: {
        // 企业基本信息数据
        getRows1 () {
            return [
                { key: "企业类型", value: this.basicInfo.companyType || '-', alone: true },
                { key: "法人代表", value: this.basicInfo.legalPerson || '-', alone: true },
                { key: "工商状态", value: this.basicInfo.businessStatus || '-', alone: true },
                { key: "注册地", value: this.basicInfo.registration || '-', alone: true },
                { key: "企业负责人", value: this.basicInfo.companyPrincipal || '-', alone: true },
                { key: "质量负责人", value: this.basicInfo.companyQuality || '-', alone: true },
                { key: "企业性质", value: this.basicInfo.businessNature || '-', alone: true },
                { key: "企业资质", value: this.basicInfo.qualification || '-', alone: true },
                { key: "主营材料/劳务", value: this.basicInfo.mainBussiness || '-', alone: true },
                { key: "客户登记", value: this.basicInfo.customerReg || '-', alone: true },
                { key: "融资意愿预测", value: this.basicInfo.financeWill || '-', alone: true },
                { key: "企业开始经营时间", value: this.basicInfo.startDate || '-', alone: true },
                { key: "企业经营年份", value: this.basicInfo.businessYear || '-', alone: true },
                { key: "营收规模", value: this.basicInfo.revenueScale || '-', alone: true },
                { key: "注册地址", value: this.basicInfo.registrationAddress || '-', alone: true },
                { key: "仓库地址", value: this.basicInfo.stockAddress || '-', alone: true },
                { key: "经营范围", value: this.basicInfo.businessScope || '-', alone: true }
            ];
        },
        getList (companyId) {
            this.ajax
                .json('/dcp/query/drug/company/base/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.basicInfo = res.data
                    console.log(this.basicInfo, 'base验证');
                });
        }
    }
};
</script>
