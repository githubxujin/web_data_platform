<template>
    <div class="table-wrap">
        <el-form :inline="true" ref="form" size="medium" class="search-form">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.licenseCode" clearable placeholder="统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.customerName" clearable placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.regAddress" clearable filterable style="width: 132px" placeholder="企业注册地">
                    <el-option v-for="(v,i) in city" :key="i" :label="v.name" :value="v.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="licenseCode" label="统一社会信用社代码" width="180" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="customerName" label="企业名称" min-width="220" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="coreCustomerName" label="所属集团" min-width="80" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="lawPerson" label="法人" width="100" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="regAddress" label="企业注册地" width="200" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="remark" label="备注" width="200" show-overflow-tooltip align="left"></el-table-column>
            <el-table-column prop="remark" label="操作" width="100" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain @click="toDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
    </div>
</template>
<script>
import city from "@/views/infrastructure/config/city.js";
export default {
    data () {
        return {
            city,
            list: [],
            params: {
                current: 1,
                size: 10,
                customerName: "",
                coreCustomerName: "",
                licenseCode: "",
                regAddress: ""
            },
            total: 0
        };
    },
    created () {
        this.searchRecord();
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }

            this.getList();
        },

        toDetail (row) {
            this.$router.push({
                name: "staff-list",
                params: {
                    customerCode: row.customerCode,
                    customerName: row.customerName
                }
            });
        },
        getList () {
            this.$params[this.$route.name] = this.params;
            this.$http("/dcp/customer/list", this.params, {
                type: "formdata"
            }).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        handleCurrentChange (val) {
            this.params.current = val;
            this.getList();
        },
        handleSizeChange (val) {
            this.params.size = val;
            this.getList();
        },
        reSet () {
            this.params = {
                current: 1,
                size: 20,
                customerName: "",
                coreCustomerName: "",
                licenseCode: "",
                regAddress: ""
            };
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
</style>

