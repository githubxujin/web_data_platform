<template>
    <div class="table-wrap">
        <el-form :model="tableData1" inline :disabled="true" class="info">
            <el-form-item>
                {{$route.query.name}}
                <span v-if="tableData1.sex==='男'"><i class="iconfont icon-nanxing"></i></span>
                <span v-else-if="tableData1.sex==='女'">
                    <i class="iconfont icon-nv "></i>
                </span>
                <span v-else></span>
            </el-form-item>
            <el-row class="">
                <el-form-item label="性别:">
                    {{tableData1.sex}}
                </el-form-item>
                <el-form-item label="证件类型:">
                    {{tableData1.creditType}}
                </el-form-item>
                <el-form-item label="证件号码:">
                    {{tableData1.creditCode}}
                </el-form-item>
            </el-row>
        </el-form>
        <el-tabs type="border-card">
            <el-tab-pane label="职业注册信息">
                <div class="el-bg"></div>
                <table class="el-table-list">
                    <tr>
                        <td>注册类型</td>
                        <td>{{tableData1.registerType}}</td>
                        <td>执业印章号</td>
                        <td>{{tableData1.sealNo}}</td>
                    </tr>
                    <tr>
                        <td>注册专业</td>
                        <td>{{tableData1.registerMajor}}</td>
                        <td>有效期</td>
                        <td>{{tableData1.validatePeriod}}</td>
                    </tr>
                    <tr>
                        <td>证书编号</td>
                        <td>{{tableData1.creditNumber}}</td>
                        <td>注册单位</td>
                        <td>{{tableData1.registerUnit}}</td>
                    </tr>
                </table>
            </el-tab-pane>
            <!-- <el-tab-pane label="个人工程业绩">
                <project />
            </el-tab-pane>
            <el-tab-pane label="不良行为">
                <bad />
            </el-tab-pane>
            <el-tab-pane label="良好行为">
                <good />
            </el-tab-pane>
            <el-tab-pane label="黑名单记录">
                <black />
            </el-tab-pane>
            <el-tab-pane label="变更记录">
                <record />
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped>
/deep/ .iconfont {
    color: #43a1ac;
}
/deep/ .el-form-item__label {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #a0a3a8;
}
/deep/ .el-form-item__content {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #d3d3d4;
}
.el-bg {
    height: 20px;
    background: #232528;
}
.info {
    margin-top: -10px;
    color: #d3d3d4;
}
/deep/ .el-row {
    margin-top: -30px;
}

.el-table-list {
    width: 100%;
    border: 1px solid rgb(84, 87, 92);
    border-collapse: collapse;
    font-family: PingFangSC-Regular;
    td:nth-child(odd) {
        width: 150px;
        background: rgb(41, 43, 47);
        color: #a0a3a8;
        border-bottom: 1px solid rgb(84, 87, 92);
    }
    td {
        color: rgb(193, 193, 195);
        padding: 17px 5px 17px 20px;
        line-height: 16px;
        border-bottom: 1px solid rgb(84, 87, 92);
    }
}
</style>
<script>
export default {
    data() {
        return {
            tableData1: {},
            id: this.$route.query.id
        };
    },

    created() {
        console.log(123);
        // this.staffDetail();
        this.staffDetail();
    },
    methods: {
        staffDetail() {
            console.log(this.id, "111");
            console.log(this.$route.query.id, "id");
            this.$http(`/dcp/query/staff/staffDetail/${this.id}`, {}).then(
                res => {
                    let data = res && res.data ? res.data : {};
                    this.tableData1 = data;
                }
            );
        }
    }
};
</script>

