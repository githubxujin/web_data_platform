<template>
    <div>
        <!-- 联系人信息 -->
        <div class="tabs-title mb20 pt30">联系人信息</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="gendr" label="性别" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.gendr ? item.row.gendr : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="zhuang" label="婚姻状况" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.zhuang ? item.row.zhuang : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="years" label="从业年限" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.years ? item.row.years : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <!-- 联系人信息 -->
        <!-- 法人风险资讯 -->
        <div class="tabs-title mb20 pt30">法人风险资讯</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column prop="name" label="个人正信记录" align="center"></el-table-column>
            <el-table-column prop="name" label="逾期" align="center"></el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
        </el-table>
        <!-- 法人风险资讯 -->
        <!-- 实际控制人个人信息 -->
        <div class="tabs-title mb20 pt30">实际控制人个人信息</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="name" label="性别" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="name" label="婚姻状况" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="name" label="从业年限" show-overflow-tooltip> </el-table-column>
        </el-table>
        <!-- 实际控制人个人信息 -->
        <!-- 实际控制人风险资讯 -->
        <div class="tabs-title mb20 pt30">实际控制人风险资讯</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column type="name" label="个人正信记录" align="center"></el-table-column>
            <el-table-column prop="name" label="逾期" align="center"></el-table-column>
            <el-table-column prop="name" label="涉诉" align="center"></el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip> </el-table-column>
        </el-table>
        <!-- 实际控制人风险资讯 -->
        <!-- 其他人员个人信息 -->
        <div class="tabs-title mb20 pt30">其他人员个人信息</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" label="类别" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="name" label="性别" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="name" label="婚姻状况" show-overflow-tooltip> </el-table-column>
            <el-table-column prop="name" label="从业年限" show-overflow-tooltip> </el-table-column>
        </el-table>
        <!-- 其他人员个人信息 -->
        <!-- 其他人员风险资讯 -->
        <div class="tabs-title mb20 pt30">其他人员风险资讯</div>
        <el-table :data="linkmanList" border class="tab-info">
            <el-table-column prop="name" label="个人正信记录" align="center"></el-table-column>
            <el-table-column prop="name" label="逾期" align="center"></el-table-column>
            <el-table-column prop="name" label="涉诉" align="center"></el-table-column>
            <el-table-column prop="name" label="失信被执行人" show-overflow-tooltip> </el-table-column>
        </el-table>
        <!-- 其他人员风险资讯 -->

    </div>
</template>
<script>
export default {
    components: {},
    data() {
        return {
            linkmanList: []
        };
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    td:nth-child(odd) {
        /* width: 165px; */
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
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
.report {
    color: #43a1ac;
    text-decoration: underline;
}
</style>
