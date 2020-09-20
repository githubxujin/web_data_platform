<template>
    <div>
        <div class="table-wrap echart-cont">
            <div class="title ml10">汽油</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item style="width: 193px">
                    <el-select v-model="params.marketSampleName" clearable placeholder="市场">
                        <el-option v-for="(s, index) in marketplace" :label="s.label" :value="s.label" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 193px">
                    <el-select v-model="params.model" clearable placeholder="规格型号">
                        <el-option label="92#国Ⅵ" value="92#国Ⅵ"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="value1" type="daterange" @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getChart">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="echart-big-wrap pe p-re">
                <chart height="400px" width="1168px" id="statisticsWti" :option.sync="LineOpt" />
                <el-row type="flex" class="tag-box pb20">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v,k) in tagList" :key="k" :class="{act: tagCur === k}" @click.native="tagHand(k,v.value)">
                            {{v.label}}</c-op>
                    </el-row>
                </el-row>
                <div class="el-unit">单位: 元/吨</div>
            </div>
        </div>
    </div>
</template>

<script>
import tiltLine from "@/views/infrastructure/config/tiltLine";
import { deepClone } from "@/utils/common";
import Chart from "@/components/Charts/invoiceInvalid.vue"
import cOp from "@/components/common/c-op";
export default {
    components: {
        Chart, cOp
    },
    data () {
        return {
            title: '',
            LineOpt: {},
            params: {
                trendType: 1,
                productName: '汽油',
                startPublishDate: '',
                endPublishDate: ''
            },
            value1: [],
            tagCur: 0,
            marketplace: [
                { label: '华北' },
                { label: '华东' },
                { label: '华南' },
                { label: '华中' },
                { label: '山东' },
                { label: '西北' },
                { label: '西南' },
            ],
            tagList: [
                {
                    value: 1,
                    label: "天"
                },
                {
                    value: 2,
                    label: "周"
                },

                {
                    value: 3,
                    label: "月"
                },
                {
                    value: 4,
                    label: "季"
                },
            ]
        }
    },
    created () {
        this.getChart()
    },
    methods: {
        tagHand (k, value) {
            this.tagCur = k;
            let key = k + 1
            switch (key) {
                case 1:
                    this.params.trendType = value
                    this.getChart()
                    return
                case 3:
                    this.params.trendType = value
                    this.getChart()
                    return
                case 2:
                    this.params.trendType = value
                    this.getChart()
                    return
                case 4:
                    this.params.trendType = value
                    this.getChart()
                    return
            }
        },
        getChart () {
            let chartData = deepClone(tiltLine);
            this.$http('/dcp/comm/oil/price/trend', this.params, { type: 'post' }).then(
                res => {
                    chartData.title.text = "";
                    chartData.xAxis.data = res.data.map(i => i.publishDate);
                    chartData.series[0].data = res.data.map(
                        i => i.averagePrice
                    );
                    chartData.xAxis.axisLabel.padding = [0, 0, 0, 60]
                    chartData.grid.left = "10px";
                    chartData.title.padding = [0, 0, 0, 10];
                    this.LineOpt = chartData;
                }
            )

        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startPublishDate = v[0]
                this.params.endPublishDate = v[1]
            } else {
                this.params.startPublishDate = ''
                this.params.endPublishDate = ''
            }
        },
        reSet () {
            this.params = {
                trendType: 1,
                productName: '汽油',
                startPublishDate: '',
                endPublishDate: ''
            }
            this.value1 = []
            this.getChart()
        }
    },
}
</script>

<style lang="scss" scoped>
.title {
    color: #fff;
    font-weight: bolder;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: 1.5px;
    font-family: 'PingFang-SC-Regular';
    margin-bottom: 18px;
}
.echart-cont {
    padding-top: 35px;
    padding-left: 80px;
}
.p-re {
    position: relative;
}
.el-unit {
    position: absolute;
    top: 3px;
    left: 39px;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #a0a3a8;
    letter-spacing: 1.17px;
    line-height: 14px;
}
.tag-box {
    position: absolute;
    top: 10px;
    right: -136px;
    width: 410px;
}
</style>
