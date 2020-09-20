<template>
    <div>
        <el-tabs type='card' v-model='activeName' @tab-click="handleClick">
            <el-tab-pane label='企业名单' name='first'>
                <div class="table-wrap">
                    <kernel-list />
                </div>
            </el-tab-pane>
            <el-tab-pane label='账号名单' name='second'>
                <div class="table-wrap">
                    <bankId-list />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        //核心企业
        kernelList: () => import('../components/blackWhiteSetting/kernel-company/kernel-list.vue'),
        //企业名单
        bankIdList: () => import('../components/blackWhiteSetting/bankId-company/enterprises-list.vue'),
    },
    data() {
        return {
            activeName: 'first',
        };
    },
    created() {
        this.activeName = getSession(this.$route.name + 'activeName') || 'first'
    },
    methods: {
        handleClick(tab) {
            setSession(this.$route.name + 'activeName', tab.name)
        }
    }
};
</script>
<style lang="scss" scoped>
.active {
    color: #43a1ac;
}
.table-wrap{
  padding-top: 0;
}
</style>
