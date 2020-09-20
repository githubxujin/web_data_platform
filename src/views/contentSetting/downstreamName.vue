<template>
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">下游名称规范明细</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.oldName" clearable placeholder="下游名称-调整前"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.newName" clearable placeholder="下游名称-调整后"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.companyName' clearable filterable placeholder="所属客户">
                        <el-option v-for="v in salerNameList" :key="v" :label="v" :value="v"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.source' clearable placeholder="数据源">
                        <el-option label="流向数据" :value="1"></el-option>
                        <el-option label="发票数据" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="iconfont icon-shujuzhongxin-xinzeng" @click="isCompile=false,dialogVisible=true,restForm()"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></span>
                </el-tooltip>
            </el-row>

            <div>
                <el-table :data="list">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="oldName" label="下游名称-调整前" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="newName" label="下游名称-调整后" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="companyName" label="所属客户" min-width="200" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="companyName" label="数据源" show-overflow-tooltip>
                        <template slot-scope="item">
                            {{ item.row.source === 1 ? '流向数据' : '发票数据' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="160" align="center">
                        <template slot-scope="item">
                            <el-button type="info" plain @click="dialogVisible=true,isCompile=true,toRedact(item.row)">编辑</el-button>
                            <el-button type="danger" plain class="del-col" @click="toDel(item.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
            <el-dialog v-if="dialogVisible" :title="(isCompile ? '编辑' : '添加')" :visible.sync="dialogVisible" :close-on-click-modal="false" width="600px">
                <div class="form-in">
                    <el-form ref="formData" :rules="rules" :model="formData" label-width="130px">
                        <el-form-item label="数据源" prop="source">
                            <el-select v-model="formData.source" clearable placeholder="请选择" style="width:100%;">
                                <el-option label="流向数据" :value="1"></el-option>
                                <el-option label="发票数据" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="下游名称-调整前" prop="oldName">
                            <el-input v-model="formData.oldName" maxlength="50" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="下游名称-调整后" prop="newName">
                            <el-input v-model="formData.newName" maxlength="50" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="所属客户" prop="companyName">
                            <el-select v-model="formData.companyName" clearable placeholder="请选择" style="width:100%;">
                                <el-option v-for="v in salerNameList1" :key="v" :label="v" :value="v"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button size="mini" type="info" @click="dialogVisible = false,restForm()">取 消</el-button>
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
            total: 0,
            params: {
                current: 1,
                size: 10,
                id: '',
                type: '2', // 类型(1:药品名称2:下游名称)
                companyName: '', // 客户名称
                oldName: '', // 原名称
                newName: '', // 新名称
                source: '' // 所属表(1：流向表)
            },
            formData: {
                id: '',
                type: '2',
                companyName: '',
                source: 1,
                oldName: '',
                newName: ''
            },
            salerNameList: [],
            salerNameList1: [],
            activeName: 'first',
            list: [],
            rules: {
                oldName: [
                    {
                        required: true,
                        message: '请输入下游名称-调整前',
                        trigger: 'blur'
                    }
                ],
                newName: [
                    {
                        required: true,
                        message: '请输入下游名称-调整后',
                        trigger: 'blur'
                    }
                ],
                companyName: [
                    {
                        required: true,
                        message: '请选择所属客户',
                        trigger: 'change'
                    }
                ],
                source: [
                    {
                        required: true,
                        message: '请选择数据源',
                        trigger: 'change'
                    }
                ]
            }
        }
    },
    created () {
        this.getSalerName()
        this.getList()
    },
    methods: {
        // 获取销售方
        getSalerName () {
            this.$http('/dcp/query/seller/list', {}, { type: 'get' }).then(res => {
                this.salerNameList = res.data || []
                this.salerNameList1 = res.data || []
            })
        },
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/query/sale/specification/page', this.params, { type: 'formData' }).then(res => {
                this.list = res.data.records || []
                this.total = res.data.total
            })
        },
        // 提交
        toSubmit (formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.isCompile) {
                        this.formData.type = '2'
                        this.$http('/dcp/sale/specification/update', { ...this.formData }, { type: 'formData' }).then(res => {
                            this.$message.success('编辑成功')
                            this.restForm()
                            this.getList()
                            this.dialogVisible = false
                        })

                    } else {
                        this.$http('/dcp/sale/specification/add', { ...this.formData }, { type: 'formData' }).then(res => {
                            this.$message.success('添加成功')
                            this.restForm()
                            this.getList()
                            this.dialogVisible = false
                        })
                    }
                } else {
                    // alert('error submit!!');
                    return false
                }
            })
        },
        // 编辑
        toRedact (v) {
            // console.log(v);
            this.isCompile = true
            this.formData = {
                id: v.id,
                source: v.source,
                companyName: v.companyName,
                oldName: v.oldName,
                newName: v.newName
            }
        },
        // 删除
        toDel (id) {
            //  如果当前页 删除后没有数据，回到第一页
            let isOneData = this.list.length === 1
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                this.$http('/dcp/sale/specification/delete', { id }, { type: 'formData' }).then(res => {
                    this.$message.success('删除成功')
                    if (isOneData) {
                        this.$set(this.params, 'current', 1)
                    }
                    this.getList()
                })
            })
                .catch(err => {
                    console.log(err)
                })
        },
        // 导出
        async exportData () {
            await this.$http(
                '/dcp/query/sale/specification/export',
                this.params,
                { type: 'export' }
            )
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                id: '',
                type: '2', // 类型(1:药品名称2:下游名称)
                companyName: '', // 客户名称
                oldName: '', // 原名称
                newName: '' // 新名称
            }
            this.getList()
        },
        // 重置表单
        restForm () {
            this.formData = {
                id: '',
                type: '2',
                companyName: '',
                source: 1,
                oldName: '',
                newName: ''
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