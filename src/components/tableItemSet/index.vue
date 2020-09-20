<template>
    <el-dialog title="表头设置" :visible.sync="newItemDialog" :close-on-click-modal="false" class="title-set" width="600px">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="selectAll">全选</el-checkbox>
        <el-checkbox-group v-model="checkboxGroup1" size="small" @change="changeSelect">
            <template v-for="(item,index) in tableArr">
                <el-checkbox :label="item.propName" :key="index" class="mt20">{{item.title}}</el-checkbox>
            </template>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
            <el-button type="info" size="mini" @click="newItemDialog = false">取 消</el-button>
            <el-button type="primary" size="mini" @click="sureFun">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'error-page',
    data () {
        return {
            newItemDialog: false,
            isIndeterminate: true,
            checkAll: false,
            tableArr: [],
            checkboxGroup1: []
        }
    },
    methods: {
        changeSelect (val) {
            // console.log('val',val);
            this.checkAll = val.length === this.tableArr.length
            this.isIndeterminate = val.length > 0 && val.length < this.tableArr.length;
        },
        selectAll (val) {
            this.checkboxGroup1 = val ? this.tableArr.map(i => i.propName) : []
            this.isIndeterminate = false;
        },
        sureFun () {
            let arr = []
            this.tableArr.forEach(i => {
                if (this.checkboxGroup1.includes(i.propName)) {
                    arr.push(i.propName)
                }
            })
            if (arr.length === 0) {
                this.$message.warning('选项不能为空！')
                return false
            }
            // console.log('this.checkboxGroup1',this.checkboxGroup1);
            // return
            // this.http('/userConfig/save', { key: this.$route.meta.key, value: arr.join(',') })
            this.$emit('setOK', this.checkboxGroup1)
        }
    }
}
</script>

<style lang="less" scoped>
body {
    background-color: #f8f8f8;
}

.el-checkbox.is-bordered.el-checkbox--small {
    width: 180px;
    overflow: hidden;
    &:first-child {
        margin-left: 10px;
    }
}
.error-page {
    padding: 40px !important;
    position: relative;
    height: 500px;
    height: 500px;
    background: url('../../assets/images/404.jpg') no-repeat center center;
    h2 {
        display: none;
    }
    .text {
        margin-top: 340px;
        text-align: center;
        .h3 {
            font-size: 18px;
            color: #666;
            padding-bottom: 20px;
        }
    }
}
.title-set {
    /deep/ .el-dialog__body {
        padding: 30px 64px;
        .el-checkbox-group {
            display: flex;
            flex-wrap: wrap;
            .el-checkbox {
                width: 33%;
                margin-right: 0;
            }
        }
    }
    /deep/ .el-button--mini {
        width: 68px;
        height: 24px;
        line-height: 24px;
        padding: 0;
    }
    // /deep/.el-checkbox__input.is-focus .el-checkbox__inner {
    //     border-color: #43a1ac;
    // }
}
</style>
