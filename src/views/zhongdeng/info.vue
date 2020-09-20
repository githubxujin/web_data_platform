<template>
    <div class="stat">
        <div class="table-wrap mt20 mb30">
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="查重列表" name="first">
                    <check-list v-if="activeName==='first'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="登记明细查询" name="second">
                    <register-detail v-if="activeName==='second'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="登记汇总查询" name="third">
                    <register-total v-if="activeName==='third'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="中登数据库" name="fourth">
                    <zhongdeng-index v-if="activeName==='fourth'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="供应商解析" name="five">
                    <supplier-stat v-if="activeName==='five'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="承建单位解析" name="six">
                    <contract-stat v-if="activeName==='six'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="金融机构解析" name="seven">
                    <financial-stat v-if="activeName==='seven'" class="mt20" />
                </el-tab-pane>
                <el-tab-pane label="银行账号" name="night">
                    <bank-account v-if="activeName==='night'" class="mt20" />
                </el-tab-pane>

            </el-tabs>
        </div>
    </div>
</template>

<script>
import { setSession, getSession } from "@/config/utils"
export default {
    data() {
        return {
            activeName: 'first',
        }
    },
    created() {
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick(tab) {
            setSession(this.$route.name, tab.name)
        }
    },
    components: {
        'check-list': () => import('./pages/check/list'),
        'register-detail': () => import('./pages/register-detail/index'),
        'register-total': () => import('./pages/register-total'),
        'supplier-stat': () => import('./pages/supplier-stat.vue'),
        'contract-stat': () => import('./pages/contract-stat.vue'),
        'financial-stat': () => import('./pages/financial-stat.vue'),
        // 'project-stat': () => import('./pages/project-stat.vue'),
        'bank-account': () => import('./pages/bank-account.vue'),
        'zhongdeng-index': () => import('./pages/zhongdeng-index.vue')

    }
}
</script>
<style lang="scss" scoped>
    .light {
        .el-tabs--border-card {
            background: #fff;
        }
    }
    .stat {
        width: 1360px;
        margin: 0 auto;
        .nav-line {
            background: #232528;
            width: 100%;
            height: 20px;
        }
    }
    .tabs-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
    /deep/ .el-tabs__header {
        margin-top: 0;
    }
    /deep/ .el-table__expanded-cell {
        padding-right: 110px;
    }
    .add-export {
        margin-top: -8px;
        margin-bottom: 12px;
        padding-left: 15px;
        color: #366f71;
        box-sizing: border-box;
        span {
            display: inline-block;
            width: 28px;
            height: 28px;
            text-align: center;
            line-height: 27px;
            border: 1px solid #366f71;
            border-radius: 2px;
            font-size: 18px;
            cursor: pointer;
            margin-right: 14px;
            &:hover {
                color: #292b2f;
                background: #43a1ac;
                border: 1px solid #43a1ac;
            }
        }
    }
</style>
