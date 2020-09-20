<!--尽调报告详情-->
<template>
    <div class="stat">
        <div class="table-wrap mt15 mb30">
            <div class="table-title">{{this.$route.query.projectName}}</div>
            <!-- <el-table-row :rows='getRows()' class="mt20"></el-table-row> -->
           <qg-table>
                <qg-table-column v-for="(item,index) in getRows()" :key="index" :column="item.column" :label="item.label">{{item.value}}</qg-table-column>
            </qg-table>
            <!-- <div class="n-table">
                <div class="n-label">
                    其它供应商（共同转让人）
                </div>
                <div class="n-value">
                    {{list.otherSupplier}}
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
// import elTableRow from "@/components/Table/el-table-row.vue"
export default {
    // components: { elTableRow },
    data() {
        return {
            list: {},
            type: ['基建', '房建', '市政', '工业厂房', '商业综合体', '其他'],
        }
    },
    created() {
        this.getList(this.$route.query.id)
    },
    methods: {
        getRows() {
            let list = this.list || {}
            return [
                { label: "建设单位", value: list.construct || '-', alone: true },
                { label: "项目类型", value: this.type[list.projectType * 1 - 1] || '-', alone: true },
                { label: "项目地址", value: list.address || '-', alone: true },

                { label: "发票号码", value: list.invoiceNum || '-', alone: true },
                { label: "项目编号", value: list.projectNo || '-', column:'qg-three'},
                { label: "合同编号", value: list.contractNo || '-', column:'qg-three'},
                { label: "项目推广名", value: list.promotionName || '-', column:'qg-three'},
                { label: "项目阶段", value: list.stage || '-', column:'qg-three'},
                { label: "项目性质", value: list.nature || '-', column:'qg-three'},
                { label: "城市", value: list.urban || '-', column:'qg-three'},
                { label: "省份", value: list.province || '-', column:'qg-three'},
                { label: "市", value: list.city || '-', column:'qg-three'},
                { label: "区", value: list.area || '-', column:'qg-three'},
                { label: "承建单位", value: list.construction || '-', column:'qg-three'},
                { label: "账期", value: list.accountPeriod || '-', column:'qg-three'},
                { label: "回款账户开户行", value: list.openBank || '-', column:'qg-three'},
                { label: "回款账户账号", value: list.bankAccount || '-', column:'qg-three'},
                { label: "回款账户所有人", value: list.payee || '-', column:'qg-three'},
                { label: "数据来源", value: list.source || '-', column:'qg-three'},
                { label: "其它供应商（共同转让人）", value: list.otherSupplier || '-', alone: true},

            ]
        },
        getList(id) {
            this.ajax
                .json('/dcp/comm/zdw/project/stats/detail', { id }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                })
        }
    },


}
</script>
<style lang="less" scoped>
    .n-table {
        border-top: 1px solid #54575c;
        border-left: 1px solid #54575c;
        border-right: 1px solid #54575c;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        border-bottom: 1px solid #54575c;
        margin-top: -1px;
        flex-wrap: wrap;
        .n-label {
            width: 137px;
            background: #292b2f;
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #a0a3a8;
            letter-spacing: 0.44px;
            padding: 10px 0;
            padding-left: 20px;
            display: flex;
            align-items: center;
        }
        .n-value {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #d3d3d4;
            letter-spacing: 0.44px;
            word-wrap: break-word;
            word-break: normal;
            padding: 20px 0;
            padding-left: 20px;
            line-height: 2;
            width: 1130px;
            .n-edit {
                text-indent: 0;
            }
        }
    }
</style>
