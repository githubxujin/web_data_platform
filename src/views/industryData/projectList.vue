<template>
    <div class="stat" @click="visible=false">
        <div class="table-wrap mt20">
            <div v-if="$route.name === 'projectTabs'" class="table-title">项目库</div>
            <div v-else class="table-title">项目数据更新</div>
            <el-form :model="params" :inline="true" ref="form" size="medium">
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.projectName" clearable placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.buildCompany" clearable placeholder="建设单位"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.contractor" clearable placeholder="承建单位"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-input v-model="params.constructNo" clearable placeholder="施工许可证编号"></el-input>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='cityList' clearable @change="changeCity" placeholder="区域">
                        <el-option label='华南' :value='1'></el-option>
                        <el-option label='华北' :value='2'></el-option>
                        <el-option label='华东' :value='3'></el-option>
                        <el-option label='华中' :value='4'></el-option>
                        <el-option label='西北' :value='5'></el-option>
                        <el-option label='西南' :value='6'></el-option>
                        <el-option label='东北' :value='7'></el-option>
                        <el-option label='港澳台地区' :value='8'></el-option>
                    </el-select>
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
                        <el-button slot="reference" :class="{'show-hide':!showBtn,'show-out':showBtn}" class="btn-bgc" @click.stop="toggleShow()" style="width: 200px;">
                            <span @mouseover="overShow(params.projectCity)" @mouseout="outHide" style="display:block;text-align: left; font-weight: normal;">
                                <a ref="atxt" class="btntxt" href="#">{{params.projectCity ? params.projectCity : '城市'}}</a>
                                <img v-if="!isClose" src="../../assets/images/toggle-trin.png" alt="">
                                <span v-else class="el-icon-circle-close" @click.stop="clearText"></span>
                            </span>
                        </el-button>
                    </el-popover>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.projectType ' clearable placeholder="项目类型">
                        <el-option v-for="(v,i) in projectTypeList" :key="i" :label='v' :value='v'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model='params.isCooperation ' clearable placeholder="合作状态">
                        <el-option label='已合作' :value='1'></el-option>
                        <el-option label='未合作' :value='2'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate2' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开工时间开始' end-placeholder='开工时间结束'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="el-item-date-width">
                    <el-date-picker v-model='dateArr1' type='daterange' unlink-panels @change='changeDate3' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='竣工时间开始' end-placeholder='竣工时间结束'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.current=1,searchFun()">查询</el-button>
                    <el-button type="info" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>

            <!-- 列表 -->
            <div>
                <el-table :data="list">
                    <el-table-column type="index" label="序号" width="70" align="center" fixed="left"></el-table-column>
                    <el-table-column prop="projectName" label="项目名称" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="buildCompany" label="建设单位" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="contractor" label="承建单位" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectType" label="项目类型" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="region" label="区域" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectProvince" label="省份" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectCity" label="城市" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectAddress" label="所在地" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="constructNo" label="施工许可证编号" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectActualStartDate" label="项目开工时间" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="projectActualEndDate" label="项目竣工时间" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="" label="操作" :width="$route.name === 'projectUpdate' ? '150' : '100'" align="center" fixed="right">
                        <template slot-scope="item">
                            <el-button type="primary" plain @click="toDetail(item.row,1)">详情</el-button>
                            <el-button v-if="$route.name === 'projectUpdate'" type="info" plain @click="toDetail(item.row,2)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="currentChange" @current-change="currentChange()" :current-page.sync="params.current" :page-sizes="[10, 20, 50, 100]" :page-size.sync="params.size"
                    layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { materialList, claimStatusList } from "@/utils/common"
import citys from './citys/citys.js'
export default {
    data () {
        return {
            materialList,
            projectTypeList: [],
            claimStatusList,
            visible: false,
            showBtn: false,
            isClose: false,
            isClose1: false,
            isRota: false,
            isBlue: false,
            isWhit: false,
            total: 0,
            value1: [],
            dateArr: [],
            dateArr1: [],
            ageLimit: '与承建单位合作年限',
            params: {
                size: 10, // 每页显示条数
                current: 1, // 当前页
                buildCompany: '',
                contractor: '',
                endProjectActualEndDate: '',
                endProjectActualStartDate: '',
                projectCity: '',
                projectName: '',
                projectType: '',
                constructNo: '',
                projectProvince: [],
                startProjectActualEndDate: '',
                startProjectActualStartDate: '',
                isCooperation: ''
            },
            cityList: '',
            businessStatus: [],
            activeName: 'first',
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
            area: {
                1: ['广东省', '广西省', '海南省'],
                2: ['北京市', '天津市', '河北省', '山西省', '内蒙古'],
                3: ['山东省', '江苏省', '安徽省', '浙江省', '福建省', '上海市'],
                4: ['湖北省', '湖南省', '河南省', '江西省'],
                5: ['宁夏回族自治区', '新疆维吾尔族自治区', '青海省', '陕西省', '甘肃省'],
                6: ['四川省', '云南省', '贵州省', '西藏藏族自治区', '重庆市'],
                7: ['辽宁省', '吉林省', '黑龙江省'],
                8: ['台湾省', '香港特别行政区', '澳门特别行政区']
            },
            region: {
                1: '华南',
                2: '华北',
                3: '华东',
                4: '华中',
                5: '西北',
                6: '西南',
                7: '东北',
                8: '港澳台地区'
            },
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
            routerName: '',
            num: 0
        }
    },
    created () {
        if (this.$route.params.companyName) {
            this.params.projectName = this.$route.params.companyName
            this.params.projectCity === '' ? '' : this.params.projectCity
            return this.searchFun()
        } else {
            this.params.projectName = ''
        }
        this.getType()
        this.getList()
        this.cityClassify(citys)
    },
    watch: {
        '$route.query': {
            handler (newObj, oldObj) {
                this.getList()
            },
            deep: true
        }
    },
    methods: {
        currentChange () {
            this.num++
            this.$router.replace({
                path: this.$route.name === 'projectUpdate' ? '/projectUpdate' : '/projectTabs',
                query: { ...this.params }
            })
        },
        searchFun () {
            this.params.current = 1
            this.params.size = 10
            this.num++
            this.$router.replace({
                path: this.$route.name === 'projectUpdate' ? '/projectUpdate' : '/projectTabs',
                query: { ...this.params }
            })
        },
        getList (v) {
            this.params = {
                ...this.$route.query,
                isCooperation: typeof this.$route.query.isCooperation === 'undefined' || this.$route.query.isCooperation === '' ? '' : Number(this.$route.query.isCooperation)

            }
            if (this.$route.params.companyName && this.num === 1) this.params.projectName = this.$route.params.companyName
            // console.log('this.params.projectName',this.params.projectName);
            this.params.size = Number(this.params.size) || 10
            this.params.current = Number(this.params.current) || 1
            this.$http('/dcp/select/project/page/list', this.params).then(res => {
                this.list = res.data.records
                this.total = res.data.total
                this.list.forEach(v => {
                    for (let key in this.area) {
                        if (this.area[key].includes(v.projectProvince)) {
                            this.$set(v, 'region', this.region[key])
                            // v.region = this.region[key]
                        }
                    }

                })
            })
        },
        getType () {
            this.$http('/dcp/select/project/type/list', {}, { type: 'get' }).then(res => {
                this.projectTypeList = res.data
            })
        },
        changeCity (v) {
            if (v) {
                this.params.projectProvince = this.area[v]
            } else {
                this.params.projectProvince = []
            }
        },
        changeDate2 (v) {
            this.dateArr = []
            if (v && v.length > 0) {
                this.params.startProjectActualStartDate = v[0];
                this.params.endProjectActualStartDate = v[1];
            } else {
                this.params.startProjectActualStartDate = '';
                this.params.endProjectActualStartDate = '';
            }
            this.dateArr.push(this.params.startProjectActualStartDate, this.params.endProjectActualStartDate)
        },
        changeDate3 (v) {
            this.dateArr1 = []
            if (v && v.length > 0) {
                this.params.startProjectActualEndDate = v[0];
                this.params.endProjectActualEndDate = v[1];
            } else {
                this.params.startProjectActualEndDate = '';
                this.params.endProjectActualEndDate = '';
            }
            this.dateArr1.push(this.params.startProjectActualEndDate, this.params.endProjectActualEndDate)
        },
        toDetail (v, n) {
            if (n === 1) { // 详情
                if (this.$route.name === 'projectUpdate') {
                    this.$router.push(
                        {
                            path: '/projectDetails',
                            query: { item: JSON.stringify(v) }
                        }
                    )
                } else {
                    this.$router.push(
                        {
                            path: '/projectDetail',
                            query: { item: JSON.stringify(v) }
                        }
                    )
                }
            } else {  //  编辑
                this.$router.push(
                    {
                        path: '/projectCompile',
                        query: { item: JSON.stringify(v) }
                    }
                )
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
            this.params.projectCity = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getABCDE (v, i, index) {
            this.index1 = index
            this.i1 = i
            this.index = this.index2 = this.index3 = this.index4 = this.index5 =
                ''
            this.params.projectCity = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getFGHJ (v, i, index) {
            this.index2 = index
            this.i2 = i
            this.index = this.index1 = this.index3 = this.index4 = this.index5 =
                ''
            this.params.projectCity = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getKLMNP (v, i, index) {
            this.index3 = index
            this.i3 = i
            this.index = this.index1 = this.index2 = this.index4 = this.index5 =
                ''
            this.params.projectCity = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getQRSTW (v, i, index) {
            this.index4 = index
            this.i4 = i
            this.index = this.index1 = this.index2 = this.index3 = this.index5 =
                ''
            this.params.projectCity = v
            this.visible = !this.visible
            this.showBtn = !this.showBtn
        },
        getXYZ (v, i, index) {
            this.index5 = index
            this.i5 = i
            this.index1 = this.index2 = this.index3 = this.index4 = this.index =
                ''
            this.params.projectCity = v
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
            this.params.projectCity = ''
        },
        // 重置
        reSet () {
            this.params = {
                size: 10, // 每页显示条数
                current: 1, // 当前页
                buildCompany: '',
                contractor: '',
                endProjectActualEndDate: '',
                endProjectActualStartDate: '',
                projectCity: '',
                projectName: '',
                projectType: '',
                constructNo: '',
                projectProvince: [],
                startProjectActualEndDate: '',
                startProjectActualStartDate: '',
                isCooperation: ''
            }
            this.cityList = ''
            this.dateArr = []
            this.dateArr1 = []
            this.searchFun()
        },
        handleClick (tab, event) {
        },
        handleSizeChange (v) {
            this.params.size = v
            this.getList()
        }
    }
}
</script>
<style lang="scss" scoped>
.tip-box {
    width: 100%;
    height: 50px;
    background-color: rgb(41, 43, 47);
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    color: rgb(140, 142, 147);
}
</style>

