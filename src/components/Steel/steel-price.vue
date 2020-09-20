<template>
    <div class='table-wrap'>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">

            <el-form-item class="el-item-form-width ">
                <el-select v-model='steelParams.catalog' @change="catalogChange" clearable placeholder="品种">
                    <el-option v-for='(s,index) in typeList' :label="s.name" :value="s.name" :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='steelParams.spec' clearable placeholder="材质/规格">
                    <el-option v-for='(s,index) in speclist' :label="s.value" :value="s.value" :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='steelParams.city' multiple :multiple-limit='6' clearable collapse-tags placeholder='城市'>
                    <el-option v-for='(s,index) in cityList' :label="s" :value="s" :key='index'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-date-width ">
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getSteelPricesOption">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap">
            <chart height="511px" width="100%" id="invoice1" :option="steelPricesOption" />
        </div>
    </div>
</template>
<script>
import steelLine from "@/views/infrastructure/config/steelLine.js";
import types from "@/views/infrastructure/config/mysteel";
import { deepClone } from "@/utils/common";
import { formatDate } from "@/filters/index";
import chart from "@/components/Charts/invoiceInvalid";
export default {
    components: {
        chart
    },
    data() {
        return {
            steelParams: {
                city: ["北京", "上海", "广州"],
                catalog: "螺纹钢",
                material: "",
                spec: "HRB400_20MM",
                startTime: "",
                endTime: ""
            },
            value1: [],
            typeList: types,
            speclist: [],
            steelPricesOption: {}
        };
    },
    watch: {
        flag(e) {
            this.getSteelPricesOption();
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
        this.getYearDate();
        this.typeList = types;
        this.speclist = types[this.steelParams.catalog].specs;
        this.cityList = types[this.steelParams.catalog].citys;
        this.getSteelPricesOption();
    },
    methods: {
        changeDate(v) {
            if (v && v.length > 0) {
                this.steelParams.startTime = v[0];
                this.steelParams.endTime = v[1];
            } else {
                this.steelParams.startTime = "";
                this.steelParams.endTime = "";
            }
        },
        reSet() {
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
        getYearDate() {
            const end = new Date();
            const start = new Date();
            this.steelParams.startTime = formatDate(
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 360)
            );
            this.steelParams.endTime = formatDate(end);
            this.value1.push(
                this.steelParams.startTime,
                this.steelParams.endTime
            );
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
                let minArr = [];
                res.data.data.forEach(i => {
                    let arr = i.dateValueMap.map(item => item.value);
                    minArr.push(...arr);
                    series.push({
                        name: i.lineName,
                        type: "line",
                        smooth: "true",
                        symbolSize: 2,
                        symbol: "circle",
                        data: i.dateValueMap.map(item => item.value)
                    });
                });
                steelLineDraw.xAxis.data = dateArr;
                steelLineDraw.yAxis.min = Math.min.apply(Math, minArr);
                steelLineDraw.series = series;
                steelLineDraw.legend.data = series.map((i, index) => {
                    return {
                        name: i.name
                    };
                });

                if (this.flag === 'light') {
                    steelLineDraw.legend.textStyle.color = this.$medicine.legendColor
                    steelLineDraw.title.textStyle.color = "#666";
                    steelLineDraw.color = this.$infrastructure.steel_price.color;
                    steelLineDraw.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover;
                    steelLineDraw.yAxis.splitLine = this.$medicine.axis;
                    steelLineDraw.yAxis.axisLine = this.$medicine.axis;
                    steelLineDraw.xAxis.axisLine = this.$medicine.axis;

                    steelLineDraw.xAxis.axisLabel.color = this.$medicine.nameColor;
                    steelLineDraw.yAxis.axisLabel.textStyle.color = this.$medicine.nameColor;

                    steelLineDraw.xAxis.axisLabel.fontFamily = 'PingFang-SC-Regular';
                    steelLineDraw.yAxis.axisLabel.textStyle.fontFamily = 'PingFang-SC-Regular';

                    steelLineDraw.tooltip.backgroundColor = this.$medicine.tooltipBG;
                    steelLineDraw.tooltip.borderWidth = 0;
                    steelLineDraw.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                    steelLineDraw.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                }
                this.steelPricesOption = steelLineDraw;
            });
        }
    }
};
</script>
