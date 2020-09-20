<template>
    <div class="mt20">
        <!-- 方形tabs -->
        <div :class="dropName==='third' && activeName === 'c'? ' table-wrap pb0' : 'table-wrap'">
            <el-tabs type='border-card' v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label='统计概要' name="a">
                    <xhome />
                </el-tab-pane>
                <el-tab-pane label='数据明细' name="b">
                    <xinfo />
                </el-tab-pane>
                <el-tab-pane name="c">
                    <span slot="label">
                        <el-dropdown :hide-on-click="false" size="medium" placement="bottom-start" @command="handleFeedback" :class="[activeName==='c'? 'active': '']">
                            <span class="el-dropdown-link">
                                处置反馈<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" placement="bottom">
                                <el-dropdown-item command="a" :class="[dropName==='first'? 'active': '']">我的归档查询</el-dropdown-item>
                                <el-dropdown-item command="b" :class="[dropName==='second'? 'active': '']">各归档查询</el-dropdown-item>
                                <el-dropdown-item command="c" :class="[dropName==='third'? 'active': '']">日报统计</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <component :is="actFeedback" :type="actType" />
                </el-tab-pane>
                <el-tab-pane name="d">
                    <span slot="label">
                        <el-dropdown :hide-on-click="false" size="medium" placement="bottom-start" @command="handleCommand" :class="[activeName==='d'? 'active': '']">
                            <span class="el-dropdown-link">
                                监测分析<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" placement="bottom">
                                <el-dropdown-item command="a" :class="[dropName2==='first'? 'active': '']">舆情分析</el-dropdown-item>
                                <el-dropdown-item command="b" :class="[dropName2==='second'? 'active': '']">相关性分析</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                    <component :is="actAnalyse" />
                </el-tab-pane>
                <el-tab-pane label='特别关注' name="e">
                    <special />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.dark {
    .active {
        color: #43a1ac;
    }
}
.light {
    .active {
        color: #4064d4;
    }
}
</style>
<script>
export default {
    components: {
        xhome: () => import('./home'),
        xinfo: () => import('./info'),
        feedbackList: () => import('./feedback/list'),
        feedbackCount: () => import('./feedback/count'),
        analyseOpinion: () => import('./analyse/opinion'),
        analyseRelation: () => import('./analyse/relation'),
        special: () => import('./special')
    },

    data () {
        return {
            // activeName: "a",
            actFeedback: 'feedbackList',
            actAnalyse: 'analyseOpinion',
            actType: 'all',
            list: [],
            active: false
        };
    },
    computed: {
        activeName: {
            get () {
                return this.$store.state.tabs.tabName
            },
            set () { }
        },
        dropName: {
            get () {
                return this.$store.state.tabs.dropName
            },
            set () { }
        },
        dropName2: {
            get () {
                return this.$store.state.tabs.dropName2
            },
            set () { }
        }

    },
    methods: {
        handleClick (tabs) {
            console.log(tabs.name, 'tabs')
            this.$store.commit('tabs/SET_NAMES', tabs.name)
        },
        handleFeedback (v) {
            console.log(v)
            this.$store.commit('tabs/SET_NAMES', "c")
            switch (v) {
                case 'a': // 我的归档查询
                    this.$store.commit('tabs/SET_DROPNAME', "first")
                    this.actFeedback = 'feedbackList'
                    this.actType = 'my'
                    break;
                case 'b': // 各归档查询
                    this.$store.commit('tabs/SET_DROPNAME', "second")
                    this.actFeedback = 'feedbackList'
                    this.actType = 'all'
                    break;
                case 'c': // 日报统计
                    this.$store.commit('tabs/SET_DROPNAME', "third")
                    this.actFeedback = 'feedbackCount'
                    break;
            }
        },
        handleCommand (v) {
            this.$store.commit('tabs/SET_NAMES', "d")
            switch (v) {
                case 'a': // 舆情分析
                    this.$store.commit('tabs/SET_DROPNAME2', "first")
                    this.actAnalyse = 'analyseOpinion'
                    break;
                case 'b': // 相关性分析
                    this.$store.commit('tabs/SET_DROPNAME2', "second")
                    this.actAnalyse = 'analyseRelation'
                    break;
            }

            console.log(v, this.actAnalyse)
        }
    }
};
</script>
