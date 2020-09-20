<template>
    <div>
        <el-dialog :title="info.submissionAnnual" :visible.sync="dialogVisible" width="1200px">
            <qg-table subtitle="联系方式">
                <qg-table-column v-for="(item,index) in getRow()" :key="index" :label="item.key" column="qg-two" width="157">{{item.value}}</qg-table-column>
            </qg-table>

            <div class="sub-title mb20 mt20">网站信息</div>
            <el-table :data='info.annualReportOriginal.websiteInfoList' border>
                <el-table-column prop='name' label='名称' show-overflow-tooltip align='center'></el-table-column>
                <el-table-column prop='type' label='类型' show-overflow-tooltip></el-table-column>
                <el-table-column prop='url' label='网址' show-overflow-tooltip></el-table-column>
            </el-table>
            <div class="sub-title mb20 mt20">股东及出资信息</div>
            <el-table :data='info.annualReportOriginal.investmentInfoList' border>
                <el-table-column prop='stockholderName' label='股东' show-overflow-tooltip align='center'></el-table-column>
                <el-table-column prop='subPaidAmount' label='认缴出资额(万元)' show-overflow-tooltip></el-table-column>
                <el-table-column prop='subPaidDate' label='认缴出资时间' show-overflow-tooltip></el-table-column>
                <el-table-column prop='subPaidWay' label='认缴出资方式' show-overflow-tooltip></el-table-column>
                <el-table-column prop='actualPaidAmount' label='实缴出资额(万元)' show-overflow-tooltip> </el-table-column>
                <el-table-column prop='actualPaidDate' label='实缴出资时间' show-overflow-tooltip> </el-table-column>
                <el-table-column prop='actualPaidWay' label='实缴出资方式' show-overflow-tooltip> </el-table-column>
            </el-table>
            <div class="sub-title mb20 mt20">对外投资信息</div>
            <el-table :data='info.annualReportOriginal.foreignInvestmentList' border>
                <el-table-column prop='name' label='投资设立企业或购买股权企业名称' show-overflow-tooltip align='center'></el-table-column>
                <el-table-column prop='creditCode' label='注册号/统一社会信用代码' show-overflow-tooltip align='center'></el-table-column>

            </el-table>
            <div class="sub-title mb20 mt20">资产状况信息</div>
            <el-table :data='[info.annualReportOriginal.assetInfo]' border>
                <el-table-column prop='totalAssetAmount' label='资产总额' show-overflow-tooltip></el-table-column>
                <el-table-column prop='grossRevenue' label='营业总收入' show-overflow-tooltip></el-table-column>
                <el-table-column prop='mainRevenue' label='营业总收入中主营业务收入' show-overflow-tooltip width="220"></el-table-column>
                <el-table-column prop='totalTaxPayment' label='纳税总额' show-overflow-tooltip></el-table-column>
                <el-table-column prop='totalEquity' label='所有者权益合价' show-overflow-tooltip></el-table-column>
                <el-table-column prop='totalProfits' label='利润总额' show-overflow-tooltip></el-table-column>
                <el-table-column prop='netProfits' label='净利润' show-overflow-tooltip></el-table-column>
                <el-table-column prop='totalIndebtAmount' label='负债总额' show-overflow-tooltip></el-table-column>

            </el-table>
            <!-- {{ info.annualReportOriginal.socialSecurityInfo }} -->
            <tableRowBaseInfo :data='info.annualReportOriginal' subtitle="社保信息" class="mt20"></tableRowBaseInfo>

            <div slot="footer">
                <el-button type="info" @click="dialogVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false" size="mini">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {

    data () {
        return {
            dialogVisible: false,
            list: [],
            info: {
                submissionAnnual: '',
                annualReportOriginal: {
                    websiteInfoList: []
                }
            }
        }
    },
    methods: {
        getRow () {
            return [
                {
                    key: "统一社会信用代码",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.creditCode
                },
                {
                    key: "企业联系电话",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.phone,
                },
                {
                    key: "从业人数",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.count
                },
                {
                    key: "企业经营状态",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.status
                },
                {
                    key: "是否有网站或网店",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.hasWebShop
                },
                {
                    key: "是否有投资信息或购买其他公司股权",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.transferInfo
                },
                {
                    key: "企业名称",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.companyName
                },
                {
                    key: "邮政编码",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.postcode
                },
                {
                    key: "企业电子邮箱",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.email
                },
                {
                    key: "其中女性从业人数",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.femaleCount,
                },
                {
                    key: "企业股权情况",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.controlCondtion,
                },
                {
                    key: "有限责任公司本年度是否发生股东权转让",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.transferInfo,
                },
                {
                    key: "是否对外提供担保",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.foreignProvide,
                },
                {
                    key: "企业通信地址",
                    value: this.info.annualReportOriginal.basicInfo && this.info.annualReportOriginal.basicInfo.address,
                },

            ];
        }
    },
};
</script>
<style lang="scss" scoped>
.table-detail {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    td:nth-child(odd) {
        width: 180px;
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