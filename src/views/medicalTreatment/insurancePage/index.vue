<template>
    <div class="stat">
        <el-tabs type="card" v-model="activeName">
            <el-tab-pane label="统计概况" name="first">
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <detaiPage v-if="isLoad"/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
// import info from "./info.vue";
import detaiPage from "./detaiPage.vue";
export default {
    components: {
        detaiPage,
    },
    data() {
        return {
            activeName: 'first',
            isLoad: false
        };
    },
    watch: {
        activeName(v) {
            v && (this.isLoad = true)
        }
    },
    created() {

    },
    methods: {

    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
