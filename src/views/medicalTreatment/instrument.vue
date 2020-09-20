<template>
    <!-- 器械库主页 -->
    <div class="instrument mt20">
        <el-tabs type="card" v-model="activeName">
            <!-- <el-tab-pane label="统计概况" name="first">
                累积收录器械产品注册数量
                <instrument-num />
            </el-tab-pane> -->
            <el-tab-pane label="数据明细" name="second">
                <instrument-detail />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
// import instrumentNum from "./instrumentPage/instrumentNum";
import instrumentDetail from "./instrumentPage/instrumentDetail.vue";
export default {
    components: {
        // instrumentNum,
        instrumentDetail
    },
    data () {
        return {};
    },
    methods: {},
    computed: {
        // 该状态数据用的其他的组件，该处不对，为了展示title临时使用
        activeName: {
            get () {
                return this.$store.state.tabs.activeName;
            },
            set () { }
        }
    }
};
</script>
