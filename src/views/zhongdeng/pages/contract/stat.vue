<template>
    <div class="wrap mt25">
        <div class="box-item">
            <div class="box-right">
                <div class="box-number">
                    {{ info.transferCountSum | numFormat}}
                </div>
                <div class="box-text">
                    登记次数
                </div>
            </div>
            <img :src="flag==='light'?require('@/assets/images/zhongdeng/l_note.png'):require('@/assets/images/zhongdeng/note.png')" alt="登记次数" class="box-img">
        </div>
        <div class="box-item">
            <div class="box-right">
                <div class="box-number">
                    {{ info.transferAmountSum | numFormat}}
                </div>
                <div class="box-text">
                    登记转让总金额
                </div>
            </div>
            <img :src="flag==='light'?require('@/assets/images/zhongdeng/l_amount.png'):require('@/assets/images/zhongdeng/amount.png')" alt="登记转让总金额" class="box-img">
        </div>
        <div class="box-item">
            <div class="box-right">
                <div class="box-number">
                    {{ info.projectNumSum | numFormat}}
                </div>
                <div class="box-text">
                    登记项目数
                </div>
            </div>
            <img :src="flag==='light'?require('@/assets/images/zhongdeng/l_count.png'):require('@/assets/images/zhongdeng/count.png')" alt="登记项目数" class="box-img">
        </div>
        <div class="box-item">
            <div class="box-right">
                <div class="box-number">
                    {{ info.financesAmountSum | numFormat }}
                </div>
                <div class="box-text">
                    登记融资总金额
                </div>
            </div>
            <img :src="flag==='light'?require('@/assets/images/zhongdeng/l_total.png'):require('@/assets/images/zhongdeng/total.png')" alt="登记融资总金额" class="box-img">
        </div>
    </div>
</template>
<script>
export default {
    props: {
        info: Object,
    },
    data() {
        return {};
    },
     computed: {
        flag: {
            get() {
                return this.$store.state.echart.flag
            },
        }
    },     
    methods: {}
};
</script>

<style lang="scss" scoped>
    .light {
        .box-item {
            background-image: linear-gradient(270deg, #f1f4fc 0%, #f1f4fc 100%);
        }
        .box-number {
            color: #4064d4;
            font-family: PingFang-SC-Regular;
        }
        .box-text {
            color: #666;
            font-family: PingFang-SC-Regular;
        }
    }
    .wrap {
        display: flex;
    }
    .box-item {
        background-image: linear-gradient(270deg, #233132 0%, #32373d 100%);
        width: 277px;
        height: 110px;
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .box-right {
        margin: 28px 0 0 20px;
        display: flex;
        flex-direction: column;
    }
    .box-number {
        font-family: PingFangSC-Light;
        font-size: 15px;
        color: #ffffff;
        letter-spacing: 0.7px;
        line-height: 26px;
    }
    .box-text {
        margin-top: 10px;
        font-family: PingFangSC-Light;
        font-size: 14px;
        color: #51b5bf;
        letter-spacing: 0.5px;
    }
    .box-img {
        margin: 28px 20px 0 0;
        width: 61px;
        height: 61px;
    }
</style>