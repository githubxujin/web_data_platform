<template>
    <div class="table-wrap">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="业主企业名单" name="first">
                <ownerList v-if="activeName==='first'"></ownerList>
            </el-tab-pane>
            <el-tab-pane label="业主企业审核" name="second">
                <ownerAudit v-if="activeName==='second'"></ownerAudit>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        ownerList: () => import("./proprietor-company/owner-list.vue"),
        ownerAudit: () => import("./proprietor-company/owner-audit.vue")
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
