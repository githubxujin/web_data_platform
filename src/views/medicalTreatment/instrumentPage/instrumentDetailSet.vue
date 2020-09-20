<template>
    <!-- 器械库编辑和新增页 -->
    <div class="table-wrap">
        <div class="table-title">器械库更新</div>
        <el-tabs type="border-card" v-model="activeTabsName" @tab-click="handleClick">
            <el-tab-pane v-model="activeName" label="医疗器械产品（注册）" name="one">
                <el-form :inline="true" size="medium" class="doc-box">
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params1.type" clearable placeholder="产品类别">
                            <el-option label="国产" value="0"></el-option>
                            <el-option label="进口" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.registerCode" clearable placeholder="注册证编号"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.productName" clearable placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params1.managerCategory" clearable placeholder="管理类别">
                            <el-option v-for="(item,index) in manageType" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params1.registerName" clearable placeholder="注册人名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="params1.current=1,getList1()">查询</el-button>
                        <el-button type="info" @click="reSet1">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 导出功能 -->
                <el-row class='el-iconfont'>
                    <el-tooltip class="item" effect="dark" content="新增" placement="top">
                        <span class="icon-shujuzhongxin-xinzeng iconfont" @click="$router.push('/regisIncreate')"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导入" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog1=true"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导出" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport1"></span>
                    </el-tooltip>
                </el-row>
                <!-- 表格展示 -->
                <el-table :data="list1" class="el-table">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="productName" label="产品名称" width="120" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column prop="type" label="产品类别" width="100" show-overflow-tooltip align="left" :formatter="formatType"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="registerCode" label="注册证编号" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="managerCategory" label="管理类别" width="100" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="modelSpecification" label="型号规格" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="registerName" label="注册人名称" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="registerAddress" label="注册人住所" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip fixed="right" align="center">
                        <template slot-scope="scope">
                            <!-- <el-button @click="toDetail(scope.row.bidId)" type="text" plain>详情</el-button> -->
                            <el-button type="primary" plain @click.stop="$router.push({path:'/instrumentPage/regisMessage',query:{messageId1:scope.row.id}})">详情</el-button>
                            <el-button type="info" plain @click.stop="$router.push({path:'/regisIncreate',query:{messageId1:scope.row.id}})">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="params1.current" :page-sizes="[10, 20, 50, 100]" :page-size.sync="params1.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total1"></el-pagination>

                <!-- 注册导入 -->
                <el-dialog :visible.sync="isDialog1" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp1">
                    <p class="tishi">
                        <i class="iconfont icon-ziguanxitong-tishi"></i>
                        导入信息时上传的附件有格式要求，点击下载
                        <span class="up-tem">
                            <a href="./器械库导入模板.xlsx" download="器械库导入模板.xlsx">
                                导入模板
                            </a>
                        </span>
                        确定上传后完成信息的更新，将会新增不存在的信息或覆盖更新已有的信息。
                    </p>
                    <div class="shangc">
                        <span class="wen">
                            上传附件
                        </span>
                        <c-upload v-if="isDialog1" accept=".xlsx,.xls" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand1(v)}">
                            上传文件
                        </c-upload>
                        <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                        <ul class="el-upload-list el-upload-list--text" v-if="file1.length">
                            <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file1" :key="k">
                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{v.name}}</a>
                                <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                                </label>
                                <i class="el-icon-close" @click="delFile1(k)"></i>
                            </li>
                        </ul>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" type="info" @click="isDialog1 = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="toUpload1()">确 定</el-button>
                    </span>
                </el-dialog>

            </el-tab-pane>
            <!-- 医疗器械产品（备案）页 -->
            <el-tab-pane label="医疗器械产品（备案）" name="two" doc-box>
                <el-form :inline="true" size="medium" class="doc-box">
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.productName" clearable placeholder="产品名称"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-select v-model="params2.type" clearable placeholder="产品类别">
                            <el-option label="国产" value="0"></el-option>
                            <el-option label="进口" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.filingCode" clearable placeholder="备案号"></el-input>
                    </el-form-item>
                    <el-form-item class="el-item-form-width">
                        <el-input v-model="params2.filingName" clearable placeholder="备案人名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="params2.current=1,getList2()">查询</el-button>
                        <el-button type="info" @click="reSet2">重置</el-button>
                    </el-form-item>
                </el-form>
                <!-- 导出功能 -->
                <el-row class='el-iconfont'>
                    <el-tooltip class="item" effect="dark" content="新增" placement="top">
                        <span class="iconfont  icon-shujuzhongxin-xinzeng" @click="$router.push('/putIncreate')"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导入" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daoru" @click="isDialog2=true"></span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="导出" placement="top">
                        <span class="iconfont icon-shujuzhongxin-daochu" @click="toExport2"></span>
                    </el-tooltip>
                </el-row>

                <!-- 表格展示 -->
                <el-table :data="list2" class="el-table">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="productName" label="产品名称" width="140" show-overflow-tooltip align="left">
                        <!-- <template slot-scope="item">{{ projectType[item.row.projectType] }}</template> -->
                    </el-table-column>
                    <el-table-column prop="type" label="产品类别" width="100" show-overflow-tooltip align="left" :formatter="formatType"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="filingCode" label="备案号" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="modelSpecification" label="型号规格" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <!-- <el-table-column prop="modelSpecification" label="型号规格" width="160" show-overflow-tooltip align="left"></el-table-column> -->
                    <el-table-column :formatter="formatLabel" prop="filingName" label="备案人名称" width="160" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column :formatter="formatLabel" prop="filingAddress" label="备案人注册地址" show-overflow-tooltip align="left"></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right">
                        <template slot-scope="item">
                            <el-button type="primary" plain @click.stop="$router.push({path:'/instrumentPage/putMessage',query:{messageId2:item.row.id}})">详情</el-button>
                            <el-button type="info" plain @click.stop="$router.push({path:'/putIncreate',query:{messageId2:item.row.id}})">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->
                <el-pagination @size-change="handleSizeChangeIn" @current-change="handleCurrentChangeIn" :current-page="params2.current" :page-sizes="[10, 20, 50, 100]" :page-size="params2.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total2"></el-pagination>

                <!-- 备案导入 -->
                <el-dialog :visible.sync="isDialog2" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp2">
                    <p class="tishi">
                        <i class="iconfont icon-ziguanxitong-tishi"></i>
                        导入信息时上传的附件有格式要求，点击下载
                        <span class="up-tem">
                            <a href="./器械库导入模板.xlsx" download="器械库导入模板.xlsx" class="to-links">
                                导入模板
                            </a>
                        </span>
                        确定上传后完成信息的更新，将会新增不存在的信息或覆盖更新已有的信息。
                    </p>
                    <div class="shangc">
                        <span class="wen">
                            上传附件
                        </span>
                        <c-upload v-if="isDialog2" accept=".xlsx,.xls" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand2(v)}">
                            上传文件
                        </c-upload>
                        <span class="c_C1 f12" style="color: #909399;margin-left:10px;">文件仅支持.xls,.xlsx格式</span>
                        <ul class="el-upload-list el-upload-list--text" v-if="file2.length">
                            <li class="el-upload-list__item is-success" style="texta-align:left;" v-for="(v,k) in file2" :key="k">
                                <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{v.name}}</a>
                                <label class="el-upload-list__item-status-label">
                                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                                </label>
                                <i class="el-icon-close" @click="delFile2(k)"></i>
                            </li>
                        </ul>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" type="info" @click="isDialog2 = false">取 消</el-button>
                        <el-button size="mini" type="primary" @click="toUpload2()">确 定</el-button>
                    </span>
                </el-dialog>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import { setSession, getSession } from "@/config/utils"
export default {
    components: {},
    data () {
        return {
            activeName: 'first',
            isDialog1: false,
            isDialog2: false,
            file1: [],
            file2: [],
            list1: [],
            list2: [],
            activeTabsName: "one",
            activeDataName: "a",
            // 管理类别
            manageType: [],
            params1: {
                current: 1,
                size: 10,
                registerCode: "", //注册证编号
                productName: "", //产品名称
                registerName: "", // 注册人名称
                id: '',
            },
            params2: {
                current: 1,
                size: 10,
                filingCode: "", //备案号
                productName: "", //产品名称
                filingName: "", // 注册人名称
                id: '',
            },
            total1: 0,
            total2: 0,
        };
    },
    created () {
        this.activeTabsName = getSession(this.$route.name) || 'one'
        this.searchRecord1();
        this.searchRecord2();
        this.getManageType()
    },
    methods: {
        handleClick (tab) {
            setSession(this.$route.name, tab.name)
        },
        getManageType () {
            this.ajax
                .json('/dcp/query/apparatusregister/managercategory', this.params)
                .then(res => {
                    this.manageType = res.data;
                    console.log(this.manageType);
                });
        },
        // 产品类别匹配
        formatType (row) {
            if (row.type === 0) {
                return '国产'
            } else if (row.type === 1) {
                return '进口'
            } else {
                return '-'
            }
        },
        searchRecord1 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '1'])) {
                this.params1 = this.$params[this.$route.name + '1']
            }
            this.getList1();
        },
        // 器械库注册列表
        getList1 () {
            this.$params[this.$route.name + '1'] = this.params1
            this.$http("/dcp/query/apparatusregister/list", this.params1).then(res => {
                this.list1 = res.data.records;
                this.total1 = res.data.total;
            });
        },
        searchRecord2 () {
            if (!this.isObjectEmpty(this.$params[this.$route.name + '2'])) {
                this.params2 = this.$params[this.$route.name + '2']
            }
            this.getList2();
        },
        //  器械库备案列表
        getList2 () {
            this.$params[this.$route.name + '2'] = this.params2
            this.$http('/dcp/query/apparatusfiling/list', this.params2).then(res => {
                this.list2 = res.data.records;
                this.total2 = res.data.total;
            });
        },
        // 关闭上传弹窗(注册)
        closeUp1 () {
            this.file1 = [];
        },
        /* 上传文件 */
        async uploadHand1 (files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file1.push(files[i]);
            }
        },
        // 删除上传文件
        delFile1 (k) {
            this.file1.splice(k, 1);
        },
        // 确认上传
        toUpload1 () {
            let data = {
                fileList: this.file1
            };
            if (this.file1 && this.file1.length > 0) {
                this.$http("/dcp/query/apparatusregister/upload", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.isDialog1 = false;
                        this.$message.success("导入成功");
                        this.getList1();
                    }
                });
            } else {
                this.$message.error("请上传附件");
            }
        },

        // 备案导入
        // 关闭上传弹窗
        closeUp2 () {
            this.file2 = [];
        },
        /* 上传文件 */
        async uploadHand2 (files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file2.push(files[i]);
            }
        },
        // 删除上传文件
        delFile2 (k) {
            this.file2.splice(k, 1);
        },
        // 确认上传
        toUpload2 () {
            let data = {
                fileList: this.file2
            };
            if (this.file2 && this.file2.length > 0) {
                this.$http("/dcp/query/apparatusfiling/upload", data, {
                    type: "upload"
                }).then(res => {
                    if (res.code === "200") {
                        this.isDialog2 = false;
                        this.$message.success("导入成功");
                        this.getList2();
                        // console.log(this.getList2, '1')
                    }
                });
            } else {
                this.$message.error("请上传附件");
            }
        },

        // 导出（注册）
        toExport1 () {
            this.$http("/dcp/query/apparatusregister/export", this.params1, {
                type: "export"
            });
        },
        // 导出(备案)
        toExport2 () {
            this.$http("/dcp/query/apparatusfiling/export", this.params2, {
                type: "export"
            });
        },
        // 重置
        reSet1 () {
            this.params1 = {
                current: 1,
                size: 10,
                registerCode: "", //注册证编号
                productName: "", //产品名称
                registerName: "", // 注册人名称
                id: '',
            };
            this.value = [];
            this.getList1();
        },
        // 分页器的方法
        handleSizeChange (v) {
            this.params1.size = v;
            this.getList1();
        },
        handleCurrentChange (val) {
            this.params1.current = val;
            this.getList1();
        },
        // 备案页
        reSet2 () {
            this.params2 = {
                current: 1,
                size: 10,
                filingCode: "", //备案号
                productName: "", //产品名称
                filingName: "", // 备案人名称
                id: '',
            };
            this.value = [];
            // this.value1 = [];
            this.getList2();
        },
        // 分页器的方法
        handleSizeChangeIn (v) {
            this.params2.size = v;
            this.getList2();
        },
        handleCurrentChangeIn (val) {
            this.params2.current = val;
            this.getList2();
        }
    }
};
</script>

<style lang="scss" scoped>
.doc-box {
    padding-top: 30px;
    box-sizing: border-box;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 26px;
        height: 26px;
        text-align: center;
        line-height: 25px;
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
