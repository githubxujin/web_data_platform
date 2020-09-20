<template>
    <div class="stat">
        <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
            <el-tab-pane label="统计概况" name="first">
                <data-stat v-if="activeName === 'first'" />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <project-list v-if="activeName === 'second'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import projectList from "./projectList.vue";
import DataStat from "./data-stat.vue";
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        projectList,
        DataStat,
    },
    data() {
        return {
            activeName: 'first',
            params: {},
            list: []
        };
    },
    computed: {

    },
    created() {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick(tab) {
            setSession(this.$route.name, tab.name)
        }
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
