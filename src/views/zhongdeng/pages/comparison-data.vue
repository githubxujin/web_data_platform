<template>
    <div class="page">
            <div class="mainContent">
                <div class="mod pb0">
                    <el-form :inline="true" size="medium">
                        <el-form-item>
                            <el-input class="" v-model.trim="params.customer" placeholder="客户名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input class="" v-model.trim="params.certNo" placeholder="登记证明编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="params.fileType" placeholder="登记种类" clearable>
                                <el-option label="初始登记" value="初始登记"></el-option>
                                <el-option label="变更登记" value="变更登记"></el-option>
                                <el-option label="展期登记" value="展期登记"></el-option>
                                <el-option label="注销登记" value="注销登记"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="params.status" placeholder="状态" clearable>
                                <el-option v-for="(v,k) in statuses" :key="k" :label="v" :value="k"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model.trim="params.transferor" placeholder="出质人/出让人名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model.trim="params.buyerName" placeholder="质权人名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker v-model="params.startDate" type="date" placeholder="登记时间开始日期" value-format="yyyy-MM-dd"></el-date-picker>
                            至
                            <el-date-picker v-model="params.endDate" type="date" placeholder="登记时间结束日期" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        
                        <el-form-item>
                            <el-input v-model.trim="params.relatedCertNo" placeholder="关联的初始登记证明编号" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model.trim="params.assetDesc" placeholder="质押/转让财产描述" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="initData('search')">查询</el-button>
                            <el-button class="el-btn-reset" @click="reset">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <div class="mod">

                    
                    <!-- 表格 -->
                    <el-table :data="list" style="width: 100%" border  @selection-change="handleSelectionChange">
                        <!-- <el-table-column type="selection" width="40" align="left"></el-table-column> -->
                        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                        <el-table-column prop="pdfFileName" label="登记证明文件名" width="240" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <a target="_blank" :href="gotoFile(scope.row.pdfFileId)">{{scope.row.pdfFileName}}</a>
                            </template>     
                        </el-table-column>
                        <el-table-column prop="customer" label="客户名称" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="transferor" label="出质人/出让人名称" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column label="登记证明编号" prop="certNo" width="160"  show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="fileType" label="登记种类" width="100"></el-table-column>
                        <el-table-column prop="certStartDate" label="登记时间" width="160" show-overflow-tooltip></el-table-column>

                        <el-table-column prop="certEndDate" label="登记到期日" width="130"   :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="fileStatus" label="状态" width="120" show-overflow-tooltip>
                            <template slot-scope="scope">
                                {{statuses[scope.row.fileStatus]}}
                            </template>                            
                        </el-table-column>
                        <el-table-column prop="relatedCertNo" label="关联的登记证明编号" width="160"   :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="certCycle" label="登记期限(月)" width="170"   :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column label="质押/转让财产描述" width="200" prop="assetDesc" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <span class="c_O cur" @click="handleDesc(scope.row.assetDesc)">{{scope.row.assetDesc}}</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="logoffInstruction" label="注销说明" width="200" show-overflow-tooltip>                            
                        </el-table-column> -->
                        <el-table-column prop="dealType" label="交易业务类型" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="formUserName" label="填表人名称" width="200" show-overflow-tooltip>
                        </el-table-column>

                        <!-- start 新加入字段， 2020年5月28日15:03:53 -->
                        <el-table-column prop="financingNo" label="融资合同编号" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="financingCurrency" label="融资合同币种" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="financingAmount" label="融资合同金额" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="assetCurrency" label="转让/质押财产币种" width="140" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="assetValue" label="转让/质押财产价值" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="contractNo" label="转让/质押合同号码" width="240" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="mainContractNo" label="主合同号码" width="180" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="contractCurrency" label="主合同币种" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="mainContractAmount" label="主合同金额" width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="debtDue" label="债务履行期限" width="200" show-overflow-tooltip></el-table-column>
                        <!-- end 新加入字段， 2020年5月28日15:03:53 -->

                        
                        <el-table-column prop="dataSource" label="发起渠道" width="130" show-overflow-tooltip>
                        </el-table-column>
                        <!-- <el-table-column prop="formUserAddr" label="填表人住所" width="200" show-overflow-tooltip></el-table-column> -->
                        <el-table-column prop="createBy" label="操作者" width="160" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="createTime" label="操作时间" width="160" show-overflow-tooltip ></el-table-column>
                        <el-table-column prop="updateBy" label="更新者" width="160" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="updateTime" label="更新时间" width="160" :show-overflow-tooltip="true" >
                        </el-table-column>
                        <el-table-column prop="files" label="操作" fixed="right" width="140" align='center'>
                            <template slot-scope="item">
                                <el-tooltip
                                    v-if="item.row.fileStatus!=4" 
                                    effect="dark" 
                                    popper-class='tooltip-files' 
                                    placement="top-end"> 
                                    <div slot="content">
                                        <div class='detail-file-table' style="overflow: auto;">
                                            <el-table :data="item.row.attachmentFileList" border>
                                                <el-table-column
                                                label="序号"
                                                type="index"
                                                align="center"
                                                width="50">
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
                                    <el-button class="el-btn-reset" size="mini" plain>查看附件</el-button>
                                </el-tooltip>
                                <el-button @click="handlefailed(item.row)" v-if="item.row.fileStatus==4"  type="primary" size="mini" plain>失败原因</el-button>
                            </template>
                            <el-button type="primary" size="mini" @click="toDetail(scope.row, true)" plain>补传资料</el-button>
                        </el-table-column>
                    </el-table>
                    <div class="page-nav">
                        <el-pagination :page-sizes='[10,20, 50, 100]' :page-size.sync='params.size' @size-change='initData' :current-page.sync='params.current' @current-change='initData' layout='total, sizes, prev, pager, next, jumper'
                        :total='listMeta.totalSize' v-if='listMeta.totalSize > 0'>
                        </el-pagination>
                    </div>
                </div>
            </div>
        
            <el-dialog v-if="isDialog" title="数据导入" :center="true" :visible.sync="isDialog" @close="cannelDia" :close-on-click-modal="false" width="630px">
                <template v-if="formDia.isUploadFile=='1'">
                    <div class="c_C3 icon-group pl15"><i class="iconfont icon-tongyong-wenxintishitubiao c_warning f18"></i>【温馨提示】系统支持中登网上下载的批量文件哦</div>  
                </template>   
                <template v-else>
                    <div class="c_C3 icon-group pl15"><i class="iconfont icon-tongyong-wenxintishitubiao c_warning f18"></i>【温馨提示】当您点击确定后，系统会根据您提供的名称自动去中登网下载相关信息哦</div>                    
                </template>
                <el-form ref="formDia" size='medium' :model="formDia" :rules="rulesDia" class="mt20" label-width="180px">
                    <el-form-item  prop="transferor">
                        <span slot="label">客户名称
                            <el-tooltip 
                            effect="dark" 
                            content="该处填写的客户名称是指您需要从中登网上下载的出让人/出质人姓名，亦指卖方名称/买方名称，且须填写完整的法定注册名称，不可填写简称" 
                            placement="top">
                            <i class="iconfont icon-tongyong-shuomingtishitubiao f18 c_O"></i>
                        </el-tooltip>
                        </span>
                        <el-input v-model.trim="formDia.transferor" style="width:330px"></el-input>
                        
                    </el-form-item>
                    <el-form-item label="是否手工导入文件" prop="isUploadFile" required>
                        <el-radio-group v-model="formDia.isUploadFile">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="2">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <template v-if="formDia.isUploadFile=='1'">
                        <el-form-item label="请选择文件" prop="fileName">
                            <el-col :span="14">
                                <el-input v-model="formDia.fileName"  disabled></el-input>
                            </el-col>
                            <el-col :span="6">
                                <el-button class="el-btn-reset ml20" size="medium"  @click="uploadHand()"><i class="el-icon-upload"></i> 浏览...</el-button>
                            </el-col>
                            <input type="file" v-if="isFile" multiple="multiple" id="uploadfile" accept=".pdf,.zip,.ZIP,.rar,RAR"  @change="changeFile" style="display:none">
                        </el-form-item>
                    </template>   

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cannelDia()">取 消</el-button>
                    <el-button type="primary" @click="diaSubmit">导 入</el-button>
                </div>
            </el-dialog>
            <el-dialog v-if="descDialog" title="转让财产描述" :center="true" :visible.sync="descDialog"  width="700px">
                <div class="c_W">
                    {{descDetail}}
                </div>
            </el-dialog>
            
        
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    components: {
    },
    data () {
        return {
            isDialog: false,
            descDialog: false,
            isCollect: false,
            collectData: {},
            timer: null,
            descDetail: '',
            ids: '',
            list: [{ name: '111' }],
            listMeta: {},
            tableFileList: [
                { name: '文件2222222' },
                { name: '文件三' }
            ],
            statuses: {
                0: '解析中', 1: '正常', 2: '已注销', 3: '已过期', 4: '解析失败'
            },
            role: '',
            params: {
                startDate: '',
                endDate: '',
                current: 1,
                size: 10
            },
            formDia: {
                transferor: '',
                isUploadFile: '2',
                relatedCertNo: '',
                fileName: ''
            },
            fileDomes: [],
            isFile: true,
            fileNameList: [],
            attachmentFiles: [],
            rulesDia: {
                transferor: [{ required: true, message: '请填写出质人/出让人名称', trigger: 'blur' }],
                fileName: [{ required: true, message: '请选择导入文件', trigger: 'blur' }]
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
    watch: {
        fileNameList (nv) {
            this.formDia.fileName = nv.join(',')
        },
    },
    mounted () {
        this.initData()

        // this.timer = setInterval(() => {
        //     this.initData()
        // }, 15000)
    },
    methods: {
        closeHand () {
            this.initData()
        },
        // 获取列表
        async initData (type) {
            if (type === 'search') {
                this.params.current = 1
            }
            let res = await this.ajax.get('zdw/assetCertInfo/assetCertList', this.params, { isLoading: false })
            if (res.code === '200') {
                this.list = res.data.list
                this.listMeta.totalSize = res.data.sizeCount
            }
        },

        cannelDia () {
            if (document.querySelector('#uploadfile')) {
                document.querySelector('#uploadfile').value = ''
            }
            this.fileNameList = []
            this.formDia.name = ''
            this.isDialog = false
        },
        toDetail (item, isUpload) {
        },
        handleSelectionChange (val) {
            let items = []
            val.forEach(v => {
                items.push(v.id)
            })

            this.ids = items.join()
        },
        handlefailed (row) {
            this.$alert(row.failDesc, '', {
                center: true
            })
        },
        importBtn () {
            this.isDialog = true
            // this.$alert(
            //     '该处的出让人/出质人姓名是指中登网上的资金融入方名称，亦即卖方名称，且须填写完整的法定注册名称',
            //     '系统提示',
            //     { center: true, confirmButtonText: '我知道了' })
            //     .then(res => {
            //         this.isDialog = true
            //     })
        },
        handleDesc (val) {
            this.descDialog = true
            this.descDetail = val
        },
        // 重置
        reset () {
            this.params = {
                customerName: '',
                status: '',
                current: 1,
                size: 10
            }
            this.initData()
        },
        uploadHand (item) {
            this.code = 1
            this.index = 2
            this.businessType = 3
            document.querySelector('#uploadfile').click()
            document.querySelector('#uploadfile').value = ''
        },
        //

        /* 上传文件 */
        changeFile () {
            let fileDom = document.querySelector('#uploadfile')
            if (!fileDom.files[0]) return
            this.fileDomes = fileDom.files
            this.fileNameList = []
            ;[].map.call(fileDom.files, v => {
                this.fileNameList.push(v.name)
            })
        },
        diaSubmit () {
            this.$refs['formDia'].validate((valid) => {
                if (valid) {
                    if (this.formDia.isUploadFile === '1') {
                        this.comfirmImport()
                    } else {
                        this.downloadAssert()
                    }
                }
            })
        },
        async downloadAssert () {
            let res = await this.ajax.get('zdw/assetCertInfo/downloadAssert', { transferor: this.formDia.transferor })
            if (res.code === '200') {
                // this.$alert('数据导入中，请稍后刷新页面查看', '温馨提示')
                this.isDialog = false
                this.collectData = res.data
                this.isCollect = true

                if (['2', '3'].includes(res.data.spiderStatus)) {
                    this.isCollect = false
                    return
                }

                this.$store.commit('setCollect', { isDialog: true, isAutoClose: false, isRefresh: false, isGoing: true, id: res.data.spiderId })

                // setTimeout(() => {
                //     this.getAssetSpiderTimer(res.data.spiderId)
                // }, 2000)
            }
        },
        comfirmImport () {
            let file = new FormData()
            this.isFile = false
            file.append('transferor', this.formDia.transferor)
            ;[].map.call(this.fileDomes, v => {
                file.append('file', v)
            })
            this.ajax.upload('zuul/zdw/uploadFile', file, { isReturnMsg: true, timeout: 600000 }).then(() => {
                this.$message.success('文件上传成功！')
                this.initData('search')
                this.formDia.transferor = ''
                this.isDialog = false
                this.fileNameList = []
                this.isFile = true
            }).catch((erro) => {
                if (erro.message) {
                    this.$message.error(erro.message)
                } else {
                    this.$message.error('文件上传失败！')
                }
                this.fileNameList = []
                this.isFile = true
            })
        },
        // 浏览文件
        gotoFile (fileId) {
            return `${this.fileAPI}?id=${fileId}&access_token=${this.token}`
        }
    },
    filters: {
        arrFormat (val) {
            return val.json()
        }
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
}
</script>

<style lang="less" scoped>
.page{
    position: relative;
}
.c_orage{ color: #FF9420;}
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
.pl50 {
    padding-left: 50px
}
.high {
    font-size: 20px;
    color: #fa8e3a;
}
.emailhandle.is-success {
    display: none
}
.mainContent /deep/ .el-tabs__item.is-active,
.el-tabs__item:hover {
    color: #fa8e3a;
}
.mainContent /deep/ .el-tabs__item:hover {
    color: #fa8e3a;
}
.mainContent /deep/ .el-tabs__active-bar {
    background-color: #fa8e3a;
}
.page /deep/ .el-dialog__body {
    overflow: auto;
    max-height: 680px;
}
.el-breadcrumb {
    margin-bottom: 20px;
}
.page /deep/ .el-form-item__content {
    text-align: left
}
body /deep/ .el-tooltip__popper{
    max-height: 600px;
    overflow: auto;
}
.icon-group {
    display: flex;
    align-items: center;
}
.icon-tip {
    width: 18px;
    height: 18px;
    margin-right: 4px;
    // background: url("~@/assets/images/icon1_1tip.png") no-repeat;
    display: inline-block;
}
.tip{
    position: absolute;
    right: 60px;
    color: #fa8e3a
}
.assetDesc{
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
    width: 200px;
    vertical-align: middle;
    padding-right: 10px;
    cursor: pointer;
    color: #43a1ac
}

.tip-ball{
    position: fixed;
    bottom: 100px;
    left: 240px;
    .wait-ball,.success-ball,.fail-ball{
        position: absolute;
        width:60px;
        height: 60px;
        transition: all .5s 0s;
        cursor: pointer;
    }
    .wait-ball{
        background: url("~@/assets/images/collect/icon-wait.png") no-repeat;
        &:hover{
            background: url("~@/assets/images/collect/icon-wait-h.png") no-repeat;
        }
        &:before{
            position: absolute;
            top: -8px;
            left: -8px;
            content: '';
            display: inline-block;
            width: 75px;
            height: 75px;
            background: url("~@/assets/images/collect/run.png") no-repeat;
            animation: rotate-ball 1s linear infinite;
        }
    }
    .success-ball{
        background: url("~@/assets/images/collect/icon-success.png") no-repeat;
        &:hover{
            background: url("~@/assets/images/collect/icon-success-h.png") no-repeat;
        }
    }
    .fail-ball{
        background: url("~@/assets/images/collect/icon-fail.png") no-repeat;
        &:hover{
            background: url("~@/assets/images/collect/icon-fail-h.png") no-repeat;
        }
    }
}

.ani-box{
    position: relative;
    .close{
        position: absolute;
        right:0;
        top:-20px;
        display: inline-block;
        cursor: pointer;
        color:#0486FE;
        .iconfont{
            display: inline-block;
            transform: rotate(-90deg)
        }
    }
    
}

.page /deep/ .el-dialog{
    .el-alert{
        padding: 4px 12px;
    }
    .el-alert--error{
        background: #FEF3EB;
        border: 1px solid #FCCCA7;
        border-radius: 4px;
        border-radius: 4px;
        color:#606266;
        
    }
    .el-alert__icon{
        font-size: 12px;
        color: #FA5555;
        width: 10px;
    }
    .el-alert__title{
        font-size: 12px;
        line-height: 21px;
    }
}

.pic{
    position: relative;
    width: 427px;
    height: 145px;
    margin: 34px auto 34px 80px;
    background: url("~@/assets/images/collect/bg.png") no-repeat;
    .ani-bread1{
        position: absolute;
        left:4px;
        top: 62px;
        width: 24px;
        height: 32px;
        background: url("~@/assets/images/collect/bread1.png") no-repeat;
        animation: bounceinT 2s ease-in infinite;
    }
    .ani-people{
        position: absolute;
        left:28px;
        top: 40px;
        width: 42px;
        height: 89px;
        background: url("~@/assets/images/collect/humen.png") no-repeat;
    }
    .screen-box{
        position: absolute;
        left:62px;
        top: -2px;
        width: 66px;
        height: 78px;
        background: url("~@/assets/images/collect/screen-shadow.png") no-repeat;
        .ani-screen{
            position: absolute;
            left:0;
            top:0;
            width: 66px;
            height: 78px;
            background: url("~@/assets/images/collect/screen.png") no-repeat;
            animation: widthT 2s ease-in infinite;
        }
    }
    .ani-bread2{
        position: absolute;
        left:160px;
        top: 24px;
        width: 68px;
        height: 53px;
        background: url("~@/assets/images/collect/bread2.png") no-repeat;
        animation: bounceinT 2s 1s ease-in infinite;
    }
    .ani-cloud{
        position: absolute;
        left:192px;
        top: -1px;
        width: 26px;
        height: 19px;
        background: url("~@/assets/images/collect/cloud.png") no-repeat;
        animation: move-re 3s 0s ease-in infinite alternate;
        
    }
    .ani-line1,.ani-line2,.ani-line3,.ani-line4,.ani-line5{
        position: absolute;
        left:148px;
        top: 94px;
        width: 18px;
        height: 13px;
        background: url("~@/assets/images/collect/ani-line.png") no-repeat;
        opacity: 0;
    }
    .ani-line1{
        animation: move1 3s 0s ease-in infinite;
    }
    .ani-line2{
        left:306px;
        top: 94px;
        animation: move1 3s 1.5s ease-in infinite;
    }
    .ani-line3{
        left:352px;
        top: 118px;
        transform: rotate(-64deg);
        animation: move-rotate 3s 2.5s linear infinite;
       
    }
    .ani-line4{
        left:373px;
        top: 21px;
        animation: move1 3s .6s ease-in infinite;
    }
    .ani-line5{
        left:184px;
        top: 114px;
        transform: rotate(-64deg);
        animation: move-rotate 3s 1s linear infinite;
    }
    .pillar-box{
        .ani-pillar1{
            position: absolute;
            left:260px;
            top: 40px;
            width: 7px;
            height: 13px;
            background: url("~@/assets/images/collect/pillar1.png") no-repeat;
            animation: bounceinT 1s 0s ease-in infinite;
        }
        .ani-pillar2{
            position: absolute;
            left:266px;
            top: 33px;
            width: 8px;
            height: 17px;
            background: url("~@/assets/images/collect/pillar2.png") no-repeat;
            animation: bounceinT 1s 1s ease-in infinite;
        }
        .ani-pillar3{
            position: absolute;
            left:272px;
            top: 27px;
            width: 8px;
            height: 20px;
            background: url("~@/assets/images/collect/pillar3.png") no-repeat;
            animation: bounceinT 1s 1.5s ease-in infinite;
        }
    }
    .ani-bread3{
        position: absolute;
        left:320px;
        top: 8px;
        width: 58px;
        height: 59px;
        background: url("~@/assets/images/collect/bread3.png") no-repeat;
        animation: bounceinT 2s 1.5s ease-in infinite;
    }
    .files-box{
        .files-ripple{
            position: absolute;
            right:-72px;
            top: 46px;
            width: 115px;
            height: 64px;
            background: url("~@/assets/images/collect/files-ripple.png") no-repeat;
            animation: scale 3s 0s ease-in infinite;
        }
        .files-d{
            position: absolute;
            right:-50px;
            top: 42px;
            width: 72px;
            height: 58px;
            background: url("~@/assets/images/collect/files-d.png") no-repeat;
        }
        .files{
            position: absolute;
            right:-38px;
            top: 16px;
            width: 45px;
            height: 59px;
            background: url("~@/assets/images/collect/files.png") no-repeat;
            animation: bounceinT 2s 0s ease-in infinite;
        }

        .ani-people{
            position: absolute;
            right:-80px;
            top: 10px;
            left: initial;
            transform: rotateY(180deg)
        }
    }
    .up-line-box{
        .up-line1,.up-line2,.up-line3,.up-line4{
            position: absolute;
            right:4px;
            top: 2px;
            width: 3px;
            height: 20px;
            background: url("~@/assets/images/collect/up-line.png") no-repeat;
            opacity: 0;
        }
        .up-line1{
            animation: fadeUp 2s 0s ease-in infinite;
        }
        .up-line2{
            right:-8px;
            top: -6px;
            animation: fadeUp 2s 0.3s ease-in infinite;
        }
        .up-line3{
            right:-24px;
            top: -4px;
            animation: fadeUp 2s 0.5s ease-in infinite;
        }
        .up-line4{
            right:-37px;
            top: 4px;
            animation: fadeUp 2s 0.4s ease-in infinite;
        }
    }
    .up-success{
        position: absolute;
        right:-24px;
        top: -20px;
        width: 19px;
        height: 43px;
        background: url("~@/assets/images/collect/seccess.png") no-repeat;
        animation: bounceinT 2s 0s ease-in infinite;
    }

    
}

.progress{
    position: relative;
    width: 400px;
    height: 10px;
    margin: 0 auto;
    background: #FFF2C5;
    box-shadow: inset 0 2px 3px 0 rgba(255,214,66,0.78);
    border-radius: 6.5px;
    .progress-tip{
        position: absolute;
        left: 0;
        top: -36px;
        width:55px;
        height: 40px;
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        color: #FFFFFF;
        background: url("~@/assets/images/collect/tip.png") no-repeat;
        transition: left .5s .5s;
    }
    .progress-bar{
        width:0%;
        height: 10px;
        background-image: linear-gradient(90deg, #FFC01E 1%, #FF9E08 99%);
        box-shadow: inset 0 1px 4px 0 #FFE365;
        border-radius: 6.5px;
        transition: width .5s .5s;
    }
}
.txt-box{
    width: 400px;
    margin: 16px auto;
    .txt-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

.fail{
    &.progress{
        background: #DFDFDF;
        border: 0 solid #C0C0C0;
        box-shadow: inset 0 2px 3px 0 rgba(201,201,201,0.78);
        .progress-tip{
            background: url("~@/assets/images/collect/tip-g.png") no-repeat;
        }
        .progress-bar{
            background-image: linear-gradient(-180deg, #C6C6C6 0%, #909090 100%);
            box-shadow: inset 0 1px 4px 0 #BABABA;
        }
    }
    .c_orage{
        color: #606266
    }
}



@keyframes bounceinT{
    0%{transform:translateY(-10%);}
    60%{transform:translateY(10%);}
    80%{transform:translateY(-5%);}
    100%{transform:translateY(-10%);}
}
@keyframes move1{
    0%{
        opacity: 0;
        transform:translate(0,0);
    }
    10%{
        opacity: 1;
    }
    20%,30%,80%,100%{
        transform:translate(24px, 14px);
    }
    20%{
        opacity: .6;
    }
    25%{
        opacity: 0;
    }
    100%{
        opacity: 0;
    }
}

@keyframes move-rotate{
    0%{
        opacity: 0;
        transform:translate(0,0) rotate(-64deg);
    }
    10%{
        opacity: 1;
    }
    20%,30%,80%,100%{
        transform:translate(40px, -24px) rotate(-64deg);
    }
    20%{
        opacity: .6;
    }
    25%{
        opacity: 0;
    }
    100%{
        opacity: 0;
    }
}

@keyframes move-re{
    0%{
        transform:translate(0, 0)
    }
    100%{
        transform:translate(30px, 20px)
    }
}
@keyframes float{
    0%{
        transform:translateY(0)
    }
    100%{
        transform:translateY(-20%)
    }
}
@keyframes fadeUp{
    0%{
        transform:translateY(0);
        opacity: 0;
    }
    50%{
        transform:translateY(-50%);
        opacity: 1;
    }
    100%{
        transform:translateY(-80%);
        opacity: 0;
    }
}

@keyframes scale{
    0%{
        transform: scale(.8);
        opacity: .3;
    }
    50%{
        transform: scale(1);
        opacity: 1;
    }
    100%{
        transform:scale(1.2);
        opacity: .5;
    }
}

@keyframes widthT {
    0%{
        width: 0%;
    }
    60%{
        width: 100%;
    }
    100%{
        width: 100%;
    }
}
@keyframes rotate-ball {
    0%{
        transform: rotate(0)
    }
    100%{
        transform: rotate(360deg)
    }
}
</style>
