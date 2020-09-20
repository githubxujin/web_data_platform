<template>
    <div>
        <div class="app-title">金融机构维度</div>
        <el-form :inline="true" size="medium" class="el-serach-form mt20">
            <el-form-item class="el-item-form-width w200">
                <el-select v-model="params.finance" clearable placeholder="金融机构名称" class=" el-item-form-width w200" filterable remote :remote-method="queryfinancial">
                    <el-option v-for="(s, index) in financeList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.financeType" placeholder="金融机构类型" class=" el-item-form-width" clearable>
                   <el-option label="银行" value="1">
                    </el-option>
                    <el-option label="证券公司" value="2">
                    </el-option>
                    <el-option label="保理公司" value="3">
                    </el-option>
                    <el-option label="其他" value="4">
                    </el-option>  
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.field" clearable placeholder="金融机构维度" class=" el-item-form-width">
                    <el-option v-for="(s, index) in fieldList" :label="s.label" :value="s.value" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker start-placeholder="年-月" end-placeholder="年-月" v-model="dateArr" type="monthrange" unlink-panels @change="changeDate" value-format="yyyy-MM" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getChart">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>

        <property-list :cooperationList="cooperationList" />

    </div>
</template>
<script>
// import { fieldList } from "@/utils/common"
export default {
    components: {
        'property-list': () => import("./property-list.vue")
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
            params: {
                "field": 1,
                "finance": "",
                "sortField": 1,
                "statsMonthEnd": "",
                "statsMonthStart": "",
                financeType: '',
            },
            queryParams: {
                "field": 1,
                "finance": ""
            },
            financeList: [],
            cooperationList: [],
            list: [],
            dateArr: [],
        };
    },
    created() {
        this.getChart();
        this.remoteMethod();
    },
    methods: {
        reSet() {
            this.dateArr = [];
            this.params = {
                "field": 1,
                "finance": "",
                "sortField": 1,
                "statsMonthEnd": "",
                "statsMonthStart": "",
                financeType: '',
            }
             this.getChart()
        },
        getChart() {
            this.ajax
                .json('/dcp/comm/zdw/finance/stats/cooperation', this.params)
                .then(res => {
                    let { data = [] } = res
                    this.cooperationList = data.slice(0, 15)
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
        queryfinancial(query) {
            this.queryParams.finance = query
            this.queryParams.field = 1
            this.remoteMethod()
        },
        remoteMethod() {
            this.ajax
                .json('/dcp/comm/zdw/finance/stats/vague', this.queryParams)
                .then(res => {
                    this.financeList = res.data
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
    .pie-wrap {
        border: 1px solid #2e3236;
        height: 530px;
    }
    .pie {
        margin: 40px 20px;
    }
</style>