<template>
    <div>
        <div class="industryBox mt20 pl30">
            <div class="title mb20">行业类别</div>
            <el-radio-group v-model="sectionChoice" @change="changeCrea" class="radioGroup">
                <el-radio-button v-for="item in industryCategoryList" :key="item.value" :label="item.label"></el-radio-button>
            </el-radio-group>
        </div>
        <div class="classify mt20 mb20 pl30 pt30 pr30">
            <div class="title mb30">舆情分类</div>
            <div class="ml20">
                <div class="createy-checks" v-for="(item,index) in checkData" :key="index">
                    <p class="checks-title">{{item.name}}</p>
                    <div class="box">
                        <el-checkbox-group v-for="v in item.childItem" :key="v.id" v-model="modelList[index].checkList" @change="checkChange($event,item.id,index)" class="checks-cont">
                            <el-checkbox :label="v.id">{{v.name}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { industryCategoryList } from "@/utils/common"
export default {
    data() {
        return {
            industryCategoryList,
            sectionChoice: '',
            modelList: [],
            checkData: [],
            industryType: {
                '其他': 0,
                '基建工程': 1,
                '医药医疗': 2,
                '能源化工': 3
            }
        }
    },
    created() {
        this.sectionChoice = '基建工程'
        this.getCreately()
    },
    methods: {
        // 切换行业
        changeCrea(v) {
            this.modelList.forEach(v => {
                v.checkList = []
            })
            let industryType = this.industryType[v]
            this.ajax.get('/risk/m/notify/major/event/detail', { industryType }).then(res => {
                let keys = Object.keys(res.data)
                this.modelList.forEach(v => {
                    keys.forEach(e => {
                        if (v.parentItemId === Number(e)) {
                            v.checkList = res.data[e]
                        }
                    })
                    v.checkList = [...v.checkList]
                })
                this.modelList = [...this.modelList]
            })
        },
        checkChange(v, id, index) {
            let params = {
                industryType: this.sectionChoice,
                itemIds: v,
                parentItemId: id
            }
            if (!params.industryType) {
                return this.$message.error('请选择行业')
            } else {
                params.industryType = this.industryType[params.industryType]
            }
            this.ajax.post('/risk/m/notify/major/event/update', params).then(res => { })
        },
        // 获取分类
        getCreately() {
            this.ajax.get('/risk/server/notify/item/list').then(res => {
                this.checkData = res.data
                this.checkData.forEach(v => {
                    this.modelList.push({
                        checkList: [],
                        parentItemId: v.id
                    })
                })
                this.changeCrea(this.sectionChoice)
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .industryBox {
        width: 1360px;
        height: 122px;
        padding-top: 29px;
        box-sizing: border-box;
    }
    .classify {
        width: 1360px;
        height: 587px;
        box-sizing: border-box;
    }
    .title {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        letter-spacing: 0.5px;
        line-height: 16px;
    }
    h3 {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #333333;
        letter-spacing: 0;
        height: 20px;
        line-height: 20px;
        position: relative;
        padding-left: 11px;
        &:before {
            content: "";
            width: 5px;
            height: 16px;
            background: #ff8e36;
            border-radius: 3px;
            border-radius: 2.5px;
            position: absolute;
            top: 2px;
            left: 0;
        }
        &:after {
            content: "";
            width: 100%;
            height: 1px;
            background: #e2e4ed;
            border-radius: 3px;
            border-radius: 2.5px;
            position: absolute;
            bottom: -8px;
            left: 0;
        }
    }
    .createy-checks {
        display: flex;
        .el-checkbox-group.checks-cont {
            margin-bottom: 30px;
        }
        .checks-title {
            width: 90px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            letter-spacing: 0.54px;
            margin: 0;
        }
        .box {
            flex: 1;
            .checks-cont {
                display: inline-block;
                /deep/ .el-checkbox {
                    margin: 0 20px 0 0;
                }
            }
        }
    }
    .dark {
        .title {
            color: #ffffff;
        }
        .industryBox {
            background: #232528;
        }
        .classify {
            background: #232528;
        }
        .createy-checks {
            .checks-title {
                color: #43a1ac;
            }
        }
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
        .industryBox {
            background: #f2f5fd;
        }
        .classify {
            background: #f2f5fd;
        }
        .createy-checks {
            .checks-title {
                color: #333;
            }
        }
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


