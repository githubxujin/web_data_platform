<template>
    <div class="stat">
        <div class="table-wrap">
            <qg-table :title="basicInfo.companyName">
                <qg-table-column v-for="(item,index) in getRows()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
            </qg-table>
            <el-tabs type="border-card" v-model="activeName1" class="mt30">
                <el-tab-pane label="企业基本信息" name="one">
                    <keep-alive>
                        <basic-message ref="basicMessage" v-if="activeName1 === 'one'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="two">
                    <keep-alive>
                        <basic-target v-if="activeName1 === 'two'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用信息" name="three">
                    <keep-alive>
                        <control-credit v-if="activeName1 === 'three'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业证照&资质" name="fourth">
                    <keep-alive>
                        <basic-license v-if="activeName1 === 'fourth'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <keep-alive>
                        <basic-bginformation v-if="activeName1 === 'five'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="上市公司财报" name="seven" v-if="isStockSymbol()">
                    <keep-alive>
                        <quoted-company v-if="activeName1 === 'seven'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <keep-alive>
                        <basic-event v-if="activeName1 === 'six'" />
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import basicMessage from '@/views/middleManage/nomarket/basicMessage.vue';
import basicTarget from '@/views/middleManage/nomarket/basicTarget.vue';
import controlCredit from '@/views/middleManage/nomarket/controlCredit.vue';
import basicLicense from '@/views/middleManage/nomarket/basicLicense.vue';
import basicBginformation from '@/views/middleManage/nomarket/basicBginformation.vue';
import basicEvent from '@/views/middleManage/nomarket/basicEvent.vue';
import quotedCompany from '@/views/middleManage/nomarket/quotedCompany.vue';
export default {
    data () {
        return {
            activeName1: 'one',
            basicInfo: {}
        };
    },
    components: {
        basicMessage,
        basicTarget,
        controlCredit,
        basicLicense,
        basicBginformation,
        basicEvent,
        quotedCompany
    },
    created () {
        this.getList(this.$route.query.companyId)
        this.isStockSymbol()
    },
    methods: {
        isStockSymbol () {
            let arr = Object.keys(this.$route.query)
            return arr.includes('stockSymbol')
        },
        getRows () {
            return [
                { key: "企业电话", value: this.basicInfo.phone || '-', alone: true },
                { key: "企业邮箱", value: this.basicInfo.email || '-', alone: true },
                { key: "企业地址", value: this.basicInfo.address || '-', alone: true }
            ];
        },
        getList (companyId) {
            this.ajax
                .json('/dcp/query/drug/company/base/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.basicInfo = res.data
                    console.log(this.basicInfo, 'basic');

                });
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
