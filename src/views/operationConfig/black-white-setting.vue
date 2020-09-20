<template>
    <div class="">
        <el-tabs type='card' v-model='activeName' @tab-click="handleClick">
            <el-tab-pane label='企业名单' name='first'>
                <div class="table-wrap">
                    <el-tabs type='border-card' v-model='companyActiveName' @tab-click="companyClick">
                        <el-tab-pane label='列表' name='first'>
                            <kernel-list />
                        </el-tab-pane>
                        <el-tab-pane label='审核' name='second'>
                            <kernel-audit />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label='账号名单' name='second'>
                <div class="table-wrap">
                    <el-tabs type='border-card' v-model='accountActiveName' @tab-click="accountClick">
                        <el-tab-pane label='列表' name='first'>
                            <bankId-list />
                        </el-tab-pane>
                        <el-tab-pane label='审核' name='second'>
                            <bankId-audit />
                        </el-tab-pane>
                    </el-tabs>
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
        kernelList: () => import('./components/blackWhiteSetting/kernel-company/kernel-list.vue'),
        kernelAudit: () => import('./components/blackWhiteSetting/kernel-company/kernel-audit.vue'),
        //企业名单
        bankIdList: () => import('./components/blackWhiteSetting/bankId-company/enterprises-list.vue'),
        bankIdAudit: () => import('./components/blackWhiteSetting/bankId-company/enterprises-audit.vue'),
    },
    data () {
        return {
            activeName: 'first',
            companyActiveName: 'first',
            accountActiveName: 'first',
        };
    },
    created () {
        this.activeName = getSession(this.$route.name + 'activeName') || 'first'
        this.companyActiveName = getSession(this.$route.name + 'companyActiveName') || 'first'
        this.accountActiveName = getSession(this.$route.name + 'accountActiveName') || 'first'
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name + 'activeName', tab.name)
        },
        companyClick (tab) {
            setSession(this.$route.name + 'companyActiveName', tab.name)
        },
        accountClick (tab) {
            setSession(this.$route.name + 'accountActiveName', tab.name)
        },
    }
};
</script>
<style lang="scss" scoped>
.active {
    color: #43a1ac;
}
</style>
