<!--尽调报告-->
<template>
    <div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <due-stat />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <data-detail />
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

import DueStat from "@/components/Service/due-stat.vue";
import DataDetail from "@/components/Service/data-detail.vue";
export default {
    components: {
        DueStat,
        DataDetail
    },
    data () {
        return {

        };
    },
    computed: {
        activeName: {
            get () {
                return this.$store.state.tabs.activeName
            },
            set () { }
        }

    },
    created () {
        // this.$store.dispatch("invoice/getCompanyList", { size: "9999" });
    },

    methods: {
        handleClick (tabs) {
            this.$store.commit('tabs/SET_TABS', tabs.name)
        }
    }
};
</script>
