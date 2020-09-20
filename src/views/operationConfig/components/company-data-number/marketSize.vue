<template>
    <div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form pt20">
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.regional" clearable placeholder="地区" @change="provinceChange">
                    <el-option v-for="(s, index) in regional" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.province" placeholder="省份">
                    <el-option v-for="(s, index) in provinceList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.year" clearable placeholder="年份">
                    <el-option v-for="(s, index) in year" :label="s" :value="s" :key="index"></el-option>
                </el-select>
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
        <el-table :data="list" @sort-change="sortChange">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="regional" label="地区" width="80" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="province" label="省份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="year" label="年份" show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="totalAmount" label="销售总额（万元）" sortable show-overflow-tooltip width="160"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="westernMedicine" label="西药类销售占比" sortable show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.westernMedicine?scope.row.westernMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="middleMedicine" label="中成药类销售占比" sortable show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.middleMedicine?scope.row.middleMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="traditionalMedicine" label="中药材销售占比" sortable show-overflow-tooltip width="160">
                <template slot-scope="scope">
                    {{scope.row.traditionalMedicine?scope.row.traditionalMedicine+'%':'-'}}
                </template>
            </el-table-column>
            <el-table-column :formatter="formatLabel" prop="enterpriseCount" label="企业总数" width="100" sortable show-overflow-tooltip></el-table-column>
            <el-table-column :formatter="formatLabel" prop="wholesaleEnterpriseNum" label="其中：批发企业数" sortable show-overflow-tooltip width="160"></el-table-column>
            <el-table-column :formatter="formatLabel" prop="retailEnterpriseNum" label="其中：零售企业数" sortable show-overflow-tooltip width="160"></el-table-column>
            <el-table-column label="操作" align="center" fixed="right">
                <template slot-scope="scope">
                    <el-button type="info" plain @click="toEdit(scope.row.id)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper"
            :total="total" v-if="total > 0"></el-pagination>

        <!-- 新增/编辑 -->
        <marketSize ref="toEdit" />

        <!-- 导入 -->
        <el-dialog :visible.sync="isDialog" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                导入信息时上传的附件有格式要求，点击下载
                <span class="to-links">
                    <a href="./各省商业公司数据模板.xlsx" download="各省商业公司数据模板.xlsx">
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
                <el-button size="mini" type="info" @click="isDialog = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="toUpload()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import citys from "@/utils/citys.json"
export default {
    components: {
        marketSize: () => import("./marketSize-add.vue")
    },
    data () {
        return {
            citys,
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            regional: [],
            year: [],
            list: [],
            dialogVisible: false,
            isDialog: false,
            file: [],
            provinceList: [],
        };
    },
    created () {
        this.regionaltime()
        this.getList()
    },
    methods: {
        // 地区联动省份
        provinceChange (regional) {
            this.$set(this.params, 'province', '')
            this.ajax
                .json('/dcp/query/provincefiscaldata/regionaltime', { regional }, { type: 'POST' })
                .then(res => {
                    this.provinceList = res.data.cities
                })
        },
        // 排序
        sortChange (column) {
            if (column.order) {
                this.params.orderColumn = column.prop
                this.params.orderWay = column.order === "descending" ? "DESC" : "ASC"
            } else {
                this.params.orderColumn = ""
                this.params.orderWay = ""
            }
            this.getList()
        },
        // 获取大区和年限
        regionaltime () {
            this.ajax
                .json('/dcp/query/provincialcirculationmarket/regionaltime', {})
                .then(res => {
                    if (res.code === '200') {
                        this.regional = res.data.reg
                        this.year = res.data.year
                    }
                });
        },
        getList () {
            this.ajax
                .json('/dcp/query/provincialcirculationmarket/list', this.params)
                .then(res => {
                    this.list = res.data.records;
                    this.total = res.data.total;
                });
        },
        reSet () {
            this.params = {
                current: 1,
                size: 10
            }
            this.getList()
        },
        // 新增
        toAdd () {
            this.dialogVisible = true
            this.isEdit = false
        },
        // 编辑
        toEdit (id) {
            this.detail(id)
            this.dialogVisible = true
            this.isEdit = true
        },
        detail (id) {
            this.ajax
                .json('/dcp/comm-provincial-circulation-market/detail', { id }, { type: 'get' })
                .then(res => {
                    if (res.code === '200') {
                        this.$refs.toEdit.ruleForm.year = res.data.year
                        this.$refs.toEdit.ruleForm.province = res.data.province
                        this.$refs.toEdit.ruleForm.totalAmount = res.data.totalAmount
                        this.$refs.toEdit.ruleForm.westernMedicine = res.data.westernMedicine
                        this.$refs.toEdit.ruleForm.middleMedicine = res.data.middleMedicine
                        this.$refs.toEdit.ruleForm.traditionalMedicine = res.data.traditionalMedicine
                        this.$refs.toEdit.ruleForm.enterpriseCount = res.data.enterpriseCount
                        this.$refs.toEdit.ruleForm.wholesaleEnterpriseNum = res.data.wholesaleEnterpriseNum
                        this.$refs.toEdit.ruleForm.retailEnterpriseNum = res.data.retailEnterpriseNum
                        this.$refs.toEdit.ruleForm.id = res.data.id
                    }
                });
        },
        // 导出
        exportData () {
            this.ajax
                .json("/dcp/query/provincialcirculationmarket/export", this.params, { type: "export" })
                .then(res => { });
        },
        // ----- 导入-----
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
                this.$http("/dcp/query/provincialcirculationmarket/upload", data, {
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
        }
    }
};
</script>
