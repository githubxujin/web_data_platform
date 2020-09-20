<template>
    <div>
        <div class="n-title" v-if="title">{{ title }}</div>
        <div class="n-subtitle">{{ subtitle }}</div>
        <div class="n-table">
            <div :class="[item.alone ? 'n-wrap-alone' : 'n-wrap']" v-for="(item, index) in rows" :key="index">
                <div :class="[item.value && item.value.length > 100 ? 'n-key-long' : 'n-key']">
                    {{ item.key }}
                </div>
                <div :class="[item.value.length > 100 ? 'n-value-long' : 'n-value']" v-if="item.urlList">
                    <a :href="u.url" v-for="(u, i) in item.urlList" :key="i">{{u.name}}</a>
                </div>
                <div :class="[item.alone ? 'item n-value': 'n-value']" v-else>
                    <el-tooltip class="item" effect="dark" :content="item.value" placement="top-start" v-if="item.value  && item.value.length> 20">
                        <el-button>{{ item.value }}</el-button>
                    </el-tooltip>
                    <div v-else>

                        {{ item.value ? item.value+(item.unit ? item.unit : ''): "-" }}
                    </div>
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
        subtitle: String,
    },
    components: {},
    data () {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .n-value .el-button {
    background: none;
    border: none;
    font-family: PingFangSC-Light;
    color: #d3d3d4;
    letter-spacing: 1.01px;
    text-align: left;
    line-height: 42px;
    padding: 0;
    width: 260px;
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
/deep/ .el-button {
    background: none;
    border: none;
    font-family: PingFangSC-Light;
    color: #d3d3d4;
    letter-spacing: 1.01px;
    text-align: left;
    line-height: 42px;
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.el-button-tree {
    width: 200px;
}
.el-button-alone {
    width: 960px;
}
/deep/ .el-button-alone-long {
    span {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        white-space: normal;
    }
    width: 1123px;
    height: 60px;
    line-height: 20px;
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
    .n-key-long {
        width: 157px;
        background: #292b2f;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #a0a3a8;
        letter-spacing: 0.44px;
        height: 92px;
        line-height: 92px;
        text-indent: 20px;
    }
    .n-value-long {
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #d3d3d4;
        letter-spacing: 0.44px;
        height: 92px;
        line-height: 50px;
        text-indent: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
    }
}
.n-wrap {
    border-bottom: 1px solid #54575c;
    display: flex;
    flex-basis: 33.33%;
}
.n-wrap-alone {
    border-top: 1px solid #54575c;
    border-bottom: 1px solid #54575c;
    display: flex;
    flex-basis: 100%;
    margin-top: -1px;
}
</style>
