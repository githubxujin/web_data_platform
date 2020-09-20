<template>
    <div>
        <div class="table-wrap mt20">
            <qg-table :title="$route.query.companyName">
                <qg-table-column label="企业电话">{{ company.phone }}</qg-table-column>
                <qg-table-column label="企业邮箱">{{ company.email }}</qg-table-column>
                <qg-table-column label="注册地址">{{ company.address}}</qg-table-column>
                <qg-table-column label="实际经营地址">{{ company.address}}</qg-table-column>
            </qg-table>

            <el-tabs v-model="activeName" type="border-card" class="mt10">
                <el-tab-pane label="企业基本信息" name="first">
                    <company :company="company" v-if="activeName==='first'" />
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="second">
                    <business :companyName="$route.query.companyName" v-if="activeName==='second'" />
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="thrid">
                    <credit v-if="activeName==='thrid'" />
                </el-tab-pane>
                <el-tab-pane label="在我司合作记录" name="four">
                    <record v-if="activeName==='four'" />
                </el-tab-pane>
                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <product :id="$route.query.id" :companyName="$route.query.companyName" :source="$route.query.source" v-if="activeName==='five'" />
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
        Company: () => import("@/components/Supplier/company.vue"),
        Business: () => import("@/components/Supplier/business.vue"),
        Credit: () => import("@/components/Supplier/credit.vue"),
        Record: () => import("@/components/Supplier/record.vue"),
        Product: () => import("@/components/Supplier/product.vue"),
        Event: () => import("@/components/Supplier/event.vue")
    },
    data () {
        return {
            activeName: 'first',
            company: {}
        }
    },
    created () {
        let companyName = this.$route.query.companyName
        console.log(companyName)
        this.getDetail(companyName)
    },
    methods: {
        // 获取企业信息
        getDetail (companyName) {
            this.$http('/dcp/energy/company/info', { companyName }, { type: 'get' }).then(res => {
                this.company = res.data
            })
        },
    },
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__header {
    margin-top: 30px;
}
</style>
