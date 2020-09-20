<template>
    <div class="table-wrap mt20">
        <div class="table-title">监控企业配置</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.industryType" clearable placeholder="行业类别">
                    <el-option v-for="item in industryCategoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model.trim="params.customerName" size="medium" clearable class="sada" filterable placeholder="请输入企业名称">
                    <el-option v-for="item in clientList" :key="item.id" :label="item.customerName" :value="item.customerName" style="width:250xp;">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.tag" clearable placeholder="企业标签">
                    <el-option label="核心买方" :value="1"></el-option>
                    <el-option label="合作客户" :value="2"></el-option>
                    <el-option label="其他" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.isMonitor" clearable placeholder="是否监控">
                    <el-option label="已监控" value="1"></el-option>
                    <el-option label="未监控" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="customerName" label="企业名称" show-overflow-tooltip :formatter="formatLabel" width="220"></el-table-column>
            <el-table-column prop="industryType" label="行业类别" show-overflow-tooltip width="120">
                <template slot-scope="scope">
                    {{industryCategoryLabel(scope.row.industryType)}}
                </template>
            </el-table-column>
            <el-table-column prop="creditCode" label="统一社会信用代码" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="registerNo" label="注册号" show-overflow-tooltip :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="province" label="所属省份" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="tag" label="企业标签" show-overflow-tooltip>
                <template slot-scope="item">
                    <span v-if="item.row.tag === 1">核心买方</span>
                    <span v-else-if="item.row.tag === 2">合作客户</span>
                    <span v-else-if="item.row.tag === 3">其他</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="isMonitor" label="是否监控" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="scope.row.isMonitor===0">未监控</span>
                    <span v-else-if="scope.row.isMonitor===1">已监控</span>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column prop="createName" label="创建人" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{scope.row.createName || '系统'}}
                </template></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="120" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{formatDate(scope.row.createTime) || '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="updateName" label="更新人" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="120" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{formatDate(scope.row.updateTime) || '-'}}
                </template></el-table-column>
            <el-table-column prop="dataSources" label="数据来源" show-overflow-tooltip :formatter="format_dataSources"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row.customerId)">编辑</el-button>
                    <el-button type="danger" plain class="del-col" @click="toDel(scope.row.customerId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.pageSize" @size-change="getList" :current-page.sync="params.pageNum" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>

        <!-- 右侧滑窗 -->
        <div class="float-right" :class="{act:isFold}" ref="alert">
            <div class="fold-box" @click.stop="foldHand"></div>
            <div class="title-box">
                <div class="title">
                    <span class="title_left">监控企业数量</span>
                    <span class="title_right">{{followingUsed}}/{{followingLimit}}</span>
                </div>
                <div class="pay-box">
                    <div class="box-bd">
                        <chart height="125px" width="125px" :option="rankPieOption2" id="monitoring-pie1" />
                    </div>
                </div>
            </div>
            <div class="title-box">
                <div class="title">
                    <span class="title_left">查询企业点数</span>
                    <span class="title_right purple">{{creditUsed}}/{{creditLimit}}</span>
                </div>
                <div class="pay-box">
                    <div class="box-bd">
                        <chart height="125px" width="125px" :option="rankPieOption1" id="monitoring-pie2" />
                    </div>
                </div>
            </div>
        </div>

        <!-- 新增/编辑 -->
        <monitoringAdd ref="monitoring" />

    </div>
</template>

<script>
import pieOption from "./pie1"
import { deepClone } from "@/utils/common";
import { industryCategoryLabel, industryCategoryList } from "@/utils/common"
export default {
    components: {
        monitoringAdd: () => import('./monitoring/monitoringAdd.vue'),
        Chart: () => import('@/components/Charts/invoiceInvalid'),
    },
    data() {
        return {
            industryCategoryList,
            list: [],
            params: {
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            dialogVisible: false,
            isFold: false,
            clientList: [],
            fundList: [
                {
                    label: '3000万元以下',
                    value: ''
                },
                {
                    label: '3000-10000万元',
                    value: ''
                },
                {
                    label: '10000-30000万元',
                    value: ''
                },
                {
                    label: '30000-60000万元',
                    value: ''
                },
                {
                    label: '60000万元以上',
                    value: ''
                },
            ],
            // 饼图数据
            rankPieOption1: {},
            rankPieOption2: {},
            creditUsed: 0,
            creditLimit: 0,
            followingLimit: 0,
            followingUsed: 0
        }
    },
    created() {
        this.searchRecord()
        this.getClientNames()
    },
    mounted() {
        this.setPieOption()
    },
    watch: {
        flag() {
            this.setPieOption()
        }
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        format_dataSources(a, b, val) {
            switch (val) {
                case 0:
                    return '风控平台'
                case 1:
                    return '数据中心'
                case 2:
                    return '风报官网'
                default:
                    return '-'
            }
        },
        // 获取客户名称
        getClientNames() {
            this.ajax.get('/risk/server/customer/survey/customerName/select')
                .then(res => {
                    this.clientList = res.data
                }).catch(res => {
                    console.log(res)
                })
        },
        industryCategoryLabel,
        foldHand() {
            this.isFold = !this.isFold
        },
        // 编辑
        toEdit(id) {
            this.dialogVisible = true
            this.isEdit = true
            this.ajax
                .json(`/risk/server/customer/survey/detail/${id}`, {}, { type: 'get' })
                .then(res => {
                    this.$set(this.$refs.monitoring.ruleForm, 'industryType', res.data.industryType)
                    this.$set(this.$refs.monitoring.ruleForm, 'customerName', res.data.customerName)
                    this.$set(this.$refs.monitoring.ruleForm, 'province', res.data.province)
                    this.$set(this.$refs.monitoring.ruleForm, 'creditCode', res.data.creditCode)
                    this.$set(this.$refs.monitoring.ruleForm, 'tag', res.data.tag)
                    this.$set(this.$refs.monitoring.ruleForm, 'isMonitor', res.data.isMonitor)
                    this.$set(this.$refs.monitoring.ruleForm, 'registerNo', res.data.registerNo)
                    this.$set(this.$refs.monitoring.ruleForm, 'id', res.data.id)
                })
        },
        // 删除
        toDel(id) {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                this.$http(`/risk/server/customer/survey/remove/${id}`).then(res => {
                    this.$message.success('删除成功')
                    this.getList()
                })
            }).catch(err => { })
        },
        // 首次加载
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList() {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/risk/server/customer/survey/list', this.params, { type: 'POST' })
                .then(res => {
                    this.list = res.data
                    this.total = res.meta.totalSize
                });
        },
        // 重置
        reSet() {
            this.params = {
                pageNum: 1,
                pageSize: 10,
            }
            this.total = 0
            this.getList()
        },
        // 新增
        toAdd() {
            this.dialogVisible = true
            this.isEdit = false
        },

        // ----------- 水球图 -------------
        setPieOption() {
            this.ajax
                .json('/dcp/risk/follow/company/count', {}, { type: 'get' })
                .then(res => {
                    let { creditLimit, creditRemaining, followingLimit, followingRemaining } = res.data
                    this.creditLimit = creditLimit
                    this.creditUsed = creditLimit - creditRemaining
                    // 查询企业点数
                    let pieOption1 = deepClone(pieOption)
                    let creditUsed = (this.creditUsed / creditLimit).toFixed(2)
                    let creditResidue = (creditRemaining / creditLimit).toFixed(2)
                    pieOption1.series[0].data[0].value = creditUsed
                    pieOption1.series[1].data[0].value = creditUsed
                    pieOption1.series[1].data[1].value = creditResidue
                    pieOption1.series[0].data[0].label.normal.color = '#8D97D1'
                    pieOption1.series[1].data[0].itemStyle.color.colorStops[0].color = '#5969C3'
                    pieOption1.series[1].data[0].itemStyle.color.colorStops[1].color = '#313235'
                    pieOption1.series[0].data[0].itemStyle.normal.color = '#30354C' // 水波颜色
                    pieOption1.series[0].outline.itemStyle.borderColor = '#5969C3'

                    if (this.flag === 'light') {
                        pieOption1.series[0].data[0].itemStyle.normal.color = this.$service.output.pay.pieOption2.itemStyle_color
                        pieOption1.series[0].data[0].label.normal.color = this.$service.output.pay.pieOption2.label
                        pieOption1.series[0].backgroundStyle.color = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption1.series[0].backgroundStyle.shadowColor = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption1.series[0].outline.itemStyle.borderColor = this.$service.output.pay.pieOption2.label
                        pieOption1.series[1].color = this.$service.output.pay.pieOption2.backgroundStyle
                        pieOption1.series[1].data[0].itemStyle.color.colorStops[0].color = this.$service.output.pay.pieOption2.series1_colorStops0
                        pieOption1.series[1].data[0].itemStyle.color.colorStops[1].color = this.$service.output.pay.pieOption2.series1_colorStops1
                    }

                    this.rankPieOption1 = pieOption1

                    // 监控企业数量
                    this.followingLimit = followingLimit
                    this.followingUsed = followingLimit - followingRemaining

                    let pieOption2 = deepClone(pieOption)
                    let followingUsed = (this.followingUsed / followingLimit).toFixed(2)
                    let followingResidue = (followingRemaining / followingLimit).toFixed(2)
                    pieOption2.series[0].data[0].value = followingUsed
                    pieOption2.series[1].data[0].value = followingUsed
                    pieOption2.series[1].data[1].value = followingResidue

                    if (this.flag === 'light') {
                        pieOption2.series[0].data[0].itemStyle.normal.color = this.$service.output.pay.pieOption1.itemStyle_color
                        pieOption2.series[0].data[0].label.normal.color = this.$service.output.pay.pieOption1.label
                        pieOption2.series[0].backgroundStyle.color = this.$service.output.pay.pieOption1.backgroundStyle
                        pieOption2.series[0].backgroundStyle.shadowColor = this.$service.output.pay.pieOption1.backgroundStyle
                        pieOption2.series[0].outline.itemStyle.borderColor = this.$service.output.pay.pieOption1.label
                        pieOption2.series[1].color = this.$service.output.pay.pieOption1.backgroundStyle
                        pieOption2.series[1].data[0].itemStyle.color.colorStops[0].color = this.$service.output.pay.pieOption1.series1_colorStops0
                        pieOption2.series[1].data[0].itemStyle.color.colorStops[1].color = this.$service.output.pay.pieOption1.series1_colorStops1
                    }

                    this.rankPieOption2 = pieOption2
                })
        }
    },
}
</script>

<style lang="less" scoped>
    .float-right {
        position: fixed;
        right: 4px;
        top: calc(~"50% - 204px");
        z-index: 999;
        transform: translateX(316px);
        transition: transform 0.5s 0s;
        width: 310px;
        height: 520px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        line-height: 14px;
        &.act {
            transform: translateX(0);
        }
        .fold-box {
            cursor: pointer;
            position: absolute;
            left: -35px;
            top: 186px;
            width: 35px;
            height: 137px;
            display: inline-block;
            font-size: 12px;
            line-height: 14px;
            text-align: right;
        }
    }
    .title-box {
        margin: 28px 60px;
        .title_left {
            float: left;
            margin-bottom: 18px;
        }
        .title_right {
            color: #449fa8;
            float: right;
            margin-bottom: 18px;
        }
    }
    .pay-box {
        width: 358px;
        height: 190px;
        display: flex;
        box-sizing: border-box;
        div + div {
            border-left: 1px solid #2e3236;
        }
        .box-bd {
            position: relative;
            width: 190px;
            height: 190px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            overflow: hidden;
            // border: 1px solid #2e3236;
            &::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 96px;
                height: 95px;
                z-index: 0;
            }
            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 0;
                width: 96px;
                height: 95px;
                z-index: 0;
            }
            div {
                z-index: 1;
            }
        }
        .box-fd {
            display: flex;
            align-items: center;

            .box-txt {
                font-family: PingFangSC-Light;
                padding-left: 30px;
                font-size: 16px;
                color: #449fa8;
                letter-spacing: 1px;
                p:first-child {
                    font-size: 28px;
                    color: #fff;
                }
            }
        }
    }
    .title_right.purple {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #8d97d1;
        line-height: 14px;
    }
    .dark {
        .float-right {
            color: #ffffff;
            background: #1d1e23;
            border: 1px solid #43a1ac;
            &.act {
                .fold-box {
                    background: url(~@/assets/images/monitoring-open.png) no-repeat;
                }
            }
            .fold-box {
                background: url(~@/assets/images/monitoring-close.png) no-repeat;
                color: #17d7eb;
            }
        }
        .pay-box {
            .box-bd {
                border: 1px solid #2e3236;
                &::before {
                    border-right: 1px solid #2e3236;
                    border-bottom: 1px solid #2e3236;
                }
                &::after {
                    border-left: 1px solid #2e3236;
                    border-top: 1px solid #2e3236;
                }
            }
        }
    }
    .light {
        .float-right {
            color: #333;
            background: #fff;
            border: 1px solid #4064d4;
            &.act {
                .fold-box {
                    background: url(~@/assets/images/light/monitoring-open.png) no-repeat;
                }
            }
            .fold-box {
                background: url(~@/assets/images/light/monitoring-close.png) no-repeat;
                color: #17d7eb;
            }
        }
        .pay-box {
            .box-bd {
                border: 1px solid #d2d9e5;
                &::before {
                    border-right: 1px solid #d2d9e5;
                    border-bottom: 1px solid #d2d9e5;
                }
                &::after {
                    border-left: 1px solid #d2d9e5;
                    border-top: 1px solid #d2d9e5;
                }
            }
        }
    }
</style>
