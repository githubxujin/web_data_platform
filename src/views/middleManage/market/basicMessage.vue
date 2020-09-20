<template>
    <!-- 药厂详情 -->
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">
                <div>{{detailData.companyName}}</div>
            </div>
            <el-tabs type="border-card" class="mt10 tootip-table">
                <el-tab-pane label="药厂基本信息">

                    <!-- 使用了el-table-row组件(药厂基本情况) -->
                    <qg-table subtitle="基本情况">
                        <qg-table-column v-for="(item,index) in getRows" :key="index" :label="item.key">
                            {{ item.value}}
                        </qg-table-column>
                    </qg-table>
                    <el-table-row :rows="getRowsMoney()" subtitle="药厂财务信息" class="getRowsPermit"></el-table-row>
                </el-tab-pane>
                <el-tab-pane label="药厂生产信息">
                    <div style="width:100%;height:30px;background-color: #232528;"></div>
                    <!-- 使用了el-table组件(药厂生产信息) -->
                    <el-table-row subtitle="药品生产许可"></el-table-row>
                    <el-table :data="productList" class="table-border">
                        <el-table-column prop='companyCode' label="编号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='classificationCode' label="分类码" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='licenceDate' label="发证日期" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='deadlineDate' label="有效期至" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='licenceIssuingAuthority' label="发证机关" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='issuePerson' label="签发人" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='regulators' label="日常监管机构"></el-table-column>
                        <el-table-column prop='supervisors' label="日常监管人员"></el-table-column>
                        <el-table-column prop='remark' label="备注"></el-table-column>
                    </el-table>
                    <!-- 器械许可 -->
                    <el-table-row class="getRowsPermit" :rows="getRowsPermit()" subtitle="器械生产许可"></el-table-row>
                    <!-- 器械备案 -->
                    <el-table-row class="getRowsPermit" :rows="getRowsRecord()" subtitle="器械生产备案"></el-table-row>
                    <!-- GMP -->
                    <div class="sub-title mb20 mt30" id="annals">GMP</div>
                    <el-table :data="gmpList" class="table-border">
                        <el-table-column prop='province' label="省市" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='gmpCode' min-width="100" label="证书编号" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='address' label="地址" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='authenticationScope' label="认证范围" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='gmpDate' min-width="100" label="发证日期" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='deadlineDate' min-width="100" label="有效期截止日" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='continueDate' min-width="100" label="批准延续日期"></el-table-column>
                        <el-table-column prop='continueDeadlineDate' label="有限期延续至"></el-table-column>
                        <el-table-column prop='continueAuthenticationScope' label="批准延续的认证范围"></el-table-column>
                        <el-table-column prop='gmpVersion' width="200" label="认证GMP版本" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='status' label="状态" show-overflow-tooltip></el-table-column>
                        <el-table-column prop='remark' label="备注" min-width="70" show-overflow-tooltip></el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ElTableRow from "@/components/Table/el-table-row";
// 暂无数据
export default {
    components: {
        ElTableRow
    },
    data () {
        return {
            reportList: [],
            activeName: "first",
            companyName: "",
            types1: '',
            // 药厂基本信息详情
            detailData: {
                companyName: '',
                companyType: '',
                permitCode: '',
                productTime: '',
                socialCreditCode: '',
                classificationCode: '',  //分类码
                province: '', //省份
                stockCode: '',  //股票代码
                lawPerson: '',  //法人
                quailtyPerson: '', //质量负责人
                responsiblePerson: '', //企业负责人
                registerAddress: '', //注册地址
                productionAddress: '', //生产地址
                productionRange: '', //生产范围
                deliveryTime: '',  //送货时效
                productInfo: '', //产品信息
                remark: '',  //备注
                operationAbility: '',  //营运能力
                profitability: '', //盈利能力
                debtAbility: '', //偿债能力
                capitalStructure: '', //资本结构
            },
            // 药厂生产信息详情(新增的字段使用该对象的字段)
            productList: [],
            gmpList: [],
            filingList: {
                filingCode: '',
                responsiblePerson: '',
                registerAddress: '',
                productionAddress: '',
                province: '',
                licenceIssuingAuthority: '',
                filingDate: '',
                productRegistrationForm: '',
                productionRange: '',
            },
            permitList: {
                permitCode: '',
                responsiblePerson: '',
                registerAddress: '',
                productionAddress: '',
                licenceDate: '',
                licenceIssuingAuthority: '',
                deadlineDate: '',
                productRegistrationForm: '',
                productionRange: '',
            },
            list: [],
            contactList: [],
            linkmanList: [],
            params: {
                id: '',
                companyName: '',
            }
        };
    },
    created () {
        // id字段
        this.params.id = this.$route.query.drugId;
        this.getRowsDetail(this.params.id);
        // console.log(this.params.id);

        // companyName字段
        this.params.companyName = this.$route.query.companyName
        console.log(this.params.companyName);
        this.getPermitDetail(this.params.companyName)
    },
    methods: {
        // 药厂基本信息页面
        getRows () {
            return [
                { key: "药厂名称", value: this.detailData.companyName },
                { key: "企业类型", value: this.detailData.companyType },
                { key: "经营资质", value: this.detailData.permitCode },
                { key: "经营年限", value: this.detailData.productTime },
                { key: "社会信用代码/组织机构代码", value: this.detailData.socialCreditCode },
                { key: "分类码", value: this.detailData.classificationCode },
                { key: "省份", value: this.detailData.province },
                { key: "法定代表人", value: this.detailData.lawPerson },
                { key: "股票代码", value: this.detailData.stockCode },
                { key: "质量负责人", value: this.detailData.quailtyPerson },
                { key: "企业负责人", value: this.detailData.responsiblePerson, alone: true },
                { key: "注册地址", value: this.detailData.registerAddress, alone: true },
                { key: "生产地址", value: this.detailData.productionAddress, alone: true },
                { key: "生产范围", value: this.detailData.productionRange, alone: true },
                { key: "送货时效", value: this.detailData.deliveryTime, alone: true },
                { key: "产品信息", value: this.detailData.productInfo, alone: true },
                { key: "备注", value: this.detailData.remark, alone: true }
            ];
        },
        // 药厂基本信息页面底部的财务信息
        getRowsMoney () {
            return [
                { key: "营运能力", value: this.detailData.operationAbility },
                { key: "盈利能力", value: this.detailData.profitability },
                { key: "偿债能力", value: this.detailData.debtAbility },
                { key: "资本结构", value: this.detailData.capitalStructure }
            ];
        },
        // 药品生产详情信息
        getPermitDetail (companyName) {
            // console.log(this.permitList, '0SSSS');
            this.$http('/dcp/query/pharmaceutical/productinfo', { companyName }, { type: "formData" }).then(res => {
                let { gmp_info = [], pharmaceutical_product_info = [], apparatus_filing_info = {}, apparatus_permit_info = {} } = res.data
                this.productList = pharmaceutical_product_info
                this.gmpList = gmp_info
                this.filingList = apparatus_filing_info
                this.permitList = apparatus_permit_info
            });
        },
        // 器械生产许可
        getRowsPermit () {
            return [
                { key: "许可证编号", value: this.permitList.permitCode },
                { key: "企业负责人", value: this.permitList.responsiblePerson },
                { key: "住所", value: this.permitList.registerAddress },
                { key: "生产地址", value: this.permitList.productionAddress },
                { key: "发证日期", value: this.permitList.licenceDate },
                { key: "发证部门", value: this.permitList.licenceIssuingAuthority },
                { key: "有效期限", value: this.permitList.deadlineDate },
                { key: "生产产品登记表", value: this.permitList.productRegistrationForm },
                { key: "生产范围", value: this.permitList.productionRange, alone: true }
            ];
        },
        // 器械生产备案
        getRowsRecord () {
            return [
                { key: "备案凭证编号", value: this.filingList.filingCode },
                { key: "企业负责人", value: this.filingList.responsiblePerson },
                { key: "住所", value: this.filingList.registerAddress },
                { key: "生产地址", value: this.filingList.productionAddress },
                { key: "备案部门", value: this.filingList.licenceIssuingAuthority },
                { key: "备案日期", value: this.filingList.filingDate },
                { key: "生产产品登记表", value: this.filingList.productRegistrationForm, alone: true },
                { key: "生产范围", value: this.filingList.productionRange, alone: true }
            ];
        }
    }
};
</script>
<style lang="scss" scoped>
.getRowsPermit {
    margin-top: 20px;
}
/deep/ .table-border {
    white-space: nowrap;
}
</style>
