<template>
    <div>
        <div class="n-title" v-if="title">{{ title }}</div>
        <div class="n-subtitle">{{ subtitle}}</div>
        <div class="n-table">
            <div :class="[item.alone ? 'n-wrap-alone' : 'n-wrap']" v-for="(item,index) in rows" :key="index">
                <div class="n-key">{{item.key}}</div>
                <div class="n-value" v-if="item.urlList">
                    <a :href="u.url" v-for="(u,i) in item.urlList" :key="i" target="_blank">{{u.name}}</a>
                </div>
                <div :class="[item.alone ? 'item n-value': 'n-value']" v-else>
                    <el-tooltip class="item" effect="dark" :content="item.value" placement="top-start" v-if="item.value && item.value.length>30">
                        <el-button>{{item.value}}</el-button>
                    </el-tooltip>
                    <div v-else>{{item.value ? item.value : '-'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        rows: Array,
        title: String,
        subtitle: String
    },
    components: {},
    data () {
        return {};
    },
    methods: {}
};
</script>


<style lang="scss" scoped>
/deep/ .n-value .el-button {
    background: none;
    border: none;
    font-family: PingFangSC-Light;
    color: #d3d3d4;
    letter-spacing: 1.01px;
    text-align: left;
    line-height: 42px;
    padding: 0;
    width: 380px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
/deep/ .item .el-button {
    background: none;
    border: none;
    font-family: PingFangSC-Light;
    color: #d3d3d4;
    letter-spacing: 1.01px;
    text-align: left;
    line-height: 42px;
    padding: 0;
    width: 1000px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
a {
    color: #43a1ac;
    margin-right: 60px;
}
.n-subtitle {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
    margin-bottom: 20px;
}
.n-title {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0.5px;
    line-height: 16px;
    margin-bottom: 20px;
}
.n-table {
    border-top: 1px solid #54575c;
    border-left: 1px solid #54575c;
    border-right: 1px solid #54575c;
    display: flex;
    flex-wrap: wrap;
    .n-key {
        width: 157px;
        background: #292b2f;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 0.44px;
        height: 49px;
        line-height: 50px;
        text-indent: 20px;
    }
    .n-value {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #d3d3d4;
        letter-spacing: 0.44px;
        height: 50px;
        line-height: 50px;
        text-indent: 20px;
    }
}
.n-wrap {
    border-bottom: 1px solid #54575c;
    display: flex;
    flex-basis: 50%;
}
.n-wrap-alone {
    border-bottom: 1px solid #54575c;
    display: flex;
    flex-basis: 100%;
    .el-button {
        width: 1067px;
    }
}
</style>
