<!--尽调报告详情-->
<template>
    <div class="stat qg-report">
        <div class="table-wrap mt15 mb30">
            <div class="table-title">{{this.$route.params.customerName}}</div>
            <div class="tabs-title mt30 mb20">基本信息</div>
            <table class="table-public-detail">
                <tr>
                    <td>客户名称</td>
                    <td>{{form.customerName}}</td>
                    <td>买方名称</td>
                    <td>{{form.projectMasterPackage}}</td>
                </tr>
                <tr>
                    <td>项目名称</td>
                    <td>{{form.projectName}}</td>
                    <td>项目类型</td>
                    <td v-if="form.projectType==='9'">{{form.projectTypeDes}}</td>
                    <td v-else>{{form.projectType | projectType}}</td>
                </tr>
                <tr>
                    <td>报告类型</td>
                    <td>{{ form.reportType | status}}</td>
                    <td>报告编码</td>
                    <td>{{form.reportNo}}</td>
                </tr>
                <tr>
                    <td>报告撰写人</td>
                    <td>{{form.reportPerson}}</td>
                    <td>撰写时间</td>
                    <td>{{form.submitTime}}</td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">项目信息</div>
            <table class="table-public-detail">
                <tr>
                    <td>走访人员</td>
                    <td>{{form.visitPerson}}</td>
                    <td>走访时间</td>
                    <td>{{ form.visitDate}}</td>
                </tr>
                <tr>
                    <td>受访人员</td>
                    <td colspan="3" class="tab-tr3">
                        <el-table :data="form.visitPersonInfos">
                            <el-table-column prop="position" label="职位">
                                <template slot-scope="item">
                                    <span v-if="item.row.positionDes === '99'">{{ item.row.positionDes}}</span>
                                    <span v-else>{{ item.row.position | position}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="realName" label="姓名"></el-table-column>
                        </el-table>
                    </td>
                </tr>
                <tr>
                    <td>项目位置</td>
                    <td colspan="3" class="tab-tr3">
                        <el-table :data="form.locationInfos">
                            <el-table-column prop="projectAutoLocation" label="自动位置" show-overflow-tooltip width="500"></el-table-column>
                            <el-table-column prop="projectLocation" label="手填位置" show-overflow-tooltip width="500"></el-table-column>
                        </el-table>
                    </td>
                </tr>
                <tr>
                    <td>业主名称</td>
                    <td>{{form.projectOwner}}</td>
                    <td>业主背景</td>
                    <td>{{ form.ownerBackground | ownerBackground }}</td>
                </tr>
                <tr>
                    <td>材料品牌要求</td>
                    <td>{{form.brandRequirement}}</td>
                    <td>买卖双方合作阶段</td>
                    <td v-if="form.contractInterviewSummary === '3'">{{ form.contractInterviewSummaryDes}}</td>
                    <td v-else>{{ form.contractInterviewSummary | toContractInterviewSummary}}</td>
                </tr>
                <tr>
                    <td>实际施工单位</td>
                    <td>{{form.constructionUnit}}</td>
                    <td>正式合同预计签约时间</td>
                    <td>{{ form.contractSignTime}}</td>
                </tr>
                <tr class="nest">
                    <div class="box">
                        <table v-for="(v,i) in form.reportMaterialInfos" :key="i">
                            <tr>
                                <td>供应内容</td>
                                <td colspan="3" class="tab-tr3 Supply">
                                    {{ v.supplyContent | toSupplyContent}}
                                </td>
                            </tr>
                            <tr>
                                <td>总需求量{{v.unit}}</td>
                                <td>
                                    {{v.totalProjectDemand}}
                                </td>
                                <td>剩余需求量{{v.unit}}</td>
                                <td>
                                    {{v.projectSurplusDemand}}
                                </td>
                            </tr>
                            <tr>
                                <td>客户已供应量{{v.unit}}</td>
                                <td>
                                    {{v.customerSupplied}}
                                </td>
                                <td>首次供货时间</td>
                                <td>
                                    {{v.startSupplyTime}}
                                </td>
                            </tr>
                            <tr>
                                <td>供应商个数</td>
                                <td>
                                    {{v.suppliersNumber}}
                                </td>
                                <td>预计供货结束时间</td>
                                <td>
                                    {{v.endSupplyTime}}
                                </td>
                            </tr>
                        </table>
                    </div>
                </tr>
                <tr class="topLine">
                    <td>项目开工时间</td>
                    <td>{{form.projectStartDate}}</td>
                    <td>主体封顶/完工时间</td>
                    <td>{{form.subjectCappingTime}}</td>
                </tr>
                <tr>
                    <td>是否涉及场外加工</td>
                    <td>{{ form.isOutProduct === '1' ? '是' : (form.isOutProduct === '' ? '' : '否') }}</td>
                    <td>场外加工基本情况</td>
                    <td>{{form.outsideMachining}}</td>
                </tr>
                <tr>
                    <td>是否已对账</td>
                    <td>{{ form.reconciliationStatus === '1' ? '是' : (form.reconciliationStatus === '' ? '' : '否') }}</td>
                    <td>对账日期(每月)</td>
                    <td>{{form.reconciliationDate}}</td>
                </tr>
                <tr>
                    <td>收料单有效签字人(任一即可)</td>
                    <td>{{form.invoiceSignPerson}}</td>
                    <td>对账/结算单有效签字人(同时签字)</td>
                    <td>{{form.billSignPerson}}</td>
                </tr>
                <tr>
                    <td>对账单是否要求盖项目章</td>
                    <td>{{ form.isStampBill === '1' ? '是' : (form.isStampBill === '' ? '' : '否') }}</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>项目工程进度</td>
                    <td colspan="3" class="cospan">{{form.projectProgress}}</td>
                </tr>
                <tr>
                    <td>到货视频审核要点</td>
                    <td colspan="3" class="cospan">{{form.checkRemark}}</td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">账款信息</div>
            <table class="table-public-detail">
                <tr>
                    <td>业主给买方付款方式</td>
                    <td>{{form.ownerPayForm?form.ownerPayForm.join():''}}</td>
                    <td>业主给买方付款条件及比例</td>
                    <td>{{form.ownerPayFormCondition}}</td>
                </tr>
                <tr>
                    <td>买方给供应商付款方式</td>
                    <td>{{form.masterPackagePayForm?form.masterPackagePayForm.join():''}}</td>
                    <td>买方给供应商付款条件及比例</td>
                    <td>{{form.masterPackagePayFormCondition}}</td>
                </tr>
                <tr>
                    <td>是否已回款</td>
                    <td>{{ form.isReturn === '1' ? '是' : (form.isReturn === '' ? '' : '否') }}</td>
                    <td>已回款金额</td>
                    <td>{{form.returnAmount | numFormat}}</td>
                </tr>
                <tr>
                    <td>开票节点</td>
                    <td>{{form.invoiceNode | toinvoiceNode}}</td>
                    <td>项目反馈付款周期(天)</td>
                    <td>{{form.actualPaymentPeriod}}</td>
                </tr>
                <tr>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">其他信息</div>
            <table class="table-public-detail">
                <tr>
                    <td>其他说明</td>
                    <td colspan="3" class="tab-tr3">{{form.otherMsg}}</td>
                </tr>
            </table>
            <div class="tabs-title mt30 mb20">附件信息</div>
            <el-button type="info" size="medium" style="margin-bottom:20px;" icon="iconfont icon-tongyong-daorutubiao" @click="onLodow">一键下载</el-button>
            <table class="table-faily">
                <tr>
                    <td colspan="2">类型</td>
                    <td>名称（注：点击文件名可下载）</td>
                </tr>
                <tr>
                    <td rowspan="2" class="rightLine">照片</td>
                    <td class="second">送货环境标志物</td>
                    <td class="others center">
                        <div v-for="(v,i) in photoList" class="source" :key="i">
                            <a @click="isDialog2=true;lockImg(v,1)" class="file-item" style="margin-right:5px;">{{v.fileName}}</a>
                            <span class="xiazai" @click="downLoad(v)">下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>其他</td>
                    <td class="center">
                        <div v-for="(v,i) in photoList1" class="source" :key="i">
                            <a @click="isDialog2=true;lockImg(v,2)" class="file-item" style="margin-right:5px;">{{v.fileName}}</a>
                            <span class="xiazai" @click="downLoad(v)">下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">视频</td>
                    <td class="center">
                        <div v-for="(v,i) in videoList" class="source" :key="i">
                            <a @click="isDialog=true;playVideo(v)" class="file-item" style="margin-right:5px;">{{v.fileName}}</a>
                            <span class="xiazai" @click="downLoad(v)">下载</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">音频</td>
                    <td class="center">
                        <p v-for="(v,i) in audioList" class="source" :key="i">
                            <a @click="isDialog1=true;playAudio(v)" class="file-item" style="margin-right:5px;">{{v.fileName}}</a>
                            <span class="xiazai" @click="downLoad(v)">下载</span>
                        </p>
                    </td>
                </tr>
            </table>
            <!-- 预览照片 -->
            <el-dialog v-if="isDialog2" title="预览照片" :center="true" :visible.sync="isDialog2" :close-on-click-modal="false" width="80%" custom-class="img-mod">
                <div class="operation">
                    <div @click="toBig"><img src="../../assets/images/big.png" alt=""><span>放大</span></div>
                    <div @click="toSmall"><img src="../../assets/images/small.png" alt=""><span>缩小</span></div>
                </div>
                <div :class="{'tc':isContent, 'tc-img':isContent1,'tc-img1':isContent2}">
                    <img id="imgs" :class="{'imgs':isImg,'imgs-new':isImg1}" @load="loadImg" :src="filePrefix + '?filepath=' + physicalFileName + '&dataPath=' + dataPath" alt />
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" plain size='mini' @click="prev" round>上一张</el-button>
                    <el-button type="primary" plain size='mini' @click="next" round>下一张</el-button>
                </div>
            </el-dialog>
            <!-- 播放视频 -->
            <el-dialog v-if="isDialog" title="播放视频" :center="true" :visible.sync="isDialog" :close-on-click-modal="false" width="80%" custom-class="img-mod">
                <div class="tc" style="height:100%;">
                    <video class="vide" id="video" controls="true" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                        :src="filePrefix + '?filepath=' + item.physicalFileName + '&dataPath=' + dataPath" style="max-width:100%;max-height:100%"></video>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size='mini' @click="goRotate" plain round>点击旋转</el-button>
                </div>
            </el-dialog>
            <!-- 播放音频 -->
            <el-dialog v-if="isDialog1" title="播放音频" :center="true" :visible.sync="isDialog1" :close-on-click-modal="false" width="640px" custom-class="img-mod">
                <div class="tc">
                    <audio class="vide" controls="true" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                        :src="filePrefix + '?filepath=' + itemAudio.physicalFileName + '&dataPath=' + dataPath"></audio>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            form: {},
            isFile: true,
            isDialog: false,
            isDialog1: false,
            isDialog2: false,
            isDialogOne: false,
            isImg: true,
            isImg1: false,
            isContent: true,
            isContent1: true,
            isContent2: false,
            imgList: [
                {
                    fileId: 0,
                    fileName: 'dsafdsafdsa.png'
                }
            ],
            params: {
                id: '',
                fileType: ''
            },
            item: {},
            photoList: [],
            photoList1: [],
            videoList: [],
            audioList: [],
            filePrefix: '',
            dataPath: '',
            physicalFileName: '',
            itemAudio: {},
            num: 1,
            width: 0,
            height: 0,
            zipUrl: ''
        }
    },
    created () {
        this.id = this.$route.params.id
        // console.log(this.id)
        this.getInfo()
        this.getFileList()
    },
    methods: {
        // 获取详情内容
        getInfo () {
            this.ajax.json('/riskreport/riskReport/queryRiskReportInfo', { id: this.id })
                .then(res => {
                    // console.log(res)
                    this.form = {}
                    this.form = res.data || {}
                    // 受访人员处理
                    if (this.form.visitPersonInfos && this.form.visitPersonInfos.length === 0 && this.form.projectVisitedPerson) {
                        this.form.visitPersonInfos.push({
                            position: '',
                            realName: this.form.projectVisitedPerson
                        })
                    }
                    if (this.form.reportMaterialInfos && this.form.reportMaterialInfos.length === 0) {
                        this.form.reportMaterialInfos = [
                            {
                                supplyContent: '',
                                totalProjectDemand: '',
                                projectSurplusDemand: '',
                                customerSupplied: '',
                                startSupplyTime: '',
                                suppliersNumber: '',
                                endSupplyTime: ''
                            }
                        ]
                    }
                    this.form.reportMaterialInfos.forEach(v => {
                        if (v.supplyContent === '1' || v.supplyContent === '4' || v.supplyContent === '9' || v.supplyContent === '10' || v.supplyContent === '13') {
                            v.unit = '(吨)'
                        } else if (v.supplyContent === '12' || v.supplyContent === '7') {
                            v.unit = '(㎡或张)'
                        } else if (v.supplyContent === '11' || v.supplyContent === '2' || v.supplyContent === '5') {
                            v.unit = '(m³)'
                        } else if (v.supplyContent === '99' || v.supplyContent === '8') {
                            v.unit = '(元)'
                        } else if (v.supplyContent === '6') {
                            v.unit = '(㎡)'
                        }
                    })
                    this.form = { ...this.form }
                    // 业主给总包付款方式处理
                    if (this.form.ownerPayForm) {
                        this.form.ownerPayForm = this.form.ownerPayForm.split(",");
                    } else {
                        this.form.ownerPayForm = [];
                    }
                    //总包给供应商
                    if (this.form.masterPackagePayForm) {
                        this.form.masterPackagePayForm = this.form.masterPackagePayForm.split(
                            ","
                        );
                    } else {
                        this.form.masterPackagePayForm = [];
                    }
                    this.form = [...this.form]
                }).catch(err => {
                    console.log(err)
                })
        },
        // 获取文件列表
        getFileList () {
            const vm = this
            this.params.id = this.id
            this.ajax.json('/riskreport/fileList/getFileList', this.params)
                .then(res => {
                    // console.log(res)
                    this.filePrefix = res.data.filePrefix
                    this.dataPath = res.data.dataPath
                    if (res.data.list) {
                        res.data.list.forEach(ele => {
                            if (ele.fileMgr.length > 0) {
                                ele.fileMgr.forEach(el => {
                                    if (el.imageFileType == "1" && el.fileType == "PHOTO") {
                                        vm.photoList.push(el);
                                    } else if (el.imageFileType == "99" && el.fileType == "PHOTO") {
                                        vm.photoList1.push(el);
                                    } else if (el.fileType == "VIDEO") {
                                        vm.videoList.push(el);
                                    } else if (el.fileType == "AUDIO") {
                                        vm.audioList.push(el);
                                    }
                                });
                            }
                        });
                    }
                }).catch(err => {
                    console.log(err)
                })
        },
        // 点击旋转视频
        goRotate () {
            let video = document.querySelector('#video')
            let rotates = this.num * 90
            if (this.num === 1) {
                this.height = window.getComputedStyle(video).height
                this.width = window.getComputedStyle(video).width
                video.style.transform = `rotate(${rotates}deg)`
                video.style.width = this.height
                this.num++
            } else {
                video.style.transform = `rotate(${rotates}deg)`
                video.style.width = this.height
                if ((this.num % 2) === 0) {
                    video.style.width = this.width
                }
                this.num++
            }

        },
        /* 下载文件 */
        downLoad (v) {
            window.open(this.filePrefix + '?filepath=' + v.physicalFileName + '&fileName=' + v.fileName + '&dataPath=' + this.dataPath)
        },
        // 点击查看图片
        lockImg (v, num) {
            // console.log('v',v);
            this.type = num
            this.physicalFileName = v.physicalFileName;
        },
        // img onload 事件
        loadImg () {
            this.smallWidht = 0
            this.smallHeight = 0
            let imgs = document.querySelector('#imgs')
            this.smallWidht = imgs.width
            this.smallHeight = imgs.height
            // console.log('afdsafds',this.smallWidht,this.smallHeight);
        },
        // 放大照片
        toBig () {
            // this.rotateCode = 1
            this.isImg = false
            this.isImg1 = true
            this.isContent2 = true
            let imgs = document.querySelector('#imgs')
            this.widthImg = imgs.width
            this.heightImg = imgs.height
            imgs.style.width = this.widthImg + 50 + 'px'
            imgs.style.height = this.heightImg + 50 + 'px'
            // console.log(imgs.width,imgs.height);
        },
        // 缩小照片
        toSmall () {
            let imgs = document.querySelector('#imgs')
            this.widthImg = imgs.width
            this.heightImg = imgs.height
            if (this.smallWidht >= (this.widthImg - 50)) {
                this.isImg = true
                this.isImg1 = false
                this.isContent2 = false
                imgs.style.width = this.smallWidht + 'px'
                imgs.style.height = this.smallHeight + 'px'
                // console.log(this.smallWidht,this.smallHeight);
            } else {
                imgs.style.width = this.widthImg - 50 + 'px'
                imgs.style.height = this.heightImg - 50 + 'px'
            }
        },
        // 上一张
        prev () {
            this.isImg = true
            this.isImg1 = false
            this.isContent2 = false
            let imgs = document.querySelector('#imgs')
            imgs.setAttribute('style', '')
            if (this.type === 1) {
                // console.log(this.photoList);
                // 标志建筑物图片
                for (let i = 0; i < this.photoList.length; i++) {
                    if (this.physicalFileName === this.photoList[i].physicalFileName) {
                        if (i === 0) {
                            this.$message.error('已经是第一张了')
                            return
                        } else {
                            this.physicalFileName = this.photoList[i - 1].physicalFileName
                            return
                        }

                    }
                }
            } else {
                // 其他 图片
                for (let i = 0; i < this.photoList1.length; i++) {
                    if (this.physicalFileName === this.photoList1[i].physicalFileName) {
                        if (i === 0) {
                            this.$message.error('已经是第一张了')
                            return
                        } else {
                            this.physicalFileName = this.photoList1[i - 1].physicalFileName
                            return
                        }

                    }
                }
            }
        },
        // 下一张
        next () {
            this.isImg = true
            this.isImg1 = false
            this.isContent2 = false
            let imgs = document.querySelector('#imgs')
            imgs.setAttribute('style', '')
            if (this.type === 1) {
                // 标志建筑物图片
                for (let i = 0; i < this.photoList.length; i++) {
                    if (this.physicalFileName === this.photoList[i].physicalFileName) {
                        if (i !== (this.photoList.length - 1)) {
                            // console.log(i);
                            this.physicalFileName = this.photoList[i + 1].physicalFileName
                            return
                        } else
                            this.$message.error('已经是最后一张了')
                        return
                    }
                }
            } else {
                // 其他 图片
                for (let i = 0; i < this.photoList1.length; i++) {
                    if (this.physicalFileName === this.photoList1[i].physicalFileName) {
                        if (i !== (this.photoList1.length - 1)) {
                            this.physicalFileName = this.photoList1[i + 1].physicalFileName
                            return
                        } else
                            this.$message.error('已经是最后一张了')
                        return
                    }
                }
            }
        },
        // 点击播放视频
        playVideo (v) {
            // console.log(v);
            this.item = v
        },
        // 点击播放音频
        playAudio (v) {
            this.itemAudio = v
        },
        // 一键下载
        onLodow () {
            let ids = []
            this.photoList.forEach(v => {
                ids.push(v.fileId)
            })
            this.photoList1.forEach(v => {
                ids.push(v.fileId)
            })
            this.videoList.forEach(v => {
                ids.push(v.fileId)
            })
            this.audioList.forEach(v => {
                ids.push(v.fileId)
            })
            if (ids && ids.length === 0) return
            this.$confirm('确认下载？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
                // type: 'warning'
            }).then(() => {
                this.ajax.json('/riskreport/fileList/getZipDownLoadUrl', { ids }).then(res => {
                    // console.log(res);
                    if (res.code === '200') {
                        this.zipUrl = res.data.zipUrl
                        // console.log(this.zipUrl);
                        // this.isDialogOne = true
                        window.open(this.zipUrl)
                    }
                })
            })

        }
    },
    filters: {
        // 业主背景
        ownerBackground (key) {
            switch (key) {
                case '1':
                    return '中央企业'
                case '2':
                    return '地方国企'
                case '3':
                    return '事业单位'
                case '4':
                    return '白名单地产公司'
                case '5':
                    return '民营企业500强'
                case '10':
                    return '其他'
                default:
                    break;
            }
        },
        projectType (key) {
            switch (key) {
                case '1':
                    return '新建项目'
                case '2':
                    return '扩建项目'
                case '3':
                    return '改建项目'
                case '4':
                    return '迁建项目'
                case '5':
                    return '恢复项目'
                case '10':
                    return '基建'
                case '11':
                    return '房建'
                case '12':
                    return '市政'
                case '13':
                    return '工业厂房'
                case '14':
                    return '商业综合体'
                default:
                    break;
            }
        },
        position (key) {
            switch (key) {
                case '1':
                    return '项目经理'
                case '2':
                    return '商务经理'
                case '3':
                    return '物资经理(部长)'
                case '4':
                    return '材料负责人'
                case '5':
                    return '材料员'
                case '99':
                    return '其他'
                default:
                    break;
            }
        },
        status (value) {
            switch (value) {
                case '1':
                    return '贷前'
                case '2':
                    return '贷后'
                case '3':
                    return '现场走访'
                case '4':
                    return '常规贷后'
                default:
                    break;
            }
        },
        toPriceWeb (key) {
            switch (key) {
                case '':
                    return ''
                case '1':
                    return '我的钢铁网'
                case '2':
                    return '兰格网'
                default:
                    break;
            }
        },
        toContractInterviewSummary (key) {
            switch (key) {
                case '':
                    return ''
                case '1':
                    return '合同'
                case '2':
                    return '约谈纪要/备忘录'
                default:
                    break;
            }
        },
        toReconciliationBillForm (key) {
            switch (key) {
                case '':
                    return ''
                case '1':
                    return '机打'
                case '2':
                    return '手写'
                default:
                    break;
            }
        },
        toinvoiceNode (key) {
            switch (key) {
                case '1':
                    return '付款前'
                case '2':
                    return '对账后'
                case '3':
                    return '不固定'
                case '':
                    return ''
                default:
                    break;
            }
        },
        toSupplyContent (code) {
            // 1、钢筋；2、混凝土；3、砖；4、砂石；5、土方、6、幕墙；7、铝合板；8、劳务
            switch (code) {
                case '1':
                    return '钢筋'
                case '2':
                    return '混凝土'
                case '3':
                    return '砖'
                case '4':
                    return '砂石'
                case '6':
                    return '幕墙'
                case '8':
                    return '劳务'
                case '9':
                    return '型材'
                case '10':
                    return '钢绞线'
                case '11':
                    return '木枋'
                case '12':
                    return '模板'
                case '99':
                    return '其他'
                default:
                    break
            }
        },
        toStampBill (key) {
            switch (key) {
                case '':
                    return ''
                case '1':
                    return '是'
                case '0':
                    return '否'
                default:
            }
        },
        // 项目类型
        toProjectType (key) {
            // 1、新建项目；2、扩建项目；3、改建项目；4、迁建项目；5、恢复项目；9、其他
            switch (key) {
                case '1':
                    return '新建项目'
                case '2':
                    return '扩建项目'
                case '3':
                    return '改建项目'
                case '4':
                    return '迁建项目'
                case '5':
                    return '恢复项目'
                default:
                    break
            }
        },
        // 建筑性质
        toBuildingNature (key) {
            // 1、商务办公；2、住宅；3、铁路；4、公路；5、高铁；6、地铁；7、隧道；8、桥梁；9、其他
            switch (key) {
                case '1':
                    return '商住两用楼'
                case '2':
                    return '住宅'
                case '3':
                    return '铁路'
                case '4':
                    return '公路'
                case '5':
                    return '高铁'
                case '6':
                    return '地铁'
                case '7':
                    return '隧道'
                case '8':
                    return '桥梁'
                case '9':
                    return '办公写字楼'
                case '10':
                    return '大厂房'
                default:
                    break
            }
        },
        // 下单方式
        toOrderForm (key) {
            //  1、电话；2、邮箱；3、微信；4、纸质
            switch (key) {
                case '1':
                    return '电话'
                case '2':
                    return '邮箱'
                case '3':
                    return '微信'
                case '4':
                    return '纸质'
                default:
                    break
            }
        },
        // 业主给总包付款方式
        toOwnerPayForm (key) {
            // 1、银行转账；2、电子商业承兑汇票；3、银行保理；4、信用证；9、其他
            switch (key) {
                case '1':
                    return '银行转账'
                case '2':
                    return '电子商业承兑汇票'
                case '3':
                    return '银行保理'
                case '4':
                    return '信用证'
                default:
            }
        },
        toMasterPackagePayForm (key) {
            // 1、银行转账；2、电子商业承兑汇票；3、银行保理；4、信用证；9、其他
            switch (key) {
                case '1':
                    return '银行转账'
                case '2':
                    return '电子商业承兑汇票'
                case '3':
                    return '银行保理'
                case '4':
                    return '信用证'
                default:
            }
        }
    }

}
</script>
<style lang="scss" >
.stat {
    width: 1360px;
    margin: 0 auto;
}
/deep/ .n-title {
    padding: 0;
}
.dark {
    .qg-report {
        .el-table tr {
            width: 1124px;
        }
        .file-item {
            &:hover {
                color: #6188e1;
            }
        }
        .table-faily {
            width: 100%;
            border: 1px solid #54575c;
            border-collapse: collapse;
            font-family: PingFangSC-Light;
            font-size: 14px;
            tr {
                width: 100%;
                background: rgb(35, 37, 40);
                td {
                    color: #a0a3a8;
                    padding: 17px 20px;
                    min-height: 48px;
                    text-align: center;
                    box-sizing: border-box;
                    border-right: 1px solid #54575c;
                    border-bottom: 1px solid #54575c;
                    &:nth-child(odd) {
                        color: #a0a3a8;
                        width: 150px;
                        border-right: 0;
                        background: #292b2f;
                    }
                    &:nth-of-type(2) {
                        border-right: 0;
                    }
                    &:last-child {
                        border-right: 0;
                    }
                }
                td.rightLine {
                    width: 15%;
                    border-right: 1px solid #54575c;
                }
                td.second {
                    width: 20%;
                    background: #292b2f;
                }
                td.others {
                    background: rgb(35, 37, 40);
                }
            }
        }

        tr.topLine {
            border-top: 1px solid #54575c;
        }
        .table-public-detail {
            tr td {
                height: inherit;
                line-height: inherit;
                padding: 20px 10px;
            }
            tr td.tab-tr3 {
                width: calc(100% - 150px);
                tr td {
                    border-bottom: 0;
                    background: none;
                    flex: 1;
                }
            }

            tr.nest {
                .box {
                    width: 100%;
                    padding: 30px 20px;
                    table {
                        width: 100%;
                        border: 1px solid #54575c;
                        border-collapse: collapse;
                        font-family: PingFangSC-Light;
                        font-size: 14px;
                        td {
                            width: calc(50% - 150px);
                            color: #d3d3d4;
                            padding: 17px 20px;
                            min-height: 48px;
                            box-sizing: border-box;
                            border-right: 1px solid #54575c;
                            border-bottom: 1px solid #54575c;
                            &:nth-child(odd) {
                                color: #a0a3a8;
                                width: 150px;
                                border-right: 0;
                                background: #292b2f;
                            }
                            &:nth-of-type(2) {
                                border-right: 0;
                            }
                            &:last-child {
                                border-right: 0;
                            }
                        }
                        tr:last-child {
                            border-bottom: 0;
                        }
                        td.tab-tr3 {
                            width: calc(100% - 150px);
                        }
                    }
                }
            }
        }
    }
}

.light {
    .qg-report {
        .el-table th,
        .el-table tr {
            width: 100%;
        }
        .el-table tr {
            width: 1124px;
        }
        .file-item {
            color: #666;
            &:hover {
                color: #6188e1;
            }
        }
        .table-faily {
            width: 100%;
            border: 1px solid #d2d9e5;
            border-collapse: collapse;
            font-size: 14px;
            tr {
                width: 100%;
                background: #fff;
                td {
                    color: #666;
                    padding: 17px 20px;
                    min-height: 48px;
                    text-align: center;
                    box-sizing: border-box;
                    border-right: 1px solid #d2d9e5;
                    border-bottom: 1px solid #d2d9e5;
                    &:nth-child(odd) {
                        color: #666;
                        width: 150px;
                        border-right: 0;
                        background: #f2f5fd;
                    }
                    &:nth-of-type(2) {
                        border-right: 0;
                    }
                    &:last-child {
                        border-right: 0;
                    }
                }
                td.rightLine {
                    width: 15%;
                    border-right: 1px solid #d2d9e5;
                }
                td.second {
                    width: 20%;
                    background: #f2f5fd;
                }
                td.others {
                    background: #fff;
                }
            }
        }

        tr.topLine {
            border-top: 1px solid #d2d9e5;
        }
        .table-public-detail {
            tr td {
                height: inherit;
                line-height: inherit;
                padding: 20px 10px;
            }
            tr td.tab-tr3 {
                width: calc(100% - 150px);
                tr td {
                    border-bottom: 0;
                    background: none;
                    flex: 1;
                }
            }
            tr.nest {
                .box {
                    width: 100%;
                    padding: 30px 20px;
                    table {
                        width: 100%;
                        border: 1px solid #d2d9e5;
                        border-collapse: collapse;
                        font-size: 14px;
                        td {
                            width: calc(50% - 150px);
                            color: #666;
                            padding: 17px 20px;
                            min-height: 48px;
                            box-sizing: border-box;
                            border-right: 1px solid #d2d9e5;
                            /* border-bottom: 1px solid #d2d9e5; */
                            &:nth-child(odd) {
                                color: #666;
                                width: 150px;
                                border-right: 0;
                                background: #f2f5fd;
                            }
                            &:nth-of-type(2) {
                                border-right: 0;
                            }
                            &:last-child {
                                border-right: 0;
                            }
                        }
                        tr:last-child {
                            border-bottom: 0;
                        }
                        td.tab-tr3 {
                            width: calc(100% - 150px);
                        }
                    }
                }
            }
        }
    }
}

.xiazai {
    color: #6188e1;
    margin-right: 85px;
    cursor: pointer;
}
.center {
    text-align: left !important;
    padding-left: 114px !important;
}
.source {
    color: #d3d3d4;
    display: inline-block;
    line-height: 25px;
}
</style>