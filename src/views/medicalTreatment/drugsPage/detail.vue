<template>
    <div class="table-wrap mt15 mb30">
        <qg-table :title="detailData.breedName" subtitle="基本信息">
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
    mounted () {
        this.detailData = JSON.parse(this.$route.query.detail);
        this.tablelist = [
            { name: '药品名称', value: this.detailData.breedName },
            { name: '申报厂家', value: this.detailData.declarationContact, column: 'qg-two' },
            { name: '参比制剂名称', value: this.detailData.referencePreparationName, column: 'qg-two' },
            { name: '备案编号', value: this.detailData.recordNo, column: 'qg-two' },
            { name: '参比剂型', value: this.detailData.referencePreparation, column: 'qg-two' },
            { name: '申报类别', value: this.detailData.category, column: 'qg-two' },
            { name: '参比规格', value: this.detailData.specifications, column: 'qg-two' },
            { name: '是否289目录', value: this.detailData.is289, column: 'qg-two' },
            { name: '持证商', value: this.detailData.listingPermitHolder, column: 'qg-two' },

            { name: '生产厂商', value: this.detailData.manufacturers, column: 'qg-two' },
            { name: '剂型', value: this.detailData.referencePreparation, column: 'qg-two' },
        ];
        this.tablelistTwo = [//邮件接收时间 备注 备注2 剂型 持证商 
            { name: '拟评价品种剂型', value: this.detailData.varietiesDosage, column: 'qg-two' },

            { name: '参比制剂', value: this.detailData.referenceDosage, column: 'qg-two' },

            { name: '拟评价品种规格', value: this.detailData.varietiesSize, column: 'qg-two' },
            { name: '标准制剂', value: this.detailData.standardDosage, column: 'qg-two' },

            // { name: '邮件接收时间', value: '', column: 'qg-two' },

            { name: '批准日期', value: this.detailData.approvalDate, column: 'qg-two' },
            { name: '持证商生产厂/产地', value: this.detailData.originPlace, column: 'qg-two' },
            { name: '信息来源', value: this.detailData.informSource, },

            // { name: '备注', value: '' },
            // { name: '备注2', value: '' },
        ]
    },
    data () {
        return {
            detailData: {},
            tablelist: [],
            tablelistTwo: [
                { name: '拟评价品种剂型', value: '', column: 'qg-two' },
                { name: '参比制剂', value: '', column: 'qg-two' },
                { name: '拟评价品种规格', value: '', column: 'qg-two' },
                { name: '标准制剂', value: '', column: 'qg-two' },
                { name: '邮件接收时间', value: '', column: 'qg-two' },
                { name: '批准日期', value: '', column: 'qg-two' },
                { name: '持证商生产厂/产地', value: '', column: 'qg-two' },
                { name: '信息来源', value: '', column: 'qg-two' },
                { name: '备注', value: '' },
                { name: '备注2', value: '' },
            ]
        }
    },

    methods: {

    },

}
</script>
