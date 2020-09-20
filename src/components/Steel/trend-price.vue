<template>
    <div class='table-wrap'>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="来源" v-model="params.source" clearable filterable @change="sourceChangeCity">
                    <el-option :value="1" label="我的钢铁网"></el-option>
                    <el-option :value="2" label="兰格网"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="城市" v-model="params.city" clearable filterable style="width:180px;" @change="onChangeCity">
                    <el-option v-for="(item, index) in cityList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="产品类型" v-model="params.productType" clearable filterable @change="onChangeProductType">
                    <el-option v-for="(item, index) in productTypeList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="品名" v-model="params.productName" clearable style="width:180px;" filterable @change="onChangeProductName">
                    <el-option v-for="(item, index) in productNameList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="材质" v-model="params.material" clearable style="width:180px;" filterable @change="onChangeMaterial">
                    <el-option v-for="(item, index) in materialList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select placeholder="规格" v-model="params.standard" clearable style="width:180px;" filterable @change="onChangeStandard">
                    <el-option v-for="(item, index) in standardList" :key="index" :value="item" :label="item">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="toSearch">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="echart-big-wrap mt20 pr-re" style="padding-bottom: 30px;">
            <chart height="511px" width="100%" :option="marketMonthPrice" id="marketMonthPrice" />
            <el-row type="flex" justify="space-between" class="tag-box pb20 pr-se">
                <div class="fc-b1 f12">
                </div>
                <div class="fc-b1 f12">
                    <el-select v-model="params.producingArea" @change="changeProducingArea" size="mini" clearable filterable placeholder="产地" class="product">
                        <el-option v-for="(item, index) in productAreaList" :key="index" :value="item" :label="item">
                        </el-option>
                    </el-select>
                </div>
            </el-row>
        </div>
        <div class="el-20"></div>
        <div class="echart-big-wrap mt40 title-re">
            <chart height="511px" width="100%" :option="marketMonthPriceInterval" id="marketMonthPriceInterval" />
            <div class="title-ab">
                <div class="title-item"><span class="color-card card1"></span> <span class="title-text" style="position: absolute;top: -1px;left: 20px;">价格中位数上涨</span>
                </div>
                <div class="title-item"><span class="color-card card2"></span> <span class="title-text" style="position: absolute;top: -1px;left: 20px;"> 价格中位数下跌</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .light {
        .title-re {
            &-text {
                display: inline-block;
                margin-top: -4px;
            }
            position: relative;
            .title-ab {
                position: absolute;
                top: 48px;
                right: 625px;
                width: 240px;
                color: #666;
                z-index: 999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                &-item {
                    height: 12px;
                    width: 200px;
                }
                .color-card {
                    display: inline-block;
                    width: 8px;
                    height: 12px;
                    margin-left: 8px;
                    background: #ec6249;
                    &.card2 {
                        background: #5cb87a;
                    }
                }
            }
        }

        .product {
            width: 109px;
            /deep/ .el-input__inner {
                border-radius: 0;
                border: 1px solid #dcdfe6;
                color: #666;
                background: #fff;
            }
        }
    }
    .dark {
        .title-re {
            &-text {
                display: inline-block;
                margin-top: -4px;
            }
            position: relative;
            .title-ab {
                position: absolute;
                top: 48px;
                right: 625px;
                width: 240px;
                color: #fff;
                z-index: 999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                &-item {
                    height: 12px;
                    width: 200px;
                }
                .color-card {
                    display: inline-block;
                    width: 8px;
                    height: 12px;
                    margin-left: 8px;
                    background: #7d352d;
                    &.card2 {
                        background: #286760;
                    }
                }
            }
        }

        .product {
            width: 109px;
            /deep/ .el-input__inner {
                border-radius: 0;
                border: 1px solid #366f71;
                color: #43a1ac;
                background: #242d30;
            }
        }
    }

    .pr-re {
        position: relative;
        /deep/ .el-select .el-input.is-focus .el-input__inner {
            border-color: none;
            border-radius: none;
        }
        /deep/.el-select .el-input .el-select__caret {
            color: #43a1ac !important;
        }
    }
    .pr-se {
        position: absolute;
        top: -4px;
        left: 192px;
        width: 0;
    }
    .title-item {
        position: relative;
        width: 200px;
    }
</style>
<script>
import kPriceOpt from "@/views/infrastructure/config/k-price";
import tiltLine from "@/views/infrastructure/config/tiltLine";
import chart from "@/components/Charts/invoiceInvalid";
import { deepClone } from "@/utils/common";
import {
    citysJson,
    productNameJson,
    specJson,
    materialJson,
    placeJson
} from "@/utils/json";
export default {
    components: {
        chart
    },
    data() {
        return {
            citysJson,
            productNameJson,
            specJson,
            materialJson,
            placeJson,
            marketMonthPrice: {},
            marketMonthPriceInterval: {},
            params: {
                productType: '建筑钢材',
                city: "深圳",
                standard: "Φ12mm",
                productName: "螺纹钢",
                producingArea: "珠海粤钢",
                material: "HRB400E",
                source: 1
            },
            specList: [],
            productTypeList: [],
            cityList: [],
            productNameList: [],
            materialList: [],
            standardList: [],
            productAreaList: []
        };
    },
    watch: {
        flag(e) {
            this.getMarketMonthPrice();
            this.getMarketMonthPriceInterval();
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag;
            },
        }
    },
    created() {
        this.getMarketMonthPrice();
        this.getMarketMonthPriceInterval();
        this.getCity()
        this.getProductType()
        this.getProdcutName()
        this.getMaterial()
        this.getStandard()
    },
    methods: {
        getProductArea() {
            let { source, city, productType, productName, material, standard } = this.params
            this.ajax
                .json('/dcp/price/product/area/list', { source, city, productType, productName, material, standard }, { type: 'get' })
                .then(res => {
                    this.productAreaList = res.data
                });
        },
        //规格联动产地
        onChangeStandard() {
            this.params.producingArea = ""
            this.getProductArea()

        },
        //改变材料
        onChangeMaterial() {
            this.params.standard = ""
            this.params.producingArea = ""
            this.getStandard()
            this.getProductArea()
        },
        //改变品名
        onChangeProductName() {
            this.params.standard = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getMaterial()
            this.getStandard()
            this.getProductArea()
        },
        //改变类型
        onChangeProductType() {
            this.params.standard = ""
            this.params.material = ""
            this.params.productName = ""
            this.params.producingArea = ""
            this.getProdcutName()
            this.getMaterial()
            this.getStandard()
            this.getProductArea()
        },
        //
        getStandard() {
            let { city, productType, source, productName, material } = this.params
            this.ajax
                .json('/dcp/price/standard/list', { city, productType, source, productName, material }, { type: 'get' })
                .then(res => {
                    this.standardList = res.data
                });
        },
        //材料
        getMaterial() {
            let { city, productType, source, productName } = this.params
            this.ajax
                .json('/dcp/price/material/list', { city, productType, source, productName }, { type: 'get' })
                .then(res => {
                    this.materialList = res.data
                });
        },
        //品名
        getProdcutName() {
            let { city, productType, source } = this.params
            this.ajax
                .json('/dcp/price/product/list', { city, productType, source }, { type: 'get' })
                .then(res => {
                    this.productNameList = res.data
                });
        },
        //产品类型
        getProductType() {
            this.ajax
                .json('/dcp/price/product/type/list', { source: this.params.source, city: this.params.city }, { type: 'get' })
                .then(res => {
                    this.productTypeList = res.data
                });
        },
        // 来源联动城市
        sourceChangeCity() {
            this.params.city = ""
            this.params.productType = ""
            this.params.standard = ""
            this.params.productName = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getProdcutName()
            this.getCity()
            this.getProductType()
            this.getStandard()
            this.getProductArea()
            this.getMaterial()
        },
        //获取城市
        getCity() {
            this.ajax
                .json('/dcp/price/city/list', { source: this.params.source }, { type: 'get' })
                .then(res => {
                    this.cityList = res.data
                });
        },
        toSearch() {
            this.getMarketMonthPrice();
            this.getMarketMonthPriceInterval();
        },
        changeProducingArea(val) {
            console.log(this.params)
            let check = Object.values(this.params).every(i => i);
            if (!check) {
                this.$message.warning("所有查询条件不能为空");
                return false;
            }
            this.getMarketMonthPrice();
        },
        getMarketMonthPriceInterval() {
            let data = deepClone(this.params);
            data.producingArea = "";
            this.$http("/dcp/price/steel/month/interval/tender", data).then(
                res => {
                    let drawkPriceOpt = deepClone(kPriceOpt);
                    drawkPriceOpt.title.text = "钢材市场价格中位数分布";
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
                    drawkPriceOpt.tooltip.formatter = function (params) {
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
                    let xLength = res.data.length;
                    let xDate = [];
                    for (let i = 0; i < xLength - 1; i++) {
                        xDate.push(res.data[i].date);
                    }
                    drawkPriceOpt.xAxis.data = xDate;
                    if (res.data.length > 0) {
                        // drawkPriceOpt.yAxis.min =
                        //     res.data[xLength - 1].allMinPrice;
                    } else {
                        drawkPriceOpt.yAxis.name = "";
                    }
                    if (this.flag === 'light') {
                        drawkPriceOpt.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover;
                        drawkPriceOpt.yAxis.splitLine = this.$medicine.axis;
                        drawkPriceOpt.yAxis.axisLine = this.$medicine.axis;
                        drawkPriceOpt.xAxis.axisLine = this.$medicine.axis;
                        drawkPriceOpt.xAxis.axisLabel.color = this.$medicine.nameColor;
                        drawkPriceOpt.yAxis.axisLabel.color = this.$medicine.nameColor;
                        drawkPriceOpt.title.textStyle.color = "#666";
                        drawkPriceOpt.tooltip.backgroundColor = this.$medicine.tooltipBG;
                        drawkPriceOpt.tooltip.borderWidth = 0;
                        drawkPriceOpt.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0];
                        drawkPriceOpt.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1];
                        drawkPriceOpt.series[0].itemStyle.color0.colorStops[0].color = this.$infrastructure.steel_price.linear[0];
                        drawkPriceOpt.series[0].itemStyle.color0.colorStops[1].color = this.$infrastructure.steel_price.linear[0];
                        drawkPriceOpt.series[0].itemStyle.color0.borderColor0 = this.$infrastructure.steel_price.linear[0];
                        drawkPriceOpt.series[0].itemStyle.color.colorStops[0].color = this.$infrastructure.steel_price.linear[1];
                        drawkPriceOpt.series[0].itemStyle.color.colorStops[1].color = this.$infrastructure.steel_price.linear[1];
                        drawkPriceOpt.series[0].itemStyle.color.borderColor = this.$infrastructure.steel_price.linear[1];
                    }
                    // drawkPriceOpt.xAxis.data = res.data.map(item => item.date);
                    console.log(JSON.stringify(drawkPriceOpt))
                    this.marketMonthPriceInterval = drawkPriceOpt;
                }
            );
        },
        reSet() {
            this.params = {
                city: "深圳",
                standard: "Φ12mm",
                productName: "螺纹钢",
                producingArea: "珠海粤钢",
                material: "HRB400E"
            };
            this.getMarketMonthPrice();
            this.getMarketMonthPriceInterval();
        },
        onChangeCity(city) {
            this.params.productType = ""
            this.params.standard = ""
            this.params.productName = ""
            this.params.material = ""
            this.params.producingArea = ""
            this.getProductType()
            this.getProdcutName()
            this.getMaterial()
            this.getStandard()
        },
        getMarketMonthPrice() {
            console.log(this.params)
            // let check = Object.values(this.params).every(i => i);
            // if (!check) {
            //     this.$message.warning("所有查询条件不能为空");
            //     return false;
            // }
            this.$http(
                "/dcp/price/steel/month/tender",
                this.params
            ).then(res => {
                let minArr = res.data.map(item => item.price);
                let tiltLineDraw = deepClone(tiltLine);
                if (this.flag === 'light') {
                    tiltLineDraw.title.textStyle.color = "#666";
                    tiltLineDraw.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover;
                    tiltLineDraw.yAxis.splitLine = this.$medicine.axis;
                    tiltLineDraw.yAxis.axisLine = this.$medicine.axis;
                    tiltLineDraw.xAxis.axisLine = this.$medicine.axis;
                    tiltLineDraw.xAxis.axisLabel.color = this.$medicine.nameColor;
                    tiltLineDraw.yAxis.axisLabel.color = this.$medicine.nameColor;
                    tiltLineDraw.tooltip.backgroundColor = this.$medicine.tooltipBG;
                    tiltLineDraw.tooltip.borderWidth = 0;
                    tiltLineDraw.series[0].itemStyle.normal.color = this.$infrastructure.steel_price.lineColor;
                    tiltLineDraw.series[0].itemStyle.normal.areaStyle.color = this.$infrastructure.steel_price.mxcolor;
                }
                tiltLineDraw.yAxis.name =
                    res.data.length > 0 ? "单位: 元/吨" : "";
                tiltLineDraw.xAxis.data = res.data.map(item => item.date);
                tiltLineDraw.series[0].data = minArr;
                tiltLineDraw.yAxis.min = Math.min.apply(Math, minArr);
                this.marketMonthPrice = tiltLineDraw;
            });
        }
    }
};
</script>