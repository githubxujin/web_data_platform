<template>
    <div class="table-wrap mt20 mb30">
        <qg-table :title="detailData.goodsName" subtitle="基本信息">
            <qg-table-column v-for="(item,index) in tablelist" :label="item.name" :key="index" :column="item.column" width="180">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="药物详情" class="mt20">
            <qg-table-column v-for="(item,index) in tablelistTwo" :label="item.name" :key="index" :column="item.column" width="180">
                {{item.value}}
            </qg-table-column>
        </qg-table>

    </div>
</template>
<script>
export default {
    mounted() {
        this.detailData = JSON.parse(this.$route.query.detail);
        this.tablelist = [
            { name: '药品名称', value: this.detailData.goodsName },
            { name: '通用名', value: this.detailData.commonName, column: 'qg-two' },
            { name: '大类（治疗领域）', value: this.detailData.bigClass, column: 'qg-two' },
            { name: '药品类型', value: this.detailData.drugClass, column: 'qg-two' },
            { name: '剂型', value: this.detailData.dosage, column: 'qg-two' },
            { name: '区域', value: this.detailData.area, column: 'qg-two' },
            { name: '亚类', value: this.detailData.subclass, column: 'qg-two' },
        ]
        this.tablelistTwo = [
            { name: '医保类别', value: this.detailData.healthCare, column: 'qg-two' },
            { name: '原限定支付范围', value: this.detailData.originalLimitPayment, column: 'qg-two' },
            { name: '医保版本', value: this.detailData.healthCareVersionShow, column: 'qg-two' },
            { name: '限制使用范围', value: this.detailData.limitUsePayment, column: 'qg-two' },
            { name: '版本', value: this.detailData.version, column: 'qg-two' },
            { name: '增补情况', value: this.detailData.supplementaryConditions, column: 'qg-two' },
            { name: '纳入医保省份数量', value: this.detailData.includeSupplementHealthCareProvincesNum, column: 'qg-two' },
            { name: '调整后的限定支付范围', value: this.detailData.newOriginalLimitPayment, column: 'qg-two' },
            { name: '纳入医保省份', value: this.detailData.includeSupplementHealthCareProvinces, },
            { name: '执行情况', value: this.detailData.implementation, column: 'qg-two' },
            { name: '医保编号', value: this.detailData.healthCareNo, column: 'qg-two' },
        ]
    },
    data() {
        return {
            detailData: {},
            tablelist: [],
            tablelistTwo: []
        }
    },
}
</script>
