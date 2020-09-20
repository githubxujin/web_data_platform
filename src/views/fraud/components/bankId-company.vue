<template>
    <div class="table-wrap">
        <!-- <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="企业账号名单" name="first">
            </el-tab-pane>
        </el-tabs> -->
        <enterprisesList v-if="activeName==='first'"></enterprisesList>
    </div>
</template>

<script>
export default {
    components: {
        enterprisesList: () => import("./bankId-company/enterprises-list.vue"),
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
