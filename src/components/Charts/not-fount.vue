<template>
    <div>
        <div class="title">{{ title }}</div>
        <el-row type="flex" justify="center" align="middle" class="default-box pb60" :style="{height}">
            <img src="~@/assets/images/default.png">
            <div class="pt30 ml30 ">
                <p class="f16 ">暂无数据</p>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        height: String
    },

};
</script>
<style lang="scss" scoped>
.title {
    margin-top: 10px;
    text-align: left;
    padding-left: 30px;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 1.5px;
}
.f16 {
    color: #a0a3a8;
}
</style>