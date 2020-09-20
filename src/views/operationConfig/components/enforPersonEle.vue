<template>
    <div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model.trim="params.name" clearable placeholder="姓名/公司名称"></el-input>
            </el-form-item>
            <el-form-item style="width:208px;">
                <el-input v-model.trim="params.idcardNum" clearable placeholder="身份证号码/组织机构代码"></el-input>
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
            <el-tooltip class="item" effect="dark" content="导入" placement="top">
                <i class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></i>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="导出" placement="top">
                <i class="iconfont icon-shujuzhongxin-daochu" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="name" label="姓名/公司名称" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="idcardNum" label="身份证号码/组织机构代码" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="createPerson" label="创建人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip>
                <template slot-scope="scope">{{ formatDate(scope.row.createTime) || '-' }}</template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="info" plain size="small" @click="toEdit(scope.row.id)">编辑</el-button>
                    <el-button type="danger" plain size="small" @click="detail(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>
        <!-- 新增/编辑 -->
        <enforPersonEleAdd ref="customer" />
        <!-- 导入 -->
        <el-dialog :visible.sync="isDialog" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                导入信息时上传的附件有格式要求，点击下载
                <span class="to-links">
                    <a href="./失信被执行人模板.xlsx" download="失信被执行人模板.xlsx">
                        导入模板
                    </a>
                </span>
                确定上传后完成信息的更新，将会新增不存在的信息或覆盖更新已有的信息。
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload v-if="isDialog" accept=".xlsx,.xls" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
                    上传文件
                </c-upload>
                <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                <ul class="el-upload-list el-upload-list--text" v-if="file.length">
                    <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file" :key="k">
                        <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{v.name}}</a>
                        <label class="el-upload-list__item-status-label">
                            <i class="el-icon-upload-success el-icon-circle-check"></i>
                        </label>
                        <i class="el-icon-close" @click="delFile(k)"></i>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="info" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    components: {
        enforPersonEleAdd: () => import('./enforPersonEle/enforPersonEle-add.vue')
    },
    data () {
        return {
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            list: [],
            dialogVisible: false,
            isDialog: false,
            file: [],
            isEdit: false,
        };
    },
    created () {
        this.getList();
    },
    methods: {
        reSet () {
            this.params = {
                current: 1,
                size: 10
            }
            this.total = 0
            this.getList()
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/query/brokenpromiseslist/export", this.params, { type: "export" })
                .then(res => { });
        },
        getList () {
            this.ajax
                .json("/dcp/query/brokenpromiseslist/list", this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        getDetail (id) {
            this.ajax
                .json('/dcp/query/brokenpromiseslist/detail', { id }, { type: "get" })
                .then(res => {
                    if (res.code === '200') {
                        this.$set(this.$refs.customer.ruleForm, 'name', res.data.name)
                        this.$set(this.$refs.customer.ruleForm, 'idcardNum', res.data.idcardNum)
                        this.$set(this.$refs.customer.ruleForm, 'id', res.data.id)
                    }
                });
        },
        // 删除
        detail (id) {
            this.$confirm("确定要删除吗？", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                center: true,
                customClass: 'myClass'
            })
                .then(() => {
                    this.ajax
                        .json('/dcp/modify/brokenpromiseslist/detail', { id, isDeleted: 1 })
                        .then(res => {
                            this.$message.success("删除成功")
                            this.getList()
                        });
                })
                .catch(() => { });
        },
        // 编辑
        toEdit (id) {
            this.getDetail(id);
            this.dialogVisible = true;
            this.isEdit = true;
        },
        // 新增
        toAdd () {
            this.dialogVisible = true
            this.isEdit = false
        },
        // -----导入-----
        // 关闭上传弹窗
        closeUp () {
            this.file = [];
        },
        /* 上传文件 */
        async uploadHand (files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
        },
        // 删除上传文件
        delFile (k) {
            this.file.splice(k, 1);
        },
        // 确认上传
        toUpload () {
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/query/brokenpromiseslist/upload", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.isDialog = false;
                        this.$message.success("导入成功");
                        this.getList();
                    }
                });
            } else {
                this.$message.error("请上传附件");
            }
        },
    }
};
</script>
<style lang="scss" scoped>
/deep/ .el-message.el-message--info {
    background-color: red;
}
.zhuantai_lan {
    width: 50px;
    height: 20px;
    background: #242d30;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #43a1ac;
    line-height: 20px;
    text-align: center;
}
.zhuantai_hong {
    width: 50px;
    height: 20px;
    background: #2f2828;
    font-family: PingFangSC-Light;
    font-size: 12px;
    color: #bb4d31;
    text-align: center;
    line-height: 20px;
}
/deep/ .el-form-item__content {
    vertical-align: middle;
}
/deep/ .el-message-box__wrapper {
    top: -100px;
}
.el-message-box__wrapper {
    /deep/ .myClass {
        margin-top: -100px !important;
    }
    /deep/ .el-message-box {
        margin-top: -100px !important;
    }
}
/deep/ .el-serach-form .el-form-item__content {
    width: 100%;
}
</style>
