<template>
    <div>
        <div class=" el-20"></div>
        <div class="invoice-wrap">
            <div class="invoice-echart-wrap ml20 p-re">
                <div class="pie-title">各省财政收入分布</div>
                <div class="chart-list">
                    <chart height="300px" width="200px" :option="projectPie" id="project-pie" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showCp" />
                    <div class="map-list">
                        <div class="map-list-item pb20">
                            <div class="item-hd">序号</div>
                            <div class="item-bd">省份</div>
                            <div class="item-fd">收入占比</div>
                        </div>

                        <div class="map-list-box">
                            <div class="map-list-item" v-for="(v,i) in financialList" :key="i">
                                <div class="item-hd">{{i+1}}</div>
                                <div class="item-bd">{{v.name}}</div>
                                <div class="item-fd">
                                    <el-row type="flex" align="middle">
                                        <cProgress :value="v.value" :color="getColorI(i)" :fill="fill" :stroke='stroke' />
                                        <div class="pl30">{{v.value}}%</div>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="invoice-echart-wrap mr20 p-re">
                <div class="pie-title2">各省药品销售额分布</div>
                <div class="chart-list">
                    <chart height="300px" width="200px" :option="includedPie" id="project-pie2" :dispatchAction="dispatchAction" :hover="hover" @showIndex="showIndex" />
                    <div class="map-list">
                        <div class="map-list-item pb20">
                            <div class="item-hd">序号</div>
                            <div class="item-bd">省份</div>
                            <div class="item-fd">销售总额占比</div>
                        </div>
                        
                        <div class="map-list-box">
                            <div class="map-list-item" v-for="(v,k) in salesList" :key="k">
                                <div class="item-hd">{{k+1}}</div>
                                <div class="item-bd">{{v.name}}</div>
                                <div class="item-fd">
                                    <el-row type="flex" align="middle">
                                        <cProgress :value="v.value" :color="getColorK(k)" :fill="fill" :stroke='stroke' />
                                        <div class="pl30">{{v.value}}%</div>
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
import cProgress from "@/components/svg/progress.vue"
export default {
    props: {

    },
    components: {
        Chart,
        cProgress
    },
    data () {
        return {
            financialList: [],
            salesList: [],
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
            color: ['#4161BE', '#417BBE', '#46A4FF', '#61B3F9', '#ADCBFF', '#779CDC', '#777ADC', '#7F66DB', '#6841BE', '#4144BE'],
            colorI: ['#12B29E', '#1EA57D', '#2F8769', '#598878', '#59955B', '#75925B', '#8CB05F', '#A8B05F', '#A8B05F', '#339473', '#CCD392'],
            fill: '#313235',
            stroke: '#31353A'
        };
    },
    created () {
        if (this.flag === 'light') {
            this.fill = '#dce6f9'
            this.stroke = '#D2D9E5'
            this.colorI = this.$medicine.drugIndustryData.pPie
            this.color = this.$medicine.drugIndustryData.iPie
        }
    },
    watch: {
        flag (e) {
            if (e === 'light') {
                this.fill = '#dce6f9'
                this.stroke = '#D2D9E5'
                this.colorI = this.$medicine.drugIndustryData.pPie
                this.color = this.$medicine.drugIndustryData.iPie
            } else {
                this.fill = '#313235'
                this.stroke = '#31353A'
                this.colorI = ['#12B29E', '#1EA57D', '#2F8769', '#598878', '#59955B', '#75925B', '#8CB05F', '#A8B05F', '#A8B05F', '#339473', '#CCD392']
                this.color = ['#4161BE', '#417BBE', '#46A4FF', '#61B3F9', '#ADCBFF', '#779CDC', '#777ADC', '#7F66DB', '#6841BE', '#4144BE']
            }
            this.drawProjectPie()
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
        getColorK (k) {
            return this.color[k];
        },
        getColorI (i) {
            return this.colorI[i];
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
        // 左
        drawProjectPie () {
            let pPie = deepClone(coopPie);
            pPie.series[0].color = ['#12B29E', '#1EA57D', '#2F8769', '#598878', '#59955B', '#75925B', '#8CB05F', '#A8B05F', '#A8B05F', '#339473', '#CCD392']
            pPie.series[0].data = this.financialList
            pPie.tooltip.position = ["28", "38%"]
            let value, name
            if (this.flag === 'light') {
                pPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                pPie.series[0].color = this.$medicine.drugIndustryData.pPie
                pPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                    }
                }
            }
            this.projectPie = pPie;
        },
        drawIncludedPie () {
            let iPie = deepClone(coopPie2);
            iPie.series[0].color = ['#4161BE', '#417BBE', '#46A4FF', '#61B3F9', '#ADCBFF', '#779CDC', '#777ADC', '#7F66DB', '#6841BE', '#4144BE']
            iPie.series[0].data = this.salesList
            iPie.tooltip.position = ["28", "38%"]
            let value, name
            if (this.flag === 'light') {
                iPie.series[1].data[0].itemStyle.normal.color = this.$medicine.ring
                iPie.series[0].color = this.$medicine.drugIndustryData.iPie
                iPie.tooltip.formatter = function (params) {
                    if (params.seriesIndex === 0) {
                        value = params.value;
                        name = params.name
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${params.value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                    } else {
                        return `<div style="width:140px;text-align:center;color:#4064D4;font-size:30px;font-family:PingFangSC-Regular;letter-spacing: 1.01px;">${value}<span style="font-size:14px;">%</span></div>
                    <div style="font-size:14px;color:#666;text-align:center;margin-top:7px;">${name}</div>`;
                    }
                }
            }
            this.includedPie = iPie;
        }
    }
};
</script>
<style lang="scss" scoped>
.light {
    .map-list {
        font-size: 12px;
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
            color: #666;
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 40px;
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

    .pie-title2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
        position: absolute;
        left: 25px;
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
        display: flex;
        justify-content: space-between;
        &-left {
            flex-basis: 48%;
            border-top: 1px solid #d2d9e5;
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
            border-top: 1px solid #d2d9e5;
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
                /* .category-number {
                                                                                                                                                                                                margin-left: 20px;
                                                                                                                                                                                                background: red;
                                                                                                                                                                                            } */
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
        margin-left: 20px;
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
                    border-top: 1px solid #d2d9e5;
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

    .invoice-wrap {
        position: relative;
    }
    .line {
        border-right: 1px solid #d2d9e5;
        height: 260px;
        line-height: 260px;
        position: absolute;
        left: 685px;
        top: 30px;
    }
}

.dark {
    .map-list {
        font-size: 12px;
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
            font-size: 12px;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 40px;
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

    .pie-title2 {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
        position: absolute;
        left: 25px;
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
                /* .category-number {
                                                                                                                                                                                                margin-left: 20px;
                                                                                                                                                                                                background: red;
                                                                                                                                                                                            } */
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
        margin-left: 20px;
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
    .invoice-wrap {
        position: relative;
    }
    .line {
        border-right: 1px solid #2e3236;
        height: 260px;
        line-height: 260px;
        position: absolute;
        left: 685px;
        top: 30px;
    }
}
</style>
