<template>
    <div class="stat we-photo">
        <el-row class="table-wrap mt20">
            <div class="table-title" v-if="$route.name !== 'dataAdministration-delivery-query-deliveryDetail'">到货视频审核详情</div>
            <div class="table-title" v-else>到货视频查看详情</div>
            <div class="tabs-title mb20">基本信息</div>
            <el-form :inline="true" ref="form" size="medium" :model="params" class="jib-info">
                <el-form-item prop="sellerName">
                    <el-input v-model="params.sellerName" disabled clearable placeholder="卖方名称"></el-input>
                </el-form-item>
                <el-form-item prop="deliveryDate">
                    <el-input v-model="params.projectName" disabled clearable placeholder="项目名称"></el-input>
                </el-form-item>
            </el-form>
            <div class="tabs-title mb20">审核信息</div>
            <el-form :inline="true" ref="form" size="medium" :model="params">
                <el-form-item prop="deliveryDate">
                    <el-date-picker v-model="params.deliveryDate" clearable type="date" value-format="yyyy-MM-dd" placeholder="上传时间"></el-date-picker>
                </el-form-item>
                <el-form-item prop="status">
                    <el-select v-model="params.status" clearable placeholder="视频状态">
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="合格" value="1"></el-option>
                        <el-option label="不合格" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.page=1;getList()">查询</el-button>
                    <el-button type="info" @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>

            <el-row class='el-iconfont'>
                <el-tooltip class="item" effect="dark" content="标记合格" placement="top">
                    <span class="iconfont icon-shujuzhongxin-biaojihege" @click="mark('1')"></span>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="标记不合格" placement="top">
                    <span class="iconfont icon-shujuzhongxin-biaojibuhege" @click="mark('2')"></span>
                </el-tooltip>
            </el-row>

            <el-table :data="list" ref="table" @selection-change="handleSelectionChange" class="sbxiuhan">
                <el-table-column v-if="router !== 'dataAdministration-delivery-query-deliveryDetail'" type="selection" label="" width="50" :selectable="checkSelectable" align="center"></el-table-column>
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="createdTime" label="上传时间" width="180"></el-table-column>
                <el-table-column prop="filePosition" label="地点" width="380" show-overflow-tooltip>
                    <template slot="header" slot-scope="item">
                        <span>{{item.column.label}}</span>
                        <el-tooltip popper-class="tip-item" class="item" effect="dark" content="地点与尽调报告中的项目位置(自动)，相距超过1000米，则红色显示" placement="top-start">
                            <i class="iconfont icon-tongyong-shuomingtishitubiao"></i>
                        </el-tooltip>
                    </template>
                    <template slot-scope="item">
                        <span v-if="item.row.checkPosition === '1'" class="red-adress">
                            {{ item.row.filePosition ? item.row.filePosition : item.row.deliveryPosition }}
                        </span>
                        <span v-else>
                            {{ item.row.filePosition ? item.row.filePosition : item.row.deliveryPosition }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="fileResource" label="到货视频手动上传" width="200">
                    <template slot-scope="item">
                        {{ item.row.fileResource === '0' ? '不允许' : '允许' }}
                    </template>
                </el-table-column>
                <el-table-column prop="carNo" label="车牌号" width="200">
                    <template slot-scope="item">
                        <div class="car-no" v-if="router === 'dataAdministration-delivery-query-deliveryDetail'">{{item.row.carNo}}</div>
                        <el-input class="car-no" v-else v-model="item.row.carNo" :disabled="item.row.isDis" clearable @blur="tocarNo(item.row)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="fileStatus" label="视频状态" width="200">
                    <template slot-scope="item">
                        <el-tag :type="setClss(item.row.fileStatus)">{{ item.row.fileStatus | fileStatus }}</el-tag>

                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" align="center" fixed="right" :width="router !== 'dataAdministration-delivery-query-deliveryDetail' ? '300' : '200'">
                    <template slot-scope="item">
                        <el-button type="info" plain size="mini" @click="isDialog=true;toLock(item.row)" style="margin-right:10px;">查看视频</el-button>
                        <el-popover placement="bottom-end" width="240" trigger="click">
                            <div v-for="ele in item.row.photoFileList" :key="ele.id" style="text-align:center;">
                                <a style="display:inline-block;width:100%;line-height:34px;margin-top:-1px;" href="JavaScript:;" @click="isDialog2=true;toVideo(item.row,ele)">{{ele.fileName}}</a>
                            </div>
                            <el-button type="primary" style="margin-right:10px;" plain size="mini" slot="reference" @click="lockImg(item.row)">查看照片</el-button>
                        </el-popover>
                        <el-button type="danger" v-if="router !== 'dataAdministration-delivery-query-deliveryDetail'" plain size="mini" @click="toMark(item.row)">标记为项目位置</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-nav" v-show="sizeCount>params.size">
                <el-pagination @size-change="handleSizeChange" @current-change="getList()" :current-page.sync="params.page" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="sizeCount"></el-pagination>
            </div>
        </el-row>
        <!-- 预览照片 -->
        <el-dialog v-if="isDialog2" :title="预览照片" :center="true" :visible.sync="isDialog2" :close-on-click-modal="false" width="80%" class="photo">
            <div class="operation">
                <div @click="rotateImg"><img src="../../assets/images/rotate.png" alt=""><span>旋转</span></div>
                <div @click="toBig"><img src="../../assets/images/big.png" alt=""><span>放大</span></div>
                <div @click="toSmall"><img src="../../assets/images/small.png" alt=""><span>缩小</span></div>
            </div>
            <div :class="{'tc':isContent, 'tc-img':isContent1,'tc-img1':isContent2}">
                <img id="imgs" :class="{'imgs':isImg,'imgs-new':isImg1}" @load="loadImg" :src="item1.filePrefix + '?filepath=' + physicalFileName + '&dataPath=' + item1.dataPath" alt="">
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size='mini' @click="prev">上一张</el-button>
                <el-button type="primary" size='mini' @click="dowloadImg">下载</el-button>
                <el-button type="primary" size='mini' @click="next">下一张</el-button>
            </div>
        </el-dialog>
        <!-- 播放视频 -->

        <el-dialog v-if="isDialog" title="播放视频" :center="true" :visible.sync="isDialog" :close-on-click-modal="false" width="80%">
            <div class="tc" style="height:100%;padding:30px 100px;display:flex;">
                <div class="vid-box" style="width:50%;">
                    <video class="vide" id="video" controls="true" webkit-playsinline="true" playsinline="true" x-webkit-airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true"
                        :src="item.filePrefix + '?filepath=' + item.physicalFileName + '&dataPath=' + item.dataPath" style="max-width:100%;max-height:100%;object-fit: fill"></video>
                    <div class="biaozhiwu">
                        <div>
                            <p style="text-align: left;">审核要点：</p>
                            <p style="font-size:14px;padding-right:10px;text-align: left;">{{checkRemark}}</p>
                        </div>
                    </div>
                </div>
                <div class="img-box">
                    <div class="let-img" :class="{'tc':isContent, 'tc-img':isContent1,'tc-img1':isContent2}">
                        <img id="imgs1" :class="{'imgs':isImg,'imgs-new':isImg1}" @load="loadImg" :src="item1.filePrefix + '?filepath=' + physicalFileName1 + '&dataPath=' + item1.dataPath" alt="">
                    </div>
                    <div class="jiantou">
                        <div @click="prev1">
                            <i class="el-icon-arrow-up"></i>
                        </div>
                        <div @click="next1">
                            <i class="el-icon-arrow-down"></i>
                        </div>
                    </div>
                    <p class="songhuo">送货环境标志物</p>

                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size='mini' @click="goRotate">点击旋转</el-button>
                <el-button type="primary" @click="dowLoad()" size='mini'>下载视频</el-button>
                <el-button size='mini' v-if="router !== 'dataAdministration-delivery-query-deliveryDetail'" type='primary' :disabled="item.fileStatus === 1 || item.fileStatus === 2" @click="isQualified=true;isCheck=1">合格
                </el-button>
                <el-button size='mini' v-if="router !== 'dataAdministration-delivery-query-deliveryDetail'" type="danger" :disabled="item.fileStatus === 1 || item.fileStatus === 2" @click="isQualified=true;isCheck=2">不合格
                </el-button>
            </div>
        </el-dialog>
        <!-- 提示 -->
        <el-dialog v-if="isShow" title="系统提示" :center="true" :visible.sync="isShow" :close-on-click-modal="false" width="440px" class="hege">
            <p class="tc">请确认是否修改视频状态？</p>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="isShow = false" size='mini'>取消</el-button>
                <el-button type="primary" @click="isShow = false;toChange()" size='mini'>确认</el-button>
            </div>
        </el-dialog>
        <!-- 合格 or 不合格 -->
        <el-dialog v-if="isQualified" title="填写车牌号" :center="true" :visible.sync="isQualified" :close-on-click-modal="false" width="440px" class="hege">
            <el-form :inline="true" ref="formCar" size="medium" :model="carData" align="center">
                <el-form-item label="车牌号" prop="sellerName">
                    <el-input v-model="carData.carNo" clearable></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="info" @click="isQualified = false;isCheck=''" size='mini'>取消</el-button>
                <el-button v-if="isCheck===1" type="primary" @click="qualified('1')" size='mini'>合格</el-button>
                <el-button v-if="isCheck===2" type="danger" @click="qualified('2')" size='mini'>不合格</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            isShow: false,
            isDialog: false,
            isDialog2: false,
            isContent: true,
            isContent1: true,
            isContent2: false,
            isQualified: false,
            isCheck: '',
            isImg: true,
            isImg1: false,
            sizeCount: 0,
            params: {
                size: 10,
                page: 1,
                projectId: '',
                projectName: '',
                sellerName: '',
                deliveryDate: '',
                status: ''
            },
            list: [],
            ids: [],
            item: {},
            item1: {},
            ele: {},
            status: '',
            num: 1,
            width: 0,
            height: 0,
            router: this.$route.name,
            physicalFileName: '',
            physicalFileName1: '',
            widthImg: 0,
            heightImg: 0,
            smallWidht: 0,
            smallHeight: 0,
            codeImg: 1,
            imgFileName: '',
            rotateCode: 0,
            imgList: [],
            imgList1: [],
            checkRemark: '',
            carData: {
                carNo: ''
            }
        }
    },
    created () {
        this.params.projectId = this.$route.params.id
        this.params.projectName = this.$route.params.projectName
        this.params.sellerName = this.$route.params.customerName
        this.getList()
    },
    methods: {
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        },
        getList () {
            this.$http('/riskreport/arrivalVideo/arrivalVideoList', this.params, { type: 'json' })
                .then(res => {
                    // console.log(res);
                    this.list = res.data.list || []
                    this.sizeCount = res.data.sizeCount
                    this.list.forEach(v => {
                        if (v.carNo) {
                            v.isDis = true
                        } else {
                            v.isDis = false
                        }
                    })
                    this.list = [...this.list]
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // 标记项目为项目位置
        toMark (item) {
            // console.log('item',item);
            let projectData = {
                fileId: item.fileId,
                projectId: item.projectId,
                videoId: item.id
            }
            this.$confirm('确定标记为项目位置？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            })
                .then(() => {
                    this.$http('/riskreport/arrivalVideo/setToProjectPosition', projectData, { type: 'json' }).then(res => {
                        if (res.code === '200') {
                            this.$message.success('标记成功')
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                })
                .catch(() => { })
        },
        // 复选框禁用
        checkSelectable (row) {
            // console.log('row',row);
            if (row.carNo) {
                return false
            } else {
                return true
            }
        },
        // 查看视频
        toLock (item) {
            this.item = item
            this.item1 = item
            if (this.isDialog) {
                this.isImg = true
                this.isImg1 = false
                this.isContent2 = false
            }
            this.imgList1 = item.photoMarkerFileList
            if (this.imgList1 && this.imgList1.length !== 0) {
                this.physicalFileName1 = this.imgList1[0].physicalFileName
            }
            // 获取审核要点内容
            this.checkRemark = item.checkRemark
        },
        lockImg (item) {
            this.imgList = item.photoFileList
        },
        toVideo (item, ele) {
            if (this.isDialog2) {
                this.isImg = true
                this.isImg1 = false
                this.isContent2 = false
            }
            this.item1 = item
            this.imgFileName = ele.fileName
            this.physicalFileName = ele.physicalFileName
        },
        // img onload 事件
        loadImg () {
            this.smallWidht = 0
            this.smallHeight = 0
            let imgs = document.querySelector('#imgs')
            this.smallWidht = imgs.width
            this.smallHeight = imgs.height
        },
        // 上一张
        prev () {
            this.codeImg = 0
            this.isImg = true
            this.isImg1 = false
            let imgs = document.querySelector('#imgs')
            imgs.setAttribute('style', '')
            let rotate = this.codeImg * 90
            imgs.style.transform = `rotate(${rotate}deg)`
            for (var i = 0; i < this.imgList.length; i++) {
                if (
                    this.physicalFileName === this.imgList[i].physicalFileName
                ) {
                    if (i === 0) {
                        this.$message.error('已经是第一张了')
                        return
                    } else {
                        this.physicalFileName = this.imgList[
                            i - 1
                        ].physicalFileName
                        this.imgFileName = this.imgList[i - 1].fileName
                        return
                    }
                }
            }
        },
        prev1 () {
            this.codeImg = 0
            this.isImg = true
            this.isImg1 = false
            let imgs = document.querySelector('#imgs1')
            imgs.setAttribute('style', '')
            let rotate = this.codeImg * 90
            imgs.style.transform = `rotate(${rotate}deg)`
            for (var i = 0; i < this.imgList1.length; i++) {
                if (
                    this.physicalFileName1 === this.imgList1[i].physicalFileName
                ) {
                    if (i === 0) {
                        this.$message.error('已经是第一张了')
                        return
                    } else {
                        this.physicalFileName1 = this.imgList1[
                            i - 1
                        ].physicalFileName
                        return
                    }
                }
            }
        },
        // 下一张
        next1 () {
            this.codeImg = 0
            this.isImg = true
            this.isImg1 = false
            let imgs = document.querySelector('#imgs1')
            imgs.setAttribute('style', '')
            let rotate = this.codeImg * 90
            imgs.style.transform = `rotate(${rotate}deg)`
            for (var i = 0; i < this.imgList1.length; i++) {
                if (
                    this.physicalFileName1 === this.imgList1[i].physicalFileName
                ) {
                    if (i !== this.imgList1.length - 1) {
                        this.physicalFileName1 = this.imgList1[
                            i + 1
                        ].physicalFileName
                        return
                    } else this.$message.error('已经是最后一张了')
                    return
                }
            }
        },
        // 下一张
        next () {
            this.codeImg = 0
            this.isImg = true
            this.isImg1 = false
            let imgs = document.querySelector('#imgs')
            imgs.setAttribute('style', '')
            let rotate = this.codeImg * 90
            imgs.style.transform = `rotate(${rotate}deg)`
            for (var i = 0; i < this.imgList.length; i++) {
                if (
                    this.physicalFileName === this.imgList[i].physicalFileName
                ) {
                    if (i !== this.imgList.length - 1) {
                        this.physicalFileName = this.imgList[
                            i + 1
                        ].physicalFileName
                        this.imgFileName = this.imgList[i + 1].fileName
                        return
                    } else this.$message.error('已经是最后一张了')
                    return
                }
            }
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
        },
        // 缩小照片
        toSmall () {
            let imgs = document.querySelector('#imgs')
            this.widthImg = imgs.width
            this.heightImg = imgs.height
            if (this.smallWidht >= this.widthImg - 50) {
                this.isImg = true
                this.isImg1 = false
                this.isContent2 = false
                imgs.style.width = this.smallWidht + 'px'
                imgs.style.height = this.smallHeight + 'px'
            } else {
                imgs.style.width = this.widthImg - 50 + 'px'
                imgs.style.height = this.heightImg - 50 + 'px'
            }
        },
        // 旋转照片
        rotateImg () {
            this.isContent2 = true
            let imgs = document.querySelector('#imgs')
            let rotate = this.codeImg * 90
            if (this.codeImg === 1) {
                imgs.style.transform = `rotate(${rotate}deg)`
                this.codeImg++
            } else {
                imgs.style.transform = `rotate(${rotate}deg)`
                this.codeImg++
            }
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
                video.style.marginTop = '0px'
                this.num++
            } else {
                video.style.transform = `rotate(${rotates}deg)`
                video.style.width = this.height
                if (this.num % 2 === 0) {
                    video.style.width = this.width
                    video.style.marginTop = '0px'
                } else {
                    video.style.marginTop = '0px'
                }
                this.num++
            }
        },
        // 下载图片
        dowloadImg () {
            window.open(
                this.item1.filePrefix +
                '?filepath=' +
                this.physicalFileName +
                '&fileName=' +
                this.imgFileName +
                '&dataPath=' +
                this.item1.dataPath
            )
        },
        // 下载视频
        dowLoad () {
            window.open(
                this.item.filePrefix + '?filepath=' + this.item.physicalFileName + '&fileName=' + this.item.fileName + '&dataPath=' + this.item.dataPath
            )
        },
        // 选择框事件
        handleSelectionChange (val) {
            this.ids = []
            val.forEach(v => {
                if (!v.carNo) {
                    // this.$refs.table.clearSelection()
                    // return this.$message.error('请输入车牌号')
                } else {
                    let reg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/
                    if (!reg.test(v.carNo)) {
                        this.$message.error('请输入正确的车牌号')
                        this.$refs.table.toggleRowSelection(v, false)
                        return
                    }
                }
            })
            this.ids = val
        },
        // 车牌号提交
        tocarNo (v) {
            // console.log('v',v);
            let reg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/
            if (v.carNo) {
                // 有值选中
                if (!reg.test(v.carNo)) {
                    this.$message.error('请输入正确的车牌号')
                    this.$refs.table.toggleRowSelection(v, false)
                    return
                }
                this.$refs.table.toggleRowSelection(v, true)
            } else {
                // 无值取消选中
                this.$refs.table.toggleRowSelection(v, false)
            }
        },
        // 弹窗标记合格不合格
        qualified (status) {
            let fileId = this.item.fileId
            let reg = /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$)/
            if (this.carData.carNo) {
                if (!reg.test(this.carData.carNo)) {
                    return this.$message.error('请输入正确的车牌号')
                } else {
                    this.toChange(fileId, status)
                    this.isQualified = false
                }
            } else {
                // return this.$message.error('请输入车牌号')
                this.toChange(fileId, status)
                this.isQualified = false
            }
        },
        // 标记合格不合格
        mark (status) {
            this.status = status
            if (this.ids.length === 0) {
                this.$message.error('请选择！')
                return
            } else {
                this.isShow = true
            }
        },
        // 修改是否合格提交
        toChange (fileId, status) {
            if (fileId && fileId.length > 0) {
                let arrivalVideoDTOS = [
                    {
                        fileId,
                        status,
                        carNo: this.carData.carNo
                    }
                ]
                this.$http('/riskreport/arrivalVideo/checkArrivalVideoStatus', {
                    arrivalVideoDTOS
                }, { type: 'json' })
                    .then(res => {
                        // console.log(res);
                        if (res.code === '200') {
                            this.isDialog = false
                            this.carData.carNo = ''
                            this.$message.success('标记成功')
                            this.getList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            } else {
                let arrivalVideoDTOS = []
                this.ids.forEach(v => {
                    arrivalVideoDTOS.push({
                        fileId: v.fileId,
                        carNo: v.carNo,
                        status: this.status
                    })
                })
                this.$http('/riskreport/arrivalVideo/checkArrivalVideoStatus', {
                    arrivalVideoDTOS
                }, { type: 'json' })
                    .then(res => {
                        // console.log(res);
                        if (res.code === '200') {
                            this.$message.success('标记成功')
                            this.getList()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
            }
        },
        setClss (key) {

            switch (key) {
                case 0:
                    return 'info'
                case 1:
                    return 'success '
                case 2:
                    return 'danger'
                default:
                    break
            }
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
            this.params.status = ''
            this.getList()
        }
    },
    filters: {
        fileStatus (key) {
            switch (key) {
                case 0:
                    return '待审核'
                case 1:
                    return '合格'
                case 2:
                    return '不合格'
                default:
                    break
            }
        }
    }
}
</script>
<style lang="less" >
.dark {
    .we-photo {
        .icon-tongyong-shuomingtishitubiao {
            color: #43a1ac;
            margin-left: 3px;
            font-size: 18px;
        }
        .el-dialog__body {
            overflow: hidden;
            overflow-y: auto;
            height: 70vh;
            // padding: 0 70px 35px 70px;
            padding: 0 0 35px;
            .operation {
                width: 175px;
                height: 35px;
                margin: 0 auto;
                display: flex;
                > div {
                    width: 65px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                img {
                    margin-right: 5px;
                }
                span {
                    height: 35px;
                    line-height: 35px;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.8);
                    font-family: PingFangSC-Light;
                }
            }
            .tc-img1 {
                overflow: auto;
            }
            .tc-img {
                height: calc(~'100% - 35px');
                // width: 1522px;
                margin: 0 auto;
                // overflow: auto;
                .imgs {
                    // width: 800px;
                    max-width: 100%;
                    max-height: 100%;
                    margin: 0 auto;
                }
                .imgs-new {
                    width: 800px;
                }
            }
            #video {
                margin: 0 auto;
            }
        }
        .img-box {
            width: 40%;
            margin-left: 5%;
            position: relative;
            display: flex;
            .let-img {
                width: 100%;
                img {
                    display: block;
                    width: 100%;
                }
            }
            .jiantou {
                margin-left: 20px;
                position: relative;
                div {
                    max-width: 30px;
                    min-width: 30px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    background: #18454a;
                    border: 1px solid #43a1ac;
                    border-radius: 2px;
                    color: #43a1ac;
                    text-align: center;
                    position: absolute;
                    bottom: 100px;
                    &:hover {
                        background: #43a1ac;
                        color: #292b2f;
                    }
                    &:first-child {
                        bottom: 143px;
                    }
                    &:last-child {
                        margin-top: 17px;
                    }
                }
            }
            .songhuo {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.8);
                font-family: PingFangSC-Light;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -49px;
            }
            .biaozhiwu {
                // width: 180px;
                // position: absolute;
                // top: 0;
                // left: 0;
                text-align: left;
                p {
                    font-size: 16px;
                    color: rgba(255, 255, 255, 0.8);
                    font-family: PingFangSC-Light;
                    text-align: left;
                    padding-right: 10px;
                }
            }
        }
    }
}
.light {
    .we-photo {
        .icon-tongyong-shuomingtishitubiao {
            color: #4064d4;
            margin-left: 3px;
            font-size: 18px;
        }
        .el-dialog__body {
            overflow: hidden;
            overflow-y: auto;
            height: 70vh;
            // padding: 0 70px 35px 70px;
            padding: 0 0 35px;
            .operation {
                width: 175px;
                height: 35px;
                margin: 0 auto;
                display: flex;
                > div {
                    width: 65px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                img {
                    margin-right: 5px;
                }
                span {
                    height: 35px;
                    line-height: 35px;
                    font-size: 14px;
                    color: #666;
                }
            }
            .tc-img1 {
                overflow: auto;
            }
            .tc-img {
                height: calc(~'100% - 35px');
                // width: 1522px;
                margin: 0 auto;
                text-align: center;
                // overflow: auto;
                .imgs {
                    // width: 800px;
                    max-width: 100%;
                    max-height: 100%;
                    margin: 0 auto;
                }
                .imgs-new {
                    width: 800px;
                }
            }
            #video {
                margin: 0 auto;
            }
        }
        .img-box {
            width: 40%;
            margin-left: 5%;
            position: relative;
            display: flex;
            .let-img {
                width: 100%;
                img {
                    display: block;
                    width: 100%;
                }
            }
            .jiantou {
                margin-left: 20px;
                position: relative;
                div {
                    max-width: 30px;
                    min-width: 30px;
                    height: 30px;
                    line-height: 30px;
                    cursor: pointer;
                    background: #4064d4;
                    border: 1px solid #4064d4;
                    border-radius: 2px;
                    color: #fff;
                    text-align: center;
                    position: absolute;
                    bottom: 100px;
                    &:hover {
                        background: #4064d4;
                        color: #292b2f;
                    }
                    &:first-child {
                        bottom: 143px;
                    }
                    &:last-child {
                        margin-top: 17px;
                    }
                }
            }
            .songhuo {
                font-size: 14px;
                color: #666;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -49px;
            }
            .biaozhiwu {
                // width: 180px;
                // position: absolute;
                // top: 0;
                // left: 0;
                text-align: left;
                p {
                    font-size: 16px;
                    color: #666;
                    font-family: PingFangSC-Light;
                    text-align: left;
                    padding-right: 10px;
                }
            }
        }
    }
}

.check-status {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
}
.p0 {
    // 待审核
    background: #242d30;
    color: #43a1ac;
}
.p1 {
    // 合格
    background: #2b3536;
    color: #358e62;
}
.p2 {
    // 不合格
    background: #2f2828;
    color: #bb4d31;
}
.add-export {
    margin-top: -8px;
    margin-bottom: 12px;
    color: #366f71;
    padding-left: 15px;
    box-sizing: border-box;
    span {
        display: inline-block;
        width: 28px;
        height: 28px;
        text-align: center;
        line-height: 27px;
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
.photo {
    /deep/ .el-dialog__header {
        padding: 40px 20px 20px 20px;
    }
}

.stat {
    /deep/ .car-no {
        .el-input__inner {
            height: 36px;
            line-height: 36px;
        }
    }
    /deep/ .sbxiuhan {
        thead {
            label.el-checkbox {
                display: none;
            }
        }
    }
    .red-adress {
        color: #f56540;
    }
    .jib-info {
        /deep/ .el-form-item__content {
            width: 340px;
            .el-input__inner {
                padding-right: 10px;
            }
        }
    }

    .hege {
        /deep/ .el-dialog__body {
            height: auto;
            padding: 30px;
        }
    }
    .vide {
        display: block;
        width: 100%;
    }
}
</style>