<template>
    <div class="table-wrap">
        <!-- <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="核心企业名单" name="first">
            </el-tab-pane>
        </el-tabs> -->
        <kernelList v-if="activeName==='first'"></kernelList>
    </div>
</template>

<script>
export default {
    components: {
        kernelList: () => import("./kernel-company/kernel-list.vue"),
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
