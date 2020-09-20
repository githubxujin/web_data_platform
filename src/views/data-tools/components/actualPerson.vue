
<template>
    <div id="fullScreen" class="table-wrap">
        <div id="layout" class="layout">
            <div v-if="!emptyFlag" class="d3-tool">
                <!-- <img @click="fullScreen(item.icon)" :title="item.title" :key="i" v-for="(item,i) in btns" :src="require('./img/d3-' +item.icon + '.png')" alt=""> -->
                <i @mouseleave="btnTitle=''" @mousemove="btnTitle=item.title" @click="fullScreen(item.icon)" :title="item.title" :key="i" v-for="(item,i) in btns" :class="item.class" alt="">
                    <span v-show="btnTitle === item.title">{{item.title}}</span>
                </i>
            </div>
            <transition name="slide-fade">
                <div class="info-box" v-if="showInfo && ['equity','relation','holder'].includes(type)">
                    <div class="header">
                        公司信息
                        <i class="el-icon-close" @click="showInfo = !showInfo"></i>
                    </div>
                    <div class="info-title">
                        {{nodeData.name}}
                    </div>
                    <div class="info-item" v-if="type === 'equity'">
                        <li>
                            <span class="left">类型</span>
                            <span class="right">{{nodeData.category || nodeData.econKind || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">出资比例</span>
                            <span class="right">{{nodeData.fundedRatio|| nodeData.percent || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">总出资比例</span>
                            <span class="right">{{nodeData.inParentActualRadio || nodeData.percentTotal || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">持股数</span>
                            <span class="right">{{nodeData.stockRightNum || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">状态</span>
                            <span class="right">{{nodeData.shortStatus || '-'}}</span>
                        </li>
                    </div>
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="info-box" v-show="dialogVisible">
                    <div class="header">
                        公司信息
                        <i class="el-icon-close" @click="dialogVisible = !dialogVisible"></i>
                    </div>
                    <div class="info-item" style="margin-top:20px">
                        <li>
                            <span class="left">企业名称</span>
                            <span class="right">{{infoDetail.customerName || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">统一社会信用代码</span>
                            <span class="right">{{infoDetail.unifiedCreditCode || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">行业类别</span>
                            <span class="right">{{industryType[infoDetail.industryCategory] || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">企业类别</span>
                            <span class="right">{{businessType[infoDetail.businessCategory] || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">名单类型</span>
                            <span class="right">{{listType[infoDetail.listType] || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">跟进人</span>
                            <span class="right">{{infoDetail.followPeople || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">审核状态</span>
                            <span class="right">{{statusType[infoDetail.status] || '-'}}</span>
                        </li>
                        <li>
                            <span class="left">申请原因</span>
                            <span class="right">{{infoDetail.remark || '-'}}</span>
                        </li>
                    </div>
                </div>
            </transition>
            <div id="acturalPerson_tree">
                <not-found v-if="emptyFlag" height="600px"></not-found>
            </div>
            <!-- <el-dialog title="详情" :visible.sync="dialogVisible" width="600px">
                <div class="info-item">
                    <li>
                        <span class="left">企业名称</span>
                        <span class="right">{{infoDetail.customerName || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">统一社会信用代码</span>
                        <span class="right">{{infoDetail.unifiedCreditCode || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">行业类别</span>
                        <span class="right">{{industryType[infoDetail.industryCategory] || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">企业类别</span>
                        <span class="right">{{businessType[infoDetail.businessCategory] || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">名单类型</span>
                        <span class="right">{{listType[infoDetail.listType] || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">跟进人</span>
                        <span class="right">{{infoDetail.followPeople || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">审核状态</span>
                        <span class="right">{{statusType[infoDetail.status] || '-'}}</span>
                    </li>
                    <li>
                        <span class="left">申请原因</span>
                        <span class="right">{{infoDetail.remark || '-'}}</span>
                    </li>
                </div>
            </el-dialog> -->
        </div>
        <div class="model" v-if="dialogVisible || showInfo" @click="dialogVisible = false;showInfo = false"></div>
    </div>
</template>
<script>
let d3 = require('./d3.v3.min.js');
let businessType = { 1: '核心企业', 2: '业主企业' }; //业务类别
let industryType = { 0: '其他', 1: '基建工程', 2: '医药医疗', 3: '能源化工' }; //行业类型
let listType = { 0: '待定名单', 1: '白名单', 2: '黑名单' }; //名单类型
let statusType = { 0: '待审核', 1: '通过', 2: '否决', 3: '退回' }; //状态
let holderMax = 0;
import $ from 'jquery'

let renderNum = function () {
    var num = '';
    for (var i = 0; i < 6; i++) {
        num += Math.floor(Math.random() * 10);
    }
    return num;
}
let treeG;
let _d3Transform = { translate: [0, 0], scale: 1, step: false };// 鼠标偏移缩放数据
let _clickTransform = { translate: [0, 0], scale: 1, step: false }; // 点击偏移缩放数据
let _scaleNum; //记录鼠标操作的scale
export default {
    components: {
        'not-found': () => import("@/components/Charts/not-fount.vue")
    },
    name: 'tree',
    props: {
        formData: {
            type: Object,
            default: function () {
                return {}
            },

        },
        way: {
            type: String,
            default: 'post'
        },
        url: String,
        type: String //类别不同数据处理不同
    },
    data() {
        // let _this = this;
        return {
            flagColor: {},
            color: {
                bg: ['#2B4A4D', '#2D3034'],
                font: '#ccc',
                font2: '#ccc',
                Font2: '#ccc',
                borderColor: '#3A3D41',
                icon: '#232528',
                triangle: '#346A6C',
                lineColor: '#2B4A4D',
                proportion: '#43A1AC',
                iconbg: '#43A1AC',
                controller: 'rgb(111,134,77)',
            },
            Slide: 0,
            self: '',
            screenWidth: document.body.clientWidth,
            arr: [],
            tree: document.getElementById('acturalPerson_tree'),
            response: { upward: { children: [] }, downward: { children: [] } },
            cpData: {},
            nodeData: {},
            showInfo: false,
            dialogVisible: false,
            infoDetail: {},
            businessType,
            industryType,
            listType,
            statusType,
            fullScreenFlag: '',
            btnTitle: '',
            emptyFlag: true,
            btns: [{ icon: 'full', title: '全屏', class: 'icon iconfont icon-zuidahua' }, { icon: 'back', title: '恢复', class: 'icon iconfont icon-zuidahuahuanyuan' }, { icon: 'rest', title: '刷新', class: "el-icon-refresh" }, { icon: 'big', title: '放大', class: "el-icon-zoom-in" }, { icon: 'small', title: '缩小', class: "el-icon-zoom-out" }]
        };
    },
    computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            }
        }
    },
    watch: {
        flag(e) {
            if (e === 'light') {
                this.flagColor = this.$medicine.equity;
            } else {
                this.flagColor = this.color;
            }
            this.getData();
        },
    },
    mounted() {
        if (this.flag === 'light') {
            this.flagColor = this.$medicine.equity;
        } else {
            this.flagColor = this.color;
        }
        var _this = this;
        _this.self = _this;
        var tree = document.getElementById('acturalPerson_tree')
        function resize() { //设置tree的宽度为屏幕的高度 高度为屏幕的宽度
            // let html = document.getElementsByTagName('html')[0];
            let height = document.body.clientHeight - 300 <= 600 ? 600 : document.body.clientHeight - 300;
            tree.style.height = height + "px";
        }
        resize();
        //禁止浏览器body多的部分滚动 若页面内容过长 将不能滑动		
        tree.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, {
            passive: false
        })
    },
    methods: {
        fullScreen(flag) {
            if (flag === 'rest') {
                this.getData();
                return
            }
            if (flag === 'big') {
                this.scale('bigger')
                return
            }
            if (flag === 'small') {
                this.scale('small')
                return
            }
            var tree = document.getElementById('acturalPerson_tree')
            var svg = document.querySelector('#acturalPerson_tree>svg');
            if (flag === 'full') {
                if (this.fullScreenFlag === 'full') return
                var el = document.getElementById("fullScreen");
                document.getElementById('layout').style.width = window.innerWidth - 40 + 'px'
                document.getElementById('layout').style.height = 1000 + 'px'
                // var opts = e.getOption()
                // opts.toolbox[0].feature.myFull.show = false
                // opts.toolbox[0].feature.myRestore.show = true

                // var fullchart = echarts.init(document.getElementById('relation'))
                // fullchart.setOption(opts)

                var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;

                if (rfs) {
                    rfs.call(el);
                    this.fullScreenFlag = 'full'

                    tree.style.height = 1000 + 'px'

                    if (svg) {
                        svg.parentNode.removeChild(svg);
                    }
                    this.drawing(this.flagColor)
                } else if (typeof window.ActiveXObject !== "undefined") {
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript != null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            } else {
                if (this.fullScreenFlag == '') return
                let height = document.body.clientHeight - 300 <= 600 ? 600 : document.body.clientHeight - 300;
                tree.style.height = height + 'px'
                document.getElementById('layout').style.width = 1320 + 'px'
                document.getElementById('layout').style.height = height + 'px'
                this.fullScreenFlag = ''
                if (svg) {
                    svg.parentNode.removeChild(svg);
                }
                this.drawing(this.flagColor)
                if (document.exitFullScreen) {
                    document.exitFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

            }
        },
        scale(type) {
            let width = document.getElementById('acturalPerson_tree').clientWidth;
            let height = document.getElementById('acturalPerson_tree').clientHeight;

            let stepWidth = 0.2 * width / 2
            let stepHeight = 0.2 * height / 2
            let stepXY = [stepWidth, stepHeight]
            let step = 0.2
            var gbox = document.getElementsByClassName('gbox')[0];
            let attrStr = $(gbox).attr('transform');
            let attrs;
            if (attrStr) {
                if (attrStr.includes('scale')) {
                    attrs = attrStr.split('scale')
                } else {
                    attrs = (attrStr + 'scale(' + _scaleNum + ')').split('scale');
                }
            } else {
                attrs = ['(0,0)', '(1)']
            }

            let attrlist = attrs.map(item => {
                return /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(item)[2];
            })

            let scaleK = attrlist[1].split(',')[0]
            let k
            if (type === 'bigger') {
                // 放大
                if (scaleK >= 2) return
                if (step + Number(scaleK) >= 2) {
                    stepXY = [stepWidth * (2 - Number(scaleK)) / 0.2, stepHeight * (2 - Number(scaleK)) / 0.2]
                }
                attrlist[0] = attrlist[0].split(',').map((c, i) => {
                    return Number(c) - stepXY[i]
                })
                k = step + Number(scaleK) >= 2 ? 2 : step + Number(scaleK)
            } else {
                // 缩小
                if (scaleK <= 0.4) return
                if (Number(scaleK) - step <= 0.4) {
                    stepXY = [stepWidth * (Number(scaleK) - 0.4) / 0.2, stepHeight * (Number(scaleK) - 0.4) / 0.2]
                }
                attrlist[0] = attrlist[0].split(',').map((c, i) => {
                    return Number(c) + stepXY[i]
                })
                k = Number(scaleK) - step <= 0.4 ? 0.4 : Number(scaleK) - step
            }

            _clickTransform.translate = attrlist[0]
            _clickTransform.scale = k;
            _clickTransform.step = true;
            _d3Transform.step = false;

            treeG.transition()
                .duration(750)
                .attr("transform", "translate(" + attrlist[0].join(',') + ") scale(" + k + ")")

            return;

        },
        rest() {
            // 重新渲染&清除旧数据
            var svg = document.querySelector('#acturalPerson_tree>svg');
            if (svg) {
                this.response = { upward: { children: [] }, downward: { children: [] } }
                svg.parentNode.removeChild(svg);
                this.cpData = {}
            }
        },
        getData(param = null, cb) {
            let postData = { ...this.formData }
            if (this.type === 'equity') {
                Object.keys(postData).forEach(k => {
                    if (['upFundedSymbol', 'upFundedRatio', 'downFundedSymbol', 'downFundedRatio'].some(o => o === k)) {
                        delete postData[k]
                    }
                })
            }
            if (!param) {
                // 重新渲染&清除旧数据
                var svg = document.querySelector('#acturalPerson_tree>svg');
                if (svg) {
                    this.response = { upward: { children: [] }, downward: { children: [] } }
                    svg.parentNode.removeChild(svg);
                    this.cpData = {}
                }
            }
            if (param) {
                postData.companyName = param.name
                if (this.type === 'cscec') {
                    postData.parentId = param.id;
                }
            }
            this.$http(
                this.url,
                { ...postData },
                { type: this.way }
            ).then(res => {
                // let res = { "code": "200", "message": "", "meta": "", "data": { "equityThroughVos": { "name": "中建八局第三建设有限公司", "count": "1", "children": [{ "name": "中国建筑第八工程局有限公司", "category": "公司", "fundedRatio": "100%", "inParentActualRadio": "100%", "count": "1", "grade": "1", "shouldCapi": "100000万元", "stockRightNum": "", "shortStatus": "存续", "children": [{ "name": "中国建筑股份有限公司", "category": "公司", "fundedRatio": "100%", "inParentActualRadio": "100%", "count": "10", "grade": "2", "shouldCapi": "950000万元", "stockRightNum": "", "shortStatus": "在业", "children": [{ "name": "中国建筑集团有限公司", "category": "公司", "fundedRatio": "56.3%", "inParentActualRadio": "56.3%", "count": "1", "grade": "3", "shouldCapi": "", "stockRightNum": "23,630,695,997", "shortStatus": "在业", "children": [{ "name": "国务院国有资产监督管理委员会", "category": "政府机构和学校", "fundedRatio": "100%", "inParentActualRadio": "56.3%", "count": "0", "grade": "4", "shouldCapi": "1000000万元", "stockRightNum": "", "shortStatus": "", "children": [] }] }, { "name": "安邦人寿保险股份有限公司-保守型投资组合", "category": "无法判断人或公司", "fundedRatio": "7.02%", "inParentActualRadio": "7.02%", "count": "0", "grade": "3", "shouldCapi": "", "stockRightNum": "2,946,174,665", "shortStatus": "", "children": [] }, { "name": "中国证券金融股份有限公司", "category": "公司", "fundedRatio": "3%", "inParentActualRadio": "3%", "count": "3", "grade": "3", "shouldCapi": "", "stockRightNum": "1,258,300,998", "shortStatus": "在业", "children": [{ "name": "上海证券交易所", "category": "政府机构和学校", "fundedRatio": "38.7597%", "inParentActualRadio": "1.1628%", "count": "0", "grade": "4", "shouldCapi": "500000万元", "stockRightNum": "", "shortStatus": "", "children": [] }, { "name": "深圳证券交易所", "category": "政府机构和学校", "fundedRatio": "38.7597%", "inParentActualRadio": "1.1628%", "count": "0", "grade": "4", "shouldCapi": "500000万元", "stockRightNum": "", "shortStatus": "", "children": [] }, { "name": "中国证券登记结算有限责任公司", "category": "公司", "fundedRatio": "22.4806%", "inParentActualRadio": "0.6744%", "count": "0", "grade": "4", "shouldCapi": "290000万元", "stockRightNum": "", "shortStatus": "在业", "children": [] }] }, { "name": "香港中央结算有限公司", "category": "香港公司", "fundedRatio": "2.89%", "inParentActualRadio": "2.89%", "count": "1", "grade": "3", "shouldCapi": "", "stockRightNum": "1,213,092,224", "shortStatus": "仍注册", "children": [{ "name": "香港交易及結算所有限公司", "category": "香港公司", "fundedRatio": "100%", "inParentActualRadio": "2.89%", "count": "0", "grade": "4", "shouldCapi": "4HKD", "stockRightNum": "", "shortStatus": "仍注册", "children": [] }] }, { "name": "中央汇金资产管理有限责任公司", "category": "公司", "fundedRatio": "1.42%", "inParentActualRadio": "1.42%", "count": "1", "grade": "3", "shouldCapi": "", "stockRightNum": "596,022,420", "shortStatus": "在业", "children": [{ "name": "中央汇金投资有限责任公司", "category": "公司", "fundedRatio": "100%", "inParentActualRadio": "1.42%", "count": "0", "grade": "4", "shouldCapi": "500000万元", "stockRightNum": "", "shortStatus": "在业", "children": [] }] }, { "name": "GIC PRIVATE LIMITED", "category": "政府机构和学校", "fundedRatio": "0.69%", "inParentActualRadio": "0.69%", "count": "0", "grade": "3", "shouldCapi": "", "stockRightNum": "287,864,145", "shortStatus": "", "children": [] }, { "name": "交通银行-易方达50指数证券投资基金", "category": "政府机构和学校", "fundedRatio": "0.4%", "inParentActualRadio": "0.4%", "count": "0", "grade": "3", "shouldCapi": "", "stockRightNum": "169,642,126", "shortStatus": "", "children": [] }, { "name": "中国工商银行-上证50交易型开放式指数证券投资基金", "category": "政府机构和学校", "fundedRatio": "0.4%", "inParentActualRadio": "0.4%", "count": "0", "grade": "3", "shouldCapi": "", "stockRightNum": "169,370,292", "shortStatus": "", "children": [] }, { "name": "招商银行股份有限公司-博时中证央企创新驱动交易型开放式指数证券投资基金", "category": "公司", "fundedRatio": "0.19%", "inParentActualRadio": "0.19%", "count": "10", "grade": "3", "shouldCapi": "", "stockRightNum": "80,997,708", "shortStatus": "存续", "children": [{ "name": "香港中央结算（代理人）有限公司", "category": "香港公司", "fundedRatio": "18.06%", "inParentActualRadio": "0.0343%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "4,554,164,930", "shortStatus": "仍注册", "children": [] }, { "name": "招商局轮船有限公司", "category": "公司", "fundedRatio": "13.04%", "inParentActualRadio": "0.0248%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "3,289,470,337", "shortStatus": "在业", "children": [] }, { "name": "中国远洋运输有限公司", "category": "公司", "fundedRatio": "6.24%", "inParentActualRadio": "0.0119%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "1,574,729,111", "shortStatus": "在业", "children": [] }, { "name": "和谐健康保险股份有限公司-传统-普通保险产品", "category": "无法判断人或公司", "fundedRatio": "4.99%", "inParentActualRadio": "0.0095%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "1,258,949,171", "shortStatus": "", "children": [] }, { "name": "安邦人寿保险股份有限公司-保守型投资组合", "category": "无法判断人或公司", "fundedRatio": "4.99%", "inParentActualRadio": "0.0095%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "1,258,949,100", "shortStatus": "", "children": [] }, { "name": "深圳市晏清投资发展有限公司", "category": "公司", "fundedRatio": "4.99%", "inParentActualRadio": "0.0095%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "1,258,542,349", "shortStatus": "存续", "children": [] }, { "name": "深圳市招融投资控股有限公司", "category": "公司", "fundedRatio": "4.55%", "inParentActualRadio": "0.0086%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "1,147,377,415", "shortStatus": "存续", "children": [] }, { "name": "深圳市楚源投资发展有限公司", "category": "公司", "fundedRatio": "3.74%", "inParentActualRadio": "0.0071%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "944,013,171", "shortStatus": "存续", "children": [] }, { "name": "香港中央结算有限公司", "category": "香港公司", "fundedRatio": "3.57%", "inParentActualRadio": "0.0068%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "900,613,558", "shortStatus": "仍注册", "children": [] }, { "name": "中国证券金融股份有限公司", "category": "公司", "fundedRatio": "2.99%", "inParentActualRadio": "0.0057%", "count": "0", "grade": "4", "shouldCapi": "", "stockRightNum": "754,798,622", "shortStatus": "在业", "children": [] }] }, { "name": "中国工商银行股份有限公司-华泰柏瑞沪深300交易型开放式指数证券投资基金", "category": "无法判断人或公司", "fundedRatio": "0.16%", "inParentActualRadio": "0.16%", "count": "0", "grade": "3", "shouldCapi": "", "stockRightNum": "67,187,745", "shortStatus": "", "children": [] }] }] }] }, "holdingCompanyVos": { "children": [{ "id": 1, "parentId": 0, "name": "蚌埠捌叁建筑工程有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "存续", "econKind": "有限责任公司（非自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 2, "parentId": 0, "name": "马鞍山中建宁鞍建设工程有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司（非自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 3, "parentId": 0, "name": "安徽捌叁建设有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司（自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 4, "parentId": 0, "name": "温州中宁建筑工程有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司（自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 5, "parentId": 0, "name": "上海万茂房地产公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "全民所有制", "childNode": [{ "id": 7, "parentId": 5, "name": "上海万盛机械设备租赁有限公司", "percent": "60%", "percentTotal": "60%", "shortStatus": "", "econKind": "", "childNode": [], "Level": "2" }], "Level": "1" }, { "id": 8, "parentId": 0, "name": "上海万盛机械设备租赁有限公司", "percent": "40%", "percentTotal": "40%", "shortStatus": "注销", "econKind": "有限责任公司（国有控股）", "childNode": [], "Level": "1" }, { "id": 9, "parentId": 0, "name": "南京中建超越建筑劳务有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司（非自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 10, "parentId": 0, "name": "中建八局第三建设有限公司合肥分公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司分公司(自然人投资或控股的法人独资)", "childNode": [], "Level": "1" }, { "id": 11, "parentId": 0, "name": "张家港保税区八三建筑工程公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "吊销", "econKind": "全民所有制", "childNode": [], "Level": "1" }, { "id": 12, "parentId": 0, "name": "江苏宏马市政工程有限公司", "percent": "100%", "percentTotal": "100%", "shortStatus": "注销", "econKind": "有限责任公司（非自然人投资或控股的法人独资）", "childNode": [], "Level": "1" }, { "id": 13, "parentId": 0, "name": "上海华鑫水泥转运有限公司", "percent": "71.4%", "percentTotal": "71.4%", "shortStatus": "注销", "econKind": "有限责任公司（国有控股）", "childNode": [], "Level": "1" }] } } }
                if (res.code === '200') {
                    // 成功
                    if (cb) cb(res)
                    else {
                        if (this.type === 'cscec') {
                            // 组织架构处理数据
                            // 中国建筑股份有限公司为最顶层，需增加板块层级
                            let typeList = ['建筑工程', '电子商务', '基础设施', '设计勘察', '房地产', '国际工程', '其他'];
                            let typeDataList
                            if (res.data.length) {
                                let downs = res.data;
                                let list;
                                if (postData.companyName === '中国建筑股份有限公司') {
                                    typeDataList = typeList.map((k, i) => {
                                        return {
                                            corptag: [],
                                            corpid: i,
                                            name: k,
                                            type: 'plate',
                                            cscec: k,
                                            number: 1,
                                            children: []
                                        }
                                    })
                                    list = typeList.map(k => {
                                        return downs.filter(down => down.plate === k).map(o => {
                                            return {
                                                ...o,
                                                _id: o.id,
                                                id: o.id + o.name,
                                                corptag: [],
                                                corpid: o.id + o.name,
                                                _name: o.companyName,
                                                name: o.companyName,
                                                number: o.childNum,
                                                whiteList: o.whiteList
                                            }
                                        })
                                    })
                                    downs = typeDataList.map((o, i) => {
                                        return {
                                            ...o,
                                            number: list[i].length,
                                            children: list[i]
                                        }
                                    })
                                } else {
                                    downs = downs.map(o => {
                                        return {
                                            ...o,
                                            corptag: [],
                                            corpid: o.id,
                                            _name: o.companyName,
                                            name: o.companyName,
                                            number: o.childNum,
                                            whiteList: o.whiteList
                                        }
                                    })
                                }
                                this.response.downward = {
                                    "grade": "origin",
                                    "name": downs.length ? this.formData.companyName : '',
                                    "corptag": [],
                                    "direction": "downward",
                                    "children": downs
                                }
                                this.response.upward = {
                                    "grade": "origin",
                                    "name": '',
                                    "corptag": [],
                                    "direction": "upward",
                                    "children": []
                                }
                                // this.$emit('update:type', 'holder')
                                // this.type = 'holder'
                            }
                        } else if (this.type === 'relation') {
                            // 账户关系图
                            // let time = 0;

                            let restData = function (obj) {
                                let children = [];
                                // let str = ''
                                if (obj.childNodes.length) {
                                    children = obj.childNodes.map(o => {
                                        return restData(o);
                                    })
                                }
                                // if (obj.account) str += `(${obj.account})`
                                // if (obj.whiteList) str += `(${obj.whiteList})`
                                return {
                                    ...obj,
                                    "corptag": [],
                                    children,
                                    _name: obj.name,
                                    name: obj.name,
                                    _id: obj.id,
                                    id: obj.id + renderNum(),
                                    number: children.length,
                                    type: 'relation',
                                    "direction": "upward",
                                }
                            }
                            let listData = res.data.nodeVos;
                            if (listData.length) {
                                if (listData.length === 1) {
                                    let orginName = listData[0].name;
                                    let downs = listData[0].childNodes;
                                    downs = restData(listData[0])
                                    this.response.downward = {
                                        "grade": "origin",
                                        "name": orginName,
                                        "corptag": [],
                                        "direction": "downward",
                                        "children": downs.children
                                    }
                                    this.response.upward = {
                                        "grade": "origin",
                                        "name": orginName,
                                        "corptag": [],
                                        "direction": "upward",
                                        "children": []
                                    }
                                } else {
                                    let downs = listData.map(o => {
                                        return restData(o);
                                    })
                                    this.response.downward = {
                                        "grade": "origin",
                                        "name": '全部',
                                        "corptag": [],
                                        "direction": "downward",
                                        "children": downs
                                    }
                                    this.response.upward = {
                                        "grade": "origin",
                                        "name": '全部',
                                        "corptag": [],
                                        "direction": "upward",
                                        "children": []
                                    }
                                }
                            } else {
                                this.response.downward = {
                                    "grade": "origin",
                                    "name": '',
                                    "corptag": [],
                                    "direction": "downward",
                                    "children": []
                                }
                                this.response.upward = {
                                    "grade": "origin",
                                    "name": '',
                                    "corptag": [],
                                    "direction": "upward",
                                    "children": []
                                }
                            }
                        }
                        else if (this.type === 'holder') {
                            let respData = res.data.controllerData.paths || [];
                            let controller = res.data.controllerData;
                            let name = res.data.companyName || '';
                            let list = [];
                            holderMax = Math.max.apply(null, respData.map(o => o ? o.length : 0))
                            respData.forEach(o => {
                                let flagO = o.find(obj => obj.name === controller.name);
                                if (flagO) {
                                    o.push({ ...flagO, name: '实际控制人', id: renderNum(), controllerFlag: true, percent: flagO.percentTotal })
                                }
                                let data = o.reduceRight((p, c) => {
                                    if (!p.name) {
                                        return {
                                            ...c,
                                            controllerFlag: c.controllerFlag || false,
                                            proportion: c.percent || '',
                                            corptag: [],
                                            number: 0,
                                            children: [],
                                        }
                                    } else {
                                        return {
                                            ...c,
                                            controllerFlag: c.controllerFlag || false,
                                            proportion: c.percent || '',
                                            corptag: [],
                                            number: 0,
                                            children: [{ ...p }],
                                        }
                                    }
                                }, {})
                                list.push(data)
                            })

                            let mergePath = (list) => {
                                let arr = []

                                for (let i = 0; i < list.length - 1; i++) {
                                    if (list[i].name === list[i + 1].name && list[i].percent === list[i + 1].percent) {
                                        list[0].children.push(...list[i + 1].children)
                                        arr.push(i + 1)
                                    }

                                }
                                arr.map((i, index) => {
                                    if (index === 0) {
                                        list.splice(i, 1)

                                    } else {
                                        list.splice(i - index, 1)
                                    }

                                })
                            }
                            mergePath(list)
                            mergePath(list[0].children)
                            mergePath(list[0].children[0].children)


                            this.response.downward = {
                                "grade": "origin",
                                "name": name,
                                "corptag": [],
                                "direction": "downward",
                                "children": []
                            }
                            this.response.upward = {
                                "grade": "origin",
                                "name": name,
                                "corptag": [],
                                "direction": "upward",
                                "children": list
                            }
                        } else {

                            // 向上穿透
                            let ups = res.data.equityThroughVos.children || [];
                            let downs = res.data.holdingCompanyVos.children || []
                            if (!ups.length && !downs.length) {
                                throw new Error('暂无数据!');
                                return
                            }
                            //         upFundedRatio: '',
                            // upFundedSymbol: '',
                            // downFundedSymbol: '',
                            // downFundedRatio: '',
                            let { upFundedSymbol, upFundedRatio, downFundedSymbol, downFundedRatio } = this.formData;
                            let checkUp = false
                            if (upFundedSymbol && upFundedRatio) {
                                // 向上穿透
                                checkUp = true;
                            }

                            let checkDown = false
                            if (downFundedSymbol && downFundedRatio) {
                                // 向下穿透
                                checkDown = true
                            }
                            let name = res.data.equityThroughVos.name;
                            this.response.upward = {
                                "grade": "origin",
                                "name": name,
                                "corptag": [],
                                "direction": "upward",
                                "children": ups.map(o => {
                                    return {
                                        ...o,
                                        corptag: [],
                                        corpid: o.id,
                                        proportion: o.fundedRatio || '',
                                        // name: o.corporateName,
                                        symbioFlag: checkUp ? eval(o.fundedRatio.substr(0, o.fundedRatio.length - 1) + upFundedSymbol + upFundedRatio) : false, //穿透比例是否命中
                                        amount: o.shouldCapi,
                                        number: (o.count && o.count != '0') ? 1 : 0
                                    }
                                })
                            }
                            let restData = function (obj) {
                                let children = [];
                                if (obj.childNode) {
                                    children = obj.childNode.map(o => {
                                        return restData(o);
                                    })
                                }
                                return {
                                    ...obj,
                                    "corptag": [],
                                    children,
                                    name: obj.name + (obj.whiteList ? `(${obj.whiteList})` : ''),
                                    _id: obj.id,
                                    id: obj.id + renderNum(),
                                    symbioFlag: checkDown ? eval(obj.percentTotal.substr(0, obj.percentTotal.length - 1) + downFundedSymbol + downFundedRatio) : false, //穿透比例是否命中
                                    number: children.length,
                                    type: 'relation',
                                    "direction": "upward",
                                }
                            }

                            downs = downs.map(o => {
                                return restData(o);
                            })

                            this.response.downward = {
                                "grade": "origin",
                                "name": name,
                                "corptag": [],
                                "direction": "downward",
                                "children": downs.map(o => {
                                    // let children = [...o.children];
                                    // children.pop()
                                    return {
                                        ...o,
                                        corptag: [],
                                        corpid: o.id,
                                        proportion: o.fundedRatio || o.percent || '',
                                        // symbioFlag: checkDown ? eval(o.percentTotal.substr(0, o.percentTotal.length - 1) + downFundedSymbol + downFundedRatio) : false, //穿透比例是否命中
                                        amount: o.registCapi,
                                    }
                                })
                            }
                        }
                        this.emptyFlag = !this.response.downward.children.length && !this.response.upward.children.length ? true : false
                        this.drawing(this.flagColor)
                    }

                }
            })
        },

        downloadfun() { //canvas图片转img下载功能
            // 				//获取svg内容
            // var _this = this;
            var html = document.getElementsByTagName('html')[0]; //获取可视区域宽

            var Bwidth = html.clientWidth;//转换屏幕宽高
            var Bheight = html.clientHeight;
            var Bmax = Bwidth > Bheight ? Bwidth : Bheight;
            var Bmin = Bwidth > Bheight ? Bheight : Bwidth;

            var canvas = document.createElement("canvas");
            var g = document.getElementsByTagName('g')[0].getBBox()
            var svgbox = $('#acturalPerson_tree svg')
            var gbox = document.getElementsByClassName('gbox')[0];
            var x = (g.width / 2 - html.clientWidth / 2) //计算偏移位置
            var y = 0;
            g.y < 0 ? y = Math.abs(g.y) : y = 0;
            if (['cscec', 'relation'].includes(this.type)) y = -30;
            // gbox.style.transform = "translate(" + x + 'px' + "," + (y-60) + "px" + ")  scale(1)"; //偏移位置
            gbox.style.transform = "translate(" + x + 'px' + "," + y + "px" + ")  scale(1)"; //偏移位置
            svgbox.attr('width', g.width)
            svgbox.attr('height', g.height)
            var svg = document.getElementById('acturalPerson_tree').innerHTML;
            var c = canvas.getContext('2d');
            //新建Image对象
            var img = new Image();
            //svg内容
            img.src = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg)); //svg内容中可以有中文字符
            img.src = 'data:image/svg+xml,' + svg; //svg内容中不能有中文字符
            //图片初始化完成后调用
            var cwidth = g.width;
            var imgfile = null;
            img.onload = function () {
                //将canvas的宽高设置为图像的宽高
                canvas.width = cwidth;
                canvas.height = g.height + 60;

                //canvcas画图片
                c.fillStyle = "#fff";
                c.fillRect(0, 0, canvas.width, canvas.height);
                c.drawImage(img, 0, 30);
                var a = document.createElement("a");
                a.download = "fallback";
                a.herf = canvas.toDataURL("image/png");
                imgfile = a.herf
                if (imgfile.length < 100) {
                    alert('图大')
                } else {
                    // _this.$http.post(_this.BASEURL + '/profund/mail/file', JSON.stringify({
                    //     'image': imgfile
                    // })).then(res => {
                    //     console.log(res)
                    // }).catch(res => {

                    // })
                }

            }
            //图片转换为base64后 传给后端 发邮件

            gbox.style.transform = ''
            svgbox.attr('width', Bmax)
            svgbox.attr('height', Bmin)
        },
        drawing(color) {
            var treeData = {};
            var _obj = {};
            var rootName = ''; //根节点的名字
            // var selfthis = this.self;
            // var ajaxurl = this.BASEURL //请求地址
            // var corpid = this.proCorpid;
            var rootRectWidth = 0; //根节点rect的宽度
            // var downwardLength = 0,
            //     upwardLength = 0;
            var tree = document.getElementById('acturalPerson_tree')
            // var Slidenum = this.Slide
            var treeChart = function (d3Object) {
                this.d3 = d3Object;
                this.directions = ['upward', 'downward'];
            };
            let _self = this;
            treeChart.prototype.drawChart = function () {
                // var newTree = {}
                let self = this;

                treeData = JSON.parse(JSON.stringify(_self.response))
                // treeData = JSON.parse(JSON.stringify(data))
                rootName = treeData.downward.name; //获取根节点名称
                rootRectWidth = rootName.length * 16; //设置第一个节点的宽度
                //获得upward第一级节点的个数
                // upwardLength = res.data.upward.children.length;
                //获得downward第一级节点的个数
                // downwardLength = res.data.downward.children.length;
                self.graphTree(self.getTreeConfig());

                //     } else if (res.status === 'error' && res.error === 10328) {
                //         alert('暂无数据')
                //         history.go(-1)

                //     }
                // });
            };

            treeChart.prototype.getTreeConfig = function () {
                var treeConfig = {
                    'margin': {
                        'top': 10,
                        'right': 5,
                        'bottom': 0,
                        'left': 30
                    }
                }

                treeConfig.chartWidth = tree.clientWidth;
                treeConfig.chartHeight = tree.clientHeight;
                treeConfig.centralHeight = treeConfig.chartHeight / 2;
                treeConfig.centralWidth = treeConfig.chartWidth / 2;
                treeConfig.linkLength = 150;
                if (_self.type === 'holder') treeConfig.linkLength = 100;
                treeConfig.duration = 0; //动画时间
                return treeConfig;
            };

            treeChart.prototype.graphTree = function (config) {
                // var self = this;
                var d3 = this.d3;
                var linkLength = config.linkLength;
                var duration = config.duration;
                var hasChildNodeArr = [];
                var id = 0;

                var diagonal = function (obj) { //折线
                    var s = obj.source;
                    var t = obj.target;
                    return "M" + (s.x) + "," + s.y + "L" + s.x + "," + (s.y + (t.y - s.y) / 2) + "L" + t.x + "," +
                        (s.y + (t.y - s.y) / 2) + "L" + (t.x) + "," + t.y;
                }
                var zoom = d3.behavior.zoom().scaleExtent([0.4, 2]).on('zoom', redraw) //缩放
                // var zoom = d3.behavior.zoom().translate([200, 200]).scale([1.2]).scaleExtent([0.4, 2]).on('zoom', redraw) //缩放

                var svg = d3.select('#acturalPerson_tree') //定义svg大小
                    .append('svg')
                    .attr("class", "linkG")
                    .attr('xmlns', 'http://www.w3.org/2000/svg')
                    .attr('width', config.chartWidth + config.margin.right + config.margin.left)
                    // .attr('width',3200)
                    .attr('height', config.chartHeight + config.margin.top + config.margin.bottom)
                    .on('mousedown', disableRightClick)
                    .call(zoom)
                    .on('dblclick.zoom', null)
                    .on('doubleTap.zoom', null);

                // 					var treeG = svg.append('g') //添加g元素
                // 						.attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');
                var y = 0;
                if (['cscec', 'relation'].includes(_self.type)) {
                    if (_self.formData.companyName === '中国建筑股份有限公司') {
                        y = -180
                    } else {
                        y = -100;
                    }
                }
                if (_self.type === 'holder') y = (holderMax + 1) * 40 >= 250 ? 250 : (holderMax + 1) * 40;
                treeG = svg.append('g') //添加g元素
                    .attr('class', 'gbox')
                    .attr('transform', 'translate(' + 0 + ',' + y + ') scale(1)');
                // treeG.transition()
                //     .duration(750)
                //     .attr('transform', 'translate(' + 0 + ',' + y + ') scale(0.5)');
                // setTimeout(() => {
                //     treeG.transition()
                //         .duration(750)
                //         .attr('transform', 'translate(' + 0 + ',' + y + ') scale(1)');
                // }, 1000)

                //初始化树节点并更新图表。
                for (var d = 0; d < this.directions.length; d++) {
                    var direction = this.directions[d];
                    var data = treeData[direction];

                    data.x0 = config.centralWidth;
                    data.y0 = config.centralHeight;
                    if (_self.type !== 'holder') {
                        if (_self.type === 'cscec') {
                            if (_self.formData.companyName === '中国建筑股份有限公司' && direction === 'downward') {
                                data.children = data.children.map(child => {
                                    if (child.type === "plate" && child.name !== "建筑工程") {
                                        return collapse(child)
                                    } else {
                                        child.isOpen = true;
                                        return child
                                    }

                                })
                            }
                        } else {
                            data.children.forEach(collapse);
                        }
                    }
                    update(data, data, treeG);
                }

                function update(source, originalData, g) {
                    var direction = originalData['direction'];
                    var forUpward = direction == 'upward';
                    var node_class = direction + 'Node';
                    var link_class = direction + 'Link';
                    var downwardSign = (forUpward) ? -1 : 1; //上下树
                    // var nodeColor = (forUpward) ? '#37592b' : '#8b4513';

                    // var statusUp = true;
                    // var statusDown = true;
                    var nodeSpace = 140;
                    // if (['cscec', 'relation'].includes(_self.type)) nodeSpace = 320;
                    if (['holder'].includes(_self.type)) nodeSpace = 220;
                    var tree = d3.layout.tree().sort(sortByDate).nodeSize([nodeSpace, 10]);
                    var nodes = tree.nodes(originalData);
                    var links = tree.links(nodes);
                    var offsetX = -config.centralWidth;


                    //过滤调不展示的类型  开始 1-风险P2P关联方
                    // //（'类型字典: ; 2-科创板;3-香港企业;4-上市公司; 
                    // 5-事业单位;6-保险公司;7-央企控股;8-国企控股;10-新三板;  12-P2P公司 ...待填写',） 


                    // nodes.forEach(i => { //遍历所有数据
                    //     i.corptag = i.corptag.filter(item => { //找出数组中要展示的类型其他都过滤掉    返回到原本数组
                    //         return item == '2' || item == '3' || item == '4' || item == '5' || item == '6' || item == '7' || item ==
                    //             '8' || item == '10' || item == '12'
                    //     })
                    // })
                    //过滤调不展示的类型 开始


                    nodes.forEach(function (d) {
                        d.y = downwardSign * (d.depth * linkLength) + config.centralHeight;
                        d.x = d.x - offsetX;
                        if (d.grade == 'origin') {
                            d.x = config.centralWidth;
                            d.y += downwardSign * 0; // 上下两树图根节点之间的距离
                        }
                    });

                    // Update the node.
                    var node = g.selectAll('g.' + node_class)
                        .data(nodes, function (d) {
                            return d.id || (d.id = ++id);
                        });

                    var nodeEnter = node.enter().append('g')
                        .attr('class', function (d) {
                            if (d.grade == 'origin' && _self.type == 'relation' && d.name === '全部') {
                                return 'displaynone'
                            }
                            return node_class
                        })
                        .attr('id', function (d) { //给g元素添加id属性
                            return 'g' + d.corpid
                        })
                        .attr('transform', function (d) {
                            return 'translate(' + source.x0 + ',' + source.y0 + ')';
                        })
                        .style('cursor', function (d) {
                            return (d.grade == 'origin') ? '' : (d.children || d._children) ? 'pointer' : '';
                        })

                    // 添加科创等标签开始  
                    // 条件 1 标签两字  2标签自身不能折行 多个标签要换换行 
                    // 		// 
                    // 							nodes.map(item => {
                    // 								return	item.corptag = [7,3,6,12]
                    // 							}) 
                    // 测试时候添加的假数据

                    //动态添加节点
                    d3.selectAll('g').attr('ces', function (d) {

                        if (d && d.corpid) { //判断有corpid的节点
                            let newId = '#g' + d.corpid
                            let arr = d.corptag
                            let glist = d3.select(newId)

                            //因tree形会绘制两次 
                            //声明的全局遍历 判断之前是否同id添加过 如果是false就添加 添加完以后改为true 二次渲染不会再进来
                            if (!_obj[d.corpid]) {
                                _obj[d.corpid] = true;
                                setTimeout(() => {
                                    for (let i = 0; i < arr.length; i++) { //根据数据量去添加对于元素
                                        glist.append('rect')
                                            .attr('class', 'itembox')
                                            .attr('width', 26)
                                            .attr('height', 12)
                                            .style('fill', colorget(arr[i])) //动态设置颜色
                                            .style('x', getX(i)) //动态设置x
                                            .style('y', getY(i, forUpward, arr)) //动态设置Y
                                            .attr('rx', 2)

                                        glist.append('text')
                                            .attr('x', arr[i] == 10 ? getX(i) + 1.5 : getX(i) + 5)
                                            .attr('y', getY(i, forUpward, arr) + 9)
                                            .text(getName(arr[i]))
                                            .style('font-size', '7')
                                            .style('fill', textColor(arr[i]))
                                            .style('letter-spacing', '1px')
                                    }
                                })
                            }

                        }
                    })

                    //（'类型标签: 1-风险P2P关联方 ; 2-科创板;3-香港企业;4-上市公司; 
                    // 5-事业单位;6-保险公司;7-央企控股;8-国企控股;10-新三板;...待填写',） 
                    //标签方法
                    function textColor(num) { //标签文字色号
                        num = Number.parseInt(num)
                        var a = ''
                        switch (num) {
                            case 2:
                                a = '#2954A3' //科创
                                break
                            case 3:
                                a = '#F26A3A' //香港
                                break
                            case 4:
                                a = '#5AA9DE' //上市
                                break
                            case 5:
                                a = '#88B764' //事业
                                break
                            case 6:
                                a = '#815BDE' //保险
                                break
                            case 7:
                                a = '#33DA9F' //央企
                                break
                            case 8:
                                a = '#F0B822' //国企
                                break
                            case 10:
                                a = '#F022A2' //新三板
                                break
                            case 12:
                                a = '#AA2929'//p2p
                        }
                        return a
                    }

                    function getName(num) { //标签文本名字
                        num = Number.parseInt(num)
                        var a = ''
                        switch (num) {
                            case 2:
                                a = '科创' //科创
                                break
                            case 3:
                                a = '香港' //香港
                                break
                            case 4:
                                a = '上市' //上市
                                break
                            case 5:
                                a = '事业' //事业
                                break
                            case 6:
                                a = '保险' //保险
                                break
                            case 7:
                                a = '央企' //央企
                                break
                            case 8:
                                a = '国企' //国企
                                break
                            case 10:
                                a = '新三板' //新三板
                                break
                            case 12:
                                a = 'P2P'
                        }
                        return a
                    }

                    function getY(i, forUpward, listlength) { // 数组下标 方向 以及数组
                        let num = 0;
                        let a = 0;
                        if (listlength) {
                            a = listlength.length //获取长度
                        } else {
                            a = 0
                        }

                        if (forUpward) { //上
                            if (i < 4) {
                                num = -15
                            } else {
                                num = 0
                            }
                        } else { //下 
                            if (a > 4) { //down时候 长度小于4的时候全部-30位置的y
                                if (i < 4) { //大于4的时候
                                    num = -45
                                } else {
                                    num = -30
                                }
                            } else {
                                num = -30
                            }
                        }
                        return num
                    }

                    function getX(i) { //X位置
                        if (i == 0 || i == 4) {
                            i = -58
                        } else if (i == 1 || i == 5) {
                            i = -28
                        } else if (i == 2 || i == 6) {
                            i = 2
                        } else if (i == 3 || i == 7) {
                            i = 32
                        }

                        return i
                    }

                    function colorget(num) { //颜色库
                        num = Number.parseInt(num)
                        var a = ''
                        switch (num) {
                            case 2:
                                a = '#E9F3FF' //科创
                                break
                            case 3:
                                a = '#FEECE6' //香港
                                break
                            case 4:
                                a = '#DCF3FF' //上市
                                break
                            case 5:
                                a = '#EBFFDC' //事业
                                break
                            case 6:
                                a = '#EBE2FF' //保险
                                break
                            case 7:
                                a = '#D6FFF1' //央企
                                break
                            case 8:
                                a = '#FFF2CC' //国企
                                break
                            case 10:
                                a = '#FFD9F1' //新三板
                                break
                            case 12:
                                a = '#FFC4C4' //p2p
                        }
                        return a
                    }
                    // 添加标签结束
                    function addHeight(d) { //添加位置距离整数
                        if (d.account && d.whiteList) {
                            return 10
                        }
                        if (d.corptag.length > 0 && d.corptag.length <= 4) {
                            return 15
                        } else if (d.corptag.length > 4) {
                            return 30
                        } else {
                            return 0
                        }

                    }

                    function deviation(d) { //矩形以及元素domn方向y轴改变
                        let num = 0;
                        if (forUpward) {
                            num = 0;
                        } else {
                            if (d.corptag.length > 4) {
                                num = -30
                            } else if (d.corptag.length <= 4 && d.corptag.length > 0) {
                                num = -15
                            } else {
                                num = 0
                            }
                        }
                        return num
                    }

                    function transformY(d) { //up方向元素偏移
                        let num = 0;
                        if (!forUpward) { //down方向时候不动
                            num = 0;
                        } else {
                            if (d.corptag.length > 0 && d.corptag.length <= 4) {
                                num = 15
                            } else if (d.corptag.length > 4) {
                                num = 30
                            } else {
                                num = 0
                            }
                        }
                        return 'translateY(' + num + 'px' + ')'
                    }

                    nodeEnter.append("svg:title").text(d => {
                        if (d.grade === 'origin') return
                        if (_self.type === 'equity') {
                            return d.name + "\n认缴金额：" + (d.amount || '未公开')
                        }
                        if (_self.type === 'relation') {
                            return d.name
                        }
                    })
                    ///开始设置节点 
                    nodeEnter.append("svg:rect")
                        .attr("x", function (d) {
                            if (d.grade == 'origin') {
                                return rootRectWidth <= 200 ? -100 : -rootRectWidth / 2
                            } else if (['holder'].includes(_self.type)) {
                                if (d.controllerFlag) {
                                    return -70
                                }
                                return -100
                            } else {
                                // if (['cscec', 'relation'].includes(_self.type)) {
                                //     return d.type == 'plate' ? -100 : -150
                                // } else {
                                return -65
                                // }
                            }
                        })
                        .attr("y", (d) => {
                            if (_self.type == 'holder' && d.controllerFlag) {
                                return '0'
                            }
                            return (d.grade == 'origin') ? -20 : forUpward ? -20 : deviation(d) + -20; //有标签时候 down方向的矩形y轴偏移

                        })
                        .attr("width", (d) => {
                            if (d.grade == 'origin') {
                                return rootRectWidth <= 200 ? 200 : rootRectWidth
                            } else if (['holder'].includes(_self.type)) {
                                if (d.controllerFlag) {
                                    return 140
                                }
                                return 200
                            }
                            else {
                                return 130
                                // if (['cscec', 'relation'].includes(_self.type)) {
                                //     return d.type == 'plate' ? 200 : 300
                                // } else {
                                // return 130
                            }
                        })
                        .attr("height", (d) => {
                            if (['holder'].includes(_self.type) && d.controllerFlag) {
                                return 60
                            }
                            return (d.grade == 'origin') ? "40" : (d.type == '2') ? 40 : 50 + addHeight(d)  //设置节点高度
                        })
                        .style("stroke", (d) => {
                            return (d.grade == 'origin') ? color.borderColor : d.symbioFlag ? "rgb(101,145,150)" : color.borderColor;
                        })
                        .style('stroke-width', "1")

                        .style('fill', (d) => {
                            if (_self.type == 'holder' && d.controllerFlag) {
                                return color.controller
                            }
                            return (d.grade == 'origin') ? color.bg[0] : color.bg[1];
                        })



                    nodeEnter.append('circle')
                        .attr('r', 1e-6)


                    nodeEnter.append("text") //上面一层文字
                        .attr("class", "linkname")
                        .attr("x", function (d) {
                            // if (d.grade == 'origin') {
                            //     return '0'
                            // } else {
                            //     if (['cscec', 'relation'].includes(_self.type)) {

                            //         return d.type == 'plate' ? '-30' : "-130"
                            //     } else {
                            //         return "-55"
                            //     }
                            // }
                            // return (d.grade == 'origin') ? '0' : "-55";
                            return '0'
                        })
                        .attr('dy', function (d) {
                            if (d.grade == 'origin') {
                                return '.35em'
                            } else {
                                if (['cscec', 'relation'].includes(_self.type) && d.type === 'plate') {
                                    return 9
                                } else if (_self.type === 'holder') {
                                    if (d.controllerFlag) {
                                        return 24
                                    }
                                    if (d.name.length <= 14) {
                                        return 9
                                    }
                                    return 0;
                                }
                                else {
                                    return -5
                                }
                            }
                            // return (d.grade == 'origin') ? '.35em' : forUpward ? -5 : -5;
                        })
                        .attr("text-anchor", function (d) {
                            // return (d.grade == 'origin') ? 'middle' : "start";
                            return 'middle';
                        })
                        .text(function (d) {
                            if (d.grade == 'origin') {
                                // return ((forUpward) ? '根节点TOP' : '根节点Bottom');
                                return rootName;
                            }
                            if (d.repeated) {
                                // console.log(d.repeated)
                                return '[Recurring] ' + d.name;
                            }
                            // if (['cscec', 'relation'].includes(_self.type)) {
                            //     if (_self.type === 'relation') {
                            //         return (d.name.length > 19) ? d.name.substr(0, 19) + '...' : d.name
                            //     }
                            //     return (d.name.length > 19) ? d.name.substr(0, 19) : d.name;
                            // }
                            if (['holder'].includes(_self.type)) {
                                if (!d.controllerFlag) {
                                    return (d.name.length > 14) ? d.name.substr(0, 14) : d.name;
                                }
                            }
                            return (d.name.length > 10) ? d.name.substr(0, 10) : d.name;
                        })
                        .style('cursor', "pointer")
                        .style({
                            'fill-opacity': 1e-6,

                            'fill': function (d) {
                                if (d.grade == 'origin') {
                                    return color.Font2
                                } else if (d.name === "实际控制人") {
                                    return color.Font2;
                                }
                                return (d.grade == 'origin') ? color.font : d.symbioFlag ? "#43A1AC" : color.font;
                            },
                            'font-size': function (d) {

                                return (d.grade == 'origin') ? 14 : 11;
                            }
                        })
                        .style("letter-spacing", (d) => {
                            return (d.grade == 'origin') ? "1px" : '0'
                        })
                        .style('transform', transformY) //up方向偏移方法
                        .on('click', routeType)

                    nodeEnter.append("text") //中间一层 上一层的折行
                        .attr("class", "linkname")
                        .attr("x", function (d) {
                            // if (d.grade == 'origin') {
                            //     return '0'
                            // } else {
                            //     if (['cscec', 'relation'].includes(_self.type)) {
                            //         return "-130"
                            //     } else {
                            //         return "-55"
                            //     }
                            // }
                            return '0'
                        })
                        .attr("dy", function (d) {
                            if (d.grade == 'origin') {
                                return '.35em'
                            } else {
                                if (['cscec', 'relation'].includes(_self.type)) {
                                    return 8
                                } else if (_self.type === 'holder') {
                                    if (d.controllerFlag) {
                                        return 42
                                    }
                                    return 18
                                } else {
                                    return forUpward ? (d.type != 2) ? "8" : "0" : '8'
                                }
                            }
                        })
                        .attr("text-anchor", function () {
                            return 'middle';
                        })
                        .text(function (d) {
                            if (['holder'].includes(_self.type)) {
                                if (!d.controllerFlag) {
                                    return d.name.length > 28 ? d.name.substr(14, 14) + '...' : d.name.substr(14, 14)
                                }
                            }
                            return (d.grade == 'origin') ? '' : d.name.length > 20 ? d.name.substr(10, 10) + '...' : d.name.substr(10,
                                10);
                        })
                        .style({
                            // 'fill': "#337ab7",
                            'font-size': function (d) {
                                if (['holder'].includes(_self.type)) {
                                    return 12
                                }
                                return (d.grade == 'origin') ? 14 : 11;
                            },
                            'fill': function (d) {
                                return (d.grade == 'origin') ? color.font : d.symbioFlag ? "#43A1AC" : color.font;
                            },
                            'cursor': "pointer"
                        })
                        .style('transform', transformY) //up方向偏移方法
                        .on('click', routeType) //路由跳转
                    if (['equity', 'holder', 'cscec', 'relation'].includes(_self.type)) {

                        nodeEnter.append("text") //认缴金额一层
                            .attr("x", "0")
                            .attr("dy", function (d) {
                                if (_self.type === 'holder' && d.controllerFlag) return 46
                                return (d.grade == 'origin') ? '.35em' : forUpward ? ((d.type == 2) ? "10" : "24") : '23';
                            })
                            .attr("text-anchor", "middle")
                            .attr("class", "linkname")
                            .style("fill", function (d) {
                                return d.symbioFlag ? "#43A1AC" : color.font2
                            })
                            .style('font-size', 10)
                            .text(function (d) {
                                if (_self.type === 'holder') {
                                    return d.controllerFlag ? '收益股份：' + d.percentTotal : ''
                                }
                                var str = (d.grade == 'origin') ? '' : (d.amount != 0 && d.amount != null) ? "认缴金额:" + d.amount :
                                    "认缴金额:未公开"; //金额
                                if (['cscec', 'relation'].includes(_self.type)) {
                                    if (d.whiteList && d.account) {
                                        return d.whiteList
                                    } else if (d.whiteList || d.account) {
                                        return d.whiteList || d.account
                                    } else {
                                        return ''
                                    }
                                }

                                return (str.length > 14) ? str.substr(0, 14) + ".." : str;
                            })
                            .style('transform', transformY) //up方向偏移方法
                        nodeEnter.append("text") //认缴金额一层
                            .attr("x", "0")
                            .attr("dy", function (d) {
                                if (_self.type === 'holder' && d.controllerFlag) return 52
                                return (d.grade == 'origin') ? '.35em' : forUpward ? ((d.type == 2) ? "10" : "24") : '35';
                            })
                            .attr("text-anchor", "middle")
                            .attr("class", "linkname")
                            .style("fill", function (d) {
                                // return ['cscec', 'relation'].includes(_self.type) ? '#43a1ac' : d.symbioFlag ? "#43A1AC" : "#ccc"
                                return d.symbioFlag ? "#43A1AC" : color.font
                            })
                            .style('font-size', 10)
                            .text(function (d) {
                                if (d.account && d.whiteList) {
                                    return d.account
                                }
                            })
                            .style('transform', transformY) //up方向偏移方法

                    }
                    nodeEnter.append("text") //股比
                        .attr("x", "10")
                        .attr("dy", function (d) {
                            if (d.parent && d.parent.children && d.parent.children.length == 1) {
                                if (forUpward) {
                                    if (_self.type == 'holder') {
                                        return '60'
                                    }
                                    return "82"
                                } else {
                                    return '-59'
                                }

                            } else {
                                return (d.grade == 'origin') ? '.35em' : forUpward ? ((d.type == 2) ? "32" : "48") : deviation(d) + -30;
                            }
                        })
                        .attr("text-anchor", "start")
                        .attr("class", "linkname")
                        .style("fill", color.proportion)
                        .style('font-size', 12)
                        .text(function (d) {
                            if (d.grade == 'origin') {
                                return ''
                            }
                            if (_self.type == 'holder' && d.controllerFlag) {
                                // 实际控股人不显示股比
                                return ''
                            }
                            if (!forUpward && _self.type === 'equity') {
                                return d.proportion || d.percent || ''
                            }
                            return (d.grade == 'origin') ? "" : (d.proportion) ? d.proportion : ''; //股比
                        })
                        .style('transform', transformY) //up方向偏移方法 

                    // 原有节点更新到新位置
                    var nodeUpdate = node.transition()
                        .duration(duration)
                        .attr('transform', function (d) {
                            return 'translate(' + d.x + ',' + d.y + ')';
                        });
                    nodeUpdate.select('circle')
                        .attr('r', function (d) {
                            if (_self.type === 'equity' && forUpward && Number(d.grade) % 4 === 0) {
                                return 8
                            }
                            return (d.grade == 'origin') ? 0 : (d.number > 0) ? 8 : 0;
                        })
                        .attr('cy', function (d) {
                            return (d.grade == 'origin') ? -20 : (forUpward) ? -27 : 39 + addHeight(d);
                        })
                        .style('fill', function (d) {
                            if (_self.type === 'equity' && forUpward && Number(d.grade) % 4 === 0) {
                                return color.iconbg
                            }
                            return d.number > 0 ? color.iconbg : "";
                        })

                    //代表是否展开的+-号

                    nodeEnter.append("svg:text")
                        .attr("class", "isExpand")
                        .attr("x", "0")
                        .attr("dy", function (d) {
                            return forUpward ? -22 : 44 + addHeight(d);
                        })
                        .attr("text-anchor", "middle")
                        .style("fill", color.icon)

                        .style('font-size', '16px')
                        .text(function (d) {
                            if (d.grade == 'origin') {
                                return '';
                            }
                            if (_self.type === 'equity' && forUpward && Number(d.grade) % 4 === 0) {
                                return '+'
                            }
                            if (_self.type === 'cscec' && d.isOpen && d.number > 0) {
                                return '-'
                            }
                            return d.number > 0 ? "+" : "";
                        })
                        .on('click', click)

                    nodeUpdate.select('text').style('fill-opacity', 1)
                    var nodeExit = node.exit().transition()
                        .duration(duration)
                        .attr('transform', function (d) {
                            return 'translate(' + source.x + ',' + source.y + ')';
                        })
                        .remove();
                    nodeExit.select('circle')
                        .attr('r', 1e-6)
                    nodeExit.select('text')
                        .style('fill-opacity', 1e-6);

                    var link = g.selectAll('path.' + link_class)
                        .data(links, function (d) {
                            return d.target.id;
                        })
                        .attr('fill', 'none')


                    //******************************************私募管理人标签 start******************************************//
                    //提示框
                    // var tsk = nodeEnter.append("svg:rect")
                    //     .attr("x", -64)
                    //     .attr("y", function (d) {
                    //         return forUpward ? -42 : -42 + deviation(d);
                    //     })
                    //     .attr('rx', 2)
                    //     .attr('ry', 2)
                    //     .attr("width", function (d) {
                    //         if (d.name == 'origin') {
                    //             return 0
                    //         } else {
                    //             return (d.shareholdertype == 'GP') ? "55" : d.corptype == 1 ? '48' : d.prodid ? '40' : '0' //私募管理人标签
                    //         }
                    //     })
                    //     .attr("height", 15)

                    //     .style("fill", function (d) {
                    //         return (d.shareholdertype == 'GP') ? "#0073ff" : d.corptype == 1 ? '#ffbc00' : d.prodid ? '#2ca111' : ''
                    //     })
                    //三角形
                    nodeEnter.append("svg:path")
                        .attr("fill", (d) => {
                            if (_self.type == 'holder' && d.controllerFlag) {
                                return color.controller
                            }
                            return color.triangle
                        })
                        .attr("d", function (d) {
                            if (d.grade == 'origin') {
                                return ""
                            } else {
                                if (['equity', 'holder', 'cscec', 'relation'].includes(_self.type)) {
                                    if (d.controllerFlag) {
                                        return "M-53 -22 L-59 -30 L-47 -30 Z"
                                    }
                                    return "M-53 -22 L-57 -30 L-49 -30 Z"
                                }
                                else {
                                    return '';
                                }

                            }
                        })
                        .style('transform', (d) => { //为down时候 看是否存在标签 更改三角定位 使用translatey做y轴偏移
                            let num = 0;
                            if (forUpward) {
                                if (_self.type == 'holder' && d.controllerFlag) {
                                    num = 88
                                }
                                else if (d.parent && d.parent.children && d.parent.children.length == 1) {
                                    if (_self.type == 'holder') {
                                        num = 82
                                    } else {
                                        num = 104
                                    }

                                } else {
                                    num = 69;
                                }

                            } else {
                                if (d.corptag.length > 0 && d.corptag.length <= 4) {
                                    num = -15
                                } else if (d.corptag.length > 4) {
                                    num = -30
                                } else if (d.parent && d.parent.children && d.parent.children.length == 1) {
                                    num = -38
                                } else {
                                    num = -9
                                }
                                // num = 69;
                            }

                            return 'translate(' + '53px,' + num + 'px' + ')'
                        })

                    nodeEnter.append("svg:path")
                        .attr("fill", (d) => {
                            return (d.shareholdertype == 'GP') ? "#0073ff" : d.corptype == 1 ? '#ffbc00' : d.prodid ? '#2ca111' : ''
                        })
                        .attr("d", function (d) {
                            if (d.name == 'origin') {
                                return ""
                            } else {
                                return (d.shareholdertype == 'GP' || d.corptype == 1 || d.prodid) ? "M-53 -20 L-60 -30 L-46 -30 Z" : ""; //私募管理人标签
                            }
                        })
                        .style('transform', (d) => { //为down时候 看是否存在标签 更改三角定位 使用translatey做y轴偏移
                            let num = 0;
                            if (forUpward) {
                                num = 0;
                            } else {
                                if (d.corptag.length > 0 && d.corptag.length <= 4) {
                                    num = -15
                                } else if (d.corptag.length > 4) {
                                    num = -30
                                } else {
                                    num = 0
                                }
                            }
                            return 'translateY(' + num + 'px' + ')'
                        })

                    nodeEnter.append("svg:text") //三角形中的文字
                        .attr("x", -60)
                        .attr("dy", function (d) {
                            return forUpward ? "-32" : -32 + deviation(d);
                        })
                        .attr("text-anchor", "start")
                        .style("fill", "#fff")
                        .style("font-size", 7)
                        .style('letter-spacing', 1)
                        .text(function (d) {
                            // console.log(d)
                            return (d.shareholdertype == 'GP') ? "本基金管理人" : d.corptype == 1 ? '私募管理人' : d.prodid ? '私募产品' : ''
                        });
                    //******************************************私募管理人标签 end******************************************//

                    link.enter().insert('path', 'g')
                        .attr('class', link_class + ' same_width')
                        .attr('d', function (d) {
                            var o = {
                                x: source.x0,
                                y: source.y0,
                            };
                            return diagonal({
                                source: o,
                                target: o,
                            });

                        })
                        .attr("id", function (d, i) {
                            return "mypath" + i;
                        })
                        .attr('fill', 'none')
                        .attr('stroke', function (d) {
                            if (d.source.grade === 'origin' && d.source.name === '全部' && _self.type === 'relation') {
                                return color.lineColor
                            }
                            if (d.source.children[0] && d.source.children[0].controllerFlag) {
                                return color.lineColor
                            }
                            return color.lineColor
                        })


                    link.transition()
                        .duration(duration)
                        .attr('d', diagonal)


                    link.exit().transition()
                        .duration(duration)
                        .attr('d', function (d) {
                            var o = {
                                x: source.x0,
                                y: source.y0,
                            };
                            return diagonal({
                                source: o,
                                target: o,
                            });
                        })
                        .remove();
                    nodes.forEach(function (d) {
                        d.x0 = d.x;
                        d.y0 = d.y;
                    });

                    function routeType(d) {
                        if (_self.type === 'equity') {
                            _self.showInfo = true;
                            _self.nodeData = d
                        }
                        else if (['relation', 'cscec'].includes(_self.type)) {
                            // if (d.type === 'plate') return
                            if (d.state == 0) return
                            // if (d.account) return
                            let customerName = ''
                            if (d._name) {
                                customerName = d._name
                            } else {
                                customerName = d.name.indexOf('(白名单)') > -1 ? d.name.substr(0, d.name.length - 5) : d.name.indexOf('(账户)') > -1 ? d.name.substr(0, d.name.length - 4) : d.name
                            }
                            _self.$http(
                                '/dcp/antiFraud/customer/name/detail',
                                // { id: d._id || d.id || '' },
                                { customerName },
                                { type: 'get' }
                            ).then(res => {
                                if (res.code === '200') {
                                    _self.infoDetail = res.data;
                                    _self.dialogVisible = true;
                                }
                            })
                        }
                    }


                    function click(d, dom) {
                        var companyType //请求参数
                        if (forUpward) { //定义请求参数的值 1 = 股东      -1 = 对外投资
                            companyType = 1; //参数类型
                            _obj = {}//重新渲染前 清空 判断标签的条件 
                        } else {
                            companyType = -1; //参数类型
                        }
                        let { upFundedSymbol, upFundedRatio } = _self.formData;
                        let checkUp = false
                        if (upFundedSymbol && upFundedRatio) {
                            // 向上穿透
                            checkUp = true;
                        }
                        if (d.children) {
                            // 修正关闭后再展开+-展示

                            d.children.forEach(collapse);
                            d._children = d.children;
                            d.children = null;
                            update(d, originalData, g); //重新渲染数据
                            d3.select(this).text("+").style({
                                'font-weight': '400',
                                'font-size': '18px',
                            })
                        }
                        else if (d._children) {
                            d.children = d._children.map(o => {
                                let number;
                                if (_self.type === 'equity') {
                                    number = (o.count && o.count != '0') ? 1 : 0
                                    if (companyType != 1) {
                                        number = o.number;
                                    }
                                } else {
                                    number = o.number;
                                }
                                let { upFundedSymbol, upFundedRatio, downFundedSymbol, downFundedRatio } = _self.formData;
                                let checkUp = false
                                if (upFundedSymbol && upFundedRatio) {
                                    // 向上穿透
                                    checkUp = true;
                                }

                                let checkDown = false
                                if (downFundedSymbol && downFundedRatio) {
                                    // 向下穿透
                                    checkDown = true
                                }
                                let flag;
                                if (companyType == 1) {
                                    // 向上
                                    flag = checkUp ? eval(o.fundedRatio.substr(0, o.fundedRatio.length - 1) + upFundedSymbol + upFundedRatio) : false
                                } else {
                                    // 向下
                                    flag = checkDown ? eval(o.percent.substr(0, o.percent.length - 1) + upFundedSymbol + upFundedRatio) : false
                                }
                                return {
                                    ...o,
                                    corptag: [],
                                    corpid: o.id,
                                    proportion: o.fundedRatio || '',
                                    amount: o.shouldCapi,
                                    symbioFlag: flag, //穿透比例是否命中
                                    number
                                }
                            });

                            update(d, originalData, g); //重新渲染数据
                            d3.select(this).text("-").style({
                                'font-weight': '400',
                                'font-size': '20px'
                            })
                            if (d.name == 'origin') {
                                d.children.forEach(expand);
                            }
                        }
                        else if (_self.cpData[d.name]) {
                            d.children = _self.cpData[d.name]
                            update(d, originalData, g); //重新渲染数据
                            d3.select(this).text("-").style({
                                'font-weight': '400',
                                'font-size': '20px'
                            })
                            // expand all if it's the first node
                            if (d.name == 'origin') {
                                d.children.forEach(expand);
                            }
                        } else {
                            let name = d.name.indexOf('(白名单)') > -1 ? d.name.substr(0, d.name.length - 5) : d.name
                            let id = d._id || d.id || '';
                            if (_self.type === 'equity') {
                                _self.$http(
                                    '/dcp/query/equity/through/up/level',
                                    { corporateName: name },
                                    { type: this.way }
                                ).then(res => {
                                    // 保存接口数据，防止二次请求
                                    // 向上
                                    let ups = res.data.children || []
                                    if (!ups.length) {
                                        // 无数据隐藏操作dom
                                        $(this).hide().siblings('circle').hide();
                                        return
                                    }
                                    let upward = {
                                        "name": d.name,
                                        "corptag": [],
                                        "direction": "upward",
                                        "children": ups.map(o => {
                                            return {
                                                ...o,
                                                corptag: [],
                                                corpid: o.id,
                                                proportion: o.fundedRatio || '',
                                                amount: o.shouldCapi,
                                                symbioFlag: checkUp ? eval(o.fundedRatio.substr(0, o.fundedRatio.length - 1) + upFundedSymbol + upFundedRatio) : false, //穿透比例是否命中
                                                number: _self.type !== 'equity' ? '1' : (o.count && o.count != '0') ? 1 : 0,
                                            }
                                        })
                                    }
                                    d.children = upward.children;
                                    if (_self.type !== 'holder') {
                                        d.children.forEach(collapse);
                                    }
                                    _self.cpData[d.name] = d.children
                                    update(d, originalData, g); //重新渲染数据
                                    d3.select(this).text("-").style({
                                        'font-weight': '400',
                                        'font-size': '20px'
                                    })
                                    // expand all if it's the first node
                                    if (d.name == 'origin') {
                                        d.children.forEach(expand);
                                    }
                                })
                            } else {
                                _self.getData({ name, id }, (res) => {
                                    if (companyType == 1) {
                                        // 向上
                                        let ups = res.data.equityThroughVos.children || []
                                        if (!ups.length) {
                                            // 无数据隐藏操作dom
                                            $(this).hide().siblings('circle').hide();
                                            return
                                        }
                                        let upward = {
                                            "name": d.name,
                                            "corptag": [],
                                            "direction": "upward",
                                            "children": ups.map(o => {
                                                return {
                                                    ...o,
                                                    corptag: [],
                                                    corpid: o.id,
                                                    proportion: o.fundedRatio || '',
                                                    amount: o.shouldCapi,
                                                    symbioFlag: checkUp ? eval(o.fundedRatio.substr(0, o.fundedRatio.length - 1) + upFundedSymbol + upFundedRatio) : false, //穿透比例是否命中
                                                    number: _self.type !== 'equity' ? '1' : (o.count && o.count != '0') ? 1 : 0,
                                                }
                                            })
                                        }
                                        d.children = upward.children;
                                        if (_self.type !== 'holder') {
                                            d.children.forEach(collapse);
                                        }
                                    } else if (companyType == -1) {
                                        // 向下
                                        let downs
                                        let { downFundedSymbol, downFundedRatio } = _self.formData;
                                        let checkDown = false
                                        if (downFundedSymbol && downFundedRatio) {
                                            // 向下穿透
                                            checkDown = true
                                        }
                                        let downward
                                        if (_self.type === 'cscec') {
                                            downs = res.data
                                            downward = {
                                                "name": d.name,
                                                "corptag": [],
                                                "direction": "downward",
                                                "children": downs.map(o => {
                                                    return {
                                                        ...o,
                                                        _id: o.id,
                                                        id: o.id + o.name,
                                                        corptag: [],
                                                        corpid: o.id,
                                                        _name: o.companyName,
                                                        name: o.companyName,
                                                        number: o.childNum,
                                                        whiteList: o.whiteList
                                                    }
                                                })
                                            }
                                        } else {
                                            downs = res.data.holdingCompanyVos.names || []
                                            downward = {
                                                "name": d.name,
                                                "corptag": [],
                                                "direction": "downward",
                                                "children": downs.map(o => {
                                                    return {
                                                        ...o,
                                                        corptag: [],
                                                        corpid: o.id,
                                                        proportion: o.fundedRatio || '',
                                                        amount: o.shouldCapi,
                                                        symbioFlag: checkDown ? eval(o.percentTotal.substr(0, o.percentTotal.length - 1) + downFundedSymbol + downFundedRatio) : false, //穿透比例是否命中
                                                        number: _self.type !== 'equity' ? '1' : (o.count && o.count != '0') ? 1 : 0,
                                                        whiteList: o.whiteList
                                                    }
                                                })
                                            }
                                        }
                                        if (!downs.length) {
                                            // 无数据隐藏操作dom
                                            $(this).hide().siblings('circle').hide().siblings('');
                                            return
                                        }

                                        d.children = downward.children;
                                    }
                                    // 保存接口数据，防止二次请求
                                    _self.cpData[d.name] = d.children
                                    update(d, originalData, g); //重新渲染数据
                                    d3.select(this).text("-").style({
                                        'font-weight': '400',
                                        'font-size': '20px'
                                    })
                                    // expand all if it's the first node
                                    if (d.name == 'origin') {
                                        d.children.forEach(expand);
                                    }
                                })
                            }

                        }

                    }
                }

                function expand(d) {
                    if (d._children) {
                        d.children = d._children;
                        d.children.forEach(expand);
                        d._children = null;
                    }
                }


                function collapse(d) {
                    if (d.children && d.children.length != 0) {
                        d._children = d.children;
                        d._children.forEach(collapse);
                        d.children = null;
                        hasChildNodeArr.push(d);
                    }
                    return d
                }
                function redraw() {
                    //强制横屏后 手机端出现touch事件方向 
                    //错误问题 以及ios 安卓兼容性问题
                    //根据浏览器内核判断手机和pc 重新计算方向 顺时针九十度x,y规则 a[0] = b[1]  a[1] = -b[0]
                    var html = document.getElementsByTagName('html')[0];
                    var width = html.clientWidth;
                    var height = html.clientHeight;
                    var a = []
                    var u = navigator.userAgent;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if (isAndroid) {
                        a = d3.event.translate; //是安卓
                    } else if (isiOS) {
                        if (window.orientation == 90 || window.orientation == -90) { //判断屏幕方向
                            // console.log("横屏")
                            a = d3.event.translate;
                        } else {
                            let b = d3.event.translate;
                            a[0] = b[1]
                            a[1] = -b[0]
                        }
                    } else { //pc端
                        if (width < height) {
                            let b = d3.event.translate;
                            a[0] = b[1]
                            a[1] = -b[0]
                        } else {
                            a = d3.event.translate;
                        }

                    }
                    if (['cscec', 'relation'].includes(_self.type)) a[1] = a[1] - 100
                    if (_self.type === 'holder') a[1] = a[1] + 140

                    if (_clickTransform.step) {
                        _clickTransform.step = false
                        zoom.scale(_clickTransform.scale)
                        zoom.translate(_clickTransform.translate)
                        return
                    }
                    treeG.transition()
                        .duration(0).attr('transform', 'translate(' + a + ')' +
                            ' scale(' + d3.event.scale + ')');
                }


                function disableRightClick() {
                    // stop zoom
                    if (d3.event.button == 2) {
                        console.log('No right click allowed');
                        d3.event.stopImmediatePropagation();
                    }
                }


                function sortByDate(a, b) {
                    if (a.plate === '建筑工程') {
                        return d3.ascending(a.id, b.id);
                    } else {
                        var aNum = a.name.substr(a.name.lastIndexOf('(') + 1, 4);
                        var bNum = b.name.substr(b.name.lastIndexOf('(') + 1, 4);
                        return d3.ascending(aNum, bNum) ||
                            d3.ascending(a.name, b.name) ||
                            d3.ascending(a.id, b.id);
                    }

                }


            };

            var d3GenerationChart = new treeChart(d3);
            d3GenerationChart.drawChart();
        }
    }

}
</script>
 
<style lang="less" scoped="scoped">
    .table-wrap {
        overflow: hidden;
    }
    #product_tree {
        touch-action: none;
        z-index: 999;
        overflow: hidden;
    }

    .layout {
        position: relative;
        .info-box {
            color: #ccc;
            top: -18px;
            right: -18px;
            position: absolute;
            width: 370px;
            height: 460px;
            background: #2d3034;
            z-index: 999;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.26);
        }
        .header {
            height: 48px;
            line-height: 48px;
            position: relative;
            padding-left: 20px;
            font-size: 16px;
            border-bottom: 1px solid #3a3d41;
            i {
                position: absolute;
                top: 12px;
                right: 8px;
                color: #366f71;
                font-size: 28px;
                cursor: pointer;
            }
        }
        .info-title {
            margin: 30px 0 20px;
            font-size: 16px;
            color: #43a1ac;
            padding-left: 20px;
        }
        .info-item {
            padding: 0 20px;
            li {
                list-style: none;
                display: flex;
                border: 1px solid #3a3d41;
                border-top: none;
                color: rgba(255, 255, 255, 0.8);
                &:first-of-type {
                    border-top: 1px solid #3a3d41;
                }
                span {
                    width: 55%;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                    padding-left: 10px;
                    &.left {
                        width: 45%;
                        background: rgb(49, 52, 56);
                        border-right: 1px solid #3a3d41;
                    }
                }
            }
        }
    }

    #rtbtn {
        position: fixed;
        width: 25px;
        height: 25px;
        top: 20px;
        border-radius: 4px;
        box-sizing: content-box;
        background: #fff;
        border: 1px solid rgb(83, 99, 187);
        z-index: 9999;
        text-align: center;
        right: 30px;
    }

    #rtbtn img {
        width: 26px;
    }

    #download {
        position: fixed;
        width: 25px;
        height: 25px;
        top: 20px;
        border-radius: 4px;
        background: #fff;
        border: 1px solid rgb(83, 99, 187);
        z-index: 9999;
        text-align: center;
        right: 80px;
    }
    @media screen and (orientation: portrait) {
        /*屏幕旋转90*/
        #product_tree {
            transform-origin: 0 0;
            transform: rotateZ(90deg) translateY(-100%);
        }
    }
    #product_tree {
        // display: flex;
        // align-items: center;
        overflow: hidden;
        .empty {
            color: #a0a3a8;
            font-size: 12px;
            text-align: center;
            padding-top: 200px;
        }
        /deep/ .displaynone {
            display: none;
        }
        /deep/ .same_width {
            shape-rendering: crispEdges;
        }
    }
    #product_tree > .centralText {
        font: 23spx sans-serif;
        fill: #222;
    }

    #product_tree > .downwardNode text,
    #product_tree > .upwardNode text {
        font: 15px sans-serif;
    }
    .d3-tip {
        position: absolute;
        top: 33px;
        right: 62px;
        color: #a0a3a8;
        font-size: 14px;
    }
    .dark {
        .d3-tool {
            i {
                color: #43a1ac;
                background-color: #18454a;
                border: 1px solid #43a1ac;
            }
            span {
                color: #43a1ac;
            }
        }
    }
    .light {
        .d3-tool {
            i {
                color: #4064d4;
                background-color: #fff;
                border: 1px solid #d2d9e5;
            }
            span {
                color: #4064d4;
            }
        }
    }
    .d3-tool {
        position: absolute;
        top: 120px;
        right: 20px;
        img {
            display: block;
            width: 30px;
            height: 30px;
            margin-bottom: 12px;
            cursor: pointer;
        }
        i {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            margin-bottom: 12px;
            cursor: pointer;
            // color: #43a1ac;
            font-size: 20px;
            // background-color: #18454a;
            // border: 1px solid #43a1ac;
            span {
                font-size: 12px;
                // color: #43a1ac;
                position: absolute;
                top: 10px;
                left: -38px;
            }
        }
        span {
            width: 100px;
            color: #fff;
        }
    }
    .slide-fade-enter-active {
        transition: all 0.3s linear;
    }
    .slide-fade-leave-active {
        transition: all 0.3s linear;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(100%);
        opacity: 0;
    }
    .model {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: transparent;
    }
</style>