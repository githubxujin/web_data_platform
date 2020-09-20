<template>
    <div>
        <c-box type="search" class="mt-36">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label="来源">
                    <el-select placeholder="请选择" v-model="params.source" clearable style="width:240px;">
                        <el-option label="广东省交通运输工程造价事务中心" value="1"></el-option>
                        <el-option label="广州市住房和城乡建设局" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker v-model="params.startTime" type="date" value-format="yyyy-MM-dd"
                        placeholder="选择开始日期" style="width:150px">
                    </el-date-picker>
                    <span class="pl5 pr5 fc-b">至</span>
                    <el-date-picker v-model="params.endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"
                        style="width:150px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="材料编码">
                    <el-input clearable v-model="params.code" maxlength="100" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="材料名称">
                    <el-input clearable v-model="params.materialName" maxlength="100" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="规格型号">
                    <el-input clearable v-model="params.specificationModel" maxlength="100" placeholder="请输入">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="params.current= 1, getList()">查询</el-button>
                    <el-button type="blue" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>
        <el-button class="el-upload" plain icon="el-icon-upload2" size="small" @click="exportData">导出</el-button>

        <el-table :data="list" border class="mt-36">
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
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
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
                source: "", //来源(1广东省交通运输工程造价事务中心: 2:广州市住房和城乡建设局)
                code: "", //材料编码
                materialName: "", //材料名称
                specificationModel: "", //规格型号
                startTime: "", //开始时间
                endTime: "" //结束时间
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
            this.$http("/dcp/price/info/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 20,
                source: "", //来源(1广东省交通运输工程造价事务中心: 2:广州市住房和城乡建设局)
                code: "", //材料编码
                materialName: "", //材料名称
                specificationModel: "", //规格型号
                startTime: "", //开始时间
                endTime: "" //结束时间
            };
            this.getList();
        },
        async exportData() {
            await this.$http("/dcp/price/info/export", this.params, {
                type: "export"
            });
        },
        handleCurrentChange(val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.params.size = val;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scope>
</style>