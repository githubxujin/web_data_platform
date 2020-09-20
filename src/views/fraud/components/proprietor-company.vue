<template>
    <div class="table-wrap">
        <!-- <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="业主企业名单" name="first">
            </el-tab-pane>
        </el-tabs> -->
        <ownerList v-if="activeName==='first'"></ownerList>
    </div>
</template>

<script>
export default {
    components: {
        ownerList: () => import("./proprietor-company/owner-list.vue"),
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
