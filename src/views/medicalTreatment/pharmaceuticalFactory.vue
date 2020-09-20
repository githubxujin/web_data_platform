<!--累积收录药厂数量-->
<template>
    <div class="phaFactory">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="统计概况" name="first">
                <div class="table-wrap">
                    <drug-map />
                </div>
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <!-- 药厂数据明细组件 -->
                <pha-factory-detail />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import phaFactoryDetail from "./pharmaceuticalFactory/phaFactoryDetail.vue";
import { setSession, getSession } from "@/config/utils"
export default {
    components: {
        phaFactoryDetail,
        'drug-map': () => import("./pharmaceuticalFactory/drug-map.vue")
    },
    data() {
        return {
            activeName: 'first',
        };
    },
    created(){
        this.activeName = getSession(this.$route.name) || 'first'
    },
    methods: {
        handleClick(tab) {
            setSession(this.$route.name, tab.name)
        },
    },
};
</script>

