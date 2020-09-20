<template>
    <div class="stat">
        <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
            <el-tab-pane label="统计概况" name="first">
                <data-stat />
                <pie />
            </el-tab-pane>
            <el-tab-pane label="数据明细" name="second">
                <data-detail />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import DataDetail from "@/components/IndustrialPolicy/data-detail.vue";
import DataStat from "@/components/IndustrialPolicy/data-stat.vue";
import Pie from "@/components/IndustrialPolicy/pie.vue";

export default {
    components: {
        DataDetail,
        DataStat,
        Pie
    },
    data () {
        return {
            params: {},
            list: [],
        };
    },
    computed: {
        activeName: {
            get () {
                return this.$store.state.tabs.activeName
            },
            set () { }
        },
    },
    created () {
        this.getStat();
        this.getList();
    },
    methods: {
        handleClick (tabs) {
            this.$store.commit('tabs/SET_TABS', tabs.name)
        },
        getStat () {
            this.$http("/dcp/customer/count", {}, { type: "formdata" }).then(
                res => {
                    this.statList = res.data;
                }
            );
        },
        // 获取列表
        getList () {
            this.$http("/dcp/customer/list", this.params, {
                type: "formdata"
            }).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        reSet () {
            this.params = {
                current: 1,
                size: 20,
                customerName: "",
                coreCustomerName: "",
                licenseCode: "",
                regAddress: ""
            };
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
