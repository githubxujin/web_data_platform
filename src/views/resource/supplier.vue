<template>
    <div @click="visible=false">
        <div class="table-wrap mt20">
            <div class="table-title">供应商库</div>
            <el-form :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.companyName" clearable placeholder="供应商名称"></el-input>
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
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.businessStatus' clearable placeholder="工商状态" class="el-item-form-width">
                        <el-option v-for="(v,i) in businessStatus" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>

                <!-- 中标次数 -->
                <el-form-item style="width: 340px">
                    <el-input v-model="params.startBidCount" clearable placeholder="中标次数" @change="biddinNum($event,1)" style="width:150px;"></el-input>
                    <span style="color:rgb(192, 196, 204)">至</span>
                    <el-input v-model="params.endBidCount" clearable placeholder="中标次数" @change="biddinNum($event,2)" style="width:150px;"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.bidCountYear' clearable placeholder="近一年中标次数">
                        <el-option label='0' value='0'></el-option>
                        <el-option label='1' value='1'></el-option>
                        <el-option label='2' value='2'></el-option>
                        <el-option label='3' value='3'></el-option>
                        <el-option label='4' value='4'></el-option>
                        <el-option label='5' value='5'></el-option>
                        <el-option label='6' value='6'></el-option>
                        <el-option label='7' value='7'></el-option>
                        <el-option label='8' value='8'></el-option>
                        <el-option label='9' value='9'></el-option>
                        <el-option label='10' value='10'></el-option>
                        <el-option label='>10' value='-10'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model='dateArr2' type='daterange' unlink-panels @change='changeDate2' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='最早中标开始日期' end-placeholder='最早中标结束日期'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model="value1" type="daterange" unlink-panels @change="changeDate" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="中标日期开始" end-placeholder="中标日期结束"></el-date-picker>
                </el-form-item>
                <!-- <el-form-item>
                  <el-select v-model='params.channelType' clearable placeholder="评分模板">
                      <el-option label='模板1' value='1'></el-option>
                      <el-option label='模板2' value='2'></el-option>
                      <el-option label='盛业风控准入评分' value='3'></el-option>
                      <el-option label='通商银行标准' value='4'></el-option>
                  </el-select>
              </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,getList()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <div v-if="!isList">
                <el-table :data="list" style="width: 100%">
                    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
                    <el-table-column prop="companyName" label="企业名称" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="businessStatus" label="工商状态" width="120" show-overflow-tooltip>
                        <template slot-scope='scope'>
                            {{ scope.row.businessStatus ?  scope.row.businessStatus : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="registration" label="注册地" width="120" show-overflow-tooltip>
                        <template slot-scope='scope'>
                            {{ scope.row.registration ?  scope.row.registration : '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="firstBidDate" label="最早中标日期" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bidCount" label="中标次数" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="bidCountYear" label="近一年中标次数" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="recentBidDate" label="最近中标日期" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" width="100" label="操作" align="center" fixed="right">
                        <template slot-scope="item">
                            <el-button type="primary" plain @click="$router.push({ name: 'resource-supplier-detail', query: { id: item.row.id,companyName: item.row.companyName,source: item.row.source}})">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="handleSizeChange" @current-change="getList" :current-page="params.current" :page-sizes="[10, 20, 30, 40]" :page-size="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total" v-if="total>0"></el-pagination>
            </div>
            <div v-else class="tip-box">暂未查询到该供应商信息</div>
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
            isList: false,
            total: 0,
            value1: [],
            dateArr2: [],
            ageLimit: '与核心企业合作年限',
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
                startFirstBidDate: '',
                endFirstBidDate: ''
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
        this.cityClassify(citys)
        this.searchRecord()
    },
    methods: {
        searchRecord () {
            if (!this.isObjectEmpty(this.$params[this.$route.name])) {
                this.params = this.$params[this.$route.name]
            }
            this.getList();
        },
        changeDate2 (v) {
            this.dateArr2 = [];
            if (v && v.length > 0) {
                this.params.startFirstBidDate = v[0];
                this.params.endFirstBidDate = v[1];
            } else {
                this.params.startFirstBidDate = '';
                this.params.endFirstBidDate = '';
            }
            this.dateArr2.push(this.params.startFirstBidDate, this.params.endFirstBidDate)
        },
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
            this.$params[this.$route.name] = this.params
            this.$http('/dcp/energy/page/list', this.params, {
                type: 'formData'
            }).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                // if ( this.list.length > 0){
                //     this.isList = false
                // }
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
        biddinNum (v, n) {
            let reg = /^[+]{0,1}(\d+)$/
            if (v.trim() !== '' && !reg.test(v)) {
                this.$message.error('请输入正整数')
                if (n === 1) {
                    this.params.startBidCount = ''
                } else {
                    this.params.endBidCount = ''
                }
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
            // console.log(this.$refs.atxt.style)
            // this.$refs.atxt.style.color = 'rgb(192, 196, 204)'
            this.showBtn = !this.showBtn
            this.visible = !this.visible
            let vm = this
            this.$nextTick(() => {
                var els = document.querySelectorAll("input")
                els.forEach((el) => {
                    el.onclick = function () {
                        vm.visible = false
                        vm.showBtn = false
                    }
                })
            })
        },
        overShow (item) {
            // alert('1111111111')
            if (item) {
                this.isClose = true
            }
        },
        outHide () {
            this.isClose = false
            // alert('2222222222')
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
            this.value1 = []
            this.dateArr2 = []
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
