<template>
    <div class="header">
        <div class="header-wrap">
            <div class="header-left">
                <div class="header-logo" @click="goHome()"></div>
                <ul class="header-nav">
                    <li :class="[$route.meta[0].name === item.resourceName ?  'active' : '']" v-for="(item,index) in menu" :key="index">
                        {{item.resourceName}}
                        <div class="header-menu">
                            <el-tabs :tab-position="tabPosition" v-model="item.activeName" :key="'tab'+index">
                                <el-tab-pane :label="nav.resourceName" :name="String(navIndex)" v-for="(nav,navIndex) in item.childList" :key="navIndex">
                                    <div class="header-menu-right">
                                        <div class="menu-right-wrap" v-for="(row,rowIndex) in nav.childList" :key="rowIndex">
                                            <div class="menu-right-top-title">
                                                {{ row.resourceName}}
                                            </div>
                                            <div :class="[$route.path=== last.resourcePath ?  ' header-menu-right-title active' : 'header-menu-right-title']" v-for="(last,lastIndex) in row.childList" :key="lastIndex">
                                                <router-link :to="last.resourcePath"> {{ last.resourceName }}</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="header-right">
                <div class="header-right-l">
                    <el-input placeholder="搜索企业" v-model="params.companyName" @keyup.enter.native="toSearch">
                        <i slot="suffix" class="el-input__icon iconfont icon-shujuzhongxin-sousuo" @click="toSearch"></i>
                    </el-input>
                </div>
                <div class="header-right-theme">
                    <el-tooltip class="item" effect="dark" content="主题" placement="bottom-end">
                    <i class="iconfont icon-zhuti" @click="theme"></i>
                    </el-tooltip>
                </div>
                <div class="header-right-m">
                    <el-button slot="reference" icon="iconfont icon-shujuzhongxin-yonghu " type="text" size="small" style="margin-left: 10px;" class="loging-name">
                        <span class="wel">{{ nickName }}</span>
                    </el-button>
                </div>
                <div class="drop-menu">
                    <el-tooltip class="item" effect="dark" content="退出" placement="bottom-end">
                    <a href="javascript:" @click="logout()" class="logout">
                        <i class="iconfont icon-shujuzhongxin-tuichu"></i>
                    </a>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <modal />
    </div>
</template>

<script>
import { mapState } from "vuex";
import menuList from "@/utils/menu";
import modal from "./modal.vue"
export default {
    components: {
        modal
    },
    data () {
        return {
            dialogVisible: false,
            tabPosition: "left",
            params: {
                companyName: ""
            },
            menu: []
        };
    },
    computed: mapState({
        nickName: state => state.user.nickName
    }),
    created () {
        this.getMenu();


    },
    beforeMount () {

    },
    methods: {

        theme () {
            this.dialogVisible = true;


        },

        getMenu () {
            if (process.env.VUE_APP_ENV === "dev" || process.env.VUE_APP_ENV === "test" || process.env.VUE_APP_ENV === "uat")
                this.menu = menuList
            return
            this.ajax
                .json('/user/m/resource/userId', {})
                .then(res => {
                    let dataMenuList = res.data.filter(i => i.resourceName === '超级数据中心')[0]
                    this.menu = dataMenuList && dataMenuList.childList
                });
        },
        toSearch () {
            if (this.params.companyName.trim()) {
                this.$router.push({
                    name: "supplierList",
                    query: { companyName: this.params.companyName }
                });
            }
        },
        goHome () {
            this.menu[0].activeName = "0";
            this.$router.push({ path: "/industrial-policy" });
            this.$store.commit("tabs/SET_TABS", "first");
        },

        logout () {
            this.$confirm("确定要退出吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            })
                .then(() => {
                    this.$store.dispatch("user/logout").then(res => {
                        this.$router.push({ name: "login" });
                    });
                })
                .catch(() => { });
        }
    }
};
</script>
<style lang="scss" scoped>
.header-right-m{
    /deep/ .el-button:hover{
        cursor:default;
    }
}
</style>