<template>
    <div>
        <div style="width:100%;height:30px;background-color: #232528;"></div>
        <div class="tabs-title mb20">业务贡献</div>
        <table class="el-table-list">
            <tr>
                <td>每月日均融资规模</td>
                <td>与我司合作年限</td>
                <td>票据保理利率参考值</td>
                <td>票据保理费率参考值</td>
                <td>票据保理费用收取方式</td>
                <!-- <td>从业年限</td> -->
                <td></td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td></td>
            </tr>
            <tr>
                <td>订单保理利率参考值</td>
                <td>订单保理费率参考值</td>
                <td>订单保理收取方式</td>
                <td>应收保理利率参考值</td>
                <td>应收保理费率参考值</td>
                <td>应收保理费用收取方式</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">履约能力</div>
        <table class="el-table-list">
            <tr>
                <td>利息逾期支付累计发生次数</td>
                <td>利息逾期支付累计发生天数</td>
                <td>借新还旧累计发生次数</td>
                <td>借新还旧累计发生天数</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>减免息累计减免次数</td>
                <td>息费展期累计展期次数</td>
                <td>息费展期累计展期天数</td>
                <td>逾期记录</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">配合程度</div>
        <table class="el-table-list">
            <tr>
                <td>因单据完整性问题退单</td>
                <td>未落实账户变更</td>
                <td>未开通短信提醒</td>
                <td>未按时补充单据累计发生次数</td>
                <td>未按时补充单据累计发生天数</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>放款后文件签章及时性累计发生天数</td>
                <td>转应收展期累计展期次数</td>
                <td>转应收展期累计展期天数</td>
                <td>-</td>
                <td>-</td>
            </tr>
            <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
            </tr>
        </table>
        <div class="tabs-title mt30 mb20">欺诈风险</div>
        <el-table :data="list" border class="tab-info">
            <el-table-column prop="name" label="重复融资记录" show-overflow-tooltip align="center">
                <template slot-scope="item">
                    {{item.row.name ? item.row.name : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="gendr" label="非归集账款回款未按要求偿还我司" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.gendr ? item.row.gendr : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="zhuang" label="针对已受让资产发票冲红记录" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.zhuang ? item.row.zhuang : '-'}}
                </template>
            </el-table-column>
            <el-table-column prop="years" label="针对已受让资产发票作废记录" align="center" show-overflow-tooltip>
                <template slot-scope="item">
                    {{item.row.years ? item.row.years : '-'}}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    created() { },
    methods: {}
}
</script>
<style lang="scss" scoped>
.el-table-list {
    width: 100%;
    border: 1px solid #54575c;
    border-collapse: collapse;
    font-family: PingFangSC-Light;
    font-size: 14px;
    tr {
        display: flex;
        justify-content: space-between;
        &:nth-child(odd) {
            background: #292b2f;
        }
        &:last-child {
            td {
                color: #d3d3d4;
                border-bottom: 0;
            }
        }
    }
    td {
        flex: 1;
        color: #a0a3a8;
        padding: 17px 15px;
        min-height: 48px;
        line-height: 16px;
        box-sizing: border-box;
        text-align: center;
        border-right: 1px solid #54575c;
        border-bottom: 1px solid #54575c;
        &:last-child {
            border-right: 0;
        }
    }
}
.tabs-title {
    font-size: 14px;
    color: #43a1ac;
}
</style>
