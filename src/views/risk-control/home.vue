<template>
    <div class="page">
        <el-row type="flex" justify="space-between" class="pt20">
            <div class="left mr20">
                <div class="box mb20 box-alert-bg" style="height:266px;">
                    <div class="pb20">
                        <div class="cheart-title">预警概况</div>
                    </div>
                    <el-row type="flex" justify="space-between" class="gaikan">
                        <div class="tc yj-box">
                            <div class="icon-box icon-run1"></div>
                            <span class="f30 pt15 fc-o">
                                <ICountUp :endVal="info.itemCount" />
                            </span>
                            <div class="yj-txt pt15 f16 c_B">预警舆情条数</div>
                        </div>
                        <div class="tc yj-box">
                            <div class="icon-box icon-run2"></div>
                            <span class="f30 pt15 fc-o">
                                <ICountUp :endVal="info.customerCount" />
                            </span>
                            <div class="yj-txt pt15 f16 c_B">预警企业数量</div>
                        </div>
                    </el-row>
                </div>

                <div class="box box-total-bg">
                    <div class="pb20">
                        <div class="cheart-title">舆情分类TOP5</div>
                    </div>

                    <el-row type="flex" class="pb20">
                        <div class="tags" v-for="(v,k) in tagList" :key="k" :class="{act: curTop === k}" @click="topHand(v.value,k)">{{v.label}}</div>
                    </el-row>

                    <el-row type="flex" justify="space-between" class="category-box pt20">
                        <div class="hd">
                            <div class="run-box">
                                <!-- <div class="run"></div> -->
                                <div class="tc">
                                    <div>
                                        <span class="f24">Top1</span>
                                    </div>
                                    <div class="f16 c_B pt5">{{topFirst.itemName}}</div>
                                </div>
                            </div>
                            <div class="tc">
                                <div class="run-txt">
                                    <div class="f14 tc c_B pt10">
                                        {{topFirst.count | numFormat}}
                                        <span class="f10">条</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bd">
                            <transition-group name="list" tag="div">
                                <div class="bd-item" v-for="(v,k) in list" :key="'a'+k">
                                    <span class="bd-num"></span>
                                    <span class="pr10">{{k+1}}</span>
                                    <div class="bd-txt" :style="{width:'100%','transition-delay': (k)+'s'}">
                                        <span style="width: 60px; display: inline-block">{{v.itemName}}</span>
                                        <span class="c_B pl10">{{v.count | numFormat }}条</span>
                                    </div>
                                </div>
                            </transition-group>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="right">
                <div class="box">
                    <div class="pb20">
                        <div class="cheart-title cl-title">企业风险地图</div>
                    </div>

                    <div class="map-box">
                        <el-row type="flex" class="map-tag pb35">
                            <c-tag v-for="(v,k) in tagListMap" :key="k" :class="{act: curMapTitle === k}" @click.native="mapTitleHand(k)">{{v}}</c-tag>
                        </el-row>

                        <el-row type="flex" justify="space-between">
                            <!-- 地图 -->
                            <div id="map" :class="{'ani-map': curMapTitle !== 0}"></div>

                            <transition name="fade">
                                <div class="pl20" v-if="curMapTitle === 0">
                                    <!-- <div class="tc pb10 f16">热点省份</div> -->
                                    <div class="map-list">
                                        <div class="map-list-item pb20">
                                            <div class="item-hd">序号</div>
                                            <div class="item-bd">省份</div>
                                            <div class="item-fd">占比</div>
                                        </div>

                                        <div class="map-list-box">
                                            <div class="map-list-item" v-for="(v,k) in info.provinceList" :key="k">
                                                <div class="item-hd">{{k+1}}</div>
                                                <div class="item-bd">{{v.province}}</div>
                                                <div class="item-fd">
                                                    <el-row type="flex" align="middle">
                                                        <cProgress :value="getProgress(v.count)" :color="getColor(k)" :fill="fill" :stroke='stroke' />
                                                        <div class="pl30">{{getProgress(v.count)}}%</div>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
import ICountUp from "vue-countup-v2";
import echarts from "echarts";
import chinaMap from "./config/china.json";
import mapOpt_ from "./config/map.js";
import cProgress from "@/components/svg/progress";
import cTag from "@/components/common/c-tag";
import { deepClone } from '@/utils/common';

// 注册中国地图
echarts.registerMap("china", chinaMap);
export default {
    components: {
        cProgress,
        ICountUp,
        cTag
    },
    data () {
        return {
            isDis: false,
            curMapTitle: 0,
            curTop: 0,
            myChart: null,
            tiemr: null,
            params: {
                tag: "2", // 企业标签(1:核心买方 2:合作客户 3:其他)
                startTime: "", //开始时间
                endTime: "" //结束时间
            },
            info: {
                itemCount: 0,
                customerCount: 0,
                eventList: [],
                provinceList: []
            },
            list: [],
            tagList: [
                {
                    value: 30,
                    label: "近1个月"
                },
                {
                    value: 90,
                    label: "近3个月"
                },
                {
                    value: 180,
                    label: "近6个月"
                },
                {
                    value: 360,
                    label: "近12个月"
                }
            ],
            tagListMap: ["客户", "核心企业"],
            color: ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"],
            fill: '#313235',
            stroke: '#31353A'
        };
    },
    mounted () {
        // this.init
    },
    computed: {
        topFirst () {
            return this.info.eventList && this.info.eventList.length
                ? this.info.eventList[0]
                : {};
        },
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    created () {
        if (this.flag === 'light') {
            this.fill = '#dce6f9'
            this.stroke = '#D2D9E5'
        } else {
            this.fill = '#313235'
            this.stroke = '#31353A'
        }
        this.topHand(30, 0);
        this.mapTitleHand(0);

        this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById("map"));
        });
    },
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
            this.topHand(30, 0);
            this.mapTitleHand(0);
            this.$nextTick(() => {
                this.myChart = echarts.init(document.getElementById("map"));
            })
        }
    },
    methods: {
        getColor (k) {
            if (this.flag === 'light') {
                this.color = this.$service.output.pay.getColor
            }
            return this.color[k % 4];
        },
        mapTitleHand (k) {
            this.curMapTitle = k;
            this.params.tag = k ? "1" : "2";

            this.initData(1);
        },
        topHand (val, k) {
            if (this.isDis) return;

            this.curTop = k;
            const date = new Date();
            this.params.endTime = this.formatDate(new Date());
            let startDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
            this.params.startTime = this.formatDate(startDate);

            this.list = [];
            this.initData(2);
        },
        async initData (type) {
            let res = await this.ajax.get("risk/server/home/summary", this.params);
            if (res.code === "200") {

                this.info = res.data;

                if (type === 1) {
                    this.setMap(res.data.provinceList);
                    return;
                }
                if (type === 2) {
                    this.list = [];
                    await this.sleep(250);
                    this.setList(res.data.eventList);
                    return;
                }
            }
        },
        getProgress (val) {
            let total = this.info.provinceList.reduce((prev, cur) => {
                return prev + cur.count;
            }, 0);
            let data = ((val / total) * 100).toFixed(2);
            return Number(data);
        },
        sleep (ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        setList (v) {
            this.list = [];
            this.isDis = true;
            console.log(v + "hello");
            v.map(async (c, k) => {
                // await this.sleep(400*(k))
                this.list.push(c);

                if (k === v.length - 1) {
                    this.isDis = false;
                }
            });
        },
        setMap (v) {
            var mapName = "china";
            var max = 480,
                min = 1; // todo
            var maxSizePin = 80,
                minSizePin = 30;
            var maxSizeScat = 30,
                minSizeScat = 10;
            var data = [
                // {name: "广东", value: 480},
                // {name: "湖北", value: 320},
                // {name: "上海", value: 100},
                // {name: "重庆", value: 20},
                // {name: "河北", value: 50}
            ];
            var geoCoordMap = {};

            // 清空数据
            let mapOpt = deepClone(mapOpt_)
            mapOpt.series.map(v => (v.data = []));

            this.mapLight(mapOpt)

            this.myChart.setOption(mapOpt);

            if (!v) return;

            v.map(c => {
                data.push({ name: c.province, value: c.count });
            });
            max = data[0].value;

            /*获取地图数据*/
            var mapFeatures = echarts.getMap(mapName).geoJson.features;
            //  console.log(mapFeatures)
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
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            };

            // 数据设置
            mapOpt.series[0].data = convertData(data);
            mapOpt.series[1].data = data;
            mapOpt.series[2].data = convertData(data);
            mapOpt.series[3].data = convertData(
                data
                    .sort(function (a, b) {
                        return b.value - a.value;
                    })
                    .slice(0, 1)
            );

            // ---------------start-----展示图标大小/气泡设置----------------
            mapOpt.series[0].symbolSize = function (val) {
                var a = (maxSizeScat - minSizeScat) / (max - min);
                var b = minSizeScat - a * min;
                b = maxSizeScat - a * max;
                return a * val[2] + b;
            };
            mapOpt.series[2].symbolSize = function (val) {
                var a = (maxSizePin - minSizePin) / (max - min);
                var b = minSizePin - a * min;
                b = maxSizePin - a * max;
                return a * val[2] + b;
            };
            mapOpt.series[3].symbolSize = function (val) {
                var a = (maxSizeScat - minSizeScat) / (max - min);
                var b = minSizeScat - a * min;
                b = maxSizeScat - a * max;
                return a * val[2] + b;
            };
            // ---------------end-----展示图标大小/气泡设置----------------

            this.mapLight(mapOpt)

            //  myChart.setOption(option);
            //取代传统设置，加入自动适应屏幕代码
            this.myChart.setOption(mapOpt);
        },
        // 地图主题切换light
        mapLight(mapOpt){
            if (this.flag === 'light') {
                mapOpt.tooltip.backgroundColor = this.$medicine.tooltipBG
                mapOpt.tooltip.borderWidth = 0;
                mapOpt.visualMap.inRange.color = this.$service.output.pay.setMapOption.inRange
                mapOpt.series[2].itemStyle.normal.color = this.$service.output.pay.setMapOption.mapOpt[0]
                mapOpt.series[0].itemStyle.normal.color = this.$service.output.pay.setMapOption.mapOpt[1]
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
        }
    }
};
</script>
<style lang="scss" scoped>
.dark {
    .cheart-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
    }
    * {
        box-sizing: border-box;
    }
    ::v-deep {
        .c-tag {
            .c-tag-bd {
                // padding: 0 10px;
            }
        }
        .m-box {
            margin-top: 0;
        }
    }
    .pb2 {
        padding-bottom: 2px;
    }
    .right {
        flex: 1;
    }

    .left {
        width: 397px;
        .box {
            height: 310px;
        }
    }

    .box {
        border: 1px solid #2e3236;
        padding: 30px;
    }

    .tags {
        position: relative;
        width: 80px;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 1.17px;
        cursor: pointer;
        &.act {
            color: #51b5bf;
        }
    }

    .tags + .tags {
        &::before {
            position: absolute;
            left: -14px;
            top: 3px;
            content: '';
            display: inline-block;
            width: 1px;
            height: 10px;
            background-color: #a0a3a8;
        }
    }

    .gaikan {
        color: #fff;
        .icon-box {
            display: inline-block;
            width: 69px;
            height: 79px;
            &.icon-run1 {
                position: relative;
                background: url(~@/assets/images/num-a.png) no-repeat center bottom;
            }
            &.icon-run2 {
                position: relative;
                background: url(~@/assets/images/num-b.png) no-repeat center bottom;
            }
        }
    }

    .category-box {
        height: 170px;
        align-items: center;
        color: #fff;
        .hd {
        }
        .run-box {
            position: relative;
            width: 146px;
            height: 146px;
            background: url(~@/assets/images/yuqing-run.png) no-repeat center;
            display: flex;
            justify-content: center;
            align-items: center;
            .run {
                position: absolute;
                width: 128px;
                height: 128px;
                top: 49px;
                left: 49px;
                background: url(~@/assets/images/yuqing-run.png) no-repeat center;
                animation: rotate 10s linear infinite;
                transform-origin: center;
            }
        }
        .run-txt {
        }
        .bd {
            width: 165px;
            font-size: 12px;
            .bd-item {
                position: relative;
                display: flex;
                align-items: center;

                &:first-child {
                    .bd-num {
                        border: 3px solid #a23a40;
                    }
                }

                .bd-num {
                    display: inline-block;
                    width: 0;
                    height: 0;
                    margin-right: 10px;
                    text-align: center;
                    border: 3px solid #43a1ac;
                    border-radius: 50%;
                }

                .bd-txt {
                    overflow: hidden;
                    white-space: nowrap;
                    color: #d3d3d4;
                }
            }
            .bd-item + .bd-item {
                margin-top: 10px;
            }
        }
    }

    .map-box {
        height: 494px;
        .map-tag {
            width: 190px;
        }
    }
    .map-footer {
        width: 657px;
        height: 98px;
        background: url(~@/assets/images/map-light.png) no-repeat center top;
        margin: 0 auto;
    }
    .ani-map {
        transform: translateX(100px);
    }
    #map {
        width: 480px;
        height: 370px;
        transition: all 0.5s;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s;
        transform: translateX(0);
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(10%);
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s 0s;
    }
    .list-enter,
    .list-leave-to {
        transition: all 0.3s 0s;
        opacity: 0;
        transform: translateX(50px);
    }

    @keyframes move-re {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-6%);
        }
    }

    .yj-box {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        .yj-txt {
            text-align: center;
            display: flex;
            justify-content: center;
        }
    }

    .map-list {
        font-family: PingFangSC-Light;
        width: 320px;
        height: 310px;
        padding: 20px;
        color: #fff;
        border: 1px solid #2e3236;

        .map-list-box {
            height: 310px;
            color: rgba(255, 255, 255, 0.8);
            overflow: hidden;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 20px;
                flex-shrink: 0;
            }
            .item-bd {
                width: 100px;
                text-align: left;
                white-space: nowrap; /* 规定文本是否折行 */
                overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
                text-overflow: ellipsis;
                flex-shrink: 0;
            }
            .item-fd {
                width: 120px;
                text-align: left;
                flex-shrink: 0;
            }
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
        }
    }
}
.light {
    .box-alert-bg {
        background-image: linear-gradient(45deg, #547cfa 0%, #89dfff 100%);
    }
    .box-total-bg {
        background-image: linear-gradient(45deg, #1ba4c9 0%, #64d8b7 100%);
    }
    .cheart-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #fff;
        letter-spacing: 1.5px;
        font-weight: normal;
    }
    .cl-title {
        color: #333;
    }
    * {
        box-sizing: border-box;
    }
    ::v-deep {
        .c-tag {
            .c-tag-bd {
                // padding: 0 10px;
            }
        }
        .m-box {
            margin-top: 0;
        }
    }
    .pb2 {
        padding-bottom: 2px;
    }
    .right {
        flex: 1;
    }

    .left {
        width: 397px;
        .box {
            height: 310px;
        }
    }

    .box {
        padding: 30px;
    }

    .tags {
        position: relative;
        width: 80px;
        font-size: 14px;
        color: #fff;
        letter-spacing: 1.17px;
        cursor: pointer;
        &.act {
            color: rgba(255, 255, 255, 0.6);
        }
    }

    .tags + .tags {
        &::before {
            position: absolute;
            left: -14px;
            top: 3px;
            content: '';
            display: inline-block;
            width: 1px;
            height: 10px;
            background-color: #a0a3a8;
        }
    }

    .gaikan {
        color: #fff;
        .icon-box {
            display: inline-block;
            width: 69px;
            height: 79px;
            &.icon-run1 {
                position: relative;
                background: url(~@/assets/images/light/yujingtiaoshu.png) no-repeat center bottom;
            }
            &.icon-run2 {
                position: relative;
                background: url(~@/assets/images/light/yujingshuliang.png) no-repeat center bottom;
            }
        }
    }

    .category-box {
        height: 170px;
        align-items: center;
        color: #fff;
        .hd {
        }
        .run-box {
            position: relative;
            width: 146px;
            height: 146px;
            background: url(~@/assets/images/light/huanxing.png) no-repeat center;
            display: flex;
            justify-content: center;
            align-items: center;
            .run {
                position: absolute;
                width: 128px;
                height: 128px;
                top: 49px;
                left: 49px;
                background: url(~@/assets/images/light/huanxing.png) no-repeat center;
                animation: rotate 10s linear infinite;
                transform-origin: center;
            }
        }
        .run-txt {
        }
        .bd {
            width: 165px;
            font-size: 12px;
            .bd-item {
                position: relative;
                display: flex;
                align-items: center;

                &:first-child {
                    .bd-num {
                        border: 3px solid #fff;
                    }
                }

                .bd-num {
                    display: inline-block;
                    width: 0;
                    height: 0;
                    margin-right: 10px;
                    text-align: center;
                    border: 3px solid rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                }

                .bd-txt {
                    overflow: hidden;
                    white-space: nowrap;
                    color: #d3d3d4;
                }
            }
            .bd-item + .bd-item {
                margin-top: 10px;
            }
        }
    }

    .map-box {
        height: 494px;
        .map-tag {
            width: 190px;
        }
    }
    .map-footer {
        width: 657px;
        height: 98px;
        background: url(~@/assets/images/map-light.png) no-repeat center top;
        margin: 0 auto;
    }
    .ani-map {
        transform: translateX(100px);
    }
    #map {
        width: 480px;
        height: 370px;
        transition: all 0.5s;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.5s;
        transform: translateX(0);
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: translateX(10%);
    }

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s 0s;
    }
    .list-enter,
    .list-leave-to {
        transition: all 0.3s 0s;
        opacity: 0;
        transform: translateX(50px);
    }

    @keyframes move-re {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-6%);
        }
    }

    .yj-box {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        .yj-txt {
            text-align: center;
            display: flex;
            justify-content: center;
        }
    }

    .map-list {
        font-family: PingFangSC-Light;
        width: 320px;
        height: 310px;
        padding: 20px;
        color: #666;
        border: 1px solid #d2d9e5;

        .map-list-box {
            height: 310px;
            color: #666;
            overflow: hidden;
        }
        .map-list-item {
            display: flex;
            align-items: center;
            height: 30px;
            .item-hd {
                width: 50px;
                text-align: center;
                margin-right: 20px;
                flex-shrink: 0;
            }
            .item-bd {
                width: 100px;
                text-align: left;
                white-space: nowrap; /* 规定文本是否折行 */
                overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
                text-overflow: ellipsis;
                flex-shrink: 0;
            }
            .item-fd {
                width: 120px;
                text-align: left;
                flex-shrink: 0;
            }
        }
        .map-list-item + .map-list-item {
            margin-top: 20px;
        }
    }
}
</style>

