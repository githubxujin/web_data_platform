<template>
    <div class="table-wrap ">
        <div class="editButton">
            <el-button type="primary" size="medium" @click="tabedit">编辑</el-button>
        </div>
        <qg-table subtitle="登记详情">
            <qg-table-column v-for="(item,index) in getRows()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
        <qg-table subtitle="出让人" class="mt20">
            <qg-table-column v-for="(item,index) in transferor()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
        </qg-table>
        <qg-table subtitle="受让人" class="mt20">
            <qg-table-column v-for="(item,index) in assignee()" :key="index" :label="item.key" :column="item.column">{{item.value}}</qg-table-column>
            <qg-table-column label="受让人二级单位" column="qg-two" :more='true'>
                <el-input :disabled="!inputFlag" placeholder="受让人二级单位" v-model="registerDetail.secondCompany"></el-input>
            </qg-table-column>
            <qg-table-column label="受让人一级单位" column="qg-two" :more='true'>
                <el-input :disabled="!inputFlag"   placeholder="受让人一级单位" v-model="registerDetail.firstCompany"></el-input>
            </qg-table-column>
        </qg-table>

        <!-- <el-table-threeline :rows="getRows()" subtitle="登记详情" class="mb30"></el-table-threeline> -->
        <!-- <el-table-edit :rows="transferor()" subtitle="出让人" class="mb30"></el-table-edit> -->
        <!-- <el-table-edit :rows="assignee()" subtitle="受让人" class="assignee" @inputSet="inputSet"></el-table-edit> -->
        <div class="ftButton mt20" v-show="inputFlag">
            <el-button type="primary" size="medium" @click="handedit">确认编辑</el-button>
            <el-button type="info" size="medium" @click="reSet">取消</el-button>
        </div>
    </div>

</template>
<script>
// import ElTableEdit from "@/components/Table/el-table-row-edit.vue"
// import elTableThreeline from "@/components/Table/el-table-threeline.vue";
export default {
    components: {
        // ElTableEdit,
        // elTableThreeline
    },
    data() {
        return {
            id: this.$route.query.id,
            detailData: {},
            list: [],
            info: {},
            registerDetail: {},
            inputSetData: [],
            inputFlag:false,
        };
    },
    created() {
        this.getList(this.$route.query.id)
    },
    methods: {
        assignee() {
            let registerDetail = this.registerDetail || {}
            return [
                { key: "受让人类型", value: this.assigneeTypeLabel(registerDetail.buyereType), column: 'qg-three' },
                { key: "受让人名称", value: registerDetail.buyerName, column: 'qg-three' },
                { key: "受让人组织机构代码", value: registerDetail.buyerOrganizationCode, column: 'qg-three' },
                { key: "受让人工商注册号", value: registerDetail.buyerRegistrationNumber, column: 'qg-three' },
                { key: "受让人住所", value: registerDetail.buyerAddress, column: 'qg-three' },
                { key: "受让人法定代表人/负责人", value: registerDetail.buyerPrincipal, column: 'qg-three' },
                // { key: "受让人二级单位", value: registerDetail.secondCompany, column: 'qg-two', edit: this.flag },
                // { key: "受让人一级单位", value: registerDetail.firstCompany, column: 'qg-two', edit: this.flag },
            ]
        },
        transferor() {
            let registerDetail = this.registerDetail || {}
            return [
                { key: "出让人类型", value: registerDetail.transferorType, column: 'qg-two' },
                { key: "出让人名称", value: registerDetail.transferor, column: 'qg-two' },
                { key: "出让人组织机构代码", value: registerDetail.transferorOrganizationCode, column: 'qg-two' },
                { key: "出让人工商注册号", value: registerDetail.transferorRegistrationNumber, column: 'qg-two' },
                { key: "出让人住所", value: registerDetail.transferorAddress, column: 'qg-two' },
                { key: "出让人法定代表人/负责人", value: registerDetail.transferorPrincipal, column: 'qg-two' },
            ]
        },
        getRows() {
            let registerDetail = this.registerDetail || {}
            return [
                { key: "登记证明编号", value: registerDetail.certNo, column: 'qg-three' },
                { key: "关联的初始登记编号", value: registerDetail.relatedCertNo, column: 'qg-three' },
                { key: "登记时间", value: registerDetail.certStartDate, column: 'qg-three' },
                { key: "登记到期日", value: registerDetail.certEndDate, column: 'qg-three' },
                { key: "登记类型", value: registerDetail.fileType, column: 'qg-three' },
                { key: "填表人", value: registerDetail.formUserName, column: 'qg-three' },
                { key: "填表人证件类型", value: registerDetail.preparerCertificateType, column: 'qg-three' },
                { key: "填表人住所", value: registerDetail.preparerAddress, column: 'qg-three' },
                { key: "填表人归档号", value: registerDetail.preparerNo, column: 'qg-three' },
                { key: "登记期限", value: registerDetail.preparerDeadline, column: 'qg-three' },
                { key: "转让财产币种", value: registerDetail.assetCurrency, column: 'qg-three' },
                { key: "转让财产价值", value: registerDetail.assetValue, column: 'qg-three' },
                { key: "融资合同号码", value: registerDetail.financingContractNumber, column: 'qg-three' },
                { key: "融资合同币种", value: registerDetail.financingContractCurrency, column: 'qg-three' },
                { key: "融资金额", value: registerDetail.financingAmount, column: 'qg-three' },
                { key: "转让财产描述/异议登记陈述/注销说明", value: registerDetail.assetDesc, alone: 'qg-three' },
            ]
        },
        getList(id) {
            this.ajax
                .json('/dcp/asset/cert/info/spider/detail', { id }, { type: 'get' })
                .then(res => {
                    this.registerDetail = res.data
                })
        },
        assigneeTypeLabel(key) {
            switch (key) {
                case "1":
                    return '银行'
                case "2":
                    return '证券公司'
                case "3":
                    return '保理公司'
                case "4":
                    return '其他'
                default:
                    return '-'
            }
        },
        tabedit() {
            this.inputFlag = !this.inputFlag;
        },
        handedit() {
            let parms = {
                firstCompany: this.inputSetData.pop().value,
                secondCompany: this.inputSetData.pop(1).value,
                id: this.registerDetail.id,
            }
            this.$http('/dcp/asset/cert/info/spider/update', parms, { type: 'post' })
                .then(res => {
                    if (res.code === "200") {
                        this.getList(this.$route.query.id);
                        this.inputFlag = !this.inputFlag;
                    }
                })
        },
        reSet() {
            this.inputFlag = false;
        },
        inputSet(e) {
            this.inputSetData = e;
        }

    }
};
</script>

<style lang="scss" scoped>
    /deep/ .n-table .n-key {
        padding: 10px 20px;
        text-indent: 0;
        box-sizing: border-box;
    }
    /deep/ .n-wrap-alone {
        line-height: 20px;
        /deep/ .item.n-value {
            height: 80px;
            line-height: 80px;
        }
        /deep/ .item .el-button {
            width: 1121px;
        }
    }
    .assignee {
        /deep/ .n-three:last-child {
            flex: 1;
        }
    }
    .editButton {
        float: right;
    }
    .ftButton {
        text-align: center;
    }
</style>
