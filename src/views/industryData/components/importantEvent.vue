<template>
    <div class="page qg-yuqing">
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

                                        <el-radio-group v-if="val.major*1" v-model="val.connectType" @change="v=>{ [val.update? setTagAudit('1',v,val,[k,i,key]) : ''] } " size="mini" :disabled="true">
                                            <el-radio-button label="1">强</el-radio-button>
                                            <el-radio-button label="2">弱</el-radio-button>
                                            <el-radio-button label="3">无</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                    <template v-if="val.archiveResult == 3">
                                        <div class="tag-btn" :disabled="true"><i class="iconfont icon-shujuzhongxin-zhengchang"></i>正常</div>
                                        <div class="tag-btn"><i class="iconfont icon-shujuzhongxin-guanzhu"></i>关注</div>
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
        <div class="tabs-title pt20 mb20">不良行为记录</div>
        <el-table :data="badList" border>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="badBehaviorType" label="不良类型" show-overflow-tooltip :formatter="formatLabel"></el-table-column>
            <el-table-column prop="badBehaviorText" label="不良明细" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column prop="organizationName" label="判定单位" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column prop="inDate" label="判定时间" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column prop="commonStatus" label="状态" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column prop="reason" label="原因" show-overflow-tooltip :formatter="formatLabel"> </el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" plain size="small" @click="detail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {

    props: {
        companyName: String,
    },
    data () {
        return {
            isTop: false,
            isLoad: false,
            isNoData: false,
            params: {
                "customerName": "", // 企业名称
                "startTime": '', //this.formatDate(new Date), // 开始时间
                "endTime": '', // 结束时间
                "hasRead": "", // 是否已读  1:是 0:否
                "itemIds": [], //舆情id串, 逗号隔开
                "pageNum": 1, // 1
                "pageSize": 10 // 20
            },
            list: [],
            badList: [],
        }
    },
    mounted () {

    },
    created () {
        this.$nextTick(() => {

            /* 滚动分页 */
            document.querySelector('.main').addEventListener('scroll', this.handleScroll, false)
        })
        this.getList()
        this.getBadList()
    },
    methods: {
        getBadList () {
            this.params.companyName = this.companyName;
            this.ajax
                .json('/dcp/pre/credit/company/bad/list', this.params, { type: 'get' })
                .then(res => {
                    this.badList = res.data;
                });
        },
        handleScroll () {
            let dom = document.querySelector('.main ')
            let dom_div = document.querySelector('.page')
            this.isTop = dom.scrollTop > 400

            if (this.isLoad) return
            if ((dom.scrollTop + window.innerHeight) >= dom_div.offsetHeight - 100) {
                this.isLoad = true
                this.getList()
            }
        },
        getTagName (name) {
            return name.split('-')[1].charAt()
        },
        async getList () {

            this.params.customerName = this.companyName
            this.isNoData = false
            let res = await this.ajax.get('risk/server/consensus/page/list', { ...this.params }, { isLoading: !this.isLoad })
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
        detail (row) {
            this.$router.push({ name: 'importantEventDetail', query: { data: JSON.stringify(row) } });
        }
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

