<template>
    <div>
        <div class="table-wrap pb0">
            <el-form :inline="true" ref="form" size="medium" class="el-serach-form" style="margin-bottom: -20px;">
                <el-form-item>
                    <el-select v-model='params.companyName' filterable style=" width: 260px;" placeholder="企业名称">
                        <el-option v-for="(v,i) in companyList" :key="i" :label='v.companyName' :value='v.companyName'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="drawEchart">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="el-20"></div>

        <el-row type="flex" justify="space-between" class="flex-box">
            <div class="table-wrap hd">
                <div class="pay-map-title pb40">前3/前10{{way}}方占比</div>
                <div class="pay-box">
                    <div class="box-bd">
                        <chart height="125px" width="125px" :option="rankPieOption1" id="pay-pie1" />
                    </div>
                    <div class="box-fd">
                        <div class="box-txt">
                            <p class="box-txt-first">Top3</p>
                            <p>付款金额{{ ro1*1000/10 }}%</p>
                        </div>
                    </div>
                </div>

                <div class="pay-box mt20">
                    <div class="box-bd">
                        <chart height="125px" width="125px" :option="rankPieOption2" id="pay-pie2" />
                    </div>
                    <div class="box-fd">
                        <div class="box-txt">
                            <p class="box-txt-second">Top10</p>
                            <p>付款金额{{ ro2*1000/10 }}%</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hr"></div>
            <div class="table-wrap bd pl20">
                <div class="pay-map-title">{{ title }}</div>

                <el-row type="flex" justify="space-between">
                    <!-- 地图 -->
                    <chart height="465px" width="500px" :option="rankMapOption" id="pay-map" />

                    <div class="map-list">
                        <div class="map-list-item pb20">
                            <div class="item-hd">序号</div>
                            <div class="item-bd">省份</div>
                            <div class="item-fd">金额占比</div>
                        </div>

                        <div class="map-list-box">
                            <div class="map-list-item" v-for="(v,k) in provinceList" :key="k">
                                <div class="item-hd">{{k+1}}</div>
                                <div class="item-bd">{{v.name}}</div>
                                <div class="item-fd">
                                    <el-row type="flex" align="middle">
                                        <cProgress :value="getProgress(v.value)" :color="getColor(k)" :fill="fill" :stroke='stroke' />
                                        <div class="pl30">{{getProgress(v.value)}}%</div>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-row>
            </div>
        </el-row>

        <div class="el-20"></div>

        <div>

            <div class="card-box">
                <div class="card" v-for="(v,k) in topPipe" :key="k">
                    <div class="card-hd">
                        <div class="t1">No.{{k+1}}</div>
                        <div class="t2">{{v.partnerName}}</div>
                    </div>
                    <div class="card-bd">
                        <chart height="125px" width="125px" :option="v.percentage" :id="'card-pie'+k" />
                    </div>
                    <div class="card-fd">
                        <div class="item">
                            <div class="item-label">累计付款</div>
                            <div class="item-value">{{(v.amount*1).toFixed(2) | numFormat }}</div>
                        </div>
                        <div class="item">
                            <div class="item-label">本年度付款</div>
                            <div class="item-value">{{v.currentYearAmount | numFormat}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import cProgress from "@/components/svg/progress";
import Chart from "@/components/Charts/invoiceInvalid";
import echarts from "echarts";
import mapOption from "./config/map";
import pieOption1 from "./config/pie1";
import pieOption2 from "./config/pie2";
import chinaMap from "./config/china.json";
import { mapState } from "vuex";
import citys from "@/utils/citys.json";
import { deepClone } from "@/utils/common";
// 水波效果
import "echarts-liquidfill";

// 注册中国地图
echarts.registerMap("china", chinaMap);
export default {
    components: {
        Chart,
        cProgress
    },
    props: {
        businessType: String,
        title: String,
        text: String,
        way: String
    },
    data () {
        return {
            params: {
                businessType: "1",
                companyName: "北京信远欣得酒店管理有限公司",
                topNum: 10
            },
            topList: [
                { name: "Top10", value: 10 },
                { name: "Top20", value: 20 },
                { name: "Top30", value: 30 }
            ],
            rankMapOption: {},
            rankPieOption1: {},
            rankPieOption2: {},
            ro1: "",
            ro2: "",
            provinceList: [
                { name: "上海市", value: 280 },
                { name: "广东", value: 480 },
                { name: "湖北", value: 320 },
                { name: "上海", value: 100 },
                { name: "重庆", value: 20 },
                { name: "湖南", value: 20 },
                { name: "广西", value: 20 },
                { name: "福建", value: 20 },
                { name: "山西", value: 20 },
                { name: "山西", value: 20 },
                { name: "山东", value: 20 },
                { name: "河北", value: 50 }
            ],
            color: ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"],
            topPipe: [],
            fill: '#313235',
            stroke: '#31353A'
        };
    },
    created () {
        if (this.flag === 'light') {
            this.fill = '#dce6f9'
            this.stroke = '#D2D9E5'
        } else {
            this.fill = '#313235'
            this.stroke = '#31353A'
        }
    },
    mounted () {
        this.setMapOption();
        this.setPieOption();
        this.getTop(10);
    },
    computed: mapState({
        companyList: state => state.invoice.companyList,
        flag: state => state.echart.flag
    }),
    watch: {
        flag (e) {
            if (e === 'light') {
                this.fill = '#dce6f9'
                this.stroke = '#D2D9E5'
                this.color = this.$service.output.pay.getColor
            } else {
                this.fill = '#313235'
                this.stroke = '#31353A'
                this.color = ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"]
            }
            this.drawEchart()
            this.setMapOption()
            this.getColor()
        }
    },
    methods: {
        drawEchart () {
            this.setMapOption();
            this.setPieOption();
            this.getTop(10);
        },
        onChangeTop (val) {
            this.getTop(val);
        },
        getTop (val) {
            this.params.topNum = val;
            this.params.businessType = this.businessType;
            this.$http("/dcp/count/partner", this.params, {
                type: "formdata"
            }).then(res => {
                let pipeData = res.data.dataList.map((i, index) => {
                    let pipe = deepClone(pieOption1);
                    let val = i.percentage.toFixed(2);
                    pipe.series[0].data[0].value = val;
                    pipe.series[1].data[0].value = val;
                    pipe.series[1].data[1].value = 1 - val * 1;

                    if (this.flag === 'light') {
                        pipe.series[0].data[0].itemStyle.normal.color = this.$service.output.pay.pipe.itemStyle_color
                        pipe.series[0].data[0].label.normal.color = this.$service.output.pay.pipe.label
                        pipe.series[0].backgroundStyle.color = this.$service.output.pay.pipe.backgroundStyle
                        pipe.series[0].backgroundStyle.shadowColor = this.$service.output.pay.pipe.backgroundStyle
                        pipe.series[0].outline.itemStyle.borderColor = this.$service.output.pay.pipe.label
                        pipe.series[1].color = this.$service.output.pay.pipe.backgroundStyle
                        pipe.series[1].data[0].itemStyle.color.colorStops[0].color = this.$service.output.pay.pipe.series1_colorStops0
                        pipe.series[1].data[0].itemStyle.color.colorStops[1].color = this.$service.output.pay.pipe.series1_colorStops1
                    }

                    return {
                        partnerName: i.partnerName,
                        amount: i.amount,
                        currentYearAmount: i.currentYearAmount,
                        percentage: pipe
                    };
                });
                this.topPipe = pipeData;
            });
        },
        getColor (k) {
            if (this.flag === 'light') {
                this.color = this.$service.output.pay.getColor
            }
            return this.color[k % 4];
        },
        /* 计算所在比例 */
        getProgress (val) {
            let total = this.provinceList.reduce((prev, cur) => {
                return prev + cur.value * 1;
            }, 0);
            return (((val * 1) / total) * 100).toFixed(2) * 1;
        },
        setPieOption () {
            let sum = 0;
            this.params.businessType = this.businessType;
            this.$http("/dcp/ranking/partner", this.params, {
                type: "formdata"
            }).then(res => {
                res.data.forEach(v => {
                    if (v.rankingType === "1") {
                        let val = v.percentage.toFixed(2);
                        let pieOption1_ = deepClone(pieOption1)
                        pieOption1_.series[0].data[0].value = val;
                        pieOption1_.series[1].data[0].value = val;
                        pieOption1_.series[1].data[1].value = 1 - val * 1;

                        this.ro1 = v.percentage.toFixed(2);

                        if (this.flag === 'light') {
                            pieOption1_.series[0].data[0].itemStyle.normal.color = this.$service.output.pay.pieOption1.itemStyle_color
                            pieOption1_.series[0].data[0].label.normal.color = this.$service.output.pay.pieOption1.label
                            pieOption1_.series[0].backgroundStyle.color = this.$service.output.pay.pieOption1.backgroundStyle
                            pieOption1_.series[0].backgroundStyle.shadowColor = this.$service.output.pay.pieOption1.backgroundStyle
                            pieOption1_.series[0].outline.itemStyle.borderColor = this.$service.output.pay.pieOption1.label
                            pieOption1_.series[1].color = this.$service.output.pay.pieOption1.backgroundStyle
                            pieOption1_.series[1].data[0].itemStyle.color.colorStops[0].color = this.$service.output.pay.pieOption1.series1_colorStops0
                            pieOption1_.series[1].data[0].itemStyle.color.colorStops[1].color = this.$service.output.pay.pieOption1.series1_colorStops1
                        }

                        this.rankPieOption1 = pieOption1_;
                    } else if (v.rankingType === "2") {
                        sum += v.percentage;
                    }

                    let pieOption2_ = deepClone(pieOption2)
                    let ro2Val = (sum + Number(this.ro1)).toFixed(2);
                    this.ro2 = ro2Val;
                    pieOption2_.series[0].data[0].value = ro2Val;
                    pieOption2_.series[1].data[0].value = ro2Val;
                    pieOption2_.series[1].data[1].value = 1 - ro2Val * 1;

                    if (this.flag === 'light') {
                        pieOption2_.series[0].data[0].itemStyle.normal.color = this.$service.output.pay.pieOption2.itemStyle_color
                        pieOption2_.series[0].data[0].label.normal.color = this.$service.output.pay.pieOption2.label
                        pieOption2_.series[0].backgroundStyle.color = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption2_.series[0].backgroundStyle.shadowColor = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption2_.series[0].outline.itemStyle.borderColor = this.$service.output.pay.pieOption2.label
                        pieOption2_.series[1].color = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption2_.series[1].data[0].itemStyle.color.colorStops[0].color = this.$service.output.pay.pieOption2.series1_colorStops0
                        pieOption2_.series[1].data[0].itemStyle.color.colorStops[1].color = this.$service.output.pay.pieOption2.series1_colorStops1
                    }

                    this.rankPieOption2 = pieOption2_;
                });
            });
        },
        getCardPie () {
            let option = JSON.parse(JSON.stringify(this.rankPieOption1));
            let val = Math.random().toFixed(2);
            option.series[0].data[0].value = val;

            option.series[1].data[0].value = val;
            option.series[1].data[1].value = 1 - val * 1;

            return option;
        },
        setMapOption () {
            this.params.businessType = this.businessType;
            this.$http("/dcp/distributed/partner", this.params, {
                type: "formdata"
            }).then(res => {
                let provinceData = [];
                let vals = [];
                res.data.forEach(i => {
                    citys.forEach(item => {
                        if (i.provinceNo == item.code) {
                            vals.push(i.value);

                            provinceData.push({
                                name: item.name,
                                value: i.value
                            });
                        }
                    });
                });
                this.provinceList = provinceData;
                var mapName = "china";
                var geoCoordMap = {};
                var data = this.provinceList;
                var _data = [];
                /*获取地图数据*/
                var mapFeatures = echarts.getMap(mapName).geoJson.features;
                mapFeatures.forEach(function (v) {
                    // 地区名称
                    var name = v.properties.name;
                    // 地区经纬度
                    geoCoordMap[name] = v.properties.cp;
                });
                var convertData = function (data) {
                    var res = [];
                    for (var i = 0; i < data.length; i++) {
                        let name = Object.keys(geoCoordMap).filter(c =>
                            data[i].name.includes(c)
                        )[0];
                        var geoCoord = geoCoordMap[name];
                        if (geoCoord) {
                            res.push({
                                name: name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }

                        _data.push({ name: name, value: data[i].value });
                    }
                    return res;
                };

                let mapOption_ = deepClone(mapOption)
                // 数据设置
                mapOption_.tooltip.formatter = params => {
                    let val = params.value[2] || params.value || 0;
                    return (
                        params.name +
                        "<br>" +
                        params.marker +
                        +(
                            (res.data[params.dataIndex] || {}).totalAmount || 0
                        ).toFixed(2) +
                        "元 <br>" +
                        params.marker +
                        this.getProgress(val || 0) +
                        "%"
                    );
                };
                mapOption_.visualMap.max = Math.max.apply(null, vals);
                mapOption_.series[0].data = convertData(data);
                mapOption_.series[1].data = _data;

                if (this.flag === 'light') {
                    mapOption_.tooltip.backgroundColor = this.$medicine.tooltipBG
                    mapOption_.tooltip.borderWidth = 0;
                    mapOption_.visualMap.inRange.color = this.$service.output.pay.setMapOption.inRange
                    mapOption_.geo.itemStyle = {
                        normal: {
                            areaColor: this.$service.output.pay.setMapOption.areaColor[0],
                            borderColor: this.$service.output.pay.setMapOption.borderColor
                        },
                        emphasis: {
                            areaColor: this.$service.output.pay.setMapOption.areaColor[1], // 鼠标移入背景色
                            borderColor: this.$service.output.pay.setMapOption.borderColor
                        },
                    }
                }

                this.rankMapOption = mapOption_;
            });
        },
        getCompanyList () { },
        reSet () {
            this.params = {
                businessType: this.businessType,
                companyName: "北京信远欣得酒店管理有限公司"
            };
            this.drawEchart();
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    .map-list {
        font-family: PingFangSC-Light;
        width: 360px;
        padding: 20px;
        color: #fff;
        border: 1px solid #2e3236;

        .map-list-box {
            height: 400px;
            color: rgba(255, 255, 255, 0.8);
            overflow-y: auto;
        }
        .map-list-item {
            font-size: 12px;
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
    .pay-map-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
    }
    .flex-box {
        .hd {
            width: 417px;
            height: 550px;
        }
        .bd {
            flex: 1;
            height: 550px;
        }
        .hr {
            width: 20px;
            height: 550px;
            background-color: #1d1e23;
            flex-shrink: 0;
        }
    }
    .pay-box {
        width: 358px;
        height: 190px;
        border: 1px solid #2e3236;
        display: flex;
        box-sizing: border-box;
        div + div {
            border-left: 1px solid #2e3236;
        }
        .box-bd {
            position: relative;
            width: 190px;
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            overflow: hidden;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 96px;
                height: 95px;
                border-right: 1px solid #2e3236;
                border-bottom: 1px solid #2e3236;
                z-index: 0;
            }
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                right: 0;
                width: 96px;
                height: 95px;
                border-left: 1px solid #2e3236;
                border-top: 1px solid #2e3236;
                z-index: 0;
            }
            div {
                z-index: 1;
            }
        }
        .box-fd {
            display: flex;
            align-items: center;

            .box-txt {
                font-family: PingFangSC-Light;
                padding-left: 30px;
                font-size: 16px;
                color: #449fa8;
                letter-spacing: 1px;
                p:first-child {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }
    }
    .card-box {
        display: flex;
        overflow-x: scroll;
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
                height: 25px;
                line-height: 20px;
                font-size: 16px;
                color: #ffffff;
                letter-spacing: 0.93px;
            }
        }
        .card-bd {
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-fd {
            border-top: 1px solid #2e3236;
            padding: 0 20px;
            .item {
                padding-top: 14px;
                display: flex;
                .item-label,
                .item-value {
                    font-size: 12px;
                    color: #a0a3a8;
                    letter-spacing: 0.7px;
                    display: inline-block;
                    width: 50%;
                    text-align: left;
                    flex-shrink: 0;
                }

                .item-label {
                }
                .item-value {
                    color: #449fa8;
                }
            }
        }
    }
}

.light {
    .map-list {
        font-family: 'PingFang-SC-Regular';
        width: 360px;
        padding: 20px;
        color: #666;
        border: 1px solid #d2d9e5;

        .map-list-box {
            height: 400px;
            color: #666;
            overflow-y: auto;
        }
        .map-list-item {
            font-size: 12px;
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
    .pay-map-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333;
    }
    .flex-box {
        .hd {
            width: 417px;
            height: 550px;
        }
        .bd {
            flex: 1;
            height: 550px;
        }
        .hr {
            width: 20px;
            height: 550px;
            background-color: #ebecf3;
            flex-shrink: 0;
        }
    }
    .pay-box {
        width: 358px;
        height: 190px;
        border: 1px solid #d2d9e5;
        display: flex;
        box-sizing: border-box;
        div + div {
            border-left: 1px solid #d2d9e5;
        }
        .box-bd {
            position: relative;
            width: 190px;
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            overflow: hidden;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 96px;
                height: 95px;
                border-right: 1px solid #d2d9e5;
                border-bottom: 1px solid #d2d9e5;
                z-index: 0;
            }
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                right: 0;
                width: 96px;
                height: 95px;
                border-left: 1px solid #d2d9e5;
                border-top: 1px solid #d2d9e5;
                z-index: 0;
            }
            div {
                z-index: 1;
            }
        }
        .box-fd {
            display: flex;
            align-items: center;

            .box-txt {
                font-family: PingFangSC-Light;
                padding-left: 30px;
                font-size: 16px;
                color: #666;
                letter-spacing: 1px;
                .box-txt-first {
                    font-family: PingFangSC-Regular;
                    font-size: 30px;
                    color: #3fc4d1;
                }
                .box-txt-second {
                    font-family: PingFangSC-Regular;
                    font-size: 30px;
                    color: #4064d4;
                }
            }
        }
    }
    .card-box {
        display: flex;
        overflow-x: scroll;
        padding: 20px 0;
        .card {
            background-image: linear-gradient(44deg, #1ba4c9 0%, #64d8b7 100%);
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
                background-image: linear-gradient(44deg, #4878ca 0%, #36c2cf 100%);
            }

            padding: 30px 0;
            width: 242px;
            height: 395px;
            border: 1px solid #d2d9e5;
            flex-shrink: 0;
            transition: transform 0.5s 0s;
            box-sizing: border-box;
            &:hover {
                margin-top: -10px;
                transform: translateY(-10px);

                border: 1px solid #d2d9e5;
            }
        }
        .card + .card {
            margin-left: 20px;
        }

        .card-hd {
            padding: 0 26px;
            .t1 {
                font-size: 20px;
                color: #fff;
                letter-spacing: 1.17px;
            }
            .t2 {
                font-family: PingFangSC-Light;
                padding-top: 10px;
                height: 25px;
                line-height: 20px;
                font-size: 16px;
                color: #ffffff;
                letter-spacing: 0.93px;
            }
        }
        .card-bd {
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-fd {
            border-top: 1px solid#d2d9e5;
            padding: 0 20px;
            .item {
                padding-top: 14px;
                display: flex;
                .item-label,
                .item-value {
                    font-size: 12px;
                    color: #fff;
                    letter-spacing: 0.7px;
                    display: inline-block;
                    width: 50%;
                    text-align: left;
                    flex-shrink: 0;
                }

                .item-value {
                    color: #fff;
                }
            }
        }
    }
}
</style>
