<template>
    <div class="statistics pb20">
        <div class="line_datas">
            <div class="line_left">
                <div class="content_left">
                    <div class="title">监控企业账户数</div>
                    <div class="num">{{numTotal | numFormat }}</div>
                    <chart height="140px" width="360px" :option="projectPie" id="statistics-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showCp" />
                </div>
            </div>
            <div class="line_right ml20">
                <div :class="`catDatas catData_${index}`" v-for="(item, index) in statList" :key="index">
                    <img :src="imageList[index]" alt="" />
                    <div class="text">
                        <span class="num_top">{{
                            statList[index].number | numFormat
                        }}</span>
                        <span class="tit_bot">{{
                            sourceLabel(statList[index].source)  
                        }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from "@/components/Charts/invoiceInvalid.vue";
import coopPie from "@/utils/echart/coopPie_statistics";
import { deepClone } from "@/utils/common";
export default {
    components: { Chart },
    data () {
        return {
            imageList: [

            ],
            statList: [
                {
                    number: 0,
                    source: 1
                },
                {
                    number: 0,
                    source: 2
                },
                {
                    number: 0,
                    source: 3
                }
            ],
            numTotal: 0,
            // 饼图数据
            projectPie: {},
            dispatchAction: true,
            hover: true,
            cpIndex: 0
        };
    },
    created () {
        this.getStat();
    },
    watch: {
        flag () {
            this.getStat()
        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {

        getPin () {
            let newDataName = ["猫池", "主账户", "二级账户", "银行流水"];
            let pPie = deepClone(coopPie);
            this.numTotal = this.statList.reduce((lator, value, index) => {
                return lator + value.number
            }, 0)
            let newDataValue = []
            this.statList.map((item, index) => {
                newDataValue.push((item.number / this.numTotal * 100).toFixed(2))
            })
            pPie.series[0].data.map((item, index) => {
                item.name = newDataName[index];
                item.value = newDataValue[index];
            });

            // 主题切换
            console.log(this.flag)
            if (this.flag === 'light') {

                this.imageList = [
                    require("@/assets/images/light/maochi.png"),
                    require("@/assets/images/light/zhuzhanghu.png"),
                    require("@/assets/images/light/erjizhanghu.png")
                ]
                pPie.series[0].color = this.$service.moneyWater.pPie
                pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                var value = ""
                var name = ""
                let that = this
                pPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:${that.$service.moneyWater.fff};font-size:14px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:10px;color:${that.$service.moneyWater.fff};text-align:center;margin-top:0;">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:${that.$service.moneyWater.fff};font-size:14px;font-family:PingFangSC-Light;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:10px;color:${that.$service.moneyWater.fff};text-align:center;margin-top:0;">${name}</div>`;
                    }
                }
            } else {
                this.imageList = [
                    require("@/assets/images/correlation/money-water.png"),
                    require("@/assets/images/correlation/water-account.png"),
                    require("@/assets/images/correlation/water-account-second.png")
                ]
            }

            this.projectPie = pPie;
        },
        showCp (index) {
            this.cpIndex = index;
        },
        getStat () {
            this.ajax
                .json("/dcp/comm/sms/statistics/customer", {})
                .then(res => {
                    // this.clientTotal = res.data.reduce(acc, cur => { acc.number + curr }, 0)
                    this.statList.map((item, i) => {
                        res.data.map((j, v) => {
                            if (item.source === j.source) {
                                this.statList[i].number = j.number;
                                this.getPin();
                            }
                        });
                    });
                });
        },
        sourceLabel (key) {
            switch (key) {
                case 1:
                    return "猫池";
                case 2:
                    return "主账户";
                case 3:
                    return "二级账户";
                // case 4:
                //     return "银行流水";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.light {
    .line_datas {
        display: flex;
    }
    .line_left {
        width: 360px;
        height: 139px;
        background-image: linear-gradient(-45deg, #00b1d5 0%, #39c2b6 100%);
        margin-top: 21px;
    }
    .content_left {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.41px;
        line-height: 16px;
        position: relative;
        .title {
            position: absolute;
            top: 21px;
            left: 19px;
        }
        .num {
            font-size: 30px;
            letter-spacing: 0.88px;
            line-height: 30px;
            position: absolute;
            left: 23px;
            top: 55px;
        }
        .aggregate {
            font-size: 14px;
            color: #fff;
            letter-spacing: 1.34px;
            position: absolute;
            left: 23px;
            top: 93px;
        }
        .content_right {
            display: block;
            width: 89px;
            height: 89px;
            position: absolute;
            right: 42.8px;
            top: 26.8px;
        }
    }
    .line_right {
        font-family: PingFangSC-Light;
        width: 940px;
        height: 139px;
        background-image: linear-gradient(-46deg, #405fd4 0%, #3c95cf 100%);
        margin-top: 21px;
        position: relative;
        .catDatas {
            display: flex;
            margin-top: 41px;
            position: relative;
            img {
                display: block;
                width: 60px;
                height: 60px;
                position: absolute;
            }
            .num_top {
                font-size: 30px;
                color: #ffffff;
                letter-spacing: 0.88px;
                line-height: 30px;
                position: absolute;
            }
            .tit_bot {
                font-size: 14px;
                color: #fff;
                letter-spacing: 1.34px;
                position: absolute;
                top: 38px;
            }
        }
        .catData_0 {
            margin-top: 41px;
            img {
                left: 76px;
            }
            .num_top {
                left: 166px;
            }
            .tit_bot {
                left: 166px;
            }
        }
        .catData_1 {
            margin-top: 0;
            img {
                left: 396px;
            }
            .num_top {
                left: 480px;
            }
            .tit_bot {
                left: 480px;
            }
            &::before {
                content: '';
                background-color: rgba(255, 255, 255, 0.1);
                opacity: 0.5;
                width: 1px;
                height: 70px;
                position: absolute;
                left: 313px;
            }
        }
        .catData_2 {
            margin-top: 0;
            img {
                left: 694px;
            }
            .num_top {
                left: 784px;
            }
            .tit_bot {
                left: 784px;
            }
            &::before {
                content: '';
                background-color: rgba(255, 255, 255, 0.1);
                opacity: 0.5;
                width: 1px;
                height: 70px;
                position: absolute;
                left: 627px;
            }
        }
    }
}
.dark {
    .line_datas {
        display: flex;
    }
    .line_left {
        width: 360px;
        height: 139px;
        background-image: linear-gradient(270deg, #233132 0%, #32373d 100%);
        margin-top: 21px;
    }
    .content_left {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.41px;
        line-height: 16px;
        position: relative;
        .title {
            position: absolute;
            top: 21px;
            left: 19px;
        }
        .num {
            font-size: 30px;
            letter-spacing: 0.88px;
            line-height: 30px;
            position: absolute;
            left: 23px;
            top: 55px;
        }
        .aggregate {
            font-size: 14px;
            color: #51b5bf;
            letter-spacing: 1.34px;
            position: absolute;
            left: 23px;
            top: 93px;
        }
        .content_right {
            display: block;
            width: 89px;
            height: 89px;
            position: absolute;
            right: 42.8px;
            top: 26.8px;
        }
    }
    .line_right {
        width: 940px;
        height: 139px;
        background: #2d3439;
        margin-top: 21px;
        position: relative;
        .catDatas {
            display: flex;
            margin-top: 41px;
            position: relative;
            img {
                display: block;
                width: 60px;
                height: 60px;
                position: absolute;
            }
            .num_top {
                font-family: PingFangSC-Light;
                font-size: 30px;
                color: #ffffff;
                letter-spacing: 0.88px;
                line-height: 30px;
                position: absolute;
            }
            .tit_bot {
                font-family: PingFangSC-Light;
                font-size: 14px;
                color: #51b5bf;
                letter-spacing: 1.34px;
                position: absolute;
                top: 38px;
            }
        }
        .catData_0 {
            margin-top: 41px;
            img {
                left: 76px;
            }
            .num_top {
                left: 166px;
            }
            .tit_bot {
                left: 166px;
            }
        }
        .catData_1 {
            margin-top: 0;
            img {
                left: 396px;
            }
            .num_top {
                left: 480px;
            }
            .tit_bot {
                left: 480px;
            }
            &::before {
                content: '';
                background-color: #4f4f4f;
                opacity: 0.5;
                width: 1px;
                height: 70px;
                position: absolute;
                left: 313px;
            }
        }
        .catData_2 {
            margin-top: 0;
            img {
                left: 694px;
            }
            .num_top {
                left: 784px;
            }
            .tit_bot {
                left: 784px;
            }
            &::before {
                content: '';
                background-color: #4f4f4f;
                opacity: 0.5;
                width: 1px;
                height: 70px;
                position: absolute;
                left: 627px;
            }
        }
    }
}

/deep/ #statistics-pie {
    margin-left: 100px !important;
}
</style>
