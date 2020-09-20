<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">招标单位名称规范明细</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.oldTenderName" clearable placeholder="招标单位名称-调整前"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.newTenderName" clearable placeholder="招标单位名称-调整后"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.coreCompany' clearable filterable placeholder="所属承建单位">
                        <el-option v-for="(v,i) in company" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="icon-shujuzhongxin-xinzeng iconfont" @click="isCompile=false,dialogVisible=true,restForm()"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
                </el-tooltip>
            </el-row>

            <div>
                <el-table :data="list">
                    <el-table-column type="index" label="序号" width="80" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="oldTenderName" label="招标单位名称-调整前" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="newTenderName" label="招标单位名称-调整后" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="coreCompany" label="所属承建单位" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="160" align="center">
                        <template slot-scope="item">
                            <el-button type="primary" plain @click="dialogVisible=true,isCompile=true,toCompile(item.row)">编辑</el-button>
                            <el-button type="danger" plain @click="toDel(item.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <el-dialog v-if="dialogVisible" :title="(isCompile ? '编辑' : '添加') + '招标单位名称规范'" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px">
                <div class="form-in">
                    <el-form ref="formData" :rules="rules" :model="formData" label-width="160px">
                        <el-form-item prop="oldTenderName" label="招标单位名称-规范前">
                            <el-input v-model="formData.oldTenderName" clearable @change="checkName" placeholder="请输入招标单位名称-规范前"></el-input>
                        </el-form-item>
                        <el-form-item prop="" label="招标单位名称-规范后">
                            <el-input v-model="formData.newTenderName" clearable placeholder="请输入招标单位名称-规范后"></el-input>
                        </el-form-item>
                        <el-form-item prop="coreCompany" label="所属承建单位">
                            <el-select v-model='formData.coreCompany' clearable filterable allow-create placeholder="请选择所属承建单位" style="width:100%;">
                                <el-option v-for="(v,i) in company" :key="i" :label='v' :value='v'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="info" @click="dialogVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="toSubmit('formData')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialogVisible: false,
            dialogVisible1: false,
            isCompile: false,
            isRepetition: false,
            total: 0,
            params: {
                current: 1,
                size: 10,
                oldTenderName: '',
                newTenderName: '',
                coreCompany: ''
            },
            formData: {
                id: '',
                oldTenderName: '',
                newTenderName: '',
                coreCompany: ''
            },
            delId: '',
            company: [],
            activeName: 'first',
            list: [],
            rules: {
                oldTenderName: [
                    {
                        required: true,
                        message: '请输入调整前的名称',
                        trigger: 'blur'
                    }
                ],
                coreCompany: [
                    {
                        required: true,
                        message: '请选择所属承建单位',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    created () {
        this.getCompany()
        this.getList()
    },
    methods: {
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/tender/name/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        getCompany () {
            this.$http('/dcp/get/core/company/list', {}, { type: 'get' }).then(
                res => {
                    this.company = res.data
                }
            )
        },
        //
        checkName (oldTenderName) {
            this.$http('/dcp/is/tender/name/exist', { oldTenderName }).then(
                res => {
                    this.isRepetition = res.data
                }
            )
        },
        // 提交
        toSubmit (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isCompile) {
                        this.$http(
                            '/dcp/update/tender/name',
                            this.formData
                        ).then(res => {
                            this.getList()
                            this.$message.success('编辑成功')
                            this.dialogVisible = false
                        })
                    } else {
                        if (this.isRepetition) {
                            this.$confirm(
                                '当前名称规范已存在，确定覆盖?',
                                '提示',
                                {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    center: true
                                }
                            )
                                .then(() => {
                                    this.$http(
                                        '/dcp/add/tender/name',
                                        this.formData
                                    ).then(res => {
                                        this.getList()
                                        this.$message.success('添加成功')
                                        this.dialogVisible = false
                                    })
                                })
                                .catch(() => { })
                        } else {
                            this.$http(
                                '/dcp/add/tender/name',
                                this.formData
                            ).then(res => {
                                this.getList()
                                this.$message.success('添加成功')
                                this.dialogVisible = false
                            })
                        }
                    }
                } else {
                    // alert('error submit!!');
                    return false
                }
            })
        },
        // 编辑
        toCompile (row) {
            this.formData = {
                id: row.id,
                oldTenderName: row.oldTenderName,
                newTenderName: row.newTenderName,
                coreCompany: row.coreCompany
            }
        },
        // 删除
        toDel (id) {
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true
            })
                .then(() => {
                    this.$http(
                        '/dcp/deleted/tender/name',
                        { id },
                        { type: 'formData' }
                    ).then(res => {
                        // this.dialogVisible1 = false
                        this.getList()
                        this.$message.success('删除成功')
                    })
                })
                .catch(() => { })
        },
        // 导出
        toExport () {
            this.$http('/dcp/export/tender/name', this.params, {
                type: 'export'
            })
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                oldTenderName: '',
                newTenderName: '',
                coreCompany: ''
            }
            this.getList()
        },
        // 重置表单
        restForm () {
            this.formData = {
                id: '',
                oldTenderName: '',
                newTenderName: '',
                coreCompany: ''
            }
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
/deep/ .el-button--danger.is-plain {
    color: #bb4d31;
    &:hover {
        color: #bb4d31;
        border-color: #bb4d31;
    }
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
        border: 1px solid #366f71;
        border-radius: 2px;
        font-size: 18px;
        cursor: pointer;
        margin-right: 14px;
        &:hover {
            color: #292b2f;
            background: #43a1ac;
            border: 1px solid #43a1ac;
        }
    }
}
.form-in {
    padding: 0 87px 0 67px;
}
/deep/ .el-dialog__body {
    padding-bottom: 8px;
}

/deep/ .to-del {
    .el-dialog__body {
        p {
            margin: 0;
        }
        padding-bottom: 30px;
    }
}
</style>