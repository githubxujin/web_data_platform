<template>
    <!-- 上市公司编辑页面 -->
    <div class="stat">
        <div class="table-wrap mt20 ">
            <table class=" table-tit ">
                <tr>
                    <td>
                        <span>*</span>
                        配送公司？</td>
                    <td>
                        <el-input v-if=" isAdd" clearable placeholder="配送公司">
                        </el-input>
                        <el-input v-else clearable></el-input>
                    </td>
                </tr>
            </table>
        </div>
        <div class="table-wrap mt20 mb30">
            <el-table-row :rows="getRows()"></el-table-row>
            <el-tabs type="border-card" v-model="activeName1">
                <el-tab-pane label="企业基本信息" name="one">
                    <keep-alive>
                        <market-basic-message v-if="activeName1 === 'one'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="two">
                    <keep-alive>
                        <market-basic-target v-if="activeName1 === 'two'" />
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
                        <market-basic-bginformation v-if="activeName1 === 'five'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <keep-alive>
                        <market-basic-event v-if="activeName1 === 'six'" />
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import ElTableRow from "@/components/Table/el-table-row";
import marketBasicMessage from '@/views/contentSetting/marketSitting/marketBasicMessage';
import marketBasicTarget from '@/views/contentSetting/marketSitting/marketBasicTarget';
import marketControlCredit from '@/views/contentSetting/marketSitting/marketControlCredit';
//  企业资质
// import basicLicense from '@/views/contentSetting/nomarketSitting/basicLicense.vue';
import marketBasicBginformation from '@/views/contentSetting/marketSitting/marketBasicBginformation';
import marketBasicEvent from '@/views/contentSetting/marketSitting/marketBasicEvent';
export default {
    data() {
        return {
            activeName1: 'one',
            isAdd: false
        };
    },
    components: {
        ElTableRow,
        marketBasicMessage,
        marketBasicTarget,
        marketControlCredit,
        // basicLicense,
        marketBasicBginformation,
        marketBasicEvent
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
        width: 1320px;
        margin: 0 auto;
    }
    .tabs-title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
    .table-tit {
        width: 100%;
        border: 1px solid #54575c;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        tr {
            width: 100%;
            background: rgb(35, 37, 40);
            display: flex;
            justify-content: space-between;
            td {
                color: rgb(193, 193, 195);
                padding: 0 0 0 20px;
                height: 50px;
                line-height: 50px;
                box-sizing: border-box;
                &:nth-child(0) {
                    width: 150px;
                    border-right: 0;
                    background: #292b2f;
                }
                &:last-child {
                    border-right: 0;
                    width: calc(100% - 150px);
                    margin-right: 20px;
                }
                span {
                    left: 10px;
                    top: 24px;
                    color: #43a1ac;
                    line-height: 6px;
                }

                /deep/ .el-input.is-disabled .el-input__inner {
                    color: #fff;
                    opacity: 0.5;
                }
            }
            .cospan {
                width: calc(100% - 150px);
                display: flex;
                div {
                    width: 459px;
                }
                a {
                    width: 120px;
                    margin-left: 25px;
                    text-decoration: underline;
                    font-size: 14px;
                    color: #43a1ac;
                    letter-spacing: 0.44px;
                }
            }
        }
    }
</style>
