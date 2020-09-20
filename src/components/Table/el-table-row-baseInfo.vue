<template>
    <div>
        <div class="n-subtitle">{{ subtitle }}</div>
        <div class="table">
            <div class="table_li">
                <div class="tit_left">城镇职工基本养老保险</div>
                <div class="con_right">
                    {{ data.socialSecurityInfo.ageBaseInsurance }}
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left">失业保险</div>
                <div class="con_right">
                    {{ data.socialSecurityInfo.retirementInsurance }}
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left">职工基本医疗保险</div>
                <div class="con_right">
                    {{ data.socialSecurityInfo.medicalInsurance }}
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left">工伤保险</div>
                <div class="con_right">
                    {{ data.socialSecurityInfo.workInsurance }}
                </div>
            </div>
            <div class="table_li table_li_alone">
                <div class="tit_left">生育保险</div>
                <div class="con_right">
                    {{ data.socialSecurityInfo.bearInsurance }}
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left">净利润</div>
                <div class="con_right">{{ data.assetInfo.netProfits }}</div>
            </div>
            <div class="table_li">
                <div class="tit_left">负债总额</div>
                <div class="con_right">
                    {{ data.assetInfo.totalIndebtAmount }}
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left duoge">单位缴费基数</div>
                <div class="con_right con_right_duo">
                    <div class="con_right_child">
                        单位参加城镇职工基本养老保险缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.basicBaseAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        单位参加失业保险缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.loseBaseAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        单位参加职工基本医疗保险缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.medicalBaseAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        单位参加生育保险缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.bearBaseAmount}}</span>
                    </div>
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left duogeWu">本期实际缴费金额</div>
                <div class="con_right con_right_duo">
                    <div class="con_right_child">
                        参加城镇职工基本养老保险本期实际缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.ageActualBaseAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        参加失业保险本期实际缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.loseActualBaseAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        参加职工基本医疗保险本期实际缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.medicalActualBaseAmount}}</span>
                    </div>
                    <div class="con_right_child con_right_child_si">
                        参加工伤保险本期实际缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.workActualBaseAmount}}</span>
                    </div>
                    <div class="con_right_child con_right_child_wu">
                        参加生育保险本期实际缴费基数
                        <span class="con_right_child_num">{{data.socialSecurityInfo.bearActualBaseAmount}}</span>
                    </div>
                </div>
            </div>
            <div class="table_li">
                <div class="tit_left duogeWu">本期实际缴费金额</div>
                <div class="con_right con_right_duo">
                    <div class="con_right_child">
                        单位参加城镇职工基本养老保险累计欠缴金额
                        <span class="con_right_child_num">{{data.socialSecurityInfo.basicArrearAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        单位参加失业保险累计欠缴金额
                        <span class="con_right_child_num">{{data.socialSecurityInfo.loseArrearAmount}}</span>
                    </div>
                    <div class="con_right_child">
                        单位参加职工基本医疗保险累计欠缴金额
                        <span class="con_right_child_num">{{data.socialSecurityInfo.medicalArrearAmount}}</span>
                    </div>
                    <div class="con_right_child con_right_child_si">
                        单位参加工伤保险累计欠缴金额
                        <span class="con_right_child_num">{{data.socialSecurityInfo.workArrearAmount}}</span>
                    </div>
                    <div class="con_right_child con_right_child_wu">
                        单位参加生育保险累计欠缴金额
                        <span class="con_right_child_num">{{data.socialSecurityInfo.bearArrearAmount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        subtitle: String,
        data: Object
    },
};
</script>

<style lang="scss" scoped>
.n-subtitle {
    color: #43a1ac;
    font-family: PingFangSC-Light;
    font-size: 14px;
    margin-bottom: 20px;
}
.table {
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid #54575c;
    border-bottom: 1px solid #54575c;
}
.table_li {
    flex: 50%;
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    letter-spacing: 0.44px;
    border-top: 1px solid #54575c;
    border-left: 1px solid #54575c;
    .tit_left {
        width: 150px;
        height: 50px;
        background: #292b2f;
        color: #a0a3a8;
        line-height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 9px 0 20px;
        &.duoge {
            height: 203px !important;
        }
        &.duogeWu {
            height: 253px !important;
        }
    }
    .con_right {
        color: #d3d3d4;
        line-height: 14px;
        padding-left: 31px;
        line-height: 50px;
        &.con_right_duo {
            padding-left: 0 !important;
            width: 1008px;
        }
    }
    .con_right_child {
        border-bottom: 1px solid #54575c;
        padding-left: 31px;
        &:nth-child(4) {
            border-bottom: none;
        }
        .con_right_child_num {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #43a1ac;
            letter-spacing: 0.44px;
            text-align: right;
            float: right;
            line-height: 14px;
            margin-right: 13px;
            padding-left: 31px;
            padding-top: 17.5px;

            // display: inline-block;
        }
    }
    .con_right_child_si {
        border-bottom: 1px solid #54575c !important;
    }
    .con_right_child_wu {
        border-bottom: none;
    }
}
.table_li_alone {
    flex: 100%;
}
</style>
