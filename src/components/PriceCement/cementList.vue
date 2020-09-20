<template>
    <div>
        <c-box type="search" class="mt-36">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label="日期">
                    <el-date-picker v-model="params.startDate" type="date" value-format="yyyy-MM-dd"
                        placeholder="选择开始日期" style="width:150px">
                    </el-date-picker>
                    <span class="pl5 pr5 fc-b">至</span>
                    <el-date-picker v-model="params.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"
                        style="width:150px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="代码定额">
                    <el-input clearable v-model="params.code" maxlength="100" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="材料名称">
                    <el-input clearable v-model="params.materialName" maxlength="100" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="params.current= 1, getList()">查询</el-button>
                    <el-button type="blue" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>
        <el-button class="el-upload" plain icon="el-icon-upload2" size="small" @click="exportData">导出</el-button>
        <el-table :data="list" border class="mt-36">
            <el-table-column type="index" label="序号" show-overflow-tooltip width="100" align="center"></el-table-column>
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
            <el-table-column prop="zhanjiang" label="湛江市" show-overflow-tooltip width="70" align="right">
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.zhanjiang |  numFormat}}
                    </div>
                </template>
            </el-table-column>

        </el-table>
        <div class='page-nav'>
            <el-pagination :page-sizes="[20,50,100]" :page-size="params.size" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total"
                v-if="total>0">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import cBox from "@/components/common/c-box";
export default {
    components: {
        cBox
    },
    data() {
        return {
            params: {
                current: 1,
                size: 20,
                startDate: "",
                endDate: "",
                code: "",
                materialName: ""
            },
            list: [],
            total: 0
        };
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            this.$http("/dcp/price/cement/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 20,
                startDate: "",
                endDate: "",
                code: "",
                materialName: ""
            };
            this.getList();
        },
        handleCurrentChange(val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.params.size = val;
            this.getList();
        },
        async exportData() {
            await this.$http("/dcp/price/cement/info/export", this.params, {
                type: "export"
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.mt-36 {
    margin-top: 36px;
}
</style>