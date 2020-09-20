<template>
    <div class="stat">
        <div class="table-wrap mt20 mb30">
            <div class="tabs-title mb20">上市药品库</div>
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="国内上市药品" name="first">
                    <detaiPage/>
                </el-tab-pane>
                <el-tab-pane label="已合作客户药品库" name="second">
                    <business-drug></business-drug>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
        }
    },
    created() {
    },
    methods: {
       
    },
    components: {
        'detaiPage': () => import('./detaiPage'),
        "business-drug": () => import("../../contentSetting/businessDrug"),
    }
}
</script>
<style lang="scss" scoped>
.light{
    .tabs-title{
        color: #333;
    }
}
.stat {
    width: 1360px;
    margin: 0 auto;
    .nav-line{
        background:#232528;width:100%;height:20px;
    }
}
.tabs-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
}
/deep/ .el-tabs__header {
    margin-top: 0;
}
/deep/ .el-table__expanded-cell {
    padding-right: 110px;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    padding-left: 15px;
    color: #366f71;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 27px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
</style>
