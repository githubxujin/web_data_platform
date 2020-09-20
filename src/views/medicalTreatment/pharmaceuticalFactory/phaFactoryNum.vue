<!--累积收录药厂数量-->
<template>
    <div>
        <div class="phaFactoryNum">
            <div class="phaFactoryNum-left">
                <div class="phaFactoryNum-logo"></div>
                <div class="phaFactoryNum-content">
                    <div class="phaFactoryNum-number">{{ startList.totalCount | numFormat}}</div>
                    <div class="phaFactoryNum-text">累积收录药厂数量</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapState } from "vuex";

export default {
    components: {},
    props: {},
    data() {
        return {
            // 累积收录药厂数量，默认值为1；有数据则替换
            // startList: {
            //     totalCount: ''
            // }
        };
    },
    // created() {
    //     this.getStartList();
    // },
    // methods: {
    //     getStartList() {
    //         this.ajax.json("/dcp/query/pharmaceutical/count").then(res => {
    //             this.startList = res.data;
    //             // console.log(this.startList);

    //         });
    //     }
    // }
};
</script>
<style lang="scss" scoped>
.phaFactoryNum {
    font-family: PingFangSC-Light;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
        display: flex;
        width: 450px;
        height: 120px;
        background-image: linear-gradient(-90deg, rgba(50, 55, 61, 0.31) 0%, rgba(39, 50, 53, 0.84) 59%, #233132 100%);
        align-self: center;
    }
    &-logo {
        width: 76px;
        height: 76px;
        // margin-top: 35px;
        align-self: center;
        margin-left: 40px;
        background: url('~@/assets/images/policy/bz.png') no-repeat;
    }
    &-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        margin-left: 60px;
        text-align: left;
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
    }
}
</style>
