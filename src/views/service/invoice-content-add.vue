<template>
    <div class="table-wrap qg-key-wrap">
        <!-- {{ buyerList}} -->
        <div>
            <div class="el-title">新增发票内容字段
            </div>
            <el-form :inline='true' size='medium' class='mt20'>
                <el-form-item prop="industryCategoryList">
                    <el-select v-model='params.industryCategory' clearable placeholder='板块' @change="onChangeIndustry">
                        <el-option v-for='(s,index) in industryCategoryList' :label='s.label' :value='s.value' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="customerName">
                    <el-select v-model='params.customerName' clearable placeholder='企业名称' @change="onChangeCustomerName">
                        <el-option v-for='(s,index) in customerNameList' :label='s' :value='s' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model='params.buyerName' placeholder='下游名称' filterable multiple collapse-tags style="width: 400px" @change="onChangeBuyerName">
                        <el-option label="全部" value="全部" v-if="buyerList.length>0"></el-option>
                        <el-option v-for='(s,index) in buyerList' :label='s' :value='s' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="saveBuyerName">保存</el-button>
                </el-form-item>

            </el-form>

            <div class="table-wrap" style="padding: 0px 20px 0px 0px">
                <el-tabs type='border-card' v-model='activeName'>
                    <el-tab-pane label='正常字段' name='first'>
                        <key-list :params="params" :keywordType="1" :inKeyList="industryNormal" :cuKeyList="customerNormal" :keyObj="customerNameKey" />

                    </el-tab-pane>
                    <el-tab-pane label='异常字段' name='second'>
                        <key-list :params="params" :keywordType="2" :inKeyList="industryException" :cuKeyList="customerException" :keyObj="customerNameKey" />
                        <div class="key-60"></div>
                    </el-tab-pane>
                </el-tabs>
                <div class="key-60"></div>
                <div class="btn-fixed-wrap">
                    <el-button type="info" @click="goBack()">返回</el-button>
                    <el-button type="primary" @click="toSave()">保存</el-button>
                </div>
            </div>

        </div>
    </div>
</template>
<style lang="scss" >
.dark {
    .qg-key-wrap {
        .btn-fixed-wrap {
            box-shadow: 0 -4px 8px 0 rgba(29, 30, 35, 0.8);
            background: #2d3034;
            height: 70px;
            line-height: 70px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
        }
        /deep/ .el-input__inner {
            height: 24px;
            line-height: 24px;
        }
        .key {
            &-input {
                width: 120px;
            }

            &-company-wrap {
                background: #2d3034;
                padding: 20px;
                min-height: 196px;
            }
            &-company-box {
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;
            }
            &-hospital {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #a0a3a8;
                line-height: 20px;
            }
            &-company-name {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ffffff;
                line-height: 20px;
            }
            &-20 {
                height: 20px;
                background: #232528;
            }
            &-60 {
                height: 60px;
                padding-bottom: 60px;
                background: #232528;
            }
            &-content-wrap {
                background: #2d3034;
                padding: 20px;
                min-height: 150px;
            }
            &-title {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #ffffff;
                margin-bottom: 20px;
            }
            &-text-wrap {
                display: flex;
                flex-wrap: wrap;
                /deep/ .el-button {
                    padding: 0 10px;
                    border-radius: 3px;
                    height: 24px;
                    line-height: 24px;
                }
                /deep/ i {
                    margin-right: 5px;
                    color: #43a1ac;
                }
                /deep/ span {
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #d3d3d4;
                    letter-spacing: 0.44px;
                    line-height: 14px;
                }
            }
            &-text {
                i {
                    margin-left: 4px;
                }
                background: #293e42;
                border-radius: 3px;
                height: 24px;
                line-height: 24px;
                margin-right: 10px;
                padding: 0 6px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #43a1ac;
                letter-spacing: 0.44px;
                margin-bottom: 10px;
            }
        }
        .wrap {
            background: #232528;
            .box-wrap {
                padding: 30px 0 0 30px;
            }
        }
        .title {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #ffffff;
            letter-spacing: 0.5px;
            line-height: 16px;
        }
    }
}
.light {
    .qg-key-wrap {
        .btn-fixed-wrap {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            background: #fff;
            height: 70px;
            line-height: 70px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
        }
        /deep/ .el-input__inner {
            height: 24px;
            line-height: 24px;
        }
        .key-title {
            color: #666;
        }
        .key-input {
            width: 120px;
        }

        .key-company-wrap {
            background: #f1f4fc;
            padding: 20px;
            min-height: 196px;
        }
        .key-company-box {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        .key-hospital {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #a0a3a8;
            line-height: 20px;
        }
        .key-company-name {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #ffffff;
            line-height: 20px;
        }
        .key-20 {
            padding: 0 40px;
            height: 20px;
            background: #fff;
        }
        .key-60 {
            height: 60px;
            padding-bottom: 60px;
            background: #fff;
        }
        .key-content-wrap {
            background: #f1f4fc;
            padding: 20px;
            min-height: 150px;
        }

        .key-text-wrap {
            display: flex;
            flex-wrap: wrap;
            /deep/ .el-button {
                padding: 0 10px;
                border-radius: 3px;
                height: 24px;
                line-height: 24px;
            }
            /deep/ i {
                margin-right: 5px;
                color: #fff;
            }
            /deep/ span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #fff;
                letter-spacing: 0.44px;
                line-height: 14px;
            }
        }
        .key-text {
            i {
                margin-left: 4px;
            }
            background: #fff;
            border-radius: 3px;
            height: 24px;
            line-height: 24px;
            margin-right: 10px;
            padding: 0 6px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4064d4;
            letter-spacing: 0.44px;
            margin-bottom: 10px;
        }
        .wrap {
            background: #fff;
            .box-wrap {
                padding: 30px 0 0 30px;
            }
        }
    }
}
</style>
<script>
import KeyList from "./components/key-list-add.vue"
import { industryCategoryList } from "@/utils/common"
import { mapState } from "vuex"
export default {
    components: {
        KeyList
    },
    data () {
        return {
            customerNameList: [],
            tagItem: '',
            companyItem: '',
            operation: false,
            companyOperation: false,
            activeName: 'first',
            industryCategoryList,
            params: {
                industryCategory: 2,
                customerName: "",
                buyerName: [],
            },
            isAll: 0,
            oldSearchJobType: [],

            buyerList: [],
            chooseData: false,
            invoiceContentList: [],
            customerNameKey: {},
            oldChooseData: [],


        }
    },
    created () {
        this.getCompany()
        this.getInkeyWord()
    },
    computed: mapState({
        industryNormal: state => state.keyword.industryNormal,
        industryException: state => state.keyword.industryException,
        customerNormal: state => state.keyword.customerNormal,
        customerException: state => state.keyword.customerException,
    }),
    methods: {
        selectBlur () {
            alert(123)
        },
        // onChangeBuyerName(val) {
        //     console.log(val, val)
        //     const allValues = [];
        //     // 保留所有值
        //     for (const item of this.buyerList) {
        //         allValues.push(item)
        //     }
        //     // debugger
        //     console.log(allValues, 'allValues')
        //     // 用来储存上一次的值，可以进行对比
        //     debugger
        //     const oldVal = this.oldSearchJobType.length === 1 ? this.oldSearchJobType[0] : [];
        //     // 若是全部选择
        //     // debugger
        //     if (val.includes('ALL_SELECT')) this.buyerName = allValues;
        //     // 取消全部选中 上次有 当前没有 表示取消全选
        //     if (oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) this.buyerName = [];
        //     // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
        //     // 新老数据都有全部选中
        //     if (oldVal.includes('ALL_SELECT') && val.includes('ALL_SELECT')) {
        //         const index = val.indexOf('ALL_SELECT');
        //         val.splice(index, 1); // 排除全选选项
        //         this.buyerName = val
        //     }
        //     // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
        //     if (!oldVal.includes('ALL_SELECT') && !val.includes('ALL_SELECT')) {
        //         if (val.length === allValues.length - 1) this.buyerName = ['ALL_SELECT'].concat(val)
        //     }
        //     console.log(this.buyerName, 'this.buyerName')
        //     // 储存当前最后的结果 作为下次的老数据
        //     this.oldSearchJobType[0] = this.buyerName;
        // },
        goBack () {
            this.$router.push({ name: 'invoice-content-check' })
        },
        //带出行业关键字
        getInkeyWord () {
            this.$store.dispatch('keyword/getInKeyWordList', this.params.industryCategory)
        },
        // 
        onChangeIndustry (val) {
            this.getCompany(val)
            this.$store.dispatch('keyword/getInKeyWordList', this.params.industryCategory)
        },
        //提交关键字
        addKeyWord (params) {
            this.$http('/dcp/invoice/content/keyword/add', params).then(res => {
                if (res.code === '200') {
                    this.$router.push({ name: 'invoice-content-check' })
                }
            })
        },
        toSave () {
            if (this.industryNormal.length > 0) {
                var inData = {
                    businessType: 1,
                    keyword: this.industryNormal.join(","),
                    keywordType: 1,
                    industryCategory: this.params.industryCategory
                }
            }
            if (this.industryException.length > 0) {
                var inUndata = {
                    businessType: 1,
                    keyword: this.industryException.join(","),
                    keywordType: 2,
                    industryCategory: this.params.industryCategory
                }
            }
            if (this.customerNormal.length > 0) {
                if (Object.keys(this.customerNameKey).length === 0) {
                    console.log(111111111112)
                    this.$message({ type: 'warning', message: '请选择企业下游' })
                    return
                }
                var cuData = {
                    businessType: 2,
                    keywordType: 1,
                    keyword: this.customerNormal.join(","),
                    industryCategory: this.params.industryCategory,
                    invoiceContentList:
                        Object.keys(this.customerNameKey).map(i => {
                            return {
                                buyerName: this.customerNameKey[i].join(","),
                                sellerName: i,
                                isAll: this.isAll
                            }
                        })
                }
            }
            if (this.customerException.length > 0) {
                var cuUndata = {
                    businessType: 2,
                    keywordType: 2,
                    keyword: this.customerException.join(","),
                    industryCategory: this.params.industryCategory,
                    invoiceContentList:
                        Object.keys(this.customerNameKey).map(i => {
                            return {
                                buyerName: this.customerNameKey[i].join(","),
                                sellerName: i
                            }
                        })
                }
            }
            let params = [inData, inUndata, cuData, cuUndata]

            this.addKeyWord(params.filter(i => i !== undefined))
        },

        customerMerge () {
            return Object.keys(this.customerNameKey).map(i => {
                return {
                    buyerName: this.customerNameKey[i].join(","),
                    sellerName: i
                }
            })
        },
        keyWordMerge () {
            return this.customerNormal.map(i => {
                return {
                    "businessType": 2,
                    "industryCategory": this.params.industryCategory,
                    "invoiceContentList": this.customerMerge(),
                    "keyword": i.keyword,
                    "keywordType": 1
                }
            })
            // this.customerException.map(i => {

            // })
        },

        onChangeCustomerName (val) {
            this.getBuyerList(val)
            console.log(val)
            console.log(this.customerNameKey[val], ' this.customerNameKey[val] ')
            if (this.customerNameKey[val]) {
                if (this.customerNameKey[val].length === this.buyerList.length) {
                    this.params.buyerName = [...this.customerNameKey[val], '全部']
                    this.oldChooseData = [...this.customerNameKey[val], '全部']
                } else {
                    this.params.buyerName = this.customerNameKey[val]
                    this.oldChooseData = this.customerNameKey[val]
                }
            } else {
                this.params.buyerName = ""
            }
            // this.params.buyerName = this.customerNameKey[val] && this.customerNameKey[val]
        },



        onChangeBuyerName (val) {
            const allValues = this.buyerList.map(item => {
                return item
            }).concat(['全部']);
            console.log(allValues, 'allVaules')
            // 用来储存上一次选择的值，可进行对比
            const oldVal = this.oldChooseData.length > 0 ? this.oldChooseData : [];

            // 若选择全部
            if (val.includes('全部')) {
                this.params.buyerName = allValues;
            }

            // 取消全部选中， 上次有， 当前没有， 表示取消全选
            if (oldVal.includes('全部') && !val.includes('全部')) {
                this.params.buyerName = [];
            }

            // 点击非全部选中，需要排除全部选中 以及 当前点击的选项
            // 新老数据都有全部选中
            if (oldVal.includes('全部') && val.includes('全部')) {
                const index = val.indexOf('全部');
                val.splice(index, 1); // 排除全选选项
                this.params.buyerName = val;
            }

            // 全选未选，但是其他选项都全部选上了，则全选选上
            if (!oldVal.includes('全部') && !val.includes('全部')) {
                if (val.length === allValues.length - 1) {
                    this.params.buyerName = ['全部'].concat(val);
                }
            }

            // 储存当前选择的最后结果 作为下次的老数据
            this.oldChooseData = this.params.buyerName;
            // console.log(this.chooseData, 'this.chooseData')
            // console.log(val, 'this.val')
            // if (val.includes("全部") && !this.chooseData) {
            //     console.log('全部')
            //     this.isAll = 1
            //     this.chooseData = true
            //     this.params.buyerName = this.params.buyerName.concat(this.buyerList)
            //     // this.params.buyerName = this.params.buyerName.concat(this.buyerList).filter(i => i !== '全部' && i !== '')
            // } else if (!val.includes("全部") && this.chooseData) {
            //     console.log("全部1111")
            //     this.params.buyerName = []
            //     this.chooseData = false
            //     this.isAll = 0
            // }
        },


        // //获取下游
        getBuyerList (sellerName) {
            let { industryCategory } = this.params

            this.$http('/dcp/query/invoice/buyer/list', { sellerName, industryCategory }).then(res => {
                this.buyerList = res.data
                // console.log(res.data, 'buyerList')
            });
        },


        getCompany (val = '') {
            if (val !== '') {
                console.log('上')
                let { customerName } = this.params
                this.$http('/dcp/query/invoice/seller/list', { industryCategory: val, customerName }).then(res => {
                    console.log(res.data, 'data')
                    this.customerNameList = res.data
                });

            } else {
                console.log('下')
                let { industryCategory, customerName } = this.params
                this.$http('/dcp/query/invoice/seller/list', { industryCategory, customerName }).then(res => {
                    console.log(res.data, 'data')
                    this.customerNameList = res.data
                });
            }

        },
        saveBuyerName () {
            console.log(this.params.buyerName, 'this.params.buyerName')
            if (this.params.customerName && this.params.buyerName.length > 0) {
                this.$set(this.customerNameKey, this.params.customerName, this.params.buyerName.filter(i => i !== '全部' && i !== ''))

            } else {
                this.$message({ type: "warning", message: "请选择" })
            }
        },


    }
}
</script>