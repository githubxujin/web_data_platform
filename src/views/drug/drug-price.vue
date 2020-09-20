<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="统计概况" name="first">
                <drug-price v-if="activeName === 'first'" />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <div class="table-wrap" v-if="activeName === 'second'">
                    <el-tabs type="border-card" v-model="activeName1">
                        <el-tab-pane label="入库" name="one">
                            <keep-alive>
                                <drug-price-list v-if="activeName1 === 'one'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label="销售" name="two">
                            <keep-alive>
                                <drug-market-list v-if="activeName1 === 'two'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label="库存" name="three">
                            <keep-alive>
                                <drug-repertory-list v-if="activeName1 === 'three'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label="账号" name="fourth">
                            <keep-alive>
                                <account-list v-if="activeName1 === 'fourth'" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label="润达" name="five">
                            <keep-alive>
                                <company-list v-if="activeName1 === 'five'" />
                            </keep-alive>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import DrugPrice from "@/components/DrugData/durg-price.vue";
import DrugPriceList from "@/components/DrugData/drug-price-list.vue";
import DrugMarketList from "@/components/DrugData/drug-market-list.vue";
import DrugRepertoryList from "@/components/DrugData/drug-repertory-list.vue";
import AccountList from "@/components/DrugData/account-list.vue";
import CompanyList from "@/components/DrugData/company-list.vue";
export default {
    components: {
        DrugPrice,
        DrugPriceList,
        DrugMarketList,
        DrugRepertoryList,
        AccountList,
        CompanyList
    },
    data() {
        return {
            activeName: "first",
            activeName1: "one"
        };
    },

};
</script>
