<template>
    <!-- 新增药厂编辑页面 -->
    <div class="stat">
        <div class="table-wrap mt20">
            <!-- 判断入口是增加还是修改 -->
            <h3 class="el-title" v-if="isAdd">药厂库新增</h3>
            <h3 class="hos-detail" v-else>{{ params.companyName }}</h3>
            <el-tabs type="border-card" class="mt10 tootip-table">
                <!-- 新增或者编辑药厂基本信息功能 -->
                <el-tab-pane label="药厂基本信息">
                    <div class="tabs-title mb20  pt20">
                        <span>药厂基本情况</span>
                    </div>
                    <table class="table-public-detail">
                        <tr>
                            <td>药厂名称</td>
                            <td>
                                <el-input v-model="params.companyName" clearable placeholder='-'></el-input>
                            </td>
                            <td>企业类型</td>
                            <td>
                                <el-select v-model="params.companyType" clearable placeholder="企业类型">
                                    <el-option :label="item" :value="item" v-for="(item,index) in typeList" :key="index"></el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td>经营资质</td>
                            <td>
                                <el-input v-model="params.permitCode" placeholder="-" clearable show-overflow-tooltip></el-input>
                            </td>
                            <td>经营年限</td>
                            <td>
                                <el-input v-model="params.productTime" clearable placeholder="-" show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>社会信用代码/组织机构代码</td>
                            <td>
                                <el-input v-model="params.socialCreditCode" placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                            <td>分类码</td>
                            <td>
                                <el-input v-model="params.classificationCode" placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>所在省份</td>
                            <td>
                                <el-cascader v-model="params.province" :options="city" placeholder="所在省份" clearable :props="{ expandTrigger: 'hover' }" @change="handleChange">
                                </el-cascader>
                            </td>
                            <td>法定代表人</td>
                            <td>
                                <el-input v-model="params.lawPerson" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>股票代码</td>
                            <td>
                                <el-input v-model="params.stockCode" placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                            <td>质量负责人</td>
                            <td>
                                <el-input v-model="params.quailtyPerson" placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">企业负责人</td>
                            <td class="cospan">
                                <el-input v-model="params.responsiblePerson" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">注册地址</td>
                            <td class="cospan">
                                <el-input v-model="params.registerAddress" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">生产地址</td>
                            <td class="cospan">
                                <el-input v-model="params.productionAddress" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">生产范围</td>
                            <td class="cospan">
                                <el-input v-model="params.productionRange" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">送货时效</td>
                            <td class="cospan">
                                <el-input v-model="params.deliveryTime" clearable placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">产品信息</td>
                            <td class="cospan">
                                <el-input v-model="params.productInfo" placeholder='-' clearable show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">备注</td>
                            <td class="cospan">
                                <el-input v-model="params.remark" clearable placeholder='-' show-overflow-tooltip></el-input>
                            </td>
                        </tr>
                    </table>
                    <div class="tabs-title mt30 mb20">药厂财务信息</div>
                    <table class="table-public-detail">
                        <tr>
                            <td>营运能力</td>
                            <td>
                                <el-input v-model="params.operationAbility" placeholder='-' clearable></el-input>
                            </td>
                            <td>盈利能力</td>
                            <td>
                                <el-input v-model="params.profitability" placeholder='-' clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>偿债能力</td>
                            <td>
                                <el-input v-model="params.debtAbility" placeholder='-' clearable></el-input>
                            </td>
                            <td>资本结构</td>
                            <td>
                                <el-input v-model="params.capitalStructure" placeholder='-' clearable></el-input>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <!-- 新增或者编辑药厂生产信息功能 -->
                <el-tab-pane label="药厂生产信息">
                    <div class="tabs-title mb20  pt20">
                        <span>药品生产许可</span>
                        <div>
                            <span class="el-icon-plus" @click="toAdd(1)"></span>
                            <span class="el-icon-minus" @click="toDel(1)"></span>
                        </div>
                    </div>
                    <el-table :data="productList" border class="tab-info">
                        <el-table-column prop="companyCode" label="编号" width='100' align="center">
                            <template slot-scope="item">
                                <el-input v-model="item.row.companyCode" clearable placeholder='-'></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="classificationCode" label="分类码" width="100">
                            <template slot-scope="item">
                                <el-input v-model="item.row.classificationCode" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="licenceDate" label="发证日期" show-overflow-tooltip min-width="160">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.licenceDate' value-format='yyyy-MM-dd' placeholder="发证日期"></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="deadlineDate" label="有效期至" show-overflow-tooltip min-width="160">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.deadlineDate' value-format='yyyy-MM-dd' placeholder="有效期至"></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="licenceIssuingAuthority" label="发证机关" show-overflow-tooltip>
                            <template slot-scope="item">
                                <el-input v-model="item.row.licenceIssuingAuthority" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="issuePerson" label="签发人" show-overflow-tooltip width="120">
                            <template slot-scope="item">
                                <el-input v-model="item.row.issuePerson" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="regulators" label="日常监管机构" show-overflow-tooltip min-width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.regulators" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="supervisors" label="日常监管人员" show-overflow-tooltip width="180">
                            <template slot-scope="item">
                                <el-input v-model="item.row.supervisors" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.remark" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="tabs-title mt30 mb20">
                        <span>器械生产许可</span>
                    </div>
                    <table class="table-public-detail">
                        <tr>
                            <td>许可证编号</td>
                            <td>
                                <el-input v-model="permitList.permitCode" clearable></el-input>
                            </td>
                            <td>企业负责人</td>
                            <td>
                                <el-input v-model="permitList.responsiblePerson" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>住所</td>
                            <td>
                                <el-input v-model="permitList.registerAddress" placeholder></el-input>
                            </td>
                            <td>生产地址</td>
                            <td>
                                <el-input v-model="permitList.productionAddress" placeholder></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>发证日期</td>
                            <td>
                                <el-date-picker v-model='permitList.licenceDate' value-format='yyyy-MM-dd' placeholder="发证日期"></el-date-picker>
                            </td>
                            <td>发证部门</td>
                            <td>
                                <el-input v-model="permitList.licenceIssuingAuthority" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>有效期限</td>
                            <td>
                                <el-date-picker v-model='permitList.deadlineDate' value-format='yyyy-MM-dd' placeholder="有效期限"></el-date-picker>
                            </td>
                            <td>生产产品登记表</td>
                            <td>
                                <el-input v-model="permitList.productRegistrationForm" placeholder></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td style="width:230px;">生产范围</td>
                            <td class="cospan">
                                <el-input v-model="permitList.productionRange" clearable></el-input>
                            </td>
                        </tr>
                    </table>
                    <div class="tabs-title mt20 mb20">
                        <span>器械生产备案</span>
                    </div>
                    <table class="table-public-detail">
                        <tr>
                            <td>备案凭证编号</td>
                            <td>
                                <el-input v-model="filingList.filingCode" clearable></el-input>
                            </td>
                            <td>企业负责人</td>
                            <td>
                                <el-input v-model="filingList.responsiblePerson" clearable></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>住所</td>
                            <td>
                                <el-input v-model="filingList.registerAddress" placeholder></el-input>
                            </td>
                            <td>生产地址</td>
                            <td>
                                <el-input v-model="filingList.productionAddress" placeholder></el-input>
                            </td>
                        </tr>
                        <tr>
                            <td>备案部门</td>
                            <td>
                                <el-input v-model="filingList.licenceIssuingAuthority" clearable></el-input>
                            </td>
                            <td>备案日期</td>
                            <td>
                                <el-date-picker v-model='filingList.filingDate' value-format='yyyy-MM-dd' placeholder="备案日期"></el-date-picker>
                            </td>
                        </tr>
                        <tr>
                            <td>生产产品登记表</td>
                            <td>
                                <el-input v-model="filingList.productRegistrationForm" placeholder></el-input>
                            </td>
                            <td>生产范围</td>
                            <td>
                                <el-input v-model="filingList.productionRange" clearable></el-input>
                            </td>
                        </tr>
                    </table>
                    <div class="tabs-title mt20 mb20 title-date">
                        <span>GMP</span>
                        <div>
                            <span class="el-icon-plus" @click="toAdd(2)"></span>
                            <span class="el-icon-minus" @click="toDel(2)"></span>
                        </div>
                    </div>
                    <el-table :data="gmpList" border class="tab-info">
                        <el-table-column prop="province" label="省市" width="100">
                            <template slot-scope="item">
                                <el-input v-model="item.row.province" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gmpCode" label="证书编号" width="100">
                            <template slot-scope="item">
                                <el-input v-model="item.row.gmpCode" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="address" label="地址" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.address" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="authenticationScope" label="认证范围" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.authenticationScope" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gmpDate" label="发证日期" show-overflow-tooltip width="180">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.gmpDate' value-format='yyyy-MM-dd' placeholder="发证日期"></el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="deadlineDate" label="有效期截止日" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.deadlineDate' value-format='yyyy-MM-dd' placeholder="有效期截止日">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="continueDate" label="批准延续日期" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.continueDate' value-format='yyyy-MM-dd' placeholder="批准延续日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="continueDeadlineDate" label="有效期延续至" show-overflow-tooltip width="180">
                            <template slot-scope="item">
                                <el-date-picker v-model='item.row.continueDeadlineDate' value-format='yyyy-MM-dd' placeholder="有效期延续至">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="continueAuthenticationScope" label="批准延续的认证范围" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.continueAuthenticationScope" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="gmpVersion" label="认证GMP版本" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.gmpVersion" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.status" clearable></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" show-overflow-tooltip width="160">
                            <template slot-scope="item">
                                <el-input v-model="item.row.remark" clearable></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <div class="to-submit mt30">
                    <el-button type="info" size="medium" @click="$router.push('/drugFactoryNum')">取消</el-button>
                    <el-button type="primary" size="medium" style="margin-left:40px;" @click="toSubmit('submit')">提交</el-button>
                </div>
            </el-tabs>
        </div>
    </div>
</template>
<script>
import city from "@/views/industryTrade/config/city2.js";
export default {
    data () {
        return {
            city,
            productList: [
                // {
                //     capitalStructure: "",
                //     classificationCode: "",
                //     companyCode: "",
                //     companyName: "",
                //     companyType: "",
                //     createPerson: "",
                //     createTime: "",
                //     deadlineDate: "",
                //     debtAbility: "",
                //     deliveryTime: "",
                //     id: '',
                //     issuePerson: "",
                //     lawPerson: "",
                //     licenceDate: "",
                //     licenceIssuingAuthority: "",
                //     operationAbility: "",
                //     permitCode: "",
                //     productInfo: "",
                //     productTime: "",
                //     productionAddress: "",
                //     productionRange: "",
                //     profitability: "",
                //     province: "",
                //     quailtyPerson: "",
                //     registerAddress: "",
                //     regulators: "",
                //     remark: "",
                //     responsiblePerson: "",
                //     socialCreditCode: "",
                //     stockCode: "",
                //     supervisors: "",
                //     updateTime: ""
                // }
            ],
            gmpList: [
                // {
                //     address: "",
                //     authenticationScope: "",
                //     companyName: "",
                //     continueAuthenticationScope: "",
                //     continueDate: "",
                //     continueDeadlineDate: "",
                //     createPerson: "",
                //     createTime: "",
                //     deadlineDate: "",
                //     gmpCode: "",
                //     gmpDate: "",
                //     gmpVersion: "",
                //     id: '',
                //     province: "",
                //     remark: "",
                //     status: "",
                //     updateTime: ""
                // }
            ],
            filingList: {
                // filingCode: '',
                // responsiblePerson: '',
                // registerAddress: '',
                // productionAddress: '',
                // province: '',
                // licenceIssuingAuthority: '',
                // filingDate: '',
                // productRegistrationForm: '',
                // productionRange: '',
                // id: ''
            },
            permitList: {
                // permitCode: '',
                // responsiblePerson: '',
                // registerAddress: '',
                // productionAddress: '',
                // licenceDate: '',
                // licenceIssuingAuthority: '',
                // deadlineDate: '',
                // productRegistrationForm: '',
                // productionRange: '',
                // id: ''
            },
            isAdd: false,
            // id: "",
            // companyName: '',
            typeList: [],      // 企业类型
            params: {
                companyName: "",
                companyType: '',
                productTime: "",    // 经营年限
                permitCode: '',  //经营资质
                socialCreditCode: "", //统一社会信用代码
                lawPerson: "", //法定代表人
                classificationCode: '',  //  分类码
                companyCode: '',
                stockCode: '',   // 股票代码
                quailtyPerson: '',   //  质量负责人
                responsiblePerson: '',   // 企业负责人
                registerAddress: '', //  注册地址
                province: "", //所在省份
                productionAddress: '',   //  生产地址
                productionRange: '',    // 生产范围
                deliveryTime: '',    //  送货时效
                productInfo: '',     //  产品信息
                remark: '',      //  备注
                operationAbility: '',    //  营运能力
                profitability: '',   //  盈利能力
                debtAbility: '', //  偿债能力
                capitalStructure: '',   // 资本结构
                status: "", //状态[1:已保存2:已提交]
            }
        };
    },
    created () {
        if (this.$route.name === "drugFactoryIncreate") {
            this.isAdd = true;
        } else {
            this.isAdd = false;
            this.id = this.$route.query.drugId;
            this.companyName = this.$route.query.companyName
            this.getDetails(this.id);
            this.getPermitDetail(this.companyName)
            this.getType(this.id)
        }
    },
    methods: {
        // 获取类型
        getType (id) {
            this.$http(
                "/dcp/query/pharmaceutical/companytypelist",
                { id },
                { type: "formData" }
            ).then(res => {
                this.typeList = res.data;
                console.log(this.typeList, 'aaa');
            });
        },
        // 获取基本信息详情
        getDetails (id) {
            this.$http(
                "/dcp/query/pharmaceutical/baseinfo",
                { id },
                { type: "formData" }
            ).then(res => {
                this.params = res.data;
                // console.log(this.params, '----');
            });
        },
        // 药品生产详情信息
        getPermitDetail (companyName) {
            // console.log(this.companyName, '0SSSS');
            this.$http('/dcp/query/pharmaceutical/productinfo', { companyName }, { type: "formData" }).then(res => {
                let { gmp_info = [], pharmaceutical_product_info = [], apparatus_filing_info = {}, apparatus_permit_info = {} } = res.data
                this.productList = pharmaceutical_product_info
                this.gmpList = gmp_info
                this.filingList = apparatus_filing_info
                this.permitList = apparatus_permit_info
                console.log(this.gmpList, '1');
            });
        },
        // 省市
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.province = value[0];
            } else {
                this.params.province = "";
            }
        },
        // 列表新增
        toAdd (n) {
            if (n === 1) {
                this.productList.push({
                    classificationCode: "", // 分类码
                    licenceDate: "", //发证日期
                    deadlineDate: "", //有效期
                    licenceIssuingAuthority: "", //发证机关
                    issuePerson: "", //签发人
                    regulators: "", //监管机构
                    supervisors: '', //监管人员
                    remark: '',  //  备注
                });
            } else if (n === 2) {
                this.gmpList.push({
                    province: '',
                    gmpCode: '',
                    address: '',
                    authenticationScope: '',
                    gmpDate: '',
                    deadlineDate: '',
                    continueDate: '',
                    continueDeadlineDate: '',
                    productionRange: '',
                    continueAuthenticationScope: '',
                    gmpVersion: '',
                    status: '',
                    remark: ''
                });
            }
        },
        // 列表删除
        toDel (n) {
            if (n === 1) {
                if (this.productList.length > 0) {
                    this.productList.splice(
                        this.productList.length - 1,
                        1
                    );
                    // let i = this.productList.length - 1;
                    // this.checkRepetition(i, n);
                }
            } else if (n === 2) {
                if (this.gmpList.length > 0) {
                    this.gmpList.splice(
                        this.gmpList.length - 1,
                        1
                    );
                    // let i = this.gmpList.length - 1;
                    // this.checkRepetition(i, n);
                }
            }
        },
        // 保存 or 提交
        toSubmit (type) {
            if (!this.params.companyName) {
                return this.$message.error("药厂名称不能为空");
            }
            //  判断必须为数字
            let reg = /^[0-9]*$/;
            if (this.params.productTime && !reg.test(this.params.productTime)) {
                return this.$message.error("经营年限必须为数字");
            }
            if (type === "submit") {
                if (this.isAdd) {
                    // 新增提交
                    this.ajax
                        .json('/dcp/update/pharmaceutical/productinfo', {
                            base_info: this.params,
                            gmp_info: this.gmpList,
                            pharmaceutical_product_info: this.productList,
                            apparatus_filing_info: this.filingList,
                            apparatus_permit_info: this.permitList
                        })
                        .then(res => {
                            this.$message.success("提交成功");
                            this.$router.back();
                            console.log(11111, this.gmpList);
                        });
                } else {
                    // 修改提交
                    this.$http("/dcp/update/pharmaceutical/productinfo", {
                        base_info: this.params,
                        gmp_info: this.gmpList,
                        pharmaceutical_product_info: this.productList,
                        apparatus_filing_info: this.filingList,
                        apparatus_permit_info: this.permitList,
                    })
                        .then(res => {
                            this.$message.success("提交成功");
                            this.$router.push("/drugFactoryNum");
                            console.log(this.baes_info, '编辑');

                        })
                        .catch(err => {
                            this.$message.error(err.message);
                        });
                }
            }
        },
    }
};
</script>
<style lang="scss" scoped>
.light {
    .hos-detail {
        color: #333;
    }
}
.dark {
    .hos-detail {
        color: #fff;
    }
}
.dark .table-public-detail tr /deep/ td:nth-child(odd){
    width: 248px;
}
.light .table-public-detail tr /deep/ td:nth-child(odd){
    width: 248px;
}
.hos-detail,
.el-title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    line-height: 14px;
    margin-bottom: 20px;
    font-family: PingFangSC-Regular;
    margin-top: 0px;
}
.to-submit {
    text-align: center;
}
/deep/ .el-select {
    width: 100%;
}
/deep/ .el-input {
    width: 100%;
}
/deep/ .el-cascader {
    width: 100%;
}
</style>
