<template>
    <div class="stat">
        <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <data-stat />
                <pie />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <medical-organization />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import medicalOrganization from "@/views/medicalTreatment/medicalOrganization.vue";
import DataStat from "@/components/medicalComPage/medicaldata-stat.vue";
import Pie from "@/components/medicalComPage/medicalpie.vue";
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        medicalOrganization,
        DataStat,
        Pie
    },
    data() {
        return {
            activeName: 'first',
        };
    },
    created() {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick(tab) {
            setSession(this.$route.name, tab.name)
        },
    }
};
</script>
<style lang="scss" scoped>
    .stat {
        width: 1360px;
        margin: 0 auto;
    }
</style>
