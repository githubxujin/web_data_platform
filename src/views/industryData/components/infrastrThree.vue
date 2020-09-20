<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title">项目用地批复</div>
        <table class="mt20" :class="{'table-three': true, 'is-compile': isShow}" v-for="(v,i) in projectConstructionLandLicenseList" :key="i">
            <tr>
                <td>查看链接</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landUrl" clearable></el-input></div>
                    <a :href="v.landUrl ? v.landUrl : 'javascript:;'" target="_blank" v-else>{{v.landUrl ? v.landUrl : '-'}}</a>
                </td>
                <td>索引号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landIndex" clearable></el-input></div>
                    <div v-else>{{v.landIndex ? v.landIndex : '-'}}</div>
                </td>
                <td>分类</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landType" clearable></el-input></div>
                    <div v-else>{{v.landType ? v.landType : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>发布机构</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landIssuer" clearable></el-input></div>
                    <div v-else>{{v.landIssuer ? v.landIssuer : '-'}}</div>
                </td>
                <td>生成日期</td>
                <td>
                    <div v-if="isShow">
                        <el-date-picker v-model="v.landGenerateDate" type="date" clearable placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                    </div>
                    <div v-else>{{v.landGenerateDate ? v.landGenerateDate : '-'}}</div>
                </td>
                <td>名称</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landName" clearable></el-input></div>
                    <div v-else>{{v.landName ? v.landName : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>文号</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landDocNo" clearable></el-input></div>
                    <div v-else>{{v.landDocNo ? v.landDocNo : '-'}}</div>
                </td>
                <td>主题词</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landKeyword" clearable></el-input></div>
                    <div v-else>{{v.landKeyword ? v.landKeyword : '-'}}</div>
                </td>
                <td>批复内容</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landContent" clearable></el-input></div>
                    <div v-else>{{v.landContent ? v.landContent : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>组配分类</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landGroupType" clearable></el-input></div>
                    <div v-else>{{v.landGroupType ? v.landGroupType : '-'}}</div>
                </td>
                <td>体载分类</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landGenreType" clearable></el-input></div>
                    <div v-else>{{v.landGenreType ? v.landGenreType : '-'}}</div>
                </td>
                <td>公开形势</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landOpenSituation" clearable></el-input></div>
                    <div v-else>{{v.landOpenSituation ? v.landOpenSituation : '-'}}</div>
                </td>
            </tr>
            <tr>
                <td>公开方式</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landOpenType" clearable></el-input></div>
                    <div v-else>{{v.landOpenType ? v.landOpenType : '-'}}</div>
                </td>
                <td>公开范围</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landOpenRange" clearable></el-input></div>
                    <div v-else>{{v.landOpenRange ? v.landOpenRange : '-'}}</div>
                </td>
                <td>有效期</td>
                <td>
                    <div v-if="isShow"><el-input v-model="v.landEndDate" clearable></el-input></div>
                    <div v-else>{{v.landEndDate ? v.landEndDate : '-'}}</div>
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
            projectConstructionLandLicenseList: [{
                landContent: "",
                landDocNo: "",
                landEndDate: "",
                landForensics: "",
                landGenerateDate: "",
                landGenreType: "",
                landGroupType: "",
                landIndex: "",
                landIssuer: "",
                landKeyword: "",
                landName: "",
                landOpenRange: "",
                landOpenSituation: "",
                landOpenType: "",
                landType: "",
                landUrl: ""
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
                if (res.data.projectConstructionLandLicenseList && res.data.projectConstructionLandLicenseList.length > 0){
                    this.projectConstructionLandLicenseList = res.data.projectConstructionLandLicenseList
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
