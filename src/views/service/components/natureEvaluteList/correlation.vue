<template>
    <div>
        <div class="btnGray_content">
            <el-button v-for="(item, index) in routeDate()" :key="index" class="btnGray" @click="point(item)">{{ item.name }}</el-button>
        </div>
        <div class="el-20"></div>
        <!-- 飞行记录 -->
        <qg-table subtitle="基本信息" class="mt20" id="info">
            <qg-table-column label="姓名" column="qg-two">{{ this.$route.query.companyName}}</qg-table-column>
            <qg-table-column label="身份证号码" column="qg-two">{{ this.$route.query.identityCode}}</qg-table-column>
        </qg-table>

        <div class="sub-title mb20 mt20" id="flight">CFCA飞行纪录</div>

        <div class="record">
            <div class="top_presentation pb20">
                <div class="drawing" ml20>
                    <div :class="`drawing_li mr20 ${item.color}`" v-for="(item,index) in fightRecordList" :key="index">
                        <div class="num">
                            <span class="shu">{{  item.name }}</span>
                            <span class="km">{{ item.unit}}</span>
                        </div>
                        <div class="topText">{{item.text}}</div>
                        <img class="picture" :src="item.img" alt="" />
                    </div>
                </div>
                <div class="frequency mt20">
                    <span class="yuan mr9"></span>
                    <span class="text">最繁忙月份飞行次数</span>
                    <span class="num">{{ fightItem.flyTimes }}次</span>
                </div>
            </div>
            <div class="bottom_details mt40 ml90">
                <div class="city">
                    <div class="tit mb30">飞行城市</div>
                    <div class="content">
                        <div class="child">
                            <img class="CFCA-start mr30" src="../../../../assets/images/correlation/CFCA-start.png" alt="" v-if="theme==='dark'" />
                            <img class="CFCA-start mr30" src="@/assets/images/light/qifei.png" alt="" v-if="theme==='light'" />
                            <div class="detil">
                                <div class="top_txt">
                                    <span class="common text_left">{{ fightItem.fromCity }}</span>
                                    <img class="small" src="../../../../assets/images/correlation/CFCA-start.png" alt="" v-if="theme==='dark'" />
                                    <img class="small" src="@/assets/images/light/qifei.png" alt="" v-else />
                                    <span class="common text_right">{{ fightItem.destCity }}</span>
                                </div>
                                <div class="btn_txt mt10">
                                    最频繁出发/到达城市
                                </div>
                            </div>
                        </div>
                        <div class="child mt40">
                            <img class="CFCA-start mr30" src="../../../../assets/images/correlation/CFCA-getTo.png" alt="" v-if="theme==='dark'" />
                            <img class="CFCA-start mr30" src="@/assets/images/light/jiangluo.png" alt="" v-else />
                            <div class="detil">
                                <div class="top_txt">
                                    <span class="common text_left">{{ fightItem.lastFromCity}}</span>
                                    <img class="small" src="../../../../assets/images/correlation/CFCA-start.png" alt="" v-if="theme==='dark'" />
                                    <img class="small" src="@/assets/images/light/qifei.png" alt="" v-else />
                                    <span class="common text_right">{{ fightItem.lastDestCity }}</span>
                                </div>
                                <div class="btn_txt mt10">
                                    最近出发/到达城市
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line lineLeft mt40 ml135"></div>
                <div class="other ml100">
                    <div class="tit mb30">其他</div>
                    <div class="other_con">
                        <div class="other_con_li">
                            <span class="con_left">平均票价：</span>
                            <span class="con_right">{{fightItem.avgPrice}}元</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">平均折扣：</span>
                            <span class="con_right">{{ fightItem.avgDiscount }}元</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">免费次数：</span>
                            <span class="con_right">{{ fightItem.freeCount }}元</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">头等舱次数：</span>
                            <span class="con_right">{{ fightItem.fcabin }}次</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">公务舱次数：</span>
                            <span class="con_right">{{ fightItem.ccabin }}元</span>
                        </div>
                    </div>
                </div>
                <div class="line lineRight mt40 ml110"></div>
                <div class="notit">
                    <div class="tit opacity mb30">其他</div>
                    <div class="other_con">
                        <div class="other_con_li">
                            <span class="con_left">经济舱次数：</span>
                            <span class="con_right">{{ fightItem.ycabin }}次</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">最近飞行时间：</span>
                            <span class="con_right">{{ fightItem.lastFlightDate }}</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">平均提前出票天数：</span>
                            <span class="con_right">{{ fightItem.avgTicketDay }}天</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">总延误时间：</span>
                            <span class="con_right">{{ fightItem.totalDelay }}小时</span>
                        </div>
                        <div class="other_con_li">
                            <span class="con_left">平均延误时间：</span>
                            <span class="con_right">{{ fightItem.avgDelay }}小时</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 关联人 -->
        <div class="sub-title mb20 mt20" id="people">关联人</div>

        <el-table :data="peopleList" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item class="throw">
                            <span class="throwTitle">名称:</span>
                            <span class="throwContent">{{
                                props.row.name
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">成立日期:</span>
                            <span class="throwContent">{{
                                props.row.createDate
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">法定代表人:</span>
                            <span class="throwContent">{{
                                props.row.faRen
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">注册号:</span>
                            <span class="throwContent">{{
                                props.row.regNumber
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">注册资本:</span>
                            <span class="throwContent">{{
                                props.row.regMoney
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">注册资本币种:</span>
                            <span class="throwContent">{{
                                props.row.regMoneyCurrency
                            }}</span>
                        </el-form-item>

                        <el-form-item class="throw">
                            <span class="throwTitle">登记状态:</span>
                            <span class="throwContent">{{
                                props.row.checkInStatus
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">职务:</span>
                            <span class="throwContent">{{
                                props.row.deadline
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">统一社会信用代码:</span>
                            <span class="throwContent">{{
                                props.row.creditCode
                            }}</span>
                        </el-form-item>
                        <el-form-item class="throw">
                            <span class="throwTitle">姓名:</span>
                            <span class="throwContent"></span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" label="姓名"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="公司名称" prop="name"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="成立日期" prop="createDate"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="法定代表" prop="faRen"> </el-table-column>
            <el-table-column :formatter="formatLabel" label="统一社会信用代码" prop="creditCode"> </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='peopleParams.size' @size-change='getPeople' :current-page.sync='peopleParams.current' @current-change='getPeople'
            layout='total, sizes, prev, pager, next, jumper' :total='peopleTotal' v-if='peopleTotal > 10'>
        </el-pagination>

    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data () {
        return {
            peopleParams: {
                current: 1,
                size: 10,
            },
            peopleTotal: 0,
            peopleList: [],
            fightItem: {},
            fightRecordList: [

            ]
        };
    },
    computed: mapState({
        theme: state => state.echart.flag
    }),
    watch: {
        theme () {
            this.getFlight()
        },
    },
    created () {
        this.getFlight()
        this.getPeople()
    },
    methods: {
        routeDate () {
            return [
                {
                    id: "people",
                    name: "关联人 " + (this.peopleTotal ? `(${this.peopleTotal})` : '')
                },
                {
                    id: "flight",
                    name: "CFCA飞行纪录"
                }
            ]        },
        getFlight () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json(`/dcp/query/person/relation/flight/${evaluateId}`, {}, { type: 'get' })
                .then(res => {
                    this.fightItem = res.data
                    if (this.theme === 'light') {
                        this.fightRecordList = [
                            {
                                color: "blue",
                                name: this.fightItem.flyTotalMileage,
                                unit: "km",
                                text: '总飞行里程数',
                                img: require('@/assets/images/light/CFCA-number.png')
                            },
                            {
                                color: "orange",
                                name: this.fightItem.flightTimes,
                                unit: "次",
                                text: '飞行次数',
                                img: require('@/assets/images/light/CFCA-number.png')
                            },
                            {
                                color: "pink",
                                name: this.fightItem.cncount,
                                unit: "次",
                                text: '国内飞行次数',
                                img: require('@/assets/images/light/CFCA-number-inland.png')
                            },
                            {
                                color: "blue",
                                name: this.fightItem.interCount,
                                unit: "次",
                                text: '国外飞行次数',
                                img: require('@/assets/images/light/CFCA-number-foreign.png')
                            },
                        ]
                    } else {
                        this.fightRecordList = [
                            {
                                color: "",
                                name: this.fightItem.flyTotalMileage,
                                unit: "km",
                                text: '总飞行里程数',
                                img: require('@/assets/images/correlation/CFCA-number.png')
                            },
                            {
                                color: "",
                                name: this.fightItem.flightTimes,
                                unit: "次",
                                text: '飞行次数',
                                img: require('@/assets/images/correlation/CFCA-number.png')
                            },
                            {
                                color: "",
                                name: this.fightItem.cncount,
                                unit: "次",
                                text: '国内飞行次数',
                                img: require('@/assets/images/correlation/CFCA-number-inland.png')
                            },
                            {
                                color: "",
                                name: this.fightItem.interCount,
                                unit: "次",
                                text: '国外飞行次数',
                                img: require('@/assets/images/correlation/CFCA-number-foreign.png')
                            },
                        ]
                    }
                });
        },
        getPeople () {
            let { evaluateId } = this.$route.query
            this.ajax
                .json(`/dcp/query/person/relation/people`, { evaluateId, ...this.peopleParams })
                .then(res => {
                    this.peopleList = res.data.records
                    this.peopleTotal = res.data.total
                });
        },
        // 锚点跳转
        point (item) {
            document.getElementById(item.id).scrollIntoView();
        }
    }
};
</script>

<style lang="scss" scoped>
.light {
    .frequency {
        .yuan {
            display: inline-block;
            background: #999999;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 9px;
        }
        .text {
            font-size: 14px;
            color: #999;
            letter-spacing: 0;
            line-height: 14px;
            margin-right: 9px;
        }
        .num {
            font-size: 14px;
            color: #333;
            letter-spacing: 0;
            line-height: 14px;
        }
    }
    .line {
        width: 1px;
        height: 150px;
        background-color: #dcdfe6;

        &.lineLeft {
            margin-left: 135px;
        }
        &.lineRight {
            margin-left: 110px;
        }
    }

    .top_presentation {
        border-bottom: 1px solid #dcdfe6;
    }
    .drawing {
        display: flex;
        .blue {
            background-image: linear-gradient(90deg, #36c2cf 0%, #35ade4 100%);
        }
        .orange {
            background-image: linear-gradient(269deg, #ff946a 0%, #fbb148 92%);
        }
        .pink {
            background-image: linear-gradient(90deg, #fe95a4 0%, #eb6f98 100%);
        }
        .purple {
            background-image: linear-gradient(270deg, #768cff 0%, #72a9ff 100%);
        }
        .drawing_li {
            width: 310px;
            height: 110px;
            position: relative;
            .num {
                position: absolute;
                left: 30px;
                top: 26px;
                .shu {
                    font-family: PingFangSC-Light;
                    font-size: 30px;
                    color: #ffffff;
                    letter-spacing: 0.88px;
                    line-height: 26px;
                }
                .km {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #ffffff;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }

            .topText {
                font-size: 14px;
                color: #fff;
                letter-spacing: 0;
                position: absolute;
                left: 30px;
                bottom: 26px;
            }
            .picture {
                display: block;
                width: 59px;
                height: 60px;
                position: absolute;
                right: 40px;
                top: 25px;
            }
        }
    }
    .bottom_details {
        display: flex;
        .child {
            display: flex;
            .CFCA-start {
                display: block;
                width: 54px;
                height: 54px;
            }
            .detil {
                .top_txt {
                    display: flex;
                    .common {
                        font-size: 20px;
                        color: #333333;
                        letter-spacing: 0;
                        line-height: 22px;
                    }
                    .small {
                        display: block;
                        width: 16px;
                        height: 13px;
                        margin: 0 18px;
                        margin-top: 4px;
                    }
                }
                .btn_txt {
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }
        }
        .other_con {
            .other_con_li {
                .con_left {
                    margin-bottom: 20px;
                    float: left;
                    font-size: 14px;
                    color: #999;
                    letter-spacing: 0;
                    line-height: 14px;
                    margin-right: 92px;
                }
                .con_right {
                    margin-bottom: 20px;
                    float: right;
                    font-size: 14px;
                    color: #333;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }
        }
    }
}
.dark {
    .frequency {
        .yuan {
            display: inline-block;
            background: #43a1ac;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            margin-right: 9px;
        }
        .text {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #909399;
            letter-spacing: 0;
            line-height: 14px;
            margin-right: 9px;
        }
        .num {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #43a1ac;
            letter-spacing: 0;
            line-height: 14px;
        }
    }
    .line {
        width: 1px;
        height: 150px;
        background-color: #4f5155;

        &.lineLeft {
            margin-left: 135px;
        }
        &.lineRight {
            margin-left: 110px;
        }
    }

    .top_presentation {
        border-bottom: 1px solid #4f5155;
    }
    .drawing {
        display: flex;

        .drawing_li {
            width: 310px;
            height: 110px;
            background-image: linear-gradient(270deg, #233132, #32373d);
            position: relative;
            .num {
                position: absolute;
                left: 30px;
                top: 26px;
                .shu {
                    font-family: PingFangSC-Light;
                    font-size: 30px;
                    color: #ffffff;
                    letter-spacing: 0.88px;
                    line-height: 26px;
                }
                .km {
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #ffffff;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }

            .topText {
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #51b5bf;
                letter-spacing: 0;
                position: absolute;
                left: 30px;
                bottom: 26px;
            }
            .picture {
                display: block;
                width: 59px;
                height: 60px;
                position: absolute;
                right: 40px;
                top: 25px;
            }
        }
    }
    .bottom_details {
        display: flex;
        .child {
            display: flex;
            .CFCA-start {
                display: block;
                width: 54px;
                height: 54px;
            }
            .detil {
                .top_txt {
                    display: flex;
                    .common {
                        font-family: PingFangSC-Light;
                        font-size: 20px;
                        color: #51b5bf;
                        letter-spacing: 0;
                        line-height: 22px;
                    }
                    .small {
                        display: block;
                        width: 16px;
                        height: 13px;
                        margin: 0 18px;
                        margin-top: 4px;
                    }
                }
                .btn_txt {
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #909399;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }
        }
        .other_con {
            .other_con_li {
                .con_left {
                    margin-bottom: 20px;
                    float: left;
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #909399;
                    letter-spacing: 0;
                    line-height: 14px;
                    margin-right: 92px;
                }
                .con_right {
                    margin-bottom: 20px;
                    float: right;
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #51b5bf;
                    letter-spacing: 0;
                    line-height: 14px;
                }
            }
        }
    }
}

.notit {
    margin-left: 112px !important;
}
.tit {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 16px;
}

.opacity {
    opacity: 0;
}
table {
    width: 100%;
    border: 1px solid #54575c;
    tr {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 0.44px;
        height: 50px;
        td {
            text-indent: 24px;
            &:nth-child(odd) {
                width: 150px;
                background: #292b2f;
            }
        }
    }
}
.btnGray_content {
    margin-bottom: 30px;
}
.btnGray {
    &.el-button.el-button--default {
        margin-right: 10px;
        margin-top: 20px;
    }
    &.el-button + .el-button {
        margin-left: 0;
    }
}
</style>
