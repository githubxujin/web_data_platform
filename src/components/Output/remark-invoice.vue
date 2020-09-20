<template>
    <div class="ml20">
        <el-form :inline='true' ref='form' size='medium'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.mode' clearable placeholder='模块'>
                    <el-option label='基建' :value='1'></el-option>
                    <el-option label='医疗' :value='2'></el-option>
                    <el-option label='能源' :value='3'></el-option>
                    <el-option label='其他' :value='0'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.projectName" clearable placeholder="备注项目名称"></el-input>
            </el-form-item>
            <el-form-item style='width: 183px'>
                <el-input v-model="params.sellerName" clearable placeholder="发票销售方"></el-input>
            </el-form-item>
            <el-form-item style='width: 183px'>
                <el-input v-model="params.invoiceNo" clearable placeholder="发票号码"></el-input>
            </el-form-item>
            <el-form-item style="margin-top: -1px">
                <el-date-picker v-model='dateArr' type="daterange" value-format='yyyy-MM-dd' unlink-panels @change='changeDate' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' size='medium' @click="current=1;getList()">查询</el-button>
                <el-button type='info' size='medium' @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data='list' border style="width: 100%">
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='invoiceDay' label='发票日期' width='120' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectName' label='项目名称' width='320' show-overflow-tooltip></el-table-column>
            <el-table-column prop='projectAddress' label='项目地址' width='320' show-overflow-tooltip></el-table-column>
            <el-table-column prop='sellerName' label='发票销售方' width="240" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='invoiceNo' label='发票号码' show-overflow-tooltip>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size="params.size" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total"
            v-if="total > 0">
        </el-pagination>
    </div>
</template>
<script>


export default {
    data() {
        return {
            fastOptions: [
                {
                    value: 30,
                    label: "近30日"
                },
                {
                    value: 60,
                    label: "近60日"
                },
                {
                    value: 180,
                    label: "近180日"
                },
                {
                    value: 360,
                    label: "近1年"
                }
            ],
            list: [],
            dateArr: [],
            params: {
                mode: 1,
                current: 1,
                size: 10,
                projectName: "",
                sellerName: "",
                invoiceNo: "",
                invoiceEndDate: "",
                invoiceStartDate: ""
            },
            total: 0,

        };
    },
    created() {
        // this.fastChange(360)
        this.getList()
    },
    methods: {
        fastChange(val) {
            const date = new Date();
            this.params.invoiceEndDate = this.formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.invoiceStartDate = this.formatDate(startDate);
            this.dateArr = [this.params.invoiceStartDate, this.params.invoiceEndDate]

        },
        reSet() {
            this.params = {
                mode: 1,
                current: 1,
                size: 10,
                projectName: "",
                sellerName: "",
                invoiceNo: "",
                invoiceEndDate: "",
                invoiceStartDate: ""
            }
            this.fastChange(360)
            this.getList()
        },
        tagHand(cur, value) {
            this.tagCur = cur
            this.params.dateType = value
            this.getChart()
        },
        changeDate(v) {
            if (v && v.length > 0) {
                this.params.invoiceStartDate = v[0];
                this.params.invoiceEndDate = v[1];
            } else {
                this.params.invoiceStartDate = '';
                this.params.invoiceEndDate = '';
            }
        },
        getList() {
            this.$http('/dcp/select/invoice/comments/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            });
        },
    }
};
</script>
