<template>
    <!-- 器械注册详情页面 -->
    <div class="stat">
        <div class="table-wrap mt20">
            <div class="table-title">
                <div>{{detailData.productName}}</div>
            </div>
            <qg-table class="mt20">
                <qg-table-column v-for="(item,index) in regisRows()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
            </qg-table>

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
            // companyName: "",
            messageId1: '',
            detailData: {
                registerCode: '',
                registerName: '',
                registerAddress: '',
                productAddress: '',
                agentName: '',
                agentAddress: '',
                managerCategory: '',
                modelSpecification: '',
                licenseAuthority: '',
                registerDate: '',
                deadlineDate: '',
                applicationScope: '',
                other: '',
                remark: '',
                constituent: '',
                storageExpiry: '',
                changeInfo: ''
            },
            list: [],
            contactList: [],
            linkmanList: [],
            params: {
                id: '',
            }
        };
    },
    created () {
        // 获取上一级传递过来的id值
        this.params.id = this.$route.query.messageId1
        console.log(this.params.id)
        this.getDetail()
    },
    methods: {
        // 向后端发请求后，把数据更换成后端数据
        getDetail () {
            this.$http('/dcp/query/apparatusregister/info', this.params, {
                type: 'formData'
            }).then(res => {
                this.detailData = res.data
                console.log(this.detailData)
            })
        },
        // 器械注册信息页面
        regisRows () {
            return [
                { key: "注册证编号", value: this.detailData.registerCode, column: "qg-two" },
                { key: "注册人名称", value: this.detailData.registerName, column: "qg-two" },
                { key: "注册人住所", value: this.detailData.registerAddress, column: "qg-two" },
                { key: "生产地址", value: this.detailData.productAddress, column: "qg-two" },
                { key: "代理人名称", value: this.detailData.agentName, column: "qg-two" },
                { key: "代理人住所", value: this.detailData.agentAddress, column: "qg-two" },
                { key: "管理类别", value: this.detailData.managerCategory, column: "qg-two" },
                { key: "型号规格", value: this.detailData.modelSpecification, column: "qg-two" },
                { key: "审批部门", value: this.detailData.licenseAuthority, column: "qg-two" },
                { key: "批准日期", value: this.detailData.registerDate, column: "qg-two" },
                { key: "有效期至", value: this.detailData.deadlineDate, column: "qg-two" },
                { key: "适用范围/预期用途", value: this.detailData.applicationScope, column: "qg-two" },
                { key: "其他内容", value: this.detailData.other, column: "qg-two" },
                { key: "备注", value: this.detailData.remark, column: "qg-two" },
                { key: "结构及主要组成成分", value: this.detailData.constituent, alone: true },
                { key: "变更情况", value: this.detailData.changeInfo, alone: true }
            ]
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
