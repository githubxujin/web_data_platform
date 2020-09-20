<template>
    <div>
        <el-table :data="historyData.invoiceDetailLists" border style="width:64%">
            <el-table-column label="货物或应税劳务，服务名称" prop="goodsName" width="300" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="specificationModel" label="规格型号" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unit" label="单位" width="100" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="detailNumber" label="数量" width="180" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="unitPrice" label="单价" width="180" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.unitPrice | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="detailAmount" label="金额" width="180" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.detailAmount | numFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="taxRate" label="税率" width="120" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="taxAmount" label="税额" align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.taxAmount | numFormat}}
                </template>
            </el-table-column>
        </el-table>
        <div class="remark">
            <div class="left">
                <span>发票备注: {{historyData.remark}}</span>
                <span style="margin-top: 10px">自定义备注: {{scope.row.remark}}</span>
            </div>
            <div class="right" @click="remarkHand(scope.row)">编辑发票>></div>
        </div>
        <el-dialog v-if="isDialog1" :visible.sync="isDialog1" :close-on-click-modal="false" width="500px">
            <el-form :model="curItem" status-icon :show-message="false" size="small" style=" padding: 0 20px">
                <el-form-item label="备注：">
                    <el-input type="textarea" v-model="curItem.remark" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}" maxlength="20"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isDialog1 = false">取 消</el-button>
                <el-button type="primary" @click="saveFeedbackRemark">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
// scope 是父组件传递过来的
export default {
    props: {
        scope: Object // $index/row/store  你可以看scope 这个对象，这个页面有很多简化的
    },
    mounted() {
        this.test(this.scope.row);
        // 异步获取数据 赋值给 resourceC 即可
    },
    data() {
        return {
            curItem: {},
            isDialog1: false,
            historyData: { invoiceDetailLists: [] },
            childValue: false
        };
    },
    methods: {
        test(r, isExpen) {
            this.getHistory(r.detailId);
        },
        async getHistory(id) {
            let res = await this.$http(
                "/invoice/queryDetail",
                { invoiceDetailId: id },
                { type: "formdata" }
            );
            if (res.code === "200") {
                this.historyData = res.data;
            }
        },
        remarkHand(v) {
            this.$emit("curItems", v);
        }
    }
};
</script>
<style lang="less">
.remark {
    border: none;
    padding: 10px 20px;
    width: 64%;
    // border: 1px solid #e2e4ed;
    // border-top: none;
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        flex-direction: column;
        span {
        }
    }
    .right {
        display: flex;
        align-items: center;
        color: #f56a00;
        &:hover {
            cursor: pointer;
        }
    }
}
/deep/ .el-table__expanded-cell[class*="cell"] {
    padding: 40px 50px;
}
/deep/ .el-dialog {
    z-index: 99999;
}
</style>