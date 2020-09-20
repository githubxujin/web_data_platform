<template>
    <div class="pt20">
        <el-form :inline="true" ref="form" size="medium">
            <el-form-item>
                <el-date-picker v-model="dateValue" type="daterange" range-separator="至" start-placeholder="发布时间开始" end-placeholder="发布时间结束" clearable value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item class="laiyaun">
                <el-select v-model="params.source" filterable clearable placeholder="数据来源">
                    <el-option v-for="(v,i) in sourceList" :key="i" :label="v.accountName" :value="v.account"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input class="guanj" v-model="params.keyword" maxlength="100" placeholder="关键字" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="medium" @click="params.pageNum=1,getList()">查询</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>

        <ul class="list-content">

            <li v-for="(item, index) in list" :key="index">
                <router-link class="headline" :to="'/industryTrends/constructionTrends/dynamicDeatils?id='+item.id+'&keyword='+params.keyword+'&code=1'" target="_blank" v-html="item.title"></router-link>
                <el-tooltip class="item" effect="dark" :content="item.isCollect ? '取消收藏' : '点击收藏'" placement="top">
                    <span :class="['iconfont', item.isCollect ? 'icon-shujuzhongxin-yishoucang' : 'icon-shujuzhongxin-shoucang1','btn']" @click="toCollect(item.isCollect,item.id)"></span>
                </el-tooltip>
                <div>
                    <a :href="item.url" target="_blank">来源：{{item.sourceName}}>></a>
                    <span>{{item.businessDate}}</span>
                    <span><i class="iconfont icon-shujuzhongxin-yishoucang"></i>{{item.collectNum}}个收藏</span>
                </div>
                <p :class="{'hide-box': item.isHide}" ref="txt-box"><label class="list-cont" v-html="item.content"></label><span class="suffix"></span></p>
            </li>
        </ul>
        <el-pagination v-if="totalSize>0" @size-change="handleSizeChange" @current-change="getList" :current-page="params.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="params.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="totalSize"></el-pagination>
    </div>
</template>
<script>
export default {
    data () {
        return {
            totalSize: 0,
            isText: '',
            dateValue: '',
            params: {
                pageNum: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                source: '',
                keyword: ''
            },
            list: [],
            sourceList: [],
            color: '#FF8E36'
        }
    },
    created () {
        this.doSource()
        this.getList()
    },
    methods: {
        toCollect (v, id) {
            if (!v) {
                // 收藏
                this.$http('/dcp/server/wx/article/collect/add', { id }, { type: 'formdata' }).then(
                    res => {
                        if (res.code === '200') {
                            this.$message.success('收藏成功！')
                            // this.list.forEach(e => {
                            //     if (e.id === id) e.isCollect = !e.isCollect
                            // })
                            // this.list = [...this.list]
                            this.getList()
                        } else {
                            // this.$message.error('收藏失败！')
                            this.$message.error(res.message)
                        }
                    }
                )
            } else {
                //取消收藏
                this.$http('/dcp/server/wx/article/collect/cancel', { id }, { type: 'formdata' }).then(res => {
                    if (res.code === '200') {
                        this.$message.success('取消收藏成功！')
                        this.list.forEach(e => {
                            if (e.id === id) e.isCollect = !e.isCollect
                        })
                        this.list = [...this.list]
                        this.getList()
                    } else {
                        // this.$message.error('取消收藏失败！')
                        this.$message.error(res.message)
                    }
                })
            }
        },
        // 文章来源
        doSource () {
            this.$http(
                '/dcp/server/wx/account/select',
                {},
                { type: 'get' }
            ).then(res => {
                // console.log(res);
                this.sourceList = res.data
            })
        },
        getList (v) {
            if (v) {
                this.params.pageNum = v
            }
            this.$http('/dcp/server/wx/article/collect/list', this.params, {
                type: 'get'
            }).then(res => {
                this.list = res.data

                this.totalSize = res.meta.totalSize
                // this.$nextTick(() => {
                //     this.$refs['txt-box'].map((v, k) => {
                //         this.$set(this.list[k], 'isHide', false)
                //         if (v.clientHeight > 50) {
                //             // console.log(v.clientHeight);
                //             this.list[k].isHide = true
                //         }
                //     })
                // })
                // if (this.params.keyword) {
                //     this.$nextTick(() => {
                //         let col = document.querySelector('pdt1 ul li em')
                //         col.style.color = this.color
                //     })
                // }
            })
        },
        // 重置
        reset () {
            this.params = {
                pageNum: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                source: '',
                keyword: ''
            }
            this.getList()
        },
        handleSizeChange (v) {
            this.params.pageSize = v
            this.getList()
        }
    },
    watch: {
        dateValue (n, o) {
            if (n) {
                this.params.startTime = n[0]
                this.params.endTime = n[1]
            } else {
                this.params.startTime = ''
                this.params.endTime = ''
            }
        }
    },
    filters: {}
}
</script>
<style lang="less" scoped>
ul.list-content {
    padding-left: 0;
    margin-top: 0;
    background: #292b2f;
    padding: 20px 20px;
    li {
        &:hover {
            &:first-child {
                &::before {
                    content: '';
                    width: 1320px;
                    height: 142px;
                    border: 1px solid #43a1ac;
                    position: absolute;
                    left: -20px;
                    right: -20px;
                    top: -20px;
                }
            }
            &::before {
                content: '';
                width: 1320px;
                height: 142px;
                border: 1px solid #43a1ac;
                position: absolute;
                left: -20px;
                right: -20px;
                top: 0px;
            }
            &:last-child {
                &::before {
                    content: '';
                    width: 1320px;
                    height: 162px;
                    border: 1px solid #43a1ac;
                    position: absolute;
                    left: -20px;
                    right: -20px;
                }
            }
        }
        // padding: 14px;
        list-style: none;
        font-family: PingFangSC-Light;
        padding-top: 20px;
        border-bottom: 1px solid #1d1e23;
        position: relative;
        &:first-child {
            padding-top: 0;
            .btn {
                top: 0;
            }
        }
        &:last-child {
            border-bottom: 0;
        }
        .btn {
            position: absolute;
            top: 20px;
            right: 0;
            width: 28px;
            height: 28px;
            color: #43a1ac;
            border: 1px solid #366f71;
            border-radius: 2px;
            text-align: center;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
                color: #292b2f;
                background: #43a1ac;
                border-color: #43a1ac;
            }
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
        div {
            a {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #43a1ac;
                margin-right: 20px;
            }
            span {
                font-size: 12px;
                color: #d4d4d5;
                margin-right: 20px;
            }
            .icon-shujuzhongxin-yishoucang {
                color: #43a1ac;
                font-size: 12px;
                margin-right: 5px;
            }
        }
        p {
            width: 94%;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            color: #d3d3d4;
            letter-spacing: 0.54px;
            margin: 20px 0;
            font-size: 14px;
            .list-cont {
                font-size: 10px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                color: #d3d3d4;
                line-height: 20px;
            }
        }
        .hide-box {
            position: relative;
            height: 40px;
            overflow: hidden;
            .suffix {
                position: absolute;
                right: 0;
                bottom: 4px;
                display: inline-block;
                background: #fff;
                width: 24px;
                height: 14px;
                background: url(../../assets/images/dian.png) no-repeat;
            }
        }
        // .bgs {
        //     background: #edf6ff;
        // }
        // .bgs1 {
        //     background: #fff;
        // }
    }
}

.laiyaun {
    .el-select {
        width: 240px;
    }
}
.guanj {
    width: 380px;
}
</style>
<style lang="less">
em {
    &.high-light {
        font-style: normal;
        color: #ff8e36;
    }
}
</style>