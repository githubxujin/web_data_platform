<template>
    <div class="table-wrap mt20 mb20">
        <div class="el-title mb20">行业动态</div>
        <el-tabs type='border-card' v-model='activeName'>
            <el-tab-pane label='基建工程' name='first'>
                <constructionDynamic ref="const" @getList="getList1" v-if="activeName==='first'"></constructionDynamic>
            </el-tab-pane>
            <el-tab-pane label='医药医疗' name='second'>
                <constructionDynamic ref="const" @getList="getList2" v-if="activeName==='second'"></constructionDynamic>
            </el-tab-pane>
            <el-tab-pane label='能源化工' name='three'>
                <constructionDynamic ref="const" @getList="getList3" v-if="activeName==='three'"></constructionDynamic>
            </el-tab-pane>
            <el-tab-pane label='公共动态' name='fifth'>
                <constructionDynamic ref="const" @getList="getList4" v-if="activeName==='fifth'"></constructionDynamic>
            </el-tab-pane>
            <el-tab-pane label='在看' name='fourth'>
                <friendsLook ref="const" @getList="getList5" v-if="activeName==='fourth'"></friendsLook>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    components: {
        "constructionDynamic": () => import('./components/industryTrends/constructionDynamic.vue'),
        "friendsLook": () => import('./components/industryTrends/friendsLook.vue'),
    },
    data () {
        return {
            activeName: 'first',
            list: []
        };
    },
    methods: {
        childList (industryType) {
            this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: 0, industryType }, { type: "get" }).then(res => {
                if (res.data.length > 0) {
                    // this.$set(this.fixLabelSelectList, 0, res.data)
                    this.$refs.const.fixLabelSelectList[0] = res.data
                }
            })
        },
        getList1 (params) {
            params.industryType = 1
            this.$http('/dcp/server/wx/article/list', params, {
                type: 'get'
            }).then(res => {
                if (res.code === "200") {
                    this.$refs.const.list = res.data
                    this.$refs.const.totalSize = res.meta.totalSize
                }
            })
            this.childList(1)
        },
        getList2 (params) {
            params.industryType = 2
            this.$http('/dcp/server/wx/article/list', params, {
                type: 'get'
            }).then(res => {
                if (res.code === "200") {
                    this.$refs.const.list = res.data
                    this.$refs.const.totalSize = res.meta.totalSize
                }
            })
            this.childList(2)
        },
        getList3 (params) {
            params.industryType = 3
            this.$http('/dcp/server/wx/article/list', params, {
                type: 'get'
            }).then(res => {
                if (res.code === "200") {
                    this.$refs.const.list = res.data
                    this.$refs.const.totalSize = res.meta.totalSize
                }
            })
            this.childList(3)
        },
        getList4 (params) {
            params.industryType = 4
            this.$http('/dcp/server/wx/article/list', params, {
                type: 'get'
            }).then(res => {
                if (res.code === "200") {
                    this.$refs.const.list = res.data
                    this.$refs.const.totalSize = res.meta.totalSize
                }
            })
            this.childList(4)
        },
        getList5 (params) {
            params.isCollect = 1
            this.$http('/dcp/server/wx/article/list', params, {
                type: 'get'
            }).then(res => {
                if (res.code === "200") {
                    this.$refs.const.list = res.data
                    this.$refs.const.totalSize = res.meta.totalSize
                }
            })
        },
    }
};
</script>

<style lang="scss" scoped>
.title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 16px;
}
</style>
