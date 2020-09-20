<template>
    <div class="page">
        <div class="mainContent table-wrap mt20">
            <div class="mod pb0">
                <el-form :inline="true" size="medium">
                    <el-form-item>
                        <el-input v-model.trim="params.buyerName" placeholder="买方名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.contractName" placeholder="合同名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.contractNo" placeholder="合同编号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="params.invoiceNo" placeholder="发票号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="params.matchStatus" placeholder="系统建议" clearable>
                            <el-option v-for="(v,k) in matchSearchStatus" :key='k' :label="v" :value="k"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="initData('search')">查询</el-button>
                        <el-button type="info" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mod">
                <!-- 表格 -->

                <a :href="reportFileUrl" ref='aFileUrl' target="_blank" style="display: none"></a>
                <el-table :data="list" style="width: 100%" row-key="id" ref="multipleTable">
                    <!-- <el-table-column type="selection" width="46" align="center" :reserve-selection="true"></el-table-column> -->
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="invoiceNo" label="发票号" width="140" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="{highcolor:true}">{{scope.row.invoiceNo|formatInvoiceNo(scope.row)}}</span>
                            <span>{{scope.row.invoiceNo|formatNormalNo(scope.row)}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sellerName" label="卖方名称" width="160" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="buyerName" label="买方名称" width="220" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="{highcolor:scope.row.buyerNameStatus==2}">{{scope.row.buyerName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractName" label="合同名称" width="220" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="{highcolor:scope.row.contractNameStatus==2}">{{scope.row.contractName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="contractNo" label="合同编号" width="220" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span :class="{highcolor:scope.row.contractNoStatus==2}">{{scope.row.contractNo}}</span>
                        </template>

                    </el-table-column>
                    <el-table-column prop="contractNo" label="系统建议" width="140" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <span>{{exStatus[scope.row.matchStatus]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createBy" label="操作者" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createTime" label="操作时间" width="160" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="updateBy" label="更新者" width="130" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="updateTime" label="更新时间" width="160" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="address" label="操作" align="center" fixed="right" width="100">
                        <template slot-scope="item">
                            <el-button type="primary" size="mini" @click="onDetail(item.row)" plain>详情</el-button>
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

        <el-dialog title="详情" :close-on-click-modal="false" :visible.sync="isDialog1" width="90%" append-to-body>

            <div class="mod pb0">
                <el-form :inline="true" size="medium">
                    <el-form-item>
                        <el-input class="" v-model.trim="paramsDia.certNo" placeholder="登记证明编号" clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input v-model.trim="paramsDia.relatedNo" placeholder="关联的初始登记证明编号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model.trim="paramsDia.desc" placeholder="质押/转让财产描述" clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="getInfo('search')">查询</el-button>
                        <el-button class="el-btn-reset" @click="resetDia">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="mod">
                <el-table :data="diaList" style="width: 100%" border>
                    <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                    <el-table-column prop="pdfFileName" label="登记证明文件名" width="240" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <a target="_blank" :href="gotoFile(scope.row.pdfFileId)">{{scope.row.pdfFileName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column label="质押/转让财产描述" min-width="200" prop="assetDesc" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span class="cur" @click="handleDesc(scope.row.assetDesc)" v-html="scope.row.assetDesc"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="transferor" label="出质人/出让人名称" width="160" show-overflow-tooltip></el-table-column>
                    <el-table-column label="登记证明编号" prop="certNo" width="160" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fileType" label="登记种类" width="100"></el-table-column>
                    <el-table-column prop="certEndDate" label="登记到期日" width="130" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="relatedCertNo" label="关联的登记证明编号" width="190" :show-overflow-tooltip="true">
                    </el-table-column>

                    <el-table-column prop="files" label="操作" fixed="right" width="140" align='center'>
                        <template slot-scope="item">
                            <el-tooltip v-if="item.row.fileStatus!=4" effect="dark" popper-class='tooltip-files' placement="top-end">
                                <div slot="content">
                                    <div class='detail-file-table' style="overflow: auto;">
                                        <el-table :data="item.row.attachmentFileList" border>
                                            <el-table-column label="序号" type="index" width="50" align="center">
                                            </el-table-column>
                                            <el-table-column prop="fileName" label="附件名称" width="240">
                                                <template slot-scope="scope">
                                                    <a :href="gotoFile(scope.row.fileId)" style="color:#43a1ac" target="_blank">
                                                        {{scope.row.fileName}}
                                                    </a>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                                <el-button type="primary" size="mini" plain>查看附件</el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>

            </div>

            <div class="page-nav">
                <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='paramsDia.size' @size-change='initData' :current-page.sync='paramsDia.current' @current-change='initData'
                    layout='total, sizes, prev, pager, next, jumper' :total='listMetaDia.totalSize' v-if='listMetaDia.totalSize > 0'>
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog v-if="descDialog" title="质押/转让财产描述" :visible.sync="descDialog" width="700px" append-to-body :close-on-click-modal="false">
            <div class="c_W" v-html="descDetail"></div>
        </el-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: {
        detailData: {
            type: Object,
            default () {
                return {
                    id: '',
                    name: ''
                }
            }
        }
    },
    components: {
    },
    data () {
        let vm = this
        return {
            isDialog: false,
            isDialog1: false,
            descDialog: false,
            tipDialog: false,
            isAutoAll: false,

            isBall: false,
            isWait: false,
            isSuccess: false,
            isFail: false,

            curData: {},
            timer: null,
            showdownbtn: '',
            descDetail: '',
            row: {}, // 当前数据
            selectObj: {},
            selectes: [],
            list: [],
            diaList: [],
            listMeta: {},
            listMetaDia: {},
            isData: false,
            isFile: true,
            reportFileUrl: '',
            numList: [],
            name: vm.detailData.name || '',
            form: {
                'buyerName': '', // 买方名称,
                'contractName': '', // 合同名称,
                'contractNo': '', // 合同编号,
                'invoiceNo': '', // 发票号,
                'matchStatus': '' // 查重结果
            },
            matchSearchStatus: {
                'a': '不可接受转让',
                'g': '可接受转让',
                'b,c,d,e,f': '需人工判断'
            },
            matchStatus: {
                'a': '高度匹配',
                'b': '高度匹配',
                'c': '疑似高度匹配',
                'd': '高度匹配',
                'e': '特别关注',
                'f': '安全',
                'g': '异常'
            },
            exStatus: {
                'a': '不可接受转让',
                'g': '可接受转让',
                'b': '需人工判断',
                'c': '需人工判断',
                'd': '需人工判断',
                'e': '需人工判断',
                'f': '需人工判断'
            },
            params: {
                current: 1,
                size: 10
            },
            paramsDia: {
                current: 1,
                size: 10
            },
            checkData: {
                pending: null,
                processed: 0,
                process: 0,
                'matchCount': 0, // 命中数
                'highMatchCount': 0, // 高度匹配数
                'mistMatchCount': 0, // 疑似匹配数
                'specialFocusCount': 0, // 特别关注数
                'errorCount': 0, // 异常数
                'safetyCount': 0, // 安全数
                'historyCount': 0, // 累积处理数据
                diaSuccess: false,
                diaErro: false
            },
            rules: {
                customerName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' }
                ],
                productId: [{ required: true, message: '请选择产品名称', trigger: 'change' }],
                isEnable: [{ required: true, message: '请选择状态', trigger: 'change' }] // 状态：0 失效；1 生效
            },
            crumbsList: [
                { path: '/check', text: '查重列表' },
                { text: '详情' }
            ]
        }
    },
    computed: {
        ...mapState({
            token: state => state.user.token
        }),
        fileAPI () {
            return this.env + '/zdw/getFile/'
        }
    },
    watch: {
    },
    mounted () {
        this.initData()
    },
    methods: {
        onDetail (row) {
            let arr = [];


            (row.attachmentFileList || []).map(v => {
                arr.push(v.fileName)
            })

            this.$router.push({
                path: '/zhongdeng/check-inner',
                query: {
                    id: row.id,
                    files: arr.join()
                }
            })
        },
        handleDesc (val) {
            this.descDialog = true
            this.descDetail = val
        },
        // 获取比对数据库数据
        async getInfo (type) {
            if (type === 'search') {
                this.paramsDia.current = 1
            }

            console.log(1111, this.curData.attachmentFileList)

            let arr = []
            this.paramsDia.screenDetailId = this.curData.id;
            (this.curData.attachmentFileList || []).map(v => {
                arr.push(v.fileName)
            })
            this.paramsDia.fileNameList = arr

            if (!this.paramsDia.fileNameList.length) {
                this.diaList = []
                return
            }

            let res = await this.ajax.json('dcp/asset/cert/info/page/list', this.paramsDia, { isLoading: false })
            if (res.code === '200') {
                this.diaList = res.data.records
                this.listMetaDia.totalSize = res.data.total
            }
        },
        // 获取列表
        async initData (type) {
            if (type === 'search') {
                this.params.current = 1
            }
            this.params.assetId = this.$route.query.id
            let res = await this.ajax.json('dcp/asset/screen/detail/page/list', this.params)
            if (res.code === '200') {
                this.list = res.data.records
                this.listMeta.totalSize = res.data.total
            }
        },

        // 浏览文件
        gotoFile (fileId, isdown) {
            if (isdown) {
                return `${this.fileAPI}?id=${fileId}&download=1&log_mark=1&access_token=${this.token}`
            } else {
                return `${this.fileAPI}?id=${fileId}&access_token=${this.token}`
            }
        },
        // 重置
        reset () {
            this.params = {
                current: 1,
                size: 10
            }
            this.initData()
        },
        // 重置
        resetDia () {
            this.paramsDia = {
                current: 1,
                size: 10
            }
            this.getInfo()
        }
    },
    filters: {

        formatInvoiceNo (val, row) {
            let str = ''
            switch (row.matchStatus) {
                case 'a':
                    str = row.invoiceNo
                    break
                case 'b':
                    str = row.invoiceNo.slice(0, 7)
                    break
                case 'c':
                    str = row.invoiceNo.slice(0, 6)
                    break
                default: {
                    str = ''
                    break
                }
            }
            return str
        },
        formatNormalNo (val, row) {
            let str = ''
            switch (row.matchStatus) {
                case 'a':
                    str = ''
                    break
                case 'b':
                    str = row.invoiceNo.slice(7, row.invoiceNo.length)
                    break
                case 'c':
                    str = row.invoiceNo.slice(6, row.invoiceNo.length)
                    break
                default: {
                    str = row.invoiceNo
                    break
                }
            }
            return str
        }
    }
}
</script>

<style lang="less" scoped>
.ani-box /deep/ .el-progress-circle__track {
    stroke: #ffeddb !important;
}
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
.pd188 {
    padding: 0 188px;
}
.c-progress {
    padding-left: 156px;
    padding-right: 116px;
}
.high {
    font-size: 20px;
    color: #fa8e3a;
}
.colorf {
    color: #fff;
}
.highcolor {
    color: #43a1ac;
}
//导入弹窗
.colorb {
    background-color: #0486fe;
}
.coloro {
    background-color: #fa8e3a;
}
.btn:hover {
    cursor: pointer;
    text-decoration: none;
}
.btn {
    position: relative;
    text-decoration: none;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    border-radius: 4px;
    width: 100px;
    text-align: center;
    font-size: 14px;
    line-height: 36px;
    padding: 0px 10px;
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
.adetail {
    padding: 3px 10px;
    border: 1px solid #43a1ac;
    display: inline-block;
    border-radius: 3px;
}
.adetail:hover {
    text-decoration: none;
}
.uploadBatch:hover {
    cursor: pointer;
}
.checkdia /deep/ .el-form-item {
    margin-bottom: 0;
}
.checkdia /deep/ .el-progress-bar__outer {
    background: #ffecd8;
}
.checkdia /deep/ .el-button--small.is-round {
    padding: 9px 24px;
}

.row {
    .col {
        width: 100%;
        text-align: center;
        padding-top: 6px;
        padding-bottom: 2px;
        p:nth-child(1) {
            font-size: 18px;
            color: #ff9420;
        }
        p:nth-child(2) {
            font-size: 14px;
            color: #909399;
        }
    }
    .col + .col {
        border-left: 1px solid #dcdfe6;
    }
}
.row + .row {
    border-top: 1px solid #dcdfe6;
}

.ani-box {
    position: relative;
    .ani-bd {
        position: absolute;
        top: 12px;
        left: 12px;
        width: 196px;
        height: 196px;
        background: url(~@/assets/images/tu1.png) no-repeat;
        transition: background 500ms 0s;
        &.seccess {
            background: url(~@/assets/images/tu2.png) no-repeat;
        }
    }
    .run-box {
        position: absolute;
        top: calc(50% - 22);
        left: calc(50% - 22);
        width: 100px;
        height: 100px;
        animation: rotate 2s infinite linear;
        .run-icon {
            width: 61px;
            height: 63px;
            top: calc(50% - 30);
            left: calc(50% - 14);
            background: url(~@/assets/images/icon-4.png) no-repeat;
            animation: rotate-icon 2s infinite linear;
        }
    }
}
.num-box {
    position: relative;
    span {
        position: absolute;
        font-size: 10px;
        color: #ffffff;
        animation: fadeIn 1.5s infinite linear;
        // transition: all .5s 0s;
    }
}
@keyframes fadeIn {
    0% {
        // transform: translateY(-20px);
        transform: scale(0.5);
        opacity: 0;
    }
    50% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(1.2);
        opacity: 0;
    }
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
@keyframes rotate-icon {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(-360deg);
    }
}

.ani-box {
    position: relative;
    .close {
        position: absolute;
        right: 0;
        top: -20px;
        display: inline-block;
        cursor: pointer;
        color: #0486fe;
        .iconfont {
            display: inline-block;
            transform: rotate(-90deg);
        }
    }
}

.tip-ball {
    position: fixed;
    bottom: 100px;
    left: 240px;
    .wait-ball,
    .success-ball,
    .fail-ball {
        position: absolute;
        width: 60px;
        height: 60px;
        transition: all 0.5s 0s;
        cursor: pointer;
    }
    .wait-ball {
        background: url('~@/assets/images/collect/icon-wait.png') no-repeat;
        &:hover {
            background: url('~@/assets/images/collect/icon-wait-h.png') no-repeat;
        }
        &:before {
            position: absolute;
            top: -8px;
            left: -8px;
            content: '';
            display: inline-block;
            width: 75px;
            height: 75px;
            background: url('~@/assets/images/collect/run.png') no-repeat;
            animation: rotate-ball 1s linear infinite;
        }
    }
    .success-ball {
        background: url('~@/assets/images/collect/icon-success.png') no-repeat;
        &:hover {
            background: url('~@/assets/images/collect/icon-success-h.png') no-repeat;
        }
    }
    .fail-ball {
        background: url('~@/assets/images/collect/icon-fail.png') no-repeat;
        &:hover {
            background: url('~@/assets/images/collect/icon-fail-h.png') no-repeat;
        }
    }
}

@keyframes rotate-ball {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>