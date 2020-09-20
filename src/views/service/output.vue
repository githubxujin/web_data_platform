<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="发票统计" name="first">
                <div class="table-wrap" v-if="activeName === 'first'" style="padding-bottom: 0;backgorund: red;">
                    <el-tabs type="border-card" v-model="activeTabName">
                        <el-tab-pane label="概况" name="one">
                            <stat v-if="activeTabName === 'one'" businessType="1" />
                        </el-tab-pane>
                        <el-tab-pane label="开票内容" name="two">
                            <invoice-content v-if="activeTabName === 'two'" businessType="1" />
                        </el-tab-pane>
                        <el-tab-pane label="付款方" name="three">
                            <pay v-if="activeTabName === 'three'" businessType="1" way="付款" title="下游付款方地域分布" text="下游付款方列表" />
                        </el-tab-pane>
                        <el-tab-pane label="开票行为" name="fourth">
                            <behavior v-if="activeTabName === 'fourth'" businessType="1" />
                        </el-tab-pane>
                        <el-tab-pane label="关联应用" name="five">
                            <application v-if="activeTabName === 'five'" />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <div class="table-wrap" v-if="activeName==='second'">
                    <el-tabs type='border-card' v-model="detailTabName">
                        <el-tab-pane label='发票易' name="one">
                            <easy-list v-if="detailTabName === 'one'" />
                        </el-tab-pane>
                        <el-tab-pane label="PDF发票" name="two">
                            <pdf-list v-if="detailTabName === 'two'" />
                        </el-tab-pane>
                        <el-tab-pane label="Excel发票" name="three">
                            <excel-list v-if="detailTabName === 'three'" />
                        </el-tab-pane>
                        <el-tab-pane label="内容搜索" name="fourth">
                            <content-list v-if="detailTabName === 'fourth'" />
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Stat from "@/components/Service/stat.vue";
import InvoiceContent from "@/components/Service/content.vue";
import Pay from "@/components/Service/pay.vue";
import Behavior from "@/components/Service/behavior.vue";
import EasyList from "@/components/Output/easy-list.vue";
import Application from "@/components/Output/application.vue"
export default {
    components: {
        Stat,
        InvoiceContent,
        Pay,
        Behavior,
        EasyList,
        Application,
        pdfList: () => import("@/components/Invoice/pdf-list.vue"),
        excelList: () => import("@/components/Invoice/excel-list.vue"),
        ContentList: () => import("@/components/Invoice/content.vue")
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
