<template>
    <div>
        <div class="tabs-title pt20">施工许可证</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectHousesConstructLicenseList" :key="i">
            <tr>
                <td>项目名称</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructProjectName" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructProjectName ? v.constructProjectName : '-'}}</div>
                </td>
                <td>施工许可证编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructCertificateNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructCertificateNo ? v.constructCertificateNo : '-'}}</div>
                </td>
                <td>发证日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructIssueDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructIssueDate ? formatDate(v.constructIssueDate) : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>许可机关</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructApproveOffice" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructApproveOffice ? v.constructApproveOffice : '-'}}</div>
                </td>
                <td>许可有效期限</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructApproveLimit" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructApproveLimit ? v.constructApproveLimit : '-'}}</div>
                </td>
                <td>证书状态</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructCertificateStatus" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructCertificateStatus ? v.constructCertificateStatus : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>投资总额</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructTotalInvestment" clearable></el-input>
                    </div>
                    <div v-else>
                        <!-- {{v.constructTotalInvestment ? v.constructTotalInvestment : '-'}} -->
                        <span v-if="v.constructTotalInvestment">{{v.constructTotalInvestment | numFormat}}</span>
                        <span v-else>-</span>
                    </div>
                </td>
                <td>建设性质</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructBuildNature" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructBuildNature ? v.constructBuildNature : '-'}}</div>
                </td>
                <td>结构体系</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructStructuralSystem" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructStructuralSystem ? v.constructStructuralSystem : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>合同编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructContractNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructContractNo ? v.constructContractNo : '-'}}</div>
                </td>
                <td>合同工期</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructContractDuration" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructContractDuration ? v.constructContractDuration : '-'}}</div>
                </td>
                <td>合同价格</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructContractPrice" clearable></el-input>
                    </div>
                    <div v-else>
                        {{v.constructContractPrice ? v.constructContractPrice : '-'}}
                        <!-- <span v-if="v.constructContractPrice">{{v.constructContractPrice | numFormat}}</span>
                        <span v-else>-</span> -->
                    </div>
                </td>
            </tr>
            <tr>
                <td>合同开工日</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructContractStartDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructContractStartDate ? v.constructContractStartDate : '-'}}</div>
                </td>
                <td>合同竣工日</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructContractEndDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructContractEndDate ? v.constructContractEndDate : '-'}}</div>
                </td>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructUrl" clearable></el-input>
                    </div>
                    <a :href="v.constructUrl ? v.constructUrl : 'javascript:;'" target="_blank" v-else>{{v.constructUrl ? v.constructUrl : '-'}}</a>
                </td>
            </tr>
            <tr>
                <td>电子证照</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructElectronicLicense" clearable></el-input>
                    </div>
                    <a :href="v.constructElectronicLicense ? v.constructElectronicLicense : 'javascript:;'" target="_blank" v-else>{{v.constructElectronicLicense ? v.constructElectronicLicense : '-'}}</a>
                </td>
                <td>所在区县</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructDistrict" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructDistrict ? v.constructDistrict : '-'}}</div>
                </td>
                <td>建设地址</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructAddress" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructAddress ? v.constructAddress : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>工程规模（平方米）</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructEngineerScale" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructEngineerScale ? v.constructEngineerScale : '-'}}</div>
                </td>
                <td>建筑面积</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructBuildArea" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructBuildArea ? v.constructBuildArea : '-'}}</div>
                </td>
                <td>施工面积</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructArea" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructArea ? v.constructArea : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>行政人相对代码</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructRelativeCode" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructRelativeCode ? v.constructRelativeCode : '-'}}</div>
                </td>
                <td>法定代表人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructLegal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructLegal ? v.constructLegal : '-'}}</div>
                </td>
                <td>建设单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructBuildCompany" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructBuildCompany ? v.constructBuildCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设单位地址</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructBuildCompanyAddress" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructBuildCompanyAddress ? v.constructBuildCompanyAddress : '-'}}</div>
                </td>
                <td>建设单位项目负责人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructBuildCompanyPrincipal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructBuildCompanyPrincipal ? v.constructBuildCompanyPrincipal : '-'}}</div>
                </td>
                <td>工程总承包单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructContractorCompany" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructContractorCompany ? v.constructContractorCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>工程总承包项目经理</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructContractorCompanyManager" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructContractorCompanyManager ? v.constructContractorCompanyManager : '-'}}</div>
                </td>
                <td>监理单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructSupervision" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructSupervision ? v.constructSupervision : '-'}}</div>
                </td>
                <td>总监理工程师</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructSupervisionPrincipal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructSupervisionPrincipal ? v.constructSupervisionPrincipal : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>设计单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructDesignCompany" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructDesignCompany ? v.constructDesignCompany : '-'}}</div>
                </td>
                <td>设计单位项目负责人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructDesignCompanyPrincipal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructDesignCompanyPrincipal ? v.constructDesignCompanyPrincipal : '-'}}</div>
                </td>
                <td>勘察单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructSurveyCompany" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructSurveyCompany ? v.constructSurveyCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>勘察单位项目负责人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructSurveyCompanyPrincipal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructSurveyCompanyPrincipal ? v.constructSurveyCompanyPrincipal : '-'}}</div>
                </td>
                <td>施工单位</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructCompany" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructCompany ? v.constructCompany : '-'}}</div>
                </td>
                <td>施工单位项目负责人</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructCompanyPrincipal" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructCompanyPrincipal ? v.constructCompanyPrincipal : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设规划用地许可证编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.landCertificateNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.landCertificateNo ? v.landCertificateNo : '-'}}</div>
                </td>
                <td>建设工程规划许可证编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.engineerCertificateNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.engineerCertificateNo ? v.engineerCertificateNo : '-'}}</div>
                </td>
                <td>中标通知书编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructNoticeNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructNoticeNo ? v.constructNoticeNo : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>施工图审查合格书编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructQualifiedNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructQualifiedNo ? v.constructQualifiedNo : '-'}}</div>
                </td>
                <td>报建编号</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructNumber" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructNumber ? v.constructNumber : '-'}}</div>
                </td>
                <td>固定资产投资项目代码</td>
                <td>
                    <div v-if="isShow">
                        <el-input v-model="v.constructAssetNo" clearable></el-input>
                    </div>
                    <div v-else>{{v.constructAssetNo ? v.constructAssetNo : '-'}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['projectId'],
    data () {
        return {
            isShow: false,
            projectHousesConstructLicenseList: [
                {
                    constructAddress: "",
                    constructApproveLimit: "",
                    constructApproveOffice: "",
                    constructArea: "",
                    constructAssetNo: 0,
                    constructBuildArea: "",
                    constructBuildCompany: "",
                    constructBuildCompanyAddress: "",
                    constructBuildCompanyPrincipal: "",
                    constructBuildNature: "",
                    constructCertificateNo: "",
                    constructCertificateStatus: "",
                    constructCompany: "",
                    constructCompanyPrincipal: "",
                    constructContractDuration: "",
                    constructContractEndDate: "",
                    constructContractNo: "",
                    constructContractPrice: "",
                    constructContractStartDate: "",
                    constructContractorCompany: "",
                    constructContractorCompanyManager: "",
                    constructDesignCompany: "",
                    constructDesignCompanyPrincipal: "",
                    constructDistrict: "",
                    constructElectronicLicense: "",
                    constructEngineerScale: "",
                    constructIssueDate: "",
                    constructLegal: "",
                    constructNoticeNo: "",
                    constructNumber: "",
                    constructProjectName: "",
                    constructQualifiedNo: "",
                    constructRelativeCode: "",
                    constructStructuralSystem: "",
                    constructSupervision: "",
                    constructSupervisionPrincipal: "",
                    constructSurveyCompany: "",
                    constructSurveyCompanyPrincipal: "",
                    constructTotalInvestment: "",
                    constructUrl: "",
                    landCertificateNo: '',
                    engineerCertificateNo: ''
                }
            ]
        }
    },
    created () {
        if (this.$route.name === 'projectCompile') this.isShow = true
        this.getDetail(this.projectId)
    },
    methods: {
        getDetail (id) {
            if (this.$route.name === 'projectCompile') this.isShow = true
            this.$http('/dcp/select/project/houses/license', { id }, { type: 'get' }).then(res => {
                if (res.data.projectHousesConstructLicenseList && res.data.projectHousesConstructLicenseList.length > 0) {
                    this.projectHousesConstructLicenseList = res.data.projectHousesConstructLicenseList
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
