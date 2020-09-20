<template>
    <div class="stat">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="mb20">
            <el-tab-pane label="匹配查询" name="first">
                <div class="table-wrap mt20" v-if="activeName === 'first'">
                    <div class="table-title">发票明细匹配数量比例</div>
                    <el-form :inline="true" ref="form" size="medium">

                        <el-form-item class='el-item-form-width'>
                            <el-select v-model="params.salerName" clearable placeholder="客户名称" @change="onChangeSalerName">
                                <el-option v-for="(v, i) in salerNameList" :key="i" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width: 120px">
                            <el-select v-model="pool" clearable placeholder="是否入池" @change="onChangePool">
                                <el-option label="全部下游" value="0"></el-option>
                                <el-option label="入池医院" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class='el-item-form-width'>
                            <el-select filterable remote clearable collapse-tags multiple v-model="params.buyerName" placeholder="下游名称" :remote-method="this.pool ==='0'? getBuyerName : ''">
                                <el-option v-for="v in buyerNameList" :key="v" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item class='el-item-form-width'>
                            <el-select v-model="params.invoiceType" clearable placeholder="发票种类">
                                <el-option label="增值税专用发票" value="01"></el-option>
                                <el-option label="增值税普通发票" value="04"></el-option>
                                <el-option label="增值税普通发票(电子)" value="10"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width: 350px">
                            <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开票开始日期" end-placeholder="开票结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="
                                    params.current = 1;
                                    toSearch();
                                ">查询</el-button>
                            <el-button type="info" @click="reSet">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-row class='el-iconfont'>

                        <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                            <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
                        </el-tooltip>
                    </el-row>

                    <div>
                        <el-table :data="list" show-summary :summary-method="getSummaries">
                            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
                            <el-table-column prop="buyerName" label="下游名称" min-width="200" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="effectiveInvoice" label="有效正向发票明细数量" min-width="200" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="matchInvoice" label="匹配正向发票明细数量" min-width="200" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="proportionOne" label="匹配率1(%)" min-width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{ (item.row.proportionOne * 100).toFixed(2) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="proportionTwo" label="匹配率2(%)" min-width="200" show-overflow-tooltip>
                                <template slot-scope="item">
                                    {{ (item.row.proportionTwo * 100).toFixed(2) }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.current" :page-sizes="[20, 50, 100]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="totalSize" v-if="totalSize > 0">
                </el-pagination>
                <div class="table-wrap bottom-wrap mt20 mb30">

                    <div class="wrap-right">
                        <div class="table-title mb20">销售-开票间隔</div>
                        <el-table :data="list1" height="431" show-summary :summary-method="getSummaries1">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="buyerName" label="下游名称" min-width="170" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="one" label="1天" min-width="110"></el-table-column>
                            <el-table-column prop="two" label="2-7天" min-width="125" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="eight" label="8-31天" min-width="125"></el-table-column>
                            <el-table-column prop="thirtyOne" label="大于31天" min-width="125"></el-table-column>
                        </el-table>
                        <el-pagination @size-change="handleSizeChange1" @current-change="getList1" :current-page="params1.current" :page-sizes="[20, 50, 100]" :page-size="params1.size"
                            layout="total, sizes, prev, pager, next, jumper" :total="totalSize1"></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="匹配明细" name="second">
                <keep-alive>
                    <detail-list v-if="activeName === 'second'"></detail-list>
                </keep-alive>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import detailList from './components/detailList'
import { formatDate } from '@/filters/index'
export default {
    components: {
        detailList
    },
    data () {
        return {
            pool: "0",
            pickerOptions1: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                }
            },
            activeName: 'first',
            total: 0,
            totalSize: 0,
            totalSize1: 0,
            heJi: {},
            pingJun: {},
            value1: [],
            params: {
                current: 1, //页码
                size: 20, //每页条数
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: [], // 购买方
                invoiceType: '', // 发票类型(01:增值税专用发票 03:机动车销售统一发票 04:增值税普通发票 10:增值税普通发票(电子))
                startInvoiceDate: '', // 开票区间
                endInvoiceDate: '' // 开票区间
            },
            params1: {
                current: 1, //页码
                size: 20, //每页条数
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: [], // 购买方
                invoiceType: '', // 发票类型(01:增值税专用发票 03:机动车销售统一发票 04:增值税普通发票 10:增值税普通发票(电子))
                startInvoiceDate: '', // 开票区间
                endInvoiceDate: '' // 开票区间
            },
            poolList: [],
            salerNameList: [],
            buyerNameList: [],
            list: [],
            list1: [],
            particularsList: [],
            invoiceList: []
        }
    },
    created () {
        // 开票区间时间默认7天
        this.fastChange(90)
        this.getList()
        this.getSalerName()
        this.getBuyerName()
        // this.getChartData()
        this.getList1()
        this.getHe()
        this.getPing()
    },
    methods: {
        onChangeSalerName () {
            this.params.buyerName = ""
            this.pool === '0' ? this.getBuyerName() : this.getPool()
        },
        onChangePool (val) {
            console.log(val, 'val')
            val === '0' ? this.getBuyerName() : this.getPool()
        },
        getColor (percentage) {
            var color = ''
            if (percentage < 25) {
                color = 'rgba(155,188,108,0.60)'
            } else if (percentage > 25 && percentage < 51) {
                color = '#BFA559'
            } else if (percentage > 50 && percentage < 76) {
                color = '#98361D'
            } else if (percentage > 75 && percentage <= 100) {
                color = 'rgb(88, 88, 136)'
            }
            console.log(color, 'color')

            let option = {
                series: [
                    {
                        //  外圆
                        name: '',
                        center: ['50%', '50%'],
                        type: 'pie',
                        radius: ['10', '13'],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                position: 'center',
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: percentage,
                                name: '',
                                itemStyle: {
                                    color: color
                                }
                            },
                            {
                                value: 100 - percentage,
                                name: '',
                                itemStyle: {
                                    color: 'rgb(57, 80, 72)'
                                }
                            }
                        ]
                    },
                    //  内圆
                    {
                        name: '',
                        center: ['50%', '50%'],
                        type: 'pie',
                        radius: ['7', '8'],
                        hoverAnimation: false,
                        label: {
                            normal: {
                                position: 'center',
                                show: false
                            }
                        },
                        data: [
                            {
                                value: 0,
                                name: '',
                                itemStyle: {
                                    color: '#31353A'
                                }
                            }
                        ]
                    }
                ]
            }
            return option
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startInvoiceDate = v[0]
                this.params.endInvoiceDate = v[1]
                this.params1.startInvoiceDate = v[0]
                this.params1.endInvoiceDate = v[1]
            } else {
                this.params.startInvoiceDate = ''
                this.params.endInvoiceDate = ''
                this.params1.startInvoiceDate = ''
                this.params1.endInvoiceDate = ''
            }
        },
        // 获取 总合计
        getHe () {
            this.ajax.post('/dcp/query/invoice/detail/statistics/total', this.params).then(res => {
                this.heJi = res.data

            })
        },
        // 获取 总平均
        getPing () {
            this.ajax.post('/dcp/query/invoice/detail/statistics/interval/Average', this.params).then(res => {
                this.pingJun = res.data
            })
        },
        //快速选择
        fastChange (val) {
            const date = new Date()
            this.params.endInvoiceDate = formatDate(new Date())
            this.params1.endInvoiceDate = formatDate(new Date())
            let startDate = date.setTime(date.getTime() - 3600 * 1000 * 24 * val)
            this.params.startInvoiceDate = formatDate(startDate)
            this.params1.startInvoiceDate = formatDate(startDate)
            this.value1.push(this.params.startInvoiceDate, this.params.endInvoiceDate)
        },
        toSearch () {
            this.getList()
            this.getList1()
            // this.getChartData()
            this.getHe()
            this.getPing()
        },
        // getChartData() {
        //     this.params.size = 20
        //     this.$http('/dcp/query/invoice/detail/statistics', this.params, {
        //         type: 'formdata'
        //     }).then(res => {
        //         this.particularsList = res.data.records
        //     })
        // },
        pickerOptions2 () {
            let startInvoiceDate = ''
            this.params.b && (startInvoiceDate = this.params.b + ' 00:00:00')
            return {
                disabledDate (time) {
                    return new Date(time) < new Date(startInvoiceDate)
                }
            }
        },
        async exportData () {
            await this.$http('/dcp/invoice/detail/statistics/export', this.params, {
                type: 'export'
            })
        },
        getList () {
            console.log(this.params)
            this.$http('/dcp/query/invoice/detail/statistics', this.params, {
                type: 'formdata'
            }).then(res => {
                this.list = res.data.records || []
                this.totalSize = res.data.total
            })
        },
        getList1 () {
            // console.log(this.params1, "params1");
            this.params1.salerName = this.params.salerName
            this.$http('/dcp/query/invoice/detail/statistics/interval', this.params1, {
                type: 'formdata'
            }).then(res => {
                this.list1 = res.data.records || []
                this.totalSize1 = res.data.total
            })
        },
        getSalerName () {
            this.$http('/dcp/query/seller/list', {}, { type: 'get' }).then(res => {
                this.salerNameList = res.data || []
            })
        },
        getPool () {
            let salerName = this.params.salerName
            this.$http('/dcp/query/hospital/pool/name', { name: salerName }, { type: 'get' }).then(res => {
                console.log(res)
                this.buyerNameList = res.data || []
                this.params.buyerName = res.data
                this.params1.buyerName = res.data
            })
        },
        // 获取付款方
        getBuyerName (name) {
            console.log(name, 'name')
            if (name) {
                this.$http(
                    '/dcp/query/buyer/list',
                    { name, sellerName: this.params.salerName },
                    { type: 'get' }
                ).then(res => {
                    this.buyerNameList = res.data || []
                })
            } else {
                this.$http(
                    '/dcp/query/buyer/list',
                    { name: '', sellerName: this.params.salerName },
                    { type: 'get' }
                ).then(res => {
                    this.buyerNameList = [...res.data, ...this.buyerNameList]
                    this.buyerNameList = [...new Set(this.buyerNameList)]
                })
            }
        },
        // 合计
        getSummaries (param) {
            // console.log(param);
            const { columns, data } = param
            const sums = []
            columns.forEach((column, index) => {
                // if (index === 0) {
                //     sums[index] = data.length + 1
                //     return
                // }
                if (index === 0) {
                    sums[index] = '合计'
                    return
                }
                const values = data.map(item => Number(item[column.property]))
                if ([2].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = (values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)) + ' / ' + this.heJi.totalEffectiveInvoice.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
                if ([3].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = (values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)).toFixed(2) + ' / ' + this.heJi.totalMatchInvoice.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
                if (index === 4) {
                    return sums[index] = ((sums[3].split('/')[1] / sums[2].split('/')[1]) * 100).toFixed(2) + ' / ' + (this.heJi.proportionOne * 100).toFixed(2)
                }
                if (index === 5) {
                    return sums[index] = ((sums[3].split('/')[1] / sums[2].split('/')[1]) * 100).toFixed(2) + ' / ' + (this.heJi.proportionTwo * 100).toFixed(2)
                }

            })
            return sums
        },
        // 平均数
        // 平均值
        getSummaries1 (param) {
            // console.log(param);
            const { columns, data } = param
            console.log(data, 'data')
            const sums = []
            columns.forEach((column, index) => {
                // if (index === 0) {
                //     sums[index] = data.length + 1
                //     return
                // }
                if (index === 0) {
                    sums[index] = '平均'
                    return
                }
                const values = data.map(item => Number(item[column.property]))
                if ([2].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = ((values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)) / data.length).toFixed(2) + ' / ' + this.pingJun.oneAve.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
                if ([3].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = ((values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)) / data.length).toFixed(2) + ' / ' + this.pingJun.twoAve.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
                if ([4].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = ((values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)) / data.length).toFixed(2) + ' / ' + this.pingJun.eightAve.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
                if ([5].includes(index)) {
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = ((values.reduce((prev, curr) => {
                            const value = Number(curr)
                            if (!isNaN(value)) {
                                return prev + curr
                            } else {
                                return prev
                            }
                        }, 0)) / data.length).toFixed(2) + ' / ' + this.pingJun.thirtyOneAve.toFixed(2)
                    } else {
                        sums[index] = ''
                    }
                }
            })

            return sums
        },
        // 重置
        reSet () {
            this.pool = "0"
            this.getBuyerName('')
            this.params = {
                current: 1, //页码
                size: 20, //每页条数
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: '', // 购买方
                invoiceType: '' // 发票类型(01:增值税专用发票 03:机动车销售统一发票 04:增值税普通发票 10:增值税普通发票(电子))
            }
            this.params1 = {
                current: 1, //页码
                size: 20, //每页条数
                salerName: '内蒙古瑞康医药有限公司', // 销售方
                buyerName: '', // 购买方
                invoiceType: '', // 发票类型(01:增值税专用发票 03:机动车销售统一发票 04:增值税普通发票 10:增值税普通发票(电子))
                startInvoiceDate: '', // 开票区间
                endInvoiceDate: '' // 开票区间
            };
            this.value1 = []
            this.fastChange(90)
            this.getList()
            this.getList1()
        },
        handleClick () { },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        },
        handleSizeChange1 (v) {
            this.params1.size = v
            this.getList1()
        },
        handleCurrentChange (val) {
            this.params.current = val
            this.getList()
            this.getChartData()
        },
        handleCurrentChange2 (val) {
            this.params.current = val
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

.bottom-wrap {
    display: flex;
    justify-content: space-between;
    .wrap-left {
        width: 525px;
        /deep/ .el-table {
            td {
                padding: 0;
                .cell {
                    height: 47px;
                    .echart-com {
                        display: flex;
                        align-items: center;
                        .percentage {
                            margin-left: 25px;
                        }
                    }
                }
            }
        }
    }
    .wrap-right {
        width: 100%;
        /deep/ .el-table__footer-wrapper td {
            border-top: 1px solid #383a3d;
        }
    }
    /deep/ .el-table {
        tr {
            background: #292b2f;
            td {
                background: #292b2f;
            }
        }
    }
}
/deep/ .el-tabs__content {
    background: transparent;
}
/deep/ .el-pager li {
    background: none;
}
</style>
