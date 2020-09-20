<template>
    <div>
        <div class="invoice-wrap">
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">项目类型占比</div>
                <div class="chart-list">
                    <chart height="270px" :option="projectPie" id="project-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showCp" />
                </div>
            </div>
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">供应材料占比</div>
                <div class="chart-list">
                    <chart height="270px" :option="providePie" id="provide-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showPv" />
                </div>
            </div>
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">业主背景占比</div>
                <div class="chart-list">
                    <chart height="270px" :option="includedPie" id="project-pie2" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showIndex" />
                </div>
            </div>
        </div>
        <div class="category">
            <div class="category-item">
                <ul>
                    <li>
                        <span class="circle light-green"></span>其它 <span class="category-number ml10">40.24%</span>
                    </li>
                    <li>
                        <span class="circle green"></span>市政工程 <span class="category-number ml10">13.57%</span>
                    </li>
                </ul>
            </div>
            <div class="category-item">
                <ul>
                    <li>
                        <span class="circle light-green"></span>其它 <span class="category-number ml10">40.24%</span>
                    </li>
                    <li>
                        <span class="circle green"></span>市政工程 <span class="category-number ml10">13.57%</span>
                    </li>
                </ul>
            </div>
            <div class="category-item">
                <ul>
                    <li>
                        <div>
                            <span class="circle green"></span>设计企业
                        </div>
                        <div>
                            <span class="category-number mr60">25.02%</span>
                        </div>
                    </li>
                    <li>
                        <div>
                            <span class="circle  blue"></span>建筑业企业
                        </div>
                        <div>
                            <span class="category-number">36.45%</span>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "@/components/Charts/invoiceInvalid.vue";
import coopPie from "@/utils/echart/coopPie2";
import coopPie2 from "@/utils/echart/coopPie3";
import { deepClone } from "@/utils/common";
export default {
    components: {
        Chart
    },
    data() {
        return {
            hover: true,
            dispatchAction: true,
            projectPie: {},
            providePie: {},
            includedPie: {},
            processed: "",
            noCooperation: "",
            processed2: "",
            noCooperation2: "",
            cpIndex: 0,
            provideIndex: 0,
            companyIndex: 0,
            PieData: [
                {
                    name: "其它",
                    pro: "1.06%",
                    no: "39.18%",
                    total: "40.24%"
                },
                {
                    name: "市政工程",
                    pro: "0.12%",
                    no: "13.45%",
                    total: "13.57%"
                },
                {
                    name: "房屋建筑工程",
                    pro: "0.28%",
                    no: "45.91%",
                    total: "46.19%"
                }
            ],
            PieData2: [
                {
                    name: "勘察企业",
                    pro: "0.01%",
                    no: "19.83%",
                    total: "19.84%"
                },
                {
                    name: "监理企业",
                    pro: "0%",
                    no: "18.45%",
                    total: "18.45%"
                },
                {
                    name: "设计企业",
                    pro: "0.01%",
                    no: "25.01%",
                    total: "25.02%"
                },
                {
                    name: "造价咨询企业",
                    pro: "0%",
                    no: "0.12%",
                    total: "0.12%"
                },

                {
                    name: "设计与施工一体化企业",
                    pro: "0%",
                    no: "0.12%",
                    total: "0.12%"
                },
                {
                    name: "建筑业企业",
                    pro: "0.02%",
                    no: "36.43%",
                    total: "36.45%"
                }
            ]
        };
    },
    created() {
        this.drawProjectPie();
        this.drawProvidePie();
        this.drawIncludedPie();
    },
    methods: {
        showCp(index) {
            this.cpIndex = index;
        },
        showPv(index) {
            this.provideIndex = index;
        },
        showIndex(index) {
            this.companyIndex = index;
        },
        drawProjectPie() {
            let pPie = deepClone(coopPie);
            this.projectPie = pPie;
        },
        drawProvidePie() {
            let vPie = deepClone(coopPie2);
            this.providePie = vPie;
        },
        drawIncludedPie() {
            let iPie = deepClone(coopPie2);
            this.includedPie = iPie;
        }
    }
};
</script>
<style lang="scss" scoped>
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        text-align: center;
    }
    // .pie-title2 {
    //     font-family: PingFangSC-Regular;
    //     font-size: 18px;
    //     color: #ffffff;
    //     letter-spacing: 1.5px;
    //     position: absolute;
    //     left: 68px;
    //     top: 20px;
    // }
    .category {
        width: 90%;
        margin: 0 auto;
        &-number {
            font-size: 12px;
            color: #909399;
            letter-spacing: 0;
        }
        .circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .ci-blue {
            background: #2757fc;
        }
        .light-green {
            background: #14dcc3;
        }
        .light-blue {
            background: #70c6ff;
        }
        .deep-blue {
            background: #3b26d9;
        }
        .green {
            background: #1ea57d;
        }
        .light-blue {
            background: #70c6ff;
        }
        .blue {
            background: #4d71ec;
        }
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        &-item {
            flex-basis: 48%;
            border-top: 1px solid #2e3236;
            ul {
                margin-right: 40px;
                height: 100px;
                margin-top: 40px;
                display: flex;
                flex-direction: row;
                list-style: none;
            }
            li {
                margin-bottom: 12px;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
            }
        }
    }
    .chart-list {
        font-family: PingFangSC-Light;
        display: flex;
        justify-content: center;
        // margin-top: 20px;
        #provide-pie,
        #project-pie,
        #project-pie2 {
            flex: 1;
        }
        ul {
            width: 200px;
            margin-top: 105px;
            list-style: none;
            li {
                width: 300px;
                height: 18px;
                line-height: 18px;
                padding-left: 15px;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                position: relative;
                left: -160px;
                &::before {
                    content: "";
                    width: 6px;
                    height: 6px;
                    background: #43b7a5;
                    border-radius: 50%;
                    position: absolute;
                    top: 6px;
                    left: 0;
                }
                span {
                    margin-left: 20px;
                    color: #909399;
                }
                &:last-child {
                    margin-top: 20px;
                    &::before {
                        background: #313235;
                    }
                }
            }
        }
        .tab-con {
            width: 430px;
            height: 168px;
            margin-left: 50px;
            tr {
                &:last-child {
                    td {
                        border-bottom: 1px solid #2e3236;
                    }
                }
            }
            td {
                width: 215px;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 1.17px;
                height: 40px;
                line-height: 40px;
                // border: 1px solid #2E3236;
                &:first-child {
                    border-left: 0;
                    padding-left: 15px;
                    border-top: 1px solid #2e3236;
                    border-right: 1px solid #2e3236;
                }
                &:last-child {
                    border-right: 0;
                    padding-left: 64px;
                    border-top: 1px solid #2e3236;
                    div {
                        span {
                            margin-right: 30px;
                        }
                    }
                }
                div {
                    position: relative;
                    padding-left: 15px;
                    overflow: hidden;
                    i {
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background: #9bbc6c;
                        top: 18px;
                        left: 0;
                    }
                    span {
                        float: right;
                        margin-right: 68px;
                        color: #ffffff;
                    }
                    .i-two {
                        background: #4a92e9;
                    }
                    .i-three {
                        background: #4a96ce;
                    }
                    .i-four {
                        background: #39b4a7;
                    }
                    .i-five {
                        background: #fa4d58;
                    }
                    .i-six {
                        background: #e37f57;
                    }
                    .i-seven {
                        background: #d4b760;
                    }
                }
            }
        }
    }
    /deep/ .invoice-echart-title {
        position: absolute;
        height: 41px;
        line-height: 32px;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        text-align: center;
        top: 50px;
        left: 100px;
        right: 0;
        z-index: 999;
    }
    /deep/ .invoice-echart-wrap {
        flex: 1;
        &:last-child {
            .invoice-echart-title {
                left: 50px;
            }
        }
    }
    .el-bg {
        background: #1d1e23;
        height: 20px;
        margin-top: -4px;
    }
</style>