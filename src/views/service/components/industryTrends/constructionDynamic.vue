<template>
    <div>
        <div class="pt20">
            <!-- 搜索详情 -->
            <el-form :inline="true" ref="form" size="medium" class="el-serach-form">
                <el-form-item class='el-item-form-width'>
                    <el-input v-model="params.keyword" clearable placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="dateValue" type="daterange" range-separator="至" start-placeholder="发布时间开始" end-placeholder="发布时间结束" clearable value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="params.source" filterable clearable placeholder="数据来源">
                        <el-option v-for="(v,i) in sourceList" :key="i" :label="v.accountName" :value="v.account"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="width: 193px; display:none;">
                    <el-select v-model="params.industryType" clearable disabled placeholder="标签搜索" @change="industryTypeChange">
                        <el-option v-for="(s, index) in officialTypeList" :label="s.label" :value="s.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <div class="childform" v-if="fixLabelSelectList.length!==0">
                    <el-form-item class='el-item-form-width' label-width="100" v-for="(item,index) in fixLabelSelectList" :key="index">
                        <el-select v-model="params.idList['id'+index]" clearable placeholder="标签搜索" @change="((val)=>{industryTypeChange2(val,index)})">
                            <el-option :label="j.name" :value="j.id" v-for="(j, k) in item" :key="'j'+k"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" size="medium" @click="getList">查询</el-button>
                    <el-button type="info" size="medium" @click="reSet">重置</el-button>
                </el-form-item>
            </el-form>
            <!-- 列表详情 -->
            <ul class="list-content" v-if="list && list.length > 0">
                <li v-for="(item, index) in list" :key="index">
                    <div class="content_left">
                        <div class="content_left_title" :class="{'jingying':index%3===0,'zhengce':index%3===1,'xiangmu':index%3===2}" v-if="item.tag">
                            <el-tooltip class="item" effect="dark" :content="item.tag" placement="top-start">
                                <el-button class="type">{{item.tag}}</el-button>
                            </el-tooltip>
                            <div class="triangle"></div>
                            <div class="quan"></div>
                        </div>
                        <div class="content_left_time">{{item.businessDate}}</div>
                    </div>
                    <div class="content_right">
                        <a class="headline" :href="item.url" target="_blank" v-html="item.title"></a>
                        <div class="div">
                            <a :href="item.url" target="_blank">来源：{{item.sourceName}}>></a>
                            <img src="../../../../assets/images/industryTrends/constructionDynamic_logo.png" alt="">
                            <span>{{item.keyword}}</span>
                        </div>
                        <p :class="{'hide-box': item.isHide}" ref="txt-box"><label class="list-cont" v-html="item.content"></label><span class="suffix"></span></p>

                        <el-tooltip effect="dark" :content="item.isCollect ? '取消收藏' : '点击收藏'" placement="top">
                            <span class="item" @click="toCollect(item.isCollect,item.id)">
                                <i :class="['iconfont', item.isCollect ? 'icon-shujuzhongxin-yishoucang' : 'icon-shujuzhongxin-shoucang1','btn']"></i>
                                <span class="lookText">在看 {{item.collectNum}}</span>
                            </span>
                        </el-tooltip>

                    </div>

                </li>
            </ul>
            <el-pagination v-if="totalSize>params.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
            </el-pagination>
            <div class="noList" v-else>
                <not-found />
            </div>
        </div>
    </div>
</template>

<script>
import { officialTypeList, deepClone } from "@/utils/common"
export default {
    components: {
        'not-found': () => import("@/components/Charts/not-fount.vue")
    },
    data () {
        return {
            officialTypeList,
            fixLabelSelectList: [],
            params: {
                pageNum: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                source: '',
                keyword: '',
                industryType: '',
                idList: {
                    id0: "",
                },
            },
            sourceList: [],
            dateValue: [],
            list: [],
            totalSize: 0,
        }
    },
    created () {

        this.$emit('getList', this.params, () => {
            if (this.list.length !== 0) {
                this.$nextTick(() => {
                    this.$refs['txt-box'].map((v, k) => {
                        this.$set(this.list[k], 'isHide', false)
                        if (v.clientHeight > 50) {
                            this.list[k].isHide = true
                        }
                    })

                })
            }
        })
        this.doSource(this.params.industryType)
    },

    methods: {
        // 监听标签搜索
        industryTypeChange (industryType) {
            this.fixLabelSelectList = []
            this.params.idList = {}
            this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id: 0, industryType }, { type: "get" }).then(res => {
                if (res.data.length > 0) {
                    this.$set(this.fixLabelSelectList, 0, res.data)
                }
            })
        },
        // 监听子标签
        industryTypeChange2 (id, index) {
            this.params.idList['id' + (index + 1)] = ""
            this.fixLabelSelectList = this.fixLabelSelectList.slice(0, index + 1)
            let idListLength = Object.getOwnPropertyNames(this.params.idList).length
            for (let i = index + 1; i < idListLength; i++) {
                delete this.params.idList['id' + i]
            }
            if (id) {
                this.ajax.json(`/dcp/select/wx/warn/rule/children`, { id, industryType: this.params.industryType }, { type: "get" }).then(res => {
                    if (res.data.length > 0) {
                        this.$set(this.fixLabelSelectList, index + 1, res.data)
                    }
                })
            }

        },
        // 文章来源
        doSource (industryType) {
            this.$http(
                '/dcp/server/wx/account/select',
                { industryType },
                { type: 'get' }
            ).then(res => {
                this.sourceList = res.data
            })
        },
        getList () {
            let nameList = {}
            for (let i = 0; i < this.fixLabelSelectList.length; i++) {
                for (let j = 0; j < this.fixLabelSelectList[i].length; j++) {
                    if (this.params.idList['id' + i] === this.fixLabelSelectList[i][j].id) {
                        nameList['name' + i] = this.fixLabelSelectList[i][j].name
                    }
                }
            }
            let tagArr = []
            for (let key in nameList) {
                tagArr.push(nameList[key])
            }
            let tag = tagArr.toString()
            let params = deepClone(this.params)
            delete params.idList
            delete params.nameList

            this.$http('/dcp/server/wx/article/list', {
                tag,
                ...params
            }, {
                type: 'get'
            }).then(res => {
                this.list = res.data || []
                this.totalSize = res.meta.totalSize
                if (this.list.length !== 0) {
                    this.$nextTick(() => {
                        this.$refs['txt-box'].map((v, k) => {
                            this.$set(this.list[k], 'isHide', false)
                            if (v.clientHeight > 50) {
                                this.list[k].isHide = true
                            }
                        })
                    })
                }
            })
        },
        // 收藏
        toCollect (v, id) {
            if (!v) {
                // 收藏
                this.$http('/dcp/server/wx/article/collect/add', { id }, { type: 'formdata' }).then(
                    res => {
                        if (res.code === '200') {
                            this.$message.success('收藏成功！')
                            this.list.forEach(e => {
                                if (e.id === id) e.isCollect = !e.isCollect
                            })
                            this.list = [...this.list]
                            this.getList()
                        } else {
                            this.$message.error('收藏失败！')
                        }
                    }
                )
            } else {
                //取消收藏
                this.$http('/dcp/server/wx/article/collect/cancel', {
                    id
                }, { type: 'formdata' }).then(res => {
                    if (res.code === '200') {
                        this.$message.success('取消收藏成功！')
                        this.list.forEach(e => {
                            if (e.id === id) e.isCollect = !e.isCollect
                        })
                        this.list = [...this.list]
                        this.getList()
                    } else {
                        this.$message.error('取消收藏失败！')
                    }
                })
            }
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        },
        handleCurrentChange (v) {
            this.params.pageNum = v
            this.getList()
        },
        // 重置
        reSet () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                source: '',
                keyword: '',
                industryType: '',
                idList: {
                    id0: "",
                },
            }
            this.dateValue = []
            this.getList()
        }
    },
    watch: {
        dateValue (n, o) {
            if (n && n.length > 0) {
                this.params.startTime = n[0]
                this.params.endTime = n[1]
            } else {
                this.params.startTime = ''
                this.params.endTime = ''
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.light {
    ul.list-content {
        padding-left: 0;
        li {
            list-style: none;
            display: flex;
        }
    }
    .content_left {
        width: 101px;
        border-right: 1px solid #d2d9e5;
        padding-left: 20px;
        padding-top: 18px;
        position: relative;
        .content_left_title {
            width: 65px;
            height: 24px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #d1d2d3;
            letter-spacing: 0;
            margin-bottom: 10px;
            border-radius: 2px;
            position: relative;
            text-align: center;
            line-height: 24px;
            .type {
                width: 65px;
                height: 24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                border: none;
                background: none;
                &.el-button {
                    padding: 6px 0;
                    color: #fff;
                }
            }
            &.jingying {
                background: #4064D4;
                .triangle {
                    border-bottom: 10px solid #4064D4;
                }
                .quan {
                    border: 2px solid #4064D4;
                }
            }
            &.zhengce {
                background: #FBB148 ;
                .triangle {
                    border-bottom: 10px solid #FBB148;
                }
                .quan {
                    border: 2px solid #FBB148;
                }
            }
            &.xiangmu {
                background: #36C2CF;
                .triangle {
                    border-bottom: 10px solid #36C2CF;
                }
                .quan {
                    border: 2px solid #36C2CF;
                }
            }
            .triangle {
                width: 0;
                height: 0;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                transform: rotate(90deg);
                position: absolute;
                top: 7px;
                right: -17px;
            }
            .quan {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                position: absolute;
                top: 6px;
                right: -41px;
            }
        }

        .content_left_time {
            font-size: 12px;
            color: #666;
            letter-spacing: 0.47px;
        }
    }
    .content_right {
        flex: 1;
        margin-left: 21px;
        background: #f1f4fc;
        width: 1216px;
        height: 122px;
        padding: 20px 20px 0 20px;
        position: relative;
        margin-bottom: 10px;
        border: 1px solid #f1f4fc;
        &:hover {
            border: 1px solid #4064d4;
        }
        .headline {
            position: relative;
            font-family: PingFangSC-Regular;
            display: inline-block;
            font-size: 14px;
            color: #4064d4;
            line-height: 26px;
            margin-bottom: 5px;
            &:hover {
                color: #4064d4;
                text-decoration: underline;
            }
        }
        .div {
            a {
                margin-right: 20px;
                font-size: 12px;
                color: #666;
                letter-spacing: 0.47px;
                line-height: 12px;
            }
            span {
                margin-right: 20px;
                font-size: 12px;
                color: #666;
                letter-spacing: 0.47px;
                line-height: 12px;
            }
            img {
                display: inline-block;
                width: 10.5px;
                height: 8.4px;
                padding-top: 2px;
            }
        }
        p {
            width: 100%;
            color: #d3d3d4;
            letter-spacing: 0.54px;
            margin: 10px 0 0 0;
            font-size: 14px;

            .list-cont {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-size: 12px;
                color: #666;
                line-height: 18px;
            }
        }
        .hide-box {
            position: relative;
            height: 40px;
            overflow: hidden;
        }
        .item {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 62px;
            height: 20px;
            background: #fff;

            padding: 7px 0 0 6px;
            display: inline-block;
            border: 1px solid #4064d4;
            cursor: pointer;
            .icon-shujuzhongxin-yishoucang,
            .icon-shujuzhongxin-shoucang1 {
                color: #4064d4;
                font-size: 12px;
            }
            .lookText {
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #4064d4;
                letter-spacing: 0.39px;
                margin-right: 0px;
            }
        }
    }
    .childform {
        display: inline-block;
    }
    .noList {
        text-align: center;
    }
}
.dark {
    ul.list-content {
        padding-left: 0;
        li {
            list-style: none;
            display: flex;
        }
    }
    .content_left {
        width: 101px;
        border-right: 1px solid #292b2f;
        padding-left: 20px;
        padding-top: 18px;
        position: relative;
        .content_left_title {
            width: 65px;
            height: 24px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #d1d2d3;
            letter-spacing: 0;
            margin-bottom: 10px;
            border-radius: 2px;
            position: relative;
            text-align: center;
            line-height: 24px;
            .type {
                width: 65px;
                height: 24px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                border: none;
                background: none;
                &.el-button {
                    padding: 6px 0;
                    color: #d1d2d3;
                }
            }
            &.jingying {
                background: #293749;
                .triangle {
                    border-bottom: 10px solid #293749;
                }
                .quan {
                    border: 2px solid #4181cf;
                }
            }
            &.zhengce {
                background: #473e2d;
                .triangle {
                    border-bottom: 10px solid #473e2d;
                }
                .quan {
                    border: 2px solid #a98430;
                }
            }
            &.xiangmu {
                background: #2a3f3f;
                .triangle {
                    border-bottom: 10px solid #2a3f3f;
                }
                .quan {
                    border: 2px solid #319a8a;
                }
            }
            .triangle {
                width: 0;
                height: 0;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                transform: rotate(90deg);
                position: absolute;
                top: 7px;
                right: -17px;
            }
            .quan {
                width: 6px;
                height: 6px;
                border-radius: 50%;
                position: absolute;
                top: 6px;
                right: -41px;
            }
        }

        .content_left_time {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #d1d2d3;
            letter-spacing: 0.47px;
        }
    }
    .content_right {
        flex: 1;
        margin-left: 21px;
        background: #292b2f;
        width: 1216px;
        height: 122px;
        padding: 20px 20px 0 20px;
        position: relative;
        margin-bottom: 10px;
        border: 1px solid #292b2f;
        &:hover {
            border: 1px solid #43a1ac;
        }
        .headline {
            position: relative;
            font-family: PingFangSC-Regular;
            display: inline-block;
            font-size: 14px;
            color: #43a1ac;
            line-height: 26px;
            margin-bottom: 5px;
            &:hover {
                color: #43a1ac;
                text-decoration: underline;
            }
        }
        .div {
            a {
                margin-right: 20px;
                opacity: 0.6;
                font-family: PingFangSC-Light;
                font-size: 12px;
                color: #a0a3a8;
                letter-spacing: 0.47px;
                line-height: 12px;
            }
            span {
                margin-right: 20px;
                opacity: 0.6;
                font-family: PingFangSC-Light;
                font-size: 12px;
                color: #a0a3a8;
                letter-spacing: 0.47px;
                line-height: 12px;
            }
            img {
                display: inline-block;
                width: 10.5px;
                height: 8.4px;
                padding-top: 2px;
            }
        }
        p {
            width: 100%;
            color: #d3d3d4;
            letter-spacing: 0.54px;
            margin: 10px 0 0 0;
            font-size: 14px;

            .list-cont {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                font-family: PingFangSC-Light;
                font-size: 12px;
                color: #a0a3a8;
                line-height: 18px;
            }
        }
        .hide-box {
            position: relative;
            height: 40px;
            overflow: hidden;
        }
        .item {
            position: absolute;
            right: 16px;
            top: 16px;
            width: 62px;
            height: 20px;
            background: #1e292e;
            padding: 7px 0 0 6px;
            display: inline-block;
            border: 1px solid #43a1ac;
            cursor: pointer;
            .icon-shujuzhongxin-yishoucang,
            .icon-shujuzhongxin-shoucang1 {
                color: #43a1ac;
                font-size: 12px;
            }
            .lookText {
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #43a1ac;
                letter-spacing: 0.39px;
                margin-right: 0px;
            }
        }
    }
    .childform {
        display: inline-block;
    }
    .noList {
        text-align: center;
    }
}
</style>
