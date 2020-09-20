<template>
    <div class="table-wrap mt20 mb30">
        <qg-table :title="detailData.goodsName" subtitle="基本信息">
            <qg-table-column v-for="(item,index) in tablelist" :label="item.name" :key="index" :column="item.column">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="药物详情" class="mt20">
            <qg-table-column v-for="(item,index) in tablelistTwo" :label="item.name" :key="index" :column="item.column">
                {{item.value}}
            </qg-table-column>
        </qg-table>

    </div>
</template>
<script>
export default {
    components: {
    },
    mounted() {
        this.detailData = JSON.parse(this.$route.query.detail);
        this.tablelist = [
            { name: '药品名称', value: this.detailData.goodsName },
            { name: '药品类型', value: this.detailData.drugClass, column: 'qg-two' },
            { name: '大类（治疗领域）', value: this.detailData.chineseChinese, column: 'qg-two' },
            { name: '剂型/规格', value: this.detailData.specifications, column: 'qg-two' },
            { name: '亚类', value: this.detailData.subclassChinese, column: 'qg-two' },
        ];
        this.tablelistTwo = [
            { name: '基药版本', value: this.detailData.basicDrugVersion, column: 'qg-two' },
            { name: '文件出处', value: this.detailData.fileFrom, column: 'qg-two' },
            { name: '区域', value: this.detailData.area, column: 'qg-two' },
            { name: '增补情况', value: this.detailData.supplementaryConditions, column: 'qg-two' },
            { name: '执行情况', value: this.detailData.executiveCondition },
        ]
    },
    data() {
        return {
            detailData: {},
            tablelist: [],
            tablelistTwo: [
                { name: '基药版本', value: '', column: 'qg-two' },
                { name: '文件出处', value: '', column: 'qg-two' },
                { name: '区域', value: '', column: 'qg-two' },
                { name: '增补情况', value: '', column: 'qg-two' },
                { name: '执行情况', value: '' },
            ]
        }
    },
}
</script>
