<template>
    <div class="table-wrap mt20">
        <div class="table-title">监控企业分配</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.customerId" clearable filterable placeholder="企业名称">
                    <el-option v-for="item in clientList" :key="item.id" :label="item.customerName" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.accounts" clearable placeholder="域账户"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.createName" clearable placeholder="创建人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class="el-iconfont">
            <el-tooltip class="item" effect="dark" content="新增" placement="top">
                <i class="iconfont icon-shujuzhongxin-xinzeng" @click="toAdd"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="accounts" label="域账户" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="createName" label="创建人" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column fixed="right" width="200" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEitd(scope.row.id)">编辑</el-button>
                    <el-button type="danger" plain size="mini" v-if="scope.row.isEnable === 1" @click="blockUp(scope.row.id)">停用</el-button>
                    <el-button type="success" plain size="mini" v-else @click="startUsing(scope.row.id)">启用</el-button>
                    <el-button type="danger" plain class="del-col" @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.pageSize" @size-change="getList" :current-page.sync="params.pageNum" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            params: {
                pageNum: 1,
                pageSize: 10,
            },
            total: 0,
            dialogVisible: false,
            fundList: [
                {
                    label: '3000万元以下',
                    value: ''
                },
                {
                    label: '3000-10000万元',
                    value: ''
                },
                {
                    label: '10000-30000万元',
                    value: ''
                },
                {
                    label: '30000-60000万元',
                    value: ''
                },
                {
                    label: '60000万元以上',
                    value: ''
                },
            ],
            clientList: []
        }
    },
    created() {
        this.searchRecord()
        this.getClientNames()
    },
    methods: {
        // 编辑
        toEitd(id) {
            this.$router.push({ path: `/allocationEdit/${id}` })
        },
        // 新增
        toAdd() {
            this.$router.push({ path: '/allocationAdd' })
        },
        // 获取客户名称
        getClientNames() {
            this.ajax.get('/risk/server/customer/survey/customerName/select')
                .then(res => {
                    this.clientList = res.data
                }).catch(res => {
                    console.log(res)
                })
        },
        // 首次加载
        searchRecord() {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList() {
            this.$params[this.$route.name] = this.params
            this.ajax
                .json('/risk/server/notify/list', this.params, { type: 'get' })
                .then(res => {
                    this.list = res.data
                    this.total = res.meta.totalSize
                })
        },
        // 重置
        reSet() {
            this.params = {
                pageNum: 1,
                pageSize: 10,
            }
            this.total = 0
            this.getList()
        },
        // 停用
        blockUp(id) {
            this.ajax.post('/risk/server/notify/disable', { id })
                .then(res => {
                    if (res.code === '200') {
                        this.$message.success('停用成功！')
                        this.getList()
                    } else {
                        this.$message.error('停用失败！')
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 启用
        startUsing(id) {
            this.ajax.post('/risk/server/notify/enable', { id })
                .then(res => {
                    if (res.code === '200') {
                        this.$message.success('启用成功！')
                        this.getList()
                    } else {
                        this.$message.error('启用失败！')
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 删除
        toDel(id) {
            this.$confirm('确定要删除吗？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                this.ajax
                    .json('/risk/server/notify/delete', { id }, { type: 'POST' })
                    .then(res => {
                        this.$message.success('删除成功！')
                        this.getList()
                    });
            }).catch(err => { })
        },
    },
}
</script>
