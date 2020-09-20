<template>
    <div class="table-wrap mt20">
        <div class="table-title">水泥-价格数据-地方指导价</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-input v-model="params.code" placeholder="代码定额"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.materialName" placeholder="材料名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="value1" type="monthrange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>

        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list" class="mt-36">
            <el-table-column type="index" label="序号" show-overflow-tooltip width="70" align="center"></el-table-column>
            <el-table-column prop="releaseDate" label="月份" show-overflow-tooltip width="100">
            </el-table-column>
            <el-table-column prop="materialName" label="材料名称" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="code" label="定额代码" show-overflow-tooltip min-width="100"></el-table-column>
            <el-table-column prop="unit" label="单位" show-overflow-tooltip width="70" align="center"></el-table-column>
            <el-table-column prop="basePrice" label="基价" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.basePrice |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="guangzhou" label="广州市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.guangzhou|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="foshan" label="佛山市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.foshan |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zhaoqing" label="肇庆市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.zhaoqing|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="jiangmen" label="江门市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.jiangmen |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zhongshan" label="中山市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.zhongshan |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zhuhai" label="珠海市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.zhuhai |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="shenzhen" label="深圳市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.shenzhen |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="dongguan" label="东莞市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.dongguan |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="huizhou" label="惠州市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.huizhou|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="meizhou" label="梅州市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.meizhou |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="shaoguan" label="韶关市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.shaoguan |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="qingyuan" label="清远市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.qingyuan|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="shanwei" label="汕尾市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.shanwei|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="jieyang" label="揭阳市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.jieyang |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="chaozhou" label="潮州市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.chaozhou |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="yunfu" label="云浮市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.yunfu|  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="yangjiang" label="阳江市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.yangjiang |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="maoming" label="茂名市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.maoming |  numFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zhanjiang" label="湛江市" show-overflow-tooltip width="70" align="right" fixed="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.zhanjiang |  numFormat}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20,50,100]" :current-page.sync="params.current" :page-size="params.size" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0">
        </el-pagination>
    </div>
</template>

<style lang="scss">
</style>

<script>
export default {
    data () {
        return {
            params: {
                current: 1,
                size: 10,
                startDate: "",
                code: "",
                materialName: ""
            },
            value1: [],
            list: [],
            total: 0
        };
    },
    created () {
        this.getList();
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = "";
                this.params.startDate = "";
            }
        },
        getList () {
            this.$http("/dcp/price/cement/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                startDate: "",
                endDate: "",
                code: "",
                materialName: ""
            };
            this.value1 = [];
            this.getList();
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        async exportData () {
            await this.$http("/dcp/price/cement/info/export", this.params, {
                type: "export"
            });
        }
    }
};
</script>

