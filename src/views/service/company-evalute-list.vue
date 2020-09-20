<template>
    <div class="table-wrap mt20">
        <div class="title-wrap">
            <div class="el-title xiu">
                {{ $route.query.companyName }}
            </div>
            <div class="el-createtime xiu">
                评估时间：{{ $route.query.createTime }}
            </div>
        </div>
        <el-tabs type="border-card" v-model="activeName" style="marign-top: -100px">
            <el-tab-pane label="基本信息" name="first">
                <baseInfo v-if="activeName === 'first'" />
            </el-tab-pane>
            <el-tab-pane label="经营" name="second">
                <business v-if="activeName === 'second'" />
            </el-tab-pane>
            <el-tab-pane label="涉诉" name="three">
                <litigation v-if="activeName === 'three'" />
            </el-tab-pane>
            <el-tab-pane label="资产/交易" name="fourth">
                <transaction v-if="activeName === 'fourth'" />
            </el-tab-pane>
            <el-tab-pane label="债券" name="five">
                <debenture v-if="activeName === 'five'" />
            </el-tab-pane>
            <el-tab-pane label="关联数据(重要)" name="six">
                <correlation v-if="activeName === 'six'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import baseInfo from "./components/companyEvaluteList/baseInfo.vue";
import business from "./components/companyEvaluteList/business.vue";
import transaction from "./components/companyEvaluteList/transaction.vue";
import litigation from "./components/companyEvaluteList/litigation.vue";
import debenture from "./components/companyEvaluteList/debenture.vue";
import correlation from "./components/companyEvaluteList/correlation.vue";
export default {
    components: {
        baseInfo,
        business,
        transaction,
        litigation,
        debenture,
        correlation
    },

    data () {
        return {
            activeName: "first"
        };
    },
    created () {
        if (this.$route.query.menu) {
            JSON.parse(this.$route.query.menu).map((i, index) => {
                if (i.url) {
                    this.$route.meta[index] = { name: i.name, path: i.url }
                } else {
                    this.$route.meta[index] = { name: i.name }

                }
            })
        }
        console.log(this.$route);
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
.dark {
    .title-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
        height: 20px;
        padding-bottom: 20px;
    }
    .el-createtime.xiu {
        font-weight: normal;
        font-family: PingFangSC-Thin;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
    .el-title.xiu {
        margin-top: 0;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
}
.light {
    .title-wrap {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
        height: 20px;
        padding-bottom: 20px;
    }
    .el-createtime.xiu {
        font-weight: normal;
        font-family: PingFangSC-Thin;
        font-size: 16px;
        color: #333;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
    .el-title.xiu {
        margin-top: 0;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
}
</style>
