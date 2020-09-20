<template>
    <div>
        <!-- 新增账户 -->
        <div class="accountEdit mt20 pl30">
            <div class="title">新增账户</div>
            <div class="bot-wrap">
                <el-tag v-for="(tag,i) in params.accountList" :key="i" type='warning' closable @close="closeTag(i)">{{tag}}</el-tag>
                <el-button v-if="isName" class="button-new-tag" @click="isName=false,isSesect=true,value=''">+ 新增账号</el-button>
                <el-select ref="saveTagInput1" class="select-new-tag" v-if="isSesect" v-model="value" filterable remote reserve-keyword placeholder="请输入账号" @change="getVal" :remote-method="remoteMethod">
                    <el-option v-for="(item,i) in options" :key="i" :label="item" :value="item"></el-option>
                </el-select>
            </div>
        </div>
        <!-- 监控企业 -->
        <div class="monitoring mt20 mb20 pl30 pt30">
            <div class="title mb20">监控企业</div>
            <el-radio-group v-model="sectionIndex" @change="hanldChange" class="radioGroup">
                <el-radio-button v-for="(item, index) in section" :key="index" :label="index">{{item.name}}</el-radio-button>
            </el-radio-group>
            <div class="checkbox_box">
                <div class="check-box">
                    <div v-for="(item, index) in section" :key="index" v-show="sectionIndex === index">
                        <el-checkbox :indeterminate="item.isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange($event, index)" v-if="item.company.length"><span style="font-size: 14px;">全选</span>
                        </el-checkbox>
                        <el-checkbox-group v-model="item.companyIds" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="subItem in item.company" :label="subItem.id" :key="subItem.id">{{subItem.customerName}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

        </div>
        <!-- 舆情分类 -->
        <div class="classify mt20 mb20 ml15 pl30 pt30 pr30">
            <div class="title">舆情分类</div>
            <div class="marsk-email">
                <div class="option-wrap">
                    <div class="option-main" v-for="(item, index) in categoryList" :key="index">
                        <div class="option-title">{{item.name}}</div>
                        <div class="creat-right">
                            <el-checkbox :indeterminate="categoryCheckList[index].isIndeterminate" v-model="categoryCheckList[index].checkAll" @change="all1($event, index)" style="margin-right:10px;">全部</el-checkbox>
                            <el-checkbox-group v-model="categoryCheckList[index].checkList" @change="handleCheckedChange1($event, index)">
                                <el-checkbox class="grayness" v-for="v in item.childItem" :key="v.id" :label="v.id"><span style="font-size: 12px;">{{v.name}}</span></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="btn-fixed-wrap ">
            <el-button type="info" style="margin-left:40px;" @click="$router.back()">取消</el-button>
            <el-button type="primary" style="margin-left:20px;" @click="toSubmit">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isName: true,
            isSesect: false,
            isCont: false,
            id: this.$route.params.id,
            inputVisible1: false,
            loading: false,
            inputValue1: '',
            value: '',
            params: {
                customers: [
                    // {
                    //     customerId: '', // 通知客户
                    //     notifyItemIds: [] // 通知项
                    // }
                ],
                accountList: [], // 邮箱  多个逗号隔开
                id: '', // 新增时无ID
                name: ''
            },
            options: [],
            clientList: [],
            categoryList: [],
            section: [
                {
                    name: '基建工程',
                    id: 1,
                    company: [],
                    companyIds: [],
                    isIndeterminate: false,
                    checkAll: false
                },
                {
                    name: '医药医疗',
                    id: 2,
                    company: [],
                    companyIds: [],
                    isIndeterminate: false,
                    checkAll: false
                },
                {
                    name: '能源化工',
                    id: 3,
                    company: [],
                    companyIds: [],
                    isIndeterminate: false,
                    checkAll: false
                },
                {
                    name: '其他',
                    id: 0,
                    company: [],
                    companyIds: [],
                    isIndeterminate: false,
                    checkAll: false
                }
            ],
            sectionIndex: 0,
            categoryCheckList: []
        }
    },
    created () {
        // 获取舆情分类
        this.getClassify()
        this.id = this.$route.params.id || ''
        // 获取客户列表
        this.getClientList(this.id)
    },
    methods: {
        remoteMethod (name) {
            if (name !== '') {
                this.loading = true;
                this.ajax.get('/risk/server/aduser/list', { name }).then(res => {
                    this.loading = false
                    this.options = res.data
                })
            } else {
                this.options = [];
            }
        },
        getVal (v) {
            if (v) {
                for (let i = 0; i < this.params.accountList.length; i++) {
                    if (this.params.accountList[i] === v) return this.$message.error('请勿重复添加相同的账号')
                }
                this.params.accountList.push(v)
                this.isName = true
                this.isSesect = false,
                    this.isCont = true
            }
        },
        closeTag (i) {
            this.params.accountList.splice(i, 1)
            if (this.params.accountList && this.params.accountList.length === 0) {
                this.isCont = false
            }
        },
        // 获取舆情分类
        getClassify () {
            this.ajax.get('/risk/server/notify/item/list')
                .then(res => {
                    this.categoryList = res.data
                    this.categoryList.forEach((item, index) => {
                        this.categoryCheckList.push({
                            name: item.name,
                            checkAll: false,
                            isIndeterminate: false,
                            checkList: [],
                            ids: []
                        })
                        item.childItem.forEach((i, index2) => {
                            this.categoryCheckList[index].ids.push(i.id)
                            this.categoryCheckList[index].checkList.push(i.id)
                        })
                    })
                }).catch(err => {
                    console.log(err)
                })
        },

        // 获取客户列表
        getClientList (id) {
            this.ajax.get('/risk/server/notify/customer/list', { id })
                .then(res => {
                    this.clientList = res.data
                    // 1, "基建工程", 2, '医药医疗', 3, '能源化工', 0, '其他'
                    var arr = [1, 2, 3, 0]
                    arr.forEach((item, index) => {
                        this.section[index].company = this.clientList[item] || []
                    })
                    this.getInfo()
                }).catch(err => {
                    console.log(err)
                })
        },

        // 获取编辑内容
        getInfo () {
            this.ajax.get('/risk/server/notify/view', { id: this.id })
                .then(res => {
                    this.params = res.data
                    if (res.data.accountList && res.data.accountList.length > 0) {
                        this.params.accountList = res.data.accountList
                        this.isCont = true
                    }
                    // 选中客户
                    res.data.customers.forEach(item1 => {
                        var customerId = item1.customerId
                        this.section.forEach((item2, index2) => {
                            item2.company.forEach(item3 => {
                                if (item3.id === customerId) {
                                    item2.companyIds.push(item3.id)
                                }
                            })
                            item2.checkAll = item2.companyIds.length === item2.company.length
                            item2.isIndeterminate = item2.companyIds.length > 0 && item2.companyIds.length < item2.company.length
                        })
                    })

                    // 选中舆情分类
                    var notifyItemIds = res.data.customers[0].notifyItemIds
                    this.categoryCheckList.forEach(item => {
                        let newArr = []
                        item.checkList.forEach(i => {
                            notifyItemIds.forEach(j => {
                                if (i === j) {
                                    newArr.push(j)
                                }
                            })
                        })

                        item.checkList = newArr
                        item.checkAll = newArr.length === item.ids.length
                        item.isIndeterminate = newArr.length > 0 && newArr.length < item.ids.length
                    })
                }).catch(err => {
                    console.log(err)
                })
        },


        // 选择模块儿
        hanldChange (val) {
            this.sectionIndex = val
        },

        // 公司全选
        handleCheckAllChange (val, index) {
            this.section[index].checkAll = val
            if (val) {
                this.section[index].companyIds = []
                this.section[index].company.forEach(item => {
                    this.section[index].companyIds.push(item.id)
                })
                this.section[this.sectionIndex].checkAll = true
                this.section[this.sectionIndex].isIndeterminate = false
            } else {
                this.section[index].companyIds = []
            }
        },

        // 公司单选
        handleCheckedCitiesChange (value) {
            let checkedCount = value.length
            this.section[this.sectionIndex].checkAll = checkedCount === this.section[this.sectionIndex].company.length
            this.section[this.sectionIndex].isIndeterminate = checkedCount > 0 && checkedCount < this.section[this.sectionIndex].company.length
        },

        // 分类复选框改变
        handleCheckedChange1 (value, index) {
            let checkedCount = value.length
            this.categoryCheckList[index].checkAll = checkedCount === this.categoryCheckList[index].ids.length
            this.categoryCheckList[index].isIndeterminate = checkedCount > 0 && checkedCount < this.categoryCheckList[index].ids.length
        },

        // 分类全选
        all1 (val, index) {
            if (val) {
                this.categoryCheckList[index].checkList = this.categoryCheckList[index].ids
                this.categoryCheckList[index].checkAll = true
                this.categoryCheckList[index].isIndeterminate = false
            } else {
                this.categoryCheckList[index].checkList = []
            }
        },

        // 提交
        toSubmit () {
            var notifyItemIds = []
            this.categoryCheckList.forEach(item => {
                item.checkList.forEach(i => {
                    notifyItemIds.push(i)
                })
            })

            this.params.customers = []
            this.section.forEach(item => {
                item.companyIds.forEach(i => {
                    this.params.customers.push({
                        customerId: i,
                        notifyItemIds: notifyItemIds
                    })
                })
            })

            if (this.params.accountList && this.params.accountList.length === 0) {
                this.$message.error('请输入账号！')
            } else if (this.params.customers && this.params.customers.length === 0) {
                this.$message.error('客户不能为空！')
            } else {
                this.ajax.json('/risk/server/notify/save', this.params)
                    .then(res => {
                        if (res.code === '200') {
                            this.$message.success('编辑成功！')
                            this.$router.push('/allocation')
                        } else {
                            this.$message.error('编辑失败！')
                        }
                    }).catch(err => {
                        console.log(err)
                    })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: 0.5px;
    line-height: 16px;
}
// 新增账户
.accountEdit {
    width: 1360px;
    padding-bottom: 30px;
    padding-top: 29px;
    box-sizing: border-box;
}
.bot-wrap {
    /deep/ .el-tag,
    .el-button:focus,
    .el-button:hover {
        color: #43a1ac;
        background: #293e42;
        border-radius: 3px;
    }
    .el-tag {
        margin-right: 10px;
        margin-top: 19px;
        font-size: 14px;
        line-height: 24px;
        border-radius: 3px;
        height: 24px;
        border: 0;
        /deep/ .el-icon-close {
            &:hover {
                background: transparent;
            }
        }
    }
    .button-new-tag {
        border-radius: 3px;
        width: 104px;
        height: 24px;
        line-height: 23px;
        padding: 0;
        letter-spacing: 0.44px;
        vertical-align: top;
        margin-top: 19px;
    }
    /deep/ .select-new-tag {
        width: 150px;
        height: 24px;
        color: #0486fe;
        margin-right: 10px;
        margin-top: 19px;
        .el-input__inner {
            height: 24px;
            font-family: PingFangSC-Regular;
        }
    }
}
.el-button--mini,
.el-button--small {
    font-size: 14px;
}
.btn-fixed-wrap {
    height: 70px;
    line-height: 70px;
    margin-bottom: 20px;
    width: 1360px;
    text-align: center;
}
.monitoring {
    display: inline-block;
    width: 454px;
    height: 587px;
    box-sizing: border-box;
}
.checkbox_box {
    width: 400px;
    height: 478px;
    overflow-y: auto;
    padding-left: 20px;
}
.check-box {
    margin-top: 30px;
}

.el-checkbox {
    margin-bottom: 20px;
}
.el-checkbox-group {
    .el-checkbox {
        display: flex;
        margin-bottom: 20px;
        /deep/ .el-checkbox__label {
            font-size: 14px;
            line-height: 14px;
        }
    }
}

// 舆情分类
.classify {
    display: inline-block;
    vertical-align: top;
    width: 885px;
    height: 587px;
    box-sizing: border-box;
    overflow-y: auto;
}

// 提交
.footer {
    position: fixed;
    bottom: 0;
    text-align: center;
    padding: 20px 0;
    width: 1360px;
    height: 30px;
    background-color: #1d1e23;
    z-index: 99;
}
.marsk-email {
    .option-wrap {
        padding: 20px;
        text-align: left;
        /deep/.el-checkbox-group {
            display: inline-block;
        }
        /deep/.el-checkbox-group {
            font-size: 14px;
        }
        /deep/.el-checkbox + .el-checkbox {
            color: #606266;
            margin-left: 10px;
        }
        .option-top {
            font-size: 18px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e2e4ed;
            margin-bottom: 20px;
            color: #303133;
            .close-btn {
                float: right;
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 10px;
            }
        }
        .option-main {
            display: flex;
            margin-top: 20px;
            .option-title {
                width: 100px;
                line-height: 20px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                letter-spacing: 0.54px;
            }
            .creat-right {
                flex: 1;
                display: flex;
                .el-checkbox {
                    margin-left: 0;
                    margin-right: 15px;
                    margin-bottom: 5px;
                }
                /deep/ .el-checkbox {
                    color: #909399;
                }
            }
            .grayness {
                width: 135px;
                padding: 0 0 6px 0;
                display: inline-block;
                overflow-y: auto;
            }
        }
    }
}
.dark {
    .title {
        color: #fff;
    }
    .accountEdit {
        background: #232528;
    }
    .monitoring {
        background: #232528;
    }
    // 舆情分类
    .classify {
        background: #232528;
    }
    .btn-fixed-wrap {
        box-shadow: 0 -4px 8px 0 rgba(29, 30, 35, 0.8);
        background: #232528;
    }
    // 滚动条
    ::-webkit-scrollbar {
        background: #242d30;
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #242d30;
        border-radius: 4.5px;
    }
    ::-webkit-scrollbar-corner {
        background: #242d30;
    }
    .bot-wrap {
        .el-tag {
            color: #43a1ac;
            background: #293e42;
            /deep/ .el-icon-close {
                color: #43a1ac;
            }
        }
        .button-new-tag {
            color: #43a1ac;
            background-color: #1e292e;
            border: 1px solid #366f71;
        }
    }
    .marsk-email {
        .option-wrap {
            .option-title {
                color: #43a1ac;
            }
        }
    }
    // 监控企业
    .el-radio-group.radioGroup {
        /deep/ .el-radio-button__inner {
            background: transparent;
        }
        /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: #41a4b0;
            border-color: #366f71;
            box-shadow: -1px 0 0 0 transparent;
            background-color: rgba(52, 139, 142, 0.11);
        }
        /deep/ .el-radio-button__inner {
            color: #43a1ac;
            height: 24px;
            padding: 0 20px;
            line-height: 24px;
        }
        /deep/ .el-radio-button:first-child .el-radio-button__inner {
            border-left: 1px solid #366f71;
            border-radius: 0;
        }
        /deep/ .el-radio-button:last-child .el-radio-button__inner {
            border-radius: 0;
        }
        /deep/ .el-radio-button__inner {
            border: 1px solid #366f71;
        }
    }
}
.light {
    .title {
        color: #333;
    }
    .accountEdit {
        background: #fff;
    }
    .monitoring {
        background: #fff;
    }
    // 舆情分类
    .classify {
        background: #fff;
    }
    .btn-fixed-wrap {
        box-shadow: 0 -4px 8px 0 rgba(213, 217, 241, 0.8);
        background: #fff;
    }
    // 滚动条
    ::-webkit-scrollbar {
        background: #fff;
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 4.5px;
    }
    ::-webkit-scrollbar-corner {
        background: #fff;
    }
    .bot-wrap {
        .el-tag {
            color: #4064d4;
            background: #fff;
            /deep/ .el-icon-close {
                color: #4064d4;
            }
        }
        .button-new-tag {
            color: #4064d4;
            background-color: #fff;
            border: 1px solid #4064d4;
        }
    }
    .marsk-email {
        .option-wrap {
            .option-title {
                color: #333;
            }
        }
    }
    // 监控企业
    .el-radio-group.radioGroup {
        /deep/ .el-radio-button__inner {
            background: transparent;
        }
        /deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
            color: #fff;
            border-color: #4064d4;
            box-shadow: -1px 0 0 0 transparent;
            background-color: #4064d4;
        }
        /deep/ .el-radio-button__inner {
            color: #4064d4;
            height: 24px;
            padding: 0 20px;
            line-height: 24px;
        }
        /deep/ .el-radio-button:first-child .el-radio-button__inner {
            border-left: 1px solid #4064d4;
            border-radius: 0;
        }
        /deep/ .el-radio-button:last-child .el-radio-button__inner {
            border-radius: 0;
        }
        /deep/ .el-radio-button__inner {
            border: 1px solid #4064d4;
        }
    }
}
</style>
