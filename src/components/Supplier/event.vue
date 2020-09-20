<template>
    <div class=" pt20">
        <el-table :data="list" border>
            <el-table-column prop="a" label="舆情分类" width="150" show-overflow-tooltip></el-table-column>
            <el-table-column prop="b" label="标题" min-width="800" show-overflow-tooltip></el-table-column>
            <el-table-column prop="c" label="预警时间" width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" width="90" align="center" show-overflow-tooltip>
                <template>
                    <el-button type="text" plain @click="dialogVisible=true">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-if="dialogVisible" title="高管变动-新闻事件" :visible.sync="dialogVisible" width="35%">
            <div class="dialog-txt">
                深圳晚报讯(记者方壮芳通讯员隋钰)5月11日下午,由深圳市老年保健协会承办的深圳市科学技术学会自主创新大讲堂活动在深圳皇悦酒店五楼会议室举行。
            </div>
            <p class="original">查看原文<span class="el-icon-arrow-right"></span><a href="" target="_blank"></a></p>

        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['companyName'],
    data () {
        return {
            dialogVisible: false,
            list: []
        }
    },
    created () {
        if (this.companyName === '深圳市皇悦建材有限公司') {
            this.list = [
                {
                    a: '舆情',
                    b: '猴赛雷',
                    c: 'da',
                    url: 'https//:baidu.com'
                }
            ]
        } else if (this.companyName === '河南凯峰实业有限公司') {
            this.list = [
                {
                    a: '舆情',
                    b: '猴赛雷',
                    c: 'da',
                    url: 'https//:baidu.com'
                }
            ]
        } else if (this.companyName === '北京九联伟业投资发展有限公司') {
            this.list = [
                {
                    a: '舆情',
                    b: '猴赛雷',
                    c: 'da',
                    url: 'https//:baidu.com'
                }
            ]
        }
        this.list = [...this.list]
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
.dialog-txt {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #d3d3d4;
    line-height: 24px;
    text-indent: 2em;
}
.original {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #d3d3d4;
    line-height: 14px;
    margin-top: 20px;
    margin-bottom: 0;
    .el-icon-arrow-right {
        color: #d1d2d3;
        display: inline-block;
        margin: 0 5px;
    }
    a {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #43a1ac;
        line-height: 14px;
    }
}
/deep/ .el-dialog__title {
    font-size: 16px;
}
</style>
