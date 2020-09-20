<template>
    <div>
        <div class="tabs-title mb20 pt30">企业信息</div>
        <table class="el-table-list">
            <tr>
                <td>企业类型</td>
                <td>{{company.companyType ? company.companyType : '-'}}</td>
            </tr>
            <tr>
                <td>企业性质</td>
                <td>{{company.companyProperty === '待定盛易通' ? '-' : company.companyProperty}}</td>
            </tr>
            <tr>
                <td>企业资质</td>
                <td>{{company.certifications ? company.certifications : '-'}}</td>
            </tr>
            <tr>
                <td>业务标签</td>
                <td>{{company.businessTag ? company.businessTag : '-'}}</td>
            </tr>
            <tr>
                <td>经营范围</td>
                <td>{{company.businessScope ? company.businessScope : '-'}}</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">联系人信息</div>
        <el-table :data="contactList" border class="tab-info">
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
    data() {
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
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
</style>
