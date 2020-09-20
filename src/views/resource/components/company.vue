<template>
    <div>
        <qg-table subtitle="企业信息" class="pt20">
            <qg-table-column label="企业类型">{{company.companyType }}</qg-table-column>
            <qg-table-column label="企业性质">{{company.companyProperty === '待定盛易通' ? '-' : company.companyProperty}}</qg-table-column>
            <qg-table-column label="股东信息">{{company.groupOrg ? company.groupOrg : '-'}}</qg-table-column>
            <qg-table-column label="是否上市公司">{{company.isMarket ? '是' : '否'}}</qg-table-column>
            <qg-table-column label="境内/境外体系公司">{{company.systemCompany}}</qg-table-column>
            <qg-table-column label="关联企业">{{company.contractSubject}}</qg-table-column>
            <qg-table-column label="企业资质">{{company.certifications}}</qg-table-column>
            <qg-table-column label="业务标签">{{company.businessTag }}</qg-table-column>
            <qg-table-column label="主营产品">{{company.mainProduct}}</qg-table-column>
            <qg-table-column label="客户登记">-</qg-table-column>
            <qg-table-column label="融资意愿预测">{{company.financeWill}}</qg-table-column>
            <qg-table-column label="经营范围">{{company.businessScope}}</qg-table-column>
        </qg-table>

        <div class="tabs-title mt20 mb20">联系人信息</div>
        <el-table :data="contactList" border>
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名">
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别">
                <template slot-scope="item">
                    {{item.row.gender ? item.row.gender : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
                <template slot-scope="item">
                    {{item.row.phone ? item.row.phone : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="position" label="职位">
                <template slot-scope="item">
                    {{item.row.position ? item.row.position : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="officePhone" label="办公电话">
                <template slot-scope="item">
                    {{item.row.officePhone ? item.row.officePhone : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="visitingAddress" label="拜访地址">
                <template slot-scope="item">
                    {{item.row.visitingAddress ? item.row.visitingAddress : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: {
        company: Object
    },
    data () {
        return {
            params: {},
            contactList: []
        };
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    td:nth-child(odd) {
        width: 165px;
        background: #292b2f;
        color: #a0a3a8;
        border-bottom: 1px solid #54575c;
    }
    td {
        color: #d3d3d4;
        padding: 17px 5px 17px 20px;
        line-height: 16px;
        border-bottom: 1px solid #54575c;
    }
}
</style>
