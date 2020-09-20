<template>
    <div class="table-wrap mt20">
        <div class="table-title">重点监控目录</div>
        <el-form :inline="true" size="medium" class="el-serach-form mt20">

            <el-form-item class="el-item-form-width">
                <el-input v-model="params.drugName" clearable placeholder="药品名称" class="el-item-form-width"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="medium" @click="getList">查询</el-button>
                <el-button type="info" size="medium" @click="reSet">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row class='el-iconfont'>
            <el-tooltip class='item' effect='dark' content='导入' placement='top'>
                <i class='iconfont icon-shujuzhongxin-daoru' @click='toOpen'></i>
            </el-tooltip>
        </el-row>

        <el-table :data="list">
            <el-table-column prop="drugName" label="药品名称" show-overflow-tooltip :formatter="formatLabel" width="200" fixed="left"></el-table-column>
            <el-table-column prop="nationWide" label="全国" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="jx" label="江西" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="xz" label="西藏" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="hlj" label="黑龙江" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="sd" label="山东" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="gd" label="广东" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="js" label="江苏" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="hb" label="河北" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="sx" label="陕西" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="hn" label="海南" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="shanxi" label="山西" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="nmg" label="内蒙古" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="xj" label="新疆" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="zj" label="浙江" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="gz" label="贵州" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="ln" label="辽宁" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="jl" label="吉林" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="ah" label="安微" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="fj" label="福建" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="henan" label="河南" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="hb" label="湖北" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="sc" label="四川" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="yn" label="云南" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="gs" label="甘肃" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="qh" label="青海" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="gx" label="广西" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="nx" label="宁夏" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="bj" label="北京" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="sh" label="上海" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="tj" label="天津" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="cq" label="重庆" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column fixed="right" label="操作" width="90" align="center">
                <template slot-scope="scope">
                    <el-button type="danger" plain size="small" @click="toDel(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='getList' :current-page.sync='params.current' @current-change='getList' layout='total, sizes, prev, pager, next, jumper'
            :total='total' v-if='total > 0'>
        </el-pagination>

        <el-dialog :visible.sync="isDialog" width="500px" title="导入药品信息" :close-on-click-modal="false">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                导入医院信息时上传的附件有格式要求，点击下载
                <span class="up-tem">
                    <a download="重点监控药品目录统计.xlsx" href="./重点监控药品目录统计.xlsx"> 导入模版</a>
                </span>
                确定上传后完成医院信息的更新，将会新增不存在的医院信息或覆盖更新已有的医院信息。
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload v-if="isDialog" accept=".xlsx,.xls" class="upload-file" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}">
                    <i class="iconfont icon-tongyong-daochutubiao"></i>
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
                <el-button size="mini" type="primary" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            file: [],
            isDialog: false,
            params: {

                current: 1,
                size: 10,
                drugName: "",
            },
            total: 0,
            list: [],
        };
    },
    created () {
        this.getList()
    },
    methods: {
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                drugName: "",
            }
            this.getList()
        },
        toOpen () {
            this.isDialog = true
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
        toUpload () {
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/upload/drug/key/monitor/data/file", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.isDialog = false;
                        this.$message.success("导入成功");
                    }
                });
            } else {
                this.$message.error("请上传附件");
            }
        },
        toDel (id) {
            this.$confirm("确定删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                center: true
            }).then(() => {
                this.ajax
                    .json('/dcp/delete/drug/key/monitor', { id }, { type: 'post' })
                    .then(res => {
                        this.getList()
                    });
            }).catch(() => { });
        },
        getList () {
            this.ajax
                .json('/dcp/query/drug/key/monitor/page/list', this.params, { type: 'get' })
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
    }
};
</script>
<style lang="scss" scoped>
.tishi {
    font-family: PingFangSC-Light;
    margin-top: 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 1px;
    line-height: 20px;
    .up-tem {
        color: #449fa8;
        text-decoration: underline;
        cursor: pointer;
    }
}
</style>