<template>
    <div>
        <div class="content_top">
            <el-carousel class="carousel_picUrls" :interval="3000">
                <el-carousel-item v-for="(item,index) in picUrls" :key="index">
                    <img class="ship_picture" :src="item" alt="" v-if="item">
                    <img class="ship_picture" src="../../assets/images/ship-route/placeholder_pic.png" alt="" v-else>
                </el-carousel-item>
            </el-carousel>

            <div class="leftDetail">
                <div class="contentC_top">
                    <div class="title">
                        <span class="left">{{presentVoyageDatas.shipName || '-'}}</span>
                        <img class="right" :src="presentVoyageDatas.flagUrl" alt="">
                    </div>
                    <div class="travel">
                        <div class="go">
                            {{presentVoyageDatas.depportnameEn || '-'}}
                            <div class="nameCh">{{presentVoyageDatas.depportnameCn || '-'}}</div>
                        </div>
                        <div class="center">
                            <span class="status">{{presentVoyageDatas.naviStatus || ''}}</span>
                            <img src="../../assets/images/ship-route/arrow.png" alt="" class="arrow">
                        </div>
                        <div class="to">{{presentVoyageDatas.dest || '-'}}
                            <div class="nameCh">{{presentVoyageDatas.destCn || '-'}}</div>
                        </div>
                    </div>
                </div>
                <div class="contentC_bottom">
                    <div class="ship_detail">

                        <div class="local_time">
                            <div class="left">
                                <div>当地时间(UTC+08:00)</div>
                                <!-- <div></div> -->
                            </div>
                            <div class="right">
                                <div>当地时间(UTC+08:00)</div>
                                <!-- <div></div> -->
                            </div>
                        </div>
                        <div class="local_time local_time_detail">
                            <div class="left">
                                <div>{{formatDate(presentVoyageDatas.deptime) || '-'}}</div>
                                <div>{{formatDate(presentVoyageDatas.deptime,'HH:mm:ss') || '-'}}</div>
                            </div>
                            <div class="right">
                                <div>{{preArriveTime[0]}}</div>
                                <div>{{preArriveTime[1]}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="speed ml38">
                        <img src="../../assets/images/ship-route/speed.png" alt="" v-if="theme==='dark'">
                        <img src="../../assets/images/light/speed.png" alt="" v-else>
                        <div class="detail">
                            <div class="title">速度</div>
                            <div class="number">{{presentVoyageDatas.speed2 || '-'}}kn/{{presentVoyageDatas.speed1 || '-'}}kn</div>
                        </div>
                    </div>
                    <div class="speed second">
                        <img src="../../assets/images/ship-route/sailing.png" alt="" v-if="theme==='dark'">
                        <img src="../../assets/images/light/sailing.png" alt="" v-else>
                        <div class="detail">
                            <div class="title">已航行</div>
                            <div class="number">{{presentVoyageDatas.naviTime || '-'}}({{presentVoyageDatas.naviDistance || '-'}}nm)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="update_time">
                本数据更新于 {{formatDate(presentVoyageDatas.updateTime,'YYYY-MM-DD HH:mm:ss') || '-'}}
            </div>
        </div>
        <div class="table-wrap mt20">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="基本信息" name="first">
                    <Essential v-if="activeName==='first'" />
                </el-tab-pane>
                <el-tab-pane label="历史轨迹" name="second">
                    <keep-alive>
                        <HistoryTrack v-if="activeName==='second'" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="航次" name="thrid">
                    <VoyageNumber />
                </el-tab-pane>
                <el-tab-pane label="计划" name="four">
                    <PlanTravel :shipsName="presentVoyageDatas.shipName" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    components: {
        Essential: () => import("./components/ship-route/essential.vue"),
        HistoryTrack: () => import("./components/ship-route/history-track.vue"),
        VoyageNumber: () => import("./components/ship-route/voyage-number.vue"),
        PlanTravel: () => import("./components/ship-route/plan-travel.vue"),
    },
    created() {
        this.getList(this.$route.query.mmsi)
    },
    computed: mapState({
        theme: state => state.echart.flag
    }),
    data() {
        return {
            activeName: 'first',
            presentVoyageDatas: {},
            preArriveTime: [],
            picUrls: []
        }
    },
    methods: {
        getList(mmsi) {
            this.ajax
                .json('/dcp/ship/curr/voyage/detail', { mmsi }, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.presentVoyageDatas = res.data
                        this.preArriveTime = res.data.preArriveTime.split(' ')
                    }
                });
            this.ajax
                .json('/dcp/ship/info/detail', { id: this.$route.query.id }, { type: 'get' })
                .then(res => {
                    this.picUrls = res.data.picUrls.split(',')
                });
        }
    },
}
</script>
<style lang="scss" scoped>
    .stat {
        width: 1360px;
        margin: 0 auto;
    }
    .el-table-list {
        width: 100%;
        border: 1px solid #54575c;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        td:nth-child(odd) {
            width: 165px;
            background: #292b2f;
            color: #a0a3a8;
            border-bottom: 1px solid #54575c;
        }
        td {
            color: #d3d3d4;
            padding: 17px 5px 17px 20px;
            line-height: 16px;
            border-bottom: 1px solid #54575c;
        }
    }
    .tabs-title {
        font-size: 14px;
        color: #43a1ac;
    }
    /deep/ .tab-info {
        border: 1px solid #54575c;
        th {
            color: #a0a3a8;
            border-right: 1px solid #54575c;
            font-weight: normal;
        }
        th.is-leaf {
            border-bottom: 1px solid #54575c;
        }
        td {
            color: #d3d3d4;
            font-weight: normal;
            border-bottom: 1px solid #54575c;
            border-right: 1px solid #54575c;
        }
    }
    .report {
        color: #43a1ac;
        text-decoration: underline;
    }
    /deep/ .el-tabs__header {
        margin-top: 30px;
    }
    /deep/ .el-tabs__header {
        margin-top: 0;
    }
    .content_top {
        position: relative;
        width: 1360px;
        height: 266px;
        margin-top: 20px;
        display: flex;
    }
    .carousel_picUrls {
        width: 260px;
        height: 170px;
        margin-top: 50px;
        margin-left: 36px;
        background-color: #000;
        /deep/ .el-carousel__container {
            width: 100%;
            height: 100%;
        }
        /deep/ .el-carousel__indicators.el-carousel__indicators--horizontal {
            display: none;
        }
        /deep/ .el-icon-arrow-right:before {
            content: "\E6E0";
        }
    }
    .ship_picture {
        display: inline-block;
        width: 260px;
        height: 170px;
    }
    .leftDetail {
        margin-top: 50px;
        margin-left: 30px;
    }
    .contentC_top {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        display: inline-block;
        vertical-align: top;
        .title {
            .right {
                width: 30px;
                height: 22px;
                margin-left: 14px;
            }
        }
        .travel {
            margin-top: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .center {
                display: flex;
                flex-direction: column;
                margin: 0 16px;
                .status {
                    width: 50px;
                    height: 20px;
                    display: inline-block;
                    border-radius: 10px;
                    font-size: 12px;
                    line-height: 20px;
                    text-align: center;
                    margin-left: 9px;
                }
                .arrow {
                    width: 77px;
                    margin-top: 2px;
                    margin-bottom: 17px;
                }
            }
            .nameCh {
                font-family: PingFangSC-Light;
                font-size: 12px;
                line-height: 17px;
                // color: #909399;
            }
        }
    }

    .ship_detail {
        font-family: PingFangSC-Regular;
        font-size: 20px;
        display: inline-block;
        vertical-align: top;
        margin-top: 18px;

        .local_time {
            width: 308px;
            height: 26px;
            font-family: PingFangSC-Light;
            font-size: 12px;
            line-height: 17px;
            .left {
                float: left;
            }
            .right {
                float: right;
                text-align: right;
            }
        }
    }
    .speed {
        display: inline-block;
        width: 296px;
        height: 70px;
        vertical-align: top;
        padding-top: 20px;
        &.second {
            width: 368px;
        }
        &.ml38 {
            margin-left: 38px;
        }
        img {
            width: 60px;
            height: 60px;
            margin-left: 40px;
        }
        .detail {
            display: inline-block;
            vertical-align: top;
            font-family: PingFangSC-Light;
            font-size: 14px;
            margin-left: 30px;
            .title {
                line-height: 20px;
                margin-bottom: 10px;
            }
            .number {
                font-size: 16px;
                line-height: 22px;
            }
        }
    }
    .update_time {
        position: absolute;
        right: 20px;
        top: 20px;
        font-family: PingFangSC-Light;
        font-size: 12px;
    }
    .table-wrap {
        padding-top: 20px;
    }

    // 主题切换
    .dark{
        .content_top {
            background-image: linear-gradient(270deg, #293337 0%, #32373d 100%);
        }
        .contentC_top {
            .title {
                .left {
                    color: #43a1ac;
                }
            }
            .travel {
                color: #d3d3d4;
                .nameCh {
                    color: #909399;
                }
                .center .status {
                    background: rgba(51, 126, 90, 0.2);
                    color: #358e62;
                }
            }
        }
        .ship_detail .local_time {
            color: #909399;
        }
        .local_time.local_time_detail {
            color: #d3d3d4;
        }
        .speed {
            border-left: 1px solid #4f5155;
            .detail {
                color: #909399;
                .number {
                    color: #d3d3d4;
                }
            }
        }
        .update_time {
            color: #d3d3d4;
        }

    }
    .light{
        .content_top {
            background-color: #fff;
        }
        .contentC_top {
            .title {
                .left {
                    color: #666;
                }
            }
            .travel {
                color: #666;
                .nameCh {
                    font-family: PingFangSC-Regular;
                    color: #666;
                }
                .center .status {
                    background: #3dbd7d;
                    color: #fff;
                }
            }
        }
        .ship_detail .local_time {
            font-family: PingFangSC-Regular;
            color: #666;
        }
        .local_time.local_time_detail {
            color: #999;
        }
        .speed {
            border-left: 1px solid #d2d9e5;
            .detail {
                font-family: PingFangSC-Regular;
                color: #999;
                .number {
                    color: #666;
                }
            }
        }
        .update_time {
            font-family: PingFangSC-Regular;
            color: #999;
        }
    }
</style>
