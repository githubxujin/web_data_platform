<template>
    <div class="table-wrap mt20">
        <div class="table-title">
            {{list.drugGoodsName || '-'}}
        </div>
        <qg-table subtitle="基本信息" class="mt20">
            <qg-table-column :label="item.label" column="qg-two" v-for="(item,index) in basicList()" :key="index">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="招标详情" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in detailList()" :key="index">
                {{item.value}}
            </qg-table-column>
        </qg-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: {}
        }
    },
    created() {
        this.getlist(this.$route.query.id)
    },
    methods: {
        basicList() {
            return [
                { label: '药品名称', value: this.list.drugGoodsName || '-' },
                { label: '剂型', value: this.list.dosageForm || '-' },
                { label: '通用名', value: this.list.drugGenericNames || '-' },
                { label: '规格', value: this.list.specifications || '-' },
                { label: '生产企业', value: this.list.productionCompany || '-' },
                { label: '转换比', value: this.list.conversionRatio || '-' },
                { label: '用药途径', value: this.list.deliveryWay || '-' },
                { label: '包装数量', value: this.list.packageQuantity || '-' }
            ]
        },
        detailList() {
            return [
                { label: '中标省区', value: this.list.winningProvinces || '-', column: 'qg-two' },
                { label: '价格', value: this.list.tenderPrice || '-', column: 'qg-two' },
                { label: '中标时间', value: this.list.winningTime || '-', column: 'qg-two' },
                { label: '最小制剂单位价格', value: this.list.minimumPreparationUnitPrice || '-', column: 'qg-two' },
                { label: '投标企业', value: this.list.tenderCompany || '-', column: 'qg-two' },
                { label: '质量等级', value: this.list.qualityLevel || '-', column: 'qg-two' },
                { label: '价格属性', value: this.list.priceAttribute || '-', column: 'qg-two' },
                { label: '标的执行情况', value: this.list.subjectMatterSituation || '-', column: 'qg-two' },
                { label: '公布文件', value: this.list.publicFile || '-', column: 'qg-one' },
            ]
        },
        getlist(id) {
            this.ajax
                .json('/dcp/drug/bidding/detail', { id }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                })
        }
    },
}
</script>

<style>
</style>