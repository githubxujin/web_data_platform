<template>
    <div class="pt20">
        <div class="el-title mb20">企业名单</div>
        <!-- 查询 -->
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width' v-if="hideEdit()">
                <el-select v-model="params.industryCategory" clearable placeholder="行业类别" @change="getCompanyTypeList">
                    <el-option v-for="(s, index) in plateList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerType" clearable placeholder="企业类别" @change="customerTypeChagne">
                    <el-option v-for="(s, index) in companyTypeList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerName" clearable placeholder="企业名称" allow-create filterable>
                    <el-option v-for="(s, index) in customerList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.grade" clearable @change="gradeChange(params.grade)" placeholder="等级">
                    <el-option v-for="(s, index) in gradeList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.listType" clearable placeholder="名单类型">
                    <el-option v-for="(s, index) in listType" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.status" clearable placeholder="审核状态">
                    <el-option v-for="(s, index) in auditList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.province" clearable placeholder="所在省份" @change="changeGetCity">
                    <el-option v-for="(s, index) in proviceList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.city" clearable placeholder="所在城市">
                    <el-option v-for="(s, index) in cityList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet('form')">重置</el-button>
            </el-form-item>
        </el-form>
        <!-- 新增等 -->
        <el-row class="el-iconfont" v-if="hideEdit()">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
        </el-row>
        <!-- 表单 -->
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="customerName" label="企业名称" width="250" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column label="行业类别" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{ scope.row.industryCategory | jobCategory}}
                </template>
            </el-table-column>
            <el-table-column prop="customerType" label="企业类别" show-overflow-tooltif:formatter="formatLabel">
                <template slot-scope="scope">
                    {{scope.row.customerType }}
                </template>
            </el-table-column>
            <el-table-column label="名单类型" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{ scope.row.listType | nameType}}
                </template>
            </el-table-column>
            <el-table-column prop="grade" label="等级" width="80" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{ scope.row.grade | gradeCategory}}
                </template>
            </el-table-column>
            <el-table-column prop="parentUnit" label="上级单位" width="180" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column label="审核状态" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tag type="info" v-if="scope.row.status===0">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="success" v-else-if="scope.row.status===1">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status===2">{{auditList[scope.row.status].label}}</el-tag>
                    <el-tag type="danger" v-else-if="scope.row.status===3">{{auditList[scope.row.status].label}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="province" label="所在省份" show-overflow-tooltip :formatter="formatLabel" width="100"></el-table-column>
            <el-table-column prop="city" label="所在城市" show-overflow-tooltip :formatter="formatLabel" width="100"></el-table-column>
            <el-table-column prop="remark" label="申请原因" show-overflow-tooltip :formatter="formatLabel" width="200"></el-table-column>
            <el-table-column prop="updatedAt" label="操作时间" width="180" :formatter="formatLabel"></el-table-column>
            <el-table-column prop="updatedByDesc" label="操作人" width="180" :formatter="formatLabel"></el-table-column>
            <el-table-column prop label="操作" :width="hideEdit()?'130':'100'" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row)" :disabled="scope.row.status===2" v-if="hideEdit()">编辑</el-button>
                    <el-button plain size="mini" type="primary" @click="detail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
        <add-customer :dialogVisible="dialogVisible" ref="customer" v-if="dialogVisible" />
    </div>
</template>

<script>
import { plateList, gradeList, listType, auditList, companyTypeList, companyTypeObj } from "@/utils/common"
// eslint-disable-next-line no-unused-vars
let that
export default {
    components: {
        addCustomer: () => import('./add-customer.vue'),
    },
    data () {
        return {
            proviceList: [],
            cityList: [],
            companyTypeList,
            plateList,
            gradeList,
            customerList: [],
            listType,
            auditList,
            list: [],
            isDialog: true,
            params: {
                customerType: '',
                industryCategory: '',
                grade: [],
                customerName: '',
                listType: '',
                province: '',
                city: '',
                status: '',
                current: 1,
                size: 10
            },
            total: 0,
            id: "",
            dialogVisible: false,
            isEdit: 1,
            btnState: ['dc-primary', 'dc-success', 'dc-danger', 'dc-danger'],
        }
    },
    beforeCreate: function () {
        that = this;
    },
    watch: {
        $route () {
            that.getList();
            that.getProvince()
            that.getCustomerList()

            this.industryCategoryDefault(this.$route.name)
        }
    },

    created () {
        that.getList();
        that.getProvince()
        that.getCustomerList()

        this.industryCategoryDefault(this.$route.name)
    },
    methods: {
        customerTypeChagne (customerType) {
            this.ajax
                .json('/dcp/antiFraud/customer/list', { customerType, industryCategory: this.params.industryCategory }, { type: 'get' })
                .then(res => {
                    this.customerList = res.data
                })
        },
        customerTypeDefault (industryCategory) {
            this.ajax
                .json('/dcp/antiFraud/customer/list', { customerType: this.params.customerType, industryCategory }, { type: 'get' })
                .then(res => {
                    this.customerList = res.data
                })
        },
        // 基建工程/医药医疗/能源化工 -- 默认的industryCategory值
        industryCategoryDefault (name) {
            if (name === 'view-construction/black-white') {
                this.params.industryCategory = 1
                this.companyTypeList = companyTypeObj[this.params.industryCategory]
                this.customerTypeDefault(this.params.industryCategory)
            }
            else if (name === 'view-medicine/black-white') {
                this.params.industryCategory = 2
                this.companyTypeList = companyTypeObj[this.params.industryCategory]
                this.customerTypeDefault(this.params.industryCategory)
            }
            else if (name === 'view-energy/black-white') {
                this.params.industryCategory = 3
                this.companyTypeList = companyTypeObj[this.params.industryCategory]
                this.customerTypeDefault(this.params.industryCategory)
            }
        },
        // 基建工程/医药医疗/能源化工 -- 不需要的隐藏
        hideEdit () {
            let name = this.$route.name
            if (name === 'view-construction/black-white' || name === 'view-medicine/black-white' || name === 'view-energy/black-white') {
                return false
            } else {
                return true
            }
        },
        //获取省
        getProvince () {
            let { industryCategory } = this.params
            this.ajax
                .json('/dcp/antiFraud/customer/province/list', { industryCategory })
                .then(res => {
                    let { data = [] } = res
                    this.proviceList = data
                });
        },
        //省联动获取市
        changeGetCity (val) {
            let { industryCategory } = this.params
            this.ajax
                .json('/dcp/antiFraud/customer/city/list', { province: val, industryCategory })
                .then(res => {
                    let { data = [] } = res
                    this.cityList = data
                });
        },
        //获取企业类别
        getCompanyTypeList (val) {
            this.params.customerType = ''
            this.companyTypeList = companyTypeObj[val]
            this.getProvince()

            this.customerTypeDefault(val)
        },
        //选择等级后获取承建单位名称列表回调
        gradeChange () {
            that.params.customerName = "";
            that.customerList = [];
            if (that.params.grade !== "") {
                that.getCustomerList();
            }

        },
        //获取承建单位信息
        getCustomerList () {
            let paramsData = {
                businessCategory: 1,
                grade: that.params.grade
            }
            that.ajax.json(
                "/dcp/antiFraud/customer/list", paramsData, { type: 'get' }
            ).then(res => {
                that.customerList = res.data;
            })
        },
        //获取核心企业名单
        getList () {
            that.$http(
                "/dcp/antiFraud/customer/page/list", that.params
            ).then(res => {
                let data = res.data;
                that.list = data.records;
                that.total = data.total;
            })
        },
        //重置
        reSet (formName) {
            that.params = {
                size: 10,
                current: 1,
                industryCategory: '',
                grade: '',
                listType: '',
                status: '',
                customerName: ''
            }
            // 清除 保存的参数
            this.$bus.clearParams(this.$route.meta.paramsType);
            this.industryCategoryDefault(this.$route.name)
            that.getList();
        },
        toAdd () {
            this.$router.push({ name: 'fraudPanel-namesList-amendNames', query: { id: "", way: 'add' } })
        },
        exportData () { },
        //编辑
        toEdit (item) {
            this.$router.push({ name: 'fraudPanel-namesList-amendNames', query: { id: item.id, way: 'edit', companyName: item.customerName } })
        },
        //详情
        detail (item) {
            this.isEdit = 3
            this.id = item.id;
            this.businessId = item.businessId;
            this.$router.push({ name: 'black-white-company-detail', query: { id: item.id, way: 'detail', companyName: item.customerName } })
            // this.dialogVisible = true
        },

    },
    filters: {
        jobCategory (dataStr) {
            let arrayList = that.plateList;
            let value = '';
            for (let b of arrayList) {
                if (b.value == dataStr) {
                    value = b.label;
                    break;
                }
            }
            return value;
        },

        nameType (dataStr) {
            let arrayList = that.listType;
            let value = '';
            for (let b of arrayList) {
                if (b.value == dataStr) {
                    value = b.label;
                    break;
                }
            }
            return value;
        },
        // auditStatus(dataStr) {
        //     let arrayList = that.auditList;
        //     let value = '';
        //     for (let b of arrayList) {
        //         if (b.value == dataStr) {
        //             value = b.label;
        //             break;
        //         }
        //     }
        //     return value;
        // },
        gradeCategory (dataStr) {
            let arrayList = that.gradeList;
            let value = '';
            for (let b of arrayList) {
                if (b.value == dataStr) {
                    value = b.label;
                    break;
                }
            }
            return value || '-';
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 16px;
    // padding-left: 16px;
}
</style>
