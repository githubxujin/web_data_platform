<template>
    <div>
        <div class="key-20"></div>
        <div class="key-content-wrap">
            <div class="key-title">{{ industryCategoryLabel(params.industryCategory)}}</div>
            <div class="key-text-wrap">
                <div class="key-text" v-for="(item,index) in inKeyList" :key="item.id">{{item}}<i class="el-icon-close" @click="toDelKey(index,'industry')"></i></div>
                <el-button type="primary" icon="el-icon-plus" @click="addItem()" v-if="!operation">新增</el-button>
                <el-input v-model="tagItem" placeholder="" v-else class="key-input" @blur="onBlur" ref="tagItem"></el-input>

            </div>
        </div>
        <div class="key-20"></div>
        <div class="key-company-wrap">
            <div class="key-company-box" v-for="(item,index) in Object.keys(keyObj)" :key="index">
                <div class="key-company-name">
                    {{ item }}:
                </div>
                <div class="key-hospital" v-for="(i,key) in keyObj[item]" :key="key">
                    {{ i }}、
                </div>
            </div>

            <div class="key-text-wrap mt30">
                <div class="key-text" v-for="(item,index) in cuKeyList" :key="index">{{item}}<i class="el-icon-close" @click="toDelKey(index,'customer')"></i></div>

                <el-button type="primary" icon="el-icon-plus" v-if="!companyOperation" @click="addCompanyItem">新增</el-button>
                <el-input v-model="companyItem" placeholder="" class="key-input" ref="companyItem" @blur="addKeyWord" v-else></el-input>
            </div>

        </div>
    </div>
</template>
<style lang="scss" scoped>
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
        /* margin-left: 20px; */
    }
    &-company-name {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        line-height: 20px;
        margin-right: 20px;
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
            line-height: 22px;
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
</style>
<script>

import { industryCategoryLabel, industryCategoryList } from "@/utils/common"

// inKeyList 行业关键字,cuKeyList 下游关键字,keyObj 下游  

export default {
    props: {
        params: Object,
        keywordType: Number,
        inKeyList: Array,
        cuKeyList: Array,
        keyObj: Object
    },
    data() {
        return {
            tagItem: '',
            companyItem: '',
            operation: false,
            companyOperation: false,
            activeName: 'first',
            industryCategoryList,
            isAll: 0,
            customerNameList: [],
            buyerList: [],
            chooseData: false,

        }
    },
    created() {
        this.$store.commit('keyword/CLEAN_CUSTOMERNORMAL')

    },
    methods: {
        toSave() {
            let { id } = this.$route.query
            let buyerName = this.params.buyerName.join(',')
            let isAll = this.isAll
            this.$http('/dcp/invoice/content/update', { id, buyerName, isAll }).then(res => {
                this.$router.push({ name: 'invoice-content-check' })
            });
        },
        //获取下游
        getBuyerList() {
            let { customerName: sellerName, industryCategory, customerName } = this.params

            this.$http('/dcp/query/invoice/buyer/list', { sellerName, industryCategory, customerName }).then(res => {
                this.buyerList = res.data
                console.log(res.data, 'buyerList')
            });
        },

        industryCategoryLabel,
        getCompany() {
            let { industryCategory, customerName } = this.params
            this.$http('/dcp/query/invoice/seller/list', { industryCategory, customerName }).then(res => {
                this.customerNameList = res.data
            });
        },

        addItem() {
            this.operation = true;
            this.$nextTick(() => {
                this.$refs.tagItem.focus()

            })

        },
        addCompanyItem() {
            this.companyOperation = true;
            this.$nextTick(() => {
                this.$refs.companyItem.focus()

            })
        },
        toDelKey(index, type) {
            this.keywordType === 1 && type === 'industry' ? this.$store.commit("keyword/DEL_INDUSTRYNORMAL", index) : this.$store.commit("keyword/DEL_INDUSTRYEXCEPTION", index)
            this.keywordType === 1 && type === 'customer' ? this.$store.commit("keyword/DEL_CUSTOMERNORMAL", index) : this.$store.commit("keyword/DEL_CUSTOMEREXCEPTION", index)
        },
        //校验关键字是否存在
        isKeyWord(keyword) {
            let params = {
                industryCategory: this.params.industryCategory,
                "keyword": keyword,
                "keywordType": 1,
                businessType: 1,
            }
            this.$http('/dcp/invoice/content/keyword/exist', params, { type: 'get' }).then(res => {
                if (res.code === "200") {
                    this.keywordType === 1 ? this.$store.commit("keyword/SET_INDUSTRYNORMAL", this.tagItem) : this.$store.commit("keyword/SET_INDUSTRYEXCEPTION", this.tagItem)
                    this.tagItem = ""
                    this.operation = false
                } else {
                    // this.$message({ type: "warning", message: "关键字已存在" })
                    this.tagItem = ""
                    this.operation = false
                }
            });
        },
        // 新增关键字上
        onBlur() {
            console.log(this.tagItem, 'item')
            if (!this.tagItem) {
                this.$message({ type: 'warning', message: '关键字不能为空' })
                this.operation = false;

            } else {
                this.isKeyWord(this.tagItem)

            }


        },
        // 新增关键字下
        addKeyWord() {
            if (!this.companyItem) {
                this.$message({ type: 'warning', message: '关键字不能为空' })
                this.companyOperation = false
                return
            }
            let params = {
                industryCategory: this.params.industryCategory,
                "keyword": this.companyItem,
                "keywordType": this.keywordType,
                businessType: 2,
            }
            this.$http('/dcp/invoice/content/keyword/exist', params, { type: 'get' }).then(res => {
                if (res.code === "200") {
                    this.keywordType === 1 ? this.$store.commit("keyword/SET_CUSTOMERNORMAL", this.companyItem) : this.$store.commit("keyword/SET_CUSTOMEREXCEPTION", this.companyItem)
                    this.companyItem = ""
                    this.companyOperation = false
                } else {
                    // this.$message({ type: "warning", message: "关键字已存在" })
                    this.companyItem = ""
                    this.companyOperation = false
                }
            });

            console.log(this.params, 'params')
        }
    }
}
</script>
