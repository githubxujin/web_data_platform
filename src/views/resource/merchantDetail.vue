<template>
    <div>
        <div class="table-wrap mt20">
            <qg-table :title="company.companyName">
                <qg-table-column label="企业电话">{{ company.phone}}</qg-table-column>
                <qg-table-column label="企业邮箱">{{ company.email}}</qg-table-column>
                <qg-table-column label="注册地址">{{ company.registration}}</qg-table-column>
                <qg-table-column label="实际经营地址">{{ company.businessAddress }}</qg-table-column>
            </qg-table>

            <el-tabs v-model="activeName" type="border-card" class="mt10">
                <el-tab-pane label="企业基本信息" name="first">
                    <company :company="company" v-if="activeName==='first'" />
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="second">
                    <business :id="$route.query.id" v-if="activeName==='second'" />
                </el-tab-pane>
                <el-tab-pane label="财务信息" name="seven">
                    <financial :id="$route.query.id" />
                </el-tab-pane>

                <el-tab-pane label="信用状况" name="thrid">
                    <credit v-if="activeName==='thrid'" :id="$route.query.id" />
                </el-tab-pane>
                <el-tab-pane label="在我司合作记录" name="four">
                    <record v-if="activeName==='four'" />
                </el-tab-pane>
                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <product v-if="activeName==='five'" :id="$route.query.id" />
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <event v-if="activeName==='six'" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        //  企业基本信息
        Company: () => import("./components/company.vue"),
        // //  企业经营指标
        Business: () => import("./components/business.vue"),
        Financial: () => import("./components/financial.vue"),
        //  实际控制人信用状况
        Credit: () => import("./components/credit.vue"),
        //  在我司合作记录
        Record: () => import("./components/record.vue"),
        //  企业相关产业背景信息
        Product: () => import("./components/product.vue"),
        //  企业相关重大事件或舆情
        Event: () => import("./components/event.vue")
    },
    created () {
        this.getList(this.$route.query.id)
    },
    data () {
        return {
            activeName: 'first',
            company: {},
        }
    },
    methods: {
        getList (id) {
            this.$http('/dcp//energy/base/info', { id }, { type: 'get' }).then(res => {
                this.company = res.data
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.report {
    color: #43a1ac;
    text-decoration: underline;
}
/deep/ .el-tabs__header {
    margin-top: 30px;
}
</style>
