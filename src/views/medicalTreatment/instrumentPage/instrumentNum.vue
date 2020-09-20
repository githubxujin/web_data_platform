<template>
    <!-- 累积收录器械产品注册数量组件 -->
    <div class="stat">
        <div class="stat-wrap" style="background: #1D1E23">
            <div class="stat-left">
                <div class="stat-left-img"></div>
                <div class="stat-left-content">
                    <div class="stat-left-number">{{ statList.count | numFormat}}</div>
                    <div class="stat-left-text">累积收录器械产品注册数量</div>
                </div>
            </div>
            <div class="stat-right">
                <div class="stat-left-img"></div>
                <div class="stat-left-content">
                    <div class="stat-left-number">{{ statList.count | numFormat}}</div>
                    <div class="stat-left-text">累积收录器械产品备案数量</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // 累积收录器械数据
            statList: {
                ztCount: 0,
                count: 0
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.stat {
    margin-top: 40px;
    font-family: PingFangSC-Light;
    .stat-wrap {
        margin: 4px 0;
        height: 137px;
        overflow: hidden;
        display: flex;
    }
    &-left,
    &-right {
        width: 408px;
        margin-right: 20px;
        background-image: linear-gradient(90deg, #32373d 0%, #233132 100%);
        display: flex;
        &-img {
            margin-top: 31px;
            margin-left: 54px;
            background: url('../../../assets/images/policy/bz.png') no-repeat;
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
}
</style>
