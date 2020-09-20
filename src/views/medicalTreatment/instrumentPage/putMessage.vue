<template>
    <!-- 器械备案详情页面 -->
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">
                <qg-table :title="detailData.productName">
                    <qg-table-column v-for=" (item,index) in putRows()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
                </qg-table>
            </div>
        </div>
    </div>
</template>

<script>
// 暂无数据
export default {

    data () {
        return {
            reportList: [],
            activeName: "first",
            companyName: "",
            detailData: {
                filingCode: '',
                // agentName: '',
                filingAddress: '',
                filingName: '',
                productAddress: '',
                agentName: '',
                agentAddress: '',
                productName: '',
                modelSpecification: '',
                filingUnit: '',
                storageExpiry: '',
                other: '',
                remark: '',
                productDesc: '',
                applicationScope: '',
                changeInfo: '',
                fillingData: '',
            },
            list: [],
            contactList: [],
            linkmanList: [],
            params: {
                id: ''
            }
        };
    },
    created () {
        // 获取上一级传递过来的id值
        this.params.id = this.$route.query.messageId2
        console.log(this.params.id)
        this.getDetail()
    },
    methods: {
        // 向后端发请求后，把数据更换成后端数据
        getDetail () {
            this.$http('/dcp/query/apparatusfiling/info', this.params, {
                type: 'formData'
            }).then(res => {
                this.detailData = res.data
                console.log(this.detailData)
            })
        },
        // 器械备案信息页面
        putRows () {
            return [
                { key: "备案号", value: this.sprit(this.detailData.filingCode), column: "qg-two" },
                { key: "备案人名称", value: this.sprit(this.detailData.filingName), column: "qg-two" },
                { key: "备案人注册地址", value: this.sprit(this.detailData.filingAddress), column: "qg-two" },
                { key: "生产地址", value: this.sprit(this.detailData.productAddress), column: "qg-two" },
                { key: "代理人名称", value: this.sprit(this.detailData.agentName), column: "qg-two" },
                { key: "代理人住所", value: this.sprit(this.detailData.agentAddress), column: "qg-two" },
                { key: "产品名称", value: this.sprit(this.detailData.productName), column: "qg-two" },
                { key: "型号规格", value: this.sprit(this.detailData.modelSpecification), column: "qg-two" },
                { key: "备案单位", value: this.sprit(this.detailData.filingUnit), column: "qg-two" },
                { key: "备案日期", value: this.sprit(this.detailData.filingDate), column: "qg-two" },
                { key: "产品有效期", value: this.sprit(this.detailData.storageExpiry), column: "qg-two" },
                { key: "适用范围/预期用途", value: this.sprit(this.detailData.applicationScope), column: "qg-two" },
                { key: "其他内容", value: this.sprit(this.detailData.other), column: "qg-two" },
                { key: "备注", value: this.sprit(this.detailData.remark), column: "qg-two" },
                { key: "产品描述", value: this.sprit(this.detailData.productDesc), alone: true },
                { key: "变更情况xx", value: this.sprit(this.detailData.changeInfo), alone: true }
            ];
        },
        sprit (val) {
            if (val === "/") return '-'
            return val
        }
    }
};
</script>
<style lang="scss" scoped>
.getRowsPermit {
    margin-top: 20px;
}
/deep/ .table-border {
    white-space: nowrap;
}
/deep/ .n-table .n-key {
    width: 190px;
}
</style>
