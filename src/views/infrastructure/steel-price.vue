<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <div class='table-wrap box-shadow' v-if="activeName==='first'">
                    <el-tabs type='border-card' v-model="activeTabsName">
                        <el-tab-pane label='趋势' name="one">
                            <keep-alive>
                                <steel-price v-if="activeTabsName==='one'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label='明细' name="two">
                            <keep-alive>
                                <trend-price v-if="activeTabsName==='two'" />
                            </keep-alive>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <div class='table-wrap box-shadow' v-if="activeName==='second'">
                    <el-tabs type='border-card' v-model="activeDataName">
                        <el-tab-pane label='网价' name="a">
                            <keep-alive>
                                <data-detail v-if="activeDataName==='a'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label='地方指导价' name="b">
                            <keep-alive>
                                <gd-list v-if="activeDataName==='b'" />
                            </keep-alive>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss">
</style>

<script>
import SteelPrice from "@/components/Steel/steel-price.vue";
import TrendPrice from "@/components/Steel/trend-price.vue";
import DataDetail from "@/components/Steel/DataDetail.vue";
import GdList from "@/components/Steel/GdList.vue";
export default {
    components: {
        SteelPrice,
        DataDetail,
        TrendPrice,
        GdList
    },
    data () {
        return {
            activeName: "first",
            activeTabsName: "one",
            activeDataName: "a"
        };
    },
    methods: {
        handleClick () { }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-tabs--border-card {
    margin-top: 0;
    .el-tabs__header {
        margin-top: 0;
    }
    .el-serach-form {
        margin-left: 0;
    }
}
</style>
