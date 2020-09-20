<template>
    <div class="page">
        <el-row type="flex" justify="space-between" class="pt20">
            <div class="right">
                <div class="box">
                    <div class="pb20">
                        <div class="cheart-title">药厂分布地图</div>
                    </div>
                    <div class="map-box">
                        <el-row type="flex" justify="space-between">
                            <!-- 地图 -->
                            <div id="map" :class="{'ani-map': curMapTitle !== 0}"></div>

                            <transition name="fade">
                                <div class="numList" v-if="curMapTitle === 0">
                                    <div class="drugNumber">
                                        <div class="mb20">累计收录药厂数量</div>
                                        <span class="ml10">{{ startList.totalCount | numFormat}}</span>
                                    </div>
                                    <div class="map-list">
                                        <div class="map-list-item pt20 pb20">
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
                                                        <cProgress :value="getProgress(v.count)" :color="getColor(k)" />
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
import echarts from "echarts";
import chinaMap from "@/views/risk-control/config/china.json";
import mapOpt from "@/views/risk-control/config/map.js";
import cProgress from "@/components/svg/progress";
// import cTag from "@/components/common/c-tag";

// 注册中国地图
echarts.registerMap("china", chinaMap);
export default {
    components: {
        cProgress,
        // cTag
    },
    data() {
        return {
            startList: {
                totalCount: ''
            },
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
            // tagListMap: ["客户", "核心企业"],
            color: ["#70B1B6", "#9BBC6C", "#A23A40", "#F5A623"]
        };
    },
    mounted() {
        // this.init
        this.getStartList();
    },
    computed: {
        topFirst() {
            return this.info.eventList && this.info.eventList.length
                ? this.info.eventList[0]
                : {};
        }
    },
    created() {
        this.topHand(30, 0);
        this.mapTitleHand(0);

        this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById("map"));
        });
    },
    methods: {
        getStartList() {
            this.ajax.json("/dcp/query/pharmaceutical/count").then(res => {
                this.startList = res.data;
                // console.log(this.startList);

            });
        },
        getColor(k) {
            return this.color[k % 4];
        },
        mapTitleHand(k) {
            this.curMapTitle = k;
            this.params.tag = k ? "1" : "2";

            this.initData(1);
        },
        topHand(val, k) {
            if (this.isDis) return;

            this.curTop = k;
            const date = new Date();
            this.params.endTime = this.formatDate(new Date());
            let startDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * val);
            this.params.startTime = this.formatDate(startDate);

            this.list = [];
            this.initData(2);
        },
        async initData(type) {
            let res = await this.ajax.get("risk/server/home/summary", this.params);
            if (res.code === "200") {
                // console.log(this.params, "this.params");

                // console.log(res.data, "this.info");
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
        getProgress(val) {
            let total = this.info.provinceList.reduce((prev, cur) => {
                return prev + cur.count;
            }, 0);
            let data = ((val / total) * 100).toFixed(2);
            return Number(data);
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        setList(v) {
            this.list = [];
            this.isDis = true;
            v.map(async (c, k) => {
                // await this.sleep(400*(k))
                this.list.push(c);

                if (k === v.length - 1) {
                    this.isDis = false;
                }
            });
        },
        setMap(v) {
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
            mapOpt.series.map(v => (v.data = []));
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

            //  myChart.setOption(option);
            //取代传统设置，加入自动适应屏幕代码
            this.myChart.setOption(mapOpt);
        }
    }
};
</script>
<style lang="less" scoped>
    .page {
        width: 100%;
        height: 550px;
        margin: 0 auto;
    }
<<<<<<< HEAD
}

.tags + .tags {
    &::before {
        position: absolute;
        left: -14px;
        top: 3px;
        content: "";
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: #a0a3a8;
=======
    .cheart-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
    }
    * {
        box-sizing: border-box;
    }
    .pb2 {
        padding-bottom: 2px;
    }
    .right {
        flex: 1;
>>>>>>> 08b26aa222619a9f755216366b40821c922781be
    }

    .box {
        border: 1px solid #2e3236;
        padding: 42px 170px 38px 192px;
        box-sizing: border-box;
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
            content: "";
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

    .map-box {
        height: 550px;
        .map-tag {
            width: 550px;
        }
    }
    .numList {
        // padding-top: 40px;
        height: 419px;
        box-sizing: border-box;
        margin-bottom: 51px;
    }
    .drugNumber {
        display: flex;
        // width: 122px;
        height: 20px;
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        text-align: center;

        span {
            font-size: 20px;
            color: #449fa8;
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
        width: 360px;
        color: #fff;
        border: 1px solid #2e3236;
        margin-top: 20px;
        margin-bottom: 51px;

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
                padding-right: 20px;
                text-align: left;
                flex-shrink: 0;
            }
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
</style>

