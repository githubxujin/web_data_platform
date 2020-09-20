<template>
    <div class="table-wrap mt20">
        <div class="table-title">保理公司库数据更新</div>
        <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.companyName" clearable placeholder="企业名称"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.operatingStatus" clearable placeholder="经营状态">
                    <el-option v-for="(s, index) in operatingStatusList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-input v-model="params.socialCreditCode" clearable placeholder="统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.registeredCapital" clearable placeholder="注册资本">
                    <el-option v-for="(s, index) in fundList" :label="s.label" :value="s.value" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.companyType" clearable placeholder="企业类型">
                    <el-option v-for="(s, index) in companyTypeList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.province" clearable placeholder="所在省份" @change="provinceChange">
                    <el-option v-for="(s, index) in provinceList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.city" clearable placeholder="所在城市">
                    <el-option v-for="(s, index) in cityList" :label="s" :value="s" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class='el-item-form-width'>
                <el-select v-model="params.rosterType" clearable placeholder="名单类型">
                    <el-option label="白名单" :value="1"></el-option>
                    <el-option label="黑名单" :value="2"></el-option>
                    <el-option label="灰名单" :value="3"></el-option>
                    <el-option label="待定名单" :value="0"></el-option>
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
                <i class="iconfont icon-shujuzhongxin-daochu mr20" @click="exportData"></i>
            </el-tooltip>
        </el-row>
        <el-table :data="list">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="companyName" label="企业名称" width="260" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="operatingStatus" label="经营状态" width="80" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="socialCreditCode" label="统一社会信用代码" show-overflow-tooltip :formatter="formatLabel" width="180"></el-table-column>
            <el-table-column prop="registeredCapital" label="注册资本(万元)" width="140" show-overflow-tooltip :formatter="formatLabel">
                <template slot-scope="scope">
                    {{(scope.row.registeredCapital&&scope.row.registeredCapital!==0)?scope.row.registeredCapital+'万元人民币':'-'}}
                </template>
            </el-table-column>
            <el-table-column prop="companyType" label="企业类型" width="200" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="registeredTime" label="成立日期" width="140" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="province" label="所属省份" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="city" label="所属城市" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="rosterType" label="名单类型" show-overflow-tooltip :formatter="rosterTypeFormat"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="lookOver(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size" @size-change="getList" :current-page.sync="params.current" @current-change="getList" layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total > 0">
        </el-pagination>

        <!-- 导入 -->
        <el-dialog :visible.sync="isDialog" width="500px" title="导入信息" :close-on-click-modal="false" @close="closeUp">
            <p class="tishi">
                <i class="iconfont icon-ziguanxitong-tishi"></i>
                导入信息时上传的附件有格式要求，点击下载
                <span class="up-tem">
                    <a href="./商业保理公司模板.xls" download="商业保理公司模板.xls">
                        导入模板
                    </a>
                </span>
                确定上传后完成信息的更新，将会新增不存在的信息或覆盖更新已有的信息。
            </p>
            <div class="shangc">
                <span class="wen">
                    上传附件
                </span>
                <c-upload v-if="isDialog" accept=".xlsx,.xls" class="upload-file" type="primary" size="mini" :multiple="false" v-on:changehand="v => {uploadHand(v)}" plain>
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
    data() {
        return {
            list: [],
            params: {
                current: 1,
                size: 10
            },
            total: 0,
            isDialog: false,
            file: [],
            fundList: [
                {
                    label: '3000万元以下',
                    value: 0
                },
                {
                    label: '3000-10000万元',
                    value: 1
                },
                {
                    label: '10000-30000万元',
                    value: 2
                },
                {
                    label: '30000-60000万元',
                    value: 3
                },
                {
                    label: '60000万元以上',
                    value: 4
                },
            ],
            companyTypeList: [],
            operatingStatusList: [],
            provinceList: [],
            cityList: [],
        }
    },
    created() {
        this.searchRecord()
        this.filtercondition()
        this.provinceandcity()
    },
    methods: {
        rosterTypeFormat(row, column, cellValue, index) {
            switch (cellValue) {
                case 1:
                    return '白名单'
                case 2:
                    return '黑名单'
                case 3:
                    return '灰名单'
                case 0:
                    return '待定名单'
                default:
                    return '-'
            }
        },
        // 经营状态和企业类型
        filtercondition() {
            this.ajax
                .json('/dcp/query/factoringcompany/filtercondition', {})
                .then(res => {
                    this.companyTypeList = res.data.companyType
                    this.operatingStatusList = res.data.operatingStatus
                });
        },
        // 获取省市数据
        provinceandcity(province) {
            this.ajax
                .json('/dcp/query/factoringcompany/provinceandcity', { province }, { type: 'POST' })
                .then(res => {
                    if (!province) {
                        this.provinceList = res.data
                    } else {
                        this.cityList = res.data
                    }
                });
        },
        // 省改变事件
        provinceChange(v) {
            if (!v) this.cityList = []
            this.$set(this.params, 'city', '')
            this.provinceandcity(v)
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
                .json('/dcp/query/factoringcompany/list', this.params)
                .then(res => {
                    this.list = res.data.records
                    this.total = res.data.total
                });
        },
        // 重置
        reSet() {
            this.params = {
                current: 1,
                size: 10
            }
            this.total = 0
            this.getList()
        },
        // 新增
        toAdd() {
            this.$router.push({
                name: 'financing-operation-add'
            })
        },
        // 详情
        lookOver(row) {
            this.$router.push({
                name: 'financing-operation-detail',
                query: { id: row.id, companyName: row.companyName }
            })
        },
        // 导出
        exportData() {
            this.ajax
                .json("/dcp/query/factoringcompany/export", this.params, {
                    type: "export"
                })
                .then(res => { });
        },
        // ---------- 导入 ------------
        // 关闭上传弹窗
        closeUp() {
            this.file = [];
        },
        /* 上传文件 */
        async uploadHand(files) {
            let fileArr = Array.from(files);
            for (var i = 0; i < fileArr.length; i++) {
                this.file.push(files[i]);
            }
        },
        // 删除上传文件
        delFile(k) {
            this.file.splice(k, 1);
        },
        // 确认上传
        toUpload() {
            let data = {
                fileList: this.file
            };
            if (this.file && this.file.length > 0) {
                this.$http("/dcp/query/factoringcompany/upload", data, {
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
    },
}
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
    /deep/ .el-dialog__body{
        padding-bottom: 30px;
    }
</style>
