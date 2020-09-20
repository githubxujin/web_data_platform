<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title">可行性研究报告审批前公示</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectConstructionPublicLicenseList" :key="i">
            <tr>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicUrl" clearable></el-input></div>
                    <a :href="v.publicUrl ? v.publicUrl : 'javascript:;'" target="_blank" v-else>{{v.publicUrl ? v.publicUrl : '-'}}</a>
                </td>
                <td>事项名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicItemName" clearable></el-input></div>
                    <div v-else>{{v.publicItemName ? v.publicItemName : '-'}}</div>
                </td>
                <td>申报单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicDeclareUnit" clearable></el-input></div>
                    <div v-else>{{v.publicDeclareUnit ? v.publicDeclareUnit : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>审批处室</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicApprovalOffice" clearable></el-input></div>
                    <div v-else>{{v.publicApprovalOffice ? v.publicApprovalOffice : '-'}}</div>
                </td>
                <td>建设单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicBuildCompany" clearable></el-input></div>
                    <div v-else>{{v.publicBuildCompany ? v.publicBuildCompany : '-'}}</div>
                </td>
                <td>建设地点</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicBuildLocation" clearable></el-input></div>
                    <div v-else>{{v.publicBuildLocation ? v.publicBuildLocation : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设期限</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicBuildLimit" clearable></el-input></div>
                    <div v-else>{{v.publicBuildLimit ? v.publicBuildLimit : '-'}}</div>
                </td>
                <td>建设及规模主要内容</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicBuildScale" clearable></el-input></div>
                    <div v-else>{{v.publicBuildScale ? v.publicBuildScale : '-'}}</div>
                </td>
                <td>总投资</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicInvestment" clearable></el-input></div>
                    <div v-else>{{v.publicInvestment ? v.publicInvestment : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>资金来源</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicSourceOfFund" clearable></el-input></div>
                    <div v-else>{{v.publicSourceOfFund ? v.publicSourceOfFund : '-'}}</div>
                </td>
                <td>联系电话</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicPhone" clearable></el-input></div>
                    <div v-else>{{v.publicPhone ? v.publicPhone : '-'}}</div>
                </td>
                <td>电子邮箱</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicEmail" clearable></el-input></div>
                    <div v-else>{{v.publicEmail ? v.publicEmail : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>邮政编码</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicPostalCode" clearable></el-input></div>
                    <div v-else>{{v.publicPostalCode ? v.publicPostalCode : '-'}}</div>
                </td>
                <td>邮政地址</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicPostalAddress" clearable></el-input></div>
                    <div v-else>{{v.publicPostalAddress ? v.publicPostalAddress : '-'}}</div>
                </td>
                <td>相关附件</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.publicAttachment" clearable></el-input></div>
                    <a :href="v.publicAttachment ? v.publicAttachment : 'javascript:;'" target="_blank" v-else>{{v.publicAttachment ? v.publicAttachment : '-'}}</a>
                </td>
            </tr>
            <tr>
                <td>相关导读（附件）</td>
                <td class="col-span" colspan="5">
                    <div v-if="isShow"><el-input v-model="v.publicGuide" clearable></el-input></div>
                    <a :href="v.publicGuide ? v.publicGuide : 'javascript:;'" target="_blank" v-else>{{v.publicGuide ? v.publicGuide : '-'}}</a>
                </td>
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
            projectConstructionPublicLicenseList: [{
                publicApprovalOffice: "",
                publicAttachment: "",
                publicBuildCompany: "",
                publicBuildLimit: "",
                publicBuildLocation: "",
                publicBuildScale: "",
                publicDeclareUnit: "",
                publicEmail: "",
                publicGuide: "",
                publicInvestment: "",
                publicItemName: "",
                publicPhone: "",
                publicPostalAddress: "",
                publicPostalCode: "",
                publicSourceOfFund: "",
                publicUrl: ""
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
                if (res.data.projectConstructionPublicLicenseList && res.data.projectConstructionPublicLicenseList.length > 0){
                    this.projectConstructionPublicLicenseList = res.data.projectConstructionPublicLicenseList
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
