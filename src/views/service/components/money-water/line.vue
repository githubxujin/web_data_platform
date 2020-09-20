<template>
    <div class="wrap pt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form'>
            <el-form-item class='el-item-form-width'>
                <el-select v-model='params.industryType' clearable placeholder='行业类别' @change="changeIndustryType">
                    <el-option v-for='(s,index) in plateList' :label='s.label' :value='s.value' :key='index'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.source" placeholder="来源" clearable filterable allow-create @change="changeSource">
                    <el-option v-for="(item,index) in  sourceList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item style='width: 260px'>
                <el-select v-model="params.clientName" placeholder="企业名称" clearable filterable remote :remote-method="remoteClientName" @clear="remoteClientName" style='width: 260px' @change="onChangeTail">
                    <el-option v-for="(item,index) in clientNameList" :key="index" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.bankTailNo" placeholder="账户" clearable filterable allow-create>
                    <el-option v-for="(item,index) in  tailList" :key="index" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至'></el-date-picker>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="fastData" filterable placeholder="快速选择" clearable @change="fastChange" class='el-item-form-width'>
                    <el-option v-for="item in fastOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type='primary' size='medium' @click='getChart'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <div class="echart-big-wrap p-re ">
            <div class="echart-big-title num-left">企业流水分析</div>
            <div v-if="!isObjectEmpty(opt)">
                <chart height="490px" width="1320px" id="invoice2" style="margin-top:20px;" :option="opt" />

                <el-row type="flex" class="tag-box" style="right:0;">
                    <el-row type="flex" class="mr20">
                        <c-op v-for="(v, k) in tagList" :key="k" :class="{ act: tagCur === k }" @click.native="tagHand(k, v.value)">
                            {{ v.label }}</c-op>
                    </el-row>
                </el-row>
            </div>
            <div v-else>

                <not-found height="490px"></not-found>
            </div>

        </div>
    </div>
</template>
<script>
import steelLine from "@/views/infrastructure/config/steelLine.js"
import { plateList, deepClone } from "@/utils/common"
import Chart from "@/components/Charts/invoiceInvalid"
import cOp from "@/components/common/c-op.vue"
export default {
    components: {
        Chart,
        cOp,
        'not-found': () => import("@/components/Charts/not-fount.vue")
    },
    data () {
        return {
            opt: {},
            dateArr: [],
            params: {
                industryType: 1,
                bankTailNo: '',
                tradeDateStart: '',
                tradeDateEnd: '',
                type: 1,
                clientName: '深圳市皇悦建材有限公司',
                source: "",
            },
            plateList,
            fastData: 360,
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
            tagCur: 0,
            tagList: [
                {
                    value: 1,
                    label: "日"
                },
                {
                    value: 2,
                    label: "周"
                },
                {
                    value: 3,
                    label: "月"
                }
            ],
            clientNameList: [],
            tailList: [],
            sourceList: [
                {
                    label: '来源',
                    value: ''
                },
                {
                    label: '猫池',
                    value: 1
                },
                {
                    label: '二级账户',
                    value: 3
                },
            ],
        };
    },
    created () {
        this.fastChange(360)
        this.getChart()
        this.getClientName()
        this.getTail()
    },
    watch: {
        flag () {
            this.getChart()
        }
    },
    computed: {
        flag: {
            get () {
                return this.$store.state.echart.flag
            }
        }
    },
    methods: {
        //业务板块联动 //客户名称  //账户
        changeIndustryType () {
            this.params.clientName = ""
            this.params.source = ""
            this.params.bankTailNo = ""
            this.getTail()
            this.getClientName()
        },
        //客户名称联动账户
        onChangeTail () {
            this.params.bankTailNo = ""
            this.getTail()
        },
        //来源联动
        changeSource () {
            this.params.clientName = ""
            this.params.bankTailNo = ""
            this.getTail()
            this.getClientName()
        },
        //获取所有账户
        getTail () {
            let { clientName, industryType, source } = this.params
            this.ajax
                .json('/dcp/comm/sms/statistics/bank/tail/no/vague', { clientName, industryType, source }, { type: 'get' })
                .then(res => {
                    this.tailList = res.data
                });
        },
        //获取客户名称
        getClientName () {
            this.ajax
                .json('/dcp/comm/sms/statistics/client/name/vague', this.params, { type: 'get' })
                .then(res => {
                    this.clientNameList = res.data
                });
        },
        // 远程获取客户名称
        remoteClientName (name) {
            this.params.clientName = name
            this.ajax
                .json('/dcp/comm/sms/statistics/client/name/vague', this.params, { type: 'get' })
                .then(res => {
                    this.clientNameList = res.data
                });
        },
        reSet () {
            this.tagCur = 0
            this.params = {
                industryType: 1,
                bankTailNo: '',
                tradeDateStart: '',
                tradeDateEnd: '',
                type: 1,
                clientName: '深圳市皇悦建材有限公司',
            }
            this.fastData = 360
            this.fastChange(360)
            this.getChart()
        },
        getChart () {
            this.$emit('childParams', this.params)
            this.ajax
                .json('/dcp/comm/sms/statistics/trend', this.params)
                .then(res => {
                    if (res.data.length > 0) {
                        let lineData = deepClone(steelLine)
                        lineData.title.text = ''
                        lineData.yAxis.name = ''
                        lineData.xAxis.data = res.data.map(i => i.date)
                        lineData.series = [
                            {
                                name: '收入',
                                type: "line",
                                smooth: "true",
                                symbolSize: 2,
                                symbol: "circle",
                                data: res.data.map(i => i.incomeTotal)
                            },
                            {
                                name: '支出',
                                type: "line",
                                smooth: "true",
                                symbolSize: 2,
                                symbol: "circle",
                                data: res.data.map(i => i.payTotal)
                            },

                        ]

                        lineData.legend.data = [
                            { name: '收入' },
                            { name: '支出' },
                        ]

                        // 主题切换
                        if (this.flag === 'light') {
                            lineData.tooltip.backgroundColor = this.$medicine.tooltipBG
                            lineData.tooltip.borderWidth = 0;
                            lineData.tooltip.axisPointer.lineStyle.color.colorStops = this.$medicine.onmouseover
                            lineData.dataZoom[1].backgroundColor = this.$service.output.behavior.dataZoom[0]
                            lineData.dataZoom[1].fillerColor = this.$service.output.behavior.dataZoom[1]
                            lineData.color = this.$service.moneyWater.lineData
                            lineData.yAxis.axisLine = this.$medicine.axis
                            lineData.xAxis.axisLine = this.$medicine.axis
                            lineData.yAxis.splitLine = this.$medicine.axis

                            lineData.yAxis.axisLabel = lineData.xAxis.axisLabel = {
                                color: this.$medicine.nameColor,
                                fontFamily: 'PingFang-SC-Regular'
                            };
                            lineData.yAxis.nameTextStyle.color = this.$medicine.nameColor;
                            lineData.yAxis.nameTextStyle.fontFamily = 'PingFang-SC-Regular'
                            lineData.legend.textStyle.color = this.$medicine.nameColor;
                            lineData.legend.textStyle.fontFamily = 'PingFang-SC-Regular'
                        }

                        this.opt = lineData
                    } else {
                        this.opt = {}
                    }

                });
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.tradeDateStart = v[0];
                this.params.tradeDateEnd = v[1];
            } else {
                this.params.tradeDateStart = '';
                this.params.tradeDateEnd = '';
            }
        },
        tagHand (cur, value) {
            this.tagCur = cur
            this.params.type = value
            this.getChart()
        },
        fastChange (val) {
            const date = new Date();
            this.params.tradeDateEnd = this.formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.tradeDateStart = this.formatDate(startDate);
            this.dateArr = [this.params.tradeDateStart, this.params.tradeDateEnd];
        },

    }
};
</script>
<style lang="scss" scoped>
.light {
    .wrap {
        height: 646px;
        background: #fff;
    }
    .p-re {
        position: relative;
    }
    .tag-box {
        position: absolute;
        top: 30px;
        right: 54px;
    }
    .num-left {
        top: -20px;
        // width: 500px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        color: #333;
        letter-spacing: 1.5px;
    }
}
.dark {
    .wrap {
        height: 646px;
        background: #232528;
    }
    .p-re {
        position: relative;
    }
    .tag-box {
        position: absolute;
        top: 30px;
        right: 54px;
    }
    .num-left {
        top: -20px;
        // width: 500px;
        text-align: left;
        padding-left: 30px;
        font-size: 18px;
        color: #ffffff;
        letter-spacing: 1.5px;
    }
}
</style>