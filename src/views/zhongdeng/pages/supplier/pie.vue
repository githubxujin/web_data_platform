<template>
    <div class="pr30">
        <div class="pie-wrap">
            <el-form :inline="true" size="medium" class="pie-form">
                <!-- <div class="pie-title">合作金融机构</div> -->
                <div>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params.sortField" placeholder="转让金额" class=" el-item-form-width" @change="changeSortField">
                            <el-option v-for="(s, index) in sortFieldList" :label="s.label" :value="s.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params.field" placeholder="按登记单位" class=" el-item-form-width" @change="changeField">
                            <el-option v-for="(s, index) in fieldList" :label="s.label" :value="s.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>

            </el-form>
            <pie-list :topPieList="topPieList" :fieldList="keyList" />

            <el-form :inline="true" size="medium" class="pie-form mt40">
                <!-- <div class="pie-title">合作承建单位</div> -->
                <div>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="paramsI.sortField" placeholder="转让金额" class=" el-item-form-width" @change="changeConstruction">
                            <el-option v-for="(i, index) in sortFieldList" :label="i.label" :value="i.value" :key="index">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
            </el-form>
            <pie-list :topPieList="bottomPieList" :fieldList="keyList" />
        </div>
    </div>
</template>
<script>
import wavePie from "@/utils/echart/pie/wave-pie"
import { sortFieldList, deepClone } from "@/utils/common"
export default {
    props: {
        supplierParams: Object
    },
    components: {
        'pie-list': () => import("./pie-list.vue"),
    },
    data() {
        return {
            fieldList:[{
                label: '按金融机构一级单位',
                value: 1
            },
            {
                label: '按金融机构二级单位',
                value: 2
            },
            {
                label: '按金融机构登记单位',
                value: 3
            },
            ],
            sortFieldList,
            params: {
                "field": 1,
                "sortField": 1,
                "stateType": "",
            },
            paramsI: {
                "field": 1,
                "sortField": 1,
                "stateType": "",
            },
            dateArr: [],
            topPieList: [],
            bottomPieList: [],
            keyList: [
                {
                    label: '转让金额',
                    key: 'transferAmount'
                },
                {
                    label: '融资金额',
                    key: 'financesAmount'
                },
                {
                    label: '转让次数',
                    key: 'transferCount'
                },
                {
                    label: '合作时长',
                    key: 'duration'
                },

            ]

        };
    },
    watch: {
        supplierParams() {
            this.getChart();
            this.getConstruction();
        }
    },
    created() {
        this.getChart();
        this.getConstruction();
    },
    methods: {
        changeSortField() {
            this.getChart()
        },
        changeField() {
            this.getChart()
        },
        getChart() {
            this.ajax
                .json('/dcp/comm/zdw/supplier/stats/cooperation', { ...this.params, ...this.supplierParams })
                .then(res => {
                    let { data = [] } = res
                    let pieData = data.map((i, index) => {
                        let pie = deepClone(wavePie);
                        let val = i.proportion;
                        pie.series[0].data[0].value = val;
                        pie.series[1].data[0].value = val;
                        pie.series[1].data[1].value = 100 - val * 1;
                        return {
                            ...i,
                            percentage: pie
                        };
                    });
                    this.topPieList = pieData;
                });
        },
        changeConstruction() {
            this.getConstruction();
        },
        getConstruction() {
            this.ajax
                .json('/dcp/comm/zdw/supplier/stats/construction', { ...this.paramsI, ...this.supplierParams })
                .then(res => {
                    let { data = [] } = res
                    let pieData = data.map((i, index) => {
                        let pie = deepClone(wavePie);
                        let val = i.proportion;
                        pie.series[0].data[0].value = val;
                        pie.series[1].data[0].value = val;
                        pie.series[1].data[1].value = 100 - val * 1;
                        return {
                            ...i,
                            percentage: pie
                        };
                    });
                    this.bottomPieList = pieData;
                });
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.statsMonthStart = v[0];
                this.params.statsMonthEnd = v[1];
            } else {
                this.params.statsMonthStart = '';
                this.params.statsMonthEnd = '';
            }
        },
        reSet() {
            this.params = {
                "field": "",
                "sortField": "",
                "stateType": "",
                "statsMonthEnd": "",
                "statsMonthStart": "",
            }
        },
    }
};
</script>
<style lang="scss" scoped>
    .pie-title {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
    }
    .pie-form {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
    }
    .light{
        .pie-wrap{
            border: 1px solid #D2D9E5;
        }
    }
    .pie-wrap {
        margin-top: 20px;
        border: 1px solid #2e3236;
        padding: 20px 20px;
    }
</style>