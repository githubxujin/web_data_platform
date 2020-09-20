<template>
    <div class="card-box">
        <div class="card" v-for="(v,k) in topPieList" :key="k">
            <div class="card-hd">
                <div class="t1">No.{{k+1}}</div>
                <div class="t2">{{v.title}}</div>
            </div>
            <div class="card-bd">
                <chart height="125px" width="125px" :option="v.percentage " :id="'card-pie'+k" />
            </div>
            <div class="card-fd">
                <div class="item" v-for="(item,index) in fieldList" :key="index">
                    <div class="item-label">{{ item.label}}</div>
                    <div class="item-value">{{ typeof(v[item.key])==='number'?numFormat(v[item.key]):v[item.key] }}</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import Chart from "@/components/Charts/invoiceInvalid.vue";
export default {
    props: {
        topPieList: Array,
        fieldList: Array
    },
    components: {
        Chart
    },
};
</script>
<style lang="scss" scoped>
    /* 滚动条样式 */
    ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    ::-webkit-scrollbar-button {
        height: 0px;
        width: 0px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #2a3c40;
        border-radius: 4px;
    }
    /*滚动条里面轨道*/
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        background: #1d1e23;
    }

    .card-box {
        display: flex;
        overflow-x: auto;
        padding: 20px 0;
        .card {
            padding: 30px 0;
            width: 242px;
            height: 395px;
            border: 1px solid #2e3236;
            flex-shrink: 0;
            transition: transform 0.5s 0s;
            box-sizing: border-box;
            &:hover {
                margin-top: -10px;
                transform: translateY(-10px);
                background: rgba(45, 60, 62, 0.19);
                border: 1px solid #465b5e;
            }
        }
        .card + .card {
            margin-left: 20px;
        }

        .card-hd {
            padding: 0 26px;
            .t1 {
                font-size: 20px;
                color: #43b7a5;
                letter-spacing: 1.17px;
            }
            .t2 {
                font-family: PingFangSC-Light;
                padding-top: 10px;
                height: 25px;
                line-height: 20px;
                font-size: 16px;
                color: #ffffff;
                letter-spacing: 0.93px;
            }
        }
        .card-bd {
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card-fd {
            border-top: 1px solid #2e3236;
            padding: 0 20px;
            margin-top: -30px;
            .item {
                padding-top: 6px;
                display: flex;
                justify-content: space-between;
                margin-top: 4px;
                .item-label,
                .item-value {
                    font-size: 12px;
                    color: #a0a3a8;
                    letter-spacing: 0.7px;

                    flex-shrink: 0;
                }

                .item-value {
                    color: #449fa8;
                }
            }
        }
    }
</style>