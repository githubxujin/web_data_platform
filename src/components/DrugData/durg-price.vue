<template>
    <div class="table-wrap">
        <el-tabs type="border-card" v-model="activeTabsName">
            <el-tab-pane label="上下游规模" name="one">
                <up-stream v-if="activeTabsName==='one'" />
                <div class="el-20"></div>
                <down-stream v-if="activeTabsName==='one'" />
            </el-tab-pane>
            <el-tab-pane label="药品明细" name="two">
                <keep-alive>
                    <drug-detail v-if="activeTabsName==='two'" />
                </keep-alive>
            </el-tab-pane>
            <el-tab-pane label="药品价格" name="three">
                <keep-alive>
                    <drug-price v-if="activeTabsName==='three'" />
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import UpStream from "@/components/DrugEchart/up-stream.vue";
import DownStream from "@/components/DrugEchart/down-stream.vue";
import DrugDetail from "@/components/DrugEchart/drug-detail.vue";
import DrugPrice from "@/components/DrugEchart/drug-price.vue";
export default {
    components: {
        UpStream,
        DownStream,
        DrugDetail,
        DrugPrice
    },
    data() {
        return {
            activeTabsName: "one"
        };
    },
    created() {
        this.$store.dispatch("drug/getCompanyNameList");
    }
};
</script>


