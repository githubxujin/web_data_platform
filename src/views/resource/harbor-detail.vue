<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">{{conactItem.portName}}</div>
            <qg-table class="mt20">
                <qg-table-column v-for="(item,index) in conda()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
            </qg-table>
            <el-tabs v-model="activeName" type="border-card" class="mt30">
                <el-tab-pane label="泊位" name="first">
                    <HarborBerthage v-if="activeName==='first'" />
                </el-tab-pane>
                <el-tab-pane label="港口服务" name="second">
                    <!-- <HarborService v-if="activeName==='second'" /> -->
                    <div class="portService">
                        <div class="tabs-title">{{conactItem.portName}}</div>
                        <div class="content">
                            {{conactItem.portService || '暂无数据'}}
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="港务机构" name="thrid">
                    <HarborOrganization :portName="$route.query.portName" v-if="activeName==='thrid'" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>

</template>

<script>
export default {
    components: {
        HarborBerthage: () => import("./components/harbor-detail/harbor-berthage.vue"),
        // HarborService: () => import("./components/harbor-detail/harbor-service.vue"),
        HarborOrganization: () => import("./components/harbor-detail/harbor-organization.vue"),
    },
    data () {
        return {
            activeName: 'first',
            conactItem: []
        }
    },
    created () {
        let id = this.$route.query.id
        this.getList(id)
    },
    methods: {
        conda () {
            return [
                {
                    key: "代码",
                    value: (this.conactItem && this.conactItem.portCode) || '-'
                },
                {
                    key: "类型",
                    value: (this.conactItem && this.conactItem.portType) || '-'
                },
                {
                    key: "经度",
                    value: (this.conactItem && this.conactItem.longitude) || '-'
                },
                {
                    key: "纬度",
                    value: (this.conactItem && this.conactItem.latitude) || '-'
                },
                {
                    key: "海图编号",
                    value: (this.conactItem && this.conactItem.chartNumber) || '-',
                    alone: true
                },
            ];
        },
        getList (id) {
            this.ajax
                .json('/dcp/port/info/detail', { id }, { type: 'get' })
                .then(res => {
                    this.conactItem = res.data
                });
        }
    }
}
</script>

<style lang="scss" scoped>
.portService {
    font-family: PingFangSC-Light;
    font-size: 14px;
    padding-top: 20px;
    .title {
        color: #43a1ac;
        line-height: 14px;
        margin-bottom: 10px;
    }
    .content {
        line-height: 25px;
    }
}
.dark{
    .content {
        color: rgba(255, 255, 255, 0.8);
    }
}
.light{
    .content {
        color: #666;
        font-family: "PingFang-SC-Regular";
    }
}
</style>
