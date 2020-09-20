<template>
    <div>
        <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
            <li v-for="(item,index) in list" :key="index">
                <div class="tabs-title mt30">{{item.authorName}}</div>
                <div class="content">
                    <span class="small_title">地址：</span>
                    <span class="small_title">{{item.authorAddress || '-'}}</span>
                </div>
                <div class="content">
                    <span class="small_title">邮编：</span>
                    <span class="small_title">{{item.authorPostcode || '-'}}</span>
                </div>
                <div class="content">
                    <span class="small_title">电话：</span>
                    <span class="small_title">{{item.authorPhone || '-'}}</span>
                </div>
                <div class="content">
                    <span class="small_title">传真：</span>
                    <span class="small_title">{{item.authorFax || '-'}}</span>
                </div>
                <div class="content">
                    <span class="small_title">E-mail:</span>
                    <span class="small_title">-</span>
                </div>

            </li>
        </ul>

    </div>
</template>

<script>
export default {
    props: {
        portName: String
    },
    data() {
        return {
            list: [],
        }
    },
    created() {
        this.getList()
    },
    methods: {
        load() {
            this.count += 2
        },
        getList() {
            this.ajax
                .json('/dcp/port/author/list', { portName: this.portName }, { type: 'get' })
                .then(res => {
                    this.list = res.data;
                });
        }
    },
}
</script>

<style lang="scss" scoped>
    /deep/ .el-tabs.el-tabs--top.el-tabs--border-card {
        background: #232528;
    }
    .infinite-list {
        // height: 594px;
        width: 100%;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        li {
            list-style: none;
        }
    }
    .title {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #43a1ac;
        line-height: 14px;
        margin-top: 30px;
        margin-bottom: 10px;
    }
    .content {
        font-size: 14px;
        line-height: 20px;
    }
    .dark{
        .content {
            color: rgba(255, 255, 255, 0.8);
            font-family: PingFangSC-Light;
        } 
    }
    .light{
        .content {
            color: #666;
            font-family: "PingFang-SC-Regular";
        } 
    }
</style>
