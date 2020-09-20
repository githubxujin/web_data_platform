<template>
    <div class="pie-wrap mr30">
        <el-form :inline="true" size="medium" class="pie-form">
            <div class="pie-title">合作金融机构</div>
            <div>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.sortField" clearable placeholder="转让金额" class=" el-item-form-width" @change="changeSortField">
                        <el-option v-for="(s, index) in sortFieldList" :label="s.label" :value="s.value" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.field" clearable placeholder="按登记单位" class=" el-item-form-width" @change="changeField">
                        <el-option v-for="(s, index) in fieldList" :label="s.label" :value="s.value" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <pie-list :topPieList="topPieList" :fieldList="keyList" />
    </div>
</template>
<script>
import wavePie from "@/utils/echart/pie/wave-pie"
import { sortFieldList, deepClone } from "@/utils/common"

export default {
    props: {
        propOpt: Object,
    },
    components: {
        'pie-list': () => import("../supplier/pie-list.vue"),
        // 'pie-list': () => import("@/components/Pie/pie-list.vue"),
    },
    data() {
        return {
            fieldList: [{
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
                "construction": "",
                "field": 3,
                "sortField": 1,
                "stateType": 1,
                "statsMonthEnd": "",
                "statsMonthStart": ""
            },
            topPieList: [],
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
        propOpt(e) {
            this.params = { ...this.params, ...e };
            this.getChart();
        }
    },
    created() {
        this.getChart()
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
                .json('/dcp/comm/zdw/construction/stats/cooperation', this.params)
                .then(res => {
                    let { rankingVo = [] } = res.data;
                    this.$emit('cooperationVos', res.data);
                    let pieData = rankingVo.slice(0, 15).map((i, index) => {
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
    }
};
</script>
<style lang="scss" scoped>
    .light{
        .pie-wrap{
            border: 1px solid #D2D9E5;
        }
    }
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
    .pie-wrap {
        margin-top: 20px;
        border: 1px solid #2e3236;
        padding: 20px 20px;
    }
</style>