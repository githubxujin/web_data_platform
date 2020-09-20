<template>
    <div class="pie-box-wrap">
        <div class="pie-item" v-for="(item,index) in cooperationList" :key="index">
            <div class=" pie-left">
                <div class="pie-title" v-if="item.rankingVo.title && item.rankingVo.title.length<24">
                    <span class="pie-no">NO.{{index+ 1}}</span>{{item.rankingVo.title}}
                </div>
                <el-tooltip class="item" effect="dark" :content="item.rankingVo.title" placement="top-start" v-if="item.rankingVo.title && item.rankingVo.title.length>23">
                    <div class="pie-title">
                        <span class="pie-no">NO.{{index+ 1}}</span>{{item.rankingVo.title}}
                    </div>
                </el-tooltip>
                <div class="pie-wrap">
                    <div class="box">
                        <div class="clip" :class="item.rankingVo.proportion/100*360>220?'auto':''">
                            <div class="left" :style="{transform:'rotate'+'('+item.rankingVo.proportion/100*360+'deg'+')'}"></div>
                            <div class="right" :class="{'width-none':item.rankingVo.proportion/100*360<=180}"></div>
                        </div>
                        <div class="cover"></div>
                        <div class="num">
                            <span>{{item.rankingVo.proportion}}</span>%
                        </div>
                    </div>
                    <!-- <pie-list :topPieList="restLeft(item)"  /> -->
                    <!-- <Chart class="pie-des-left" width="99.1px" height="99.1px" :id="'pieleft'+index" :option="restLeft(item)" /> -->
                    <div class="pie-des-list">
                        <div class="pie-des-wrap">
                            <div class="pie-des-tett">
                                转让金额(万元)
                            </div>
                            <div class="pie-des-num">
                                {{getFormatTotal(item.rankingVo.transferAmount)}}
                            </div>
                        </div>
                        <div class="pie-des-wrap">
                            <div class="pie-des-tett">
                                融资金额(万元)
                            </div>
                            <div class="pie-des-num">
                                {{getFormatTotal(item.rankingVo.financesAmount)}}
                            </div>
                        </div>
                        <div class="pie-des-wrap">
                            <div class="pie-des-tett">
                                转让次数
                            </div>
                            <div class="pie-des-num">
                                {{item.rankingVo.transferCount | numFormat}}
                            </div>
                        </div>
                        <div class="pie-des-wrap">
                            <div class="pie-des-tett">
                                合作时长
                            </div>
                            <div class="pie-des-num">
                                {{item.rankingVo.duration || 0}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pie-right">
                <div class="pie-title">资产偏好</div>
                <div class="pie-wrap">
                    <pie class="pie-des-right" width="105px" height="105px" :id="'pieright'+index" :opt="restRight(item)" />
                    <div class="pie-content-list">
                        <div class="pie-content-wrap" v-for="(i,indexList) in item.preferenceVos" :key="indexList">
                            <cProgress :value="i.proportion" :color="color[indexList]" fillColor="#3A3A3F" :inCircle="true" />
                            <div class="pie-con-wrap">
                                <div class="pie-con-text">{{i.projectType}}(万元)</div>
                                <div class="pie-con-num">{{getFormatTotal(i.financesAmount)}}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Chart from "@/components/Charts/invoiceInvalid.vue";
import pieData from "@/utils/echart/pie/pie"
// import wavePie from "@/utils/echart/pie/wave-pie"
import { deepClone } from "@/utils/common"
import cProgress from "@/components/svg/progress.vue";
import { numFormat } from '../../../../filters';
export default {
    props: {
        cooperationList: Array
    },
    components: {
        cProgress,
        // Chart,
        'pie': () => import("@/components/Pie/pie.vue"),
        // 'pie-list': () => import("../supplier/pie-list.vue"),
    },
    watch: {
        flag(e) {
            this.setcolor();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },
    data() {
        return {
            color: [
                "#319A8A",
                "#4181CF",
                "#ACCE7A",
                "#A13940",
                "#444E80",
                "#43B7A5"
            ],
        };
    },
    mounted() {
        this.setcolor();
    },
    methods: {
        setcolor() {
            if (this.flag === 'light') {
                this.color = [
                    '#4064D4',
                    '#FABA5E',
                    '#EC80A4',
                    '#2DBBA9',
                    '#FD8962',
                    '#4598FF',
                ]
            } else {
                this.color = [
                    "#319A8A",
                    "#4181CF",
                    "#ACCE7A",
                    "#A13940",
                    "#444E80",
                    "#43B7A5"
                ]
            }
        },
        getFormatTotal(total) {
            return numFormat((total / 10000).toFixed(2))
        },
        restRight(row) {
            let opt = deepClone(pieData);
            opt.series[0].radius = ['85%', '95%'];

            opt.series[0].data = row.preferenceVos.map(item => {
                return {
                    name: item.projectType,
                    value: item.proportion,
                }
            })

            opt.series[0].color = this.color;
            opt.series[1].radius = ['32', '33'];
            opt.series[1].data[0].itemStyle.normal.color = '#334548';
            if (this.flag === 'light') {
                opt.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
            }
            opt.tooltip.position = ['-1%', '23%']
            let value = "";
            let name = "";
            opt.tooltip.formatter = params => {
                if (params.seriesIndex === 0) {
                    value = params.percent;
                    name = params.name
                }
                if (this.flag === 'light') {
                    return `<div style="font-family: PingFang-SC-Regular;font-size: 16px;color: #4064D4;width:100px;text-align:center;">${value}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFang-SC-Regular;font-size: 12px;color: #4064D4;text-align: center;">${name}</div>
                        `
                } else {
                    return `<div style="font-family: PingFangSC-Light;font-size: 16px;color: #449FA8;width:100px;text-align:center;">${value}<span style="font-size: 12px">%</span></div>
                           <div style="font-family: PingFangSC-Light;font-size: 12px;color: #449FA8;text-align: center;">${name}</div>
                        `
                }
            }
            return opt;
        }
    }
};
</script>
<style lang="scss" scoped>
    .light {
        .pie-item {
            background: #f6f8fd;
            .pie-left {
                .pie-title {
                    font-family: PingFang-SC-Regular;
                    color: #333;
                    .pie-no {
                        color: #385dd2;
                        font-family: PingFang-SC-Regular;
                    }
                }
                .pie-wrap {
                    .pie-des-list {
                        .pie-des-num {
                            font-family: PingFang-SC-Regular;
                            color: #666;
                        }
                    }
                }
            }
            .pie-right {
                    border-left: 1px solid #D2D9E5;
                .pie-title {
                    font-family: PingFang-SC-Regular;
                    color: #333;
                }
                .pie-content-wrap {
                    .pie-con-text {
                        color: #666;
                        font-family: PingFang-SC-Regular;
                    }
                    .pie-con-num {
                        color: #666;
                        font-family: PingFang-SC-Regular;
                    }
                }
            }
        }
        .box {
            background: #d6f1f4;
            .clip {
                border: 10px solid #d6f1f4;
                .left {
                    background: #36c2cf;
                }
                .right {
                    background: #36c2cf;
                }
            }
            .cover {
                background: #f6f8fd;
            }
            .num {
                background: #eff6fb;
                border: 1px solid #d0d7e3;
                color: #3359d1;
                font-family: PingFang-SC-Regular;
            }
        }
        .pie-des-tett {
            color: #666;
        }
    }
    .pie-des-tett{
        font-size:12px;
    }
    div {
        box-sizing: border-box;
    }
    .box {
        width: 100px;
        height: 100px;
        position: relative;
        background-color: #393c3f;
        border-radius: 50%;
        margin-left: 80px;
        margin-top: 20px;
    }

    .clip {
        width: 100px;
        height: 100px;
        position: absolute;
        border: 10px solid #393c3f;
        border-radius: 50%;
        clip: rect(0, 100px, 100px, 40px);
    }
    .num {
        position: absolute;
        font-family: PingFangSC-Light;
        color: #449fa8;
        font-size: 14px;
        background: #2d3034;
        border: 1px solid #334549;
        width: 70px;
        height: 70px;
        text-align: center;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 100%;
        line-height: 70px;
        z-index: 2;
    }
    .cover {
        position: absolute;
        background: #2d3034;
        width: 90px;
        height: 90px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 100%;
        z-index: 1;
    }
    .left {
        width: 100px;
        height: 100px;
        position: absolute;
        padding: 10px;
        background: linear-gradient(
            #1f665b,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5,
            #43b7a5
        );
        border-radius: 100%;
        clip: rect(0 40px 100px 0);
        top: -10px;
        left: -10px;
    }
    .right {
        width: 100px;
        height: 100px;
        position: absolute;
        padding: 10px;
        background: #43b7a5;
        border-radius: 50%;
        clip: rect(0 100px 100px 40px);
        top: -10px;
        left: -10px;
    }
    .width-none {
        width: 0;
        background: linear-gradient(#1f665b, #43b7a5);
    }
    .auto {
        clip: auto;
    }

    .pie-box-wrap {
        display: flex;
        flex-direction: column;
    }
    .pie-item {
        width: 1170px;
        height: 200px;
        background: #2d3034;
        margin-bottom: 20px;
        display: flex;

        .pie-left {
            width: 490px;
            .pie-title {
                height: 24px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
            }
            .pie-wrap {
                display: flex;
                .pie {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin-left: 84.5px;
                    margin-top: 23.5px;
                    background: lightcyan;
                }
                .pie-des-left {
                    margin-left: 84.5px;
                    margin-top: 23.5px;
                }
                .pie-des-list {
                    margin-left: 40px;
                    width: 270px;
                    display: flex;
                    flex-wrap: wrap;

                    .pie-des-wrap {
                        margin-top: 25px;
                        flex-basis: 50%;
                        display: flex;
                        flex-direction: column;
                    }
                    .pie-des-text {
                        font-family: PingFangSC-Light;
                        font-size: 12px;
                        color: #a0a3a8;
                        letter-spacing: 0.7px;
                    }
                    .pie-des-num {
                        margin-top: 10px;
                        font-family: PingFangSC-Light;
                        font-size: 12px;
                        color: #449fa8;
                        letter-spacing: 0.7px;
                    }
                }
            }
        }
        .pie-right {
            padding-left: 41.6px;
            border-left: 1px solid #3d3f43;
            margin-bottom: 29.5px;
            margin-top: 30px;
            .pie-title {
                margin: 0;
                text-indent: 16px;
            }
            .pie-content-list {
                width: 500px;
                margin-top: 30px;
                display: flex;
                flex-wrap: wrap;
                margin-left: 40px;
            }
            .pie-content-wrap {
                flex-basis: 33.3%;
                display: flex;
                margin-bottom: 28px;
                overflow: hidden;
                .pie-con-wrap {
                    margin-left: 20px;
                    display: flex;
                    flex-direction: column;
                }
                .pie-con-text {
                    margin-bottom: 8px;
                    font-family: PingFangSC-Light;
                    font-size: 12px;
                    color: #8c8f93;
                }
                .pie-con-num {
                    font-family: PingFangSC-Light;
                    font-size: 12px;
                    color: #43a1ac;
                }
            }
            .pie-wrap {
                display: flex;
                justify-content: space-between;
                .pie-des-right {
                    margin-top: 21.4px;
                    z-index: 0;
                }
                .pie {
                    width: 100px;
                    height: 100px;
                    background: lightgoldenrodyellow;
                    border-radius: 50%;
                    margin-top: 23.5px;
                }
            }
        }
        .pie-title {
            margin: 27px 0 0 20px;
            font-family: pingfang-light;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0.93px;
            .pie-no {
                font-family: PingFangSC-Light;
                font-size: 20px;
                color: #43b7a5;
                letter-spacing: 1.17px;
                margin-right: 12px;
            }
        }
    }
</style>