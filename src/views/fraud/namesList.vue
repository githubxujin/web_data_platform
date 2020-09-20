<template>
    <div class="table-wrap">
        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='核心企业' name='first'>
                <kernelCompany v-if="activeName==='first'"></kernelCompany>
            </el-tab-pane>
            <el-tab-pane label='业主企业' name='second'>
                <proprietorCompany v-if="activeName==='second'"></proprietorCompany>
            </el-tab-pane>
            <el-tab-pane label='企业账号' name='three'>
                <bankIdCompany v-if="activeName==='three'"></bankIdCompany>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script>
import kernelCompany from "./components/kernel-company.vue";
import proprietorCompany from "./components/proprietor-company";
import bankIdCompany from "./components/bankId-company";
export default {
    components: {
        kernelCompany,
        proprietorCompany,
        bankIdCompany
    },
    data() {
        return {
            activeName: 'first',
            tabName1: 'first',
            tabNmae2: 'first'
        };
    },
    methods: {}
};
</script>
