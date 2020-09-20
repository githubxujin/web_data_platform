<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">
                <!-- {{ company.companyName ? company.companyName : '-' }} -->
                深圳市广聚能源股份有限公司
            </div>
            <table class="el-table-list">
                <tr>
                    <td>企业电话</td>
                    <td>{{ company.phone? company.phone : '-' }}</td>
                </tr>
                <tr>
                    <td>企业邮箱</td>
                    <td>{{ company.email? company.email : '-' }}</td>
                </tr>
                <tr>
                    <td>注册地址</td>
                    <td>{{ company.registration ? company.registration : '-' }}</td>
                </tr>
                <tr>
                    <td>实际经营地址</td>
                    <td>{{ company.businessAddress ? company.businessAddress : '-' }}</td>
                </tr>
            </table>

            <el-tabs v-model="activeName" type="border-card" class="mt10">
                <el-tab-pane label="企业基本信息" name="first">
                    <company :company="company" v-if="activeName==='first'" />
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="second">
                    <business :companyName="$route.query.companyName" />
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="thrid">
                    <credit />
                </el-tab-pane>
                <el-tab-pane label="在我司合作记录" name="four">
                    <record />
                </el-tab-pane>
                <el-tab-pane label="企业相关产业背景信息" name="five">
                     <product :id="$route.query.id" :companyName="$route.query.companyName" :source="$route.query.source" />
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <event />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
    components: {
        //  企业基本信息
        Company: () => import("./commerce-detail/company.vue"),
        Business: () => import("./commerce-detail/business.vue"),
        Credit: () => import("./commerce-detail/credit.vue"),
        Record: () => import("./commerce-detail/record.vue"),
        Product: () => import("./commerce-detail/product.vue"),
        Event: () => import("./commerce-detail/event.vue")
    },
    created() {
        this.getList(this.$route.query.id)
    },
    data() {
        return {
            activeName: 'first',
            company: {},
        }
    },
    methods: {
        getList(id) {
            
        }
    },
}
</script>
<style lang="scss" scoped>
    .stat {
        width: 1360px;
        margin: 0 auto;
    }
    .el-table-list {
        width: 100%;
        border: 1px solid #54575c;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        td:nth-child(odd) {
            width: 165px;
            background: #292b2f;
            color: #a0a3a8;
            border-bottom: 1px solid #54575c;
        }
        td {
            color: #d3d3d4;
            padding: 17px 5px 17px 20px;
            line-height: 16px;
            border-bottom: 1px solid #54575c;
        }
    }
    .tabs-title {
        font-size: 14px;
        color: #43a1ac;
    }
    /deep/ .tab-info {
        border: 1px solid #54575c;
        // tr:last-child {
        //     td {
        //        border-bottom: 0;
        //     }
        // }
        th {
            color: #a0a3a8;
            border-right: 1px solid #54575c;
            font-weight: normal;
        }
        th.is-leaf {
            border-bottom: 1px solid #54575c;
        }
        td {
            color: #d3d3d4;
            font-weight: normal;
            border-bottom: 1px solid #54575c;
            border-right: 1px solid #54575c;
        }
    }
    .report {
        color: #43a1ac;
        text-decoration: underline;
    }
    /deep/ .el-tabs__header {
        margin-top: 30px;
    }
</style>
