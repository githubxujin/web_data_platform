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
                        累计收录企业
                    </div>
                </div>
            </div>
            <div class="stat-right">
                <div class="stat-right-wrap">
                    <div class="stat-right-top">
                        <div class="stat-right-top-wrap">
                            <div class="stat-right-img1">
                            </div>
                            <div class="stat-right-text">中国建筑</div>
                            <div class="stat-right-number">
                                {{statList.zjCount  | numFormat }}
                            </div>
                        </div>
                        <div class="stat-right-top-wrap">
                            <div class="stat-right-img2">
                            </div>
                            <div class="stat-right-text">中国中铁</div>
                            <div class="stat-right-number">
                                {{statList.ztCount | numFormat}}
                            </div>
                        </div>
                        <div class="stat-right-top-wrap">
                            <div class="stat-right-img3">
                            </div>
                            <div class="stat-right-text">中国铁建</div>
                            <div class="stat-right-number">
                                {{statList.ztjCount | numFormat}}
                            </div>
                        </div>
                    </div>
                    <div class="stat-right-bottom">
                        <div class="stat-right-bottom-wrap">
                            <div class="stat-right-img4">
                            </div>
                            <div class="stat-right-text">中国交建</div>
                            <div class="stat-right-number">
                                {{statList.zjtCount | numFormat}}
                            </div>
                        </div>
                        <div class="stat-right-bottom-wrap">
                            <div class="stat-right-img5">
                            </div>
                            <div class="stat-right-text">其他</div>
                            <div class="stat-right-number ml45">
                                {{statList.otherCount | numFormat}}
                            </div>
                        </div>
                        <div class="stat-right-bottom-wrap">
                            <div class="stat-right-img6">
                            </div>
                            <div class="stat-right-text"></div>
                            <div class="stat-right-number">
                            </div>
                        </div>

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
            }
        };
    },
    created () {
        this.getStat();
    },
    methods: {
        getStat () {
            this.$http("/dcp/customer/count", {}, { type: "formdata" }).then(
                res => {
                    this.statList = res.data;
                }
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.dark {
    .stat {
        width: 100%;
        font-family: PingFangSC-Light;
        .stat-wrap {
            margin: 4px 0;
            height: 137px;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            background-color: #1d1e23;
        }
        &-left {
            width: 408px;
            background-image: linear-gradient(90deg, #32373d 0%, #233132 100%);
            display: flex;
            &-img {
                margin-top: 31px;
                margin-left: 54px;
                background: url('../../assets/images/policy/bz.png') no-repeat;
                width: 75px;
                height: 75px;
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
            background: #232528;
            &-wrap {
                padding: 0 20px;
            }
            &-top {
                border-bottom: 1px solid #2e3236;
                display: flex;
                padding: 11px 40px;
                justify-content: space-between;
                height: 46px;
                &-wrap {
                    flex-basis: 33.3%;
                    display: flex;
                }
            }
            &-bottom {
                margin: 0 40px;
                padding: 11px 0;
                display: flex;
                height: 46px;
                justify-content: space-between;
                align-items: center;
                &-wrap {
                    flex-basis: 33.3%;
                    display: flex;
                    height: 46px;
                }
            }
            &-img1 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/policy/jz.png') no-repeat;
            }
            &-img2 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/policy/zt.png') no-repeat;
            }
            &-img3 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/policy/tj.png') no-repeat;
            }
            &-img4 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/policy/jj.png') no-repeat;
            }
            &-img5 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/policy/qt.png') no-repeat;
            }
            &-text {
                margin-left: 12px;
                line-height: 44px;
                font-size: 14px;
                color: #449fa8;
                letter-spacing: 0.82px;
            }
            &-number {
                margin-left: 15px;
                line-height: 44px;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: 1.05px;
            }
        }
    }
}

.light {
    .stat {
        font-family: PingFangSC-Light;
        .stat-wrap {
            margin: 4px 0;
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
                margin-top: 31px;
                margin-left: 54px;
                background: url('../../assets/images/light/bz.png') no-repeat;
                width: 75px;
                height: 75px;
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
                color: #fff;
                letter-spacing: 1.53px;
                line-height: 22px;
            }
        }
        .stat-right {
            width: 933px;
            background-image: linear-gradient(-46deg, #405fd4 0%, #3c95cf 100%);
            &-wrap {
                padding: 0 20px;
            }
            &-top {
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                padding: 11px 40px;
                justify-content: space-between;
                height: 46px;
                &-wrap {
                    flex-basis: 33.3%;
                    display: flex;
                }
            }
            &-bottom {
                margin: 0 40px;
                padding: 11px 0;
                display: flex;
                height: 46px;
                justify-content: space-between;
                align-items: center;
                &-wrap {
                    flex-basis: 33.3%;
                    display: flex;
                    height: 46px;
                }
            }
            &-img1 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/light/jz.png') no-repeat;
            }
            &-img2 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/light/zt.png') no-repeat;
            }
            &-img3 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/light/tj.png') no-repeat;
            }
            &-img4 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/light/jj.png') no-repeat;
            }
            &-img5 {
                margin-left: 40px;
                width: 46px;
                height: 46px;
                background: url('../../assets/images/light/qt.png') no-repeat;
            }
            &-text {
                margin-left: 12px;
                line-height: 44px;
                font-size: 14px;
                color: #fff;
                letter-spacing: 0.82px;
            }
            &-number {
                margin-left: 15px;
                line-height: 44px;
                font-size: 18px;
                color: #ffffff;
                letter-spacing: 1.05px;
            }
        }
    }
}
</style>

