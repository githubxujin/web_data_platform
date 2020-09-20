<template>
    <div>
        <div class="table-title">动态推送</div>
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.name" maxlength="64" clearable placeholder="通知名称"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.emails" maxlength="100" clearable placeholder="接收邮箱"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.createBy" maxlength="64" clearable placeholder="创建人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.current = 1,getList()">查询</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="add-export">
            <el-tooltip class="item" effect="dark" content="新建模版" placement="top">
                <span class="el-icon-plus" @click="onPass(1)"></span>
            </el-tooltip>
        </div>
        <el-table :data="list" borderstyle="width: 100%">
            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
            <el-table-column prop="name" label="通知名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="emails" label="接收邮箱" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createBy" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" width="350" align="center">
                <template slot-scope="item">
                    <el-button type="blue" plain size="mini" @click="onPass(2,item.row.id,0)">编辑</el-button>
                    <el-button type="blue" plain size="mini" @click="onPass(2,item.row.id,1)">复制</el-button>
                    <el-button type="danger" v-if="item.row.isEnable === 1" plain size="mini" @click="toStop(item.row.id,0)">停用</el-button>
                    <el-button type="primary" v-else plain size="mini" @click="toStop(item.row.id,1)">启用</el-button>
                    <el-button type="danger" plain size="mini" @click="toStop(item.row.id,2)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-if="totalSize>0" @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalSize"></el-pagination>
        \

    </div>
</template>
<script>
export default {
    data () {
        return {
            totalSize: 0,
            params: {
                current: 1,
                size: 10,
                emails: '',
                name: '',
                createBy: ''
            },
            list: []
        }
    },
    created () {
        this.getList()
    },
    methods: {
        // 传递状态
        onPass (v, id, isCode) {
            this.$emit('passData', v, id, isCode)
        },
        // 获取列表
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/server/wx/article/notify/list', this.params, {
                type: 'get'
            }).then(res => {
                // console.log(res);
                this.list = res.data.records || []
                this.totalSize = res.data.total
            })
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
                this.$http(
                    '/dcp/server/wx/article/notify/opt',
                    {
                        id,
                        optType
                    }, { type: 'formData' }).then(res => {
                        // console.log(res);
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
                emails: '',
                name: '',
                createBy: ''
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        }
    },
    filters: {},
    components: {}
}
</script>
<style lang="less" scoped>
/deep/ .el-dialog,
/deep/ .el-pager li {
    background: none;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
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
</style>