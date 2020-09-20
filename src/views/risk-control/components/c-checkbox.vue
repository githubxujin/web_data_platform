<template>
    <div class="search-form-box" :class="{enter:isEnter}">
        <el-form ref="search-form" size="mini" label-width="80px" class="search-form f12">
            <el-form-item v-for="(v,k) in checkData" :key="v.id" :label="v.name">
                <el-row type="flex">
                    <el-checkbox :indeterminate="v.isIndeterminate" :key="'a'+v.id" v-model="v.checked" @change="v => { handleCheckAllChange(v,k)}">全选</el-checkbox>
                    <el-checkbox-group v-model="v.checkList" @change="v=>{handleCheckedCitiesChange(v,k)}">
                        <el-checkbox v-for="(c,i) in v.childItem" :key="i" :label="c.id">{{c.name}}<span class="f10 fc-b1" v-if="c.count">({{c.count}})</span></el-checkbox>
                    </el-checkbox-group>
                </el-row>
            </el-form-item>
        </el-form>
        <div class="search-btn">
            <div class="c-search-btn" @click="unfold">更多选项 <i class="iconfont f12 icon-tongyongzhankai" :class="{act:isEnter}" /></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['list', 'isAll'],
    data () {
        return {
            isEnter: false,
            isIn: false,
            isIndeterminate: false,
            checkList: [],
            checkData: []
        }
    },
    watch: {
        list (v) {
            if (v) {
                this.setData()
            }
        }
    },
    mounted () {
        this.setData()
    },
    methods: {
        // 展开/收起
        unfold () {
            this.isEnter = !this.isEnter
        },
        mouseover (e) {
            this.isEnter = true
            this.isIn = true
        },
        mouseleave (e) {
            this.isIn = false
            setTimeout(() => {
                if (this.isIn) return
                this.isEnter = false
            }, 800);
        },
        setData () {
            this.checkData = []
            this.list && this.list.map(c => this.checkData.push({ checked: !!this.isAll, checkList: [], isIndeterminate: false, ...c }))

            if (this.isAll) {
                this.checkData.map(v => {
                    v.childItem.map(c => {
                        v.checkList.push(c.id)
                    })
                })

                // 默认全选数据
                this.submitHand()
            }


        },
        handleCheckAllChange (val, k) {
            let arr = val ? this.checkData[k].childItem : [];
            let ids = []
            arr.map(v => {
                ids.push(v.id)
            })
            this.checkData[k].checkList = ids
            this.checkData[k].isIndeterminate = false;

            this.submitHand()
        },
        handleCheckedCitiesChange (value, k) {
            let arr = this.checkData[k].childItem || []
            let checkedCount = value.length;
            this.checkData[k].checked = checkedCount === arr.length;
            this.checkData[k].isIndeterminate = checkedCount > 0 && checkedCount < arr.length;

            this.submitHand()
        },
        submitHand () {
            let checkList = []
            this.checkData.map(v => {
                checkList = [...checkList, ...v.checkList]
            })
            this.$emit('search', checkList)
        }
    }
}
</script>
<style lang="less" scoped>
::v-deep {
    .el-form--inline .el-form-item {
        margin-right: 14px;
        display: block;
    }
    .el-checkbox {
        margin-left: 10px;
    }
    .el-checkbox-group {
        .el-checkbox {
            margin-left: 20px;
        }
    }
    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
        margin-bottom: 10px;
    }
}
.dark {
    /deep/ .el-form-item__label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #43a1ac;
        letter-spacing: 0.54px;
    }
    .search-form-box {
        position: relative;
        padding-bottom: 10px;
        .search-form {
            // display: flex;
            // justify-content: space-between;
            position: relative;
            height: 80px;
            overflow: hidden;
            // transition: height 0.5s 0s;
        }
        &.enter {
            .search-form {
                height: 100%;
            }
        }
        .search-btn {
            position: absolute;
            left: calc((1190px - 357px) / 2);
            bottom: -13px;
            width: 357px;
            height: 29px;
            text-align: center;
            padding-top: 5px;
            z-index: 99;
            cursor: pointer;
            .c-search-btn {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #43a1ac;
                letter-spacing: 0;
                text-align: center;
                vertical-align: middle;
                position: relative;
                z-index: 2;
                .iconfont {
                    display: inline-block;
                    transform: rotate(0);
                }
                .act {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
.light {
    .el-form-item__label {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #4064d4;
        letter-spacing: 0.54px;
    }
    .search-form-box {
        position: relative;
        padding-bottom: 10px;
        .search-form {
            // display: flex;
            // justify-content: space-between;
            position: relative;
            height: 80px;
            overflow: hidden;
            // transition: height 0.5s 0s;
        }
        &.enter {
            .search-form {
                height: 100%;
            }
        }
        .search-btn {
            position: absolute;
            left: calc((1190px - 357px) / 2);
            bottom: -13px;
            width: 357px;
            height: 29px;
            text-align: center;
            padding-top: 5px;
            z-index: 99;
            cursor: pointer;
            .c-search-btn {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #4064d4;
                letter-spacing: 0;
                text-align: center;
                vertical-align: middle;
                position: relative;
                z-index: 2;
                .iconfont {
                    display: inline-block;
                    transform: rotate(0);
                }
                .act {
                    transform: rotate(180deg);
                }
            }
        }
    }
}
</style>


