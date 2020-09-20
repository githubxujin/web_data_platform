<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="el-item-form-width ">
                <el-input v-model="params.key" clearable placeholder="关键字"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.hospitalLevel' clearable placeholder="医院等级">
                    <el-option label='三级甲等' value='三级甲等'></el-option>
                    <el-option label='三级乙等' value='三级乙等'></el-option>
                    <el-option label='三级丙等' value='三级丙等'></el-option>
                    <el-option label='三级未定' value='三级未定'></el-option>
                    <el-option label='二级甲等' value='二级甲等'></el-option>
                    <el-option label='二级乙等' value='二级乙等'></el-option>
                    <el-option label='二级丙等' value='二级丙等'></el-option>
                    <el-option label='二级未定' value='二级未定'></el-option>
                    <el-option label='一级甲等' value='一级甲等'></el-option>
                    <el-option label='一级乙等' value='一级乙等'></el-option>
                    <el-option label='一级丙等' value='一级丙等'></el-option>
                    <el-option label='一级未定' value='一级未定'></el-option>
                    <el-option label='未定级' value='未定级'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.inPool' clearable placeholder="医院是否入池">
                    <el-option label='是' value='是'></el-option>
                    <el-option label='否' value='否'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-cascader v-model="value" :options="city" placeholder="所在地区" clearable :props="{ expandTrigger: 'hover',checkStrictly: true }" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.hospitalStyle' clearable placeholder="医院类型">
                    <el-option :label='item' :value='item' v-for="(item,index) in typeList" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-select v-model='params.companName' clearable placeholder="公司名称">
                    <el-option v-for="(v,i) in company" :key="i" :label='v' :value='v'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="el-item-date-width ">
                <el-date-picker v-model="value2" type="daterange" @change="changeDate" value-format="yyyy-MM-dd" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                    :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="tab-info" @expand-change="expandRows" :expand-row-keys="expandRowKeys" :row-key="row=>row.id" @row-click="rowClick">
            <el-table-column type="expand">
                <template slot-scope="item">
                    <el-table :data="item.row.expData" class="tab-child" :row-key="row=>row.id">
                        <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                        <el-table-column :formatter="formatLabel" prop="supplierName" label="供应商名称" show-overflow-tooltip></el-table-column>
                        <el-table-column :formatter="formatLabel" prop="drugPeriod" label="核定药品账期（天）" show-overflow-tooltip></el-table-column>
                        <el-table-column :formatter="formatLabel" prop="consumablesPeriod" label="核定耗材账期（天）" show-overflow-tooltip></el-table-column>
                        <el-table-column :formatter="formatLabel" prop="equipmentPeriod" label="核定设备账期（天）" show-overflow-tooltip></el-table-column>
                    </el-table>
                    <div class="page-nav isCenter" v-show="item.row.total>item.row.size">
                        <el-pagination @current-change="dtlCurrentChange($event,item.row)" :current-page="item.row.current" :page-sizes="[5, 10, 15, 20]" :page-size="item.row.size"
                            layout="total, sizes, prev, pager, next, jumper" :total="item.row.total || 0"></el-pagination>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="序号" width="70" align="center">
                <template slot-scope="item">
                    {{ item.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="customerName" label="医院名称" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="hospitalAliasName" label="医院别名" min-width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="hospitalStyle" label="医院类型" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="hospitalLevel" label="医院等级" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="inPool" label="医院是否入池" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="hospitalType" label="医院性质" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="province" label="所在省份" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="city" label="所在城市" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="top100" label="是否百大医院" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="top100Rank" label="百大综合排名" width="150" show-overflow-tooltip sortable="true"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="top100RankScore" label="百大排名得分" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" align="center" width="90" fixed="right">
                <template slot-scope="item">
                    <el-button type="primary" plain @click.stop="$router.push({path:'/hospitalDetails', query:{hospitalId:item.row.hospitalId}})">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
            :total="total"></el-pagination>
    </div>
</template>

<script>
import city from '@/views/industryTrade/config/city1.js'
import { formatDate } from "@/filters/index"
export default {
    data () {
        return {
            value: '',
            city,
            activeName: 'first',
            typeList: [],
            value2: [],
            total: 0,
            expandRowKeys: [],
            company: [],
            params: {
                current: 1,
                size: 10,
                companName: '中邦恒盛',
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
            }
        }
    },
    created () {
        this.getType()
        this.getCompany()
        this.getList()
        this.fastChange(360)
    },
    methods: {
        async exportData () {
            await this.$http('/dcp/export/hospital/result/data', this.params, { type: 'export' });
        },
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.province = value[0]
                this.params.city = value[1] || ''
            } else {
                this.params.province = ''
                this.params.city = ''
            }
        },
        getType () {
            this.$http('/dcp/query/hospital/style/list', {}, { type: 'get' }).then(res => {
                this.typeList = res.data
            });
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
            this.$http('/dcp/query/firm_hospital/page/list', this.params).then(
                res => {
                    this.list = res.data.records
                    console.log(this.list);
                    this.total = res.data.total
                }
            )
        },
        rowClick (row, column, event) {
            this.expandRows(row)
        },
        // 展开行
        expandRows (row) {
            if (this.expandRowKeys.includes(row.id)) {
                return this.expandRowKeys.splice(
                    this.expandRowKeys.indexOf(row.id),
                    1
                )
            }
            this.expandRowKeys.push(row.id)
            this.$set(row, 'current', 1)
            this.$set(row, 'size', 5)
            this.getDetailsList(row)
        },
        getDetailsList (row) {
            let params = {
                current: row.current,
                size: row.size,
                hospitalId: row.hospitalId
            }
            this.$http('/dcp/query/hospital/period/list', params).then(res => {
                const { data = {} } = res
                const { records = [] } = data
                this.$set(row, 'expData', records)
                this.$set(row, 'total', data.total)
            })
        },
        //详情分页器
        dtlCurrentChange (val, row) {
            this.$set(row, 'current', val)
            this.getDetailsList(row)
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                companName: '',
                beginTime: '',
                endTime: ''
            }
            this.value2 = []
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
    margin-top: -7px;
    color: #366f71;
    padding-left: 15px;
    margin-bottom: -10px;
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
</style>
