<template>
    <div class="table-wrap stat mt15 mb30">
        <qg-table :title="detailData.drugName" subtitle="药品基本情况">
            <qg-table-column v-for="(item,index) in tablelist" :label="item.name" :key="index" :column="item.column">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="带量采购情况" class="mt20">
            <qg-table-column label="带量采购">
                {{detailData.quantityPurchase}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="重点监控情况" class="mt20">
            <qg-table-column v-for="(item,index) in tablelistTwo" :label="item.name" :key="index" :column="item.column">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="基本药物情况" class="mt20">
            <qg-table-column label="基本药物">
                {{detailData.basicDrug}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="仿评药情况" class="mt20">
            <qg-table-column label="仿评药">
                {{detailData.imitationDrug}}
            </qg-table-column>
        </qg-table>
    </div>
</template>
<script>
export default {
    created () {
        this.$nextTick(() => {
            this.detailData = JSON.parse(this.$route.query.detail);
            this.tablelist = [
                { name: '药品名称', value: this.detailData.drugName, column: 'qg-two' },
                { name: '英文名称', value: this.detailData.drugEnglishName, column: 'qg-two' },
                { name: '产品类别', value: this.detailData.drugType, column: 'qg-two' },
                { name: '治疗领域', value: this.detailData.cureRange, column: 'qg-two' },
                { name: '医保类别', value: this.detailData.medicineInsuranceType, column: 'qg-two' },
                { name: '医保范围', value: this.detailData.medicineInsuranceRange, column: 'qg-two' },
                { name: '药品规格', value: this.detailData.drugSpec, column: 'qg-two' },
                { name: '剂型', value: this.detailData.drugDosageform, column: 'qg-two' },
                { name: '批准日期', value: this.detailData.approveDate, column: 'qg-two' },
                { name: '批准文号', value: this.detailData.approveNumber, column: 'qg-two' },
                { name: '原批准文号', value: this.detailData.orgApproveNumber, column: 'qg-two' },
                { name: '药品本位码', value: this.detailData.drugCode, column: 'qg-two' },
                { name: '生产单位', value: this.detailData.manufacture, column: 'qg-two' },
                { name: '生产地址', value: this.detailData.productionAddress, column: 'qg-two' },
                { name: '生产国家', value: this.detailData.productionCountry, column: 'qg-two' },
                { name: '已上市品种数量', value: this.detailData.marketTypeNum, column: 'qg-two' },
                { name: '市占率前5药企(%)', value: this.detailData.topFive, },
            ]
            this.tablelistTwo = [
                { name: '重点监控', value: this.detailData.keyMonitor, column: 'qg-two' },
                { name: '发文时间', value: this.detailData.postingTime, column: 'qg-two' },
                { name: '监管级别', value: this.detailData.regulatoryLevel, column: 'qg-two' },
                { name: '政策文件', value: this.detailData.policyDoc, column: 'qg-two' },
                { name: '省份', value: this.detailData.monitorProvince, column: 'qg-two' },
                { name: '地区或机构', value: this.detailData.monitorArea, column: 'qg-two' },
            ]
        })

    },
    data () {
        return {
            detailData: {},
            tablelist: [],
            tablelistTwo: []
        }
    },

    methods: {

    },

}
</script>

<style lang="less" scoped>
.stat {
    width: 1360px;
    margin: 0 auto;
}
</style>