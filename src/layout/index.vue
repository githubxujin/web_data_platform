<template>
    <div class="main">
        <el-backtop target=".main" :right="value">
            <div class="el-back-top">

                <i class="el-icon-arrow-up"></i>
            </div>
        </el-backtop>
        <c-header />
        <c-nav></c-nav>

        <div class="content">
            <div class="content-wrap">

                <!-- <keep-alive> -->
                <router-view></router-view>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        cHeader: () => import("../components/Header/index"),
        cNav: () => import("../components/Nav/index.vue")
    },
    comments: {
        key () {
            return this.$route.path
        }
    },
    data () {
        return {
            value: 20
        }
    }
};
</script>
<style lang="scss" scoped>
.main {
    flex-direction: column;
    /* background: #1d1e23; */
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    .content {
        overflow-y: hidden;
        overflow-x: hidden;
        &-wrap {
            width: 1360px;
            margin: 0 auto;
        }
    }
}
</style>