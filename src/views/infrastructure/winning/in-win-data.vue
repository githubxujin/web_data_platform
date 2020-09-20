<template>
    <div class="table-wrap mt20">
        <el-form :inline='true' ref='form' size='medium' class='el-serach-form '>
            <el-form-item>
                <el-input v-model='params.templateName' clearable placeholder='模板名称'></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.isEnable" placeholder="状态">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='创建开始日期' end-placeholder='创建结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model='dateArr2' type='daterange' unlink-panels @change='changeDate2' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='更新开始日期' end-placeholder='更新结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' size='medium' @click='getList'>查询</el-button>
                <el-button type='info' size='medium' @click='reSet'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='新增' placement='top'>
                <i class='iconfont icon-shujuzhongxin-xinzeng' @click='toAdd'></i>
            </el-tooltip>
            <el-tooltip class='item' effect='dark' content='导出' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daochu' @click='exportData'></i>
            </el-tooltip>
        </el-row>
        <el-table :data='list'>
            <el-table-column type='index' label='序号' width='50' align='center'></el-table-column>
            <el-table-column prop='templateName' label='模板名称' show-overflow-tooltip align='left'></el-table-column>
            <el-table-column prop='createTime' label='创建日期' show-overflow-tooltip></el-table-column>
            <el-table-column prop='createBy' label='创建人' show-overflow-tooltip></el-table-column>
            <el-table-column prop='isEnable' label='状态' show-overflow-tooltip>
                <template slot-scope='scope'>
                    {{  scope.row.isEnable === 0 ? '启用' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop='updateTime' label='最近更新日期' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='updateBy' label='最近更新人' show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop='accordWithNum' label='符合模板企业数' show-overflow-tooltip>
            </el-table-column>

            <el-table-column prop='操作' label='操作' align='center' width="200">
                <template slot-scope='scope'>
                    <el-button type="info" plain @click="toEdit(scope.row.templateId)">编辑</el-button>
                    <el-button type="info" plain @click="toDisable(scope.row.templateId,1)" v-if="scope.row.isEnable===0">禁用</el-button>
                    <el-button type="info" plain @click="toDisable(scope.row.templateId,0)" v-if="scope.row.isEnable===1">启用</el-button>
                    <el-button type="danger" plain @click="toDel(scope.row.templateId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10,20, 50, 100]" :page-size.sync="params.size" @size-change="handleSizeChange" :current-page.sync="params.current" @current-change="getList"
            layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            options: [
                { value: 0, label: '启用' },
                { value: 1, label: '禁用' }
            ],
            list: [],
            dateArr: [],
            dateArr2: [],
            params: {
                current: 1,
                size: 10,
                isEnable: '',
                "templateName": "", // 模板名称
                "startCreateDate": "", // 开始创建日期
                "endCreateDate": "", // 结束创建日期
                "startUpdateDate": "", // 开始更新日期
                "endUpdateDate": "" // 结束更新日期
            },
            total: 0,
        };
    },
    created () {
        this.getList();
    },
    methods: {
        handleSizeChange () {
            this.getList()
        },
        toEdit (templateId) {
            this.$router.push({ name: 'in-win-edit', query: { templateId } })
        },
        toDisable (templateId, isEnable) {
            this.$http('/dcp/enable/stat/template', { templateId, isEnable }).then(res => {
                this.getList()
            });
        },
        reSet () {
            this.dateArr = [];
            this.dateArr2 = [];
            this.params = {
                current: 1,
                size: 10,
                "templateName": "", // 模板名称
                "startCreateDate": "", // 开始创建日期
                "endCreateDate": "", // 结束创建日期
                "startUpdateDate": "", // 开始更新日期
                "endUpdateDate": "" // 结束更新日期
            }
            this.getList()
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startCreateDate = v[0];
                this.params.endCreateDate = v[1];
            } else {
                this.params.startCreateDate = '';
                this.params.endCreateDate = '';
            }
        },
        changeDate2 (v) {
            if (v && v.length > 0) {
                this.params.startUpdateDate = v[0];
                this.params.endUpdateDate = v[1];
            } else {
                this.params.startUpdateDate = '';
                this.params.endUpdateDate = '';
            }
        },
        getList () {
            this.$http('/dcp/page/list/stat/template', this.params).then(res => {
                this.list = res.data.records;
                this.total = res.data.total;
            });
        },
        toAdd () {
            this.$router.push({ name: 'in-win-add' })
        },
        exportData () {
            this.$http('/dcp/export/stat/template', this.params, { type: 'export' })
        },
        toDel (templateId) {
            this.$confirm("确定要删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            })
                .then(() => {

                    this.$http(`/dcp/stat/template/delete/${templateId}`, { type: 'formdata' }).then(res => {
                        this.getList()
                        this.$message({ type: 'success', message: '删除成功' })
                    });
                })
                .catch(() => { });

        },
    },

};
</script>