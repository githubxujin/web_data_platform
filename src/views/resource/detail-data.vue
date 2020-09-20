<template>
    <div class="stat">
        <div>
            <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="统计概况" name="first">
                    <n-line v-if="activeName === 'first'" />
                </el-tab-pane>
                <el-tab-pane label="数据明细" name="second">
                    <div v-if="activeName === 'second'" class="table-wrap">
                        <el-form :inline="true" ref="form" size="medium">
                            <el-form-item class="w200">
                                <el-select v-model="params.tenderCompany" filterable clearable placeholder="招标单位">
                                    <el-option v-for="(v,i) in tenderCompany" :key="i" :label="v" :value="v"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="w200">
                                <el-cascader v-model="value" :options="city" placeholder="项目所在地" clearable :props="{ expandTrigger: 'hover', checkStrictly: true,multiple: false   }" @change="handleChange"></el-cascader>
                            </el-form-item>
                            <el-form-item class="w200">
                                <el-select v-model="params.projectType" clearable placeholder="项目类型">
                                    <el-option label="其它" value="0"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item class="w200">
                                <el-input v-model="params.tenderMaterial" clearable placeholder="招标材料"></el-input>
                            </el-form-item>
                            <el-form-item class="w200">
                                <el-input v-model="params.bidderCompany" clearable placeholder="中标单位"></el-input>
                            </el-form-item>
                            <el-form-item class="w200">
                                <el-input v-model="params.projectName" clearable placeholder="项目名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker v-model="value1" type="daterange" @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="中标日期开始" end-placeholder="中标日期结束"></el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                                <el-button type="info" @click="reSet">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <el-table :data="list" class="tab-info" @cell-dblclick="this.onDbClick">
                            <el-table-column type="index" label="序号" width="70" align="center" fixed="left"></el-table-column>
                            <el-table-column prop="bidDate" label="中标日期" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="projectName" label="项目名称" width="300" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="projectType" label="项目类型" width="100" show-overflow-tooltip>
                                <template slot-scope="scope">{{ scope.row.projectType === "0" ? "其它" : "-"}}</template>
                            </el-table-column>
                            <el-table-column prop="projectProvince" label="项目地-省" width="100" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="projectCity" label="项目地-市/区" width="120" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="tenderCompany" label="招标单位" width="250" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="bidderCompany" label="中标单位" width="250" show-overflow-tooltip></el-table-column>
                            <el-table-column prop label="操作" align="center" width="100" fixed="right">
                                <template slot-scope="item">
                                    <el-button v-if="$route.name === 'resource-petroleum'" type="primary" plain @click="$router.push('/resource/sy-winning-detail/' + item.row.id)">详情</el-button>
                                    <el-button v-else-if="$route.name === 'resource-petrifaction'" type="primary" plain @click="$router.push('/resource/sh-winning-detail/' + item.row.id)">详情</el-button>
                                    <el-button v-else type="primary" plain @click="$router.push('/resource/hy-winning-detail/' + item.row.id)">详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                            layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import city from "@/views/industryTrade/config/city1.js";
import nLine from "@/components/Charts/Line.vue";
export default {
    components: {
        nLine
    },
    data () {
        return {
            // activeName: 'first',
            total: 0,
            city,
            value: [],
            value1: [],
            params: {
                current: 1,
                size: 10,
                projectProvince: "", // 项目省份
                projectCity: "", // 项目市区
                tenderMaterial: "", // 招标材料
                bidderCompany: "", // 中标单位
                tenderCompany: "", // 招标单位
                projectType: "", // 类型
                projectName: "", // 项目名称
                startDate: "", // 开始日期 2020-03-26
                endDate: "" // 结束日期 2020-03-26
            },
            tenderCompany: [],
            list: []
        };
    },
    computed: {
        activeName: {
            get () {
                return this.$store.state.tabs.activeName;
            },
            set () { }
        }
    },
    created () {
        this.searchRecord();
        this.getTenderCompany();
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.getList();
        },
        handleClick (tabs) {
            this.$store.commit("tabs/SET_TABS", tabs.name);
        },
        getList (v) {
            if (v) {
                this.params.current = v;
            }
            this.$params[this.$route.name] = this.params;
            if (this.$route.name === "resource-petroleum") {
                // 中石油
                this.$http("/dcp/cnpc/bid/record/page/list", this.params).then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
            } else if (this.$route.name === "resource-petrifaction") {
                // 中石化
                this.$http("/dcp/sinopec/bid/record/page/list", this.params).then(
                    res => {
                        this.list = res.data.records;
                        this.total = res.data.total;
                    }
                );
            } else {
                // 中海油
                this.$http("/dcp/cnooc/bid/record/page/list", this.params).then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
            }
        },
        getTenderCompany () {
            if (this.$route.name === "resource-petroleum") {
                // 中石油
                this.$http("/dcp/cnpc/tender/company/list", {}, { type: "get" }).then(
                    res => {
                        this.tenderCompany = res.data;
                    }
                );
            } else if (this.$route.name === "resource-petrifaction") {
                // 中石化
                this.$http(
                    "/dcp/sinopec/tender/company/list",
                    {},
                    { type: "get" }
                ).then(res => {
                    this.tenderCompany = res.data;
                });
            } else {
                // 中海油
                this.$http("/dcp/cnooc/tender/company/list", {}, { type: "get" }).then(
                    res => {
                        this.tenderCompany = res.data;
                    }
                );
            }
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startDate = v[0];
                this.params.endDate = v[1];
            } else {
                this.params.startDate = "";
                this.params.endDate = "";
            }
        },
        // 省市
        handleChange (v) {
            if (v && v.length > 0) {
                this.params.projectProvince = v[0]
                this.params.projectCity = v[1]
            } else {
                this.params.projectProvince = ''
                this.params.projectCity = ''
            }
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                projectProvince: "", // 项目省份
                projectCity: "", // 项目市区
                tenderMaterial: "", // 招标材料
                bidderCompany: "", // 中标单位
                tenderCompany: "", // 招标单位
                projectType: "", // 类型
                projectName: "", // 项目名称
                startDate: "", // 开始日期 2020-03-26
                endDate: "" // 结束日期 2020-03-26
            };
            this.value = [];
            this.value1 = [];
            this.getList();
        },
        handleSizeChange (v) {
            this.params.size = v;
            this.getList();
        }
    },
    watch: {
        $route (to, from) {
            this.getList();
            this.getTenderCompany();
            this.reSet();
        }
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>
