<template>
    <div>
        <Anchor show-ink>
            <AnchorLink href="#market_trend_wrap" title="市场趋势" />
            <AnchorLink href="#market_detail_wrap" title="市场明细" />
            <AnchorLink href="#area_detail_wrap" title="地方明细" />
        </Anchor>
        <div id="market_trend_wrap">
            <div class="tc">
                <div class="title-large">交易-价格</div>
                <tabs :tabList="['钢材价格','水泥价格']" @success="handleClick" :tabIndex="tabIndex" />
            </div>
            <!-- 市场趋势 -->

            <div class="title-box">
                <div class="pre"></div>
                <div class="txt">市场趋势</div>
                <div class="after"></div>
            </div>

            <c-box type="search">
                <template slot="title">搜索条件</template>
                <el-form :inline='true' ref='form' size='mini' class="data-left">
                    <el-form-item label='日期范围'>
                        <el-date-picker v-model='steelParams.startTime' type='date' value-format='yyyy-MM-dd'
                            placeholder='选择开始日期' style='width:150px'>
                        </el-date-picker>
                        <span class="pl5 pr5 fc-b">至</span>
                        <el-date-picker v-model='steelParams.endTime' type='date' value-format='yyyy-MM-dd'
                            placeholder='选择结束日期' style='width:150px'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label='品种'>
                        <el-select v-model='steelParams.catalog' @change="catalogChange" clearable>
                            <el-option v-for='(s,index) in typeList' :label="s.name" :value="s.name" :key='index'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='材质/规格'>
                        <el-select v-model='steelParams.spec' clearable>
                            <el-option v-for='(s,index) in speclist' :label="s.value" :value="s.value" :key='index'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='城市'>
                        <el-select v-model='steelParams.city' multiple :multiple-limit='6' clearable collapse-tags
                            style="margin-left: 20px;">
                            <el-option v-for='(s,index) in cityList' :label="s" :value="s" :key='index'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="getSteelPricesOption()">查询</el-button>
                        <el-button type="blue" plain @click="reSetSteelPricesOption">重置</el-button>
                    </el-form-item>
                </el-form>
            </c-box>
            <div class="echart-big-wrap">
                <div class="echart-big-title">钢材价格趋势</div>
                <chart height="511px" width="1168px" id="invoice1" :option="steelPricesOption" />
            </div>
        </div>
        <!-- 市场趋势结束 -->
        <div id="market_detail_wrap">
            <s-title>市场明细</s-title>
            <c-box type="search">
                <template slot="title">搜索条件</template>
                <el-form :inline='true' ref='form' size='mini' class="data-left">
                    <el-form-item label="城市">
                        <el-select placeholder="请选择" v-model="marketMonthParams.city" clearable filterable
                            style="width:180px;">
                            <el-option v-for="(item, index) in citysJson" :key="index" :value="item.name"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="品名">
                        <el-select placeholder="请选择" v-model="marketMonthParams.productName" clearable
                            style="width:180px;" filterable>
                            <el-option v-for="(item, index) in productNameJson" :key="index" :value="item.name"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="材质">
                        <el-select placeholder="请选择" v-model="marketMonthParams.material" clearable style="width:180px;"
                            filterable>
                            <el-option v-for="(item, index) in materialJson" :key="index" :value="item.name"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="规格">
                        <el-select placeholder="请选择" v-model="marketMonthParams.standard" clearable style="width:180px;"
                            filterable>
                            <el-option v-for="(item, index) in specJson" :key="index" :value="item.name"
                                :label="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain @click="queryMarket">查询</el-button>
                        <el-button type="blue" plain @click="reRestMarketMonthPrice">重置</el-button>
                    </el-form-item>
                </el-form>
            </c-box>
            <div class="invoice-wrap">
                <div class="invoice-echart-wrap">
                    <div class="invoice-echart-title">近一个月价格趋势</div>
                    <chart height="460px" width="568px" :option="marketMonthPrice" id="marketMonthPrice" />
                    <el-row type="flex" justify="space-between" class="tag-box pb20">
                        <div class="fc-b1 f12">
                        </div>
                        <div class="fc-b1 f12">
                            产地：
                            <el-select v-model="marketMonthParams.producingArea" @change="changeProducingArea"
                                size="mini" style="width:140px" clearable filterable>
                                <el-option v-for="(item, index) in placeJson" :key="index" :value="item.name"
                                    :label="item.name">
                                </el-option>
                            </el-select>
                        </div>
                    </el-row>
                </div>
                <div class="invoice-echart-wrap title-re">
                    <div class="invoice-echart-title">近一个月价格区间分布</div>
                    <div class="title-ab">
                        <div class="title-item">价格下跌 <span class="color-card card1"></span></div>
                        <div class="title-item">价格上涨 <span class="color-card card2"></span></div>
                    </div>
                    <chart height="460px" width="568px" :option="marketMonthPriceInterval"
                        id="marketMonthPriceInterval" />
                </div>
            </div>
        </div>
        <!-- 地方明细 -->
        <div id="area_detail_wrap">
            <s-title>地方明细</s-title>
            <div class="echart-big-wrap">
                <div class="echart-big-title">广州市住房和城乡建设局每种型号钢材价格趋势</div>
                <chart height="511px" width="1168px" id="GZsteelPricesOption" :option="GZsteelPricesOption" />
            </div>
            <div class="echart-big-wrap">
                <div class="echart-big-title">广东省交通运输工程造价事务中心每种钢材价格趋势</div>
                <chart height="511px" width="1168px" id="GDsteelPricesOption" :option="GDsteelPricesOption" />
            </div>
            <div class="el-center" v-if="isUpShow">
                <button class="btn-down" @click="showTable">
                    <div class="btn-text">更多信息</div>
                </button>
            </div>

            <!-- 地方明细结束 -->
            <div v-show="show">
                <!-- 市场明细列表 -->
                <s-title>市场明细列表</s-title>
                <market-list></market-list>
                <!-- 广东/广州 -->
                <s-title>地方明细列表</s-title>
                <Gd-list></Gd-list>
                <!-- 广东/广州结束 -->
                <!-- 市场明细列表结束 -->
            </div>
            <div class="el-center" v-if="isDownShow">
                <button class="btn-down" @click="hideTable">
                    <div class="btn-text">收起</div>
                </button>
            </div>
        </div>

    </div>
</template>


<script>
import steelLine from "./config/steelLine";
import tiltLine from "./config/tiltLine";
import kPriceOpt from "./config/k-price";
import Tabs from "@/components/Tabs/index";
import cBox from "@/components/common/c-box";
import chart from "@/components/Charts/invoiceInvalid";
import sTitle from "@/components/Title/s-title";
import types from "./config/mysteel";
import { deepClone } from "@/utils/common";
import { formatDate } from "@/filters/index";
import GdList from "@/components/TradePrice/GdList";
import marketList from "@/components/TradePrice/marketList.vue";
import Anchor from "@/components/Achor/achor";
import AnchorLink from "@/components/Achor/achor-link";
import {
    citysJson,
    productNameJson,
    specJson,
    materialJson,
    placeJson
} from "@/utils/json";
export default {
    components: {
        Tabs,
        cBox,
        chart,
        sTitle,
        GdList,
        marketList,
        Anchor,
        AnchorLink
    },
    data() {
        return {
            tabIndex: 0,
            isUpShow: true,
            show: false,
            isDownShow: false,
            citysJson,
            productNameJson,
            specJson,
            materialJson,
            placeJson,
            params: {},
            steelParams: {
                city: ["北京", "上海", "广州"],
                catalog: "螺纹钢",
                material: "",
                spec: "HRB400_20MM",
                startTime: "",
                endTime: ""
            },
            cityList: [],
            speclist: [],
            marketMonthParams: {
                city: "深圳",
                standard: "Φ12mm",
                productName: "螺纹钢",
                producingArea: "珠海粤钢",
                material: "HRB400E"
            },
            steelPricesOption: {},
            marketMonthPrice: {},
            marketMonthPriceInterval: {},
            GDsteelPricesOption: {},
            GZsteelPricesOption: {},
            list: []
        };
    },
    created() {
        //获取品种城市
        this.getYearDate();
        this.getSteelPricesOption();
        this.getMarketMonthPrice();
        this.getMarketMonthPriceInterval();
        this.getGZsteelPricesOption();
        this.getGDsteelPricesOption();
    },
    methods: {
        handleClick(val) {
            switch (val) {
                case "钢材价格":
                    return this.$router.push({ name: "trade-price" });
                case "水泥价格":
                    return this.$router.push({ name: "price-cement" });
            }
        },
        showTable() {
            this.isUpShow = false;
            this.isDownShow = true;
            this.show = true;
        },
        hideTable() {
            this.isUpShow = true;
            this.isDownShow = false;
            this.show = false;
        },
        changeProducingArea(val) {
            let check = Object.values(this.marketMonthParams).every(i => i);
            if (!check) {
                this.$message.warning("所有查询条件不能为空");
                return false;
            }
            this.getMarketMonthPrice();
        },
        queryMarket() {
            let check = Object.values(this.marketMonthParams).every(i => i);
            if (!check) {
                this.$message.warning("所有查询条件不能为空");
                return false;
            }
            this.getMarketMonthPrice();
            this.getMarketMonthPriceInterval();
        },
        reSetSteelPricesOption() {
            this.steelParams = {
                city: ["北京", "上海", "广州"],
                catalog: "螺纹钢",
                material: "",
                spec: "HRB400_20MM",
                startTime: "",
                endTime: ""
            };
            this.getYearDate();
            this.getSteelPricesOption();
        },
        reRestMarketMonthPrice() {
            this.marketMonthParams = {
                city: "深圳",
                standard: "Φ12mm",
                productName: "螺纹钢",
                producingArea: "珠海粤钢",
                material: "HRB400E"
            };
            this.getMarketMonthPrice();
            this.getMarketMonthPriceInterval();
        },
        getGZsteelPricesOption() {
            this.$http(
                "/dcp/price/info/tender",
                { source: 2 },
                { type: "get" }
            ).then(res => {
                let steelLineDraw = deepClone(steelLine);
                let dateArr =
                    res.data.length > 0
                        ? res.data[0].data.map(i => i.date)
                        : [];
                let series = [];
                res.data.forEach(i => {
                    series.push({
                        name: i.materialName,
                        type: "line",
                        data: i.data.map(item => item.value)
                    });
                });
                steelLineDraw.xAxis.data = dateArr;
                steelLineDraw.series = series;
                steelLineDraw.legend.data = series.map(i => i.name);
                this.GZsteelPricesOption = steelLineDraw;
            });
        },
        getGDsteelPricesOption() {
            this.$http(
                "/dcp/price/info/tender",
                { source: 1 },
                { type: "get" }
            ).then(res => {
                let steelLineDraw = deepClone(steelLine);
                let dateArr =
                    res.data.length > 0
                        ? res.data[0].data.map(i => i.date)
                        : [];
                let series = [];
                res.data.forEach(i => {
                    series.push({
                        name: i.materialName,
                        type: "line",
                        data: i.data.map(item => item.value)
                    });
                });
                steelLineDraw.xAxis.data = dateArr;
                steelLineDraw.series = series;
                steelLineDraw.legend.data = series.map(i => i.name);
                this.GDsteelPricesOption = steelLineDraw;
            });
        },
        getYearDate() {
            const end = new Date();
            const start = new Date();
            this.steelParams.startTime = formatDate(
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
            );
            this.steelParams.endTime = formatDate(end);
        },
        //选择品种带出城市
        catalogChange(val) {
            this.speclist = types[val].specs;
            this.cityList = types[val].citys;
            this.steelParams.city = [];
            this.steelParams.spec = "";
        },
        getSteelPricesOption() {
            // "线材_:_线材"
            let spec;
            if (this.steelParams.catalog === "螺纹钢") {
                let specArr = this.steelParams.spec.split("_");
                spec = this.steelParams.spec
                    ? specArr[0] +
                      " " +
                      specArr[1] +
                      "_:_" +
                      specArr[0] +
                      "_" +
                      specArr[1]
                    : "";
            } else {
                let specArr = this.steelParams.spec.split("_");
                spec = this.steelParams.spec
                    ? specArr[1] +
                      "_" +
                      specArr[0] +
                      "_:_" +
                      specArr[0] +
                      "_" +
                      specArr[1]
                    : "";
            }

            let catalog = this.steelParams.catalog
                ? this.steelParams.catalog + "_:_" + this.steelParams.catalog
                : "";
            let data = {
                spec: spec,
                catalog: catalog,
                city: this.steelParams.city.join(","),
                startTime: this.steelParams.startTime,
                endTime: this.steelParams.endTime
            };
            let check = Object.values(data).every(i => i);
            if (!check) {
                this.$message.warning("所有查询条件不能为空");
                return false;
            }
            this.$http("/dcp/price/steel/trend", data).then(res => {
                let steelLineDraw = deepClone(steelLine);

                let dateArr =
                    res.data.data.length > 0
                        ? res.data.data[0].dateValueMap.map(i => i.date)
                        : [];
                let series = [];
                res.data.data.forEach(i => {
                    series.push({
                        name: i.lineName,
                        type: "line",
                        data: i.dateValueMap.map(item => item.value)
                    });
                });
                steelLineDraw.xAxis.data = dateArr;
                steelLineDraw.series = series;
                steelLineDraw.legend.data = series.map(i => i.name);
                this.steelPricesOption = steelLineDraw;
            });
        },
        getMarketMonthPrice() {
            this.$http(
                "/dcp/price/steel/month/tender",
                this.marketMonthParams
            ).then(res => {
                let tiltLineDraw = deepClone(tiltLine);
                tiltLineDraw.xAxis.data = res.data.map(item => item.date);
                tiltLineDraw.series[0].data = res.data.map(item => item.price);
                this.marketMonthPrice = tiltLineDraw;
            });
        },
        getMarketMonthPriceInterval() {
            let data = deepClone(this.marketMonthParams);
            data.producingArea = "";
            this.$http("/dcp/price/steel/month/interval/tender", data).then(
                res => {
                    let drawkPriceOpt = deepClone(kPriceOpt);
                    let dataArr = res.data.map(item => {
                        if (item.ups === 1) {
                            return [
                                item.minPrice,
                                item.maxPrice,
                                item.minPrice,
                                item.maxPrice
                            ];
                        } else {
                            return [
                                item.maxPrice,
                                item.minPrice,
                                item.maxPrice,
                                item.minPrice
                            ];
                        }
                    });
                    let dateKeyObj = res.data.reduce((i, item) => {
                        i[item.date] = item;
                        return i;
                    }, {});
                    drawkPriceOpt.tooltip.formatter = function(params) {
                        return (
                            dateKeyObj[params[0].axisValue].date +
                            "<br/>" +
                            "最高价格:   " +
                            dateKeyObj[params[0].axisValue].maxPrice +
                            "<br/>" +
                            "最低价格:   " +
                            dateKeyObj[params[0].axisValue].minPrice +
                            "<br/>" +
                            "价格中位数:   " +
                            dateKeyObj[params[0].axisValue].medianPrice
                        );
                    };
                    drawkPriceOpt.series[0].data = dataArr;
                    drawkPriceOpt.xAxis.data = res.data.map(item => item.date);
                    this.marketMonthPriceInterval = drawkPriceOpt;
                }
            );
        }
    }
};
</script>
<style lang="scss" scoped>
.mt-36 {
    margin-top: 36px;
}
.mt-20 {
    margin-top: 20px;
}
@import "../../assets/css/echart.scss";
/deep/ .el-table thead.is-group tr {
    th {
        background: #192846;
    }
    &:first-child th {
        &:nth-child(2) div {
            border: 1px solid #4088fd;
            height: 40px;
            line-height: 40px;
        }
        &:nth-child(3) div {
            border: 1px solid #19bfdf;
            height: 40px;
            line-height: 40px;
        }
    }
}

.title-re {
    position: relative;
    .title-ab {
        position: absolute;
        top: 64px;
        right: 25px;
        width: 200px;
        color: #fff;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        .color-card {
            display: inline-block;
            width: 30px;
            height: 10px;
            margin-left: 8px;
            background-image: linear-gradient(
                -180deg,
                #ffa9b6 1%,
                #e9576e 100%
            );
            &.card2 {
                background-image: linear-gradient(
                    -180deg,
                    #a3ffe8 1%,
                    #33f0c0 100%
                );
            }
        }
    }
}
.tag-box {
    position: absolute;
    top: 58px;
    right: 30px;
    width: 410px;
    .c-tag + .c-tag {
        margin-left: 10px;
    }
}
</style>
