<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="发票统计" name="first">
                <div class='table-wrap'>
                    <el-tabs type='border-card' v-model="activeTabName">
                        <el-tab-pane label='概况' name="one">
                            <keep-alive>
                                <stat v-if="activeTabName==='one'" businessType="2" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label='收款方' name="three">
                            <keep-alive>
                                <pay v-if="activeTabName==='three'" businessType="2" title="上游收款方地域分布" text="上游收款方列表" way="收款" />
                            </keep-alive>
                        </el-tab-pane>
                        <el-tab-pane label='开票行为' name="fourth">
                            <keep-alive>
                                <behavior v-if="activeTabName==='fourth'" businessType="2" />
                            </keep-alive>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <div class="table-wrap" v-if="activeName==='second'">
                    <el-tabs type='border-card' v-model="detailTabName">
                        <el-tab-pane label='发票易' name="one">
                            <easy-list />
                        </el-tab-pane>

                    </el-tabs>
                </div>

            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

import EasyList from "@/components/Income/easy-list.vue"
import Stat from "@/components/Service/stat.vue";
// import InvoiceContent from "@/components/Service/content.vue";
import Pay from "@/components/Service/pay.vue";
import Behavior from "@/components/Service/behavior.vue";
export default {
    components: {
        Stat,
        // InvoiceContent,
        Pay,
        Behavior,
        EasyList
    },
    data () {
        return {
            activeName: "first",
            activeTabName: "one",
            detailTabName: "one"
        };
    },
    created () {
        this.$store.dispatch("invoice/getCompanyList", { size: "9999" });
    },
    methods: {
        handleClick () { }
    }
};
</script>
