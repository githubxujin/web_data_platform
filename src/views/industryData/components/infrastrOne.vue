<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title">可行性研究报告批复</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectConstructionReplyLicenseList" :key="i">
            <tr>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyUrl" clearable></el-input></div>
                    <a :href="v.replyUrl ? v.replyUrl : 'javascript:;'" target="_blank" v-else>{{v.replyUrl ? v.replyUrl : '-'}}</a>
                </td>
                <td>公开事项名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyPublic" clearable></el-input></div>
                    <div v-else>{{v.replyPublic ? v.replyPublic : '-'}}</div>
                </td>
                <td>索引号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyIndex" clearable></el-input></div>
                    <div v-else>{{v.replyIndex ? v.replyIndex : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>主办单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyOrganizer" clearable></el-input></div>
                    <div v-else>{{v.replyOrganizer ? v.replyOrganizer : '-'}}</div>
                </td>
                <td>制发日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.replyIssueDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.replyIssueDate ? v.replyIssueDate : '-'}}</div>
                </td>
                <td>批复内容</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyContent" clearable></el-input></div>
                    <div v-else>{{v.replyContent ? v.replyContent : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>建设地点</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyLocation" clearable></el-input></div>
                    <div v-else>{{v.replyLocation ? v.replyLocation : '-'}}</div>
                </td>
                <td>建设内容</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyBuildContent" clearable></el-input></div>
                    <div v-else>{{v.replyBuildContent ? v.replyBuildContent : '-'}}</div>
                </td>
                <td>建设规模</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyBuildScale" clearable></el-input></div>
                    <div v-else>{{v.replyBuildScale ? v.replyBuildScale : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>受文单位</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyAcceptUnit" clearable></el-input></div>
                    <div v-else>{{v.replyAcceptUnit ? v.replyAcceptUnit : '-'}}</div>
                </td>
                <td>办理状态</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyHandleStatus" clearable></el-input></div>
                    <div v-else>{{v.replyHandleStatus ? v.replyHandleStatus : '-'}}</div>
                </td>
                <td>项目编码</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyProjectCode" clearable></el-input></div>
                    <div v-else>{{v.replyProjectCode ? v.replyProjectCode : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>项目名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyProjectName" clearable></el-input></div>
                    <div v-else>{{v.replyProjectName ? v.replyProjectName : '-'}}</div>
                </td>
                <td>审批文号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyApproveNo" clearable></el-input></div>
                    <div v-else>{{v.replyApproveNo ? v.replyApproveNo : '-'}}</div>
                </td>
                <td>项目法人</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.replyLegalPerson" clearable></el-input></div>
                    <div v-else>{{v.replyLegalPerson ? v.replyLegalPerson : '-'}}</div>
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
            projectConstructionReplyLicenseList: [{
                replyAcceptUnit: "",
                replyApproveNo: "",
                replyBuildContent: "",
                replyBuildScale: "",
                replyContent: "",
                replyHandleStatus: "",
                replyIndex: "",
                replyIssueDate: "",
                replyLegalPerson: "",
                replyLocation: "",
                replyOrganizer: "",
                replyProjectCode: "",
                replyProjectName: "",
                replyPublic: "",
                replyUrl: ""
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
                if (res.data.projectConstructionReplyLicenseList && res.data.projectConstructionReplyLicenseList.length > 0){
                    this.projectConstructionReplyLicenseList = res.data.projectConstructionReplyLicenseList
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
