<template>
    <div class="table-wrap qg-key-wrap">
        <div class="box-wrap">
            <div class="title">发票内容字段</div>
            <div class="mt20"></div>
            <el-form :inline='true' ref='form' size='medium' v-if="$route.query.sellerName!=='全部'">

                <el-form-item>
                    <el-select v-model='params.industryCategory' clearable placeholder=' 板块' disabled>
                        <el-option v-for='(s,index) in industryCategoryList' :label='s.label' :value='s.value' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model='params.customerName' clearable placeholder='企业名称' disabled>
                        <el-option v-for='(s,index) in customerNameList' :label='s' :value='s' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select v-model='params.buyerName' placeholder='下游名称' filterable multiple collapse-tags style="width: 400px" @change="onChangeBuyerName">
                        <el-option label="全部" value="全部"></el-option>
                        <el-option v-for='(s,index) in buyerList' :label='s' :value='s' :key='index'>
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div class="table-wrap" style="padding: 0px 20px 0px 0px">
                <el-tabs type='border-card' v-model='activeName'>
                    <el-tab-pane label='正常字段' name='first'>
                        <key-list :params="params" :keywordType="1" :industryNormalList="industryNormal" :customerNormalList="customerNormal" />
                        <div class="key-60"></div>
                        <div class="btn-fixed-wrap">
                            <el-button type="primary">返回</el-button>
                            <el-button type="primary" @click="toSave()">保存</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label='异常字段' name='second'>
                        <key-list :params="params" :keywordType="2" :industryNormalList="industryException" :customerNormalList="customerException" />
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
            color: #666;
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
import KeyList from "./components/key-list.vue"
import { industryCategoryList } from "@/utils/common"
import { mapState } from "vuex"
export default {
    components: {
        KeyList
    },
    data () {
        return {
            tagItem: '',
            companyItem: '',
            operation: false,
            companyOperation: false,
            activeName: 'first',
            industryCategoryList,
            params: {
                industryCategory: 0,
                customerName: "",
                buyerName: "",
            },
            isAll: 0,

            customerNameList: [],
            buyerList: [],
            chooseData: false,
            oldChooseData: [],

        }
    },
    computed: mapState({
        industryNormal: state => state.invoice.industryNormal,
        industryException: state => state.invoice.industryException,
        customerNormal: state => state.invoice.customerNormal,
        customerException: state => state.invoice.customerException,

    }),
    created () {
        this.params.industryCategory = Number(this.$route.query.industryCategory)

        if (this.$route.query.sellerName !== '全部') {
            //    this.getCompany();
            this.params.buyerName = this.$route.query.buyerName.split(',')

            this.params.customerName = this.$route.query.sellerName
            this.getBuyerList();

        }


        this.show();

    },
    methods: {
        goBack () {
            this.$router.push({ name: 'invoice-content-check' })
        },
        show () {
            let { id, industryCategory } = this.$route.query
            this.$store.dispatch("invoice/getKeyWordList", { id, industryCategory })

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

        },
        toSave () {
            if (this.industryNormal.length > 0) {
                var inData = {
                    invoiceContentId: this.$route.query.id,
                    businessType: 1,
                    keyword: this.industryNormal.join(","),
                    keywordType: 1,
                    industryCategory: this.params.industryCategory
                }
            }
            if (this.industryException.length > 0) {
                var inUndata = {
                    invoiceContentId: this.$route.query.id,
                    businessType: 1,
                    keyword: this.industryException.join(","),
                    keywordType: 2,
                    industryCategory: this.params.industryCategory
                }
            }
            if (this.customerNormal.length > 0 && this.$route.query.sellerName !== '全部') {
                var cuData = {
                    invoiceContentId: this.$route.query.id,
                    businessType: 2,
                    keywordType: 1,
                    keyword: this.customerNormal.join(","),
                    industryCategory: this.params.industryCategory,
                    buyerName: this.params.buyerName.join(',')
                }
            }
            if (this.customerException.length > 0 && this.$route.query.sellerName !== '全部') {
                var cuUndata = {
                    invoiceContentId: this.$route.query.id,
                    businessType: 2,
                    keywordType: 2,
                    keyword: this.customerException.join(","),
                    industryCategory: this.params.industryCategory,
                    buyerName: this.params.buyerName.join(',')
                }
            }
            let params = [inData, inUndata, cuData, cuUndata]
            console.log(params)
            params = params.filter(i => i !== undefined)
            this.$http('/dcp/invoice/content/update', params).then(res => {
                if (res.code === '200') {
                    this.$router.push({ name: 'invoice-content-check' })
                }
            });
        },
        //获取下游
        getBuyerList () {
            let { customerName: sellerName, industryCategory, customerName } = this.params

            this.$http('/dcp/query/invoice/buyer/list', { sellerName, industryCategory, customerName }).then(res => {
                // this.buyerList = 
                this.buyerList = this.buyerList.concat(res.data, this.$route.query.buyerName.split(','))
                if (res.data.length === this.$route.query.buyerName.split(',').length) {
                    this.oldChooseData = res.data.contact(['全部'])
                } else {
                    this.oldChooseData = res.data
                }
                console.log(res.data, 'buyerList')
            });
        },


        getCompany () {
            let { industryCategory, customerName } = this.params
            this.$http('/dcp/query/invoice/seller/list', { industryCategory, customerName }).then(res => {
                this.customerNameList = res.data
            });
        },


    }
}
</script>