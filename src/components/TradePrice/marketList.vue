<template>
    <div>
        <c-box type="search" class="mt-36">
            <template slot="title">搜索条件</template>
            <el-form :inline='true' ref='form' size='mini' class="data-left">
                <el-form-item label="城市">
                    <el-select placeholder="请选择" v-model="params.city" clearable style="width:180px;" filterable>
                        <el-option v-for="(item, index) in citysJson" :key="index" :value="item.name"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品名">
                    <el-select placeholder="请选择" v-model="params.productName" clearable style="width:180px;" filterable>
                        <el-option v-for="(item, index) in productNameJson" :key="index" :value="item.name"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="材质">
                    <el-select placeholder="请选择" v-model="params.material" clearable style="width:180px;" filterable>
                        <el-option v-for="(item, index) in materialJson" :key="index" :value="item.name"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规格">
                    <el-select placeholder="请选择" v-model="params.standard" clearable style="width:180px;" filterable>
                        <el-option v-for="(item, index) in specJson" :key="index" :value="item.name" :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产地">
                    <el-select placeholder="请选择" v-model="params.producingArea" clearable style="width:180px;"
                        filterable>
                        <el-option v-for="(item, index) in placeJson" :key="index" :value="item.name"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker v-model="params.startDate" type="date" value-format="yyyy-MM-dd"
                        placeholder="选择开始日期" style="width:150px">
                    </el-date-picker>
                    <span class="pl5 pr5 fc-b">至</span>
                    <el-date-picker v-model="params.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择结束日期"
                        style="width:150px" filterable>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" plain @click="params.current= 1, getList()">查询</el-button>
                    <el-button type="blue" plain @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
        </c-box>
        <!-- <el-button class="el-upload" plain icon="el-icon-upload2" size="small">导出</el-button> -->
        <div class="mt20">
            <el-table :data="list">
                <el-table-column prop="date" label align="center">
                    <el-table-column prop="publishDate" label="日期" width="150" align="center"></el-table-column>
                    <el-table-column prop="city" label="城市" align="left"></el-table-column>
                    <el-table-column prop="productName" label="品名" align="left"></el-table-column>
                    <el-table-column prop="material" label="材质" align="left"></el-table-column>
                    <el-table-column prop="standard" label="规格" align="left"></el-table-column>
                    <el-table-column prop="producingAreaMySteels" label="产地" align="left"></el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="我的钢铁网" align="center">
                    <el-table-column prop="priceMySteels" label="价格" align="right">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ scope.row.priceMySteels | numFormat }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="relativetoYesterdayMySteels" label="比昨日" align="center">
                        <template slot-scope="scope">
                            <div v-html="scope.row.relativetoYesterdayMySteels"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remarkMySteels" label="备注" width="60" align="left">
                        <template slot-scope="scope" v-if="scope.row.remarkMySteels">
                            <el-popover trigger="hover" placement="bottom">
                                <p>{{ scope.row.remarkMySteels }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <i class="el-icon-tickets" style="color: #0076ff"></i>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="date" label="兰格网" align="center">
                    <el-table-column prop="priceLange" label="价格">
                        <template slot-scope='scope'>
                            <div class="el-price">
                                {{ scope.row.priceLange | numFormat }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="relativetoYesterdayLange" label="比昨日">
                        <template slot-scope="scope">
                            <div v-html="scope.row.relativetoYesterdayLange"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remarkLange" label="备注" width="60" align="center">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="bottom">
                                <p>{{ scope.row.remarkLange }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <i class="el-icon-tickets" style="color: #0076ff"></i>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class='page-nav'>
                <el-pagination :page-sizes="[20,50,100]" :page-size="params.size" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"
                    :total="total" v-if="total>0">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import cBox from "@/components/common/c-box";
import {
    citysJson,
    productNameJson,
    specJson,
    materialJson,
    placeJson
} from "@/utils/json";
export default {
    components: {
        cBox
    },
    data() {
        return {
            citysJson,
            productNameJson,
            specJson,
            materialJson,
            placeJson,
            params: {
                current: 1,
                size: 20,
                city: "",
                productName: "",
                standard: "",
                material: "",
                producingArea: "",
                collected: "",
                startDate: "",
                endDate: ""
            },
            list: [],
            total: 0
        };
    },
    methods: {
        getList() {
            this.$http("/dcp/price/steel/page/list", this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        reSet() {
            this.params = {
                current: 1,
                size: 20,
                city: "",
                productName: "",
                standard: "",
                material: "",
                producingArea: "",
                collected: "",
                startDate: "",
                endDate: ""
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
        }
    }
};
</script>
<style lang="scss" scope>
/deep/ .el-popover {
    padding: 0;
}
</style>