<template>
    <div class="stat">
        <!-- <c-Bread class="deta-nav" :list="[{text:txt, path:'/industryTrends/constructionTrends'},{text:'详情'}]"></c-Bread> -->
        <el-row class="mainContent">
            <div class="mod pds">
                <div class="info" v-if="!details.contentHtml">
                    <h3>{{details.title}}</h3>
                    <p><span style="margin-right:10px;">{{details.businessDate}}</span> 来源：<a :href="details.url" target="_blank">{{details.source}}</a></p>
                    <div class="content-d">{{details.content}}</div>
                </div>
                <div class="content-h" v-else v-html="details.contentHtml"></div>
                <div class="collect-btn">
                    <el-button type="primary" size="mini" class="btn" :class="{'bgs': details.isCollect}" @click="toCollect(details.isCollect,params.id),details.isCollect = !details.isCollect">
                        {{details.isCollect ? '取消收藏' : '+ 收藏'}}</el-button>
                </div>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isCollect: true,
            params: {
                id: '',
                keyword: ''
            },
            details: {
                title: '',
                contentHtml: '',
                content: '',
                businessDate: '',
                source: '',
                url: '',
                isCollect: ''
            },
            txt: '',
            code: '',
        }
    },
    created() {
        // console.log(this.$route.query);
        this.params.id = this.$route.query.id
        this.params.keyword = this.$route.query.keyword
        this.code = this.$route.query.code
        if (this.code === '0') {
            this.txt = '动态列表'
        } else {
            this.txt = '收藏列表'
        }
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.ajax.get('/dcp/server/wx/article/detail', this.params).then(res => {
                // logger.info(res);
                this.details = res.data
                // if ( this.params.keyword ){
                this.$nextTick(() => {
                    let cor = document.querySelector('#js_name')
                    cor.style.color = '#0486FE'
                    cor.setAttribute('href', res.data.url)
                    cor.setAttribute('target', '_blank')
                })
                // }
            })
        },
        toCollect(v, id) {
            if (!v) {
                // 收藏
                this.ajax.post('/dcp/server/wx/article/collect/add', { id }).then(res => {
                    if (res.code === '200') {
                        this.$message.success('收藏成功！')
                        this.getList()
                    } else {
                        this.$message.error('收藏失败！')
                    }
                })
            } else {
                //取消收藏
                this.ajax.post('/dcp/server/wx/article/collect/cancel', { id }).then(res => {
                    if (res.code === '200') {
                        this.$message.success('取消收藏成功！')
                        this.getList()
                    } else {
                        this.$message.error('取消收藏失败！')
                    }
                })
            }
        },
    },
}
</script>
<style lang="less" scoped>
.stat {
    // .deta-nav {
    //     /deep/ .nav-title {
    //     .mr5 {
    //         &:nth-of-type(1) {
    //             em.c_O {
    //                 color: #606266;
    //             }
    //         }
    //     }
    // }
    // }

    .pds {
        min-height: calc(~"100vh - 130px");
        padding: 0 290px;
        position: relative;
        box-sizing: border-box;
    }
    .info {
        margin-top: 30px;
        text-align: center;
        h3 {
            font-size: 18px;
        }
        p {
            margin: 30px auto;
            color: #909399;
            a {
                color: #0486fe;
            }
        }
        .content-d {
            line-height: 32px;
            text-indent: 2em;
            text-align: justify;
            font-size: 16px;
        }
    }
    .content-h {
        margin-top: 30px;
        text-align: center;
        img {
            display: none;
        }
        #meta_content {
            margin: 5px 0 20px;
        }
    }
    .collect-btn {
        position: absolute;
        top: 30px;
        right: 20px;
        .bgs {
            background: #edf6ff;
        }
    }
}
</style>
<style lang="less">
em {
    &.high-light {
        font-style: normal;
        font-weight: 550;
        color: #ff8e36;
    }
}

#js_content {
    visibility: inherit !important;
}
</style>
