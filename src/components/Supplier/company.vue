<template>
    <div>
        <qg-table subtitle="企业信息" class="pt20">
            <qg-table-column label="企业类型">{{company.companyType}}</qg-table-column>
            <qg-table-column label="企业性质">{{company.businessNature === '待定盛易通' ? '-' : company.businessNature}}</qg-table-column>
            <qg-table-column label="企业资质">{{company.qualification}}</qg-table-column>
            <qg-table-column label="业务标签">{{company.businessTag }}</qg-table-column>
            <qg-table-column label="中标材料">{{company.mainBussiness}}</qg-table-column>
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
            contactList: []
        };
    },
    methods: {}
};
</script>

