<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title">商品房预售许可证</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectHousesPresaleLicenseList" :key="i">
            <tr>
                <td>项目名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleProjectName" clearable></el-input></div>
                    <div v-else>{{v.presaleProjectName ? v.presaleProjectName : '-'}}</div>
                </td>
                <td>预售许可证证号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleCertificateNo" clearable></el-input></div>
                    <div v-else>{{v.presaleCertificateNo ? v.presaleCertificateNo : '-'}}</div>
                </td>
                <td>发证时间</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.presaleIssueDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.presaleIssueDate ? v.presaleIssueDate : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>许可机关</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleApproveOffice" clearable></el-input></div>
                    <div v-else>{{v.presaleApproveOffice ? v.presaleApproveOffice : '-'}}</div>
                </td>
                <td>有效期至</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.presaleEffectiveDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.presaleEffectiveDate ? v.presaleEffectiveDate : '-'}}</div>
                </td>
                <td>开工时间</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.presaleStartDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.presaleStartDate ? v.presaleStartDate : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>竣工时间</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.presaleEndDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.presaleEndDate ? v.presaleEndDate : '-'}}</div>
                </td>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleUrl" clearable></el-input></div>
                    <a :href="v.presaleUrl ? v.presaleUrl : 'javascript:;'" target="_blank" v-else>{{v.presaleUrl ? v.presaleUrl : '-'}}</a>
                </td>
                <td>许可有效期限</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleApproveLimit" clearable></el-input></div>
                    <div v-else>{{v.presaleApproveLimit ? v.presaleApproveLimit : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>电子证照</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleElectronicLicense" clearable></el-input></div>
                    <div v-else>{{v.presaleElectronicLicense ? v.presaleElectronicLicense : '-'}}</div>
                </td>
                <td>所在区县</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleDistrict" clearable></el-input></div>
                    <div v-else>{{v.presaleDistrict ? v.presaleDistrict : '-'}}</div>
                </td>
                <td>坐落位置</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleAddress" clearable></el-input></div>
                    <div v-else>{{v.presaleAddress ? v.presaleAddress : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>行政相对人代码</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleRelativeCode" clearable></el-input></div>
                    <div v-else>{{v.presaleRelativeCode ? v.presaleRelativeCode : '-'}}</div>
                </td>
                <td>法定代表人姓名</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleLegal" clearable></el-input></div>
                    <div v-else>{{v.presaleLegal ? v.presaleLegal : '-'}}</div>
                </td>
                <td>开发企业</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleDevelopCompany" clearable></el-input></div>
                    <div v-else>{{v.presaleDevelopCompany ? v.presaleDevelopCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>预售登记备案管理部门</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleManageDepartment" clearable></el-input></div>
                    <div v-else>{{v.presaleManageDepartment ? v.presaleManageDepartment : '-'}}</div>
                </td>
                <td>土地用途和使用年限</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleUsefulLife" clearable></el-input></div>
                    <div v-else>{{v.presaleUsefulLife ? v.presaleUsefulLife : '-'}}</div>
                </td>
                <td>准许销售面积</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presaleArea" clearable></el-input></div>
                    <div v-else>{{v.presaleArea ? v.presaleArea : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>批准预售部位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.presalePosition" clearable></el-input></div>
                    <div v-else>{{v.presalePosition ? v.presalePosition : '-'}}</div>
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
            value: [],
            projectHousesPresaleLicenseList: [
                {
                    presaleAddress: "",
                    presaleApproveOffice: "",
                    presaleArea: "",
                    presaleCertificateNo: "",
                    presaleDevelopCompany: "",
                    presaleDistrict: "",
                    presaleEffectiveDate: "",
                    presaleElectronicLicense: "",
                    presaleEndDate: "",
                    presaleIssueDate: "",
                    presaleLegal: "",
                    presaleManageDepartment: "",
                    presalePosition: "",
                    presaleProjectName: "",
                    presaleRelativeCode: "",
                    presaleStartDate: "",
                    presaleUrl: "",
                    presaleUsefulLife: "",
                    presaleApproveLimit: ''
                }
            ]
        }
    },
    created() {
        if (this.$route.name === 'projectCompile') this.isShow = true
        this.getDetail(this.projectId)
    },
    methods: {
        getDetail (id){
            this.$http('/dcp/select/project/houses/license', {id}, {type: 'get'}).then( res => {
                if (res.data.projectHousesPresaleLicenseList && res.data.projectHousesPresaleLicenseList.length > 0){
                    this.projectHousesPresaleLicenseList = res.data.projectHousesPresaleLicenseList
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
