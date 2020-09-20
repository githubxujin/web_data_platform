<template>
    <div class="pb50">
        <div class="con-wrap">
            <h3 v-if="isNotification" @click="isNotification=false,toColle()">{{params.name}}<span><i class="iconfont icon-bianji"></i></span></h3>
            <el-input ref="inp" v-else class="tongzhi" v-model="params.name" maxlength="64" clearable autofocus @blur="onBlur"></el-input>
            <div class="inform">
                <div class="gmail-pro keyword">
                    <el-tag :key="tag" v-for="tag in emailsList" closable :disable-transitions="false" @close="handleClose1(tag)">
                        {{tag}}
                    </el-tag>
                    <el-input class="input-new-tag input-new-tag1" size="small" v-if="inputVisible1" v-model="inputValue1" ref="saveTagInput1" @blur="handleInputConfirm1">
                    </el-input>
                    <el-button v-else class="button-new-tag button-new-tag1" size="small" @click="showInput1">+ 新增接收邮箱</el-button>
                </div>
            </div>
        </div>
        <div class="con-wrap bot-wrap mt20">
            <div class="tabs-title">风险字段</div>
            <el-tag :key="tag" v-for="tag in keywordsList" closable :disable-transitions="false" @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新增</el-button>
        </div>
        <div class="fixed-bott">
            <el-button type="primary" size="medium" @click="goBack">返回</el-button>
            <el-button type="primary" size="medium" @click="toSubmit" style="margin-left:20px;">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['id', 'isCode'],
    data() {
        return {
            isRisk: 0,
            isNotification: true,
            inputVisible: false,
            inputVisible1: false,
            isTip: true,
            inputValue: '',
            inputValue1: '',
            isIconfont: false,
            isIconfont1: false,
            emailsList: [],
            keywordsList: [],
            params: {
                id: '',
                emails: [],
                name: '',
                keywords: []
            },
            riskId: ''
        }
    },
    created() {
        // 从props拿传过来的id
        // this.riskId = this.id
        // console.log(this.isCode);  // 1：复制 0：编辑
        this.getDetail()
    },
    methods: {
        onBlur() {
            this.isNotification = true
        },
        // 获取详情
        getDetail() {
            if (this.isCode === 1) {
                this.ajax.get('/dcp/server/wx/article/notify/view', { id: this.id }).then(res => {
                    // console.log(res);
                    this.params.name = res.data.name
                    this.keywordsList = res.data.keywords.split(',')
                })
            } else {
                this.ajax.get('/dcp/server/wx/article/notify/view', { id: this.id }).then(res => {
                    // console.log(res);
                    this.params = res.data || {}
                    this.emailsList = this.params.emails.split(',')
                    this.keywordsList = this.params.keywords.split(',')
                })
            }

        },
        // 传递状态
        goBack() {
            this.$emit('toBack', this.isRisk)
        },
        // 编辑名称
        toColle() {
            this.$nextTick(() => {
                this.$refs.inp.focus()
            })
        },
        // 新增接收邮箱通知 -------
        handleClose1(tag) {
            this.emailsList.splice(this.emailsList.indexOf(tag), 1)
            // console.log(this.emailsList)
        },
        showInput1() {
            this.inputVisible1 = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput1.$refs.input.focus()
            })
        },
        handleInputConfirm1() {
            var reg = new RegExp('^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$')
            if (!reg.test(this.inputValue1)) {
                // console.log(reg.test(this.inputValue1));
                this.$message.error('请输入正确的邮箱')
                this.inputVisible1 = false
                this.inputValue1 = ''
                return
            }
            // console.log('继续');
            if (!this.inputValue1 || this.inputValue1 === '') {
                this.inputVisible1 = false
                return
            }
            let inputValue1 = this.inputValue1
            //邮箱重复判断
            if (inputValue1) {
                this.emailsList.forEach(v => {
                    if (v === inputValue1) {
                        this.isIconfont1 = true
                        // this.inputValue1 = ''
                        this.$confirm('请勿添加重复的邮箱', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                            // type: 'warning'
                        }).then(() => {
                            this.inputValue1 = ''
                            this.inputVisible1 = false
                        })
                    }
                })
                if (this.isIconfont1) {
                    this.isIconfont1 = false
                    // this.inputVisible1 = false
                    return
                }
                this.emailsList.push(inputValue1)
                this.inputVisible1 = false
                this.inputValue1 = ''
            }
        },
        // 新增接收邮箱通知 -------

        // 风险字段
        handleClose(tag) {
            this.keywordsList.splice(this.keywordsList.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            //邮箱重复判断
            if (inputValue) {
                this.keywordsList.forEach(v => {
                    if (v === inputValue) {
                        this.isIconfont = true
                        // this.inputValue = ''
                        this.$confirm('风险字段标签中已存在该关键字', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                            // type: 'warning'
                        }).then(() => {
                            this.inputValue = ''
                            this.inputVisible = false
                        })
                        return
                    }
                })
                if (this.isIconfont) {
                    this.isIconfont = false
                    // this.inputVisible = false
                    return
                }
                this.keywordsList.push(inputValue)
                this.inputVisible = false
                this.inputValue = ''
            }
        },
        // 提交
        toSubmit() {
            if (!this.params.name) {
                this.$message.error('模板名称不能为空！')
            } else if (this.emailsList.length === 0) {
                this.$message.error('邮箱不能为空！')
            } else if (this.keywordsList.length === 0) {
                this.$message.error('关键字不能为空！')
            } else {
                this.params.emails = this.emailsList.join()
                this.params.keywords = this.keywordsList.join()
                this.ajax.json('/dcp/server/wx/article/notify/save', this.params).then(res => {
                    if (res.code === '200') {
                        this.$message.success('编辑成功!')
                        this.goBack()
                    }
                })
            }
        }
    },
    filters: {
    }
}   
</script>
<style lang="less" scoped>
.con-wrap {
    padding: 30px;
    background: #292b2f;
    .tabs-title {
        color: rgba(255, 255, 255, 0.8);
        font-size: 16px;
        margin-bottom: 20px;
    }
    h3 {
        cursor: pointer;
        font-size: 16px;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 0.5px;
        height: 20px;
        line-height: 20px;
        position: relative;
        padding-left: 11px;
        margin-bottom: 28px;
        margin-top: 2px;
        font-weight: normal;
        .icon-tongyong-bianji {
            font-size: 30px;
            position: absolute;
            top: 1px;
        }
        span {
            color: #43a1ac;
            font-size: 14px;
            margin-left: 5px;
        }
    }
    .tongzhi {
        width: 300px;
        position: relative;
        margin-top: -10px;
        margin-bottom: 20px;
        /deep/ .el-input__inner {
            font-family: PingFangSC-Regular;
            // border: 0;
            font-size: 16px;
            color: rgba(255, 255, 255, 0.8);
            letter-spacing: 0.5px;
        }
    }
    .inform {
        // padding: 30px 0 20px;
        p {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #909399;
            letter-spacing: 0;
            line-height: 20px;
            position: relative;
            padding-left: 25px;
            i {
                position: absolute;
                border-radius: 3px;
                text-align: center;
                font-size: 20px;
                background-color: #fff;
                color: #ffbc31;
                left: 0;
                top: 0;
            }
        }
        .keyword /deep/ {
            .el-tag,
            .el-button:focus,
            .el-button:hover {
                color: #43a1ac;
                background: #293e42;
                border-radius: 3px;
            }
            .el-tag {
                margin-right: 10px;
                font-size: 14px;
                height: 24px;
                line-height: 24px;
                border: 0;
                color: #43a1ac;
                background: #293e42;
                border-radius: 3px;
                margin-bottom: 10px;
                /deep/ .el-icon-close {
                    color: #43a1ac;
                    &:hover {
                        // color: #fff;
                        background: transparent;
                        // border-radius: 50%;
                    }
                }
            }
            .button-new-tag {
                margin-right: 10px;
                width: 135px;
                height: 24px;
                line-height: 23px;
                padding-top: 0;
                padding-bottom: 0;
                color: #d3d3d4;
                letter-spacing: 0.44px;
                border-radius: 3px;
            }
            .input-new-tag {
                width: 220px;
                height: 24px;
                color: #0486fe;
                // border-color: #0486fe;
                // margin-top: 20px;
                margin-right: 10px;
                // vertical-align: bottom;
                margin-bottom: 20px;
            }
            .button-new-tag1 {
                width: 115px;
            }
            /deep/ .input-new-tag1 {
                width: 220px;
                height: 24px;
                .el-input__inner {
                    // border-color: #0486fe;
                    height: 24px;
                }
            }
        }
        .gmail-pro {
            .el-tag {
                // width: auto;
                padding: 0 10px;
            }
        }
    }
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
        // margin-top: 20px;
        font-size: 14px;
        color: #43a1ac;
        background: #293e42;
        border-radius: 3px;
        height: 24px;
        line-height: 24px;
        border: 0;
        margin-bottom: 10px;
        /deep/ .el-icon-close {
            color: #43a1ac;
            &:hover {
                // color: #fff;
                background: transparent;
                // text-align: center;
                // line-height: 16px;
                // border-radius: 50%;
            }
        }
    }
    .button-new-tag {
        margin-right: 10px;
        width: 74px;
        height: 24px;
        line-height: 23px;
        padding-top: 0;
        padding-bottom: 0;
        color: #d3d3d4;
        letter-spacing: 0.44px;
        border-radius: 3px;
    }
    /deep/ .input-new-tag {
        width: 150px;
        height: 24px;
        color: #0486fe;
        // border-color: #0486fe;
        // margin-top: 20px;
        margin-right: 10px;
        // vertical-align: bottom;
        margin-bottom: 20px;
        .el-input__inner {
            // border-color: #0486fe;
            height: 24px;
        }
    }
    .button-new-tag1 {
        width: 115px;
    }
}
.fixed-bott {
    margin: 20px auto;
    width: 1360px;
    height: 70px;
    line-height: 70px;
    text-align: center;
    background: #2d3034;
    box-shadow: 0 -4px 8px 0 rgba(29, 30, 35, 0.8);
}
</style>