<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <general />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                222
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import General from "@/components/Winning/general.vue";
export default {
    components: {
        General
    },
    data() {
        return {
            activeName: "first"
        };
    },
    methods: {
        handleClick() {}
    }
};
</script>

