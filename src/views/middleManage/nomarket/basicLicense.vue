<template>
    <!-- 企业证照&资质 -->
    <div class="table-wrap">
        <!-- 药品经营许可 -->
        <div class="tabs-title mb20">药品经营许可</div>
        <el-table :data="list.drugBusinessCompanyList" border>
            <el-table-column prop="permitCode" label="许可证编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="responsiblePerson" label="企业负责人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="quailtyPerson" label="质量负责人" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessManner" label="经营方式" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="businessScope" label="经营范围" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="licenceDate" label="发证日期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deadlineDate" label="证书有效期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="licenceIssuingAuthority" label="发证机构" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="permitStatus" label="许可证状态" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- GSP -->
        <div class="tabs-title mb20 mt20">GSP</div>
        <el-table :data="list.gspInfoList" border>
            <el-table-column prop="province" label="省市" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gspCode" label="证书编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="address" label="经营地址" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="authenticationScope" label="认证范围" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="gspDate" label="发证日期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="deadlineDate" label="证书有效期" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="licenceIssuingAuthority" label="发证机构" align="center" show-overflow-tooltip></el-table-column>
        </el-table>
        <!-- 器械经营许可 -->
        <qg-table subtitle="器械经营许可" class="mt20">
            <qg-table-column v-for="(item,index) in getRows3()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>

        <!-- 器械经营备案 -->
        <qg-table subtitle="器械经营备案" class="mt20">
            <qg-table-column v-for="(item,index) in getRows4()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
    </div>
</template>
<script>
export default {
    data () {
        return {
            list: {
                "apparatusBusinessFilingList": [
                    {
                        "businessAddress": "",
                        "businessManner": "",
                        "businessRange": "",
                        "companyName": "",
                        "createTime": "",
                        "filingCode": "",
                        "filingDate": "",
                        "id": 0,
                        "isDelete": 0,
                        "lawPerson": "",
                        "licenceIssuingAuthority": "",
                        "registerAddress": "",
                        "responsiblePerson": "",
                        "source": "",
                        "updateTime": "",
                        "warehouseAddress": ""
                    }
                ],
                "apparatusBusinessPermitList": [
                    {
                        "businessAddress": "",
                        "businessManner": "",
                        "businessRange": "",
                        "companyName": "",
                        "createTime": "",
                        "deadlineDate": "",
                        "id": 0,
                        "isDelete": 0,
                        "lawPerson": "",
                        "licenceDate": "",
                        "licenceIssuingAuthority": "",
                        "permitCode": "",
                        "registerAddress": "",
                        "responsiblePerson": "",
                        "source": "",
                        "updateTime": "",
                        "warehouseAddress": ""
                    }
                ],
                "drugBusinessCompanyList": [],
                "gspInfoList": []
            }
        };
    },
    created () {
        this.getList(this.$route.query.companyName)
    },
    methods: {
        getRows3 () {
            let appar = this.list.apparatusBusinessPermitList && this.list.apparatusBusinessPermitList[0]
            return [
                { key: "许可证编号", value: appar.permitCode },
                { key: "企业负责人", value: appar.responsiblePerson },
                { key: "住所", value: appar.registerAddress },
                { key: "经营场所", value: appar.businessAddress },
                { key: "发证日期", value: appar.licenceDate },
                { key: "发证部门", value: appar.licenceIssuingAuthority },
                { key: "有效期限", value: appar.deadlineDate },
                { key: "经营方式", value: appar.businessManner },
                { key: "库房地址", value: appar.warehouseAddress, alone: true },
                { key: "经营范围", value: appar.businessRange, alone: true },
            ];
        },
        getRows4 () {
            let appara = this.list.apparatusBusinessFilingList && this.list.apparatusBusinessFilingList[0]
            return [
                { key: "编号", value: appara.filingCode },
                { key: "企业负责人", value: appara.responsiblePerson },
                { key: "住所", value: appara.registerAddress },
                { key: "经营场所", value: appara.businessAddress },
                { key: "备案部门", value: appara.licenceIssuingAuthority },
                { key: "备案日期", value: appara.filingDate },
                { key: "库房地址", value: appara.warehouseAddress },
                { key: "经营方式", value: appara.businessManner },
                { key: "经营范围", value: appara.businessRange, alone: true },
            ];
        },
        getList (companyName) {
            this.ajax
                .json('/dcp/query/drug/company/license/info', { companyName }, { type: 'get' })
                .then(res => {
                    if (res.data.apparatusBusinessFilingList.length === 0) {
                        res.data.apparatusBusinessFilingList.push({
                            "businessAddress": "",
                            "businessManner": "",
                            "businessRange": "",
                            "companyName": "",
                            "createTime": "",
                            "filingCode": "",
                            "filingDate": "",
                            "lawPerson": "",
                            "licenceIssuingAuthority": "",
                            "registerAddress": "",
                            "responsiblePerson": "",
                            "source": "",
                            "updateTime": "",
                            "warehouseAddress": ""
                        })
                    }
                    if (res.data.apparatusBusinessPermitList.length === 0) {

                        res.data.apparatusBusinessPermitList.push({
                            filingCode: "",
                            "businessAddress": "",
                            "businessManner": "",
                            "businessRange": "",
                            "companyName": "",
                            "createTime": "",
                            "deadlineDate": "",
                            "id": '',
                            "lawPerson": "",
                            "licenceDate": "",
                            "licenceIssuingAuthority": "",
                            "permitCode": "",
                            "registerAddress": "",
                            "responsiblePerson": "",
                            "source": "",
                            "updateTime": "",
                            "warehouseAddress": ""
                        })
                    }
                    this.list = res.data
                });
        }
    }
};
</script>
