<template>
    <div>
        <!-- <div class="el-20"></div> -->
        <div class=" el-bg"></div>
        <div class="invoice-wrap">
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title">项目类型分布</div>
                <div class="chart-list">
                    <chart height="270px" width="560px" :option="projectPie" id="project-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showCp" />
                    <ul>
                        <li>
                            {{PieData[cpIndex].name}}已合作
                            <span>{{PieData[cpIndex].pro}}</span>
                        </li>
                        <li>
                            {{PieData[cpIndex].name}}未合作
                            <span>{{PieData[cpIndex].no}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="invoice-echart-wrap p-re">
                <div class="pie-title2">企业类型分布</div>
                <div class="chart-list" style="margin-left: -160px;">
                    <chart height="270px" width="560px" :option="includedPie" id="project-pie2" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showIndex" />
                    <ul>
                        <li>
                            {{PieData2[companyIndex].name}}已合作
                            <span>{{PieData2[companyIndex].pro}}</span>
                        </li>
                        <li>
                            {{PieData2[companyIndex].name}}未合作
                            <span>{{PieData2[companyIndex].no}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="category">
            <div class="category-left">
                <ul>
                    <li v-for="(item,index) in PieData" :key="index">
                        <span class="circle" :style="`background-color: ${item.color}`"></span>{{item.name }} <span class="category-number ml10">{{ item.total}}</span>
                    </li>

                </ul>
            </div>
            <div class="category-right">
                <ul>
                    <li v-for="(item,index) in PieData2" :key="index">
                        <div>
                            <span class="circle " :style="`background-color: ${item.color}`"></span>{{item.name}}
                        </div>
                        <div>
                            <span class="category-number ">{{item.total}}</span>
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
// import pie from '@/utils/pie';
export default {
    components: {
        Chart
    },
    data () {
        return {
            hover: true,
            dispatchAction: true,
            projectPie: {},
            includedPie: {},
            processed: "",
            noCooperation: "",
            processed2: "",
            noCooperation2: "",
            cpIndex: 0,
            companyIndex: 0,
            PieData: [
                {
                    name: "其它",
                    pro: "1.06%",
                    no: "39.18%",
                    total: "40.24%",
                    color: "#36C2CF"
                },
                {
                    name: "市政工程",
                    pro: "0.12%",
                    no: "13.45%",
                    total: "13.57%",
                    color: "#768CFF "
                },
                {
                    name: "房屋建筑工程",
                    pro: "0.28%",
                    no: "45.91%",
                    total: "46.19%",
                    color: "#81E3C7"
                }
            ],
            PieData2: [
                {
                    name: "勘察企业",
                    pro: "0.01%",
                    no: "19.83%",
                    total: "19.84%",
                    color: "#36C2CF"
                },
                {
                    name: "监理企业",
                    pro: "0%",
                    no: "18.45%",
                    total: "18.45%",
                    color: "#3B26D9"
                },
                {
                    name: "设计企业",
                    pro: "0.01%",
                    no: "25.01%",
                    total: "25.02%",
                    color: "#70C6FF"
                },
                {
                    name: "造价咨询企业",
                    pro: "0%",
                    no: "0.12%",
                    total: "0.12%",
                    color: "#2757FC"
                },

                {
                    name: "设计与施工一体化企业",
                    pro: "0%",
                    no: "0.12%",
                    total: "0.12%",
                    color: "#2757FC"
                },
                {
                    name: "建筑业企业",
                    pro: "0.02%",
                    no: "36.43%",
                    total: "36.45%",
                    color: "#14DCC3"
                }
            ]
        };
    },
    created () {

        this.darkPie();
    },
    watch: {
        flag (e) {
            this.darkPie();
            this.setColor();

        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag;
            },
        }
    },
    methods: {
        setColor () {
            let darkColorList = [
                "#14dcc3",
                "#1ea57d",
                "#4d71ec",
            ]
            let lightColorList = [
                "#36C2CF",
                "#768CFF",
                "#81E3C7 "
            ]
            let pieDarkColorList = [
                "#14dcc3",
                "#70c6ff",
                "#1ea57d",
                "#3b26d9",
                "#4d71ec",
                "#2757fc",
            ]
            let pieLightColorList = [
                "#36C2CF",
                "#3B26D9",
                "#70C6FF ",
                "#2757FC",
                "#4D71EC",
                "#14DCC3",
            ]
            if (this.flag === "light") {
                this.PieData.map((item, index) => {
                    item.color = lightColorList[index]
                })
                this.PieData2.map((item, index) => {
                    item.color = pieLightColorList[index]
                })
            } else {
                this.PieData.map((item, index) => {
                    item.color = darkColorList[index]
                })
                this.PieData2.map((item, index) => {
                    item.color = pieDarkColorList[index]
                })
            }
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = '';
                this.params.startDate = '';
            }
        },
        showCp (index) {
            this.cpIndex = index;
        },
        showIndex (index) {
            this.companyIndex = index;
        },
        darkPie () {
            let pPie = deepClone(coopPie);
            let iPie = deepClone(coopPie2);
            var value, name;
            if (this.flag === 'light') {
                pPie.series[0].color = this.$infrastructure.industrial_policy.leftPie;
                pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring;
                pPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    }
                }
                this.projectPie = pPie;
                iPie.series[0].color = this.$infrastructure.industrial_policy.rightPie;
                iPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                iPie.tooltip.formatter = function (params) {

                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;letter-spacing: 1.01px;font-family:PingFang-SC-Regular">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666666;text-align:center;margin-top:7px;font-family:PingFang-SC-Regular">${name}</div>`;
                    }
                }

                this.includedPie = iPie;
            }
            this.projectPie = pPie;
            this.includedPie = iPie;
        },

    }
};
</script>
<style lang="scss" scoped>
.dark {
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 150px;
        top: 20px;
    }
    .pie-title2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 68px;
        top: 20px;
    }
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

        font-family: PingFangSC-Light;
        display: flex;
        justify-content: space-between;
        &-left {
            flex-basis: 48%;
            border-top: 1px solid #2e3236;
            ul {
                margin-right: 40px;
                height: 100px;
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
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
        &-right {
            flex-basis: 48%;
            border-top: 1px solid #2e3236;
            ul {
                margin-left: 30px;
                height: 100px;
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                list-style: none;
                flex-wrap: wrap;
            }
            li {
                margin-bottom: 12px;
                flex-basis: 50%;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                display: flex;
                justify-content: space-between;

                div {
                    &:nth-child(2n) {
                        margin-right: 60px;
                    }
                }
            }
        }
    }
    .chart-list {
        font-family: PingFangSC-Light;
        display: flex;
        margin-top: 20px;
        margin-left: -80px;
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
                    content: '';
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
}

.light {
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
        position: absolute;
        left: 150px;
        top: 20px;
    }
    .pie-title2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
        position: absolute;
        left: 68px;
        top: 20px;
    }
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

        display: flex;
        justify-content: space-between;
        &-left {
            flex-basis: 48%;
            border-top: 1px solid #dcdfe6;
            ul {
                margin-right: 40px;
                height: 100px;
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                list-style: none;
            }
            li {
                margin-bottom: 12px;
                font-size: 12px;
                color: #999;
                letter-spacing: 0;
            }
        }
        &-right {
            flex-basis: 48%;
            border-top: 1px solid #dcdfe6;
            ul {
                margin-left: 30px;
                height: 100px;
                margin-top: 40px;
                display: flex;
                justify-content: space-between;
                flex-direction: row;
                list-style: none;
                flex-wrap: wrap;
            }
            li {
                margin-bottom: 12px;
                flex-basis: 50%;
                font-size: 12px;
                color: #999;
                letter-spacing: 0;
                display: flex;
                justify-content: space-between;

                div {
                    &:nth-child(2n) {
                        margin-right: 60px;
                    }
                }
            }
        }
    }
    .chart-list {
        display: flex;
        margin-top: 20px;
        margin-left: -80px;
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
                color: #666;
                letter-spacing: 0;
                position: relative;
                left: -160px;
                &::before {
                    content: '';
                    width: 6px;
                    height: 6px;
                    background: #36c2cf;
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
                        background: #e0f6f9;
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
        &:last-child {
            .invoice-echart-title {
                left: 50px;
            }
        }
    }
    .el-bg {
        background: #ebecf3;
        height: 20px;
        margin-top: -4px;
    }
}
</style>