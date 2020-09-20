<template>
    <div class="ranking">
        <div class="ranking-wrap">
            <div class="ranking-item" v-for="(item,index) in rankingList" :key="index">
                <div class="ranking-no">No.{{index+1}}</div>
                <div class="ranking-company">{{item.title}}</div>
                <div class="ranking-two">
                    <div class="ranking-title">转让金额</div>
                    <div class="ranking-value">{{ item.transferAmount | numFormat}}</div>
                    <div class="ranking-title">融资金额</div>
                    <div class="ranking-value">{{ item.financesAmount | numFormat}}</div>
                    <div class="ranking-title">转让次数</div>
                    <div class="ranking-value">{{item.transferCount}}</div>
                    <div class="ranking-title">合作时长</div>
                    <div class="ranking-value">{{ item.duration}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        rankingList: Array
    },
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="scss" scoped>
    .light {
        .ranking {
            background: #f1f4fc;
        }
        .ranking-no {
            color: #385dd2;
            font-family: PingFang-SC-Regular;
        }
        .ranking-company {
            color: #333;
            font-family: PingFang-SC-Regular;
        }
        .ranking-two {
            .ranking-title,
            .ranking-value {
                color: #666;
                font-family: PingFang-SC-Regular;
            }
        }
        .ranking-wrap {
            &::-webkit-scrollbar-thumb {
                background: #7596ff;
            }
            /*滚动条里面轨道*/
            &::-webkit-scrollbar-track {
                background: #f1f4fc;
            }
        }
    .ranking-item {
        &:after {
            background: #D2D9E5;
        }
    }        
    }
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 6px;
        height: 8px;
    }
    ::-webkit-scrollbar-button {
        height: 0px;
        width: 0px;
    }

    ::-webkit-scrollbar-thumb {
        background: #2a3c40;
        border-radius: 4px;
    }
    /*滚动条里面轨道*/
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #242d30;
    }
    .ranking {
        background: #2d3034;
        height: 210px;
        width: 1169px;
        overflow: hidden;
    }
    .ranking-wrap {
        display: flex;
        margin: 40px;
        overflow-x: auto;
        flex-shrink: 0;
    }
    .ranking-item {
        position: relative;
        margin-right: 30px;
        /* border-right: 1px solid #505358; */
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 150px;
        flex-shrink: 0;

        &:after {
            content: "";
            width: 1px;
            height: 130px;
            position: absolute;
            background: #505358;
            top: 0;
            left: 298px;
        }
    }
    .ranking-no {
        font-family: PingFangSC-Light;
        font-size: 20px;
        color: #43b7a5;
        letter-spacing: 1.17px;
        margin-bottom: 10px;
    }
    .ranking-company {
        // overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #51b5bf;
        letter-spacing: 0;
        margin-bottom: 10px;
    }
    .ranking-two {
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .ranking-title {
        flex-basis: 40%;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #a0a3a8;
        letter-spacing: 0.7px;
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 20px;
        }
    }
    .ranking-value {
        flex-basis: 40%;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #d3d3d4;
        text-align: right;
        margin-right: 32px;
        margin-bottom: 5px;
        &:last-child {
            margin-bottom: 20px;
        }
    }
</style>