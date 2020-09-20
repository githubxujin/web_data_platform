<template>
    <div class="page">
        <div class="mainContent">
            <div class="mod pb0">
                <el-form :inline="true" size="medium">
                    <el-form-item>
                        <el-input v-model.trim="params.certNo" placeholder="登记证明编号" clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-select v-model="params.dataSource" placeholder="数据来源" clearable>
                            <el-option label="手工新增" value="2"></el-option>
                            <el-option label="盛易通" value="3"></el-option>
                            <el-option label="盛达通" value="4"></el-option>
                            <el-option label="盛易通_BGY" value="5"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.certStatus" placeholder="状态" clearable>
                            <el-option v-for="(v,k) in initCertStatus" :label="v" :value="k" :key='k'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="dealType">
                        <el-select v-model="params.dealType" placeholder="交易类型" clearable>
                            <el-option label="应收账款转让登记" value='应收账款转让登记'></el-option>
                            <el-option label="应收账款质押登记" value='应收账款质押登记'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.sellerName" placeholder="出质人/出让人名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.buyerName" placeholder="质权人/受让人名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.archiveNum" placeholder="填表人归档号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.assetDesc" placeholder="质押/转让财产描述" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="initData('search')">查询</el-button>
                        <el-button type="info" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mod">
                <!-- 表格 -->
                <el-table :data="list" style="width: 100%">
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="registerId" label="申请流水号" min-width="140"></el-table-column>
                    <el-table-column prop="sellerName" label="出质人/出让人名称" width="220" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{scope.row.sellerName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="registerType" label="登记种类" width="100"></el-table-column>
                    <el-table-column prop="buyerName" label="质权人/受让人名称" width="220" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="certNo" label="登记证明编号" width="220" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <a style="color:#43a1ac;" target="_blank" :href="gotoFile(scope.row.certFileId)">{{scope.row.certNo}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column prop="certStatus" label="状态" width="120" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{initCertStatus[scope.row.certStatus]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="modifyCode" label="修改码" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="archiveNum" label="填表人归档号" width="120" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="contractNumber" label="合同号" min-width="200" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="质押/转让财产描述" width="240" prop="assetDesc">
                        <template slot-scope="scope">
                            <span class="assetDesc" @click="handleDesc(scope.row.assetDesc)">{{scope.row.assetDesc}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="certStartDate" label="登记时间" width="170" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="certCycle" label="登记期限(月)" width="170" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="certEndDate" label="登记到期日" width="130" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="dataSource" label="数据来源" width="120">
                        <template slot-scope="scope">
                            <span>{{initdataSource[scope.row.dataSource]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="dealType" label="交易类型" width="170" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="subDealType" label="质押类型" width="170" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="createBy" label="操作者" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="createTime" label="操作时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="updateBy" label="更新者" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="160" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="onDetail(scope.row)" plain>详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <div class="page-nav">
                    <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='initData' :current-page.sync='params.current' @current-change='initData'
                        layout='total, sizes, prev, pager, next, jumper' :total='listMeta.totalSize' v-if='listMeta.totalSize > 0'>
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog v-if="descDialog" title="质押/转让财产描述" :center="true" :visible.sync="descDialog" :close-on-click-modal="false" width="700px">
            <div class="c_W">
                {{descDetail}}
            </div>
        </el-dialog>

        <el-dialog v-if="isDialog" title="登记汇总详情" :visible.sync="isDialog" :close-on-click-modal="false" width="90%">
            <detail :detailData="detailData" />
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    components: {
        detail: () => import('./register-total-overview.vue'),
    },
    data () {
        return {
            isDialog: false,
            initNumberDia: false,
            descDetail: '',
            descDialog: false,
            ids: [],
            list: [],
            listMeta: {},
            detailData: {},
            initCertStatus: {
                '1': '正常', '2': '已注销', '3': '已过期'
            },
            initdataSource: {
                '2': '手工新增',
                '3': '盛易通',
                '4': '盛达通',
                '5': '盛易通_BGY'
            },
            initregisterStatus: {
                '0': '待登记',
                '1': '登记中',
                '2': '登记成功',
                '3': '登记失败'
            },
            params: {
                registerType: '初始登记',
                sellerName: '',
                dealType: '',
                buyerName: '',
                registerStatus: [2],
                current: 1,
                size: 10
            },
            rules: {
                customerName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                productId: [{ required: true, message: '请选择产品名称', trigger: 'change' }],
                isEnable: [{ required: true, message: '请选择状态', trigger: 'change' }] // 状态：0 失效；1 生效
            }
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token
        }),
        fileAPI () {
            return this.env + '/zdw/getFile'
        }
    },
    mounted () {
        this.initData()
    },
    created () {
    },
    methods: {
        // 获取列表
        async initData (type) {
            if (type === 'search') {
                this.params.current = 1
            }
            let res = await this.ajax.json('dcp/asset/register/page/list', this.params)
            if (res.code === '200') {
                this.list = res.data.records
                this.listMeta.totalSize = res.data.total
            }
        },
        // 浏览文件
        gotoFile (fileId) {
            return `${this.fileAPI}?id=${fileId}&access_token=${this.token}`
        },
        // 查看描述
        handleDesc (val) {
            this.descDialog = true
            this.descDetail = val
        },
        onDetail (row) {
            // this.isDialog = true
            this.detailData.registerId = row.registerId
            this.detailData.certNo = row.certNo

            this.$router.push({
                path: '/zhongdeng/total-detail',
                query: this.detailData
            })
        },
        // 重置
        reset () {
            this.params = {
                registerType: '初始登记',
                sellerName: '',
                dealType: '',
                buyerName: '',
                registerStatus: [2],
                current: 1,
                size: 10
            }
            this.initData()
        }
    },
    filters: {
    }
}
</script>

<style lang="less" scoped>
.head {
    margin-bottom: 20px;
    padding: 5px 0 20px;
    border-bottom: 1px dashed #ebeef5;
}
.mt10 {
    margin-top: 10px;
}

.mb10 {
    margin-bottom: 10px;
}

.ml30 {
    margin-left: 30px;
}

.pt20 {
    padding-top: 20px;
}

.pb20 {
    padding-bottom: 20px;
}

.high {
    font-size: 20px;
    color: #fa8e3a;
}
.colorf {
    color: #fff;
}
.addsearch {
    min-width: 60px;
    margin-left: 20px;
}
//导入弹窗
.colorb {
    background-color: #0486fe;
}
.coloro {
    background-color: #fa8e3a;
}
.uploadBatch {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100px;
    height: 35px;
}

.uploadBatch:hover {
    cursor: pointer;
}
.tip {
    color: #999;
    line-height: 2;
    padding-left: 160px;
    //1px solid #e4e7ed
    img {
        vertical-align: text-bottom;
        padding-right: 10px;
    }
}
.descmain {
    span {
        color: #333;
        font-size: 16px;
    }
}
.assetDesc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
    width: 200px;
    vertical-align: middle;
    padding-right: 10px;
    cursor: pointer;
    color: #43a1ac;
}
.adetail {
    padding: 3px 10px;
    border: 1px solid #43a1ac;
    display: inline-block;
    border-radius: 3px;
}
.adetail:hover {
    text-decoration: none;
}
.highstatus {
    cursor: pointer;
    color: #fa8e3a;
}
.addDia /deep/ .el-form-item__content {
    text-align: left;
}
.addDia /deep/ .el-input {
    width: 260px;
}
</style>