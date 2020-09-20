<template>
    <div class="stat">
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="统计概况" name="first">
                <div class="table-wrap">
                    <el-tabs type='border-card' v-model='tabName' @tab-click="handleTab">
                        <el-tab-pane label='基本概况' name='first'>
                            <data-stat v-if="tabName==='first'" />
                        </el-tab-pane>
                        <el-tab-pane label='关联应用' name='second'>
                            <application v-if="tabName==='second'" />
                        </el-tab-pane>
                    </el-tabs>
                </div>                
                <!-- <data-stat /> -->
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <info v-if="activeName === 'second'" />
                <!-- <info v-if="isLoad"/> -->
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import info from "./info.vue";
import DataStat from "./pages/data-stat.vue";
import { setSession, getSession } from "@/config/utils"

export default {
    components: {
        info,
        DataStat,
        application: () => import("./pages/application.vue"),
    },
    data() {
        return {
            activeName: 'first',
            tabName: 'first',
            params: {},
            list: [],
            isLoad: false
        };
    },
    watch:{
        activeName(v){
            v && (this.isLoad = true)
        }
    },
    created () {
        this.activeName = getSession(`${this.$route.name}home`) || 'first'
        this.tabName = getSession(`${this.$route.name}tab`) || 'first'

    },
    methods: {
        handleClick (tab) {
            setSession(`${this.$route.name}home`, tab.name)
        },
        handleTab (tab) {
            setSession(`${this.$route.name}tab`, tab.name)
        }
    }
};
</script>
<style lang="scss" scoped>
</style>
