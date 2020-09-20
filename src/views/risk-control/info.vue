<template>
    <!-- 舆情信息 -->
    <div class="page pb30 qg-yuqing" @click="isFold=false">
        <transition name="fade">
            <div @click="toTop" v-if="isTop" class="up iconfont icon-wendangguanlixitong-fanhuixuanzhongtubiao"></div>
        </transition>

        <div class="table-wrap">
            <template slot="title">搜索条件</template>
            <el-form :inline="true" class="mb-18" style="margin-bottom: -20px;">
                <el-form-item class="el-item-form-width">
                    <el-autocomplete v-model="params.customerName" clearable placeholder="企业名称" :fetch-suggestions="getCustomerName"></el-autocomplete>
                </el-form-item>
                <el-form-item class="el-item-form-width">
                    <el-select v-model="params.hasRead" clearable placeholder="状态">
                        <el-option :label="'已读'" :value="1"></el-option>
                        <el-option :label="'未读'" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="el-item-date-width ">
                    <el-date-picker v-model='dateArr' type='daterange' unlink-panels @change='changeDate' value-format='yyyy-MM-dd' range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期' class='f12'>
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="params.pageNum=1,getList()">查询</el-button>
                    <el-button type="info" @click="rest">重置</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="el-20 mb20"></div>
        <!-- 条件复选框 -->

        <cCheckbox class="pt10" :list.sync="categoryList" v-on:search="searchHand" v-if="isRestLoad" />

        <div class="el-20 mb20 mt20 pt10"></div>

        <template v-if="list && list.length">
            <div v-for="(v,k) in list" :key="k">
                <div class="list-content pt20 ">
                    <div class="list-title1">{{v.itemName}}</div>
                    <div v-for="(c,i) in v.itemList" :key="i">
                        <div class="list-title f16 fc-b pb5">{{c.customerName}}</div>
                        <div class="list">
                            <div class="list-item" v-for="(val,key) in c.eventList" :key="key">
                                <div class="list-hd">
                                    <div class="tag-num">{{getTagName(v.itemName)}}</div>
                                </div>
                                <div class="list-bd" v-if="v.itemName.includes('新闻事件')">
                                    <div>
                                        {{val.content}}
                                    </div>
                                    <div class="sub-title">
                                        <span class="fc-b">
                                            <a :href="val.url" target="_blank" style="font-size: 10px;">
                                                {{val.title}}>>
                                            </a>
                                        </span>
                                        <span class="pl10">{{val.eventTime}}</span>
                                    </div>
                                </div>
                                <div class="list-bd" v-else>
                                    <div>{{val.content}} <span @click="getDetail(val.itemId, val.eventRecordId)" class="more pr5 cur f10 fc-b1 ml10">查看更多>></span></div>
                                    <div class="sub-title">
                                        <span class="f10">
                                            {{val.eventTime}}
                                        </span>
                                    </div>
                                </div>
                                <div class="list-fd">
                                    <div class="c-radio-group">

                                        <el-radio-group v-if="val.major*1" v-model="val.connectType" @change="v=>{ [val.update? setTagAudit('1',v,val,[k,i,key]) : ''] } " size="mini" :disabled="!v.update">
                                            <el-radio-button label="1">强</el-radio-button>
                                            <el-radio-button label="2">弱</el-radio-button>
                                            <el-radio-button label="3">无</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                    <template v-if="val.archiveResult == 3">
                                        <div class="tag-btn" @click="[val.update ? setTagAudit('2', '1',val,[k,i,key]) : '']"><i class="iconfont icon-shujuzhongxin-zhengchang"></i>正常</div>
                                        <div class="tag-btn" @click="[val.update ? setTagAudit('2', '2',val,[k,i,key]) : '']"><i class="iconfont icon-shujuzhongxin-guanzhu"></i>关注</div>
                                    </template>
                                    <template v-else>
                                        <div class="tag-btn act" @click="[val.upate ? setTagAudit('2', '3',val,[k,i,key]) : '']">
                                            <i class="iconfont icon-shujuzhongxin-zhengchang" v-if="val.archiveResult ==1 "></i>
                                            <i class="iconfont icon-shujuzhongxin-guanzhu" v-else></i>
                                            {{val.archiveResult ==1 ? '正常' : '关注'}}</div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="pt20">
                <div class="tc c_C3">暂无数据</div>
            </div>
        </template>

        <!-- 加载中 -->
        <transition name="fade">
            <el-row type="flex" v-if="isLoad && !isNoData" align="middle" justify="center" class="c_C3 pt20"><i class="el-icon-loading f16 mr5"></i>加载中...</el-row>
        </transition>

        <div class="float-right" :class="{act:isFold}" ref="alert">
            <div class="fold-box" @click.stop="foldHand"></div>
            <div class="title-box">
                <p class="title"> 来源统计</p>
                <p class="sub-title">{{params.startTime}}至{{params.endTime}}</p>
            </div>
            <div class="pie-box">
                <div class="circle">
                    <div>
                        <div class="txt1">{{ isNaN(curPie) ? 0 : curPie}}<span class="f12">%</span></div>
                        <div class="txt2">{{pieName}}</div>
                    </div>
                </div>
                <div id="source-pie"></div>
                <div class="pie-list">
                    <div class="pie-item" v-for="(v,k) in pieList" :key="k">{{getProgress(v)}}%</div>
                    <!-- <div class="pie-item" v-for="(v,k) in 5" :key="k">{{v}}%</div> -->
                </div>
            </div>
        </div>

        <el-dialog title="详情" :visible.sync="isDialog" width="80%">

            <div class="div">
                <component :is="componentsName" :value="detail"></component>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="isDialog = false">关闭</el-button>
                <!-- <el-button type="primary" size="mini" plain>确定</el-button> -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
import echarts from 'echarts'
import sourcePieOpt from './config/source-pie'
import cCheckbox from './components/c-checkbox'
import { formatDate } from "@/filters/index";
export default {
    components: {
        cCheckbox
    },
    data () {
        return {
            fastOptions: [
                {
                    value: 30,
                    label: "近30日"
                },
                {
                    value: 60,
                    label: "近60日"
                },
                {
                    value: 180,
                    label: "近180日"
                },
                {
                    value: 360,
                    label: "近1年"
                }
            ],
            dateArr: [],
            isDialog: false,
            isEnter: false,
            isFold: false,
            isLoad: false,
            isTop: false,
            isRestLoad: true,
            isNoData: false,
            index: 0,
            sourcePie: null,
            detail: [],
            componentsName: '',
            checkList: [],
            list: [],
            pieList: [],
            curPie: '',
            params: {
                "customerName": "", // 企业名称
                "startTime": '', //this.formatDate(new Date), // 开始时间
                "endTime": '', // 结束时间
                "hasRead": "", // 是否已读  1:是 0:否
                "itemIds": [], //舆情id串, 逗号隔开
                "pageNum": 1, // 1
                "pageSize": 10 // 20
            },
            categoryList: [],
            countInfo: {},
            pieName: "新闻事件"
        }
    },
    mounted () {
        this.fastChange(30)
        this.getCategory()
        let that = this
        this.$nextTick(() => {
            document.querySelector('body').addEventListener('click', function (e) {
                if (that) { that.isFold = false; }
            })
            this.sourcePie = echarts.init(document.getElementById('source-pie'))
            /* 滚动分页 */
            document.querySelector('.main').addEventListener('scroll', this.handleScroll, false)
        })
    },
    methods: {

        fastChange (val) {
            const date = new Date();
            this.params.endTime = formatDate(new Date());
            let startDate = date.setTime(
                date.getTime() - 3600 * 1000 * 24 * val
            );
            this.params.startTime = formatDate(startDate);
            this.dateArr = [this.params.startTime, this.params.endTime];
        },
        getCustomerName (customerName, cb) {
            console.log(customerName)
            this.$http('/risk/server/customer/vague/get', { customerName }, { type: 'get' }).then(res => {
                cb(res.data.map(i => {
                    return {
                        value: i.customerName
                    }
                }))
            });
        },

        changeDate (v) {
            if (v && v.length > 0) {
                this.params.startTime = v[0];
                this.params.endTime = v[1];
            } else {
                this.params.startTime = '';
                this.params.endTime = '';
            }
        },
        rest () {
            this.fastChange(30)
            this.params = {
                "customerName": "", // 企业名称

                "hasRead": "", // 是否已读  1:是 0:否
                "itemIds": [], //舆情id串, 逗号隔开
                "pageNum": 1, // 1
                "pageSize": 10 // 20
            }
            this.checkList = []
            this.getList()

            // 重置复选框
            this.isRestLoad = false
            setTimeout(() => {
                this.isRestLoad = true
            }, 0);
        },
        toTop () {
            let dom = document.querySelector('.main ')
            document.body.scrollTop = 0;
            dom.scrollTop = 0;
            this.isTop = false
        },
        handleScroll () {
            let dom = document.querySelector('.main ')
            let dom_div = document.querySelector('.page')

            this.isTop = dom.scrollTop > 400

            if (this.isLoad) return
            if ((dom.scrollTop + window.innerHeight) >= dom_div.offsetHeight - 100) {
                this.isLoad = true

                this.getList(1)
            }
        },
        searchHand (v) {
            this.checkList = v
            this.params.pageNum = 1
            this.getList(1)
        },
        foldHand () {
            this.isFold = !this.isFold
        },
        getTagName (name) {
            return name.split('-')[1].charAt()
        },
        setPieData () {
            console.log('sourcePieOpt', sourcePieOpt)
            this.sourcePie.setOption(sourcePieOpt)

            this.setDefaultPie()
        },
        setDefaultPie () {
            this.sourcePie.dispatchAction({
                type: "highlight",
                seriesIndex: this.index,
                dataIndex: this.index
            })

            this.curPie = this.getProgress(this.pieList[this.index])
            console.log(this.curPie, 'curpie')

            this.sourcePie.on("mouseover", e => {
                console.log(e, 'e')
                console.log(e.dataIndex, 'index')
                this.pieName = e.name
                if (e.dataIndex != this.index) {
                    this.sourcePie.dispatchAction({
                        type: "downplay",
                        seriesIndex: 0,
                        dataIndex: this.index
                    });

                    this.curPie = e.percent
                }
            })
            this.sourcePie.on("mouseout", e => {
                this.index = e.dataIndex;
                this.sourcePie.dispatchAction({
                    type: "highlight",
                    seriesIndex: 0,
                    dataIndex: e.dataIndex
                })
            })
        },
        /* 获取分类 */
        async getCategory () {
            let res = await this.ajax.get('risk/server/notify/item/list')
            if (res.code === '200') {
                this.categoryList = res.data

                this.getList()
            }
        },
        /* 舆情打标签 */
        async setTagAudit (optType, value, row, keys) {
            let res = await this.ajax.post('risk/server/event/focus/audit', {
                "optType": optType, // 操作方式   1:处理关联性    2:处理风险级别
                "value": value, // 取值  关联性(1:强 2:若 3:无)  归档结果(1:已正常 2:已关注 3:未处理)
                "id": row.id, // id 从列表中取id字段
                "major": row.major, // 是否重大事件
            })
            if (res.code === '200') {
                // 处理按钮显示状态
                let curData = this.list[keys[0]].itemList[keys[1]].eventList[keys[2]]

                if (optType === '1') {
                    curData.connectType = value
                }

                if (optType === '2') {
                    curData.archiveResult = value
                }
            }
        },
        /* 计算所在比例 */
        getProgress (val) {
            let total = this.pieList.reduce((prev, cur) => {
                return prev + cur * 1;
            }, 0);
            return (((val * 1) / total) * 100).toFixed(2) * 1;
        },
        /* 获取统计数据 */
        async getCount (type) {
            let params = this.params

            params = { ...params, ...{ itemIds: this.checkList } }

            // this.categoryList.length && this.categoryList.map(v => {
            //     v.childItem && v.childItem.map(c => {
            //         this.$set(c, 'count', 0)
            //     })
            // })

            let res = await this.ajax.get('risk/server/consensus/summary', params, { isLoading: !this.isLoad })
            if (res.code === '200') {
                this.countInfo = res.data

                let arr = res.data.itemList // 统计分类数据
                if (arr && arr.length) {
                    this.categoryList.length && this.categoryList.map(v => {
                        v.childItem && v.childItem.map(c => {
                            arr && arr.map(a => {
                                if (a.itemId === c.id) {
                                    this.$set(c, 'count', a.count)
                                }
                            })
                        })
                    })
                }


                let pieData = res.data.parentList // 饼图数据
                console.log(pieData, 'pieData')
                let color = ['#A13940', '#CB7351', '#9BBC6C', '#4584D1', '#3E919C']
                this.pieList = []
                sourcePieOpt.legend.data = []
                sourcePieOpt.series.data = []
                pieData && pieData.map((v, k) => {
                    sourcePieOpt.legend.data.push(v.itemName)
                    sourcePieOpt.series.data.push({
                        value: v.count,
                        name: v.itemName,
                        itemStyle: {
                            color: color[k]
                        }
                    })
                    this.pieList.push(v.count)
                })
                console.log(pieData, 'pieData')

                this.setPieData()
            }
        },
        /* 获取列表 */
        async getList (type) {
            let params = this.params
            console.log(params, 'params123')

            params = { ...params, ...{ itemIds: this.checkList } }

            // 如果是下拉不进行统计接口调用
            // if(!this.isLoad){
            this.getCount(type)
            // }

            this.isNoData = false
            let res = await this.ajax.get('risk/server/consensus/page/list', params, { isLoading: !this.isLoad })
            if (res.code === '200') {
                if (this.params.pageNum === 1) {
                    this.list = res.data
                } else {
                    this.list = [...this.list, ...res.data]
                }
                if (res.data && res.data.length && this.isLoad) {

                    // dom渲染完后在进行下拉操作
                    this.$nextTick(() => {
                        this.isLoad = false
                    })
                }
                if (!res.data || !res.data.length) {
                    this.isNoData = true
                }
                this.params.pageNum++
            }
        },
        /* 获取详情 */
        async getDetail (itemId, id) {
            let res = await this.ajax.get(`risk/server/consensus/detail/${id}`)
            if (res.code === '200') {
                this.detail = [JSON.parse(res.data.content)]
                this.componentsName = 'a' + itemId
                this.isDialog = true
            }
        },
    },
    beforeDestroy () {
        document.querySelector('.content').removeEventListener('scroll', this.handleScroll, false)
    }
}
</script>

<style lang="less" >
.light {
    .qg-yuqing {
        font-family: PingFangSC-Regular;
        /deep/ .el-checkbox .el-checkbox__label {
            width: 62px;
        }
        .more {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #4064d4;
            letter-spacing: 0.39px;
            &:hover {
                cursor: pointer;
            }
        }

        .el-form--inline .el-form-item {
            margin-right: 14px;
        }
        .list-content .bd {
            padding: 0;
            border: none;
            background: #03122c;
        }

        .c-radio-group {
            .el-radio-button {
                box-shadow: none !important;
            }
            .el-radio-button__inner {
                background: #e2f8fa;
                color: #1db5c3;
                box-shadow: none;
                border: 1px solid #e2f8fa;
                &:hover {
                    color: #fff !important;
                    background: #1db5c3;
                    border-color: #1db5c3;
                }
            }
            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
                color: #292b2f;
                background: #e2f8fa;
                border-color: #e2f8fa;
                box-shadow: none;
            }
            .el-radio-button + .el-radio-button {
                margin-left: 2px;
            }
            .el-radio-button:first-child .el-radio-button__inner,
            .el-radio-button:last-child .el-radio-button__inner {
                // border-left:none;
                border-radius: 0;
            }
            .el-radio-button--mini .el-radio-button__inner {
                padding: 4px;
                font-size: 10px;
            }
            .el-radio-button__inner:hover {
                color: #292b2f;
            }
        }
        .fc-b {
            color: #4064d4;
        }

        .list-title1 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #4064d4;
            letter-spacing: 0.54px;
            height: 40px;
            line-height: 40px;
            background: #fff;
            color: #666;
            padding-left: 15px;
        }
        .list-title {
            font-family: PingFangSC-Regular;
            letter-spacing: 0.62px;
            font-size: 16px;
            color: #666;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
            background: #f6f7fb;
        }
        .list {
            .list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #666;
                padding: 16px 53px 16px 27px;
                background: #fff;
                border-bottom: 1px solid #dcdfe6;
                &:hover {
                    background: #ebecf3;
                    border: 1px solid #4064d4;
                }

                .list-hd {
                    .tag-num {
                        background: #4064d4;
                        border: 1px solid #4064d4;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        color: #fff;
                    }
                }
                .list-bd {
                    flex: 1;
                    padding-left: 10px;
                    font-size: 10px;
                    .title {
                    }
                    .sub-title {
                        padding-top: 8px;
                        font-size: 10px;
                        color: #888888;
                        font-family: PingFangSC-Regular !important;
                    }
                }
                .list-fd {
                    font-family: PingFangSC-Regular;
                    display: flex;
                    align-items: center;
                }
            }
            .list-item + .list-item {
                margin-top: 1px;
            }
        }

        .float-right {
            position: fixed;
            right: 4px;
            top: calc(~'50% - 200px');
            z-index: 999;
            transform: translateX(376px);
            transition: transform 0.5s 0s;
            background: #fff;
            border: 1px solid #4064d4;
            width: 370px;
            height: 360px;
            &.act {
                transform: translateX(0);
                .fold-box {
                    background: url(~@/assets/images/light/laiyuantongjizhankai.png) no-repeat;
                }
            }
            .fold-box {
                cursor: pointer;
                position: absolute;
                left: -35px;
                top: 110px;
                width: 35px;
                height: 137px;
                display: inline-block;
                background: url(~@/assets/images/light/laiyuantongjishouqi.png) no-repeat;
                font-size: 12px;
                color: #17d7eb;
                line-height: 14px;
                text-align: right;
                span {
                    display: inline-block;
                    width: 14px;
                    padding-top: 40px;
                    margin-right: 5px;
                }
            }
            .title-box {
                position: absolute;
                top: 30px;
                left: 40px;
                width: 100%;
                height: 100px;
                text-align: left;
                z-index: 88;
                p {
                    margin: 0;
                    padding: 0;
                }
                .title {
                    color: #fff;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #ffffff;
                    line-height: 14px;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                .sub-title {
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #666;
                    line-height: 10px;
                }
            }

            .m-box {
                background-color: #03122c;
            }
        }
        #source-pie {
            width: 300px;
            height: 165px;
            margin-top: 130px;
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: all 0.5s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }

        .tag-btn {
            font-size: 12px;

            color: #1db5c3;
            background: #e2f8fa;
            border: 1px solid #e2f8fa;
            height: 20px;
            line-height: 18px;
            width: 48px;
            text-align: center;
            cursor: pointer;
            margin-left: 8px;
            vertical-align: baseline;
            &:hover {
                background: #1db5c3;
                color: #fff;
            }
            &.act {
                background: #1db5c3;
                color: #fff;
            }
        }

        .pie-box {
            position: relative;
            .circle {
                position: absolute;
                top: 31px;
                left: 49px;
                border: 1px solid #373737;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .txt1 {
                    font-size: 30px;
                    color: #4064d4;
                    text-align: center;
                }
                .txt2 {
                    font-size: 14px;
                    color: #ffffff;
                    text-align: center;
                }
            }
            .pie-list {
                position: absolute;
                right: 19px;
                bottom: 15px;
                .pie-item {
                    font-size: 14px;
                    color: #ffffff;
                    height: 20px;
                    line-height: 20px;
                }
                .pie-item + .pie-item {
                    margin-top: 10px;
                }
            }
        }
    }
}
.dark {
    .qg-yuqing {
        font-family: PingFangSC-Regular;
        /deep/ .el-checkbox .el-checkbox__label {
            width: 62px;
        }
        .more {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #43a1ac;
            letter-spacing: 0.39px;
            &:hover {
                cursor: pointer;
            }
        }

        .el-form--inline .el-form-item {
            margin-right: 14px;
        }
        .list-content .bd {
            padding: 0;
            border: none;
            background: #03122c;
        }

        .c-radio-group {
            .el-radio-button {
                box-shadow: none !important;
            }
            .el-radio-button__inner {
                background: #1e292e;
                color: #43a1ac;
                border-color: #43a1ac;
                box-shadow: none;
                border: 1px solid #43a1ac;
                &:hover {
                    color: #292b2f !important;
                    background: #43a1ac;
                    border-color: #43a1ac;
                }
            }
            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
                color: #292b2f;
                background: #43a1ac;
                border-color: #43a1ac;
                box-shadow: none;
            }
            .el-radio-button + .el-radio-button {
                margin-left: 2px;
            }
            .el-radio-button:first-child .el-radio-button__inner,
            .el-radio-button:last-child .el-radio-button__inner {
                // border-left:none;
                border-radius: 0;
            }
            .el-radio-button--mini .el-radio-button__inner {
                padding: 4px;
                font-size: 10px;
            }
            .el-radio-button__inner:hover {
                color: #292b2f;
            }
        }
        .fc-b {
            color: #43a1ac;
        }

        .list-title1 {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #43a1ac;
            letter-spacing: 0.54px;
            height: 40px;
            line-height: 40px;
            background: #242d30;
            color: #43a1ac;
            padding-left: 15px;
        }
        .list-title {
            font-family: PingFangSC-Regular;
            color: #d4d4d5;
            letter-spacing: 0.62px;
            font-size: 16px;
            color: #d4d4d5;
            height: 50px;
            line-height: 50px;
            padding-left: 30px;
        }
        .list {
            .list-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                padding: 16px 53px 16px 27px;
                background: #292b2f;
                &:hover {
                    background: #292b2f;
                    border: 1px solid #43a1ac;
                }

                .list-hd {
                    .tag-num {
                        background-image: linear-gradient(90deg, #27575d 0%, rgba(62, 108, 135, 0.26) 100%);
                        border: 1px solid #43a1ac;
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                    }
                }
                .list-bd {
                    flex: 1;
                    padding-left: 10px;
                    font-size: 10px;
                    .title {
                    }
                    .sub-title {
                        padding-top: 8px;
                        font-size: 10px;
                        color: #888888;
                    }
                }
                .list-fd {
                    font-family: PingFangSC-Regular;
                    display: flex;
                    align-items: center;
                }
            }
            .list-item + .list-item {
                margin-top: 1px;
            }
        }

        .float-right {
            position: fixed;
            right: 4px;
            top: calc(~'50% - 300px');
            z-index: 999;
            transform: translateX(376px);
            transition: transform 0.5s 0s;
            background: #1d1e23;
            border: 1px solid #43a1ac;
            width: 370px;
            height: 360px;
            &.act {
                transform: translateX(0);
                .fold-box {
                    background: url(~@/assets/images/fold.png) no-repeat;
                }
            }
            .fold-box {
                cursor: pointer;
                position: absolute;
                left: -35px;
                top: 110px;
                width: 35px;
                height: 137px;
                display: inline-block;
                background: url(~@/assets/images/unfold.png) no-repeat;
                font-size: 12px;
                color: #17d7eb;
                line-height: 14px;
                text-align: right;
                span {
                    display: inline-block;
                    width: 14px;
                    padding-top: 40px;
                    margin-right: 5px;
                }
            }
            .title-box {
                position: absolute;
                top: 30px;
                left: 40px;
                width: 100%;
                height: 100px;
                text-align: left;
                z-index: 88;
                p {
                    margin: 0;
                    padding: 0;
                }
                .title {
                    color: #fff;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #ffffff;
                    line-height: 14px;
                    font-size: 14px;
                    padding-bottom: 10px;
                }
                .sub-title {
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    color: #d1d2d3;
                    line-height: 10px;
                }
            }

            .m-box {
                background-color: #03122c;
            }
        }
        #source-pie {
            width: 300px;
            height: 165px;
            margin-top: 130px;
        }

        .fade-enter-active,
        .fade-leave-active {
            transition: all 0.5s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }

        .tag-btn {
            font-size: 12px;

            color: #43a1ac;
            background: #1e292e;
            border: 1px solid #43a1ac;
            height: 20px;
            line-height: 18px;
            width: 48px;
            text-align: center;
            cursor: pointer;
            margin-left: 8px;
            vertical-align: baseline;
            &:hover {
                background: #43a1ac;
                color: #292b2f;
            }
            &.act {
                background: #43a1ac;
                color: #292b2f;
            }
        }

        .pie-box {
            position: relative;
            .circle {
                position: absolute;
                top: 31px;
                left: 49px;
                border: 1px solid #373737;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                .txt1 {
                    font-size: 30px;
                    color: #43a1ac;
                    text-align: center;
                }
                .txt2 {
                    font-size: 14px;
                    color: #ffffff;
                    text-align: center;
                }
            }
            .pie-list {
                position: absolute;
                right: 19px;
                bottom: 15px;
                .pie-item {
                    font-size: 14px;
                    color: #ffffff;
                    height: 20px;
                    line-height: 20px;
                }
                .pie-item + .pie-item {
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>

