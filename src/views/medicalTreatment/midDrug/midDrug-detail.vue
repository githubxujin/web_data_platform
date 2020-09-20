<template>
    <div class="table-wrap mt20">
        <div class="table-title">
            {{this.list.chineseName || '-'}}
        </div>
        <qg-table subtitle="基本信息" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in basicList()" :key="index" width="200">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="药品详情" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in drugList()" :key="index" width="200">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="医保情况" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in medicalList()" :key="index" width="200">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="基药情况" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in baseMedicineList()" :key="index" width="200">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="OTC情况" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in otcList()" :key="index" width="200">
                {{item.value}}
            </qg-table-column>
        </qg-table>
        <qg-table subtitle="中药保护品种情况" class="mt20">
            <qg-table-column :label="item.label" :column="item.column" v-for="(item,index) in chineseMedicineList()" :key="index" width="200">
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
        this.getList(this.$route.query.id)
    },
    methods: {
        getList(id) {
            this.ajax
                .json('/dcp/drug/middle/detail', { id }, { type: 'get' })
                .then(res => {
                    this.list = res.data
                })
        },
        // 基本信息
        basicList() {
            return [
                { label: '中文名称', value: this.list.chineseName || '-', column: 'qg-one' },
                { label: '英文名称', value: this.list.englishName || '-', column: 'qg-two' },
                { label: '批文文号', value: this.list.approval || '-', column: 'qg-two' },
                { label: '商品名称', value: this.list.goodsName || '-', column: 'qg-two' },
                { label: '原批文文号', value: this.list.originalApprovalNumber || '-', column: 'qg-two' },
                { label: '剂型', value: this.list.dosageForm || '-', column: 'qg-two' },
                { label: '最新批准日期', value: this.list.approvalDate || '-', column: 'qg-two' },
                { label: '规格', value: this.list.specification || '-', column: 'qg-one' },
                { label: '包装规格', value: this.list.packingSpecification || '-', column: 'qg-one' },
                { label: '进口国产', value: this.list.importDomestic || '-', column: 'qg-two' },
                { label: '上市许可持有人', value: this.list.listingPermitHolder || '-', column: 'qg-two' },
                { label: '公司名称中文(进口批文)', value: this.list.companyChineseName || '-', column: 'qg-two' },
                { label: '公司名称英文(进口批文)', value: this.list.companyEnglishName || '-', column: 'qg-two' },
                { label: '公司地址中文(进口批文)', value: this.list.chineseAddress || '-', column: 'qg-two' },
                { label: '公司地址英文(进口批文)', value: this.list.englishAddress || '-', column: 'qg-two' },
                { label: '生产厂商中文', value: this.list.productionUnits || '-', column: 'qg-two' },
                { label: '生产厂商英文', value: this.list.manufacturerEnglish || '-', column: 'qg-two' },
                { label: '生产厂商地址中文', value: this.list.productionAddress || '-', column: 'qg-two' },
                { label: '生产厂商地址英文', value: this.list.manufacturerAddressEnglish || '-', column: 'qg-two' },
            ]
        },
        // 药品详情
        drugList() {
            return [
                { label: '大类', value: this.list.categories || '-', column: 'qg-two' },
                { label: '所属企业集团', value: this.list.enterpriseGroup || '-', column: 'qg-two' },
                { label: '亚类', value: this.list.subclass || '-', column: 'qg-two' },
                { label: '国产(进口)厂家数量', value: this.list.domesticManufacturersNumber+'('+this.list.importManufacturersNumber+')', column: 'qg-two' },
                { label: '医保情况', value: this.list.healthClassification || '-', column: 'qg-two' },
                { label: '国产(进口)批文数', value: this.list.productDomesticApprovalNum+'('+this.list.productImportApprovalNum+')', column: 'qg-two' },
                { label: '一致性评价情况', value: this.list.isConsistencyEvaluationVariety || '-', column: 'qg-one' },
            ]
        },
        // 医保情况
        medicalList() {
            return [
                { label: '医保分类', value: this.list.healthClassification || '-', column: 'qg-two' },
                { label: '医保增补省份数量', value: this.list.healthAddProvinceNumber || '-', column: 'qg-two' },
                { label: '医保编号', value: this.list.healthId || '-', column: 'qg-two' },
                { label: '医保增补省份', value: this.list.healthAddProvince || '-', column: 'qg-two' }
            ]
        },
        // 基药情况
        baseMedicineList() {
            return [
                { label: '2018版基药目录序号', value: this.list.basicMedicine || '-', column: 'qg-two' },
                { label: '是否289目录品种', value: this.list.is289 || '-', column: 'qg-two' }
            ]
        },
        // OTC情况
        otcList() {
            return [
                { label: 'OTC规范', value: this.list.otcSpecifications || '-', column: 'qg-two' },
                { label: 'OTC分类', value: this.list.otcClassify || '-', column: 'qg-two' },
                { label: 'OTC通知', value: this.list.otcNotice || '-', column: 'qg-one' },
            ]
        },
        // 中药保护品种情况
        chineseMedicineList() {
            return [
                { label: '中药保护品种编号', value: this.list.chineseMedicineProtectVariety || '-', column: 'qg-one' }
            ]
        },
    },
}
</script>

<style>
</style>
