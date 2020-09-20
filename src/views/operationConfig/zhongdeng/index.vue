<template>
    <div class="table-wrap mt20">
        <el-form :inline="true" size="medium" class="el-serach-form ">
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.assignee" clearable placeholder="受让人名称-登记名称" class="el-item-form-width"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-input v-model="params.secondaryUnit" clearable placeholder="受让人二级单位" class="el-item-form-width"></el-input>
            </el-form-item>
            <el-form-item class="el-item-form-width">
                <el-select v-model="params.primaryUnit" clearable placeholder="受让人一级单位" class=" el-item-form-width" filterable>
                    <el-option v-for="(s, index) in primaryUnitList" :label="s" :value="s" :key="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='添加' placement='top'>
                <i class='iconfont icon-shujuzhongxin-xinzeng' @click="toAdd"></i>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click="exportData"></i>
            </el-tooltip>
        </el-row>

        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="assignee" label="受让人名称-登记名称" show-overflow-tooltip :formatter="formatLabel" width="250"></el-table-column>
            <el-table-column prop="secondaryUnit" label="受让人二级单位" show-overflow-tooltip :formatter="formatLabel" width="250"> </el-table-column>
            <el-table-column prop="primaryUnit" label="受让人一级单位" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column prop="updateTime" label="更新日期" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope='scope'>
                    {{formatDate(scope.row.updateTime,"YY-MM-DD HH:mm:ss") }}
                </template></el-table-column>
            <el-table-column prop="updateBy" label="更新人" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" plain @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>
        <modal ref="modal"></modal>
    </div>
</template>
<script>
export default {
    components: {
        'modal': () => import("./modal")
    },
    data () {
        return {
            dialogVisible: false,
            params: {
                current: 1,
                size: 10,
                primaryUnit: "",
                secondaryUnit: "",
                assignee: ""
            },
            total: 0,
            list: [],
            primaryUnitList: []
        };
    },
    created () {
        this.getPrimaryUnit()
        this.getList()
    },
    methods: {
        getPrimaryUnit () {
            this.ajax
                .json('/dcp/comm/zdw/assignee/vague', {
                    "field": 3,
                    "primaryUnit": "",

                })
                .then(res => {
                    this.primaryUnitList = res.data

                });
        },
        toAdd () {
            this.$refs.modal.id = ''
            this.$refs.modal.ruleForm = {
                assignee: '',
                primaryUnit: '',
                secondaryUnit: '',

            }
            this.dialogVisible = true;

        },
        toEdit (id) {
            this.dialogVisible = true;
            this.$refs.modal.toDetail(id)
            this.$refs.modal.id = id

        },
        toDel (id) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax
                    .json('/dcp/comm/zdw/assignee/delete', { id }, { type: 'post' })
                    .then(res => {
                        this.getList()
                    });
            }).catch(() => {

            })

        },
        getList () {
            this.ajax
                .json('/dcp/comm/zdw/assignee/page', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.parmas = {
                current: 1,
                size: 10,
                primaryUnit: "",
                secondaryUnit: "",
                assignee: ""
            }
        },
        async  exportData () {
            await this.ajax
                .json('/dcp/comm/zdw/assignee/export', this.params, { type: 'export' })

        }

    }
};
</script>