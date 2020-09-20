<template>
    <div>
        <div class="el-20 "></div>
        <div class="invoice-wrap mt50">
            <div class="invoice-echart-wrap ml40 p-re">
                <div class="pie-title">合作医院分布</div>
                <div class="chart-list">
                    <chart height="300px" width="200px" :option="projectPie" id="project-pie" :dispatchAction="dispatchAction" />
                    <ul>
                        <li v-for="(item,index) in PieData" :key="index">
                            {{item.name}}
                            <span>{{item.value}}%</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="line mr80"></div>
            <div class="invoice-echart-wrap mr80 p-re">
                <div class="pie-title2">医院地域分布</div>
                <div class="chart-list">
                    <chart height="300px" width="200px" :option="includedPie" id="project-pie2" :dispatchAction="dispatchAction" />
                    <div class="map-list ml40">
                        <div class="map-list-item pb20">
                            <div class="item-hd">序号</div>
                            <div class="item-bd">省份</div>
                            <div class="item-fd pl20">数量占比</div>
                        </div>

                        <div class="map-list-box">
                            <div class="map-list-item" v-for="(v,k) in provinceList" :key="k">
                                <div class="item-hd">{{k+1}}</div>
                                <div class="item-bd">
                                    <span class="spanColor" :style='{background:color[k]}' v-if="flag==='dark'"></span>
                                    <span class="spanColor" :style='{background:$medicine.medicalHomePage.drawIncludedPie[k]}' v-else></span>
                                    {{v.name}}
                                </div>
                                <div class="item-fd">
                                    <el-row type="flex" align="middle">
                                        <div class="pl20">{{getProgress(v.value)}}%</div>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
    data () {
        return {
            provinceList: [],
            hover: true,
            dispatchAction: true,
            projectPie: {},
            includedPie: {},
            cooperation: "",
            unCooperation: "",
            totalCooperation: 0,
            PieData: [
                { name: '已合作医院数', value: 0 },
                { name: '未合作医院数', value: 0 },
            ],
            color: [
                '#02B9A6',
                '#0FBA9B',
                '#0FBA9B',
                '#26BD8B ',
                '#34BF87 ',
                '#37BF87 ',
                '#3AC087 ',
                '#45C185 ',
                '#57C484',
                '#61C482 ',
                '#67C582',
                '#74C781',
                '#7BC880',
                '#85C97E ',
                '#95CB7D ',
                '#A2CC7B ',
                '#AECE7A',
                '#BFD078',
                '#5CA3CE',
                '#4CA3D5',
                '#34A0DC',
                '#239AD5',
                '#1594CF',
                '#078EC9',
                '#008BC6',
                '#087DBF',
                '#0C72B8',
                '#1169B3',
                '#1563B0',
                '#185DAC',
                '#1C55A8',
                '#204BA2',
                '#333BA2'
            ]
        };
    },
    created () {
        this.getChart()
    },
    watch: {
        flag (e) {
            this.getChart();
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
        getChart () {
            this.ajax
                .json('/dcp/query/hospital/count', {}, { type: 'get' })
                .then(res => {
                    let { provinceCount = [], cooperationCount, count } = res.data

                    this.provinceList = provinceCount.map(i => {
                        return {
                            name: i.province,
                            value: i.count
                        }
                    })
                    this.totalCooperation = count
                    this.cooperation = cooperationCount
                    this.drawIncludedPie()
                    this.drawProjectPie()
                });
        },
        /* 计算所在比例 */
        getProgress (val) {
            let total = this.provinceList.reduce((prev, cur) => {
                return prev + cur.value * 1;
            }, 0);
            return (((val * 1) / total) * 100).toFixed(2) * 1;
        },


        drawProjectPie () {
            let that = this
            let pPie = deepClone(coopPie);
            pPie.tooltip.position = ["28", "38%"]
            let arr = [
                { name: '合作医院占比', value: (this.cooperation / this.totalCooperation * 100).toFixed(2) * 1 },
                { name: '未合作医院占比', value: ((this.totalCooperation - this.cooperation) * 1 / this.totalCooperation * 100).toFixed(2) * 1 },
            ]
            this.PieData = arr
            pPie.series[0].data = arr
            if (this.flag === 'dark') {
                pPie.series[0].color = ['#12B29E', '#355358']
            } else {
                pPie.series[0].color = this.$medicine.medicalHomePage.projectPie
                pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                var value = ""
                var name = ""
                pPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:14px;color:${that.$medicine.medicalHomePage.formatterColor};text-align:center;margin-top:7px;">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:14px;color:${that.$medicine.medicalHomePage.formatterColor};text-align:center;margin-top:7px;">${name}</div>`;
                    }
                }
            }
            this.projectPie = pPie;

        },
        drawIncludedPie () {
            let that = this
            let iPie = deepClone(coopPie2);
            iPie.series[0].color = ['#02B9A6', '#0FBA9B', '#0FBA9B', '#26BD8B ', '#34BF87 ', '#37BF87 ', '#3AC087 ', '#45C185 ', '#57C484', '#61C482 ', '#67C582', '#74C781 ', '#7BC880 ', '#85C97E ', '#95CB7D ', '#A2CC7B ', '#AECE7A', '#BFD078', '#5CA3CE', '#4CA3D5', '#34A0DC', '#239AD5', '#1594CF', '#078EC9', '#008BC6', '#087DBF', '#0C72B8', '#1169B3', '#1563B0', '#185DAC', '#1C55A8', '#204BA2']
            if (this.flag === 'light') {
                iPie.series[0].color = this.$medicine.medicalHomePage.drawIncludedPie
                iPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                var value = ""
                var name = ""
                iPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:14px;color:${that.$medicine.medicalHomePage.formatterColor};text-align:center;margin-top:7px;">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                            <div style="font-size:14px;color:${that.$medicine.medicalHomePage.formatterColor};text-align:center;margin-top:7px;">${name}</div>`;
                    }
                }
            }
            iPie.series[0].data = this.provinceList.map(i => {
                return {
                    name: i.name,
                    value: this.getProgress(i.value)
                }
            })
            iPie.tooltip.position = ["28", "38%"]

            this.includedPie = iPie;
        }
    }
};
</script>
<style lang="scss" scoped>
.light {
    .map-list {
        box-sizing: border-box;
        width: 360px;
        height: 258px;
        margin-left: 20px;
        padding: 20px;
        color: #666;
        border: 1px solid #d2d9e5;

        .map-list-box {
            height: 200px;
            color: #666;
            overflow-y: auto;
            font-size: 12px;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 30px;
            }
            .item-bd {
                width: 80px;
                text-align: left;
                white-space: nowrap; /* 规定文本是否折行 */
                overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
                text-overflow: ellipsis;
            }
            .item-fd {
                width: 120px;
                padding-right: 20px;
                text-align: left;
            }
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
        }
    }
    .pie-title {
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
        position: absolute;
        left: 65px;
        top: 20px;
    }
    .pie-title2 {
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
        position: absolute;
        left: 50px;
        top: 20px;
    }
    .chart-list {
        display: flex;
        margin-top: 20px;
        margin-left: 20px;
        ul {
            width: 120px;
            margin-left: 120px;
            margin-top: 105px;
            list-style: none;
            li {
                width: 150px;
                height: 18px;
                line-height: 18px;
                padding-left: 15px;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                position: relative;
                left: -120px;
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
                    margin-left: 10px;
                    color: #909399;
                }
                &:last-child {
                    margin-top: 20px;
                    &::before {
                        background: #d2d9e5;
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
                        border-bottom: 1px solid #d2d9e5;
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
                    border-top: 1px solid#D2D9E5;
                    border-right: 1px solid #d2d9e5;
                }
                &:last-child {
                    border-right: 0;
                    padding-left: 64px;
                    border-top: 1px solid #d2d9e5;
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
        width: 620px;
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
    .line {
        // color: red;
        border-right: 1px solid #d2d9e5;
        height: 271px;
        // line-height: 271px;
        vertical-align: middle;
    }
    .spanColor {
        display: inline-block;
        // background: red;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 18px;
    }
}
.dark {
    .map-list {
        box-sizing: border-box;
        font-family: PingFangSC-Light;
        width: 360px;
        height: 258px;
        margin-left: 20px;
        padding: 20px;
        color: #fff;
        border: 1px solid #2e3236;

        .map-list-box {
            height: 200px;
            color: rgba(255, 255, 255, 0.8);
            overflow-y: auto;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 30px;
            }
            .item-bd {
                width: 80px;
                text-align: left;
                white-space: nowrap; /* 规定文本是否折行 */
                overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
                text-overflow: ellipsis;
            }
            .item-fd {
                width: 120px;
                padding-right: 20px;
                text-align: left;
            }
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
        }
    }
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 65px;
        top: 20px;
    }
    .pie-title2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 50px;
        top: 20px;
    }
    .chart-list {
        font-family: PingFangSC-Light;
        display: flex;
        margin-top: 20px;
        margin-left: 20px;
        ul {
            width: 120px;
            margin-left: 120px;
            margin-top: 105px;
            list-style: none;
            li {
                width: 150px;
                height: 18px;
                line-height: 18px;
                padding-left: 15px;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                position: relative;
                left: -120px;
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
                    margin-left: 10px;
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
        width: 620px;
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
    .line {
        // color: red;
        border-right: 1px solid #2e3236;
        height: 271px;
        // line-height: 271px;
        vertical-align: middle;
    }
    .spanColor {
        display: inline-block;
        // background: red;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-right: 18px;
    }
}
</style>