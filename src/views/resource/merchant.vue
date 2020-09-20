<template>
    <div @click="visible=false">
        <div class="table-wrap mt20">
            <div class="table-title">贸易商库</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width ">
                    <el-input v-model="params.companyName" clearable placeholder="贸易商名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-popover placement="bottom-start" trigger="manual" width="500" v-model="visible" popper-class="citys-parn">
                        <div class="city-tip">
                            <div class="closed" @click="visible=false,showBtn=false"><i class="el-icon-close"></i></div>
                            <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" class="city-box">
                                <el-tab-pane label="热门城市" name="first">
                                    <div class="hot-city">
                                        <span :class="{'citys':i===index}" v-for="(v,i) in hotCitys" :key="i" @click.stop="getCity(v,i)">{{v}}</span>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="ABCDE" name="second">
                                    <div v-for="(item,index) in ABCDE" :key="item.initial">
                                        <p style="margin-top:20px;font-size:14px;">{{item.initial}}</p>
                                        <div class="hot-city">
                                            <span :class="{'citys':index===index1&&i===i1}" v-for="(v,i) in item.list" :key="i" @click.stop="getABCDE(v.name,i,index)">{{v.name}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="FGHJ" name="third">
                                    <div v-for="(item,index) in FGHJ" :key="item.initial">
                                        <p style="margin-top:20px;font-size:14px;">{{item.initial}}</p>
                                        <div class="hot-city">
                                            <span :class="{'citys':index===index2&&i===i2}" v-for="(v,i) in item.list" :key="i" @click.stop="getFGHJ(v.name,i,index)">{{v.name}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="KLMNP" name="fourth">
                                    <div v-for="(item,index) in KLMNP" :key="item.initial">
                                        <p style="margin-top:20px;font-size:14px;">{{item.initial}}</p>
                                        <div class="hot-city">
                                            <span :class="{'citys':index===index3&&i===i3}" v-for="(v,i) in item.list" :key="i" @click.stop="getKLMNP(v.name,i,index)">{{v.name}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="QRSTW" name="five">
                                    <div v-for="(item,index) in QRSTW" :key="item.initial">
                                        <p style="margin-top:20px;font-size:14px;">{{item.initial}}</p>
                                        <div class="hot-city">
                                            <span :class="{'citys':index===index4&&i===i4}" v-for="(v,i) in item.list" :key="i" @click.stop="getQRSTW(v.name,i,index)">{{v.name}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="XYZ" name="six">
                                    <div v-for="(item,index) in XYZ" :key="item.initial">
                                        <p style="margin-top:20px;font-size:14px;">{{item.initial}}</p>
                                        <div class="hot-city">
                                            <span :class="{'citys':index===index5&&i===i5}" v-for="(v,i) in item.list" :key="i" @click.stop="getXYZ(v.name,i,index)">{{v.name}}</span>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <el-button slot="reference" :class="{'show-hide':!showBtn,'show-out':showBtn}" class="btn-bgc" @click.stop="toggleShow()">
                            <span @mouseover="overShow(params.registration)" @mouseout="outHide">
                                <a ref="atxt" class="btntxt" href="#">{{params.registration === '' ? '地区' : params.registration}}</a>
                                <img v-if="!isClose" src="@/assets/images/toggle-trin.png" alt="">
                                <span v-else class="el-icon-circle-close" @click.stop="clearText"></span>
                            </span>
                        </el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item class="el-item-form-width ">
                    <el-select v-model='params.businessStatus' clearable placeholder="工商状态">
                        <el-option v-for="(v,i) in businessStatus" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width ">
                    <el-input v-model="params.cooperationUpstream" clearable placeholder="合作上游"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width ">
                    <el-input v-model="params.cooperationDownstream" clearable placeholder="合作下游"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="list">
                <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                <el-table-column prop="companyName" label="企业名称" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="businessStatus" label="工商状态" width="100" show-overflow-tooltip></el-table-column>
                <el-table-column prop="registration" label="注册地" width="120" show-overflow-tooltip></el-table-column>
                <el-table-column prop="mainProduct" label="主营产品" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cooperationUpstream" label="合作上游" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="cooperationDownstream" label="合作下游" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="" label="操作" width="90" align="center" fixed="right">
                    <template slot-scope="item">
                        <el-button type="primary" plain @click="$router.push({ name: 'resource-merchantDetail',query: { id: item.row.id}})">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size" layout="total, sizes, prev, pager, next, jumper"
                :total="total" v-if="total>0"></el-pagination>
        </div>
    </div>
</template>
<script>
import citys from '@/utils/city';
export default {
    data () {
        return {
            visible: false,
            showBtn: false,
            isClose: false,
            isClose1: false,
            isSelect: false,
            isRota: false,
            isBlue: false,
            isWhit: false,
            total: 0,
            params: {
                size: 10, // 每页显示条数
                current: 1, // 当前页
                companyName: '', // 企业名称
                businessStatus: '', //  工商状态
                registration: '', //  注册地
                startCooperationYear: '', //  开始合作年限 大于一个值传负数 比如 > 10 传 -10 ，下面一样处理
                endCooperationYear: '', //  结束合作年限
                startBidCount: '', // 开始中标次数
                endBidCount: '', //  结束中标次数
                bidCountYear: '', //  最近一年中标次数
                startRecentBidDate: '', //  开始最近中标日期
                endRecentBidDate: '', //  结束最近中标日期
                cooperationUpstream: '',
                cooperationDownstream: ''
            },
            businessStatus: [],
            activeName: 'first',
            activeNames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            hotCitys: [
                '上海市',
                '北京市',
                '成都市',
                '昆明市',
                '西安市',
                '深圳市',
                '重庆市',
                '杭州市',
                '厦门市',
                '乌鲁木齐市',
                '广州市',
                '海口市',
                '哈尔滨市',
                '南京市',
                '武汉市',
                '长沙市',
                '青岛市',
                '郑州市',
                '三亚市',
                '福州市',
                '贵阳市',
                '天津市',
                '南宁市',
                '沈阳市',
                '太原市',
                '大连市',
                '兰州市',
                '济南市',
                '长春市',
                '温州市'
            ],
            ABCDE: [],
            FGHJ: [],
            KLMNP: [],
            QRSTW: [],
            XYZ: [],
            index: '',
            index1: '',
            index2: '',
            index3: '',
            index4: '',
            index5: '',
            i1: '',
            i2: '',
            i3: '',
            i4: '',
            i5: '',
            list: [],
            routerName: ''
        }
    },
    created () {
        this.getIndustryCode()
        this.getList()
        this.cityClassify(citys)
    },
    methods: {
        // 获取工商状态
        getIndustryCode () {
            this.$http(
                '/dcp/pre/credit/businessStatus/list',
                {},
                { type: 'get' }
            ).then(res => {
                this.businessStatus = res.data
            })
        },
        getList (v) {
            if (v) {
                this.params.current = v
            }
            this.$http('/dcp/energy/merchant/list', this.params, {
                type: 'formData'
            }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
            })
        },
        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startRecentBidDate = v[0]
                this.params.endRecentBidDate = v[1]
            } else {
                this.params.startRecentBidDate = ''
                this.params.endRecentBidDate = ''
            }
        },
        cityClassify (citys) {
            citys.city.forEach(v => {
                if ('ABCDE'.includes(v.initial)) {
                    this.ABCDE.push(v)
                } else if ('FGHJ'.includes(v.initial)) {
                    this.FGHJ.push(v)
                } else if ('KLMNP'.includes(v.initial)) {
                    this.KLMNP.push(v)
                } else if ('QRSTW'.includes(v.initial)) {
                    this.QRSTW.push(v)
                } else if ('XYZ'.includes(v.initial)) {
                    this.XYZ.push(v)
                }
            })
        },
        getCity (v, i) {
            this.index = i
            this.index1 = this.index2 = this.index3 = this.index4 = this.index5 =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getABCDE (v, i, index) {
            this.index1 = index
            this.i1 = i
            this.index = this.index2 = this.index3 = this.index4 = this.index5 =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getFGHJ (v, i, index) {
            this.index2 = index
            this.i2 = i
            this.index = this.index1 = this.index3 = this.index4 = this.index5 =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getKLMNP (v, i, index) {
            this.index3 = index
            this.i3 = i
            this.index = this.index1 = this.index2 = this.index4 = this.index5 =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getQRSTW (v, i, index) {
            this.index4 = index
            this.i4 = i
            this.index = this.index1 = this.index2 = this.index3 = this.index5 =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getXYZ (v, i, index) {
            this.index5 = index
            this.i5 = i
            this.index1 = this.index2 = this.index3 = this.index4 = this.index =
                ''
            this.params.registration = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        toggleShow () {
            this.activeName = 'first'
            this.index = ''
            this.showBtn = !this.showBtn
            this.visible = !this.visible
        },
        overShow (item) {
            if (item) {
                this.isClose = true
            }
        },
        outHide () {
            this.isClose = false
        },
        clearText () {
            this.params.registration = ''
        },
        showSelect () {
            this.isSelect = true
        },
        rotaSelect (v) {
            if (v) {
                this.isRota = true
                this.isBlue = true
            } else {
                this.isRota = false
                if (
                    !this.params.endCooperationYear &&
                    !this.params.startCooperationYear
                ) {
                    this.isBlue = false
                } else if (
                    this.params.startCooperationYear ||
                    this.params.endCooperationYear
                ) {
                    this.isBlue = true
                }
                if (
                    this.params.startCooperationYear &&
                    this.params.endCooperationYear
                ) {
                    this.isBlue = false
                }
            }
        },
        overSelect (v, m) {
            if (v.trim() || m.trim()) {
                this.isClose1 = true
                this.isBlue = true
                this.isWhit = false
            } else {
                this.isWhit = true
            }
            if (v.trim() && m.trim()) {
                this.isBlue = false
                this.isWhit = true
            }
        },
        outSelect () {
            this.isClose1 = false
            this.isWhit = false
        },
        toClear () {
            if (
                this.params.startCooperationYear &&
                this.params.endCooperationYear
            ) {
                this.params.startCooperationYear = ''
                this.params.endCooperationYear = ''
                this.isSelect = false
            } else {
                this.params.startCooperationYear = ''
                this.params.endCooperationYear = ''
                this.isBlue = false
            }
        },
        // 重置
        reSet () {
            this.params = {
                size: 10, // 每页显示条数
                current: 1, // 当前页
                companyName: '', // 企业名称
                businessStatus: '', //  工商状态
                registration: '', //  注册地
                startCooperationYear: '', //  开始合作年限 大于一个值传负数 比如 > 10 传 -10 ，下面一样处理
                endCooperationYear: '', //  结束合作年限
                startBidCount: '', // 开始中标次数
                endBidCount: '', //  结束中标次数
                bidCountYear: '', //  最近一年中标次数
                startRecentBidDate: '', //  开始最近中标日期
                endRecentBidDate: '' //  结束最近中标日期
            }
            this.isSelect = false
            this.getList()
        },
        handleClick (tab, event) {
            // console.log(tab, event);
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
</style>

