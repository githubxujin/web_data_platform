<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="laiyaun">
                <el-input v-model="params.source" maxlength="64" clearable placeholder="公众号名称" style="width:240px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="add-export">
            <el-tooltip class="item" effect="dark" content="添加" placement="top">
                <span class="el-icon-plus" @click="toAdd"></span>
            </el-tooltip>
        </div>
        <el-table :data="list" borderstyle="width: 100%">
            <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="accountName" label="公众号名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="account" label="公众号ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="添加日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="添加人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="unGetDay" label="未获取内容时长" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" width="220" align="center">
                <template slot-scope="item">
                    <el-button type="blue" plain size="mini" @click="isShow = true,isAdd = false,toCompile(item.row.id)">编辑</el-button>
                    <el-button v-if="item.row.isEnable === 1" type="danger" plain size="mini" @click="toStop(item.row.id,0)">停用</el-button>
                    <el-button v-else type="primary" plain size="mini" @click="toStop(item.row.id,1)">启用</el-button>
                    <el-button type="danger" plain size="mini" @click="toStop(item.row.id,2)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="totalSize>0" @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalSize"></el-pagination>
        <!-- <div class="page-nav" style="margin-right:20px;margin-top:50px;">
            <el-pagination background layout="jumper, prev, pager, next, total" :total.sync='totalSize' :page-size="params.pageSize" :current-page.sync="params.current" @current-change="getList()">
            </el-pagination>
        </div> -->
        <el-dialog :title="isAdd ? '添加' : '编辑'" v-if="isShow " :visible.sync="isShow" width="600px">
            <el-form :model="form" :label-position="labelPosition" label-width="85px">
                <el-form-item label="公众号名称">
                    <el-input v-model="form.accountName" maxlength="64" clearable></el-input>
                </el-form-item>
                <el-form-item label="公众号ID">
                    <el-input v-model="form.account" maxlength="64" clearable></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="isShow = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="isShow = false,submitCollect(id)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            labelPosition: 'right',
            isShow: false,
            isAdd: true,
            isRedact: false,
            totalSize: 0,
            params: {
                current: 1,
                size: 10,
                source: ''
            },
            id: '',
            form: {
                id: '',
                account: '',
                accountName: ''
            },
            list: [],
            sourceList: []
        }
    },
    created () {
        this.doSource()
        this.getList()
    },
    methods: {
        // 公众号来源
        doSource () {
            this.$http('/dcp/server/wx/account/select', {}, { type: 'get' }).then(res => {
                // console.log(res);
                this.sourceList = res.data
            })
        },
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/server/wx/account/list', this.params, { type: 'get' }).then(res => {
                // console.log(res);
                this.list = res.data.records || []
                this.totalSize = res.data.total
            })
        },
        // 添加清空内容
        toAdd () {
            this.isShow = true
            this.isAdd = true
            this.id = '',
                this.form = {
                    id: '',
                    account: '',
                    accountName: ''
                }
        },
        // 查询编辑信息
        toCompile (id) {
            this.id = id
            this.$http('/dcp/server/wx/account/view', { id }, { type: 'get' }).then(res => {
                // console.log(res);
                this.form = res.data || {}
            })
        },
        // 添加/编辑 - 提交
        submitCollect (id) {
            // console.log(b);
            let text = ''
            if (!id) {
                text = '添加'
                this.$http('/dcp/server/wx/account/save', this.form).then(res => {
                    // console.log(res);
                    if (res.code === '200') {
                        this.$message.success(text + '成功！')
                        this.getList()
                    }
                })
            } else {
                text = '编辑'
                this.$http('/dcp/server/wx/account/save', this.form).then(res => {
                    // console.log(res);
                    if (res.code === '200') {
                        this.$message.success(text + '成功！')
                        this.getList()
                    }
                })
            }
            this.form = {
                id: '',
                account: '',
                accountName: ''
            }
        },
        // 停用
        toStop (id, optType) {
            let text = ''
            if (optType === 0) {
                text = '停用'
            } else if (optType === 1) {
                text = '启用'
            } else {
                text = '删除'
            }
            this.$confirm('是否确认' + text, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
                // type: 'warning'
            }).then(() => {
                // console.log('确定');
                this.$http('/dcp/server/wx/account/opt', { id, optType }, { type: 'formdata' }).then(res => {
                    if (res.code === '200') {
                        this.$message.success(text + '成功！')
                        this.getList()
                    }
                })
            })
        },
        // 重置
        reset () {
            this.params = {
                current: 1,
                size: 10,
                source: ''
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        }
    },
    filters: {
    }
}   
</script>
<style lang="less" scoped>
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 27px;
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
/deep/ .el-dialog {
    .el-dialog__body {
        padding: 50px 105px 30px;
        .el-form-item__label {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            line-height: 40px;
            color: rgba(255, 255, 255, 0.8);
        }
    }
}
</style>