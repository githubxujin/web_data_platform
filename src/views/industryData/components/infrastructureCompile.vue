<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title mb20">可行性研究报告批复</div>
        <table class="el-table-cro">
            <tr>
                <td>查看链接</td>
                <td>公开事项名称</td>
                <td>索引号</td>
                <td>主办单位</td>
                <td>制发日期</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>批复内容</td>
                <td>建设地点</td>
                <td>建设内容</td>
                <td>建设规模</td>
                <td>受文单位</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>办理状态</td>
                <td>项目编码</td>
                <td>项目名称</td>
                <td>审批文号</td>
                <td>项目法人</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">可行性研究报告审批前公示</div>
        <table class="el-table-cro">
            <tr>
                <td>查看链接</td>
                <td>事项名称</td>
                <td>申报单位</td>
                <td>审批处室</td>
                <td>建设单位</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>建设地点</td>
                <td>建设期限</td>
                <td>建设及规模主要内容</td>
                <td>总投资</td>
                <td>资金来源</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>联系电话</td>
                <td>电子邮箱</td>
                <td>邮政编码</td>
                <td>邮政地址</td>
                <td>相关附件</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td colspan="5" style="text-align:left;">相关导读（附件）</td>
            </tr>
            <tr>
                <td colspan="5" style="text-align:left;">
                   
                </td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">项目用地批复</div>
        <table class="el-table-cro">
            <tr>
                <td>查看链接</td>
                <td>索引号</td>
                <td>分类</td>
                <td>发布机构</td>
                <td>生成日期</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>名称</td>
                <td>文号</td>
                <td>主题词</td>
                <td>批复内容</td>
                <td>组配分类</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>体载分类</td>
                <td>公开形势</td>
                <td>公开方式</td>
                <td>公开范围</td>
                <td>有效期</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">施工许可证</div>
        <table class="el-table-cro">
            <tr>
                <td>施工许可证编号</td>
                <td>发证机关</td>
                <td>发证日期</td>
                <td>状态</td>
                <td>建设性质</td>
                <td>结构体系</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>合同价格</td>
                <td>施工面积</td>
                <td>合同开工日期</td>
                <td>合同竣工日期</td>
                <td>建设规模</td>
                <td>建设规划用地许可证编号</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>建设工程规划许可证编号</td>
                <td>中标通知书编号</td>
                <td>施工图审查合格书编号</td>
                <td>合同编号</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td></td>
                <td></td>
            </tr>
        </table>
        <table class="el-table-cro mt20">
            <tr>
                <td>查看链接</td>
                <td>建设地址</td>
                <td>建设单位</td>
                <td>建设单位项目负责人</td>
                <td>工程总承包单位</td>
                <td>工程总承包项目经理</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>勘察单位</td>
                <td>建设单位项目负责人</td>
                <td>工程总承包单位</td>
                <td>工程总承包项目经理</td>
                <td>勘察单位</td>
                <td>勘察单位项目负责人</td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
            </tr>
            <tr>
                <td>施工单位</td>
                <td>施工单位项目负责人</td>
                <td>监理单位</td>
                <td>监理单位项目负责人</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td>
                    <el-input v-model="params.companyName" clearable></el-input>
                </td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            params: {
                id: 32, // 主键id
                companyName: '', // 企业名称
                businessStatus: '', // 工商状态
                businessAbnormal: '', // 经营异常
                callTaxDebt: '', // 催缴/欠税
                taxIrregular: '', // 税务非正常户
                majorTaxViolation: '', // 重大税收违法
                businessLicense: '', // 经营许可
                administrativePenalties: '', // 行政处罚
                constructionIndustryBlack: '', // 建筑产业黑名单(是/否/未知)
                grossSales: '', // 销售毛利
                receivableDays: '', // 应收账款（含票据）周转天数
                salesProportion: '', // 我司核心企业销售占比
                spotProportion: '', // 现货业务占比
                operatingIncomeRate: '', // 营业收入增长率
                creditReport: '', // 征信报告(PDF 链接)
                casesInvolved: '', // 涉诉情况
                executedPerson: '', // 被执行人
                dishonestPerson: '', // 失信被执行人
                yearInvoiceInvalidRate: '', // 企业年度发票作废率
                yearInvoiceRedRate: '' // 企业年度发票冲红率
            },
            list: [
                {
                    name: '吼萨雷'
                },
                                {
                    name: '吼萨雷'
                }
            ]
        }
    },
    created() {
        
    },
    methods: {
        
    }
}
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
.el-table-cro {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(odd) {
            background: #292b2f;
        }
        &:last-child {
            td {
                color: #d3d3d4;
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: #a0a3a8;
        padding: 0 20px;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
        /deep/ .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
    }
}
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
</style>
