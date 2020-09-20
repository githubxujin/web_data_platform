<template>
    <div>
        <!-- <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="核心企业名单" name="first">
                <kernelList v-if="activeName==='first'"></kernelList>
            </el-tab-pane>
            <el-tab-pane label="核心企业审核" name="second">
                <kernelAudit v-if="activeName==='second'"></kernelAudit>
            </el-tab-pane>
        </el-tabs> -->
    </div>
</template>

<script>
export default {
    components: {
        // kernelList: () => import("./kernel-company/kernel-list.vue"),
        // kernelAudit: () => import("./kernel-company/kernel-audit.vue")
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
