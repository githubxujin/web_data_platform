<template>
    <div class="stat">
        <div class="stat-wrap">
            <div class="stat-left">
                <div class="stat-left-img"></div>
                <div class="stat-left-content">
                    <div class="stat-left-number">
                        {{ statList.count | numFormat}}
                    </div>
                    <div class="stat-left-text">
                        累计收录医院
                    </div>
                </div>
            </div>
            <div class="stat-right">
                <div class="stat-right-wrap">
                    <div class="stat-right-img1"></div>
                    <div class="stat-right-text">
                        <p>{{sanjia | numFormat}}</p>
                        <p>三级甲等</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="stat-right-wrap">
                    <div class="stat-right-img1"></div>
                    <div class="stat-right-text">
                        <p>{{sanyi | numFormat}}</p>
                        <p>三级乙等</p>
                    </div>
                </div>
                <div class="line"></div>
                <div class="stat-right-wrap">
                    <div class="stat-right-img1"></div>
                    <div class="stat-right-text">
                        <p>{{sanbing | numFormat}}</p>
                        <p>三级丙等</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            statList: {
                ztCount: 0,
                count: 0,
                zjCount: 0,
                ztjCount: 0,
                zjtCount: 0,
                otherCount: 0
            },
            sanjia: '',
            sanyi: '',
            sanbing: ''
        };
    },
    created () {
        this.getStat();
    },
    methods: {
        getStat () {
            this.$http("/dcp/query/hospital/count", {}, { type: "get" }).then(
                res => {
                    this.statList = res.data;
                    this.statList.levelCount.forEach((item, index) => {
                        if (item.hospitalLevel === "三级甲等") {
                            this.sanjia = item.count
                        }
                        else if (item.hospitalLevel === "三级乙等") {
                            this.sanyi = item.count
                        }
                        else if (item.hospitalLevel === "三级丙等") {
                            this.sanbing = item.count
                        }
                    })
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.dark {
    .stat {
        font-family: PingFangSC-Light;
        .stat-wrap {
            height: 137px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
        }

        &-left {
            width: 408px;
            background-image: linear-gradient(90deg, #32373d 0%, #233132 100%);
            display: flex;
            &-img {
                margin-top: 24px;
                margin-left: 54px;
                background: url('../../assets/images/capital1.png') no-repeat;
                width: 90px;
                height: 90px;
            }
            &-content {
                margin-top: 35px;
                margin-left: 38px;
                display: flex;
                flex-direction: column;
            }
            &-number {
                font-size: 30px;
                color: #ffffff;
                letter-spacing: 0.88px;
                line-height: 26px;
            }
            &-text {
                margin-top: 16px;
                font-size: 16px;
                color: #51b5bf;
                letter-spacing: 1.53px;
                line-height: 22px;
            }
        }
        .stat-right {
            width: 933px;
            height: 137px;
            background: #232528;
            display: flex;
            justify-content: space-between;
            text-align: center;
            padding: 30px 80px;
            box-sizing: border-box;
            &-wrap {
                display: flex;
            }
            &-img1 {
                margin-right: 20px;
                width: 65px;
                height: 65px;
                background: url('../../assets/images/capital2.png') no-repeat;
            }
            .stat-right-text {
                color: #449fa8;
                width: 57px;
                height: 66px;
                vertical-align: middle;
            }
            .stat-right-text p:nth-child(1) {
                font-size: 30px;
                margin-top: -2px;
                margin-bottom: 8px;
                color: #fff;
            }
            .stat-right-text p:nth-child(2) {
                font-size: 14px;
            }
        }
    }
    .line {
        border-right: 1px solid #2e3236;
        height: 70px;
        line-height: 70px;
    }
}
.light {
    .stat {
        font-family: 'PingFangSC-Light';
        .stat-wrap {
            height: 137px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            background-color: #ebecf3;
        }

        &-left {
            width: 408px;
            background-image: linear-gradient(-45deg, #00b1d5 0%, #39c2b6 100%);
            display: flex;
            &-img {
                margin-top: 24px;
                margin-left: 54px;
                background: url('../../assets/images/light/leijishouluyiyuan.png') no-repeat;
                width: 90px;
                height: 90px;
            }
            &-content {
                margin-top: 35px;
                margin-left: 38px;
                display: flex;
                flex-direction: column;
            }
            &-number {
                font-size: 30px;
                color: #fff;
                letter-spacing: 0.88px;
                line-height: 26px;
            }
            &-text {
                margin-top: 16px;
                font-size: 16px;
                color: #ffffff;
                letter-spacing: 1.53px;
                line-height: 22px;
            }
        }
        .stat-right {
            width: 933px;
            height: 137px;
            background-image: linear-gradient(-46deg, #405fd4 0%, #3c95cf 100%);
            display: flex;
            justify-content: space-between;
            text-align: center;
            padding: 30px 80px;
            box-sizing: border-box;
            &-wrap {
                display: flex;
            }
            &-img1 {
                margin-right: 20px;
                width: 65px;
                height: 65px;
                background: url('../../assets/images/light/sanjijiadeng.png') no-repeat;
            }
            .stat-right-text {
                color: #fff;
                width: 57px;
                height: 66px;
                vertical-align: middle;
            }
            .stat-right-text p:nth-child(1) {
                font-size: 30px;
                margin-top: -2px;
                margin-bottom: 8px;
                color: #fff;
            }
            .stat-right-text p:nth-child(2) {
                font-size: 14px;
            }
        }
    }
    .line {
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        height: 70px;
        line-height: 70px;
    }
}
</style>

