<template>
    <div class="card-box">
        <div class="card" v-for="(v,k) in topPieList" :key="k">
            <div class="card-hd">
                <div class="t1">No.{{k+1}}</div>
                <div class="t2" v-if="v.title && v.title.length<23">{{v.title}}</div>
                <el-tooltip class="item" effect="dark" :content="v.title" placement="top-start" v-if="v.title && v.title.length>22">
                    <div class="t2">{{v.title}}</div>
                    <!-- <el-button>{{v.title}}</el-button> -->
                </el-tooltip>
            </div>
            <div class="card-bd">
                <div class="box">
                    <div class="clip" :class="v.proportion/100*360>220?'auto':''">
                        <div class="left" :style="{transform:'rotate'+'('+v.proportion/100*360+'deg'+')'}" :class="k>2?'top3left':'low3left'"></div>
                        <div class="right" :class="{'width-none':v.proportion/100*360<=180,'top3right':k>2,'low3right':k<3,'low3width-none':k<3,'top3width-none':k>2}"></div>
                    </div>
                    <div class="cover"></div>
                    <div class="num" :style="{color:k>2?'#5969C3':'#449FA8'}">
                        <span>{{v.proportion}}</span>%
                    </div>
                </div>
                <!-- <chart height="125px" width="125px" :option="v.percentage " :id="'card-pie'+k" /> -->
            </div>
            <div class="card-fd">
                <div class="item" v-for="(item,index) in fieldList" :key="index">
                    <div class="item-label">{{ item.label}}</div>
                    <div class="item-value">{{ typeof(v[item.key])==='number'?numFormat(v[item.key]):v[item.key] }}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
// import Chart from "@/components/Charts/invoiceInvalid.vue";
export default {
    props: {
        topPieList: Array,
        fieldList: Array
    },
    watch: {
        topPieList(e) {
            console.log(e);
        },
    },
    // components: {
    //     Chart
    // },
};
</script>
<style lang="scss" scoped>
    .light {
        .card-box {
            .card {
                border: 1px solid #D2D9E5;
                background-image: linear-gradient(44deg, #1ba4c9 0%, #64d8b7 100%);
                .box {
                    background-color: #5ec9c7;
                    .clip {
                        border: 10px solid #5ec9c7;
                    }
                    .num {
                        background: #40b8c1;
                    }
                    .cover {
                        background: #40b8c1;
                    }
                }
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3) {
                    background-image: linear-gradient(
                        44deg,
                        #4878ca 0%,
                        #36c2cf 100%
                    );
                    .box {
                        background-color: #58b0d4;
                        .clip {
                            border: 10px solid #58b0d4;
                        }
                        .num {
                            background: #3f95cd;
                        }
                        .cover {
                            background: #3f95cd;
                        }
                    }
                }
                &:hover {
                    margin-top: -10px;
                    transform: translateY(-10px);
                    border: 1px solid #d2d9e5;
                    background-image: linear-gradient(
                        44deg,
                        #1ba4c9 0%,
                        #64d8b7 100%
                    );
                    &:nth-child(1),
                    &:nth-child(2),
                    &:nth-child(3) {
                        background-image: linear-gradient(
                            44deg,
                            #4878ca 0%,
                            #36c2cf 100%
                        );
                    }
                }
            }
            .card-hd {
                .t1 {
                    color: #fff;
                }
                .t2 {
                    font-family: PingFangSC-SC-Regular;
                }
            }
            .card-bd {
                /* .box {
                                                                background-color: #58B0D4;
                                                            } */
                .clip {
                    width: 130px;
                    height: 130px;
                    position: absolute;
                    /* border: 10px solid #58B0D4; */
                    border-radius: 50%;
                    clip: rect(0, 130px, 130px, 60px);
                }
                .num {
                    font-family: PingFang-SC-Regular;
                    /* background: #23282b; */
                    border: 1px solid #fff;
                    color: #fff !important;
                }
                .cover {
                    position: absolute;
                    /* background: #232528; */
                    width: 120px;
                    height: 120px;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 100%;
                    z-index: 1;
                }
                .low3left {
                    background: #fff;
                }
                .low3right {
                    background: #43b7a5;
                }
                .low3width-none {
                    background: linear-gradient(#fff, #fff);
                }
                .top3left {
                    background: #fff;
                }
                .top3right {
                    background: #fff;
                }
                .top3width-none {
                    background: linear-gradient(#fff, #fff);
                }
            }
            .card-fd {
                border-top: 1px solid #fff;
                .item {
                    .item-label,
                    .item-value {
                        color: #fff;
                    }
                    .item-value {
                        color: #fff;
                    }
                }
            }
            &::-webkit-scrollbar {
                /*滚动条整体样式*/
                height: 8px;
            }
            &::-webkit-scrollbar-thumb {
                /*滚动条里面小方块*/
                background: #7596ff;
            }
            &::-webkit-scrollbar-track {
                /*滚动条里面轨道*/
                background: #f1f4fc;
            }
        }
    }
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-button {
        height: 0px;
        width: 0px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #2a3c40;
        border-radius: 4px;
    }
    /*滚动条里面轨道*/
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #1d1e23;
    }

    .card-box {
        display: flex;
        overflow-x: auto;
        padding: 20px 0;
        .card {
            padding: 30px 0;
            width: 242px;
            height: 395px;
            border: 1px solid #2e3236;
            flex-shrink: 0;
            transition: transform 0.5s 0s;
            box-sizing: border-box;
            &:hover {
                margin-top: -10px;
                transform: translateY(-10px);
                background: rgba(45, 60, 62, 0.19);
                border: 1px solid #465b5e;
            }
        }
        .card + .card {
            margin-left: 20px;
        }

        .card-hd {
            padding: 0 26px;
            .t1 {
                font-size: 20px;
                color: #43b7a5;
                letter-spacing: 1.17px;
            }
            .t2 {
                font-family: PingFangSC-Light;
                padding-top: 10px;
                height: 45px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 16px;
                color: #ffffff;
                letter-spacing: 0.93px;
            }
        }
        .card-bd {
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: center;

            div {
                box-sizing: border-box;
            }
            .box {
                width: 130px;
                height: 130px;
                position: relative;
                background-color: #313235;
                border-radius: 50%;
            }
            .clip {
                width: 130px;
                height: 130px;
                position: absolute;
                border: 10px solid #313235;
                border-radius: 50%;
                clip: rect(0, 130px, 130px, 60px);
            }
            .num {
                position: absolute;
                font-family: PingFangSC-Light;
                font-size: 20px;
                background: #23282b;
                border: 1px solid #334448;
                width: 100px;
                height: 100px;
                text-align: center;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: 100%;
                line-height: 100px;
                z-index: 2;
                font-weight: bold;
            }
            .cover {
                position: absolute;
                background: #232528;
                width: 120px;
                height: 120px;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                border-radius: 100%;
                z-index: 1;
            }
            .left {
                width: 130px;
                height: 130px;
                position: absolute;
                padding: 10px;
                border-radius: 100%;
                clip: rect(0 60px 130px 0);
                top: -10px;
                left: -10px;
            }
            .right {
                width: 130px;
                height: 130px;
                position: absolute;
                padding: 10px;
                /* background: #43b7a5; */
                border-radius: 50%;
                clip: rect(0 130px 130px 60px);
                top: -10px;
                left: -10px;
            }
            .width-none {
                width: 0;
                /* background: linear-gradient(#1f665b, #43b7a5); */
            }
            .auto {
                clip: auto;
            }
            .low3left {
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
            }
            .low3right {
                background: #43b7a5;
            }
            .low3width-none {
                background: linear-gradient(#1f665b, #43b7a5);
            }
            .top3left {
                background: linear-gradient(
                    #2a4c67,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3,
                    #5969c3
                );
            }
            .top3right {
                background: #5969c3;
            }
            .top3width-none {
                background: linear-gradient(#2a4c67, #5969c3);
            }
        }
        .card-fd {
            border-top: 1px solid #2e3236;
            padding: 0 20px;
            margin-top: -30px;
            .item {
                padding-top: 6px;
                display: flex;
                justify-content: space-between;
                margin-top: 4px;
                .item-label,
                .item-value {
                    font-size: 12px;
                    color: #a0a3a8;
                    letter-spacing: 0.7px;

                    flex-shrink: 0;
                }
                .item-value {
                    color: #449fa8;
                }
            }
        }
    }
</style>