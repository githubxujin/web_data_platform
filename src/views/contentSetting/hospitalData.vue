<template>
    <div class="stat">
        <div class="table-wrap mt20 ">
            <div class="table-title">医院数据更新</div>
            <el-form :inline="true" ref="form" class="el-serach-form">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.key" clearable placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.hospitalLevel' clearable placeholder="医院等级">
                        <el-option label='三级甲等' value='三级甲等'></el-option>
                        <el-option label='三级乙等' value='三级乙等'></el-option>
                        <el-option label='三级丙等' value='三级丙等'></el-option>
                        <el-option label='三级未定' value='三级未定'></el-option>
                        <el-option label='二级甲等' value='二级甲等'></el-option>
                        <el-option label='二级乙等' value='二级乙等'></el-option>
                        <el-option label='二级丙等' value='二级丙等'></el-option>
                        <el-option label='二级未定' value='二级未定'></el-option>
                        <el-option label='一级甲等' value='一级甲等'></el-option>
                        <el-option label='一级乙等' value='一级乙等'></el-option>
                        <el-option label='一级丙等' value='一级丙等'></el-option>
                        <el-option label='一级未定' value='一级未定'></el-option>
                        <el-option label='未定级' value='未定级'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.inPool' clearable placeholder="医院是否入池">
                        <el-option label='是' value='是'></el-option>
                        <el-option label='否' value='否'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-cascader v-model="value" :options="city" placeholder="所在地区" clearable :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item>

                    <el-select v-model='params.hospitalStyle' clearable placeholder="医院类型">
                        <el-option :label='item' :value='item' v-for="(item,index) in typeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="新增" placement="top">
                    <span class="iconfont icon-shujuzhongxin-xinzeng" @click="$router.push('/hospitalDataAdd')"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导入" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog=true"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="导出" placement="top">
                    <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport"></span>
                </el-tooltip>
            </el-row>
            <el-table :data="list" @expand-change="expandRows" :expand-row-keys="expandRowKeys" :row-key="row=>row.id" @row-click="rowClick">
                <el-table-column type="expand">
                    <template slot-scope="item">
                        <el-table :data="item.row.expData" class="tab-child" :row-key="row=>row.id">
                            <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                            <el-table-column prop="supplierName" label="供应商名称" min-width="150" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="drugPeriod" label="核定药品账期（天）" width="150" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="consumablesPeriod" label="核定耗材账期（天）" width="150" show-overflow-tooltip></el-table-column>
                            <el-table-column prop="equipmentPeriod" label="核定设备账期（天）" width="150" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="reconciliation" label="对账" width="150" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="signBack" label="签收回执" width="150" show-overflow-tooltip>
                            </el-table-column>
                        </el-table>
                        <div class="page-nav isCenter" v-show="item.row.total>item.row.size">
                            <el-pagination @current-change="dtlCurrentChange($event,item.row)" :current-page="item.row.current" :page-sizes="[5, 10, 15, 20]" :page-size="item.row.size"
                                layout="total, sizes, prev, pager, next, jumper" :total="item.row.total || 0"></el-pagination>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="序号" width="70" align="center">
                    <template slot-scope="item">
                        {{ item.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="hospitalName" label="医院名称" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="hospitalAliasName" label="医院别名" min-width="150" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="hospitalLevel" label="医院等级" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="inPool" label="医院是否入池" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="hospitalType" label="医院性质" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="province" label="所在省份" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="city" label="所在城市" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="hospitalStyle" label="医院类型" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="top100" label="是否百大医院" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="top100Rank" label="百大综合排名" width="150" show-overflow-tooltip sortable></el-table-column>
                <el-table-column prop="top100RankScore" label="百大排名得分" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="nationalRank" label="全国排名" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="localRank" label="当地排名" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" align="center" width="150" fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click.stop="$router.push({path:'/hospitalDataDetail', query:{hospitalId:item.row.id}})">
                            详情</el-button>
                        <el-button type="info" plain @click.stop="$router.push({path:'/hospitalDataAmend', query:{hospitalId:item.row.id}})">编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
                :total="total"></el-pagination>
        </div>
        <el-dialog :visible.sync="isDialog" width="500px" title="导入医院信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                导入医院信息时上传的附件有格式要求，点击下载
                <span class="to-links" @click="donwTemplate">导入模版</span>
                确定上传后完成医院信息的更新，将会新增不存在的医院信息或覆盖更新已有的医院信息。
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
                key: "", //关键字
                hospitalLevel: "", //医院等级
                inPool: "", //医院是否入池
                province: "", //省份
                city: "",//城市
            },
            list: [],
            file: []
        }
    },
    created () {
        this.getType();
        this.getList();
    },
    methods: {
        getType () {
            this.$http('/dcp/query/hospital/style/list', {}, { type: 'get' }).then(res => {
                this.typeList = res.data
            });
        },
        getList (v) {
            if (v) {
                this.params.current = v;
            }
            this.$http("/dcp/query/hospital/page/list", this.params).then(
                res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                }
            );
        },
        rowClick (row, column, event) {
            this.expandRows(row);
        },
        // 展开行
        expandRows (row) {
            if (this.expandRowKeys.includes(row.id)) {
                return this.expandRowKeys.splice(
                    this.expandRowKeys.indexOf(row.id),
                    1
                );
            }
            this.expandRowKeys.push(row.id);
            this.$set(row, "current", 1);
            this.$set(row, "size", 5);
            this.getDetailsList(row);
        },
        // 子列表
        getDetailsList (row) {
            let params = {
                current: row.current,
                size: row.size,
                hospitalId: row.id
            };
            this.$http("/dcp/query/hospital/period/list", params).then(res => {
                const { data = {} } = res;
                const { records = [] } = data;
                this.$set(row, "expData", records);
                this.$set(row, "total", data.total);
            });
        },
        //详情分页器
        dtlCurrentChange (val, row) {
            this.$set(row, "current", val);
            this.getDetailsList(row);
        },
        // 下载模板
        donwTemplate () {
            this.$http(
                "/dcp/download/hospital/data/excel/template",
                {},
                { type: "export" }
            );
        },
        /* 上传文件 */
        async uploadHand (files) {
            // console.log('files',files);
            // this.file = files
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
            // console.log(this.file);
        },
        // 确认上传
        toUpload () {
            // console.log(this.file);
            let data = {
                fileList: this.file
            };
            console.log(data);
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/upload/hospital/data/file", data, {
                    type: "upload"
                }).then(res => {
                    // console.log(res);
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
        // 关闭上传弹窗
        closeUp () {
            this.file = [];
            // console.log(this.file);
        },
        // 删除上传文件
        delFile (k) {
            this.file.splice(k, 1);
        },
        // 导出
        toExport () {
            this.$http("/dcp/export/hospital/data", this.params, {
                type: "export"
            });
        },
        // 省市
        handleChange (value) {
            // console.log(value);
            if (value && value.length > 0) {
                this.params.province = value[0];
                this.params.city = value[1];
            } else {
                this.params.province = "";
                this.params.city = "";
            }
        },
        // 重置
        reSet () {
            this.params = {
                current: 1,
                size: 10,
                key: '', //关键字
                hospitalLevel: '', //医院等级
                inPool: '否', //医院是否入池
                province: '', //省份
                city: '' //城市
            }
            this.value = []
            this.getList()
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
        color: rgba(255, 255, 255, 0.8);
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
        color: rgba(255, 255, 255, 0.8);
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
.el-upload-list__item {
    color: rgba(255, 255, 255, 0.8);
    .el-upload-list__item-name {
        color: rgba(255, 255, 255, 0.8);
    }
    .el-icon-upload-success,
    .el-icon-close {
        color: rgba(255, 255, 255, 0.8);
    }
    &:hover {
        background: transparent;
        .el-upload-list__item-name {
            color: rgba(255, 255, 255, 0.8);
        }
        .el-icon-close {
            color: #fff;
        }
    }
}
.icon-ziguanxitong-tishi {
    color: #43a1ac;
}
</style>
