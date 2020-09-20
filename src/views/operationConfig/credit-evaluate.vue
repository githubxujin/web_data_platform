<template>
    <div class="table-wrap mt20">
        <el-tabs type='border-card' v-model='activeName' @tab-click="handleClick">
            <el-tab-pane label='企业评估' name='first'>
                <company v-if="activeName==='first'" />
            </el-tab-pane>
            <el-tab-pane label='自然人评估' name='second'>
                <natural v-if="activeName==='second'" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import Company from "./components/creditEvalute/company.vue"
import Natural from "./components/creditEvalute/natural.vue"
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        Company,
        Natural
    },
    data () {
        return {
            activeName: 'first'
        };
    },
    created () {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        }
    }
};
</script>
