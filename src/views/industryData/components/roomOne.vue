<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title">建设用地规划许可证</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectHousesLandLicenseList" :key="i">
            <tr>
                <td>项目名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landProjectName" clearable></el-input></div>
                    <div v-else>{{v.landProjectName ? v.landProjectName : '-'}}</div>
                </td>
                <td>证书编号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landCertificateNo" clearable></el-input></div>
                    <div v-else>{{v.landCertificateNo ? v.landCertificateNo : '-'}}</div>
                </td>
                <td>建设单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landBuildCompany" clearable></el-input></div>
                    <div v-else>{{v.landBuildCompany ? v.landBuildCompany : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>核发日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.landIssueDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.landIssueDate ? v.landIssueDate : '-'}}</div>
                </td>
                <td>用地性质</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landUseNature" clearable></el-input></div>
                    <div v-else>{{v.landUseNature ? v.landUseNature : '-'}}</div>
                </td>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landUrl" clearable></el-input></div>
                    <a :href="v.landUrl ? v.landUrl : 'javascript:;'" target="_blank" v-else>{{v.landUrl ? v.landUrl : '-'}}</a>
                </td>
            </tr>
            <tr>
                <td>建设位置</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landLocation" clearable></el-input></div>
                    <div v-else>{{v.landLocation ? v.landLocation : '-'}}</div>
                </td>
                <td>用地面积</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landArea" clearable></el-input></div>
                    <div v-else>{{v.landArea ? v.landArea : '-'}}</div>
                </td>
                <td>建设规模</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landBuildScale" clearable></el-input></div>
                    <div v-else>{{v.landBuildScale ? v.landBuildScale : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>证照图片</td>
                <td class="col-span" colspan="5">
                    <div v-if="isShow"><el-input v-model="v.landPicture" clearable></el-input></div>
                    <a :href="v.landPicture ? v.landPicture : 'javascript:;'" target="_blank" v-else>{{v.landPicture ? v.landPicture : '-'}}</a>
                </td>
            </tr>
            <tr>
                <td>附件</td>
                <td class="col-span" colspan="5">
                    <div v-if="isShow"><el-input v-model="v.landAttachment" clearable></el-input></div>
                    <a :href="v.landAttachment ? v.landAttachment : 'javascript:;'" target="_blank" v-else>{{v.landAttachment ? v.landAttachment : '-'}}</a>
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
            projectHousesLandLicenseList:[ 
                {
                    landArea: "",
                    landAttachment: "",
                    landBuildCompany: "",
                    landBuildScale: "",
                    landCertificateNo: "",
                    landIssueDate: "",
                    landLocation: "",
                    landPicture: "",
                    landProjectName: "",
                    landUrl: "",
                    landUseNature: "",
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
                if (res.data.projectHousesLandLicenseList && res.data.projectHousesLandLicenseList.length > 0){
                    this.projectHousesLandLicenseList = res.data.projectHousesLandLicenseList
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
