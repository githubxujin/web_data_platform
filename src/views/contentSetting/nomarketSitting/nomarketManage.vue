<template>
    <!-- 商业公司编辑页 -->
    <div class="stat">
        <div class="table-wrap mt20 ">
            <table class=" table-tit ">
                <tr>
                    <td>
                        <span>*</span>
                        配送公司</td>
                    <td>
                        <el-input v-model="params.companyName" clearable :formatter="formatLabel"></el-input>
                    </td>
                </tr>
            </table>
        </div>
        <div class="table-wrap mb20">
            <table class="table-public-detail">
                <tr>
                    <td>企业电话</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.phone" placeholder="-" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业邮箱</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.email" placeholder="-" clearable></el-input>
                    </td>
                </tr>
                <tr>
                    <td>企业地址</td>
                    <td class="cospan">
                        <el-input disabled v-model="params.address" placeholder="-" clearable></el-input>
                    </td>
                </tr>
            </table>
            <el-tabs type="border-card" v-model="activeName1" class="mt30">
                <el-tab-pane label="企业基本信息" name="one">
                    <keep-alive>
                        <basic-message ref="one" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业经营指标" name="two">
                    <keep-alive>
                        <basic-target ref="two" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="实际控制人信用状况" name="three">
                    <keep-alive>
                        <control-credit ref="three" />
                    </keep-alive>
                </el-tab-pane>

                <el-tab-pane label="企业相关产业背景信息" name="five">
                    <keep-alive>
                        <basic-bginformation ref="five" />
                    </keep-alive>
                </el-tab-pane>
                <el-tab-pane label="企业相关重大事件或舆情" name="six">
                    <keep-alive>
                        <basic-event ref="six" />
                    </keep-alive>
                </el-tab-pane>
            </el-tabs>
            <div class="to-submit">
                <el-button type="info" size="medium" @click="$router.push('/manageSetting')">取消</el-button>
                <el-button type="primary" size="medium" class="ml40" @click="toSubmit('submit')">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import basicMessage from '@/views/contentSetting/nomarketSitting/basicMessage.vue';
import basicTarget from '@/views/contentSetting/nomarketSitting/basicTarget.vue';
import controlCredit from '@/views/contentSetting/nomarketSitting/controlCredit.vue';
// import basicLicense from '@/views/contentSetting/nomarketSitting/basicLicense';
import basicBginformation from '@/views/contentSetting/nomarketSitting/basicBginformation.vue';
import basicEvent from '@/views/contentSetting/nomarketSitting/basicEvent.vue';
export default {
    data() {
        return {
            activeName1: 'one',
            params: {
                phone: '',
                email: '',
                address: '',
                companyName: '',
            },
            // isMarket: ''
        };
    },
    components: {
        basicMessage,
        basicTarget,
        controlCredit,
        // basicLicense,
        basicBginformation,
        basicEvent
    },
    created() {
        if (this.$route.name === 'nomarketManageNew') {
            console.log(this.$route.query.isMarket, '0');
            this.isAdd = true
        } else {
            this.isAdd = false
            this.getRowsList(this.$route.query.companyId)
            console.log(this.$route.query.companyId);

            console.log(this.$route.query.isMarket, '11');
        }
    },
    methods: {
        // 根据公司名称获取对应的的电话等基础数据
        getRowsList(companyId) {
            this.ajax
                .json('/dcp/query/drug/company/base/info', { companyId }, { type: 'get' })
                .then(res => {
                    this.params = res.data;
                });
        },
        // 提交
        toSubmit(type) {
            console.log(this.$route.query.isMarket);
            console.log(typeof this.$route.query.isMarket);

            if (this.$route.query.isMarket === '0') {
                if (type === 'submit') {
                    // 新增提交
                    if (this.isAdd) {
                        console.log(this.$refs.one.params, 'add');
                        this.ajax
                            .json('/dcp/save/drug/company/info', {
                                drugCompanyBaseInfoVo: {
                                    ...this.params,
                                    ...this.$refs.one.params,
                                    id: this.$route.query.companyId,
                                    isMarket: this.$route.query.isMarket,
                                },
                                drugCompanyControlInfoVo: {
                                    ...this.$refs.three.params
                                },
                                drugCompanyIndustryInfoVo: {
                                    ...this.$refs.five.params,
                                },
                                drugCompanyBusinessInfoVo: {
                                    ...this.$refs.two.params
                                },
                            })
                            .then(res => {
                                this.$message.success("提交成功");
                                this.$router.push('/manageSetting')
                            });
                    } else {
                        // 编辑提交
                        console.log(this.$refs.one.params, 'fanhui');
                        this.ajax
                            .json('/dcp/save/drug/company/info', {
                                id: this.$route.query.companyId,
                                drugCompanyBaseInfoVo: {
                                    ...this.params,
                                    ...this.$refs.one.params,
                                    companyName: this.params.companyName,
                                    isMarket: this.$route.query.isMarket
                                },
                                drugCompanyControlInfoVo: {
                                    ...this.$refs.three.params
                                },
                                drugCompanyIndustryInfoVo: {
                                    ...this.$refs.five.params,
                                },
                                drugCompanyBusinessInfoVo: {
                                    ...this.$refs.two.params
                                },
                            })
                            .then(res => {
                                this.$message.success("提交成功");
                                this.$router.push('/manageSetting')
                            });
                    }
                }
            } else if (this.$route.query.isMarket === '1') {
                // 新增提交
                if (this.isAdd) {
                    console.log(this.$refs.one.params, 'one');
                    this.ajax
                        .json('/dcp/save/drug/company/info', {
                            drugCompanyBaseInfoVo: {
                                ...this.params,
                                ...this.$refs.one.params,
                                companyId: this.$route.query.companyId,
                                isMarket: this.$route.query.isMarket,
                            },
                            drugCompanyControlInfoVo: {
                                ...this.$refs.three.params
                            },
                            drugCompanyIndustryInfoVo: {
                                ...this.$refs.five.params,
                            },
                            drugCompanyBusinessInfoVo: {
                                ...this.$refs.two.params
                            },
                        })
                        .then(res => {
                            this.$message.success("提交成功");
                            this.$router.push('/manageSetting')
                        });
                } else {
                    // 编辑提交
                    this.ajax
                        .json('/dcp/save/drug/company/info', {
                            id: this.$route.query.companyId,
                            drugCompanyBaseInfoVo: {
                                ...this.params,
                                ...this.$refs.one.params,
                                isMarket: this.$route.query.isMarket
                            },
                            drugCompanyControlInfoVo: {
                                ...this.$refs.three.params
                            },
                            drugCompanyIndustryInfoVo: {
                                ...this.$refs.five.params,
                            },
                            drugCompanyBusinessInfoVo: {
                                ...this.$refs.two.params
                            },
                        })
                        .then(res => {
                            this.$message.success("提交成功");
                            this.$router.push('/manageSetting')
                        });
                }
            }
        }
    }
};
</script>
<style lang="scss" scoped>
    .light {
        .table-tit {
            border: 1px solid #d2d9e5;
            tr {
                background: #fff;
                font-family: PingFang-SC-Regular;
            }
            td {
                color: #666;
            }
        }
      .el-input.is-disabled {
         .el-input__inner {
                background: #fff!important;
                border: 1px solid #fff;
                color: #909399;
            }
        }
    }
    .table-tit {
        width: 100%;
        border: 1px solid #54575c;
        border-collapse: collapse;
        font-family: PingFangSC-Light;
        font-size: 14px;
        tr {
            width: 100%;
            background: rgb(35, 37, 40);
            display: flex;
            justify-content: space-between;
            td {
                color: rgb(193, 193, 195);
                padding: 0 0 0 20px;
                height: 50px;
                line-height: 50px;
                box-sizing: border-box;
                &:nth-child(0) {
                    width: 150px;
                    border-right: 0;
                    background: #292b2f;
                }
                &:last-child {
                    border-right: 0;
                    width: calc(100% - 150px);
                    margin-right: 20px;
                }
                span {
                    left: 10px;
                    top: 24px;
                    color: #43a1ac;
                    line-height: 6px;
                }

                /deep/ .el-input.is-disabled .el-input__inner {
                    color: #fff;
                    opacity: 0.5;
                }
            }
            .cospan {
                width: calc(100% - 150px);
                display: flex;
                div {
                    width: 459px;
                }
                a {
                    width: 120px;
                    margin-left: 25px;
                    text-decoration: underline;
                    font-size: 14px;
                    color: #43a1ac;
                    letter-spacing: 0.44px;
                }
            }
        }
    }

    .to-submit {
        text-align: center;
    }
    .el-select {
        width: 100%;
    }
</style>
