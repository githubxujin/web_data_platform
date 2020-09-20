<template>
    <!-- 操作配置--药厂 -->
    <div class="stat">
        <div class="table-wrap mt20 mb30">
            <div class="table-title">药厂数据</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.companyName" clearable placeholder="药厂名称"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.companyType" clearable placeholder="企业类型">
                        <el-option :label="item" :value="item" v-for="(item,index) in typeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-cascader v-model="value" :options="city" placeholder="省份" clearable :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
                </el-form-item>
                <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                <el-button type="info" @click="reSet">重置</el-button>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="iconfont icon-shujuzhongxin-xinzeng" @click="$router.push({path:'/drugFactoryIncreate'})"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导入" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
                </el-tooltip>
            </el-row>

            <el-table :data="list" :expand-row-keys="expandRowKeys" :row-key="row=>row.id">
                <el-table-column prop label="序号" width="70" align="center">
                    <template slot-scope="item">{{ item.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="companyName" label="药厂名称" width="240">
                    <template slot-scope="scope">{{scope.row.companyName?scope.row.companyName:'-'}}</template>
                </el-table-column>
                <el-table-column prop="province" label="所在省份" width="150" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.province?scope.row.province:'-'}}</template>
                </el-table-column>
                <el-table-column prop="companyType" label="企业类型" width="100" show-overflow-tooltip>
                    <template slot-scope="scope">{{scope.row.companyType?scope.row.companyType:'-'}}</template>
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="socialCreditCode" label="统一社会信用代码/组织机构代码" width="230">
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="lawPerson" label="法定代表人" show-overflow-tooltip min-width="150">
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="quailtyPerson" label="质量负责人" width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column :formatter="formatLabel" prop="responsiblePerson" label="企业负责人" width="120" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop label="操作" align="center" width="160" fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click.stop="$router.push({path:'/drugFacDetailSet/drugFacMessage',query:{drugId:item.row.id, companyName:item.row.companyName}})">详情</el-button>
                        <el-button type="info" plain @click.stop="$router.push({path:'/drugFactoryCompile',query:{drugId:item.row.id,companyName:item.row.companyName}})">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page.sync="params.current" :page-sizes="[10, 20, 30, 40]" :page-size.sync="params.size"
                layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>

        <!-- 导入 -->
        <el-dialog :visible.sync="isDialog" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                导入信息时上传的附件有格式要求，点击下载
                <span class="to-links">
                    <a href="./药厂库数据更新模板.xlsx" download="药厂数据更新模板.xlsx">
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
                <el-button size="mini" type="primary" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import city from "@/views/industryTrade/config/city1.js";
export default {
    data () {
        return {
            isDialog: false,
            total: 0,
            city,
            value: [],
            typeList: [],
            expandRowKeys: [],
            params: {
                current: 1,
                size: 10,
                id: "",
                companyName: '',
                companyType: ''
            },
            list: [],
            file: []
        };
    },
    created () {
        this.getType();
        this.searchRecord()
    },
    methods: {
        getType () {
            this.$http("/dcp/query/pharmaceutical/companytypelist").then(
                res => {
                    this.typeList = res.data;
                }
            );
        },
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        getList () {
            this.$params[this.$route.name] = this.params
            this.$http("/dcp/query/pharmaceutical/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    console.log(this.list);
                    this.total = res.data.total;
                    console.log(this.companyName, '123');
                }
            );
        },
        //详情分页器
        dtlCurrentChange (val, row) {
            this.$set(row, "current", val);
            this.getDetailsList(row);
        },

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
                this.$http("/dcp/query/pharmaceutical/upload", data, {
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
        // 导出
        toExport () {
            this.$http("/dcp/query/pharmaceutical/export", this.params, {
                type: "export"
            });
        },
        // 省市
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.province = value[0];
            } else {
                this.params.province = "";
            }
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                companyName: '',
                companyType: '',
                province: ''
            };
            this.value = [];
            this.getList();
            this.getType();
        },
        handleSizeChange (v) {
            this.params.size = v;
            this.getList();
        }
    }
};
</script>
<style lang="scss" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}

.form-in {
    padding: 0 87px 0 67px;
    /deep/ .el-form-item__label {
        &::before {
            color: #53dcec !important;
        }
    }
}

.upload-file {
    /deep/ .el-button {
        position: relative;
        padding-left: 30px;
        .icon-tongyong-daochutubiao {
            position: absolute;
            top: 4px;
            left: 10px;
        }
    }
}
.shangc {
    font-family: PingFangSC-Light;
    .wen {
        padding-left: 10px;
        margin-right: 10px;
        position: relative;
        &::before {
            content: '*';
            color: #449fa8;
            position: absolute;
            left: 0;
            top: 3px;
        }
    }
}

.icon-ziguanxitong-tishi {
    color: #43a1ac;
}
.el-form-item {
    margin-right: 0px;
}
</style>
