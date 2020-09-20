<template>
    <div class="table-wrap">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="企业账号名单" name="first">
                <enterprisesList v-if="activeName==='first'"></enterprisesList>
            </el-tab-pane>
            <el-tab-pane label="企业账号审核" name="second">
                <enterprisesAudit v-if="activeName==='second'"></enterprisesAudit>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        enterprisesList: () => import("./bankId-company/enterprises-list.vue"),
        enterprisesAudit: () => import("./bankId-company/enterprises-audit.vue")
    },
    data() {
        return {
            activeName: "first"
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
