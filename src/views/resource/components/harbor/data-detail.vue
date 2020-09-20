<template>
    <div>
        <div class="table-wrap mt20">
            <div class="table-title">港口库</div>
            <el-form :model="params" :inline="true" ref="form" :rules="rules" size="medium" class="el-serach-form">
                <el-form-item style="width: 150px">
                    <el-select v-model="params.portType" clearable placeholder="港口类型">
                        <el-option label="上市" value="上市"></el-option>
                        <el-option label="非上市" value="非上市"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model.trim="params.portName" filterable remote :remote-method="portNameRemoteMethod" clearable placeholder="港口名称">
                        <el-option v-for="(s, index) in portNameList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 150px">
                    <el-select v-model.trim="params.portCode" filterable remote :remote-method="portCodeRemoteMethod" clearable placeholder="港口代码">
                        <el-option v-for="(s, index) in portCodeList" :label="s" :value="s" :key="index"></el-option>
                    </el-select>
                </el-form-item>

                <div class="istonnageBox" @click="tonnageBox" v-if="istonnageBox">最大靠泊能力</div>
                <div class="tonnageBox" v-else>
                    <el-form-item style="width: 62px" prop="minTonnage">
                        <el-input v-model.number="params.minTonnage"></el-input>
                    </el-form-item>
                    <div class="fanwei">至</div>
                    <el-form-item style="width: 62px" prop="maxTonnage">
                        <el-input v-model.number="params.maxTonnage"></el-input>
                    </el-form-item>
                </div>

                <div class="istonnageBox" @click="lengthBox" v-if="islengthBox">最大长度</div>
                <div class="tonnageBox" v-else>
                    <el-form-item style="width: 62px" prop="minLength">
                        <el-input v-model.number="params.minLength"></el-input>
                    </el-form-item>
                    <div class="fanwei">至</div>
                    <el-form-item style="width: 62px" prop="maxLength">
                        <el-input v-model.number="params.maxLength"></el-input>
                    </el-form-item>
                </div>

                <div class="istonnageBox" @click="depthBox" v-if="isdepthBox">最大水深</div>
                <div class="tonnageBox" v-else>
                    <el-form-item style="width: 62px" prop="minDepth">
                        <el-input v-model.number="params.minDepth"></el-input>
                    </el-form-item>
                    <div class="fanwei">至</div>
                    <el-form-item style="width: 62px" prop="maxDepth">
                        <el-input v-model.number="params.maxDepth"></el-input>
                    </el-form-item>
                </div>

                <el-form-item>
                    <el-button type="primary" size="medium" @click="submitForm('form')">查询</el-button>
                    <el-button type="info" size="medium" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class="el-iconfont">
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
                </el-tooltip>
            </el-row>

            <el-table :data="list">
                <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="portType" label="港口类型" show-overflow-tooltip width="140"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="portName" label="港口名称" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="portCode" label="港口代码" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="berthNum" label="泊位数量" show-overflow-tooltip></el-table-column>
                <el-table-column :formatter="formatLabel" prop="maxTonnage" label="最大靠泊能力(吨)" show-overflow-tooltip width="180"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="maxLength" label="最大长度(米)" show-overflow-tooltip width="140"></el-table-column>
                <el-table-column :formatter="formatLabel" prop="maxDepth" label="最大水深(米)" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop='remark' label='操作' width='120' show-overflow-tooltip fixed="right" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" plain @click="$router.push({ name: 'resource-harbor-detail', query: {id: scope.row.id,portName:scope.row.portName}})">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList"
                layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        var numberRule = (rule, value, callback) => {
            if (value) {
                if (typeof (value) !== "number") {
                    callback(new Error('请输入数字值'))
                } else {
                    callback()
                }
            } else {
                callback()
            }
        }
        return {
            list: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            portNameList: [],
            portCodeList: [],
            rules: {
                maxTonnage: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                minTonnage: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                minLength: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                maxLength: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                minDepth: [{ validator: numberRule, trigger: ['blur', 'change'] }],
                maxDepth: [{ validator: numberRule, trigger: ['blur', 'change'] }],
            },
            istonnageBox: true,
            islengthBox: true,
            isdepthBox: true,
        }
    },
    created () {
        this.searchRecord()
    },
    // watch: {
    //     params: {
    //         handler: function (val, oldVal) {
    //             if(!val.minTonnage && !val.maxTonnage)this.istonnageBox = true
    //             if(!val.minLength && !val.maxLength)this.islengthBox = true
    //             if(!val.minDepth && !val.maxDepth)this.isdepthBox = true
    //         },
    //         deep: true
    //     }
    // },
    methods: {
        // tonnageBlur() {
        //     let { minTonnage, maxTonnage, minLength, maxLength, minDepth, maxDepth } = this.params
        //     if ((!minTonnage) && (!maxTonnage)) this.istonnageBox = true
        //     if ((!minLength) && (!maxLength)) this.islengthBox = true
        //     if ((!minDepth) && (!maxDepth)) this.isdepthBox = true
        // },
        tonnageBox () {
            this.istonnageBox = false
        },
        lengthBox () {
            this.islengthBox = false
        },
        depthBox () {
            this.isdepthBox = false
        },
        // 港口名称模糊查询
        portNameRemoteMethod (portName) {
            if (portName !== '') {
                this.ajax
                    .json('/dcp/port/info/port/name/vague/query', { portName }, { type: 'get' })
                    .then(res => {
                        this.portNameList = res.data
                    });
            } else {
                this.portNameList = [];
            }
        },
        // 港口代码模糊查询
        portCodeRemoteMethod (portCode) {
            if (portCode !== '') {
                this.ajax
                    .json('/dcp/port/info/port/code/vague/query', { portCode }, { type: 'get' })
                    .then(res => {
                        this.portCodeList = res.data
                    });
            } else {
                this.portCodeList = [];
            }
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList () {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/dcp/port/info/page/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        // 查询
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.getList()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
            this.istonnageBox = true
            this.islengthBox = true
            this.isdepthBox = true
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/port/info/export", this.params, { type: "export" })
                .then(res => { });
        }
    },
}
</script>

<style lang="scss" scoped>
.fanwei {
    display: inline-block;
    color: rgba(255, 255, 255, 0.8);
    line-height: 34px;
    margin-right: 10px;
    font-size: 14px;
}
.istonnageBox {
    display: inline-block;
    background: #1d1e23;
    width: 182px;
    height: 34px;
    border: 1px solid #2d3034;
    border-radius: 4px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    line-height: 34px;
    color: rgba(255, 255, 255, 0.8);
    text-indent: 13px;
    margin-right: 10px;
    &:hover {
        border-color: #366f71;
    }
}
.tonnageBox {
    display: inline-block;
    background: #1d1e23;
    width: 182px;
    height: 34px;
    line-height: 34px;
    border: 1px solid #2d3034;
    border-radius: 4px;
    margin-right: 10px;
    /deep/ .el-input__inner {
        border: 1px solid transparent;
    }
    /deep/ .el-form-item.is-error .el-input__inner,
    /deep/ .el-form-item.is-error .el-input__inner:focus,
    /deep/ .el-form-item.is-error .el-textarea__inner,
    /deep/ .el-form-item.is-error .el-textarea__inner:focus,
    /deep/ .el-message-box__input input.invalid,
    /deep/ .el-message-box__input input.invalid:focus {
        border-color: transparent;
    }
    &:hover {
        border-color: #366f71;
    }
}
.dark{
    .tonnageBox{
        /deep/ .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
    }
}
.light{
    .tonnageBox{
        /deep/ .el-input__inner{
            height: 32px;
            line-height: 32px;
        }
        background: #fff;
        border: 1px solid #DCDFE6;
        &:hover{
            border: 1px solid #4064D4;
        }
    }
    .istonnageBox{
        background: #fff;
        color: #666;
        font-family: sans-serif;
        border: 1px solid #DCDFE6;
        &:hover{
            border: 1px solid #4064D4;
        }
    }
    .fanwei{
        color: #666;
    }
}
</style>
