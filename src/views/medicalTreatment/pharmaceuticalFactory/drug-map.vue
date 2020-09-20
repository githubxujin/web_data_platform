<template>
    <div>
        <div class="table-wrap bd pl20">
            <el-row type="flex" justify="space-between">
                <!-- 地图 -->
                <div class="ml100">
                    <div class="el-title">药厂分布地图</div>
                    <chart height="465px" width="500px" :option="rankMapOption" id="pay-map" />
                </div>
                <div class="map-all">
                    <div class="map-num">
                        <span class="span1">累计收录企业</span>
                        <span class="span2">{{totalNum}}</span>
                    </div>
                    <div class="map-list">
                        <div class="map-list-item  pb20">
                            <div class="item-hd">序号</div>
                            <div class="item-bd">省份</div>
                            <div class="item-fd">数量占比</div>
                        </div>

                        <div class="map-list-box">
                            <div class="map-list-item list-content" v-for="(v,k) in provinceList" :key="k">
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
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>
import echarts from "echarts";
import Chart from "@/components/Charts/invoiceInvalid";
import cProgress from "@/components/svg/progress";
import mapOpt_ from "@/components/Service/config/map.js";
import chinaMap from "@/views/risk-control/config/china.json";
import { deepClone } from '@/utils/common';
echarts.registerMap("china", chinaMap);
export default {
    components: {
        Chart,
        cProgress
    },
    data () {
        return {
            rankMapOption: {},
            provinceList: [],
            color: ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"],
            total: 0,
            fill: '#313235',
            stroke: '#31353A'
        };
    },
    created () {
        if (this.flag === 'light') {
            this.fill = '#dce6f9'
            this.stroke = '#D2D9E5'
            this.color = this.$medicine.pharmaceuticalFactory.color
        }
    },
    mounted () {
        this.setMapOption();
    },
    computed: {
        totalNum: function () {
            return this.total.toLocaleString();
        },
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    watch: {
        flag (e) {
            if (e === 'light') {
                this.fill = '#dce6f9'
                this.stroke = '#D2D9E5'
                this.color = this.$medicine.pharmaceuticalFactory.color
            } else {
                this.fill = '#313235'
                this.stroke = '#31353A'
                this.color = ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"]
            }
            this.setMapOption()
        }
    },
    methods: {
        getColor (k) {
            return this.color[k % 4];
        },
        /* 计算所在比例 */
        getProgress (val) {

            return (((val * 1) / this.total) * 100).toFixed(2) * 1;
        },
        setMapOption () {
            this.ajax
                .json('/dcp/query/pharmaceutical/count', {})
                .then(res => {
                    this.total = res.data.totalCount
                    this.provinceList = res.data.provinceCount.map(i => {
                        return {
                            name: i.province,
                            value: i.count
                        }
                    })

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
                    let mapOpt = deepClone(mapOpt_)
                    mapOpt.tooltip.formatter = params => {
                        let val
                        if (params.data) {
                            if (Object.prototype.toString.call(params.data.value) === '[object Array]') {
                                val = params.data ? params.data.value[2] : 0
                            } else {
                                val = params.data ? params.data.value : 0
                            }
                        } else {
                            val = 0
                        }
                        return (
                            params.name +
                            "<br>" + params.marker + +val.toFixed(2) + " " + params.marker + this.getProgress(val) + "%"
                        );
                    };
                    mapOpt.series[0].data = convertData(data);
                    mapOpt.series[1].data = _data;
                    // ----------- 加气泡 start -----------
                    let dataFive = data.slice(0, 5)
                    var max = 480, min = 1;
                    var maxSize4Pin = 50, minSize4Pin = 10;
                    mapOpt.series[2] = {
                        name: '点',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin', //气泡
                        encode: {
                            value: 2
                        },
                        symbolSize: function (val) {
                            var a = (maxSize4Pin - minSize4Pin) / (max - min);
                            var b = minSize4Pin - a * min;
                            b = maxSize4Pin - a * max;
                            return a * val[2] + b;
                        },
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 9,
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#CC7451', //标志颜色
                            }
                        },
                        zlevel: 6,
                        data: convertData(dataFive),
                    }
                    mapOpt.series[3] = {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        symbolSize: function (val) {
                            // var a = (maxSize4Pin - minSize4Pin) / (max - min);
                            // var b = minSize4Pin - a * min;
                            // b = maxSize4Pin - a * max;
                            // return a * val[2] + b;
                            return 20

                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false //bug：设置为true造成top5的省份名称重影
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#70B1B6',
                                shadowBlur: 10,
                                shadowColor: '#70B1B6'
                            }
                        },
                        zlevel: 1,
                        data: convertData(
                            dataFive
                                .sort(function (a, b) {
                                    return b.value - a.value;
                                })
                                .slice(0, dataFive.length)
                        )
                    }
                    // ----------- 加气泡 end -----------

                    if (this.flag === 'light') {
                        mapOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                        mapOpt.tooltip.borderWidth = 0;
                        mapOpt.visualMap.inRange.color = this.$service.output.pay.setMapOption.inRange
                        mapOpt.visualMap.textStyle.color = '#333'
                        mapOpt.series[2].itemStyle.normal.color = this.$service.output.pay.setMapOption.mapOpt[0]
                        mapOpt.series[3].itemStyle.normal.color = this.$service.output.pay.setMapOption.mapOpt[1]
                        mapOpt.series[3].itemStyle.normal.shadowColor = this.$service.output.pay.setMapOption.mapOpt[1]
                        mapOpt.geo.itemStyle = {
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

                    this.rankMapOption = mapOpt;
                });
        },
    }
};
</script>
<style lang="scss" scoped>
.light {
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
            background-color: #d2d9e5;
            flex-shrink: 0;
        }
    }
    .pay-map-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #666;
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
                padding-left: 30px;
                font-size: 16px;
                color: #666;
                letter-spacing: 1px;
                p:first-child {
                    font-size: 28px;
                    color: #666;
                }
            }
        }
    }
    .mapTitle {
        width: 117px;
        height: 25px;
        font-size: 18px;
        color: #fff;
        margin-left: 40px;
    }
    .map-num {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        .span1 {
            color: #666;
        }
        .span2 {
            color: #4064d4;
            font-size: 20px;
            margin-left: 12px;
        }
    }

    .map-list {
        width: 360px;
        padding: 20px;
        color: #666;
        border: 1px solid #d2d9e5;
        margin-right: 170px;
        margin-top: 20px;
        font-size: 12px;
        background-color: #FBFCFE;

        .map-list-box {
            height: 400px;
            color: #666;
            overflow-y: auto;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            font-size: 14px;
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
        .list-content {
            font-family: PingFangSC-Regular;
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
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
.dark {
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
    .pay-map-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
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
    .mapTitle {
        width: 117px;
        height: 25px;
        font-size: 18px;
        color: #fff;
        margin-left: 40px;
    }
    .map-num {
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        .span1 {
            color: #fff;
        }
        .span2 {
            color: #449fa8;
            font-size: 20px;
            margin-left: 12px;
        }
    }

    .map-list {
        font-family: PingFangSC-Light;
        width: 360px;
        padding: 20px;
        color: #fff;
        border: 1px solid #2e3236;
        margin-right: 170px;
        margin-top: 20px;

        .map-list-box {
            height: 400px;
            color: rgba(255, 255, 255, 0.8);
            overflow-y: auto;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            font-size: 14px;
            font-family: PingFangSC-Light;
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
        .list-content {
            font-family: PingFangSC-Light;
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
        }
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
</style>