<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium" class="search-form">
            <el-form-item class="el-item-form-width">
                <el-input v-model='params.customerName' clearable placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model='params.projectName' clearable placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item class="">
                <el-date-picker start-placeholder='走访开始时间' end-placeholder='走访结束时间' v-model="dateArr" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至"></el-date-picker>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model='params.reportPerson' clearable placeholder="报告填写人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.page=1;getList();saveFun()">查询</el-button>
                <el-button @click="resetForm('form')" type="info">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <span class="iconfont icon-shujuzhongxin-daochu" @click="exoprtPDF"></span>
            </el-tooltip>
        </el-row>

        <el-table :data="list" class="el-table" @selection-change="handleSelectionChange">
            <el-table-column type="selection" label="" width="50" align="center"></el-table-column>
            <el-table-column type='index' label='序号' width='70' align="center"></el-table-column>
            <el-table-column prop='customerName' label='企业名称' width='220' show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column prop='projectName' label='项目名称' min-width='220' show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column prop='visitDate' label='走访时间' min-width='120' show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column prop='reportPerson' label='报告填写人' width='100' show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column label='报告类型' width='150' show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{ scope.row.reportType | status}}
                </template>
            </el-table-column>
            <el-table-column label='报告状态' show-overflow-tooltip align="left">
                <template slot-scope="scope">
                    {{ scope.row.reportStatus | reportCode}}
                </template>
            </el-table-column>
            <el-table-column prop='lastUpdatedTime' label='更新时间' min-width='180' show-overflow-tooltip align="left">
            </el-table-column>
            <el-table-column prop='remark' label='操作' width='100' show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button @click="toDetail(scope.row)" type="primary" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
    </div>
</template>
<script>
import city from "@/views/infrastructure/config/city.js";
export default {
    data () {
        return {
            city,
            list: [],
            params: {
                current: 1,
                size: 10,
                customerName: "",
                projectName: "",
                visitDate: "",
                reportPerson: "",
                visitStartDate: "",
                visitEndDate: ""
            },
            total: 0,
            ids: [],
            dateArr: []
        };
    },
    created () {
        this.getList();
        // this.searchRecord();
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.visitStartDate = v[0];
                this.params.visitEndDate = v[1];
            } else {
                this.params.visitStartDate = "";
                this.params.visitEndDate = "";
            }
        },
        getParams () {
            let data = this.$bus.getParams(this.$route.meta.paramsType)
            for (let key in this.params) {
                this.params[key] = data[key] || this.params[key]
            }
            this.getList()
        },
        // 改变 查询参数时 更新保存的参数
        saveFun () {
            this.$bus.saveParams(this.$route.meta.paramsType, this.params)
        },
        // 获取列表
        getList () {
            this.$http('/dcp/riskreport/page/list', this.params)
                .then(res => {
                    this.list = res.data.records || []
                    this.total = res.data.total
                }).catch(err => {
                    console.log(err)
                })
        },
        // 勾选
        handleSelectionChange (val) {
            this.ids = []
            val.forEach(v => {
                this.ids.push(v.id)
            })
        },
        exoprtPDF () {
            if (this.ids.length === 0) {
                this.$message.error('请选择一条记录')
                return
            }
            this.ids.forEach(v => {
                this.exportData(v)
            })
        },
        // 导出文件
        async exportData (id) {
            await this.ajax.exportFile('/riskreport/riskReport/downLoadRiskReportPdfFile', { id })
                .then(res => {
                    // console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        },
        //详情
        toDetail (row) {
            this.$router.push({
                name: "report-detail",
                params: {
                    id: row.id,
                    customerName: row.customerName
                }
            });
        },
        // 重置表单
        resetForm (formName) {
            this.params = {
                size: 10,
                page: 1,
                customerName: '',
                visitDate: '',
                projectName: ''
            },
                // 清除 保存的参数
                this.$bus.clearParams(this.$route.meta.paramsType);
            this.getList()
        },
        handleCurrentChange (val) {
            this.params.page = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        reSet () {
            this.params = {
                current: 1,
                size: 20,
                customerName: "",
                projectName: "",
                visitDate: "",
                reportPerson: ""
            };
            this.getList();
        }

    },
    filters: {
        reportCode (key) {
            switch (key) {
                case 0:
                    return '未填写'
                case 1:
                    return '待提交'
                case 2:
                    return '已提交'
                default:
                    break;
            }
        },
        status (value) {
            switch (value) {
                case 1:
                    return '贷前'
                    break;
                case 2:
                    return '贷后'
                    break;
                case 3:
                    return '现场走访'
                    break;
                case 4:
                    return '常规贷后'
                    break;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-form--inline .el-form-item {
    margin-right: 20px;
}
/deep/ .el-button + .el-button {
    margin-left: 20px;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    // padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
</style>

