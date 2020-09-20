<template>
    <!-- 上市商业公司库（操作配置） -->
    <div class="stat">
        <div class="table-title mt20 ml20">
            <div>配送公司</div>
        </div>
        <div class="table-wrap mt20 mb30">
            <div class="tabs-title mb20">上市商业公司库</div>
            <el-table-row :rows="getRows()"></el-table-row>
            <el-tabs type="border-card" v-model="activeName1">
                <el-tab-pane label="企业基本信息" name="one">
                    <keep-alive>
                        <basic-message v-if="activeName1 === 'one'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="two">
                    <keep-alive>
                        <basic-target v-if="activeName1 === 'two'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="three">
                    <keep-alive>
                        <market-control-credit v-if="activeName1 === 'three'" />
                    </keep-alive>
                </el-tab-pane>
                <!-- <el-tab-pane label="企业证照&资质" name="fourth">
                    <keep-alive>
                        <basic-license v-if="activeName1 === 'fourth'" />
                    </keep-alive>
                </el-tab-pane> -->
                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <keep-alive>
                        <basic-bginformation v-if="activeName1 === 'five'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <keep-alive>
                        <basic-event v-if="activeName1 === 'six'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="上市公司详情" name="seven">
                    <keep-alive>
                        <market-company-detail v-if="activeName1 === 'seven'" />
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ElTableRow from "@/components/Table/el-table-row";
import basicMessage from '@/views/middleManage/market/basicMessage';
import basicTarget from '@/views/middleManage/market/basicTarget';
import marketControlCredit from '@/views/middleManage/market/marketControlCredit';
// import basicLicense from '@/views/middleManage/market/basicLicense';
import basicBginformation from '@/views/middleManage/market/basicBginformation';
import basicEvent from '@/views/middleManage/market/basicEvent';
import marketCompanyDetail from '@/views/middleManage/market/marketCompanyDetail'
export default {
    data() {
        return {
            activeName1: 'one',
            titleName: '公司名称需要修改'
        };
    },
    components: {
        ElTableRow,
        basicMessage,
        basicTarget,
        marketControlCredit,
        // basicLicense,
        basicBginformation,
        basicEvent,
        marketCompanyDetail
    },
    created() {
    },
    methods: {
        getRows() {
            return [
                { key: "企业电话", value: "-", alone: true },
                { key: "企业邮箱", value: "-", alone: true },
                { key: "企业地址", value: "-", alone: true }
            ];
        },
    }
};
</script>
<style lang="scss" scoped>
    .stat {
        width: 1360px;
        margin: 0 auto;
    }
    .tabs-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
</style>
