<template>
    <div class="table-wrap mt20">
        <div class="title-wrap">
            <div class="el-title xiu">
                {{ $route.query.companyName }}
            </div>
            <div class="el-createtime xiu">
                评估时间：{{$route.query.createTime}}
            </div>
        </div>
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane label="涉诉" name="first">
                <litigation v-if="activeName==='first'" />
            </el-tab-pane>
            <el-tab-pane label=" 经营" name="second">
                <business v-if="activeName==='second'" />
            </el-tab-pane>
            <el-tab-pane label="关联" name="three">
                <correlation v-if="activeName==='three'" />
            </el-tab-pane>
            <el-tab-pane label="反欺诈" name="fourth">
                <fraud v-if="activeName==='fourth'" />
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>

export default {
    components: {
        Fraud: () => import('./components/natureEvaluteList/fraud.vue'),
        Business: () => import('./components/natureEvaluteList/business.vue'),
        Litigation: () => import('./components/natureEvaluteList/litigation.vue'),
        correlation: () => import('./components/natureEvaluteList/correlation.vue')
    },

    data () {
        return {
            activeName: "first",
        };
    },
    created () {
        console.log(this.$route.query.menu, 'menu')
        if (this.$route.query.menu) {
            JSON.parse(this.$route.query.menu).map((i, index) => {
                if (i.url) {
                    this.$route.meta[index] = { name: i.name, path: i.url }
                } else {
                    this.$route.meta[index] = { name: i.name }

                }
            })
        }
    },

};
</script>
<style lang="scss" scoped>
.title-wrap {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: center;
    height: 20px;
    padding-bottom: 20px;
}
</style>

