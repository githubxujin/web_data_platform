<template>
    <div class="table-wrap">
        <div class="content-wrap">
            <div class="content-left">
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false" :show-timeout="600" :hide-timeout="600">
                    <el-menu-item index="1">
                        <i :class="[isCollapse ? 'iconfont icon-shujuzhongxinv420-caidan-gongyingshang i-show': 'i-hide']"></i>
                        <span slot="title">供应商维度</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i :class="[isCollapse ? 'iconfont  icon-shujuzhongxinv41-hangyequshi i-show': 'i-hide']"></i>
                        <span slot="title">承建单位维度</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i :class="[isCollapse ? 'iconfont  icon-shujuzhongxinv413-touziduocengji i-show': 'i-hide']"></i>
                        <span slot="title">金融机构维度</span>

                    </el-menu-item>
                    <div class="unfold" @click="isCollapse=false" v-if="isCollapse">展开</div>
                    <div class="pick-up" v-else @click="isCollapse=true"><i class="iconfont icon-yunpingtaivzhankaishouqi"></i><span style="vertical-align: 12%;">收起</span></div>

                </el-menu>
            </div>
            <div class="content-right">
                <component :is="currentTabComponent" />
            </div>
        </div>
    </div>
</template>
<script>


export default {
    components: {
        supplier: () => import("./supplier/index.vue"),
        contract: () => import("./contract/index.vue"),
        financial: () => import("./financial/index.vue")
    },
    data() {
        return {
            isCollapse: false,
            currentTabComponent: 'supplier',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            if (key === '1') {
                this.currentTabComponent = 'supplier'
            } else if (key === '2') {
                this.currentTabComponent = 'contract'
            } else if (key === '3') {
                this.currentTabComponent = 'financial'
            }
        },
    },

};
</script>
<style lang="scss" scoped>
    .light {
        .content {
            &-left {
                /deep/ .el-menu {
                    position: relative;
                    height: 588px;
                    background-color:  #F1F4FC;
                    border-right: solid 1px #F1F4FC;
                }
                /deep/ .el-menu-item.is-active {
                    color: #4064D4;
                }
                /deep/ .is-active {
                    background: rgba(64,100,212,0.20);
                    color: #4064D4;
                    border-right: 2px solid #4064D4;
                }
                /deep/ .el-menu-item {
                    font-family: PingFangSC-Regular;
                    color: #a0a3a8;
                    &:hover,
                    &:focus,
                    &:active {
                        background: rgba(67, 161, 172, 0.08);
                        color: #4064D4;
                    }
                }
            }
        }
    }
    .unfold {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #43a1ac;
        letter-spacing: 1px;
        position: absolute;
        bottom: 16px;
        left: 14px;
        cursor: pointer;
    }
    .pick-up {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #43a1ac;
        letter-spacing: 1px;
        position: absolute;
        bottom: 16px;
        right: 36px;
        cursor: pointer;
    }
    /deep/ .el-menu--collapse {
        width: 50px;
    }
    /deep/ .iconfont {
        color: #43a1ac;
        font-size: 18px;
        font-family: PingFangSC-Light;
    }
    .i-show {
        display: block;
        margin-left: -4px;
    }
    i-hide {
        display: none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        min-height: 400px;
    }
    .content {
        &-wrap {
            display: flex;
        }
        &-left {
            /deep/ .el-menu {
                position: relative;
                height: 588px;
                background-color: #2d3034;
                border-right: solid 1px #325154;
            }
            /deep/ .el-menu-item.is-active {
                color: #43a1ac;
            }
            /deep/ .is-active {
                background: rgba(67, 161, 172, 0.08);
                color: #43a1ac;
                border-right: 2px solid #43a1ac;
            }
            /deep/ .el-menu-item {
                font-family: PingFangSC-Regular;
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: #a0a3a8;
                margin-top: 5px;

                &:first-child {
                    margin-top: 20px;
                }
                &:last-child {
                    margin-bottom: 60px;
                }

                &:hover,
                &:focus,
                &:active {
                    background: rgba(67, 161, 172, 0.08);
                    color: #43a1ac;
                }
            }
        }
        &-right {
            width: 1200px;
            margin: 0 auto;
            margin-left: 20px;
        }
    }
</style>