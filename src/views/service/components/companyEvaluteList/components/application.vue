<template>
    <div>
        <div class="el-20"></div>
        <div class="content-wrap pt30">
            <div class="content-left">
                <el-menu default-active="2" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false" :show-timeout="600" :hide-timeout="600">
                    <el-menu-item class="titleLocation notitle" index="100" disabled>
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-qiyeguanxitu i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title" class="headline">
                            <span class="title_h">企业图谱</span>
                            <span class="after_line"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-qiyeguanxitu i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">企业关系图</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-guanlianfangrendingtu i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">关联方认定图</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-fenzhijiegou i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">分支结构</span>
                    </el-menu-item>
                    <el-menu-item class="titleLocation noguquan" index="100" disabled>
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv41-hangyequshi i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title" class="headline">
                            <span class="title_h">股权</span>
                            <span class="after_line"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="5">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-gudongduocengji i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">股东（多层级）</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-touziduocengji i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">投资（多层级）</span>
                    </el-menu-item>
                    <el-menu-item index="7">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-lishitouzi i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">历史投资</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-lishigudong  i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">历史股东</span>
                    </el-menu-item>
                    <el-menu-item index="9">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-xiongdigongsi i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">兄弟公司</span>
                    </el-menu-item>
                    <el-menu-item class="titleLocation noguquan" index="100" disabled>
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv41-hangyequshi i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title" class="headline">
                            <span class="title_h">非股权</span>
                            <span class="after_line"></span>
                        </span>
                    </el-menu-item>
                    <el-menu-item index="10">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-chengyuan i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">成员</span>
                    </el-menu-item>
                    <el-menu-item index="11">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-yisiguanlian i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">疑似关联</span>
                    </el-menu-item>
                    <el-menu-item index="12">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-susongguanlian i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">诉讼关联</span>
                    </el-menu-item>
                    <el-menu-item index="13">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-panjueguanlian i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">判决关联</span>
                    </el-menu-item>
                    <el-menu-item index="14">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-yewujingzheng  i-show'
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">业务竞争</span>
                    </el-menu-item>
                    <el-menu-item index="15">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-zhaiquan i-show '
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">债权/债务</span>
                    </el-menu-item>
                    <el-menu-item index="16">
                        <i :class="[
                                isCollapse
                                    ? 'iconfont icon-shujuzhongxinv413-kehugongyingshang i-show '
                                    : 'i-hide'
                            ]"></i>
                        <span slot="title">客户/供应商</span>
                    </el-menu-item>
                    <div class="unfold" @click="isCollapse = false" v-if="isCollapse">
                        展开
                    </div>
                    <div class="pick-up" v-else @click="isCollapse = true">
                        <i class="iconfont icon-yunpingtaivzhankaishouqi"></i><span style="vertical-align: 12%;">收起</span>
                    </div>
                </el-menu>
            </div>

            <div class="content-right">
                <component :is="currentTabComponent" />
            </div>
        </div>
    </div>
</template>
<script>
import relation from "./applicationView/relation.vue"; // 2.企业关系图
import affirm from "./applicationView/affirm.vue"; // 3.关联方认定图
import branch from "./applicationView/branch.vue"; // 4
import shareholder from "./applicationView/shareholder.vue"; // 5
import investment from "./applicationView/investment.vue"; // 6
import historyInvestment from "./applicationView/historyInvestment.vue"; // 7
import historyShareholder from "./applicationView/historyShareholder"; // 8
import Brother from "./applicationView/Brother"; // 9
import member from "./applicationView/member"; // 10
import suspected from "./applicationView/suspected.vue"; // 11.疑似关联
import lawsuit from "./applicationView/lawsuit"; // 12
import judgment from "./applicationView/judgment"; // 13
import competition from "./applicationView/competition"; // 14
import debenture from "./applicationView/debenture.vue"; // 15
import supplier from "./applicationView/supplier"; // 16

export default {
    components: {
        relation,
        affirm,
        branch,
        shareholder,
        investment,
        historyInvestment,
        historyShareholder,
        Brother,
        member,
        suspected,
        lawsuit,
        judgment,
        competition,
        debenture,
        supplier
    },
    data () {
        return {
            isCollapse: false,
            currentTabComponent: "relation"
        };
    },
    methods: {
        handleSelect (key, keyPath) {
            if (keyPath === "2") {
                this.currentTabComponent = "relation";
            } else if (keyPath && keyPath[0] === "2") {
                this.currentTabComponent = "relation";
            } else if (keyPath && keyPath[0] === "3") {
                this.currentTabComponent = "affirm";
            } else if (keyPath && keyPath[0] === "4") {
                this.currentTabComponent = "branch";
            } else if (keyPath && keyPath[0] === "5") {
                this.currentTabComponent = "shareholder";
            } else if (keyPath && keyPath[0] === "6") {
                this.currentTabComponent = "investment";
            } else if (keyPath && keyPath[0] === "7") {
                this.currentTabComponent = "historyInvestment";
            } else if (keyPath && keyPath[0] === "8") {
                this.currentTabComponent = "historyShareholder";
            } else if (keyPath && keyPath[0] === "9") {
                this.currentTabComponent = "Brother";
            } else if (keyPath && keyPath[0] === "10") {
                this.currentTabComponent = "member";
            } else if (keyPath && keyPath[0] === "11") {
                this.currentTabComponent = "suspected";
            } else if (keyPath && keyPath[0] === "12") {
                this.currentTabComponent = "lawsuit";
            } else if (keyPath && keyPath[0] === "13") {
                this.currentTabComponent = "judgment";
            } else if (keyPath && keyPath[0] === "14") {
                this.currentTabComponent = "competition";
            } else if (keyPath && keyPath[0] === "15") {
                this.currentTabComponent = "debenture";
            } else if (keyPath && keyPath[0] === "16") {
                this.currentTabComponent = "supplier";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    .content-right {
        width: 1170px !important;
        margin-left: 0 !important;
        padding-left: 20px !important;
    }
    .unfold {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #43a1ac;
        letter-spacing: 1px;
        position: absolute;
        margin-top: 10px;
        left: 14px;
        cursor: pointer;
    }
    .pick-up {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #43a1ac;
        letter-spacing: 1px;
        position: absolute;
        margin-top: 16px;
        right: 36px;
        cursor: pointer;
    }
    /deep/ .el-menu--collapse {
        width: 50px;
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
            /deep/ .iconfont {
                color: #43a1ac;
                font-size: 18px;
                font-family: PingFangSC-Light;
            }
            /deep/ .el-menu {
                position: relative;
                height: 776px;
                background-color: #2d3034;
                border-right: solid 1px #325154;
            }
            /deep/ .el-menu-item.is-active {
                color: #43a1ac;
                border-right: 2px solid #43a1ac;
            }
            /deep/ .is-active {
                background: rgba(67, 161, 172, 0.08);
                color: #43a1ac;
            }
            /deep/ .el-menu-item {
                text-align: center;
                font-family: PingFangSC-Regular;
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: #a0a3a8;
                margin-top: 5px;
                border-right: 2px solid #2d3034;

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
                &:before {
                    position: absolute;
                    height: 10px;
                    right: 0;
                }
            }
        }
        &-right {
            width: 1200px;
            margin: 0 auto;
            margin-left: 20px;
        }
        .titleLocation {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 10px !important;
        }
        .headline {
            margin-left: 13px;
            color: #43a1ac;
            .title_h {
                background-color: #2d3034;
                z-index: 99;
                position: relative;
                padding: 6px;
            }
            .after_line {
                width: 91px;
                height: 0.5px;
                display: block;
                background-color: #43a1ac;
                position: absolute;
                top: 50%;
                left: 18px;
            }
        }
    }
    .el-menu-vertical-demo.el-menu--collapse.el-menu {
        /deep/ .el-menu-item.titleLocation.notitle {
            display: none;
        }
        /deep/ .el-menu-item.titleLocation.noguquan {
            border-top: 0.5px solid #43a1ac;
            width: 26px;
            overflow: hidden;
            height: 1px;
            margin-left: 15px;
        }
    }
    .el-menu-vertical-demo.el-menu {
        /deep/ .el-menu-item.titleLocation.is-disabled,
        /deep/ .el-menu-item.titleLocation.is-disabled {
            cursor: auto;
            opacity: 1 !important;
        }
    }
}

.light {
    .content-right {
        width: 1170px !important;
        margin-left: 0 !important;
        padding-left: 20px !important;
    }
    .unfold {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #4064d4;
        letter-spacing: 1px;
        position: absolute;
        margin-top: 10px;
        left: 14px;
        cursor: pointer;
    }
    .pick-up {
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #4064d4;
        letter-spacing: 1px;
        position: absolute;
        margin-top: 16px;
        right: 36px;
        cursor: pointer;
    }
    /deep/ .el-menu--collapse {
        width: 50px;
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
            /deep/ .iconfont {
                color: #4064d4;
                font-size: 18px;
                font-family: PingFangSC-Light;
            }
            /deep/ .el-menu {
                position: relative;
                height: 776px;
                background-color: #f1f4fc;
                border-right: solid 1px #dee5f7;
            }
            /deep/ .el-menu-item.is-active {
                color: #4064d4;
                border-right: 2px solid #4064d4;
            }
            /deep/ .is-active {
                background: rgba(67, 161, 172, 0.08);
                color: #4064d4;
            }
            /deep/ .el-menu-item {
                text-align: center;
                font-family: PingFangSC-Regular;
                height: 32px;
                line-height: 32px;
                font-size: 12px;
                color: #666;
                margin-top: 5px;
                border-right: 2px solid transparent;

                &:first-child {
                    margin-top: 20px;
                }
                &:last-child {
                    margin-bottom: 60px;
                }

                &:hover,
                &:focus,
                &:active {
                    background: #ccd6f3;
                    color: #4064d4;
                }
                &:before {
                    position: absolute;
                    height: 10px;
                    right: 0;
                }
            }
        }
        &-right {
            width: 1200px;
            margin: 0 auto;
            margin-left: 20px;
        }
        .titleLocation {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 10px !important;
        }
        .headline {
            margin-left: 13px;
            color: #4064d4;
            .title_h {
                background-color: #f1f4fc;
                z-index: 99;
                position: relative;
                padding: 6px;
            }
            .after_line {
                width: 91px;
                height: 0.5px;
                display: block;
                background-color: #4064d4;
                position: absolute;
                top: 50%;
                left: 18px;
            }
        }
    }
    .el-menu-vertical-demo.el-menu--collapse.el-menu {
        /deep/ .el-menu-item.titleLocation.notitle {
            display: none;
        }
        /deep/ .el-menu-item.titleLocation.noguquan {
            border-top: 0.5px solid #4064d4;
            width: 26px;
            overflow: hidden;
            height: 1px;
            margin-left: 15px;
        }
    }
    .el-menu-vertical-demo.el-menu {
        /deep/ .el-menu-item.titleLocation.is-disabled,
        /deep/ .el-menu-item.titleLocation.is-disabled {
            cursor: auto;
            opacity: 1 !important;
        }
    }
}
</style>
