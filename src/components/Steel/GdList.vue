<template>
    <div class="pt20">
        <div class="table-title">钢材-价格数据-地方指导价</div>
        <el-form :inline='true' ref='form'>
            <el-form-item class="el-item-form-width ">
                <el-select placeholder="来源" v-model="params.source" clearable>
                    <el-option label="广东省交通运输工程造价事务中心" value="1"></el-option>
                    <el-option label="广州市住房和城乡建设局" value="2"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="el-item-form-width ">
                <el-input clearable v-model="params.code" maxlength="100" placeholder="材料编码">
                </el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-input clearable v-model="params.materialName" maxlength="100" placeholder="材料名称"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width ">
                <el-input clearable v-model="params.specificationModel" maxlength="100" placeholder="规格型号">
                </el-input>
            </el-form-item>
            <el-form-item class="el-item-date-width ">
                <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="params.current= 1, getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>

        <el-table :data="list">
            <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
            <el-table-column prop="source" label="来源" show-overflow-tooltip width="250">
                <template slot-scope="item">
                    {{ item.row.source === 1 ? '广东省交通运输工程造价事务中心' : '广州市住房和城乡建设局'}}
                </template>
            </el-table-column>
            <el-table-column prop="code" label="材料编码/定额代码" show-overflow-tooltip width="150"></el-table-column>
            <el-table-column prop="materialName" label="材料名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="spec" label="规格型号" width="300" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unit" label="单位" width="60" show-overflow-tooltip></el-table-column>
            <el-table-column prop="basePrice" label="基价" show-overflow-tooltip>
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.basePrice | numFormat }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="infoPrice" label="信息价(不含税)/税前综合价" width="200" show-overflow-tooltip>
                <template slot-scope='scope'>
                    <div class="el-price">
                        {{ scope.row.infoPrice | numFormat }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="releaseDate" label="日期" align="center" width="200"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center" fixed="right"></el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20,50,100]" :page-size="params.size" @size-change="handleSizeChange" :current-page.sync="params.current" @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0">
        </el-pagination>

    </div>
</template>
<style lang="scss" scoped>
.el-icon {
    margin-bottom: 20px;
    [class*=' el-icon-'],
    [class^='el-icon-'] {
        color: #366f71;
        font-size: 18px;
        border: 1px solid #366f71;
        padding: 6px;
        margin-right: 10px;
        border-radius: 2px;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
<script>
export default {
    data () {
        return {
            params: {
                current: 1,
                size: 10,
                source: "", //来源(1广东省交通运输工程造价事务中心: 2:广州市住房和城乡建设局)
                code: "", //材料编码
                materialName: "", //材料名称
                specificationModel: "", //规格型号
                startTime: "", //开始时间
                endTime: "" //结束时间
            },
            condition: "",
            list: [],
            total: 0,
            tableData: [],
            value1: []
        };
    },
    created () {
        this.getList();
    },
    methods: {
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startTime = v[0];
                this.params.endTime = v[1];
            } else {
                this.params.startTime = "";
                this.params.endTime = "";
            }
        },
        getList () {
            this.$http("/dcp/price/info/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                source: "", //来源(1广东省交通运输工程造价事务中心: 2:广州市住房和城乡建设局)
                code: "", //材料编码
                materialName: "", //材料名称
                specificationModel: "", //规格型号
                startTime: "", //开始时间
                endTime: "" //结束时间
            };
            this.value1 = [];
            this.getList();
        },
        async exportData () {
            await this.$http("/dcp/price/info/export", this.params, {
                type: "export"
            });
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        }
    }
};
</script>
