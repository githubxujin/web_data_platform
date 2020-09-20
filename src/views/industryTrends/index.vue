<template>
    <div class="table-wrap mt20 mb20">
        <div>
            <el-tabs type='border-card' v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label='动态列表' name="first">
                    <dynamic-list v-if="isIndex0"></dynamic-list>
                </el-tab-pane>
                <el-tab-pane label="收藏列表" name="second">
                    <collect-list v-if="isIndex1"></collect-list>
                </el-tab-pane>

                <el-tab-pane label="公众号列表" name="fourth">
                    <tencen-list v-if="isIndex2"></tencen-list>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- <c-Bread v-if="isRisk === 0" text="基建动态"></c-Bread>
        <c-Bread v-if="isRisk === 1 || isRisk === 2" :text="isRisk === 1 ? '新建模版' : '编辑模版'"></c-Bread> -->
        <!-- <el-row class="table-wrap mt20 mb20">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="动态列表" name="first">
                    <dynamic-list v-if="isIndex0"></dynamic-list>
                </el-tab-pane>
                <el-tab-pane label="收藏列表" name="second">
                    <collect-list v-if="isIndex1"></collect-list>
                </el-tab-pane>
                <el-tab-pane label="风险通知" name="third">
                    <risk-otification v-if="isIndex2 && isRisk === 0" @passData="getData"></risk-otification>
                    <new-temlate v-if="isRisk === 1" @toBack="getBack"></new-temlate>
                    <redact-template :id="id" :isCode="isCode" v-if="isRisk === 2" @toBack="getBack"></redact-template>
                </el-tab-pane>
                <el-tab-pane label="公众号列表" name="fourth">
                    <tencen-list v-if="isIndex3"></tencen-list>
                </el-tab-pane>
            </el-tabs>
        </el-row> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first',
            isIndex0: true,
            isIndex1: false,
            isIndex2: false,
            isIndex3: false,
            isRisk: 0,
            id: '',
            isCode: ''
        }
    },
    created() {

    },
    methods: {
        handleClick(tab, event) {
            if (tab.index === '0') {
                this.isIndex0 = true
                this.isIndex1 = false
                this.isIndex2 = false
                this.isIndex3 = false
                this.isRisk = 0
            } else if (tab.index === '1') {
                this.isIndex0 = false
                this.isIndex1 = true
                this.isIndex2 = false
                this.isIndex3 = false
                this.isRisk = 0
            } else if (tab.index === '2') {
                this.isIndex0 = false
                this.isIndex1 = false
                this.isIndex2 = true
                this.isIndex3 = false
                this.isRisk = 0
            } else if (tab.index === '3') {
                this.isIndex0 = false
                this.isIndex1 = false
                this.isIndex2 = false
                this.isIndex3 = true
                this.isRisk = 0
            }
        },
        getData(v, id, isCode) {
            // console.log(v,id,num);
            this.isRisk = v
            this.id = id
            this.isCode = isCode
        },
        getBack(data) {
            // console.log('isRisk',data);
            this.isRisk = data
        }
    },
    filters: {
    },
    components: {
        'dynamic-list': () => import('./dynamicList'),
        'collect-list': () => import('./collectList'),
        // 'risk-otification': () => import('./riskNotification'),
        'tencen-list': () => import('./tencenList'),
        // 'new-temlate': () => import('./newTemplate'),
        // 'redact-template': () => import('./redactTemplate')
    }
}   
</script>
<style lang="less" scoped>
.stat {
    /deep/ .el-tabs__header {
        margin-bottom: 20px;
    }
    /deep/ .el-tabs__nav-scroll {
        margin: 0;
    }
    /deep/ .el-tabs__content {
        min-height: calc(~"100vh - 250px");
    }
}
</style>