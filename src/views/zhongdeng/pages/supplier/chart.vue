<template>
    <div class="chart-wrap pr30">
        <div class="line-wrap p-re ">
            <line-list :opt="lineOpt" />

            <el-row type="flex" class="tag-box">
                <el-row type="flex" class="mr50">
                    <c-op v-for="(v, k) in tagList" :key="k" :class="{ act: tagCur === k }" @click.native="tagHand(k, v.value)">
                        {{ v.label }}</c-op>
                </el-row>
            </el-row>
        </div>
        <div class="pie-wrap">
            <div class="pie-top">
                <div class="app-title">合作金融机构类型占比</div>
                <div class="pie-center">
                    <pie :opt="pieOpt" />
                </div>
            </div>
            <div class="pie-bottom">
                <ul class="pie-bottom-wrap">
                    <li v-for="(v,k) in payOpt " :key="k">
                        <div> <span class="circle" :style="{background:pieOpt.series[0].color[k]}"></span>
                            <span>{{v.type}}</span></div>
                        <div><span class="textRight">{{v.amount | numFormat}}</span></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import cOp from "@/components/common/c-op.vue";
export default {
    props: {
        lineOpt: Object,
        pieOpt: Object,
        payOpt: Array,
        cur: Number,
    },

    components: {
        cOp,
        'line-list': () => import("@/components/Line/line-list.vue"),
        'pie': () => import("@/components/Pie/pie.vue")
    },
    data() {
        return {
            tagList: [
                {
                    value: 1,
                    label: "月"
                },
                {
                    value: 2,
                    label: "年"
                },

            ],
            tagCur: 0,
            pieClass: ['i-one', 'i-two', 'i-three', 'i-four', 'i-five'],
            pieList: [{ name: '银行', value: '15' }, { name: '证券公司', value: '10' }, { name: '保理公司', value: '35' }, { name: '其他', value: '35' }]
        };
    },
    watch: {
        cur(e) {
            this.tagCur = e;
        },
    },
    methods: {
        tagHand(cur, value) {
            this.tagCur = cur;
            this.$emit('changeStateType', { 'value': value, 'cur': cur })
        },
    }
};
</script>
<style lang="scss" scoped>
    .light {
        .line-wrap,
        .pie-wrap {
            border: 1px solid #d2d9e5;
        }
        .pie-bottom {
            border-top: 1px solid #d2d9e5;
        }
    }
    .p-re {
        position: relative;
        padding-top: 20px;
    }
    .tag-box {
        position: absolute;
        top: 84px;
        right: 70px;
    }

    .app-title {
        padding: 20px;
        text-align: center;
    }
    .pie-center {
        padding-top: 40px;
        width: 200px;
        margin: 0 auto;
    }
    ul,
    li {
        margin: 0;
        padding: 0;
    }
    ul {
        width: 160px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        list-style: none;

        li {
            display: flex;
            justify-content: space-between;
            width: 160px;
            height: 12px;
            line-height: 12px;
            font-size: 12px;
            color: #43a1ac;
            letter-spacing: 0;
            position: relative;

            margin-top: 16px;
            span {
                margin-left: 3px;
                color: #909399;
            }
        }
    }

    .pie-top {
        height: 355px;
        padding-top: 20px;
    }
    .pie-bottom {
        border-top: 1px solid #2e3236;
        height: 159px;
        .circle {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
    .chart-wrap {
        margin-top: 20px;
        display: flex;
    }
    .line-wrap {
        border: 1px solid #2e3236;
        width: 871px;
        height: 514px;
    }

    .pie-wrap {
        margin-left: 20px;
        border: 1px solid #2e3236;
        width: 278px;
    }
</style>