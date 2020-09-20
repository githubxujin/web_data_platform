<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="el-item-form-width ">
                <el-input v-model="params.key" clearable placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.drugType' clearable placeholder="产品类别">
                    <el-option label='辅料' value='辅料'></el-option>
                    <el-option label='化学药品' value='化学药品'></el-option>
                    <el-option label='生物制品' value='生物制品'></el-option>
                    <el-option label='中药' value='中药'></el-option>
                    <el-option label='其他' value='其他'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.medicineInsuranceType' clearable placeholder="医保类别">
                    <el-option label='甲' value='甲'></el-option>
                    <el-option label='乙' value='乙'></el-option>
                    <el-option label='非医保' value='非医保'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.drugDosageform' clearable placeholder="剂型">
                    <el-option v-for="(v,i) in dosageList" :key="i" :label='v' :value='v'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.quantityPurchase' multiple collapse-tags clearable @change="changeValue($event,1)" placeholder="带量采购">
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.keyMonitor' multiple collapse-tags clearable @change="changeValue($event,2)" placeholder="重点监控">
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.basicDrug' multiple collapse-tags clearable @change="changeValue($event,3)" placeholder="基本药物">
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.imitationDrug' clearable placeholder="仿评药">
                    <el-option label='是' value='是'></el-option>
                    <el-option label='否' value='否'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.companName' clearable placeholder="公司名称">
                    <el-option v-for="(v,i) in company" :key="i" :label='v' :value='v'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-input v-model="params.customerName" clearable placeholder="下游名称"></el-input>
            </el-form-item>
            <el-form-item class="el-item-date-width ">
                <el-date-picker v-model="value2" type="daterange" @change="changeDate" unlink-panels value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class="item" effect="dark" content="表头设置" placement="top">
                <span class="iconfont icon-shujuzhongxin-shezhi" @click="setTable"></span>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="tab-info">
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <template v-for='(item,index) in tableArr'>
                <el-table-column v-if="index+1 === tableArr.length " :key="item.propName" prop="操作" width="80" label="操作" show-overflow-tooltip fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click="toDetail(item.row)">详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column v-else :label="item.title" :min-width="item.width" :align="item.titleAlign" :prop='item.propName' show-overflow-tooltip :key="index" :formatter="item.formatterFun"
                    :sortable="item.sortable"></el-table-column>

            </template>

        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>
        <tableItemSet ref="tableItemSet" @setOK="setSuccess"></tableItemSet>
    </div>
</template>

<script>
import tableItemSet from '@/components/tableItemSet'
import { formatDate } from "@/filters/index"
import city from "@/views/infrastructure/config/city.js";
export default {
    components: {
        tableItemSet
    },
    data () {
        return {
            city,
            value2: [],
            total: 0,
            company: [],
            dosageList: [],
            params: {
                current: 1,
                size: 10,
                companName: '中邦恒盛',
                customerName: '',
                beginTime: '',
                endTime: ''
            },
            list: [],
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 7
                            )
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 30
                            )
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(
                                start.getTime() - 3600 * 1000 * 24 * 90
                            )
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            },
            // 默认显示的字段
            defaultKeys: ['drugType', 'productName', 'drugEnglishName', 'drugCode', 'medicineInsuranceType', 'productSpec', 'drugDosageform', 'quantityPurchase',
                'keyMonitor', 'basicDrug', 'imitationDrug', 'approveDate', 'approveNumber', 'orgApproveNumber', 'manufacture', 'productionAddress', 'productionCountry', "medicineLocal",
                "medicineLocalType"],
            tableArr: [],
            allTableArr: [   // 全部字段
                { propName: 'drugType', title: '产品类别', width: 100, titleAlign: 'left', columnAlign: 'center', longTxt: true, sortable: false },
                { propName: 'productName', title: '药品名称', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'drugEnglishName', title: '英文名称', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'drugCode', title: '药品本位码', width: 140, titleAlign: 'center', columnAlign: 'center', longTxt: true },
                {
                    propName: "medicineInsuranceType",
                    title: "医保类别",
                    width: 100,
                    titleAlign: "center",
                    columnAlign: "center"
                },
                {
                    propName: "medicineLocal",
                    title: "地方医保",
                    width: 100,
                    titleAlign: "center",
                    columnAlign: "center"
                },
                { propName: 'productSpec', title: '药品规格', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'drugDosageform', title: '剂型', width: 140, titleAlign: 'left', columnAlign: 'center', longTxt: true },
                { propName: 'quantityPurchase', title: '带量采购', width: 100, titleAlign: 'center', columnAlign: 'center', longTxt: true },
                { propName: 'keyMonitor', title: '重点监控', width: 100, titleAlign: 'center', columnAlign: 'center', longTxt: true },
                { propName: 'basicDrug', title: '基本药物', width: 100, titleAlign: 'center', columnAlign: 'center', longTxt: true },
                { propName: 'imitationDrug', title: '仿评药', width: 100, titleAlign: 'center', columnAlign: 'left', longTxt: true },
                { propName: 'approveDate', title: '批准日期/发证日期', width: 150, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'approveNumber', title: '批准文号/注册证号', width: 180, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'orgApproveNumber', title: '原批准文号/注册证号', width: 180, titleAlign: 'left', columnAlign: 'left' },
                { propName: 'manufacture', title: '生产单位', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'productionAddress', title: '生产地址', width: 150, titleAlign: 'left', columnAlign: 'left', longTxt: true },
                { propName: 'productionCountry', title: '生产国家', width: 100, titleAlign: 'left', columnAlign: 'left', longTxt: true, }
            ],
        }
    },
    created () {
        this.getColumn()
        this.getCompany()
        this.getList()
        this.fastChange(360)
        this.getDosage()
        this.city = [...city];
        this.city.unshift({ name: "否" }, { name: "全国" });
    },
    methods: {
        async exportData () {
            await this.$http('/dcp/export/drug/result/data', this.params, { type: 'export' });
        },
        toDetail (v) {
            v.drugName = v.productName // 字段共用drugName 
            v.drugSpec = v.productSpec // 字段共用drugSpec
            let row = encodeURIComponent(JSON.stringify(v));
            this.$router.push({ name: "drugDetails", params: { row } });
        },
        getDosage () {
            this.$http("/dcp/drug/dosage/form/list", {}, { type: "get" }).then(
                res => {
                    this.dosageList = res.data;
                }
            );
        },
        fastChange (val) {
            this.value2 = []
            const date = new Date();
            this.params.endTime = formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.beginTime = formatDate(startDate);
            this.value2.push(this.params.beginTime, this.params.endTime)
        },
        // 获取表头设置
        getColumn () {
            this.$http('/dcp/query/drug/column', {}, { type: 'get' }).then(
                res => {
                    this.defaultKeys = res.data || this.defaultKeys
                    this.tableArr = this.allTableArr.filter(i => {
                        return this.defaultKeys.includes(i.propName)
                    })
                }
            )
        },
        // 表头设置  --------------------------------------------------------------------------
        setTable () {
            this.$refs.tableItemSet.newItemDialog = true
            this.$refs.tableItemSet.checkboxGroup1 = this.tableArr.map(
                i => i.propName
            )
            this.$refs.tableItemSet.tableArr = this.allTableArr
        },
        setSuccess (val) {
            // console.log('val',val);
            // return
            this.$refs.tableItemSet.newItemDialog = false
            if (val.length === 0) {
                this.tableArr = this.allTableArr
            } else {
                this.tableArr = this.allTableArr.filter(i => {
                    return val.includes(i.propName)
                })
            }
            this.$http(
                '/dcp/drug/column/update',
                { column: val },
                { type: 'formData' }
            ).then(res => {
                this.$message.success('设置成功')
            })
        },
        getCompany () {
            this.$http('/dcp/drug/company/list', {}, { type: 'get' }).then(
                res => {
                    this.company = res.data
                }
            )
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.beginTime = v[0]
                this.params.endTime = v[1]
            } else {
                this.params.beginTime = ''
                this.params.endTime = ''
            }
        },
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/firm_drug/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        reSet () {
            this.fastChange(30)
            this.params = {
                current: 1,
                size: 10,
                companName: '',
                customerName: '',
                beginTime: '',
                endTime: ''
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
.tabs-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
}
/deep/ .el-tabs__header {
    margin-top: -20px;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
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
.form-in {
    padding: 0 87px 0 67px;
    /deep/ .el-form-item__label {
        color: rgba(255, 255, 255, 0.8);
        &::before {
            color: #53dcec !important;
        }
    }
}
.select-h {
    /deep/ .el-input__inner {
        height: 36px;
        line-height: 36px;
    }
}
</style>
