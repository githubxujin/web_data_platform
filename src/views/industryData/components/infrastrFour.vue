<template>
    <div>
        <div class="tabs-title">施工许可证</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectConstructionConstructLicenseList" :key="i">
            <tr>
                <td>施工许可证编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructCertificateNo" clearable></el-input></div>
                    <div v-else>{{v.constructCertificateNo ? v.constructCertificateNo : '-'}}</div>
                </td>
                <td>发证机关</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructApproveOffice" clearable></el-input></div>
                    <div v-else>{{v.constructApproveOffice ? v.constructApproveOffice : '-'}}</div>
                </td>
                <td>发证日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructIssueDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructIssueDate ? v.constructIssueDate : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>状态</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructCertificateStatus" clearable></el-input></div>
                    <div v-else>{{v.constructCertificateStatus ? v.constructCertificateStatus : '-'}}</div>
                </td>
                <td>建设性质</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructBuildNature" clearable></el-input></div>
                    <div v-else>{{v.constructBuildNature ? v.constructBuildNature : '-'}}</div>
                </td>
                <td>结构体系</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructStructuralSystem" clearable></el-input></div>
                    <div v-else>{{v.constructStructuralSystem ? v.constructStructuralSystem : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>合同价格</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructContractPrice" clearable></el-input></div>
                    <div v-else>{{v.constructContractPrice ? v.constructContractPrice : '-'}}</div>
                </td>
                <td>施工面积</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructArea" clearable></el-input></div>
                    <div v-else>{{v.constructArea ? v.constructArea : '-'}}</div>
                </td>
                <td>合同开工日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructContractStartDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructContractStartDate ? v.constructContractStartDate : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>合同竣工日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.constructContractEndDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.constructContractEndDate ? v.constructContractEndDate : '-'}}</div>
                </td>
                <td>建设规模</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructBuildScale" clearable></el-input></div>
                    <div v-else>{{v.constructBuildScale ? v.constructBuildScale : '-'}}</div>
                </td>
                <td>建设规划用地许可证编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructLandCertificateNo" clearable></el-input></div>
                    <div v-else>{{v.constructLandCertificateNo ? v.constructLandCertificateNo : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设工程规划许可证编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructEngineerCertificateNo" clearable></el-input></div>
                    <div v-else>{{v.constructEngineerCertificateNo ? v.constructEngineerCertificateNo : '-'}}</div>
                </td>
                <td>中标通知书编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructNoticeNo" clearable></el-input></div>
                    <div v-else>{{v.constructNoticeNo ? v.constructNoticeNo : '-'}}</div>
                </td>
                <td>施工图审查合格书编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructQualifiedNo" clearable></el-input></div>
                    <div v-else>{{v.constructQualifiedNo ? v.constructQualifiedNo : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>合同编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructContractNo" clearable></el-input></div>
                    <div v-else>{{v.constructContractNo ? v.constructContractNo : '-'}}</div>
                </td>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructUrl" clearable></el-input></div>
                    <a :href="v.constructUrl ? v.constructUrl : 'javascript:;'" target="_blank" v-else>{{v.constructUrl ? v.constructUrl : '-'}}</a>
                </td>
                <td>建设地址</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructAddress" clearable></el-input></div>
                    <div v-else>{{v.constructAddress ? v.constructAddress : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructBuildCompany" clearable></el-input></div>
                    <div v-else>{{v.constructBuildCompany ? v.constructBuildCompany : '-'}}</div>
                </td>
                <td>建设单位项目负责人</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructBuildCompanyPrincipal" clearable></el-input></div>
                    <div v-else>{{v.constructBuildCompanyPrincipal ? v.constructBuildCompanyPrincipal : '-'}}</div>
                </td>
                <td>工程总承包单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructContractorCompany" clearable></el-input></div>
                    <div v-else>{{v.constructContractorCompany ? v.constructContractorCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>工程总承包项目经理</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructContractorCompanyManager" clearable></el-input></div>
                    <div v-else>{{v.constructContractorCompanyManager ? v.constructContractorCompanyManager : '-'}}</div>
                </td>
                <td>勘察单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructSurveyCompany" clearable></el-input></div>
                    <div v-else>{{v.constructSurveyCompany ? v.constructSurveyCompany : '-'}}</div>
                </td>
                <td>勘察单位项目负责人</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructSurveyCompanyPrincipal" clearable></el-input></div>
                    <div v-else>{{v.constructSurveyCompanyPrincipal ? v.constructSurveyCompanyPrincipal : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>施工单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructCompany" clearable></el-input></div>
                    <div v-else>{{v.constructCompany ? v.constructCompany : '-'}}</div>
                </td>
                <td>施工单位项目负责人</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructCompanyPrincipal" clearable></el-input></div>
                    <div v-else>{{v.constructCompanyPrincipal ? v.constructCompanyPrincipal : '-'}}</div>
                </td>
                <td>监理单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructSupervision" clearable></el-input></div>
                    <div v-else>{{v.constructSupervision ? v.constructSupervision : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>监理单位项目负责人</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.constructSupervisionPrincipal" clearable></el-input></div>
                    <div v-else>{{v.constructSupervisionPrincipal ? v.constructSupervisionPrincipal : '-'}}</div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
     props: ['projectId'],
    data() {
        return {
            isShow: false,
            projectConstructionConstructLicenseList: [{
                constructAddress: "",
                constructApproveOffice: "",
                constructArea: "",
                constructBuildCompany: "",
                constructBuildCompanyPrincipal: "",
                constructBuildNature: "",
                constructBuildScale: "",
                constructCertificateNo: "",
                constructCertificateStatus: "",
                constructCompany: "",
                constructCompanyPrincipal: "",
                constructContractEndDate: "",
                constructContractNo: "",
                constructContractPrice: "",
                constructContractStartDate: "",
                constructContractorCompany: "",
                constructContractorCompanyManager: "",
                constructEngineerCertificateNo: "",
                constructForensics: "",
                constructIssueDate: "",
                constructLandCertificateNo: "",
                constructNoticeNo: "",
                constructQualifiedNo: "",
                constructStructuralSystem: "",
                constructSupervision: "",
                constructSupervisionPrincipal: "",
                constructSurveyCompany: "",
                constructSurveyCompanyPrincipal: "",
                constructUrl: ""
            }]
        }
    },
    created() {
        if (this.$route.name === 'projectCompile') this.isShow = true
        this.getDetail(this.projectId)
    },
    methods: {
        getDetail (id){
            this.$http('/dcp/select/project/construction/license', {id}, {type: 'get'}).then( res => {
                if (res.data.projectConstructionConstructLicenseList && res.data.projectConstructionConstructLicenseList.length > 0){
                    this.projectConstructionConstructLicenseList = res.data.projectConstructionConstructLicenseList
                } 
            })
        }
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
        padding: 17px 15px;
        min-height: 48px;
        line-height: 16px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
    }
}
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
/deep/ .el-date-editor.el-input {
    width: 100%;
}
</style>
