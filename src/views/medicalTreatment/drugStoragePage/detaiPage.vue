<template>
    <div class="table-wrap">
        <el-form :inline="true" size="medium">
            <el-form-item>
                <el-input v-model.trim="params.key" placeholder="药品名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.drugType" placeholder="产品类别" clearable>
                    <el-option label="辅料" value="辅料"></el-option>
                    <el-option label="化学药品" value="化学药品"></el-option>
                    <el-option label="生物制品" value="生物制品"></el-option>
                    <el-option label="中药" value="中药"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.medicineInsuranceType" placeholder="医保类别" clearable>
                    <el-option label='甲' value='甲'></el-option>
                    <el-option label='乙' value='乙'></el-option>
                    <el-option label='非医保' value='非医保'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.drugDosageform" placeholder="剂型" clearable>
                    <el-option v-for="(v,i) in dosageList" :key="i" :label='v' :value='v'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.quantityPurchase" placeholder="带量采购" clearable multiple collapse-tags>
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item>
                <el-select v-model='params.keyMonitor' multiple collapse-tags clearable placeholder="重点监控">
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-select v-model="params.basicDrug" placeholder="基本药物" clearable multiple collapse-tags>
                    <el-option v-for="(v,i) in city" :key="i" :label='v.name' :value='v.name'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.imitationDrug" placeholder="仿评药" clearable>
                    <el-option label="是" value='是'></el-option>
                    <el-option label="否" value='否'></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="params.current=1,initData()">查询</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
            <el-row class='el-iconfont'>
                <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                    <i class='iconfont icon-shujuzhongxin-daochu' @click="exportData"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="表头设置" placement="top">
                    <span class="iconfont icon-shujuzhongxin-shezhi" @click="setTable"></span>
                </el-tooltip>
            </el-row>
        </el-form>
        <!-- 表格 -->
        <el-table :data="list" style="width: 100%">
            <el-table-column type="index" label="序号" width="50" align="center" :formatter="formatLabel" show-overflow-tooltip></el-table-column>
            <el-table-column v-for='(item,index) in tableArr' :width="item.width?item.width:''" :label="item.title" align="left" :prop='item.propName' show-overflow-tooltip :key="index" :formatter="formatLabel">
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onDetail(scope.row)" plain>详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination :page-sizes='[10,20, 50, 100]' @size-change="handleSizeChange" :page-size.sync='params.size' :current-page.sync='params.current' @current-change='initData'
            layout='total, sizes, prev, pager, next, jumper' :total='total' v-if='total > 0'>
        </el-pagination>
        <tableItemSet ref="tableItemSet" @setOK="setSuccess"></tableItemSet>
    </div>
</template>
<script>
import city from "@/views/infrastructure/config/city.js";
import tableItemSet from "@/components/tableItemSet";
export default {
    data () {
        return {
            tableArr: [],
            // 默认显示的字段  贾路其写的 看不懂不能改
            defaultKeys: [
                "drugName",
                "drugType",
                "drugEnglishName",
                "drugCode",
                "medicineInsuranceType",
                "medicineInsuranceRange",
                "drugSpec",
                "drugDosageform",
                "quantityPurchase",
                "keyMonitor",
                "basicDrug",
                "imitationDrug",
                "approveDate",
                "approveNumber",
                "orgApproveNumber",
                "manufacture",
                "productionAddress",
                "productionCountry",
                "marketTypeNum",
                "topFive",
            ],
            allTableArr: [
                {
                    'title': '药品名称',
                    'propName': 'drugName',
                },
                {
                    'title': '产品类别',
                    'propName': 'drugType',
                },
                {
                    'title': '英文名称',
                    'propName': 'drugEnglishName',
                },
                {
                    'title': '药品本位码',
                    'propName': 'drugCode',
                    width: '100'
                },
                {
                    'title': '医保类别',
                    'propName': 'medicineInsuranceType',
                },
                {
                    'title': '医保范围',
                    'propName': 'medicineInsuranceRange',
                },
                {
                    'title': '药品规格',
                    'propName': 'drugSpec',
                },
                {
                    'title': '剂型',
                    'propName': 'drugDosageform',
                },
                {
                    'title': '带量采购',
                    'propName': 'quantityPurchase',
                },
                {
                    'title': '重点监控',
                    'propName': 'keyMonitor',
                },
                {
                    'title': '基本药物',
                    'propName': 'basicDrug',
                },
                {
                    'title': '仿评药',
                    'propName': 'imitationDrug',
                },
                {
                    'title': '批准日期',
                    'propName': 'approveDate',
                },
                {
                    'title': '批准文号',
                    'propName': 'approveNumber',
                },
                {
                    'title': '原批准文号',
                    'propName': 'orgApproveNumber',
                    width: '100'
                },
                {
                    'title': '生产单位',
                    'propName': 'manufacture',
                },
                {
                    'title': '生产地址',
                    'propName': 'productionAddress',
                },
                {
                    'title': '生产国家',
                    'propName': 'productionCountry',
                },
                {
                    'title': '已上市品种数量',
                    'propName': 'marketTypeNum',
                    'width': 200
                },
                {
                    'title': '市占率前5药企(%)',
                    'propName': 'topFive',
                    'width': 200
                },
            ],
            city,
            row: {}, // 当前数据
            list: [],
            total: 0,
            dosageList: [],
            params: {
                current: 1,
                size: 10,
                registerType: '',
                sellerName: '',
                buyerName: '',
                dealType: '',
                registerStatus: '',
            },
        }
    },
    components: {
        tableItemSet,
    },
    created () {
        this.getSelect();
        this.getColumn();
        this.searchRecord();
    },
    methods: {
        // 获取表头设置 贾路其写的 看不懂不能改
        getColumn () {
            this.$http("/dcp/query/drug/column", {}, { type: "get" }).then(
                res => {
                    this.defaultKeys = res.data || this.defaultKeys;
                    this.tableArr = this.allTableArr.filter(i => {
                        return this.defaultKeys.includes(i.propName);
                    });
                }
            );
        },
        // 表头设置 贾路其写的 看不懂不敢改 --------------------------------------------------------------------------
        setTable () {
            this.$refs.tableItemSet.newItemDialog = true;
            this.$refs.tableItemSet.checkboxGroup1 = this.tableArr.map(
                i => i.propName
            );
            this.$refs.tableItemSet.tableArr = this.allTableArr;
        },
        setSuccess (val) { //贾路其写的 看不懂不敢改
            this.$refs.tableItemSet.newItemDialog = false;
            if (val.length === 0) {
                this.tableArr = this.allTableArr;
            } else {
                this.tableArr = this.allTableArr.filter(i => {
                    return val.includes(i.propName);
                });
            }
            this.$http(
                "/dcp/drug/column/update",
                { column: val },
                { type: "formData" }
            ).then(res => {
                this.$message.success("设置成功");
            });
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name];
            }
            this.initData();
        },
        // 获取列表
        async initData () {
            this.$params[this.$route.name] = this.params;
            this.$http(
                '/dcp/drug/page/list',
                this.params,
            ).then(res => {
                if (res.code === '200') {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            });
        },
        async getSelect () {
            this.$http("/dcp/drug/dosage/form/list", {}, { type: "get" }).then(
                res => {
                    if (res.code === '200') {
                        this.dosageList = res.data;
                    }
                }
            );
        },
        // 重置
        reset () {
            this.params = {
                registerType: '',
                sellerName: '',
                buyerName: '',
                dealType: '',
                registerStatus: '',
                current: 1,
                size: 10,
            }
            this.initData();
        },
        // 详情跳转
        onDetail (row) {
            this.$router.push({
                path: '/drugStorage/details',
                query: {
                    detail: JSON.stringify(row)
                }
            })
        },
        handleSizeChange (v) {
            this.params.size = v
            this.initData()
        },
        exportData () {
            this.$http('/dcp/export/drug/data', this.params, { type: 'export' })
        }
    },
}
</script>

<style lang="less" scoped>
</style>