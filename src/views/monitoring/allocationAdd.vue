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
            <el-radio-group v-model="sectionChoice" @change="hanldChange" class="radioGroup">
                <el-radio-button label="基建工程"></el-radio-button>
                <el-radio-button label="医药医疗"></el-radio-button>
                <el-radio-button label="能源化工"></el-radio-button>
                <el-radio-button label="其他"></el-radio-button>
            </el-radio-group>
            <div class="checkbox_box">

                <div v-show="categoryActive ===  '基建工程'" v-if="companyCheckList[0].company.length">
                    <div class="check-box">
                        <el-checkbox v-model="companyCheckList[0].checkAll" @change="handleCheckAllChange($event, 0)"><span style="font-size: 14px;">全选</span></el-checkbox>
                        <el-checkbox-group v-model="companyCheckList[0].ids">
                            <el-checkbox v-for="item in companyCheckList[0].company" :label="item.id" :key="item.id" @change="handleCheckedCitiesChange($event, item.id, 0)">{{item.customerName}}<span class="shelter" @click.self="toChange"></span></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div v-show="categoryActive ===  '医药医疗'" v-if="companyCheckList[1].company.length">
                    <div class="check-box">
                        <el-checkbox v-model="companyCheckList[1].checkAll" @change="handleCheckAllChange($event, 1)"><span style="font-size: 14px;">全选</span></el-checkbox>
                        <el-checkbox-group v-model="companyCheckList[1].ids">
                            <el-checkbox v-for="item in companyCheckList[1].company" :label="item.id" :key="item.id" @change="handleCheckedCitiesChange($event, item.id, 1)">{{item.customerName}}<span class="shelter" @click.self="toChange"></span></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div v-show="categoryActive ===  '能源化工'" v-if="companyCheckList[2].company.length">
                    <div class="check-box">
                        <el-checkbox v-model="companyCheckList[2].checkAll" @change="handleCheckAllChange($event, 2)"><span style="font-size: 14px;">全选</span></el-checkbox>
                        <el-checkbox-group v-model="companyCheckList[2].ids">
                            <el-checkbox v-for="item in companyCheckList[2].company" :label="item.id" :key="item.id" @change="handleCheckedCitiesChange($event, item.id, 2)">{{item.customerName}}<span class="shelter" @click.self="toChange"></span></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div v-show="categoryActive ===  '其他'" v-if="companyCheckList[3].company.length">
                    <div class="check-box">
                        <el-checkbox v-model="companyCheckList[3].checkAll" @change="handleCheckAllChange($event, 3)"><span style="font-size: 14px;">全选</span></el-checkbox>
                        <el-checkbox-group v-model="companyCheckList[3].ids">
                            <el-checkbox v-for="item in companyCheckList[3].company" :label="item.id" :key="item.id" @change="handleCheckedCitiesChange($event, item.id, 3)">{{item.customerName}}<span class="shelter" @click.self="toChange"></span></el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>

        </div>
        <!-- 舆情分类 -->
        <div class="classify mt20 mb20 ml15 pl30 pt30 pr30">
            <div class="title">舆情分类</div>
            <div class="marsk-email">
                <div class="option-wrap" v-if="isBlock">
                    <div class="option-main" v-for="(item,index) in categoryList" :key="item.id">
                        <div class="option-title">{{item.name}}</div>
                        <div class="creat-right">
                            <el-checkbox :indeterminate="categoryList1[index].isIndeterminate" checked v-model="categoryList1[index].isAll" @change="all1(item,index)" style="margin-right:10px;">全部</el-checkbox>
                            <el-checkbox-group v-model="categoryList1[index].arr" @change="handleCheckedChange1(index,categoryList1[index].arr)">
                                <el-checkbox class="grayness" v-for="v in item.childItem" :key="v.id" :label="v.id" @change="cancel(v.id)"><span style="font-size: 12px;">{{v.name}}</span></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="btn-fixed-wrap">
            <el-button type="info" @click="$router.back()">取消</el-button>
            <el-button type="primary" style="margin-left:20px;" @click="toSubmit">确定</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: '',
            totalSize: 0,
            isName: true,
            isSesect: false,
            isCont: false,
            isShow: false,
            isDialog: false,
            isDisabled: true,
            inputVisible1: false,
            isIndeterminate: true,
            checkAll1: false,
            checkAll: false,
            isAll: false,
            isBlock: true,
            isCancel: true,
            isNotification: false,
            loading: false,
            isId: '',
            sectionChoice: '基建工程',
            inputValue1: '',
            params: {
                customers: [
                    // {
                    //     customerId: '', // 通知客户
                    //     notifyItemIds: [] // 通知项
                    // }
                ],
                accountList: [], // 账号  多个逗号隔开
                id: '', // 新增时无ID
                name: ''
            },
            newParams: [],
            clientList: [],
            informList: [],
            section: [
                {
                    name: '基建工程',
                    id: 1
                },
                {
                    name: '医药医疗',
                    id: 2
                },
                {
                    name: '能源化工',
                    id: 3
                },
                {
                    name: '其他',
                    id: 0
                }
            ],
            sectionMessage: [],
            company: [],
            companys: [],
            companyCheckList: [
                {
                    name: '基建工程',
                    checkAll: false,
                    ids: [],
                    company: []
                },
                {
                    name: '医药医疗',
                    checkAll: false,
                    ids: [],
                    company: []
                },
                {
                    name: '能源化工',
                    checkAll: false,
                    ids: [],
                    company: []
                },
                {
                    name: '其他',
                    checkAll: false,
                    ids: [],
                    company: []
                }
            ],
            categoryList: [],
            categoryList1: [],
            categoryList2: [],
            classifyList: [],
            classifyList1: [],
            createIds: [],
            arrs: [],
            categoryActive: '',
            options: [],
            accountList: []
        }
    },
    created() {
        this.getClientList()
        this.enterprise()
        this.getClassify()
    },
    methods: {
        enterprise() {
            this.ajax.get('/risk/server/notify/customer/list')
                .then(res => {
                    this.clientList = res.data
                    this.hanldChange('基建工程')
                }).catch(err => {
                    console.log(err)
                })
        },
        remoteMethod(name) {
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
        getVal(v) {
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
        closeTag(i) {
            this.params.accountList.splice(i, 1)
            if (this.params.accountList && this.params.accountList.length === 0) {
                this.isCont = false
            }
        },
        // 获取客户列表
        getClientList() {
            this.ajax.get('/risk/server/notify/customer/list')
                .then(res => {
                    this.clientList = res.data
                }).catch(err => {
                    console.log(err)
                })
        },

        // 新增接收邮箱通知 -------
        // 获取分类
        getClassify() {
            this.ajax.get('/risk/server/notify/item/list')
                .then(res => {
                    this.categoryList = res.data
                    let arr = []
                    this.categoryList1 = []
                    console.log(this.categoryList1, 'this.categoryList1')
                    this.categoryList.forEach(v => {
                        v.isAll = true
                        v.childItem.forEach(item => {
                            arr.push(item.id)
                        })
                        this.categoryList1.push({ isAll: false, arr: [], isIndeterminate: true })
                        this.categoryList2.push({ isAll: false, arr: [], isIndeterminate: true })
                        arr = []
                    })
                    this.createIds = []
                    this.categoryList1.forEach(v => {
                        if (v.arr.length !== 0) {
                            this.createIds.push(v.arr)
                        }
                    })
                    this.arrs = []
                    this.arrs = this.flatten(this.createIds)
                    this.params.customers.forEach(v => {
                        v.notifyItemIds = []
                        v.notifyItemIds = this.arrs
                    })
                }).catch(err => {
                    console.log(err)
                })
        },

        // 选择模块儿
        hanldChange(val) {
            // 1, "基建工程", 2, '医药医疗', 3, '能源化工', 0, '其他',
            if (val === '基建工程') {
                this.company = this.clientList[1] || []
                this.companyCheckList[0].company = this.clientList[1] || []
                this.categoryActive = val
            } else if (val === '医药医疗') {
                this.company = this.clientList[2] || []
                this.companyCheckList[1].company = this.clientList[2] || []
                this.categoryActive = val
            } else if (val === '能源化工') {
                this.company = this.clientList[3] || []
                this.companyCheckList[2].company = this.clientList[3] || []
                this.categoryActive = val
            } else {
                this.company = this.clientList[0] || []
                this.companyCheckList[3].company = this.clientList[0] || []
                this.categoryActive = val
            }
        },
        // 公司全选
        handleCheckAllChange(val, index) {
            this.getClassify()

            if (val) {
                this.isBlock = true
                var arr = []
                this.companyCheckList[index].company.forEach(item => {
                    arr.push(item.id)
                })
                this.companyCheckList[index].ids = arr
            } else {
                this.companyCheckList[index].ids = []
            }
        },
        handleCheckedCitiesChange(value, id, index) {
            this.isBlock = true
            this.companyCheckList[index].checkAll = this.companyCheckList[index].ids.length === this.companyCheckList[index].company.length
            if (value) {
                this.getClassify()
            }
        },
        toChange(event) {
            // event.stopPropagation()
        },
        // 取消单个勾选
        cancel(val) {
            if (this.isId === val) {
                this.isCancel = true
            } else {
                this.isId = val
                this.isCancel = !this.isCancel
            }
            if (this.isCancel) {
                for (var i = 0; i < this.params.customers.length; i++) {
                    if (this.params.customers[i].notifyItemIds.indexOf(val) !== -1) {
                        return
                    } else {
                        this.params.customers[i].notifyItemIds.push(val)
                        this.isId = ''
                    }
                }
            } else {
                this.params.customers.forEach(v => {
                    v.notifyItemIds.splice(v.notifyItemIds.indexOf(val), 1)
                })
            }
        },
        // 分类复选框改变
        handleCheckedChange1(index, arr) {
            if (this.categoryList2[index].arr.length !== arr.length) {
                this.categoryList1[index].isIndeterminate = true
            } else {
                this.categoryList1[index].isIndeterminate = false
            }
        },
        // 分类全选
        all1(val, index) {
            let arr = []
            if (this.categoryList1[index].isAll !== val.isAll) {
                this.categoryList1[index].arr = []
                this.categoryList1[index].isIndeterminate = true
            } else {
                val.childItem.forEach(v => {
                    arr.push(v.id)
                })
                this.categoryList1[index].arr = arr
                this.categoryList1[index].isIndeterminate = false
            }
            this.createIds = []
            this.categoryList1.forEach(v => {
                if (v.arr.length !== 0) {
                    this.createIds.push(v.arr)
                }
            })
            this.arrs = []
            this.arrs = this.flatten(this.createIds)
            this.params.customers.forEach(v => {
                v.notifyItemIds = []
                v.notifyItemIds = this.arrs
            })
        },
        // 连接多个数组
        flatten(arr) {
            return [].concat(...arr.map(x => Array.isArray(x) ? this.flatten(x) : x))
        },
        // 提交
        toSubmit() {
            this.newParams = []
            this.categoryList1.forEach(item => {
                item.arr.forEach(i => {
                    this.newParams.push(i)
                })
            })

            this.params.customers = []
            var arr = []
            this.companyCheckList.forEach(item => {
                if (item.ids.length) {
                    item.ids.forEach(i => {
                        arr.push(i)
                        this.params.customers.push({
                            customerId: i,
                            notifyItemIds: this.newParams
                        })
                    })
                }
            })
            if (this.params.accountList.length === 0) {
                this.$message.error('请输入账号！')
            } else if (this.params.customers.length === 0) {
                this.$message.error('客户不能为空！')
            } else {
                this.ajax.json('/risk/server/notify/save', this.params).then(res => {
                    if (res.code === '200') {
                        this.$message.success('新增成功！')
                        this.$router.push('/allocation')
                    } else {
                        this.$message.error('新增失败！')
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
