
<template>
    <!-- 企业基本信息 -->
    <div class="table-wrap">
        <div>
            <div class="tabs-title mb20">
                <span>基本信息</span>
            </div>
            <table class="table-public-detail">
                <tr>
                    <td>企业类型</td>
                    <td class="cospan">
                        <el-select v-model="params.companyType" clearable placeholder="企业类型">
                            <el-option v-for="(item,index) in companyTypeList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>法人代表</td>
                    <td class="cospan">
                        <el-input placeholder="-" v-model="params.legalPerson" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>工商状态</td>
                    <td class="cospan">
                        <el-input placeholder="-" v-model="params.businessStatus" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>注册地</td>
                    <td class="cospan">
                        <el-input placeholder="-" v-model="params.registration" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业负责人</td>
                    <td class="cospan">
                        <el-input placeholder="-" v-model="params.companyPrincipal" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>质量负责人</td>
                    <td class="cospan">
                        <el-input placeholder="-" v-model="params.companyQuality" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业性质</td>
                    <td class="cospan">
                        <el-input disabled placeholder="-" v-model="params.businessNature"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业资质</td>
                    <td class="cospan">
                        <el-input disabled placeholder="-" v-model="params.qualification"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>主营材料/劳务</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.mainBussiness" placeholder="-"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>客户登记</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.customerReg" placeholder="-"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>融资意愿预测</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.financeWill" placeholder="-"></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业开始经营时间</td>
                    <td class="cospan">
                        <el-input v-model="params.startDate" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业经营年份</td>
                    <td class="cospan">
                        <el-input v-model="params.businessYear" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>营收规模</td>
                    <td class="cospan">
                        <el-input v-model="params.revenueScale" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>注册地址</td>
                    <td class="cospan">
                        <el-input v-model="params.registrationAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>仓库地址</td>
                    <td class="cospan">
                        <el-input v-model="params.stockAddress" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>经营范围</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.businessScope" clearable></el-input>
                    </td>
                </tr>
            </table>
            <div class="tabs-title mt20 mb20">
                <span>联系人信息</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(1)"></span>
                    <span class="el-icon-minus" @click="toDel(1)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyContactList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="name" align="center" label="姓名" width="100">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.sex" clearable></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="phone" label="手机号" align="center" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.phone" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="position" align="center" label="职位" show-overflow-tooltip>
                    <template slot-scope="item">
                        <el-input v-model="item.row.position" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="officePhone" align="center" label="办公电话" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.officePhone" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="拜访地址" align="center" show-overflow-tooltip width="160">
                    <template slot-scope="item">
                        <el-input v-model="item.row.address" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>股权架构</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(2)"></span>
                    <span class="el-icon-minus" @click="toDel(2)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyEquityList" border>
                <el-table-column type="index" label="序号" width='100' align="center"></el-table-column>
                <el-table-column prop="name" label="股东名称" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="subscribeAmount" label="认缴金额" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.subscribeAmount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="paidAmount" label="实缴金额" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.paidAmount" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="equityProportion" label="股权占比" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.equityProportion" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="tabs-title mt20 mb20">
                <span>关联公司</span>
                <div>
                    <span class="el-icon-plus" @click="toAdd(3)"></span>
                    <span class="el-icon-minus" @click="toDel(3)"></span>
                </div>
            </div>
            <el-table :data="params.drugCompanyRelationList" border>
                <el-table-column type="index" label="序号" width='100' align="center">
                </el-table-column>
                <el-table-column prop="name" label="关联公司名称" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.name" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="relation" label="关联关系" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.relation" clearable></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="equity" label="股权结构" align="center">
                    <template slot-scope="item">
                        <el-input v-model="item.row.equity" clearable></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isAdd: false,
            companyTypeList: [],
            params: {
                // address: "",
                // businessNature: "",
                // businessScope: "",
                // businessStatus: "",
                // businessTag: "",
                // businessYear: "",
                // companyName: "",
                // companyPrincipal: "",
                // // companyType: "",
                // customerReg: "",
                drugCompanyContactList: [
                    // {
                    // address: "",
                    // companyId: '',
                    // companyName: "",
                    // createTime: "",
                    // id: '',
                    // name: "",
                    // officePhone: "",
                    // phone: "",
                    // position: "",
                    // sex: "",
                    // updateTime: ""
                    // }
                ],
                drugCompanyEquityList: [
                    // {
                    //     companyId: '',
                    //     companyName: "",
                    //     createTime: "",
                    //     equityProportion: "",
                    //     id: '',
                    //     name: "",
                    //     paidAmount: "",
                    //     subscribeAmount: "",
                    //     updateTime: ""
                    // }
                ],
                drugCompanyRelationList: [
                    // {
                    //     companyId: '',
                    //     companyName: "",
                    //     createTime: "",
                    //     equity: "",
                    //     id: '',
                    //     name: "",
                    //     relation: "",
                    //     updateTime: ""
                    // }
                ],
                // email: "",
                // financeWill: "",
                // // isMarket: 0,
                // legalPerson: "",
                // mainBussiness: "",
                // phone: "",
                // qualification: "",
                // companyQuality: "",
                // registration: "",
                // registrationAddress: "",
                // revenueScale: "",
                // startDat: "",
                // stockAddres: ""
            },
        }
    },
    created () {
        console.log('bbbbccc', this.$route.name === 'nomarketManageNew')
        this.companyType()
        if (this.$route.name === 'nomarketManageNew') {
            this.isAdd = true
        } else {
            // console.log('0000')
            this.isAdd = false
            this.getDetails(this.$route.query.companyId)
            console.log(this.$route.query.companyId);

        }
    },
    methods: {
        //企业类型数据
        companyType () {
            this.ajax
                .json('/dcp/query/drug/company/type/list', {}, { type: 'get' })
                .then(res => {
                    if (res.code === "200") this.companyTypeList = res.data
                });
        },
        // 获取详情
        getDetails (companyId) {
            this.$http('/dcp/query/drug/company/base/info', { companyId }, { type: 'get' }).then(res => {
                this.params = res.data
                console.log(this.params, 'shangye');
            })
        },
        toAdd (num) {
            if (num === 1) {
                this.params.drugCompanyContactList.push(
                    {
                        name: '',
                        sex: '',
                        phone: '',
                        position: '',
                        officePhone: '',
                        address: ''
                    }
                )
            } else if (num === 2) {
                this.params.drugCompanyEquityList.push(
                    {
                        name: '',
                        subscribeAmount: '',
                        paidAmount: '',
                        equityProportion: ''
                    }
                )
            } else {
                this.params.drugCompanyRelationList.push(
                    {
                        name: '',
                        relation: '',
                        equity: ''
                    }
                )
            }
        },
        toDel (num) {
            if (num === 1) {
                if (this.params.drugCompanyContactList.length > 0) {
                    this.params.drugCompanyContactList.splice(this.params.drugCompanyContactList.length - 1, 1)
                }
            } else if (num === 2) {
                if (this.params.drugCompanyEquityList.length > 0) {
                    this.params.drugCompanyEquityList.splice(this.params.drugCompanyEquityList.length - 1, 1)
                }
            } else {
                if (this.params.drugCompanyRelationList.length > 0) {
                    this.params.drugCompanyRelationList.splice(this.params.drugCompanyRelationList.length - 1, 1)
                }
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.title-date {
    display: flex;
    justify-content: space-between;
}

.to-submit {
    text-align: center;
}

// 企业类型的Select宽度设置为td宽度
/deep/ .el-select {
    width: 100%;
}
</style>
